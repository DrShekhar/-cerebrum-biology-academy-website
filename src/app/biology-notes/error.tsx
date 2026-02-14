'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function BiologyNotesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Biology Notes Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Notes Loading Error</h1>
        <p className="text-lg text-gray-600 mb-8">
          We're having trouble loading biology notes. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button size="lg" onClick={() => reset()}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <Link href="/biology-notes-for-neet" className="text-blue-600 hover:underline">NEET Biology Notes</Link>
          <Link href="/free-resources" className="text-blue-600 hover:underline">Free Resources</Link>
          <Link href="/courses" className="text-blue-600 hover:underline">Courses</Link>
        </div>
      </div>
    </div>
  )
}
