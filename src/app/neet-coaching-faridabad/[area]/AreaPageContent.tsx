'use client'

import Link from 'next/link'
import {
  MapPin,
  GraduationCap,
  CheckCircle,
  Phone,
  ArrowRight,
  Play,
  Train,
  ChevronRight,
  Home,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { QuickAnswers } from '@/components/seo/QuickAnswers'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import {
  FaridabadAreaDetails,
  faridabadCourseOptions,
  faridabadAreaDetails,
  getNearbyFaridabadAreas,
} from '@/data/faridabad-areas'

function metroToSlug(metroName: string): string {
  return metroName.toLowerCase().replace(' metro', '-metro').replace(/\s+/g, '-')
}

interface AreaPageContentProps {
  area: FaridabadAreaDetails
  areaSlug: string
}

export default function AreaPageContent({ area, areaSlug }: AreaPageContentProps) {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', `demo_booking_faridabad_${areaSlug}`, {
        event_category: 'conversion',
        event_label: `neet_coaching_faridabad_${areaSlug}`,
        value: 1,
      })
    }
  }

  const nearbyAreas = getNearbyFaridabadAreas(areaSlug)

  return (
    <div className="min-h-screen">
      <nav className="bg-gray-100 py-3 px-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li className="flex items-center">
              <Link
                href="/"
                className="text-gray-600 hover:text-orange-600 transition-colors flex items-center"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link
                href="/neet-coaching-faridabad"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                NEET Coaching Faridabad
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-orange-700 font-medium">{area.name}</span>
            </li>
          </ol>
        </div>
      </nav>

      <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              {area.fullName}
            </div>

            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Coaching in {area.name}</span>
            </h1>

            <p className="hero-description text-lg md:text-xl opacity-90 mb-4">
              {area.description}
            </p>

            <p className="text-md opacity-80 mb-8 max-w-4xl mx-auto">{area.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {area.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 animate-fadeInUp">
              <div className="flex items-center mb-4">
                <Train className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="font-bold text-gray-900">Nearby Metro</h3>
              </div>
              <ul className="space-y-2">
                {area.nearbyMetro.map((metro) => {
                  const metroSlug = metroToSlug(metro)
                  return (
                    <li key={metro} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <Link
                        href={`/neet-coaching-near-metro/${metroSlug}`}
                        className="text-purple-600 hover:text-purple-800 transition-colors text-sm"
                      >
                        {metro}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 animate-fadeInUp">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="font-bold text-gray-900">Key Landmarks</h3>
              </div>
              <ul className="space-y-2">
                {area.landmarks.map((landmark) => (
                  <li key={landmark} className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    {landmark}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6 animate-fadeInUp">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">Schools We Serve</h3>
              </div>
              <ul className="space-y-2">
                {area.schools.map((school) => (
                  <li key={school} className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    {school}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 animate-fadeInUp">
              <div className="flex items-center mb-4">
                <Building2 className="w-6 h-6 text-orange-600 mr-2" />
                <h3 className="font-bold text-gray-900">Societies & Communities</h3>
              </div>
              <ul className="space-y-2">
                {area.societies.map((society) => (
                  <li key={society} className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    {society}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="quick-answers">
            <QuickAnswers locality={`${area.name}, Faridabad`} />
          </div>
        </div>
      </section>

      <NEETToolsWidget
        title={`Free NEET Tools for ${area.name} Students`}
        subtitle="Plan your NEET journey with our AI-powered tools - 100% Free"
        compact={true}
      />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Free NEET Biology Practice Tools
              </h2>
              <p className="text-gray-600">
                Access 19,600+ MCQs with 6 question types — chapter-wise practice, completely free
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/neet-biology-mcq"
                className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-green-100 hover:border-green-300 group"
              >
                <GraduationCap className="w-8 h-8 text-green-600 group-hover:text-green-700" />
                <span className="font-semibold text-gray-900 text-sm text-center">
                  MCQ Practice
                </span>
                <span className="text-xs text-green-600 font-medium">19,600+ Questions</span>
              </Link>
              <Link
                href="/neet-score-calculator"
                className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-green-100 hover:border-green-300 group"
              >
                <CheckCircle className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
                <span className="font-semibold text-gray-900 text-sm text-center">
                  Score Calculator
                </span>
                <span className="text-xs text-blue-600 font-medium">Instant Results</span>
              </Link>
              <Link
                href="/neet-rank-predictor"
                className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-green-100 hover:border-green-300 group"
              >
                <ArrowRight className="w-8 h-8 text-purple-600 group-hover:text-purple-700" />
                <span className="font-semibold text-gray-900 text-sm text-center">
                  Rank Predictor
                </span>
                <span className="text-xs text-purple-600 font-medium">AI-Powered</span>
              </Link>
              <Link
                href="/neet-college-predictor"
                className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-green-100 hover:border-green-300 group"
              >
                <Building2 className="w-8 h-8 text-orange-600 group-hover:text-orange-700" />
                <span className="font-semibold text-gray-900 text-sm text-center">
                  College Predictor
                </span>
                <span className="text-xs text-orange-600 font-medium">All India Colleges</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Courses for {area.name} Students
            </h2>
            <p className="text-lg text-gray-600">
              Choose the program that fits your preparation needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {faridabadCourseOptions.map((course, index) => (
              <div
                key={course.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
                  <h3 className="text-xl font-bold">{course.name}</h3>
                  <p className="text-sm opacity-90">{course.duration}</p>
                </div>
                <div className="p-6">
                  <div className="text-3xl font-bold text-orange-600 mb-4">{course.fee}</div>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/demo-booking">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Enroll Now</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 animate-fadeInUp">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Center Location</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  <strong>Address:</strong> Sector 17, Faridabad - 121002
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Landmark:</strong> Near Bata Chowk Metro Station (5 min walk)
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Distance from {area.name}:</strong> {area.distanceFromCenter}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Nearest Metro:</strong> Bata Chowk Metro (Violet Line)
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900">Why Students Love This Location:</h3>
                <ul className="space-y-2">
                  {[
                    'Heart of Faridabad - Central location',
                    'Violet Line Metro connectivity',
                    'Easy access from all sectors',
                    'Safe & secure campus',
                    'Affordable compared to Delhi coaching',
                  ].map((item) => (
                    <li key={item} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Students from {area.name} Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Expert AIIMS/JIPMER faculty',
              'Only premium NEET Biology-only coaching in Faridabad',
              'Flexible batch timings',
              'Online + Offline modes',
              'Small batch of 15-20 students',
              'Personal mentorship',
              'Regular assessments',
              'Parent-teacher meetings',
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fadeInUp"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />

      {nearbyAreas.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                NEET Coaching in Nearby Areas
              </h2>
              <p className="text-gray-600">
                Explore our coaching services in similar localities near {area.name}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyAreas.map((slug, index) => {
                const nearbyArea = faridabadAreaDetails[slug]
                if (!nearbyArea) return null
                return (
                  <div key={slug} className="animate-fadeInUp">
                    <Link
                      href={`/neet-coaching-faridabad/${slug}`}
                      className="block bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-orange-300 group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <MapPin className="w-5 h-5 text-orange-600" />
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-700">
                        {nearbyArea.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{nearbyArea.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {nearbyArea.highlights.slice(0, 2).map((h) => (
                          <span
                            key={h}
                            className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/neet-coaching-faridabad"
                className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium"
              >
                View All Faridabad Areas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your NEET Journey from {area.name}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of successful students from {area.name}. Book your free demo today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/neet-coaching-faridabad">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-slate-800"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Explore Other Areas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
