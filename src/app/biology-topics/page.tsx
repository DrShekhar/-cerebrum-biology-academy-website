import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Brain, Dna, Microscope, Leaf, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biology Topics for NEET | Complete Study Guide - Cerebrum Biology Academy',
  description:
    'Comprehensive biology topics for NEET preparation. Master Zoology, Botany, Human Physiology, Genetics, Ecology, Cell Biology, and more with expert guidance from AIIMS faculty.',
  keywords:
    'biology topics for NEET, NEET biology syllabus, zoology topics, botany topics, human physiology, genetics, ecology, cell biology, molecular biology, evolution, biodiversity, NCERT biology topics, NEET biology chapters',
  openGraph: {
    title: 'Biology Topics for NEET | Complete Study Guide',
    description:
      'Master all NEET biology topics with comprehensive notes, videos, and practice questions',
    url: 'https://cerebrumbiologyacademy.com/biology-topics',
  },
}

const biologyTopics = [
  {
    id: 'cell-biology',
    title: 'Cell Biology & Cell Division',
    icon: Microscope,
    description:
      'Cell structure, organelles, cell cycle, mitosis, meiosis. Essential foundation for NEET biology.',
    slug: 'cell-biology',
    keywords: 'cell biology NEET, cell structure, cell division, mitosis, meiosis',
  },
  {
    id: 'genetics',
    title: 'Genetics & Evolution',
    icon: Dna,
    description:
      'Mendelian genetics, molecular basis of inheritance, evolution, origin of life, human evolution.',
    slug: 'genetics-evolution',
    keywords: 'genetics NEET, evolution, molecular biology, DNA, RNA, heredity',
  },
  {
    id: 'human-physiology',
    title: 'Human Physiology',
    icon: Heart,
    description:
      'Digestive, respiratory, circulatory, excretory, nervous, endocrine, reproductive systems.',
    slug: 'human-physiology',
    keywords:
      'human physiology NEET, body systems, digestive system, nervous system, endocrine system',
  },
  {
    id: 'plant-physiology',
    title: 'Plant Physiology',
    icon: Leaf,
    description:
      'Photosynthesis, respiration, plant growth, mineral nutrition, transport in plants.',
    slug: 'plant-physiology',
    keywords: 'plant physiology NEET, photosynthesis, plant nutrition, plant hormones',
  },
  {
    id: 'ecology',
    title: 'Ecology & Environment',
    icon: Brain,
    description: 'Ecosystem, biodiversity, environmental issues, conservation, biomes.',
    slug: 'ecology-environment',
    keywords: 'ecology NEET, environment, biodiversity, ecosystem, conservation',
  },
  {
    id: 'biotechnology',
    title: 'Biotechnology & Applications',
    icon: BookOpen,
    description: 'Genetic engineering, DNA technology, gene cloning, applications in medicine.',
    slug: 'biotechnology',
    keywords: 'biotechnology NEET, genetic engineering, DNA technology, gene cloning',
  },
]

export default function BiologyTopicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Biology Topics for NEET Preparation
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
            Master all NEET biology topics with expert guidance from AIIMS faculty. Comprehensive
            coverage of Zoology, Botany, and Human Physiology.
          </p>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {biologyTopics.map((topic) => {
              const Icon = topic.icon
              return (
                <Link
                  key={topic.id}
                  href={`/biology-topics/${topic.slug}`}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-200 hover:border-blue-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{topic.title}</h3>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">Topics: </span>
                    {topic.keywords}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Complete NEET Biology Syllabus Coverage</h2>
            <p>
              At Cerebrum Biology Academy, we provide comprehensive coverage of all NEET biology
              topics. Our expert faculty from AIIMS ensures you master every concept from NCERT
              Class 11th and 12th biology syllabus.
            </p>

            <h3>Why Master Biology Topics for NEET?</h3>
            <ul>
              <li>Biology carries 360 marks (90 questions) in NEET</li>
              <li>Biology is the highest-scoring section with proper preparation</li>
              <li>NCERT-based questions form the majority of NEET biology paper</li>
              <li>Understanding concepts is more important than rote learning</li>
            </ul>

            <h3>Our Teaching Methodology</h3>
            <p>We follow a structured approach to teach all biology topics:</p>
            <ol>
              <li>Concept building with NCERT fundamentals</li>
              <li>Visual learning through diagrams and flowcharts</li>
              <li>Practice with previous year NEET questions</li>
              <li>Regular tests and performance analysis</li>
              <li>Doubt clearing sessions with AIIMS faculty</li>
            </ol>

            <h3>Biology Topics Weightage in NEET</h3>
            <p>Understanding the weightage helps prioritize your preparation:</p>
            <ul>
              <li>Human Physiology: ~25% (Most important)</li>
              <li>Genetics & Evolution: ~20%</li>
              <li>Cell Biology & Biomolecules: ~15%</li>
              <li>Plant Physiology: ~15%</li>
              <li>Ecology & Environment: ~10%</li>
              <li>Biotechnology: ~10%</li>
              <li>Others: ~5%</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master Biology for NEET?</h2>
          <p className="text-xl mb-8">
            Join 2000+ students who achieved their NEET dreams with our expert biology coaching
          </p>
          <Link
            href="/demo"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Book Free Demo Class
          </Link>
        </div>
      </section>
    </div>
  )
}
