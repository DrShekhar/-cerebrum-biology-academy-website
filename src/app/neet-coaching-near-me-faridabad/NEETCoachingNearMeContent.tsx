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
  { name: 'Sector 15', distance: '2 km', time: '5 min', direction: 'South' },
  { name: 'Sector 16', distance: '1 km', time: '3 min', direction: 'West' },
  { name: 'NIT Faridabad', distance: '5 km', time: '12 min', direction: 'North' },
  { name: 'Old Faridabad', distance: '6 km', time: '15 min', direction: 'North-West' },
  { name: 'Greater Faridabad', distance: '10 km', time: '20 min', direction: 'South' },
  { name: 'Ballabgarh', distance: '12 km', time: '22 min', direction: 'South' },
  { name: 'Sector 28-29', distance: '4 km', time: '10 min', direction: 'East' },
  { name: 'Sector 21', distance: '3 km', time: '7 min', direction: 'South' },
  { name: 'BPTP Parklands', distance: '8 km', time: '18 min', direction: 'South' },
  { name: 'Omaxe Heights', distance: '7 km', time: '15 min', direction: 'South-East' },
  { name: 'Sector 75-89', distance: '9 km', time: '18 min', direction: 'South' },
  { name: 'Neelam Chowk', distance: '3 km', time: '8 min', direction: 'North' },
]

const transportOptions = [
  {
    mode: 'By Car',
    icon: Car,
    details: 'Ample parking available. Easy access via Mathura Road and Faridabad-Delhi Road.',
  },
  {
    mode: 'By Metro',
    icon: Train,
    details:
      'Nearest: Bata Chowk Metro (5 min walk). Also accessible from Neelam Chowk Ajronda and Old Faridabad stations.',
  },
  {
    mode: 'By Auto/Cab',
    icon: Navigation,
    details:
      'Ola/Uber readily available. Shared autos from major junctions. Approx ₹50-150 from most areas.',
  },
]

const whyLocation = [
  {
    title: 'Central Location',
    description:
      'Sector 17 is centrally positioned for all major Faridabad areas - NIT, Old Faridabad, Greater Faridabad.',
    icon: Compass,
  },
  {
    title: 'Easy Metro Access',
    description: 'Just 5 minutes walk from Bata Chowk Metro Station on Violet Line.',
    icon: Train,
  },
  {
    title: 'Parking Available',
    description: 'Free parking for students near our Sector 17 center.',
    icon: Car,
  },
  {
    title: 'Safe Neighborhood',
    description:
      'Located in a well-developed commercial area with security and well-lit surroundings.',
    icon: Building,
  },
]

const successStats = [
  { stat: '15 min', label: 'Avg. Commute Time' },
  { stat: '500+', label: 'Students from 50+ Areas' },
  { stat: '98%', label: 'Students Find Location Convenient' },
  { stat: '24/7', label: 'Online Support Available' },
]

export default function NEETCoachingNearMeContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-coaching-near-me-faridabad',
      message:
        'Hi! I am looking for NEET coaching near me in Faridabad. Please share your location details and how to reach from my area.',
      campaign: 'near-me-faridabad',
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
              <Link href="/neet-coaching-faridabad" className="text-gray-600 hover:text-teal-600">
                NEET Coaching Faridabad
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
              Central Faridabad Location - Sector 17
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Coaching Near Me
              <span className="block text-yellow-400 mt-2">in Faridabad</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Looking for the best NEET coaching near you? Our Sector 17 center is centrally
              located, accessible within 15-20 minutes from all major Faridabad areas.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>Sector 17, Faridabad</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>15 min from most areas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-green-400" />
                <span>1,50,000+ Students Enrolled</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CONTACT_INFO.location.faridabad.mapUrl} target="_blank" rel="noopener">
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

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Location</h2>
            <p className="text-xl text-slate-600">Sector 17, Faridabad</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[400px]">
              <LazyGoogleMap
                embedUrl={CONTACT_INFO.location.faridabad.mapUrl}
                title="Cerebrum Biology Academy Location - Sector 17 Faridabad"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Address</h3>
                <p className="text-slate-600 mb-4">
                  {CONTACT_INFO.location.faridabad.streetAddress}, Faridabad 121002
                </p>
                <div className="flex gap-4">
                  <a href={CONTACT_INFO.location.faridabad.mapUrl} target="_blank" rel="noopener">
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
                  <a href={`tel:${CONTACT_INFO.phone.primary}`} className="hover:text-teal-600">
                    {CONTACT_INFO.phone.primary}
                  </a>
                </p>
                <p className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Open 24/7 — Online Classes Available Globally
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
              Distance from Your Area
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
                  <span className="text-slate-600">{area.time} drive</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How to Reach Us</h2>
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
              Why Sector 17 is the Perfect Location
            </h2>
            <p className="text-xl text-teal-100">
              Central position for students from all Faridabad areas
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
            Explore NEET Coaching in Faridabad
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/best-neet-coaching-faridabad"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Best NEET Coaching</h3>
              <p className="text-sm text-gray-600">Top institutes compared</p>
            </Link>
            <Link
              href="/affordable-neet-coaching-faridabad"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Affordable Coaching</h3>
              <p className="text-sm text-gray-600">Budget-friendly options</p>
            </Link>
            <Link
              href="/neet-dropper-batch-faridabad"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Dropper Batch</h3>
              <p className="text-sm text-gray-600">Repeater programs</p>
            </Link>
            <Link
              href="/neet-coaching-faridabad"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">All Faridabad Programs</h3>
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
            <a href={CONTACT_INFO.location.faridabad.mapUrl} target="_blank" rel="noopener">
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
