/**
 * /ap-biology-unit-3-cellular-energetics
 *
 * AP Biology Unit 3 study page — Cellular Energetics. Genuinely
 * unit-specific: enzymes, photosynthesis, cellular respiration,
 * chemiosmosis. Targets "AP Bio unit 3 review", a high-yield unit.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import {
  AlertTriangle,
  ChevronRight,
  MessageCircle,
  Zap,
  GraduationCap,
  Home,
  ListChecks,
  Target,
} from 'lucide-react'

const CANONICAL = '/ap-biology-unit-3-cellular-energetics'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Unit 3: Cellular Energetics — Review & Study Guide · Cerebrum',
  description:
    'AP Biology Unit 3 Cellular Energetics: enzymes and enzyme regulation, photosynthesis (light reactions and Calvin cycle), cellular respiration (glycolysis, Krebs, electron transport), and chemiosmosis. Topics, pitfalls, and how it is tested.',
  keywords: [
    'AP Biology unit 3',
    'AP Bio unit 3 review',
    'cellular energetics AP Biology',
    'photosynthesis AP Bio',
    'cellular respiration AP Bio',
    'enzymes AP Biology',
    'chemiosmosis electron transport chain',
    'Calvin cycle Krebs cycle AP Bio',
  ],
  canonical: CANONICAL,
})

const topics = [
  {
    h: 'Enzymes and reaction regulation',
    d: 'How enzymes lower activation energy by stabilizing the transition state. The induced-fit model, and how temperature, pH, and substrate concentration affect rate. Competitive versus noncompetitive inhibition, and allosteric and feedback regulation.',
  },
  {
    h: 'Energy, ATP, and coupled reactions',
    d: 'Endergonic versus exergonic reactions, free energy, and how the cell couples energy-releasing reactions to energy-requiring ones using ATP as the shared currency. Why ATP hydrolysis is favorable.',
  },
  {
    h: 'Photosynthesis',
    d: 'Light-dependent reactions in the thylakoid membrane (photosystems II and I, electron transport, water-splitting, ATP and NADPH production) and the light-independent Calvin cycle in the stroma (carbon fixation by RuBisCO, reduction, regeneration of RuBP). What each stage needs and produces.',
  },
  {
    h: 'Cellular respiration',
    d: 'Glycolysis in the cytosol, pyruvate oxidation, the Krebs cycle in the mitochondrial matrix, and oxidative phosphorylation at the inner membrane. Where ATP, NADH, FADH2, and CO2 are made, and the role of oxygen as the final electron acceptor.',
  },
  {
    h: 'Chemiosmosis and anaerobic pathways',
    d: 'How an electron transport chain builds a proton gradient that ATP synthase uses to make ATP — the shared mechanism in both photosynthesis and respiration. Fermentation as a way to regenerate NAD+ when oxygen is absent.',
  },
]

const pitfalls = [
  'Mixing up where each stage happens. Glycolysis is cytosolic; the Krebs cycle is in the matrix; the electron transport chain is on the inner mitochondrial membrane; the Calvin cycle is in the stroma, not the thylakoid.',
  'Saying the Calvin cycle is "the dark reaction that happens at night." It does not require light directly but depends on the ATP and NADPH made by the light reactions, so it effectively runs in the light.',
  'Claiming oxygen is used "to make ATP directly." Oxygen is the final electron acceptor of the electron transport chain — it pulls electrons through so the proton gradient can form.',
  'Confusing competitive and noncompetitive inhibition. Competitive inhibitors bind the active site and can be outcompeted by more substrate; noncompetitive inhibitors bind elsewhere and change the enzyme shape.',
  'Forgetting that fermentation does not make additional ATP beyond glycolysis — its purpose is to recycle NAD+ so glycolysis can continue.',
]

export default function APBiologyUnit3Page() {
  return (
    <UnitShell
      unitNum={3}
      title={'Cellular Energetics'}
      canonical={CANONICAL}
      weight={'12–16% of the exam (approximate, per the CED)'}
      datePublished="2026-06-20"
      heroSummary={
        'Unit 3 is one of the highest-yield units on the AP Biology exam, and the one students most often get tangled in. It covers how enzymes control reactions and how cells capture energy in photosynthesis and release it in cellular respiration. The unifying thread is energy coupling and chemiosmosis — the same proton-gradient logic powers both the chloroplast and the mitochondrion.'
      }
      heroIcon={<Zap className="w-4 h-4" />}
      topics={topics}
      pitfalls={pitfalls}
      tested={
        'Unit 3 is a favorite for data-based MCQs — enzyme rate graphs, respiration rate experiments, and photosynthesis measurements like the floating leaf-disk assay. FRQs in this unit are heavy on experimental design and "predict and justify" tasks: you might be asked to predict how a poison that blocks ATP synthase affects the proton gradient, or design an experiment to measure photosynthetic rate. Tracing electrons and protons step by step is the skill being tested.'
      }
      coaching={
        'Because Unit 3 is both high-weight and high-confusion, we spend extra live time here. We teach photosynthesis and respiration as mirror images built on the same chemiosmotic engine, so students learn one mechanism and apply it twice. We drill the "where does it happen / what goes in / what comes out" table until it is automatic, and we run enzyme and photosynthesis lab datasets so students can interpret the exact graph styles the exam uses. Live online, US time zones.'
      }
      knowsAbout={[
        'AP Biology Unit 3 Cellular Energetics',
        'Photosynthesis',
        'Cellular Respiration',
        'Enzyme Kinetics',
        'Chemiosmosis',
      ]}
      prevUnit={{
        slug: 'ap-biology-unit-2-cell-structure',
        label: 'Unit 2: Cell Structure & Function',
      }}
      nextUnit={{
        slug: 'ap-biology-unit-4-cell-communication',
        label: 'Unit 4: Cell Communication & Cell Cycle',
      }}
      faqs={[
        {
          q: 'What is covered in AP Biology Unit 3?',
          a: 'AP Biology Unit 3 Cellular Energetics covers enzymes and enzyme regulation, ATP and coupled reactions, photosynthesis (light reactions and the Calvin cycle), cellular respiration (glycolysis, Krebs cycle, and oxidative phosphorylation), chemiosmosis, and fermentation.',
        },
        {
          q: 'Why is AP Biology Unit 3 considered hard?',
          a: 'Unit 3 packs photosynthesis and cellular respiration, both multi-step pathways with many locations and products, into a high-weight unit. Students struggle because they memorize steps in isolation instead of seeing that both pathways share the same chemiosmotic proton-gradient mechanism.',
        },
        {
          q: 'How much of the AP Biology exam is Unit 3?',
          a: 'The College Board CED lists Unit 3 at approximately 12 to 16 percent of the multiple-choice section, making it one of the most heavily weighted units. This is published as a range, so treat it as approximate.',
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
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
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
            <div className="flex flex-col md:flex-row gap-4 justify-center">
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
