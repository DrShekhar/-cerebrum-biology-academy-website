import { NextRequest, NextResponse } from 'next/server'
import {
  detectCurrencyFromCountry,
  getAllCurrencies,
  CURRENCY_CONFIG,
  type SupportedCurrency,
} from '@/lib/payments/currencyService'

export async function GET(request: NextRequest) {
  const country =
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('x-country-code')

  const detectedCurrency = detectCurrencyFromCountry(country)
  const currencies = getAllCurrencies()

  return NextResponse.json({
    success: true,
    detected: {
      currency: detectedCurrency,
      country: country || 'unknown',
      ...CURRENCY_CONFIG[detectedCurrency],
    },
    currencies,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { currency } = await request.json()

    if (!currency) {
      return NextResponse.json({ success: false, error: 'Currency code required' }, { status: 400 })
    }

    const normalizedCurrency = currency.toUpperCase() as SupportedCurrency
    const config = CURRENCY_CONFIG[normalizedCurrency]

    if (!config) {
      return NextResponse.json(
        { success: false, error: `Unsupported currency: ${currency}` },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      currency: config,
    })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
