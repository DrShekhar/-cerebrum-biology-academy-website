/**
 * PricingTier — server component.
 * Renders the small-batch tier pricing for either the global hub (showing
 * a price-by-region table) or a single country (showing one price card).
 *
 * 1-on-1 Elite tier exists but is offered on enquiry only and not displayed
 * publicly per founder direction.
 */

import { CheckCircle2, Phone, Users } from 'lucide-react'
import type { OlympiadCountry } from '@/config/olympiad-countries'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface PricingTierProps {
  /** Single-country mode — shows one price card. Otherwise renders the global table. */
  country?: OlympiadCountry
  /** All countries — required when country is undefined. */
  allCountries?: OlympiadCountry[]
}

const inclusions = [
  '4–6 students per batch — never more',
  'Live online classes, 6 hours per week',
  'Weekly 1-on-1 mentor call (15 min)',
  'Printed study material shipped to your address',
  '10+ years of IBO / NBO past papers with worked solutions',
  'WhatsApp doubt support, daily',
  'Mock-exam simulations under timed conditions',
  'Certificate of completion + olympiad-credential framing for college essays',
]

export function PricingTier({ country, allCountries }: PricingTierProps) {
  const onEnquiryHref = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(
    'Hi! I want to enquire about 1-on-1 Elite Olympiad coaching pricing and availability.'
  )}`

  return (
    <section className="bg-[#EDE9FF]/40 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-4xl">
            Small-batch pricing — premium-tier, transparent
          </h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            One published tier: small-batch coaching (4–6 students, 6 hrs/week, weekly mentor call).
            1-on-1 Elite coaching with Dr. Shekhar is available on enquiry.
          </p>
        </div>

        {country ? (
          <SingleCountryCard country={country} />
        ) : (
          <PricingTable countries={allCountries ?? []} />
        )}

        {/* Inclusions */}
        <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-slate-200 md:p-8">
          <h3 className="text-lg font-bold text-[#2C2C2C] md:text-xl">What&apos;s included</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#6B5DC6]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
            Want 1-on-1 Elite coaching with Dr. Shekhar instead? Pricing is on enquiry —{' '}
            <a
              href={onEnquiryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#6B5DC6] underline-offset-2 hover:underline"
            >
              ask via WhatsApp
            </a>{' '}
            or call <span className="font-semibold">+91 88264 44334</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

function SingleCountryCard({ country }: { country: OlympiadCountry }) {
  const enrolMessage = `Hi! I want to enrol in the small-batch Olympiad & IBO programme for ${country.name}. Please share next batch start date.`
  const enrolHref = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(enrolMessage)}`

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border-2 border-[#6B5DC6] bg-white p-8 shadow-xl md:p-10">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-[#6B5DC6]" />
        <span className="text-xs font-bold uppercase tracking-wide text-[#6B5DC6]">
          Small batch · 4–6 students
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span aria-hidden="true" className="text-4xl">
          {country.flag}
        </span>
        <h3 className="text-2xl font-bold text-[#2C2C2C] md:text-3xl">{country.name} pricing</h3>
      </div>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-[#2C2C2C] md:text-5xl">
          {country.priceDisplay}
        </span>
        <span className="text-sm text-slate-500">/ month</span>
      </div>
      <p className="mt-1 text-sm text-slate-600">
        Approx. ₹{country.priceMonthlyINR.toLocaleString('en-IN')} INR equivalent. EMI / quarterly
        billing supported.
      </p>
      <a
        href={enrolHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#6B5DC6] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#5a4fb0]"
      >
        Enrol via WhatsApp
      </a>
      <a
        href={`tel:${CONTACT_INFO.phone.primary}`}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <Phone className="h-4 w-4" />
        Call to enrol
      </a>
    </div>
  )
}

function PricingTable({ countries }: { countries: OlympiadCountry[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow ring-1 ring-slate-200">
      <table className="w-full text-left">
        <thead className="border-b border-slate-200 bg-[#EDE9FF]/50 text-sm font-semibold text-[#2C2C2C]">
          <tr>
            <th className="p-4">Country</th>
            <th className="p-4">National Olympiad</th>
            <th className="p-4 whitespace-nowrap">Time zone</th>
            <th className="p-4 whitespace-nowrap text-right">Price / month</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {countries.map((c) => (
            <tr key={c.slug} className="border-t border-slate-100 align-middle">
              <td className="p-4">
                <a
                  href={`/programs/biology-olympiad/${c.slug}`}
                  className="inline-flex items-center gap-2 font-medium text-[#2C2C2C] hover:text-[#6B5DC6]"
                >
                  <span aria-hidden="true">{c.flag}</span>
                  {c.name}
                </a>
              </td>
              <td className="p-4 text-slate-600">{c.nationalOlympiad}</td>
              <td className="p-4 text-slate-600">{c.timezone}</td>
              <td className="p-4 text-right">
                <span className="font-semibold text-[#2C2C2C]">{c.priceDisplay}</span>
                <span className="ml-1 text-xs text-slate-500">
                  / ₹{Math.round(c.priceMonthlyINR / 1000)}K
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
