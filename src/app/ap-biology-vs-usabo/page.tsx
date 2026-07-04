import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  MessageCircle,
  Microscope,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { ContextualWhatsAppLink } from '@/components/common/ContextualWhatsAppLink'

const URL = 'https://cerebrumbiologyacademy.com/ap-biology-vs-usabo'

export const metadata: Metadata = {
  title: 'AP Biology vs USABO 2026 | Difference, Overlap & Bridge Guide',
  description:
    'AP Biology and USABO share ~80% syllabus but differ sharply on depth, format, and stakes. Compare exam formats, difficulty, prep timelines, and college admissions value — and see how to bridge AP Bio prep into a USABO Semifinalist score in 6 weeks.',
  keywords: [
    'AP Biology vs USABO',
    'AP Biology to USABO',
    'AP Biology USABO comparison',
    'USABO Open Exam preparation',
    'USABO vs AP Bio',
    'is AP Biology enough for USABO',
    'AP Biology USABO bridge',
    'USABO eligibility for US students',
    'how to prepare for USABO',
    'USABO syllabus overlap AP Biology',
    'AP Biology to Biology Olympiad',
    'USABO college admissions value',
  ],
  alternates: {
    canonical: URL,
    languages: {
      en: URL,
      'en-US': URL,
    },
  },
  openGraph: {
    title: 'AP Biology vs USABO 2026 | Difference, Overlap & Bridge Guide',
    description:
      'Compare AP Biology and USABO across syllabus, format, difficulty, prep timeline, and college admissions value. Plus a 6-week bridge plan from AP-5 to USABO Semifinalist.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology vs USABO 2026 | Difference, Overlap & Bridge Guide',
    description:
      "AP-5? You're ~6 weeks from USABO Semifinalist. Here's exactly how the two exams differ — and how to bridge.",
  },
}

const comparisonRows = [
  {
    label: 'Format',
    apBio: '60 MCQ + 6 free-response questions, 3 hours',
    usabo: 'USABO Open: 50 MCQ, 50 minutes. Semifinal: theory + free-response, 3 hours',
  },
  {
    label: 'Exam date',
    apBio: 'Mid-May (College Board national date)',
    usabo: 'Open: 1st–2nd week of February. Semifinal: mid-March',
  },
  {
    label: 'Eligibility',
    apBio: 'Any student enrolled in AP Biology (worldwide)',
    usabo: 'Currently enrolled in a US high school (USABO is restricted to US schools)',
  },
  {
    label: 'Pass / qualifying mark',
    apBio: 'Score 5 = ~10–12% of test-takers',
    usabo: 'Open → Semifinal: top ~10% of registrants. Semifinal → Finalist: top ~20 students',
  },
  {
    label: 'Primary text',
    apBio: 'Campbell Biology (~12 chapters at AP depth)',
    usabo:
      'Campbell Biology (all chapters, deeper) + Alberts Molecular Biology of the Cell + Lehninger Biochemistry',
  },
  {
    label: 'Lab / practical',
    apBio: '13 required AP labs (school-administered)',
    usabo:
      'No practical at Open/Semifinal stage. National Finals + IBO selection camp include lab work',
  },
  {
    label: 'Cost to take',
    apBio: '$98 per exam (College Board)',
    usabo: 'Open: free for students at registered USABO schools. Schools pay a small admin fee',
  },
  {
    label: 'College admissions weight',
    apBio: 'Standard expected rigor; AP-5 is competitive but common',
    usabo:
      'Semifinalist / Finalist is a national distinction — rare and routinely cited in successful Ivy / MIT / Stanford applications for STEM',
  },
]

const sharedTopics = [
  {
    unit: 'Cell Biology & Energetics',
    coverage:
      'Membrane structure, transport, signal transduction, photosynthesis, respiration, enzymes',
    overlap: '~95%',
  },
  {
    unit: 'Molecular Genetics',
    coverage:
      'DNA replication, transcription, translation, mutation, regulation. USABO goes deeper into chromatin remodeling, RNA processing details',
    overlap: '~85%',
  },
  {
    unit: 'Mendelian + Population Genetics',
    coverage: 'Punnett squares, linkage, Hardy-Weinberg, evolution',
    overlap: '~95%',
  },
  {
    unit: 'Animal Form & Function',
    coverage:
      'Endocrine, nervous, immune, circulatory, digestive systems. USABO requires more histology and species-specific anatomy',
    overlap: '~75%',
  },
  {
    unit: 'Plant Form & Function',
    coverage:
      'Tissues, transport, nutrition, hormones. USABO expects deeper anatomy and more taxonomy',
    overlap: '~75%',
  },
  {
    unit: 'Ecology',
    coverage: 'Population, community, ecosystem, biodiversity',
    overlap: '~90%',
  },
  {
    unit: 'Ethology / Behavior',
    coverage:
      'Light coverage in AP. USABO Open and Semifinal include classic ethology questions (innate vs learned, fixed action patterns)',
    overlap: '~40%',
  },
  {
    unit: 'Biosystematics & Evolution',
    coverage:
      'AP covers core evolution. USABO probes phylogenetics, character mapping, taxonomic classification more rigorously',
    overlap: '~60%',
  },
]

