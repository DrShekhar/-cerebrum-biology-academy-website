'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  Download,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  GraduationCap,
  Brain,
  Microscope,
  Leaf,
  Heart,
  Dna,
  FlaskConical,
  Bug,
  TreePine,
  Baby,
  Syringe,
  Layers,
  FileText,
  Clock,
  Target,
  TrendingUp,
  Users,
  Award,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

/* ─────────────── Chapter Data ─────────────── */

interface Chapter {
  name: string
  slug: string
  unit: string
  class: 11 | 12
  weightage: number
  questionsPerYear: string
  difficulty: 'Easy' | 'Moderate' | 'Hard'
  keyTopics: string[]
  icon: React.ReactNode
  available: boolean
}

const BIOLOGY_CHAPTERS: Chapter[] = [
  // ━━━ CLASS 11 — BOTANY & ZOOLOGY ━━━
  {
    name: 'The Living World',
    slug: 'the-living-world',
    unit: 'Diversity in Living World',
    class: 11,
    weightage: 2,
    questionsPerYear: '1-2',
    difficulty: 'Easy',
    keyTopics: ['Taxonomic hierarchy', 'Nomenclature rules', 'Species concept', 'Taxonomic aids'],
    icon: <Microscope className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Biological Classification',
    slug: 'biological-classification',
    unit: 'Diversity in Living World',
    class: 11,
    weightage: 4,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Five Kingdom Classification', 'Monera', 'Protista', 'Fungi', 'Viruses & Viroids'],
    icon: <Layers className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Plant Kingdom',
    slug: 'plant-kingdom',
    unit: 'Diversity in Living World',
    class: 11,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Algae', 'Bryophytes', 'Pteridophytes', 'Gymnosperms', 'Angiosperms', 'Alternation of generations'],
    icon: <TreePine className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Animal Kingdom',
    slug: 'animal-kingdom',
    unit: 'Diversity in Living World',
    class: 11,
    weightage: 5,
    questionsPerYear: '3-4',
    difficulty: 'Hard',
    keyTopics: ['Phylum classification', 'Chordates vs Non-chordates', 'Basis of classification', 'Examples'],
    icon: <Bug className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Morphology of Flowering Plants',
    slug: 'morphology-of-flowering-plants',
    unit: 'Structural Organisation',
    class: 11,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Root system', 'Stem modifications', 'Leaf venation', 'Flower parts', 'Fruit types'],
    icon: <Leaf className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Anatomy of Flowering Plants',
    slug: 'anatomy-of-flowering-plants',
    unit: 'Structural Organisation',
    class: 11,
    weightage: 2,
    questionsPerYear: '1-2',
    difficulty: 'Moderate',
    keyTopics: ['Tissue systems', 'Dicot vs Monocot anatomy', 'Secondary growth', 'Vascular bundles'],
    icon: <Microscope className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Structural Organisation in Animals',
    slug: 'structural-organisation-in-animals',
    unit: 'Structural Organisation',
    class: 11,
    weightage: 2,
    questionsPerYear: '1-2',
    difficulty: 'Easy',
    keyTopics: ['Epithelial tissue', 'Connective tissue', 'Muscle tissue', 'Neural tissue', 'Cockroach morphology'],
    icon: <Bug className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Cell: The Unit of Life',
    slug: 'cell-the-unit-of-life',
    unit: 'Cell Structure & Function',
    class: 11,
    weightage: 4,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Cell theory', 'Prokaryotic vs Eukaryotic', 'Cell organelles', 'Endomembrane system'],
    icon: <Microscope className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Biomolecules',
    slug: 'biomolecules',
    unit: 'Cell Structure & Function',
    class: 11,
    weightage: 4,
    questionsPerYear: '2-3',
    difficulty: 'Hard',
    keyTopics: ['Proteins', 'Enzymes', 'Carbohydrates', 'Lipids', 'Nucleic acids', 'Enzyme classification'],
    icon: <FlaskConical className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Cell Cycle and Cell Division',
    slug: 'cell-cycle-and-cell-division',
    unit: 'Cell Structure & Function',
    class: 11,
    weightage: 4,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Mitosis', 'Meiosis', 'Cell cycle phases', 'Significance of meiosis'],
    icon: <Dna className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Photosynthesis in Higher Plants',
    slug: 'photosynthesis-in-higher-plants',
    unit: 'Plant Physiology',
    class: 11,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Hard',
    keyTopics: ['Light reactions', 'Calvin cycle', 'C3 vs C4 plants', 'Photorespiration', 'Factors affecting'],
    icon: <Leaf className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Respiration in Plants',
    slug: 'respiration-in-plants',
    unit: 'Plant Physiology',
    class: 11,
    weightage: 2,
    questionsPerYear: '1-2',
    difficulty: 'Moderate',
    keyTopics: ['Glycolysis', 'Krebs cycle', 'ETC', 'Fermentation', 'Amphibolic pathway'],
    icon: <Leaf className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Plant Growth and Development',
    slug: 'plant-growth-and-development',
    unit: 'Plant Physiology',
    class: 11,
    weightage: 2,
    questionsPerYear: '1-2',
    difficulty: 'Easy',
    keyTopics: ['Growth phases', 'Plant hormones', 'Photoperiodism', 'Vernalisation'],
    icon: <TrendingUp className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Human Physiology — Complete Unit Notes',
    slug: 'human-physiology',
    unit: 'Human Physiology',
    class: 11,
    weightage: 30,
    questionsPerYear: '15-18',
    difficulty: 'Hard',
    keyTopics: ['Digestion', 'Respiration', 'Circulation', 'Excretion', 'Locomotion', 'Nervous System', 'Endocrine System'],
    icon: <Heart className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Digestion and Absorption',
    slug: 'digestion-and-absorption',
    unit: 'Human Physiology',
    class: 11,
    weightage: 4,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Alimentary canal', 'Digestive enzymes', 'Absorption of nutrients', 'Disorders'],
    icon: <Heart className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Breathing and Exchange of Gases',
    slug: 'breathing-and-exchange-of-gases',
    unit: 'Human Physiology',
    class: 11,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Respiratory organs', 'Mechanism of breathing', 'Gas transport', 'Respiratory volumes'],
    icon: <Heart className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Body Fluids and Circulation',
    slug: 'body-fluids-and-circulation',
    unit: 'Human Physiology',
    class: 11,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Blood composition', 'Heart anatomy', 'Cardiac cycle', 'ECG', 'Double circulation'],
    icon: <Heart className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Excretory Products and their Elimination',
    slug: 'excretory-products',
    unit: 'Human Physiology',
    class: 11,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Hard',
    keyTopics: ['Nephron structure', 'Urine formation', 'Counter-current mechanism', 'Dialysis'],
    icon: <Heart className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Locomotion and Movement',
    slug: 'locomotion-and-movement',
    unit: 'Human Physiology',
    class: 11,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Types of movement', 'Skeletal system', 'Joints', 'Muscle contraction', 'Disorders'],
    icon: <Heart className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Neural Control and Coordination',
    slug: 'neural-control-and-coordination',
    unit: 'Human Physiology',
    class: 11,
    weightage: 4,
    questionsPerYear: '3-4',
    difficulty: 'Hard',
    keyTopics: ['Neuron structure', 'Nerve impulse', 'CNS', 'Reflex arc', 'Sense organs'],
    icon: <Brain className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Chemical Coordination and Integration',
    slug: 'chemical-coordination-and-integration',
    unit: 'Human Physiology',
    class: 11,
    weightage: 4,
    questionsPerYear: '3-4',
    difficulty: 'Hard',
    keyTopics: ['Endocrine glands', 'Hormones', 'Mechanism of action', 'Hormone disorders'],
    icon: <FlaskConical className="w-5 h-5" />,
    available: false,
  },

  // ━━━ CLASS 12 — BOTANY & ZOOLOGY ━━━
  {
    name: 'Reproduction — Complete Unit Notes',
    slug: 'reproduction',
    unit: 'Reproduction',
    class: 12,
    weightage: 15,
    questionsPerYear: '8-10',
    difficulty: 'Hard',
    keyTopics: ['Asexual & sexual reproduction', 'Flowering plant reproduction', 'Male & female reproductive systems', 'Menstrual cycle', 'Fertilisation & embryo development', 'Reproductive health & ART'],
    icon: <Baby className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Reproduction in Organisms',
    slug: 'reproduction-in-organisms',
    unit: 'Reproduction',
    class: 12,
    weightage: 2,
    questionsPerYear: '1-2',
    difficulty: 'Easy',
    keyTopics: ['Asexual reproduction', 'Sexual reproduction', 'Events in sexual reproduction'],
    icon: <Baby className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Sexual Reproduction in Flowering Plants',
    slug: 'sexual-reproduction-in-flowering-plants',
    unit: 'Reproduction',
    class: 12,
    weightage: 5,
    questionsPerYear: '3-4',
    difficulty: 'Hard',
    keyTopics: ['Microsporogenesis', 'Megasporogenesis', 'Pollination', 'Double fertilisation', 'Endosperm'],
    icon: <Leaf className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Human Reproduction',
    slug: 'human-reproduction',
    unit: 'Reproduction',
    class: 12,
    weightage: 5,
    questionsPerYear: '3-4',
    difficulty: 'Hard',
    keyTopics: ['Male reproductive system', 'Female reproductive system', 'Gametogenesis', 'Menstrual cycle', 'Embryo development'],
    icon: <Baby className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Reproductive Health',
    slug: 'reproductive-health',
    unit: 'Reproduction',
    class: 12,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Easy',
    keyTopics: ['Population explosion', 'Birth control', 'STDs', 'Infertility', 'ART techniques'],
    icon: <Syringe className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Principles of Inheritance and Variation',
    slug: 'principles-of-inheritance-and-variation',
    unit: 'Genetics & Evolution',
    class: 12,
    weightage: 8,
    questionsPerYear: '5-6',
    difficulty: 'Hard',
    keyTopics: ['Mendel laws', 'Incomplete dominance', 'Co-dominance', 'Linkage', 'Pedigree analysis', 'Chromosomal disorders'],
    icon: <Dna className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Molecular Basis of Inheritance',
    slug: 'molecular-basis-of-inheritance',
    unit: 'Genetics & Evolution',
    class: 12,
    weightage: 8,
    questionsPerYear: '5-6',
    difficulty: 'Hard',
    keyTopics: ['DNA structure', 'Replication', 'Transcription', 'Translation', 'Lac operon', 'Human Genome Project'],
    icon: <Dna className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Evolution',
    slug: 'evolution',
    unit: 'Genetics & Evolution',
    class: 12,
    weightage: 4,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Origin of life', 'Evidences of evolution', 'Hardy-Weinberg', 'Adaptive radiation', 'Human evolution'],
    icon: <TrendingUp className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Human Health and Disease',
    slug: 'human-health-and-disease',
    unit: 'Biology in Human Welfare',
    class: 12,
    weightage: 5,
    questionsPerYear: '3-4',
    difficulty: 'Moderate',
    keyTopics: ['Common diseases', 'Immunity types', 'AIDS', 'Cancer', 'Drugs & alcohol abuse'],
    icon: <Syringe className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Strategies for Enhancement in Food Production',
    slug: 'strategies-for-food-production',
    unit: 'Biology in Human Welfare',
    class: 12,
    weightage: 2,
    questionsPerYear: '1-2',
    difficulty: 'Easy',
    keyTopics: ['Animal husbandry', 'Plant breeding', 'Single cell protein', 'Tissue culture'],
    icon: <Leaf className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Microbes in Human Welfare',
    slug: 'microbes-in-human-welfare',
    unit: 'Biology in Human Welfare',
    class: 12,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Easy',
    keyTopics: ['Household products', 'Industrial products', 'Sewage treatment', 'Biogas', 'Biocontrol agents'],
    icon: <Microscope className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Biotechnology — Complete Unit Notes',
    slug: 'biotechnology',
    unit: 'Biotechnology',
    class: 12,
    weightage: 7,
    questionsPerYear: '4-6',
    difficulty: 'Hard',
    keyTopics: ['Restriction enzymes & vectors', 'rDNA technology & PCR', 'Bt crops & RNAi', 'Gene therapy & diagnostics', 'Bioethics & biopiracy'],
    icon: <FlaskConical className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Biotechnology: Principles and Processes',
    slug: 'biotechnology-principles-and-processes',
    unit: 'Biotechnology',
    class: 12,
    weightage: 4,
    questionsPerYear: '2-3',
    difficulty: 'Hard',
    keyTopics: ['Restriction enzymes', 'Cloning vectors', 'rDNA technology', 'PCR', 'Gel electrophoresis'],
    icon: <FlaskConical className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Biotechnology and its Applications',
    slug: 'biotechnology-and-its-applications',
    unit: 'Biotechnology',
    class: 12,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Bt crops', 'Gene therapy', 'Transgenic animals', 'Biopiracy', 'Ethical issues'],
    icon: <FlaskConical className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Ecology — Complete Unit Notes',
    slug: 'ecology',
    unit: 'Ecology',
    class: 12,
    weightage: 18,
    questionsPerYear: '10-12',
    difficulty: 'Moderate',
    keyTopics: ['Population interactions', 'Ecosystem & energy flow', 'Ecological pyramids', 'Nutrient cycling', 'Biodiversity & conservation', 'Species-Area relationship'],
    icon: <TreePine className="w-5 h-5" />,
    available: true,
  },
  {
    name: 'Organisms and Populations',
    slug: 'organisms-and-populations',
    unit: 'Ecology',
    class: 12,
    weightage: 4,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Adaptations', 'Population attributes', 'Growth models', 'Population interactions'],
    icon: <Users className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Ecosystem',
    slug: 'ecosystem',
    unit: 'Ecology',
    class: 12,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Moderate',
    keyTopics: ['Energy flow', 'Food chains', 'Ecological pyramids', 'Nutrient cycling', 'Ecological succession'],
    icon: <TreePine className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Biodiversity and Conservation',
    slug: 'biodiversity-and-conservation',
    unit: 'Ecology',
    class: 12,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Easy',
    keyTopics: ['Types of biodiversity', 'Biodiversity patterns', 'Loss of biodiversity', 'Conservation strategies'],
    icon: <TreePine className="w-5 h-5" />,
    available: false,
  },
  {
    name: 'Environmental Issues',
    slug: 'environmental-issues',
    unit: 'Ecology',
    class: 12,
    weightage: 3,
    questionsPerYear: '2-3',
    difficulty: 'Easy',
    keyTopics: ['Air pollution', 'Water pollution', 'Ozone depletion', 'Deforestation', 'Solid waste management'],
    icon: <TreePine className="w-5 h-5" />,
    available: false,
  },
]

