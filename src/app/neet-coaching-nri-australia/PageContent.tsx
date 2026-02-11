'use client'

import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import {
  GraduationCap,
  Clock,
  Globe,
  Users,
  BookOpen,
  MapPin,
  Phone,
  Star,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

const australiaCities = [
  { name: 'Sydney', state: 'NSW', indianPop: '200K+', timezone: 'AEST' },
  { name: 'Melbourne', state: 'VIC', indianPop: '250K+', timezone: 'AEST' },
  { name: 'Brisbane', state: 'QLD', indianPop: '80K+', timezone: 'AEST' },
  { name: 'Perth', state: 'WA', indianPop: '60K+', timezone: 'AWST' },
  { name: 'Adelaide', state: 'SA', indianPop: '40K+', timezone: 'ACST' },
  { name: 'Canberra', state: 'ACT', indianPop: '25K+', timezone: 'AEST' },
  { name: 'Parramatta', state: 'NSW', indianPop: '80K+', timezone: 'AEST' },
]

const stateBridgeTopics = [
  { state: 'NSW (HSC Biology)', topics: 'HSC Module 5-8 to NCERT mapping, heredity depth, ecosystem NEET alignment' },
  { state: 'VIC (VCE Biology)', topics: 'VCE Units 3-4 to NCERT bridge, molecular biology depth, plant physiology gap' },
  { state: 'QLD (Senior Biology)', topics: 'QCE Biology to NCERT curriculum bridge, genetics and evolution NEET focus' },
]

const whyAustraliaStudentsChooseNEET = [
  { title: 'High Competition', desc: 'Australian med schools are extremely competitive with limited seats.' },
  { title: 'Massive Cost Savings', desc: 'Indian MBBS costs AUD 30-80K total vs AUD 60K+ per year in Australia.' },
  { title: 'World-Class Colleges', desc: 'AIIMS, JIPMER, MAMC offer globally recognized medical education.' },
  { title: 'Growing Community', desc: '700K+ Indian Australians maintaining strong cultural and educational ties.' },
  { title: 'AMC Recognition', desc: 'Indian MBBS recognized by AMC. Practice in Australia after AMC exams.' },
  { title: 'NRI Quota Access', desc: '15% reserved NRI seats in 250+ private medical colleges across India.' },
]

export default function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-yellow-50">
      <CityBreadcrumb cityName="Australia NRI Students" />

      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-r from-green-700 via-green-600 to-yellow-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>Serving 700K+ Indian Australian Families</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology Coaching for<br />
            <span className="text-yellow-200">Australian NRI Students</span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-6">
            Sydney | Melbourne | Brisbane | Perth | Adelaide | Canberra
          </p>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Expert AIIMS faculty, AEST friendly timings, HSC/VCE/QCE curriculum bridge courses, and complete NRI quota admission guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20Australia%20interested%20in%20NEET%20coaching" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <Phone className="w-5 h-5" /> WhatsApp Us
            </Link>
            <Link href="/pricing" className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              View Pricing
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 25+ Australian Students</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 98% Success Rate</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 695/720 Top Score</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> AIIMS Faculty</span>
          </div>
        </div>
      </section>

      {/* Why Australian Students Choose NEET */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Why Indian-Australian Students Choose NEET</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          With Australian medical schools charging AUD 60K+ per year, NEET offers a proven, affordable alternative.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {whyAustraliaStudentsChooseNEET.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Australian Cities */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Australian Cities We Serve</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {australiaCities.map((city, i) => (
              <div key={i} className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <h3 className="font-bold">{city.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{city.state}</p>
                <p className="text-sm text-gray-500">Indian Community: {city.indianPop}</p>
                <p className="text-sm text-gray-500">Timezone: {city.timezone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State Curriculum Bridge */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">State Curriculum Bridge Courses</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          NSW HSC, VIC VCE, and QLD QCE biology curricula differ from NCERT. Our bridge modules fill every gap.
        </p>
        <div className="space-y-4">
          {stateBridgeTopics.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg mb-1">{item.state}</h3>
              <p className="text-gray-600">{item.topics}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Class Timings */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Class Timings for Australian Students</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">Eastern (AEST)</h3>
              <p className="text-2xl font-bold text-blue-600 my-2">9:30 PM - 1:30 AM</p>
              <p className="text-sm text-gray-500">Sydney, Melbourne, Brisbane</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">Western (AWST)</h3>
              <p className="text-2xl font-bold text-green-600 my-2">7:30 PM - 11:30 PM</p>
              <p className="text-sm text-gray-500">Perth</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">Weekend Batches</h3>
              <p className="text-2xl font-bold text-purple-600 my-2">Sat &amp; Sun Daytime</p>
              <p className="text-sm text-gray-500">All timezones, recorded access</p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection cityName="Australia" />
      <CostComparisonSection cityName="Australia" />

      {/* Testimonials */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Australian Students Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Arun Nair', city: 'Melbourne', score: '618/720', quote: 'Australian med school competition is intense. NEET gave me a clear pathway. The weekend batches worked perfectly!', college: 'AIIMS Delhi' },
            { name: 'Priya Sharma', city: 'Sydney', score: '602/720', quote: 'HSC Biology was different from NCERT. The bridge course was exactly what I needed. Now studying at a top college!', college: 'Maulana Azad Medical College' },
            { name: 'Vikash Reddy', city: 'Brisbane', score: '585/720', quote: 'Parents wanted me to experience Indian medical education. Cerebrum made the preparation seamless from Australia.', college: 'Grant Medical College' },
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-700 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t pt-3">
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.city} | Score: {t.score}</p>
                <p className="text-sm text-green-600">{t.college}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Australia</h2>
          <p className="text-green-100 mb-8 text-lg">Join 25+ Indian-Australian students already preparing with us. Book a free demo class today.</p>
          <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20Australia%20interested%20in%20NEET%20coaching" className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors">
            <Phone className="w-5 h-5" /> WhatsApp: +91-8826444334
          </Link>
        </div>
      </section>

      <RelatedCityLinks currentCity="Australia NRI" variant="default" />
    </div>
  )
}
