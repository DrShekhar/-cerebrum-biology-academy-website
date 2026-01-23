import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { prisma } from '@/lib/prisma'

const SUPPORTED_CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'AED', 'SGD'] as const
type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]

const CURRENCY_MULTIPLIERS: Record<SupportedCurrency, number> = {
  INR: 100,
  USD: 100,
  EUR: 100,
  GBP: 100,
  AUD: 100,
  CAD: 100,
  AED: 100,
  SGD: 100,
}

const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
  AED: 'د.إ',
  SGD: 'S$',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'INR', receipt, notes, enrollmentId, userId } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid amount' }, { status: 400 })
    }

    const normalizedCurrency = currency.toUpperCase() as SupportedCurrency
    if (!SUPPORTED_CURRENCIES.includes(normalizedCurrency)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported currency: ${currency}. Supported: ${SUPPORTED_CURRENCIES.join(', ')}`,
        },
        { status: 400 }
      )
    }

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error('Razorpay credentials not configured')
      return NextResponse.json(
        { success: false, error: 'Payment gateway not configured' },
        { status: 500 }
      )
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    })

    const multiplier = CURRENCY_MULTIPLIERS[normalizedCurrency]
    const amountInSmallestUnit = Math.round(amount * multiplier)

    const order = await razorpay.orders.create({
      amount: amountInSmallestUnit,
      currency: normalizedCurrency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        ...notes,
        originalCurrency: normalizedCurrency,
        originalAmount: amount.toString(),
      },
    })

    if (enrollmentId && userId) {
      await prisma.payments.create({
        data: {
          id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId,
          enrollmentId,
          amount: amountInSmallestUnit,
          currency: normalizedCurrency,
          razorpayOrderId: order.id,
          status: 'PENDING',
          paymentMethod: 'RAZORPAY',
          updatedAt: new Date(),
        },
      })
    }

    console.log(`Razorpay order created: ${order.id} (${normalizedCurrency} ${amount})`)

    return NextResponse.json({
      success: true,
      id: order.id,
      entity: order.entity,
      amount: order.amount,
      amountDisplay: amount,
      currency: order.currency,
      currencySymbol: CURRENCY_SYMBOLS[normalizedCurrency],
      receipt: order.receipt,
      status: order.status,
      created_at: order.created_at,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    currencies: SUPPORTED_CURRENCIES.map((code) => ({
      code,
      symbol: CURRENCY_SYMBOLS[code],
      name: getCurrencyName(code),
    })),
  })
}

function getCurrencyName(code: SupportedCurrency): string {
  const names: Record<SupportedCurrency, string> = {
    INR: 'Indian Rupee',
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    AED: 'UAE Dirham',
    SGD: 'Singapore Dollar',
  }
  return names[code]
}
