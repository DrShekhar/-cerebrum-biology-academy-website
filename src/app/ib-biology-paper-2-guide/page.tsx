import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ArrowRight, PenTool, MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-paper-2-guide'

export const metadata: Metadata = {
  title: 'IB Biology Paper 2 Guide 2025 | Extended Response Strategy | Cerebrum',
  description:
    'IB Biology Paper 2 (2025 syllabus) strategy — data analysis, short response, and 8-mark extended responses. Command-term decoding, paragraph structure, mark-per-minute targets.',
  keywords: [
    'IB Biology Paper 2',
    'IB Biology Paper 2 2025',
    'IB Biology extended response',
    'IB Biology Paper 2 strategy',
    'IB Biology 8 marker',
    'IB Biology command terms',
    'IB Biology essay technique',
    'IB Biology HL Paper 2',
    'IB Biology SL Paper 2',
    'IB Biology Paper 2 structure',
  ],
  openGraph: {
    title: 'IB Biology Paper 2 Guide 2025 — Extended Response Strategy',
    description:
      '2025 Paper 2 playbook — command terms, mark-per-minute targets, 8-mark response structure.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology Paper 2 Guide 2025',
    description: 'Command-term decoder and 8-mark response structure for 2025 Paper 2.',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const commandTerms = [
  {
    term: 'State',
    expectation: 'Give a specific factual answer. No explanation needed.',
    markTariff: '1 mark',
  },
  {
    term: 'Outline',
    expectation: 'Give a brief summary of key points. Bullet format acceptable.',
    markTariff: '2–3 marks',
  },
  {
    term: 'Describe',
    expectation: 'Give a detailed account — include named structures, sequence, or trend.',
    markTariff: '2–4 marks',
  },
  {
    term: 'Explain',
    expectation: 'Give reasons or causes. Always include "because" logic.',
    markTariff: '3–5 marks',
  },
  {
    term: 'Compare and contrast',
    expectation: 'Give similarities AND differences — ideally side by side, not alternating.',
    markTariff: '3–5 marks',
  },
  {
    term: 'Distinguish',
    expectation: 'Give differences only. Paired points.',
    markTariff: '2–4 marks',
  },
  {
    term: 'Discuss',
    expectation: 'Give a balanced argument — multiple perspectives, evidence for and against.',
    markTariff: '4–8 marks',
  },
  {
    term: 'Evaluate',
    expectation: 'Weigh strengths and weaknesses, give a judgement at the end.',
    markTariff: '4–8 marks',
  },
  {
    term: 'Justify',
    expectation: 'Give reasons that support a conclusion or choice.',
    markTariff: '3–6 marks',
  },
  {
    term: 'Suggest',
    expectation:
      'Propose a plausible explanation — novel contexts where the student has not seen the answer directly.',
    markTariff: '2–4 marks',
  },
]

const paper2FAQs = [
  {
    question: 'What is the structure of IB Biology Paper 2 in 2025?',
    answer:
      'Paper 2 replaces the old Paper 2 + Paper 3 structure. SL: 1 hour 15 minutes, ~45 marks. HL: 2 hours 15 minutes, ~72 marks. The paper combines three sections: data-based short response, several short-answer questions, and extended-response questions of 6–8 marks. Content is drawn from across Themes A–D and AHL (for HL).',
  },
  {
    question: 'How long should I spend on an 8-mark extended response?',
    answer:
      'Aim for 1 minute per mark — 8 minutes for an 8-marker including a 1-minute plan. Time on an 8-marker is the single most frequent area where students overwrite without gaining marks. If you plan for 3 main biological points with 2 development marks each, you will score well.',
  },
  {
    question: 'How do I structure an extended response to maximise marks?',
    answer:
      'Use the "point → mechanism → evidence" scaffold per mark. Start with the biological claim, explain why it is true using IB-level mechanism, and back it with a specific example (a protein, a pathway, a figure from a past paper). Each bullet hits one mark. Do not write prose paragraphs when the mark scheme expects discrete mark-worthy points.',
  },
  {
    question: 'What command terms appear most in Paper 2?',
    answer:
      'The five most common command terms in recent Paper 2 exams: Explain, Outline, Describe, Compare and contrast, and Discuss. "Suggest" appears in novel-context questions and carries the highest command-term risk because students revert to describing rather than proposing.',
  },
  {
    question: 'Do I need to draw diagrams in Paper 2?',
    answer:
      'Only if asked explicitly. A clean, labelled diagram that conveys a process (e.g. glycolysis stages, the cardiac cycle) can replace several sentences and earn marks quickly. Badly drawn diagrams with unclear labels lose marks. Rule of thumb: draw only what you can execute cleanly in 2 minutes.',
  },
  {
    question: 'Is Paper 2 the place to use examples from Option topics I learned earlier?',
    answer:
      'Only if the example still sits within the 2025 syllabus scope. Options have been absorbed into the four themes (human physiology is mostly in Theme C, neurobiology elements in C2). Legacy option-specific examples (e.g. detailed immunology beyond AHL C3.2) are low-yield and can confuse examiners on the 2025 paper.',
  },
]

export default function IABiologyPaper2GuidePage() {
  return (
    <>
      <FAQSchema questions={paper2FAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Past Papers', href: '/ib-biology-past-papers' },
          { label: 'Paper 2 Guide', isCurrentPage: true },
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
                  Paper 2 Guide
                </li>
              </ol>
            </nav>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
              <PenTool className="h-4 w-4" />
              2025 Syllabus — Extended Response
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology Paper 2 Guide — Extended Response Strategy
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Paper 2 rewards structured reasoning more than raw knowledge. This guide covers the
              command-term decoder, the 8-mark response framework, and the timing math for SL and
              HL.
            </p>
          </div>
        </section>

        {/* Command terms */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              Command Term Decoder
            </h2>
            <p className="mb-6 text-gray-700">
              The command term tells you exactly what the mark scheme rewards. Matching it is the
              cheapest way to add marks — most students lose marks by <em>describing</em> when they
              were asked to <em>explain</em>, or by giving a one-sided argument when asked to{' '}
              <em>discuss</em>.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Command term</th>
                    <th className="px-4 py-3 font-semibold">What examiners reward</th>
                    <th className="px-4 py-3 font-semibold">Typical mark tariff</th>
                  </tr>
                </thead>
                <tbody>
                  {commandTerms.map((c) => (
                    <tr key={c.term} className="border-t border-gray-200">
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                        {c.term}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{c.expectation}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">{c.markTariff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 8-mark structure */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              How to Structure an 8-Mark Extended Response
            </h2>
            <p className="mb-8 text-gray-700">
              Eight-mark questions reward discrete mark-worthy points, not eloquent prose. Structure
              each answer as a planned sequence of IB-biology claims with a mechanism and an
              example.
            </p>

            <ol className="space-y-4">
              {[
                {
                  n: '1',
                  title: 'One minute: plan',
                  body: 'Write 3 main biological claims in the margin. Each claim targets 2 marks (1 for claim, 1 for development).',
                },
                {
                  n: '2',
                  title: 'Point → mechanism → evidence',
                  body: 'For each claim: state the point (1 mark), explain the mechanism using IB syllabus language (1 mark), name a specific example or data point (dev mark if not already banked).',
                },
                {
                  n: '3',
                  title: 'Address the command term at the end',
                  body: 'If "discuss" — close with a balanced comparison. If "evaluate" — close with a judgement. If "suggest" — close with a proposal grounded in biology you have given.',
                },
                {
                  n: '4',
                  title: 'Check for range marks',
                  body: 'Many 8-markers include a "quality" mark for breadth — covering multiple themes or scales. Make sure your 3 claims do not sit within a single theme.',
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
              Paper 2 — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {paper2FAQs.map((faq) => (
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
                href="/ib-biology-paper-1-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Paper 1 Guide
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
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Practise Paper 2 Under Exam Conditions
            </h2>
            <p className="mb-8 text-lg text-green-100">
              Cerebrum's Paper 2 bootcamp gives you 3 timed mocks plus criterion-style feedback on
              every 8-marker — the fastest way to convert a 5 into a 7.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want Paper 2 mock + feedback for IB Biology.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book Paper 2 Bootcamp
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
