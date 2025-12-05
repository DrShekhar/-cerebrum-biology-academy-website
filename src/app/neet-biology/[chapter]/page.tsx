'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import {
  Phone,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Target,
  Clock,
  FileText,
  Brain,
} from 'lucide-react'

// Chapter data for all NEET Biology chapters
const chapterData: Record<
  string,
  {
    name: string
    unit: string
    class: '11' | '12'
    weightage: string
    questionsPerYear: string
    description: string
    keyTopics: string[]
    importantConcepts: string[]
    neetTips: string[]
    relatedChapters: { name: string; slug: string }[]
  }
> = {
  'the-living-world': {
    name: 'The Living World',
    unit: 'Diversity in Living World',
    class: '11',
    weightage: '2%',
    questionsPerYear: '1-2',
    description:
      'Introduction to biology, characteristics of living organisms, taxonomic categories, and nomenclature.',
    keyTopics: [
      'What is Living?',
      'Biodiversity',
      'Taxonomy and Systematics',
      'Taxonomic Categories',
      'Taxonomic Aids',
    ],
    importantConcepts: [
      'Species concept',
      'Binomial nomenclature',
      'Herbarium',
      'Botanical gardens',
      'Museums',
      'Zoological parks',
    ],
    neetTips: [
      'Focus on taxonomic hierarchy',
      'Remember ICBN and ICZN rules',
      'Practice MCQs on nomenclature',
    ],
    relatedChapters: [
      { name: 'Biological Classification', slug: 'biological-classification' },
      { name: 'Plant Kingdom', slug: 'plant-kingdom' },
    ],
  },
  'biological-classification': {
    name: 'Biological Classification',
    unit: 'Diversity in Living World',
    class: '11',
    weightage: '4%',
    questionsPerYear: '3-4',
    description:
      'Classification systems, five kingdom classification, characteristics of each kingdom.',
    keyTopics: [
      'Five Kingdom Classification',
      'Kingdom Monera',
      'Kingdom Protista',
      'Kingdom Fungi',
      'Kingdom Plantae',
      'Kingdom Animalia',
      'Viruses, Viroids and Lichens',
    ],
    importantConcepts: [
      'Whittaker classification criteria',
      'Archaebacteria vs Eubacteria',
      'Mycorrhiza',
      'Lichens',
      'Virus structure',
    ],
    neetTips: [
      'Compare characteristics of all five kingdoms',
      'Focus on economic importance',
      'Learn about diseases caused by microorganisms',
    ],
    relatedChapters: [
      { name: 'The Living World', slug: 'the-living-world' },
      { name: 'Plant Kingdom', slug: 'plant-kingdom' },
      { name: 'Animal Kingdom', slug: 'animal-kingdom' },
    ],
  },
  'plant-kingdom': {
    name: 'Plant Kingdom',
    unit: 'Diversity in Living World',
    class: '11',
    weightage: '3%',
    questionsPerYear: '2-3',
    description:
      'Classification of plants, algae, bryophytes, pteridophytes, gymnosperms, and angiosperms.',
    keyTopics: [
      'Algae',
      'Bryophytes',
      'Pteridophytes',
      'Gymnosperms',
      'Angiosperms',
      'Plant Life Cycles',
      'Alternation of Generations',
    ],
    importantConcepts: [
      'Heterospory',
      'Seed formation',
      'Double fertilization',
      'Life cycles',
      'Economic importance',
    ],
    neetTips: [
      'Learn life cycles thoroughly',
      'Compare characteristics of different plant groups',
      'Focus on evolutionary trends',
    ],
    relatedChapters: [
      { name: 'Biological Classification', slug: 'biological-classification' },
      { name: 'Morphology of Flowering Plants', slug: 'morphology-of-flowering-plants' },
    ],
  },
  'animal-kingdom': {
    name: 'Animal Kingdom',
    unit: 'Diversity in Living World',
    class: '11',
    weightage: '5%',
    questionsPerYear: '4-5',
    description:
      'Classification of animals, basis of classification, and characteristics of major animal phyla.',
    keyTopics: [
      'Basis of Classification',
      'Classification of Animals',
      'Porifera to Hemichordata',
      'Phylum Chordata',
    ],
    importantConcepts: [
      'Levels of organization',
      'Body symmetry',
      'Coelom types',
      'Segmentation',
      'Notochord',
    ],
    neetTips: [
      'Memorize phyla characteristics',
      'Focus on examples from each phylum',
      'Understand evolutionary relationships',
    ],
    relatedChapters: [
      { name: 'Biological Classification', slug: 'biological-classification' },
      { name: 'Structural Organisation in Animals', slug: 'structural-organisation-in-animals' },
    ],
  },
  'cell-the-unit-of-life': {
    name: 'Cell: The Unit of Life',
    unit: 'Cell Structure and Function',
    class: '11',
    weightage: '4%',
    questionsPerYear: '3-4',
    description:
      'Cell theory, prokaryotic and eukaryotic cells, cell organelles and their functions.',
    keyTopics: [
      'Cell Theory',
      'Prokaryotic Cells',
      'Eukaryotic Cells',
      'Cell Membrane',
      'Cell Organelles',
      'Nucleus',
    ],
    importantConcepts: [
      'Fluid mosaic model',
      'Endomembrane system',
      'Mitochondria',
      'Chloroplast',
      'Ribosomes',
      'Cytoskeleton',
    ],
    neetTips: [
      'Understand structure-function relationships',
      'Compare prokaryotic and eukaryotic cells',
      'Learn organelle functions',
    ],
    relatedChapters: [
      { name: 'Biomolecules', slug: 'biomolecules' },
      { name: 'Cell Cycle and Cell Division', slug: 'cell-cycle-and-cell-division' },
    ],
  },
  biomolecules: {
    name: 'Biomolecules',
    unit: 'Cell Structure and Function',
    class: '11',
    weightage: '4%',
    questionsPerYear: '3-4',
    description:
      'Chemical composition of living cells, carbohydrates, proteins, lipids, nucleic acids, and enzymes.',
    keyTopics: [
      'How to Analyze Chemical Composition',
      'Amino Acids',
      'Proteins',
      'Carbohydrates',
      'Lipids',
      'Nucleic Acids',
      'Enzymes',
    ],
    importantConcepts: [
      'Primary to quaternary structure of proteins',
      'Enzyme kinetics',
      'Factors affecting enzyme activity',
      'Co-factors and co-enzymes',
    ],
    neetTips: [
      'Focus on enzyme kinetics graphs',
      'Learn amino acid structures',
      'Understand protein structure levels',
    ],
    relatedChapters: [
      { name: 'Cell: The Unit of Life', slug: 'cell-the-unit-of-life' },
      { name: 'Molecular Basis of Inheritance', slug: 'molecular-basis-of-inheritance' },
    ],
  },
  'principles-of-inheritance-and-variation': {
    name: 'Principles of Inheritance and Variation',
    unit: 'Genetics and Evolution',
    class: '12',
    weightage: '5%',
    questionsPerYear: '4-5',
    description:
      'Mendelian genetics, chromosomal theory, linkage, crossing over, sex determination, and genetic disorders.',
    keyTopics: [
      'Mendel Laws',
      'Inheritance Patterns',
      'Chromosomal Theory',
      'Linkage and Crossing Over',
      'Sex Determination',
      'Genetic Disorders',
    ],
    importantConcepts: [
      'Monohybrid and dihybrid crosses',
      'Pedigree analysis',
      'Blood groups',
      'Sex-linked inheritance',
      'Chromosomal disorders',
    ],
    neetTips: [
      'Practice genetic problems daily',
      'Master pedigree analysis',
      'Learn all genetic disorders thoroughly',
    ],
    relatedChapters: [
      { name: 'Molecular Basis of Inheritance', slug: 'molecular-basis-of-inheritance' },
      { name: 'Evolution', slug: 'evolution' },
    ],
  },
  'molecular-basis-of-inheritance': {
    name: 'Molecular Basis of Inheritance',
    unit: 'Genetics and Evolution',
    class: '12',
    weightage: '5%',
    questionsPerYear: '4-5',
    description:
      'DNA structure, replication, transcription, translation, regulation of gene expression, and Human Genome Project.',
    keyTopics: [
      'DNA Structure',
      'DNA Replication',
      'Transcription',
      'Translation',
      'Regulation of Gene Expression',
      'Human Genome Project',
      'DNA Fingerprinting',
    ],
    importantConcepts: [
      'Central dogma',
      'Lac operon',
      'DNA polymerase',
      'RNA polymerase',
      'Genetic code',
      'VNTR',
    ],
    neetTips: [
      'Understand all enzymes in replication and transcription',
      'Focus on lac operon regulation',
      'Learn genetic code properties',
    ],
    relatedChapters: [
      {
        name: 'Principles of Inheritance and Variation',
        slug: 'principles-of-inheritance-and-variation',
      },
      {
        name: 'Biotechnology: Principles and Processes',
        slug: 'biotechnology-principles-and-processes',
      },
    ],
  },
  'human-reproduction': {
    name: 'Human Reproduction',
    unit: 'Reproduction',
    class: '12',
    weightage: '4%',
    questionsPerYear: '3-4',
    description:
      'Male and female reproductive systems, gametogenesis, menstrual cycle, fertilization, pregnancy, and parturition.',
    keyTopics: [
      'Male Reproductive System',
      'Female Reproductive System',
      'Gametogenesis',
      'Menstrual Cycle',
      'Fertilization',
      'Embryo Development',
      'Parturition',
      'Lactation',
    ],
    importantConcepts: [
      'Spermatogenesis vs Oogenesis',
      'Hormonal control',
      'Implantation',
      'Placenta formation',
      'Parturition hormones',
    ],
    neetTips: [
      'Understand hormonal regulation thoroughly',
      'Learn stages of gametogenesis',
      'Focus on embryo development stages',
    ],
    relatedChapters: [
      { name: 'Reproductive Health', slug: 'reproductive-health' },
      {
        name: 'Sexual Reproduction in Flowering Plants',
        slug: 'sexual-reproduction-in-flowering-plants',
      },
    ],
  },
  ecosystem: {
    name: 'Ecosystem',
    unit: 'Ecology and Environment',
    class: '12',
    weightage: '3%',
    questionsPerYear: '2-3',
    description:
      'Ecosystem structure and function, productivity, decomposition, energy flow, ecological pyramids, and nutrient cycling.',
    keyTopics: [
      'Ecosystem Structure',
      'Productivity',
      'Decomposition',
      'Energy Flow',
      'Ecological Pyramids',
      'Nutrient Cycling',
      'Ecological Succession',
    ],
    importantConcepts: [
      'Food chain and food web',
      'Trophic levels',
      '10% law',
      'Biogeochemical cycles',
      'Primary and secondary succession',
    ],
    neetTips: [
      'Learn all types of ecological pyramids',
      'Understand energy flow calculations',
      'Focus on nutrient cycles',
    ],
    relatedChapters: [
      { name: 'Organisms and Populations', slug: 'organisms-and-populations' },
      { name: 'Biodiversity and Conservation', slug: 'biodiversity-and-conservation' },
    ],
  },
}

