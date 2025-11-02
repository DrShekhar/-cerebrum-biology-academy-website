import { Metadata } from 'next'
import PhotoGallery from '@/components/gallery/PhotoGallery'
import { galleryImages } from '@/data/gallery'

export const metadata: Metadata = {
  title: 'Photo Gallery | Cerebrum Biology Academy',
  description:
    'Explore moments from Cerebrum Biology Academy - faculty leadership, seminars, events, and campus facilities. See our commitment to excellence in NEET and medical entrance exam preparation.',
  keywords:
    'Cerebrum Biology Academy gallery, Dr. Shekhar, Narayana Group, NEET seminars, medical coaching events, biology academy photos, educational seminars, academic events',
  openGraph: {
    title: 'Photo Gallery | Cerebrum Biology Academy',
    description:
      'Explore moments from Cerebrum Biology Academy - faculty leadership, seminars, events, and campus facilities.',
    type: 'website',
    images: [
      {
        url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop/meP3n6VKelS9LnOn/img_2854-YD0v2gX7w8TZqBql.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy Facilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photo Gallery | Cerebrum Biology Academy',
    description:
      'Explore moments from Cerebrum Biology Academy - faculty leadership, seminars, events, and campus facilities.',
    images: [
      'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop/meP3n6VKelS9LnOn/img_2854-YD0v2gX7w8TZqBql.jpg',
    ],
  },
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Photo Gallery
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-3 sm:mb-4">
              Capturing Excellence in Medical Entrance Coaching
            </p>
            <p className="text-base sm:text-lg text-blue-200 max-w-3xl mx-auto">
              Explore memorable moments from our journey - from faculty leadership and educational
              seminars to campus events and student achievements. Each photo tells a story of
              dedication, excellence, and success.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-14 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <PhotoGallery images={galleryImages} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-14 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Be Part of Our Success Story
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join Cerebrum Biology Academy and create your own success story in medical entrance
            exams.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Contact Us
            </a>
            <a
              href="/courses"
              className="bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white text-center"
            >
              View Courses
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
