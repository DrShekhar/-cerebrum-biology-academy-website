'use client'

/**
 * Admin LMS — Upload Video Lecture
 * Wires the (previously unreachable) Cloudflare Stream upload backend to a UI.
 */

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { VideoUploader } from '@/components/lms/admin/VideoUploader'

export default function UploadVideoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/lms/materials"
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to materials
        </Link>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Upload Video Lecture</h1>
        <p className="mb-6 text-gray-600">
          Upload a lecture from your device (resumable, handles large files) or import from a URL.
          Assign it to a course &amp; chapter so it appears in the student syllabus.
        </p>
        <VideoUploader />
      </div>
    </div>
  )
}
