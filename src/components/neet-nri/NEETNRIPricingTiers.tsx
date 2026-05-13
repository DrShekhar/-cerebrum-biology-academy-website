import { headers } from 'next/headers'
import { CheckCircle, Star, MessageCircle, Clock } from 'lucide-react'
import {
  neetNRIPricingProducts,
  priceUSDForCountry,
  monthlyUSDFromAnnual,
  COUNTRY_TO_NRI_ZONE,
} from '@/data/neet-nri/pricing-matrix'
import { sharedCurrencies, currencyForCountry, convertForDisplay } from '@/data/shared/currencies'

/**
 * Per-country class-timing label. Used to show "Evening EST batches",
 * "GST batches" etc. on the pricing section based on the visitor's region.
 */
const COUNTRY_TIMING_LABEL: Record<string, string> = {
  US: 'Live classes in US-friendly evening slots — EST · CST · MST · PST',
  CA: 'Live classes in Canadian evening slots — ET · CT · MT · PT',
  GB: 'Live classes in UK-friendly evening slots — GMT / BST',
  UK: 'Live classes in UK-friendly evening slots — GMT / BST',
  IE: 'Live classes in Ireland-friendly evening slots — GMT / IST (Irish)',
  AE: 'Live classes in UAE-friendly slots — GST (UTC+4)',
  SA: 'Live classes in Gulf-friendly slots — AST (UTC+3)',
  QA: 'Live classes in Gulf-friendly slots — AST (UTC+3)',
  KW: 'Live classes in Gulf-friendly slots — AST (UTC+3)',
  BH: 'Live classes in Gulf-friendly slots — AST (UTC+3)',
  OM: 'Live classes in Gulf-friendly slots — GST (UTC+4)',
  SG: 'Live classes in Singapore-friendly slots — SGT (UTC+8)',
  HK: 'Live classes in Hong Kong-friendly slots — HKT (UTC+8)',
  MY: 'Live classes in Malaysia-friendly slots — MYT (UTC+8)',
  AU: 'Live classes in Australia-friendly slots — AEST · ACST · AWST',
  NZ: 'Live classes in NZ-friendly slots — NZST',
  NP: 'Live classes in Nepal-friendly slots — NPT (UTC+5:45)',
}

/**
 * Server component. Reads the visitor's country from Vercel edge
 * headers, picks the right zone-USD price for each NEET NRI tier, and
 * renders both the local currency + USD reference. No INR is shown to
 * non-Indian visitors — anyone in IN sees the dedicated INR-domestic
 * NEET pages (not this component).
 *
 * Pages using this component are opted into dynamic rendering — by
 * design, since pricing depends on visitor geo.
 */

interface Props {
  /** Override the auto-detected country (useful for testing or for
   *  forcing a specific zone on a known-audience page like
   *  /neet-coaching-london-uk). */
  forceCountry?: string
  /** Hide the "WhatsApp for INR equivalents" footer (rare). */
  hideIndianPrompt?: boolean
}

const SITE_URL = 'https://cerebrumbiologyacademy.com'

function formatLocalAndUSD(
  priceUSD: number,
  country: string | null
): {
  local: string
  usd: string
  isLocalCurrencyDifferent: boolean
} {
  const currency = (country && currencyForCountry(country)) || null

  // Indian visitors should never hit this component (they go to the
  // INR-domestic NEET pages). If they do somehow arrive here, fall
  // through to USD display only — don't leak INR.
  if (!currency || currency.code === 'USD' || currency.code === 'INR') {
    return {
      local: `$${priceUSD.toLocaleString('en-US')}`,
      usd: `$${priceUSD.toLocaleString('en-US')}`,
      isLocalCurrencyDifferent: false,
    }
  }

  return {
    local: convertForDisplay(priceUSD, currency),
    usd: `$${priceUSD.toLocaleString('en-US')}`,
    isLocalCurrencyDifferent: true,
  }
}

