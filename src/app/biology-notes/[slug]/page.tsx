import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PrismaClient } from '@/generated/prisma'

import { BookOpen, Clock, GraduationCap, Download, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const prisma = new PrismaClient()

interface PageProps {
  params: {
    slug: string
  }
}

// Generate static params for all published topics (for ISR)
export async function generateStaticParams() {
  try {
    const topics = await prisma.biology_topics.findMany({
      where: { isPublished: true },
      select: { slug: true },
      take: 50, // Limit to first 50 for build time
    })

    return topics.map((topic) => ({
      slug: topic.slug,
    }))
  } catch (error) {
    // Return empty array if database is not accessible or has no data yet
    console.log('No biology topics found or database error during build:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const topic = await prisma.biology_topics.findUnique({
    where: { slug: params.slug },
    select: {
      metaTitle: true,
      title: true,
      metaDescription: true,
      excerpt: true,
      keywords: true,
      publishedAt: true,
    },
  })

  if (!topic) {
    return {
      title: 'Topic Not Found | Cerebrum Biology Academy',
      description: 'The requested biology topic could not be found.',
    }
  }

  return {
    title: topic.metaTitle || `${topic.title} | Free NEET Biology Notes | Cerebrum Academy`,
    description:
      topic.metaDescription ||
      topic.excerpt ||
      `Comprehensive ${topic.title} notes for NEET preparation`,
    keywords: topic.keywords.join(', '),
    openGraph: {
      title: topic.metaTitle || topic.title,
      description: topic.metaDescription || topic.excerpt || '',
      type: 'article',
      publishedTime: topic.publishedAt?.toISOString(),
      authors: ['Dr. Shekhar C Singh'],
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/biology-notes/${params.slug}`,
    },
  }
}

export default async function BiologyTopicPage({ params }: PageProps) {
  const topic = await prisma.biology_topics.findUnique({
    where: { slug: params.slug },
    include: {
      lead_magnets: true,
    },
  })

  if (!topic || !topic.isPublished) {
    notFound()
  }

  // Increment view count (non-blocking)
  prisma.biology_topics
    .update({
      where: { id: topic.id },
      data: { viewCount: { increment: 1 } },
    })
    .catch(console.error)

  // Parse key points
  const keyPoints = (topic.keyPoints as string[]) || []

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Breadcrumbs */}
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link href="/biology-notes" className="text-blue-600 hover:text-blue-700">
                Biology Notes
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-gray-700 font-medium truncate">{topic.title}</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {topic.curriculum}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {topic.grade.replace('_', ' ')}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {topic.difficulty}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {topic.title}
          </h1>

          {topic.excerpt && (
            <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">{topic.excerpt}</p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>{topic.chapter}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span>By {topic.authorName}</span>
            </div>
            {topic.avgTimeOnPage && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{Math.ceil(topic.avgTimeOnPage / 60)} min read</span>
              </div>
            )}
          </div>
        </header>

        {/* Key Points */}
        {keyPoints.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📝</span>
              Key Learning Points
            </h2>
            <ul className="space-y-2">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">{index + 1}.</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content - Markdown */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {topic.content}
          </ReactMarkdown>
        </div>

        {/* Lead Magnet CTA */}
        {topic.lead_magnets && (
          <div className="mt-12 bg-indigo-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold mb-2">Want the Complete Study Material?</h3>
                <p className="text-blue-100 mb-4">{topic.lead_magnets.description}</p>
                <div className="flex items-center text-sm text-blue-100">
                  <Download className="w-4 h-4 mr-2" />
                  <span>{topic.lead_magnets.downloadCount}+ students downloaded</span>
                </div>
              </div>
              <Link
                href={`/biology-notes/${topic.slug}?download=true#lead-capture`}
                className="inline-block bg-white text-blue-600 px-4 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg text-sm sm:text-base min-h-[48px]"
              >
                Download Free PDF
              </Link>
            </div>
          </div>
        )}

        {/* Related Topics */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/biology-notes"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-900">View All Topics</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/courses/neet-dropper"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-900">Explore Our Courses</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>
      </article>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: topic.title,
            description: topic.excerpt || topic.metaDescription,
            author: {
              '@type': 'Person',
              name: topic.authorName || 'Dr. Shekhar C Singh',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cerebrumbiologyacademy.com/brain-logo.webp',
              },
            },
            datePublished: topic.publishedAt?.toISOString(),
            dateModified: topic.updatedAt.toISOString(),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://cerebrumbiologyacademy.com/biology-notes/${topic.slug}`,
            },
            keywords: topic.keywords.join(', '),
            educationalUse: 'Study material for NEET preparation',
            educationalLevel: topic.grade,
          }),
        }}
      />

      
    </div>
  )
}
