import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, MessageCircle } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const URL = 'https://cerebrumbiologyacademy.com/dat-vs-mcat-biology'

export const metadata: Metadata = {
  title: 'DAT vs MCAT Biology 2026 — Pre-Dental vs Pre-Med Biology Comparison',
  description:
    'Compare DAT Survey of Natural Sciences biology with MCAT B/B section. Content overlap (~60%), depth differences (DAT breadth vs MCAT depth), scoring, timelines, and whether dual-prep works.',
  keywords: [
    'DAT vs MCAT Biology',
    'DAT biology vs MCAT biology',
    'is DAT biology easier than MCAT',
    'DAT MCAT overlap',
    'pre-dental vs pre-med biology',
    'DAT Survey of Natural Sciences',
    'DAT MCAT comparison 2026',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-US': URL },
  },
  openGraph: {
    title: 'DAT vs MCAT Biology 2026 — Pre-Dental vs Pre-Med Biology Comparison',
    description:
      'DAT tests breadth across 40 biology topics in 90 minutes. MCAT tests depth through passage-based analysis. Compare content, scoring, difficulty, and prep strategy.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DAT vs MCAT Biology 2026 — Pre-Dental vs Pre-Med Biology Comparison',
    description:
      'DAT breadth vs MCAT depth: which is harder for biology, and can you prep for both?',
  },
}

const comparisonRows = [
  {
    dimension: 'Full exam name',
    dat: 'Dental Admission Test (DAT)',
    mcat: 'Medical College Admission Test (MCAT)',
  },
  {
    dimension: 'Biology section',
    dat: 'Survey of Natural Sciences: Biology subsection. 40 standalone MCQ in 90 minutes (shared with General Chemistry 30Q and Organic Chemistry 30Q). Approximately 2 min 15 sec per biology question.',
    mcat: 'Biological and Biochemical Foundations of Living Systems (B/B). 59 passage-based + discrete MCQ in 95 minutes. All biology and biochemistry.',
  },
  {
    dimension: 'Question format',
    dat: 'Standalone multiple-choice. Each question is independent — no passages, no data sets. Tests recall and straightforward application.',
    mcat: 'Passage-based MCQ. 10 passages with 4-7 questions each, plus 15 standalone discrete questions. Requires reading comprehension of experimental descriptions alongside content knowledge.',
  },
  {
    dimension: 'Biology content scope',
    dat: 'Broad survey: cell biology, genetics, taxonomy, developmental biology, evolution, ecology, diversity of life, organ systems. Covers many topics at introductory depth. Emphasis on classification, developmental biology, and ecological relationships.',
    mcat: 'Focused depth: cell biology, molecular genetics, biochemistry, organ system physiology, evolution. Deeper treatment of biochemistry (amino acids, enzyme kinetics, metabolic pathways) and molecular biology. Less taxonomy and developmental biology than DAT.',
  },
  {
    dimension: 'Biochemistry emphasis',
    dat: 'Minimal. Basic amino acid structure and enzyme function. No dedicated biochemistry section.',
    mcat: 'Heavy. B/B section integrates biochemistry throughout — amino acid properties, protein structure, enzyme kinetics (Michaelis-Menten), metabolic regulation, lipid biochemistry. Separate C/P section also tests biochemistry.',
  },
  {
    dimension: 'Scoring',
    dat: 'Biology subsection scored 1-30 (scaled). Competitive score: 20+ (approximately 75th percentile). Academic Average (AA) combines all science subsections.',
    mcat: 'B/B section scored 118-132. Total score 472-528. Competitive score: 510+ (80th percentile) for US MD schools.',
  },
  {
    dimension: 'Other sections',
    dat: 'Perceptual Ability Test (PAT), Reading Comprehension, Quantitative Reasoning. No essay or psychology/sociology.',
    mcat: 'Chemical and Physical Foundations (C/P), Psychological/Social/Biological Foundations (P/S), Critical Analysis and Reasoning Skills (CARS).',
  },
  {
    dimension: 'Total exam length',
    dat: 'Approximately 4 hours 15 minutes (including breaks and tutorial).',
    mcat: 'Approximately 7 hours 30 minutes (including breaks).',
  },
]

const overlapTopics = [
  { topic: 'Cell biology (membrane, organelles, mitosis, meiosis)', overlap: 'High' },
  { topic: 'Molecular genetics (DNA replication, transcription, translation)', overlap: 'High' },
  { topic: 'Mendelian genetics and inheritance patterns', overlap: 'High' },
  { topic: 'Evolution and natural selection', overlap: 'High' },
  { topic: 'Human organ system physiology', overlap: 'Moderate' },
  { topic: 'Ecology (population, community, ecosystem)', overlap: 'Moderate' },
  {
    topic: 'Biochemistry (amino acids, enzyme kinetics, metabolic pathways)',
    overlap: 'Low — MCAT heavy, DAT light',
  },
  { topic: 'Taxonomy and diversity of life', overlap: 'Low — DAT heavy, MCAT minimal' },
  { topic: 'Developmental biology (embryology)', overlap: 'Low — DAT tested, MCAT minimal' },
  { topic: 'Psychology and sociology', overlap: 'None — MCAT only (P/S section)' },
]

