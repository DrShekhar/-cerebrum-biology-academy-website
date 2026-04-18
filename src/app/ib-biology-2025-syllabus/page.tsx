import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { syllabusThemes, syllabusMeta } from '@/data/ib-biology/syllabus-2025'
import { ArrowRight, BookOpen, MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-2025-syllabus'

export const metadata: Metadata = {
  title: 'IB Biology 2025 Syllabus | 4 Themes, 2 Papers, First Exam May 2025 | Cerebrum',
  description:
    'The complete 2025 IB Biology syllabus — 4 themes (A–D), Paper 3 removed, 2 exam papers, IA worth 20%. Every subtopic at SL and HL with examiner-ready summaries.',
  keywords: [
    'IB Biology 2025 syllabus',
    'IB Biology new syllabus',
    'IB Biology themes',
    'IB Biology unit A',
    'IB Biology unit B',
    'IB Biology unit C',
    'IB Biology unit D',
    'IB Biology HL syllabus',
    'IB Biology SL syllabus',
    'IB Biology first assessment 2025',
    'IB Biology syllabus changes',
  ],
  openGraph: {
    title: 'IB Biology 2025 Syllabus — 4 Themes, 2 Papers',
    description:
      'Complete 2025 syllabus map — themes A–D, SL vs HL, what changed, first exam May 2025.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology 2025 Syllabus — 4-Theme Breakdown',
    description: 'Full 2025 IB Biology syllabus with all subtopics at SL/HL.',
  },
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const syllabusFAQs = [
  {
    question: 'What changed in the 2025 IB Biology syllabus?',
    answer:
      'Three structural changes. First, content is reorganised into four themes (A: Unity and Diversity; B: Form and Function; C: Interaction and Interdependence; D: Continuity and Change) replacing the legacy 1-11 topic numbering. Second, Paper 3 (options) is removed — assessment is now split across two papers only. Third, the Internal Assessment rubric was reduced to four criteria (Research Design, Data Analysis, Conclusion, Evaluation) each worth 6 marks, with greater emphasis on Conclusion and Evaluation.',
  },
  {
    question: 'When was the first assessment of the 2025 IB Biology syllabus?',
    answer:
      'The first assessment was the May 2025 exam session. November 2025 was the second. All students first taught from August/September 2023 sit the new syllabus.',
  },
  {
    question: 'How many teaching hours does IB Biology have?',
    answer:
      'Standard Level (SL) is 150 teaching hours. Higher Level (HL) is 240 teaching hours, of which 90 are AHL (Additional Higher Level) content. Both levels share the four-theme structure — HL students cover additional subtopics marked as AHL within each theme.',
  },
  {
    question: 'What are the 4 IB Biology themes in the 2025 syllabus?',
    answer:
      'Theme A: Unity and Diversity (water, nucleic acids, cells, classification, evolution, biodiversity). Theme B: Form and Function (biomolecules, membranes, gas exchange, transport, adaptation). Theme C: Interaction and Interdependence (enzymes, respiration, photosynthesis, signalling, populations, ecosystems). Theme D: Continuity and Change (DNA replication, protein synthesis, cell division, reproduction, inheritance, natural selection, climate change).',
  },
  {
    question: 'Are IB Biology Options still part of the 2025 syllabus?',
    answer:
      'No. The four legacy options (Neurobiology and Behaviour, Biotechnology and Bioinformatics, Ecology and Conservation, Human Physiology) have been removed as a separate assessed unit. Some option content has been folded into the four themes as AHL content — for example human physiology material appears in Theme C.',
  },
  {
    question: 'How is 2025 IB Biology assessed externally?',
    answer:
      'Externally assessed papers are now Paper 1 and Paper 2. Paper 1 combines multiple choice questions (Paper 1A) with data-based short-response questions (Paper 1B). Paper 2 is extended response and data analysis. Together the external papers contribute 80% of the final grade; the Internal Assessment contributes the remaining 20%.',
  },
]

export default function IABiologySyllabus2025Page() {
  return (
    <>
      <FAQSchema questions={syllabusFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: '2025 Syllabus', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
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
                  2025 Syllabus
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
              <BookOpen className="h-4 w-4" />
              First Assessment — {syllabusMeta.firstAssessment}
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology 2025 Syllabus — 4 Themes, 2 Papers
            </h1>

            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              The complete 2025 IB Biology syllabus at a glance. Four themes (A–D), Paper 3 removed,
              external exams now split across Paper 1 and Paper 2, IA worth {syllabusMeta.iaWeight}.
              Every subtopic in this guide is tagged SL or AHL so you can see exactly what HL
              students cover beyond SL.
            </p>
          </div>
        </section>

        {/* Meta row */}
        <section className="border-b border-gray-200 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                  SL hours
                </div>
                <div className="text-3xl font-bold text-gray-900">{syllabusMeta.slHours}</div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                  HL hours (incl. AHL)
                </div>
                <div className="text-3xl font-bold text-gray-900">{syllabusMeta.hlHours}</div>
                <div className="mt-1 text-sm text-gray-600">{syllabusMeta.ahlHours}h AHL</div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                  External papers
                </div>
                <div className="text-3xl font-bold text-gray-900">{syllabusMeta.papers}</div>
                <div className="mt-1 text-sm text-gray-600">
                  {syllabusMeta.paperRemoved} removed
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                  IA weight
                </div>
                <div className="text-3xl font-bold text-gray-900">{syllabusMeta.iaWeight}</div>
                <div className="mt-1 text-sm text-gray-600">Same rubric SL &amp; HL</div>
              </div>
            </div>
          </div>
        </section>

        {/* Themes */}
        {syllabusThemes.map((theme) => (
          <section
            key={theme.code}
            id={`theme-${theme.code.toLowerCase()}`}
            className="scroll-mt-20 border-b border-gray-200 py-16 sm:py-20"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="mb-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                  Theme {theme.code}
                </div>
                <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">{theme.name}</h2>
                <p className="max-w-3xl text-lg text-gray-700">{theme.tagline}</p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-900">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Code</th>
                      <th className="px-4 py-3 font-semibold">Subtopic</th>
                      <th className="px-4 py-3 font-semibold">Level</th>
                      <th className="px-4 py-3 font-semibold">Summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {theme.subtopics.map((s) => (
                      <tr key={s.code} className="border-t border-gray-200">
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-500">
                          {s.code}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{s.title}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.level === 'AHL' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}
                          >
                            {s.level === 'AHL' ? 'HL only (AHL)' : 'SL + HL'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{s.summary}</td>
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
              2025 Syllabus — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {syllabusFAQs.map((faq) => (
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
                href="/ib-biology-paper-1-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                Paper 1 Guide
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
                Past Papers Hub
              </Link>
              <Link
                href="/ib-biology-ia-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IA Guide
              </Link>
              <Link
                href="/boards/ib"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IB Biology Coaching
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready for the 2025 Syllabus?</h2>
            <p className="mb-8 text-lg text-green-100">
              Cerebrum's 2-year programme is already mapped to the 4-theme 2025 syllabus with
              examiner-led live classes and a 2-point score guarantee.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want a demo for the IB Biology 2025 syllabus course.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book a Free Demo
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
