import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { HowToSchema } from '@/components/seo/StructuredData'
import { MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/how-to-score-7-ib-biology'

export const metadata: Metadata = {
  title: 'How to Score 7 in IB Biology 2025 | Proven Strategy | Cerebrum',
  description:
    'How to score 7 in IB Biology (2025 syllabus) — grade boundaries, the 3 habits all 7-scorers share, what to cut from your revision, and how to score full marks on IA and Paper 2.',
  keywords: [
    'how to score 7 in IB Biology',
    'IB Biology 7',
    'IB Biology grade 7',
    'IB Biology 7 strategy',
    'IB Biology HL 7',
    'IB Biology SL 7',
    'top IB Biology score',
    'IB Biology grade boundaries',
    'IB Biology best score',
    'IB Biology score improvement',
  ],
  openGraph: {
    title: 'How to Score 7 in IB Biology — 2025 Playbook',
    description:
      'The 3 habits of 7-scorers, what to cut, and how to stop losing marks on IA and Paper 2.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const score7FAQs = [
  {
    question: 'What percentage do I need to score 7 in IB Biology?',
    answer:
      'Grade 7 in IB Biology typically requires 70–84% of the total marks (IA + external papers combined). Exact boundaries shift each session and between HL and SL, but the rough target is 75%+. Since IA is worth 20%, scoring 22–24/24 on IA already locks in 18–20% of the final mark before you sit exams.',
  },
  {
    question: 'Is scoring 7 in IB Biology hard?',
    answer:
      'About 12% of HL candidates and 15% of SL candidates score a 7 globally (May 2024). It is achievable but requires discipline: strong IA, consistent past paper practice, and active engagement with command terms. The biggest barrier is students cramming content without practising paper-specific exam technique.',
  },
  {
    question: 'Do I need to know every AHL topic perfectly to score 7?',
    answer:
      'No — you need to know the high-yield AHL topics well (chemiosmosis, mutation/gene editing, muscle and motility, chemical signalling, cell specialisation) and accept that some deep corners may come up only as 2–3 marks you can afford to miss. Paper 2 examiners design 8-markers around integration across themes, not memorisation of every detail.',
  },
  {
    question: 'How many past papers should I do before the exam?',
    answer:
      'At least 6 full past papers per level (HL or SL), with the two most recent as timed mocks. More than 10 papers is diminishing returns if you are not analysing your errors carefully — a 3-pass review of 6 papers outperforms 12 papers done once.',
  },
  {
    question: 'Can I still score 7 with a grade 4 at the start of Year 2?',
    answer:
      'Yes, but you need 3 things: a structured study plan (20+ hours/week for 16 weeks), honest examiner-style feedback on written work (Paper 2 and IA), and to fix 1 systematic weakness at a time (content gaps first, then command-term accuracy, then timing). About 30% of our Cerebrum students come in at 4 or 5 and finish at 6 or 7.',
  },
]

const howToSteps = [
  {
    name: 'Master IA first — bank 18-20% of your grade early',
    text: 'A 22-24/24 IA contributes 18-20% of your final mark before you even sit exams. Start in DP1, apply the 2025 rubric, and get criterion-referenced feedback. This is the highest ROI action in IB Biology.',
  },
  {
    name: 'Practise past papers actively, not passively',
    text: 'Do 6+ past papers in a 3-pass system: open book, closed book, timed. After each paper, classify errors (content gap, command term, time management, silly slip) and target the most frequent error class next.',
  },
  {
    name: 'Memorise command terms, not content',
    text: 'Examiners reward students who match their response structure to the command term. 5 minutes of command-term training saves 3–5 marks per paper.',
  },
  {
    name: 'Build one-page theme maps',
    text: 'For each of the 4 themes (A-D), condense every subtopic into one sheet: key processes, key molecules, key data patterns. Re-read the maps weekly in the final 8 weeks.',
  },
  {
    name: 'Schedule 8-mark response drills',
    text: 'Paper 2 makes or breaks a 7. Write 4–6 timed 8-mark responses per week in the final month. Get a tutor or teacher to mark at least 2 per week against the mark scheme.',
  },
  {
    name: 'Sleep, hydrate, and sit exams fresh',
    text: 'In the final week, sleep beats additional revision. Paper 1A requires sustained focus for 45–60 minutes; Paper 2 requires 75–135 minutes. Students under-rate how much fatigue shaves from their score — typically 3–5 marks.',
  },
]

function HowToScore7Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Score 7 in IB Biology',
    description:
      'Six-step strategy to score the highest grade (7) in IB Biology under the 2025 syllabus.',
    totalTime: 'P120D',
    step: howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
    url: PAGE_URL,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function HowToScore7Page() {
  return (
    <>
      <HowToScore7Schema />
      <FAQSchema questions={score7FAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Score 7 Strategy', isCurrentPage: true },
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
                  Score 7 Strategy
                </li>
              </ol>
            </nav>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              How to Score 7 in IB Biology (2025 Syllabus)
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              Only 12% of HL candidates score a 7. The habits that distinguish them are not more
              hours of revision — they are structural: IA discipline, active past-paper practice,
              command-term mastery, and one-page theme maps.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              The 6-Step Score-7 Playbook
            </h2>
            <p className="mb-10 text-lg text-gray-700">
              Every step below maps to a measurable mark-gain. Apply them in order — skipping step 1
              (IA) costs 3–4 final-grade marks that students often try to recover from exam papers
              alone, which almost never works.
            </p>
            <ol className="space-y-4">
              {howToSteps.map((s, i) => (
                <li
                  key={s.name}
                  className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{s.name}</h3>
                    <p className="text-gray-700">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              Score 7 — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {score7FAQs.map((faq) => (
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
                href="/ib-biology-ia-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IA Guide
              </Link>
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
                Past Papers
              </Link>
              <Link
                href="/ib-biology-hl-vs-sl"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                HL vs SL
              </Link>
              <Link
                href="/ib-biology"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IB Biology Hub
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Want a 7? Talk to an IB Examiner.
            </h2>
            <p className="mb-8 text-lg text-green-100">
              Cerebrum's Score-7 Coaching pairs you with an IB Biology examiner for 16 weeks of
              targeted coaching — IA refinement, past-paper marking, 8-mark drills.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want IB Biology coaching to score 7.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book Score-7 Coaching
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