const faqs = [
  {
    question: 'Is DAT biology easier than MCAT biology?',
    answer:
      'DAT biology questions are individually simpler — they test recall of facts and straightforward application rather than passage-based reasoning. However, the DAT covers a broader range of topics (taxonomy, developmental biology, ecological classification) that the MCAT does not emphasise. Students who prefer deep analysis of fewer topics tend to find the MCAT more natural. Students who prefer broad recall of many topics tend to find the DAT more natural. The MCAT is generally considered the harder exam overall because of the passage-based format and the biochemistry depth required.',
  },
  {
    question: 'Does DAT Biology overlap with MCAT Biology?',
    answer:
      'Approximately 60% of the biology content overlaps. Cell biology, molecular genetics, Mendelian genetics, evolution, and basic organ system physiology are tested on both exams. The key differences: the MCAT goes much deeper into biochemistry (amino acid chemistry, enzyme kinetics, metabolic regulation) and molecular biology, while the DAT includes taxonomy, developmental biology, and ecological classification that the MCAT largely ignores. If you prepare thoroughly for the MCAT, you cover most DAT biology content but miss taxonomy and embryology. If you prepare for the DAT, you cover the breadth but lack the biochemistry depth the MCAT requires.',
  },
  {
    question: 'Can you prep for both DAT and MCAT simultaneously?',
    answer:
      'It is possible but unusual. Students switching from pre-dental to pre-med (or vice versa) sometimes need both scores. The shared biology content can be studied once using Campbell Biology. Then add DAT-specific review for taxonomy and developmental biology, and MCAT-specific review for biochemistry, psychology/sociology, and passage-based practice. The MCAT requires significantly more preparation time (3-6 months vs 2-3 months for DAT), so most students prepare for the MCAT first if they need both — the MCAT preparation covers the DAT biology content with surplus.',
  },
  {
    question: 'Which has more biochemistry — DAT or MCAT?',
    answer:
      'The MCAT has substantially more biochemistry. The B/B section tests detailed amino acid properties (structures, pKa values, hydrophobicity), enzyme kinetics (Michaelis-Menten, Lineweaver-Burk plots, competitive vs uncompetitive inhibition), metabolic pathway regulation, and lipid biochemistry. The DAT tests basic enzyme function and amino acid structure but does not require the depth of biochemistry knowledge that the MCAT demands. This is the single largest content difference between the two exams.',
  },
  {
    question: 'What are the best study resources for DAT and MCAT biology?',
    answer:
      'For shared content: Campbell Biology (12th edition) covers the foundation for both exams. For MCAT-specific biochemistry: Lehninger Principles of Biochemistry and the Kaplan MCAT Biochemistry Review. For DAT-specific taxonomy and developmental biology: Cliff Notes AP Biology (quick survey) and Feralis Biology Notes (DAT-specific resource covering taxonomy and classification in detail). For passage practice: AAMC practice materials for MCAT, DAT Bootcamp for DAT. We coach both exams and provide structured study plans that account for the overlap.',
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
      name: 'DAT Biology Preparation',
      item: 'https://cerebrumbiologyacademy.com/dat-biology-preparation',
    },
    { '@type': 'ListItem', position: 3, name: 'DAT vs MCAT Biology', item: URL },
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

export default function DATvsMCATBiologyPage() {
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
          'DAT Survey of Natural Sciences Biology',
          'DAT Biology',
          'MCAT Biological and Biochemical Foundations',
          'MCAT Biology',
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
                <Link href="/dat-biology-preparation" className="text-gray-600 hover:text-teal-600">
                  DAT Biology Preparation
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">DAT vs MCAT Biology</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Pre-dental vs pre-med biology
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              DAT vs MCAT Biology 2026
              <span className="block text-blue-400 mt-2">
                Pre-Dental vs Pre-Med Biology Comparison
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              The DAT and MCAT both test biology, but they test it differently. The DAT&apos;s
              Survey of Natural Sciences covers 40 biology topics in a broad, recall-based format —
              perfect for dental school admissions that want to see you know your foundations. The
              MCAT&apos;s B/B section goes deep into 59 passage-based questions that demand analysis
              of experimental data on top of content knowledge.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              About 60% of the biology content overlaps. This guide maps every difference so you can
              decide which to prepare for — or whether dual-prep makes sense.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              Live online in your US time zone (ET/CT/MT/PT); pricing in USD.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Full comparison</h2>
            <p className="text-slate-600 mb-8">
              Format, content, scoring, and time — every meaningful difference.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm font-semibold text-slate-700">
                  <tr>
                    <th className="p-4 w-1/5">Dimension</th>
                    <th className="p-4 w-2/5">DAT</th>
                    <th className="p-4 w-2/5">MCAT</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {comparisonRows.map((row) => (
                    <tr key={row.dimension} className="border-t border-slate-100 align-top">
                      <td className="p-4 font-semibold text-slate-900">{row.dimension}</td>
                      <td className="p-4">{row.dat}</td>
                      <td className="p-4">{row.mcat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Content overlap */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Topic-by-topic content overlap
            </h2>
            <p className="text-slate-600 mb-8">
              How much each biology topic is shared between DAT and MCAT — and where the divergences
              are.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-white text-sm font-semibold text-slate-700">
                  <tr>
                    <th className="p-4 w-3/5">Biology topic</th>
                    <th className="p-4 w-2/5">Overlap level</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700 bg-white">
                  {overlapTopics.map((item) => (
                    <tr key={item.topic} className="border-t border-slate-100 align-top">
                      <td className="p-4">{item.topic}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.overlap === 'High'
                              ? 'bg-green-100 text-green-800'
                              : item.overlap === 'Moderate'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.overlap}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Difficulty */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Which is harder for biology?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">
                  DAT biology: breadth challenge
                </h3>
                <p className="text-sm text-slate-600">
                  The DAT tests a wider range of biology topics at a lower depth. You need to know
                  taxonomy (phyla, classes, representative organisms), developmental biology (germ
                  layers, gastrulation, organogenesis), and ecological classification in addition to
                  core cell biology and genetics. Individual questions are more straightforward, but
                  the breadth of recall required is larger. Students who struggle with memorisation
                  across many topics find the DAT biology challenging.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">MCAT biology: depth challenge</h3>
                <p className="text-sm text-slate-600">
                  The MCAT tests fewer topics but at significantly greater depth. You need to
                  understand enzyme kinetics at the Michaelis-Menten level, metabolic pathway
                  regulation, and molecular mechanisms of gene expression. The passage-based format
                  adds an analytical layer — you read a research-style passage and answer questions
                  that require both content knowledge and data interpretation. Students who struggle
                  with reading-heavy analytical questions find the MCAT biology harder.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Verdict: which should you choose?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-700 mb-4">Prepare for DAT if...</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">+</span>
                    You are applying to US or Canadian dental schools (DAT is required)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">+</span>
                    You prefer broad recall-based testing over passage-based analysis
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">+</span>
                    You want a shorter, more focused exam (~4 hours vs ~7.5 hours)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">+</span>
                    You do not need deep biochemistry (DAT tests it lightly)
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-700 mb-4">Prepare for MCAT if...</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-green-500 font-bold flex-shrink-0">+</span>
                    You are applying to US or Canadian medical schools (MCAT is required)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500 font-bold flex-shrink-0">+</span>
                    You enjoy analytical reading and data interpretation
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500 font-bold flex-shrink-0">+</span>
                    You are comfortable with deep biochemistry content
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500 font-bold flex-shrink-0">+</span>
                    You want an exam accepted by the widest range of health professional schools
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200">
              <p className="text-sm text-slate-700">
                <strong>Switching from pre-dental to pre-med (or vice versa)?</strong> If you have
                already prepared for the MCAT, most DAT biology content is covered — add 2-3 weeks
                for taxonomy and developmental biology, plus Perceptual Ability Test practice. If
                you have prepared for the DAT, you will need 6-8 weeks of additional biochemistry
                and passage-based practice for the MCAT.
              </p>
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

        {/* WhatsApp CTA */}
        <section className="py-12 md:py-16 bg-teal-50 border-y border-teal-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              DAT or MCAT? Ask us on WhatsApp
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              Tell us whether you are pre-dental or pre-med and your timeline, and we will reply
              with how we would map the biology overlap for you. We coach both. No commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent(
                  'Hi Cerebrum, I am deciding between DAT and MCAT biology prep and have a question.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with us on WhatsApp
              </a>
              <Link
                href="/dat-biology-preparation"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-teal-700 px-8 py-4 rounded-xl font-medium text-lg border border-teal-200 transition"
              >
                Book a free trial lesson
              </Link>
            </div>
            <p className="text-sm text-slate-500 mt-4 max-w-2xl mx-auto">
              WhatsApp is free from the US — no international call needed. Live online classes in
              your US time zone (ET/CT/MT/PT).
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/dat-biology-preparation"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">DAT Biology Preparation</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Survey of Natural Sciences coaching for pre-dental students
                </p>
              </Link>
              <Link
                href="/mcat-biology-preparation"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">MCAT Biology Preparation</h3>
                <p className="text-xs text-slate-600 mt-1">
                  B/B section coaching with passage-based practice
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
