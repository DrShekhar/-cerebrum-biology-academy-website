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
import { UrgencyBanner } from '@/components/landing-pages/UrgencyBanner'

interface FAQ {
  question: string
  answer: string
}

const nearbyAreas = [
  { name: 'Gaur City', distance: '12 km', time: '20 min', direction: 'North-West' },
  { name: 'Knowledge Park', distance: '14 km', time: '25 min', direction: 'South' },
  { name: 'Pari Chowk', distance: '18 km', time: '30 min', direction: 'South' },
  { name: 'Jaypee Greens', distance: '20 km', time: '35 min', direction: 'South' },
  { name: 'Greater Noida West', distance: '10 km', time: '18 min', direction: 'North' },
  { name: 'Alpha Sector', distance: '16 km', time: '28 min', direction: 'South-West' },
  { name: 'Beta Sector', distance: '15 km', time: '26 min', direction: 'South-West' },
  { name: 'Surajpur', distance: '13 km', time: '22 min', direction: 'West' },
  { name: 'Kasna', distance: '22 km', time: '38 min', direction: 'South' },
  { name: 'Sector 62 (Noida)', distance: '0 km', time: '0 min', direction: 'Our Center' },
  { name: 'Noida Extension', distance: '8 km', time: '15 min', direction: 'North' },
  { name: 'Techzone', distance: '11 km', time: '20 min', direction: 'West' },
]

const transportOptions = [
  {
    mode: 'By Car',
    icon: Car,
    details:
      'Via Noida-Greater Noida Expressway to Sector 62, Noida. Ample parking available. 30-45 min from most Greater Noida areas.',
  },
  {
    mode: 'By Metro',
    icon: Train,
    details:
      'Aqua Line Metro to Noida (Sector 52 or City Centre), then Blue Line to Sector 62 (5 min walk from station). Total 45-60 min.',
  },
  {
    mode: 'Online Classes',
    icon: Navigation,
    details:
      'Zero travel time. Join live interactive classes from your Greater Noida home. Most popular choice for Greater Noida students.',
  },
]

const whyLocation = [
  {
    title: 'Online + Hybrid Available',
    description:
      'Greater Noida students can attend online classes from home or hybrid mode — save daily travel time.',
    icon: Compass,
  },
  {
    title: 'Aqua Line Metro Access',
    description:
      'For offline attendance: Aqua Line connects Greater Noida to Noida. Then Blue Line to Sector 62.',
    icon: Train,
  },
  {
    title: 'Expressway Route',
    description: 'Quick road access via Noida-Greater Noida Expressway to our Sector 62 center.',
    icon: Car,
  },
  {
    title: 'Safe Neighborhood',
    description:
      'Sector 62 is a well-developed IT and commercial area with security and well-lit surroundings.',
    icon: Building,
  },
]

const successStats = [
  { stat: '30 min', label: 'Avg. Commute by Road' },
  { stat: '500+', label: 'Greater Noida Students Online' },
  { stat: '98%', label: 'Student Satisfaction Rate' },
  { stat: '24/7', label: 'Online Support Available' },
]

export default function NEETCoachingNearMeGreaterNoidaContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-coaching-near-me-greater-noida',
      message:
        'Hi! I am looking for NEET coaching near me in Greater Noida. Please share details about online/hybrid classes and how to reach from my area.',
      campaign: 'near-me-greater-noida',
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
              <Link
                href="/neet-coaching-greater-noida"
                className="text-gray-600 hover:text-teal-600"
              >
                NEET Coaching Greater Noida
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
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Online + Hybrid for Greater Noida Students
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Coaching Near Me
              <span className="block text-yellow-400 mt-2">in Greater Noida</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Looking for the best NEET coaching near you in Greater Noida? Join online classes from
              home (zero travel) or visit our Sector 62, Noida center via Aqua Line Metro.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>Sector 62, Noida Center</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Online: 0 min from Greater Noida</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-green-400" />
                <span>500+ Greater Noida Students</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://maps.google.com/?q=B-45+Sector+62+Noida"
                target="_blank"
                rel="noopener"
              >
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
                Ask About Online Classes
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
            {successStats.map((item) => (
              <div key={item.label} className="text-center animate-fadeInUp">
                <p className="text-3xl md:text-4xl font-bold text-teal-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distance from Areas */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Distance from Your Greater Noida Area
            </h2>
            <p className="text-xl text-slate-600">
              Find how far our Sector 62 Noida center is from your location
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbyAreas.map((area) => (
              <div
                key={area.name}
                className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100 animate-fadeInUp"
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
            Prefer to study from home?{' '}
            <button onClick={handleWhatsApp} className="text-teal-600 hover:underline">
              Join online classes — zero travel
            </button>
          </p>
        </div>
      </section>

      {/* Transport Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How to Join / Reach Us
            </h2>
            <p className="text-xl text-slate-600">
              Multiple options for Greater Noida students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {transportOptions.map((option) => (
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
      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Best Option for Greater Noida Students
            </h2>
            <p className="text-xl text-teal-100">
              Online + hybrid classes designed for Greater Noida aspirants
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyLocation.map((item) => (
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

      {/* Address Card */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Nearest Center for Greater Noida Students
            </h2>
            <div className="space-y-4">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">B-45, Sector 62, Noida, UP 201301</span>
              </p>
              <p className="flex items-center gap-3">
                <Train className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <span className="text-slate-700">
                  Aqua Line Metro (Greater Noida) → Blue Line → Sector 62 Metro Station
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <a href="tel:+919953643938" className="text-teal-600 hover:underline">
                  +91-99536-43938
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <span className="text-slate-700">Open 24/7 — Online Classes Available Globally</span>
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <a
                href="https://maps.google.com/?q=B-45+Sector+62+Noida"
                target="_blank"
                rel="noopener"
              >
                <Button>
                  <Navigation className="w-4 h-4 mr-2" />
                  Open in Maps
                </Button>
              </a>
              <a href="tel:+919953643938">
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
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
            Explore NEET Coaching in Greater Noida
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/best-neet-coaching-greater-noida"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Best NEET Coaching</h3>
              <p className="text-sm text-gray-600">Top institutes compared</p>
            </Link>
            <Link
              href="/affordable-neet-coaching-greater-noida"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Affordable Coaching</h3>
              <p className="text-sm text-gray-600">Budget-friendly options</p>
            </Link>
            <Link
              href="/online-neet-coaching-greater-noida"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Online Classes</h3>
              <p className="text-sm text-gray-600">Zero travel, same quality</p>
            </Link>
            <Link
              href="/biology-classes-greater-noida"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Biology Classes</h3>
              <p className="text-sm text-gray-600">View all options</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join from Greater Noida?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free demo class — online or at our Sector 62, Noida center
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
            <a
              href="https://maps.google.com/?q=B-45+Sector+62+Noida"
              target="_blank"
              rel="noopener"
            >
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
