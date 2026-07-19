import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NEAR_ME_CITY_BY_SLUG } from '@/data/locality-content/near-me-cities'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

const SLUG = 'ranchi'
const city = NEAR_ME_CITY_BY_SLUG[SLUG]
const PAGE_URL = `https://cerebrumbiologyacademy.com/neet-coaching-fees-${SLUG}`

export const metadata: Metadata = city
  ? {
      title: `NEET Coaching Fees in ${city.displayName} 2026 | Fee Comparison vs Allen / Aakash · Cerebrum`,
      description: `NEET coaching fee comparison ${city.displayName} (${city.state}) 2026. Cerebrum Biology: Pursuit Rs 48,000 / Ascent Rs 76,000 / Pinnacle Rs 98,000 per year. Compare with Allen, Aakash, ${city.localCoachingPresence
        .split(',')[0]
        .trim()
        .replace(/\\(.*\\)/, '')
        .trim()}. Biology specialist online + study material shipped to ${city.majorAreas.slice(0, 3).join(', ')}.`,
      keywords: [
        `NEET coaching fees ${city.displayName}`,
        `NEET coaching fee ${city.displayName} 2026`,
        `best NEET coaching fees ${city.displayName}`,
        `affordable NEET coaching ${city.displayName}`,
        `NEET biology coaching cost ${city.displayName}`,
        `cheapest NEET coaching ${city.displayName}`,
        `Allen NEET fees ${city.displayName}`,
        `Aakash NEET fees ${city.displayName}`,
        `NEET dropper batch fees ${city.displayName}`,
        `NEET coaching fees ${city.state}`,
        ...(city.altNames ?? []).map((n) => `NEET coaching fees ${n}`),
      ],
      alternates: { canonical: PAGE_URL },
      openGraph: {
        title: `NEET Coaching Fees in ${city.displayName} 2026 · Cerebrum`,
        description: `Cerebrum NEET Biology fees ${city.displayName} — Pursuit Rs 48k / Ascent Rs 76k / Pinnacle Rs 98k. Compare with local options.`,
        url: PAGE_URL,
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image' as const,
        title: `NEET Coaching in ${city.displayName} · Cerebrum Biology Academy`,
        description: `Best NEET Biology coaching for ${city.displayName} students at Cerebrum.`,
      },
      robots: 'index, follow, max-image-preview:large',
    }
  : { title: 'City not found' }

