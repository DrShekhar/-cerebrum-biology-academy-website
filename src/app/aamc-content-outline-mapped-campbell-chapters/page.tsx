/**
 * /aamc-content-outline-mapped-campbell-chapters
 *
 * Cornerstone informational page for MCAT Biology students who want
 * to use Campbell Biology as their primary content text. Maps the
 * AAMC's four foundational concepts (1A through 4F) directly to
 * Campbell chapter numbers, flags where Campbell underdelivers, and
 * recommends supplementary reading (Lehninger, Kandel).
 *
 * Target keywords: "AAMC content outline Campbell chapters",
 * "MCAT topics Campbell mapping", "Campbell Biology for MCAT
 * chapter-by-chapter".
 *
 * Server component. No 'use client'. USD-only.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
} from 'lucide-react'

const CANONICAL = '/aamc-content-outline-mapped-campbell-chapters'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'AAMC Content Outline Mapped to Campbell Biology Chapters',
  description:
    "Map AAMC's 4 MCAT foundational concepts (1A-4F) to specific Campbell Biology chapters. Where Campbell underdelivers, what to supplement, and a chapter-by-chapter MCAT study sequence.",
  keywords: [
    'AAMC content outline Campbell chapters',
    'MCAT topics Campbell mapping',
    'Campbell Biology for MCAT chapter-by-chapter',
    'AAMC foundational concepts Campbell',
    'MCAT Biology textbook mapping',
    'Campbell chapters MCAT',
    'MCAT content outline 2026',
    'AAMC concept 1A Campbell',
    'AAMC concept 3 Campbell',
    'Campbell Biology 12th edition MCAT',
    'Lehninger biochemistry MCAT',
    'best MCAT biology textbook',
    'MCAT Bio Biochem syllabus',
    'AAMC outline study plan',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'AAMC Content Outline Mapped to Campbell Biology Chapters',
    description:
      "Map AAMC's 4 MCAT foundational concepts to Campbell Biology chapters. Gap analysis + supplementary reading recommendations.",
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AAMC Outline → Campbell Chapters | MCAT Biology Mapping',
    description:
      'Concept 1A-4F mapped to Campbell chapter numbers. Where Campbell underdelivers + what to supplement.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const faqs = [
  {
    question: 'Is Campbell Biology enough for the MCAT Bio/Biochem section?',
    answer:
      'Campbell Biology covers roughly 70-75% of the AAMC content outline for the Biological and Biochemical Foundations of Living Systems section. It is strong on cellular biology, genetics, and organ-system physiology, but underdelivers on biochemistry depth (amino-acid chemistry, enzyme kinetics quantification, metabolic regulation), neuroscience beyond action potentials, and immunology mechanisms. Plan to supplement with Lehninger Principles of Biochemistry for biochem and a focused review resource for neuroscience and immunology.',
  },
  {
    question: 'Which edition of Campbell Biology should I use for the MCAT?',
    answer:
      'The 11th or 12th edition (Urry, Cain, Wasserman, Minorsky, Reece) is current and aligned with how the AAMC frames experimental design and integration questions. Older editions (10th and earlier) are usable for content but lack the experimental-design vignettes that mirror the MCAT passage format. If you already own the 10th edition, it is fine for content review — just pair it with AAMC official practice for the experimental reasoning layer.',
  },
  {
    question: 'How long does it take to read Campbell Biology end-to-end for the MCAT?',
    answer:
      'A focused first pass typically takes 8-12 weeks at 1-2 chapters per day, assuming 1-2 hours of active reading plus 30-45 minutes of self-testing per chapter. Skim-and-flag passes are faster (4-6 weeks) but should be followed by targeted re-reads of the high-yield chapters (Concept 1 biomolecules, Concept 2 cellular metabolism, Concept 3 molecular biology, Concept 4 organ systems). Most successful MCAT takers complete 2-3 passes of the high-yield chapters before test day.',
  },
  {
    question: 'Why does the AAMC content outline matter more than the textbook?',
    answer:
      'The AAMC content outline is the authoritative scope document for what the MCAT tests. The exam-writers map each item to a foundational concept (1A through 4F) and a content category. Textbooks like Campbell are organised pedagogically — by structure-function, by level of organisation — not by exam concept. Reading Campbell without cross-mapping to the AAMC outline risks over-studying low-yield topics (deep plant biology, biodiversity) and under-studying high-yield topics (enzyme kinetics, signal transduction, metabolic regulation).',
  },
  {
    question: 'What supplementary texts do you recommend beyond Campbell?',
    answer:
      'For biochemistry depth: Lehninger Principles of Biochemistry (Nelson and Cox) — chapters on amino acids, enzyme kinetics, glycolysis, citric acid cycle, oxidative phosphorylation. For neuroscience: Principles of Neural Science (Kandel et al.) — selected chapters on action potentials, synaptic transmission, sensory systems. For organ-system physiology: Costanzo Physiology is a faster, more MCAT-aligned alternative to Guyton. For the exam itself: AAMC Official Practice (Section Banks, Question Packs, Sample Test, FL1-FL5) is non-negotiable — it is the only resource that actually reflects MCAT passage style.',
  },
  {
    question: 'How do AAMC foundational concepts relate to the four MCAT sections?',
    answer:
      'The AAMC organises all MCAT content under 10 foundational concepts split across the four sections. The Biological and Biochemical Foundations of Living Systems (Bio/Biochem, also called B/B) section covers Concepts 1-3 plus Concept 5 (carried over from Chem/Phys). Concept 1 is biomolecules, Concept 2 is cellular processes and energy, Concept 3 is genetic information transfer, and the cross-section concepts cover homeostasis and organ-system function. Campbell maps best to Concepts 1, 2, 3, and the physiology-heavy parts of Concept 5.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AAMC MCAT Content Outline Mapped to Campbell Biology Chapters',
  description:
    "Authoritative mapping of AAMC's 4 foundational concepts (1A through 4F) to Campbell Biology chapter numbers, with gap analysis and supplementary reading recommendations.",
  url: PAGE_URL,
  inLanguage: 'en-US',
  datePublished: '2026-05-04',
  dateModified: '2026-06-08',
  author: {
    '@type': 'Person',
    name: 'Dr. Shekhar C Singh',
    url: `${SITE_URL}/faculty`,
    jobTitle: 'Founder, AIIMS Delhi Graduate',
  },
  reviewedBy: { '@type': 'Person', name: 'Dr. Shekhar C Singh' },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'MCAT Biology',
      item: `${SITE_URL}/mcat-biology-preparation`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'AAMC Outline → Campbell Mapping',
      item: PAGE_URL,
    },
  ],
}

const WHATSAPP_HREF =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi Dr. Shekhar — I'm preparing for MCAT Bio/Biochem and would like to use Campbell Biology with the AAMC outline mapping. Can you walk me through a study plan?"
  )

const conceptRows = [
  {
    concept: '1A',
    title: 'Structure and function of proteins and their constituent amino acids',
    campbell: 'Ch 3 (Carbon and macromolecules) · Ch 5 (Macromolecules: proteins)',
    yield: 'Very high',
    notes:
      'Campbell covers amino-acid R-groups and protein structure at conceptual level. Supplement with Lehninger Ch 3-4 for pKa, isoelectric point, and the deeper conformational chemistry MCAT tests.',
  },
  {
    concept: '1B',
    title: 'Transmission of genetic information from the gene to the protein',
    campbell: 'Ch 13 (Meiosis) · Ch 16 (DNA structure) · Ch 17 (Gene to protein)',
    yield: 'Very high',
    notes:
      'Campbell strong on replication, transcription, translation, and the genetic code. AAMC integrates these with experimental techniques (PCR, Sanger sequencing, gel electrophoresis) which Campbell touches in Ch 20.',
  },
  {
    concept: '1C',
    title: 'Transmission of heritable information from generation to generation',
    campbell: 'Ch 14 (Mendel) · Ch 15 (Chromosomal basis of inheritance)',
    yield: 'High',
    notes:
      'Pedigrees, autosomal recessive vs dominant, X-linked traits, codominance, incomplete dominance — Campbell handles all of this well at the right depth.',
  },
  {
    concept: '1D',
    title:
      'Principles of bioenergetics and fuel molecule metabolism (carbohydrates, lipids, amino acids, nucleotides)',
    campbell: 'Ch 5 (Macromolecules) · Ch 8 (Metabolism intro) · Ch 9 (Cellular respiration)',
    yield: 'Very high',
    notes:
      'Campbell underdelivers on metabolic-pathway regulation specifics (allosteric enzymes in glycolysis, fatty-acid beta-oxidation control). Supplement with Lehninger Ch 14-17 for the depth MCAT wants.',
  },
  {
    concept: '2A',
    title: 'Assemblies of molecules, cells, and groups of cells within multicellular organisms',
    campbell: 'Ch 6 (Tour of the cell) · Ch 7 (Membrane structure)',
    yield: 'High',
    notes:
      'Cell organelles, membrane structure, fluid mosaic model, membrane transport modalities — Campbell strong here. MCAT extends to lipid rafts and endocytosis/exocytosis specifics, also covered.',
  },
  {
    concept: '2B',
    title: 'The structure, growth, physiology, and genetics of prokaryotes and viruses',
    campbell: 'Ch 19 (Viruses) · Ch 27 (Prokaryotes)',
    yield: 'Medium',
    notes:
      "Campbell's microbiology coverage is thin compared with what AAMC sometimes tests (bacterial transformation, plasmid biology, lytic vs lysogenic cycles, antibiotic resistance mechanisms). Supplement with a focused microbiology primer.",
  },
  {
    concept: '2C',
    title: 'Processes of cell division, differentiation, and specialisation',
    campbell: 'Ch 12 (Cell cycle) · Ch 13 (Meiosis) · Ch 18 (Gene regulation)',
    yield: 'High',
    notes:
      'Mitosis vs meiosis, cyclins, checkpoints, cancer and the cell cycle — all well-covered. Differentiation and stem cells in Ch 18 and Ch 47.',
  },
  {
    concept: '3A',
    title:
      'Structure and functions of the nervous and endocrine systems and ways these systems coordinate the organ systems',
    campbell: 'Ch 45 (Endocrine) · Ch 48-49 (Neurons, nervous systems)',
    yield: 'Very high',
    notes:
      "Campbell's action-potential and synapse chapters are clear and adequate for MCAT. Endocrine feedback loops well-explained. For deeper neuroscience (sensory transduction, neurotransmitter receptor classes), supplement with Kandel selected chapters.",
  },
  {
    concept: '3B',
    title:
      'Structure and integrative functions of the main organ systems (cardiovascular, respiratory, renal, digestive, etc.)',
    campbell:
      'Ch 40 (Animal form) · Ch 42 (Circulation, respiration) · Ch 44 (Renal) · Ch 41 (Digestion)',
    yield: 'Very high',
    notes:
      'Campbell organ-system chapters are the right depth for MCAT. Pair with quick-reference physiology (Costanzo) for integration questions across systems.',
  },
  {
    concept: '4A-4F',
    title:
      'Physical principles, light/sound, atoms/molecules, thermodynamics, electrochemistry, fluids (Chem/Phys section overlap with B/B)',
    campbell: 'Not in Campbell — see general chemistry + physics texts',
    yield: 'Low overlap with B/B',
    notes:
      "Concept 4 is mostly Chem/Phys section. The B/B section borrows physical concepts only where they intersect biology — e.g., diffusion (Fick's law), osmotic pressure, partial pressures in gas exchange.",
  },
]

const chapterTableRows = [
  ['Ch 1-2', 'Introduction, chemistry basics', 'Foundation only'],
  ['Ch 3', 'Carbon and the molecular diversity of life', '1A · 1D'],
  ['Ch 4', 'Carbohydrates', '1A · 1D'],
  ['Ch 5', 'Proteins, lipids, nucleic acids', '1A · 1D'],
  ['Ch 6', 'A tour of the cell', '2A'],
  ['Ch 7', 'Membrane structure and function', '2A'],
  ['Ch 8', 'An introduction to metabolism', '1D · 2A'],
  ['Ch 9', 'Cellular respiration and fermentation', '1D · 2A'],
  ['Ch 10', 'Photosynthesis', 'Low yield · skim only'],
  ['Ch 11', 'Cell communication / signal transduction', '2A · 3A'],
  ['Ch 12', 'The cell cycle', '2C'],
  ['Ch 13', 'Meiosis and sexual life cycles', '1B · 1C · 2C'],
  ['Ch 14', 'Mendel and the gene idea', '1C'],
  ['Ch 15', 'Chromosomal basis of inheritance', '1C'],
  ['Ch 16', 'The molecular basis of inheritance', '1B'],
  ['Ch 17', 'Gene expression: from gene to protein', '1B'],
  ['Ch 18', 'Regulation of gene expression', '1B · 2C'],
  ['Ch 19', 'Viruses', '2B'],
  ['Ch 20', 'DNA tools and biotechnology', '1B (experimental techniques)'],
  ['Ch 21', 'Genomes and their evolution', 'Low yield · skim only'],
  ['Ch 22-26', 'Evolution, population genetics', '1C (population-genetics overlap)'],
  ['Ch 27', 'Bacteria and archaea', '2B'],
  ['Ch 28-39', 'Diversity of life (plants, fungi, animals)', 'Very low yield · skip'],
  ['Ch 40', 'Basic principles of animal form and function', '3B'],
  ['Ch 41', 'Animal nutrition (digestion)', '3B'],
  ['Ch 42', 'Circulation and gas exchange', '3B'],
  ['Ch 43', 'The immune system', '3B (low-medium yield)'],
  ['Ch 44', 'Osmoregulation and excretion (renal)', '3B'],
  ['Ch 45', 'Hormones and the endocrine system', '3A'],
  ['Ch 46', 'Animal reproduction', '3B (medium yield)'],
  ['Ch 47', 'Animal development', '2C (medium yield)'],
  ['Ch 48', 'Neurons, synapses, and signalling', '3A'],
  ['Ch 49', 'Nervous systems', '3A'],
  ['Ch 50', 'Sensory and motor mechanisms', '3A (medium yield)'],
  ['Ch 51', 'Animal behaviour', 'Low yield · skim only'],
  ['Ch 52-56', 'Ecology', 'Very low yield · skip'],
]

export default function AAMCOutlineCampbellChaptersPage() {
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
                <Link
                  href="/mcat-biology-preparation"
                  className="text-gray-600 hover:text-blue-700"
                >
                  MCAT Biology
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">AAMC Outline → Campbell Mapping</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" /> Chapter-by-chapter · AAMC outline aligned · 2026
              cycle
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              AAMC MCAT Content Outline —
              <span className="block text-yellow-400 mt-2">
                Mapped to Campbell Biology Chapters
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              Campbell Biology is the canonical textbook for MCAT Bio/Biochem content review — but
              the AAMC publishes its own scope document, and the two are not organised the same way.
              This page maps the AAMC&apos;s four foundational concepts (1A through 4F) to Campbell
              chapter numbers, flags the topics where Campbell underdelivers, and recommends
              supplementary reading for the gaps. Use it as your master content-review checklist.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why this mapping exists
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Most MCAT students arrive with Campbell Biology (Urry, Cain, Wasserman, Minorsky,
              Reece) as their primary content text. Campbell is comprehensive, well-illustrated, and
              pedagogically excellent — but it is written for undergraduate biology majors, not MCAT
              test-takers. The book organises content by biological theme (chemistry of life, the
              cell, genetics, evolution, diversity, plants, animals, ecology) across 56 chapters and
              roughly 1,500 pages.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The AAMC, by contrast, publishes a separate document called the{' '}
              <em>MCAT Content Outline</em> that breaks the entire exam into 10 foundational
              concepts. Four of those concepts (Concepts 1, 2, 3, and parts of 5) drive the
              Biological and Biochemical Foundations of Living Systems section. Each foundational
              concept is further divided into content categories labelled 1A, 1B, 1C, 1D, 2A, 2B,
              2C, 3A, 3B — and so on. The AAMC outline is the authoritative scope document. The MCAT
              does not test from Campbell. It tests from the outline.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The mismatch is real. Campbell spends 11 chapters on plant and fungal biology
              (chapters 28-39) — the AAMC tests almost none of it. Campbell spends one half-chapter
              on enzyme kinetics — the AAMC tests it heavily. Campbell&apos;s biochemistry coverage
              is light; the AAMC integrates biochemistry into roughly 25% of the B/B section.
              Reading Campbell without the AAMC overlay risks studying the wrong things at the wrong
              depth. This page fixes that.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The four foundational concepts at a glance
            </h2>
            <p className="text-slate-600 mb-8">
              The AAMC structures all B/B content under these four concepts. Concept 4 (physical
              principles) overlaps mostly with Chem/Phys but appears in B/B where biology touches
              physics — diffusion, osmotic pressure, partial pressures.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-3">
                  Concept 1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Biomolecules and their assembly
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Amino acids, proteins, nucleic acids, lipids, carbohydrates. Their chemistry,
                  structure, function, and the bioenergetic principles that govern their assembly
                  and metabolism. <strong>Campbell chapters 3-5, 8, 9.</strong>
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-3">
                  Concept 2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Cellular processes and energy
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Cell structure, membrane biology, signal transduction, ATP synthesis,
                  fermentation, photosynthesis (light coverage), and cell signalling.{' '}
                  <strong>Campbell chapters 6-12.</strong>
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-3">
                  Concept 3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Genetic information transfer
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  DNA structure and replication, transcription, translation, gene regulation,
                  Mendelian and molecular genetics, biotechnology techniques (PCR, gel
                  electrophoresis, Sanger sequencing). <strong>Campbell chapters 13-21.</strong>
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-3">
                  Concept 5 (in B/B)
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Living systems — organ-level
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Homeostasis, the organ systems (cardiovascular, respiratory, renal, digestive,
                  endocrine, nervous, immune, reproductive), and integration across systems.{' '}
                  <strong>Campbell chapters 40-52.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              AAMC content category → Campbell chapters (full mapping)
            </h2>
            <p className="text-slate-600 mb-6">
              Each AAMC content category mapped to specific Campbell chapter numbers, with a yield
              estimate and supplementary-reading notes where Campbell underdelivers.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-left bg-slate-50">
                    <th className="py-3 px-3 font-semibold text-slate-900">AAMC</th>
                    <th className="py-3 px-3 font-semibold text-slate-900">Content category</th>
                    <th className="py-3 px-3 font-semibold text-slate-900">Campbell chapters</th>
                    <th className="py-3 px-3 font-semibold text-slate-900">Yield</th>
                    <th className="py-3 px-3 font-semibold text-slate-900">Notes / supplement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {conceptRows.map((row) => (
                    <tr key={row.concept} className="hover:bg-slate-50 align-top">
                      <td className="py-3 px-3 font-mono font-bold text-blue-700">{row.concept}</td>
                      <td className="py-3 px-3 text-slate-800">{row.title}</td>
                      <td className="py-3 px-3 text-slate-700">{row.campbell}</td>
                      <td className="py-3 px-3 text-slate-700">{row.yield}</td>
                      <td className="py-3 px-3 text-xs text-slate-600 leading-snug">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Sources: AAMC <em>What&apos;s on the MCAT Exam? Content Outline</em> (current 2026
              cycle); Campbell Biology, 12th edition (Urry, Cain, Wasserman, Minorsky, Reece). Yield
              estimates synthesised from AAMC topic-frequency data and Reddit r/MCAT crowdsourced
              reports across 2023-2025 administrations.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Chapter-by-chapter reading priority
            </h2>
            <p className="text-slate-600 mb-6">
              Use this table as your reading checklist. Chapters marked &ldquo;Foundation
              only,&rdquo; &ldquo;Very low yield · skip,&rdquo; or &ldquo;Low yield · skim
              only&rdquo; can be de-prioritised in favour of high-yield chapters and AAMC official
              practice. Total high-yield reading is roughly 30 chapters of 56.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-left bg-white">
                    <th className="py-3 px-3 font-semibold text-slate-900">Campbell Ch</th>
                    <th className="py-3 px-3 font-semibold text-slate-900">Topic</th>
                    <th className="py-3 px-3 font-semibold text-slate-900">AAMC concept</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {chapterTableRows.map((row) => (
                    <tr key={row[0]} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-medium text-slate-900">{row[0]}</td>
                      <td className="py-3 px-3 text-slate-700">{row[1]}</td>
                      <td className="py-3 px-3 text-slate-700">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Topics where Campbell underdelivers
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Campbell is excellent at the breadth of biology but thin in three specific areas the
              MCAT tests heavily. Plan to supplement with focused resources for these gaps — roughly
              40-60 additional hours of reading and practice.
            </p>
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-2">
                  1. Biochemistry depth — enzyme kinetics, metabolic regulation
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-2">
                  Campbell&apos;s biochemistry sits inside the macromolecules chapters (3-5) and
                  metabolism chapter (8-9). It is correct at the conceptual level but does not push
                  into the depth MCAT tests: Michaelis-Menten kinetics (Vmax, Km, Lineweaver-Burk
                  plots), allosteric regulation specifics (phosphofructokinase, hexokinase),
                  competitive vs non-competitive vs uncompetitive inhibition, fatty-acid
                  beta-oxidation control, ketogenesis, gluconeogenesis regulation, amino-acid
                  catabolism, and the urea cycle.
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>Supplement:</strong> Lehninger Principles of Biochemistry (Nelson and
                  Cox), 7th or 8th edition. Read chapters 3-4 (amino acids, proteins, enzyme
                  kinetics), 14-15 (glycolysis, citric acid cycle, oxidative phosphorylation), 17-18
                  (fatty-acid metabolism, amino-acid degradation). Roughly 25-30 hours of focused
                  reading. The Lippincott Illustrated Biochemistry is a faster but less rigorous
                  alternative.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-2">
                  2. Neuroscience — sensory transduction, neurotransmitter receptors
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-2">
                  Campbell chapters 48-50 cover action potentials, synapses, basic nervous-system
                  organisation, and sensory and motor mechanisms. This is enough for the
                  introductory level, but MCAT passages increasingly test sensory transduction
                  details (photoreceptor signal cascades, hair-cell mechanotransduction, olfactory
                  receptors), neurotransmitter receptor classes (ionotropic vs metabotropic, GABA vs
                  glutamate, dopamine and serotonin pathways), and how drugs interact with these
                  receptors.
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>Supplement:</strong> Principles of Neural Science (Kandel, Schwartz,
                  Jessell), selected chapters. Specifically: action potential propagation, synaptic
                  transmission, neurotransmitter classes, and sensory transduction. Roughly 10-15
                  hours. For a faster option, Khan Academy MCAT neuroscience videos paired with AAMC
                  neuroscience-passage practice.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-2">
                  3. Microbiology and immunology — mechanisms, not just survey
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-2">
                  Campbell chapter 19 (viruses), chapter 27 (prokaryotes), and chapter 43 (immune
                  system) cover the ground but at survey depth. MCAT passages test mechanism detail:
                  lytic vs lysogenic cycles in viral replication, bacterial transformation and
                  conjugation, plasmid biology, CRISPR mechanism, antibody structure, MHC class I vs
                  II antigen presentation, B-cell vs T-cell activation, and complement-system
                  cascade.
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>Supplement:</strong> other generalist MCAT brands Biology Review chapters on microbiology
                  and immunology, or the AAMC Bio/Biochem question packs (which contain immunology
                  passages with explanations that fill the conceptual gap). Roughly 5-10 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Recommended supplementary reading list
            </h2>
            <ol className="space-y-4 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>Lehninger Principles of Biochemistry</strong> (Nelson and Cox, 7th or 8th
                ed.). The standard reference for the biochem depth Campbell lacks. Chapters 3-4
                (proteins and enzymes), 13-15 (bioenergetics and glycolysis), 16 (citric acid
                cycle), 19 (oxidative phosphorylation), 17-18 (lipid and amino-acid metabolism).
              </li>
              <li>
                <strong>Costanzo Physiology</strong> (Linda Costanzo, 6th or 7th ed.). Faster and
                more MCAT-aligned than Guyton; high-yield for cardiovascular, renal, respiratory,
                and endocrine integration questions. Roughly 8-10 hours to read the relevant
                chapters.
              </li>
              <li>
                <strong>Principles of Neural Science</strong> (Kandel, Schwartz, Jessell). Use
                selectively for neuroscience depth — chapters on action potentials, synaptic
                transmission, sensory systems. Do not try to read the full text.
              </li>
              <li>
                <strong>other generalist MCAT brands Biology Review</strong>. A faster, more exam-targeted resource
                that compresses Campbell + Lehninger + Kandel into one volume. Useful as a
                second-pass review text after a first Campbell pass. Stronger on micro/immuno than
                Campbell.
              </li>
              <li>
                <strong>AAMC Official Practice</strong>. Non-negotiable. Includes Section Banks,
                Question Packs, Sample Test, and Full-Length Exams 1-5. The only resource that
                actually mirrors MCAT passage style and reasoning patterns. Use after each Campbell
                concept pass to convert content into exam reflex.
              </li>
              <li>
                <strong>UWorld MCAT Q-Bank</strong>. Third-party question bank with detailed
                explanations. Best used after AAMC official material is exhausted — explanations are
                excellent for learning the reasoning patterns the MCAT rewards.
              </li>
            </ol>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How we coach this content review
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              At Cerebrum Biology Academy, we run MCAT Bio/Biochem programmes 100% online from our
              AIIMS Delhi-trained faculty led by Dr. Shekhar C Singh. We use Campbell as the primary
              text, layer Lehninger for biochem depth, and anchor everything to the AAMC official
              practice library. Pricing in USD:
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Self-Paced ($499)</strong> — Async 4-6 month curriculum. Campbell end-to-end
                + Lehninger first-semester biochem + AAMC content outline mapping + 300+ practice
                passages + recorded video library + WhatsApp doubt support.
              </li>
              <li>
                <strong>Small-Batch ($999)</strong> — 4-6 students per cohort. Everything in
                Self-Paced plus weekly 2-hour live sessions, monthly full-length B/B section mocks,
                peer study group, senior-faculty office hours, and AAMC passage walkthroughs.
              </li>
              <li>
                <strong>1:1 with Senior Faculty ($1,499)</strong> — Personalised study plan, weekly
                90-minute video sessions, custom passage drilling on weak topics, mock-exam 1:1
                analysis, unlimited WhatsApp faculty access. Plus $150/hour for ad-hoc gap-fill
                sessions outside the package.
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Last reviewed:</strong> May 2026 by Dr. Shekhar C Singh, AIIMS Delhi
                graduate and founder of Cerebrum Biology Academy. AAMC content outline is reviewed
                annually — verify the current scope document at students-residents.aamc.org.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="bg-white rounded-xl p-5 border border-slate-200 group"
                >
                  <summary className="font-semibold text-slate-900 cursor-pointer">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed faq-answer">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Microscope className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a coach who maps your Campbell reading to the AAMC outline week by week?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Cerebrum coaches the AAMC outline. Founder Dr. Shekhar C Singh (AIIMS Delhi) leads the
              senior-faculty tier. Sessions are 100% online — WhatsApp the team to start.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_HREF}
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Dr. Shekhar
              </a>
              <Link
                href="/mcat-biology-preparation"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <GraduationCap className="w-5 h-5" />
                See the full MCAT Biology programme
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              More MCAT Biology guides
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/mcat-biology-preparation"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">See the full MCAT Biology programme</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Curriculum, faculty, pricing, and enrolment.
                </p>
              </Link>
              <Link
                href="/ap-biology-vs-college-bio-mcat-bridge"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">AP Biology → College → MCAT bridge</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Honest framing of the pre-med pipeline.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
