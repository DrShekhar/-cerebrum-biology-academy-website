/**
 * /ap-biology-unit-4-cell-communication
 *
 * AP Biology Unit 4 study page — Cell Communication and Cell Cycle.
 * Genuinely unit-specific: signal transduction, feedback, mitosis,
 * cell-cycle checkpoints, cancer. Targets "AP Bio unit 4 review".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import {
  AlertTriangle,
  ChevronRight,
  MessageCircle,
  Radio,
  GraduationCap,
  Home,
  ListChecks,
  Target,
} from 'lucide-react'

const CANONICAL = '/ap-biology-unit-4-cell-communication'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Unit 4: Cell Communication & Cell Cycle — Review & Study Guide · Cerebrum',
  description:
    'AP Biology Unit 4 Cell Communication and Cell Cycle: signal transduction pathways, reception–transduction–response, feedback mechanisms, the cell cycle and mitosis, checkpoints, and cancer. Topics, pitfalls, and how it is tested.',
  keywords: [
    'AP Biology unit 4',
    'AP Bio unit 4 review',
    'cell communication AP Bio',
    'signal transduction AP Biology',
    'cell cycle checkpoints',
    'mitosis AP Bio',
    'feedback mechanisms AP Biology',
    'cancer cell cycle AP Bio',
  ],
  canonical: CANONICAL,
})

const topics = [
  {
    h: 'Cell signaling pathways',
    d: 'The three stages: reception (signal binds a receptor), transduction (a relay of molecular changes, often a phosphorylation cascade with second messengers like cyclic AMP), and response (a change in gene expression or cell activity). Types of signaling: direct contact, paracrine, endocrine, and synaptic.',
  },
  {
    h: 'Signal amplification and specificity',
    d: 'Why a small number of signal molecules can produce a large response through cascades that amplify the signal at each step, and how different cells respond differently to the same signal depending on their receptors.',
  },
  {
    h: 'Feedback mechanisms',
    d: 'Negative feedback restores a set point and maintains homeostasis (most common in the body); positive feedback amplifies a response to push a process to completion (such as childbirth or blood clotting). Distinguishing the two is a recurring exam skill.',
  },
  {
    h: 'The cell cycle and mitosis',
    d: 'Interphase (G1, S, G2) and the mitotic phase (prophase, metaphase, anaphase, telophase, plus cytokinesis). What happens to DNA content and chromosome structure at each stage. The role of cyclins and cyclin-dependent kinases in driving the cycle forward.',
  },
  {
    h: 'Checkpoints and cancer',
    d: 'The G1, G2, and M (spindle) checkpoints that verify the cell is ready to proceed. How loss of checkpoint control — for example through mutated tumor-suppressor genes or proto-oncogenes — leads to uncontrolled division and cancer.',
  },
]

const pitfalls = [
  'Confusing reception, transduction, and response. The exam expects you to place a given event in the correct stage of the pathway.',
  'Mixing up negative and positive feedback. Negative feedback opposes the change and stabilizes; positive feedback intensifies the change. The names describe the effect on the original stimulus, not whether the outcome is good or bad.',
  'Saying mitosis "creates genetic variation." Mitosis produces genetically identical daughter cells — variation comes from meiosis (Unit 5).',
  'Forgetting that DNA is replicated during S phase, before mitosis begins, so each chromosome already has two sister chromatids by prophase.',
  'Describing cancer only as "cells dividing too fast" without connecting it to failed checkpoints and mutated regulatory genes.',
]

export default function APBiologyUnit4Page() {
  return (
    <UnitShell
      unitNum={4}
      title={'Cell Communication and Cell Cycle'}
      canonical={CANONICAL}
      weight={'10–15% of the exam (approximate, per the CED)'}
      datePublished="2026-06-20"
      heroSummary={
        'Unit 4 is about cells talking and cells dividing. It covers signal transduction — how a chemical message at the cell surface becomes a response inside — and the regulated cell cycle, including mitosis and the checkpoints that control it. The two halves connect through cancer, which is the cell cycle going wrong when signaling and checkpoints fail.'
      }
      heroIcon={<Radio className="w-4 h-4" />}
      topics={topics}
      pitfalls={pitfalls}
      tested={
        'Unit 4 MCQs often present a signaling pathway diagram and ask what happens if one component is blocked or overactive — a logic task, not a recall task. Feedback questions give a homeostatic scenario and ask you to classify and predict. On FRQs, this unit shows up as cell-cycle data (flow cytometry or chromosome counts), predict-the-effect questions on a drug that targets a checkpoint, and explanations linking a mutation to cancer. Mechanistic, step-by-step reasoning earns the points.'
      }
      coaching={
        'We teach signal transduction as a chain of cause and effect so students can answer the exam’s "what if this step is blocked" questions by reasoning rather than memory. Feedback gets its own drill where students classify a dozen real physiological scenarios. We tie the cell cycle directly to cancer so the regulation makes intuitive sense, and we practice reading the cell-cycle datasets the exam loves. Live online, US time zones.'
      }
      knowsAbout={[
        'AP Biology Unit 4 Cell Communication',
        'Signal Transduction',
        'Cell Cycle Regulation',
        'Mitosis',
        'Feedback Mechanisms',
      ]}
      prevUnit={{
        slug: 'ap-biology-unit-3-cellular-energetics',
        label: 'Unit 3: Cellular Energetics',
      }}
      nextUnit={{ slug: 'ap-biology-unit-5-heredity', label: 'Unit 5: Heredity' }}
      faqs={[
        {
          q: 'What is covered in AP Biology Unit 4?',
          a: 'AP Biology Unit 4 Cell Communication and Cell Cycle covers signal transduction (reception, transduction, response), signaling types and amplification, negative and positive feedback, the cell cycle and mitosis, cell-cycle checkpoints, cyclins and CDKs, and how regulation failure causes cancer.',
        },
        {
          q: 'What is the difference between negative and positive feedback in AP Biology Unit 4?',
          a: 'Negative feedback opposes a change and returns the system to its set point, maintaining homeostasis, such as body temperature regulation. Positive feedback amplifies a change to drive a process to completion, such as childbirth contractions or blood clotting.',
        },
        {
          q: 'How much of the AP Biology exam is Unit 4?',
          a: 'The College Board CED lists Unit 4 at approximately 10 to 15 percent of the multiple-choice section. This is published as a range, so treat it as approximate.',
        },
      ]}
    />
  )
}

/* ----------------------------------------------------------------- */
/* Shared presentational shell — content passed in per unit so each   */
/* page renders genuinely unit-specific biology.                      */
/* ----------------------------------------------------------------- */

