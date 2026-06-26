/**
 * /ap-biology-units
 *
 * AP Biology UNITS hub — overview of all 8 College Board CED units,
 * the exam format, and a card to each per-unit study page. Targets
 * the seasonal informational cluster "AP Biology units", "AP bio
 * unit list", "AP Biology course outline".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Home,
  MessageCircle,
} from 'lucide-react'

const CANONICAL = '/ap-biology-units'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Units — All 8 College Board Units Explained · Cerebrum',
  description:
    'A complete guide to all 8 AP Biology units in the College Board CED: Chemistry of Life through Ecology. Exam format, what each unit covers, and a study page for every unit.',
  keywords: [
    'AP Biology units',
    'AP Bio units list',
    'AP Biology course outline',
    'AP Biology CED units',
    'AP Biology unit 1 to 8',
    'AP Biology units explained',
    'AP Bio unit review',
    'College Board AP Biology units',
    'AP Biology exam format',
    'AP Biology units order',
  ],
  canonical: CANONICAL,
})

const units = [
  {
    num: 1,
    slug: 'ap-biology-unit-1-chemistry-of-life',
    title: 'Chemistry of Life',
    weight: '8–11% (approximate, per the CED)',
    blurb:
      'Water, macromolecules, and the chemistry that makes biology run — properties of water, the four macromolecule classes, and how structure dictates function.',
  },
  {
    num: 2,
    slug: 'ap-biology-unit-2-cell-structure',
    title: 'Cell Structure and Function',
    weight: '10–13% (approximate, per the CED)',
    blurb:
      'Organelles, membranes, transport, and how surface-area-to-volume ratio constrains cell size. The structural foundation everything else builds on.',
  },
  {
    num: 3,
    slug: 'ap-biology-unit-3-cellular-energetics',
    title: 'Cellular Energetics',
    weight: '12–16% (approximate, per the CED)',
    blurb:
      'Enzymes, photosynthesis, and cellular respiration — the energy-flow mechanisms that AP Biology tests more heavily than almost anything else.',
  },
  {
    num: 4,
    slug: 'ap-biology-unit-4-cell-communication',
    title: 'Cell Communication and Cell Cycle',
    weight: '10–15% (approximate, per the CED)',
    blurb:
      'Signal transduction, feedback, and the regulated cell cycle including mitosis and its checkpoints — how cells talk and how that goes wrong in cancer.',
  },
  {
    num: 5,
    slug: 'ap-biology-unit-5-heredity',
    title: 'Heredity',
    weight: '8–11% (approximate, per the CED)',
    blurb:
      'Meiosis, Mendelian and non-Mendelian inheritance, linkage, and the chromosomal basis of genetic variation. Heavy on probability and pedigrees.',
  },
  {
    num: 6,
    slug: 'ap-biology-unit-6-gene-expression',
    title: 'Gene Expression and Regulation',
    weight: '12–16% (approximate, per the CED)',
    blurb:
      'DNA replication, transcription, translation, gene regulation, mutations, and biotechnology — the molecular flow of information and how it is controlled.',
  },
  {
    num: 7,
    slug: 'ap-biology-unit-7-natural-selection',
    title: 'Natural Selection',
    weight: '13–20% (approximate, per the CED)',
    blurb:
      'Evidence for evolution, natural selection, Hardy-Weinberg equilibrium, speciation, and phylogenetics. The highest-weight unit, and the most quantitative.',
  },
  {
    num: 8,
    slug: 'ap-biology-unit-8-ecology',
    title: 'Ecology',
    weight: '10–15% (approximate, per the CED)',
    blurb:
      'Energy flow, population dynamics, community interactions, ecosystems, and responses to disruption. Connects every prior unit at the scale of populations and biospheres.',
  },
]

export default function APBiologyUnitsHubPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AP Biology Units — All 8 College Board Units Explained',
    description:
      'A complete guide to all 8 AP Biology units in the College Board Course and Exam Description, plus the exam format and a study page for every unit.',
    url: `${SITE_URL}${CANONICAL}`,
    inLanguage: 'en-US',
    datePublished: '2026-06-20',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${CANONICAL}` },
    about: units.map((u) => `AP Biology Unit ${u.num}: ${u.title}`),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many units are in AP Biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AP Biology has 8 units in the College Board Course and Exam Description: Unit 1 Chemistry of Life, Unit 2 Cell Structure and Function, Unit 3 Cellular Energetics, Unit 4 Cell Communication and Cell Cycle, Unit 5 Heredity, Unit 6 Gene Expression and Regulation, Unit 7 Natural Selection, and Unit 8 Ecology.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the format of the AP Biology exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The AP Biology exam is taken in May and has two sections: 60 multiple-choice questions (90 minutes) and 6 free-response questions (90 minutes), split into 2 long FRQs and 4 short FRQs. The composite is scored on the 1 to 5 AP scale.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which AP Biology unit is weighted the most on the exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unit 7 Natural Selection carries the largest approximate weight in the College Board CED, roughly 13 to 20 percent of multiple-choice questions, followed by Units 3 and 6. These exact figures are published as ranges in the CED, so treat them as approximate.',
        },
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
        name: 'AP Biology Tutoring',
        item: `${SITE_URL}/ap-biology-tutor`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AP Biology Units',
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
      <CerebrumPersonSchema
        knowsAbout={[
          'AP Biology',
          'College Board AP Biology CED',
          'AP Biology Units 1-8',
          'AP Biology Exam Preparation',
        ]}
        jobTitle="Founder & Lead AP Biology Faculty"
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
                <span className="text-blue-700 font-medium">AP Biology Units</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" /> All 8 College Board CED units, one place
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="title">
              AP Biology Units —
              <span className="block text-yellow-400 mt-2">The Full Course, Unit by Unit</span>
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed"
              data-speakable="summary"
            >
              AP Biology is organized into 8 units by the College Board Course and Exam Description
              (CED), running from the chemistry of life up to whole-ecosystem ecology. Each unit is
              genuinely different biology with its own vocabulary, mechanisms, and exam traps. This
              hub explains the structure, the May exam format, and links to a dedicated study page
              for every unit.
            </p>
            <p className="text-sm text-slate-400">
              Built for US students. Live online coaching in your time zone (ET / CT / MT / PT),
              pricing in USD.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How the AP Biology course is structured
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The College Board defines AP Biology through its Course and Exam Description. The 8
              units are sequenced from the smallest scale to the largest: you start with the atoms
              and molecules of life (Unit 1), build up to the cell (Unit 2), learn how cells harvest
              and spend energy (Unit 3), how they communicate and divide (Unit 4), then move into
              inheritance (Unit 5) and the molecular machinery behind it (Unit 6), and finally zoom
              out to populations evolving (Unit 7) and interacting in ecosystems (Unit 8).
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Crucially, the units are not equally weighted on the exam. The CED publishes
              approximate weighting ranges rather than exact percentages, and the heaviest units are
              Natural Selection, Cellular Energetics, and Gene Expression. The lighter units —
              Chemistry of Life and Heredity — are still foundational, because later units assume
              you know them cold.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Across all 8 units, AP Biology threads four big ideas: Evolution; Energetics;
              Information storage and transmission; and Systems interactions. The exam rewards
              students who can connect a unit-level fact to one of these big ideas rather than
              memorizing it in isolation.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardList className="w-7 h-7 text-blue-700" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">The exam format</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Section I — Multiple choice</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  60 multiple-choice questions in 90 minutes. Worth 50% of the score. Many questions
                  are data- and graph-based, asking you to interpret an experiment rather than
                  recall a definition.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Section II — Free response</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  6 free-response questions in 90 minutes — 2 long FRQs and 4 short FRQs. Worth 50%
                  of the score. Long FRQs include experimental design and data analysis; short FRQs
                  test a focused concept or model.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              The exam is administered in May and scored on the 1 to 5 AP scale, where a 3 is
              typically considered passing and a 5 is the top score. Most colleges award credit for
              a 4 or 5.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 text-center">
              All 8 units — pick one to study
            </h2>
            <p className="text-slate-600 mb-8 text-center max-w-2xl mx-auto">
              Each page covers the unit&apos;s key topics and learning objectives, the pitfalls
              students fall into, how it is tested in MCQ and FRQ form, and how we coach it.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {units.map((u) => (
                <Link
                  key={u.num}
                  href={`/${u.slug}`}
                  className="group bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                      {u.num}
                    </span>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-700">
                      Unit {u.num}: {u.title}
                    </h3>
                  </div>
                  <p className="text-xs text-blue-700 font-medium mb-1">{u.weight}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{u.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <GraduationCap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want to study these units with a coach?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We teach all 8 units live online, weight the time toward the high-yield ones, and
              grade your FRQs against the real rubric. Faculty trained at AIIMS (All India Institute
              of Medical Sciences, India&apos;s top medical school).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent(
                  'Hi Cerebrum, I have a question about the AP Biology units and your coaching.'
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
            </div>
            <p className="text-sm text-slate-400 mt-6 max-w-2xl mx-auto">
              WhatsApp is free from the US — no international call needed. Live online classes in
              your US time zone (ET/CT/MT/PT).
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
