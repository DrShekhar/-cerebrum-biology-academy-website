'use client'

import type { Lead } from '@/app/counselor/leads/page'

interface StatsBarProps {
  leads: Lead[]
  onFilterClick?: (filterType: string, value: string) => void
}

export function StatsBar({ leads, onFilterClick }: StatsBarProps) {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const stats = {
    total: leads.length,
    hot: leads.filter((l) => l.priority === 'HOT').length,
    dueToday: leads.filter((l) => {
      if (!l.nextFollowUpAt) return false
      const followUp = new Date(l.nextFollowUpAt)
      const today = new Date()
      return followUp.toDateString() === today.toDateString()
    }).length,
    overdue: leads.filter((l) => {
      if (!l.nextFollowUpAt) return false
      const followUp = new Date(l.nextFollowUpAt)
      return (
        followUp < now &&
        l.stage !== 'ENROLLED' &&
        l.stage !== 'ACTIVE_STUDENT' &&
        l.stage !== 'LOST'
      )
    }).length,
    thisWeek: leads.filter((l) => new Date(l.createdAt) >= weekAgo).length,
    enrolled: leads.filter((l) => l.stage === 'ENROLLED' || l.stage === 'ACTIVE_STUDENT').length,
    conversionRate:
      leads.length > 0
        ? Math.round(
            (leads.filter((l) => l.stage === 'ENROLLED' || l.stage === 'ACTIVE_STUDENT').length /
              leads.length) *
              100
          )
        : 0,
  }

  const handleStatClick = (filterType: string, value: string) => {
    if (onFilterClick) {
      onFilterClick(filterType, value)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
      <button
        onClick={() => handleStatClick('all', '')}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-lg">
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </button>

      <button
        onClick={() => handleStatClick('priority', 'HOT')}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-red-300 transition-all cursor-pointer text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Hot Leads</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{stats.hot}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <span className="text-2xl">🔥</span>
          </div>
        </div>
      </button>

      <button
        onClick={() => handleStatClick('thisWeek', 'true')}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">This Week</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{stats.thisWeek}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </button>

      <button
        onClick={() => handleStatClick('dueToday', 'true')}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-orange-300 transition-all cursor-pointer text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Due Today</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{stats.dueToday}</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-lg">
            <svg
              className="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </button>

      <button
        onClick={() => handleStatClick('overdue', 'true')}
        className="bg-white rounded-lg shadow-sm border-2 border-red-200 p-4 hover:shadow-md hover:border-red-400 transition-all cursor-pointer text-left relative"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-red-700 font-medium">Overdue</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{stats.overdue}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg relative">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {stats.overdue > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
        </div>
      </button>

      <button
        onClick={() => handleStatClick('stage', 'ENROLLED,ACTIVE_STUDENT')}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-green-300 transition-all cursor-pointer text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Enrolled</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.enrolled}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
        </div>
      </button>

      <button
        onClick={() => handleStatClick('conversion', '')}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Conversion</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">{stats.conversionRate}%</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        </div>
      </button>
    </div>
  )
}
