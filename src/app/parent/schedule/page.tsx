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
          Your child&apos;s class schedule isn&apos;t in the parent portal yet — we&apos;re building
          it. Until then, message us on WhatsApp and we&apos;ll send you the current batch timings
          right away.
        </p>
        <div className="flex flex-col gap-3 items-center">
          <a
            href="https://wa.me/918826444334?text=Hi!%20Please%20share%20my%20child%27s%20class%20schedule%20and%20batch%20timings."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Get schedule on WhatsApp
          </a>
          <Link
            href="/parent/dashboard"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