const class11Chapters = BIOLOGY_CHAPTERS.filter((c) => c.class === 11)
const class12Chapters = BIOLOGY_CHAPTERS.filter((c) => c.class === 12)

/* ─────────────── Unit Grouping ─────────────── */

function groupByUnit(chapters: Chapter[]) {
  const groups: { unit: string; chapters: Chapter[] }[] = []
  chapters.forEach((ch) => {
    const existing = groups.find((g) => g.unit === ch.unit)
    if (existing) existing.chapters.push(ch)
    else groups.push({ unit: ch.unit, chapters: [ch] })
  })
  return groups
}

/* ─────────────── Difficulty Badge ─────────────── */

function DifficultyBadge({ level }: { level: Chapter['difficulty'] }) {
  const colors = {
    Easy: 'bg-green-100 text-green-700',
    Moderate: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[level]}`}>
      {level}
    </span>
  )
}

/* ─────────────── Weightage Bar ─────────────── */

function WeightageBar({ value, max = 8 }: { value: number; max?: number }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-600">{value}%</span>
    </div>
  )
}

/* ─────────────── Chapter Card ─────────────── */

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            {chapter.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{chapter.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{chapter.questionsPerYear} Qs/year</p>
          </div>
        </div>
        <DifficultyBadge level={chapter.difficulty} />
      </div>

      <WeightageBar value={chapter.weightage} />

      <div className="mt-3 flex flex-wrap gap-1.5">
        {chapter.keyTopics.slice(0, 3).map((topic) => (
          <span key={topic} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {topic}
          </span>
        ))}
        {chapter.keyTopics.length > 3 && (
          <span className="text-[11px] text-gray-400">+{chapter.keyTopics.length - 3} more</span>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        {chapter.available ? (
          <Link
            href={`/biology-notes-for-neet/${chapter.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Read Notes <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
            <Clock className="w-4 h-4" /> Coming Soon
          </span>
        )}
      </div>
    </motion.div>
  )
}

