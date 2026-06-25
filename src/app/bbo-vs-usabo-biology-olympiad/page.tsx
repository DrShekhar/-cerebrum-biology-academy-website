import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const URL = 'https://cerebrumbiologyacademy.com/bbo-vs-usabo-biology-olympiad'

export const metadata: Metadata = {
  title: 'BBO vs USABO 2026 — British vs American Biology Olympiad Comparison',
  description:
    'Compare BBO (60 MCQ + 15 free-response, 2 hours) with USABO (Open: 50 MCQ, 50 min). Format, difficulty, IBO selection pathways, Campbell Biology chapters needed, and preparation overlap.',
  keywords: [
    'BBO vs USABO',
    'British Biology Olympiad vs USABO',
    'BBO USABO comparison',
    'biology olympiad UK vs USA',
    'BBO format 2026',
    'USABO Open exam',
    'IBO selection UK vs USA',
    'BBO preparation USABO overlap',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-GB': URL, 'en-US': URL },
  },
  openGraph: {
    title: 'BBO vs USABO 2026 — British vs American Biology Olympiad Comparison',
    description:
      'Two national biology olympiads, two pathways to IBO. Compare format, difficulty, selection process, and whether cross-preparation works.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BBO vs USABO 2026 — British vs American Biology Olympiad Comparison',
    description:
      'BBO vs USABO: which is harder, do they share material, and how does each lead to IBO?',
  },
}

const comparisonRows = [
  {
    dimension: 'Organiser',
    bbo: 'Royal Society of Biology (RSB), United Kingdom',
    usabo:
      'Center for Excellence in Education (CEE) / USA Biology Olympiad Committee, United States',
  },
  {
    dimension: 'Round 1 format',
    bbo: 'BBO Paper: 60 MCQ + 15 free-response (extended answer) questions. Total time: 2 hours. Taken in school under supervised conditions.',
    usabo:
      'USABO Open Exam: 50 MCQ in 50 minutes (1 question per minute). Taken in school. No free-response at this stage.',
  },
  {
    dimension: 'Eligibility',
    bbo: 'Any student enrolled in a UK secondary school (Year 12 or Year 13, typically A-Level or IB). International schools in the UK may participate.',
    usabo:
      'Any student enrolled in a US high school. International students at US schools are eligible. Students at international schools outside the US are not eligible.',
  },
  {
    dimension: 'Selection pathway to IBO',
    bbo: 'BBO (Round 1) → Top performers invited to IBO Selection Camp (residential, ~15 students) → 4 students selected for the UK IBO team.',
    usabo:
      'Open Exam → Top ~10% become Semifinalists → Semifinal Exam (theory + free-response, 3 hours) → Top ~20 become National Finalists → Selection Camp → 4 students selected for the US IBO team.',
  },
  {
    dimension: 'Number of rounds',
    bbo: '2 rounds: BBO Paper (national), then IBO Selection Camp (invitational). No intermediate Semifinal stage.',
    usabo:
      '3 rounds: Open Exam, Semifinal Exam, National Finals / Selection Camp. More stages means more filtering.',
  },
  {
    dimension: 'Difficulty ceiling',
    bbo: 'BBO MCQ questions range from GCSE-level to first-year-undergraduate. Free-response questions can reach research-paper depth. IBO Selection Camp tests approach graduate-level.',
    usabo:
      'Open Exam ranges from AP Biology level to university-introductory. Semifinal Exam reaches university second-year depth. National Finals and Selection Camp approach graduate-level, similar to BBO IBO Camp.',
  },
  {
    dimension: 'Primary reference text',
    bbo: 'Campbell Biology (full), plus A-Level Biology textbooks (AQA/OCR/CAIE). For IBO Camp: Alberts MBoC, Lehninger Biochemistry, Raven Plant Biology.',
    usabo:
      'Campbell Biology (full), Alberts MBoC (for Semifinal+), Lehninger Biochemistry. For National Finals: same as BBO IBO Camp resources.',
  },
  {
    dimension: 'Typical participant count',
    bbo: 'Approximately 8,000-10,000 students per year (UK-wide).',
    usabo: 'Approximately 10,000-12,000 students per year (US-wide).',
  },
  {
    dimension: 'Awards',
    bbo: 'Gold, Silver, Bronze, Highly Commended, Commended. Gold = top ~5%. IBO Camp invitation = top ~15 students nationally.',
    usabo:
      'Open Exam: Semifinalist (top ~10%), Honorable Mention (top ~25%). Semifinal: National Finalist (top ~20 students). IBO team = 4 students.',
  },
]

