'use client'

/**
 * Admin LMS - Analytics Dashboard
 *
 * Track material downloads, views, and student engagement
 */

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LMS Analytics</h1>
          <p className="text-gray-600">
            Track downloads, views, and student engagement with study materials
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Materials</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div className="text-4xl">📚</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">All uploaded PDFs</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Downloads</p>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
              <div className="text-4xl">⬇️</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">By all students</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Views</p>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <div className="text-4xl">👁️</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Material opens</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Students</p>
                <p className="text-3xl font-bold text-purple-600">0</p>
              </div>
              <div className="text-4xl">👨‍🎓</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Detailed Analytics Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Track material performance, student engagement, popular content, and download trends
              with beautiful charts and reports.
            </p>
            <p className="text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-4">
              💡 Analytics features will be available in <strong>Session 7</strong> of the LMS
              implementation.
              <br />
              Once materials are uploaded and students start downloading, you'll see:
            </p>
            <div className="mt-6 text-left">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">📈</span>
                  Download trends over time
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🏆</span>
                  Most popular materials
                </li>
                <li className="flex items-center">
                  <span className="mr-2">👥</span>
                  Student engagement reports
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📅</span>
                  Daily/weekly/monthly summaries
                </li>
                <li className="flex items-center">
                  <span className="mr-2">💾</span>
                  Export reports to CSV/Excel
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/lms/materials/upload"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📤 Upload Materials</h3>
            <p className="text-sm text-gray-600">Add new study materials</p>
          </a>

          <a
            href="/admin/lms/materials"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📚 View Materials</h3>
            <p className="text-sm text-gray-600">Browse all materials</p>
          </a>

          <a
            href="/admin/students"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">👨‍🎓 Manage Students</h3>
            <p className="text-sm text-gray-600">View student list</p>
          </a>
        </div>
      </div>
    </div>
  )
}
