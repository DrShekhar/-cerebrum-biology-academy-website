'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { routes } from '@/config/routes'
import {
  ShoppingCart,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Lock,
  Phone,
  Mail,
  MapPin,
  User,
} from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

interface CartItem {
  id: string
  name: string
  price: number
  duration: string
  type: string
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    studentClass: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const courseId = searchParams.get('course')
    const planId = searchParams.get('plan')

    if (courseId && planId) {
      const mockCart: CartItem = {
        id: courseId,
        name: getCourseDetails(courseId).name,
        price: getPlanDetails(planId).price,
        duration: getPlanDetails(planId).duration,
        type: planId,
      }
      setCartItems([mockCart])
    }
  }, [searchParams])

  const getCourseDetails = (courseId: string) => {
    const courses: Record<string, { name: string }> = {
      'class-11': { name: 'Class 11th Biology - Complete NEET Foundation' },
      'class-12': { name: 'Class 12th Biology - Intensive NEET Preparation' },
      'neet-dropper': { name: 'NEET Dropper Program - Full Year' },
    }
    return courses[courseId] || { name: 'Biology Course' }
  }

  const getPlanDetails = (planId: string) => {
    const plans: Record<string, { price: number; duration: string }> = {
      monthly: { price: 3500, duration: 'Per Month' },
      quarterly: { price: 9999, duration: '3 Months' },
      annual: { price: 35000, duration: '12 Months' },
    }
    return plans[planId] || { price: 0, duration: 'N/A' }
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0)
  }

  const calculateGST = () => {
    return Math.round(calculateTotal() * 0.18)
  }

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateGST()
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number'
    if (!formData.studentClass) newErrors.studentClass = 'Please select your class'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleProceedToPayment = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: calculateGrandTotal(),
          currency: 'INR',
          customerDetails: formData,
          items: cartItems,
        }),
      })

      if (!response.ok) throw new Error('Failed to create order')

      const { orderId, amount, currency } = await response.json()

      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          name: 'Cerebrum Biology Academy',
          description: 'Course Enrollment',
          order_id: orderId,
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#0d9488',
          },
          handler: async function (response: any) {
            router.push(
              `/purchase/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`
            )
          },
          modal: {
            ondismiss: function () {
              setLoading(false)
            },
          },
        }

        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      }
    } catch (error) {
      console.error('Payment error:', error)
      setLoading(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={routes.courses.main}
            className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <User className="w-6 h-6 text-teal-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-11 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-11 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                          placeholder="10-digit mobile number"
                          maxLength={10}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="studentClass"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Current Class *
                    </label>
                    <select
                      id="studentClass"
                      name="studentClass"
                      value={formData.studentClass}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.studentClass ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                    >
                      <option value="">Select your class</option>
                      <option value="9">Class 9th</option>
                      <option value="10">Class 10th</option>
                      <option value="11">Class 11th</option>
                      <option value="12">Class 12th</option>
                      <option value="dropper">NEET Dropper</option>
                    </select>
                    {errors.studentClass && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.studentClass}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Address (Optional)
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="State"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="6-digit PIN"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 mt-6">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-teal-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
                    <p className="text-sm text-gray-700">
                      Your payment information is encrypted and secure. We use industry-standard SSL
                      encryption to protect your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <div className="flex items-center mb-6">
                  <ShoppingCart className="w-6 h-6 text-teal-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Link href={routes.courses.main}>
                      <Button variant="primary">Browse Courses</Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="border-b border-gray-200 pb-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{item.duration}</span>
                            <span className="font-semibold text-teal-600">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">
                          ₹{calculateTotal().toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">GST (18%)</span>
                        <span className="font-medium">
                          ₹{calculateGST().toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                        <span>Total</span>
                        <span className="text-teal-600">
                          ₹{calculateGrandTotal().toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      className="w-full mt-6"
                      onClick={handleProceedToPayment}
                      loading={loading}
                      disabled={cartItems.length === 0}
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      Proceed to Payment
                    </Button>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span>30-day money-back guarantee</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span>Instant access after payment</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span>24/7 support available</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        Need help? Contact us at{' '}
                        <a
                          href={`tel:${routes.phone.primary.replace('tel:', '')}`}
                          className="text-teal-600 font-medium hover:underline"
                        >
                          +91 93119 46297
                        </a>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
