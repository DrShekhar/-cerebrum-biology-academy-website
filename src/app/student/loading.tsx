import { Skeleton } from '@/components/ui/Skeleton'

/**
 * Neutral route-level skeleton for /student/* — a page-header bar plus a
 * generic content block, so it doesn't flash a layout that mismatches the
 * destination page (each page renders its own precise skeleton after this).
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="mt-2 h-4 w-80" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-28 w-full rounded-xl" />
      </div>
    </div>
  )
}