const sixWeekPlan = [
  {
    weeks: 'Weeks 1–2',
    focus: 'Fill the AP gap',
    activities: [
      'Cover ethology, biosystematics, and plant/animal physiology depth that AP underweights',
      'Read Campbell chapters 49–56 (animal physiology) closely — note histology figures',
      'Solve USABO Open 2018–2024 to gauge MCQ pacing (50 Qs in 50 mins ≈ 1 min/Q)',
    ],
  },
  {
    weeks: 'Weeks 3–4',
    focus: 'Past-paper drills',
    activities: [
      'Time-boxed Open papers daily — track wrong answers by topic',
      'Move to Semifinal-style free-response: data interpretation, experimental design',
      'Add Alberts MBoC for molecular biology depth (chapters 4–8 most important)',
    ],
  },
  {
    weeks: 'Weeks 5–6',
    focus: 'Sharpen + simulate',
    activities: [
      '2 full Open simulations under exam conditions',
      'Targeted revision on weakest 3 topics from drill data',
      'Light reading on classic ethology + biostats (1-way ANOVA, chi-square reading)',
    ],
  },
]

const collegeValue = [
  {
    label: 'AP Biology score 5',
    line: 'Expected for STEM applicants to selective colleges. Strong but common.',
  },
  {
    label: 'USABO Open Honorable Mention',
    line: 'Top ~25% of registrants. Solid first-time-taker badge. Worth listing on Common App activities.',
  },
  {
    label: 'USABO Semifinalist',
    line: 'Top ~10% nationally. National-distinction tier. Routinely cited in successful Ivy, MIT, Stanford, JHU STEM applications.',
  },
  {
    label: 'USABO Finalist (top ~20)',
    line: 'Invited to the USA team selection camp. Major signal — admissions readers recognize "Finalist" as elite.',
  },
  {
    label: 'IBO Team / Medal',
    line: 'One of 4 students representing the United States. Globally elite credential — comparable to top USAMO performers.',
  },
]

const faqs = [
  {
    question: 'Is AP Biology enough to clear the USABO Open Exam?',
    answer:
      'For students scoring AP-5, our data suggests around 60-70% of the Open Exam can be solved using AP Biology mastery alone. The remaining 30-40% requires depth in ethology, biosystematics, plant/animal histology, and molecular detail not stressed in AP. With 6 weeks of focused bridge work, AP-5 students routinely cross the Open cutoff into Semifinalist range.',
  },
  {
    question: 'When should I take the USABO Open Exam?',
    answer:
      'USABO Open is held during the first or second week of February. Students typically take it in 11th or 12th grade, after completing AP Biology or while taking it. Taking USABO in the same year as your AP Biology exam (Feb USABO → May AP) is the most efficient timeline because the prep overlaps.',
  },
  {
    question: 'Can international students take USABO?',
    answer:
      'No. USABO is restricted to students currently enrolled in a US high school. International students should look at their national olympiad — BBO (United Kingdom), INBO (India), SBO (Singapore), CNBO (Canada), JBO (Japan), KBO (South Korea) — which we also coach.',
  },
  {
    question: 'What is the most important reference book beyond Campbell?',
    answer:
      'For Open Exam, Campbell Biology (12th edition) covers most of what you need. For Semifinal and beyond, the standard reference set is Alberts (Molecular Biology of the Cell) for cellular and molecular depth, Lehninger (Principles of Biochemistry) for metabolism and enzyme kinetics, and Raven & Johnson (Biology) for taxonomic / botanical breadth. We provide structured chapter-by-chapter study plans across all three.',
  },
  {
    question: 'How is USABO different from the AP Biology free-response section?',
    answer:
      'AP Biology free-response questions test conceptual understanding with relatively straightforward biology — typical questions ask you to interpret a graph, design an experiment at a basic level, or explain a process. USABO Semifinal free-response routinely presents primary research scenarios — you analyze unfamiliar experimental data, propose mechanisms, and reason about novel systems. The depth of biology is higher and the analytical demand is closer to first-year graduate work.',
  },
  {
    question: 'How much does USABO add to a college application compared to just AP Biology?',
    answer:
      'AP-5 in Biology demonstrates expected rigor for selective STEM applications. USABO Semifinalist is a national-tier distinction earned by roughly 0.5-1% of US high school biology students. Admissions officers at top schools recognize the difference. For students applying to Ivy League schools, MIT, Stanford, Johns Hopkins, or other elite STEM programs, USABO Semifinalist or Finalist standing is a meaningful differentiator that AP-5 alone is not.',
  },
  {
    question: 'Can I prepare for USABO and AP Biology simultaneously?',
    answer:
      'Yes — and this is the optimal strategy. About 80% of the curriculum overlaps. The Feb USABO date naturally precedes the May AP Biology date, so students who prep for USABO arrive at AP with a deeper-than-needed foundation. Our combined coaching tracks both exams in parallel: foundation Aug-Jan, USABO drills Jan-Feb, AP-specific exam tactics Mar-May.',
  },
  {
    question: 'What if I miss the Semifinalist cutoff in 11th grade?',
    answer:
      'Take it again in 12th grade. Many USA Finalists qualified on their second or third attempt. The Open Exam is offered annually, and a year of additional reading (Alberts molecular biology, ecology depth, ethology) typically lifts students 15-25 percentile points.',
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
      name: 'USABO Coaching',
      item: 'https://cerebrumbiologyacademy.com/usabo-coaching',
    },
    { '@type': 'ListItem', position: 3, name: 'AP Biology vs USABO', item: URL },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AP Biology vs USABO: Difference, Overlap & Bridge Guide',
  description:
    'Detailed comparison of AP Biology and the USA Biology Olympiad — exam formats, syllabus overlap, difficulty, prep timeline, and college admissions value. Includes a 6-week bridge plan from AP-5 to USABO Semifinalist.',
  url: URL,
  inLanguage: 'en-US',
  author: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cerebrumbiologyacademy.com/logo.png',
    },
  },
  datePublished: '2026-04-29',
  dateModified: '2026-06-08',
  about: [
    { '@type': 'Thing', name: 'AP Biology' },
    { '@type': 'Thing', name: 'USABO' },
    { '@type': 'Thing', name: 'USA Biology Olympiad' },
    { '@type': 'Thing', name: 'College Admissions' },
  ],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType:
      'USA-based high school students enrolled in AP Biology and considering the USA Biology Olympiad (USABO) pathway',
  },
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

