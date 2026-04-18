import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { HowToSchema } from '@/components/seo/StructuredData'
import { iaCriteria, iaMeta } from '@/data/ib-biology/ia-rubric'
import { ArrowRight, Target, FileText, BookOpen, AlertTriangle, MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-ia-guide'

export const metadata: Metadata = {
  title: 'IB Biology IA Guide 2025 | Internal Assessment Step-by-Step | Cerebrum',
  description:
    'Complete IB Biology Internal Assessment guide for the 2025 syllabus. 4 criteria × 6 marks, 20% of grade, 3,000-word limit. Topic choice, design, analysis, conclusion & evaluation — what examiners reward.',
  keywords: [
    'IB Biology IA guide',
    'IB Biology Internal Assessment 2025',
    'IB Biology IA criteria',
    'IB Biology IA rubric',
    'IB Biology IA structure',
    'IB Biology IA word count',
    'IB Biology IA deadline',
    'how to write IB Biology IA',
    'IB Biology 2025 IA',
    'IB Biology IA examples',
  ],
  openGraph: {
    title: 'IB Biology IA Guide 2025 | Internal Assessment Step-by-Step',
    description:
      'Complete 2025-syllabus IA guide — 4 criteria, 24 marks, 20% of grade. What examiners reward, how to avoid losing marks.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology IA Guide 2025 — What Examiners Reward',
    description:
      '2025 IB Biology IA criteria, timeline, word count, common pitfalls, and grade-7 habits.',
  },
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const guideFAQs = [
  {
    question: 'What is the IB Biology Internal Assessment (IA)?',
    answer:
      'The IB Biology IA is a student-led scientific investigation submitted as a written report. It is assessed against four criteria (Research Design, Data Analysis, Conclusion, Evaluation), each worth 6 marks, for a total of 24 marks. The IA contributes 20% of the final IB Biology grade at both Higher Level and Standard Level.',
  },
  {
    question: 'How long is the IB Biology IA?',
    answer:
      'The IB Biology IA has a maximum word count of 3,000 words. Tables, graphs, equations, citations, and appendices are excluded from the word count. There is no fixed page limit, but examiners will not read beyond the 3,000-word cap.',
  },
  {
    question: 'When is the IB Biology IA submission deadline?',
    answer:
      'For the May exam session, the IB upload deadline is typically April 20 of the exam year. For the November session, it is typically mid-October. Schools impose earlier internal deadlines — usually February to March for May candidates, and mid-September for November candidates.',
  },
  {
    question: 'What changed in the 2025 IB Biology IA rubric?',
    answer:
      'The 2025 rubric removed the standalone Communication criterion and consolidated to 4 criteria (Research Design, Data Analysis, Conclusion, Evaluation) of 6 marks each. Conclusion and Evaluation now jointly account for 12/24 marks (50%), placing a stronger emphasis on scientific reasoning and critical reflection than the pre-2025 rubric.',
  },
  {
    question: 'How many trials and variable levels does a grade-7 IA need?',
    answer:
      'Examiners typically expect a minimum of 5 different levels of the independent variable with at least 5 trials each (the "magic 25" minimum). For categorical data, at least 2 categories with ≥10 replicates each. Fewer data points make it hard to evidence a reliable trend or pass a statistical test.',
  },
  {
    question: 'Can I use a database or simulation instead of a wet-lab experiment?',
    answer:
      'Yes. The 2025 IA explicitly accepts database-driven investigations (e.g. NCBI GenBank, HHMI BioInteractive, PhET simulations, WHO Global Health Observatory) provided the student generates processed data and draws biological conclusions. Hybrid investigations that combine database and primary data are also acceptable.',
  },
  {
    question: 'Which statistical test should I use in my IA?',
    answer:
      'Match the test to your data. For comparing two means use a t-test. For three or more means, use one-way ANOVA with a post-hoc test. For continuous correlations, use Pearson or Spearman. For categorical counts (e.g. Mendelian ratios), use a chi-squared goodness-of-fit test. Always justify your choice and check the test assumptions (normality, equal variances).',
  },
  {
    question: 'How is the IB Biology IA graded?',
    answer:
      'Your teacher marks the IA using the four IB criteria and submits it to IB for external moderation. Moderators may adjust your school marks up or down to align with the global standard. The four criteria contribute equally: Research Design (6), Data Analysis (6), Conclusion (6), Evaluation (6) = 24 marks total.',
  },
]

const howToSteps = [
  {
    name: 'Choose a focused research question',
    text: 'Pick a specific independent variable with at least 5 quantitative levels, an organism or system you can actually access, and a measurable dependent variable. Prefer a narrow RQ with clear biology over a broad "effect of pollution" topic.',
  },
  {
    name: 'Build the biological rationale',
    text: 'State the underlying biology (e.g. enzyme kinetics, water potential, allele frequency) and predict the expected trend with reasoning. This feeds into Research Design and Conclusion marks.',
  },
  {
    name: 'Design the method for reproducibility',
    text: 'Specify variable ranges, replicates (≥5), controlled variables with tolerances, and chosen statistical test. Justify why this design answers the RQ better than alternatives.',
  },
  {
    name: 'Collect raw data with uncertainties',
    text: 'Record every measurement with units, uncertainties, and repeats. Tables should include mean, SD, and a worked calculation example.',
  },
  {
    name: 'Process data and run the right statistical test',
    text: 'Compute processed variables (rate, percentage, ratio), justify the statistical test, check its assumptions, and report p-values, effect sizes, and confidence intervals.',
  },
  {
    name: 'Write a quantitative conclusion grounded in biology',
    text: 'Answer the RQ with a quantitative statement. Connect to established biology (mechanism, literature values, expected trends). Do not over-claim causation.',
  },
  {
    name: 'Evaluate weaknesses and propose specific improvements',
    text: 'Rank weaknesses by their impact on your conclusion. Distinguish random vs systematic errors. Suggest specific, realistic improvements (not "get a better microscope").',
  },
]

function HowToIASchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Write an IB Biology Internal Assessment (2025)',
    description:
      'Step-by-step process for writing a grade-7 IB Biology Internal Assessment against the 2025 rubric.',
    totalTime: 'P30D',
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

const subPages = [
  {
    title: 'IA Topic Ideas (50+ by Theme)',
    href: '/ib-biology-ia-topics',
    description:
      'Curated IA research-question templates grouped by the four 2025 themes. Each with variables, controls, difficulty, and suggested statistical test.',
    icon: BookOpen,
  },
  {
    title: 'IA Rubric 2025 — Criterion Deep-Dive',
    href: '/ib-biology-ia-rubric-2025',
    description:
      'Every criterion decoded: what examiners reward, common pitfalls, and descriptor bands from 1–6 marks.',
    icon: Target,
  },
  {
    title: 'IA Exemplars & Examiner Comments',
    href: '/ib-biology-ia-examples',
    description:
      'Anonymised IA exemplars at 3/6, 5/6, and 6/6 across each criterion with examiner-style annotations.',
    icon: FileText,
  },
  {
    title: 'IA Troubleshooting — When Things Go Wrong',
    href: '/ib-biology-ia-troubleshooting',
    description:
      "Survival guide for broken IAs — data doesn't match prediction, not enough trials, weak statistics. Fix it without starting over.",
    icon: AlertTriangle,
  },
]

export default function IABiologyIAGuidePage() {
  return (
    <>
      <HowToIASchema />
      <FAQSchema questions={guideFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'IA Guide', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
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
                  IA Guide
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
              <Target className="h-4 w-4" />
              2025 Syllabus · First Assessment May 2025
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              IB Biology IA Guide (2025)
              <span className="mt-2 block text-green-400">
                4 Criteria · 24 Marks · 20% of Final Grade
              </span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg text-gray-300 sm:text-xl">
              The Internal Assessment is the single biggest mark opportunity you fully control. This
              guide covers what actually scores under the 2025 rubric — from research-question
              choice to the evaluation paragraph that separates a 5 from a 7.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/ib-biology-ia-topics"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-600"
              >
                Browse 50+ IA Topics
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/ib-biology-ia-rubric-2025"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
              >
                See the 2025 Rubric
              </Link>
            </div>
          </div>
        </section>

        {/* At-a-glance facts */}
        <section className="border-b border-gray-200 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                  Total marks
                </div>
                <div className="text-3xl font-bold text-gray-900">{iaMeta.totalMarks}</div>
                <div className="mt-1 text-sm text-gray-600">
                  Across {iaCriteria.length} criteria
                </div>
              </div>
              <div>
                <div className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                  Weight of final grade
                </div>
                <div className="text-3xl font-bold text-gray-900">{iaMeta.weightOfFinalGrade}</div>
                <div className="mt-1 text-sm text-gray-600">{iaMeta.levelsAssessed}</div>
              </div>
              <div>
                <div className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                  Word-count cap
                </div>
                <div className="text-3xl font-bold text-gray-900">3,000</div>
                <div className="mt-1 text-sm text-gray-600">Tables, graphs, citations excluded</div>
              </div>
              <div>
                <div className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                  First assessment
                </div>
                <div className="text-3xl font-bold text-gray-900">{iaMeta.firstAssessment}</div>
                <div className="mt-1 text-sm text-gray-600">New 2025 syllabus</div>
              </div>
            </div>
          </div>
        </section>

        {/* Criteria overview */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              The 4 Criteria (6 Marks Each)
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {iaCriteria.map((c) => (
                <div
                  key={c.key}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="mb-4 flex items-baseline justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {c.marks} marks
                    </span>
                  </div>
                  <p className="mb-4 text-gray-700">{c.headlineDescription}</p>
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                      What examiners reward
                    </h4>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      {c.whatExaminersReward.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-green-600">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/ib-biology-ia-rubric-2025#${c.key}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800"
                  >
                    Full criterion deep-dive
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7-step process */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              The 7-Step IA Process
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              Start early (Year 1 of IB). Every step below maps to a chunk of the rubric — skipping
              any step leaves marks on the table.
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

        {/* Sub-pages */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">Go Deeper</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {subPages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-green-300 hover:shadow-md sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-green-700">
                    {p.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{p.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-700">
                    Open
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              IB Biology IA — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {guideFAQs.map((faq) => (
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

        {/* CTA */}
        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 sm:py-20 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Need Examiner-Level IA Feedback?
            </h2>
            <p className="mb-8 text-lg text-green-100">
              Cerebrum's IA Coaching Package pairs you with an IB Biology tutor for topic selection,
              method review, data analysis, and examiner-style feedback on your draft.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want IA coaching for IB Biology. Please share details.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book IA Coaching
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
