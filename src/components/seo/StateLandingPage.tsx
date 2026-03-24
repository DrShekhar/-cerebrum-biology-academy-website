'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contactInfo'
import {
  MapPin,
  Star,
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
} from 'lucide-react'
import { StateData, generateStateFAQs } from './StateSchema'
import { FAQDisplay } from './FAQSchema'

interface StateLandingPageProps {
  state: StateData
}


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
                <div className="text-3xl font-bold text-yellow-300">67+</div>
                <div className="text-sm text-green-100">{state.name} Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">5.0★</div>
                <div className="text-sm text-green-100">Google Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => trackAndOpenWhatsApp({ message: WHATSAPP_MESSAGES.demo, source: `state_${state.slug}_hero` })}
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

      {/* NEET in State - Unique Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              NEET Preparation for {state.name} Students
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {state.medicalColleges.length} Medical Colleges
                </h3>
                <p className="text-gray-600 mb-3">
                  {state.name} has {state.neetSeats.toLocaleString()}+ MBBS seats across government colleges
                  including {state.medicalColleges.slice(0, 2).join(' and ')}.
                </p>
                <Link
                  href="/neet-college-predictor"
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Check your college chances →
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {state.educationFocus[0]} Focus
                </h3>
                <p className="text-gray-600 mb-3">
                  Our curriculum covers both CBSE and state board ({state.localLanguage} medium) biology
                  with NEET-aligned teaching for {state.capital} and {state.majorCities[1]} students.
                </p>
                <Link
                  href="/courses"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View course details →
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <School className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Major Cities Covered
                </h3>
                <p className="text-gray-600">
                  Students from {state.majorCities.slice(0, 5).join(', ')} and other cities in{' '}
                  {state.name} attend our live online classes with full doubt support.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Online + Offline Access
                </h3>
                <p className="text-gray-600">
                  Live interactive classes from anywhere in {state.name}.
                  {state.nearestOfflineCenter && (
                    <> Nearest offline center: {state.nearestOfflineCenter}.</>
                  )}
                </p>
              </div>
            </div>
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

      {/* Courses CTA */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                NEET Biology Courses for {state.name} Students
              </h2>
              <p className="text-green-100">
                Classes 9-12 + Dropper batches. 60% lower than Kota coaching. EMI available.
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors flex-shrink-0"
            >
              <BookOpen className="w-5 h-5" />
              View Courses & Fees
            </Link>
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
              onClick={() => trackAndOpenWhatsApp({ message: WHATSAPP_MESSAGES.demo, source: `state_${state.slug}_footer` })}
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
