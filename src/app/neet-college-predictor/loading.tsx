export default function CollegePredictorLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-10 md:h-12 bg-white/20 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-white/10 rounded w-full max-w-2xl mx-auto mb-8 animate-pulse" />

          {/* Input Form Skeleton */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            </div>
            <div className="h-14 bg-blue-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Filters Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-lg w-32 animate-pulse" />
          ))}
        </div>

        {/* Results Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-pulse"
            >
              {/* Header badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 bg-blue-100 rounded-full w-20" />
                <div className="h-6 bg-green-100 rounded-full w-24" />
                <div className="h-6 bg-amber-100 rounded-full w-16" />
              </div>

              {/* Title */}
              <div className="h-6 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-32 mb-4" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="h-3 bg-gray-100 rounded w-16 mb-2" />
                  <div className="h-5 bg-gray-200 rounded w-24" />
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="h-3 bg-gray-100 rounded w-16 mb-2" />
                  <div className="h-5 bg-green-100 rounded w-20" />
                </div>
              </div>

              {/* Button */}
              <div className="h-10 bg-gray-100 rounded-lg w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
