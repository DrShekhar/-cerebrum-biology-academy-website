'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contactInfo'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  GraduationCap,
  Video,
  MessageCircle,
  Building,
  ArrowRight,
  Target,
  BookOpen,
  Brain,
  Stethoscope,
  School,
  Clock,
} from 'lucide-react'
import { StateData, generateStateFAQs } from './StateSchema'
import { FAQDisplay } from './FAQSchema'

interface StateLandingPageProps {
  state: StateData
}

const courses = [
  {
    name: 'Class 11th NEET Biology',
    price: 72200,
    duration: '1 Year',
    features: ['Complete NCERT', 'NEET Pattern Practice', 'Weekly Tests'],
    tag: 'Most Popular',
  },
  {
    name: 'Class 12th NEET Biology',
    price: 72200,
    duration: '1 Year',
    features: ['Board + NEET Prep', 'PYQ Analysis', '100+ Mocks'],
    tag: null,
  },
  {
    name: 'NEET Dropper Batch',
    price: 85500,
    duration: '1 Year',
    features: ['Complete Revision', 'Daily Practice', 'Score Improvement'],
    tag: 'High Demand',
  },
]

export function StateLandingPage({ state }: StateLandingPageProps) {
  const faqs = generateStateFAQs(state)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Serving {state.majorCities.length}+ Cities in {state.name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Best NEET Biology Coaching in{' '}
              <span className="text-yellow-300">{state.name}</span>
            </h1>

            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Join India&apos;s top-rated NEET Biology coaching. AIIMS-trained faculty,
              98% success rate. Online classes for {state.majorCities.slice(0, 3).join(', ')} & all cities.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">98%</div>
                <div className="text-sm text-green-100">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">{state.neetSeats.toLocaleString()}+</div>
                <div className="text-sm text-green-100">{state.name} MBBS Seats</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-green-100">{state.name} Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">4.9★</div>
                <div className="text-sm text-green-100">Google Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => trackAndOpenWhatsApp(WHATSAPP_MESSAGES.DEMO_BOOKING, `state_${state.slug}_hero`)}
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
              >
                <Video className="w-5 h-5" />
                Book FREE Demo Class
              </button>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
              >
                <Phone className="w-5 h-5" />
                {CONTACT_INFO.phone.display.hyphenated.primary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cities We Serve */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Serving Students Across {state.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {state.majorCities.map((city) => (
              <div
                key={city}
                className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200"
              >
                <MapPin className="w-4 h-4" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why {state.name} Students Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by 500+ {state.name} students. Better than local coaching, accessible from anywhere.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: 'AIIMS-Trained Faculty',
                description: `Learn from Dr. Shekhar C Singh, AIIMS alumnus. ${state.capital} students get expert teaching not available locally.`,
              },
              {
                icon: Video,
                title: 'Live Online Classes',
                description: `Attend live interactive classes from ${state.majorCities[0]}, ${state.majorCities[1]} or any city. Same quality as offline coaching.`,
              },
              {
                icon: Users,
                title: 'Small Batch Size',
                description: 'Only 15-20 students per batch. Personal attention for every student from ' + state.name + '.',
              },
              {
                icon: Target,
                title: '98% Success Rate',
                description: `Proven track record. ${state.name} toppers include students who scored 680+ in NEET Biology.`,
              },
              {
                icon: MessageCircle,
                title: '24/7 Doubt Support',
                description: `WhatsApp doubt resolution anytime. ${state.localLanguage} speaking support available.`,
              },
              {
                icon: BookOpen,
                title: 'NCERT-Focused Material',
                description: 'Comprehensive study material aligned with NEET pattern. Better than Kota coaching.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Colleges Target */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Target Medical Colleges in {state.name}
              </h2>
              <p className="text-xl text-gray-600">
                {state.neetSeats.toLocaleString()}+ MBBS seats available. Our {state.name} students regularly get admissions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {state.medicalColleges.map((college, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100"
                >
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{college}</div>
                    <div className="text-sm text-gray-500">Government Medical College</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Plus access to 200+ private medical colleges across India
              </p>
              <Link
                href="/neet-college-predictor"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                <School className="w-5 h-5" />
                Check College Predictor Tool
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Biology Courses for {state.name} Students
            </h2>
            <p className="text-xl text-gray-600">
              Affordable pricing. 60% lower than Kota coaching with better results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
              >
                {course.tag && (
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-2 text-sm font-medium">
                    {course.tag}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-green-600">₹{course.price.toLocaleString()}</span>
                    <span className="text-gray-500">/ {course.duration}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => trackAndOpenWhatsApp(WHATSAPP_MESSAGES.ENROLLMENT, `state_${state.slug}_${course.name.toLowerCase().replace(/\s+/g, '_')}`)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              EMI options available. Special scholarships for meritorious {state.name} students.
            </p>
          </div>
        </div>
      </section>

      {/* Offline Center Info */}
      {state.nearestOfflineCenter && (
        <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Prefer Offline Classes?
                </h3>
                <p className="text-green-100">
                  Our nearest offline center for {state.name} students: <strong>{state.nearestOfflineCenter}</strong>
                </p>
              </div>
              <a
                href="https://maps.google.com/maps?q=Cerebrum+Biology+Academy+South+Extension"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors flex-shrink-0"
              >
                <Building className="w-5 h-5" />
                Get Directions
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                FAQs for {state.name} Students
              </h2>
              <p className="text-xl text-gray-600">
                Common questions from {state.capital} and {state.majorCities[1]} students
              </p>
            </div>
            <FAQDisplay
              questions={faqs}
              title=""
              className="!my-0"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your NEET Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join 500+ {state.name} students already preparing with us.
            Book a FREE demo class today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => trackAndOpenWhatsApp(WHATSAPP_MESSAGES.DEMO_BOOKING, `state_${state.slug}_footer`)}
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Book FREE Demo on WhatsApp
            </button>
            <a
              href={getPhoneLink()}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
            >
              <Phone className="w-5 h-5" />
              Call: {CONTACT_INFO.phone.display.hyphenated.primary}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
