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
import { trackPhoneCallConversion } from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'
import {
  RelatedLocations,
  getRelatedLocations,
} from '@/components/locations/RelatedLocations'

export default function GulmoharParkPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'gulmohar-park-area',
      pageType: 'area-served',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    await trackAndOpenWhatsApp({
      source: 'gulmohar-park-area-page',
      message: 'Hi! I am from Gulmohar Park and interested in NEET Biology coaching.',
      campaign: 'location-gulmohar-park',
    })
  }

  const areasServed = [
    'Gulmohar Park',
    'Hauz Khas',
    'Green Park',
    'SDA',
    'Safdarjung Enclave',
    'Panchsheel Park',
    'Sarvapriya Vihar',
    'Yusuf Sarai',
  ]

  const faqs = [
    {
      q: 'Which center is closest to Gulmohar Park?',
      a: 'Our Green Park center is the closest (5 min), and South Extension flagship center is about 10 minutes away.',
    },
    {
      q: 'Do you have students from Gulmohar Park?',
      a: "Yes! Many students from Gulmohar Park, one of Delhi's most affluent areas, study with us. We understand the expectations of premium families.",
    },
    {
      q: 'What makes Cerebrum different?',
      a: 'Expert AIIMS faculty, small batches of 15-20 students, personalized attention, and 98% success rate in NEET.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-amber-900 via-orange-800 to-amber-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                Ultra-Premium Locality
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Biology Coaching for <span className="text-yellow-400">Gulmohar Park</span>{' '}
                Students
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Premium coaching for Delhi's elite. Green Park & South Extension centers nearby.
                Expert AIIMS faculty.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/locations/green-park"
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-lg font-semibold"
                >
                  <Award className="w-5 h-5" />
                  Green Park Center
                </Link>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 -mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-amber-400 animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8" />
                    <div>
                      <h2 className="font-bold text-xl">Green Park Center</h2>
                      <p className="text-amber-100 text-sm">
                        Nearest Center - 5 Min from Gulmohar Park
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <p className="text-gray-700 font-medium">Green Park Main, New Delhi 110016</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Train className="w-5 h-5 text-yellow-500" />
                    <p className="text-gray-700">Green Park Metro (Yellow Line) - 3 min walk</p>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Why This Center?</h3>
                    {[
                      'Closest center for Gulmohar Park residents',
                      'Near Hauz Khas & IIT Delhi',
                      'Weekend batches available',
                      'Expert AIIMS faculty',
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <p className="text-gray-700">{f}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link
                      href="/locations/green-park"
                      className="flex items-center justify-center gap-2 flex-1 bg-slate-900 text-white py-3 rounded-lg font-semibold"
                    >
                      View Center
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={`tel:${CONTACT_INFO.phone.primary}`}
                      onClick={handleCallNow}
                      className="flex items-center justify-center gap-2 flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold"
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

        <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Elite Families Choose <span className="text-amber-600">Cerebrum</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Award, title: 'Premium Quality', desc: 'Elite education standards' },
                { icon: Users, title: 'Small Batches', desc: 'Personal attention' },
                { icon: Trophy, title: '98% Success', desc: 'Proven track record' },
                { icon: Star, title: 'AIIMS Faculty', desc: 'Top educators' },
              ].map((item, idx) => (
                <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Areas We Serve</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {areasServed.map((a, i) => (
                <span key={i} className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>

        <RelatedLocations
          currentLocation="Gulmohar Park"
          locations={getRelatedLocations('gulmohar-park')}
          className="bg-white"
        />

        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '500+', label: 'Selections' },
                { value: '98%', label: 'Success' },
                { value: '15+', label: 'Years' },
                { value: '4.9', label: 'Rating', icon: Star },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                    {s.value}
                    {s.icon && <s.icon className="w-6 h-6 fill-yellow-400" />}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-fadeInUp"
                >
                  <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                  <p className="text-gray-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Premium NEET Coaching for Elite Families
            </h2>
            <p className="text-lg mb-6 opacity-90">Book a free demo class</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/locations/green-park"
                className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg"
              >
                <Award className="w-6 h-6" />
                Green Park Center
              </Link>
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Book Demo
              </button>
            </div>
          </div>
        </section>
      </div>
      <MobilePhoneStickyBar source="gulmohar-park-area" />
    </>
  )
}
