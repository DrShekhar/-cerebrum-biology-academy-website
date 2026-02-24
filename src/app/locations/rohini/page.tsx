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
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
} from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ExploreCourses } from '@/components/seo/InternalCrossLinks'
import Link from 'next/link'

export default function RohiniLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'rohini',
      pageType: 'location',
    })
  }, [])

  const center = CONTACT_INFO.centers.rohini

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion('rohini-location')
    await trackAndOpenWhatsApp({
      source: 'rohini-location-page',
      message:
        'Hi! I am from Rohini and interested in NEET Biology coaching at your DC Chowk center.',
      campaign: 'location-rohini',
    })
  }

  const handleGetDirections = () => {
    window.open(center.mapUrl, '_blank')
  }

  const nearbyAreas = [
    'Rohini Sector 9',
    'Rohini Sector 7',
    'Rohini Sector 8',
    'Pitampura',
    'Prashant Vihar',
    'Shalimar Bagh',
    'Paschim Vihar',
    'Punjabi Bagh',
    'Kohat Enclave',
    'Netaji Subhash Place',
    'Keshav Puram',
    'Ashok Vihar',
    'Wazirpur',
    'Model Town',
    'GTB Nagar',
    'Mukherjee Nagar',
    'Mangolpuri',
    'Sultanpuri',
  ]

  const faqs = [
    {
      q: 'Where is Cerebrum Biology Academy Rohini center located?',
      a: `Our Rohini center is at ${center.streetAddress}, ${center.addressLocality}. We are at DC Chowk, easily accessible from Rohini West Metro.`,
    },
    {
      q: 'How to reach Rohini center by Metro?',
      a: 'Take the Red Line to Rohini West Metro Station. Our center at Vikas Surya Tower is just 3 minutes walk from the metro station.',
    },
    {
      q: 'What courses are available at Rohini center?',
      a: 'We offer all NEET Biology courses - Class 11, Class 12, Dropper batch, Crash Course, and Foundation courses for Class 9-10.',
    },
    {
      q: 'What is the batch size at Rohini center?',
      a: 'We maintain small batches of maximum 15-20 students to ensure personalized attention and effective doubt clearing.',
    },
    {
      q: 'Is parking available at Rohini center?',
      a: 'Yes, Vikas Surya Tower has dedicated parking. Additionally, DC Chowk area has ample street parking for two-wheelers.',
    },
    {
      q: 'What are the class timings at Rohini?',
      a: `We operate ${CONTACT_INFO.hours.displayText}. Morning, afternoon, and evening batches available.`,
    },
  ]

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Centers', href: '/locations' },
          { label: 'Rohini', isCurrentPage: true },
        ]}
        variant="minimal"
        className="max-w-7xl mx-auto px-4 pt-3"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Train className="w-4 h-4" />
                North Delhi Center
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Biology Coaching in <span className="text-yellow-400">Rohini</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Premium coaching center at DC Chowk - Serving North & North-West Delhi
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  Vikas Surya Tower, DC Chowk
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Train className="w-4 h-4 text-red-400" />
                  Rohini West Metro (Red Line)
                </div>
              </div>
            </div>
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

        {/* Why Rohini */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Choose Our <span className="text-red-600">Rohini Center</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Train,
                  title: 'Metro Connected',
                  desc: '3 min walk from Rohini West Metro Station',
                },
                {
                  icon: Users,
                  title: 'Small Batches',
                  desc: 'Maximum 15-20 students per batch',
                },
                {
                  icon: Building2,
                  title: 'Modern Facility',
                  desc: 'AC classrooms in Vikas Surya Tower',
                },
                {
                  icon: Trophy,
                  title: 'Proven Results',
                  desc: '150+ NEET selections from this center',
                },
              ].map((item, idx) => (
                <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
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
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499!2d77.102!3d28.704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDC+Chowk+Rohini!5e0!3m2!1sen!2sin!4v1234567890"
                  title="Rohini NEET Coaching Center"
                  height={350}
                  placeholder={{
                    lat: 28.704,
                    lng: 77.102,
                    address: "Vikas Surya Tower, DC Chowk, Rohini, Delhi"
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
                    {center.addressLocality} - {center.postalCode}
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
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Train className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">By Metro (Recommended)</h4>
                        <p className="text-gray-600 text-sm">
                          Rohini West Metro (Red Line) - 3 min walk
                          <br />
                          Exit from Gate 1, head towards DC Chowk
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
                          Outer Ring Road → Rohini Sector 9 exit
                          <br />
                          Building parking + street parking available
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
                          DC Chowk bus stop (multiple DTC routes)
                          <br />
                          From ISBT Kashmere Gate: Route 764, 765
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
                      <span className="font-semibold">7:00 AM - 9:00 PM</span>
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
              Students From These Areas Join Our Rohini Center
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

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '150+', label: 'NEET Selections' },
                { value: '98%', label: 'Success Rate' },
                { value: '8+', label: 'Years at Rohini' },
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
              Frequently Asked Questions - Rohini Center
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

        {/* Explore Courses - Cross-linking for SEO */}
        <ExploreCourses />

        {/* Other Centers */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Our Other Centers
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Cerebrum Biology Academy has 4 centers across Delhi-NCR. Visit the one nearest to you.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { name: 'South Extension (Flagship)', slug: 'south-extension', city: 'New Delhi', highlight: 'Flagship Center' },
                { name: 'Gurugram - Sector 51', slug: 'gurugram', city: 'Gurugram', highlight: 'Haryana' },
                { name: 'Faridabad - Sector 17', slug: 'faridabad', city: 'Faridabad', highlight: 'Haryana' },
              ].map((center) => (
                <Link
                  key={center.slug}
                  href={`/locations/${center.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all group text-center"
                >
                  <MapPin className="w-8 h-8 text-red-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-gray-900 mb-1">{center.name}</h3>
                  <p className="text-sm text-gray-500">{center.city}</p>
                  <span className="inline-block mt-2 text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">{center.highlight}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Visit Our Rohini Center Today!</h2>
            <p className="text-lg mb-6 opacity-90">Book a free demo class at DC Chowk</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
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

      <MobilePhoneStickyBar phoneNumber={CONTACT_INFO.phone.primary} source="rohini-location" />
    </>
  )
}
