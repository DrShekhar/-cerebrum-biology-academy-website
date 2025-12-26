export default function FacultyLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section Skeleton */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-10 bg-white/20 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-white/10 rounded-lg w-96 max-w-full mx-auto animate-pulse" />
        </div>
      </div>

      {/* Faculty Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
              {/* Image */}
              <div className="h-64 bg-gray-200" />

              {/* Content */}
              <div className="p-6">
                <div className="h-7 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-5 bg-blue-100 rounded w-1/2 mb-4" />
                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                <div className="h-4 bg-gray-100 rounded w-5/6 mb-4" />

                {/* Stats */}
                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <div className="h-8 bg-gray-100 rounded w-20" />
                  <div className="h-8 bg-gray-100 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
