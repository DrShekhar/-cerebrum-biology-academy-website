import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { HowToSchema } from '@/components/seo/StructuredData'
import { eeMeta } from '@/data/ib-biology/ee-topics'
import { ArrowRight, BookOpen, MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-extended-essay'

export const metadata: Metadata = {
  title: 'IB Biology Extended Essay Guide | 4,000-Word Research Paper | Cerebrum',
  description:
    'Complete IB Biology Extended Essay guide — 4,000-word limit, A-E grading, up to 3 Diploma bonus points with TOK. Topic choice, research question, timeline, assessment criteria.',
  keywords: [
    'IB Biology Extended Essay',
    'IB Biology EE',
    'IB Biology EE topics',
    'IB Biology EE structure',
    'IB Biology EE word count',
    'IB Biology EE grading',
    'how to write IB Biology EE',
    'IB Biology EE research question',
    'IB Biology EE timeline',
    'Biology Extended Essay guide',
  ],
  openGraph: {
    title: 'IB Biology Extended Essay Guide — 4,000-Word Research Paper',
    description:
      'Topic choice, research question framing, criteria A-E. Everything you need for a grade-A Biology EE.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology Extended Essay — Complete Guide',
    description: 'Research question, assessment criteria, timeline, bonus points.',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const eeFAQs = [
  {
    question: 'What is the IB Biology Extended Essay?',
    answer:
      'The Extended Essay (EE) is an independent 4,000-word research paper and a required Diploma component. A Biology EE is a student-led investigation into a specific biological question, supervised by a teacher. It is graded A-E and, combined with TOK, contributes up to 3 bonus points toward the IB Diploma.',
  },
  {
    question: 'How is the Biology EE different from the IA?',
    answer:
      'Two key differences. The IA is 3,000 words and contributes 20% to the Biology subject grade; the EE is 4,000 words and contributes 0% to the Biology grade but up to 3 points to the Diploma. The IA rubric is 4 criteria × 6 marks; the EE rubric is 5 criteria assessed against a single A-E letter grade. See our IA vs EE disambiguation page for a side-by-side table.',
  },
  {
    question: 'Can I use the same topic for my IA and EE?',
    answer:
      'Not the same research question. You can work within the same topic area — for example both investigating enzyme kinetics — but the specific research questions, experimental designs, and analyses must be distinct. Examiners treat near-duplicate IA/EE submissions as a malpractice concern.',
  },
  {
    question: 'How long does a Biology EE take to complete?',
    answer:
      'Plan for 8–12 months, typically starting in late Year 1 (DP1) and submitting by December of Year 2 (DP2). IB suggests 40 hours of student work including research, experimentation, writing, and supervisor meetings. Starting earlier gives buffer for failed experiments.',
  },
  {
    question: 'What grade do Cerebrum students typically get on Biology EE?',
    answer:
      'Across 100+ supervised Biology EEs, our students averaged grade B, with ~35% achieving grade A. The most common reason for B vs A: insufficient depth of biological engagement in the discussion section — often fixable in the final revision round.',
  },
  {
    question: 'Do Biology EEs have to be experimental?',
    answer:
      'No. Biology EEs can be experimental (wet-lab investigation), observational (field study), or database/secondary-data driven. Since 2023 guidance, database-driven EEs are fully accepted as long as the student processes raw data and generates biological conclusions.',
  },
]

const howToSteps = [
  {
    name: 'Choose a feasible subject area',
    text: 'Pick a biology topic you can access with your school equipment or existing datasets. Avoid topics requiring organisms or equipment you cannot legally or practically obtain.',
  },
  {
    name: 'Narrow to a focused research question',
    text: 'The RQ must be specific, arguable, and testable within 4,000 words. Prefer "How does [IV] affect [DV] in [organism/system]?" over thematic or descriptive questions.',
  },
  {
    name: 'Plan with your EE supervisor',
    text: 'Schedule at least 3 supervisor meetings (initial, draft, pre-submission). Your supervisor can approve your RQ and give structural feedback but cannot rewrite your work.',
  },
  {
    name: 'Collect data rigorously',
    text: 'Whether wet-lab, field, or database, maintain a reflective research journal (part of the assessment). Document every methodological decision.',
  },
  {
    name: 'Write against the 5 criteria',
    text: 'Criterion A: Focus and Method. B: Knowledge and Understanding. C: Critical Thinking. D: Presentation. E: Engagement (from your reflections).',
  },
  {
    name: 'Refine ruthlessly to 4,000 words',
    text: 'Move background, safety protocol, and raw data to appendices. The main body is argument + evidence + analysis — nothing else.',
  },
]

function HowToEESchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Write an IB Biology Extended Essay',
    description:
      'Step-by-step process for writing a grade-A IB Biology Extended Essay under the current assessment criteria.',
    totalTime: 'P240D',
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

export default function IABiologyEEPage() {
  return (
    <>
      <HowToEESchema />
      <FAQSchema questions={eeFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Extended Essay', isCurrentPage: true },
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
                  Extended Essay
                </li>
              </ol>
            </nav>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
              <BookOpen className="h-4 w-4" />
              4,000-word research paper · A–E grade · Up to 3 Diploma bonus points
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology Extended Essay — Complete Guide
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              The EE is a research paper disguised as homework — and one of the few Diploma
              components where a Biology student can demonstrate genuine scientific voice. This
              guide covers topic choice, the 5 criteria, timeline, and what examiners reward.
            </p>
          </div>
        </section>

        {/* Meta stats */}
        <section className="border-b border-gray-200 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                  Word limit
                </div>
                <div className="text-3xl font-bold text-gray-900">{eeMeta.wordLimit}</div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                  Grade scale
                </div>
                <div className="text-3xl font-bold text-gray-900">{eeMeta.gradeScale}</div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                  Diploma bonus
                </div>
                <div className="text-3xl font-bold text-gray-900">+3 max</div>
                <div className="mt-1 text-sm text-gray-600">Combined with TOK</div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                  Timeline
                </div>
                <div className="text-xl font-bold text-gray-900">{eeMeta.typicalTimeline}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 steps */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              The 6-Step EE Process
            </h2>
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

        {/* Assessment criteria */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              The 5 EE Assessment Criteria
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Criterion</th>
                    <th className="px-4 py-3 font-semibold">Marks</th>
                    <th className="px-4 py-3 font-semibold">What examiners reward</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">A — Focus and Method</td>
                    <td className="px-4 py-3">6</td>
                    <td className="px-4 py-3 text-gray-700">
                      Clear RQ, justified methodology, appropriate scope for 4,000 words.
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">B — Knowledge and Understanding</td>
                    <td className="px-4 py-3">6</td>
                    <td className="px-4 py-3 text-gray-700">
                      Subject-specific terminology used correctly, sources placed in context of
                      wider biology.
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">C — Critical Thinking</td>
                    <td className="px-4 py-3">12</td>
                    <td className="px-4 py-3 text-gray-700">
                      Argument is well structured, evidence is analysed, counter-evidence
                      acknowledged. The highest-weight criterion.
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">D — Presentation</td>
                    <td className="px-4 py-3">4</td>
                    <td className="px-4 py-3 text-gray-700">
                      Structure, formal academic register, accurate citations, within word limit.
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">E — Engagement</td>
                    <td className="px-4 py-3">6</td>
                    <td className="px-4 py-3 text-gray-700">
                      Assessed from the Reflections on Planning and Progress Form (RPPF) — 500 words
                      of your own voice.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Total: 34 marks → letter grade A (27–34), B (21–26), C (14–20), D (7–13), E (0–6).
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              EE — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {eeFAQs.map((faq) => (
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
                href="/ib-biology-ee-topics"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                EE Topic Ideas
              </Link>
              <Link
                href="/ib-biology-ee-examples"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                EE Exemplars
              </Link>
              <Link
                href="/ib-extended-essay-vs-ia"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                EE vs IA
              </Link>
              <Link
                href="/ib-biology-ia-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IA Guide
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Get Your Biology EE Supervised</h2>
            <p className="mb-8 text-lg text-green-100">
              Cerebrum's EE Coaching includes topic validation, 3 structured feedback rounds, and
              RPPF guidance — the 3 areas where most Biology EEs slip from A to B.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want IB Biology Extended Essay coaching.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book EE Coaching
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
