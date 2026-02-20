'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Train,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Clock,
  Building2,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NoidaAreaDetails, getNoidaAreaBySlug } from '@/data/noida-areas'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { trackPhoneCallConversion } from '@/lib/analytics/googleAdsConversions'

interface AreaPageContentProps {
  area: NoidaAreaDetails
  slug: string
  nearbyAreaSlugs: string[]
  aiCitationFacts: string[]
}

export function AreaPageContent({ area, slug, nearbyAreaSlugs, aiCitationFacts }: AreaPageContentProps) {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'noida-area-page',
      variantId: slug,
      pageType: 'location-area',
    })
  }, [slug])

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_noida', {
        event_category: 'conversion',
        event_label: `noida_${slug}`,
        value: 1,
      })
    }
  }

  const handlePhoneCall = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    await trackAndOpenWhatsApp({
      source: `noida-${slug}-page`,
      message: `Hi! I am from ${area.name}, Noida and interested in NEET Biology coaching.`,
      campaign: `noida-${slug}`,
    })
  }

  const metroLineColors: Record<string, string> = {
    Blue: 'bg-blue-600',
    Aqua: 'bg-cyan-500',
    Magenta: 'bg-pink-600',
    Multiple: 'bg-purple-600',
    None: 'bg-gray-400',
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/neet-coaching-noida" className="hover:text-blue-600">NEET Coaching Noida</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{area.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="max-w-4xl animate-fadeInUp"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${metroLineColors[area.metroLine]} text-white`}>
                {area.metroLine} Line Metro
              </span>
              <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-xs font-medium">
                {area.type.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Best <span className="text-yellow-300">NEET Biology Coaching</span> in {area.name}, Noida
            </h1>

            {/* AEO: Speakable intro for voice search */}
            <p id="speakable-intro" className="text-lg md:text-xl opacity-90 mb-6">
              {area.heroDescription}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {area.highlights.map((highlight, i) => (
                <span key={i} className="flex items-center bg-white/10 px-3 py-1 rounded-full text-sm">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                  {highlight}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking" onClick={handleDemoBooking}>
                <Button variant="secondary" size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <a href={`tel:${CONTACT_INFO.phone.primary}`} onClick={handlePhoneCall}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: {CONTACT_INFO.phone.display.primary}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Trophy, value: CEREBRUM_METRICS.successRateText, label: 'Success Rate' },
              { icon: Users, value: '15', label: 'Students/Batch' },
              { icon: Star, value: '4.9', label: 'Google Rating' },
              { icon: GraduationCap, value: '15+', label: 'Years Experience' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-white rounded-lg shadow-sm">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO: AI-Citable Facts Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Key Facts About NEET Coaching in {area.name}
          </h2>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <ul className="space-y-3">
              {aiCitationFacts.map((fact, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Metro & Location Info */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Metro Access */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Train className="w-6 h-6 mr-2 text-blue-600" />
                Metro Connectivity
              </h3>
              <div className="space-y-3">
                {area.nearbyMetro.map((metro, i) => (
                  <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className={`w-3 h-3 rounded-full ${metroLineColors[area.metroLine]} mr-3`} />
                    <span className="text-gray-700">{metro}</span>
                  </div>
                ))}
                <p className="text-sm text-gray-500 mt-2">
                  Distance from our Sector 62 center: {area.distanceFromCenter}
                </p>
              </div>
            </div>

            {/* Schools Served */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Building2 className="w-6 h-6 mr-2 text-green-600" />
                Schools We Serve
              </h3>
              <div className="flex flex-wrap gap-2">
                {area.schools.map((school, i) => (
                  <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    {school}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Societies Served */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Serving {area.name} Residents From
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {area.societies.map((society, i) => (
              <div key={i} className="p-4 bg-purple-50 rounded-lg text-center">
                <MapPin className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">{society}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free NEET Practice Tools */}
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
                href="/mcq"
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

      {/* Nearby Areas */}
      {nearbyAreaSlugs.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Also Serving Nearby Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyAreaSlugs.map((nearbySlug) => {
                const nearbyArea = getNoidaAreaBySlug(nearbySlug)
                if (!nearbyArea) return null
                return (
                  <Link
                    key={nearbySlug}
                    href={`/neet-coaching-noida/${nearbySlug}`}
                    className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900">{nearbyArea.name}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section id="speakable-contact" className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your NEET Journey from {area.name}?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join {CEREBRUM_METRICS.totalStudentsText} students. Book your free demo class today!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`tel:${CONTACT_INFO.phone.primary}`} onClick={handlePhoneCall}>
              <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-bold w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
            <Button
              size="xl"
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white font-bold w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
          </div>

          <p className="mt-6 text-sm text-blue-200">
            <Clock className="w-4 h-4 inline mr-1" />
            {CONTACT_INFO.hours.displayText}
          </p>
        </div>
      </section>
    </div>
  )
}