const campbellChapters = [
  {
    area: 'Cell Biology (Chapters 1-12)',
    bbo: 'Heavily tested. MCQ and free-response both cover membrane transport, organelles, cell communication, and cell cycle in detail.',
    usabo:
      'Heavily tested at all stages. Open Exam covers basics; Semifinal demands molecular-level mechanisms.',
  },
  {
    area: 'Genetics (Chapters 13-21)',
    bbo: 'Strong coverage. Free-response questions often require pedigree analysis and molecular genetics explanation.',
    usabo:
      'Core content. Open Exam tests Mendelian genetics; Semifinal adds chromatin remodeling, gene regulation, and epigenetics.',
  },
  {
    area: 'Evolution & Phylogenetics (Chapters 22-26)',
    bbo: 'Moderate. BBO tests natural selection, speciation, and basic phylogenetics. IBO Camp goes deeper into character mapping.',
    usabo:
      'Moderate at Open; significant at Semifinal. Phylogenetic analysis and taxonomy are recurring Semifinal topics.',
  },
  {
    area: 'Plant Biology (Chapters 29, 35-39)',
    bbo: 'Strong. UK A-Level includes substantial plant biology. BBO free-response regularly tests plant physiology, transport, and hormones.',
    usabo:
      'Underweighted at Open (AP Bio covers plants lightly). Semifinal tests plant anatomy, transport, and hormones more seriously.',
  },
  {
    area: 'Animal Physiology (Chapters 40-49)',
    bbo: 'Heavily tested. A-Level physiology is deep. BBO free-response includes organ system questions with histology.',
    usabo:
      'Moderate at Open. Heavy at Semifinal and National Finals — requires Campbell depth plus Guyton-level physiology for top scores.',
  },
  {
    area: 'Ecology & Behavior (Chapters 50-56)',
    bbo: 'Moderate. BBO covers population ecology, community ecology, and conservation. Ethology is tested but not as heavily as in some olympiads.',
    usabo:
      'Moderate at Open. Ethology (innate vs learned behavior, fixed action patterns) is a known USABO topic that AP Biology undercovers.',
  },
]

