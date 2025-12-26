'use client'

import React, { useState, useEffect } from 'react'
import { CountryContent } from '@/lib/international/countryContentService'
import { CurrencySelector, InternationalPricingCard } from './CurrencySelector'
import { TimezoneSchedule } from './TimezoneSchedule'
import { usePersonalization } from '@/components/providers/PersonalizationProvider'
import {
  Globe,
  Star,
  Users,
  GraduationCap,
  CheckCircle2,
  BarChart2,
  Clock,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

interface CountryLandingPageProps {
  countryContent: CountryContent
  countryCode: string
}

export function CountryLandingPage({ countryContent, countryCode }: CountryLandingPageProps) {
  const { updatePreferences, trackBehavior } = usePersonalization()
  const [selectedCurrency, setSelectedCurrency] = useState(countryContent.currency as any)
  const [showScheduling, setShowScheduling] = useState(false)

  useEffect(() => {
    // Update user preferences with country info
    updatePreferences({
      location: {
        country: countryContent.name,
        timezone: countryContent.timezone,
      },
      preferredCurrency: countryContent.currency as any,
    })

    // Track country page visit
    trackBehavior('country_page_visit', {
      country: countryContent.name,
      countryCode,
    })
  }, [countryContent, countryCode])

  const handleEnrollClick = (courseType: string) => {
    trackBehavior('enrollment_intent', {
      country: countryContent.name,
      courseType,
      currency: selectedCurrency,
    })

    // Redirect to enrollment with country context
    window.location.href = `/enroll?country=${countryCode}&course=${courseType}&currency=${selectedCurrency}`
  }

  const handleContactClick = (method: string) => {
    trackBehavior('contact_click', {
      country: countryContent.name,
      method,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="h-8 w-8 text-blue-300" />
                <span className="text-blue-300 font-semibold">{countryContent.name}</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {countryContent.heroMessage}
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {countryContent.value_proposition}
              </p>

              {/* Social Proof */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300">
                    {countryContent.socialProof.totalStudents.toLocaleString()}+
                  </div>
                  <div className="text-sm text-blue-200">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300">
                    {countryContent.socialProof.successRate}
                  </div>
                  <div className="text-sm text-blue-200">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">
                    {countryContent.socialProof.averageScore}
                  </div>
                  <div className="text-sm text-blue-200">Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-300">
                    {countryContent.socialProof.yearsOfExperience}+
                  </div>
                  <div className="text-sm text-blue-200">Years</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleEnrollClick('popular')}
                  className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
                >
                  Enroll Now
                </button>
                <button
                  onClick={() => setShowScheduling(true)}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
                >
                  View Class Schedule
                </button>
              </div>
            </div>

            <div className="lg:text-right">
              <CurrencySelector
                onCurrencyChange={setSelectedCurrency}
                showPriceExample={true}
                className="mb-8"
              />

              {/* Quick Contact */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${countryContent.contactInfo.phone}`}
                    onClick={() => handleContactClick('phone')}
                    className="flex items-center space-x-3 hover:text-blue-300 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{countryContent.contactInfo.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${countryContent.contactInfo.whatsapp.replace(/[^\d]/g, '')}`}
                    onClick={() => handleContactClick('whatsapp')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:text-green-300 transition-colors"
                  >
                    <span className="text-green-400">📱</span>
                    <span>WhatsApp: {countryContent.contactInfo.whatsapp}</span>
                  </a>
                  <div className="flex items-center space-x-3 text-blue-200">
                    <Clock className="h-5 w-5" />
                    <span>{countryContent.contactInfo.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Offers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Exclusive Offers for {countryContent.name}
            </h2>
            <p className="text-xl text-gray-600">
              Special benefits designed for students in {countryContent.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryContent.localOffers.map((offer, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 font-medium">{offer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Accepted Payment Methods</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {countryContent.paymentMethods.map((method) => (
                <span
                  key={method}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories from {countryContent.name}
            </h2>
            <p className="text-xl text-gray-600">
              Hear from students who achieved their medical dreams
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {countryContent.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {testimonial.score}
                      </span>
                      {testimonial.university && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {testimonial.university}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.message}"</p>
                <div className="mt-3 text-sm text-gray-500">
                  {testimonial.course} • {testimonial.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Program</h2>
            <p className="text-xl text-gray-600">
              Flexible courses designed for {countryContent.name} students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InternationalPricingCard
              courseType="foundation"
              title="Foundation Course"
              description="Perfect for building strong biology fundamentals"
              features={[
                'Complete NCERT coverage',
                'Interactive live classes',
                'Doubt resolution sessions',
                'Monthly assessments',
                'Study materials included',
              ]}
              currency={selectedCurrency}
              onEnroll={() => handleEnrollClick('foundation')}
            />

            <InternationalPricingCard
              courseType="class12"
              title="Class 12th Intensive"
              description="Comprehensive preparation for final year"
              features={[
                'Board + entrance exam prep',
                'Advanced problem solving',
                'Regular mock tests',
                'Performance analysis',
                'Career counseling',
              ]}
              currency={selectedCurrency}
              isPopular={true}
              onEnroll={() => handleEnrollClick('class12')}
            />

            <InternationalPricingCard
              courseType="dropper"
              title="Dropper Program"
              description="Intensive program for gap year students"
              features={[
                'Complete syllabus revision',
                'Intensive practice sessions',
                'Personalized study plan',
                'Psychology support',
                'Guaranteed improvement',
              ]}
              currency={selectedCurrency}
              onEnroll={() => handleEnrollClick('dropper')}
            />
          </div>
        </div>
      </section>

      {/* Top Universities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Students Are Studying At</h2>
            <p className="text-xl text-gray-600">
              Top medical universities where our {countryContent.name} students got admitted
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {countryContent.socialProof.topUniversities.map((university, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200"
              >
                <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm">{university}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to start your medical journey? Our team in {countryContent.name} is here to
                help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">{countryContent.contactInfo.phone}</p>
                    <p className="text-sm text-gray-500">
                      {countryContent.contactInfo.preferredContact}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">{countryContent.contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">{countryContent.contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">{countryContent.contactInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white border-2 border-navy-200 shadow-sm rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Course Timing for {countryContent.name}
                </h3>
                <p className="text-gray-700 mb-6">{countryContent.courseTiming}</p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Language Support:</h4>
                  <div className="flex flex-wrap gap-2">
                    {countryContent.languageSupport.map((language) => (
                      <span
                        key={language}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowScheduling(true)}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Detailed Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timezone Schedule Modal */}
      {showScheduling && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Class Schedules for {countryContent.name}
                </h2>
                <button
                  onClick={() => setShowScheduling(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <TimezoneSchedule
                onScheduleSelect={(schedule) => {
                  trackBehavior('schedule_selected', {
                    country: countryContent.name,
                    scheduleId: schedule.id,
                  })
                  setShowScheduling(false)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
