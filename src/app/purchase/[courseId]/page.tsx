'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PricingSelector, PricingPlan } from '@/components/purchase/PricingSelector'
import { ArrowLeft, Shield, Clock, BookOpen } from 'lucide-react'
import Script from 'next/script'

// Course pricing configuration
const COURSE_PRICING = {
  'class-11': {
    title: 'Class 11th Biology - Complete NEET Foundation',
    description: 'Comprehensive preparation for NEET with expert faculty and structured curriculum',
    image: '/images/courses/class-11-hero.jpg',
    plans: [
      {
        id: 'monthly',
        name: 'Monthly Plan',
        price: 3500,
        duration: 'Per Month',
        paymentType: 'MONTHLY' as const,
        features: [
          'Access to all video lectures',
          'Live doubt solving sessions',
          'Weekly tests and assessments',
          'Study materials (PDF)',
          'Cancel anytime',
        ],
      },
      {
        id: 'quarterly',
        name: 'Quarterly Plan',
        price: 9999,
        originalPrice: 10500,
        duration: '3 Months',
        savings: 'Save ₹501',
        popular: true,
        paymentType: 'QUARTERLY' as const,
        features: [
          'Everything in Monthly Plan',
          'Personalized study plan',
          'Priority doubt resolution',
          'Monthly progress reports',
          'Bonus crash course materials',
        ],
      },
      {
        id: 'annual',
        name: 'Full Year Plan',
        price: 35000,
        originalPrice: 42000,
        duration: '12 Months',
        savings: 'Save ₹7,000',
        paymentType: 'FULL' as const,
        features: [
          'Everything in Quarterly Plan',
          'Dedicated academic mentor',
          'Unlimited doubt solving',
          'Complete test series',
          'Previous 10 years NEET papers',
          'Scholarship exam access',
        ],
      },
    ],
  },
  'class-12': {
    title: 'Class 12th Biology - Intensive NEET Preparation',
    description: 'Final year intensive coaching with focus on NEET exam pattern and strategy',
    image: '/images/courses/class-12-hero.jpg',
    plans: [
      {
        id: 'monthly',
        name: 'Monthly Plan',
        price: 5000,
        duration: 'Per Month',
        paymentType: 'MONTHLY' as const,
        features: [
          'Access to all video lectures',
          'Live doubt solving sessions',
          'Weekly mock tests',
          'Study materials (PDF)',
          'Cancel anytime',
        ],
      },
      {
        id: 'quarterly',
        name: 'Quarterly Plan',
        price: 14499,
        originalPrice: 15000,
        duration: '3 Months',
        savings: 'Save ₹501',
        popular: true,
        paymentType: 'QUARTERLY' as const,
        features: [
          'Everything in Monthly Plan',
          'NEET crash course (FREE)',
          'Previous 15 years questions',
          'Exam strategy sessions',
          'Performance analysis reports',
        ],
      },
      {
        id: 'annual',
        name: 'Full Year Plan',
        price: 50000,
        originalPrice: 60000,
        duration: '12 Months',
        savings: 'Save ₹10,000',
        paymentType: 'FULL' as const,
        features: [
          'Everything in Quarterly Plan',
          'Dedicated NEET mentor',
          'Unlimited doubt solving',
          'Complete Grand Test Series',
          'AIR prediction analysis',
          'College admission guidance',
        ],
      },
    ],
  },
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PurchasePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [showGuestForm, setShowGuestForm] = useState(false)
  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const courseData = COURSE_PRICING[courseId as keyof typeof COURSE_PRICING]

  useEffect(() => {
    if (!courseData) {
      router.push('/courses')
    }
  }, [courseData, router])

  const handleProceedToPayment = async () => {
    if (!selectedPlan) {
      alert('Please select a pricing plan')
      return
    }

    if (!razorpayLoaded) {
      alert('Payment system is loading. Please wait a moment.')
      return
    }

    // Show guest checkout form for now (can be enhanced with auth check later)
    setShowGuestForm(true)
  }

  const handleGuestCheckout = async () => {
    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
      alert('Please fill in all details')
      return
    }

    if (!selectedPlan) {
      alert('Please select a pricing plan')
      return
    }

    setLoading(true)
    setShowGuestForm(false)

    try {
      // Step 1: Create enrollment and order
      const purchaseResponse = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          planType: selectedPlan.paymentType,
          amount: selectedPlan.price,
          email: guestDetails.email,
          phone: guestDetails.phone,
          name: guestDetails.name,
          planName: selectedPlan.name,
          courseName: courseData.title,
        }),
      })

      if (!purchaseResponse.ok) {
        const errorData = await purchaseResponse.json()
        throw new Error(errorData.error || 'Failed to create enrollment')
      }

      const purchaseData = await purchaseResponse.json()

      if (!purchaseData.success) {
        throw new Error(purchaseData.error || 'Purchase failed')
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: purchaseData.order.amount,
        currency: purchaseData.order.currency,
        name: 'Cerebrum Biology Academy',
        description: courseData.title,
        order_id: purchaseData.order.id,
        prefill: {
          name: purchaseData.user.name,
          email: purchaseData.user.email,
          contact: purchaseData.user.phone,
        },
        theme: {
          color: '#16a34a',
        },
        handler: async function (response: any) {
          try {
            // Step 3: Verify payment
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed')
            }

            // Redirect to success page
            router.push(
              `/purchase/success?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}&courseId=${courseId}`
            )
          } catch (error) {
            console.error('Payment verification error:', error)
            alert('Payment verification failed. Please contact support.')
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Purchase error:', error)
      alert(error instanceof Error ? error.message : 'Purchase failed. Please try again.')
      setLoading(false)
    }
  }

  if (!courseData) {
    return null
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        strategy="lazyOnload"
      />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Course</span>
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* Course Overview */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{courseData.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{courseData.description}</p>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Complete Curriculum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Expert Faculty</span>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2000+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4.8★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-8">
            <PricingSelector
              plans={courseData.plans}
              onSelectPlan={setSelectedPlan}
              selectedPlanId={selectedPlan?.id}
            />
          </div>

          {/* Guest Checkout Form Modal */}
          {showGuestForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Details</h3>
                <p className="text-gray-600 mb-6">
                  Enter your details to proceed with the enrollment
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={guestDetails.name}
                      onChange={(e) =>
                        setGuestDetails((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={guestDetails.email}
                      onChange={(e) =>
                        setGuestDetails((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={guestDetails.phone}
                      onChange={(e) =>
                        setGuestDetails((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowGuestForm(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGuestCheckout}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Continue'}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Your login credentials will be sent to your email after successful payment
                </p>
              </div>
            </div>
          )}

          {/* Proceed Button */}
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleProceedToPayment}
              disabled={!selectedPlan || loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                !selectedPlan || loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:scale-105'
              }`}
            >
              {loading
                ? 'Processing...'
                : `Proceed to Payment - ₹${selectedPlan?.price.toLocaleString('en-IN') || '0'}`}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">What You Get</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <h4 className="font-semibold mb-2">Complete Study Material</h4>
                <p className="text-green-100 text-sm">
                  Video lectures, notes, and practice questions
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">👨‍🏫</div>
                <h4 className="font-semibold mb-2">Expert Mentorship</h4>
                <p className="text-green-100 text-sm">Direct access to experienced NEET faculty</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <h4 className="font-semibold mb-2">Result Oriented</h4>
                <p className="text-green-100 text-sm">Proven track record of NEET success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
