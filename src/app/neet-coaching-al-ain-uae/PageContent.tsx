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
            <span>Online NEET Biology for Al Ain students</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology Coaching in
            <br />
            <span className="text-blue-200">Al Ain, UAE</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            Live online NEET Biology classes designed for Indian students in Al Ain. Abu Dhabi NEET
            exam centre support. Class 9–12 plus droppers.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link
              href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Al%20Ain%20and%20want%20a%20free%20NEET%20Biology%20demo"
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
              <CheckCircle className="w-4 h-4" /> GST (UTC+4) live classes
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Abu Dhabi exam centre
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
            <p className="text-lg font-bold">4:00 PM GST</p>
            <p className="text-sm text-gray-500">Typical class start</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold">~140 km</p>
            <p className="text-sm text-gray-500">Al Ain → Abu Dhabi NEET centre</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="text-lg font-bold">CBSE · ICSE · IB</p>
            <p className="text-sm text-gray-500">Boards supported</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-lg font-bold">Small batches</p>
            <p className="text-sm text-gray-500">Live + recorded access</p>
          </div>
        </div>
      </section>

      {/* Why Al Ain students join */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Al Ain students join Cerebrum
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-blue-100 bg-blue-50">
              <GraduationCap className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AIIMS-led Biology faculty</h3>
              <p className="text-gray-600">
                Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. Teaching aligned with
                NCERT and NEET-UG pattern.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-green-100 bg-green-50">
              <Clock className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">GST (UTC+4) friendly</h3>
              <p className="text-gray-600">
                Live classes run after Al Ain school hours. Every session is recorded, so students
                who commute to Abu Dhabi never miss a class.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-teal-100 bg-teal-50">
              <Globe className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">NRI quota guidance</h3>
              <p className="text-gray-600">
                Academic prep plus clarity on how the 15% NRI MBBS quota works in India. We do not
                provide visa or legal services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exam logistics callout */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-8 border border-blue-100">
            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">NEET exam centre logistics</h3>
                <p className="text-gray-700 mb-3">
                  There is no NEET exam centre in Al Ain itself. Al Ain residents typically sit for
                  NEET-UG in <strong>Abu Dhabi</strong> (~140 km, ~1.5 hr drive), which is an
                  official NTA centre. Dubai and Sharjah are the other UAE centres. We help students
                  pick the right centre during registration and plan the exam-day journey.
                </p>
                <p className="text-sm text-gray-500">
                  Note: NEET centre allocation is managed by the NTA; availability can change year
                  to year. We share the current intake options with enrolled students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <div id="pricing">
        <PricingSection cityName="Al Ain" />
      </div>
      <CostComparisonSection cityName="Al Ain" />

      {/* FAQ */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          FAQs — NEET coaching in Al Ain, UAE
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
          <h2 className="text-3xl font-bold mb-4">Book a free Biology demo from Al Ain</h2>
          <p className="text-blue-100 mb-8 text-lg">
            See the teaching style before you decide. 45–60 minute live session with an AIIMS-led
            faculty.
          </p>
          <Link
            href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Al%20Ain%20and%20want%20a%20free%20NEET%20Biology%20demo"
            className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors"
          >
            <Phone className="w-5 h-5" /> WhatsApp +91-8826444334
          </Link>
        </div>
      </section>

      <RelatedCityLinks currentCity="alAin" variant="default" />
    </div>
  )
}
