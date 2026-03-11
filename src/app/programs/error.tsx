'use client'

import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ProgramsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Available</h1>
        <p className="text-gray-600 mb-8">
          This program page encountered an error. Please try again or browse our available courses.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/courses">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              View Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
