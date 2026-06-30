/**
 * /best-ibo-coaching-india
 *
 * IBO head-term cornerstone. Targets: "best IBO coaching", "best IBO
 * coaching india", "IBO coaching india", "IBO preparation india",
 * "International Biology Olympiad coaching".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ChevronRight,
  Home,
  MessageCircle,
  Phone,
  Trophy,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/best-ibo-coaching-india'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Best IBO Coaching in India — International Biology Olympiad Prep · Cerebrum',
  description:
    "India's biology-specialist coaching for IBO (International Biology Olympiad). Full funnel: NSEB → INBO → OCSC → IBO. AIIMS-trained faculty, Campbell-based curriculum, primary research-paper drills, micro-batches with direct Dr. Shekhar mentorship. Free trial class.",
  keywords: [
    'best IBO coaching',
    'best IBO coaching india',
    'IBO coaching india',
    'IBO preparation india',
    'International Biology Olympiad coaching',
    'International Biology Olympiad india',
    'IBO tutor india',
    'IBO online coaching',
    'India IBO team coaching',
    'OCSC biology coaching',
    'NSEB to IBO pathway',
    'INBO Stage 2 coaching',
    'best IBO coach',
    'IBO past papers coaching',
    'IBO syllabus coaching',
    'aiims faculty IBO coaching',
    'dr shekhar singh IBO',
    'IBO India team selection',
    'IBO English medium coaching',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-IN': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Best IBO Coaching in India · Cerebrum Biology Academy',
    description:
      "India's biology specialist for International Biology Olympiad. Full NSEB → INBO → OCSC → IBO funnel.",
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best IBO Coaching in India · Cerebrum Biology Academy',
    description:
      "India's biology specialist for International Biology Olympiad. Full NSEB → INBO → OCSC → IBO funnel. AIIMS faculty.",
  },
  robots: 'index, follow, max-image-preview:large',
}

const STAGES = [
  {
    stage: 'Stage 1 — NSEB (November)',
    description:
      'National Standard Examination in Biology. Class 11-12 students. ~75,000 candidates nationally. Selection cutoff varies by year (~110-130/240 typical). Top ~300 advance to INBO. Coverage: NCERT + Class 11-12 board syllabus + selected Campbell topics.',
  },
  {
    stage: 'Stage 2 — INBO (Late January)',
    description:
      'Indian National Biology Olympiad. ~300 candidates. Two papers — theoretical and experimental. Tests Campbell-level cell biology, biochemistry mechanism, primary research interpretation, lab technique conceptualisation. Top ~35 advance to OCSC.',
  },
  {
    stage: 'Stage 3 — OCSC (April-May)',
    description:
      'Orientation cum Selection Camp at HBCSE Mumbai. ~35 students. 3-week intensive residential camp with practicals + theory + selection exams. Top 4 selected for IBO team. The selection methodology heavily weights wet-lab skill + experimental design reasoning.',
  },
  {
    stage: 'Stage 4 — IBO (July)',
    description:
      "International Biology Olympiad. India's 4-member team competes globally. 6 hours of theoretical + 8 hours of practical exam. Gold / Silver / Bronze medals awarded. India typically wins 1-3 medals each year.",
  },
]

const FAQS = [
  {
    question: 'What is IBO and why does it matter?',
    answer:
      'IBO (International Biology Olympiad) is the premier global high-school biology competition, held annually since 1990 across 75+ countries. India sends a 4-member team selected through NSEB → INBO → OCSC. IBO medals are weighted heavily in elite undergraduate admissions globally (Harvard, Stanford, MIT, Cambridge, Oxford, NUS) and qualify Indian students for prestigious scholarships including Inspire Fellowship, KVPY, and DST research grants.',
  },
  {
    question: 'How do I prepare for IBO from India?',
    answer:
      "You can't prepare for IBO directly — you have to qualify through the funnel: NSEB (Class 11-12, November) → INBO (~300 candidates, January) → OCSC (~35 candidates, April-May) → IBO team selection (4 members). At each stage the cognitive demand jumps significantly. Cerebrum runs dedicated tracks for NSEB target prep, INBO Stage 2 written + experimental, OCSC residential-camp simulation (we run a virtual OCSC bootcamp for top candidates), and IBO past-paper drills.",
  },
  {
    question: "What's the difference between IBO prep and NEET prep?",
    answer:
      "Different rule-books entirely. NEET tests NCERT recall + MCQ application at moderate depth. IBO tests Campbell-level mechanism reasoning, primary research paper interpretation (Nature / Science / Cell figures), wet-lab experimental design, biochemistry pathway prediction, evolutionary reasoning, biostatistics. A student who scores 360/360 on NEET biology is NOT automatically prepared for IBO — IBO demands depth that NEET doesn't reach. That said, the inverse is true: a student preparing for IBO typically aces NEET biology as a side-effect.",
  },
  {
    question: 'When should my child start IBO prep?',
    answer:
      'Ideally Class 9 or Class 10 with strong NCERT base + Campbell introduction. Workable: Class 11 in May-June for the November NSEB. Late but possible: Class 12 with intensive prep if the student already has Campbell-level depth. The earlier you start the more conceptual depth you can build — IBO is won on Campbell mastery + primary research reading, both of which take 18-24 months minimum to build deeply.',
  },
  {
    question: 'What books does Cerebrum use for IBO prep?',
    answer:
      "Core: Campbell Biology 11th+ edition (the global IBO reference). Supplementary: Lehninger Principles of Biochemistry (for biochemistry depth), Alberts Molecular Biology of the Cell (for cell biology mechanism), Raven Biology of Plants (for botany depth), Sadava Life: The Science of Biology. Plus selected primary research papers from Nature, Science, Cell, PNAS. We also use HBCSE's released INBO + IBO past papers (2010-2024) with detailed solutions.",
  },
  {
    question:
      'My child is in IB / IGCSE international school in India. Are they eligible for IBO via India?',
    answer:
      "Yes, if they're Indian citizens / domicile and in Class 11-12 equivalent. IB DP1/DP2 students take NSEB alongside IB; many have done well historically because IB Biology HL syllabus already pushes beyond standard school biology toward command-term reasoning. Cerebrum runs a dedicated IB Biology HL + IBO parallel track that handles both syllabi simultaneously without duplicating effort.",
  },
  {
    question: "What's Cerebrum's IBO track record?",
    answer:
      "Multiple INBO Stage 2 qualifiers per cohort since 2018. OCSC selections in 3 of the past 5 years. Dr. Shekhar C Singh personally coaches the OCSC-track Pinnacle ZA tier. We don't publicly publish all student names (some families prefer privacy) but reference checks are available on WhatsApp request — we connect prospective families with past IBO-track student parents who can speak about the prep experience.",
  },
  {
    question: 'How does the OCSC residential camp simulation work?',
    answer:
      "We run a 2-week virtual OCSC bootcamp for INBO-qualified students (or those targeting it). Daily 6-hour live sessions: 3 hours theory (Campbell deep-dive on weak areas identified from INBO Stage 2 attempts), 2 hours experimental design + figure interpretation, 1 hour biostatistics + reasoning drills. We can't replicate the wet-lab fully online but we cover experimental design + reagent reasoning + figure prediction comprehensively.",
  },
  {
    question: 'Pricing for IBO coaching?',
    answer:
      "IBO prep typically runs via our Pinnacle ZA tier (direct Dr. Shekhar) for OCSC-aiming students, or the Competitive tier for NSEB / INBO target students. We don't publish prices because they depend on tier + currency. Send a WhatsApp with your child's class + olympiad target — we share the tier matrix and quote in conversation. Free trial class with Dr. Shekhar comes first.",
  },
]

export default function BestIBOCoachingIndiaPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm interested in IBO coaching for my child. Currently in Class [9/10/11/12], status: [planning NSEB / NSEB qualified / INBO qualified / OCSC target]. Please share IBO programme details."
    )

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Best IBO Coaching in India — Full NSEB → INBO → OCSC → IBO Funnel',
    description:
      "India's biology-specialist coaching for International Biology Olympiad team selection. Campbell-based curriculum, primary research paper drills, micro-batches with direct Dr. Shekhar mentorship.",
    url: PAGE_URL,
    inLanguage: 'en-IN',
    educationalLevel: 'IBO aspirant (Class 9-12)',
    provider: { '@id': `${SITE_URL}/#organization` },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'IBO Coaching',
          'International Biology Olympiad Coaching',
          'IBO India Team Coaching',
          'NSEB Coaching',
          'INBO Coaching',
          'OCSC Biology Camp Preparation',
          'Campbell Biology IBO Prep',
        ]}
        jobTitle="Lead IBO Coach — Direct AIIMS-Trained Mentorship"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        <nav className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-indigo-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/best-biology-olympiad-coaching-india" className="hover:text-indigo-700">
                Biology Olympiad Coaching
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Best IBO Coaching India</li>
          </ol>
        </nav>

        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
            <Trophy className="h-3.5 w-3.5" />
            India IBO team funnel · NSEB → INBO → OCSC → IBO
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900 max-w-4xl">
            Best IBO coaching in India —{' '}
            <span className="text-indigo-700">the full funnel, one programme.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-4xl">
            International Biology Olympiad selection from India happens through a 4-stage funnel —
            NSEB (November), INBO (January), OCSC residential camp at HBCSE Mumbai (April-May), IBO
            team selection (July). Cerebrum coaches every stage of this funnel with the same
            specialist faculty team, led by Dr. Shekhar C Singh (AIIMS New Delhi alumnus).
            Campbell-based curriculum, research-paper drills, INBO-format mocks, and a virtual OCSC
            bootcamp for top candidates.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Dr. Shekhar
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-indigo-600 px-5 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              <Phone className="h-5 w-5" />
              Call +91 88264 44334
            </a>
          </div>
        </section>

        {/* 4-stage funnel */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              The 4-stage India → IBO funnel
            </h2>
            <p className="mt-3 text-slate-600">
              ~75,000 NSEB candidates narrow to 4 IBO team members through these stages:
            </p>
            <ol className="mt-7 space-y-4">
              {STAGES.map((s, idx) => (
                <li key={s.stage} className="rounded-xl bg-white p-6 ring-1 ring-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{s.stage}</h3>
                      <p className="mt-2 text-sm text-slate-700 leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              IBO coaching — common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Trophy className="h-10 w-10 text-amber-300 mx-auto" />
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">Ready to start IBO prep?</h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Free 60-minute trial with Dr. Shekhar. Bring one INBO / IBO past-paper question your
              child has worked on. We assess readiness and give a clear funnel-stage plan.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold hover:bg-emerald-700"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Dr. Shekhar
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <Phone className="h-5 w-5" />
                Call +91 88264 44334
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
