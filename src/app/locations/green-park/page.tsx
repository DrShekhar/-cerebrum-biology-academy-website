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
import {
  RelatedLocations,
  getRelatedLocations,
} from '@/components/locations/RelatedLocations'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'

export default function GreenParkLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'green-park',
      pageType: 'location',
    })
  }, [])

  const center = CONTACT_INFO.centers.greenPark

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion('green-park-location')
    await trackAndOpenWhatsApp({
      source: 'green-park-location-page',
      message: 'Hi! I am from Green Park area and interested in NEET Biology coaching.',
      campaign: 'location-green-park',
    })
  }

  const handleGetDirections = () => {
    window.open(center.mapUrl, '_blank')
  }

  const nearbyAreas = [
    'Green Park',
    'Hauz Khas',
    'SDA Market',
    'IIT Delhi',
    'Safdarjung Enclave',
    'Malviya Nagar',
    'Saket',
    'Panchsheel',
    'Gulmohar Park',
    'Sarvapriya Vihar',
    'Kalu Sarai',
    'Yusuf Sarai',
    'SDA',
    'Ber Sarai',
    'Munirka',
    'R K Puram',
    'Vasant Kunj',
    'Mehrauli',
  ]

  const faqs = [
    {
      q: 'Where is Cerebrum Biology Academy Green Park center?',
      a: `Our Green Park center is at ${center.streetAddress}, ${center.addressLocality}. We are near Green Park Metro Station on the Yellow Line.`,
    },
    {
      q: 'How to reach Green Park center by Metro?',
      a: 'Take the Yellow Line to Green Park Metro Station. Exit from Gate 2, our center is a 4-minute walk towards Green Park Market.',
    },
    {
      q: 'Is this center suitable for JNU/IIT students?',
      a: 'Yes! Many students from JNU, IIT Delhi area, and nearby colleges join our Green Park center for NEET preparation alongside their degree.',
    },
    {
      q: 'What is the batch size at Green Park?',
      a: 'We maintain small batches of maximum 15-20 students to ensure personalized attention.',
    },
    {
      q: 'Do you offer weekend batches at Green Park?',
      a: 'Yes, we have special weekend batches for working professionals and college students who cannot attend weekday classes.',
    },
    {
      q: 'What are the timings at Green Park center?',
      a: `We operate ${CONTACT_INFO.hours.displayText}. Multiple batch timings available.`,
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
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Train className="w-4 h-4" />
                Yellow Line Metro
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Biology Coaching in <span className="text-yellow-400">Green Park</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Premium coaching near Hauz Khas & IIT Delhi - Ideal for South Delhi students
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  {center.streetAddress}
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Train className="w-4 h-4 text-yellow-400" />
                  Green Park Metro (Yellow Line)
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

        {/* Why Green Park */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Choose Our <span className="text-green-600">Green Park Center</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Train,
                  title: 'Yellow Line Access',
                  desc: '4 min walk from Green Park Metro',
                },
                {
                  icon: Building2,
                  title: 'Central Location',
                  desc: 'Easy access from Hauz Khas, IIT area',
                },
                {
                  icon: Users,
                  title: 'College-Friendly',
                  desc: 'Perfect for degree + NEET students',
                },
                {
                  icon: Trophy,
                  title: 'High Success',
                  desc: '100+ NEET selections from this center',
                },
              ].map((item, idx) => (
                <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-green-600" />
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
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504!2d77.209!3d28.560!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGreen+Park+Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                  title="Green Park NEET Coaching Center"
                  height={350}
                  placeholder={{
                    lat: 28.560,
                    lng: 77.209,
                    address: `${center.streetAddress}, ${center.addressLocality}`
                  }}
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-500" />
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
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Train className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">By Metro (Recommended)</h4>
                        <p className="text-gray-600 text-sm">
                          Green Park Metro (Yellow Line) - 4 min walk
                          <br />
                          Hauz Khas Metro (Yellow + Magenta) - 8 min by auto
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
                          Aurobindo Marg → Green Park Main Road
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
                        <h4 className="font-semibold">From IIT/JNU</h4>
                        <p className="text-gray-600 text-sm">
                          10-12 min by auto from IIT Gate
                          <br />
                          15 min by e-rickshaw from JNU
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
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Students From These Areas Join Our Green Park Center
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

        <RelatedLocations
          currentLocation="Green Park"
          locations={getRelatedLocations('green-park')}
          className="bg-white"
        />

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '100+', label: 'NEET Selections' },
                { value: '98%', label: 'Success Rate' },
                { value: '6+', label: 'Years at Green Park' },
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
              Frequently Asked Questions - Green Park Center
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
        <section className="py-12 bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Visit Our Green Park Center Today!
            </h2>
            <p className="text-lg mb-6 opacity-90">Book a free demo class near Hauz Khas</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
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

      <MobilePhoneStickyBar phoneNumber={CONTACT_INFO.phone.primary} source="green-park-location" />
    </>
  )
}
