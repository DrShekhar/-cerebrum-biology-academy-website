import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const URL = 'https://cerebrumbiologyacademy.com/a-level-biology-vs-igcse-biology'

export const metadata: Metadata = {
  title: 'A-Level Biology vs IGCSE Biology 2026 — Syllabus, Difficulty & Progression',
  description:
    'Complete comparison of A-Level Biology and IGCSE Biology — syllabus depth (Cambridge 9700 vs 0610), exam format, grading (A*-E vs A*-G), board differences (AQA, OCR, CAIE), and how to prepare for the IGCSE-to-A-Level jump.',
  keywords: [
    'A-Level Biology vs IGCSE Biology',
    'IGCSE to A-Level Biology',
    'is A-Level Biology hard',
    'IGCSE Biology 0610 vs A-Level 9700',
    'AQA vs OCR vs CAIE Biology',
    'A-Level Biology syllabus comparison',
    'IGCSE Biology progression A-Level',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-GB': URL },
  },
  openGraph: {
    title: 'A-Level Biology vs IGCSE Biology 2026 — Syllabus, Difficulty & Progression',
    description:
      'IGCSE lays the foundation; A-Level builds the depth. Compare syllabi, grading, exam formats, and board choices between IGCSE Biology and A-Level Biology.',
    url: URL,
    type: 'article',
    locale: 'en_GB',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-Level Biology vs IGCSE Biology 2026 — Syllabus, Difficulty & Progression',
    description:
      'From IGCSE grade A* to A-Level — how the jump works, what changes, and how to prepare early.',
  },
}

const comparisonRows = [
  {
    dimension: 'Level',
    igcse: 'Pre-16 qualification (Year 10-11 / Grade 9-10). Foundation-level science.',
    aLevel: 'Post-16 qualification (Year 12-13 / Grade 11-12). University-entry level.',
  },
  {
    dimension: 'Cambridge syllabus code',
    igcse: '0610 (IGCSE Biology) or 0970 (IGCSE Biology, 9-1 grading)',
    aLevel: '9700 (Cambridge International AS & A Level Biology)',
  },
  {
    dimension: 'Syllabus breadth',
    igcse:
      '21 topics: cell biology, organism biology, ecology, genetics at introductory depth. Emphasis on observation, description, and basic application.',
    aLevel:
      '19 topics (AS+A2) covering molecular biology, biochemistry, genetics, ecology, and physiology at university-introductory depth. Requires quantitative analysis and extended scientific writing.',
  },
  {
    dimension: 'Exam format (CAIE)',
    igcse:
      'Paper 1 (MCQ, 45 min), Paper 2 (structured/short-answer, 1h 15min), Paper 3 (theory, 1h 15min), Paper 5 or 6 (practical). Extended candidates sit Papers 1, 2, 4, 6.',
    aLevel:
      'Paper 1 (MCQ, 1h 15min), Paper 2 (structured questions, 1h 15min), Paper 3 (advanced practical skills, 2h), Paper 4 (structured + essay, 2h), Paper 5 (planning/analysis/evaluation, 1h 15min).',
  },
  {
    dimension: 'Grading',
    igcse: 'A*-G (or 9-1 for the 0970 syllabus). A* is the highest.',
    aLevel: 'A*-E. A* requires 90%+ on A2 papers plus an overall A. U (unclassified) for below E.',
  },
  {
    dimension: 'Mathematical demand',
    igcse: 'Basic arithmetic, simple ratios, percentage calculations, graph reading.',
    aLevel:
      'Statistical tests (chi-squared, t-test, Spearman rank), logarithmic scales, water potential calculations, Hardy-Weinberg algebra, rate calculations from tangent lines.',
  },
  {
    dimension: 'Practical assessment',
    igcse: 'Paper 5/6: alternative-to-practical or school-based practical. Tests basic lab skills.',
    aLevel:
      'Paper 3 (CAIE) or Practical Endorsement (AQA/OCR). Tests experimental design, data analysis, error evaluation, and planning novel investigations.',
  },
  {
    dimension: 'Med school requirement',
    igcse:
      'IGCSE Biology is expected but not sufficient. It is a prerequisite for A-Level Biology.',
    aLevel:
      'A-Level Biology grade A or A* is required by virtually all UK medical schools (UCAS). Most require AAA or A*AA at A-Level.',
  },
]

