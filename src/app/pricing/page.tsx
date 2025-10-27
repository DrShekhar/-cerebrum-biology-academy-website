'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  BeakerIcon,
  TrophyIcon,
  CalendarIcon,
  ShieldCheckIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'

interface PricingPlan {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice: number
  discount: number
  duration: string
  popular: boolean
  features: string[]
  notIncluded?: string[]
  installments: {
    quarterly: number
    monthly: number
  }
  targetStudents: string[]
  courseSlug: string
}

export default function PricingPage() {
  const [paymentMode, setPaymentMode] = useState<'full' | 'installment'>('full')

  const pricingPlans: PricingPlan[] = [
    {
      id: 'neet-complete',
      name: 'NEET Complete Course',
      subtitle: 'Class 11 + 12 Biology (2 Years)',
      price: 75000,
      originalPrice: 150000,
      discount: 50,
      duration: '2 Years',
      popular: true,
      features: [
        '720+ hours of live interactive classes',
        'Small batch size - Only 50 students per batch',
        'Personal mentorship from AIIMS faculty (Dr. Shekhar)',
        'Complete NCERT + AIIMS/NEET PYQs coverage',
        '10,000+ practice questions with detailed solutions',
        '52 full-length mock tests (simulated exam environment)',
        '24/7 AI-powered doubt resolution (ClaudeChat)',
        'Personalized study planner & performance analytics',
        'Downloadable study materials & notes (PDF)',
        'Weekly doubt clearing sessions',
        'Topic-wise test series',
        'Admission guidance for NEET counseling',
        'Access to recorded lectures (lifetime)',
        'Parent-teacher meetings (monthly)',
        'Money-back guarantee if not satisfied',
      ],
      targetStudents: ['Class 11 students starting NEET preparation', 'Serious NEET aspirants'],
      installments: {
        quarterly: 18750,
        monthly: 6250,
      },
      courseSlug: '/courses/neet-complete',
    },
    {
      id: 'class-11',
      name: 'Class 11 Biology',
      subtitle: 'Foundation for NEET & Boards',
      price: 40000,
      originalPrice: 80000,
      discount: 50,
      duration: '1 Year',
      popular: false,
      features: [
        '360+ hours of live classes',
        'Batch size: 50 students',
        'NCERT + State board syllabus coverage',
        'AIIMS faculty teaching',
        '5,000+ practice questions',
        '26 chapter-wise tests + 12 full-length tests',
        'AI doubt resolution',
        'Study materials & notes',
        'Weekly doubt sessions',
        'Performance tracking dashboard',
        'Recorded lectures access',
        'Board exam preparation',
      ],
      targetStudents: ['Class 11 students', 'First-time NEET aspirants'],
      installments: {
        quarterly: 10000,
        monthly: 3334,
      },
      courseSlug: '/courses/class-11',
    },
    {
      id: 'class-12',
      name: 'Class 12 Biology',
      subtitle: 'Final Year NEET Preparation',
      price: 45000,
      originalPrice: 90000,
      discount: 50,
      duration: '1 Year',
      popular: false,
      features: [
        '400+ hours of live classes',
        'Batch size: 50 students',
        'NEET-focused curriculum',
        'AIIMS faculty (Dr. Shekhar)',
        '6,000+ practice questions',
        '30 chapter-wise + 20 full-length mock tests',
        'AI doubt clearing',
        'Comprehensive study materials',
        'Weekly doubt sessions',
        'NEET exam strategy sessions',
        'Previous year questions analysis',
        'Time management techniques',
        'Counseling guidance',
      ],
      targetStudents: ['Class 12 students', 'NEET 2026 aspirants'],
      installments: {
        quarterly: 11250,
        monthly: 3750,
      },
      courseSlug: '/courses/class-12',
    },
    {
      id: 'dropper',
      name: 'Dropper/Repeater Batch',
      subtitle: 'Intensive NEET Crash Course',
      price: 60000,
      originalPrice: 120000,
      discount: 50,
      duration: '1 Year',
      popular: false,
      features: [
        '600+ hours of intensive revision',
        'Small batch: 50 students',
        'Complete syllabus revision (11th + 12th)',
        'AIIMS faculty guidance',
        '15,000+ practice questions',
        '50 full-length mock tests',
        'Personalized weak area improvement plan',
        'AI-powered adaptive learning',
        'Daily practice sessions',
        'Exam psychology & stress management',
        'Previous attempt analysis',
        'Strategy for score improvement',
        'Dedicated mentor support',
        'NEET counseling assistance',
      ],
      notIncluded: [],
      targetStudents: ['NEET repeaters', 'Gap year students', 'Those who missed NEET cutoff'],
      installments: {
        quarterly: 15000,
        monthly: 5000,
      },
      courseSlug: '/courses/dropper',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SparklesIcon className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transparent & Affordable Pricing</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            World-class NEET Biology coaching at 50% off - Limited time offer
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCardIcon className="w-5 h-5" />
              <span>EMI options available</span>
            </div>
            <div className="flex items-center gap-2">
              <TrophyIcon className="w-5 h-5" />
              <span>98% success rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Mode Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-white shadow-lg p-1">
            <button
              onClick={() => setPaymentMode('full')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                paymentMode === 'full'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Full Payment (Save More)
            </button>
            <button
              onClick={() => setPaymentMode('installment')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                paymentMode === 'installment'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EMI / Installments
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? 'ring-4 ring-blue-500 ring-offset-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">
                  🔥 MOST POPULAR
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.subtitle}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{plan.duration}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  {paymentMode === 'full' ? (
                    <>
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-gray-400 line-through text-lg">
                          ₹{plan.originalPrice.toLocaleString()}
                        </span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                          {plan.discount}% OFF
                        </span>
                      </div>
                      <div className="text-5xl font-bold text-gray-900 mb-2">
                        ₹{plan.price.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-500">One-time payment</p>
                      <p className="text-xs text-green-600 mt-1">
                        Save ₹{(plan.originalPrice - plan.price).toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-gray-600 text-sm mb-2">Starting from</div>
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        ₹{plan.installments.monthly.toLocaleString()}/mo
                      </div>
                      <p className="text-sm text-gray-500">
                        or ₹{plan.installments.quarterly.toLocaleString()}/quarter
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Total: ₹{plan.price.toLocaleString()}
                      </p>
                    </>
                  )}
                </div>

                {/* Target Students */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>Perfect For:</span>
                  </div>
                  <ul className="space-y-1">
                    {plan.targetStudents.map((student, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        • {student}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.slice(0, 8).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 8 && (
                    <details className="text-sm text-blue-600 cursor-pointer">
                      <summary className="font-medium">
                        + {plan.features.length - 8} more features
                      </summary>
                      <div className="mt-2 space-y-2">
                        {plan.features.slice(8).map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link href={`${plan.courseSlug}#enroll`}>
                    <Button
                      variant="primary"
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                          : ''
                      }`}
                    >
                      Enroll Now
                    </Button>
                  </Link>
                  <Link href={`${plan.courseSlug}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Detailed Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="pb-4 font-semibold">Feature</th>
                  {pricingPlans.map((plan) => (
                    <th key={plan.id} className="pb-4 text-center font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Live Class Hours</td>
                  <td className="py-4 text-center">720+</td>
                  <td className="py-4 text-center">360+</td>
                  <td className="py-4 text-center">400+</td>
                  <td className="py-4 text-center">600+</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Batch Size</td>
                  <td className="py-4 text-center">50</td>
                  <td className="py-4 text-center">50</td>
                  <td className="py-4 text-center">50</td>
                  <td className="py-4 text-center">50</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">AIIMS Faculty</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Practice Questions</td>
                  <td className="py-4 text-center">10,000+</td>
                  <td className="py-4 text-center">5,000+</td>
                  <td className="py-4 text-center">6,000+</td>
                  <td className="py-4 text-center">15,000+</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Full-Length Mock Tests</td>
                  <td className="py-4 text-center">52</td>
                  <td className="py-4 text-center">12</td>
                  <td className="py-4 text-center">20</td>
                  <td className="py-4 text-center">50</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">AI Doubt Resolution</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Study Materials</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Personal Mentorship</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Counseling Support</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Money-Back Guarantee</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Cerebrum Biology Academy?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <TrophyIcon className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">98% Success Rate</h3>
              <p className="text-blue-100">
                27 students in Top 1000 AIR. Proven track record of excellence.
              </p>
            </div>
            <div className="text-center">
              <AcademicCapIcon className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">AIIMS Faculty</h3>
              <p className="text-blue-100">
                Learn from Dr. Shekhar (AIIMS alumnus) - 15+ years experience
              </p>
            </div>
            <div className="text-center">
              <UserGroupIcon className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Small Batches</h3>
              <p className="text-blue-100">
                Maximum 50 students per batch. Personal attention guaranteed.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                Can I pay in installments?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                Yes! We offer flexible payment options including monthly and quarterly installments.
                No hidden charges or processing fees.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                Is there a money-back guarantee?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                Yes, NEET Complete Course and Dropper Batch come with a 30-day money-back guarantee
                if you're not satisfied with the quality of teaching.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                Are study materials included in the price?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                Yes! All courses include comprehensive study materials, downloadable PDFs, practice
                questions, and mock tests at no extra cost.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                What if I miss a live class?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                All live classes are recorded and available for lifetime access. You can watch them
                anytime from your student dashboard.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                Is the 50% discount available for everyone?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                Yes! This is a limited-time promotional offer available to all new enrollments. Lock
                in this price by enrolling now.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                Can I switch courses after enrollment?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                Yes, you can upgrade to a higher course by paying the price difference within the
                first 30 days of enrollment.
              </p>
            </details>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Join 5,000+ successful students. Limited seats available!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/demo-booking">
                <Button variant="primary" size="lg" className="bg-gray-900 hover:bg-black">
                  Book Free Demo Class
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-gray-900 text-gray-900">
                  Talk to Counselor
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-700 mt-4">
              🔒 Secure payment via Razorpay • 📞 Call +91-88264-44334 for queries
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