export async function NEETNRIPricingTiers({ forceCountry, hideIndianPrompt }: Props = {}) {
  let country: string | null = forceCountry?.toUpperCase() ?? null
  if (!country) {
    const headerList = await headers()
    country =
      headerList.get('x-vercel-ip-country') ||
      headerList.get('cf-ipcountry') ||
      headerList.get('x-country-code') ||
      null
    if (country) country = country.toUpperCase()
  }

  const zone = (country && COUNTRY_TO_NRI_ZONE[country]) || 'floor'
  const localCurrency = (country && currencyForCountry(country)) || null
  const isLocalRendered =
    !!localCurrency && localCurrency.code !== 'USD' && localCurrency.code !== 'INR'
  const timingLabel =
    (country && COUNTRY_TIMING_LABEL[country]) ||
    'Live classes in NRI-friendly evening / weekend slots — pick a time that suits your timezone'

  return (
    <section
      id="nri-pricing"
      className="py-16 bg-gradient-to-b from-white to-slate-50"
      data-zone={zone}
      data-country={country || 'unknown'}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            NEET Coaching for NRI Students — Transparent Pricing
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            USD pricing optimised for your region.{' '}
            {isLocalRendered
              ? `Local currency (${localCurrency!.code}) shown alongside.`
              : 'Local currency conversion shown to detected regions.'}{' '}
            Annual programmes — billed yearly via international card or wire. EMI plans available.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-800 border border-green-200 px-4 py-2 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            {timingLabel}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {neetNRIPricingProducts.map((product) => {
            const priceUSD = priceUSDForCountry(product, country)
            const { local, usd, isLocalCurrencyDifferent } = formatLocalAndUSD(priceUSD, country)
            const monthlyUSD = monthlyUSDFromAnnual(priceUSD)

            return (
              <div
                key={product.id}
                className={`relative rounded-2xl border bg-white p-6 md:p-7 shadow-sm hover:shadow-lg transition-shadow ${
                  product.highlight ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-gray-200'
                }`}
              >
                {product.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white inline-flex items-center gap-1">
                    <Star className="w-3 h-3" /> Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.subtitle}</p>

                <div className="mt-5">
                  <p className="text-3xl md:text-4xl font-bold text-gray-900">{local}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.unitLabel}
                    {isLocalCurrencyDifferent && (
                      <span className="ml-2 text-gray-400">· {usd}</span>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-green-700 font-medium">
                    ≈ ${monthlyUSD.toLocaleString('en-US')}/month equivalent
                  </p>
                </div>

                <p className="mt-4 text-sm text-gray-600">{product.description}</p>

                <ul className="mt-5 space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/918826444334?text=${encodeURIComponent(
                    `Hi! I'm interested in ${product.name} for NEET NRI. Please share enrolment details and current cohort schedule.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-4 py-3 text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp to enrol
                </a>
              </div>
            )
          })}
        </div>

        {!hideIndianPrompt && (
          <p className="mt-8 text-center text-xs text-gray-500 max-w-3xl mx-auto">
            Indian families: please visit our domestic NEET pages for INR pricing and India-local
            batches.
          </p>
        )}
      </div>
    </section>
  )
}

/** Exposed for pages that want to attach the offer schema directly. */
export function neetNRIOffersForSchema(country: string | null | undefined, pageUrl: string) {
  return neetNRIPricingProducts.map((p) => {
    const priceUSD = priceUSDForCountry(p, country)
    return {
      '@type': 'Offer' as const,
      name: p.name,
      price: String(priceUSD),
      priceCurrency: 'USD' as const,
      url: pageUrl,
      priceSpecification: {
        '@type': 'UnitPriceSpecification' as const,
        price: String(priceUSD),
        priceCurrency: 'USD' as const,
        unitText: p.schemaUnitText,
      },
      availability: 'https://schema.org/InStock' as const,
    }
  })
}

// referenced for type safety
const _imports = { sharedCurrencies, SITE_URL }
void _imports
