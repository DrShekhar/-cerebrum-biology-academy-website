'use client'

import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/**
 * Consistent error + retry state for admin data fetches that previously showed
 * a spinner forever on failure.
 */
export function FetchErrorState({ message, onRetry }: { message?: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <AlertCircle className="mx-auto h-10 w-10 text-red-500" />
      <h3 className="mt-3 text-sm font-semibold text-gray-900">Couldn&apos;t load this data</h3>
      <p className="mt-1 text-sm text-gray-600">{message || 'Something went wrong.'}</p>
      <Button variant="outline" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
