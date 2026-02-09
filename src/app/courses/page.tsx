import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { BreadcrumbSchema } from '@/components/seo'

// Lazy load the heavy courses listing component
const EnhancedCoursesListingPage = dynamic(
  () =>
    import('@/components/courses/EnhancedCoursesListingPage').then(
      (mod) => mod.EnhancedCoursesListingPage
    ),
  {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-b from-navy-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="h-16 bg-gray-200 animate-pulse rounded-lg mb-8 w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: true,
  }
)

interface CoursesPageProps {
  searchParams: Promise<{ class?: string; category?: string }>
}

export async function generateMetadata({ searchParams }: CoursesPageProps): Promise<Metadata> {
  const params = await searchParams
  const hasQueryParams = params.class || params.category
  const baseMetadata = generatePageMetadata('courses')

  return {
    ...baseMetadata,
    alternates: {
      canonical: 'https://cerebrumbiologyacademy.com/courses',
    },
    robots: hasQueryParams ? { index: false, follow: true } : { index: true, follow: true },
  }
}

export default function CoursesPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Courses Delhi NCR | Class 11, 12, Dropper Batches | Cerebrum Academy',
    description:
      'NEET biology courses 2026 in Delhi NCR — Class 11, Class 12 & Dropper batches. AIIMS faculty, 15-student batches, 98% success rate. Rs 45K–1.56L with EMI. 6 centers across Delhi NCR. Enroll now!',
    url: 'https://cerebrumbiologyacademy.com/courses',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      sameAs: ['https://cerebrumbiologyacademy.com'],
    },
    instructor: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Head Faculty',
      alumniOf: 'AIIMS Delhi',
    },
    inLanguage: ['en', 'hi'],
    isAccessibleForFree: false,
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        name: 'Class 11 NEET Biology Course',
        courseMode: ['onsite', 'online'],
        instructor: {
          '@type': 'Person',
          name: 'Dr. Shekhar C Singh',
        },
        startDate: '2026-01-01',
        endDate: '2026-12-31',
      },
      {
        '@type': 'CourseInstance',
        name: 'Class 12 NEET Biology Course',
        courseMode: ['onsite', 'online'],
        instructor: {
          '@type': 'Person',
          name: 'Dr. Shekhar C Singh',
        },
        startDate: '2026-01-01',
        endDate: '2026-12-31',
      },
      {
        '@type': 'CourseInstance',
        name: 'NEET Dropper Program',
        courseMode: ['onsite', 'online'],
        instructor: {
          '@type': 'Person',
          name: 'Dr. Shekhar C Singh',
        },
        startDate: '2026-01-01',
        endDate: '2026-12-31',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '485',
      bestRating: '5',
    },
  }

  return (
    <>
      {/* Course Schema - LD+JSON */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      {/* Breadcrumb Navigation + Schema */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbSchema items={[{ label: 'Courses', isCurrentPage: true }]} />
      </div>
      <EnhancedCoursesListingPage />
    </>
  )
}
