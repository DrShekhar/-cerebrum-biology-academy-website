'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Shield, CreditCard, Loader2 } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface RazorpayPaymentProps {
  amount: number
  courseTitle: string
  studentName: string
  email: string
  phone: string
  onSuccess: (paymentData: {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
  }) => void
  onError: (error: { error?: unknown; reason?: string; description?: string }) => void
}

export function RazorpayPayment({
  amount,
  courseTitle,
  studentName,
  email,
  phone,
  onSuccess,
  onError,
}: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const initiatePayment = async () => {
    setIsLoading(true)

    try {
      // Load Razorpay script
      const isLoaded = await loadRazorpay()

      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load')
      }

      // Create order from backend
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            course: courseTitle,
            student_name: studentName,
            email: email,
            phone: phone,
          },
        }),
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.error || 'Failed to create payment order')
      }

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create payment order')
      }

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

      if (!razorpayKey) {
        throw new Error('Razorpay key not configured')
      }

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Cerebrum Biology Academy',
        description: `Enrollment for ${courseTitle}`,
        image: '/logo.png',
        order_id: orderData.id,
        handler: function (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) {
          // Payment successful
          onSuccess({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })
          setIsLoading(false)
        },
        prefill: {
          name: studentName,
          email: email,
          contact: phone,
        },
        notes: {
          course: courseTitle,
          student_name: studentName,
        },
        theme: {
          color: '#2563EB',
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false)
          },
        },
      }

      const payment = new window.Razorpay(options)

      payment.on(
        'payment.failed',
        function (response: { error: { reason: string; description: string } }) {
          onError({
            error: response.error,
            reason: response.error.reason,
            description: response.error.description,
          })
          setIsLoading(false)
        }
      )

      payment.open()
    } catch (error) {
      console.error('Payment initiation error:', error)
      onError({ error })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Security Info */}
      <div className="bg-green-50 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <Shield className="w-6 h-6 text-green-600 mr-3" />
          <h3 className="font-semibold text-green-900">Secure Payment</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-green-800">
          <div>✓ 256-bit SSL Encryption</div>
          <div>✓ RBI Approved Gateway</div>
          <div>✓ 100% Secure Transactions</div>
        </div>
      </div>

      {/* Payment Amount Summary */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-900 mb-4">Payment Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-blue-800">Course:</span>
            <span className="font-medium text-blue-900">{courseTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-800">Student:</span>
            <span className="font-medium text-blue-900">{studentName}</span>
          </div>
          <div className="border-t border-blue-200 pt-2 flex justify-between font-semibold">
            <span className="text-blue-900">Total Amount:</span>
            <span className="text-blue-900">₹{amount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods Info */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Accepted Payment Methods</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white rounded-xl">
            <CreditCard className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium">Credit Cards</div>
          </div>
          <div className="p-3 bg-white rounded-xl">
            <CreditCard className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium">Debit Cards</div>
          </div>
          <div className="p-3 bg-white rounded-xl">
            <div className="w-6 h-6 bg-purple-600 rounded mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold">
              UPI
            </div>
            <div className="text-sm font-medium">UPI</div>
          </div>
          <div className="p-3 bg-white rounded-xl">
            <div className="w-6 h-6 bg-orange-600 rounded mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold">
              NB
            </div>
            <div className="text-sm font-medium">Net Banking</div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <Button
        onClick={initiatePayment}
        variant="primary"
        size="lg"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
            Loading Payment Gateway...
          </>
        ) : (
          <>
            <Shield className="w-5 h-5 mr-3" />
            Pay ₹{amount.toLocaleString()} Securely
          </>
        )}
      </Button>

      {/* Terms and Conditions */}
      <div className="text-xs text-gray-600 text-center space-y-1">
        <p>By proceeding with payment, you agree to our Terms of Service and Privacy Policy.</p>
        <p>All payments are processed securely through Razorpay.</p>
        <p>For payment issues, contact support: {CONTACT_INFO.phone.display.primary}</p>
      </div>
    </div>
  )
}
