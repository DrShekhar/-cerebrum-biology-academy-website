'use client'

import { Shield, CreditCard, Smartphone, CheckCircle } from 'lucide-react'

/**
 * Payment Gateway Trust Badges Component
 * Displays trusted payment options like UPI, Paytm, PhonePe to build trust
 * with Indian users and signal secure payment processing.
 */

export interface PaymentMethod {
  name: string
  logo: string
  alt: string
  bgColor: string
}

// Payment methods accepted
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    name: 'UPI',
    logo: '/images/payments/upi.svg',
    alt: 'UPI Payment',
    bgColor: 'bg-green-50',
  },
  {
    name: 'Paytm',
    logo: '/images/payments/paytm.svg',
    alt: 'Paytm Payment',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'PhonePe',
    logo: '/images/payments/phonepe.svg',
    alt: 'PhonePe Payment',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Google Pay',
    logo: '/images/payments/gpay.svg',
    alt: 'Google Pay Payment',
    bgColor: 'bg-white',
  },
  {
    name: 'Credit/Debit Card',
    logo: '/images/payments/cards.svg',
    alt: 'Card Payment',
    bgColor: 'bg-gray-50',
  },
  {
    name: 'Net Banking',
    logo: '/images/payments/netbanking.svg',
    alt: 'Net Banking',
    bgColor: 'bg-orange-50',
  },
]

// Compact payment badges for footer/sidebar
export function PaymentBadgesCompact() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-gray-600 font-medium">We accept:</span>
      <div className="flex items-center gap-2">
        {/* UPI Logo - Text based since SVGs might not exist */}
        <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
          <Smartphone className="w-3 h-3" />
          UPI
        </div>
        <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold">
          Paytm
        </div>
        <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg text-xs font-bold">
          PhonePe
        </div>
        <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
          <CreditCard className="w-3 h-3" />
          Cards
        </div>
      </div>
    </div>
  )
}

// Full payment trust section with security badges
export function PaymentTrustSection() {
  return (
    <section className="py-8 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Payment Methods */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              Secure Payment Options
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {/* UPI */}
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">UPI</span>
                </div>
                <span className="text-sm font-medium text-green-700">UPI</span>
              </div>

              {/* Paytm */}
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
                <div className="w-6 h-6 bg-[#00BAF2] rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">P</span>
                </div>
                <span className="text-sm font-medium text-blue-700">Paytm</span>
              </div>

              {/* PhonePe */}
              <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 px-3 py-2 rounded-lg">
                <div className="w-6 h-6 bg-[#5F259F] rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">Pe</span>
                </div>
                <span className="text-sm font-medium text-purple-700">PhonePe</span>
              </div>

              {/* Google Pay */}
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-[10px] font-bold">
                    <span className="text-blue-500">G</span>
                    <span className="text-red-500">P</span>
                    <span className="text-yellow-500">a</span>
                    <span className="text-green-500">y</span>
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">GPay</span>
              </div>

              {/* Cards */}
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Cards</span>
              </div>

              {/* Net Banking */}
              <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-2 rounded-lg">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">NB</span>
                </div>
                <span className="text-sm font-medium text-orange-700">Net Banking</span>
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              Secure & Trusted
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">SSL Secured</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Verified Business</span>
              </div>
            </div>
          </div>
        </div>

        {/* EMI & Payment Info */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            EMI Available
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            No Cost EMI on Select Cards
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Instant Payment Confirmation
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            100% Secure Transactions
          </span>
        </div>
      </div>
    </section>
  )
}

// Inline payment badges for pricing cards
export function InlinePaymentBadges() {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span>Pay via:</span>
      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">UPI</span>
      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Paytm</span>
      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">PhonePe</span>
      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">Cards</span>
    </div>
  )
}

// Mini trust strip for mobile
export function MobilePaymentStrip() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 py-2 px-4 flex items-center justify-center gap-4 text-xs">
      <span className="flex items-center gap-1 text-green-700">
        <Shield className="w-3 h-3" />
        Secure Payments
      </span>
      <span className="text-gray-400">|</span>
      <span className="text-gray-600">UPI • Paytm • PhonePe • Cards</span>
    </div>
  )
}

export default PaymentTrustSection
