'use client'

import { useEffect } from 'react'
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

export default function GreaterKailashLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'greater-kailash-area',
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
    trackWhatsAppConversion('greater-kailash-area')
    await trackAndOpenWhatsApp({
      source: 'greater-kailash-area-page',
      message:
        'Hi! I am from Greater Kailash and interested in NEET Biology coaching. Please share details.',
      campaign: 'location-greater-kailash-area',
    })
  }

  const areasServed = [
    'Greater Kailash 1',
    'Greater Kailash 2',
    'GK M Block',
    'GK N Block',
    'Kailash Colony',
    'East of Kailash',
    'Chirag Delhi',
    'Nehru Place',
    'CR Park',
  ]

  const nearestCenter = {
    name: 'South Extension Center (Flagship)',
    address: 'Block D, South Extension Part 2, New Delhi 110049',
    metro: 'Lajpat Nagar Metro (Violet Line) - 5 min walk',
    distance: 'Just 5 min from GK via Outer Ring Road',
    features: [
      'Flagship center - Dr. Shekhar personally teaches',
      'Closest center for GK residents',
      '60% of AIIMS selections from here',
      'Maximum batch options available',
    ],
    link: '/locations/south-extension',
  }

  const faqs = [
    {
      q: 'How close is the center from Greater Kailash?',
      a: 'Our South Extension flagship center is just 5 minutes from Greater Kailash via the Outer Ring Road. It is the closest and most convenient center for all GK residents.',
    },
    {
      q: 'Is there parking available?',
      a: 'Yes, our South Extension center has parking facilities nearby. Students can also easily reach via Lajpat Nagar Metro station.',
    },
    {
      q: 'Do many GK students study at Cerebrum?',
      a: 'Yes! Greater Kailash is one of our top feeder areas. Many successful NEET qualifiers from GK have studied at our South Extension center.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                Premium Locality
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Biology Coaching for <span className="text-yellow-400">Greater Kailash</span>{' '}
                Students
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Join our flagship South Extension center - just 5 minutes from GK. Where Dr. Shekhar
                personally teaches.
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
            </div>
          </div>
        </section>

        {/* Nearest Center Card */}
        <section className="py-12 md:py-16 -mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-400 animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8" />
                    <div>
                      <h2 className="font-bold text-xl">{nearestCenter.name}</h2>
                      <p className="text-yellow-100 text-sm">Just 5 Min from Greater Kailash</p>
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
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why GK Students Choose <span className="text-purple-600">Cerebrum</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: MapPin, title: 'Closest Center', desc: 'Just 5 min from GK' },
                { icon: Users, title: 'Dr. Shekhar Classes', desc: 'Learn from the founder' },
                { icon: Trophy, title: '98% Success', desc: '60% AIIMS selections' },
                { icon: Train, title: 'Easy Access', desc: 'Near Lajpat Nagar Metro' },
              ].map((item, idx) => (
                <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Areas We Serve Near Greater Kailash
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {areasServed.map((area, idx) => (
                <span
                  key={idx}
                  className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border hover:border-purple-500 transition-colors"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Related Locations - Cross-linking for SEO */}
        <RelatedLocations
          currentLocation="Greater Kailash"
          locations={getRelatedLocations('greater-kailash')}
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
              FAQs - Greater Kailash Students
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div className="bg-white rounded-xl shadow-md p-6 animate-fadeInUp"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Flagship South Extension Center!
            </h2>
            <p className="text-lg mb-6 opacity-90">Book a free demo class with Dr. Shekhar</p>
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
                className="flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Book Free Demo
              </button>
            </div>
          </div>
        </section>
      </div>

      <MobilePhoneStickyBar source="greater-kailash-area" />
    </>
  )
}
