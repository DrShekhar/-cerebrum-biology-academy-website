'use client'

import { SupportedCurrency } from '@/lib/international/currencyService'

export interface PaymentProvider {
  id: string
  name: string
  supportedCurrencies: SupportedCurrency[]
  supportedCountries: string[]
  fees: PaymentFees
  processingTime: string
  features: string[]
}

export interface PaymentFees {
  percentage: number
  fixedFee: number
  currency: SupportedCurrency
  internationalFee?: number
}

export interface PaymentMethod {
  id: string
  provider: string
  type: 'card' | 'bank' | 'wallet' | 'bnpl'
  name: string
  icon: string
  supportedCurrencies: SupportedCurrency[]
  supportedCountries: string[]
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: SupportedCurrency
  provider: string
  method: string
  metadata: {
    studentEmail: string
    courseType: string
    countryCode: string
    studentName: string
  }
}

export interface PaymentResult {
  success: boolean
  paymentId?: string
  error?: string
  redirectUrl?: string
  paymentMethod?: string
}

class InternationalPaymentService {
  private static readonly PAYMENT_PROVIDERS: Record<string, PaymentProvider> = {
    stripe: {
      id: 'stripe',
      name: 'Stripe',
      supportedCurrencies: ['USD', 'GBP', 'EUR', 'AUD', 'CAD', 'SGD', 'AED'],
      supportedCountries: ['US', 'UK', 'AU', 'CA', 'SG', 'AE', 'DE', 'FR', 'IT', 'ES', 'NL'],
      fees: {
        percentage: 2.9,
        fixedFee: 0.3,
        currency: 'USD',
        internationalFee: 1.0,
      },
      processingTime: 'Instant',
      features: [
        'Credit/Debit Cards',
        'Apple Pay',
        'Google Pay',
        'SEPA Direct Debit',
        'Bank Transfers',
        'Buy Now Pay Later',
      ],
    },
    paypal: {
      id: 'paypal',
      name: 'PayPal',
      supportedCurrencies: ['USD', 'GBP', 'EUR', 'AUD', 'CAD', 'SGD'],
      supportedCountries: ['US', 'UK', 'AU', 'CA', 'SG', 'DE', 'FR', 'IT', 'ES', 'NL'],
      fees: {
        percentage: 3.49,
        fixedFee: 0.49,
        currency: 'USD',
        internationalFee: 0.0,
      },
      processingTime: 'Instant',
      features: [
        'PayPal Balance',
        'Credit/Debit Cards',
        'Bank Account',
        'PayPal Credit',
        'Pay in 4',
      ],
    },
    razorpay: {
      id: 'razorpay',
      name: 'Razorpay',
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
      fees: {
        percentage: 2.0,
        fixedFee: 0,
        currency: 'INR',
      },
      processingTime: 'Instant',
      features: ['Credit/Debit Cards', 'UPI', 'Net Banking', 'Wallets', 'EMI', 'QR Code'],
    },
  }

  private static readonly PAYMENT_METHODS: PaymentMethod[] = [
    // Stripe Methods
    {
      id: 'stripe_card',
      provider: 'stripe',
      type: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      supportedCurrencies: ['USD', 'GBP', 'EUR', 'AUD', 'CAD', 'SGD', 'AED'],
      supportedCountries: ['US', 'UK', 'AU', 'CA', 'SG', 'AE', 'DE', 'FR', 'IT', 'ES', 'NL'],
    },
    {
      id: 'stripe_apple_pay',
      provider: 'stripe',
      type: 'wallet',
      name: 'Apple Pay',
      icon: '🍎',
      supportedCurrencies: ['USD', 'GBP', 'EUR', 'AUD', 'CAD'],
      supportedCountries: ['US', 'UK', 'AU', 'CA'],
    },
    {
      id: 'stripe_google_pay',
      provider: 'stripe',
      type: 'wallet',
      name: 'Google Pay',
      icon: '🏦',
      supportedCurrencies: ['USD', 'GBP', 'EUR', 'AUD', 'CAD'],
      supportedCountries: ['US', 'UK', 'AU', 'CA'],
    },
    {
      id: 'stripe_sepa',
      provider: 'stripe',
      type: 'bank',
      name: 'SEPA Direct Debit',
      icon: '🏛️',
      supportedCurrencies: ['EUR'],
      supportedCountries: ['DE', 'FR', 'IT', 'ES', 'NL'],
    },
    {
      id: 'stripe_klarna',
      provider: 'stripe',
      type: 'bnpl',
      name: 'Klarna',
      icon: '⚡',
      supportedCurrencies: ['USD', 'GBP', 'EUR'],
      supportedCountries: ['US', 'UK', 'DE', 'FR', 'IT', 'ES', 'NL'],
    },

    // PayPal Methods
    {
      id: 'paypal_account',
      provider: 'paypal',
      type: 'wallet',
      name: 'PayPal Account',
      icon: '🅿️',
      supportedCurrencies: ['USD', 'GBP', 'EUR', 'AUD', 'CAD', 'SGD'],
      supportedCountries: ['US', 'UK', 'AU', 'CA', 'SG', 'DE', 'FR', 'IT', 'ES', 'NL'],
    },
    {
      id: 'paypal_card',
      provider: 'paypal',
      type: 'card',
      name: 'PayPal Credit/Debit',
      icon: '💳',
      supportedCurrencies: ['USD', 'GBP', 'EUR', 'AUD', 'CAD'],
      supportedCountries: ['US', 'UK', 'AU', 'CA'],
    },
    {
      id: 'paypal_pay_in_4',
      provider: 'paypal',
      type: 'bnpl',
      name: 'PayPal Pay in 4',
      icon: '4️⃣',
      supportedCurrencies: ['USD', 'GBP', 'AUD'],
      supportedCountries: ['US', 'UK', 'AU'],
    },

    // Razorpay Methods (India)
    {
      id: 'razorpay_card',
      provider: 'razorpay',
      type: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
    },
    {
      id: 'razorpay_upi',
      provider: 'razorpay',
      type: 'wallet',
      name: 'UPI',
      icon: '📱',
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
    },
    {
      id: 'razorpay_netbanking',
      provider: 'razorpay',
      type: 'bank',
      name: 'Net Banking',
      icon: '🏦',
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
    },
    {
      id: 'razorpay_emi',
      provider: 'razorpay',
      type: 'bnpl',
      name: 'EMI',
      icon: '📊',
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
    },
  ]

