import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { iaCriteria, iaMeta } from '@/data/ib-biology/ia-rubric'
import { ArrowRight, CheckCircle2, XCircle, MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-ia-rubric-2025'

export const metadata: Metadata = {
  title: 'IB Biology IA Rubric 2025 | Criterion-by-Criterion Breakdown | Cerebrum',
  description:
    'The 2025 IB Biology IA rubric decoded — Research Design, Data Analysis, Conclusion, Evaluation (6 marks each). Descriptor bands, what examiners reward, and common mark-losing mistakes.',
  keywords: [
    'IB Biology IA rubric 2025',
    'IB Biology IA criteria',
    'IB Biology IA marking',
    'IB Biology IA research design',
    'IB Biology IA data analysis',
    'IB Biology IA conclusion',
    'IB Biology IA evaluation',
    'IB Biology IA descriptors',
    'how is IB Biology IA marked',
    'IB Biology IA mark scheme',
  ],
  openGraph: {
    title: 'IB Biology IA Rubric 2025 — Criterion-by-Criterion Breakdown',
    description:
      'All 4 criteria × 6 marks explained: descriptor bands, what scores 6, what loses marks.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology IA Rubric 2025 — Full Breakdown',
    description: '24-mark 2025 IA rubric decoded criterion-by-criterion.',
  },
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const rubricFAQs = [
  {
    question: 'What is the total mark for the IB Biology IA in 2025?',
    answer:
      'The IB Biology IA is marked out of 24, with 4 criteria each worth 6 marks: Research Design, Data Analysis, Conclusion, and Evaluation. The IA contributes 20% of the final IB Biology grade at both HL and SL.',
  },
  {
    question: 'What was removed from the pre-2025 IA rubric?',
    answer:
      'The 2025 rubric removed the standalone Communication criterion. Communication quality is now judged implicitly across the 4 remaining criteria. Conclusion and Evaluation together now account for 50% of IA marks (12/24), up from the previous weighting.',
  },
  {
    question: 'How do examiners decide between 5 and 6 marks on a criterion?',
    answer:
      'The descriptor for 5–6 marks requires the work to meet every expectation of the lower bands plus additional sophistication: quantitative trend statements, explicit comparison with literature, ranked weaknesses with impact analysis. A single missing sub-point typically caps a criterion at 4 marks.',
  },
  {
    question: 'Are HL and SL graded on the same IA rubric?',
    answer:
      "Yes, both HL and SL Biology students submit the same IA format, graded against the same 4-criterion, 24-mark rubric. The depth of biological analysis expected in the Conclusion is calibrated to the student's level of syllabus engagement, but the rubric itself is identical.",
  },
  {
    question: 'Does the IA rubric reward a particular statistical test?',
    answer:
      'The rubric rewards the correct statistical test for your data — not a specific one. Examiners expect you to justify your choice (e.g. t-test for two means, ANOVA for three or more, chi-squared for categorical counts, Pearson or Spearman for correlations) and verify its assumptions. An incorrect test applied well scores lower than a simpler correct test.',
  },
]

function RubricSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'IB Biology IA Rubric 2025',
    itemListElement: iaCriteria.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      description: `${c.marks} marks — ${c.headlineDescription}`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function IABiologyIARubricPage() {
  return (
    <>
      <RubricSchema />
      <FAQSchema questions={rubricFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'IA Guide', href: '/ib-biology-ia-guide' },
          { label: 'Rubric 2025', isCurrentPage: true },
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
                  <Link href="/ib-biology-ia-guide" className="hover:text-white">
                    IA Guide
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  Rubric 2025
                </li>
              </ol>
            </nav>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology IA Rubric 2025 — Full Criterion Breakdown
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              {iaMeta.totalMarks} marks across {iaCriteria.length} criteria, each worth 6 marks.
              Weighting: {iaMeta.weightOfFinalGrade} of the final IB Biology grade (
              {iaMeta.levelsAssessed}).
            </p>
          </div>
        </section>

        {/* Criterion deep-dives */}
        {iaCriteria.map((c) => (
          <section
            key={c.key}
            id={c.key}
            className="scroll-mt-20 border-b border-gray-200 py-16 sm:py-20"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="mb-6 flex flex-wrap items-baseline gap-3">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{c.name}</h2>
                <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                  {c.marks} marks
                </span>
              </div>
              <p className="mb-10 max-w-3xl text-lg text-gray-700">{c.headlineDescription}</p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-green-900">
                    <CheckCircle2 className="h-5 w-5" />
                    What examiners reward
                  </h3>
                  <ul className="space-y-2 text-sm text-green-900">
                    {c.whatExaminersReward.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="flex-shrink-0 text-green-600">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-900">
                    <XCircle className="h-5 w-5" />
                    Common mark-losing mistakes
                  </h3>
                  <ul className="space-y-2 text-sm text-red-900">
                    {c.commonPitfalls.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="flex-shrink-0 text-red-600">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-900">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Band</th>
                      <th className="px-4 py-3 font-semibold">Descriptor summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.descriptorBands.map((b) => (
                      <tr key={b.band} className="border-t border-gray-200">
                        <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                          {b.band}
                        </td>
                        <td className="px-4 py-3 text-gray-700">{b.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}

        {/* FAQs */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              IA Rubric — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {rubricFAQs.map((faq) => (
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

        {/* Cross-links */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Resources</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/ib-biology-ia-topics"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                50+ IA Topics
              </Link>
              <Link
                href="/ib-biology-ia-examples"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Worked Exemplars
              </Link>
              <Link
                href="/ib-biology-ia-troubleshooting"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Troubleshooting Guide
              </Link>
              <Link
                href="/ib-biology-ia-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Main IA Guide
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Get Every Criterion Reviewed</h2>
            <p className="mb-8 text-lg text-green-100">
              A Cerebrum IB Biology tutor will review your IA draft against all 4 criteria and give
              examiner-style feedback in 48 hours.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want my IB Biology IA draft reviewed against the 2025 rubric.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book IA Review
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
