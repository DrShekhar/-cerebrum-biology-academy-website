'use client'

import Link from 'next/link'
import { BarChart3, ArrowLeft } from 'lucide-react'

export default function TestAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <BarChart3 className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Analytics</h1>
        <p className="text-gray-600 mb-6">
          Detailed test analytics and performance insights are coming soon.
        </p>
        <Link
          href="/admin/tests"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tests
        </Link>
      </div>
    </div>
  )
}
