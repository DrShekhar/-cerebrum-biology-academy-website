'use client'

import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/city/RelatedCityLinks'
import { Globe, Clock, MapPin, Phone, Star, CheckCircle, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'

const westAfricaCountries = [
  { country: 'Nigeria', cities: 'Lagos, Abuja, Port Harcourt', indianPop: '50K+', schools: 'American Intl Lagos, Greensprings, AISL' },
  { country: 'Ghana', cities: 'Accra, Tema, Kumasi', indianPop: '10K+', schools: 'Ghana International School, Lincoln' },
  { country: 'Senegal', cities: 'Dakar', indianPop: '3K+', schools: 'International schools' },
  { country: 'Cameroon', cities: 'Douala, Yaounde', indianPop: '2K+', schools: 'International schools' },
]

export default function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-green-50">
      <CityBreadcrumb cityName="West Africa" />

      <section className="relative py-16 bg-gradient-to-r from-green-800 via-yellow-700 to-green-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>Serving Indian Families Across West Africa</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology Coaching for<br />
            <span className="text-yellow-200">West African Indian Students</span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-6">
            Nigeria | Ghana | Senegal | Cameroon
          </p>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Expert AIIMS faculty, WAT/GMT timezone classes, IGCSE/Cambridge bridge courses, complete NRI quota guidance.
          </p>
          <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20West%20Africa%20interested%20in%20NEET%20coaching" className="inline-flex bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold items-center gap-2 transition-colors">
            <Phone className="w-5 h-5" /> WhatsApp Us
          </Link>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 65K+ Indian Families</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 98% Success Rate</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> WAT/GMT Classes</span>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">West African Countries We Serve</h2>
        <div className="space-y-4">
          {westAfricaCountries.map((c, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
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
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Class Timings for West Africa</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 p-8 rounded-2xl text-center">
              <Clock className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">Nigeria (WAT, UTC+1)</h3>
              <p className="text-3xl font-bold text-yellow-700 my-2">11:30 AM - 3:30 PM</p>
              <p className="text-sm text-gray-500">Lagos, Abuja, Port Harcourt</p>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl text-center">
              <Clock className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">Ghana (GMT)</h3>
              <p className="text-3xl font-bold text-green-700 my-2">10:30 AM - 2:30 PM</p>
              <p className="text-sm text-gray-500">Accra, Tema, Kumasi</p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection cityName="West Africa" />
      <CostComparisonSection cityName="West Africa" />

      <section className="py-16 bg-gradient-to-r from-green-700 to-yellow-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from West Africa</h2>
          <p className="text-green-100 mb-8 text-lg">Join Indian students from Nigeria and Ghana preparing with expert AIIMS faculty.</p>
          <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20West%20Africa%20interested%20in%20NEET%20coaching" className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors">
            <Phone className="w-5 h-5" /> WhatsApp: +91-8826444334
          </Link>
        </div>
      </section>

      <RelatedCityLinks currentCity="West Africa" variant="default" />
    </div>
  )
}
