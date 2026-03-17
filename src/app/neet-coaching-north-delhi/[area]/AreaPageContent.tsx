'use client'

import Link from 'next/link'
import {
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Play,
  Target,
  Building2,
  Train,
  ChevronRight,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NorthDelhiAreaDetails, courseOptions, areaDetails } from '@/data/north-delhi-areas'
import { HowToReachSection } from '@/components/seo/HowToReachSection'
import { AreaTestimonials } from '@/components/testimonials/AreaTestimonials'

function getNearbyAreas(currentSlug: string, currentType: string): string[] {
  const typeMapping: Record<string, string[]> = {
    posh: ['pitampura', 'model-town', 'shalimar-bagh'],
    residential: ['rohini', 'shalimar-bagh', 'ashok-vihar', 'kingsway-camp', 'adarsh-nagar', 'prashant-vihar'],
    commercial: ['kamla-nagar', 'wazirpur', 'mukherjee-nagar'],
    'coaching-hub': ['gtb-nagar', 'mukherjee-nagar', 'kamla-nagar'],
  }
  const sameType = typeMapping[currentType] || []
  return sameType.filter((slug) => slug !== currentSlug && areaDetails[slug]).slice(0, 4)
}

interface AreaPageContentProps {
  area: NorthDelhiAreaDetails
  areaSlug: string
}

export default function AreaPageContent({ area, areaSlug }: AreaPageContentProps) {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', `demo_booking_${areaSlug}`, {
        event_category: 'conversion',
        event_label: `neet_coaching_north_delhi_${areaSlug}`,
        value: 1,
      })
    }
  }

  const nearbyAreas = getNearbyAreas(areaSlug, area.type)

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li className="flex items-center">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center">
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/neet-coaching-north-delhi" className="text-gray-600 hover:text-indigo-600 transition-colors">
                NEET Coaching North Delhi
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-indigo-700 font-medium">{area.name}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-indigo-300" />
              {area.fullName}
            </div>

            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-indigo-300">NEET Coaching in {area.name}</span>
            </h1>

            <p className="hero-description text-lg md:text-xl opacity-90 mb-4">{area.description}</p>

            <p className="text-md opacity-80 mb-8 max-w-4xl mx-auto">{area.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-indigo-500 text-white hover:bg-indigo-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-indigo-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {area.highlights.map((highlight) => (
                <span key={highlight} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metro & Landmarks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 animate-fadeInUp">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Train className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg">Nearest Metro Stations</h3>
              </div>
              <ul className="space-y-2">
                {area.nearbyMetro.map((metro) => (
                  <li key={metro} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-indigo-500" />
                    {metro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 animate-fadeInUp">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">Key Landmarks</h3>
              </div>
              <ul className="space-y-2">
                {area.landmarks.map((landmark) => (
                  <li key={landmark} className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {landmark}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 animate-fadeInUp">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg">Top Schools Nearby</h3>
              </div>
              <ul className="space-y-2">
                {area.schools.map((school) => (
                  <li key={school} className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-orange-500" />
                    {school}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cerebrum Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why Students from {area.name} Choose Cerebrum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Better results with personalized attention and AIIMS faculty
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Small Batches', desc: '15-20 students per batch for personal attention' },
              { icon: GraduationCap, title: 'AIIMS Faculty', desc: 'Doctors from AIIMS/MAMC as teachers' },
              { icon: Trophy, title: '98% Success', desc: 'Highest success rate in Delhi NCR' },
              { icon: Target, title: 'Result Oriented', desc: 'Focus on NEET marks, not attendance' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 text-center shadow-sm animate-fadeInUp">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              NEET Courses for {area.name} Students
            </h2>
            <p className="text-gray-600">Choose the program that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courseOptions.map((course) => (
              <div
                key={course.name}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-indigo-300 transition-colors animate-fadeInUp"
              >
                <h3 className="font-semibold text-xl text-navy-900 mb-2">{course.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-4">{course.fee}</div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-indigo-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/demo-booking">
                  <Button variant="primary" className="w-full">Enquire Now</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Reach from {area.name}</h2>
            <p className="text-gray-300">Easy connectivity via Metro</p>
          </div>

          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">By Metro</h3>
                  <p className="text-gray-300">
                    Take Yellow Line from {area.nearbyMetro[0]} to Green Park or AIIMS. Our center
                    is just 5 minutes walk from Green Park Metro.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Travel Time</h3>
                  <p className="text-gray-300">
                    Approximately 35-45 minutes from {area.name} via Metro. Direct connectivity on
                    Yellow Line makes commute convenient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      {nearbyAreas.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">NEET Coaching in Nearby Areas</h2>
              <p className="text-gray-600">Explore our coaching services in similar localities near {area.name}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyAreas.map((slug) => {
                const nearbyArea = areaDetails[slug]
                if (!nearbyArea) return null
                return (
                  <div key={slug} className="animate-fadeInUp">
                    <Link
                      href={`/neet-coaching-north-delhi/${slug}`}
                      className="block bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-300 group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-700">{nearbyArea.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{nearbyArea.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {nearbyArea.highlights.slice(0, 2).map((h) => (
                          <span key={h} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">{h}</span>
                        ))}
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-8">
              <Link href="/neet-coaching-north-delhi" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                View All North Delhi Areas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Pages - Cross Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/neet-coaching-north-delhi" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors">
              NEET Coaching North Delhi
            </Link>
            <Link href="/biology-tutor" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors">
              Biology Tutor Delhi
            </Link>
            <Link href="/locations/delhi" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors">
              All Delhi Locations
            </Link>
            <Link href="/neet-coaching-south-delhi" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors">
              NEET Coaching South Delhi
            </Link>
          </div>
        </div>
      </section>

      <AreaTestimonials
        citySlug="north-delhi"
        areaName={area.name}
        cityName="North Delhi"
      />

      <HowToReachSection
        areaName={area.name}
        citySlug="north-delhi"
        nearbyMetro={area.nearbyMetro}
        distanceFromCenter="35-45 min by Metro"
        landmarks={area.landmarks}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your NEET Preparation?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join successful students from {area.name}. Visit our nearest center at Rohini and book your FREE demo class today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demo-booking">Book FREE Demo Class</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600"
                asChild
              >
                <a href="tel:+918826444334">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: 8826-444-334
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
