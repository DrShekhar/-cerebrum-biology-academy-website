import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ArrowRight, Timer, MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-paper-1-guide'

export const metadata: Metadata = {
  title: 'IB Biology Paper 1 Guide 2025 | MCQ + Data Strategy | Cerebrum',
  description:
    'IB Biology Paper 1 (2025 syllabus) strategy — Paper 1A multiple choice + Paper 1B data-based short response. Timing, data-booklet use, mark allocation, common traps.',
  keywords: [
    'IB Biology Paper 1',
    'IB Biology Paper 1A',
    'IB Biology Paper 1B',
    'IB Biology MCQ strategy',
    'IB Biology Paper 1 timing',
    'IB Biology Paper 1 2025',
    'IB Biology multiple choice',
    'IB Biology data booklet',
    'IB Biology HL Paper 1',
    'IB Biology SL Paper 1',
  ],
  openGraph: {
    title: 'IB Biology Paper 1 Guide 2025 — MCQ + Data Strategy',
    description: 'Paper 1A + 1B strategy for the 2025 syllabus — timing, traps, mark allocation.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology Paper 1 Guide 2025',
    description: '2025 Paper 1A + 1B strategy — timing, traps, mark allocation.',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const paper1FAQs = [
  {
    question: 'What is the structure of IB Biology Paper 1 in 2025?',
    answer:
      'Paper 1 has two sections — Paper 1A and Paper 1B — sat back to back. Paper 1A is multiple choice: 30 questions for SL and 40 for HL, 45 minutes and 1 hour respectively. Paper 1B is data-based short response: usually 3 data-driven questions worth ~25 marks, 45 minutes for SL and 1 hour for HL. Both sections are based on Themes A–D with no options.',
  },
  {
    question: 'Is IB Biology Paper 1A negatively marked?',
    answer:
      'No. Paper 1A multiple choice questions carry 1 mark each and no mark is deducted for wrong answers. Answer every question — even blind guessing has a 25% chance of scoring.',
  },
  {
    question: 'Can I use the data booklet in Paper 1?',
    answer:
      'Yes, the IB Biology data booklet is provided for both Paper 1A and Paper 1B. It contains statistical formulas, reference values, amino acid properties, and key constants. Learn what is in it before the exam so you do not waste time searching during the paper.',
  },
  {
    question: 'How much time should I spend per MCQ in Paper 1A?',
    answer:
      'For SL: 90 seconds per question (45 min / 30 Q). For HL: 90 seconds per question (60 min / 40 Q). Flag-and-return is more efficient than lingering. In practice, aim for 60 seconds on familiar questions and bank the time for tougher ones.',
  },
  {
    question: 'What is Paper 1B and how does it differ from MCQ?',
    answer:
      'Paper 1B is a data-based section: you are given figures, tables, or charts (often from real research papers) and answer 3–5 short-response sub-questions that require interpretation, calculation, and conclusion. It tests the same content as MCQ but in an applied, data-driven form — closer in style to Paper 2 questions.',
  },
  {
    question: 'What are the most common Paper 1 traps?',
    answer:
      'Four traps repeat across past papers. (1) Double-negative stem ("which is NOT a feature that does not…") — rewrite it in your head. (2) Figure misreading in Paper 1B — always note units on both axes before reading values. (3) "All of the above" decoys — check each option, not just the first two plausible ones. (4) Over-reading — if a question looks simple, it usually is; do not invent complexity.',
  },
]

export default function IABiologyPaper1GuidePage() {
  return (
    <>
      <FAQSchema questions={paper1FAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Past Papers', href: '/ib-biology-past-papers' },
          { label: 'Paper 1 Guide', isCurrentPage: true },
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
                  <Link href="/ib-biology-past-papers" className="hover:text-white">
                    Past Papers
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  Paper 1 Guide
                </li>
              </ol>
            </nav>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
              <Timer className="h-4 w-4" />
              2025 Syllabus — Paper 1A + 1B
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology Paper 1 Guide — MCQ + Data Strategy
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Paper 1 is the highest ROI on your revision time — simple structure, no essay writing,
              and a clear playbook for scoring the top band.
            </p>
          </div>
        </section>

        {/* Structure */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">Paper 1 Structure</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Section</th>
                    <th className="px-4 py-3 font-semibold">SL</th>
                    <th className="px-4 py-3 font-semibold">HL</th>
                    <th className="px-4 py-3 font-semibold">Format</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Paper 1A</td>
                    <td className="px-4 py-3">30 MCQ · 45 min</td>
                    <td className="px-4 py-3">40 MCQ · 1 h</td>
                    <td className="px-4 py-3">4-option MCQ, no negative marking</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Paper 1B</td>
                    <td className="px-4 py-3">3 data Qs · 45 min</td>
                    <td className="px-4 py-3">4 data Qs · 1 h</td>
                    <td className="px-4 py-3">Data analysis + short responses</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Timing & playbook */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">Timing Playbook</h2>
            <ol className="space-y-4">
              {[
                {
                  n: '1',
                  title: 'First pass (Paper 1A) — 60 seconds per question',
                  body: 'Answer every obvious question on sight. Flag anything that needs more than 60 seconds with a physical mark on the paper.',
                },
                {
                  n: '2',
                  title: 'Second pass (Paper 1A) — return to flagged questions',
                  body: 'Tackle flagged questions with the remaining time. Eliminate 2 wrong options, then pick the best of the remaining two.',
                },
                {
                  n: '3',
                  title: 'Paper 1B — 10 minutes per data question',
                  body: 'Read the intro text, then the question parts, then the figure — in that order. Highlight every unit on figures before reading values.',
                },
                {
                  n: '4',
                  title: 'Final check — 3 minutes',
                  body: 'Verify your answer grid matches your chosen options. Misaligned grids are the single biggest avoidable loss on Paper 1A.',
                },
              ].map((s) => (
                <li key={s.n} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{s.title}</h3>
                    <p className="text-gray-700">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              Paper 1 — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {paper1FAQs.map((faq) => (
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

        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/ib-biology-paper-2-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Paper 2 Guide
              </Link>
              <Link
                href="/ib-biology-past-papers"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Past Papers Hub
              </Link>
              <Link
                href="/ib-biology-2025-syllabus"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                2025 Syllabus
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Want a Paper 1 Diagnostic?</h2>
            <p className="mb-8 text-lg text-green-100">
              Cerebrum runs timed Paper 1 mocks with examiner feedback on exactly where you lose
              marks and how to reclaim them.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want an IB Biology Paper 1 mock + feedback.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book Paper 1 Mock
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
