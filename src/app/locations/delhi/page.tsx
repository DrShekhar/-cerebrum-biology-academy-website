'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
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
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
} from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'

export default function DelhiLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'delhi',
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
    trackWhatsAppConversion('delhi-location')
    await trackAndOpenWhatsApp({
      source: 'delhi-location-page',
      message: 'Hi! I am from Delhi and interested in NEET Biology coaching.',
      campaign: 'location-delhi',
    })
  }

  const handleGetDirections = () => {
    window.open(CONTACT_INFO.location.delhi.mapUrl, '_blank')
  }

  const nearbyAreas = [
    'Patel Nagar',
    'Karol Bagh',
    'Rajendra Place',
    'Shadipur',
    'Kirti Nagar',
    'Rajouri Garden',
    'Tilak Nagar',
    'Janakpuri',
    'Moti Nagar',
    'Ramesh Nagar',
    'Punjabi Bagh',
    'Paschim Vihar',
    'Pitampura',
    'Rohini',
    'Connaught Place',
    'Sadar Bazaar',
    'Paharganj',
    'New Delhi Railway Station',
    'Old Rajinder Nagar',
    'Naraina',
  ]

  const faqs = [
    {
      q: 'Where is Cerebrum Biology Academy located in Delhi?',
      a: `Our center is located at ${CONTACT_INFO.location.delhi.streetAddress}, ${CONTACT_INFO.location.delhi.addressLocality}. We are near Patel Nagar Metro Station.`,
    },
    {
      q: 'Do you offer offline classes in Delhi?',
      a: 'Yes, we offer both offline classroom coaching at our Delhi center and online live classes. Students can choose based on their preference.',
    },
    {
      q: 'What is the batch size at your Delhi center?',
      a: 'We maintain small batches of maximum 15 students to ensure personalized attention for every NEET aspirant.',
    },
    {
      q: 'Is your Delhi center accessible by Metro?',
      a: 'Yes! We are just 3 minutes walk from Patel Nagar Metro Station (Blue Line). Shadipur Metro is also nearby.',
    },
    {
      q: 'What are the class timings at the Delhi center?',
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-500/40 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-medium">Delhi Center</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                NEET Biology Coaching in <span className="text-yellow-400">Delhi</span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                Premier NEET Biology coaching by AIIMS faculty in the heart of Delhi. Small batches
                of 15 students, personalized attention, 90% success rate. Easily accessible by
                Metro!
              </p>

              {/* Address Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <p className="font-medium">{CONTACT_INFO.location.delhi.streetAddress}</p>
                      <p className="text-gray-300">
                        {CONTACT_INFO.location.delhi.addressLocality},{' '}
                        {CONTACT_INFO.location.delhi.addressRegion} -{' '}
                        {CONTACT_INFO.location.delhi.postalCode}
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
            </motion.div>

            {/* Right - Map Embed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d${CONTACT_INFO.location.delhi.geo.longitude}!3d${CONTACT_INFO.location.delhi.geo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM5JzAzLjAiTiA3N8KwMTAnMjEuNCJF!5e0!3m2!1sen!2sin!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cerebrum Biology Academy Delhi Location"
              />
            </motion.div>
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
                Nearest metro station: <strong>Patel Nagar</strong> (Blue Line). Our center is just
                3 minutes walk. Shadipur Metro (Blue Line) is also nearby.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">By Car</h3>
              <p className="text-gray-600">
                Located in <strong>Patel Nagar West</strong>, easily accessible from Ring Road.
                Street parking available. Use Google Maps for real-time directions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Landmarks</h3>
              <p className="text-gray-600">
                Near <strong>Patel Nagar Market</strong> and opposite Patel Nagar Post Office. Look
                for our signboard at the entrance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Delhi Center */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose Our Delhi Center?
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
                description: 'Proven track record of NEET selections from Delhi',
              },
              {
                icon: Star,
                title: 'AIIMS Faculty',
                description: 'Learn from faculty trained at AIIMS New Delhi',
              },
              {
                icon: Train,
                title: 'Metro Connected',
                description: 'Just 3 minutes from Patel Nagar Metro Station',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas We Serve */}
      <div className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Areas We Serve in Delhi
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Students from all parts of Delhi join our NEET Biology coaching program. We are easily
            accessible from:
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {nearbyAreas.map((area, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-gray-700 text-sm font-medium shadow-sm border border-gray-200"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions - Delhi Center
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
            Ready to Start Your NEET Journey in Delhi?
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
      <MobilePhoneStickyBar source="delhi-location" />
    </div>
  )
}
