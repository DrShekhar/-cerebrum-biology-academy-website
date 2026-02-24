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
} from 'lucide-react'
import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
} from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ExploreCourses } from '@/components/seo/InternalCrossLinks'

export default function GurugramLocationContent() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'gurugram',
      pageType: 'location',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion('gurugram-location')
    await trackAndOpenWhatsApp({
      source: 'gurugram-location-page',
      message: 'Hi! I am from Gurugram and interested in NEET Biology coaching.',
      campaign: 'location-gurugram',
    })
  }

  const handleGetDirections = () => {
    window.open(CONTACT_INFO.location.gurugram.mapUrl, '_blank')
  }

  const nearbyAreas = [
    { name: 'DLF Phase 1', slug: 'dlf-phase-1' },
    { name: 'DLF Phase 2', slug: 'dlf-phase-2' },
    { name: 'DLF Phase 3', slug: 'dlf-phase-3' },
    { name: 'DLF Phase 4', slug: 'dlf-phase-4' },
    { name: 'Golf Course Road', slug: 'golf-course-road' },
    { name: 'Sushant Lok', slug: 'sushant-lok' },
    { name: 'Sector 14', slug: 'sector-14' },
    { name: 'Sector 43', slug: 'sector-43' },
    { name: 'Sector 45', slug: 'sector-45' },
    { name: 'Sector 51', slug: 'sector-51' },
    { name: 'Sector 56', slug: 'sector-56' },
    { name: 'Sector 57', slug: 'sector-57' },
    { name: 'South City 1', slug: 'south-city-1' },
    { name: 'South City 2', slug: 'south-city-2' },
    { name: 'Nirvana Country', slug: 'nirvana-country' },
    { name: 'MG Road', slug: 'mg-road' },
    { name: 'IFFCO Chowk', slug: 'iffco-chowk' },
    { name: 'Huda City Centre', slug: 'huda-city-centre' },
    { name: 'Cyber City', slug: 'cyber-city' },
    { name: 'Sohna Road', slug: 'sohna-road' },
  ]

  const faqs = [
    {
      q: 'Where is Cerebrum Biology Academy located in Gurugram?',
      a: `Our center is located at ${CONTACT_INFO.location.gurugram.streetAddress}, ${CONTACT_INFO.location.gurugram.addressLocality}. We are near HUDA City Centre Metro Station.`,
    },
    {
      q: 'Do you offer offline classes in Gurugram?',
      a: 'Yes, we offer both offline classroom coaching at our Gurugram center and online live classes. Students can choose based on their preference.',
    },
    {
      q: 'What is the batch size at your Gurugram center?',
      a: 'We maintain small batches of maximum 15 students to ensure personalized attention for every NEET aspirant.',
    },
    {
      q: 'Is there parking available at your Gurugram center?',
      a: 'Yes, we have dedicated parking space for students and parents visiting our center.',
    },
    {
      q: 'What are the class timings at the Gurugram center?',
      a: `We operate ${CONTACT_INFO.hours.displayText}. We offer morning and evening batches to accommodate school schedules.`,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { label: 'Centers', href: '/locations' },
          { label: 'Gurugram', isCurrentPage: true },
        ]}
        variant="minimal"
        className="max-w-7xl mx-auto px-4 pt-3"
      />
      {/* Hero Section with Map */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Location Info */}
            <div
              className="space-y-6 animate-fadeInUp"
            >
              <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/40 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-green-300 text-sm font-medium">Gurugram Center</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                NEET Biology Coaching in <span className="text-yellow-400">Gurugram</span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                Premier NEET Biology coaching by AIIMS faculty. Small batches of 15 students,
                personalized attention, 98% success rate. No need to travel to Delhi!
              </p>

              {/* Address Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <p className="font-medium">{CONTACT_INFO.location.gurugram.streetAddress}</p>
                      <p className="text-gray-300">
                        {CONTACT_INFO.location.gurugram.addressLocality},{' '}
                        {CONTACT_INFO.location.gurugram.addressRegion} -{' '}
                        {CONTACT_INFO.location.gurugram.postalCode}
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

                <button
                  onClick={handleCallNow}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-slate-900 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </button>

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
            <div
              className="h-[400px] rounded-2xl overflow-hidden shadow-2xl animate-fadeInUp"
            >
              <LazyGoogleMap
                embedUrl={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2!2d${CONTACT_INFO.location.gurugram.geo.longitude}!3d${CONTACT_INFO.location.gurugram.geo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM0LjIiTiA3N8KwMDEnMzUuOCJF!5e0!3m2!1sen!2sin!4v1234567890`}
                title="Gurugram NEET Coaching Center"
                height={400}
                placeholder={{
                  lat: CONTACT_INFO.location.gurugram.geo.latitude,
                  lng: CONTACT_INFO.location.gurugram.geo.longitude,
                  address: `${CONTACT_INFO.location.gurugram.streetAddress}, ${CONTACT_INFO.location.gurugram.addressLocality}`
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
                Nearest metro station: <strong>HUDA City Centre</strong> (Yellow Line). Our center
                is 5 minutes walk from the station.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">By Car</h3>
              <p className="text-gray-600">
                Located near <strong>Sector 44 Market</strong>. Ample parking available. Use Google
                Maps for real-time directions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Landmarks</h3>
              <p className="text-gray-600">
                Near <strong>Golf Course Road</strong> and opposite Sector 44 Market. Look for our
                signboard at the entrance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Gurugram Center */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose Our Gurugram Center?
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
                description: 'Proven track record of NEET selections from Gurugram',
              },
              {
                icon: Star,
                title: 'AIIMS Faculty',
                description: 'Learn from faculty trained at AIIMS New Delhi',
              },
              {
                icon: MapPin,
                title: 'No Delhi Travel',
                description: 'Quality coaching without the hassle of commuting to Delhi',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all animate-fadeInUp"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas We Serve - with internal links */}
      <div className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Areas We Serve in Gurugram
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Students from all parts of Gurugram join our NEET Biology coaching program. We are
            easily accessible from:
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {nearbyAreas.map((area, index) => (
              <Link
                key={index}
                href={`/neet-coaching-gurugram/${area.slug}`}
                className="px-4 py-2 bg-white rounded-full text-gray-700 text-sm font-medium shadow-sm border border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all"
              >
                {area.name}
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/neet-coaching-gurugram"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View all Gurugram areas →
            </Link>
          </div>
        </div>
      </div>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* Free NEET Tools */}
      <NEETToolsWidget
        title="Free NEET Tools for Gurugram Students"
        subtitle="Plan your NEET journey with our AI-powered tools - 100% Free"
      />

      {/* FAQs */}
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions - Gurugram Center
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

      {/* Explore Courses - Cross-linking for SEO */}
      <ExploreCourses />

      {/* Other Centers */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Our Other Centers
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Cerebrum Biology Academy has 4 centers across Delhi-NCR. Visit the one nearest to you.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'South Extension (Flagship)', slug: 'south-extension', city: 'New Delhi', highlight: 'Flagship Center' },
              { name: 'Rohini - DC Chowk', slug: 'rohini', city: 'New Delhi', highlight: 'North Delhi' },
              { name: 'Faridabad - Sector 17', slug: 'faridabad', city: 'Faridabad', highlight: 'Haryana' },
            ].map((center) => (
              <Link
                key={center.slug}
                href={`/locations/${center.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group text-center"
              >
                <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 mb-1">{center.name}</h3>
                <p className="text-sm text-gray-500">{center.city}</p>
                <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">{center.highlight}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your NEET Journey in Gurugram?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Book a free demo class and experience our teaching methodology
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleCallNow}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-bold transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call {CONTACT_INFO.phone.display.primary}</span>
            </button>

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
      <MobilePhoneStickyBar source="gurugram-location" />
    </div>
  )
}
