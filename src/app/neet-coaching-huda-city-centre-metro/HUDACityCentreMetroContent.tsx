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

interface HUDACityCentreMetroContentProps {
  metroData: MetroData
}

export default function HUDACityCentreMetroContent({ metroData }: HUDACityCentreMetroContentProps) {
  const handleWhatsAppClick = (source: string, message: string) => {
    trackAndOpenWhatsApp({
      source,
      message,
      page: '/neet-coaching-huda-city-centre-metro',
    })
  }

  const nearbyLocationPages = [
    { name: 'Golf Course Road', href: '/neet-coaching-golf-course-road-gurgaon' },
    { name: 'Sohna Road', href: '/neet-coaching-sohna-road-gurgaon' },
    { name: 'South City Gurugram', href: '/neet-coaching-south-city-gurugram' },
    { name: 'DLF Gurugram', href: '/neet-coaching-dlf-gurgaon' },
    { name: 'Cyber City', href: '/neet-coaching-cyber-city-gurugram' },
    { name: 'MG Road Gurugram', href: '/neet-coaching-mg-road-gurugram' },
    { name: 'NEET Coaching Gurugram', href: '/neet-coaching-gurugram' },
    { name: 'Online NEET Classes Gurugram', href: '/online-neet-classes-gurugram' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Yellow Line specific styling */}
      <section className="relative bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700 py-16 text-white lg:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-amber-300 opacity-10 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          {/* Metro Line Badge */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-semibold text-yellow-900">
              <Train className="h-4 w-4" />
              Yellow Line Terminal
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
              <MapPin className="h-4 w-4" />
              Gateway to Gurugram
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            NEET Coaching Near{' '}
            <span className="text-yellow-200">HUDA City Centre Metro</span>
          </h1>

          <p className="mx-auto mb-6 max-w-3xl text-xl text-white/90">
            Biology Classes for Students in Gurugram. {metroData.studentCount} students
            enrolled from Cyber City, DLF Phases, MG Road, Golf Course Road & South City.
            Your gateway to quality NEET preparation!
          </p>

          {/* Trust Badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <GraduationCap className="mr-2 h-5 w-5 text-yellow-200" />
              <span className="text-sm font-medium">AIIMS Faculty</span>
            </div>
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <Star className="mr-2 h-5 w-5 text-yellow-200" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <Trophy className="mr-2 h-5 w-5 text-yellow-200" />
              <span className="text-sm font-medium">98% Success Rate</span>
            </div>
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <Briefcase className="mr-2 h-5 w-5 text-yellow-200" />
              <span className="text-sm font-medium">Working Professional Batches</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleWhatsAppClick(
                'huda-city-centre-metro-hero',
                "Hi! I'm near HUDA City Centre Metro in Gurugram. I'm interested in NEET Biology coaching."
              )}
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </button>
            <Link
              href="/demo-booking"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-300 px-6 py-3 font-semibold text-amber-900 transition hover:bg-yellow-200"
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
            <div className="rounded-xl bg-amber-50 p-4 text-center">
              <Users className="mx-auto mb-2 h-8 w-8 text-amber-600" />
              <p className="text-2xl font-bold text-gray-900">{metroData.studentCount}</p>
              <p className="text-sm text-gray-600">Students Enrolled</p>
            </div>
            <div className="rounded-xl bg-green-50 p-4 text-center">
              <Monitor className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <p className="text-2xl font-bold text-gray-900">80%</p>
              <p className="text-sm text-gray-600">Prefer Online Mode</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-4 text-center">
              <Trophy className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="rounded-xl bg-yellow-50 p-4 text-center">
              <Train className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
              <p className="text-2xl font-bold text-gray-900">30 min</p>
              <p className="text-sm text-gray-600">To Green Park</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metro Connectivity Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              <Train className="mb-2 inline h-8 w-8 text-amber-600" />
              <br />
              Metro Connectivity from HUDA City Centre
            </h2>

            <p className="mb-8 text-center text-gray-600">{metroData.description}</p>

            {/* Commute Time Comparisons */}
            <div className="grid gap-4 md:grid-cols-3">
              {metroData.commuteDetails.map((route, index) => (
                <div
                  key={index}
                  className="rounded-xl border-2 border-amber-100 bg-amber-50 p-4 text-center"
                >
                  <div className="mb-2 text-2xl font-bold text-amber-600">{route.time}</div>
                  <div className="font-medium text-gray-900">To {route.destination}</div>
                  <div className="text-sm text-gray-500">via {route.line}</div>
                </div>
              ))}
            </div>

            {/* Highlight - Gateway to Gurugram */}
            <div className="mt-8 rounded-xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 text-center">
              <CheckCircle className="mx-auto mb-2 h-10 w-10 text-amber-600" />
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Yellow Line Terminal - Gateway to Gurugram!
              </h3>
              <p className="text-gray-600">
                HUDA City Centre is the terminal station of Yellow Line, connecting all of Delhi Metro to Gurugram.
                For Gurugram students, our online live classes eliminate the Delhi commute entirely - study from home with same quality AIIMS faculty teaching!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            <MapPin className="mb-2 inline h-6 w-6 text-amber-600" />
            <br />
            Areas We Serve Near HUDA City Centre Metro
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
            80% of Gurugram students prefer online - save 1-2 hours daily commute to Delhi!
          </p>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="relative rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 shadow-md">
              <span className="absolute right-0 top-0 rounded-bl-lg bg-amber-600 px-3 py-1 text-xs font-bold text-white">
                MOST POPULAR
              </span>
              <Monitor className="mb-4 h-10 w-10 text-amber-600" />
              <h3 className="mb-2 text-xl font-bold">100% Online</h3>
              <p className="mb-4 text-gray-600">Live classes from home. Best for Gurugram students.</p>
              <ul className="mb-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  Live Zoom classes daily
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  Save 1-2 hours commute
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  WhatsApp doubt support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  Recorded lectures 24/7
                </li>
              </ul>
              <p className="text-2xl font-bold text-amber-700">Rs 48,000/year</p>
            </div>

            <div className="rounded-2xl border-2 border-green-200 bg-white p-6 shadow-md">
              <Train className="mb-4 h-10 w-10 text-green-600" />
              <h3 className="mb-2 text-xl font-bold">Hybrid Mode</h3>
              <p className="mb-4 text-gray-600">Online + Weekend offline at Green Park center.</p>
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
                  30 min to Green Park
                </li>
              </ul>
              <p className="text-2xl font-bold text-green-700">Rs 58,000/year</p>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-md">
              <Building className="mb-4 h-10 w-10 text-gray-600" />
              <h3 className="mb-2 text-xl font-bold">Full Offline</h3>
              <p className="mb-4 text-gray-600">Daily at Green Park center (30-45 min).</p>
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
      <section className="bg-gradient-to-r from-amber-50 to-yellow-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Briefcase className="mx-auto mb-4 h-12 w-12 text-amber-600" />
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              NEET Coaching for Working Professionals
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Many IT professionals from Cyber City, DLF Cyber Hub, and MG Road corporate parks prepare for NEET with us.
              Our evening batch (7-9 PM) and weekend sessions are designed for your busy schedule.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <Clock className="mx-auto mb-2 h-8 w-8 text-amber-600" />
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
                'huda-city-centre-working-professional',
                "Hi! I'm a working professional in Gurugram (Cyber City/DLF area). I want to prepare for NEET. Please share details about evening batches."
              )}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700"
            >
              <MessageCircle className="h-5 w-5" />
              Enquire About Evening Batch
            </button>
          </div>
        </div>
      </section>

      {/* DLF Residents Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              For DLF Phase 1-5 Residents
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border-2 border-amber-100 bg-amber-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Quick Metro Access</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                    DLF Phase 1-2: 5-8 min to HUDA City Centre Metro
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                    DLF Phase 3-4: 10-12 min to HUDA City Centre Metro
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                    DLF Phase 5: 12-15 min to HUDA City Centre Metro
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border-2 border-green-100 bg-green-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Recommended: Online Mode</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    85% of DLF students prefer online classes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    Same AIIMS faculty, same curriculum
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    Save 1-2 hours daily commute time
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => handleWhatsAppClick(
                  'huda-city-centre-dlf-resident',
                  "Hi! I'm from DLF Phase area in Gurugram. I'm interested in NEET Biology coaching. Please share details."
                )}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                Chat with DLF Student Coordinator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Free NEET Tools */}
      <NEETToolsWidget
        title="Free NEET Tools for Gurugram Students"
        subtitle="Boost your preparation with our AI-powered tools - 100% Free"
      />

      {/* Nearby Location Pages */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Explore NEET Coaching in Nearby Gurugram Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyLocationPages.map((location, index) => (
              <Link
                key={index}
                href={location.href}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-amber-600 shadow-sm transition hover:bg-amber-50 hover:shadow-md"
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
            Frequently Asked Questions - HUDA City Centre Metro
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {metroData.faqs.map((faq, index) => (
              <details key={index} className="group rounded-lg bg-gray-50 shadow-md">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold hover:bg-gray-100">
                  {faq.question}
                  <span className="text-amber-600 transition-transform group-open:rotate-180">
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
      <section className="bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-bold">
            <Zap className="mr-2 h-4 w-4" />
            Limited Seats for NEET 2026 Batch!
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Join {metroData.studentCount} Students from HUDA City Centre Area
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            Start your medical journey with expert guidance from AIIMS faculty - Online classes perfect for Gurugram students!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleWhatsAppClick(
                'huda-city-centre-metro-cta',
                "Hi! I'm near HUDA City Centre Metro in Gurugram. I want to join NEET coaching."
              )}
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Now
            </button>
            <Link
              href="/demo-booking"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-amber-700 transition hover:bg-amber-50"
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
