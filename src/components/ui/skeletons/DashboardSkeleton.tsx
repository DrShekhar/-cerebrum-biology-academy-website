/**
 * DashboardSkeleton - Loading placeholder for Dashboard components
 * Displays a skeleton UI while dashboard data is being loaded
 */
export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>

      {/* Metrics cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded w-24" />
              <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            </div>
            <div className="h-8 bg-gray-200 rounded w-20" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
        <div className="h-64 bg-gray-100 rounded-lg flex items-end justify-around gap-2 p-4">
          {[60, 80, 50, 70, 90, 65, 75].map((height, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-t w-full"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Additional content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * CompactDashboardSkeleton - Smaller version for mobile or compact views
 */
export function CompactDashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-6 bg-gray-200 rounded w-12" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4">
        <div className="h-32 bg-gray-100 rounded" />
      </div>
    </div>
  )
}
