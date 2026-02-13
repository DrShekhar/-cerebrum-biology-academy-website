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
  Car,
  ArrowRight,
  Award,
  Shield,
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

export default function ShantiNiketanPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'shanti-niketan-area',
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
    trackWhatsAppConversion('shanti-niketan-area')
    await trackAndOpenWhatsApp({
      source: 'shanti-niketan-area-page',
      message: 'Hi! I am from Shanti Niketan and interested in NEET Biology coaching.',
      campaign: 'location-shanti-niketan',
    })
  }

  const areasServed = [
    'Shanti Niketan',
    'Anand Niketan',
    'Chanakyapuri',
    'Vasant Vihar',
    'Westend',
    'Diplomatic Enclave',
    'RK Puram',
    'Moti Bagh',
  ]

  const faqs = [
    {
      q: 'How do I reach the center from Shanti Niketan?',
      a: 'From Shanti Niketan, drive via Ring Road to South Extension - approximately 20-25 minutes. Alternatively, you can take a cab or use metro (Dhaula Kuan → Central Secretariat → Lajpat Nagar).',
    },
    {
      q: 'Do you offer pickup/drop facility?',
      a: "While we don't offer transport, many families from Shanti Niketan arrange carpools. We can connect you with other families from your area. Many students also use cab services.",
    },
    {
      q: 'What makes Cerebrum suitable for Shanti Niketan families?',
      a: 'We understand the expectations of premium families - quality, discretion, and results. Our small batch sizes (15-20), AIIMS faculty, and 98% success rate match the standards you expect. Dr. Shekhar personally mentors students.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-slate-800 via-gray-700 to-slate-800 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-slate-600/30 text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Premium Locality
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Biology Coaching for <span className="text-yellow-400">Shanti Niketan</span>{' '}
                Families
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Premium coaching for one of Delhi&apos;s most affluent localities. AIIMS faculty,
                discrete environment, personalized attention.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/locations/south-extension"
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-lg font-semibold"
                >
                  <Award className="w-5 h-5" />
                  Flagship Center
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
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-400 animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8" />
                    <div>
                      <h2 className="font-bold text-xl">South Extension Center (Flagship)</h2>
                      <p className="text-yellow-100 text-sm">20-25 Min from Shanti Niketan</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <p className="text-gray-700 font-medium">
                      Block D, South Extension Part 2, New Delhi 110049
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-slate-500" />
                    <p className="text-gray-700">Via Ring Road - 20-25 minutes by car</p>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Why Shanti Niketan Families Trust Us
                    </h3>
                    {[
                      'Premium, professional learning environment',
                      'Dr. Shekhar - AIIMS alumnus, 15+ years experience',
                      'Small batches - maximum 15-20 students',
                      '98% success rate with personalized mentoring',
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <p className="text-gray-700">{f}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link
                      href="/locations/south-extension"
                      className="flex items-center justify-center gap-2 flex-1 bg-slate-900 text-white py-3 rounded-lg font-semibold"
                    >
                      View Center
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={handleCallNow}
                      className="flex items-center justify-center gap-2 flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold"
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

        <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Shanti Niketan Families Choose <span className="text-slate-700">Cerebrum</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Shield, title: 'Premium Quality', desc: 'Elite standards' },
                { icon: Users, title: 'Personalized', desc: 'Individual attention' },
                { icon: Trophy, title: '98% Success', desc: 'Proven results' },
                { icon: Star, title: 'AIIMS Faculty', desc: 'Expert teachers' },
              ].map((item, idx) => (
                <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-slate-600" />
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
          currentLocation="Shanti Niketan"
          locations={getRelatedLocations('shanti-niketan')}
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

        <section className="py-12 bg-gradient-to-r from-slate-700 to-gray-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Premium NEET Coaching</h2>
            <p className="text-lg mb-6 opacity-90">Book a consultation today</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/locations/south-extension"
                className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg"
              >
                <Award className="w-6 h-6" />
                Flagship Center
              </Link>
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-lg font-bold text-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Book Demo
              </button>
            </div>
          </div>
        </section>
      </div>
      <MobilePhoneStickyBar source="shanti-niketan-area" />
    </>
  )
}
