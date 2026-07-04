import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flame,
  MessageCircle,
  Phone,
  Target,
} from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-sl-crash-course'

export const metadata: Metadata = {
  title: 'IB Biology SL Crash Course | 4-Week Pre-Exam Intensive | Cerebrum',
  description:
    'IB Biology SL crash course — 4-week pre-exam intensive on core Themes A–D, Paper 1 multiple choice, Paper 2 data response, command terms, and timed mocks. Built for May SL candidates.',
  keywords: [
    'IB Biology SL crash course',
    'IB Biology SL revision course',
    'IB Biology SL exam prep',
    'IB Biology SL May exam intensive',
    'IB Biology SL last minute revision',
    'IB Biology SL 4 week course',
    'IB Biology SL Paper 1 practice',
    'IB Biology SL Paper 2 strategy',
    'IB Biology SL command terms',
    'IB Biology SL mock exams',
    'IB Biology SL pre exam course',
    'IB Biology SL tutor intensive',
    'IB Biology SL April revision',
    'IB Biology SL boot camp',
    'IB Biology SL 6 to 7',
  ],
  openGraph: {
    title: 'IB Biology SL Crash Course — 4-Week Pre-Exam Intensive',
    description:
      'Week-by-week SL revision plan: Themes A–D, Paper 1 + Paper 2 strategy, 6+ past papers, examiner-style feedback.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology SL Crash Course — 4-Week Pre-Exam Intensive',
    description:
      'Core Themes A–D revision, Paper 1 + Paper 2 strategy, 6+ timed mocks. Built for April–May SL candidates.',
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

const slCrashFAQs = [
  {
    question: 'How is the SL crash course different from the HL version?',
    answer:
      'Standard Level candidates do not sit Additional Higher Level (AHL) content, so the SL crash course skips the AHL drill entirely and spends that time on Themes A–D consolidation and Paper 2 command-term work. SL Paper 1A has 30 questions in 45 minutes (vs HL 40 in 60 min) and SL Paper 2 is 1 hour 15 minutes without extended-response essays. The SL course allocates 10 hours of live teaching per week instead of 12.',
  },
  {
    question: 'I am predicted a 6 — can the crash course push me to a 7?',
    answer:
      'Often yes, but it depends on where the marks are leaking. If you are at 6 because of time mismanagement on Paper 2 or command-term confusion, the crash course directly fixes those. If you are at 6 because of genuine content gaps in Themes A–D, four weeks is enough to close most of them with disciplined daily practice. If you are at 6 because of exam anxiety or careless errors, the timed mocks plus debriefs are the highest-impact intervention.',
  },
  {
    question: 'Do I really need to do all the past papers?',
    answer:
      'Yes. Past papers are the single strongest predictor of grade improvement in the final month. Reading notes and watching videos feels productive but produces a much smaller jump than sitting timed past papers and reviewing each mistake. The SL course mandates 6 full timed past papers across the 4 weeks — three Paper 1 sittings and three Paper 2 sittings.',
  },
  {
    question: 'Will the crash course cover the Internal Assessment (IA)?',
    answer:
      'No — the IA submission deadline (typically late March for May candidates) is before the crash course begins. If you are still working on your IA, see the dedicated IA cluster of pages before joining the crash course. The crash course assumes your IA is finalised and focuses exclusively on written exam preparation.',
  },
  {
    question: 'What if my school skipped or rushed Theme C or Theme D?',
    answer:
      'A diagnostic in the first session identifies any major content gaps. Theme C (interaction and interdependence) and Theme D (continuity and change) are the two most commonly under-taught themes in SL — usually because schools run out of time after detailed coverage of Themes A and B. Missing content is filled in via targeted 1:1 sessions added to the standard 10-hour week.',
  },
  {
    question: 'Is the course suitable for retake or November-session candidates?',
    answer:
      'Yes. The course runs cohorts for both May and November sessions, with the SL syllabus content identical between sessions. November-session retake candidates often benefit more than first-time candidates because they already know which content and question types they struggle with — the course can target those weaknesses precisely from Day 1.',
  },
]

const slWeeklyPlan = [
  {
    week: 'Week 1',
    title: 'Core Themes A–D Revision (No AHL)',
    summary:
      'SL covers the four core themes only. Week 1 hits the highest-yield syllabus statements in each theme — the ones that appear in every recent exam session.',
    bullets: [
      'Theme A — unity and diversity: water properties, nucleic acids, cell theory, classification of life',
      'Theme B — form and function: membrane transport, gas exchange, transport in plants, transport in animals',
      'Theme C — interaction and interdependence: enzymes basics, photosynthesis, respiration, neural signalling, ecosystems',
      'Theme D — continuity and change: DNA replication, transcription, translation, mutation, evolution, homeostasis basics',
      'Daily 15-question recall quiz across all four themes to spot weak syllabus statements early',
    ],
  },
  {
    week: 'Week 2',
    title: 'Paper 1 Drilling — Multiple Choice + Data Response',
    summary:
      'SL Paper 1A is 30 questions in 45 minutes — that is 90 seconds per question. Speed and recognition decide whether you finish on time.',
    bullets: [
      'MCQ pattern coaching: double-negative stems, "EXCEPT" stems, distractor families, data-misreading traps',
      '3 timed full Paper 1A mocks under exam conditions with immediate examiner-style debrief',
      'Paper 1B data drill: figure-reading sequence, unit-checking discipline, calculation cross-checks',
      'Data-booklet familiarisation: statistical formulas, amino acid reference table, electromagnetic spectrum',
      'Topic mapping: every wrong answer back-mapped to the specific syllabus statement that needs reinforcing',
      'Mistake bank: a running log of every error to revisit before the real exam',
    ],
  },
  {
    week: 'Week 3',
    title: 'Paper 2 — Data + Structured Response',
    summary:
      'SL Paper 2 is 1 h 15 min, no extended-response essays. Section A is data-driven; Section B is short structured response. Command term mastery is the differentiator.',
    bullets: [
      'Command term decoding: state vs describe vs explain vs outline vs compare (each is worth different marks)',
      'Structured-response architecture: the 2-sentence and 4-sentence answer templates',
      'IB rubric application: how examiners award marks for biology depth vs concise writing',
      '3 timed full Paper 2 mocks with question-by-question annotated marking',
      'Diagram drawing drills: labelled diagrams that examiners credit (vs sketches that lose marks)',
      'Data interpretation: trend statement, magnitude statement, exception statement — the 3-part answer',
    ],
  },
  {
    week: 'Week 4',
    title: 'Practical Skills, Command Terms, Exam-Day Prep',
    summary:
      'Final week consolidates Weeks 1–3, drills command terms under pressure, and rehearses the actual exam day. No new content — only refinement.',
    bullets: [
      'Practical/lab question drilling: experimental design, controlled variables, error analysis',
      'Command-term flash cycles: 30-minute timed recall under pressure',
      'Mistake audit: full review of every question missed in Weeks 1–3, sorted by error type',
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
    name: 'IB Biology SL Crash Course — 4-Week Pre-Exam Intensive',
    description:
      'A 4-week intensive revision course for IB Biology Standard Level candidates preparing for the May or November exam session. Covers Themes A–D revision, Paper 1 multiple choice strategy, Paper 2 structured response, command-term drill, practical questions, and timed full-length mock papers.',
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
      courseWorkload: 'PT16H',
      inLanguage: 'en',
    },
    about: [
      'IB Biology Standard Level',
      'Themes A–D revision',
      'Paper 1 multiple choice',
      'Paper 2 structured response',
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
  "Hi! I'm interested in the IB Biology SL 4-week crash course. Please share batch dates and pricing."
)
const whatsappUrl = `https://wa.me/918826444334?text=${whatsappMessage}`

export default function IBBiologySLCrashCoursePage() {
  return (
    <>
      <CourseSchema />
      <FAQSchema questions={slCrashFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology Resources', href: '/ib-biology-tutor' },
          { label: 'SL Crash Course', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16 text-white sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-teal-500 blur-3xl" />
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
                  SL Crash Course
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300">
              <Flame className="h-4 w-4" />
              April–May Pre-Exam Intensive
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              IB Biology SL Crash Course
              <span className="mt-2 block text-blue-400">4-Week Pre-Exam Intensive</span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg text-gray-300 sm:text-xl">
              For Standard Level candidates 4 to 6 weeks out from the IB exam. Themes A–D
              consolidation, Paper 1 and Paper 2 strategy, six timed past papers with examiner
              feedback, and command-term mastery. Built for the SL student aiming for a 6 or 7.
            </p>

            <div className="flex flex-col gap-4 md:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700"
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
              Who This SL Crash Course Is For
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              The 4-week SL crash course is built for a specific student in a specific window. SL is
              a structurally different exam from HL — shorter papers, no AHL content, no
              extended-response essays. The course is calibrated to those differences.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-green-900">
                  <CheckCircle2 className="h-5 w-5" />
                  Right fit if you are
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>An SL candidate 4–6 weeks from your May or November exam</li>
                  <li>Currently predicted 4 or 5, targeting a 6 or 7</li>
                  <li>Comfortable with notes but struggling under timed conditions</li>
                  <li>Losing marks to command-term confusion or running out of time</li>
                  <li>Able to commit 10 hours per week of live time plus 6 hours self-study</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-yellow-900">
                  <Target className="h-5 w-5" />
                  Better options if you are
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>Earlier than 6 weeks out — take the full-year SL programme instead</li>
                  <li>An HL student — see the dedicated HL crash course</li>
                  <li>Still finalising your IA — see the IA cluster of pages first</li>
                  <li>
                    Currently predicted 1 or 2 — needs foundational reteaching, not crash revision
                  </li>
                  <li>Unable to commit 16 hours per week — sprint format is more demanding</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Week-by-week */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              What 4 Weeks of SL Crash Course Covers
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              No vague "complete revision" promises. Below is the literal schedule we run, honed
              across multiple May exam sessions of SL candidates.
            </p>

            <div className="space-y-6">
              {slWeeklyPlan.map((wk) => (
                <article
                  key={wk.week}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="mb-3 flex flex-wrap items-baseline gap-3">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {wk.week}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{wk.title}</h3>
                  </div>
                  <p className="mb-4 text-gray-700">{wk.summary}</p>
                  <ul className="space-y-2">
                    {wk.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-gray-800">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SL exam structure */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              SL Exam Structure (At a Glance)
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              The SL exam is 3 hours of written assessment plus a 20% Internal Assessment. All three
              components below are based on Themes A–D — there is no AHL content and no optional
              topics in the 2025 syllabus.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Component</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                    <th className="px-4 py-3 font-semibold">Format</th>
                    <th className="px-4 py-3 font-semibold">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Paper 1A</td>
                    <td className="px-4 py-3">45 minutes</td>
                    <td className="px-4 py-3">30 multiple-choice questions</td>
                    <td className="px-4 py-3">~36%</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Paper 1B</td>
                    <td className="px-4 py-3">45 minutes</td>
                    <td className="px-4 py-3">3 data-based short response questions</td>
                    <td className="px-4 py-3">(grouped with 1A)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Paper 2</td>
                    <td className="px-4 py-3">1 hour 15 minutes</td>
                    <td className="px-4 py-3">
                      Section A data + Section B short structured response
                    </td>
                    <td className="px-4 py-3">~44%</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Internal Assessment</td>
                    <td className="px-4 py-3">10 hours classroom</td>
                    <td className="px-4 py-3">3,000-word scientific investigation report</td>
                    <td className="px-4 py-3">20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why SL students underscore */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Why SL Students Often Score Lower Than They Should
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              SL is not an easy exam — it is a shorter exam with the same rigour. Most SL candidates
              lose marks for predictable, fixable reasons. The crash course is built around these
              specific leakages.
            </p>
            <div className="space-y-5">
              {[
                {
                  title: 'Running out of time on Paper 2 data questions',
                  body: 'Paper 2 is 1 h 15 min — about 75 minutes for 50+ marks. Candidates who spend 10 minutes on a 4-mark data question routinely run out of time. Fix: a time-per-mark target of 1 minute per mark, with explicit cut-offs to move on.',
                },
                {
                  title: 'Misreading command terms (state vs describe vs explain)',
                  body: 'A "state" answer that runs three sentences wastes time. An "explain" answer that runs one sentence loses marks. Each command term has a specific answer length and content expectation in the IB markschemes.',
                },
                {
                  title: 'Treating Paper 1A like a slow comprehension test',
                  body: '30 questions in 45 minutes = 90 seconds per question. Candidates who read each stem twice run out of time on the last 5–8 questions, which is where some of the easiest marks sit.',
                },
                {
                  title: 'Diagram answers without labels',
                  body: 'IB awards diagram marks for specific labelled features, not for artistic sketches. A neat unlabelled cell diagram scores 0; an ugly but correctly labelled one can score full marks.',
                },
                {
                  title: 'Forgetting units on calculation answers',
                  body: 'A correct numerical answer without units typically loses 1 mark. Across a paper that can be 4–6 marks — the difference between a 5 and a 6.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-700">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample schedule */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Sample Weekly Schedule
            </h2>
            <p className="mb-8 text-lg text-gray-700">
              10 hours of live small-group sessions per week, plus 6 hours of guided self-directed
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
                    <td className="px-4 py-3">Theme deep-dive (90 min)</td>
                    <td className="px-4 py-3">Recall quiz (45 min)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Tue</td>
                    <td className="px-4 py-3">Paper 1A drill (90 min)</td>
                    <td className="px-4 py-3">Past-paper questions (1 h)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Wed</td>
                    <td className="px-4 py-3">Paper 1B data analysis (90 min)</td>
                    <td className="px-4 py-3">Data booklet drill (45 min)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Thu</td>
                    <td className="px-4 py-3">Paper 2 Section A coaching (90 min)</td>
                    <td className="px-4 py-3">Diagram drawing drill (1 h)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Fri</td>
                    <td className="px-4 py-3">Paper 2 Section B structured response (90 min)</td>
                    <td className="px-4 py-3">Command-term flash review (45 min)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Sat</td>
                    <td className="px-4 py-3">Timed mock paper (90 min)</td>
                    <td className="px-4 py-3">Mock self-review with mark scheme (1 h)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold">Sun</td>
                    <td className="px-4 py-3">Examiner-style mock debrief (45 min)</td>
                    <td className="px-4 py-3">Catch-up + WhatsApp doubt clearing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What you'll get */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">What You Will Get</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: CalendarDays,
                  title: '10 hours of live small-group teaching per week',
                  body: 'Batches of 4 to 8 students — large enough for peer discussion, small enough that every student gets individual attention each session.',
                },
                {
                  icon: Target,
                  title: '6+ timed full past papers',
                  body: 'Three Paper 1 sittings plus three Paper 2 sittings, all marked with examiner-style annotated feedback within 48 hours.',
                },
                {
                  icon: MessageCircle,
                  title: 'Daily WhatsApp doubt channel',
                  body: 'Direct access to your subject tutor between sessions for question clarification, with replies within 4 hours on weekdays.',
                },
                {
                  icon: Clock,
                  title: 'Personal mistake audit',
                  body: 'Every wrong answer across the 4 weeks is logged, tagged by syllabus statement, and reviewed in a final 1:1 session before your exam.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
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
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">Pricing</h2>
            <p className="mb-4 text-lg text-gray-700">
              The SL 4-week intensive is priced between USD 1,200 and USD 2,000 depending on format.
              Small-group (4–8 students) sits at the lower end; 1:1 examiner-led format with the
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
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              See full IB Biology pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              SL Crash Course — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {slCrashFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-blue-600 group-open:rotate-180 transition-transform">
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
                href="/ib-biology-hl-crash-course"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-700"
              >
                HL Crash Course
              </Link>
              <Link
                href="/ib-biology-hl-vs-sl"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-700"
              >
                HL vs SL Decision Guide
              </Link>
              <Link
                href="/ib-biology-paper-1-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-700"
              >
                Paper 1 Guide
              </Link>
              <Link
                href="/ib-biology-paper-2-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-700"
              >
                Paper 2 Guide
              </Link>
              <Link
                href="/ib-biology-past-papers"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-700"
              >
                Past Papers Hub
              </Link>
              <Link
                href="/ib-biology-tutor"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-700"
              >
                Browse all IB Biology resources
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 via-teal-600 to-blue-700 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Seats Close 10 Days Before Each Cohort
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Small-group cohorts cap at 8 students. Once the seat is gone, the next cohort is one
              week later — which can be too late for May candidates. Reserve via WhatsApp now.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg hover:bg-blue-50"
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
