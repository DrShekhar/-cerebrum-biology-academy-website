'use client'

import { PhotoGallerySection } from '@/components/layout/PhotoGallerySection'
import { Metadata } from 'next'

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Cerebrum Photo Gallery</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            Authentic moments of learning, success, and celebration with Dr. Shekhar Singh and our
            NEET achievers
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">48+</div>
              <div className="text-sm opacity-90">Photos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">5+</div>
              <div className="text-sm opacity-90">Years Documented</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">247+</div>
              <div className="text-sm opacity-90">Students Featured</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">89+</div>
              <div className="text-sm opacity-90">Success Moments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Photo Gallery */}
      <PhotoGallerySection
        showFeaturedOnly={false}
        maxPhotos={48}
        enableLightbox={true}
        showSearch={true}
      />
    </div>
  )
}
