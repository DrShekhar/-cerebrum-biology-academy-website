import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ArrowRight, FileText, MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-past-papers'

export const metadata: Metadata = {
  title: 'IB Biology Past Papers 2025 Syllabus | Paper 1 & 2 Practice | Cerebrum',
  description:
    'How to use IB Biology past papers for the 2025 syllabus. What to practise, what to ignore (Paper 3 removed), May 2025 specimen papers, and a staged revision plan for HL & SL.',
  keywords: [
    'IB Biology past papers',
    'IB Biology 2025 past papers',
    'IB Biology specimen papers',
    'IB Biology Paper 1',
    'IB Biology Paper 2',
    'IB Biology May 2025',
    'IB Biology HL past papers',
    'IB Biology SL past papers',
    'IB Biology exam practice',
    'IB Biology revision papers',
  ],
  openGraph: {
    title: 'IB Biology Past Papers — 2025 Syllabus Navigation',
    description:
      'Use pre-2025 papers strategically — what still applies, what to skip, what to focus on.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology Past Papers — 2025 Syllabus Edition',
    description: 'How to use old and new papers together in a 2025-ready revision plan.',
  },
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const pastPapersFAQs = [
  {
    question: 'Are pre-2025 IB Biology past papers still useful?',
    answer:
      'Yes, with caveats. Paper 1 multiple choice and Paper 2 short-response questions from 2019–2024 are mostly still on-syllabus for the 2025 themes. Paper 3 (options) is removed and should not be practised. Some legacy questions cover topics re-weighted in 2025 — those are still good for concept practice but ignore the mark allocation.',
  },
  {
    question: 'Where do I get IB Biology past papers legally?',
    answer:
      "IB past papers are available through your school's IB Coordinator (who has access to the Programme Resource Centre) and through subscription services like Revision Village, SaveMyExams, and Clastify. Do not rely on unverified free PDF dumps — they are often incomplete, out-of-date, or mismatched with the mark scheme.",
  },
  {
    question: 'What specimen papers exist for the 2025 syllabus?',
    answer:
      'IB released specimen Paper 1A (multiple choice), Paper 1B (data-based), and Paper 2 (extended response + data analysis) papers along with mark schemes when the 2025 syllabus was confirmed. These are available through schools. They remain the single best indicator of the new question style.',
  },
  {
    question: 'How should I structure my IB Biology past-paper practice?',
    answer:
      'Work through topics as you complete them in class rather than saving all papers for the final term. Use a three-pass system: first pass — open book, no timer (identify gaps); second pass — closed book, no timer (consolidate knowledge); third pass — closed book, exam timing (simulate exam stress). Finish with the two most recent specimen/past papers as full mocks.',
  },
  {
    question: 'Do I need to mark my own papers?',
    answer:
      'For short-answer questions, marking your own paper against an official mark scheme is more useful than any tutor feedback — it builds your understanding of exactly what examiners accept. For extended-response questions, get examiner-level feedback (from your teacher or a tutor) because the mark scheme assumes context you may miss.',
  },
  {
    question: 'Are Paper 1 multiple-choice questions negatively marked?',
    answer:
      'No. IB Biology Paper 1A multiple choice questions are not negatively marked — answer every question, even if you need to guess. A blank answer scores 0; a guessed answer has a 25% chance of scoring 1.',
  },
]

const paperBlocks = [
  {
    title: 'Paper 1 — MCQ + Data',
    href: '/ib-biology-paper-1-guide',
    description:
      'Paper 1A (multiple choice) + Paper 1B (data-based short responses). Strategy, timing, and how to use the data booklet efficiently.',
  },
  {
    title: 'Paper 2 — Extended Response',
    href: '/ib-biology-paper-2-guide',
    description:
      'Data analysis, short response, and extended response. How to structure an 8-mark answer and avoid common mark-losing patterns.',
  },
  {
    title: 'Internal Assessment (IA)',
    href: '/ib-biology-ia-guide',
    description:
      'Worth 20% of your grade and entirely separate from the exam papers. Start this in Year 1 — not Year 2.',
  },
  {
    title: '2025 Syllabus Map',
    href: '/ib-biology-2025-syllabus',
    description:
      'See exactly which subtopics are in scope for 2025 papers. Use this to filter legacy past paper questions.',
  },
]

export default function IABiologyPastPapersPage() {
  return (
    <>
      <FAQSchema questions={pastPapersFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Past Papers', isCurrentPage: true },
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
                <li aria-current="page" className="font-medium text-white">
                  Past Papers
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
              <FileText className="h-4 w-4" />
              2025 Syllabus — Paper 3 Removed
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology Past Papers — Navigating the 2025 Shift
            </h1>

            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Past papers are the single highest-yield revision tool in IB Biology — but only if you
              filter legacy content against the 2025 syllabus. This guide shows you which papers to
              practise, which to skip, and how to structure your revision.
            </p>
          </div>
        </section>

        {/* Guidance: what to use, what to skip */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              What to Practise vs What to Skip
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8">
                <h3 className="mb-4 text-lg font-bold text-green-900">Practise</h3>
                <ul className="space-y-2 text-sm text-green-900">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 text-green-600">✓</span>
                    <span>
                      <strong>Specimen Paper 1A, 1B, and Paper 2 (2024 release)</strong> — the
                      single best indicator of 2025 question style.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 text-green-600">✓</span>
                    <span>
                      <strong>Paper 1 MCQs from 2019–2024</strong> on topics still in the 2025
                      syllabus (cell biology, genetics, enzymes, ecology, evolution).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 text-green-600">✓</span>
                    <span>
                      <strong>Paper 2 short-response and data-based questions</strong> — the
                      assessment style is almost unchanged.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 text-green-600">✓</span>
                    <span>
                      <strong>May 2025 paper + mark scheme</strong> when released — the first live
                      paper against the new rubric.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
                <h3 className="mb-4 text-lg font-bold text-red-900">Skip or filter carefully</h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 text-red-600">✗</span>
                    <span>
                      <strong>All Paper 3 (options) papers</strong> — the options unit has been
                      removed for 2025.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 text-red-600">✗</span>
                    <span>
                      Paper 2 extended-response questions that reference legacy Topic 11 sub-content
                      only now re-examined in AHL.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 text-red-600">✗</span>
                    <span>
                      Questions written before 2014 — the command terms and expectations have
                      drifted significantly.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 text-red-600">✗</span>
                    <span>
                      Paper 1 questions on content explicitly removed from the 2025 guide (check
                      against our syllabus map before using).
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Staged revision plan */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              A 3-Pass Past-Paper Revision Plan
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              The single most common revision mistake: doing every past paper once, under exam
              conditions, in the final month. Here is a better protocol.
            </p>

            <ol className="space-y-4">
              {[
                {
                  n: '1',
                  title: 'Pass 1 — Open book, no timer',
                  body: 'For each topic, work through 1–2 past papers with the textbook, data booklet, and mark scheme beside you. The goal is to identify gaps, not to score. Note every term you cannot define.',
                },
                {
                  n: '2',
                  title: 'Pass 2 — Closed book, no timer',
                  body: 'Redo the same papers with the book closed. Correct against the mark scheme. Highlight every question you still lost marks on — these are your real gaps.',
                },
                {
                  n: '3',
                  title: 'Pass 3 — Closed book, exam timing',
                  body: 'Sit 4–6 full papers under strict exam conditions (1h Paper 1, 2h 15m Paper 2 for HL). Mark yourself, then use Cerebrum examiner-style feedback for extended-response answers.',
                },
              ].map((p) => (
                <li key={p.n} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                    {p.n}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{p.title}</h3>
                    <p className="text-gray-700">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Paper blocks */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              Paper-Specific Guides
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {paperBlocks.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-green-300 hover:shadow-md sm:p-8"
                >
                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-green-700">
                    {p.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{p.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-700">
                    Read guide
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              Past Papers — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {pastPapersFAQs.map((faq) => (
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
              Want Your Past Paper Answers Marked?
            </h2>
            <p className="mb-8 text-lg text-green-100">
              Cerebrum's IB Biology tutors give examiner-style feedback on extended response answers
              in 48 hours — highlighting exactly where marks were won and lost.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want IB Biology past paper marking help.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book Paper Marking
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
