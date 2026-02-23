import { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllPosts, getAllCategories } from '@/lib/blog/mdx'
import { BreadcrumbSchema, BlogPageWebPageSchema } from '@/components/seo'
import { BlogListingPage } from '@/components/blog/BlogListingPage'

// Revalidate every hour — page is statically generated and cached at CDN edge
export const revalidate = 3600

// Loading skeleton component
function BlogLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const params = await searchParams
  const hasQueryParams = Object.keys(params).length > 0

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
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://cerebrumbiologyacademy.com/blog',
      types: {
        'application/rss+xml': '/blog/feed.xml',
      },
    },
    ...(hasQueryParams && {
      robots: { index: true, follow: true },
    }),
  }
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  // Compute stats and tags from already-loaded posts (avoids re-reading all 111+ MDX files)
  const totalReadTime = posts.reduce((sum, post) => {
    const rt = typeof post.readTime === 'number' && !isNaN(post.readTime) ? post.readTime : 0
    return sum + rt
  }, 0)
  const stats = {
    totalPosts: posts.length,
    totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
    avgReadTime: posts.length > 0 ? Math.round(totalReadTime / posts.length) : 0,
    categories: categories.length,
  }

  const tagCounts: Record<string, number> = {}
  posts.forEach((post) =>
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  )
  const popularTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)

  const blogCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'NEET Biology Blog | Study Tips & Preparation Strategies',
    description: 'Expert NEET biology preparation tips, study strategies, and educational content by AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/blog',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    about: {
      '@type': 'Thing',
      name: 'NEET Biology Preparation',
    },
    author: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Head Faculty',
      alumniOf: 'AIIMS New Delhi',
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    numberOfItems: posts.length,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: Math.min(posts.length, 10),
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://cerebrumbiologyacademy.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />
      {/* WebPage Schema with internal linking */}
      <BlogPageWebPageSchema />
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
