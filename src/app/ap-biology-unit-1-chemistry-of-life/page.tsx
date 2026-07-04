/**
 * /ap-biology-unit-1-chemistry-of-life
 *
 * AP Biology Unit 1 study page — Chemistry of Life. Targets the
 * seasonal review query "AP Bio unit 1 review" / "AP Biology
 * chemistry of life". Genuinely unit-specific: water properties,
 * macromolecules, structure-function.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import {
  AlertTriangle,
  ChevronRight,
  MessageCircle,
  FlaskConical,
  GraduationCap,
  Home,
  ListChecks,
  Target,
} from 'lucide-react'

const CANONICAL = '/ap-biology-unit-1-chemistry-of-life'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Unit 1: Chemistry of Life — Review & Study Guide · Cerebrum',
  description:
    'AP Biology Unit 1 Chemistry of Life: water properties, hydrogen bonding, the four macromolecules, dehydration synthesis and hydrolysis, and how structure drives function. Topics, pitfalls, and how it is tested.',
  keywords: [
    'AP Biology unit 1',
    'AP Bio unit 1 review',
    'AP Biology chemistry of life',
    'AP Bio macromolecules',
    'AP Biology water properties',
    'dehydration synthesis hydrolysis',
    'AP Bio unit 1 study guide',
    'properties of water AP Bio',
    'four macromolecules AP Biology',
  ],
  canonical: CANONICAL,
})

const topics = [
  {
    h: 'Structure and properties of water',
    d: 'Polarity, hydrogen bonding, and the emergent properties they cause: cohesion and surface tension, adhesion and capillary action, high specific heat, high heat of vaporization (evaporative cooling), and the lower density of ice. Each property traces directly back to the polar covalent O–H bond.',
  },
  {
    h: 'Elements and the chemistry of carbon',
    d: 'Why carbon is the backbone of life — four valence electrons allow four covalent bonds and diverse skeletons. Functional groups (hydroxyl, carbonyl, carboxyl, amino, phosphate, methyl, sulfhydryl) and how each changes a molecule’s behavior.',
  },
  {
    h: 'The four classes of macromolecules',
    d: 'Carbohydrates (monosaccharides to polysaccharides), lipids (fats, phospholipids, steroids — note lipids are not true polymers), proteins (amino acids to four levels of structure), and nucleic acids (nucleotides to DNA/RNA). Monomers, polymers, and their biological roles.',
  },
  {
    h: 'Dehydration synthesis and hydrolysis',
    d: 'How monomers join by removing water (condensation) and how polymers are broken by adding water (hydrolysis). The same logic applies to all four macromolecule classes — a high-frequency unifying concept on the exam.',
  },
  {
    h: 'Structure determines function',
    d: 'Directionality of macromolecules (5′→3′ in nucleic acids, N- to C-terminus in proteins), how sequence drives folding, and how a change in monomer order or functional group changes the molecule’s job. The CED’s core "structure-function" throughline begins here.',
  },
]

const pitfalls = [
  'Calling lipids "polymers." Lipids are macromolecules but they are not built from repeating identical monomers the way carbohydrates, proteins, and nucleic acids are.',
  'Confusing cohesion (water-to-water) with adhesion (water-to-other-surface). Transpiration in plants uses both — students mix them up on FRQs.',
  'Saying "water is a good solvent because it is polar" without explaining the mechanism — that the partial charges surround and separate ions/polar solutes into hydration shells.',
  'Memorizing functional group names without knowing what they do (e.g., carboxyl is acidic, amino is basic, phosphate carries negative charge and energy).',
  'Forgetting that dehydration synthesis releases water while hydrolysis consumes it — reversing the direction loses easy points.',
]

export default function APBiologyUnit1Page() {
  return (
    <UnitShell
      unitNum={1}
      title="Chemistry of Life"
      canonical={CANONICAL}
      weight="8–11% of the exam (approximate, per the CED)"
      datePublished="2026-06-20"
      heroSummary="Unit 1 is the molecular foundation of AP Biology. Everything downstream — enzymes, membranes, DNA — assumes you understand why water behaves the way it does and how the four macromolecules are built and broken. It is a lighter-weight unit, but skipping it quietly sabotages Units 2, 3, and 6."
      heroIcon={<FlaskConical className="w-4 h-4" />}
      topics={topics}
      pitfalls={pitfalls}
      tested="Unit 1 MCQs lean on interpreting molecular diagrams and identifying functional groups, plus simple data on properties like specific heat. FRQs rarely stand alone on Unit 1 — instead it shows up inside questions about enzymes or membranes, where you must explain how hydrogen bonding or polarity enables a process. Expect to justify a claim using the structure-function relationship."
      coaching="We start every AP Biology cohort here because it is the cheapest insurance against later confusion. We drill the seven functional groups to automaticity, run a single unifying worksheet on dehydration synthesis/hydrolysis across all four macromolecules, and have students explain each water property back as a mechanism (not a label). Live online, US time zones."
      knowsAbout={[
        'AP Biology Unit 1 Chemistry of Life',
        'Properties of Water',
        'Biological Macromolecules',
        'Functional Groups',
      ]}
      prevUnit={null}
      nextUnit={{
        slug: 'ap-biology-unit-2-cell-structure',
        label: 'Unit 2: Cell Structure & Function',
      }}
      faqs={[
        {
          q: 'What is covered in AP Biology Unit 1?',
          a: 'AP Biology Unit 1 Chemistry of Life covers the properties of water, the chemistry of carbon and functional groups, the four classes of macromolecules (carbohydrates, lipids, proteins, nucleic acids), and dehydration synthesis and hydrolysis, all framed around how structure determines function.',
        },
        {
          q: 'Is AP Biology Unit 1 hard?',
          a: 'Unit 1 is one of the more approachable AP Biology units conceptually, but students lose points by memorizing instead of explaining mechanisms. The challenge is connecting molecular structure to biological function, a skill the exam tests throughout all 8 units.',
        },
        {
          q: 'How much of the AP Biology exam is Unit 1?',
          a: 'The College Board CED lists Unit 1 at approximately 8 to 11 percent of the multiple-choice section. This is published as a range, so treat it as approximate rather than an exact figure.',
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
