'use client'

import Link from 'next/link'
import { Calendar, ArrowLeft } from 'lucide-react'

export default function ParentSchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <Calendar className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Schedule</h1>
        <p className="text-gray-600 mb-6">
          Class schedule and timetable feature is coming soon.
        </p>
        <Link
          href="/parent/dashboard"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
