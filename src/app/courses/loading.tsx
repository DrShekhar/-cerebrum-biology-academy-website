export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-10 bg-white/20 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-white/10 rounded-lg w-96 mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 animate-pulse">
                <div className="h-8 bg-white/20 rounded mb-2" />
                <div className="h-4 bg-white/10 rounded w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-8 bg-gray-200 rounded-lg w-48 mb-8 animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4" />
              <div className="h-8 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-6" />
              <div className="flex gap-4">
                <div className="h-10 bg-blue-100 rounded-lg flex-1" />
                <div className="h-10 bg-gray-100 rounded-lg flex-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
