export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-10 bg-white/20 rounded-lg w-80 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-white/10 rounded-lg w-[28rem] max-w-full mx-auto mb-8 animate-pulse" />

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-pulse">
                <div className="h-8 bg-white/20 rounded mb-2" />
                <div className="h-4 bg-white/10 rounded w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-10 bg-gray-100 rounded-lg w-64 animate-pulse" />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-100 rounded-full w-20 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
              {/* Image Skeleton */}
              <div className="h-48 bg-gray-200" />

              {/* Content Skeleton */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="h-6 bg-blue-100 rounded-full w-24 mb-3" />

                {/* Title */}
                <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />

                {/* Excerpt */}
                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                <div className="h-4 bg-gray-100 rounded w-5/6 mb-4" />

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="h-4 bg-gray-100 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
