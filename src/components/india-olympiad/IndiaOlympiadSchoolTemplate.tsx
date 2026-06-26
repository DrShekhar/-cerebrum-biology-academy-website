/**
 * IndiaOlympiadSchoolTemplate
 *
 * Server-rendered, props-driven UI for per-school India biology olympiad
 * landing pages (e.g. /biology-olympiad-tutor-dps-rk-puram,
 * /biology-olympiad-tutor-dais-mumbai-olympiad).
 *
 * Trademark + thin-content guardrails:
 *  - Never display logos, seals, or "endorsed by [school]" framing.
 *    Phrasing is descriptive: "NSEB & INBO coaching for {school}
 *    students" or "near {school}".
 *  - Each school page renders 800+ words of school-specific content
 *    via historyParagraphs, reputationBullets, olympiadRecord,
 *    collegeContext, paceAlignment, and faqs. We do not boilerplate
 *    beyond the cross-link footer.
 *  - The footer trust strip explicitly disclaims affiliation with the
 *    school and with HBCSE / Government of India.
 *  - USD pricing only ($4,500 / $90 / $50) — these mirror the canonical
 *    Olympiad pricing matrix.
 *  - FAQ uses native <details><summary> so this component stays a
 *    server component (no React state, no client bundle).
 */

import Link from 'next/link'
import type { IndiaOlympiadSchool } from '@/data/india-olympiad/schools'

interface IndiaOlympiadSchoolTemplateProps {
  school: IndiaOlympiadSchool
}

const WHATSAPP_NUMBER = '918826444334'

const pricingTiers = [
  {
    id: 'complete-year',
    name: 'Complete Olympiad Year',
    price: '$4,500',
    perUnit: '/ year',
    highlight: true,
    detail:
      '9-12 month full programme. Campbell Biology coverage, weekly past-paper drills, mock exams, practical lab skills module. Senior tutor assigned for the year.',
  },
  {
    id: 'elite-mentor',
    name: '1:1 Elite Mentoring',
    price: '$90',
    perUnit: '/ hour',
    highlight: false,
    detail:
      'One-on-one sessions with a senior olympiad tutor. Best for score optimisation, advanced topic weaknesses, or final-phase pre-national prep. Fully customised.',
  },
  {
    id: 'small-batch',
    name: 'Small-Batch Weekend',
    price: '$50',
    perUnit: '/ hour',
    highlight: false,
    detail:
      'Weekend small-group programme (4-6 students). Same Campbell curriculum. Peer learning plus structured past-paper practice. Saturday and Sunday morning IST.',
  },
]

const pricingSummary = pricingTiers.map((t) => `- ${t.name} (${t.price}${t.perUnit})`).join('\n')

