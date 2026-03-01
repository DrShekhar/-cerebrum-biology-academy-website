'use client'

import { useEffect } from 'react'
import {
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  Star,
  Users,
  Trophy,
  CheckCircle2,
  Navigation,
  Train,
  Car,
  Building2,
  ArrowRight,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { trackPhoneCallConversion } from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import Link from 'next/link'
import { getAllNoidaAreaSlugs, getNoidaAreaBySlug, getNoidaAreasByMetroLine } from '@/data/noida-areas'

export default function NoidaLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'noida',
      pageType: 'location',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    await trackAndOpenWhatsApp({
      source: 'noida-location-page',
      message: 'Hi! I am from Noida and interested in NEET Biology coaching.',
      campaign: 'location-noida',
    })
  }

  const handleGetDirections = () => {
    window.open(CONTACT_INFO.location.noida.mapUrl, '_blank')
  }

  const nearbyAreas = [
    'Sector 62',
    'Sector 63',
    'Sector 18',
    'Sector 15',
    'Sector 16',
    'Sector 50',
    'Sector 51',
    'Sector 52',
    'Noida City Centre',
    'Electronic City',
    'Film City',
    'Botanical Garden',
    'Greater Noida',
    'Noida Extension',
    'Crossing Republik',
    'Indirapuram',
    'Vaishali',
    'Vasundhara',
    'Ghaziabad',
    'Mayur Vihar',
  ]

  const faqs = [
    {
      q: 'Where is Cerebrum Biology Academy located in Noida?',
      a: `Our center is located at ${CONTACT_INFO.location.noida.streetAddress}, ${CONTACT_INFO.location.noida.addressLocality}. We are near Sector 62 Metro Station.`,
    },
    {
      q: 'Do you offer offline classes in Noida?',
      a: 'Yes, we offer both offline classroom coaching at our Noida center and online live classes. Students can choose based on their preference.',
    },
    {
      q: 'What is the batch size at your Noida center?',
      a: 'We maintain small batches of maximum 15 students to ensure personalized attention for every NEET aspirant.',
    },
    {
      q: 'Is your Noida center accessible from Greater Noida?',
      a: 'Yes! Students from Greater Noida and Noida Extension can easily reach us via the Aqua Line Metro or by road.',
    },
    {
      q: 'What are the class timings at the Noida center?',
      a: `We operate ${CONTACT_INFO.hours.displayText}. We offer morning and evening batches to accommodate school schedules.`,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Map */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Location Info */}
            <div className="space-y-6 animate-fadeInUp"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/40 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">Noida Center</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                NEET Biology Coaching in <span className="text-yellow-400">Noida</span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                Premier NEET Biology coaching by AIIMS faculty in Noida&apos;s IT hub. Small batches
                of 15 students, personalized attention, 98% success rate. Perfect for students from
                Noida, Greater Noida & Ghaziabad!
              </p>

              {/* Address Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <p className="font-medium">{CONTACT_INFO.location.noida.streetAddress}</p>
                      <p className="text-gray-300">
                        {CONTACT_INFO.location.noida.addressLocality},{' '}
                        {CONTACT_INFO.location.noida.addressRegion} -{' '}
                        {CONTACT_INFO.location.noida.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <p>{CONTACT_INFO.hours.displayText}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <p>{CONTACT_INFO.phone.display.primary}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetDirections}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Get Directions</span>
                </button>

                <a
                  href={`tel:${CONTACT_INFO.phone.primary}`}
                  onClick={handleCallNow}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-slate-900 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </a>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Right - Map Embed */}
            <div className="h-[400px] rounded-2xl overflow-hidden shadow-2xl animate-fadeInUp"
            >
              <LazyGoogleMap
                embedUrl={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d${CONTACT_INFO.location.noida.geo.longitude}!3d${CONTACT_INFO.location.noida.geo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzQxLjAiTiA3N8KwMjEnNTMuNiJF!5e0!3m2!1sen!2sin!4v1234567890`}
                title="Noida NEET Coaching Center"
                height={400}
                placeholder={{
                  lat: CONTACT_INFO.location.noida.geo.latitude,
                  lng: CONTACT_INFO.location.noida.geo.longitude,
                  address: `${CONTACT_INFO.location.noida.streetAddress}, ${CONTACT_INFO.location.noida.addressLocality}`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* How to Reach */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            How to Reach Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Train className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">By Metro</h3>
              <p className="text-gray-600">
                Nearest metro station: <strong>Sector 62</strong> (Blue Line). We are 5 minutes walk
                from the station. Also accessible from Noida City Centre.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">By Car</h3>
              <p className="text-gray-600">
                Located in <strong>Sector 62</strong>, well connected via Noida Expressway.
                Dedicated parking available for students and parents.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Landmarks</h3>
              <p className="text-gray-600">
                Near <strong>Electronic City</strong> and NSEZ. Close to major IT companies. Look
                for our signboard at the entrance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Noida Center */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose Our Noida Center?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Small Batches',
                description: 'Maximum 15 students per batch for personalized attention',
              },
              {
                icon: Trophy,
                title: '90% Success Rate',
                description: 'Proven track record of NEET selections from Noida',
              },
              {
                icon: Star,
                title: 'AIIMS Faculty',
                description: 'Learn from faculty trained at AIIMS New Delhi',
              },
              {
                icon: MapPin,
                title: 'NCR Coverage',
                description: 'Serves Noida, Greater Noida, Ghaziabad & East Delhi',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all animate-fadeInUp"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas We Serve - Enhanced with Links */}
      <div className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Areas We Serve from Noida
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Students from {getAllNoidaAreaSlugs().length}+ areas join our NEET Biology coaching.
            Click on your area to see local coaching information:
          </p>

          {/* Blue Line Metro Areas */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center justify-center">
              <Train className="w-4 h-4 mr-1" /> Blue Line Metro Areas
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {getNoidaAreasByMetroLine('Blue').map((slug) => {
                const area = getNoidaAreaBySlug(slug)
                if (!area) return null
                return (
                  <Link
                    key={slug}
                    href={`/neet-coaching-noida/${slug}`}
                    className="px-3 py-1 bg-white rounded-full text-blue-700 text-sm font-medium shadow-sm border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    {area.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Aqua Line Metro Areas */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-cyan-800 mb-3 flex items-center justify-center">
              <Train className="w-4 h-4 mr-1" /> Aqua Line Metro Areas
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {getNoidaAreasByMetroLine('Aqua').map((slug) => {
                const area = getNoidaAreaBySlug(slug)
                if (!area) return null
                return (
                  <Link
                    key={slug}
                    href={`/neet-coaching-noida/${slug}`}
                    className="px-3 py-1 bg-white rounded-full text-cyan-700 text-sm font-medium shadow-sm border border-cyan-200 hover:bg-cyan-50 transition-colors"
                  >
                    {area.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* View All Areas Link */}
          <div className="text-center mt-6">
            <Link
              href="/neet-coaching-noida"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All {getAllNoidaAreaSlugs().length}+ Noida Areas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Other Centers in Delhi NCR */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Other Centers in Delhi NCR
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'South Extension (Flagship)', href: '/locations/south-extension' },
              { name: 'Rohini (DC Chowk)', href: '/locations/rohini' },
              { name: 'Gurugram (Sector 51)', href: '/locations/gurugram' },
              { name: 'Faridabad (Sector 17)', href: '/locations/faridabad' },
              { name: 'Delhi', href: '/locations/delhi' },
              { name: 'Ghaziabad', href: '/locations/ghaziabad' },
            ].map((center) => (
              <Link
                key={center.href}
                href={center.href}
                className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors group"
              >
                <p className="font-semibold text-gray-900 group-hover:text-blue-600">{center.name}</p>
                <span className="text-sm text-gray-500 group-hover:text-blue-500">View details →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions - Noida Center
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 ml-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your NEET Journey in Noida?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Book a free demo class and experience our teaching methodology
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              onClick={handleCallNow}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-bold transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call {CONTACT_INFO.phone.display.primary}</span>
            </a>

            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <MobilePhoneStickyBar source="noida-location" />
    </div>
  )
}
