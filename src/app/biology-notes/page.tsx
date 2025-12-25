import type { Metadata } from 'next'
import { PrismaClient } from '@/generated/prisma'
import { Footer } from '@/components/layout/Footer'
import { BookOpen, Search, Filter, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: 'Free NEET Biology Notes | Comprehensive Study Material | Cerebrum Academy',
  description:
    'Access free comprehensive NEET biology notes covering all Class 11 and 12 topics. Expert-written study material by Dr. Shekhar Singh to help you ace NEET Biology.',
  keywords: [
    'NEET biology notes',
    'free NEET study material',
    'Class 11 biology',
    'Class 12 biology',
    'NEET preparation',
    'biology notes PDF',
    'CBSE biology',
    'NEET biology topics',
  ].join(', '),
  openGraph: {
    title: 'Free NEET Biology Notes | Cerebrum Biology Academy',
    description: 'Comprehensive biology notes for NEET preparation by Dr. Shekhar Singh',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-notes',
  },
}

export default async function BiologyNotesIndexPage() {
  let topics: Array<{
    id: string
    title: string
    slug: string
    excerpt: string | null
    curriculum: string
    grade: string
    chapter: string
    difficulty: string
    viewCount: number
    publishedAt: Date | null
  }> = []

  try {
    topics = await prisma.biology_topics.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        curriculum: true,
        grade: true,
        chapter: true,
        difficulty: true,
        viewCount: true,
        publishedAt: true,
      },
      orderBy: [{ publishedAt: 'desc' }, { viewCount: 'desc' }],
      take: 50, // Show first 50 topics
    })
  } catch (error) {
    console.error('Error fetching biology topics:', error)
    // topics remains empty array
  }

  // Group topics by grade for better organization
  const topicsByGrade = topics.reduce(
    (acc, topic) => {
      if (!acc[topic.grade]) {
        acc[topic.grade] = []
      }
      acc[topic.grade].push(topic)
      return acc
    },
    {} as Record<string, typeof topics>
  )

  const grades = Object.keys(topicsByGrade).sort()

  // Stats
  const totalTopics = topics.length
  const totalViews = topics.reduce((sum, t) => sum + t.viewCount, 0)
  const curriculums = [...new Set(topics.map((t) => t.curriculum))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Free NEET Biology Notes
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Comprehensive study material covering all NEET Biology topics. Written by Dr. Shekhar
              C Singh, AIIMS New Delhi Alumnus with 15+ years of teaching experience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">{totalTopics}+</div>
                <div className="text-sm sm:text-base text-blue-100">Topics Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">
                  {Math.floor(totalViews / 1000)}K+
                </div>
                <div className="text-sm sm:text-base text-blue-100">Students Helped</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-bold">100%</div>
                <div className="text-sm sm:text-base text-blue-100">Free Content</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {topics.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h2>
            <p className="text-gray-600 mb-8">
              We're currently preparing comprehensive biology notes for you. Check back soon!
            </p>
            <Link
              href="/courses/neet-dropper"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
            >
              Explore Our Courses
            </Link>
          </div>
        ) : (
          <>
            {/* Filter Section */}
            <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Browse By Grade</h2>
                  <p className="text-gray-600">Select your class to view relevant topics</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {curriculums.map((curriculum) => (
                    <span
                      key={curriculum}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {curriculum}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Topics by Grade */}
            {grades.map((grade) => (
              <div key={grade} className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {grade.replace('_', ' ')} Biology
                    </h2>
                    <p className="text-gray-600">{topicsByGrade[grade].length} topics available</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topicsByGrade[grade].map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/biology-notes/${topic.slug}`}
                      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 group"
                    >
                      {/* Topic Header */}
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            topic.difficulty === 'Easy'
                              ? 'bg-green-100 text-green-800'
                              : topic.difficulty === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {topic.difficulty}
                        </span>
                        {topic.viewCount > 100 && (
                          <div className="flex items-center text-gray-500 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Popular
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {topic.title}
                      </h3>

                      {/* Chapter */}
                      <p className="text-sm text-gray-600 mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {topic.chapter}
                      </p>

                      {/* Excerpt */}
                      {topic.excerpt && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{topic.excerpt}</p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500">{topic.viewCount} views</span>
                        <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                          Read More →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Want More Comprehensive Study Material?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join our complete NEET Biology program with live classes, personalized guidance, and
                proven strategies by Dr. Shekhar C Singh
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/demo-booking"
                  className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-100 transition-colors text-center"
                >
                  Book Free Demo
                </Link>
                <Link
                  href="/courses/neet-dropper"
                  className="inline-block bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white/10 transition-colors text-center"
                >
                  View Courses
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'NEET Biology Notes',
            description: 'Free comprehensive biology notes for NEET preparation',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              founder: {
                '@type': 'Person',
                name: 'Dr. Shekhar C Singh',
              },
            },
            numberOfItems: totalTopics,
          }),
        }}
      />

      <Footer />
    </div>
  )
}
