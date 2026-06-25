import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const URL = 'https://cerebrumbiologyacademy.com/ap-biology-vs-ib-biology'

export const metadata: Metadata = {
  title: 'AP Biology vs IB Biology 2026 — Which is Harder, Better for College?',
  description:
    'Head-to-head comparison of AP Biology (8 CED units, MCQ+FRQ, scored 1-5) and IB Biology (4 themes, Paper 1+2+IA+EE, scored 1-7). Difficulty, college credit, scoring, and which programme fits your goals.',
  keywords: [
    'AP Biology vs IB Biology',
    'IB Biology vs AP Biology',
    'is IB Biology harder than AP',
    'AP Biology or IB Biology for college',
    'AP vs IB Biology college credit',
    'IB Biology HL vs AP Biology',
    'AP Biology IB Biology comparison 2026',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-US': URL },
  },
  openGraph: {
    title: 'AP Biology vs IB Biology 2026 — Which is Harder, Better for College?',
    description:
      'Curriculum, exam format, scoring, difficulty, and college credit compared side-by-side. AP Biology 8 units vs IB Biology 4 themes — everything you need to decide.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology vs IB Biology 2026 — Which is Harder, Better for College?',
    description:
      'AP scores 1-5, IB scores 1-7 — but which actually gives you more college credit? Full comparison inside.',
  },
}

const comparisonRows = [
  {
    dimension: 'Governing body',
    ap: 'College Board (USA)',
    ib: 'International Baccalaureate Organization (Geneva)',
  },
  {
    dimension: 'Curriculum structure',
    ap: '8 CED units: Chemistry of Life, Cell Structure, Cellular Energetics, Cell Communication, Heredity, Gene Expression, Natural Selection, Ecology',
    ib: '4 Themes (2025 syllabus): Unity and Diversity, Form and Function, Interaction and Interdependence, Continuity and Change. Each theme has sub-topics at SL and additional HL content.',
  },
  {
    dimension: 'Exam format',
    ap: 'Single 3-hour exam: 60 MCQ (90 min) + 6 FRQ (90 min). No coursework component.',
    ib: 'Paper 1 (MCQ/short-answer, 1.5 hr) + Paper 2 (data-based + extended response, 2.25 hr HL). Plus Internal Assessment (individual investigation) and optional Extended Essay.',
  },
  {
    dimension: 'Scoring scale',
    ap: '1-5 composite. Score of 5 = top ~10-12% of test-takers globally.',
    ib: '1-7. HL 7 = top ~5-8% of candidates globally. IA counts for 20% of final mark.',
  },
  {
    dimension: 'Course duration',
    ap: 'Typically 1 academic year (some schools run as a semester block).',
    ib: '2 years (Year 1 and Year 2 of the Diploma Programme).',
  },
  {
    dimension: 'Lab / practical',
    ap: '13 recommended AP labs (school-administered, not externally assessed).',
    ib: 'Internal Assessment — 10 hours of independent investigation, externally moderated by IBO. Counts for 20% of the final grade.',
  },
  {
    dimension: 'College credit (US)',
    ap: 'AP-5 earns credit or placement at most US universities (some require AP-4). Policies vary by school.',
    ib: 'HL 6 or 7 typically earns credit comparable to AP-5. SL rarely earns credit. Some universities grant advanced standing for a full IB Diploma with 38+ points.',
  },
  {
    dimension: 'Global recognition',
    ap: 'Primarily recognized in the US, Canada, and select international schools. Growing acceptance in UK and Australia.',
    ib: 'Recognized in 150+ countries. Preferred pathway for UK (UCAS points), EU, and Australian university admissions.',
  },
]

