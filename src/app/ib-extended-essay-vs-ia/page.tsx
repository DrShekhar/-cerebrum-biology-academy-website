import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-extended-essay-vs-ia'

export const metadata: Metadata = {
  title: 'IB Biology EE vs IA | Differences, Overlap, Strategy | Cerebrum',
  description:
    'IB Biology Extended Essay vs Internal Assessment — side-by-side: word count, weighting, criteria, timeline, and whether you can reuse a topic. Clear answer to the most common IB Biology strategy question.',
  keywords: [
    'IB Biology EE vs IA',
    'IB Biology Extended Essay vs Internal Assessment',
    'IB Biology EE or IA',
    'IB Biology IA vs EE',
    'difference between EE and IA',
    'IB Biology EE or IA first',
    'IB Biology EE IA overlap',
  ],
  openGraph: {
    title: 'IB Biology EE vs IA — Side-by-Side Comparison',
    description: 'Word count, weighting, criteria, timeline, topic reuse rules.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const comparisonFAQs = [
  {
    question: 'Is the Biology EE easier or harder than the IA?',
    answer:
      'Different, not easier. The IA is shorter (3,000 vs 4,000 words) and more structured (4 criteria × 6 marks mapped directly to experiment stages). The EE is longer, more independent, and rewards argumentation rather than procedural rigour. Students with strong writing usually find the EE easier; students with strong experimental design find the IA easier.',
  },
  {
    question: 'Can I do my EE in Biology if I am only taking Biology SL?',
    answer:
      'Yes. EE subject choice is independent of subject level — you can submit a Biology EE at SL. Most IB students choose an EE subject they take at HL for depth, but this is a preference not a requirement.',
  },
  {
    question: 'Should I do the IA or EE first?',
    answer:
      'Usually IA first. Most students begin the IA in Year 1 once they have finished the relevant syllabus topic and are comfortable with data collection. The EE typically starts mid-Year 1 and extends into Year 2. Doing the IA first gives you a cleaner model for the EE methodology section.',
  },
  {
    question: 'Does the EE affect my Biology subject grade?',
    answer:
      'No. The EE does not affect your Biology grade (1–7). Instead, it contributes to the Diploma core points: combined with TOK, you can earn up to 3 bonus points toward the 45-point Diploma total. The IA, by contrast, contributes 20% directly to your Biology grade.',
  },
  {
    question: 'Can I recycle my IA methodology for my EE?',
    answer:
      'You can use a similar experimental approach but the research question must be substantively different. Near-identical IA and EE submissions will be flagged as potential malpractice. A good rule: change either the organism/system, the independent variable, or the analytical framing between them.',
  },
]

const rows: Array<{ aspect: string; ia: string; ee: string }> = [
  {
    aspect: 'Word count',
    ia: '3,000 words',
    ee: '4,000 words',
  },
  {
    aspect: 'Weight of IB Biology grade',
    ia: '20% (HL & SL)',
    ee: '0%',
  },
  {
    aspect: 'Weight of IB Diploma total',
    ia: '(via Biology grade)',
    ee: 'Up to +3 bonus points (with TOK)',
  },
  {
    aspect: 'Grading',
    ia: '24 marks (4 criteria × 6)',
    ee: '34 marks → letter grade A–E',
  },
  {
    aspect: 'Number of assessment criteria',
    ia: '4 (RD, DA, Conclusion, Evaluation)',
    ee: '5 (A Focus/Method, B Knowledge, C Critical Thinking, D Presentation, E Engagement)',
  },
  {
    aspect: 'Independence',
    ia: 'Teacher-guided within class framework',
    ee: 'Highly independent; supervisor provides structural guidance only',
  },
  {
    aspect: 'Typical timeline',
    ia: '8–12 weeks (Year 1)',
    ee: '8–12 months (late Year 1 → mid-Year 2)',
  },
  {
    aspect: 'Reflection component',
    ia: 'Evaluation section within main report',
    ee: 'Separate RPPF form (Criterion E)',
  },
  {
    aspect: 'Data source',
    ia: 'Wet-lab, field, or database (all accepted 2025)',
    ee: 'Wet-lab, field, or database — same acceptance',
  },
  {
    aspect: 'Typical page count',
    ia: '10–15 pages including figures',
    ee: '18–25 pages including figures',
  },
  {
    aspect: 'Moderation',
    ia: 'Teacher marks; IB externally moderates',
    ee: 'Externally marked by IB (not the supervisor)',
  },
]

export default function EEvsIAPage() {
  return (
    <>
      <FAQSchema questions={comparisonFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'EE vs IA', isCurrentPage: true },
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
                  EE vs IA
                </li>
              </ol>
            </nav>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              IB Biology EE vs IA — Side-by-Side
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
              The two biggest coursework pieces in IB Biology are frequently confused. Here is the
              clean comparison — what each assesses, how they are graded, how they fit together, and
              where students lose easy marks by treating one like the other.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Aspect</th>
                    <th className="px-4 py-3 font-semibold">Internal Assessment (IA)</th>
                    <th className="px-4 py-3 font-semibold">Extended Essay (EE)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.aspect} className="border-t border-gray-200 align-top">
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                        {r.aspect}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{r.ia}</td>
                      <td className="px-4 py-3 text-gray-700">{r.ee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              EE vs IA — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {comparisonFAQs.map((faq) => (
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
                href="/ib-biology-extended-essay"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                EE Guide
              </Link>
              <Link
                href="/ib-biology-ia-topics"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                IA Topics
              </Link>
              <Link
                href="/ib-biology-ee-topics"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
              >
                EE Topics
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Need Help Deciding?</h2>
            <p className="mb-8 text-lg text-green-100">
              In a free 30-minute consultation we'll help you plan both your IA and EE so they
              complement rather than duplicate each other.
            </p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want help planning my IB Biology IA and EE.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6" />
              Book Consultation
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
