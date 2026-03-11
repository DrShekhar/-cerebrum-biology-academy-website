'use client'

import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function FacultyError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Faculty Page Error</h1>
        <p className="text-gray-600 mb-8">
          We couldn't load this faculty profile. Please try again or view our faculty team.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/faculty">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              All Faculty
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
