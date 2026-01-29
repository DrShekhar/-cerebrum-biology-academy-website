'use client'

import Link from 'next/link'
import {
  Phone,
  MapPin,
  Monitor,
  Users,
  Trophy,
  Train,
  MessageCircle,
  Clock,
  CheckCircle,
  ArrowRight,
  Building,
  Star,
  Zap,
  GraduationCap,
  Briefcase,
} from 'lucide-react'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface MetroData {
  name: string
  slug: string
  lines: string[]
  lineColors: string[]
  area: string
  description: string
  studentCount: string
  coordinates: { lat: string; lng: string }
  nearbyAreas: string[]
  nearestCenter: {
    name: string
    distance: string
    line: string
  }
  commuteDetails: { destination: string; time: string; line: string }[]
  faqs: { question: string; answer: string }[]
}

interface BotanicalGardenMetroContentProps {
  metroData: MetroData
}

export default function BotanicalGardenMetroContent({ metroData }: BotanicalGardenMetroContentProps) {
  const handleWhatsAppClick = (source: string, message: string) => {
    trackAndOpenWhatsApp({
      source,
      message,
      page: '/neet-coaching-botanical-garden-metro',
    })
  }

  const nearbyLocationPages = [
    { name: 'Noida Sector 18', href: '/biology-tutor-noida-sector-18' },
    { name: 'Noida Sector 62', href: '/biology-tutor-noida-sector-62' },
    { name: 'Greater Noida', href: '/biology-tutor-greater-noida' },
    { name: 'Noida Extension', href: '/biology-tutor-noida-extension' },
    { name: 'Online NEET Classes Noida', href: '/online-neet-classes-noida' },
    { name: 'NEET Coaching Noida', href: '/neet-coaching-noida' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Blue Line specific styling */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-pink-700 py-16 text-white lg:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-pink-400 opacity-10 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          {/* Metro Line Badges */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white">
              <Train className="h-4 w-4" />
              Blue Line
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-4 py-1.5 text-sm font-semibold text-white">
              <Train className="h-4 w-4" />
              Magenta Line
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            NEET Coaching Near{' '}
            <span className="text-blue-200">Botanical Garden Metro</span>
          </h1>

          <p className="mx-auto mb-6 max-w-3xl text-xl text-white/90">
            Biology Classes for Students in Noida. {metroData.studentCount} students
            enrolled from Sector 18, Sector 16, Amity University area & Greater Noida. Gateway to quality NEET preparation!
          </p>

          {/* Trust Badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <GraduationCap className="mr-2 h-5 w-5 text-blue-200" />
              <span className="text-sm font-medium">AIIMS Faculty</span>
            </div>
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <Star className="mr-2 h-5 w-5 text-blue-200" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <Trophy className="mr-2 h-5 w-5 text-blue-200" />
              <span className="text-sm font-medium">98% Success Rate</span>
            </div>
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <Briefcase className="mr-2 h-5 w-5 text-blue-200" />
              <span className="text-sm font-medium">Working Professional Batches</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleWhatsAppClick(
                'botanical-garden-metro-hero',
                "Hi! I'm near Botanical Garden Metro in Noida. I'm interested in NEET Biology coaching."
              )}
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </button>
            <Link
              href="/demo-booking"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-400 px-6 py-3 font-semibold text-white transition hover:bg-blue-300"
            >
              Book FREE Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={getPhoneLink()}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              {getDisplayPhone()}
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-blue-50 p-4 text-center">
              <Users className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <p className="text-2xl font-bold text-gray-900">{metroData.studentCount}</p>
              <p className="text-sm text-gray-600">Students Enrolled</p>
            </div>
            <div className="rounded-xl bg-green-50 p-4 text-center">
              <Monitor className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-600">Prefer Online Mode</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-4 text-center">
              <Trophy className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="rounded-xl bg-pink-50 p-4 text-center">
              <Train className="mx-auto mb-2 h-8 w-8 text-pink-600" />
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Metro Lines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metro Connectivity Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              <Train className="mb-2 inline h-8 w-8 text-blue-600" />
              <br />
              Metro Connectivity from Botanical Garden
            </h2>

            <p className="mb-8 text-center text-gray-600">{metroData.description}</p>

            <div className="grid gap-4 md:grid-cols-3">
              {metroData.commuteDetails.map((route, index) => (
                <div
                  key={index}
                  className="rounded-xl border-2 border-blue-100 bg-blue-50 p-4 text-center"
                >
                  <div className="mb-2 text-2xl font-bold text-blue-600">{route.time}</div>
                  <div className="font-medium text-gray-900">To {route.destination}</div>
                  <div className="text-sm text-gray-500">via {route.line}</div>
                </div>
              ))}
            </div>

            {/* Highlight - Gateway to Noida */}
            <div className="mt-8 rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-pink-50 p-6 text-center">
              <CheckCircle className="mx-auto mb-2 h-10 w-10 text-blue-600" />
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Gateway to Noida - Perfect for Online Learning!
              </h3>
              <p className="text-gray-600">
                Botanical Garden connects Blue Line (Delhi-Noida) and Magenta Line (South Delhi).
                For Noida students, our online live classes eliminate commute entirely - study from home with same quality AIIMS faculty teaching!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            <MapPin className="mb-2 inline h-6 w-6 text-blue-600" />
            <br />
            Areas We Serve Near Botanical Garden Metro
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {metroData.nearbyAreas.map((area, index) => (
              <span
                key={index}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
            Choose Your Learning Mode
          </h2>
          <p className="mb-12 text-center text-gray-600">
            85% of Noida students prefer online - save 2+ hours daily commute time!
          </p>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="relative rounded-2xl border-2 border-blue-300 bg-blue-50 p-6 shadow-md">
              <span className="absolute right-0 top-0 rounded-bl-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                MOST POPULAR
              </span>
              <Monitor className="mb-4 h-10 w-10 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold">100% Online</h3>
              <p className="mb-4 text-gray-600">Live classes from home. Best for Noida students.</p>
              <ul className="mb-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Live Zoom classes daily
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Save 2+ hours commute
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  WhatsApp doubt support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Recorded lectures 24/7
                </li>
              </ul>
              <p className="text-2xl font-bold text-blue-700">Rs 48,000/year</p>
            </div>

            <div className="rounded-2xl border-2 border-green-200 bg-white p-6 shadow-md">
              <Train className="mb-4 h-10 w-10 text-green-600" />
              <h3 className="mb-2 text-xl font-bold">Hybrid Mode</h3>
              <p className="mb-4 text-gray-600">Online + Weekend offline at South Extension.</p>
              <ul className="mb-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Weekday online classes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Weekend doubt sessions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  45 min to South Ext
                </li>
              </ul>
              <p className="text-2xl font-bold text-green-700">Rs 58,000/year</p>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-md">
              <Building className="mb-4 h-10 w-10 text-gray-600" />
              <h3 className="mb-2 text-xl font-bold">Full Offline</h3>
              <p className="mb-4 text-gray-600">Daily at South Extension center (45 min).</p>
              <ul className="mb-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-600" />
                  Classroom learning
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-600" />
                  Direct faculty access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-600" />
                  Peer learning
                </li>
              </ul>
              <p className="text-2xl font-bold text-gray-700">Rs 68,000/year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Working Professionals Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Briefcase className="mx-auto mb-4 h-12 w-12 text-blue-600" />
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              NEET Coaching for Working Professionals
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Many IT professionals from Noida Sector 62 and Sector 18 prepare for NEET with us.
              Our evening batch (7-9 PM) and weekend sessions are designed for your busy schedule.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <Clock className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <h3 className="font-semibold">Evening Batch</h3>
                <p className="text-sm text-gray-600">7 PM - 9 PM Daily</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <Monitor className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <h3 className="font-semibold">Recorded Lectures</h3>
                <p className="text-sm text-gray-600">Watch Anytime</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <MessageCircle className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                <h3 className="font-semibold">Doubt Support</h3>
                <p className="text-sm text-gray-600">7 AM - 11 PM WhatsApp</p>
              </div>
            </div>
            <button
              onClick={() => handleWhatsAppClick(
                'botanical-garden-working-professional',
                "Hi! I'm a working professional in Noida. I want to prepare for NEET. Please share details about evening batches."
              )}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <MessageCircle className="h-5 w-5" />
              Enquire About Evening Batch
            </button>
          </div>
        </div>
      </section>

      {/* Free NEET Tools */}
      <NEETToolsWidget
        title="Free NEET Tools for Noida Students"
        subtitle="Boost your preparation with our AI-powered tools - 100% Free"
      />

      {/* Nearby Location Pages */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Explore NEET Coaching in Nearby Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyLocationPages.map((location, index) => (
              <Link
                key={index}
                href={location.href}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm transition hover:bg-blue-50 hover:shadow-md"
              >
                {location.name} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Frequently Asked Questions - Botanical Garden Metro
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {metroData.faqs.map((faq, index) => (
              <details key={index} className="group rounded-lg bg-gray-50 shadow-md">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold hover:bg-gray-100">
                  {faq.question}
                  <span className="text-blue-600 transition-transform group-open:rotate-180">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-bold">
            <Zap className="mr-2 h-4 w-4" />
            Limited Seats for NEET 2026 Batch!
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Join {metroData.studentCount} Students from Botanical Garden Area
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            Start your medical journey with expert guidance from AIIMS faculty - Online classes perfect for Noida students!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleWhatsAppClick(
                'botanical-garden-metro-cta',
                "Hi! I'm near Botanical Garden Metro. I want to join NEET coaching."
              )}
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Now
            </button>
            <Link
              href="/demo-booking"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Book Free Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center text-white/80">
            <Clock className="mr-2 h-4 w-4" />
            <span className="text-sm">Available Mon-Sat, 7 AM - 9 PM</span>
          </div>
        </div>
      </section>
    </div>
  )
}