  static getAvailableProviders(
    currency: SupportedCurrency,
    countryCode: string
  ): PaymentProvider[] {
    return Object.values(this.PAYMENT_PROVIDERS).filter(
      (provider) =>
        provider.supportedCurrencies.includes(currency) &&
        provider.supportedCountries.includes(countryCode.toUpperCase())
    )
  }

  static getAvailablePaymentMethods(
    currency: SupportedCurrency,
    countryCode: string
  ): PaymentMethod[] {
    return this.PAYMENT_METHODS.filter(
      (method) =>
        method.supportedCurrencies.includes(currency) &&
        method.supportedCountries.includes(countryCode.toUpperCase())
    )
  }

  static getRecommendedProvider(
    currency: SupportedCurrency,
    countryCode: string
  ): PaymentProvider | null {
    const providers = this.getAvailableProviders(currency, countryCode)

    // Preference order: Razorpay for India, Stripe for others, PayPal as fallback
    if (countryCode.toUpperCase() === 'IN') {
      return providers.find((p) => p.id === 'razorpay') || null
    }

    return (
      providers.find((p) => p.id === 'stripe') ||
      providers.find((p) => p.id === 'paypal') ||
      providers[0] ||
      null
    )
  }

  static calculateTotalAmount(
    baseAmount: number,
    currency: SupportedCurrency,
    countryCode: string,
    providerId?: string
  ): {
    subtotal: number
    fees: number
    total: number
    provider: PaymentProvider
  } {
    const provider = providerId
      ? this.PAYMENT_PROVIDERS[providerId]
      : this.getRecommendedProvider(currency, countryCode)

    if (!provider) {
      throw new Error('No payment provider available for this currency/country')
    }

    const isInternational = !provider.supportedCountries.includes(countryCode.toUpperCase())
    const percentageFee =
      provider.fees.percentage + (isInternational ? provider.fees.internationalFee || 0 : 0)

    const fees = (baseAmount * percentageFee) / 100 + provider.fees.fixedFee
    const total = baseAmount + fees

    return {
      subtotal: baseAmount,
      fees: Math.round(fees * 100) / 100,
      total: Math.round(total * 100) / 100,
      provider,
    }
  }

  // Stripe Integration
  static async createStripePaymentIntent(
    amount: number,
    currency: SupportedCurrency,
    metadata: any
  ): Promise<PaymentIntent> {
    try {
      const response = await fetch('/api/payments/stripe/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency: currency.toLowerCase(),
          metadata,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent')
      }

      return {
        id: data.id,
        amount,
        currency,
        provider: 'stripe',
        method: 'card',
        metadata,
      }
    } catch (error) {
      console.error('Stripe payment intent creation failed:', error)
      throw error
    }
  }

  // PayPal Integration
  static async createPayPalOrder(
    amount: number,
    currency: SupportedCurrency,
    metadata: any
  ): Promise<PaymentIntent> {
    try {
      const response = await fetch('/api/payments/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount.toFixed(2),
          currency: currency.toUpperCase(),
          metadata,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create PayPal order')
      }

      return {
        id: data.id,
        amount,
        currency,
        provider: 'paypal',
        method: 'paypal_account',
        metadata,
      }
    } catch (error) {
      console.error('PayPal order creation failed:', error)
      throw error
    }
  }

