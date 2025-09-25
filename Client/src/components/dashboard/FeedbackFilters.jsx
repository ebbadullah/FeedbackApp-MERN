"use client"

import { useState } from "react"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"

const FeedbackFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  courseOptions,
  teacherOptions,
  timingOptions,
  daysOptions,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <div className="mb-4 border">
      <div className="flex justify-between p-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex">
          <div className="p-1 bg-gray-100 mr-2">
            <Filter className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-medium text-gray-800">Filters</h2>
            {hasActiveFilters && (
              <p className="text-sm text-blue-600">{Object.values(filters).filter(Boolean).length} active filters</p>
            )}
          </div>
        </div>

        <button className="text-gray-500">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-2 border-t bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Course</label>
              <select
                value={filters.course}
                onChange={(e) => onFilterChange("course", e.target.value)}
                className="w-full p-1 border"
                aria-label="Filter by course"
              >
                <option value="">All Courses</option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Teacher</label>
              <select
                value={filters.teacher}
                onChange={(e) => onFilterChange("teacher", e.target.value)}
                className="w-full p-1 border"
                aria-label="Filter by teacher"
              >
                <option value="">All Teachers</option>
                {teacherOptions.map((teacher) => (
                  <option key={teacher} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Batch Timing</label>
              <select
                value={filters.timing}
                onChange={(e) => onFilterChange("timing", e.target.value)}
                className="w-full p-1 border"
                aria-label="Filter by timing"
              >
                <option value="">All Timings</option>
                {timingOptions.map((timing) => (
                  <option key={timing} value={timing}>
                    {timing}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Class Days</label>
              <select
                value={filters.days}
                onChange={(e) => onFilterChange("days", e.target.value)}
                className="w-full p-1 border"
                aria-label="Filter by days"
              >
                <option value="">All Days</option>
                {daysOptions.map((days) => (
                  <option key={days} value={days}>
                    {days}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-2 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>

              {filters.course && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800">
                  Course: {filters.course}
                  <button onClick={() => onFilterChange("course", "")} className="ml-1 text-blue-500">
                    <X className="h-3 w-3 inline" />
                  </button>
                </span>
              )}

              {filters.teacher && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800">
                  Teacher: {filters.teacher}
                  <button onClick={() => onFilterChange("teacher", "")} className="ml-1 text-blue-500">
                    <X className="h-3 w-3 inline" />
                  </button>
                </span>
              )}

              {filters.timing && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800">
                  Timing: {filters.timing}
                  <button onClick={() => onFilterChange("timing", "")} className="ml-1 text-blue-500">
                    <X className="h-3 w-3 inline" />
                  </button>
                </span>
              )}

              {filters.days && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800">
                  Days: {filters.days}
                  <button onClick={() => onFilterChange("days", "")} className="ml-1 text-blue-500">
                    <X className="h-3 w-3 inline" />
                  </button>
                </span>
              )}

              <button onClick={onClearFilters} className="ml-auto text-sm text-blue-600">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FeedbackFilters