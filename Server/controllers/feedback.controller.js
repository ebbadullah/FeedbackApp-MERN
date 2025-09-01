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
