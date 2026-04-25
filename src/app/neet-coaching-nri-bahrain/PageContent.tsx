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

const faqs = [
  {
    q: 'Is there a NEET exam centre in Bahrain?',
    a: 'Yes. Manama is one of the 14 official NTA overseas NEET exam centres. Bahrain-based candidates can sit NEET-UG locally without flying to India or another GCC country.',
  },
  {
    q: 'Why would an Indian student in Bahrain take NEET?',
    a: 'NEET qualifies students for MBBS/BDS admission in Indian medical colleges, including the 15% NRI quota seats. Indian families in Bahrain commonly pursue this pathway.',
  },
  {
    q: 'What are typical class timings for Bahrain students?',
    a: 'Live classes run on AST (UTC+3), typically 4:00–6:30 PM Bahrain time — after school hours. Every session is recorded.',
  },
  {
    q: 'Which schools in Bahrain do you support?',
    a: 'CBSE and ICSE students from Indian School Bahrain (12k+ students), New Indian School, Asian School Bahrain, Bahrain Indian School, and all Indian-curriculum schools across Manama and Riffa.',
  },
  {
    q: 'Do you provide visa or immigration services?',
    a: 'No. We are an academic coaching institute only. Visa, immigration, or legal matters should be handled by your family, school, or licensed consultants.',
  },
  {
    q: 'What about the NRI quota for Indian MBBS admissions?',
    a: 'We help you understand which Indian colleges offer NRI seats, typical NEET cut-offs, and broad admission timelines. We are not an admissions consultancy.',
  },
]

export default function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <section className="relative py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Globe className="w-4 h-4" />{' '}
            <span>Online NEET Biology for Indian students in Bahrain</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology Coaching for
            <br />
            <span className="text-blue-200">Indian Students in Bahrain</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            Live online classes for Indian families across Manama, Riffa, Muharraq, Isa Town. Manama
            is an official NEET exam centre.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link
              href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Bahrain%20and%20want%20a%20free%20NEET%20Biology%20demo"
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
              <CheckCircle className="w-4 h-4" /> AST (UTC+3) live classes
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Manama NEET exam centre
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Class 9–12 + droppers
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold">4:00 PM AST</p>
            <p className="text-sm text-gray-500">Typical class start</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold">~350k</p>
            <p className="text-sm text-gray-500">Indian community in Bahrain</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="text-lg font-bold">CBSE · ICSE</p>
            <p className="text-sm text-gray-500">Boards supported</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-lg font-bold">Manama</p>
            <p className="text-sm text-gray-500">Official NEET centre</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Bahrain students join Cerebrum
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-blue-100 bg-blue-50">
              <GraduationCap className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AIIMS-led Biology faculty</h3>
              <p className="text-gray-600">
                Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. NCERT-aligned, NEET-UG
                tuned.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-green-100 bg-green-50">
              <Clock className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AST (UTC+3) friendly</h3>
              <p className="text-gray-600">
                Live classes run after Bahrain school hours. Every session is recorded for revision.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-teal-100 bg-teal-50">
              <Globe className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">NRI quota guidance</h3>
              <p className="text-gray-600">
                Clarity on how the 15% NRI MBBS quota works in India. We do not provide visa or
                legal services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Bahrain coverage — city page</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Dedicated local page with specific school lists and community anchors:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 max-w-xl mx-auto">
            <Link
              href="/neet-coaching-bahrain"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-200"
            >
              <p className="font-bold text-lg text-blue-700">Bahrain (Manama)</p>
              <p className="text-sm text-gray-500 mt-1">
                Official NEET exam centre, Indian School Bahrain
              </p>
            </Link>
          </div>
        </div>
      </section>

      <div id="pricing">
        <PricingSection cityName="Bahrain" />
      </div>
      <CostComparisonSection cityName="Bahrain" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">FAQs — NEET coaching in Bahrain</h2>
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

      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-100" />
          <h2 className="text-3xl font-bold mb-4">Book a free Biology demo from Bahrain</h2>
          <p className="text-blue-100 mb-8 text-lg">
            45–60 minute live session with an AIIMS-led faculty. No payment required.
          </p>
          <Link
            href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Bahrain%20and%20want%20a%20free%20NEET%20Biology%20demo"
            className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors"
          >
            <Phone className="w-5 h-5" /> WhatsApp +91-8826444334
          </Link>
        </div>
      </section>
    </div>
  )
}