interface AdjacentUnit {
  slug: string
  label: string
}

function UnitShell(props: {
  unitNum: number
  title: string
  canonical: string
  weight: string
  datePublished: string
  heroSummary: string
  heroIcon: React.ReactNode
  topics: { h: string; d: string }[]
  pitfalls: string[]
  tested: string
  coaching: string
  knowsAbout: string[]
  prevUnit: AdjacentUnit | null
  nextUnit: AdjacentUnit | null
  faqs: { q: string; a: string }[]
}) {
  const {
    unitNum,
    title,
    canonical,
    weight,
    datePublished,
    heroSummary,
    heroIcon,
    topics,
    pitfalls,
    tested,
    coaching,
    knowsAbout,
    prevUnit,
    nextUnit,
    faqs,
  } = props

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `AP Biology Unit ${unitNum}: ${title} — Review & Study Guide`,
    description: heroSummary,
    url: `${SITE_URL}${canonical}`,
    inLanguage: 'en-US',
    datePublished,
    dateModified: '2026-06-25',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${canonical}` },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${canonical}#webpage`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]', '.faq-answer'],
    },
    areaServed: { '@type': 'Country', name: 'United States' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AP Biology Units',
        item: `${SITE_URL}/ap-biology-units`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Unit ${unitNum}: ${title}`,
        item: `${SITE_URL}${canonical}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <CerebrumPersonSchema knowsAbout={knowsAbout} jobTitle="Founder & Lead AP Biology Faculty" />

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
                <Link href="/ap-biology-units" className="text-gray-600 hover:text-blue-700">
                  AP Biology Units
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">
                  Unit {unitNum}: {title}
                </span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              {heroIcon} AP Biology Unit {unitNum} · {weight}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="title">
              AP Biology Unit {unitNum}:<span className="block text-yellow-400 mt-2">{title}</span>
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl leading-relaxed"
              data-speakable="summary"
            >
              {heroSummary}
            </p>
            <p className="text-sm text-slate-400">
              For US students. Live online coaching in your time zone (ET / CT / MT / PT), USD
              pricing.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <ListChecks className="w-7 h-7 text-blue-700" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Key topics & learning objectives
              </h2>
            </div>
            <div className="space-y-5">
              {topics.map((t) => (
                <div key={t.h} className="border-l-4 border-blue-200 pl-4">
                  <h3 className="font-bold text-slate-900 mb-1">{t.h}</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-7 h-7 text-amber-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Common student pitfalls
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed list-disc pl-5">
              {pitfalls.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-7 h-7 text-blue-700" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                How Unit {unitNum} is tested
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-8">{tested}</p>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-slate-900 mb-2">How Cerebrum coaches this unit</h3>
              <p className="text-slate-700 leading-relaxed text-sm">{coaching}</p>
            </div>
          </div>
        </section>

        <section className="py-10 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Continue through the units</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {prevUnit ? (
                <Link
                  href={`/${prevUnit.slug}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
                >
                  <span className="text-xs text-slate-500">Previous</span>
                  <p className="font-semibold text-blue-700">{prevUnit.label}</p>
                </Link>
              ) : (
                <Link
                  href="/ap-biology-units"
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
                >
                  <span className="text-xs text-slate-500">Overview</span>
                  <p className="font-semibold text-blue-700">All AP Biology units</p>
                </Link>
              )}
              {nextUnit ? (
                <Link
                  href={`/${nextUnit.slug}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition sm:text-right"
                >
                  <span className="text-xs text-slate-500">Next</span>
                  <p className="font-semibold text-blue-700">{nextUnit.label}</p>
                </Link>
              ) : (
                <Link
                  href="/ap-biology-units"
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition sm:text-right"
                >
                  <span className="text-xs text-slate-500">Overview</span>
                  <p className="font-semibold text-blue-700">All AP Biology units</p>
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-bold text-slate-900 mb-1">{f.q}</h3>
                  <p className="faq-answer text-slate-700 leading-relaxed text-sm">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-blue-50 border-y border-blue-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Have a question on Unit {unitNum}? Ask us on WhatsApp
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              Tell us where you are stuck in {title} and we will reply with a quick answer plus how
              we would coach it. No commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent(
                  `Hi Cerebrum, I have a question about AP Biology Unit ${unitNum}: ${title}.`
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

        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <GraduationCap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Master Unit {unitNum} with a coach
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We teach this unit live online and grade your practice against the real College Board
              rubric. Faculty trained at AIIMS (All India Institute of Medical Sciences,
              India&apos;s top medical school).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ap-biology-tutor"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                See AP Biology programme
              </Link>
              <Link
                href="/ap-biology-score-5-study-guide"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                Score-5 study guide
              </Link>
              <Link
                href="/ap-biology-units"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                All 8 units
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