const faqs = [
  {
    question: 'Is IB Biology harder than AP Biology?',
    answer:
      'IB Biology HL is generally considered harder than AP Biology because it covers more content over two years, requires an independent Internal Assessment worth 20% of the grade, and the Paper 2 exam demands extended written responses rather than multiple-choice. However, AP Biology has a faster pace (one year) and the MCQ section requires rapid recall under time pressure. The difficulty also depends on the student — strong writers often find IB more natural, while students who excel at fast MCQ-style recall may find AP easier.',
  },
  {
    question: 'Do colleges prefer IB over AP?',
    answer:
      'Neither is universally preferred. US universities treat AP-5 and IB HL 6-7 as roughly equivalent for credit purposes. UK universities (UCAS system) are more familiar with IB and assign UCAS tariff points directly. The IB Diploma as a whole — not just Biology — can give an edge at UK and European universities because it demonstrates breadth across six subjects plus Theory of Knowledge and Extended Essay. For US admissions, AP and IB carry similar weight in the Biology subject specifically.',
  },
  {
    question: 'Can you take both AP Biology and IB Biology?',
    answer:
      'Technically yes, but it is rare and usually unnecessary. Students at IB schools sometimes sit the AP Biology exam in May alongside their IB exams because the content overlap is substantial. IB HL students who have completed the full two-year course are well-prepared for the AP exam with minimal additional prep (mainly adapting to the MCQ format and College Board question style). Taking both can be strategic if you want AP credit at a US university while also holding the IB Diploma.',
  },
  {
    question: 'Which gives more college credit — AP or IB Biology?',
    answer:
      'At most US universities, AP-5 and IB HL 7 earn the same introductory biology credit (typically Bio 101 or equivalent). AP has a slight practical advantage in the US because more universities have explicit AP credit policies, while IB credit policies can be less standardized. At UK universities, IB HL 7 is often the required entry grade for medicine and biosciences — AP scores are accepted but less commonly specified in offers. The IB Diploma can sometimes earn broader credit or advanced standing that AP alone does not.',
  },
  {
    question: 'How does scoring compare between AP and IB Biology?',
    answer:
      'AP Biology uses a 1-5 scale based entirely on the final exam. A score of 5 means you are in roughly the top 10-12% of all test-takers. IB Biology uses a 1-7 scale where the final grade combines Paper 1 (MCQ/short-answer), Paper 2 (data-based and extended response), and the Internal Assessment (20%). An HL 7 places you in the top 5-8% of candidates. The IB system rewards sustained performance across multiple assessment types, while AP rewards peak performance on a single exam day.',
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
      name: 'Biology Programmes',
      item: 'https://cerebrumbiologyacademy.com/international-biology-tutor',
    },
    { '@type': 'ListItem', position: 3, name: 'AP Biology vs IB Biology', item: URL },
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

export default function APBiologyVsIBBiologyPage() {
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
      <CerebrumPersonSchema knowsAbout={['AP Biology', 'IB Biology HL', 'IB Biology SL']} />

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
                  href="/international-biology-tutor"
                  className="text-gray-600 hover:text-teal-600"
                >
                  Biology Programmes
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">AP Biology vs IB Biology</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Cross-programme comparison
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              AP Biology vs IB Biology 2026
              <span className="block text-blue-400 mt-2">Which is Harder, Better for College?</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              Two of the world&apos;s most respected pre-university biology programmes. AP Biology
              delivers a focused, one-year deep dive assessed by a single high-stakes exam. IB
              Biology is a two-year curriculum with internal assessment, extended essays, and a
              broader global recognition footprint. Choosing between them depends on your school
              options, university targets, and how you learn best.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              This guide compares curriculum structure, exam format, scoring, difficulty, and
              college credit policies — with enough detail for a genuine decision, not just a
              surface-level summary. Either way, Cerebrum coaches both live online in your US time
              zone (ET/CT/MT/PT), with pricing in USD.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Head-to-head comparison
            </h2>
            <p className="text-slate-600 mb-8">
              Every significant difference between AP Biology and IB Biology in one table.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm font-semibold text-slate-700">
                  <tr>
                    <th className="p-4 w-1/5">Dimension</th>
                    <th className="p-4 w-2/5">AP Biology</th>
                    <th className="p-4 w-2/5">IB Biology</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {comparisonRows.map((row) => (
                    <tr key={row.dimension} className="border-t border-slate-100 align-top">
                      <td className="p-4 font-semibold text-slate-900">{row.dimension}</td>
                      <td className="p-4">{row.ap}</td>
                      <td className="p-4">{row.ib}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Curriculum depth */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Curriculum depth: 8 CED units vs 4 IB themes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  AP Biology — College Board CED
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  The AP Biology Course and Exam Description (CED) organises content into 8 units,
                  each built around big ideas and science practices. The exam tests application of
                  these concepts through MCQ and free-response questions. Labs are recommended but
                  not externally assessed.
                </p>
                <ol className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 w-6 flex-shrink-0">1.</span>
                    Chemistry of Life (water, macromolecules, enzymes)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 w-6 flex-shrink-0">2.</span>
                    Cell Structure and Function (membranes, compartments)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 w-6 flex-shrink-0">3.</span>
                    Cellular Energetics (photosynthesis, respiration)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 w-6 flex-shrink-0">4.</span>
                    Cell Communication and Cell Cycle
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 w-6 flex-shrink-0">5.</span>
                    Heredity (meiosis, Mendelian genetics)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 w-6 flex-shrink-0">6.</span>
                    Gene Expression and Regulation
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 w-6 flex-shrink-0">7.</span>
                    Natural Selection (evolution, phylogenetics)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 w-6 flex-shrink-0">8.</span>
                    Ecology (population, community, ecosystem dynamics)
                  </li>
                </ol>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  IB Biology — 2025 Syllabus Themes
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  The 2025 IB Biology syllabus replaced the old topics-based structure with 4
                  overarching themes. Each theme spirals through increasing complexity at SL and HL.
                  The IA (independent investigation) and optional Extended Essay add assessed
                  practical and research components that AP does not have.
                </p>
                <ol className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600 w-6 flex-shrink-0">A.</span>
                    Unity and Diversity (cells, classification, evolution)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600 w-6 flex-shrink-0">B.</span>
                    Form and Function (molecular biology, metabolism, organ systems)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600 w-6 flex-shrink-0">C.</span>
                    Interaction and Interdependence (ecology, physiology, immune system)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600 w-6 flex-shrink-0">D.</span>
                    Continuity and Change (genetics, inheritance, biotechnology, evolution)
                  </li>
                </ol>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-800">
                    HL adds deeper biochemistry, gene regulation, animal physiology, and ecology
                    content within each theme — approximately 40% more material than SL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Difficulty comparison */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Difficulty: which is actually harder?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Content volume</h3>
                <p className="text-sm text-slate-600">
                  IB Biology HL covers more content than AP Biology. The two-year course allows
                  deeper treatment of human physiology, plant biology, and ecology. AP covers
                  similar breadth at a college-introductory level in one year, which means a faster
                  pace but less total depth per topic.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Assessment complexity</h3>
                <p className="text-sm text-slate-600">
                  IB requires extended written answers (Paper 2 Section B: 15-20 mark essays), an
                  independent investigation (IA), and optionally an Extended Essay. AP tests MCQ
                  recall and shorter free-response analysis. Students who struggle with long-form
                  scientific writing find IB harder; students who struggle with speed under MCQ time
                  pressure find AP harder.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Top-score rarity</h3>
                <p className="text-sm text-slate-600">
                  AP-5 is earned by roughly 10-12% of test-takers. IB HL 7 is earned by roughly 5-8%
                  of candidates. By this metric, the top score in IB is harder to achieve. However,
                  IB candidates are a more self-selected group (IB Diploma students), while AP is
                  open to any student at any school.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* College credit */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              College credit: what each score actually earns you
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-white text-sm font-semibold text-slate-700">
                  <tr>
                    <th className="p-4">University type</th>
                    <th className="p-4">AP Biology credit</th>
                    <th className="p-4">IB Biology credit</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700 bg-white">
                  <tr className="border-t border-slate-100 align-top">
                    <td className="p-4 font-semibold">US state universities</td>
                    <td className="p-4">AP-4 or 5 typically earns Bio 101 credit (4-8 credits)</td>
                    <td className="p-4">
                      HL 5+ usually earns equivalent credit; SL rarely accepted
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 align-top">
                    <td className="p-4 font-semibold">US Ivy League / top 20</td>
                    <td className="p-4">
                      AP-5 may earn placement but not always credit (varies: Harvard no credit,
                      Stanford gives credit)
                    </td>
                    <td className="p-4">
                      HL 7 treated similarly to AP-5; full Diploma 38+ may earn advanced standing
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 align-top">
                    <td className="p-4 font-semibold">UK universities (UCAS)</td>
                    <td className="p-4">
                      AP-5 accepted by most Russell Group unis; some require AP-5 in 3 subjects
                    </td>
                    <td className="p-4">
                      HL 6-7 is the standard entry requirement for biosciences and medicine; UCAS
                      points directly assigned
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 align-top">
                    <td className="p-4 font-semibold">Canadian universities</td>
                    <td className="p-4">AP-4 or 5 earns transfer credit at most universities</td>
                    <td className="p-4">
                      HL 5+ earns credit; Diploma recognized for scholarship consideration
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 align-top">
                    <td className="p-4 font-semibold">Australian universities</td>
                    <td className="p-4">
                      Accepted but less common; check individual university policy
                    </td>
                    <td className="p-4">
                      IB Diploma widely recognized; HL 6-7 earns credit at Group of Eight
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Verdict: which should you choose?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-700 mb-4">Choose AP Biology if...</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">+</span>
                    You are at a non-IB school and want rigorous college-level biology in one year
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">+</span>
                    You are targeting US universities and want widely recognized credit
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">+</span>
                    You prefer a single high-stakes exam over coursework-based assessment
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">+</span>
                    You want to pair biology prep with USABO or other olympiad pathways
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-purple-700 mb-4">Choose IB Biology if...</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-purple-500 font-bold flex-shrink-0">+</span>
                    You are enrolled in the IB Diploma Programme (IB Biology is the natural fit)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500 font-bold flex-shrink-0">+</span>
                    You are targeting UK, European, or Australian universities
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500 font-bold flex-shrink-0">+</span>
                    You enjoy independent research (the IA is a genuine scientific investigation)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500 font-bold flex-shrink-0">+</span>
                    You value a two-year deep immersion over a one-year sprint
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200">
              <p className="text-sm text-slate-700">
                <strong>If you have both options:</strong> students aiming for US medical schools or
                STEM programs generally find AP Biology more efficient (one year, clear credit
                policies). Students aiming for UK medicine or global universities generally benefit
                more from IB Biology HL within the full Diploma. If you are genuinely undecided, IB
                HL covers everything AP covers and more — the AP exam can be taken alongside IB with
                minimal additional prep.
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

        {/* Cross-links */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/ap-biology-tutor"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">AP Biology Tutor</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Score-5 prep with Campbell Biology alignment
                </p>
              </Link>
              <Link
                href="/ib-biology-tutor"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">IB Biology Tutor</h3>
                <p className="text-xs text-slate-600 mt-1">HL and SL coaching with IA guidance</p>
              </Link>
              <Link
                href="/ap-biology-vs-usabo"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">AP Biology vs USABO</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Bridge from AP-5 to USABO Semifinalist
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
