import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, MessageCircle } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const URL = 'https://cerebrumbiologyacademy.com/gamsat-vs-mcat-biology'

export const metadata: Metadata = {
  title: 'GAMSAT vs MCAT Biology 2026 — Section III vs B/B, Scoring & Which to Take',
  description:
    'Compare GAMSAT Section III (biological & physical sciences reasoning) with MCAT Biological and Biochemical Foundations (59 passages+MCQ). Scoring, countries, content overlap, difficulty, and dual-prep strategy.',
  keywords: [
    'GAMSAT vs MCAT Biology',
    'MCAT vs GAMSAT',
    'GAMSAT Section III biology',
    'MCAT B/B vs GAMSAT',
    'GAMSAT or MCAT for medicine',
    'GAMSAT MCAT comparison 2026',
    'is GAMSAT harder than MCAT',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-AU': URL, 'en-US': URL },
  },
  openGraph: {
    title: 'GAMSAT vs MCAT Biology 2026 — Section III vs B/B, Scoring & Which to Take',
    description:
      'GAMSAT for UK/Ireland/Australia/NZ or MCAT for US/Canada? Full biology section comparison — format, scoring, content depth, and when dual-prep makes sense.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GAMSAT vs MCAT Biology 2026 — Section III vs B/B, Scoring & Which to Take',
    description:
      'GAMSAT Section III vs MCAT B/B: which tests more biology, which is harder, and can you prep for both?',
  },
}

const comparisonRows = [
  {
    dimension: 'Full exam name',
    gamsat: 'Graduate Australian Medical School Admissions Test (GAMSAT)',
    mcat: 'Medical College Admission Test (MCAT)',
  },
  {
    dimension: 'Biology-relevant section',
    gamsat:
      'Section III: Reasoning in Biological and Physical Sciences, covering biological and physical sciences reasoning. The GAMSAT format has been updated for recent sittings (2024 onward) — confirm current question counts and timing with ACER. Biology remains a substantial share of Section III.',
    mcat: 'Biological and Biochemical Foundations of Living Systems (B/B). 59 questions in 95 minutes (passage-based MCQ + discrete MCQ). Nearly 100% biology and biochemistry content.',
  },
  {
    dimension: 'Other sections',
    gamsat:
      'Section I: Reasoning in Humanities and Social Sciences. Section II: Written Communication (essay-based). Exact question counts and timings were revised for recent sittings — confirm with ACER.',
    mcat: 'Chemical and Physical Foundations (C/P, 59Q), Psychological/Social/Biological Foundations (P/S, 59Q), Critical Analysis and Reasoning Skills (CARS, 53Q).',
  },
  {
    dimension: 'Total exam length',
    gamsat: 'Approximately 5 hours 15 minutes (including breaks).',
    mcat: 'Approximately 7 hours 30 minutes (including breaks).',
  },
  {
    dimension: 'Scoring',
    gamsat:
      'Each section scored 0-100. Overall score is weighted average (Section I: 25%, Section II: 25%, Section III: 50%). Competitive score: 60-65+.',
    mcat: 'Each section scored 118-132. Total 472-528. Competitive score: 510+ (80th percentile) for US MD schools.',
  },
  {
    dimension: 'Countries accepted',
    gamsat:
      'Australia (most graduate-entry medical schools), Ireland (RCSI, UCD, UCC, UL, TCD), UK (select graduate-entry programmes: Nottingham, St George, Swansea).',
    mcat: 'United States (all MD and DO schools), Canada (all medical schools), Caribbean medical schools. Some Australian and UK schools accept MCAT as an alternative.',
  },
  {
    dimension: 'Biology content depth',
    gamsat:
      'First-year university biology and chemistry. Emphasis on reasoning from unfamiliar data rather than recall. Questions often present a research scenario and ask you to apply principles.',
    mcat: 'First-year biology + biochemistry + introductory physiology. Passage-based format tests reading comprehension of scientific literature alongside content knowledge. More content-heavy than GAMSAT.',
  },
  {
    dimension: 'Prerequisite knowledge',
    gamsat:
      'No formal prerequisites, but equivalent of 1 year university biology and 1 year university chemistry expected. Organic chemistry is tested.',
    mcat: 'AAMC recommends 2 semesters each of introductory biology, general chemistry, organic chemistry, biochemistry, and physics. Plus introductory psychology and sociology.',
  },
]