// Add more chapters as needed...
const defaultChapter = {
  name: 'Chapter',
  unit: 'Biology',
  class: '11' as const,
  weightage: '2-3%',
  questionsPerYear: '2-3',
  description: 'This chapter covers important concepts for NEET Biology preparation.',
  keyTopics: ['Topic 1', 'Topic 2', 'Topic 3'],
  importantConcepts: ['Concept 1', 'Concept 2', 'Concept 3'],
  neetTips: ['Focus on NCERT', 'Practice MCQs', 'Revise regularly'],
  relatedChapters: [],
}

export default function ChapterPage() {
  const params = useParams()
  const chapterSlug = params.chapter as string

  const chapter = chapterData[chapterSlug] || {
    ...defaultChapter,
    name: chapterSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: `${chapter.name} - NEET Biology`,
    description: chapter.description,
    educationalLevel: `Class ${chapter.class}`,
    learningResourceType: 'Study Guide',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    url: `https://cerebrumbiologyacademy.com/neet-biology/${chapterSlug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <Link
              href="/neet-biology"
              className="inline-flex items-center gap-2 text-teal-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Chapters
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Class {chapter.class}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{chapter.unit}</span>
                <span className="bg-teal-500 px-3 py-1 rounded-full text-sm font-medium">
                  {chapter.weightage} Weightage
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{chapter.name} - NEET Biology</h1>

              <p className="text-lg text-teal-100 mb-6 max-w-3xl">{chapter.description}</p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                >
                  Join Expert Classes
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Target className="w-8 h-8 text-teal-600" />
                <div>
                  <div className="text-xl font-bold text-gray-800">{chapter.weightage}</div>
                  <div className="text-gray-600 text-sm">NEET Weightage</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-8 h-8 text-teal-600" />
                <div>
                  <div className="text-xl font-bold text-gray-800">{chapter.questionsPerYear}</div>
                  <div className="text-gray-600 text-sm">Questions/Year</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <BookOpen className="w-8 h-8 text-teal-600" />
                <div>
                  <div className="text-xl font-bold text-gray-800">Class {chapter.class}</div>
                  <div className="text-gray-600 text-sm">NCERT Level</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Brain className="w-8 h-8 text-teal-600" />
                <div>
                  <div className="text-xl font-bold text-gray-800">{chapter.keyTopics.length}</div>
                  <div className="text-gray-600 text-sm">Key Topics</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Key Topics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-teal-600" />
                    Key Topics in {chapter.name}
                  </h2>
                  <ul className="space-y-2">
                    {chapter.keyTopics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Important Concepts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-teal-600" />
                    Important Concepts for NEET
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {chapter.importantConcepts.map((concept, index) => (
                      <span
                        key={index}
                        className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full text-sm font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* NEET Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-teal-50 to-white rounded-xl shadow-lg p-6 border border-teal-100"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-teal-600" />
                    NEET Preparation Tips for {chapter.name}
                  </h2>
                  <ul className="space-y-3">
                    {chapter.neetTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-6 text-white"
                >
                  <h3 className="font-bold text-lg mb-3">Master {chapter.name}</h3>
                  <p className="text-teal-100 text-sm mb-4">
                    Join our expert-led classes for in-depth understanding and guaranteed NEET
                    success.
                  </p>
                  <Link
                    href="/demo-booking"
                    className="block w-full bg-white text-teal-700 py-3 rounded-lg font-semibold text-center hover:bg-teal-50 transition-colors"
                  >
                    Book Free Demo
                  </Link>
                  <Link
                    href="tel:+918826444334"
                    className="flex items-center justify-center gap-2 mt-3 text-teal-100 hover:text-white"
                  >
                    <Phone className="w-4 h-4" />
                    Call: 8826444334
                  </Link>
                </motion.div>

                {/* Related Chapters */}
                {chapter.relatedChapters.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                  >
                    <h3 className="font-bold text-gray-800 mb-4">Related Chapters</h3>
                    <div className="space-y-2">
                      {chapter.relatedChapters.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/neet-biology/${related.slug}`}
                          className="block p-3 bg-gray-50 hover:bg-teal-50 rounded-lg transition-colors group"
                        >
                          <span className="text-gray-700 group-hover:text-teal-700 font-medium">
                            {related.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Quick Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link
                      href="/neet-biology"
                      className="block p-3 bg-gray-50 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      All Biology Chapters
                    </Link>
                    <Link
                      href="/neet-2025-preparation"
                      className="block p-3 bg-gray-50 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      NEET 2025 Preparation
                    </Link>
                    <Link
                      href="/courses"
                      className="block p-3 bg-gray-50 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      Our Courses
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Need Help with {chapter.name}?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our expert faculty can help you master this chapter and score high in NEET Biology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo-booking"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Book Free Demo Class
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/neet-biology"
                className="inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-teal-200"
              >
                <ArrowLeft className="w-5 h-5" />
                All Chapters
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
