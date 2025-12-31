'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Brain,
  Dna,
  Heart,
  Leaf,
  Bug,
  FlaskConical,
} from 'lucide-react'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Biology Complete Course',
  description:
    'Comprehensive NEET Biology preparation covering all chapters from Class 11 and 12 NCERT. Expert coaching for Botany and Zoology.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  url: 'https://cerebrumbiologyacademy.com/neet-biology',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Blended',
    instructor: {
      '@type': 'Person',
      name: 'Expert Faculty',
    },
  },
}

const units = [
  {
    name: 'Diversity in Living World',
    icon: Bug,
    color: 'bg-green-100 text-green-600',
    chapters: [
      { name: 'The Living World', slug: 'the-living-world', weightage: '2%' },
      { name: 'Biological Classification', slug: 'biological-classification', weightage: '4%' },
      { name: 'Plant Kingdom', slug: 'plant-kingdom', weightage: '3%' },
      { name: 'Animal Kingdom', slug: 'animal-kingdom', weightage: '5%' },
    ],
  },
  {
    name: 'Structural Organisation',
    icon: Leaf,
    color: 'bg-green-100 text-green-600',
    chapters: [
      {
        name: 'Morphology of Flowering Plants',
        slug: 'morphology-of-flowering-plants',
        weightage: '3%',
      },
      { name: 'Anatomy of Flowering Plants', slug: 'anatomy-of-flowering-plants', weightage: '2%' },
      {
        name: 'Structural Organisation in Animals',
        slug: 'structural-organisation-in-animals',
        weightage: '2%',
      },
    ],
  },
  {
    name: 'Cell Structure and Function',
    icon: FlaskConical,
    color: 'bg-blue-100 text-blue-600',
    chapters: [
      { name: 'Cell: The Unit of Life', slug: 'cell-the-unit-of-life', weightage: '4%' },
      { name: 'Biomolecules', slug: 'biomolecules', weightage: '4%' },
      {
        name: 'Cell Cycle and Cell Division',
        slug: 'cell-cycle-and-cell-division',
        weightage: '4%',
      },
    ],
  },
  {
    name: 'Plant Physiology',
    icon: Leaf,
    color: 'bg-lime-100 text-lime-600',
    chapters: [
      { name: 'Transport in Plants', slug: 'transport-in-plants', weightage: '2%' },
      { name: 'Mineral Nutrition', slug: 'mineral-nutrition', weightage: '2%' },
      {
        name: 'Photosynthesis in Higher Plants',
        slug: 'photosynthesis-in-higher-plants',
        weightage: '3%',
      },
      { name: 'Respiration in Plants', slug: 'respiration-in-plants', weightage: '2%' },
      {
        name: 'Plant Growth and Development',
        slug: 'plant-growth-and-development',
        weightage: '2%',
      },
    ],
  },
  {
    name: 'Human Physiology',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
    chapters: [
      { name: 'Digestion and Absorption', slug: 'digestion-and-absorption', weightage: '3%' },
      {
        name: 'Breathing and Exchange of Gases',
        slug: 'breathing-and-exchange-of-gases',
        weightage: '3%',
      },
      { name: 'Body Fluids and Circulation', slug: 'body-fluids-and-circulation', weightage: '3%' },
      {
        name: 'Excretory Products and Elimination',
        slug: 'excretory-products-and-elimination',
        weightage: '3%',
      },
      { name: 'Locomotion and Movement', slug: 'locomotion-and-movement', weightage: '3%' },
      {
        name: 'Neural Control and Coordination',
        slug: 'neural-control-and-coordination',
        weightage: '4%',
      },
      {
        name: 'Chemical Coordination and Integration',
        slug: 'chemical-coordination-and-integration',
        weightage: '3%',
      },
    ],
  },
  {
    name: 'Reproduction',
    icon: Dna,
    color: 'bg-pink-100 text-indigo-600',
    chapters: [
      { name: 'Reproduction in Organisms', slug: 'reproduction-in-organisms', weightage: '2%' },
      {
        name: 'Sexual Reproduction in Flowering Plants',
        slug: 'sexual-reproduction-in-flowering-plants',
        weightage: '4%',
      },
      { name: 'Human Reproduction', slug: 'human-reproduction', weightage: '4%' },
      { name: 'Reproductive Health', slug: 'reproductive-health', weightage: '2%' },
    ],
  },
  {
    name: 'Genetics and Evolution',
    icon: Dna,
    color: 'bg-purple-100 text-purple-600',
    chapters: [
      {
        name: 'Principles of Inheritance and Variation',
        slug: 'principles-of-inheritance-and-variation',
        weightage: '5%',
      },
      {
        name: 'Molecular Basis of Inheritance',
        slug: 'molecular-basis-of-inheritance',
        weightage: '5%',
      },
      { name: 'Evolution', slug: 'evolution', weightage: '3%' },
    ],
  },
  {
    name: 'Biology and Human Welfare',
    icon: Brain,
    color: 'bg-orange-100 text-orange-600',
    chapters: [
      { name: 'Human Health and Disease', slug: 'human-health-and-disease', weightage: '4%' },
      {
        name: 'Strategies for Enhancement in Food Production',
        slug: 'strategies-for-enhancement-in-food-production',
        weightage: '2%',
      },
      { name: 'Microbes in Human Welfare', slug: 'microbes-in-human-welfare', weightage: '2%' },
    ],
  },
  {
    name: 'Biotechnology',
    icon: FlaskConical,
    color: 'bg-cyan-100 text-blue-600',
    chapters: [
      {
        name: 'Biotechnology: Principles and Processes',
        slug: 'biotechnology-principles-and-processes',
        weightage: '3%',
      },
      {
        name: 'Biotechnology and Its Applications',
        slug: 'biotechnology-and-its-applications',
        weightage: '2%',
      },
    ],
  },
  {
    name: 'Ecology and Environment',
    icon: Leaf,
    color: 'bg-green-100 text-green-600',
    chapters: [
      { name: 'Organisms and Populations', slug: 'organisms-and-populations', weightage: '3%' },
      { name: 'Ecosystem', slug: 'ecosystem', weightage: '3%' },
      {
        name: 'Biodiversity and Conservation',
        slug: 'biodiversity-and-conservation',
        weightage: '2%',
      },
      { name: 'Environmental Issues', slug: 'environmental-issues', weightage: '2%' },
    ],
  },
]

