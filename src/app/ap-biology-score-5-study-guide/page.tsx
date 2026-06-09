/**
 * /ap-biology-score-5-study-guide
 *
 * Cornerstone pedagogy page — the complete unit-by-unit study
 * methodology. Targets the high-volume informational query "AP
 * Biology score 5" and "how to get a 5 on AP Biology".
 *
 * Differentiates from other generalist test-prep brands / Khan / Albert by being
 * unit-weighted (time allocation matches College Board exam %)
 * and explicitly evidence-based (cites Karpicke, Dunlosky).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import {
  Brain,
  ChevronRight,
  Clock,
  GraduationCap,
  Home,
  MessageCircle,
  Target,
  TrendingUp,
} from 'lucide-react'

const CANONICAL = '/ap-biology-score-5-study-guide'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Score-5 Study Guide — 8-Week Plan · Cerebrum',
  description:
    'Unit-by-unit AP Biology study guide for a 5. Time allocation matches College Board exam weights. Active recall, spaced repetition, full-length mocks. Evidence-based.',
  keywords: [
    'AP Biology score 5',
    'AP Biology study guide',
    'how to get a 5 on AP Biology',
    'AP Bio 5 study plan',
    'AP Biology prep schedule',
    'AP Bio active recall',
    'AP Biology spaced repetition',
    'AP Biology unit weights',
    'AP Bio Campbell study plan',
    'AP Biology daily study routine',
    'AP Biology 8 week plan',
    'AP Biology May exam prep',
  ],
  canonical: CANONICAL,
})

const apUnits = [
  { num: 1, title: 'Chemistry of Life', weight: '8–11%', hours: 8 },
  { num: 2, title: 'Cell Structure & Function', weight: '10–13%', hours: 10 },
  { num: 3, title: 'Cellular Energetics', weight: '12–16%', hours: 14 },
  { num: 4, title: 'Cell Communication & Cell Cycle', weight: '10–15%', hours: 12 },
  { num: 5, title: 'Heredity', weight: '8–11%', hours: 8 },
  { num: 6, title: 'Gene Expression & Regulation', weight: '12–16%', hours: 14 },
  { num: 7, title: 'Natural Selection', weight: '13–20%', hours: 16 },
  { num: 8, title: 'Ecology', weight: '10–15%', hours: 12 },
]

export default function APBiologyScore5StudyGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AP Biology Score-5 Study Guide — 8-Week Plan',
    description:
      'Evidence-based unit-by-unit AP Biology study guide for a 5. Time allocation matches College Board exam weights. Active recall + spaced repetition methodology.',
    url: `${SITE_URL}${CANONICAL}`,
    inLanguage: 'en-US',
    datePublished: '2026-04-30',
    dateModified: '2026-06-08',
    author: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      url: `${SITE_URL}/faculty`,
      jobTitle: 'Founder & Head Faculty, AIIMS Graduate',
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${CANONICAL}` },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to score a 5 on AP Biology in 8 weeks',
    description:
      'An 8-week, unit-weighted AP Biology study plan with daily 30-minute routines, weekly FRQ practice, and three full-length mock exams.',
    inLanguage: 'en-US',
    totalTime: 'P8W',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Weeks 1–2: Units 1, 2, 5 (foundation)',
        text: '26 hours total. Build cell biology + heredity baseline. Daily 60 min reading + Anki recall.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Weeks 3–4: Units 3, 4 (energetics + signaling)',
        text: '26 hours total. Cellular respiration, photosynthesis, cell cycle. Includes 4 short FRQs.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Weeks 5–6: Units 6, 7 (genetics + evolution)',
        text: '30 hours total. Highest-weight units. Includes 6 FRQs (3 short + 3 long).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Week 7: Unit 8 (ecology) + first full mock',
        text: '12 hours unit + 3-hour full-length mock. Grade against rubric, identify weak areas.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Week 8: Two full mocks + targeted polish',
        text: 'Two more 3-hour mocks + 6 hours targeted FRQ on weak areas. Walk into May exam confident.',
      },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${CANONICAL}#webpage`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]', '.faq-answer'],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AP Biology Tutoring',
        item: `${SITE_URL}/ap-biology-tutor`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Score-5 Study Guide',
        item: `${SITE_URL}${CANONICAL}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <main className="min-h-screen bg-white">
        <nav className="bg-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-700">
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href="/ap-biology-tutor" className="text-gray-600 hover:text-blue-700">
                  AP Biology Tutoring
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">Score-5 Study Guide</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4" /> Evidence-based · cited research · used by our 5-scorers
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="title">
              AP Biology Score-5 Study Guide —
              <span className="block text-yellow-400 mt-2">The 8-Week Plan</span>
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed"
              data-speakable="summary"
            >
              About 26% of AP Biology students score a 5 each year. The students who do share a
              pattern: they don&apos;t spend more time, they spend it differently. Time-allocated to
              actual exam weight, daily 30-minute consistency over weekend cramming, active recall
              over passive re-reading, and three full-length mocks before the May exam. This is that
              plan.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Clock className="w-4 h-4 text-yellow-400" />
                8-week schedule
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-yellow-400" />
                ~94 hrs total · 11 hrs/week
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <TrendingUp className="w-4 h-4 text-yellow-400" />3 full-length practice exams
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              The score-5 mindset
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The single biggest predictor of an AP Biology 5 is not raw study hours — it&apos;s
              study technique. Karpicke &amp; Roediger&apos;s 2008 paper (<em>Science</em>) showed
              that students who self-tested with retrieval practice retained ~50% more material
              after 1 week than students who simply re-read their notes. Dunlosky&apos;s 2013
              meta-review of 10 common study techniques found only two with strong empirical
              support: <strong>practice testing</strong> and <strong>distributed practice</strong>{' '}
              (spaced repetition). The other eight (highlighting, summarising, re-reading) had weak
              or no evidence behind them.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The implication for AP Biology: 80% of your prep time should be spent{' '}
              <em>testing yourself</em> on the material — not reading it. Read once, then close the
              book and try to recall. Make Anki cards, use Quizlet, or write blank-paper recalls.
              That is what produces 5-scorers.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The other half of the score-5 equation is time allocation. Each AP Biology unit has a
              different weight on the exam, ranging from 8–11% (Heredity) to 13–20% (Natural
              Selection). If you spend equal time on every unit, you under-study the high-weight
              ones. The plan below allocates time proportional to exam weight.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Unit-by-unit time allocation
            </h2>
            <p className="text-slate-600 mb-8">
              Hours allocated proportional to College Board exam weight. Total: ~94 hours of focused
              study over 8 weeks (about 11 hours per week, or 90 minutes daily).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-left">
                    <th className="py-3 pr-4 font-semibold">Unit</th>
                    <th className="py-3 pr-4 font-semibold">Title</th>
                    <th className="py-3 pr-4 font-semibold text-right">Exam weight</th>
                    <th className="py-3 font-semibold text-right">Study hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {apUnits.map((u) => (
                    <tr key={u.num} className="hover:bg-white">
                      <td className="py-3 pr-4 font-bold text-blue-700">Unit {u.num}</td>
                      <td className="py-3 pr-4 text-slate-800">{u.title}</td>
                      <td className="py-3 pr-4 text-right text-slate-600">{u.weight}</td>
                      <td className="py-3 text-right font-medium text-slate-900">{u.hours} hrs</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td className="py-3 pr-4 text-blue-900" colSpan={3}>
                      Total content study
                    </td>
                    <td className="py-3 text-right text-blue-900">94 hrs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              In addition to the 94 hours of content study: 12 hours of FRQ rubric drilling (see our{' '}
              <Link href="/ap-biology-frq-rubric-mastery" className="text-blue-700 underline">
                FRQ rubric mastery guide
              </Link>
              ) and 9 hours of full-length practice exams. Total prep: ~115 hours over 8 weeks.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The daily 90-minute routine
            </h2>
            <p className="text-slate-600 mb-6">
              Daily consistency beats marathon weekend sessions for retention. Six days per week, 90
              minutes per day. Sundays for review + light reading.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  time: '0–25 min',
                  task: 'Anki recall',
                  detail: "Yesterday's + this-week's flashcards. ~80–120 cards. Honest grading.",
                },
                {
                  time: '25–55 min',
                  task: 'New content',
                  detail:
                    'Read 1–2 Campbell chapter sections. Take handwritten notes — hand > laptop for retention.',
                },
                {
                  time: '55–80 min',
                  task: 'Practice questions',
                  detail:
                    "other generalist test-prep brands or AP Classroom MCQ on today's topic. ~10 questions. Read explanations for misses.",
                },
                {
                  time: '80–90 min',
                  task: 'Self-quiz + plan tomorrow',
                  detail:
                    "Close the book. List the 3 most important points from today out loud. Add weak points to tomorrow's Anki review.",
                },
              ].map((b) => (
                <div key={b.time} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="text-xs font-medium text-blue-700 mb-1">{b.time}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{b.task}</h3>
                  <p className="text-xs text-slate-700 leading-relaxed">{b.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The 8-week schedule
            </h2>
            <p className="text-slate-600 mb-8">
              Each week ends with a Sunday review session: 60–90 minutes re-doing the lowest
              -scoring practice questions from the past week, then planning next week&apos;s Anki
              reviews.
            </p>
            <div className="space-y-4">
              {[
                {
                  wk: 1,
                  focus: 'Units 1 + 2 (foundation)',
                  detail:
                    '13 hours: Chemistry of Life, Cell Structure. Build the molecular biology baseline. End of week: 6 short FRQs (3 per unit).',
                },
                {
                  wk: 2,
                  focus: 'Unit 5 + Anki ramp',
                  detail:
                    '13 hours: Heredity (Mendelian + non-Mendelian). Unit 5 is shorter so it pairs with unit-1 review. End of week: 3 long FRQs from Units 1, 2, 5.',
                },
                {
                  wk: 3,
                  focus: 'Unit 3 (cellular energetics)',
                  detail:
                    '14 hours: photosynthesis, cellular respiration, enzymes. Most-tested mechanisms in AP Bio. End of week: full-length MCQ section (90 min, 60 Qs).',
                },
                {
                  wk: 4,
                  focus: 'Unit 4 (signaling + cell cycle)',
                  detail:
                    '12 hours: signal transduction, mitosis/meiosis review, cell-cycle regulation. End of week: 4 short FRQs + 2 long FRQs.',
                },
                {
                  wk: 5,
                  focus: 'Unit 6 (gene expression)',
                  detail:
                    '14 hours: DNA replication, transcription, translation, gene regulation, biotech. Heavy mechanism + diagram practice.',
                },
                {
                  wk: 6,
                  focus: 'Unit 7 (natural selection)',
                  detail:
                    '16 hours: evolution evidence, Hardy-Weinberg calculations, population genetics, phylogeny. Highest-weight unit. Quantitative practice.',
                },
                {
                  wk: 7,
                  focus: 'Unit 8 + first full mock',
                  detail:
                    '12 hours unit + 3-hour full-length practice exam (90-min MCQ + 90-min FRQ). Score against rubric, identify 3 weakest areas.',
                },
                {
                  wk: 8,
                  focus: 'Two more mocks + targeted polish',
                  detail:
                    '6 hours targeted FRQ on weak areas + two 3-hour full-length exams. Final review of high-weight units. Then sleep, eat, walk in calm.',
                },
              ].map((w) => (
                <div
                  key={w.wk}
                  className="bg-white rounded-xl p-5 border border-slate-200 flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg">
                    {w.wk}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Week {w.wk} — {w.focus}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{w.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Common 4-or-below mistakes (avoid these)
            </h2>
            <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>Re-reading the textbook instead of self-testing.</strong> Re-reading feels
                productive but produces ~50% less retention. Always close the book and recall.
              </li>
              <li>
                <strong>Equal time on every unit.</strong> Natural Selection (13–20%) deserves twice
                the time of Heredity (8–11%). Match study time to exam weight.
              </li>
              <li>
                <strong>Cramming MCQ practice and skipping FRQ.</strong> FRQ is 50% of the score.
                Most 4-scorers ace the MCQ section but lose points on FRQ rubric application. See
                our{' '}
                <Link href="/ap-biology-frq-rubric-mastery" className="text-blue-700 underline">
                  FRQ rubric mastery guide
                </Link>
                .
              </li>
              <li>
                <strong>
                  One marathon weekend session per week instead of daily 90-min routines.
                </strong>{' '}
                Distributed practice has stronger empirical support (Dunlosky 2013).
              </li>
              <li>
                <strong>Skipping the full-length practice exams.</strong> The May AP exam is 3 hours
                of sustained focus. If you&apos;ve never sat 3 hours straight, you&apos;ll fade in
                the last hour. Three full mocks before the real exam is non-negotiable.
              </li>
              <li>
                <strong>Memorising without mechanism.</strong> AP Bio rewards understanding
                processes (electron flow, signal cascades, replication forks), not facts. If you
                can&apos;t trace a mechanism step-by-step, you don&apos;t know it.
              </li>
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <GraduationCap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a coach to run this plan with you?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We schedule the daily routine, grade your weekly FRQs, and run the full-length mocks
              together — same plan, with accountability. PhD biology faculty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ap-biology-tutor"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                See AP Biology programme
              </Link>
              <Link
                href="/ap-biology-online-tutor#pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <MessageCircle className="w-5 h-5" />
                See pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              More AP Biology guides
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/ap-biology-frq-rubric-mastery"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">FRQ Rubric Mastery</h3>
                <p className="text-xs text-slate-600 mt-1">Annotated College Board rubrics</p>
              </Link>
              <Link
                href="/ap-biology-anki-deck"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">Free Anki Deck</h3>
                <p className="text-xs text-slate-600 mt-1">Spaced-repetition flashcards</p>
              </Link>
              <Link
                href="/ap-biology-vs-college-bio-mcat-bridge"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">AP Bio → College Bio → MCAT</h3>
                <p className="text-xs text-slate-600 mt-1">Honest pre-med pipeline</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
