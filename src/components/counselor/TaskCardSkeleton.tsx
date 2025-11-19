import { Skeleton } from '@/components/ui/skeleton'

export function TaskCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <div className="space-y-2 mb-4">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  )
}

export function TaskGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </div>
  )
}
