import Link from 'next/link'
import { CheckCircle2, ArrowRight, Globe, MapPin } from 'lucide-react'
import {
  sharedCurrencies,
  convertForDisplay,
  currencyForCountry,
  countryName,
  type CurrencyInfo,
} from '@/data/shared/currencies'

/** Product row for the matrix. Generic across IB, Olympiad, NEET. */
export interface PricingProductLike {
  id: string
  name: string
  subtitle: string
  priceUSD: number
  unit: 'hr' | 'year' | 'month'
  unitLabel: string
  description: string
  features: string[]
  highlight?: boolean
}

interface SharedPricingMatrixProps {
  products: PricingProductLike[]
  heading?: string
  subheading?: string
  ctaPrimaryHref?: string
  ctaPrimaryLabel?: string
  /** Subset of currency codes to show as equivalents (default: top 6). */
  equivalents?: string[]
  /** Regional city-page links rendered in the callout row. */
  regionalLinks?: Array<{ region: string; href: string }>
  /** ISO-2 country code from Vercel's x-vercel-ip-country header. */
  detectedCountry?: string | null
}

/**
 * Generic geo-aware pricing matrix. Drop-in for any landing page that
 * wants consistent USD-primary pricing with visitor-country-aware
 * local-currency highlighting.
 */
export function SharedPricingMatrix({
  products,
  heading = 'Pricing — Pick Your Fit',
  subheading = 'All prices in USD. Local currency equivalents shown; regional pages carry exact local pricing.',
  ctaPrimaryHref = 'https://wa.me/918826444334?text=Hi%20Cerebrum%2C%20I%20would%20like%20to%20enrol.%20Please%20share%20details.',
  ctaPrimaryLabel = 'WhatsApp for Enrollment',
  equivalents,
  regionalLinks,
  detectedCountry,
}: SharedPricingMatrixProps) {
  const detectedCurrency = currencyForCountry(detectedCountry)
  const detectedCountryLabel = countryName(detectedCountry)

  const currencyShortlist: CurrencyInfo[] = equivalents
    ? (equivalents
        .map((code) => sharedCurrencies.find((c) => c.code === code))
        .filter(Boolean) as CurrencyInfo[])
    : sharedCurrencies.slice(0, 6)

  const orderedCurrencies = detectedCurrency
    ? [detectedCurrency, ...currencyShortlist.filter((c) => c.code !== detectedCurrency.code)]
    : currencyShortlist

  return (
    <section id="pricing" className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          {detectedCurrency && detectedCountryLabel && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-800">
              <MapPin className="h-4 w-4" />
              Detected: {detectedCountryLabel} · showing {detectedCurrency.code} first
            </div>
          )}
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">{subheading}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-2xl p-6 sm:p-8 ${
                p.highlight
                  ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl ring-2 ring-green-500'
                  : 'border border-gray-200 bg-white shadow-sm'
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-500 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              <h3 className={`text-xl font-bold ${p.highlight ? 'text-white' : 'text-gray-900'}`}>
                {p.name}
              </h3>
              <p className={`mt-1 text-sm ${p.highlight ? 'text-slate-300' : 'text-gray-600'}`}>
                {p.subtitle}
              </p>

              <div className="mt-5 mb-2 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-bold ${p.highlight ? 'text-green-400' : 'text-green-600'}`}
                >
                  ${p.priceUSD.toLocaleString()}
                </span>
                <span className={`text-sm ${p.highlight ? 'text-slate-300' : 'text-gray-500'}`}>
                  {p.unitLabel}
                </span>
              </div>

              {detectedCurrency && (
                <div
                  className={`mb-4 inline-flex items-baseline gap-1 rounded-md px-2.5 py-1 text-sm font-semibold ${
                    p.highlight ? 'bg-green-500/20 text-green-200' : 'bg-green-50 text-green-800'
                  }`}
                >
                  ≈ {convertForDisplay(p.priceUSD, detectedCurrency)} {detectedCurrency.code}
                </div>
              )}

              <p
                className={`mb-5 text-sm leading-relaxed ${p.highlight ? 'text-slate-200' : 'text-gray-700'}`}
              >
                {p.description}
              </p>

              <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                {orderedCurrencies.slice(0, 6).map((c) => {
                  const isDetected = detectedCurrency?.code === c.code
                  return (
                    <div
                      key={c.code}
                      className={
                        isDetected
                          ? p.highlight
                            ? 'font-semibold text-green-300'
                            : 'font-semibold text-green-700'
                          : p.highlight
                            ? 'text-slate-300'
                            : 'text-gray-600'
                      }
                    >
                      <span className="font-semibold">{c.code}</span>{' '}
                      {convertForDisplay(p.priceUSD, c)}
                    </div>
                  )
                })}
              </div>

              <ul className="space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 flex-shrink-0 ${p.highlight ? 'text-green-400' : 'text-green-600'}`}
                    />
                    <span className={p.highlight ? 'text-slate-200' : 'text-gray-700'}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {regionalLinks && regionalLinks.length > 0 && (
          <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8">
            <div className="flex gap-3">
              <Globe className="mt-1 h-5 w-5 flex-shrink-0 text-green-700" />
              <div>
                <h3 className="mb-2 text-base font-bold text-green-900">
                  Local pricing for your region
                </h3>
                <p className="text-sm text-green-900">
                  {detectedCurrency && detectedCountryLabel
                    ? `We detected you're visiting from ${detectedCountryLabel}. Regional pages publish exact ${detectedCurrency.code} pricing. Pick your region below.`
                    : 'Currency equivalents above are reference conversions. Regional pages publish exact local-currency fees.'}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {regionalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-green-300 bg-white px-3 py-1.5 text-xs font-medium text-green-800 transition-all hover:border-green-500 hover:text-green-900"
                >
                  {link.region}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href={ctaPrimaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
          >
            {ctaPrimaryLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
