/**
 * /ap-biology-unit-7-natural-selection
 *
 * AP Biology Unit 7 study page — Natural Selection. Genuinely
 * unit-specific: evidence for evolution, selection types,
 * Hardy-Weinberg, speciation, phylogeny. Highest-weight unit.
 * Targets "AP Bio unit 7 review".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import {
  AlertTriangle,
  ChevronRight,
  MessageCircle,
  Sprout,
  GraduationCap,
  Home,
  ListChecks,
  Target,
} from 'lucide-react'

const CANONICAL = '/ap-biology-unit-7-natural-selection'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Unit 7: Natural Selection — Review & Study Guide · Cerebrum',
  description:
    'AP Biology Unit 7 Natural Selection: evidence for evolution, types of natural selection, Hardy-Weinberg equilibrium and population genetics, speciation, phylogenetic trees, and the origin of life. The highest-weight unit. Topics, pitfalls, and how it is tested.',
  keywords: [
    'AP Biology unit 7',
    'AP Bio unit 7 review',
    'natural selection AP Biology',
    'Hardy-Weinberg equilibrium AP Bio',
    'population genetics AP Biology',
    'speciation AP Bio',
    'phylogenetic trees AP Biology',
    'evidence for evolution AP Bio',
  ],
  canonical: CANONICAL,
})

const topics = [
  {
    h: 'Evidence for evolution',
    d: 'Multiple independent lines of evidence: the fossil record, homologous and vestigial structures, comparative embryology, biogeography, and molecular/DNA similarities. How convergent evolution produces analogous structures, which are not evidence of common ancestry.',
  },
  {
    h: 'Natural selection and adaptation',
    d: 'How differential survival and reproduction change allele frequencies over generations. Directional, stabilizing, and disruptive selection, plus sexual selection. The difference between natural selection (non-random) and genetic drift, gene flow, and mutation as other mechanisms of change.',
  },
  {
    h: 'Hardy-Weinberg equilibrium',
    d: 'The five conditions for a non-evolving population and the equations p + q = 1 and p² + 2pq + q² = 1. Using them to calculate allele and genotype frequencies and to test whether a population is actually evolving — the single most-tested calculation in AP Biology.',
  },
  {
    h: 'Speciation and reproductive isolation',
    d: 'Allopatric versus sympatric speciation, prezygotic and postzygotic isolating barriers, and the biological species concept. Gradualism versus punctuated equilibrium as patterns of evolutionary change.',
  },
  {
    h: 'Phylogeny and the origin of life',
    d: 'Building and interpreting cladograms and phylogenetic trees from shared derived characters and molecular data. Common ancestry, the meaning of nodes and branch points, and hypotheses about early life including the RNA world and endosymbiosis (linking back to Unit 2).',
  },
]

const pitfalls = [
  'Saying organisms "evolve to" get a trait or evolve "because they need it." Variation arises randomly through mutation; selection then favors variants that already exist. Evolution has no goal.',
  'Treating natural selection and genetic drift as the same thing. Selection is non-random and favors fitness; drift is random change in allele frequency, strongest in small populations.',
  'Forgetting that Hardy-Weinberg describes a population that is NOT evolving. Deviation from the predicted frequencies is the signal that evolution is occurring.',
  'Confusing p² (homozygous dominant frequency) with p (the dominant allele frequency). Mislabeling these wrecks the calculation.',
  'Reading a phylogenetic tree by tip proximity rather than by most recent common ancestor. Relatedness is determined by shared nodes, not by how close two tips are drawn.',
]

export default function APBiologyUnit7Page() {
  return (
    <UnitShell
      unitNum={7}
      title={'Natural Selection'}
      canonical={CANONICAL}
      weight={'13–20% of the exam (approximate, per the CED)'}
      datePublished="2026-06-20"
      heroSummary={
        'Unit 7 carries the largest approximate weight on the AP Biology exam and is the most quantitative. It covers the evidence for evolution, how natural selection shapes populations, the Hardy-Weinberg model for testing whether a population is evolving, speciation, and reading phylogenetic trees. If you invest extra time anywhere, invest it here.'
      }
      heroIcon={<Sprout className="w-4 h-4" />}
      topics={topics}
      pitfalls={pitfalls}
      tested={
        'Unit 7 is where the exam concentrates its quantitative firepower. Expect Hardy-Weinberg calculations in both the MCQ and FRQ sections, often embedded in the required quantitative FRQ. Phylogeny questions ask you to interpret or construct a tree and infer relationships. FRQs commonly give population data and ask you to determine whether the population is evolving and justify with evidence. Mastering the Hardy-Weinberg equations alone protects a large share of the exam score.'
      }
      coaching={
        'Given its weight, Unit 7 gets the most time in our plan. We make Hardy-Weinberg automatic — students solve dozens of variations until p, q, p², 2pq, and q² are second nature and they can decide whether a population is evolving in seconds. We drill cladogram reading by most-recent-common-ancestor logic, and we correct the "evolution has a goal" misconception early because it costs students FRQ points every year. Live online, US time zones.'
      }
      knowsAbout={[
        'AP Biology Unit 7 Natural Selection',
        'Hardy-Weinberg Equilibrium',
        'Population Genetics',
        'Speciation',
        'Phylogenetics',
      ]}
      prevUnit={{
        slug: 'ap-biology-unit-6-gene-expression',
        label: 'Unit 6: Gene Expression & Regulation',
      }}
      nextUnit={{ slug: 'ap-biology-unit-8-ecology', label: 'Unit 8: Ecology' }}
      faqs={[
        {
          q: 'What is covered in AP Biology Unit 7?',
          a: 'AP Biology Unit 7 Natural Selection covers the evidence for evolution, mechanisms of evolution including natural selection and genetic drift, the types of selection, Hardy-Weinberg equilibrium and population genetics, speciation and reproductive isolation, and phylogenetic trees.',
        },
        {
          q: 'Why is Hardy-Weinberg so important in AP Biology Unit 7?',
          a: 'Hardy-Weinberg is the most frequently tested calculation in AP Biology. It models a non-evolving population, so deviation from its predicted allele and genotype frequencies is how you detect that a population is evolving. It appears in both multiple-choice and free-response sections.',
        },
        {
          q: 'How much of the AP Biology exam is Unit 7?',
          a: 'The College Board CED lists Unit 7 at approximately 13 to 20 percent of the multiple-choice section, the largest weighting of any unit. This is published as a range, so treat it as approximate.',
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
