import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NEAR_ME_CITY_BY_SLUG } from '@/data/locality-content/near-me-cities'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

const SLUG = 'mysore'
const city = NEAR_ME_CITY_BY_SLUG[SLUG]
const PAGE_URL = `https://cerebrumbiologyacademy.com/neet-coaching-${SLUG}`

export const metadata: Metadata = city
  ? {
      title: `NEET Coaching in ${city.displayName} | Best Biology Coaching · Cerebrum`,
      description: `Best NEET Biology coaching for ${city.displayName} (${city.state}) students — AIIMS-trained faculty, small online batches, NCERT-line-by-line. Serving ${city.majorAreas.slice(0, 4).join(', ')}. Targets ${city.stateQuotaCollege}${city.otherStateMedicalColleges?.length ? ' / ' + city.otherStateMedicalColleges[0] : ''}. Pair with your existing ${city.localCoachingPresence.split(',')[0].trim().replace(/\\(.*\\)/, '').trim()} for PCM.`,
      keywords: [
        `NEET coaching ${city.displayName}`,
        `NEET coaching ${SLUG}`,
        `best NEET coaching ${city.displayName}`,
        `NEET biology coaching ${city.displayName}`,
        `online NEET coaching ${city.displayName}`,
        `NEET preparation ${city.displayName}`,
        `AIIMS coaching ${city.displayName}`,
        `medical entrance coaching ${city.displayName}`,
        `NEET tutor ${city.displayName}`,
        `NEET classes ${city.displayName}`,
        `NEET coaching ${city.state}`,
        ...city.feederSchools.slice(0, 4).map((s) => `NEET coaching for ${s} alumni`),
        ...(city.altNames ?? []).map((n) => `NEET coaching ${n}`),
      ],
      alternates: { canonical: PAGE_URL },
      openGraph: {
        title: `NEET Coaching in ${city.displayName} · Cerebrum Biology Academy`,
        description: `Best biology-specialist NEET coaching for ${city.displayName} aspirants. AIIMS-trained faculty.`,
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
      `Hi — I am in ${city.displayName} (${city.state}) and want a free NEET Biology demo class. Please share details.`
    )

  const faqs = [
    {
      question: `Why pick Cerebrum biology specialist over Allen / Aakash / ${localCoaching} in ${city.displayName}?`,
      answer: `We don't replace them — we add the biology depth they can't deliver. Allen / Aakash / ${localCoaching} ${city.displayName} batches are 150-200 students with generalist faculty; biology gets the same surface treatment as physics + chemistry. Cerebrum is biology-only by design — 10-40 student batches, AIIMS-trained faculty, weekly per-MCQ review, NCERT-line-by-line. Biology is 360/720 NEET marks (half the exam) — adding a specialist for it is the cleanest way to break through a 280-300 score plateau.`,
    },
    {
      question: `What's the typical target college for a ${city.displayName} NEET aspirant?`,
      answer: `Most achievable via ${city.state} state quota: ${city.stateQuotaCollege}. Also realistic: ${(city.otherStateMedicalColleges ?? []).slice(0, 2).join(', ') || 'AIIMS Delhi via all-India quota'}. Recent biology cut-offs ~315-340/360 for general category state-quota. Our programme calibrates biology score targets to your child's specific college aspiration.`,
    },
    {
      question: `How does online NEET coaching work for a ${city.displayName} student?`,
      answer: `Live Zoom classes, IST evening slots (5:30-8 PM weekdays + Sunday tests). ${city.displayName} students join pan-India cohorts. Recordings available if you miss. Weekly chapter tests reviewed in next live class. Material shipped to ${city.majorAreas.slice(0, 3).join(', ')} via tracked courier 4-5 days.`,
    },
    {
      question: `Are there offline centres in ${city.displayName}?`,
      answer: `No — Cerebrum's 4 offline centres are in Delhi NCR (South Extension, Rohini, Gurugram, Faridabad). For ${city.displayName} students the programme is 100% live online with the same faculty and curriculum. Many families pair Cerebrum biology online + local ${localCoaching} for PCM offline, which combines depth + accessibility.`,
    },
    {
      question: `My child attends ${city.feederSchools[0]} / ${city.feederSchools[1] || city.feederSchools[0]}. How does the schedule fit?`,
      answer: `Live online 5:30-8 PM IST Mon/Wed/Fri + Sunday morning test fits after most ${city.displayName} school dismissals. We have current students from ${city.feederSchools.slice(0, 3).join(', ')}.`,
    },
    {
      question: `What's the medium of instruction?`,
      answer: `English (NCERT NEET medium). For students from ${city.state} state-board / regional-medium schools, our first 4 weeks include a NCERT terminology bridge — most students adapt within a month.`,
    },
    {
      question: `What does it cost?`,
      answer: `Pursuit ~Rs 48,000/year (30-40 student batch); Ascent ~Rs 76,000/year (16-25 with weekly 1:1 doubt slot); Pinnacle ZA ~Rs 98,000/year (10-12 with direct Dr. Shekhar 1:1 mentor). EMI + sibling discounts available.`,
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={[
          `NEET Coaching ${city.displayName}`,
          `NEET Biology ${city.displayName}`,
          `NEET Biology ${city.state}`,
        ]}
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">NEET Coaching {city.displayName}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Coaching in {city.displayName}
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Live online NEET Biology coaching for {city.displayName} ({city.state})
            students — AIIMS-trained faculty, small batches (10-40), NCERT-line-by-line
            curriculum, weekly tests with per-MCQ review. Serving{' '}
            {city.majorAreas.slice(0, 4).join(', ')}. Designed to pair with your
            existing {localCoaching} for the physics-chemistry side. Target:{' '}
            <strong>{city.stateQuotaCollege}</strong>
            {city.otherStateMedicalColleges?.length ? (
              <> or {city.otherStateMedicalColleges[0]}</>
            ) : null}.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            NEET coaching in {city.displayName} — local landscape
          </h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            {city.cityContext}
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-indigo-700">Feeder schools in {city.displayName}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                {city.feederSchools.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-indigo-700">Neighborhoods covered</p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                {city.majorAreas.map((a) => (
                  <li key={a}>• {a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-7">
            NEET Coaching {city.displayName} — FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-5 border border-slate-200">
                <summary className="text-base font-semibold text-slate-900 cursor-pointer">{f.question}</summary>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book a free demo from {city.displayName}
          </h2>
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