export default function Page() {
  if (!city) notFound()
  const localCoaching = city.localCoachingPresence
    .split(',')[0]
    .trim()
    .replace(/\(.*\)/, '')
    .trim()
  const wa =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      `Hi — I am in ${city.displayName} and want to compare NEET coaching fees. Please share Cerebrum tier matrix and pricing details.`
    )

  const faqs = [
    {
      question: `What does NEET Biology coaching cost in ${city.displayName}?`,
      answer: `Cerebrum biology-specialist coaching pricing is pan-India (no city premium): Pursuit ~Rs 48,000/year (30-40 student batch); Ascent ~Rs 76,000/year (16-25 student batch with weekly 1:1 doubt slot); Pinnacle ZA ~Rs 98,000/year (10-12 students with weekly Dr. Shekhar 1:1 mentor calls). EMI options + sibling discounts available. Pricing includes live classes, NCERT-line-by-line guide, 12,000+ MCQ bank, weekly tests, and material shipped to ${city.majorAreas.slice(0, 3).join(', ')}.`,
    },
    {
      question: `How does Cerebrum biology-specialist pricing compare to Allen / Aakash / ${localCoaching} in ${city.displayName}?`,
      answer: `Different product, different pricing. Allen Full-PCM in ${city.displayName} runs Rs 130,000-180,000/year for the dropper programme; Aakash similar Rs 110,000-160,000. Cerebrum biology-only is Rs 48,000-98,000/year — but we don't teach physics or chemistry. Most students pair us (biology layer) with their existing ${localCoaching} (PCM layer). Combined annual spend typically Rs 150,000-250,000 vs Rs 180,000+ for Allen-alone with biology depth limitations.`,
    },
    {
      question: `What's the dropper batch cost for a ${city.displayName} repeater?`,
      answer: `Same as regular pricing: Pursuit ~Rs 48,000/year; Ascent ~Rs 76,000/year; Pinnacle ZA ~Rs 98,000/year. Dropper-specific intensive content built in (NEET PYQ drilling, weekly mocks, previous-attempt analysis). EMI available for droppers — 3/6/12 month plans.`,
    },
    {
      question: `Are there scholarships for ${city.displayName} students?`,
      answer: `Cerebrum offers merit-based scholarships up to 30% on Pursuit and Ascent tiers based on previous NEET attempt score or admission test performance. Pinnacle tier rarely scholarship'd as it's already priced for premium 1:1 mentoring. WhatsApp the team to verify current scholarship windows.`,
    },
    {
      question: `What's the typical biology coaching cost for a ${city.feederSchools[0]} student?`,
      answer: `Same tier pricing applies regardless of which school. We have current ${city.displayName} students from ${city.feederSchools.slice(0, 3).join(', ')} across all three tiers — choice is driven by target college (Pinnacle for AIIMS / ${city.stateQuotaCollege}, Ascent for any state-quota MBBS, Pursuit for foundation depth).`,
    },
    {
      question: `Is there a ${city.displayName} offline center?`,
      answer: `Cerebrum runs 5 offline centers (South Extension Delhi, Green Park Delhi, Rohini Delhi, Gurugram, Faridabad). For ${city.displayName} students, the programme is 100% live online via Zoom — same faculty, same curriculum, same pricing as the offline centers. Study material shipped to your ${city.displayName} address.`,
    },
    {
      question: `What's included in the Rs 76,000 Ascent tier for ${city.displayName} students?`,
      answer: `Live online biology classes (Mon/Wed/Fri 5:30-8 PM IST + Sunday tests), 16-25 student batch with weekly 15-min 1:1 doubt slot, full Cerebrum NCERT-line-by-line guide (printed + shipped), 12,000+ MCQ test bank, monthly NEET-pattern full mocks with detailed analysis, bi-weekly senior faculty mentor call, WhatsApp doubt support 24x7. EMI 3/6/12 months available.`,
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={[
          `NEET Coaching Fees ${city.displayName}`,
          `NEET Biology Pricing ${city.displayName}`,
        ]}
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">NEET Coaching Fees {city.displayName}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Coaching Fees in {city.displayName} 2026
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Transparent fee comparison for {city.displayName} ({city.state}) NEET aspirants.
            Cerebrum biology-specialist pricing is pan-India — no city premium. Pair with your
            existing {localCoaching} for PCM. Target: <strong>{city.stateQuotaCollege}</strong>
            {city.otherStateMedicalColleges?.length ? (
              <> or {city.otherStateMedicalColleges[0]}</>
            ) : null}
            .
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp for fee details
          </a>
        </div>
      </section>

      {/* Fee tier comparison */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Cerebrum Biology Specialist tier pricing for {city.displayName}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border-2 border-slate-200 p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                Pursuit
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                ~Rs 48,000<span className="text-sm text-slate-500">/yr</span>
              </p>
              <p className="mt-2 text-sm text-slate-600">
                30-40 student batch · group doubt sessions · NCERT guide shipped
              </p>
            </div>
            <div className="rounded-xl border-2 border-indigo-600 bg-indigo-50 p-6">
              <p className="text-xs uppercase tracking-wide text-indigo-700 font-semibold">
                Ascent · Most popular
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                ~Rs 76,000<span className="text-sm text-slate-500">/yr</span>
              </p>
              <p className="mt-2 text-sm text-slate-700">
                16-25 student batch · weekly 15-min 1:1 doubt slot · monthly mocks
              </p>
            </div>
            <div className="rounded-xl border-2 border-slate-200 p-6">
              <p className="text-xs uppercase tracking-wide text-amber-600 font-semibold">
                Pinnacle ZA
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                ~Rs 98,000<span className="text-sm text-slate-500">/yr</span>
              </p>
              <p className="mt-2 text-sm text-slate-600">
                10-12 students · direct Dr. Shekhar weekly 1:1 mentor · AIIMS target
              </p>
            </div>
          </div>
          <p className="mt-5 text-xs text-slate-500">
            EMI options 3/6/12 months. Sibling discounts. Merit-based scholarships up to 30%. For{' '}
            {city.displayName} students from {city.feederSchools.slice(0, 3).join(', ')}, etc.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-7">
            NEET Coaching Fees {city.displayName} — FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-5 border border-slate-200">
                <summary className="text-base font-semibold text-slate-900 cursor-pointer">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get a personalised quote for {city.displayName}
          </h2>
          <p className="text-blue-100 mb-6">
            WhatsApp with your child's class + target college. Reply within hours.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>
    </main>
  )
}
