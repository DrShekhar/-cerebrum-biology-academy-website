'use client'

import React, { useState, useEffect } from 'react'
import {
  InternationalPaymentService,
  PaymentMethod,
  PaymentProvider,
} from '@/lib/payments/internationalPayments'
import { CurrencyService, SupportedCurrency } from '@/lib/international/currencyService'
import { usePersonalization } from '@/components/providers/PersonalizationProvider'
import {
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  Clock,
  AlertTriangle,
} from 'lucide-react'

interface InternationalPaymentFormProps {
  courseType: keyof typeof CurrencyService.BASE_PRICES
  amount: number
  currency: SupportedCurrency
  countryCode: string
  onPaymentSuccess?: (paymentId: string) => void
  onPaymentError?: (error: string) => void
  className?: string
}

export function InternationalPaymentForm({
  courseType,
  amount,
  currency,
  countryCode,
  onPaymentSuccess,
  onPaymentError,
  className = '',
}: InternationalPaymentFormProps) {
  const { preferences, trackBehavior } = usePersonalization()
  const [availableProviders, setAvailableProviders] = useState<PaymentProvider[]>([])
  const [availableMethods, setAvailableMethods] = useState<PaymentMethod[]>([])
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [paymentCalculation, setPaymentCalculation] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [formData, setFormData] = useState({
    email: preferences.email || '',
    name: preferences.name || '',
    phone: preferences.phone || '',
    country: countryCode,
  })

  useEffect(() => {
    loadPaymentOptions()
  }, [currency, countryCode, amount])

  const loadPaymentOptions = () => {
    try {
      const providers = InternationalPaymentService.getAvailableProviders(currency, countryCode)
      const methods = InternationalPaymentService.getAvailablePaymentMethods(currency, countryCode)
      const calculation = InternationalPaymentService.calculateTotalAmount(
        amount,
        currency,
        countryCode
      )

      setAvailableProviders(providers)
      setAvailableMethods(methods)
      setPaymentCalculation(calculation)

      // Auto-select first available method
      if (methods.length > 0) {
        setSelectedMethod(methods[0].id)
      }

      trackBehavior('payment_form_loaded', {
        currency,
        countryCode,
        courseType,
        availableProviders: providers.length,
        availableMethods: methods.length,
      })
    } catch (error) {
      console.error('Failed to load payment options:', error)
      onPaymentError?.('Failed to load payment options')
    }
  }

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    trackBehavior('payment_method_selected', {
      methodId,
      currency,
      countryCode,
    })
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.email || !formData.name) {
      onPaymentError?.('Please fill in all required fields')
      return false
    }

    if (!selectedMethod) {
      onPaymentError?.('Please select a payment method')
      return false
    }

    return true
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      const metadata = {
        studentEmail: formData.email,
        studentName: formData.name,
        courseType,
        countryCode,
        phone: formData.phone,
      }

      trackBehavior('payment_initiated', {
        methodId: selectedMethod,
        amount: paymentCalculation.total,
        currency,
        countryCode,
      })

      const result = await InternationalPaymentService.processPayment(
        paymentCalculation.total,
        currency,
        countryCode,
        selectedMethod,
        metadata
      )

      if (result.success && result.paymentId) {
        trackBehavior('payment_success', {
          paymentId: result.paymentId,
          methodId: selectedMethod,
          amount: paymentCalculation.total,
          currency,
        })

        onPaymentSuccess?.(result.paymentId)

        // Redirect to payment confirmation if URL provided
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl
        }
      } else {
        throw new Error(result.error || 'Payment failed')
      }
    } catch (error) {
      console.error('Payment processing error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed'

      trackBehavior('payment_error', {
        error: errorMessage,
        methodId: selectedMethod,
        currency,
        countryCode,
      })

      onPaymentError?.(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method.type) {
      case 'card':
        return <CreditCard className="h-5 w-5" />
      case 'bank':
        return <Banknote className="h-5 w-5" />
      case 'wallet':
        return <Smartphone className="h-5 w-5" />
      case 'bnpl':
        return <Clock className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const paymentGuide = InternationalPaymentService.getPaymentGuide(currency, countryCode)

  if (availableProviders.length === 0) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-xl p-6 ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-semibold text-red-900">Payment Not Available</h3>
        </div>
        <p className="text-red-700 mb-4">
          Unfortunately, we don't currently support payments in {currency} for {countryCode}.
        </p>
        <div className="space-y-2">
          <p className="text-sm text-red-600">Alternative options:</p>
          <ul className="text-sm text-red-600 space-y-1 ml-4">
            <li>• Contact our support team for manual payment processing</li>
            <li>• Use a different currency if available in your region</li>
            <li>• Bank transfer options may be available</li>
          </ul>
        </div>
        <div className="mt-4">
          <button
            onClick={() => (window.location.href = '/contact')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Payment Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Course Fee</span>
            <span className="font-medium">
              {CurrencyService.formatPrice(paymentCalculation?.subtotal || amount, currency)}
            </span>
          </div>

          {paymentCalculation?.fees > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Processing Fee</span>
              <span className="font-medium">
                {CurrencyService.formatPrice(paymentCalculation.fees, currency)}
              </span>
            </div>
          )}

          <div className="border-t pt-3">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-blue-600">
                {CurrencyService.formatPrice(paymentCalculation?.total || amount, currency)}
              </span>
            </div>
          </div>
        </div>

        {paymentCalculation?.provider && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              Processed by <span className="font-medium">{paymentCalculation.provider.name}</span>
              <span className="mx-2">•</span>
              <span>{paymentCalculation.provider.processingTime}</span>
            </div>
          </div>
        )}
      </div>

      {/* Student Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleFormChange('phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              type="text"
              value={countryCode}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="text-blue-600 text-sm hover:text-blue-700"
          >
            {showGuide ? 'Hide Guide' : 'Payment Guide'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {availableMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`p-4 border rounded-lg text-left transition-all ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`${selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  {getMethodIcon(method)}
                </div>
                <div>
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-gray-500">{method.icon}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Guide */}
      {showGuide && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-4">{paymentGuide.title}</h4>

          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-blue-800 mb-2">Steps:</h5>
              <ol className="space-y-1 text-blue-700">
                {paymentGuide.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700">
                  Estimated time: {paymentGuide.estimatedTime}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700">Secure payment</span>
              </div>
            </div>

            <div className="bg-blue-100 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">{paymentGuide.securityNote}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <button
          onClick={handlePayment}
          disabled={isProcessing || !selectedMethod || !formData.email || !formData.name}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
            isProcessing || !selectedMethod || !formData.email || !formData.name
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing Payment...</span>
            </div>
          ) : (
            `Pay ${CurrencyService.formatPrice(paymentCalculation?.total || amount, currency)}`
          )}
        </button>

        <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Instant Access</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-3">
          By proceeding, you agree to our Terms of Service and Privacy Policy. You will receive
          course access immediately after payment confirmation.
        </p>
      </div>
    </div>
  )
}
