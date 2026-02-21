import { Metadata } from 'next'
import { GalleryPageContent } from '@/components/gallery/GalleryPageContent'

// ISR: Revalidate every 30 minutes - gallery may be updated with new images
export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Wall of Excellence | Gallery | Cerebrum Biology Academy',
  description:
    'Explore our Wall of Excellence - celebrating student achievements, faculty expertise, campus events, seminars, and memorable moments at Cerebrum Biology Academy.',
  keywords:
    'Cerebrum Biology Academy gallery, NEET toppers, student achievements, biology seminars, faculty photos, campus events, medical coaching gallery',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/gallery',
  },
  openGraph: {
    title: 'Wall of Excellence | Cerebrum Biology Academy',
    description:
      'Explore our Wall of Excellence - celebrating student achievements, faculty expertise, and memorable moments.',
    type: 'website',
    images: [
      {
        url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop/meP3n6VKelS9LnOn/img_2854-YD0v2gX7w8TZqBql.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy - Wall of Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wall of Excellence | Cerebrum Biology Academy',
    description:
      'Explore our Wall of Excellence - celebrating student achievements, faculty expertise, and memorable moments.',
    images: [
      'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop/meP3n6VKelS9LnOn/img_2854-YD0v2gX7w8TZqBql.jpg',
    ],
  },
}

export default function GalleryPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://cerebrumbiologyacademy.com/gallery' },
    ],
  }

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Wall of Excellence | Cerebrum Biology Academy Gallery',
    description: 'Celebrating student achievements, faculty expertise, campus events, seminars, and memorable moments at Cerebrum Biology Academy.',
    url: 'https://cerebrumbiologyacademy.com/gallery',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    about: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      description: 'Premier NEET Biology coaching institute in Delhi NCR',
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
  }

  // VideoObject schema for video gallery content
  const videoGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Cerebrum Biology Academy - Video Gallery',
    description:
      'Watch video content from Cerebrum Biology Academy - student testimonials, faculty insights, campus events, biology lectures, and educational seminars.',
    thumbnailUrl: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    uploadDate: '2025-01-10',
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGallerySchema) }} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-[#e8ede8] py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4a5d4a]/5"></div>
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#3d4d3d]/5"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#3d4d3d]/10 px-4 py-1.5 text-sm font-medium text-[#3d4d3d]">
              <span>🏆</span>
              <span>Celebrating Excellence</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:mb-6 sm:text-4xl md:text-5xl">
              Wall of <span className="text-[#4a5d4a]">Excellence</span>
            </h1>
            <p className="mb-3 text-lg text-gray-700 sm:mb-4 sm:text-xl">
              Capturing Moments of Success & Achievement
            </p>
            <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
              Explore our journey through images - from student toppers and faculty leadership to
              educational seminars, campus events, and memorable celebrations. Each photo tells a
              story of dedication and excellence.
            </p>
          </div>

          {/* Stats Row */}
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:mt-10 md:grid-cols-4">
            {[
              { label: 'NEET Toppers', icon: '🏆', value: '67+' },
              { label: 'Events', icon: '🎉', value: '100+' },
              { label: 'Seminars', icon: '🎓', value: '200+' },
              { label: 'Years of Excellence', icon: '📅', value: '10+' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white p-4 text-center shadow-md">
                <div className="mb-1 text-2xl">{stat.icon}</div>
                <div className="text-xl font-bold text-[#3d4d3d]">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-14 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <GalleryPageContent />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#3d4d3d] py-12 text-white sm:py-14 md:py-16">
        <div className="container mx-auto px-4 text-center sm:px-6">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
            Be Part of Our Success Story
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-base text-white/80 sm:mb-8 sm:text-lg md:text-xl">
            Join Cerebrum Biology Academy and create your own success story. Our toppers started
            just like you - with a dream and determination.
          </p>
          <div className="flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="/contact"
              className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-[#3d4d3d] transition-colors hover:bg-gray-100 sm:px-8"
            >
              Contact Us
            </a>
            <a
              href="/courses"
              className="rounded-lg border-2 border-white bg-transparent px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-white/10 sm:px-8"
            >
              View Courses
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
