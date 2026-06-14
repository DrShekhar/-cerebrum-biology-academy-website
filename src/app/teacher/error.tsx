'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { logError } from '@/lib/errors'

export default function TeacherError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logError(error, {
      page: 'teacher',
      section: 'teacher-portal',
      digest: error.digest,
      severity: 'high',
      recoverable: true,
    })
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <RefreshCw className="h-8 w-8 text-blue-600" />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong</h1>
      <p className="mb-6 max-w-md text-gray-600">
        We couldn&apos;t load this part of the teacher portal. Please try again — nothing has been
        lost.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="mr-2 h-4 w-4" /> Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Back to home
          </Link>
        </Button>
      </div>
    </div>
  )
}
