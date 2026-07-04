import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flame,
  MessageCircle,
  Phone,
  Target,
} from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-hl-crash-course'

export const metadata: Metadata = {
  title: 'IB Biology HL Crash Course | 4-Week Pre-Exam Intensive | Cerebrum',
  description:
    'IB Biology HL crash course — 4-week pre-exam intensive covering AHL topics, Paper 1 MC strategy, Paper 2 extended response, and timed mocks. Designed for May-exam HL candidates.',
  keywords: [
    'IB Biology HL crash course',
    'IB Biology HL revision course',
    'IB Biology HL exam prep',
    'IB Biology HL May exam intensive',
    'IB Biology HL last minute revision',
    'IB Biology HL 4 week course',
    'IB Biology HL Paper 1 practice',
    'IB Biology HL Paper 2 strategy',
    'AHL topic revision IB Biology',
    'IB Biology HL mock exams',
    'IB Biology HL pre exam course',
    'IB Biology HL tutor intensive',
    'IB Biology HL April revision',
    'IB Biology HL boot camp',
    'IB Biology HL 7 in 4 weeks',
  ],
  openGraph: {
    title: 'IB Biology HL Crash Course — 4-Week Pre-Exam Intensive',
    description:
      'Week-by-week HL revision plan: AHL topics, Paper 1 + Paper 2 strategy, 8+ past papers, examiner-style feedback.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology HL Crash Course — 4-Week Pre-Exam Intensive',
    description:
      'AHL revision, Paper 1 + Paper 2 strategy, 8+ timed mocks. Built for April–May HL candidates.',
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-US': PAGE_URL,
      en: PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const hlCrashFAQs = [
  {
    question: 'When should I start the IB Biology HL crash course?',
    answer:
      'The 4-week intensive is built for the final stretch — typically starting in the first week of April for May-session HL candidates, or the first week of October for November-session candidates. Starting earlier than 6 weeks out blunts the urgency; starting later than 3 weeks leaves no time for two full Paper 2 mocks under timed conditions.',
  },
  {
    question: 'How is the HL crash course different from the SL version?',
    answer:
      'HL candidates sit additional higher-level (AHL) content that SL students do not — themes such as A1.2 nucleic acid structure depth, B2.3 transport, C1.2 enzymes and metabolism extensions, C4.2 ecosystem stability, and D3.3 homeostasis extensions. HL Paper 1 has 40 questions in 1 hour (vs SL 30 in 45 min) and HL Paper 2 includes a section with extended-response questions worth 9–15 marks each. The HL course allocates Week 1 entirely to AHL drill and gives twice the Paper 2 essay practice.',
  },
  {
    question: 'Is the crash course delivered live or recorded?',
    answer:
      'All teaching sessions are delivered live online — typically 12 hours per week of small-group instruction (3–6 students per batch) plus 1:1 add-on slots. Sessions are recorded so students can revisit any topic, but the live format is non-negotiable for the timed mocks because we mark them under exam conditions and debrief in real time.',
  },
  {
    question: 'How many past papers does the HL course cover?',
    answer:
      'Eight full past papers under exam conditions: four Paper 1 sittings (1A multiple choice + 1B data-based) and four Paper 2 sittings, all with examiner-style annotated marking. Additional topic-specific past-paper questions are sequenced into daily revision, bringing the total to 200+ past-paper questions across the four weeks.',
  },
  {
    question: 'Can I join the HL crash course if my school has not finished the syllabus?',
    answer:
      'Yes, but with a caveat. We run a 90-minute diagnostic in the first week to identify any AHL topics your school skipped or rushed (Topic D3.3 homeostasis and C4.2 ecosystem stability are the most commonly under-taught). Missing content is filled in via targeted 1:1 sessions added to the standard schedule. If more than three AHL themes are entirely uncovered, we recommend the 6-week extended option instead.',
  },
  {
    question: 'What if my exam is less than 3 weeks away?',
    answer:
      'A compressed 2- or 3-week sprint is available for late starters. The trade-off: less time to consolidate AHL content, so the sprint prioritises Paper 1 multiple choice (highest mark-per-minute return) and Paper 2 command-term drill. Honest expectation-setting: a 2-week sprint can move a predicted 5 to a 6, but moving a 5 to a 7 is unrealistic in that window without prior strong foundations.',
  },
]

const hlWeeklyPlan = [
  {
    week: 'Week 1',
    title: 'AHL Topic Revision — High-Yield Additional HL Content',
    summary:
      'AHL questions appear primarily in Section B of Paper 2 and in roughly 25% of Paper 1A. We hit the highest-return AHL themes first.',
    bullets: [
      'Theme A1.2 — nucleic acids: directionality of DNA, semiconservative replication, RNA processing depth',
      'Theme B2.3 — transport: water and mineral uptake, transpiration, mass flow hypothesis, blood flow regulation',
      'Theme C1.2 — enzymes & metabolism: induced-fit model, cofactors, metabolic pathway control, inhibition kinetics',
      'Theme C4.2 — ecosystem stability: tipping points, ecological succession depth, carbon cycle feedback loops',
      'Theme D3.3 — homeostasis: thermoregulation extensions, osmoregulation in the nephron, hormonal feedback loops',
      'Daily 20-question AHL recall quiz to consolidate before moving on',
    ],
  },
  {
    week: 'Week 2',
    title: 'Paper 1 — Multiple Choice + Data Response Mastery',
    summary:
      'Paper 1A (40 MCQ, 60 min) and Paper 1B (data response, 60 min) sit back to back. Speed and pattern recognition decide the band.',
    bullets: [
      'MCQ pattern coaching: double-negative stems, "EXCEPT" stems, distractor families, all-of-the-above traps',
      '4 timed full Paper 1A mocks under exam conditions with immediate examiner-style debrief',
      'Paper 1B data drill: figure-reading sequence, unit-checking discipline, calculation cross-checks',
      'Data-booklet familiarisation: statistical formulas, amino acid reference table, electromagnetic spectrum chart',
      'Topic mapping: every wrong answer back-mapped to the syllabus statement that needs reinforcing',
    ],
  },
  {
    week: 'Week 3',
    title: 'Paper 2 — Data Analysis + Extended Response',
    summary:
      'HL Paper 2 is where 7-grade candidates separate themselves. Section A is data-driven; Section B is extended response of 9–15 marks per question.',
    bullets: [
      'Extended response architecture: claim, mechanism, evidence, exception — the 4-move template',
      'Command term decoding: outline vs describe vs explain vs evaluate vs discuss (each is worth different marks)',
      'IB rubric application: how examiners award marks for biology depth vs writing structure',
      '4 timed full Paper 2 mocks with question-by-question annotated marking',
      'Synoptic question practice: questions that span two or more themes (the hallmark of HL Paper 2)',
      'Diagram drawing drills — labelled diagrams that examiners credit (vs sketches that lose marks)',
    ],
  },
  {
    week: 'Week 4',
    title: 'Practical Skills, Command Terms, Exam-Day Mental Prep',
    summary:
      'Final week consolidates everything and rehearses the exam day itself. No new content — only refinement and confidence.',
    bullets: [
      'Practical/lab question drilling: experimental design, variable identification, error analysis',
      'Command-term flash cycles — 30-minute timed recall under pressure',
      'Mistake audit: a full review of every question missed in Weeks 1–3, sorted by error type',
      'Mock exam day simulation: full Paper 1 + Paper 2 sat in one morning with realistic breaks',
      'Exam-day routine planning: sleep, food, paper layout reading, time-management triggers',
      'Final 1:1 confidence session to address remaining weak spots',
    ],
  },
]

function CourseSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'IB Biology HL Crash Course — 4-Week Pre-Exam Intensive',
    description:
      'A 4-week intensive revision course for IB Biology Higher Level candidates preparing for the May or November exam session. Covers AHL topic revision, Paper 1 multiple choice strategy, Paper 2 extended response, practical questions, and timed full-length mock papers.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: 'High School',
    timeRequired: 'PT4W',
    inLanguage: 'en',
    availableLanguage: ['English'],
    courseMode: 'online',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT20H',
      inLanguage: 'en',
    },
    about: [
      'IB Biology Higher Level',
      'AHL topic revision',
      'Paper 1 multiple choice',
      'Paper 2 extended response',
      'IB exam strategy',
    ],
    url: PAGE_URL,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

const whatsappMessage = encodeURIComponent(
  "Hi! I'm interested in the IB Biology HL 4-week crash course. Please share batch dates and pricing."
)
const whatsappUrl = `https://wa.me/918826444334?text=${whatsappMessage}`

export default function IBBiologyHLCrashCoursePage() {
  return (
    <>
      <CourseSchema />
      <FAQSchema questions={hlCrashFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology Resources', href: '/ib-biology-tutor' },
          { label: 'HL Crash Course', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16 text-white sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-red-500 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ib-biology-tutor" className="hover:text-white">
                    IB Biology Resources
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  HL Crash Course
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-300">
              <Flame className="h-4 w-4" />
              April–May Pre-Exam Intensive
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              IB Biology HL Crash Course
              <span className="mt-2 block text-orange-400">4-Week Pre-Exam Intensive</span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg text-gray-300 sm:text-xl">
              For Higher Level candidates 4 to 6 weeks out from the IB exam. Week-by-week revision
              of AHL content, Paper 1 and Paper 2 strategy, eight timed past papers with examiner
              feedback, and a daily WhatsApp doubt channel. Built for the April panic — not for
              casual revision.
            </p>

            <div className="flex flex-col gap-4 md:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600"
              >
                <MessageCircle className="h-5 w-5" />
                Reserve a Seat on WhatsApp
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
              >
                <Phone className="h-5 w-5" />
                Call +91 88264-44334
              </a>
            </div>
          </div>
        </section>

        {/* Who this is for */}
        <section className="border-b border-gray-200 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Who This HL Crash Course Is For
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              The 4-week HL crash course is built for a specific student in a specific window. If
              you are not in this window, talk to us first before joining — we would rather you take
              the right course than the most expensive one.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-green-900">
                  <CheckCircle2 className="h-5 w-5" />
                  Right fit if you are
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>An HL candidate 4–6 weeks from your May or November exam</li>
                  <li>Currently predicted between 4 and 6, targeting a 6 or 7</li>
                  <li>Comfortable with Themes A–D core but shaky on AHL content</li>
                  <li>Losing marks on Paper 2 extended response — not on content recall</li>
                  <li>Able to commit 12 hours per week of live time plus 8 hours self-study</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-yellow-900">
                  <Target className="h-5 w-5" />
                  Better options if you are
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>Earlier than 6 weeks out — take the full-year HL programme instead</li>
                  <li>
                    Currently predicted 2 or 3 — needs foundational reteaching, not crash revision
                  </li>
                  <li>An SL student — see the SL crash course (different syllabus depth)</li>
                  <li>Targeting EE or IA support — see the IA cluster of pages</li>
                  <li>Unable to commit 20 hours per week — sprint format is more demanding</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Week-by-week */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              What 4 Weeks of HL Crash Course Actually Covers
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              No vague "complete revision" promises. Below is the literal schedule we run, honed
              across multiple May exam sessions of HL candidates.
            </p>

            <div className="space-y-6">
              {hlWeeklyPlan.map((wk) => (
                <article
                  key={wk.week}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="mb-3 flex flex-wrap items-baseline gap-3">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                      {wk.week}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{wk.title}</h3>
                  </div>
                  <p className="mb-4 text-gray-700">{wk.summary}</p>
                  <ul className="space-y-2">
                    {wk.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-gray-800">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HL vs SL exam differences */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              HL-Specific Exam Differences vs SL
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              Higher Level is not just more content — it is a structurally different exam. The crash
              course is calibrated to these differences. Below is the literal format you will sit in
              May or November.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Component</th>
                    <th className="px-4 py-3 font-semibold">HL</th>
                    <th className="px-4 py-3 font-semibold">SL (for reference)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Paper 1A (MCQ)</td>
                    <td className="px-4 py-3">40 questions · 1 hour</td>
                    <td className="px-4 py-3">30 questions · 45 minutes</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Paper 1B (data)</td>
                    <td className="px-4 py-3">4 data sets · 1 hour</td>
                    <td className="px-4 py-3">3 data sets · 45 minutes</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Paper 2</td>
                    <td className="px-4 py-3">Section A data + Section B extended (2 h 30 min)</td>
                    <td className="px-4 py-3">Section A data + Section B short (1 h 15 min)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">AHL content</td>
                    <td className="px-4 py-3">Assessed in MCQ + Paper 2 Section B</td>
                    <td className="px-4 py-3">Not assessed</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Internal Assessment</td>
                    <td className="px-4 py-3">20% of grade — same rubric as SL</td>
                    <td className="px-4 py-3">20% of grade</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Sample schedule */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Sample Weekly Schedule
            </h2>
            <p className="mb-8 text-lg text-gray-700">
              12 hours of live small-group sessions per week, plus 8 hours of guided self-directed
              practice with daily WhatsApp doubt access. All times below in IST — sessions adapt for
              North America, Europe, and East Asia time zones.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Day</th>
                    <th className="px-4 py-3 font-semibold">Live Session</th>
                    <th className="px-4 py-3 font-semibold">Self-Study Block</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Mon</td>
                    <td className="px-4 py-3">AHL theme deep-dive (2 h)</td>
                    <td className="px-4 py-3">AHL recall quiz (1 h)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Tue</td>
                    <td className="px-4 py-3">Paper 1A drill (2 h)</td>
                    <td className="px-4 py-3">Past-paper questions (1 h 30 min)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Wed</td>
                    <td className="px-4 py-3">Paper 1B data analysis (2 h)</td>
                    <td className="px-4 py-3">Data booklet drill (1 h)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Thu</td>
                    <td className="px-4 py-3">Paper 2 Section A coaching (2 h)</td>
                    <td className="px-4 py-3">Diagram drawing drill (1 h 30 min)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Fri</td>
                    <td className="px-4 py-3">Paper 2 Section B extended-response writing (2 h)</td>
                    <td className="px-4 py-3">Command-term flash review (1 h)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Sat</td>
                    <td className="px-4 py-3">Timed mock paper (2 h)</td>
                    <td className="px-4 py-3">Mock self-review with mark scheme (1 h)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Sun</td>
                    <td className="px-4 py-3">Examiner-style mock debrief (1:1, 45 min)</td>
                    <td className="px-4 py-3">Catch-up + WhatsApp doubt clearing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What you'll get */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">What You Will Get</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: CalendarDays,
                  title: '12 hours of live small-group teaching per week',
                  body: 'Batches of 3 to 6 students — large enough for peer discussion, small enough that every student answers questions every session.',
                },
                {
                  icon: Target,
                  title: '8+ timed full past papers',
                  body: 'Four Paper 1 sittings plus four Paper 2 sittings, all marked with examiner-style annotated feedback within 48 hours.',
                },
                {
                  icon: MessageCircle,
                  title: 'Daily WhatsApp doubt channel',
                  body: 'Direct access to your subject tutor between sessions for question clarification, with replies within 4 hours on weekdays.',
                },
                {
                  icon: Clock,
                  title: 'Personal mistake audit',
                  body: 'Every wrong answer across the 4 weeks is logged, tagged by syllabus statement, and reviewed before your exam.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-700">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">Pricing</h2>
            <p className="mb-4 text-lg text-gray-700">
              The HL 4-week intensive is priced between USD 1,500 and USD 2,500 depending on format.
              Small-group (3–6 students) sits at the lower end; 1:1 examiner-led format with the
              same examiner across all four weeks sits at the upper end.
            </p>
            <p className="mb-4 text-lg text-gray-700">
              Pricing includes all live sessions, marked mock papers, personal mistake audit, and
              WhatsApp doubt access for the full four weeks. There are no hidden add-ons for
              materials or recordings.
            </p>
            <p className="mb-6 text-lg text-gray-700">
              Need the full pricing matrix including hourly elite tutoring, group batch, and
              year-long programme rates? See the dedicated pricing page.
            </p>
            <Link
              href="/ib-biology-tutor"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
            >
              See full IB Biology pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              HL Crash Course — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {hlCrashFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-orange-600 group-open:rotate-180 transition-transform">
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
            <p className="mb-4 text-sm uppercase tracking-wide text-gray-500">Related resources</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/ib-biology-sl-crash-course"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-700"
              >
                SL Crash Course
              </Link>
              <Link
                href="/ib-biology-hl-vs-sl"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-700"
              >
                HL vs SL Decision Guide
              </Link>
              <Link
                href="/ib-biology-paper-1-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-700"
              >
                Paper 1 Guide
              </Link>
              <Link
                href="/ib-biology-paper-2-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-700"
              >
                Paper 2 Guide
              </Link>
              <Link
                href="/ib-biology-past-papers"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-700"
              >
                Past Papers Hub
              </Link>
              <Link
                href="/ib-biology-tutor"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-700"
              >
                Browse all IB Biology resources
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Seats Close 10 Days Before Each Cohort
            </h2>
            <p className="mb-8 text-lg text-orange-100">
              Small-group cohorts cap at 6 students. Once the seat is gone, the next cohort is one
              week later — which can be too late for May candidates. Reserve via WhatsApp now.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-orange-700 shadow-lg hover:bg-orange-50"
              >
                <MessageCircle className="h-6 w-6" />
                Reserve via WhatsApp
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/40 px-8 py-4 text-lg font-semibold text-white hover:border-white/80"
              >
                <Phone className="h-5 w-5" />
                +91 88264-44334
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
