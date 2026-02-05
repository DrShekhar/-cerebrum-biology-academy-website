import { Metadata } from 'next'
import { Suspense } from 'react'
import nextDynamic from 'next/dynamic'
import { getAllPosts, getAllCategories, getBlogStats, getAllTags } from '@/lib/blog/mdx'
import { BreadcrumbSchema } from '@/components/seo'

// Force dynamic rendering to ensure searchParams work correctly
export const dynamic = 'force-dynamic'

// Loading skeleton component
function BlogLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-12 bg-gray-200 animate-pulse rounded-lg mb-8 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-gray-100 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Lazy load the heavy blog listing component
const BlogListingPage = nextDynamic(
  () => import('@/components/blog/BlogListingPage').then((mod) => mod.BlogListingPage),
  {
    loading: () => <BlogLoadingSkeleton />,
    ssr: true,
  }
)

interface BlogPageProps {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams
  const hasQueryParams = params.search || params.category

  return {
    title: 'NEET Biology Blog | Study Tips & Preparation Strategies',
    description:
      'Expert NEET biology preparation tips, study strategies, and educational content by AIIMS faculty. Master biology concepts for medical entrance success.',
    keywords:
      'NEET biology blog, medical entrance preparation, biology study tips, NEET strategy, AIIMS faculty guidance',
    openGraph: {
      title: 'NEET Biology Blog | Expert Study Tips & Strategies',
      description:
        'Master NEET Biology with expert tips, preparation strategies, and study guides by AIIMS faculty.',
      images: ['/blog/neet-biology-blog-og.jpg'],
    },
    alternates: {
      canonical: 'https://cerebrumbiologyacademy.com/blog',
      types: {
        'application/rss+xml': '/blog/feed.xml',
      },
    },
    robots: hasQueryParams ? { index: false, follow: true } : { index: true, follow: true },
  }
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const stats = getBlogStats()
  const tags = getAllTags()
  const popularTags = tags.slice(0, 15)

  return (
    <>
      {/* Breadcrumb Navigation + Schema */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbSchema items={[{ label: 'Blog', isCurrentPage: true }]} />
      </div>
      {/* Suspense boundary required for useSearchParams in BlogListingPage */}
      <Suspense fallback={<BlogLoadingSkeleton />}>
        <BlogListingPage
          posts={posts}
          categories={categories}
          stats={stats}
          popularTags={popularTags}
        />
      </Suspense>
    </>
  )
}
