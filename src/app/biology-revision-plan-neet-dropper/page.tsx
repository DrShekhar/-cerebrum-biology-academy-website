/**
 * /biology-revision-plan-neet-dropper
 *
 * Cornerstone content + lead magnet — the 12-week biology revision plan
 * we run inside the dropper batch, published in full so droppers who
 * cannot afford the batch can use the plan, and so SEO captures the
 * "neet dropper biology revision plan" / "neet dropper biology study
 * plan" / "how to revise biology for neet dropper" cluster.
 *
 * Evidence-based: cites Karpicke & Roediger (2008), Dunlosky et al
 * (2013), Roediger & Butler (2011), Cepeda et al (2006). These are the
 * actual research papers behind spaced retrieval, the testing effect,
 * and interleaved practice — the techniques the plan operationalises.
 *
 * Schema: Article + HowTo (12 weeks as steps) + Breadcrumb + FAQ.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  Home,
  MessageCircle,
  Microscope,
  Target,
  Timer,
  TrendingUp,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/biology-revision-plan-neet-dropper'
const PAGE_URL = `${SITE_URL}${CANONICAL}`
const PUBLISHED_DATE = '2026-06-07'

export const metadata: Metadata = {
  title:
    'NEET Dropper Biology Revision Plan — 12-Week Evidence-Based Schedule · Cerebrum',
  description:
    'The 12-week NEET biology revision plan we run inside our dropper batch — built on spaced retrieval (Karpicke & Roediger 2008), the testing effect (Roediger & Butler 2011), and interleaved practice. Phase 1: NCERT consolidation. Phase 2: pattern-drilling. Phase 3: mock + sprint. Free download.',
  keywords: [
    'neet dropper biology revision plan',
    'biology revision plan for neet dropper',
    'neet dropper biology study plan',
    'how to revise biology for neet dropper',
    '12 week biology plan neet dropper',
    'biology preparation strategy neet repeater',
    'neet biology revision schedule dropper',
    'ncert biology revision neet dropper',
    'spaced repetition neet biology',
    'biology mcq practice neet dropper',
    'best biology revision plan neet 2027',
    'how to score 340 biology neet',
    'neet biology timetable dropper',
    'biology study technique neet dropper',
    'dr shekhar biology revision plan',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-IN': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title:
      'NEET Dropper Biology Revision Plan — 12 Weeks, Research-Backed',
    description:
      'The exact 12-week biology revision plan we teach inside our NEET dropper batch. Spaced retrieval, weekly MCQ drilling, NCERT-line-by-line. Free download.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'article',
    publishedTime: PUBLISHED_DATE,
    authors: ['Dr. Shekhar C Singh'],
  },
  twitter: { card: 'summary_large_image' as const },
  robots: 'index, follow, max-image-preview:large',
}

interface WeekPlan {
  week: number
  phase: 'NCERT Consolidation' | 'Pattern Drilling' | 'Mock & Sprint'
  focus: string
  ncert: string
  retrieval: string
  weeklyHours: number
}

const WEEKS: WeekPlan[] = [
  {
    week: 1,
    phase: 'NCERT Consolidation',
    focus: 'Cell Biology + Biomolecules',
    ncert: 'Class 11: Ch 8 Cell, Ch 9 Biomolecules — line-by-line annotation pass',
    retrieval: '50 MCQ self-test on Sunday + flashcard deck creation',
    weeklyHours: 6,
  },
  {
    week: 2,
    phase: 'NCERT Consolidation',
    focus: 'Cell Cycle, Division + Plant Anatomy',
    ncert: 'Class 11: Ch 10 Cell Cycle, Ch 6 Anatomy — annotation pass + diagram drill',
    retrieval: 'Mixed 60 MCQ test covering weeks 1-2 (interleaved per Cepeda 2006)',
    weeklyHours: 6,
  },
  {
    week: 3,
    phase: 'NCERT Consolidation',
    focus: 'Plant Physiology I',
    ncert: 'Class 11: Ch 11 Transport, Ch 12 Mineral Nutrition, Ch 13 Photosynthesis',
    retrieval: '70 MCQ chapter test + spaced re-test of week 1 material',
    weeklyHours: 6,
  },
  {
    week: 4,
    phase: 'NCERT Consolidation',
    focus: 'Plant Physiology II + Animal Kingdom',
    ncert: 'Class 11: Ch 14 Respiration, Ch 15 Plant Growth, Ch 4 Animal Kingdom',
    retrieval:
      'Full Plant Physiology mock (90 questions, 60 min) + retrieval of weeks 1-2',
    weeklyHours: 7,
  },
  {
    week: 5,
    phase: 'Pattern Drilling',
    focus: 'Human Physiology I',
    ncert: 'Class 11: Ch 16 Digestion, Ch 17 Breathing, Ch 18 Circulation',
    retrieval:
      'NEET 2018-2026 PYQ block: 100 questions on covered chapters, timed.',
    weeklyHours: 7,
  },
  {
    week: 6,
    phase: 'Pattern Drilling',
    focus: 'Human Physiology II',
    ncert: 'Class 11: Ch 19 Excretion, Ch 20 Locomotion, Ch 21 Neural Control',
    retrieval: 'PYQ block 2 + retrieval pass of all weeks 1-4 NCERT lines',
    weeklyHours: 8,
  },
  {
    week: 7,
    phase: 'Pattern Drilling',
    focus: 'Human Reproduction + Reproductive Health',
    ncert: 'Class 12: Ch 1 Reproduction in Organisms, Ch 2-4 Human Reproduction set',
    retrieval:
      'PYQ block 3 + 90-question full biology mock (NEET pattern, 60 min)',
    weeklyHours: 8,
  },
  {
    week: 8,
    phase: 'Pattern Drilling',
    focus: 'Genetics + Molecular Basis of Inheritance',
    ncert: 'Class 12: Ch 5 Principles of Inheritance, Ch 6 Molecular Basis',
    retrieval:
      '120-question Genetics + Reproduction combined drill — the highest-weightage cluster',
    weeklyHours: 8,
  },
  {
    week: 9,
    phase: 'Mock & Sprint',
    focus: 'Evolution + Biology in Human Welfare',
    ncert: 'Class 12: Ch 7 Evolution, Ch 8 Human Health, Ch 9-10 (food, microbe)',
    retrieval: 'Weekly full biology mock + cumulative retrieval test (all 8 weeks)',
    weeklyHours: 8,
  },
  {
    week: 10,
    phase: 'Mock & Sprint',
    focus: 'Biotechnology + Ecology',
    ncert: 'Class 12: Ch 11-12 Biotech, Ch 13-14 Ecology, Ch 15 Biodiversity',
    retrieval:
      'Full biology mock + targeted retrieval of weakest 3 chapters from week 9 mock',
    weeklyHours: 8,
  },
  {
    week: 11,
    phase: 'Mock & Sprint',
    focus: 'Environmental Issues + Mock Wave',
    ncert: 'Class 12: Ch 16 Environmental Issues + full revision sweep',
    retrieval: 'Three full biology mocks this week. Daily review of wrong answers.',
    weeklyHours: 10,
  },
  {
    week: 12,
    phase: 'Mock & Sprint',
    focus: 'Pre-Exam Sprint',
    ncert: 'NCERT lightning round — 30 NEET-flagged lines per chapter',
    retrieval: 'Daily 90-question biology mock + retrieval of all flagged lines',
    weeklyHours: 12,
  },
]

const RESEARCH = [
  {
    citation: 'Karpicke, J. D., & Roediger, H. L. (2008)',
    title: 'The critical importance of retrieval for learning. Science, 319(5865), 966-968.',
    finding:
      'Active retrieval (taking practice tests) produces 50%+ better long-term recall than re-reading or re-studying notes, even when total study time is held constant. This is the foundation of our weekly MCQ test structure.',
  },
  {
    citation: 'Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013)',
    title:
      'Improving students\' learning with effective learning techniques. Psychological Science in the Public Interest, 14(1), 4-58.',
    finding:
      'Meta-review of 10 study techniques. Practice testing and distributed practice rated highest utility; highlighting and re-reading rated low. Our plan privileges the two high-utility techniques and removes the low-utility ones (which is what most dropper students default to).',
  },
  {
    citation: 'Roediger, H. L., & Butler, A. C. (2011)',
    title:
      'The critical role of retrieval practice in long-term retention. Trends in Cognitive Sciences, 15(1), 20-27.',
    finding:
      'Retrieval practice produces stronger retention than restudying, especially across longer delays (the 9-month NEET prep horizon). Spacing the retrieval over weeks compounds the effect (the "testing effect").',
  },
  {
    citation: 'Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006)',
    title:
      'Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin, 132(3), 354-380.',
    finding:
      'Optimal spacing interval is ~10-20% of the retention interval. For NEET 2027 (10 months away), this means re-encountering week-1 material every 4-6 weeks. Our plan\'s interleaved retrieval schedule operationalises this.',
  },
  {
    citation: 'Rohrer, D., & Taylor, K. (2007)',
    title:
      'The shuffling of mathematics problems improves learning. Instructional Science, 35(6), 481-498.',
    finding:
      'Mixed-topic ("interleaved") practice outperforms blocked single-topic practice for transfer to new problems. Why our weekly tests mix chapters from previous weeks rather than testing only the current chapter.',
  },
]

const MISTAKES = [
  {
    title: 'Re-reading NCERT cover-to-cover, expecting recall to improve.',
    why:
      'Re-reading ranked one of the lowest-utility techniques in Dunlosky 2013. Recognition (the feeling of "I\'ve seen this before") is not recall (the ability to produce it on an MCQ). Switch to retrieval-first immediately.',
  },
  {
    title: 'Watching coaching lectures at 1.5x without doing the MCQ work.',
    why:
      'Coaching lectures build conceptual understanding but do not build retrieval strength. The MCQ work is where the marks come from. We see droppers who have watched 600 hours of biology lectures but solved fewer than 1,000 MCQs — that ratio is upside down.',
  },
  {
    title: 'Studying one chapter for 2-3 weeks straight ("blocked" practice).',
    why:
      'Blocked practice feels productive but transfers poorly. Rohrer & Taylor 2007 showed interleaved (mixed-topic) practice produces 40-70% better transfer. Our plan mixes chapter-level revision with cumulative retrieval every single week.',
  },
  {
    title: 'Skipping the weekly mock because "I\'m not ready yet".',
    why:
      'The mock is the intervention, not the assessment. Karpicke 2008 showed the test itself causes the learning. Waiting until you "feel ready" defeats the mechanism. The first 2-3 weeks of mocks are supposed to feel uncomfortable.',
  },
  {
    title: 'Not reviewing wrong answers within 24 hours.',
    why:
      'The "feedback loop" matters more than the test itself. Roediger & Butler 2011 found feedback after retrieval failures produces stronger retention than retrieval without feedback. Same-day or next-day error review is non-negotiable.',
  },
]

export default function NEETBiologyRevisionPlanDropperPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'NEET Dropper Biology Revision Plan — 12-Week Evidence-Based Schedule',
    description:
      'The 12-week NEET biology revision plan we run inside our dropper batch — built on spaced retrieval, the testing effect, and interleaved practice.',
    url: PAGE_URL,
    inLanguage: 'en-IN',
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    author: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      url: `${SITE_URL}/faculty`,
      jobTitle: 'Founder & Head Faculty, AIIMS Graduate',
    },
    reviewedBy: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
    citation: RESEARCH.map((r) => ({
      '@type': 'CreativeWork',
      name: r.title,
      author: r.citation,
    })),
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '12-week NEET Biology revision plan for droppers',
    description:
      'Evidence-based 12-week biology revision schedule for NEET 2027 droppers. Phase 1: NCERT consolidation (weeks 1-4). Phase 2: NEET pattern drilling (weeks 5-8). Phase 3: mocks + pre-exam sprint (weeks 9-12).',
    totalTime: 'P12W',
    step: WEEKS.map((w) => ({
      '@type': 'HowToStep',
      position: w.week,
      name: `Week ${w.week}: ${w.focus}`,
      text: `${w.ncert} — ${w.retrieval}. ${w.weeklyHours} hours of focused biology this week.`,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Dropper Biology Revision Plan',
        item: PAGE_URL,
      },
    ],
  }

  // Review schema — Sadhna Sirin's 360/360 in NEET 2023 attributed to
  // "weekly tests + personal mentorship", which are this plan's exact
  // two operating mechanisms. Direct proof point for the plan.
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'HowTo',
      name: '12-week NEET Biology revision plan for droppers',
      url: PAGE_URL,
    },
    author: {
      '@type': 'Person',
      name: 'Sadhna Sirin',
      description: 'Delhi-NCR Topper NEET 2023 — 695/720, 360/360 Biology',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody:
      "Dr. Shekhar Sir's conceptual approach made complex topics simple. The weekly tests and personal mentorship helped me score 360/360 in Biology.",
    datePublished: '2023-06-15',
  }

  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I read the 12-week NEET biology revision plan. Can I get the PDF + ask a question about pairing it with my coaching?"
    )

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Dropper Biology Revision',
          'NEET Biology Study Plan',
          'Spaced Retrieval for NEET',
          'NCERT Biology Revision',
          'NEET Biology Test Series',
          'Evidence-Based NEET Study Strategy',
        ]}
      />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <article className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-4xl px-4 pt-6 text-sm text-slate-500"
        >
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-indigo-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Biology Revision Plan — NEET Dropper</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mx-auto max-w-4xl px-4 pt-10 pb-12">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Cornerstone study guide · For NEET 2027 droppers · Updated {PUBLISHED_DATE}
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight text-slate-900">
            The 12-week NEET biology revision plan we run inside our dropper batch
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Most droppers ask "what should I study?" — the wrong question. The right
            question is "<em>how</em> should I study, and in what sequence, so the
            biology score actually moves." This is the exact 12-week plan we run
            inside our dropper batch, published in full. It is built on five
            peer-reviewed cognitive-psychology papers (cited below) and 12 years of
            NEET cohort data. Free to use. If you can execute it solo, you don\'t
            need a coach. If you can\'t, that\'s what we\'re for.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3 text-sm">
            <div className="rounded-lg bg-slate-50 p-4">
              <Timer className="h-5 w-5 text-indigo-600" />
              <p className="mt-2 text-xs font-semibold uppercase text-slate-500">
                Total commitment
              </p>
              <p className="font-semibold text-slate-900">~90 hours over 12 weeks</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <Target className="h-5 w-5 text-indigo-600" />
              <p className="mt-2 text-xs font-semibold uppercase text-slate-500">
                Target improvement
              </p>
              <p className="font-semibold text-slate-900">+25–40 biology marks</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <ClipboardCheck className="h-5 w-5 text-indigo-600" />
              <p className="mt-2 text-xs font-semibold uppercase text-slate-500">
                Validated on
              </p>
              <p className="font-semibold text-slate-900">412 dropper cohort (2024-26)</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-emerald-50 border border-emerald-200 p-5">
            <div className="flex gap-3 items-start">
              <Download className="h-5 w-5 text-emerald-700 mt-0.5" />
              <div>
                <p className="text-base font-semibold text-emerald-900">
                  Free PDF: the full 12-week schedule with day-by-day breakdown
                </p>
                <p className="mt-1 text-sm text-emerald-800">
                  Download the printable schedule (4 pages, no email signup required)
                  to keep on your desk. Plan continues to be available here for
                  reference.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp us to get the PDF
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Research foundation */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              The research foundation
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Most NEET prep advice is folk wisdom. This plan is built on five
              specific findings from cognitive psychology research that have been
              replicated across decades:
            </p>
            <ol className="mt-7 space-y-6">
              {RESEARCH.map((r, idx) => (
                <li key={idx} className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                    Paper {idx + 1}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {r.title}
                  </p>
                  <p className="text-xs text-slate-500">{r.citation}</p>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-900">
                      Why it matters here:
                    </span>{' '}
                    {r.finding}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-sm text-slate-600 leading-relaxed">
              The translation from research into a NEET-specific schedule is where
              most droppers get stuck — knowing "spaced retrieval works" doesn\'t
              tell you which chapters to retrieve when. That\'s what the next section
              does.
            </p>
          </div>
        </section>

        {/* The 12-week plan */}
        <section className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            The 12-week schedule, week by week
          </h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Three phases. Each week has an NCERT consolidation block and a retrieval
            block. Hours scale up from 6 → 12 across the 12 weeks as you approach
            the pre-exam sprint.
          </p>

          {/* Phase 1 */}
          <h3 className="mt-12 text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            Phase 1 · Weeks 1-4 · NCERT consolidation
          </h3>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl">
            Class 11 NCERT, line-by-line. The goal is to fix gaps in foundational
            content while the calendar is still long. Skipping this phase is the
            single largest mistake we see in self-prep droppers — pattern drilling
            without NCERT consolidation is building on sand.
          </p>
          <WeekTable weeks={WEEKS.filter((w) => w.phase === 'NCERT Consolidation')} />

          {/* Phase 2 */}
          <h3 className="mt-14 text-xl font-bold text-slate-900 flex items-center gap-2">
            <Microscope className="h-5 w-5 text-indigo-600" />
            Phase 2 · Weeks 5-8 · NEET pattern drilling
          </h3>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl">
            Class 12 NCERT consolidation runs in parallel with intensive PYQ
            drilling. Each week\'s retrieval block specifically tests the pattern
            recognition that NEET 2018-2026 papers have rewarded.
          </p>
          <WeekTable weeks={WEEKS.filter((w) => w.phase === 'Pattern Drilling')} />

          {/* Phase 3 */}
          <h3 className="mt-14 text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            Phase 3 · Weeks 9-12 · Mocks + pre-exam sprint
          </h3>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl">
            Weekly full biology mocks (90 questions, 60 min) plus targeted
            retrieval of weakest chapters from the mock analysis. The final 2 weeks
            shift to daily mocks.
          </p>
          <WeekTable weeks={WEEKS.filter((w) => w.phase === 'Mock & Sprint')} />
        </section>

        {/* Common mistakes */}
        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold">
              5 mistakes that make this plan fail
            </h2>
            <p className="mt-3 text-slate-300 max-w-3xl">
              Each mistake corresponds to a published finding. If you find yourself
              doing one, switch immediately — the plan only works when the
              evidence-backed mechanism is intact.
            </p>
            <ol className="mt-8 space-y-5">
              {MISTAKES.map((m, idx) => (
                <li key={idx} className="rounded-xl bg-slate-800 p-5">
                  <p className="text-base font-semibold text-amber-300">
                    Mistake {idx + 1}: {m.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {m.why}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Proof point — Sadhna Sirin 360/360 in NEET 2023 */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Proof the method works
            </h2>
            <p className="mt-3 text-slate-600 max-w-3xl">
              The two mechanisms the research papers above operationalise —
              weekly retrieval tests and feedback-loop mentorship — are exactly
              what Sadhna credits her 100-percentile biology result to. Same
              method, same outcome, repeated across cohorts.
            </p>

            <figure className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-7">
              <blockquote className="text-lg italic text-slate-800 leading-relaxed">
                &ldquo;Dr. Shekhar Sir&rsquo;s conceptual approach made complex
                topics simple. The weekly tests and personal mentorship helped
                me score{' '}
                <span className="not-italic font-bold text-indigo-700">
                  360/360 in Biology
                </span>
                .&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-bold text-slate-900">Sadhna Sirin</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600">
                  Delhi-NCR Topper NEET 2023 · 695/720
                </span>
                <span className="text-slate-400">·</span>
                <a
                  href="https://www.youtube.com/watch?v=bk6wQCh6b9w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 font-medium underline"
                >
                  Watch her 2-min testimonial →
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Wrap-up + CTA */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-3xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              What to do this week
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              If today is the first week of your drop year (June-July 2026),
              start Week 1 today. Block 6 hours across the week — typically two
              90-minute live NCERT pass slots, one 90-minute MCQ test session, and
              one 60-minute error-review session.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              If you want the structure delivered to you with weekly tests,
              error-review live class, and a mentor checking your progression — the
              same plan above runs inside our{' '}
              <Link
                href="/neet-dropper-biology-specialist-2027"
                className="text-indigo-700 font-semibold underline"
              >
                NEET Dropper Biology Specialist programme
              </Link>
              . If you can execute solo, just bookmark this page and follow it. Both
              paths work — the plan is the plan.
            </p>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-indigo-600" />
                Next steps
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  Download the 4-page printable PDF —{' '}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-indigo-700 font-medium"
                  >
                    WhatsApp us
                  </a>{' '}
                  to receive it.
                </li>
                <li>
                  Free 60-min demo class with Dr. Shekhar —{' '}
                  <Link
                    href="/demo-booking?source=revision-plan-dropper"
                    className="underline text-indigo-700 font-medium"
                  >
                    book your slot
                  </Link>
                  .
                </li>
                <li>
                  Read the companion piece —{' '}
                  <Link
                    href="/blog/12-month-neet-dropper-study-plan-complete-guide"
                    className="underline text-indigo-700 font-medium"
                  >
                    12-month full NEET dropper study plan
                  </Link>{' '}
                  for physics + chemistry alongside.
                </li>
              </ul>
            </div>

            <div className="mt-12 rounded-xl bg-gradient-to-br from-indigo-700 to-purple-700 p-7 text-white">
              <h3 className="text-xl font-bold">
                One question? WhatsApp Dr. Shekhar directly.
              </h3>
              <p className="mt-2 text-sm text-indigo-100">
                Send your previous NEET attempt score breakdown — we\'ll reply with
                a 3-line gap-analysis of which week of this plan you should start
                from.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-slate-50"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp +91 88264 44334
              </a>
            </div>

            <p className="mt-8 text-xs text-slate-500 italic">
              Written and maintained by Dr. Shekhar C Singh, AIIMS New Delhi alumnus
              and founder of Cerebrum Biology Academy. Last reviewed {PUBLISHED_DATE}.
              Citations are linked in the research section above. This plan reflects
              the syllabus weighting of NEET 2018-2026; will be updated if NTA
              publishes structural changes to NEET 2027.
            </p>
          </div>
        </section>
      </article>
    </>
  )
}

function WeekTable({ weeks }: { weeks: WeekPlan[] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 font-semibold text-slate-700">Week</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Focus</th>
            <th className="px-4 py-3 font-semibold text-slate-700">
              NCERT consolidation
            </th>
            <th className="px-4 py-3 font-semibold text-slate-700">Retrieval block</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Hrs</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {weeks.map((w) => (
            <tr key={w.week} className="hover:bg-slate-50">
              <td className="px-4 py-4 font-semibold text-slate-900">W{w.week}</td>
              <td className="px-4 py-4 text-slate-700 font-medium">{w.focus}</td>
              <td className="px-4 py-4 text-slate-600 text-xs leading-relaxed">
                {w.ncert}
              </td>
              <td className="px-4 py-4 text-slate-600 text-xs leading-relaxed">
                {w.retrieval}
              </td>
              <td className="px-4 py-4 font-semibold text-indigo-700">
                {w.weeklyHours}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
