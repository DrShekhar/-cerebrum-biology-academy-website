import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {
  BookOpen,
  ChevronRight,
  Download,
  GraduationCap,
  FileText,
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NCERT Biology Solutions for Class 11 & 12 | Free PDF Download 2025',
  description:
    'Free NCERT Biology solutions for Class 11 and Class 12 with chapter-wise answers, diagrams, and NEET preparation tips. Download PDF solutions by AIIMS faculty.',
  keywords:
    'NCERT biology solutions, class 11 biology solutions, class 12 biology solutions, NCERT solutions PDF, biology NEET preparation, NCERT chapter-wise solutions, free NCERT solutions, biology textbook answers',
  openGraph: {
    title: 'NCERT Biology Solutions Class 11 & 12 | Free PDF Download',
    description:
      'Chapter-wise NCERT Biology solutions with detailed explanations for NEET 2026. Free PDF download available.',
    images: ['/og-ncert-solutions.jpg'],
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ncert-biology-solutions',
  },
}

const class11Chapters = [
  {
    unit: 'Unit 1: Diversity in Living World',
    chapters: [
      { number: 1, name: 'The Living World', topics: 12, slug: 'the-living-world' },
      {
        number: 2,
        name: 'Biological Classification',
        topics: 18,
        slug: 'biological-classification',
      },
      { number: 3, name: 'Plant Kingdom', topics: 22, slug: 'plant-kingdom' },
      { number: 4, name: 'Animal Kingdom', topics: 28, slug: 'animal-kingdom' },
    ],
  },
  {
    unit: 'Unit 2: Structural Organisation',
    chapters: [
      {
        number: 5,
        name: 'Morphology of Flowering Plants',
        topics: 24,
        slug: 'morphology-flowering-plants',
      },
      {
        number: 6,
        name: 'Anatomy of Flowering Plants',
        topics: 20,
        slug: 'anatomy-flowering-plants',
      },
      {
        number: 7,
        name: 'Structural Organisation in Animals',
        topics: 16,
        slug: 'structural-organisation-animals',
      },
    ],
  },
  {
    unit: 'Unit 3: Cell Structure and Function',
    chapters: [
      { number: 8, name: 'Cell: The Unit of Life', topics: 22, slug: 'cell-unit-of-life' },
      { number: 9, name: 'Biomolecules', topics: 18, slug: 'biomolecules' },
      { number: 10, name: 'Cell Cycle and Cell Division', topics: 14, slug: 'cell-cycle-division' },
    ],
  },
  {
    unit: 'Unit 4: Plant Physiology',
    chapters: [
      { number: 11, name: 'Transport in Plants', topics: 16, slug: 'transport-in-plants' },
      { number: 12, name: 'Mineral Nutrition', topics: 14, slug: 'mineral-nutrition' },
      { number: 13, name: 'Photosynthesis in Higher Plants', topics: 20, slug: 'photosynthesis' },
      { number: 14, name: 'Respiration in Plants', topics: 16, slug: 'respiration-in-plants' },
      {
        number: 15,
        name: 'Plant Growth and Development',
        topics: 18,
        slug: 'plant-growth-development',
      },
    ],
  },
  {
    unit: 'Unit 5: Human Physiology',
    chapters: [
      { number: 16, name: 'Digestion and Absorption', topics: 20, slug: 'digestion-absorption' },
      {
        number: 17,
        name: 'Breathing and Exchange of Gases',
        topics: 18,
        slug: 'breathing-exchange-gases',
      },
      {
        number: 18,
        name: 'Body Fluids and Circulation',
        topics: 22,
        slug: 'body-fluids-circulation',
      },
      {
        number: 19,
        name: 'Excretory Products and Their Elimination',
        topics: 18,
        slug: 'excretory-products',
      },
      { number: 20, name: 'Locomotion and Movement', topics: 16, slug: 'locomotion-movement' },
      { number: 21, name: 'Neural Control and Coordination', topics: 24, slug: 'neural-control' },
      {
        number: 22,
        name: 'Chemical Coordination and Integration',
        topics: 20,
        slug: 'chemical-coordination',
      },
    ],
  },
]