const boardComparison = [
  {
    board: 'CAIE (Cambridge)',
    strengths:
      'Globally recognized. Standard in international schools worldwide. Clear mark schemes. Syllabus 9700 is the most common A-Level Biology syllabus outside the UK.',
    watch:
      'Paper 5 (planning, analysis, evaluation) is unique to CAIE and requires specific preparation. Practical Paper 3 involves unseen experiments.',
  },
  {
    board: 'AQA',
    strengths:
      'Most popular A-Level Biology board in the UK. Well-structured specification with clear topic boundaries. Extensive past-paper banks. Required practical activities are embedded.',
    watch:
      'Essay question in Paper 3 (25 marks) is synoptic and demands confident scientific writing. Practical Endorsement is pass/fail (separate from grade).',
  },
  {
    board: 'OCR A',
    strengths:
      'Modular structure with clear subtopics. Good for students who prefer compartmentalised revision. Strong support materials.',
    watch:
      'Unified Biology paper integrates content from across the course — requires strong cross-topic links. OCR B (Advancing Biology) has a different structure and is less common.',
  },
]

const faqs = [
  {
    question: 'Is A-Level Biology much harder than IGCSE Biology?',
    answer:
      'Yes. A-Level Biology represents a significant step up from IGCSE. The content is deeper (molecular biology, advanced genetics, statistical analysis), the exam questions demand extended written answers with technical precision, and the mathematical component increases substantially. Most students report that the jump from IGCSE to A-Level is larger than the jump from Year 9 to IGCSE. Students who earned an A* at IGCSE typically find A-Level challenging but manageable; students who earned a B or below often struggle without additional support.',
  },
  {
    question: 'Do you need IGCSE Biology to take A-Level Biology?',
    answer:
      'Most schools require at least a B (or grade 6) in IGCSE Biology to enrol in A-Level Biology. Some competitive sixth forms require an A or A*. While it is theoretically possible to start A-Level Biology without IGCSE Biology (for instance, if you studied a different science curriculum), the IGCSE syllabus provides essential foundational knowledge — cell biology, basic genetics, organ systems, ecology concepts — that A-Level assumes you already know.',
  },
  {
    question: 'Which exam board is easiest for A-Level Biology?',
    answer:
      'No board is objectively easier — grade boundaries are set relative to cohort performance, so the final grade distribution is similar across AQA, OCR, and CAIE. However, students report different experiences: CAIE Paper 5 (planning/analysis) is considered challenging because it tests experimental design in an unusual format. AQA Paper 3 includes a 25-mark essay that demands synoptic thinking. OCR integrates practical context throughout, which suits lab-confident students. Choose the board that matches your school and learning style rather than perceived difficulty.',
  },
  {
    question: 'How should I prepare early for the IGCSE-to-A-Level jump?',
    answer:
      'Start during Year 11 (after IGCSE exams): (1) Read ahead on biochemistry — amino acid structure, protein folding, enzyme kinetics, and ATP. This is the biggest content gap. (2) Practise extended scientific writing — A-Level requires 6-8 line answers with precise terminology, not bullet-point recall. (3) Learn basic statistics — chi-squared test, standard deviation, and how to interpret p-values. (4) Revise IGCSE cell biology thoroughly — membrane structure, mitosis, and transport mechanisms form the base for A-Level molecular biology.',
  },
  {
    question: 'What A-Level Biology grade do medical schools need?',
    answer:
      'UK medical schools typically require A-Level Biology at grade A as a minimum. The most competitive programmes (Oxford, Cambridge, Imperial, UCL) expect A* in Biology alongside strong grades in other A-Levels. The standard offer for UK medicine is AAA or A*AA at A-Level, with Biology as a required subject. Some medical schools also accept the BMAT or UCAT score alongside A-Level grades. International students applying with CAIE A-Levels face the same grade requirements.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'A-Level Biology Tutor',
      item: 'https://cerebrumbiologyacademy.com/a-level-biology-tutor',
    },
    { '@type': 'ListItem', position: 3, name: 'A-Level vs IGCSE Biology', item: URL },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export default function ALevelVsIGCSEBiologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CerebrumPersonSchema
        knowsAbout={[
          'A-Level Biology',
          'IGCSE Biology',
          'Cambridge International Biology 9700',
          'Cambridge IGCSE Biology 0610',
          'AQA A-Level Biology',
          'OCR A-Level Biology',
        ]}
      />

      <main className="min-h-screen bg-white">
        <nav className="bg-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-teal-600">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href="/a-level-biology-tutor" className="text-gray-600 hover:text-teal-600">
                  A-Level Biology Tutor
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">A-Level vs IGCSE Biology</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              UK / International curriculum progression
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              A-Level Biology vs IGCSE Biology 2026
              <span className="block text-green-400 mt-2">Syllabus, Difficulty & Progression</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              IGCSE Biology builds the foundation. A-Level Biology builds the depth that university
              admissions officers — and medical schools — require. The jump between them is the
              single largest difficulty increase most biology students face before university.
              Understanding what changes, and preparing for it, makes the difference between a
              smooth transition and a difficult first term.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              This guide compares Cambridge IGCSE 0610 with A-Level 9700, covers AQA and OCR board
              differences, and lays out exactly how to bridge the gap.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Side-by-side comparison
            </h2>
            <p className="text-slate-600 mb-8">
              IGCSE and A-Level differ in depth, assessment style, and what they unlock.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm font-semibold text-slate-700">
                  <tr>
                    <th className="p-4 w-1/5">Dimension</th>
                    <th className="p-4 w-2/5">IGCSE Biology</th>
                    <th className="p-4 w-2/5">A-Level Biology</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {comparisonRows.map((row) => (
                    <tr key={row.dimension} className="border-t border-slate-100 align-top">
                      <td className="p-4 font-semibold text-slate-900">{row.dimension}</td>
                      <td className="p-4">{row.igcse}</td>
                      <td className="p-4">{row.aLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* The jump */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              What makes the IGCSE-to-A-Level jump so significant
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Content depth escalation</h3>
                <p className="text-sm text-slate-600 mb-4">
                  IGCSE teaches that DNA contains genes and genes code for proteins. A-Level expects
                  you to explain the molecular mechanisms: how RNA polymerase binds to a promoter,
                  how introns are spliced, how post-translational modifications alter protein
                  function. The same topic appears at both levels, but the depth increases by 2-3
                  levels.
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-green-800">
                    <strong>Biggest gaps:</strong> Biochemistry (amino acid structure, enzyme
                    kinetics, Krebs cycle detail), statistics (chi-squared, standard error), and
                    molecular genetics (gene regulation, epigenetics).
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Assessment style change</h3>
                <p className="text-sm text-slate-600 mb-4">
                  IGCSE rewards accurate recall and basic application — identify the function of
                  mitochondria, label a diagram, describe a process in 3-4 lines. A-Level demands
                  scientific reasoning: explain why a mutation in a regulatory gene could lead to
                  uncontrolled cell division; evaluate an experimental procedure and suggest
                  improvements; write a continuous prose essay linking multiple biological concepts.
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-green-800">
                    <strong>Key skill to develop:</strong> Extended scientific writing — clear,
                    precise, and structured paragraphs using correct terminology. This is the single
                    biggest differentiator between IGCSE-style and A-Level-style answers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board comparison */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Board comparison: AQA vs OCR vs CAIE
            </h2>
            <p className="text-slate-600 mb-8">
              All three boards cover equivalent content and are accepted equally by UK and
              international universities. The differences are in structure and assessment style.
            </p>
            <div className="space-y-4">
              {boardComparison.map((board) => (
                <div
                  key={board.board}
                  className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{board.board}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-green-700 uppercase mb-1">
                        Strengths
                      </p>
                      <p className="text-sm text-slate-700">{board.strengths}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-700 uppercase mb-1">
                        Watch out for
                      </p>
                      <p className="text-sm text-slate-700">{board.watch}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-teal-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Verdict: how to make the transition successfully
            </h2>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <p className="text-sm text-slate-700 mb-4">
                A-Level Biology is not simply &quot;harder IGCSE.&quot; It is a qualitatively
                different kind of biology. The transition requires three specific adaptations:
              </p>
              <ol className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <strong>Build biochemistry foundations early.</strong> Start reading about amino
                    acid structure, protein folding, and enzyme kinetics before A-Level begins.
                    IGCSE barely touches biochemistry; A-Level assumes it from Week 1.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <strong>Practise extended writing.</strong> Get comfortable writing 8-12 line
                    answers that explain mechanisms, not just describe structures. Use connective
                    phrases (&quot;this leads to,&quot; &quot;as a result,&quot; &quot;the
                    consequence of this is&quot;) to build logical chains.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <strong>Learn basic statistics.</strong> Chi-squared test, standard deviation,
                    standard error, and correlation vs causation. These appear in every A-Level
                    Biology exam and are not covered at IGCSE level.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-slate-50 rounded-xl border border-slate-200 open:shadow-md"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer">
                    <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/a-level-biology-tutor"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">A-Level Biology Tutor</h3>
                <p className="text-xs text-slate-600 mt-1">
                  AQA, OCR, and CAIE coaching for grade A and A*
                </p>
              </Link>
              <Link
                href="/ib-biology-tutor"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">IB Biology Tutor</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Compare IB vs A-Level pathway for university admissions
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
