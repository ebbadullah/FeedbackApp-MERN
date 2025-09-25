"use client"

import { useState, useEffect } from "react"
import { Star, Eye, Download, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { formatDate } from "../../utils/dateUtils"

const FeedbackTable = ({ feedbacks, loading }) => {
  const [expandedComment, setExpandedComment] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedFeedbacks, setPaginatedFeedbacks] = useState([])

  const itemsPerPage = 6
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage)

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setPaginatedFeedbacks(feedbacks.slice(startIndex, endIndex))
  }, [feedbacks, currentPage])

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="inline-block border-2 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin mb-2"></div>
        <p className="text-gray-500">Loading feedback data...</p>
      </div>
    )
  }

  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))}
        <span className="ml-1 text-sm text-gray-700">{rating}/5</span>
      </div>
    )
  }

  const toggleComment = (id) => {
    if (expandedComment === id) setExpandedComment(null)
    else setExpandedComment(id)
  }

  return (
    <div className="border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase">Student</th>
              <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase">Course</th>
              <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase">Teacher</th>
              <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase">Schedule</th>
              <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase">Ratings</th>
              <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
              <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFeedbacks.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  <div>
                    <p className="text-gray-500">No feedback data found</p>
                    <p className="text-sm text-gray-400">Try adjusting your filters or search criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedFeedbacks.map((feedback, index) => (
                <>
                  <tr key={feedback._id || index} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-2">
                          <span className="text-blue-600">{feedback.studentName.charAt(0)}</span>
                        </div>
                        <div className="text-sm text-gray-900">{feedback.studentName}</div>
                      </div>
                    </td>
                    <td className="p-2 text-sm text-gray-900">{feedback.courseName}</td>
                    <td className="p-2 text-sm text-gray-900">{feedback.teacherName}</td>
                    <td className="p-2">
                      <div className="text-sm text-gray-900">{feedback.batchTiming}</div>
                      <div className="text-xs text-gray-500">{feedback.classDays}</div>
                    </td>
                    <td className="p-2">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 w-16">Teaching:</span>
                          {renderRating(feedback.teachingRating)}
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 w-16">Content:</span>
                          {renderRating(feedback.contentRating)}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm text-gray-900">{feedback.date ? formatDate(feedback.date) : "-"}</td>
                    <td className="p-2">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => toggleComment(feedback._id || index)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Comments"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 p-1" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 p-1" title="More Options">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedComment === (feedback._id || index) && feedback.comments && (
                    <tr className="bg-gray-50">
                      <td colSpan="7" className="p-2 border-b">
                        <div className="bg-white p-2 border">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Comments:</h4>
                          <p className="text-sm text-gray-600">{feedback.comments}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 p-2 border-t flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm text-gray-500 mb-2 sm:mb-0">
          Showing <span className="font-medium">{paginatedFeedbacks.length}</span> of{" "}
          <span className="font-medium">{feedbacks.length}</span> results
        </div>
        <div className="flex items-center">
          <div className="text-sm text-gray-500 mr-4">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages || 1}</span>
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-2 py-1 border text-sm flex items-center ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 bg-white hover:bg-gray-50"}`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-2 py-1 border text-sm flex items-center ${currentPage === totalPages || totalPages === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 bg-white hover:bg-gray-50"}`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default FeedbackTable