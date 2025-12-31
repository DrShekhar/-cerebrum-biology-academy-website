'use client'

// Force dynamic rendering to prevent Clerk auth issues during static build
export const dynamic = 'force-dynamic'

/**
 * Admin LMS - Upload Study Materials
 *
 * Page for uploading PDF study materials with metadata
 */

import { useState } from 'react'
import { MaterialUploader } from '@/components/lms/admin/MaterialUploader'

export default function UploadMaterialsPage() {
  const [uploadedCount, setUploadedCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Study Materials</h1>
          <p className="text-gray-600">
            Upload PDF notes, assignments, and practice papers for your students
          </p>
        </div>

        {/* Stats */}
        {uploadedCount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">
              ✅ Successfully uploaded {uploadedCount} file{uploadedCount !== 1 ? 's' : ''} in this
              session
            </p>
          </div>
        )}

        {/* Upload Component */}
        <MaterialUploader onUploadSuccess={() => setUploadedCount((prev) => prev + 1)} />

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/lms/materials"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📚 View All Materials</h3>
            <p className="text-sm text-gray-600">Browse and manage uploaded materials</p>
          </a>

          <a
            href="/admin/lms/chapters"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📖 Manage Chapters</h3>
            <p className="text-sm text-gray-600">Organize materials by chapters</p>
          </a>

          <a
            href="/admin/lms/analytics"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📊 View Analytics</h3>
            <p className="text-sm text-gray-600">Track downloads and engagement</p>
          </a>
        </div>
      </div>
    </div>
  )
}