const class12Chapters = [
  {
    unit: 'Unit 6: Reproduction',
    chapters: [
      { number: 1, name: 'Reproduction in Organisms', topics: 12, slug: 'reproduction-organisms' },
      {
        number: 2,
        name: 'Sexual Reproduction in Flowering Plants',
        topics: 24,
        slug: 'sexual-reproduction-plants',
      },
      { number: 3, name: 'Human Reproduction', topics: 22, slug: 'human-reproduction' },
      { number: 4, name: 'Reproductive Health', topics: 16, slug: 'reproductive-health' },
    ],
  },
  {
    unit: 'Unit 7: Genetics and Evolution',
    chapters: [
      {
        number: 5,
        name: 'Principles of Inheritance and Variation',
        topics: 26,
        slug: 'inheritance-variation',
      },
      {
        number: 6,
        name: 'Molecular Basis of Inheritance',
        topics: 24,
        slug: 'molecular-inheritance',
      },
      { number: 7, name: 'Evolution', topics: 20, slug: 'evolution' },
    ],
  },
  {
    unit: 'Unit 8: Biology and Human Welfare',
    chapters: [
      { number: 8, name: 'Human Health and Disease', topics: 22, slug: 'human-health-disease' },
      {
        number: 9,
        name: 'Strategies for Enhancement in Food Production',
        topics: 18,
        slug: 'food-production',
      },
      { number: 10, name: 'Microbes in Human Welfare', topics: 16, slug: 'microbes-human-welfare' },
    ],
  },
  {
    unit: 'Unit 9: Biotechnology',
    chapters: [
      {
        number: 11,
        name: 'Biotechnology: Principles and Processes',
        topics: 20,
        slug: 'biotechnology-principles',
      },
      {
        number: 12,
        name: 'Biotechnology and Its Applications',
        topics: 18,
        slug: 'biotechnology-applications',
      },
    ],
  },
  {
    unit: 'Unit 10: Ecology',
    chapters: [
      { number: 13, name: 'Organisms and Populations', topics: 18, slug: 'organisms-populations' },
      { number: 14, name: 'Ecosystem', topics: 20, slug: 'ecosystem' },
      {
        number: 15,
        name: 'Biodiversity and Conservation',
        topics: 16,
        slug: 'biodiversity-conservation',
      },
      { number: 16, name: 'Environmental Issues', topics: 14, slug: 'environmental-issues' },
    ],
  },
]

