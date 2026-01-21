import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GraduationCap, Globe2, MessageCircle, Award, Users } from 'lucide-react'
import { CourseGrid } from '@/components/courses'
import { getCoursesForCountry } from '@/lib/international/courses'
import {
  getCountryConfig,
  isValidCountryCode,
  SUPPORTED_COUNTRIES,
} from '@/lib/international/countries'
import {
  COURSE_PAGE_SEO_CONFIG,
  generateCoursePageMeta,
  generateCourseStructuredData,
} from '@/lib/international/coursePageSeoConfig'

interface PageProps {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map((country) => ({
    country,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params

  if (!isValidCountryCode(country)) {
    return { title: 'Not Found' }
  }

  const seoConfig = COURSE_PAGE_SEO_CONFIG[country]
  const countryConfig = getCountryConfig(country)
  const meta = generateCoursePageMeta(country)

  if (!seoConfig || !countryConfig) {
    return { title: 'Not Found' }
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: countryConfig.hreflang.replace('-', '_'),
      siteName: 'Cerebrum Biology Academy',
      images: [
        {
          url: '/og/international-courses.jpg',
          width: 1200,
          height: 630,
          alt: `Biology Courses for ${countryConfig.name} Students`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/international/${country}/courses`,
    },
  }
}

export default async function InternationalCoursesPage({ params }: PageProps) {
  const { country } = await params

  if (!isValidCountryCode(country)) {
    notFound()
  }

  const countryConfig = getCountryConfig(country)
  const courses = getCoursesForCountry(country)
  const seoConfig = COURSE_PAGE_SEO_CONFIG[country]

  if (!countryConfig || !seoConfig) {
    notFound()
  }

  const structuredData = generateCourseStructuredData(country)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Country badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <span className="text-2xl">{countryConfig.flag}</span>
                <span>{countryConfig.name}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{seoConfig.h1}</h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Expert online {seoConfig.localSearchTerms.classTerm} for{' '}
                {seoConfig.examTerminology.map((e) => e.name).join(', ')} preparation. Study with
                India&apos;s top biology {seoConfig.localSearchTerms.tutorTerm}s.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-sm md:text-base">500+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm md:text-base">10+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm md:text-base">
                    {countryConfig.timezoneAbbr} Friendly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {countryConfig.trustBadges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-600"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Course Catalog */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Available Courses</h2>
                <p className="text-gray-600 mt-1">
                  All prices shown in {countryConfig.currency.code} ({countryConfig.currency.symbol}
                  )
                </p>
              </div>
              <a
                href="https://wa.me/918826444334"
                target="_blank" rel="noopener noreferrer"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Get Free Consultation
              </a>
            </div>

            <CourseGrid courses={courses} country={countryConfig} />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
              Why Choose Cerebrum Biology Academy?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-xl bg-gray-50">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Faculty</h3>
                <p className="text-sm text-gray-600">
                  Learn from experienced biology educators with proven track records
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gray-50">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {countryConfig.timezoneAbbr} Timings
                </h3>
                <p className="text-sm text-gray-600">
                  Convenient class schedules aligned with {countryConfig.name} time zones
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gray-50">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Small Batches</h3>
                <p className="text-sm text-gray-600">
                  Maximum 8 students per batch for personalized attention
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gray-50">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
                <p className="text-sm text-gray-600">
                  Track record of helping students achieve top grades
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Biology Journey?
            </h2>
            <p className="text-lg text-teal-100 mb-8">
              Book a free consultation to discuss your goals and find the perfect course.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918826444334"
                target="_blank" rel="noopener noreferrer"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href="mailto:contact@cerebrumbiologyacademy.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-400 transition-colors border border-teal-400"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