const faqs = [
  {
    question: 'Is GAMSAT harder than MCAT?',
    answer:
      'They are difficult in different ways. GAMSAT Section III is more reasoning-heavy — questions often present unfamiliar research scenarios and ask you to apply first principles rather than recall specific facts. The MCAT Biological and Biochemical Foundations section (B/B) is more content-heavy — you need to know more specific biology and biochemistry, but the questions are more predictable in format. Students with strong analytical reasoning but less content background often find GAMSAT more natural. Students who prefer structured content mastery often find MCAT more approachable. Overall difficulty is comparable; preparation time is similar (3-6 months of dedicated study).',
  },
  {
    question: 'Can MCAT scores transfer to GAMSAT-accepting schools?',
    answer:
      'Some Australian medical schools (e.g., University of Sydney, Monash) accept MCAT scores as an alternative to GAMSAT. In Ireland and the UK, GAMSAT is generally required — MCAT is not accepted. If you are applying to both US and Australian medical schools, check individual programme requirements. Taking the MCAT and applying to Australian schools that accept it can save you from sitting two separate exams.',
  },
  {
    question: 'Which has more biology content — GAMSAT or MCAT?',
    answer:
      'The MCAT tests significantly more biology content. The B/B section alone has 59 questions that are almost entirely biology and biochemistry. GAMSAT Section III mixes biology with chemistry and physics, with biology accounting for roughly 40% of 75 questions (approximately 30 biology questions). However, GAMSAT biology questions tend to be more reasoning-intensive — you are given novel data and expected to reason through it, rather than recall a specific pathway or mechanism.',
  },
  {
    question: 'Which is best for UK medical school?',
    answer:
      'For UK graduate-entry medicine (GEM) programmes, GAMSAT is the standard requirement. Nottingham, St George (London), Swansea, and several Irish medical schools require GAMSAT. Undergraduate-entry UK medical schools use UCAT or BMAT instead. MCAT is not accepted by UK medical schools. If you are targeting UK graduate-entry medicine specifically, prepare for GAMSAT.',
  },
  {
    question: 'Can you prep for both GAMSAT and MCAT simultaneously?',
    answer:
      'Yes, with caveats. The biology and chemistry content overlaps substantially — Campbell Biology, Lehninger Biochemistry, and introductory organic chemistry serve both exams. The key differences are: (1) MCAT requires more psychology/sociology content (not tested on GAMSAT), (2) GAMSAT Section II requires essay writing (not tested on MCAT), and (3) GAMSAT emphasises reasoning from novel data while MCAT emphasises passage-based content recall. A dual-prep strategy works best if you allocate 3-4 months for shared content, then 4-6 weeks for exam-specific practice. We coach both pathways in parallel.',
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
      name: 'GAMSAT Biology Prep',
      item: 'https://cerebrumbiologyacademy.com/gamsat-section-3-biology-prep',
    },
    { '@type': 'ListItem', position: 3, name: 'GAMSAT vs MCAT Biology', item: URL },
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

export default function GAMSATvsMCATBiologyPage() {
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
          'GAMSAT Section III Biology',
          'GAMSAT Preparation',
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
                <Link
                  href="/gamsat-section-3-biology-prep"
                  className="text-gray-600 hover:text-teal-600"
                >
                  GAMSAT Biology Prep
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">GAMSAT vs MCAT Biology</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Medical entrance exams compared
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              GAMSAT vs MCAT Biology 2026
              <span className="block text-yellow-400 mt-2">
                Section III vs B/B, Scoring & Which to Take
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              Two exams, two hemispheres, one goal: medical school. The MCAT&apos;s Biological and
              Biochemical Foundations section (B/B) tests deep content knowledge through
              passage-based questions. GAMSAT&apos;s Section III tests scientific reasoning across
              biology, chemistry, and physics with an emphasis on applying principles to unfamiliar
              data. Choosing between them depends primarily on where you want to study medicine.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              This guide compares the biology components of both exams — format, content depth,
              scoring, accepted countries, and whether dual-prep is feasible.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Full comparison</h2>
            <p className="text-slate-600 mb-8">
              Every significant difference between GAMSAT and MCAT biology assessment.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm font-semibold text-slate-700">
                  <tr>
                    <th className="p-4 w-1/5">Dimension</th>
                    <th className="p-4 w-2/5">GAMSAT</th>
                    <th className="p-4 w-2/5">MCAT</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {comparisonRows.map((row) => (
                    <tr key={row.dimension} className="border-t border-slate-100 align-top">
                      <td className="p-4 font-semibold text-slate-900">{row.dimension}</td>
                      <td className="p-4">{row.gamsat}</td>
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
              Biology content overlap between GAMSAT and MCAT
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Shared content (~70%)</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">*</span>
                    Cell biology: membrane structure, transport, organelles, cell cycle
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">*</span>
                    Molecular genetics: DNA replication, transcription, translation, gene regulation
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">*</span>
                    Metabolism: glycolysis, Krebs cycle, oxidative phosphorylation, photosynthesis
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">*</span>
                    Human physiology: cardiovascular, respiratory, nervous, endocrine systems
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">*</span>
                    Biochemistry: amino acids, protein structure, enzyme kinetics, lipid biology
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">*</span>
                    Mendelian genetics, Hardy-Weinberg, evolution, population genetics
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Exam-specific content</h3>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">
                    MCAT-specific (not heavily tested on GAMSAT)
                  </p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li>
                      - Detailed biochemistry (amino acid properties, metabolic regulation,
                      Michaelis-Menten kinetics)
                    </li>
                    <li>- Psychology and sociology (entire P/S section)</li>
                    <li>- Passage-based experimental analysis at research-paper depth</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">
                    GAMSAT-specific (not heavily tested on MCAT)
                  </p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li>- Section II essay writing (humanities reasoning)</li>
                    <li>- Physics integrated into Section III biology questions</li>
                    <li>
                      - Reasoning from completely novel data (less reliance on memorised content)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Difficulty */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Difficulty comparison
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Content load</h3>
                <p className="text-sm text-slate-600">
                  MCAT requires more sheer content memorisation. The AAMC content outline is
                  extensive — detailed biochemistry, amino acid properties, metabolic pathways, and
                  organ system physiology. GAMSAT tests less content breadth but expects you to
                  reason through unfamiliar applications of that content.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Reasoning demand</h3>
                <p className="text-sm text-slate-600">
                  GAMSAT Section III is more reasoning-intensive per question. You are often given a
                  data set or scenario you have never seen and asked to apply basic principles. MCAT
                  passages also require reasoning, but the content is more predictable — you can
                  anticipate the types of questions from the passage topic.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Time pressure</h3>
                <p className="text-sm text-slate-600">
                  GAMSAT Section III gives 2 minutes per question. MCAT B/B gives approximately 1
                  minute 37 seconds per question, but questions are grouped in passages that require
                  initial reading time. Effective per-question time is similar. Both exams penalise
                  slow readers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-teal-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Verdict: which should you take?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-700 mb-4">Take GAMSAT if...</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-yellow-500 font-bold flex-shrink-0">+</span>
                    You are targeting graduate-entry medicine in Australia, Ireland, or UK
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-500 font-bold flex-shrink-0">+</span>
                    You come from a non-science undergraduate background (GAMSAT is less
                    content-heavy)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-500 font-bold flex-shrink-0">+</span>
                    You are a strong analytical reasoner who can work with unfamiliar data
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-500 font-bold flex-shrink-0">+</span>
                    You are comfortable with essay writing (Section II)
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-teal-200">
                <h3 className="text-lg font-bold text-teal-700 mb-4">Take MCAT if...</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">+</span>
                    You are targeting US or Canadian medical schools (MCAT is required)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">+</span>
                    You have a strong science undergraduate background and prefer content-based
                    exams
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">+</span>
                    You want maximum flexibility (MCAT is accepted more broadly worldwide)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold flex-shrink-0">+</span>
                    You are willing to invest in comprehensive content review (3-6 months)
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200">
              <p className="text-sm text-slate-700">
                <strong>Dual-prep strategy:</strong> if you are applying to both US and Australian
                medical schools, prepare for the MCAT first (it has the higher content ceiling),
                then use that foundation for GAMSAT Section III. Add 4-6 weeks for GAMSAT-specific
                reasoning practice and Section II essay writing. The biology content transfers
                directly.
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
              GAMSAT or MCAT? Ask us on WhatsApp
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              Tell us which countries you are applying to and your science background, and we will
              reply with which exam fits and how we would prep you. We coach both. No commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent(
                  'Hi Cerebrum, I am deciding between GAMSAT and MCAT biology and have a question.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with us on WhatsApp
              </a>
              <Link
                href="/best-gamsat-biology-tutor"
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
                href="/gamsat-section-3-biology-prep"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-yellow-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">GAMSAT Section III Biology Prep</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Reasoning-based biology coaching for GAMSAT
                </p>
              </Link>
              <Link
                href="/mcat-biology-preparation"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
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
