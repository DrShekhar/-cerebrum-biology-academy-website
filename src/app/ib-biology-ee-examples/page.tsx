import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { MessageCircle, Award, Target } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-ee-examples'

export const metadata: Metadata = {
  title: 'IB Biology EE Examples | Grade A Exemplars Annotated | Cerebrum',
  description:
    'Five anonymised IB Biology Extended Essay exemplars annotated against the 5 EE criteria. See what a grade A looks like vs grade C — and what fix moves a B to an A.',
  keywords: [
    'IB Biology EE examples',
    'IB Biology EE exemplars',
    'IB Biology EE grade A',
    'Biology EE sample',
    'IB Biology EE annotated',
    'IB Biology EE 34/34',
    'best IB Biology EE',
  ],
  openGraph: {
    title: 'IB Biology EE Examples — Grade A Exemplars',
    description: '5 annotated EE case studies showing what scores A vs B vs C.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

interface Exemplar {
  title: string
  grade: 'A' | 'B' | 'C'
  rq: string
  strengths: string[]
  weaknesses: string[]
}

const exemplars: Exemplar[] = [
  {
    title: 'Effect of light wavelength on Chlorella O₂ production',
    grade: 'A',
    rq: 'How does the wavelength of LED illumination affect the O₂ evolution rate of Chlorella vulgaris suspensions at a fixed optical density and irradiance?',
    strengths: [
      'Criterion A: RQ is specific, measurable, and testable in 4,000 words.',
      'Criterion B: Accurate distinction between absorption spectrum and action spectrum, correctly cited.',
      'Criterion C: 12/12 — each data point interpreted, anomalies discussed against the absorption-spectrum prediction.',
      'Criterion E: RPPF captured a genuine pivot (from algal density to wavelength) with reasoning.',
    ],
    weaknesses: [
      'Presentation criterion would have scored 4/4 with a more consistent figure-caption format.',
    ],
  },
  {
    title: 'Allelopathy of Lantana camara on native seedlings',
    grade: 'A',
    rq: 'To what extent do aqueous extracts of Lantana camara leaves inhibit germination and early growth of two native grassland species in Delhi NCR?',
    strengths: [
      'Control for osmotic potential (parallel run with PEG 6000) handled Criterion A mark brilliantly.',
      'Strong link in discussion to invasion biology and native-species conservation (C and B marks).',
      'RPPF showed genuine engagement with failed pilot runs.',
    ],
    weaknesses: ['Referencing was inconsistent — lost 1 mark on Presentation.'],
  },
  {
    title: 'Mean March temperature vs tree flowering date in Delhi NCR',
    grade: 'B',
    rq: 'To what extent does mean March temperature (2000–2024) correlate with the first-flowering date of Delonix regia, Jacaranda mimosifolia, and Cassia fistula in Delhi NCR, using citizen-science and herbarium records?',
    strengths: [
      'Data source documentation was rigorous — methodology transparent.',
      'Strong Criterion D (Presentation) — clear figures with standardised captions.',
    ],
    weaknesses: [
      'Critical Thinking (C) capped at 8/12: too much description of data, not enough mechanism-level discussion (phenological cueing, thermal units).',
      'Could have salvaged an A with one additional paragraph linking results to expected ecological consequences.',
    ],
  },
  {
    title: 'Hardy-Weinberg deviation in PTC tasting across three cities',
    grade: 'B',
    rq: 'Do observed PTC-tasting allele frequencies in samples of 60 consenting Indian expatriate students in London, Dubai, and Singapore deviate significantly from Hardy-Weinberg equilibrium?',
    strengths: [
      'Ethics framing was excellent — consent, anonymisation, and parent/teacher oversight documented.',
      'Chi-squared analysis correctly applied and interpreted.',
    ],
    weaknesses: [
      'RPPF (Criterion E) was mechanical — reads like a log rather than reflection. Capped E at 3/6.',
      'Sampling was not random within each city cohort, and the student did not interrogate this enough in the discussion (Criterion C).',
    ],
  },
  {
    title: 'Caffeine dose vs Daphnia heart rate',
    grade: 'C',
    rq: 'To what extent does caffeine concentration affect the heart rate of Daphnia magna?',
    strengths: ['Data collection was adequate; statistics were simple but correct.'],
    weaknesses: [
      'RQ is too broad — essentially identical to a standard IA. EE needs more scope.',
      'Criterion B: discussion stayed at textbook level — no engagement with relevant research beyond three references.',
      'Criterion C: only descriptive interpretation of the trend; no critical evaluation.',
    ],
  },
]

const eeExamplesFAQs = [
  {
    question: 'Can I see a full Biology EE example?',
    answer:
      'Full exemplars are distributed only through schools and IB subscription services (Clastify, some subject platforms). We do not republish student work without consent. The annotations on this page show the pattern of reasoning that separates an A from a B, which is more transferable than reading a single essay end-to-end.',
  },
  {
    question: 'What mark is grade A in Biology EE?',
    answer:
      'Grade A = 27–34 out of 34. Grade B = 21–26. Grade C = 14–20. Grade D = 7–13. Grade E = 0–6 (failing condition for the Diploma when combined with a TOK grade E).',
  },
  {
    question: 'Do examiners read the RPPF reflection?',
    answer:
      'Yes, and it is explicitly assessed as Criterion E (Engagement) — 6 marks out of 34. It is the single most underrated part of the EE; students often write it mechanically the night before submission and lose 3 easy marks.',
  },
]

export default function EEExamplesPage() {
  return (
    <>
      <FAQSchema questions={eeExamplesFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Extended Essay', href: '/ib-biology-extended-essay' },
          { label: 'EE Exemplars', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ib-biology" className="hover:text-white">
                    IB Biology
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ib-biology-extended-essay" className="hover:text-white">
                    Extended Essay
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  Exemplars
                </li>
              </ol>
            </nav>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology EE Examples — Annotated Exemplars
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Five anonymised case studies from Cerebrum-supervised Biology EEs — 2 grade A, 2 grade
              B, 1 grade C — annotated with what scored and what slipped.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="space-y-8">
              {exemplars.map((ex) => (
                <article
                  key={ex.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{ex.title}</h2>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${ex.grade === 'A' ? 'bg-green-100 text-green-800' : ex.grade === 'B' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}
                    >
                      Grade {ex.grade}
                    </span>
                  </div>
                  <p className="mb-6 rounded-lg bg-gray-50 p-4 italic text-gray-700">
                    <strong>RQ: </strong>
                    {ex.rq}
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-green-800">
                        <Award className="h-4 w-4" /> What scored
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {ex.strengths.map((s) => (
                          <li key={s} className="flex gap-2">
                            <span className="flex-shrink-0 text-green-600">✓</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-800">
                        <Target className="h-4 w-4" /> Where marks were lost
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {ex.weaknesses.map((w) => (
                          <li key={w} className="flex gap-2">
                            <span className="flex-shrink-0 text-amber-600">!</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              EE Exemplars — FAQ
            </h2>
            <div className="space-y-4">
              {eeExamplesFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-green-600 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </h3>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Get Criterion-Referenced EE Feedback
            </h2>
            <p className="mb-8 text-lg text-green-100">
              We mark your EE draft against all 5 criteria within 72 hours with examiner-style
              annotations — the same format you see above.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want my IB Biology EE draft reviewed.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book EE Review
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
