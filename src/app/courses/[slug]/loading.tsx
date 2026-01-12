export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 bg-white/20 rounded w-16 animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-4 animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-32 animate-pulse" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Content */}
            <div>
              <div className="h-6 bg-white/20 rounded-full w-32 mb-4 animate-pulse" />
              <div className="h-12 bg-white/30 rounded-lg w-full mb-4 animate-pulse" />
              <div className="h-6 bg-white/15 rounded w-3/4 mb-6 animate-pulse" />

              {/* Stats skeleton */}
              <div className="flex flex-wrap gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-white/10 rounded-lg w-28 animate-pulse" />
                ))}
              </div>

              {/* CTA skeleton */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-14 bg-yellow-400/30 rounded-xl w-48 animate-pulse" />
                <div className="h-14 bg-white/10 rounded-xl w-40 animate-pulse" />
              </div>
            </div>

            {/* Right - Price Card Skeleton */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-80 animate-pulse">
              <div className="h-8 bg-white/20 rounded w-32 mb-4" />
              <div className="h-12 bg-white/30 rounded w-48 mb-6" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-white/10 rounded w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-40 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-gray-100 rounded w-full" />
                ))}
              </div>
            </div>

            {/* Curriculum Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-gray-50 rounded-xl" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-100 rounded-lg" />
                    <div className="h-4 bg-gray-100 rounded flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