/* ─────────────── Unit Section ─────────────── */

function UnitSection({ unit, chapters, startIndex }: { unit: string; chapters: Chapter[]; startIndex: number }) {
  const totalWeightage = chapters.reduce((sum, c) => sum + c.weightage, 0)

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{unit}</h3>
        <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
          ~{totalWeightage}% weightage
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((ch, i) => (
          <ChapterCard key={ch.slug} chapter={ch} index={startIndex + i} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────── Stat Card ─────────────── */

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  )
}

/* ═══════════════ MAIN PAGE ═══════════════ */

export default function BiologyNotesForNEETPage() {
  const class11Units = groupByUnit(class11Chapters)
  const class12Units = groupByUnit(class12Chapters)

  /* Schema Markup */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are these NEET biology notes enough for scoring 360/360?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'These notes cover the entire NEET biology syllabus based on NCERT textbooks. Combined with NCERT reading, previous year question practice, and regular revision, they provide a strong foundation for scoring 340+ in NEET biology. For 360/360, supplement with extensive PYQ practice.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these biology notes based on the NEET 2026 syllabus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all notes are updated for the NEET 2026 syllabus as per NTA guidelines. They cover all 38 chapters from Class 11 and 12 NCERT biology textbooks, including both Botany and Zoology sections.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I download these NEET biology notes as PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, each chapter has a downloadable PDF version. The notes include diagrams, flowcharts, comparison tables, and mnemonics for easy revision. You can also access them on mobile for on-the-go study.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which chapters are most important for NEET biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The highest-weightage chapters in NEET biology are: Genetics (Principles of Inheritance + Molecular Basis of Inheritance) at ~16%, Human Physiology at ~20%, Plant Physiology at ~7%, Ecology at ~13%, and Reproduction at ~15%. Focus on these for maximum marks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who writes these NEET biology notes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All notes are prepared by Dr. Shekhar, an AIIMS-qualified biology faculty with over 10 years of NEET coaching experience. The notes incorporate insights from analyzing 15+ years of NEET previous year questions.',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Biology Notes for NEET',
        item: 'https://cerebrumbiologyacademy.com/biology-notes-for-neet',
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Notes — Complete Chapter-wise Study Material',
    description: 'Free NEET biology notes for all 38 chapters with diagrams, mnemonics, and PYQ analysis. Written by AIIMS faculty.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: 'Undergraduate',
    about: ['NEET Biology', 'Medical Entrance Exam Preparation'],
    inLanguage: 'en',
    isAccessibleForFree: true,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@type': 'Person',
        name: 'Dr. Shekhar',
        jobTitle: 'NEET Biology Faculty',
      },
    },
  }

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {/* ─── Hero ─── */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white font-medium">Biology Notes for NEET</span>
            </nav>

            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-block bg-yellow-400/20 text-yellow-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  Updated for NEET 2026 Syllabus
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Biology Notes for NEET
                  <span className="block text-blue-300 mt-1">All 38 Chapters — Free PDF Download</span>
                </h1>
                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  Comprehensive chapter-wise biology notes prepared by Dr. Shekhar (AIIMS faculty).
                  Each chapter includes diagrams, flowcharts, comparison tables, mnemonics, and previous
                  year question analysis to help you score 340+ in NEET Biology.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#class-12-notes"
                  className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  <BookOpen className="w-5 h-5" /> Browse Class 12 Notes
                </a>
                <a
                  href="#class-11-notes"
                  className="inline-flex items-center gap-2 bg-blue-700/50 text-white font-semibold px-6 py-3 rounded-xl border border-blue-500/50 hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="w-5 h-5" /> Browse Class 11 Notes
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Quick Stats ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<BookOpen className="w-6 h-6" />} value="38" label="Chapters Covered" />
            <StatCard icon={<FileText className="w-6 h-6" />} value="Free" label="PDF Download" />
            <StatCard icon={<Target className="w-6 h-6" />} value="15+" label="Years PYQ Analysis" />
            <StatCard icon={<GraduationCap className="w-6 h-6" />} value="AIIMS" label="Faculty Author" />
          </div>
        </section>

        {/* ─── Why These Notes ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Why Students Trust Our NEET Biology Notes
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              These notes are not generic summaries. Each chapter is prepared after analysing 15+ years
              of NEET papers to focus on what actually gets asked.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Dna className="w-6 h-6" />,
                title: 'NCERT-Aligned Content',
                desc: 'Every line traces back to NCERT textbooks — the only source NTA uses for NEET questions. No unnecessary extra information.',
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: 'PYQ-Weighted Coverage',
                desc: 'Topics weighted by actual NEET question frequency. High-yield topics get detailed coverage with examples and practice points.',
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: 'Mnemonics & Memory Aids',
                desc: 'Custom mnemonics for tough-to-remember lists, classifications, and sequences. Makes revision 3x faster.',
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Diagrams & Flowcharts',
                desc: 'Hand-drawn style diagrams for processes like photosynthesis, DNA replication, and the cardiac cycle — labelled for NEET.',
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: 'Comparison Tables',
                desc: 'Side-by-side comparisons for commonly confused topics: mitosis vs meiosis, C3 vs C4 plants, DNA vs RNA, and more.',
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: 'Written by AIIMS Faculty',
                desc: 'Dr. Shekhar brings 10+ years of NEET coaching experience and insight from training 600+ students who cleared NEET.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── NEET Biology Weightage Overview ─── */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              NEET 2026 Biology Chapter Weightage
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              Based on analysis of NEET 2019-2025 papers. Total: 90 questions, 360 marks. Focus on high-weightage units first.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { unit: 'Human Physiology', marks: '~72', pct: 20, color: 'bg-red-500' },
                { unit: 'Genetics & Evolution', marks: '~60', pct: 16, color: 'bg-purple-500' },
                { unit: 'Reproduction', marks: '~52', pct: 15, color: 'bg-pink-500' },
                { unit: 'Ecology', marks: '~48', pct: 13, color: 'bg-green-500' },
                { unit: 'Plant Physiology', marks: '~28', pct: 7, color: 'bg-emerald-500' },
                { unit: 'Diversity in Living World', marks: '~52', pct: 14, color: 'bg-blue-500' },
                { unit: 'Cell Biology', marks: '~44', pct: 12, color: 'bg-indigo-500' },
                { unit: 'Biotechnology', marks: '~28', pct: 7, color: 'bg-yellow-500' },
              ].map((item) => (
                <div key={item.unit} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                  <div className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-sm">{item.unit}</span>
                      <span className="text-sm font-semibold text-gray-700">{item.marks} marks</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct * 5}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Class 12 Notes ─── */}
        <section id="class-12-notes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Class 12 Biology Notes</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-13">
            16 chapters covering Reproduction, Genetics, Ecology, Biotechnology, and Human Health.
            Class 12 contributes ~55% of NEET Biology questions.
          </p>
          {(() => {
            let idx = 0
            return class12Units.map((group) => {
              const start = idx
              idx += group.chapters.length
              return <UnitSection key={group.unit} unit={group.unit} chapters={group.chapters} startIndex={start} />
            })
          })()}
        </section>

        {/* ─── Class 11 Notes ─── */}
        <section id="class-11-notes" className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Class 11 Biology Notes</h2>
            </div>
            <p className="text-gray-600 mb-8 ml-13">
              19 chapters covering Diversity, Cell Biology, Plant &amp; Human Physiology.
              Class 11 contributes ~45% of NEET Biology questions — do not skip these.
            </p>
            {(() => {
              let idx = 0
              return class11Units.map((group) => {
                const start = idx
                idx += group.chapters.length
                return <UnitSection key={group.unit} unit={group.unit} chapters={group.chapters} startIndex={start} />
              })
            })()}
          </div>
        </section>

        {/* ─── How to Use These Notes ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            How to Study NEET Biology Using These Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Read NCERT First',
                desc: 'Read the NCERT chapter thoroughly. Understand concepts before turning to notes for revision.',
              },
              {
                step: '02',
                title: 'Use Notes for Revision',
                desc: 'Our notes condense each chapter into key points, diagrams, and tables. Perfect for quick revision.',
              },
              {
                step: '03',
                title: 'Solve PYQs Chapter-wise',
                desc: 'After revising, solve previous year questions for that chapter. Check which topics repeat most.',
              },
              {
                step: '04',
                title: 'Revise with Mnemonics',
                desc: 'Use our mnemonics and comparison tables for final-week revision. Focus on high-weightage chapters.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="text-4xl font-bold text-blue-100 mb-3">{item.step}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {(faqSchema.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>).map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                    {faq.name}
                    <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA Section ─── */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Want Personalised Guidance for NEET Biology?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Notes are a great start, but nothing beats learning directly from an AIIMS-qualified
              faculty in small batches of 15 students. Join Cerebrum Biology Academy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CONTACT_INFO.whatsapp.linkWithMessage(
                  'Hi! I was reading the Biology Notes on your website. I want to know more about your NEET coaching program.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.primary}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition-colors"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT_INFO.phone.display.primary}
              </a>
            </div>
          </div>
        </section>

        {/* ─── Related Resources ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related NEET Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/blog/how-to-score-360-in-neet-biology"
              className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                How to Score 360/360 in NEET Biology
              </h3>
              <p className="text-sm text-gray-600">Complete strategy guide with study plan, chapter prioritisation, and tips from toppers.</p>
            </Link>
            <Link
              href="/best-neet-biology-coaching"
              className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                Best NEET Biology Coaching Comparison
              </h3>
              <p className="text-sm text-gray-600">Honest comparison of top coaching institutes with fees, batch size, and results.</p>
            </Link>
            <Link
              href="/online-neet-biology-coaching"
              className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                Online NEET Biology Coaching
              </h3>
              <p className="text-sm text-gray-600">Live online classes with AIIMS faculty. Small batches, doubt clearing, and test series.</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
