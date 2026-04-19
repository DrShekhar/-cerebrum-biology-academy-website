import Link from 'next/link'
import { CheckCircle2, ArrowRight, Globe } from 'lucide-react'
import {
  ibPricingProducts,
  displayCurrencies,
  convertForDisplay,
} from '@/data/ib-biology/pricing-matrix'

/**
 * Canonical IB Biology pricing matrix.
 *
 * Drop-in section for /boards/ib, /ib-biology-tuition, /ib-biology-tutor-online,
 * or any IB Biology page that needs to display authoritative pricing.
 *
 * Server-renderable (no client state). Shows USD primary + rotating
 * currency equivalents, with city-level links for region-specific pricing.
 */
export function IBBiologyPricingMatrix({
  heading = 'IB Biology Pricing — Pick Your Fit',
  subheading = 'All prices in USD. Local currency equivalents shown; region-specific pages publish exact local pricing.',
  ctaPrimaryHref = 'https://wa.me/918826444334?text=Hi!%20I%27m%20interested%20in%20IB%20Biology%20coaching.%20Please%20share%20details.',
  ctaPrimaryLabel = 'WhatsApp for Enrollment',
}: {
  heading?: string
  subheading?: string
  ctaPrimaryHref?: string
  ctaPrimaryLabel?: string
} = {}) {
  return (
    <section id="pricing" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">{subheading}</p>
        </div>

        {/* Product cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {ibPricingProducts.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-2xl p-6 sm:p-8 ${
                p.highlight
                  ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl ring-2 ring-green-500'
                  : 'bg-white border border-gray-200 shadow-sm'
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

              <p
                className={`mb-5 text-sm leading-relaxed ${p.highlight ? 'text-slate-200' : 'text-gray-700'}`}
              >
                {p.description}
              </p>

              {/* Multi-currency equivalents */}
              <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                {displayCurrencies.slice(0, 6).map((c) => (
                  <div key={c.code} className={p.highlight ? 'text-slate-300' : 'text-gray-600'}>
                    <span className="font-semibold">{c.code}</span>{' '}
                    {convertForDisplay(p.priceUSD, c)}
                  </div>
                ))}
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

        {/* Regional pricing callout */}
        <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <Globe className="mt-1 h-5 w-5 flex-shrink-0 text-green-700" />
              <div>
                <h3 className="mb-2 text-base font-bold text-green-900">
                  Local pricing for your city
                </h3>
                <p className="text-sm text-green-900">
                  Currency equivalents above are reference conversions. City-level pages publish the
                  exact fee band we use for students in your region — INR for India, local currency
                  for global cities.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {displayCurrencies.map((c) => (
              <Link
                key={c.code}
                href={c.regionalHref}
                className="inline-flex items-center gap-1.5 rounded-lg border border-green-300 bg-white px-3 py-1.5 text-xs font-medium text-green-800 transition-all hover:border-green-500 hover:text-green-900"
              >
                {c.region}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

        {/* Primary CTA */}
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
