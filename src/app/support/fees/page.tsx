'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  CreditCard,
  CheckCircle,
  Star,
  Award,
  Calculator,
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Users,
  BookOpen,
  Target,
  Gift,
  AlertCircle,
  DollarSign,
  Calendar,
  Percent,
  PiggyBank,
  FileText,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FeesPage() {
  const [selectedPlan, setSelectedPlan] = useState('class-12')
  const [showEMI, setShowEMI] = useState(false)

  const coursePackages = [
    {
      id: 'foundation',
      title: 'Foundation Course',
      subtitle: 'Class 9th - 10th',
      originalPrice: 29999,
      discountedPrice: 19999,
      discount: 33,
      duration: '2 Years',
      popular: false,
      features: [
        'Complete PCB foundation',
        'Conceptual clarity building',
        'Regular assessments',
        'Study material included',
        'Online doubt clearing',
        'Parent interaction sessions',
      ],
      emiOptions: [
        { months: 6, amount: 3500 },
        { months: 12, amount: 1800 },
        { months: 18, amount: 1250 },
      ],
    },
    {
      id: 'class-11',
      title: 'Class 11th Foundation',
      subtitle: 'NEET Foundation Year',
      originalPrice: 34999,
      discountedPrice: 24999,
      discount: 29,
      duration: '1 Year',
      popular: false,
      features: [
        'Complete NCERT coverage',
        'Advanced problem solving',
        'Weekly mock tests',
        'Comprehensive study material',
        '24/7 doubt support',
        'Regular counseling sessions',
      ],
      emiOptions: [
        { months: 6, amount: 4500 },
        { months: 12, amount: 2300 },
        { months: 18, amount: 1600 },
      ],
    },
    {
      id: 'class-12',
      title: 'Class 12th Intensive',
      subtitle: 'Complete NEET Preparation',
      originalPrice: 49999,
      discountedPrice: 34999,
      discount: 30,
      duration: '1 Year',
      popular: true,
      features: [
        'Intensive NEET preparation',
        'Daily practice sessions',
        'Full-length mock tests',
        'Previous year papers',
        'Rank prediction analysis',
        'Counseling support',
      ],
      emiOptions: [
        { months: 6, amount: 6200 },
        { months: 12, amount: 3200 },
        { months: 18, amount: 2200 },
      ],
    },
    {
      id: 'dropper',
      title: 'NEET Dropper Batch',
      subtitle: 'Comprehensive Revision + Advanced',
      originalPrice: 59999,
      discountedPrice: 44999,
      discount: 25,
      duration: '1 Year',
      popular: false,
      features: [
        'Complete syllabus revision',
        'Advanced problem solving',
        'Intensive test series',
        'Personalized mentoring',
        'Strategy sessions',
        'Admission guidance',
      ],
      emiOptions: [
        { months: 6, amount: 7800 },
        { months: 12, amount: 4000 },
        { months: 18, amount: 2800 },
      ],
    },
  ]

  const paymentMethods = [
    {
      title: 'Online Payment',
      methods: ['Credit/Debit Cards', 'UPI', 'Net Banking', 'Digital Wallets'],
      icon: CreditCard,
      color: 'bg-blue-500',
    },
    {
      title: 'Bank Transfer',
      methods: ['NEFT/RTGS', 'IMPS', 'Cheque/DD', 'Cash Deposit'],
      icon: Shield,
      color: 'bg-green-500',
    },
    {
      title: 'EMI Options',
      methods: ['0% EMI available', 'Flexible tenure', 'Easy documentation', 'Quick approval'],
      icon: Calculator,
      color: 'bg-purple-500',
    },
  ]

  const scholarships = [
    {
      title: 'Merit Scholarship',
      description: 'Based on previous academic performance',
      discount: 'Up to 25%',
      color: 'bg-yellow-500',
    },
    {
      title: 'Early Bird Discount',
      description: 'Register 2 months before course start',
      discount: 'Up to 15%',
      color: 'bg-green-500',
    },
    {
      title: 'Sibling Discount',
      description: 'Multiple enrollments from same family',
      discount: 'Up to 10%',
      color: 'bg-blue-500',
    },
    {
      title: 'Referral Bonus',
      description: 'Refer a friend and both get discount',
      discount: 'Up to 5%',
      color: 'bg-purple-500',
    },
  ]

  const includedServices = [
    'Comprehensive study material',
    'Online learning platform access',
    'Regular mock tests and assessments',
    '24/7 doubt clearing support',
    'Parent-teacher interaction',
    'Career counseling sessions',
    'Previous year question papers',
    'Performance tracking reports',
  ]

  const selectedCourse = coursePackages.find((course) => course.id === selectedPlan)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Fee Structure & Payment Options
            </motion.h1>
            <motion.p
              className="text-xl text-purple-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transparent pricing with flexible payment options. No hidden charges, multiple EMI
              plans, and scholarship opportunities available.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                <Calculator className="w-5 h-5 mr-2" />
                EMI Calculator
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call +91 88264 44334
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Packages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Course Fee Structure</h2>
            <p className="text-xl text-gray-600">
              Choose the program that best fits your needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {coursePackages.map((course, index) => (
              <motion.div
                key={course.id}
                className={`bg-white rounded-3xl shadow-lg p-8 relative cursor-pointer transition-all ${
                  course.popular ? 'ring-2 ring-purple-500 scale-105' : 'hover:shadow-xl'
                } ${selectedPlan === course.id ? 'ring-2 ring-blue-500' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedPlan(course.id)}
              >
                {course.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.subtitle}</p>

                  <div className="mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{course.discountedPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-lg text-gray-500 line-through mr-2">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {course.discount}% OFF
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-6">Duration: {course.duration}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={course.popular ? 'primary' : 'outline'}
                  size="sm"
                  className="w-full"
                >
                  Select Course
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">EMI Options</h2>
            <p className="text-xl text-gray-600">Flexible payment plans to suit your budget</p>
          </div>

          {selectedCourse && (
            <motion.div
              className="bg-gray-50 rounded-3xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  EMI Plans for {selectedCourse.title}
                </h3>
                <p className="text-gray-600">
                  Course Fee: ₹{selectedCourse.discountedPrice.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {selectedCourse.emiOptions.map((emi, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-md">
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      {emi.months} Months EMI
                    </div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      ₹{emi.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">per month</div>
                    <div className="text-xs text-gray-500">
                      Total: ₹{(emi.amount * emi.months).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">
                      EMI Terms & Conditions
                    </h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• 0% processing fee for EMI plans</li>
                      <li>• Post-dated cheques or auto-debit required</li>
                      <li>• EMI facility subject to approval</li>
                      <li>• Late payment charges may apply</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Payment Methods</h2>
            <p className="text-xl text-gray-600">Multiple convenient payment options available</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">{method.title}</h3>
                <div className="space-y-3">
                  {method.methods.map((paymentMethod, idx) => (
                    <div key={idx} className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-700">{paymentMethod}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Scholarships & Discounts</h2>
            <p className="text-xl text-gray-600">Reduce your fees with these offers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-gray-100 hover:border-purple-300 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`w-12 h-12 ${scholarship.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{scholarship.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{scholarship.description}</p>
                <div className="text-xl font-bold text-purple-600">{scholarship.discount}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-2xl mx-auto">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-green-900 mb-2">Scholarship Application</h4>
              <p className="text-green-700 mb-4">
                Apply for scholarships during the admission process. Our counselors will help you
                identify the best discounts you're eligible for.
              </p>
              <Button variant="primary">Apply for Scholarship</Button>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What's Included in Your Fee</h2>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive NEET preparation with everything you need for success
              </p>

              <div className="space-y-4">
                {includedServices.map((service, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-8 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-8">Value for Money</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <BookOpen className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Comprehensive Material</h4>
                    <p className="text-purple-100">Worth ₹15,000 study material included free</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Expert Faculty</h4>
                    <p className="text-purple-100">Learn from 15+ years experienced teachers</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Target className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Proven Results</h4>
                    <p className="text-purple-100">94% students score above 320 in NEET Biology</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Seat?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Limited seats available. Book now with just ₹5,000 advance payment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support/admission">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                Start Admission Process
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              variant="primary"
              size="xl"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +91 88264 44334
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">0%</div>
              <div className="text-purple-100">Processing Fee</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-purple-100">Transparent Pricing</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25%</div>
              <div className="text-purple-100">Max Scholarship</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