export default function APBiologyVsUSABOPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                <Link href="/usabo-coaching" className="text-gray-600 hover:text-teal-600">
                  USABO Coaching
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">AP Biology vs USABO</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              For US high-school students
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              AP Biology vs USABO:
              <span className="block text-yellow-400 mt-2">Difference, Overlap & Bridge Guide</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              AP Biology and the USA Biology Olympiad share roughly 80% of their content but differ
              sharply on depth, format, and what they signal to college admissions officers. If
              you&apos;re aiming for AP-5, you are about{' '}
              <strong>six weeks of focused prep away</strong> from a USABO Semifinalist score — a
              credential a small fraction of US biology students earn.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              This guide breaks down every meaningful difference (format, difficulty, eligibility,
              syllabus weight, college admissions weight), shows where AP Biology gives you a head
              start, and lays out the exact 6-week plan to convert that head start into USABO
              standing.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition">
                <MessageCircle className="w-5 h-5" />
                Talk to a USABO coach
              </ContextualWhatsAppLink>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                See USABO programme
              </Link>
            </div>
          </div>
        </section>

        {/* Quick comparison */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              At-a-glance comparison
            </h2>
            <p className="text-slate-600 mb-8">
              The factual differences in one table. Detail on each row in the sections below.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm font-semibold text-slate-700">
                  <tr>
                    <th className="p-4 w-1/5">Dimension</th>
                    <th className="p-4 w-2/5">AP Biology</th>
                    <th className="p-4 w-2/5">USABO</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="border-t border-slate-100 align-top">
                      <td className="p-4 font-semibold text-slate-900">{row.label}</td>
                      <td className="p-4">{row.apBio}</td>
                      <td className="p-4">{row.usabo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Syllabus overlap */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-7 h-7 text-teal-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Where AP Biology and USABO actually overlap
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              Both exams sit on top of Campbell Biology. The honest answer to &quot;is AP Biology
              enough?&quot; is unit-by-unit. Here&apos;s our internal mapping:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {sharedTopics.map((topic) => (
                <div
                  key={topic.unit}
                  className="bg-white rounded-xl p-5 shadow-sm border border-slate-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-slate-900">{topic.unit}</h3>
                    <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                      {topic.overlap}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{topic.coverage}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-slate-700">
                <strong>Read the gaps, not the average.</strong> The biggest delta isn&apos;t cell
                biology or genetics (where AP is solid) — it&apos;s ethology, biosystematics, and
                plant/animal physiology depth. Those three units typically account for the
                difference between a top-AP student and a USABO Semifinalist.
              </p>
            </div>
          </div>
        </section>

        {/* Difficulty + format */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Microscope className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Why USABO feels harder than the AP — even on overlapping topics
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <Clock className="w-6 h-6 text-purple-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Pace</h3>
                <p className="text-sm text-slate-600">
                  AP Biology MCQ section gives ~96 seconds per question. USABO Open gives 60
                  seconds. That extra third of a minute is where most AP-5 students lose points —
                  not on knowledge, on speed.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <Target className="w-6 h-6 text-purple-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Question style</h3>
                <p className="text-sm text-slate-600">
                  AP MCQs test conceptual recall plus simple application. USABO MCQs are often
                  experimental — &quot;here is a research figure you have not seen before; what can
                  you infer?&quot; Reading-the-figure skill matters as much as biology.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <TrendingUp className="w-6 h-6 text-purple-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Depth ceiling</h3>
                <p className="text-sm text-slate-600">
                  AP caps at college-introductory depth. USABO Semifinal probes molecular
                  mechanisms, ethology classification, and biostatistical interpretation closer to
                  first-year-graduate work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-7 h-7 text-teal-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                The natural timeline: USABO Feb → AP May
              </h2>
            </div>
            <p className="text-slate-600 mb-6 max-w-3xl">
              Both exams fit comfortably in a single junior or senior year. USABO Open in February
              forces deep prep early; AP in May then becomes a lighter exam-tactics run because the
              biology is already there.
            </p>
            <ol className="space-y-3 max-w-3xl">
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <strong className="text-slate-900">August–November:</strong>{' '}
                  <span className="text-slate-700">
                    Foundation. Campbell Biology end-to-end. AP Bio class moves at the same pace.
                  </span>
                </div>
              </li>
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <strong className="text-slate-900">December–January:</strong>{' '}
                  <span className="text-slate-700">
                    USABO bridge — fill ethology, biosystematics, plant/animal histology gaps. Drill
                    USABO Open past papers (2018–present).
                  </span>
                </div>
              </li>
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <strong className="text-slate-900">February:</strong>{' '}
                  <span className="text-slate-700">
                    USABO Open. Semifinalists move to dedicated Semifinal prep.
                  </span>
                </div>
              </li>
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <div>
                  <strong className="text-slate-900">March:</strong>{' '}
                  <span className="text-slate-700">
                    USABO Semifinal (theory + free-response). National Finalists invited to the team
                    selection camp.
                  </span>
                </div>
              </li>
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center">
                  5
                </span>
                <div>
                  <strong className="text-slate-900">April–May:</strong>{' '}
                  <span className="text-slate-700">
                    AP Biology exam tactics — pacing, FRQ structure, reading rubrics. The biology is
                    already done.
                  </span>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* 6-week bridge plan */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-7 h-7 text-orange-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                The 6-week AP-to-USABO bridge plan
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              For students who&apos;ve completed (or are on track for) AP-5 and now want to take
              USABO seriously. Six weeks of structured prep, ~10 hrs/week, on top of school.
            </p>
            <div className="space-y-4">
              {sixWeekPlan.map((block) => (
                <div
                  key={block.weeks}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-6 mb-3">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold uppercase px-3 py-1 rounded-full mb-2 md:mb-0">
                      {block.weeks}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{block.focus}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {block.activities.map((a) => (
                      <li key={a} className="flex gap-2">
                        <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* College admissions value */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-7 h-7 text-yellow-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                What each credential signals to college admissions
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              The honest hierarchy. We are summarising what admissions readers at top STEM schools
              have publicly said about each tier, not what we think they should think.
            </p>
            <div className="space-y-3">
              {collegeValue.map((item, idx) => (
                <div
                  key={item.label}
                  className="flex gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-yellow-400 text-sm font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.label}</h3>
                    <p className="text-sm text-slate-700 mt-1">{item.line}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white rounded-xl border border-slate-200 open:shadow-md"
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

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to bridge from AP Biology to USABO?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We coach the full pathway in US time zones — Open Exam, Semifinal, and the IBO
              selection camp for Finalists.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition">
                <MessageCircle className="w-5 h-5" />
                Book a free counselling call
              </ContextualWhatsAppLink>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                See USABO programme
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link
                href="/usabo-coaching"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">USABO Coaching</h3>
                <p className="text-xs text-slate-600 mt-1">Open + Semifinal + Finals pathway</p>
              </Link>
              <Link
                href="/ap-biology-online-tutor"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">AP Biology Tutor</h3>
                <p className="text-xs text-slate-600 mt-1">Score-5 prep aligned to Campbell</p>
              </Link>
              <Link
                href="/ibo-preparation"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">IBO Preparation</h3>
                <p className="text-xs text-slate-600 mt-1">
                  After USABO Finalist — international stage
                </p>
              </Link>
              <Link
                href="/campbell-biology"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">Campbell Biology</h3>
                <p className="text-xs text-slate-600 mt-1">56 chapter-by-chapter guides</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
