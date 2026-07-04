/**
 * /ap-biology-frq-rubric-mastery
 *
 * Cornerstone pedagogy page — the differentiator vs other tutor marketplaces / Princeton
 * Review / Khan Academy / other tutor marketplaces. None of those competitors own the
 * "AP Biology FRQ rubric" content vertical. We do.
 *
 * Targets the high-volume informational query "AP Biology FRQ" and
 * the long-tail "AP Bio rubric" / "how to write AP Biology FRQ".
 *
 * Schema: Article + HowTo + Speakable + Breadcrumb.
 * Locale: en_US, hreflang en-US/en/x-default (via buildAPBiologyMetroMetadata).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import {
  BookOpen,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Home,
  MessageCircle,
  Target,
  TrendingUp,
} from 'lucide-react'

const CANONICAL = '/ap-biology-frq-rubric-mastery'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology FRQ Rubric Mastery — The Score-5 Guide · Cerebrum',
  description:
    'Annotated guide to AP Biology Free-Response rubrics. Long FRQs vs Short FRQs, sample 4-point answers, the 6-week practice schedule top scorers actually use. PhD-faculty curriculum.',
  keywords: [
    'AP Biology FRQ',
    'AP Biology free response rubric',
    'AP Bio rubric',
    'AP Biology FRQ examples',
    'AP Biology score 5 FRQ',
    'how to write AP Biology FRQ',
    'AP Bio long free response',
    'AP Bio short free response',
    'AP Biology rubric mastery',
    'AP Biology FRQ practice',
    'AP Bio College Board rubric',
    'AP Biology 4-point answer',
    'AP Bio FRQ annotated',
    'AP Biology FRQ tips',
  ],
  canonical: CANONICAL,
})

export default function APBiologyFRQRubricMasteryPage() {
  // Article schema — establishes E-E-A-T author + datePublished signals
  // for Google's quality eval. Last-reviewed date should rotate when
  // the College Board updates the AP Biology Course and Exam Description.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AP Biology FRQ Rubric Mastery — The Score-5 Guide',
    description:
      'Annotated guide to AP Biology Free-Response rubrics, with sample 4-point answers, common point-loss patterns, and the 6-week practice schedule used by 5-scorers.',
    url: `${SITE_URL}${CANONICAL}`,
    inLanguage: 'en-US',
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: '2026-04-30',
    dateModified: '2026-06-08',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${CANONICAL}` },
  }

  // HowTo schema — the 6-week prep plan structured for Google's
  // step-by-step rich result. Each step has a clear name + text.
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to master the AP Biology FRQ rubric in 6 weeks',
    description:
      'A 6-week, evidence-based study schedule for AP Biology FRQ rubric mastery — the layer that converts strong content knowledge into a 5 on the May exam.',
    inLanguage: 'en-US',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Week 1 — Read every 2025 + 2026 FRQ rubric',
        text: 'Download all official AP Biology FRQs and scoring rubrics from College Board. Read the rubric BEFORE attempting answers. Pattern-match what earns a point vs what does not.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Week 2 — Drill the 4 short FRQ types',
        text: 'Short FRQs are 4 points each. Practice 12 of them (3 per type) using the rubric to self-grade. Write timed: 10 minutes max per short FRQ.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Week 3 — Drill the 2 long FRQ types',
        text: 'Long FRQs are 8–10 points each. Practice 6 of them. Time pressure: 22 minutes per long FRQ. Score against the rubric, then revise weak parts.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Week 4 — Spaced retrieval with weak-area review',
        text: 'Re-do the lowest-scoring FRQs from weeks 2–3 from memory. Use spaced repetition (Karpicke & Roediger, Science 2008): re-test at 1 day, 3 days, 1 week.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Week 5 — Two full-length practice exams',
        text: 'Two complete AP Biology practice exams (90-min MCQ + 90-min FRQ) under timed conditions. Grade with the official rubric. Identify the 3 weakest skill areas.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Week 6 — Final polish + 4 more FRQ sets',
        text: 'Targeted FRQ practice on the 3 weakest areas from Week 5. One more full-length exam. Walk into the May exam with rubric reflexes, not memorisation.',
      },
    ],
    totalTime: 'P6W',
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
        name: 'FRQ Rubric Mastery',
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
        {/* Breadcrumb */}
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
                <span className="text-blue-700 font-medium">FRQ Rubric Mastery</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              50% of your AP Biology score · the layer most students under-prepare
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="title">
              AP Biology FRQ Rubric Mastery —
              <span className="block text-yellow-400 mt-2">The Score-5 Guide</span>
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed"
              data-speakable="summary"
            >
              Free Response Questions are 50% of your AP Biology composite score, but most study
              guides over-prepare you for multiple choice. This is the gap. This guide walks through
              the College Board&apos;s actual scoring rubrics, shows you sample 4-point vs 3-point
              answers side-by-side, and gives you the 6-week practice schedule top scorers actually
              use.
            </p>
            <p className="text-sm text-slate-400 mb-6">
              Prefer a coach to grade your FRQs? Live online in your US time zone (ET/CT/MT/PT);
              pricing in USD.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Clock className="w-4 h-4 text-yellow-400" />
                6-week study plan
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-yellow-400" />2 long + 4 short FRQs decoded
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                Avg +2 score points / 20 hrs prep
              </span>
            </div>
          </div>
        </section>

        {/* Why FRQ rubric is the gap */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why FRQ rubric application is the AP-5 gap
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Roughly 26% of AP Biology test-takers score a 5 each year (College Board, 2025 Score
              Distributions). The remaining 74% who don&apos;t score a 5 fall into two groups:
              students who didn&apos;t learn the content deeply enough, and students who knew the
              content but couldn&apos;t convert it into 4-point FRQ answers. The second group is
              much larger than people assume.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The College Board&apos;s scoring rubrics are not generic. Each FRQ has a specific
              4-point structure: typically 1 point for the correct claim, 1 point for the correct
              mechanism, 1 point for the correct evidence/data link, and 1 point for connecting back
              to the question prompt. Students who write fluent biology prose without explicitly
              hitting all four rubric points routinely lose 1–2 points per FRQ — enough to drop a
              borderline 5 to a 4.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The fix is not more content review. It&apos;s training your brain to write to the
              rubric. This guide shows you how.
            </p>
          </div>
        </section>

        {/* Long FRQs */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              The 2 Long FRQs (8–10 points each)
            </h2>
            <p className="text-slate-600 mb-8">
              Together these are roughly 30–35% of your total exam score.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-blue-700 mb-3">
                  Long FRQ 1 — Interpret + Reason from Data
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  Typically presents experimental data (graph, table, gel image, scatter plot) and
                  asks you to interpret a result, propose a mechanism, predict an outcome, and
                  justify with evidence.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Common point-loss patterns:</strong> stating a conclusion without citing
                  the data; describing the mechanism but failing to tie it back to the observed
                  result; predicting an outcome without explaining why the underlying biology drives
                  that prediction.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-blue-700 mb-3">
                  Long FRQ 2 — Design + Justify an Investigation
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  Asks you to design an experiment, identify variables (independent, dependent,
                  control), describe expected results, and justify your hypothesis with biological
                  reasoning.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Common point-loss patterns:</strong> describing the procedure without
                  naming the variables; correctly naming variables but failing to describe how data
                  would be analysed; over-complicating the design when a simple experiment scores
                  higher.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Short FRQs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              The 4 Short FRQs (4 points each)
            </h2>
            <p className="text-slate-600 mb-8">
              Together roughly 15–20% of your total exam score. Short FRQs reward concise precision
              — every sentence should map to a rubric point.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Short FRQ — Concept explanation',
                  body: 'Single concept (e.g., enzyme allostery, photosystem II electron flow, chi-square test). 4 points: 1 for naming the mechanism, 1 for the molecular detail, 1 for the consequence/outcome, 1 for connecting to the prompt.',
                },
                {
                  title: 'Short FRQ — Visual representation',
                  body: 'Asks you to draw or label a diagram (e.g., signal transduction cascade, replication fork, food web). 4 points: 1 for correct components, 1 for correct labels, 1 for correct relationships/arrows, 1 for explanatory caption.',
                },
                {
                  title: 'Short FRQ — Quantitative analysis',
                  body: 'Calculation question (Hardy-Weinberg, surface-area-to-volume ratio, energy flow %, statistical significance). 4 points: 1 for the formula, 1 for correct substitution, 1 for correct arithmetic, 1 for correct biological interpretation of the result.',
                },
                {
                  title: 'Short FRQ — Argumentation / connection across units',
                  body: 'Asks you to integrate concepts across two or more AP units (e.g., genetic mutation → protein function change → fitness consequence). 4 points: 1 for each correct integration step + 1 for explicit prompt linkage.',
                },
              ].map((q) => (
                <div key={q.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">{q.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{q.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample 4-pt vs 3-pt answer */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Sample: 4-point vs 3-point answer (worked)
            </h2>
            <p className="text-slate-600 mb-8">
              Question:{' '}
              <em>
                Explain how a single point mutation in a gene encoding a membrane receptor can alter
                cellular response to a hormone (4 points).
              </em>
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-green-300">
                <div className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-3">
                  4 / 4 — full credit
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  &ldquo;A point mutation in the receptor gene{' '}
                  <strong>changes one base in the DNA sequence</strong>, which can result in{' '}
                  <strong>a different amino acid in the receptor protein</strong> through
                  translation. If this amino acid sits at the hormone-binding site,{' '}
                  <strong>the receptor&apos;s affinity for the hormone changes</strong>, which
                  alters how strongly the receptor activates downstream signal transduction.{' '}
                  <strong>
                    The cell therefore shows a weaker (or stronger) response to the same hormone
                    concentration than the wild type
                  </strong>
                  , which is the cellular consequence the question asks about.&rdquo;
                </p>
                <p className="text-xs text-green-700 mt-3 font-medium">
                  Why it earns 4: claim (mutation → amino acid change), mechanism (binding-site
                  alteration), evidence link (downstream signaling), and prompt-tied conclusion
                  (cellular response). All four rubric points hit.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-amber-300">
                <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded mb-3">
                  3 / 4 — common loss
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  &ldquo;A point mutation changes a base in DNA, which changes an amino acid in the
                  protein. This affects the receptor. The cell&apos;s response to the hormone will
                  be different.&rdquo;
                </p>
                <p className="text-xs text-amber-700 mt-3 font-medium">
                  Why it loses 1 point: the answer says &ldquo;affects the receptor&rdquo; without
                  naming the mechanism (binding-site alteration → affinity change). Stating the
                  consequence without the molecular bridge typically loses one rubric point — even
                  when the student understood the biology.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-6 italic">
              The two answers reflect the same conceptual understanding. The difference is rubric
              application — explicitly hitting each of the four rubric points.
            </p>
          </div>
        </section>

        {/* The 6-week study plan */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The 6-week FRQ rubric mastery plan
            </h2>
            <p className="text-slate-600 mb-8">
              Evidence-based, used by our 5-scorers. Roughly 8–10 hours per week of focused FRQ
              practice — daily 30–60 minutes beats marathon weekend sessions (Karpicke & Roediger,{' '}
              <em>Science</em> 2008).
            </p>
            <div className="space-y-4">
              {[
                {
                  week: 1,
                  title: 'Read every 2025 + 2026 FRQ rubric',
                  detail:
                    'Download official AP Biology FRQs + scoring guides from College Board. Read the rubric BEFORE attempting answers. Pattern-match what earns each point.',
                },
                {
                  week: 2,
                  title: 'Drill the 4 short FRQ types',
                  detail:
                    '12 short FRQs (3 per type). Self-grade against the rubric. Time pressure: 10 minutes max per short FRQ.',
                },
                {
                  week: 3,
                  title: 'Drill the 2 long FRQ types',
                  detail:
                    '6 long FRQs (3 per type). Time pressure: 22 minutes per long. Score against rubric, revise weak rubric points, re-write the lowest-scoring 2.',
                },
                {
                  week: 4,
                  title: 'Spaced retrieval + weak-area review',
                  detail:
                    'Re-do the lowest-scoring FRQs from Weeks 2–3 from memory. Spaced repetition: re-test at 1 day, 3 days, 1 week intervals.',
                },
                {
                  week: 5,
                  title: 'Two full-length practice exams',
                  detail:
                    'Complete 90-min MCQ + 90-min FRQ under timed conditions. Grade with the official rubric. Identify the 3 weakest skill areas.',
                },
                {
                  week: 6,
                  title: 'Targeted polish + final mock',
                  detail:
                    'FRQ practice on the 3 weakest areas. One more full-length exam. Walk into May exam with rubric reflexes, not memorisation.',
                },
              ].map((w) => (
                <div
                  key={w.week}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg">
                    {w.week}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Week {w.week} — {w.title}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{w.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Citations / E-E-A-T */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Sources we cite</h2>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>College Board AP Biology Course and Exam Description (CED).</strong> The
                official syllabus, scoring rubrics, and released FRQs. All AP Biology preparation
                should anchor here. Updated annually.
              </li>
              <li>
                <strong>Karpicke, J.D. &amp; Roediger, H.L. (2008).</strong>{' '}
                <em>The critical importance of retrieval for learning.</em> Science, 319(5865),
                966–968. The foundational paper on active recall: self-testing at spaced intervals
                beats passive re-reading by ~50% on long-term retention.
              </li>
              <li>
                <strong>Dunlosky, J. et al. (2013).</strong>{' '}
                <em>Improving students&apos; learning with effective learning techniques.</em>{' '}
                Psychological Science in the Public Interest, 14(1), 4–58. Meta-review of 10 study
                techniques — practice testing and distributed practice are the only two with strong
                empirical support.
              </li>
              <li>
                <strong>College Board (2025).</strong>{' '}
                <em>AP Biology score distributions, 2024 and 2025 administration.</em>
                ~26% score 5; mean 3.2; 70% score 3+ (passing).
              </li>
            </ul>
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Last reviewed:</strong> April 2026 by Dr. Shekhar C Singh, AIIMS graduate
                &amp; founder of Cerebrum Biology Academy.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a coach who grades every FRQ you write?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We schedule timed FRQ writes, grade against the College Board rubric, and walk through
              every point you lost — until rubric application becomes reflex.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/ap-biology-tutor"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <GraduationCap className="w-5 h-5" />
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

        {/* WhatsApp CTA */}
        <section className="py-12 md:py-16 bg-blue-50 border-y border-blue-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Want your FRQ graded? Ask us on WhatsApp
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              Send us an FRQ you have written and we will reply with where it would lose rubric
              points and how to fix it. No commitment.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent(
                  'Hi Cerebrum, I have a question about AP Biology FRQ rubric scoring.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with us on WhatsApp
              </a>
              <Link
                href="/ap-biology-tutor"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-700 px-8 py-4 rounded-xl font-medium text-lg border border-blue-200 transition"
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

        {/* Related cornerstones */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              More AP Biology guides
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/ap-biology-score-5-study-guide"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">Score-5 Study Guide</h3>
                <p className="text-xs text-slate-600 mt-1">
                  6-week unit-by-unit plan with active recall + spaced repetition
                </p>
              </Link>
              <Link
                href="/ap-biology-anki-deck"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">Free Anki Deck</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Spaced-repetition flashcards aligned to the AP calendar
                </p>
              </Link>
              <Link
                href="/ap-biology-vs-college-bio-mcat-bridge"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">AP Bio → College Bio → MCAT</h3>
                <p className="text-xs text-slate-600 mt-1">Honest pre-med pipeline framing</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
