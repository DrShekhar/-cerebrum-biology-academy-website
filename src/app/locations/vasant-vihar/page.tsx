'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Users,
  Trophy,
  CheckCircle2,
  Train,
  ArrowRight,
  Award,
  Globe,
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

export default function VasantViharLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'vasant-vihar-area',
      pageType: 'area-served',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion('vasant-vihar-area')
    await trackAndOpenWhatsApp({
      source: 'vasant-vihar-area-page',
      message:
        'Hi! I am from Vasant Vihar and interested in NEET/IB Biology coaching. Please share details.',
      campaign: 'location-vasant-vihar-area',
    })
  }

  const areasServed = [
    'Vasant Vihar',
    'Chanakyapuri',
    'Shanti Niketan',
    'Anand Niketan',
    'Westend',
    'RK Puram',
    'Munirka',
    'JNU',
    'Diplomatic Enclave',
  ]

  const nearestCenter = {
    name: 'South Extension Center (Flagship)',
    address: 'Block D, South Extension Part 2, New Delhi 110049',
    metro: 'Lajpat Nagar Metro (Violet Line) - 5 min walk',
    distance: '10-15 min by car from Vasant Vihar',
    features: [
      'Flagship center - Dr. Shekhar personally teaches',
      'IB & IGCSE Biology coaching available',
      'NEET + International curriculum expertise',
      'Students from diplomatic families',
    ],
    link: '/locations/south-extension',
  }

  const faqs = [
    {
      q: 'Do you offer IB Biology coaching for Vasant Vihar students?',
      a: 'Yes! We specialize in IB Biology (HL/SL), IGCSE Biology, and A-Level Biology coaching. Many students from international schools in Vasant Vihar and Chanakyapuri study with us.',
    },
    {
      q: 'How far is the center from Vasant Vihar?',
      a: 'Our South Extension center is about 10-15 minutes by car from Vasant Vihar. Many students from the diplomatic area commute easily.',
    },
    {
      q: 'Do you have students from embassies and diplomatic families?',
      a: 'Yes, we have students from various diplomatic families and international schools. Our faculty is experienced in both Indian (NEET/CBSE) and international curricula.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                Diplomatic Area
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET & IB Biology Coaching for <span className="text-yellow-400">Vasant Vihar</span>{' '}
                Students
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Expert coaching for NEET, IB, IGCSE & A-Level Biology. Trusted by students from
                diplomatic families and international schools.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/locations/south-extension"
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <Award className="w-5 h-5" />
                  Visit Flagship Center
                </Link>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Us
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Nearest Center Card */}
        <section className="py-12 md:py-16 -mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-400"
              >
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8" />
                    <div>
                      <h2 className="font-bold text-xl">{nearestCenter.name}</h2>
                      <p className="text-yellow-100 text-sm">
                        Recommended for Vasant Vihar Students
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <p className="text-gray-700 font-medium">{nearestCenter.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Train className="w-5 h-5 text-purple-500" />
                    <p className="text-gray-700">{nearestCenter.distance}</p>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Why This Center?</h3>
                    <div className="space-y-2">
                      {nearestCenter.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link
                      href={nearestCenter.link}
                      className="flex items-center justify-center gap-2 flex-1 bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all"
                    >
                      View Center Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={handleCallNow}
                      className="flex items-center justify-center gap-2 flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Vasant Vihar Families Choose <span className="text-blue-600">Cerebrum</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Globe,
                  title: 'IB & IGCSE Expert',
                  desc: 'International curriculum specialists',
                },
                { icon: Users, title: 'Small Batches', desc: '1-on-1 and group options' },
                { icon: Trophy, title: '98% Success', desc: 'Proven NEET & IB results' },
                { icon: Award, title: 'AIIMS Faculty', desc: 'Learn from the best' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Areas We Serve Near Vasant Vihar
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Students from these areas join our flagship South Extension center
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {areasServed.map((area, idx) => (
                <span
                  key={idx}
                  className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border hover:border-blue-500 transition-colors"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        <RelatedLocations
          currentLocation="Vasant Vihar"
          locations={getRelatedLocations('vasant-vihar')}
          className="bg-white"
        />

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '200+', label: 'IB/IGCSE Students' },
                { value: '95%', label: 'Score 6+ in IB' },
                { value: '98%', label: 'NEET Success' },
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
              Frequently Asked Questions - Vasant Vihar Students
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
        <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Flagship South Extension Center!
            </h2>
            <p className="text-lg mb-6 opacity-90">Book a free demo class - NEET or IB Biology</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/locations/south-extension"
                className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg"
              >
                <Award className="w-6 h-6" />
                Visit Center Page
              </Link>
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Book Free Demo
              </button>
            </div>
          </div>
        </section>
      </div>

      <MobilePhoneStickyBar source="vasant-vihar-area" />
    </>
  )
}
