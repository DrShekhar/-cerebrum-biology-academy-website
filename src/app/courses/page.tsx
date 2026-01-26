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
  return (
    <>
      {/* Breadcrumb Navigation + Schema */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbSchema items={[{ label: 'Courses', isCurrentPage: true }]} />
      </div>
      <EnhancedCoursesListingPage />
    </>
  )
}
