'use client'

/**
 * Reusable loading skeleton components for page transitions.
 * These provide instant visual feedback while pages load.
 */

export function CoachingPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="h-6 bg-white/20 rounded-full w-48 mx-auto mb-6 animate-pulse" />
            <div className="h-12 md:h-16 bg-white/30 rounded-lg w-full mb-4 animate-pulse" />
            <div className="h-6 bg-white/15 rounded w-3/4 mx-auto mb-8 animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-14 bg-yellow-400/30 rounded-xl w-52 mx-auto sm:mx-0 animate-pulse" />
              <div className="h-14 bg-white/10 rounded-xl w-44 mx-auto sm:mx-0 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-8 bg-gray-100 rounded w-16 mb-2" />
              <div className="h-4 bg-gray-50 rounded w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-8 animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="h-12 w-12 bg-gray-100 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="h-10 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-100 rounded w-2/3 mx-auto mb-8 animate-pulse" />
          <div className="h-14 bg-blue-100 rounded-xl w-52 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function OlympiadPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="h-8 bg-white/20 rounded-full w-40 mb-4 animate-pulse" />
              <div className="h-14 bg-white/30 rounded-lg w-full mb-4 animate-pulse" />
              <div className="h-6 bg-white/15 rounded w-3/4 mb-8 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-14 bg-yellow-400/30 rounded-xl w-48 animate-pulse" />
                <div className="h-14 bg-white/10 rounded-xl w-40 animate-pulse" />
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-2xl p-8 h-80 animate-pulse">
                <div className="h-6 bg-white/20 rounded w-40 mb-4" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <div className="h-5 w-5 bg-white/20 rounded" />
                    <div className="h-4 bg-white/15 rounded flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* About section */}
          <div>
            <div className="h-10 bg-gray-200 rounded-lg w-56 mb-6 animate-pulse" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                ))}
              </div>
              <div className="bg-gray-50 rounded-xl p-6 h-64 animate-pulse" />
            </div>
          </div>

          {/* Curriculum */}
          <div>
            <div className="h-10 bg-gray-200 rounded-lg w-48 mb-6 animate-pulse" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border rounded-xl p-5 animate-pulse">
                  <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-50 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CampbellChapterSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 bg-white/20 rounded w-32 animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-4 animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-24 animate-pulse" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-8 bg-green-500/30 rounded-full w-32 mb-4 animate-pulse" />
              <div className="h-12 bg-white/30 rounded-lg w-full mb-4 animate-pulse" />
              <div className="h-6 bg-white/15 rounded w-3/4 mb-6 animate-pulse" />
              <div className="flex gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-white/10 rounded-lg w-28 animate-pulse" />
                ))}
              </div>
              <div className="h-14 bg-green-500/30 rounded-xl w-56 animate-pulse" />
            </div>
            <div className="bg-white/10 rounded-2xl p-6 h-80 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl animate-pulse">
                <div className="h-8 w-8 bg-green-100 rounded-lg" />
                <div className="h-5 bg-gray-100 rounded flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function GenericPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-12 bg-white/30 rounded-lg w-80 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-white/15 rounded w-2/3 mx-auto animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
