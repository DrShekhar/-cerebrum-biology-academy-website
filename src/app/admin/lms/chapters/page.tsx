'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

/**
 * Admin LMS - Chapters Management
 *
 * Organize materials by chapters and topics
 */

export default function ChaptersPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chapter Management</h1>
          <p className="text-gray-600">Organize study materials by course, chapter, and topic</p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📖</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Chapter Organization</h2>
            <p className="text-gray-600 mb-6">
              Create and manage chapters, topics, and organize materials in a hierarchical
              structure.
            </p>
            <p className="text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-4">
              💡 This feature will be available in <strong>Session 4</strong> of the LMS
              implementation.
              <br />
              For now, you can upload materials without chapter assignment.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/lms/materials/upload"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📤 Upload Materials</h3>
            <p className="text-sm text-gray-600">Upload PDF study materials</p>
          </a>

          <a
            href="/admin/lms/materials"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📚 View Materials</h3>
            <p className="text-sm text-gray-600">Browse all uploaded materials</p>
          </a>
        </div>
      </div>
    </div>
  )
}
