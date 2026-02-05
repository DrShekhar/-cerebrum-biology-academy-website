'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, MapPin, GraduationCap, Users, Clock } from 'lucide-react'

/**
 * RelatedContent Component for Internal Linking
 * Improves SEO through strategic internal linking and helps users discover related content.
 */

export interface RelatedLink {
  title: string
  href: string
  description?: string
  category?: 'course' | 'location' | 'blog' | 'comparison' | 'state' | 'general'
  isNew?: boolean
  isPopular?: boolean
}

// Pre-defined related content categories
export const RELATED_COURSES: RelatedLink[] = [
  { title: 'NEET Foundation (Class 11)', href: '/courses/foundation', category: 'course', description: '2-year comprehensive program' },
  { title: 'NEET Target (Class 12)', href: '/courses/class-12', category: 'course', description: '1-year intensive coaching' },
  { title: 'NEET Dropper Batch', href: '/courses/neet-dropper', category: 'course', description: 'Specialized repeater program', isPopular: true },
  { title: 'Online NEET Biology', href: '/online-neet-biology-classes', category: 'course', description: 'Live interactive classes' },
  { title: 'NEET Crash Course', href: '/courses/neet-crash-course', category: 'course', description: 'Last-minute revision' },
]

export const RELATED_LOCATIONS: RelatedLink[] = [
  { title: 'NEET Coaching Gurugram', href: '/neet-coaching-gurugram', category: 'location', isPopular: true },
  { title: 'NEET Coaching Delhi', href: '/neet-coaching-delhi', category: 'location' },
  { title: 'NEET Coaching South Extension', href: '/neet-coaching-south-extension', category: 'location' },
  { title: 'NEET Coaching Rohini', href: '/neet-coaching-rohini', category: 'location' },
  { title: 'NEET Coaching Noida', href: '/neet-coaching-noida', category: 'location' },
]

export const RELATED_COMPARISONS: RelatedLink[] = [
  { title: 'Cerebrum vs Aakash', href: '/cerebrum-vs-aakash-neet-coaching', category: 'comparison' },
  { title: 'Cerebrum vs Allen', href: '/cerebrum-vs-allen-neet-coaching', category: 'comparison' },
  { title: 'Online vs Offline Coaching', href: '/online-vs-offline-neet-coaching', category: 'comparison' },
  { title: 'NEET Fees Comparison', href: '/neet-coaching-fees-comparison', category: 'comparison' },
]

export const RELATED_STATES: RelatedLink[] = [
  { title: 'NEET Coaching for UP Students', href: '/states/uttar-pradesh', category: 'state' },
  { title: 'NEET Coaching for Bihar Students', href: '/states/bihar', category: 'state' },
  { title: 'NEET Coaching for Rajasthan Students', href: '/states/rajasthan', category: 'state' },
  { title: 'NEET Coaching for Delhi Students', href: '/states/delhi', category: 'state', isNew: true },
  { title: 'All States', href: '/states', category: 'state' },
]

const categoryIcons = {
  course: GraduationCap,
  location: MapPin,
  blog: BookOpen,
  comparison: Users,
  state: MapPin,
  general: ArrowRight,
}

interface RelatedContentProps {
  title?: string
  links: RelatedLink[]
  variant?: 'cards' | 'list' | 'inline' | 'compact'
  maxItems?: number
  showDescription?: boolean
  className?: string
}

export function RelatedContent({
  title = 'Related Content',
  links,
  variant = 'cards',
  maxItems = 6,
  showDescription = true,
  className = '',
}: RelatedContentProps) {
  const displayLinks = links.slice(0, maxItems)

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        <span className="text-sm text-gray-500 font-medium">{title}:</span>
        {displayLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            {link.title}
            {link.isNew && <span className="ml-1 text-xs text-green-600">(New)</span>}
          </Link>
        ))}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {displayLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sm text-gray-700 px-3 py-1.5 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              {link.title}
              {link.isPopular && <span className="text-amber-500">★</span>}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className={`border border-gray-200 rounded-xl p-5 ${className}`}>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          {title}
        </h3>
        <ul className="space-y-2">
          {displayLinks.map((link) => {
            const Icon = categoryIcons[link.category || 'general']
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  <span>{link.title}</span>
                  {link.isNew && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">New</span>
                  )}
                  {link.isPopular && (
                    <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">Popular</span>
                  )}
                  <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  // Default: cards variant
  return (
    <section className={`py-8 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-blue-600" />
        {title}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayLinks.map((link) => {
          const Icon = categoryIcons[link.category || 'general']
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h3>
                    {link.isNew && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">New</span>
                    )}
                    {link.isPopular && (
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">Popular</span>
                    )}
                  </div>
                  {showDescription && link.description && (
                    <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

// Quick related links for footer/sidebar
export function QuickLinks({ category }: { category: 'courses' | 'locations' | 'comparisons' | 'states' }) {
  const linksMap = {
    courses: RELATED_COURSES,
    locations: RELATED_LOCATIONS,
    comparisons: RELATED_COMPARISONS,
    states: RELATED_STATES,
  }

  const titlesMap = {
    courses: 'Popular Courses',
    locations: 'Coaching Locations',
    comparisons: 'Comparisons',
    states: 'State-wise Coaching',
  }

  return (
    <RelatedContent
      title={titlesMap[category]}
      links={linksMap[category]}
      variant="compact"
      maxItems={5}
    />
  )
}

export default RelatedContent
