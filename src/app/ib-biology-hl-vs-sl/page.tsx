import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { MessageCircle, CheckCircle2 } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-hl-vs-sl'

export const metadata: Metadata = {
  title: 'IB Biology HL vs SL 2025 | Which Level Should You Take? | Cerebrum',
  description:
    'IB Biology HL vs SL — 2025 syllabus comparison: 150 vs 240 teaching hours, AHL content, exam length, university requirements. Clear decision framework for HL vs SL choice.',
  keywords: [
    'IB Biology HL vs SL',
    'IB Biology Higher Level',
    'IB Biology Standard Level',
    'IB Biology HL or SL',
    'IB Biology HL SL difference',
    'Is IB Biology HL hard',
    'IB Biology HL syllabus',
    'IB Biology SL syllabus',
    'IB Biology HL for medicine',
    'IB Biology HL for university',
  ],
  openGraph: {
    title: 'IB Biology HL vs SL — 2025 Syllabus Comparison',
    description: 'Teaching hours, content, exams, university requirements — decided.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const hlVsSlFAQs = [
  {
    question: 'What is the difference between IB Biology HL and SL?',
    answer:
      'HL (Higher Level) is 240 teaching hours vs SL (Standard Level) at 150 hours. HL includes an additional 90 hours of AHL (Additional Higher Level) content — deeper material on nucleic acids, metabolism, plant biology, animal physiology, and chemical signalling. HL exams are longer and include extended response across more content. Both share the same IA and the same 4-theme structure.',
  },
  {
    question: 'Which universities require IB Biology HL?',
    answer:
      'Medical schools (especially UK: Oxford, Cambridge, Imperial, UCL) typically require Biology HL at grade 6 or 7. Top-tier US universities (Ivies, Stanford, MIT) recommend but do not require HL. For biology-related degrees (biotechnology, biomedical sciences, ecology), HL is strongly preferred.',
  },
  {
    question: 'Can I switch from HL to SL during the IB Diploma?',
    answer:
      'Yes, most schools allow a switch from HL to SL during DP1 (first year) up to a few months before mock exams. Switching from SL to HL is much harder because of the 90 hours of AHL content you will have missed. Talk to your IB coordinator as early as possible.',
  },
  {
    question: 'Is IB Biology SL enough for pre-medical programmes?',
    answer:
      'Generally no. Most medical schools and pre-med paths require Biology at HL. A few US community college pre-med routes accept SL, but competitive medical admissions virtually always demand HL. If you intend to study medicine, choose HL.',
  },
  {
    question: 'Is the IA different between HL and SL?',
    answer:
      'No. The IA is identical in format and grading at HL and SL — same 4 criteria × 6 marks, same 3,000-word limit, same 20% weighting. The only difference is that HL students often choose more ambitious topics because they have deeper content knowledge.',
  },
  {
    question: 'How much harder is IB Biology HL than SL?',
    answer:
      'Roughly 60% more content (150 → 240 hours) with deeper application of that content. A student who could score 7 at SL often scores 5 at HL if they underestimate the workload. Most students find HL manageable with 6–8 hours per week of dedicated study.',
  },
]

const rows: Array<{ aspect: string; hl: string; sl: string }> = [
  { aspect: 'Teaching hours', hl: '240 hours', sl: '150 hours' },
  { aspect: 'AHL content', hl: '~90 hours (9 AHL subtopics)', sl: 'None — core only' },
  {
    aspect: 'External exam time',
    hl: '~4 hours 15 min (Paper 1A + 1B + Paper 2)',
    sl: '~3 hours (Paper 1A + 1B + Paper 2)',
  },
  { aspect: 'Number of external marks', hl: '~112 marks', sl: '~70 marks' },
  {
    aspect: 'IA',
    hl: 'Same — 24 marks, 3,000 words, 20%',
    sl: 'Same — 24 marks, 3,000 words, 20%',
  },
  {
    aspect: 'EE eligibility',
    hl: 'Yes — EE in Biology commonly chosen',
    sl: 'Yes — EE in Biology allowed at SL too',
  },
  {
    aspect: 'University minimum for medicine',
    hl: 'Required (usually 6 or 7)',
    sl: 'Not accepted by most med schools',
  },
  {
    aspect: 'University minimum for biology degrees',
    hl: 'Strongly preferred',
    sl: 'Accepted at some programmes',
  },
  {
    aspect: 'Typical workload (hours/week)',
    hl: '6–8 hours/week study',
    sl: '3–5 hours/week study',
  },
  {
    aspect: 'Common grade distribution (2024)',
    hl: 'Mean ≈ 4.5; 7 rate ≈ 12%',
    sl: 'Mean ≈ 4.7; 7 rate ≈ 15%',
  },
]

export default function HLvsSLPage() {
  return (
    <>
      <FAQSchema questions={hlVsSlFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'HL vs SL', isCurrentPage: true },
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
                  HL vs SL
                </li>
              </ol>
            </nav>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology HL vs SL — Which Level Should You Take?
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              The HL vs SL decision determines your workload, your university options, and which
              medical schools you can apply to. This guide lays out the 2025-syllabus differences
              and a clear decision framework.
            </p>
          </div>
        </section>

        {/* Table */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              Side-by-Side Comparison (2025 Syllabus)
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Aspect</th>
                    <th className="px-4 py-3 font-semibold">HL (Higher Level)</th>
                    <th className="px-4 py-3 font-semibold">SL (Standard Level)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.aspect} className="border-t border-gray-200 align-top">
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                        {r.aspect}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{r.hl}</td>
                      <td className="px-4 py-3 text-gray-700">{r.sl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Decision framework */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">Pick HL If…</h2>
            <ul className="space-y-3">
              {[
                'You are applying to medicine (UK, Canada, Australia, Singapore, US).',
                'You want to major in Biology, Biochemistry, Biomedical Sciences, or Neuroscience.',
                'You enjoy Biology enough to give it 6–8 hours per week of focused study.',
                'You plan to use Biology as a credit-earning subject at US universities (HL 5+).',
                'You are confident in your data analysis and writing skills.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mb-8 mt-12 text-3xl font-bold text-gray-900 sm:text-4xl">Pick SL If…</h2>
            <ul className="space-y-3">
              {[
                'Your intended degree (e.g. Mathematics, Economics, Engineering) does not require Biology.',
                'You want to keep Biology as a supporting subject to show breadth.',
                'You already have 3 HLs and need a manageable 6th subject.',
                'You plan to pair SL Biology with other sciences at HL (Chemistry HL, Physics HL).',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">HL vs SL — FAQ</h2>
            <div className="space-y-4">
              {hlVsSlFAQs.map((faq) => (
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
                href="/ib-biology-2025-syllabus"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                2025 Syllabus
              </Link>
              <Link
                href="/how-to-score-7-ib-biology"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                How to Score 7
              </Link>
              <Link
                href="/ib-biology"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IB Biology Hub
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
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Still Undecided?</h2>
            <p className="mb-8 text-lg text-green-100">
              Talk to a Cerebrum counsellor — 30 minutes, no cost — and we'll map your university
              targets to HL or SL with a clear recommendation.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I need help choosing between IB Biology HL and SL.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book HL/SL Consultation
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
