'use client'

/**
 * GlobalPricingStrip — geo-aware "from" prices per vertical for /global.
 *
 * Client island so the page itself stays statically rendered (reading
 * headers() server-side would force the whole route dynamic). Country comes
 * from /api/geo/country post-hydration; until then (and for crawlers /
 * JS-off visitors) the strip renders stable USD prices.
 *
 * All amounts derive from the canonical per-vertical pricing matrices in
 * src/data/<vertical>/pricing-matrix.ts — never hardcode prices here; the
 * AEO audit flagged hardcoded FAQ prices drifting from the matrices.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  COUNTRY_TO_NRI_ZONE,
  neetNRIPricingProducts,
  monthlyUSDFromAnnual,
} from '@/data/neet-nri/pricing-matrix'
import { ibPricingProducts, displayCurrencies } from '@/data/ib-biology/pricing-matrix'
import { mcatPricingProducts } from '@/data/mcat/pricing-matrix'
import { gamsatPricingProducts } from '@/data/gamsat/pricing-matrix'
import { usmleStep1PricingProducts } from '@/data/usmle-step-1/pricing-matrix'
import { datPricingProducts } from '@/data/dat/pricing-matrix'
import { aLevelPricingTiers } from '@/data/a-level/pricing-matrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  IN: 'INR',
  GB: 'GBP',
  UK: 'GBP',
  IE: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  NL: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  AE: 'AED',
  SA: 'AED',
  QA: 'AED',
  KW: 'AED',
  OM: 'AED',
  BH: 'AED',
  SG: 'SGD',
  MY: 'SGD',
  HK: 'HKD',
  CA: 'CAD',
  AU: 'AUD',
  NZ: 'AUD',
  CH: 'CHF',
}

function minUSD(products: { priceUSD: number }[]): number {
  return Math.min(...products.map((p) => p.priceUSD))
}

// GAMSAT products are priced in GBP/AUD/EUR (its markets) with no USD field —
// derive a USD baseline from the cheapest GBP price via the shared rate table.
function gamsatMinUSD(): number {
  const minGBP = Math.min(...gamsatPricingProducts.map((p) => p.priceGBP))
  const gbpRate = displayCurrencies.find((c) => c.code === 'GBP')?.rate ?? 0.79
  return Math.round(minGBP / gbpRate)
}

function formatLocal(usd: number, country: string | null): string {
  const code = (country && COUNTRY_TO_CURRENCY[country.toUpperCase()]) || null
  const currency = code ? displayCurrencies.find((c) => c.code === code) : null
  if (!currency) return `$${usd.toLocaleString('en-US')}`
  const local = usd * currency.rate
  const rounded = local >= 1000 ? Math.round(local / 50) * 50 : Math.round(local / 5) * 5
  return `${currency.symbol}${rounded.toLocaleString('en-US')}`
}

function neetNRIMonthlyUSD(country: string | null): number {
  const zone = (country && COUNTRY_TO_NRI_ZONE[country.toUpperCase()]) || 'floor'
  const annual = Math.min(...neetNRIPricingProducts.map((p) => p.priceUSDByZone[zone]))
  return monthlyUSDFromAnnual(annual)
}

interface StripRow {
  vertical: string
  href: string
  usd: number
  unit: string
}

export function GlobalPricingStrip() {
  const [country, setCountry] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/geo/country', { cache: 'force-cache' })
      .then((res) => res.json())
      .then((data) => setCountry(data.country))
      .catch(() => setCountry(null))
  }, [])

  const rows: StripRow[] = [
    {
      vertical: 'NEET (students abroad)',
      href: '/online-biology-classes-international',
      usd: neetNRIMonthlyUSD(country),
      unit: '/month',
    },
    {
      vertical: 'IB Biology',
      href: '/ib-biology-tuition',
      usd: minUSD(ibPricingProducts),
      unit: '/hour 1:1',
    },
    {
      vertical: 'MCAT Bio/Biochem',
      href: '/best-mcat-biology-tutor',
      usd: minUSD(mcatPricingProducts),
      unit: ' full course',
    },
    {
      vertical: 'GAMSAT Section III',
      href: '/best-gamsat-biology-tutor',
      usd: gamsatMinUSD(),
      unit: ' full course',
    },
    {
      vertical: 'USMLE Step 1 Biology',
      href: '/usmle-step-1-biology-preparation',
      usd: minUSD(usmleStep1PricingProducts),
      unit: ' full course',
    },
    {
      vertical: 'DAT Biology',
      href: '/dat-biology-preparation',
      usd: minUSD(datPricingProducts),
      unit: ' full course',
    },
    {
      vertical: 'A-Level Biology',
      href: '/a-level-biology-tutor',
      usd: minUSD(aLevelPricingTiers),
      unit: '/year',
    },
    {
      vertical: 'Biology Olympiads',
      href: '/ibo-preparation',
      usd: minUSD(olympiadPricingProducts),
      unit: '/programme',
    },
  ]

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 sm:p-8">
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          Transparent pricing, in your currency
        </h3>
        <span className="rounded-full bg-[#e8ede8] px-2.5 py-1 text-[11px] font-medium text-[#3d4d3d]">
          💳 geo-priced{country ? ` · ${country.toUpperCase()}` : ''}
        </span>
      </div>
      <p className="mb-5 text-sm text-gray-600">
        Starting prices per programme — exact tiers on each vertical page.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {rows.map((row) => (
          <Link
            key={row.vertical}
            href={row.href}
            className="group flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 transition-colors hover:bg-[#e8ede8]"
          >
            <span className="text-sm font-medium text-gray-900 group-hover:text-[#3d4d3d]">
              {row.vertical}
            </span>
            <span className="whitespace-nowrap text-sm font-semibold text-[#3d4d3d]">
              from {formatLocal(row.usd, country)}
              <span className="font-normal text-gray-500">{row.unit}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
