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

export default function SouthDelhiLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'south-delhi-area',
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
    trackWhatsAppConversion('south-delhi-area')
    await trackAndOpenWhatsApp({
      source: 'south-delhi-area-page',
      message:
        'Hi! I am from South Delhi and interested in NEET Biology coaching at South Extension center.',
      campaign: 'location-south-delhi-area',
    })
  }

  const areasServed = [
    'Greater Kailash',
    'GK 1',
    'GK 2',
    'CR Park',
    'Nehru Place',
    'Kalkaji',
    'Defence Colony',
    'Lajpat Nagar',
    'Jangpura',
    'Andrews Ganj',
    'East of Kailash',
    'Alaknanda',
    'Sarita Vihar',
    'Jasola',
    'Okhla',
    'Govindpuri',
    'Tughlakabad',
    'Sangam Vihar',
    'Badarpur',
    'Khanpur',
  ]

  const nearestCenter = {
    name: 'South Extension Center (Flagship)',
    address: 'D 35, South Extension Part 2, New Delhi 110049',
    metro: 'Lajpat Nagar Metro (Violet Line) - 5 min walk',
    features: [
      'Flagship center - Dr. Shekhar personally teaches',
      'Largest facility with best infrastructure',
      'Maximum batch options available',
      '60% of AIIMS selections from this center',
    ],
    link: '/locations/south-extension',
  }

  const faqs = [
    {
      q: 'Where should South Delhi students go for NEET Biology coaching?',
      a: 'South Delhi students should join our flagship South Extension center, located at D 35, South Extension Part 2. It is just 5 minutes from Lajpat Nagar Metro Station.',
    },
    {
      q: 'Is South Extension center easily accessible from Greater Kailash?',
      a: 'Yes! South Extension is very close to Greater Kailash. You can reach by auto in 10 minutes or take the metro to Lajpat Nagar station.',
    },
    {
      q: 'Why is South Extension called the Flagship center?',
      a: 'South Extension is our flagship center because Dr. Shekhar personally conducts classes here, it has the best infrastructure, and 60% of our AIIMS selections come from this center.',
    },
    {
      q: 'What courses are available at South Extension?',
      a: 'We offer all NEET Biology courses - Class 11, Class 12, Dropper batch, Crash Course, and Foundation courses for Class 9-10. All taught by AIIMS faculty.',
    },
    {
      q: 'Do you offer online classes for South Delhi students?',
      a: 'Yes! We offer live online classes for students who prefer learning from home. But we recommend visiting South Extension center for the best learning experience.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                Area We Serve
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Biology Coaching for{' '}
                <span className="text-yellow-400">South Delhi Students</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Join our flagship South Extension center - where Dr. Shekhar personally teaches.
                Just minutes away from GK, CR Park, Nehru Place.
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

        {/* Flagship Center Card */}
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
                      <p className="text-yellow-100 text-sm">
                        Recommended for South Delhi Students
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
                    <p className="text-gray-700">{nearestCenter.metro}</p>
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
                    <a
                      href={`tel:${CONTACT_INFO.phone.primary}`}
                      onClick={handleCallNow}
                      className="flex items-center justify-center gap-2 flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
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
              Why South Delhi Students Choose <span className="text-purple-600">Cerebrum</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Award,
                  title: 'Flagship Center',
                  desc: 'Best infrastructure & facilities',
                },
                {
                  icon: Users,
                  title: 'Dr. Shekhar Classes',
                  desc: 'Learn directly from the founder',
                },
                {
                  icon: Trophy,
                  title: '98% Success Rate',
                  desc: '60% AIIMS selections from here',
                },
                {
                  icon: Train,
                  title: 'Easy Access',
                  desc: '5 min from Lajpat Nagar Metro',
                },
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
              South Delhi Areas We Serve
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Students from all these areas join our flagship South Extension center for NEET
              Biology coaching
            </p>
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
              Frequently Asked Questions - South Delhi Students
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

      <MobilePhoneStickyBar source="south-delhi-area" />
    </>
  )
}
