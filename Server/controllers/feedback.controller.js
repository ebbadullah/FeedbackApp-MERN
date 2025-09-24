import Feedback from "../models/feedback.model.js"
import ExcelJS from "exceljs"

/**
 * @desc    Create a new feedback
 * @route   POST /api/feedback
 * @access  Public
 */
export const createFeedback = async (req, res, next) => {
  try {
    const feedback = new Feedback(req.body)
    await feedback.save()

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get all feedbacks
 * @route   GET /api/admin/feedbacks
 * @access  Private (Admin only)
 */
export const getAllFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 })

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/feedbacks/stats
 * @access  Private (Admin only)
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const now = new Date()
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // Get all feedbacks
    const allFeedbacks = await Feedback.find()
    
    // Get current month feedbacks
    const currentMonthFeedbacks = await Feedback.find({
      date: { $gte: currentMonth }
    })
    
    // Get last month feedbacks
    const lastMonthFeedbacks = await Feedback.find({
      date: { $gte: lastMonth, $lte: lastMonthEnd }
    })

    // Calculate total feedbacks
    const totalFeedbacks = allFeedbacks.length
    const currentMonthCount = currentMonthFeedbacks.length
    const lastMonthCount = lastMonthFeedbacks.length
    
    // Calculate percentage change
    const feedbackChange = lastMonthCount > 0 
      ? Math.round(((currentMonthCount - lastMonthCount) / lastMonthCount) * 100)
      : currentMonthCount > 0 ? 100 : 0

    // Calculate average ratings
    const avgTeachingRating = allFeedbacks.length > 0
      ? (allFeedbacks.reduce((sum, f) => sum + f.teachingRating, 0) / allFeedbacks.length).toFixed(1)
      : 0
    
    const avgContentRating = allFeedbacks.length > 0
      ? (allFeedbacks.reduce((sum, f) => sum + f.contentRating, 0) / allFeedbacks.length).toFixed(1)
      : 0

    // Calculate last month averages for comparison
    const lastMonthAvgTeaching = lastMonthFeedbacks.length > 0
      ? (lastMonthFeedbacks.reduce((sum, f) => sum + f.teachingRating, 0) / lastMonthFeedbacks.length)
      : 0
    
    const lastMonthAvgContent = lastMonthFeedbacks.length > 0
      ? (lastMonthFeedbacks.reduce((sum, f) => sum + f.contentRating, 0) / lastMonthFeedbacks.length)
      : 0

    const teachingChange = lastMonthAvgTeaching > 0 
      ? (avgTeachingRating - lastMonthAvgTeaching).toFixed(1)
      : avgTeachingRating

    const contentChange = lastMonthAvgContent > 0 
      ? (avgContentRating - lastMonthAvgContent).toFixed(1)
      : avgContentRating

    // Find most popular course
    const courseCounts = {}
    allFeedbacks.forEach(feedback => {
      courseCounts[feedback.courseName] = (courseCounts[feedback.courseName] || 0) + 1
    })
    
    const mostPopularCourse = Object.keys(courseCounts).reduce((a, b) => 
      courseCounts[a] > courseCounts[b] ? a : b, 'No data'
    )
    
    const mostPopularCourseCount = courseCounts[mostPopularCourse] || 0

    // Count current month feedbacks for most popular course
    const currentMonthPopularCourseCount = currentMonthFeedbacks.filter(
      f => f.courseName === mostPopularCourse
    ).length

    res.status(200).json({
      success: true,
      data: {
        totalFeedbacks,
        feedbackChange,
        avgTeachingRating,
        teachingChange,
        avgContentRating,
        contentChange,
        mostPopularCourse,
        currentMonthPopularCourseCount
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Export feedbacks to Excel
 * @route   GET /api/admin/feedbacks/export
 * @access  Private (Admin only)
 */
export const exportFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 })

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Feedbacks")

    // Add headers
    worksheet.columns = [
      { header: "Student Name", key: "studentName", width: 20 },
      { header: "Course", key: "courseName", width: 20 },
      { header: "Teacher", key: "teacherName", width: 20 },
      { header: "Batch Timing", key: "batchTiming", width: 15 },
      { header: "Class Days", key: "classDays", width: 10 },
      { header: "Teaching Rating", key: "teachingRating", width: 15 },
      { header: "Content Rating", key: "contentRating", width: 15 },
      { header: "Comments", key: "comments", width: 40 },
      { header: "Date", key: "date", width: 15 },
    ]

    // Add rows
    feedbacks.forEach((feedback) => {
      worksheet.addRow({
        studentName: feedback.studentName,
        courseName: feedback.courseName,
        teacherName: feedback.teacherName,
        batchTiming: feedback.batchTiming,
        classDays: feedback.classDays,
        teachingRating: feedback.teachingRating,
        contentRating: feedback.contentRating,
        comments: feedback.comments || "",
        date: feedback.date ? new Date(feedback.date).toLocaleDateString() : "",
      })
    })

    // Style the header row
    worksheet.getRow(1).font = { bold: true }

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    res.setHeader("Content-Disposition", "attachment; filename=feedbacks.xlsx")

    await workbook.xlsx.write(res)
    res.end()
  } catch (error) {
    next(error)
  }
}
