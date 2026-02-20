'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Users,
  Clock,
  Navigation,
  Car,
  Train,
  Building,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { UrgencyBanner } from '@/components/landing-pages/UrgencyBanner'

interface FAQ {
  question: string
  answer: string
}

const nearbyAreas = [
  { name: 'Vaishali', distance: '5 km', time: '10 min', direction: 'Blue Line Metro' },
  { name: 'Kaushambi', distance: '6 km', time: '12 min', direction: 'Blue Line Metro' },
  { name: 'Indirapuram', distance: '8 km', time: '20 min', direction: 'Via NH-58' },
  { name: 'Raj Nagar Extension', distance: '14 km', time: '30 min', direction: 'Via NH-58' },
  { name: 'Vasundhara', distance: '9 km', time: '22 min', direction: 'Via NH-58' },
  { name: 'Crossings Republik', distance: '18 km', time: '35 min', direction: 'Via NH-58' },
  { name: 'Sector 62 Noida', distance: '0 km', time: '0 min', direction: 'Our Center' },
  { name: 'Sector 63 Noida', distance: '2 km', time: '5 min', direction: 'South' },
  { name: 'Pratap Vihar', distance: '7 km', time: '18 min', direction: 'Via NH-58' },
  { name: 'Shalimar Garden', distance: '8 km', time: '20 min', direction: 'Via NH-58' },
  { name: 'Mohan Nagar', distance: '10 km', time: '25 min', direction: 'Via NH-58' },
  { name: 'Govindpuram', distance: '12 km', time: '28 min', direction: 'Via NH-58' },
]

const transportOptions = [
  {
    mode: 'By Metro (Recommended)',
    icon: Train,
    details:
      'Blue Line Metro from Vaishali or Kaushambi station directly to Sector 62. 15-20 min commute. No traffic hassle.',
  },
  {
    mode: 'By Car',
    icon: Car,
    details:
      'Ample parking available. Easy access via NH-58/NH-24. Takes 20-35 min depending on Ghaziabad area.',
  },
  {
    mode: 'By Auto/Cab',
    icon: Navigation,
    details:
      'Ola/Uber readily available. Shared autos from Vaishali/Kaushambi. Approx ₹80-200 from most Ghaziabad areas.',
  },
]

const whyLocation = [
  {
    title: 'Blue Line Metro Access',
    description:
      'Direct metro connectivity from Vaishali and Kaushambi stations to Sector 62 Noida.',
    icon: Train,
  },
  {
    title: 'Central for Ghaziabad',
    description:
      'Sector 62 Noida is strategically positioned for students from Indirapuram, Vaishali, Kaushambi.',
    icon: Compass,
  },
  {
    title: 'Parking Available',
    description: 'Free parking for students near our Sector 62 center.',
    icon: Car,
  },
  {
    title: 'Safe Neighborhood',
    description:
      'Located in a well-developed commercial area of Noida with security and well-lit surroundings.',
    icon: Building,
  },
]

const successStats = [
  { stat: '20 min', label: 'Avg. Commute via Metro' },
  { stat: '500+', label: 'Students from 50+ Areas' },
  { stat: '98%', label: 'Students Find Location Convenient' },
  { stat: '24/7', label: 'Online Support Available' },
]

export default function NEETCoachingNearMeGhaziabadContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-coaching-near-me-ghaziabad',
      message:
        'Hi! I am looking for NEET coaching near me in Ghaziabad. Please share your location details and how to reach from my area.',
      campaign: 'near-me-ghaziabad',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/neet-coaching-ghaziabad" className="text-gray-600 hover:text-teal-600">
                NEET Coaching Ghaziabad
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Near Me</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-700 to-cyan-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              B-45, Sector 62, Noida - via Blue Line Metro
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Coaching Near Me
              <span className="block text-yellow-400 mt-2">in Ghaziabad</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Looking for the best NEET coaching near you? Our Sector 62 Noida center is easily
              accessible from all Ghaziabad areas via Blue Line Metro from Vaishali and Kaushambi.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>Sector 62, Noida</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>20 min via Blue Line Metro</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-green-400" />
                <span>500+ Students Enrolled</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://maps.google.com/?q=B-45+Sector+62+Noida" target="_blank" rel="noopener">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
              </a>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp"
              >
                <Phone className="w-5 h-5" />
                Ask Distance from My Area
              </button>
            </div>

            {/* Urgency Banner */}
            <UrgencyBanner
              batchStartDate="Feb 10, 2026"
              seatsTotal={15}
              seatsFilled={12}
              showCountdown={true}
            />
          </div>
        </div>
      </section>

      {/* Metro Access Banner */}
      <section className="py-4 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium">
            Easily accessible from all Ghaziabad areas via Blue Line Metro to Sector 62 — Vaishali
            &amp; Kaushambi stations connect directly (15-20 min)
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {successStats.map((item, index) => (
              <div key={item.label} className="text-center animate-fadeInUp">
                <p className="text-3xl md:text-4xl font-bold text-teal-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Location</h2>
            <p className="text-xl text-slate-600">B-45, Sector 62, Noida, UP 201301</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[400px]">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Map: B-45, Sector 62, Noida</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Address</h3>
                <p className="text-slate-600 mb-4">
                  B-45, Sector 62, Noida, UP 201301
                </p>
                <p className="text-slate-500 text-sm mb-4">
                  Nearest Metro: Sector 62 Station (Blue Line) — 5 min walk
                </p>
                <div className="flex gap-4">
                  <a href="https://maps.google.com/?q=B-45+Sector+62+Noida" target="_blank" rel="noopener">
                    <Button>
                      <Navigation className="w-4 h-4 mr-2" />
                      Open in Google Maps
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Contact</h3>
                <p className="flex items-center gap-2 text-slate-600 mb-2">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <a href="tel:+919953643938" className="hover:text-teal-600">
                    +91-99536-43938
                  </a>
                </p>
                <p className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Mon-Sat: 8 AM - 8 PM, Sun: 9 AM - 5 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distance from Areas */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Distance from Your Ghaziabad Area
            </h2>
            <p className="text-xl text-slate-600">Find how far we are from your location</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbyAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100 animate-fadeInUp"
              >
                <h3 className="font-bold text-slate-900">{area.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-teal-600">{area.distance}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-600">{area.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{area.direction}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 mt-6">
            Cant find your area?{' '}
            <button onClick={handleWhatsApp} className="text-teal-600 hover:underline">
              Ask us on WhatsApp
            </button>
          </p>
        </div>
      </section>

      {/* Transport Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How to Reach Us from Ghaziabad</h2>
            <p className="text-xl text-slate-600">Multiple transport options available</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {transportOptions.map((option, index) => (
              <div
                key={option.mode}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <option.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{option.mode}</h3>
                <p className="text-slate-600 text-sm">{option.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Location */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Sector 62 Noida is Ideal for Ghaziabad Students
            </h2>
            <p className="text-xl text-teal-100">
              Direct Blue Line Metro connection from Vaishali and Kaushambi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyLocation.map((item, index) => (
              <div
                key={item.title}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-teal-100 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Use our AI-powered tools to boost your preparation"
      />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore NEET Coaching for Ghaziabad
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/best-neet-coaching-ghaziabad"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Best NEET Coaching</h3>
              <p className="text-sm text-gray-600">Top institutes compared</p>
            </Link>
            <Link
              href="/affordable-neet-coaching-ghaziabad"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Affordable Coaching</h3>
              <p className="text-sm text-gray-600">Budget-friendly options</p>
            </Link>
            <Link
              href="/neet-dropper-batch-ghaziabad"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Dropper Batch</h3>
              <p className="text-sm text-gray-600">Repeater programs</p>
            </Link>
            <Link
              href="/neet-coaching-ghaziabad"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">All Ghaziabad Programs</h3>
              <p className="text-sm text-gray-600">View all options</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Visit Our Center?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free demo class and see our facility in person
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-teal-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <a href="https://maps.google.com/?q=B-45+Sector+62+Noida" target="_blank" rel="noopener">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-teal-600"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
