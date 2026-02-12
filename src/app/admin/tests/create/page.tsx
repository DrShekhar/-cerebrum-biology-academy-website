'use client'

import Link from 'next/link'
import { Plus, ArrowLeft } from 'lucide-react'

export default function CreateTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <Plus className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Test Template</h1>
        <p className="text-gray-600 mb-6">
          Test creation tool is coming soon. You will be able to create custom test templates here.
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
