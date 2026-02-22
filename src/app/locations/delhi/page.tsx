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
      variantId: 'delhi-area',
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
    trackWhatsAppConversion('delhi-area')
    await trackAndOpenWhatsApp({
      source: 'delhi-area-page',
      message:
        'Hi! I am from Delhi and interested in NEET Biology coaching. Which center is nearest to me?',
      campaign: 'location-delhi-area',
    })
  }

  const areasServed = [
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
    'Connaught Place',
    'Sadar Bazaar',
    'Paharganj',
    'New Delhi Railway Station',
    'Old Rajinder Nagar',
    'Naraina',
    'Central Delhi',
    'West Delhi',
  ]

  const nearestCenters = [
    {
      name: 'Rohini Center',
      address: '211 Vikas Surya Tower, DC Chowk, Sector 9, Rohini',
      metro: 'Rohini West Metro (Red Line)',
      bestFor: 'North & West Delhi students',
      link: '/locations/rohini',
      color: 'red',
    },
    {
      name: 'South Extension Center (Flagship)',
      address: 'D 35, South Extension Part 2',
      metro: 'Lajpat Nagar Metro (Violet Line)',
      bestFor: 'Central & South Delhi students',
      link: '/locations/south-extension',
      color: 'yellow',
    },
  ]

  const faqs = [
    {
      q: 'Where can Delhi students attend NEET Biology coaching?',
      a: 'Delhi students can join our Rohini center (DC Chowk) or South Extension center (Flagship). Both are metro-connected and easily accessible from all parts of Delhi.',
    },
    {
      q: 'Which center is best for West Delhi students?',
      a: 'Students from West Delhi (Patel Nagar, Rajouri Garden, Janakpuri, Tilak Nagar) should join our Rohini center which is easily accessible via Red Line Metro.',
    },
    {
      q: 'Which center is best for Central Delhi students?',
      a: 'Students from Central Delhi (Connaught Place, Karol Bagh, Paharganj) can choose either center based on convenience. South Extension is closer via Violet Line.',
    },
    {
      q: 'Do you offer online classes for Delhi students?',
      a: 'Yes! We offer live online classes for students who prefer learning from home. You get the same quality teaching with interactive doubt sessions.',
    },
    {
      q: 'What is the batch size at your Delhi NCR centers?',
      a: 'We maintain small batches of maximum 15-20 students at all centers to ensure personalized attention for every NEET aspirant.',
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
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                Area We Serve
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Biology Coaching for <span className="text-yellow-400">Delhi Students</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Premium NEET Biology coaching by AIIMS faculty. Students from all parts of Delhi can
                join our nearby centers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Find Nearest Center
                </button>
                <button
                  onClick={handleCallNow}
                  className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Nearest Centers */}
        <section className="py-12 md:py-16 -mt-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Visit Our Nearest Centers
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {nearestCenters.map((center, idx) => (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all animate-fadeInUp"
                >
                  <div className={`bg-${center.color}-500 text-white py-3 px-6`}>
                    <h3 className="font-bold text-lg">{center.name}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                      <p className="text-gray-700">{center.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Train className="w-5 h-5 text-gray-500" />
                      <p className="text-gray-700">{center.metro}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <p className="text-green-700 font-medium">{center.bestFor}</p>
                    </div>
                    <Link
                      href={center.link}
                      className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all"
                    >
                      View Center Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Delhi Students Choose <span className="text-blue-600">Cerebrum</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Users,
                  title: 'Small Batches',
                  desc: 'Maximum 15-20 students per batch',
                },
                {
                  icon: Trophy,
                  title: '98% Success Rate',
                  desc: 'Proven NEET results since 2010',
                },
                {
                  icon: Star,
                  title: 'AIIMS Faculty',
                  desc: 'Learn from Dr. Shekhar & team',
                },
                {
                  icon: Train,
                  title: 'Metro Connected',
                  desc: 'All centers near metro stations',
                },
              ].map((item, idx) => (
                <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-blue-600" />
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
              Areas We Serve in Delhi
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Students from all these areas join our NEET Biology coaching program at Rohini or
              South Extension center
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
              Frequently Asked Questions - Delhi Students
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
        <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-lg mb-6 opacity-90">Book a free demo class at your nearest center</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
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

      <MobilePhoneStickyBar source="delhi-area" />
    </>
  )
}
