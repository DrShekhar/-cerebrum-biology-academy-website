'use client'

import Link from 'next/link'
import { BookOpen, GraduationCap, Calendar, FileText, Award } from 'lucide-react'

interface RelatedResourcesProps {
  category?: string
  neetChapter?: string
  tags?: string[]
}

// Hub pages that should receive internal links
const hubPages = [
  {
    slug: '/demo-booking',
    title: 'Book FREE Demo Class',
    description: 'Experience our teaching methodology with AIIMS faculty',
    icon: Calendar,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    matchCategories: ['neet-preparation', 'study-tips', 'chapter-guides'],
    matchChapters: ['all'],
    priority: 1,
  },
  {
    slug: '/courses',
    title: 'Explore Our Courses',
    description: 'NEET Foundation, Dropper, and Crash Courses',
    icon: GraduationCap,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    matchCategories: ['neet-preparation', 'biology-concepts'],
    matchChapters: ['all'],
    priority: 2,
  },
  {
    slug: '/best-biology-teacher-for-neet',
    title: 'Meet Our Expert Faculty',
    description: 'AIIMS-trained teachers with 2500+ NEET selections',
    icon: Award,
    color: 'bg-green-50 text-green-600 border-green-200',
    matchCategories: ['neet-preparation', 'success-stories'],
    matchChapters: ['all'],
    priority: 3,
  },
  {
    slug: '/mock-tests',
    title: 'Take Practice Tests',
    description: 'Chapter-wise and full-length mock tests',
    icon: FileText,
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    matchCategories: ['chapter-guides', 'biology-concepts'],
    matchChapters: ['Human Physiology', 'Genetics', 'Ecology', 'Plant Physiology', 'Cell Biology'],
    priority: 4,
  },
  {
    slug: '/free-resources',
    title: 'Download Free Notes',
    description: 'NCERT summaries, PYQs, and study materials',
    icon: BookOpen,
    color: 'bg-teal-50 text-teal-600 border-teal-200',
    matchCategories: ['chapter-guides', 'study-tips'],
    matchChapters: ['all'],
    priority: 5,
  },
]

export function RelatedResources({ category, neetChapter, tags }: RelatedResourcesProps) {
  // Filter and sort hub pages based on content relevance
  const relevantPages = hubPages
    .filter((page) => {
      // Always show demo-booking (highest conversion)
      if (page.slug === '/demo-booking') return true

      // Match by category
      if (category && page.matchCategories.includes(category)) return true

      // Match by chapter
      if (neetChapter) {
        if (page.matchChapters.includes('all')) return true
        if (page.matchChapters.some((ch) => neetChapter.toLowerCase().includes(ch.toLowerCase())))
          return true
      }

      // Match by tags
      if (tags) {
        const hasNEETTag = tags.some(
          (tag) =>
            tag.toLowerCase().includes('neet') ||
            tag.toLowerCase().includes('preparation') ||
            tag.toLowerCase().includes('strategy')
        )
        if (hasNEETTag && page.matchCategories.includes('neet-preparation')) return true
      }

      return false
    })
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3) // Show max 3 resources

  if (relevantPages.length === 0) return null

  return (
    <div className="my-12 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-blue-600" />
        Related Resources
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relevantPages.map((page) => {
          const Icon = page.icon
          return (
            <Link
              key={page.slug}
              href={page.slug}
              className={`group p-4 rounded-xl border ${page.color} hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${page.color.includes('blue') ? 'bg-blue-100' : page.color.includes('purple') ? 'bg-purple-100' : page.color.includes('green') ? 'bg-green-100' : page.color.includes('orange') ? 'bg-orange-100' : 'bg-teal-100'}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {page.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{page.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
