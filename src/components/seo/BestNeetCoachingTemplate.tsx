/**
 * BestNeetCoachingTemplate — data-driven "Best NEET Coaching in <City>" page.
 *
 * Renders genuinely unique per-city content from NearMeCityData (cityContext,
 * local coaching landscape, target colleges, feeder schools, city FAQs) so each
 * city page clears the scaled-content bar. Positions Cerebrum honestly as a
 * biology-SPECIALIST (the 360/720 layer) alongside the local generalist chains,
 * rather than a fake "we're #1" comparison.
 *
 * Server component — no client JS (FAQs use <details>, CTAs are anchors).
 */

import Link from 'next/link'
import type { NearMeCityData } from '@/data/locality-content/near-me-cities'

const YEAR_LABEL = '2026-27'
const WA_NUMBER = '918826444334'

export interface BestNeetCoachingTemplateProps {
  city: NearMeCityData
  extraFaqs?: { question: string; answer: string }[]
}

export default function BestNeetCoachingTemplate({
  city,
  extraFaqs = [],
}: BestNeetCoachingTemplateProps) {
  const localCoaching = city.localCoachingPresence
    .split(',')[0]
    .trim()
    .replace(/\(.*\)/, '')
    .trim()
  const pageUrl = `https://cerebrumbiologyacademy.com/best-neet-coaching-${city.slug}`
  const wa = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

  const allFaqs = [
    {
      question: `Which is the best NEET coaching in ${city.displayName}?`,
      answer: `There isn't one "best" for everyone — it depends on the subject. For Physics-Chemistry, ${city.localCoachingPresence} run large full-package batches. For Biology (360/720 marks — half the exam), a specialist with 10-40 student batches and per-MCQ weekly review moves the needle most. Cerebrum is the biology-specialist layer: AIIMS-trained faculty, live online for ${city.displayName} students, targeting ${city.stateQuotaCollege} via ${city.state} state quota. Most families pair a local PCM coaching with Cerebrum for biology.`,
    },
    {
      question: `How do I compare NEET coaching institutes in ${city.displayName}?`,
      answer: `Look past the hoarding. Compare on: batch size (10-40 beats 150-200 for attention), whether biology is taught by a specialist or a generalist, weekly test + per-MCQ review cadence, and honest fees. Ask each institute for their biology-specific results, not just overall selections.`,
    },
    {
      question: `What are NEET coaching fees in ${city.displayName}?`,
      answer: `National chains typically charge ₹1.2-3.5 lakh/yr for the full PCB package. Cerebrum's biology-specialist programme: Pursuit ₹40,000-75,000/yr (30-40 students); Ascent ₹58,000-90,000/yr (16-25, weekly 1:1 doubt slot); Pinnacle ZA ₹1,20,000-1,56,000/yr (10-12, direct Dr. Shekhar mentoring). EMI available; material shipped to ${city.majorAreas.slice(0, 3).join(', ')}.`,
    },
    {
      question: `Which medical college can a ${city.displayName} aspirant realistically target?`,
      answer: `Most achievable via ${city.state} state quota (85% of seats): ${city.stateQuotaCollege}. Also realistic: ${(city.otherStateMedicalColleges ?? []).join(', ') || 'AIIMS Delhi via all-India quota'}. We calibrate biology score targets (340+/360) to your specific college aspiration.`,
    },
    ...(city.localFaqs ?? []),
    ...extraFaqs,
  ]

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Best NEET Biology Coaching in ${city.displayName} ${YEAR_LABEL}`,
    description: `Biology-specialist NEET coaching for ${city.displayName} students. AIIMS-trained faculty, 10-40 student batches, targeting ${city.stateQuotaCollege}.`,
    url: pageUrl,
    inLanguage: 'en-IN',
    provider: {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
      name: 'Cerebrum Biology Academy',
    },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Best NEET Coaching in ${city.displayName}`,
        item: pageUrl,
      },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([courseSchema, faqSchema, breadcrumbSchema]),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-indigo-300 font-semibold mb-3">
            {city.displayName}, {city.state} · NEET {YEAR_LABEL}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Best NEET Coaching in {city.displayName} {YEAR_LABEL}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            The honest comparison for {city.displayName} aspirants — and why the biology layer
            (360/720 marks) decides your rank. AIIMS-trained biology-specialist faculty, small
            batches, live online.
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
            <Link
              href="/book-free-demo"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-500"
            >
              Book a free demo
            </Link>
            <a
              href={wa(
                `Hi! I'm in ${city.displayName} and comparing the best NEET coaching. Please share Cerebrum's biology programme details and fees.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-100"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* City NEET landscape (unique) */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            The NEET coaching landscape in {city.displayName}
          </h2>
          <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {city.cityContext}
          </p>
          <p className="text-base text-slate-700 leading-relaxed">{city.whyOnlineHere}</p>
        </div>
      </section>

      {/* Honest comparison */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            How to actually pick the best — {city.displayName}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-white p-5 border border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">Local full-package chains</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {city.localCoachingPresence} — strong for Physics &amp; Chemistry, but biology runs
                in 150-200 student batches where individual weak-chapter attention is hard.
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 border border-indigo-200">
              <p className="font-semibold text-indigo-700 mb-2">Cerebrum — biology specialist</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Biology only (the 360/720 that decides rank): 10-40 student batches, AIIMS faculty,
                weekly per-MCQ review, NCERT line-by-line. Pair it with your {localCoaching} for
                PCM.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-white p-5">
              <p className="text-sm font-semibold text-indigo-700">
                Target colleges ({city.state} quota)
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                <li>• {city.stateQuotaCollege}</li>
                {(city.otherStateMedicalColleges ?? []).map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white p-5">
              <p className="text-sm font-semibold text-indigo-700">Feeder schools we serve</p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                {city.feederSchools.slice(0, 6).map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-7 text-center">
            Best NEET Coaching in {city.displayName} — FAQs
          </h2>
          <div className="space-y-4">
            {allFaqs.map((f, i) => (
              <details key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <summary className="text-base font-semibold text-slate-900 cursor-pointer">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Compare us on biology — free demo from {city.displayName}
          </h2>
          <p className="text-indigo-100 mb-6">
            60-minute live class with Dr. Shekhar. No card required.
          </p>
          <a
            href={wa(
              `Hi! I want to book a free demo to compare Cerebrum's NEET biology coaching for ${city.displayName}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold text-lg"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>
    </main>
  )
}
