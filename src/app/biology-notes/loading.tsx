export default function BiologyNotesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-green-800 via-green-800 to-green-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-10 bg-white/20 rounded-lg w-72 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-white/10 rounded-lg w-[30rem] max-w-full mx-auto animate-pulse" />
        </div>
      </div>

      {/* Filter & Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-lg w-28 animate-pulse" />
          ))}
        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              {/* Icon */}
              <div className="w-12 h-12 bg-green-100 rounded-xl mb-4" />

              {/* Title */}
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />

              {/* Description */}
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-5/6 mb-4" />

              {/* Meta */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="h-4 bg-gray-100 rounded w-16" />
                <div className="h-4 bg-gray-100 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
