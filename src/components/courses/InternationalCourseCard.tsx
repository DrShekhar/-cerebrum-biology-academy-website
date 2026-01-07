'use client'

import { Clock, Users, BookOpen, CheckCircle2, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import type { Course } from '@/lib/international/courses'
import type { CountryConfig } from '@/lib/international/countries'
import { formatPrice } from '@/lib/international/countries'
import { cn } from '@/lib/utils'

interface InternationalCourseCardProps {
  course: Course
  country: CountryConfig
  className?: string
}

const levelColors = {
  Beginner: 'bg-green-50 text-green-700 border-green-200',
  Intermediate: 'bg-blue-50 text-blue-700 border-blue-200',
  Advanced: 'bg-purple-50 text-purple-700 border-purple-200',
  'All Levels': 'bg-gray-50 text-gray-700 border-gray-200',
}

export function InternationalCourseCard({
  course,
  country,
  className,
}: InternationalCourseCardProps) {
  const localPrice = {
    smallGroup: course.priceUSD.smallGroup * country.currency.rate,
    oneOnOne: course.priceUSD.oneOnOne * country.currency.rate,
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the "${course.name}" course for ${course.examSystem}. I'm from ${country.name}. Can you share more details?`
  )

  return (
    <div
      className={cn(
        'group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 flex flex-col h-full overflow-hidden',
        className
      )}
    >
      {/* Header with badge */}
      <div className="relative p-5 pb-4 border-b border-gray-100">
        {course.badge && (
          <span className="absolute top-4 right-4 px-2.5 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700 border border-orange-200">
            {course.badge}
          </span>
        )}

        {course.popular && !course.badge && (
          <span className="absolute top-4 right-4 px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
            Popular
          </span>
        )}

        {/* Exam system badge */}
        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-teal-50 text-teal-700 border border-teal-200 mb-3">
          {course.examSystem}
        </span>

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors line-clamp-2 pr-16">
          {course.name}
        </h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{course.description}</p>
      </div>

      {/* Course details */}
      <div className="p-5 flex-1">
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            {course.duration}
          </span>
          <span
            className={cn(
              'px-2 py-0.5 text-xs font-medium rounded-full border',
              levelColors[course.level]
            )}
          >
            {course.level}
          </span>
        </div>

        {/* Target audience */}
        <div className="flex items-start gap-2 mb-4">
          <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600">{course.targetAudience}</p>
        </div>

        {/* Key features */}
        <div className="space-y-2 mb-4">
          {course.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature.text}</span>
            </div>
          ))}
          {course.features.length > 3 && (
            <p className="text-xs text-gray-500 pl-6">
              +{course.features.length - 3} more features
            </p>
          )}
        </div>

        {/* Topics preview */}
        <div className="flex flex-wrap gap-1.5">
          {course.topics.slice(0, 3).map((topic, index) => (
            <span key={index} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
              {topic}
            </span>
          ))}
          {course.topics.length > 3 && (
            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
              +{course.topics.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Pricing and CTA */}
      <div className="p-5 pt-4 border-t border-gray-100 bg-gray-50/50">
        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Small Group</span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(localPrice.smallGroup, country.currency)}
              <span className="text-xs font-normal text-gray-500">/mo</span>
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wide">1-on-1</span>
            <span className="text-base font-semibold text-gray-700">
              {formatPrice(localPrice.oneOnOne, country.currency)}
              <span className="text-xs font-normal text-gray-500">/mo</span>
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Link
            href={`/international/${country.code}/courses/${course.slug}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Details
          </Link>
          <a
            href={`https://wa.me/919876543210?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  )
}
