export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back-to-Blog bar — matches real BlogPostHeader gray-50 strip */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
        </div>
      </div>

      {/* Hero Header Skeleton — white bg with dark placeholder bars (matches real post hero) */}
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="max-w-4xl">
          {/* Badges Row */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="h-7 bg-gray-100 rounded-full w-28 animate-pulse" />
            <div className="h-7 bg-gray-100 rounded-full w-24 animate-pulse" />
            <div className="h-7 bg-gray-100 rounded-full w-32 animate-pulse" />
          </div>

          {/* Title */}
          <div className="h-10 md:h-12 bg-gray-200 rounded-lg w-full mb-3 animate-pulse" />
          <div className="h-10 md:h-12 bg-gray-200 rounded-lg w-3/4 mb-6 animate-pulse" />

          {/* Excerpt */}
          <div className="h-5 bg-gray-100 rounded w-full mb-2 animate-pulse" />
          <div className="h-5 bg-gray-100 rounded w-5/6 mb-8 animate-pulse" />

          {/* Author & Meta */}
          <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
            <div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-48 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents Skeleton - Desktop */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 bg-gray-50 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-100 rounded"
                    style={{ width: `${70 + Math.random() * 30}%` }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <main className="lg:col-span-6">
            <article className="animate-pulse">
              {/* Featured Image */}
              <div className="h-64 bg-gray-200 rounded-xl mb-8" />

              {/* Article Content */}
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-4/5" />

                <div className="h-6 bg-gray-200 rounded w-1/2 mt-8" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-3/4" />

                <div className="h-4 bg-gray-100 rounded w-full mt-6" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            </article>
          </main>

          {/* Sidebar Skeleton */}
          <aside className="lg:col-span-3">
            <div className="space-y-6">
              {/* Author Card */}
              <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full" />
                  <div>
                    <div className="h-5 bg-gray-200 rounded w-24 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-20" />
                  </div>
                </div>
                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                <div className="h-4 bg-gray-100 rounded w-4/5" />
              </div>

              {/* Related Posts */}
              <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-28 mb-4" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                        <div className="h-3 bg-gray-100 rounded w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
