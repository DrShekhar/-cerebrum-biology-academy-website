/**
 * /ap-biology-unit-6-gene-expression
 *
 * AP Biology Unit 6 study page — Gene Expression and Regulation.
 * Genuinely unit-specific: replication, transcription, translation,
 * regulation, mutation, biotechnology. Targets "AP Bio unit 6 review".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import {
  AlertTriangle,
  ChevronRight,
  MessageCircle,
  Dna,
  GraduationCap,
  Home,
  ListChecks,
  Target,
} from 'lucide-react'

const CANONICAL = '/ap-biology-unit-6-gene-expression'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Unit 6: Gene Expression & Regulation — Review & Study Guide · Cerebrum',
  description:
    'AP Biology Unit 6 Gene Expression and Regulation: DNA replication, transcription, translation, gene regulation (operons and eukaryotic control), mutations, and biotechnology such as PCR and gel electrophoresis. Topics, pitfalls, and how it is tested.',
  keywords: [
    'AP Biology unit 6',
    'AP Bio unit 6 review',
    'gene expression AP Biology',
    'DNA replication transcription translation',
    'gene regulation operon AP Bio',
    'mutations AP Biology',
    'PCR gel electrophoresis AP Bio',
    'biotechnology AP Biology',
  ],
  canonical: CANONICAL,
})

const topics = [
  {
    h: 'DNA replication',
    d: 'Semiconservative replication, the antiparallel structure, and the roles of helicase, DNA polymerase, primase, and ligase. Why one strand is leading and one is lagging (Okazaki fragments), and why replication always proceeds 5′ to 3′.',
  },
  {
    h: 'Transcription',
    d: 'RNA polymerase reading the template strand to build mRNA. Eukaryotic RNA processing: the 5′ cap, the poly-A tail, and the splicing out of introns to join exons. How alternative splicing lets one gene make several proteins.',
  },
  {
    h: 'Translation',
    d: 'The ribosome reading codons, tRNA bringing matching amino acids by anticodon pairing, and the start and stop codons. Using the genetic code, and recognizing that the code is redundant and nearly universal.',
  },
  {
    h: 'Regulation of gene expression',
    d: 'Prokaryotic operons (the lac and trp operons as inducible and repressible models) and eukaryotic control through transcription factors, regulatory sequences, epigenetic modification (DNA methylation, histone modification), and post-transcriptional control. Why differential gene expression produces specialized cell types.',
  },
  {
    h: 'Mutations and biotechnology',
    d: 'Point mutations (silent, missense, nonsense) and frameshift mutations, and how they affect the protein. Biotechnology tools: PCR to amplify DNA, gel electrophoresis to separate fragments by size, restriction enzymes, plasmids and transformation, and CRISPR.',
  },
]

const pitfalls = [
  'Confusing replication, transcription, and translation. Replication copies DNA to DNA; transcription copies DNA to RNA; translation reads RNA to build protein.',
  'Reading the wrong strand. Transcription uses the template (antisense) strand, and the resulting mRNA matches the coding strand except that uracil replaces thymine.',
  'Saying a silent mutation "changes the protein." Because the genetic code is redundant, a silent mutation changes a codon but not the amino acid.',
  'Getting the lac and trp operons backward. The lac operon is inducible (turned on by lactose); the trp operon is repressible (turned off when tryptophan is abundant).',
  'Treating gel electrophoresis as if larger fragments travel farther. Smaller fragments move faster and farther through the gel toward the positive electrode.',
]

export default function APBiologyUnit6Page() {
  return (
    <UnitShell
      unitNum={6}
      title={'Gene Expression and Regulation'}
      canonical={CANONICAL}
      weight={'12–16% of the exam (approximate, per the CED)'}
      datePublished="2026-06-20"
      heroSummary={
        'Unit 6 is the molecular-information unit and one of the highest-weight on the exam. It follows the flow of genetic information — replication, transcription, translation — then layers on regulation, mutation, and the biotechnology tools that exploit these processes. It is dense, but the payoff is large because the exam returns to it again and again.'
      }
      heroIcon={<Dna className="w-4 h-4" />}
      topics={topics}
      pitfalls={pitfalls}
      tested={
        'Unit 6 MCQs test sequence-level reasoning: given a DNA strand, produce the mRNA and the amino acids, or predict how a specific mutation changes the product. Operon questions ask you to predict expression under different conditions. FRQs frequently center on biotechnology — interpreting a gel, designing a PCR-based experiment, or explaining how a genetic tool works — and on connecting a regulatory change to a phenotype. This is a unit where careful, directional molecular logic is rewarded.'
      }
      coaching={
        'We teach Unit 6 as one continuous story rather than three separate processes, so students can trace information from gene to protein without losing the thread. We drill codon-to-amino-acid translation and mutation effects until they are reflexive, and we run real gel-electrophoresis and PCR datasets because the biotechnology FRQ is so common. Operons get a dedicated logic worksheet. Live online, US time zones.'
      }
      knowsAbout={[
        'AP Biology Unit 6 Gene Expression',
        'DNA Replication',
        'Transcription and Translation',
        'Gene Regulation',
        'Biotechnology PCR',
      ]}
      prevUnit={{ slug: 'ap-biology-unit-5-heredity', label: 'Unit 5: Heredity' }}
      nextUnit={{ slug: 'ap-biology-unit-7-natural-selection', label: 'Unit 7: Natural Selection' }}
      faqs={[
        {
          q: 'What is covered in AP Biology Unit 6?',
          a: 'AP Biology Unit 6 Gene Expression and Regulation covers DNA replication, transcription, translation, regulation of gene expression (operons and eukaryotic control), mutations, and biotechnology tools such as PCR, gel electrophoresis, restriction enzymes, and CRISPR.',
        },
        {
          q: 'What is the difference between the lac and trp operons in AP Biology Unit 6?',
          a: 'The lac operon is inducible: it is normally off and is switched on when lactose is present. The trp operon is repressible: it is normally on and is switched off when tryptophan is abundant. Knowing which is which is a frequent Unit 6 exam point.',
        },
        {
          q: 'How much of the AP Biology exam is Unit 6?',
          a: 'The College Board CED lists Unit 6 at approximately 12 to 16 percent of the multiple-choice section, making it one of the most heavily weighted units. This is published as a range, so treat it as approximate.',
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
