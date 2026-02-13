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
  ShoppingBag,
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

export default function SaketPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'saket-area',
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
    trackWhatsAppConversion('saket-area')
    await trackAndOpenWhatsApp({
      source: 'saket-area-page',
      message: 'Hi! I am from Saket and interested in NEET Biology coaching.',
      campaign: 'location-saket',
    })
  }

  const areasServed = [
    'Saket',
    'Malviya Nagar',
    'Hauz Khas',
    'Pushp Vihar',
    'Mehrauli',
    'Qutub Institutional Area',
    'Vasant Kunj',
    'Khirki Extension',
    'Sheikh Sarai',
  ]

  const landmarks = [
    { name: 'Select Citywalk', distance: '10 min' },
    { name: 'Max Hospital Saket', distance: '8 min' },
    { name: 'Saket Metro (Yellow)', distance: '12 min' },
    { name: 'DLF Place', distance: '10 min' },
  ]

  const faqs = [
    {
      q: 'How far is the center from Saket?',
      a: 'Our South Extension flagship center is about 10-12 minutes from Saket via the Outer Ring Road. You can also reach via Saket Metro (Yellow Line) to Lajpat Nagar Metro.',
    },
    {
      q: 'Is there parking available?',
      a: 'Yes, our South Extension center has street parking nearby. Many students from Saket prefer to use metro connectivity.',
    },
    {
      q: 'Do you have weekend batches for Saket students?',
      a: 'Yes! We have weekend batches perfect for students from Saket who attend school during weekdays. Contact us for current batch timings.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-rose-900 via-pink-800 to-rose-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <ShoppingBag className="w-4 h-4" />
                Near Select Citywalk
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Biology Coaching for <span className="text-yellow-400">Saket</span> Students
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Premium coaching near Select Citywalk & Max Hospital. Expert AIIMS faculty, small
                batches, proven results.
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
                      <p className="text-yellow-100 text-sm">10-12 Min from Saket</p>
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
                    <Train className="w-5 h-5 text-yellow-500" />
                    <p className="text-gray-700">
                      Via Outer Ring Road or Saket Metro → Lajpat Nagar Metro
                    </p>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Nearby Landmarks from Saket
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {landmarks.map((l, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {l.name}: {l.distance}
                          </span>
                        </div>
                      ))}
                    </div>
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

        <section className="py-12 md:py-16 bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Saket Families Choose <span className="text-rose-600">Cerebrum</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: MapPin, title: 'Convenient Location', desc: '10 min from Select Citywalk' },
                { icon: Users, title: 'Small Batches', desc: '15-20 students max' },
                { icon: Trophy, title: '98% Success', desc: 'Proven track record' },
                { icon: Award, title: 'AIIMS Faculty', desc: 'Expert teachers' },
              ].map((item, idx) => (
                <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-rose-600" />
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Areas We Serve Near Saket
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {areasServed.map((a, i) => (
                <span key={i} className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Related Locations - Cross-linking for SEO */}
        <RelatedLocations
          currentLocation="Saket"
          locations={getRelatedLocations('saket')}
          className="bg-white"
        />

        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '67+ AIIMS Selections' },
                { value: '98%', label: 'Success Rate' },
                { value: '15+', label: 'Years' },
                { value: '4.9', label: 'Google Rating', icon: Star },
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              FAQs - Saket Students
            </h2>
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

        <section className="py-12 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Flagship Center!</h2>
            <p className="text-lg mb-6 opacity-90">Book a free demo class today</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/locations/south-extension"
                className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg"
              >
                <Award className="w-6 h-6" />
                Visit Center
              </Link>
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-rose-600 px-8 py-4 rounded-lg font-bold text-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Book Demo
              </button>
            </div>
          </div>
        </section>
      </div>
      <MobilePhoneStickyBar source="saket-area" />
    </>
  )
}
