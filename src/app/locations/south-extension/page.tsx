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
  Award,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
} from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'
import {
  RelatedLocations,
  getRelatedLocations,
} from '@/components/locations/RelatedLocations'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'

export default function SouthExtensionLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'south-extension',
      pageType: 'location',
    })
  }, [])

  const center = CONTACT_INFO.centers.southExtension

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion('south-extension-location')
    await trackAndOpenWhatsApp({
      source: 'south-extension-location-page',
      message:
        'Hi! I am interested in joining your South Extension center for NEET Biology coaching.',
      campaign: 'location-south-extension',
    })
  }

  const handleGetDirections = () => {
    window.open(center.mapUrl, '_blank')
  }

  const nearbyAreas = [
    'Lajpat Nagar',
    'Greater Kailash',
    'Nehru Place',
    'Defence Colony',
    'Kalkaji',
    'CR Park',
    'Safdarjung',
    'Hauz Khas',
    'Green Park',
    'Malviya Nagar',
    'Saket',
    'AIIMS',
    'INA',
    'Jor Bagh',
    'Khan Market',
    'Lodhi Colony',
    'Andrews Ganj',
    'East of Kailash',
  ]

  const faqs = [
    {
      q: 'Where is Cerebrum Biology Academy South Extension center located?',
      a: `Our flagship center is located at ${center.streetAddress}, ${center.addressLocality}. We are near Lajpat Nagar Metro Station on the Violet Line.`,
    },
    {
      q: 'Is South Extension your main center?',
      a: 'Yes! South Extension is our flagship center where Dr. Shekhar personally conducts classes. This center has the largest batch capacity and most facilities.',
    },
    {
      q: 'What is the batch size at South Extension center?',
      a: 'We maintain small batches of maximum 15-20 students to ensure personalized attention for every NEET aspirant.',
    },
    {
      q: 'How to reach South Extension center by Metro?',
      a: 'Take the Violet Line to Lajpat Nagar Metro Station. Our center is a 5-minute walk from the station. You can also reach via INA Metro (Yellow Line).',
    },
    {
      q: 'What are the class timings at South Extension?',
      a: `We operate ${CONTACT_INFO.hours.displayText}. We offer morning, afternoon, and evening batches to accommodate different schedules.`,
    },
    {
      q: 'Is parking available near South Extension center?',
      a: 'Yes, there is ample parking available in South Extension Part 2 market area. Two-wheeler parking is free near the center.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                Flagship Center
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Biology Coaching in <span className="text-yellow-400">South Extension</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Our flagship center near AIIMS Delhi - Where Dr. Shekhar personally teaches
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  {center.streetAddress}
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Train className="w-4 h-4 text-yellow-400" />
                  Lajpat Nagar Metro (Violet Line)
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleCallNow}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                WhatsApp
              </button>
              <button
                onClick={handleGetDirections}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </button>
            </div>
          </div>
        </section>

        {/* Why Flagship Center */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why South Extension is Our <span className="text-yellow-600">Flagship Center</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Award,
                  title: 'Dr. Shekhar Classes',
                  desc: 'Learn directly from the founder - AIIMS alumnus',
                },
                {
                  icon: Users,
                  title: 'Largest Batches',
                  desc: 'More batch options for flexible timings',
                },
                {
                  icon: Building2,
                  title: 'Best Infrastructure',
                  desc: 'AC classrooms, library, doubt clearing room',
                },
                {
                  icon: Trophy,
                  title: 'Maximum Toppers',
                  desc: '60% of our AIIMS selections from this center',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Details */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <LazyGoogleMap
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5!2d77.22!3d28.567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSouth+Extension+Part+2!5e0!3m2!1sen!2sin!4v1234567890"
                  title="South Extension NEET Coaching Center"
                  height={350}
                  placeholder={{
                    lat: 28.567,
                    lng: 77.22,
                    address: `${center.streetAddress}, ${center.addressLocality}`
                  }}
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    Center Address
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {center.streetAddress}
                    <br />
                    {center.addressLocality}, {center.addressRegion} - {center.postalCode}
                  </p>
                  <div className="space-y-2">
                    {center.nearbyLandmarks.map((landmark, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {landmark}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* How to Reach */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="font-bold text-xl mb-4">How to Reach Us</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Train className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">By Metro</h4>
                        <p className="text-gray-600 text-sm">
                          Lajpat Nagar Metro (Violet Line) - 5 min walk
                          <br />
                          INA Metro (Yellow Line) - 10 min by auto
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Car className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">By Car/Bike</h4>
                        <p className="text-gray-600 text-sm">
                          Ring Road → South Extension flyover → Take exit for Part 2
                          <br />
                          Parking available in market area
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Navigation className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">By Bus</h4>
                        <p className="text-gray-600 text-sm">
                          DTC buses on Ring Road stop at South Extension
                          <br />
                          Routes: 419, 503, 543 and more
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timings */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Center Timings
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Monday - Saturday</span>
                      <span className="font-semibold">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Students From These Areas Join Our South Extension Center
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {nearbyAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border hover:border-green-500 transition-colors"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Related Locations - Cross-linking for SEO */}
        <RelatedLocations
          currentLocation="South Extension"
          locations={getRelatedLocations('south-extension')}
          className="bg-white"
        />

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '67+ AIIMS Selections' },
                { value: '98%', label: 'Success Rate' },
                { value: '15+', label: 'Years Experience' },
                { value: '4.9', label: 'Google Rating', icon: Star },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                    {stat.value}
                    {stat.icon && <stat.icon className="w-6 h-6 fill-yellow-400" />}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Frequently Asked Questions - South Extension Center
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Visit Our South Extension Center Today!
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Book a free demo class and experience our teaching methodology
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Book Free Demo
              </button>
              <button
                onClick={handleCallNow}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all shadow-lg"
              >
                <Phone className="w-6 h-6" />
                {CONTACT_INFO.phone.display.primary}
              </button>
            </div>
          </div>
        </section>
      </div>

      <MobilePhoneStickyBar
        phoneNumber={CONTACT_INFO.phone.primary}
        source="south-extension-location"
      />
    </>
  )
}
