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
import { USABOPathwayCallout } from '@/components/seo/USABOPathwayCallout'

interface PageContentProps {
  faqs: Array<{ q: string; a: string }>
}

export default function PageContent({ faqs }: PageContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <section className="relative py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>Online NEET Biology for Atlanta students</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology Coaching in
            <br />
            <span className="text-blue-200">Atlanta, USA</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            Live online NEET Biology classes for Indian-American students across Johns Creek,
            Alpharetta, Duluth, Suwanee and Greater Atlanta. AP Biology + NEET dual prep.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link
              href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Atlanta%20and%20want%20a%20free%20NEET%20Biology%20demo"
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
              <CheckCircle className="w-4 h-4" /> EST/EDT live classes
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> AP Bio dual prep
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
            <p className="text-lg font-bold">10:30 AM EST</p>
            <p className="text-sm text-gray-500">Typical class start</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold">~150k</p>
            <p className="text-sm text-gray-500">Indian-American in Atlanta metro</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="text-lg font-bold">AP · IB · Honors</p>
            <p className="text-sm text-gray-500">Curricula supported</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-lg font-bold">Dubai / India</p>
            <p className="text-sm text-gray-500">Nearest NEET centres</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Atlanta students join Cerebrum
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-blue-100 bg-blue-50">
              <GraduationCap className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AIIMS-led Biology faculty</h3>
              <p className="text-gray-600">
                Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. NCERT-aligned teaching
                tuned to NEET-UG.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-green-100 bg-green-50">
              <BookOpen className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AP Bio + NEET dual prep</h3>
              <p className="text-gray-600">
                Cell biology, genetics, physiology, ecology overlap between AP and NEET. One
                preparation, two exams.
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

      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-8 border border-blue-100">
            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">NEET exam centre logistics</h3>
                <p className="text-gray-700 mb-3">
                  The NTA does not operate a NEET exam centre inside the United States. Atlanta
                  students typically fly from <strong>ATL to Dubai</strong> (official NEET centre)
                  or <strong>to India</strong> to sit NEET-UG. We help students plan registration,
                  pick the exam city, and schedule travel.
                </p>
                <p className="text-sm text-gray-500">
                  Note: NTA publishes overseas exam cities each year. Availability can change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Atlanta-area schools we support</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Indian-American students from North Fulton, Forsyth and Gwinnett schools with the
            densest Indian-American populations.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  North Fulton (Alpharetta / Johns Creek)
                </h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Alpharetta High School</li>
                  <li>Milton High School</li>
                  <li>Northview High School (Johns Creek)</li>
                  <li>Chattahoochee High School</li>
                  <li>Cambridge High School</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Forsyth / Gwinnett</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Lambert High School (Suwanee)</li>
                  <li>South Forsyth HS &amp; West Forsyth HS</li>
                  <li>Mill Creek High School</li>
                  <li>Collins Hill High School</li>
                  <li>Duluth High School &amp; Peachtree Ridge HS</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">
              Any Georgia high school curriculum (AP, IB, on-level) is fine — NEET is NCERT-based.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Class timings for Atlanta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekday Live Classes</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Atlanta (EST):</span> 10:30 AM – 1:00 PM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Atlanta (EDT):</span> 11:30 AM – 2:00 PM
              </p>
              <p className="text-gray-600 mt-4">Every session recorded.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekend Doubt Clearing</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Atlanta (EST):</span> 9:00 AM – 12:00 PM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Atlanta (EDT):</span> 10:00 AM – 1:00 PM
              </p>
              <p className="text-gray-600 mt-4">Sat &amp; Sun, optional attendance.</p>
            </div>
          </div>
        </div>
      </section>

      <div id="pricing">
        <PricingSection cityName="Atlanta" />
      </div>
      <CostComparisonSection cityName="Atlanta" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          FAQs — NEET coaching in Atlanta, USA
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

      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-100" />
          <h2 className="text-3xl font-bold mb-4">Book a free Biology demo from Atlanta</h2>
          <p className="text-blue-100 mb-8 text-lg">
            See the teaching style before you decide. 45–60 minute live session with an AIIMS-led
            faculty.
          </p>
          <Link
            href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Atlanta%20and%20want%20a%20free%20NEET%20Biology%20demo"
            className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors"
          >
            <Phone className="w-5 h-5" /> WhatsApp +91-8826444334
          </Link>
        </div>
      </section>

      <USABOPathwayCallout
        cityName="Atlanta + suburbs"
        schools={['Walton HS', 'Roswell HS', 'Alpharetta HS', 'Northview HS']}
      />

      <RelatedCityLinks currentCity="atlanta" variant="default" />
    </div>
  )
}