export default function NEETBiologyPage() {
  const totalChapters = units.reduce((acc, unit) => acc + unit.chapters.length, 0)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-[#4a5d4a] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Complete NEET Biology Syllabus</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                NEET Biology - Complete Chapter-wise Guide
              </h1>

              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Master all {totalChapters} chapters of NEET Biology with our comprehensive study
                resources. NCERT-focused content with NEET weightage analysis for each chapter.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Start Free Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors border border-white/30"
                >
                  <Phone className="w-5 h-5" />
                  Call: 8826444334
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600">{totalChapters}</div>
                <div className="text-gray-600 text-sm">Total Chapters</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600">10</div>
                <div className="text-gray-600 text-sm">Major Units</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600">90</div>
                <div className="text-gray-600 text-sm">Questions in NEET</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600">360</div>
                <div className="text-gray-600 text-sm">Marks (50%)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter List by Units */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                NEET Biology Chapters by Unit
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Click on any chapter to access detailed study material, important questions, and
                NEET preparation tips
              </p>
            </motion.div>

            <div className="space-y-8">
              {units.map((unit, unitIndex) => (
                <motion.div
                  key={unit.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: unitIndex * 0.05 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className={`p-4 ${unit.color} bg-opacity-50 flex items-center gap-3`}>
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${unit.color}`}
                    >
                      <unit.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{unit.name}</h3>
                    <span className="ml-auto text-sm text-gray-600">
                      {unit.chapters.length} chapters
                    </span>
                  </div>
                  <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {unit.chapters.map((chapter) => (
                      <Link
                        key={chapter.slug}
                        href={`/neet-biology/${chapter.slug}`}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                          <span className="text-gray-700 group-hover:text-green-700 font-medium text-sm">
                            {chapter.name}
                          </span>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          {chapter.weightage}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Study NEET Biology with Cerebrum?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'NCERT Focus',
                  desc: '95% of NEET Biology comes from NCERT. We ensure thorough coverage.',
                },
                {
                  title: 'Weightage Analysis',
                  desc: 'Know which chapters carry more marks and prioritize accordingly.',
                },
                {
                  title: 'Expert Faculty',
                  desc: 'Learn from teachers with 10+ years of NEET coaching experience.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#4a5d4a] text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Master NEET Biology?</h2>
              <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                Join Cerebrum Biology Academy and get expert guidance for all {totalChapters}{' '}
                chapters. Our NCERT-focused approach ensures you&apos;re fully prepared for NEET.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Book Free Demo Class
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-500 transition-colors border border-white/30"
                >
                  View All Courses
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
