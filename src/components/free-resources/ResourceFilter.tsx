'use client'

import { Search, Filter, Archive, X } from 'lucide-react'

interface ResourceFilterProps {
  selectedType: string
  onTypeChange: (type: string) => void
  selectedClass: string
  onClassChange: (classCategory: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  showArchived: boolean
  onArchivedChange: (show: boolean) => void
}

const types = [
  { value: 'ALL', label: 'All Types' },
  { value: 'PDF', label: 'PDFs' },
  { value: 'TIMETABLE', label: 'Timetables' },
  { value: 'ANNOUNCEMENT', label: 'Announcements' },
  { value: 'NOTES', label: 'Notes' },
  { value: 'FORMULA_SHEET', label: 'Formula Sheets' },
]

const classes = [
  { value: 'ALL', label: 'All Classes' },
  { value: 'CLASS_9', label: 'Class 9' },
  { value: 'CLASS_10', label: 'Class 10' },
  { value: 'CLASS_11', label: 'Class 11' },
  { value: 'CLASS_12', label: 'Class 12' },
  { value: 'DROPPERS', label: 'Droppers' },
]

export default function ResourceFilter({
  selectedType,
  onTypeChange,
  selectedClass,
  onClassChange,
  searchQuery,
  onSearchChange,
  showArchived,
  onArchivedChange,
}: ResourceFilterProps) {
  const hasFilters =
    selectedType !== 'ALL' || selectedClass !== 'ALL' || searchQuery || showArchived

  const clearFilters = () => {
    onTypeChange('ALL')
    onClassChange('ALL')
    onSearchChange('')
    onArchivedChange(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Filter className="w-4 h-4 inline mr-1" />
            Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {classes.map((cls) => (
              <option key={cls.value} value={cls.value}>
                {cls.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => onArchivedChange(!showArchived)}
            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
              showArchived
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Archive className="w-4 h-4" />
            {showArchived ? 'Hide Archived' : 'Show Archived'}
          </button>
        </div>
      </div>

      {hasFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-500">Filters applied</p>
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
