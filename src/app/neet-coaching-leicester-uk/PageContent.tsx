'use client'

import Link from 'next/link'
import {
  Globe,
  Clock,
  GraduationCap,
  MapPin,
  CheckCircle,
  Phone,
  Calendar,
  BookOpen,
  Users,
} from 'lucide-react'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'

interface PageContentProps {
  faqs: Array<{ q: string; a: string }>
}

export default function PageContent({ faqs }: PageContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>Online NEET Biology for Leicester students</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology Coaching in
            <br />
            <span className="text-blue-200">Leicester, UK</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            Live online NEET Biology classes for Indian-origin students across Belgrave, Rushey
            Mead, Spinney Hills and Greater Leicester. A-Level + NEET dual preparation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link
              href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Leicester%20and%20want%20a%20free%20NEET%20Biology%20demo"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" /> WhatsApp for Free Demo
            </Link>
            <Link
              href="#pricing"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> GMT/BST live classes
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> A-Level dual prep
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Class 9–12 + droppers
            </span>
          </div>
        </div>
      </section>

      {/* Key context */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold">4:00 PM GMT</p>
            <p className="text-sm text-gray-500">Typical class start</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold">~95k</p>
            <p className="text-sm text-gray-500">Indian-origin in Leicester</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="text-lg font-bold">A-Level · IB</p>
            <p className="text-sm text-gray-500">Curricula supported</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-lg font-bold">Dubai / India</p>
            <p className="text-sm text-gray-500">Nearest NEET centres</p>
          </div>
        </div>
      </section>

      {/* Why Leicester */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Leicester students join Cerebrum
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-blue-100 bg-blue-50">
              <GraduationCap className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AIIMS-led Biology faculty</h3>
              <p className="text-gray-600">
                Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. Teaching aligned with
                NCERT and the NEET-UG pattern.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-green-100 bg-green-50">
              <BookOpen className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">A-Level + NEET dual prep</h3>
              <p className="text-gray-600">
                A-Level Biology and NEET Biology share most concepts. Our curriculum covers both
                simultaneously — one preparation, two exams.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-teal-100 bg-teal-50">
              <Globe className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">NRI quota guidance</h3>
              <p className="text-gray-600">
                Clarity on how the 15% NRI MBBS quota works in India — colleges, cut-offs, timeline.
                We do not provide visa or legal services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exam centre callout */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-8 border border-blue-100">
            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">NEET exam centre logistics</h3>
                <p className="text-gray-700 mb-3">
                  The NTA does not operate a NEET exam centre in the UK. Leicester students
                  typically fly to <strong>Dubai, Abu Dhabi or Sharjah</strong> (3 options in UAE,
                  ~7-hour flight) or to <strong>India</strong> to sit NEET-UG. We help students pick
                  the right centre during registration and plan the exam-day journey.
                </p>
                <p className="text-sm text-gray-500">
                  Note: NEET centre allocation is managed by the NTA and can change year to year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schools we support */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Leicester schools we support</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Indian-origin students from state comprehensives, grammar schools and colleges across
            the city join our Biology batches.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">State schools &amp; academies</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Rushey Mead Academy</li>
                  <li>Judgemeadow Community College</li>
                  <li>Beaumont Leys School</li>
                  <li>Sir Jonathan North Girls&apos; College</li>
                  <li>Soar Valley College</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Colleges &amp; sixth forms</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Wyggeston and Queen Elizabeth I College</li>
                  <li>Gateway College</li>
                  <li>Regent College</li>
                  <li>Leicester Grammar School</li>
                  <li>Beauchamp College</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">
              Any A-Level, IB, BTEC or GCSE track is fine — our Biology is NCERT-aligned and bridges
              to your school syllabus.
            </p>
          </div>
        </div>
      </section>

      {/* Class timings */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Class timings for Leicester</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekday Live Classes</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Leicester (GMT):</span> 4:00 PM – 6:30 PM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Leicester (BST):</span> 5:00 PM – 7:30 PM
              </p>
              <p className="text-gray-600 mt-4">After UK school hours; every session recorded.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekend Doubt Clearing</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Leicester (GMT):</span> 10:00 AM – 12:30 PM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Leicester (BST):</span> 11:00 AM – 1:30 PM
              </p>
              <p className="text-gray-600 mt-4">Sat &amp; Sun, optional attendance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <div id="pricing">
        <PricingSection cityName="Leicester" />
      </div>
      <CostComparisonSection cityName="Leicester" />

      {/* FAQ */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          FAQs — NEET coaching in Leicester, UK
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-xl border border-gray-200 p-6 open:shadow-md transition-shadow"
            >
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>{faq.q}</span>
                <span className="text-blue-600 group-open:rotate-45 transition-transform text-2xl">
                  +
                </span>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-100" />
          <h2 className="text-3xl font-bold mb-4">Book a free Biology demo from Leicester</h2>
          <p className="text-blue-100 mb-8 text-lg">
            See the teaching style before you decide. 45–60 minute live session with an AIIMS-led
            faculty.
          </p>
          <Link
            href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Leicester%20and%20want%20a%20free%20NEET%20Biology%20demo"
            className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors"
          >
            <Phone className="w-5 h-5" /> WhatsApp +91-8826444334
          </Link>
        </div>
      </section>

      <RelatedCityLinks currentCity="leicester" variant="default" />
    </div>
  )
}