  // Razorpay Integration (for Indian students)
  static async createRazorpayOrder(
    amount: number,
    currency: SupportedCurrency,
    metadata: any
  ): Promise<PaymentIntent> {
    try {
      const response = await fetch('/api/payments/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to paise
          currency: currency.toUpperCase(),
          metadata,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create Razorpay order')
      }

      return {
        id: data.id,
        amount,
        currency,
        provider: 'razorpay',
        method: 'razorpay_card',
        metadata,
      }
    } catch (error) {
      console.error('Razorpay order creation failed:', error)
      throw error
    }
  }

  static async processPayment(
    amount: number,
    currency: SupportedCurrency,
    countryCode: string,
    paymentMethodId: string,
    metadata: any
  ): Promise<PaymentResult> {
    try {
      const paymentMethod = this.PAYMENT_METHODS.find((m) => m.id === paymentMethodId)
      if (!paymentMethod) {
        throw new Error('Invalid payment method')
      }

      const provider = paymentMethod.provider

      // Route to appropriate payment processor
      switch (provider) {
        case 'stripe':
          const stripeIntent = await this.createStripePaymentIntent(amount, currency, metadata)
          return {
            success: true,
            paymentId: stripeIntent.id,
            paymentMethod: paymentMethodId,
            redirectUrl: `/payment/stripe/confirm?payment_intent=${stripeIntent.id}`,
          }

        case 'paypal':
          const paypalOrder = await this.createPayPalOrder(amount, currency, metadata)
          return {
            success: true,
            paymentId: paypalOrder.id,
            paymentMethod: paymentMethodId,
            redirectUrl: `/payment/paypal/confirm?order_id=${paypalOrder.id}`,
          }

        case 'razorpay':
          const razorpayOrder = await this.createRazorpayOrder(amount, currency, metadata)
          return {
            success: true,
            paymentId: razorpayOrder.id,
            paymentMethod: paymentMethodId,
            redirectUrl: `/payment/razorpay/confirm?order_id=${razorpayOrder.id}`,
          }

        default:
          throw new Error('Unsupported payment provider')
      }
    } catch (error) {
      console.error('Payment processing failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed',
      }
    }
  }

  static getPaymentMethodIcon(methodId: string): string {
    const method = this.PAYMENT_METHODS.find((m) => m.id === methodId)
    return method?.icon || '💳'
  }

  static getPaymentMethodName(methodId: string): string {
    const method = this.PAYMENT_METHODS.find((m) => m.id === methodId)
    return method?.name || 'Payment Method'
  }

  static isPaymentMethodAvailable(
    methodId: string,
    currency: SupportedCurrency,
    countryCode: string
  ): boolean {
    const method = this.PAYMENT_METHODS.find((m) => m.id === methodId)
    if (!method) return false

    return (
      method.supportedCurrencies.includes(currency) &&
      method.supportedCountries.includes(countryCode.toUpperCase())
    )
  }

  static getPaymentGuide(
    currency: SupportedCurrency,
    countryCode: string
  ): {
    title: string
    steps: string[]
    estimatedTime: string
    securityNote: string
  } {
    const provider = this.getRecommendedProvider(currency, countryCode)

    if (!provider) {
      return {
        title: 'Payment Guide',
        steps: ['Contact support for payment assistance'],
        estimatedTime: 'Varies',
        securityNote: 'All payments are processed securely',
      }
    }

    const guides: Record<string, any> = {
      stripe: {
        title: 'Secure Card Payment',
        steps: [
          'Select your preferred course',
          'Enter your card details securely',
          'Verify your payment information',
          'Complete the transaction',
          'Receive confirmation and course access',
        ],
        estimatedTime: '2-3 minutes',
        securityNote: 'Payments processed securely by Stripe with 256-bit SSL encryption',
      },
      paypal: {
        title: 'PayPal Payment',
        steps: [
          'Select PayPal as payment method',
          'Login to your PayPal account',
          'Review payment details',
          'Authorize the payment',
          'Return to get course access',
        ],
        estimatedTime: '3-5 minutes',
        securityNote: "Protected by PayPal's buyer protection and fraud monitoring",
      },
      razorpay: {
        title: 'Indian Payment Methods',
        steps: [
          'Choose your preferred payment method',
          'Enter payment details (Card/UPI/NetBanking)',
          'Complete OTP verification if required',
          'Confirm payment',
          'Get instant course access',
        ],
        estimatedTime: '2-4 minutes',
        securityNote: 'RBI approved payment gateway with bank-level security',
      },
    }

    return guides[provider.id] || guides.stripe
  }
}

export { InternationalPaymentService }