const faqs = [
  {
    question: 'Which is harder — BBO or USABO?',
    answer:
      'The BBO Round 1 paper is arguably harder than the USABO Open Exam because it includes 15 free-response questions alongside the 60 MCQ, and the free-response can reach first-year-undergraduate depth. The USABO Open is purely MCQ (50 questions in 50 minutes) with a tighter time constraint but no free-response. At the advanced stages, difficulty converges — both the BBO IBO Selection Camp and the USABO National Finals test at research-paper depth with practical lab components. The USABO has more selection stages (Open, Semifinal, Finals vs BBO Paper, IBO Camp), which means the filtering is more gradual.',
  },
  {
    question: 'Do BBO and USABO share preparation material?',
    answer:
      'Yes — approximately 80-85% of the biology content overlaps. Both exams are built on Campbell Biology as the primary reference. Cell biology, genetics, evolution, physiology, and ecology are core to both. The main differences are: (1) BBO leans more heavily on plant biology and A-Level-style physiology depth because UK students have stronger A-Level backgrounds in these areas, (2) USABO leans more on ethology and biosystematics at the Open/Semifinal level, and (3) the free-response writing style differs (BBO expects A-Level-style extended prose; USABO Semifinal expects research-style data analysis). A student preparing for either exam can transfer 80%+ of their knowledge to the other.',
  },
  {
    question: 'Can international students enter BBO or USABO?',
    answer:
      'BBO is restricted to students enrolled in UK secondary schools. USABO is restricted to students enrolled in US high schools. International students living in the UK or US and attending local schools are eligible for the respective olympiad. Students at international schools outside these countries should look at their own national biology olympiad — most countries have one (INBO for India, SBO for Singapore, CNBO for Canada, JBO for Japan, KBO for South Korea, ABO for Australia). We coach students across all these national olympiads.',
  },
  {
    question: 'How does the IBO selection process differ between UK and USA?',
    answer:
      'In the UK: BBO Paper (national exam) → Top ~15 students invited to an IBO Selection Camp (residential, several days, includes theory and practical tests) → 4 students selected for the UK IBO team. Two rounds total. In the USA: Open Exam (school-based MCQ) → Top ~10% become Semifinalists → Semifinal Exam (theory + free-response) → Top ~20 become National Finalists → National Finals / Selection Camp (residential, includes lab practical) → 4 students selected for the US IBO team. Three rounds total. The US system has more stages and starts with a larger pool, while the UK system jumps directly from a national paper to a small selection camp.',
  },
  {
    question: 'What is the best preparation strategy if targeting both BBO and USABO?',
    answer:
      'This situation arises for dual-national students or those moving between UK and US schools. Start with Campbell Biology cover-to-cover — this is the shared foundation for both exams. Add A-Level Biology textbook revision for plant physiology and extended-answer writing practice (BBO-specific). Add USABO past Open Exam papers for MCQ speed training and ethology review (USABO-specific). For advanced stages, both require Alberts MBoC and Lehninger Biochemistry. The IBO itself is the same exam regardless of which national team you represent, so the ultimate preparation converges. We recommend choosing one primary national olympiad based on where you are currently enrolled in school, and using the other as supplementary practice.',
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
      name: 'Biology Olympiad Coaching',
      item: 'https://cerebrumbiologyacademy.com/ibo-preparation',
    },
    { '@type': 'ListItem', position: 3, name: 'BBO vs USABO', item: URL },
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

export default function BBOvsUSABOPage() {
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
          'British Biology Olympiad (BBO)',
          'BBO Preparation',
          'USA Biology Olympiad (USABO) Preparation',
          'USABO Open Exam',
          'USABO Semifinal',
          'International Biology Olympiad (IBO) Preparation',
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
                <Link href="/ibo-preparation" className="text-gray-600 hover:text-teal-600">
                  Biology Olympiad Coaching
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">BBO vs USABO</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Biology olympiad comparison
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              BBO vs USABO 2026
              <span className="block text-yellow-400 mt-2">
                British vs American Biology Olympiad
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              The British Biology Olympiad (BBO) and the USA Biology Olympiad (USABO) are the two
              largest English-language national biology olympiads. Both are gateways to the
              International Biology Olympiad (IBO). They share most of their content base — Campbell
              Biology is the core text for both — but differ in format, selection structure, and
              what they emphasise.
            </p>
            <p className="text-base text-slate-400 mb-4 max-w-3xl">
              This guide compares exam format, difficulty at each stage, the IBO selection pathway,
              and how much preparation overlaps between the two olympiads.
            </p>
            <p className="text-sm text-slate-400 mb-8 max-w-3xl">
              We coach both routes live online — in your US time zone (ET/CT/MT/PT) or UK time
              (GMT/BST); pricing in USD or GBP.
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
              Format, eligibility, selection pathway, and difficulty at each stage.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm font-semibold text-slate-700">
                  <tr>
                    <th className="p-4 w-1/5">Dimension</th>
                    <th className="p-4 w-2/5">BBO (UK)</th>
                    <th className="p-4 w-2/5">USABO (USA)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {comparisonRows.map((row) => (
                    <tr key={row.dimension} className="border-t border-slate-100 align-top">
                      <td className="p-4 font-semibold text-slate-900">{row.dimension}</td>
                      <td className="p-4">{row.bbo}</td>
                      <td className="p-4">{row.usabo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* IBO pathway */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              The path to IBO: UK vs USA
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">UK pathway (BBO → IBO)</h3>
                <ol className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 text-white text-sm font-bold flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <strong>BBO Paper (January-February):</strong> 60 MCQ + 15 free-response, 2
                      hours. Approximately 8,000-10,000 participants. Gold, Silver, Bronze, Highly
                      Commended, Commended awards.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 text-white text-sm font-bold flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <strong>IBO Selection Camp (March-April):</strong> Top ~15 BBO performers
                      invited. Residential camp with theory tests and practical lab examinations. 4
                      students selected for the UK IBO team.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 text-white text-sm font-bold flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <strong>IBO (July):</strong> International Biology Olympiad. 4 UK team members
                      compete against ~300 students from 75+ countries. Theory (40%) + Practical
                      (60%).
                    </div>
                  </li>
                </ol>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">USA pathway (USABO → IBO)</h3>
                <ol className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <strong>Open Exam (February):</strong> 50 MCQ in 50 minutes. Approximately
                      10,000-12,000 participants. Top ~10% qualify as Semifinalists.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <strong>Semifinal Exam (March):</strong> Theory + free-response, 3 hours.
                      ~1,000 Semifinalists sit. Top ~20 become National Finalists.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <strong>National Finals / Selection Camp (May-June):</strong> Residential.
                      Theory + practical lab examinations. 4 students selected for the US IBO team.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">
                      4
                    </span>
                    <div>
                      <strong>IBO (July):</strong> Same international competition as the UK team
                      attends.
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Campbell chapters */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Campbell Biology chapters: BBO vs USABO emphasis
            </h2>
            <p className="text-slate-600 mb-8">
              Both olympiads use Campbell Biology as the primary text. Here is how the emphasis
              differs by topic area.
            </p>
            <div className="space-y-4">
              {campbellChapters.map((ch) => (
                <div key={ch.area} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3">{ch.area}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">BBO</p>
                      <p className="text-sm text-slate-700">{ch.bbo}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-700 uppercase mb-1">USABO</p>
                      <p className="text-sm text-slate-700">{ch.usabo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-purple-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Verdict: which should you prepare for?
            </h2>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <p className="text-sm text-slate-700 mb-4">
                <strong>The answer is straightforward:</strong> prepare for the olympiad of the
                country where you attend school. BBO if you are in a UK school, USABO if you are in
                a US school. Both lead to IBO, and the IBO itself is identical regardless of which
                national team you represent.
              </p>
              <p className="text-sm text-slate-700 mb-4">
                <strong>For students who have access to both</strong> (dual nationals, students
                moving between countries): the content overlap is ~80-85%. The main preparation
                difference is format — BBO includes free-response from Round 1, while USABO starts
                with pure MCQ. If you are strong at extended writing, BBO may feel more natural
                early on. If you are fast at MCQ recall, USABO Open may be easier to clear.
              </p>
              <p className="text-sm text-slate-700">
                <strong>For university admissions:</strong> BBO Gold carries weight in UK UCAS
                applications. USABO Semifinalist or Finalist carries weight in US college
                applications (Ivy League, MIT, Stanford). The credential is geographically relevant
                — UK universities recognize BBO more readily, and US universities recognize USABO
                more readily.
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
                href="/bbo-biology-olympiad-coaching"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-yellow-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">BBO Coaching</h3>
                <p className="text-xs text-slate-600 mt-1">
                  British Biology Olympiad preparation for Gold and IBO Camp
                </p>
              </Link>
              <Link
                href="/usabo-coaching"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">USABO Coaching</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Open, Semifinal, and National Finals pathway
                </p>
              </Link>
              <Link
                href="/ibo-preparation"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">IBO Preparation</h3>
                <p className="text-xs text-slate-600 mt-1">
                  International Biology Olympiad coaching for national team members
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
