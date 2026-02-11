'use client'

import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/city/RelatedCityLinks'
import { Globe, Clock, MapPin, Phone, Star, CheckCircle, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'

const eastAfricaCountries = [
  { country: 'Kenya', cities: 'Nairobi, Mombasa', indianPop: '80K+', schools: 'Aga Khan, Brookhouse, Braeburn' },
  { country: 'Tanzania', cities: 'Dar es Salaam, Arusha', indianPop: '50K+', schools: 'IST, Aga Khan Dar, Diamond Jubilee' },
  { country: 'Uganda', cities: 'Kampala, Entebbe', indianPop: '30K+', schools: 'Aga Khan Kampala, ISU, Delhi Public School' },
  { country: 'Rwanda', cities: 'Kigali', indianPop: '5K+', schools: 'Green Hills, Riviera' },
  { country: 'Ethiopia', cities: 'Addis Ababa', indianPop: '8K+', schools: 'Indian Community School' },
]

export default function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      <CityBreadcrumb cityName="East Africa" />

      <section className="relative py-16 bg-gradient-to-r from-orange-700 via-green-700 to-orange-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>Serving Indian Families Across East Africa</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology Coaching for<br />
            <span className="text-yellow-200">East African Indian Students</span>
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-6">
            Kenya | Tanzania | Uganda | Rwanda | Ethiopia
          </p>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto mb-8">
            Expert AIIMS faculty, EAT timezone classes, IGCSE/Cambridge bridge courses, and complete NRI quota admission guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20East%20Africa%20interested%20in%20NEET%20coaching" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <Phone className="w-5 h-5" /> WhatsApp Us
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 170K+ Indian Families</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 98% Success Rate</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> EAT Timezone Classes</span>
          </div>
        </div>
      </section>

      {/* Countries Served */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">East African Countries We Serve</h2>
        <div className="space-y-4">
          {eastAfricaCountries.map((c, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow border-l-4 border-orange-500">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-xl">{c.country}</h3>
                  <p className="text-gray-600 flex items-center gap-1"><MapPin className="w-4 h-4" /> {c.cities}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500"><Users className="w-4 h-4 inline" /> Indian Pop: {c.indianPop}</p>
                  <p className="text-sm text-gray-500"><BookOpen className="w-4 h-4 inline" /> {c.schools}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timings */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Class Timings for East Africa</h2>
          <div className="bg-orange-50 p-8 rounded-2xl">
            <Clock className="w-10 h-10 text-orange-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-orange-700">4:30 PM - 8:30 PM EAT</p>
            <p className="text-gray-600 mt-2">East Africa Time (UTC+3) = 5:00 PM - 9:00 PM IST</p>
            <p className="text-gray-500 mt-1">Same timezone for Kenya, Tanzania, Uganda, Ethiopia</p>
            <p className="text-sm text-gray-400 mt-3">Weekend batches also available | All classes recorded</p>
          </div>
        </div>
      </section>

      <PricingSection cityName="East Africa" />
      <CostComparisonSection cityName="East Africa" />


      {/* Testimonials */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Students Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Aarav Patel', city: 'Nairobi, Kenya', score: '612/720', quote: 'From Aga Khan Academy Nairobi to AIIMS. The IGCSE to NCERT bridge course was essential for my preparation.', college: 'AIIMS Delhi' },
            { name: 'Riya Shah', city: 'Dar es Salaam', score: '595/720', quote: 'EAT timezone classes at 4:30 PM were perfect. Cerebrum made quality NEET coaching accessible from Tanzania.', college: 'Seth GS Medical College' },
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
      <section className="py-16 bg-gradient-to-r from-orange-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from East Africa</h2>
          <p className="text-orange-100 mb-8 text-lg">Join Indian students from Kenya, Tanzania and Uganda preparing with expert AIIMS faculty.</p>
          <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20East%20Africa%20interested%20in%20NEET%20coaching" className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors">
            <Phone className="w-5 h-5" /> WhatsApp: +91-8826444334
          </Link>
        </div>
      </section>

      <RelatedCityLinks currentCity="East Africa" variant="default" />
    </div>
  )
}