const faqItems = [
  {
    question: 'Are these NCERT Biology solutions free to download?',
    answer:
      'Yes, all our NCERT Biology solutions for Class 11 and Class 12 are completely free. You can access them online or download PDFs for offline study.',
  },
  {
    question: 'Are these solutions helpful for NEET preparation?',
    answer:
      'Absolutely! Our solutions are prepared by AIIMS faculty with NEET focus. We highlight NEET-important concepts, include previous year questions, and provide exam-oriented explanations.',
  },
  {
    question: 'Do these solutions cover all NCERT exercises?',
    answer:
      'Yes, we provide solutions for all in-text questions, exercise questions, and additional questions from NCERT Biology textbooks of Class 11 and 12.',
  },
  {
    question: 'Who has prepared these NCERT solutions?',
    answer:
      'Our NCERT Biology solutions are prepared by Dr. Shekhar and team at Cerebrum Biology Academy, with faculty from AIIMS and other premier medical institutions.',
  },
  {
    question: 'Can I use these solutions for board exams?',
    answer:
      'Yes, these solutions are perfect for CBSE board exams as they follow NCERT guidelines strictly. The answers are written in exam-friendly format with proper diagrams.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function NCERTBiologySolutionsPage() {
  return (
    <>
      <Script
        id="ncert-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-green-600 opacity-5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 50,000+ NEET Aspirants
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                NCERT Biology Solutions
                <span className="block text-green-600">Class 11 & 12</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Free chapter-wise NCERT Biology solutions with detailed explanations, diagrams, and
                NEET preparation tips. Prepared by AIIMS faculty for 2025 exams.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#class-11"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Class 11 Solutions
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
                <a
                  href="#class-12"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Class 12 Solutions
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">38</div>
                <div className="text-sm text-gray-600">Chapters Covered</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">1000+</div>
                <div className="text-sm text-gray-600">Solved Questions</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Diagrams & Flowcharts</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">Free</div>
                <div className="text-sm text-gray-600">PDF Downloads</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Why Choose Our NCERT Solutions?
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AIIMS Faculty</h3>
                <p className="text-sm text-gray-600">
                  Solutions prepared by doctors and researchers from AIIMS
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">NEET Focused</h3>
                <p className="text-sm text-gray-600">
                  Highlights NEET-important topics with PYQ references
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Free PDF Download</h3>
                <p className="text-sm text-gray-600">
                  Download chapter-wise PDFs for offline study
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Exam Ready</h3>
                <p className="text-sm text-gray-600">
                  Written in proper answer format for boards & NEET
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Class 11 Solutions */}
        <section id="class-11" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Class 11 Biology Solutions</h2>
                <p className="text-gray-600 mt-1">
                  22 Chapters | 5 Units | Complete NCERT Coverage
                </p>
              </div>
              <div className="hidden md:flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                NCERT 2024-25
              </div>
            </div>

            <div className="space-y-8">
              {class11Chapters.map((unit, unitIndex) => (
                <div
                  key={unitIndex}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white">{unit.unit}</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {unit.chapters.map((chapter) => (
                      <div
                        key={chapter.number}
                        className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="w-10 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center font-bold">
                            {chapter.number}
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">{chapter.name}</h4>
                            <p className="text-sm text-gray-500">{chapter.topics} Topics Covered</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Link
                            href={`/biology-notes/class-11/${chapter.slug}`}
                            className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                          >
                            View Solutions
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Class 12 Solutions */}
        <section id="class-12" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Class 12 Biology Solutions</h2>
                <p className="text-gray-600 mt-1">
                  16 Chapters | 5 Units | Complete NCERT Coverage
                </p>
              </div>
              <div className="hidden md:flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                NCERT 2024-25
              </div>
            </div>

            <div className="space-y-8">
              {class12Chapters.map((unit, unitIndex) => (
                <div
                  key={unitIndex}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white">{unit.unit}</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {unit.chapters.map((chapter) => (
                      <div
                        key={chapter.number}
                        className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="w-10 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center font-bold">
                            {chapter.number}
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">{chapter.name}</h4>
                            <p className="text-sm text-gray-500">{chapter.topics} Topics Covered</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Link
                            href={`/biology-notes/class-12/${chapter.slug}`}
                            className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                          >
                            View Solutions
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How to Use NCERT Solutions Effectively
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Read NCERT First</h3>
                <p className="text-gray-600">
                  Always read the NCERT textbook chapter thoroughly before looking at solutions.
                  Understand concepts first, then verify with our explanations.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Attempt Questions</h3>
                <p className="text-gray-600">
                  Try solving NCERT exercise questions on your own. Use solutions only to check your
                  answers or when genuinely stuck.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Focus on Diagrams</h3>
                <p className="text-gray-600">
                  Biology needs diagrams. Practice drawing all NCERT diagrams. Our solutions include
                  exam-ready diagrams for each chapter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need More Help with NEET Biology?
            </h2>
            <p className="text-green-100 text-lg mb-8">
              Join Cerebrum Biology Academy for comprehensive NEET preparation with AIIMS faculty.
              Get personalized guidance, doubt solving, and structured study material.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo-booking"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
              >
                Book Free Demo Class
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center px-8 py-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