function buildWhatsAppHref(
  school: IndiaOlympiadSchool,
  intent: 'counselling' | 'tier',
  tierLabel?: string
) {
  const lines =
    intent === 'counselling'
      ? [
          `Hi! I want to book a free Biology Olympiad counselling call.`,
          ``,
          `School: ${school.shortName} (${school.cityCountry})`,
          `Programme: NSEB Stage 1 / INBO Stage 2 / OCSC / IBO pathway`,
          `Pricing tiers I've seen:`,
          pricingSummary,
          ``,
          `Please share available IST slots and which tier fits my goals.`,
        ]
      : [
          `Hi! My child is at ${school.shortName} (${school.cityCountry}) and we want to enroll in biology olympiad coaching — ${tierLabel ?? ''}.`,
          ``,
          `Programme: NSEB / INBO / OCSC pathway`,
          `Tier: ${tierLabel ?? ''}`,
          ``,
          `Please confirm availability, batch start, and next steps.`,
        ]
  const message = lines.join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export default function IndiaOlympiadSchoolTemplate({ school }: IndiaOlympiadSchoolTemplateProps) {
  const hasCityLink = Boolean(school.citySlug)
  const cityHref = hasCityLink ? `/biology-olympiads/india/${school.citySlug}` : null

  const counsellingHref = buildWhatsAppHref(school, 'counselling')

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-blue-700">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400 mx-1">
              /
            </li>
            <li>
              <Link href="/biology-olympiads" className="text-gray-600 hover:text-blue-700">
                Biology Olympiads
              </Link>
            </li>
            {hasCityLink && cityHref && (
              <>
                <li aria-hidden="true" className="text-gray-400 mx-1">
                  /
                </li>
                <li>
                  <Link href={cityHref} className="text-gray-600 hover:text-blue-700">
                    {school.cityCountry}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-gray-400 mx-1">
              /
            </li>
            <li>
              <span className="text-blue-700 font-medium">{school.shortName}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            For {school.shortName} students
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6" data-speakable="title">
            NSEB &amp; INBO Coaching for{' '}
            <span className="block text-yellow-400 mt-2">{school.shortName} Students</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-3 max-w-3xl" data-speakable="summary">
            <strong className="text-white">{school.schoolName}</strong> — {school.cityCountry}
          </p>
          <p className="text-sm text-slate-400 mb-8 max-w-3xl">
            School type: {school.schoolType} · Live coaching in IST · Campbell Biology depth, NSEB
            past-paper drilling, INBO long-form theory + OCSC practical skills
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              IST weekend small-batch
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              AIIMS-trained faculty
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              NSEB → INBO → OCSC → IBO pathway
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm">
              100% online
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={counsellingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition"
            >
              Book free counselling on WhatsApp
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium border border-white/30 transition"
            >
              Call +91 88264-44334
            </a>
          </div>
        </div>
      </section>

      {/* About the school */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            About {school.shortName}
          </h2>
          {school.historyParagraphs.map((para, idx) => (
            <p key={idx} className="text-slate-700 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Reputation bullets */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {school.shortName} — public record
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Sourced from publicly available rankings (EducationWorld, Times School Survey), the
            school&apos;s own annual communications, and HBCSE&apos;s publicly published olympiad
            selection lists.
          </p>
          <ul className="space-y-3">
            {school.reputationBullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span aria-hidden="true" className="text-blue-700 mt-1">
                  •
                </span>
                <span className="text-slate-800">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Olympiad record (only if provided) */}
      {school.olympiadRecord && (
        <section className="py-12 md:py-16 bg-yellow-50 border-y-2 border-yellow-200">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              {school.shortName} — biology olympiad record
            </h2>
            <p className="text-slate-800 leading-relaxed">{school.olympiadRecord}</p>
          </div>
        </section>
      )}

      {/* College matriculation context */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            College matriculation context
          </h2>
          <p className="text-slate-700 leading-relaxed">{school.collegeContext}</p>
        </div>
      </section>

      {/* Pace alignment */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            How our coaching fits {school.shortName}&apos;s biology programme
          </h2>
          <p className="text-slate-700 leading-relaxed">{school.paceAlignment}</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Biology olympiad coaching — transparent USD pricing
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Same pricing worldwide, geo-converted to INR on checkout. Three clearly differentiated
            products — pick the tier that matches your goal and intensity.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {pricingTiers.map((tier) => {
              const tierHref = buildWhatsAppHref(school, 'tier', tier.name)
              return (
                <div
                  key={tier.id}
                  className={`rounded-xl border ${tier.highlight ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} p-6 hover:shadow-md transition flex flex-col`}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tier.name}</h3>
                  <p className="mb-3">
                    <span className="text-3xl font-bold text-blue-700">{tier.price}</span>
                    <span className="text-sm text-slate-600 ml-1">{tier.perUnit}</span>
                  </p>
                  <p className="text-sm text-slate-700 flex-grow">{tier.detail}</p>
                  <a
                    href={tierHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-4 py-2.5 text-sm transition"
                  >
                    Get this package on WhatsApp
                  </a>
                </div>
              )
            })}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/biology-olympiads"
              className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline"
            >
              See the full olympiads programme and local currency equivalents →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs (server-rendered native disclosure) */}
      <section className="py-12 md:py-16 bg-slate-50" data-speakable="faq">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions — {school.shortName}
          </h2>
          <div className="space-y-3">
            {school.faqs.map((faq) => (
              <details
                key={faq.question}
                className="bg-white rounded-xl border border-slate-200 group"
              >
                <summary className="cursor-pointer list-none p-5 font-semibold text-slate-900 flex items-center justify-between">
                  <span className="pr-4">{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="text-slate-500 group-open:rotate-180 transition-transform"
                  >
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed faq-answer">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Biology olympiad coaching for {school.shortName} students
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free 30-minute counselling call. We&apos;ll calibrate to your NSEB / INBO goals
            at {school.shortName} and help you decide between the Complete Olympiad Year, 1:1 Elite
            Mentoring, or the Small-Batch Weekend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={counsellingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              Book counselling on WhatsApp
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
            >
              Call +91 88264-44334
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/nseb-coaching"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">NSEB Stage 1 coaching</h3>
              <p className="text-xs text-slate-600 mt-1">
                National Standard Examination in Biology
              </p>
            </Link>
            <Link
              href="/inbo-coaching"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">INBO Stage 2 coaching</h3>
              <p className="text-xs text-slate-600 mt-1">Indian National Biology Olympiad</p>
            </Link>
            <Link
              href="/biology-olympiads"
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700">Biology Olympiads (Hub)</h3>
              <p className="text-xs text-slate-600 mt-1">NSEB / INBO / OCSC / IBO pathway</p>
            </Link>
            {hasCityLink && cityHref && (
              <Link
                href={cityHref}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">
                  Biology olympiad — {school.cityCountry}
                </h3>
                <p className="text-xs text-slate-600 mt-1">City-level programme</p>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-slate-500">
          Independent tutoring provider — we coach students from any Indian school. We are not
          affiliated with <strong>{school.schoolName}</strong>, the Homi Bhabha Centre for Science
          Education (HBCSE), the Indian Association of Physics Teachers, or any Government of India
          olympiad authority. The school name is used descriptively to indicate the audience this
          page is written for; no endorsement, sponsorship, or affiliation is implied. We coach the
          publicly published NSEB and INBO syllabi (per HBCSE) using publicly available past papers
          and the Campbell Biology textbook.
        </div>
      </section>
    </main>
  )
}
