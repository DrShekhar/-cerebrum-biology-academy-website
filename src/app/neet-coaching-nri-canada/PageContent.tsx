'use client'

import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/city/RelatedCityLinks'
import {
  GraduationCap,
  Clock,
  Globe,
  DollarSign,
  Users,
  BookOpen,
  MapPin,
  Phone,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const canadaCities = [
  { name: 'Toronto', province: 'Ontario', indianPop: '450K+', timezone: 'EST' },
  { name: 'Vancouver', province: 'British Columbia', indianPop: '200K+', timezone: 'PST' },
  { name: 'Brampton', province: 'Ontario', indianPop: '180K+', timezone: 'EST' },
  { name: 'Surrey', province: 'British Columbia', indianPop: '150K+', timezone: 'PST' },
  { name: 'Mississauga', province: 'Ontario', indianPop: '120K+', timezone: 'EST' },
  { name: 'Calgary', province: 'Alberta', indianPop: '80K+', timezone: 'MST' },
  { name: 'Edmonton', province: 'Alberta', indianPop: '60K+', timezone: 'MST' },
]

const provincialBridgeTopics = [
  { province: 'Ontario (Grade 11-12)', topics: 'SBI3U/SBI4U to NCERT mapping, human anatomy depth, plant physiology bridge' },
  { province: 'British Columbia', topics: 'Life Sciences 11/12 to NCERT alignment, genetics depth, ecology NEET focus' },
  { province: 'Alberta', topics: 'Biology 20/30 to NCERT curriculum bridge, taxonomy and classification gap' },
]

const whyCanadaStudentsChooseNEET = [
  { title: 'Extreme Competition', desc: 'Canadian med schools have 3-5% acceptance rate. NEET opens a wider pathway.' },
  { title: 'Cost Advantage', desc: 'Indian MBBS costs CAD 30-80K total vs CAD 15-25K per year in Canada.' },
  { title: 'Quality Education', desc: 'Top Indian medical colleges (AIIMS, JIPMER, MAMC) are world-renowned.' },
  { title: 'Cultural Connection', desc: '1.8M Indo-Canadians maintain strong ties with Indian education system.' },
  { title: 'Global Recognition', desc: 'Indian MBBS recognized by WHO, eligible for MCCQE pathway back to Canada.' },
  { title: 'NRI Quota Seats', desc: '15% reserved NRI seats in 250+ private medical colleges across India.' },
]

export default function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50">
      <CityBreadcrumb cityName="Canada NRI Students" />

      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>Serving 1.8M+ Indo-Canadian Families</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology Coaching for<br />
            <span className="text-red-200">Canadian NRI Students</span>
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-6">
            Toronto | Vancouver | Brampton | Surrey | Mississauga | Calgary | Edmonton
          </p>
          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
            Expert AIIMS faculty, EST/PST friendly timings, Ontario/BC/Alberta curriculum bridge courses, and complete NRI quota admission guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20Canada%20interested%20in%20NEET%20coaching" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <Phone className="w-5 h-5" /> WhatsApp Us
            </Link>
            <Link href="/pricing" className="bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              View Pricing
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 35+ Canadian Students</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 98% Success Rate</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 695/720 Top Score</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> AIIMS Faculty</span>
          </div>
        </div>
      </section>

      {/* Why Canadian Students Choose NEET */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Why Indo-Canadian Students Choose NEET</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          With Canadian medical schools accepting only 3-5% of applicants, NEET offers a proven alternative pathway to becoming a doctor.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {whyCanadaStudentsChooseNEET.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Canadian Cities We Serve */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Canadian Cities We Serve</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {canadaCities.map((city, i) => (
              <div key={i} className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <h3 className="font-bold">{city.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{city.province}</p>
                <p className="text-sm text-gray-500">Indian Community: {city.indianPop}</p>
                <p className="text-sm text-gray-500">Timezone: {city.timezone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provincial Curriculum Bridge */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Provincial Curriculum Bridge Courses</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          We understand that Ontario, BC, and Alberta biology curricula differ from NCERT. Our bridge modules fill every gap.
        </p>
        <div className="space-y-4">
          {provincialBridgeTopics.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-1">{item.province}</h3>
              <p className="text-gray-600">{item.topics}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Class Timings */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Class Timings for Canadian Students</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">Eastern Time (EST)</h3>
              <p className="text-2xl font-bold text-blue-600 my-2">6:30 AM - 10:30 AM</p>
              <p className="text-sm text-gray-500">Toronto, Brampton, Mississauga</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">Pacific Time (PST)</h3>
              <p className="text-2xl font-bold text-green-600 my-2">3:30 AM - 7:30 AM</p>
              <p className="text-sm text-gray-500">Vancouver, Surrey</p>
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

      {/* Pricing + Cost Comparison */}
      <PricingSection cityName="Canada" />
      <CostComparisonSection cityName="Canada" />

      {/* Testimonials */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Canadian Students Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Aryan Singh', city: 'Brampton', score: '608/720', quote: 'Getting into Canadian med school is nearly impossible. NEET offered a clear path to becoming a doctor. Cerebrum made it achievable!', college: 'Seth GS Medical College' },
            { name: 'Neha Kumar', city: 'Surrey', score: '595/720', quote: 'BC curriculum to NCERT bridge course was essential. Early morning classes before school worked perfectly.', college: 'Grant Medical College' },
            { name: 'Vikram Patel', city: 'Toronto', score: '578/720', quote: 'Weekend batches allowed me to balance high school and NEET prep. NRI quota made admission smoother.', college: 'B.J. Medical College' },
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
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Canada</h2>
          <p className="text-red-100 mb-8 text-lg">Join 35+ Indo-Canadian students already preparing with us. Book a free demo class today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20Canada%20interested%20in%20NEET%20coaching" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-colors">
              <Phone className="w-5 h-5" /> WhatsApp: +91-8826444334
            </Link>
          </div>
        </div>
      </section>

      <RelatedCityLinks currentCity="Canada NRI" variant="default" />
    </div>
  )
}
