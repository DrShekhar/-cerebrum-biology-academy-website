'use client'

import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/city/RelatedCityLinks'
import {
  GraduationCap,
  Clock,
  Globe,
  MapPin,
  Phone,
  Star,
  CheckCircle,
  Users,
  BookOpen,
} from 'lucide-react'
import Link from 'next/link'

export default function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <CityBreadcrumb cityName="Sharjah" />

      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>500K+ Indian Residents in Sharjah</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best NEET Biology Coaching in<br />
            <span className="text-blue-200">Sharjah, UAE</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            Third largest Indian community in UAE. NEET exam center in Sharjah. Affordable living for families.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20Sharjah%20interested%20in%20NEET%20coaching" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <Phone className="w-5 h-5" /> WhatsApp Us
            </Link>
            <Link href="/pricing" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              View Pricing
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 98% Success Rate</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 695/720 Top Score</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> AIIMS Faculty</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 20+ CBSE Schools</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> NEET Exam Center</span>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">500K+</p>
            <p className="text-sm text-gray-500">Indian Community</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">20+</p>
            <p className="text-sm text-gray-500">CBSE Schools</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">2:30 PM</p>
            <p className="text-sm text-gray-500">Class Start Time</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">98%</p>
            <p className="text-sm text-gray-500">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Why Choose Cerebrum */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Why Sharjah Students Choose Cerebrum</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-blue-100 bg-blue-50">
              <GraduationCap className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AIIMS Faculty</h3>
              <p className="text-gray-600">Learn from doctors who studied at AIIMS Delhi. Real medical experience combined with expert teaching methodology.</p>
            </div>
            <div className="p-6 rounded-xl border border-green-100 bg-green-50">
              <Clock className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">GST (GMT+4) Friendly</h3>
              <p className="text-gray-600">Classes at 2:30 PM - 6:30 PM GST. Perfect timing after school hours. All sessions recorded for revision.</p>
            </div>
            <div className="p-6 rounded-xl border border-purple-100 bg-purple-50">
              <Globe className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">NRI Quota Expert</h3>
              <p className="text-gray-600">Complete guidance for NRI quota admissions. Documentation, counseling, and college selection support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing and Comparison */}
      <PricingSection cityName="Sharjah" />
      <CostComparisonSection cityName="Sharjah" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Sharjah</h2>
          <p className="text-blue-100 mb-8 text-lg">Join Indian students in Sharjah already preparing with expert AIIMS faculty. Book a free demo today.</p>
          <Link href="https://wa.me/918826444334?text=Hi%20I%20am%20from%20Sharjah%20interested%20in%20NEET%20coaching" className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors">
            <Phone className="w-5 h-5" /> WhatsApp: +91-8826444334
          </Link>
        </div>
      </section>

      <RelatedCityLinks currentCity="Sharjah" variant="default" />
    </div>
  )
}
