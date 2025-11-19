import { Skeleton } from '@/components/ui/skeleton'

export function LeadCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-3" />

      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      <div className="mt-4 flex gap-2">
        <Skeleton className="h-8 flex-1 rounded-md" />
        <Skeleton className="h-8 flex-1 rounded-md" />
      </div>
    </div>
  )
}

export function LeadPipelineSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="min-w-[320px] bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-6 w-8 rounded-full" />
          </div>

          <div className="space-y-3">
            <LeadCardSkeleton />
            <LeadCardSkeleton />
          </div>
        </div>
      ))}
    </div>
  )
}
