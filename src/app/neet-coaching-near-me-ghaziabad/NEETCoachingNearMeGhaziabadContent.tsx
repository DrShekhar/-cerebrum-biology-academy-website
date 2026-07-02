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
import { UrgencyBanner } from '@/components/landing-pages/UrgencyBanner'

interface FAQ {
  question: string
  answer: string
}

const nearbyAreas = [
  { name: 'Vaishali', direction: 'Live online' },
  { name: 'Kaushambi', direction: 'Live online' },
  { name: 'Indirapuram', direction: 'Live online' },
  { name: 'Raj Nagar Extension', direction: 'Live online' },
  { name: 'Vasundhara', direction: 'Live online' },
  { name: 'Crossings Republik', direction: 'Live online' },
  { name: 'Pratap Vihar', direction: 'Live online' },
  { name: 'Shalimar Garden', direction: 'Live online' },
  { name: 'Mohan Nagar', direction: 'Live online' },
  { name: 'Govindpuram', direction: 'Live online' },
]

const transportOptions = [
  {
    mode: 'Live Online (Recommended)',
    icon: Navigation,
    details:
      'Zero travel time. Join live interactive classes from your Ghaziabad home — same AIIMS faculty, recorded sessions for revision.',
  },
  {
    mode: 'Flexible Timings',
    icon: Clock,
    details:
      'Morning, evening and weekend batches available online. Balance school and NEET prep without commuting.',
  },
  {
    mode: 'Nearest Walk-in Centre',
    icon: Car,
    details:
      'Prefer in-person? Our nearest walk-in centre is South Extension, New Delhi. Most Ghaziabad students choose online for convenience.',
  },
]

const whyLocation = [
  {
    title: 'Learn From Home',
    description:
      'Live online NEET Biology classes for Vaishali, Kaushambi, Indirapuram and all Ghaziabad areas — no commute.',
    icon: Compass,
  },
  {
    title: 'Same AIIMS Faculty',
    description:
      'Online students get the same AIIMS-trained faculty and curriculum as our in-person centres.',
    icon: Building,
  },
  {
    title: 'Recorded Revision',
    description: 'Every live class is recorded so Ghaziabad students can revise anytime.',
    icon: Train,
  },
  {
    title: 'Small Batches',
    description:
      'Small online batches ensure personal attention and doubt-clearing for every student.',
    icon: Users,
  },
]

const successStats = [
  { stat: 'Live', label: 'Online Classes Daily' },
  { stat: '500+', label: 'Students from 50+ Areas' },
  { stat: '98%', label: 'NEET Qualification Rate' },
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
              Live Online NEET Coaching for Ghaziabad
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Coaching Near Me
              <span className="block text-yellow-400 mt-2">in Ghaziabad</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Looking for the best NEET coaching near you in Ghaziabad? Join our live online classes
              from home — same AIIMS-trained faculty for students across Vaishali, Kaushambi,
              Indirapuram and all Ghaziabad areas. No commute needed.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>Live Online Classes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Learn From Home</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-green-400" />
                <span>500+ Students Enrolled</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20NEET%20Biology%20coaching%20in%20Ghaziabad.%20Please%20share%20available%20timings."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp"
              >
                <Phone className="w-5 h-5" />
                Ask on WhatsApp
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

      {/* Online Access Banner */}
      <section className="py-4 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium">
            Live online NEET Biology coaching for all Ghaziabad areas — Vaishali, Kaushambi,
            Indirapuram and more. Learn from home, no commute needed.
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

      {/* How We Teach Ghaziabad */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Live Online NEET Coaching for Ghaziabad
            </h2>
            <p className="text-xl text-slate-600">
              Same AIIMS faculty and curriculum as our in-person centres — delivered live to your
              home
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Why Online Works for Ghaziabad
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  Learn from home across Vaishali, Kaushambi, Indirapuram and all Ghaziabad areas —
                  no daily commute.
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  Small live batches with the same AIIMS-trained faculty as our in-person centres.
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  Recorded sessions for revision. Prefer in-person? Our nearest walk-in centre is
                  South Extension, New Delhi.
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Contact</h3>
                <p className="flex items-center gap-2 text-slate-600 mb-2">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <a href="tel:+918826444334" className="hover:text-teal-600">
                    +91-88264-44334
                  </a>
                </p>
                <p className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Online classes available with flexible batch timings
                </p>
                <div className="flex gap-4 mt-4">
                  <button onClick={handleWhatsApp}>
                    <Button>
                      <Phone className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ghaziabad Areas We Serve
            </h2>
            <p className="text-xl text-slate-600">
              Live online NEET Biology coaching across Ghaziabad
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbyAreas.map((area) => (
              <div
                key={area.name}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100 animate-fadeInUp"
              >
                <h3 className="font-bold text-slate-900">{area.name}</h3>
                <p className="text-xs text-teal-600 font-medium mt-2">{area.direction}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 mt-6">
            Dont see your area?{' '}
            <button onClick={handleWhatsApp} className="text-teal-600 hover:underline">
              Ask us on WhatsApp
            </button>
          </p>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How to Join from Ghaziabad
            </h2>
            <p className="text-xl text-slate-600">Flexible ways to start your NEET preparation</p>
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
              Why Online Coaching is Ideal for Ghaziabad Students
            </h2>
            <p className="text-xl text-teal-100">
              Same AIIMS faculty, small batches, zero commute — learn from home
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
              href="/best-neet-coaching-ghaziabad"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start from Home?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free live online demo class and experience our teaching
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20NEET%20Biology%20coaching%20in%20Ghaziabad.%20Please%20share%20available%20timings."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-teal-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <a href="tel:+918826444334">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-teal-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
