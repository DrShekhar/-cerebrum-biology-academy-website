import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NEAR_ME_CITY_BY_SLUG } from '@/data/locality-content/near-me-cities'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

const SLUG = 'imphal'
const city = NEAR_ME_CITY_BY_SLUG[SLUG]
const PAGE_URL = `https://cerebrumbiologyacademy.com/online-neet-coaching-${SLUG}`

export const metadata: Metadata = city
  ? {
      title: `Online NEET Coaching in ${city.displayName} | Live Biology Classes · Cerebrum`,
      description: `Online NEET Biology coaching for ${city.displayName} (${city.state}) students — live Zoom classes with AIIMS-trained faculty. IST evening slots. Target: ${city.stateQuotaCollege}${city.otherStateMedicalColleges?.length ? ' / ' + city.otherStateMedicalColleges[0] : ''}. Small batches, NCERT-line-by-line, English medium. Study material shipped to ${city.majorAreas.slice(0, 3).join(', ')}.`,
      keywords: [
        `online NEET coaching ${city.displayName}`,
        `online NEET classes ${city.displayName}`,
        `live NEET coaching ${city.displayName}`,
        `online NEET biology ${city.displayName}`,
        `best online NEET coaching ${city.displayName}`,
        `NEET online classes ${city.displayName}`,
        `online biology coaching ${city.displayName}`,
        `NEET coaching online ${city.state}`,
        ...city.feederSchools.slice(0, 5).map((s) => `online NEET coaching for ${s} students`),
        ...(city.altNames ?? []).map((n) => `online NEET coaching ${n}`),
      ],
      alternates: { canonical: PAGE_URL },
      openGraph: {
        title: `Online NEET Coaching in ${city.displayName} · Cerebrum`,
        description: `Live online NEET Biology for ${city.displayName} aspirants. AIIMS faculty, small batches.`,
        url: PAGE_URL,
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image' as const,
        title: `NEET Coaching in ${city.displayName} · Cerebrum Biology Academy`,
        description: `Best NEET Biology coaching for ${city.displayName} students at Cerebrum.`,
      },
      // noindex 2026-06 (doorway consolidation Tier C): this intent page shares
      // ~96% of its rendered copy with its city siblings — Google's scaled-content
      // policy territory. Page stays fully live for visitors and internal links
      // (follow); the city's near-me page + city hub carry the indexable signal.
      // Reversible: restore 'index, follow' when the page gets >=40% unique copy.
      robots: 'noindex, follow',
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
      `Hi — I am in ${city.displayName} (${city.state}) and interested in online NEET Biology coaching. Please share live class timings and details.`
    )

  const faqs = [
    {
      question: `How does online NEET coaching work for ${city.displayName} students?`,
      answer: `Live Zoom classes IST evening slots (5:30-8 PM weekdays, 9-11 AM Sunday). AIIMS-trained biology-specialist faculty. ${city.displayName} students join pan-India cohorts of 10-40 students depending on tier. Recordings available if you miss. Weekly chapter tests with per-MCQ review. Material shipped to ${city.majorAreas.slice(0, 3).join(', ')}.`,
    },
    {
      question: `What does online NEET Biology coaching cost in ${city.displayName}?`,
      answer: `Pursuit ~Rs 48,000/yr (20-25 students); Ascent ~Rs 76,000/yr (12-16); Pinnacle ZA ~Rs 98,000/yr (6-10 with weekly 1:1 Dr. Shekhar mentor). Same pricing pan-India. EMI options + sibling discounts available. WhatsApp for current tier matrix.`,
    },
    {
      question: `Is Cerebrum biology specialist better than Allen / Aakash ${city.displayName}?`,
      answer: `Different model. Allen / Aakash / ${localCoaching}: full-package PCM coaching, 150-200 student batches. Cerebrum: biology-only specialist with 10-40 student batches, AIIMS faculty, per-MCQ weekly review. We don't compete with their PCM teaching — most students keep their existing coaching for physics-chemistry and add Cerebrum for the biology layer (360/720 marks, half the exam).`,
    },
    {
      question: `What's the target medical college for a ${city.displayName} aspirant?`,
      answer: `Most achievable via ${city.state} state quota: ${city.stateQuotaCollege}. Also realistic: ${(city.otherStateMedicalColleges ?? []).slice(0, 2).join(', ') || 'AIIMS Delhi via all-India quota'}. Our biology programme targets 340+/360 to give families options.`,
    },
    {
      question: `Will live online work from ${city.majorAreas[0]} / ${city.majorAreas[1] || city.displayName}?`,
      answer: `Yes — Zoom over any reliable JIO / Airtel / Vi 4G/5G connection. Many current students from ${city.majorAreas.slice(0, 3).join(', ')}. Recordings backup any connectivity hiccup. WhatsApp doubt support 24x7.`,
    },
    {
      question: `My child is at ${city.feederSchools[0]} / ${city.feederSchools[1] || city.feederSchools[0]} — schedule fit?`,
      answer: `Yes — IST evening slot (5:30-8 PM) fits after most ${city.displayName} school dismissals. We have current students from ${city.feederSchools.slice(0, 3).join(', ')}.`,
    },
    {
      question: `Does Cerebrum teach in English medium?`,
      answer: `Yes — all classes, material, and tests in English (NEET medium of instruction). If your child is from regional-medium schooling, our first 4 weeks bridge from ${city.state} state-board / regional-medium framing to NCERT English terminology.`,
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={[
          `Online NEET Coaching ${city.displayName}`,
          `NEET Biology ${city.displayName}`,
          `NEET Biology ${city.state}`,
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
            <span className="text-white">Online NEET Coaching {city.displayName}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Online NEET Coaching in {city.displayName}
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            100% live online NEET Biology coaching for {city.displayName} ({city.state}) students.
            Same AIIMS-trained faculty and biology-specialist pedagogy as Delhi NCR offline batches
            — delivered via Zoom in IST evening slots. Designed for aspirants targeting{' '}
            <strong>{city.stateQuotaCollege}</strong>
            {city.otherStateMedicalColleges?.length ? (
              <> or {city.otherStateMedicalColleges[0]}</>
            ) : null}
            . Pair with your existing {localCoaching} for physics-chemistry.
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

      {/* Local landscape section */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            NEET coaching landscape in {city.displayName}
          </h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {city.cityContext}
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-indigo-700">
                Major NEET-feeder schools we serve in {city.displayName}
              </p>
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

      {/* FAQs */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-7">
            FAQs — Online NEET Coaching {city.displayName}
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
            Book a free demo from {city.displayName}
          </h2>
          <p className="text-blue-100 mb-6">
            60-minute live class with Dr. Shekhar. No card required.
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
