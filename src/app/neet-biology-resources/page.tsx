import { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/seo'
import { FAQSchema, FAQDisplay } from '@/components/seo/FAQSchema'

// Metadata export (requires static generation in production)
export const metadata: Metadata = {
  title: 'NEET Biology Resources 2026: Free Notes, PYQs, Study Material | Cerebrum Biology Academy',
  description:
    'Access comprehensive NEET Biology resources including chapter-wise notes, previous year questions, study plans, and expert tips from Cerebrum Biology Academy\'s AIIMS-trained faculty.',
  keywords:
    'neet biology resources, neet biology study material, neet biology free notes, neet biology pyqs, neet chapter wise notes',
  openGraph: {
    title: 'NEET Biology Resources 2026: Complete Study Hub',
    description:
      'Access 140+ curated NEET Biology resources including notes, PYQs, and expert study strategies.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-resources',
    images: [
      {
        url: '/images/neet-biology-resources-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Resources 2026',
    description: 'Complete study hub with 140+ curated biology resources',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-resources',
  },
}

// Data for chapter-wise study material
const studyUnits = [
  {
    id: 1,
    name: 'Diversity of Life',
    icon: '🌿',
    description: 'Plant & Animal Kingdom Classification',
    chapters: ['Plant Kingdom', 'Animal Kingdom', 'Taxonomy'],
    links: [
      { title: 'Plant Kingdom Classification', slug: 'plant-kingdom-classification-neet' },
      { title: 'Animal Kingdom Weightage Analysis', slug: 'neet-animal-kingdom-weightage-chapter-wise-analysis' },
    ],
  },
  {
    id: 2,
    name: 'Cell Biology',
    icon: '🔬',
    description: 'Cell Structure, Division & Biomolecules',
    chapters: ['Cell Structure', 'Cell Division', 'Biomolecules'],
    links: [
      { title: 'Cell Structure & Function', slug: 'cell-structure-function-neet-notes' },
      { title: 'Cell Division: Mitosis & Meiosis', slug: 'cell-division-mitosis-meiosis-neet' },
      { title: 'Biomolecules Complete Guide', slug: 'biomolecules-neet-biology-complete-guide' },
    ],
  },
  {
    id: 3,
    name: 'Plant Physiology',
    icon: '🌱',
    description: 'Photosynthesis, Respiration & Transport',
    chapters: ['Photosynthesis', 'Respiration', 'Transport in Plants'],
    links: [
      { title: 'Photosynthesis NEET Notes', slug: 'photosynthesis-neet-biology-notes' },
      { title: 'Photosynthesis vs Respiration', slug: 'photosynthesis-vs-respiration-neet-comparison' },
    ],
  },
  {
    id: 4,
    name: 'Human Physiology',
    icon: '👨‍⚕️',
    description: 'Digestion, Respiration, Circulation & Excretion',
    chapters: [
      'Digestion',
      'Respiration',
      'Circulation',
      'Excretion',
      'Nervous System',
      'Hormones',
    ],
    links: [
      { title: 'Human Physiology Complete Guide', slug: 'neet-biology-human-physiology-complete-guide' },
      { title: 'Digestion & Absorption', slug: 'human-digestion-absorption-neet' },
      { title: 'Breathing & Gas Exchange', slug: 'breathing-gas-exchange-neet-notes' },
      { title: 'Body Fluids & Circulation', slug: 'body-fluids-circulation-neet' },
      { title: 'Excretory System', slug: 'excretory-system-neet-notes' },
      { title: 'Nervous System', slug: 'nervous-system-neet-biology' },
    ],
  },
  {
    id: 5,
    name: 'Reproduction',
    icon: '🧬',
    description: 'Human & Plant Reproduction',
    chapters: ['Sexual Reproduction in Humans', 'Reproductive Health'],
    links: [
      {
        title: 'Human Reproduction Complete Guide',
        slug: 'human-reproduction-neet-notes-complete-guide',
      },
    ],
  },
  {
    id: 6,
    name: 'Genetics & Evolution',
    icon: '⚡',
    description: 'Heredity, Molecular Biology & Evolution',
    chapters: [
      'Mendelian Inheritance',
      'Molecular Basis',
      'Evolution',
      'Human Genome',
    ],
    links: [
      { title: 'Genetics, Heredity & Variation', slug: 'genetics-heredity-variation-neet' },
      { title: 'Genetics for NEET: Mendel to Molecular Biology', slug: 'genetics-for-neet-mendel-to-molecular-biology' },
      { title: 'Genetics Weightage Analysis', slug: 'neet-genetics-weightage-chapter-wise-analysis' },
    ],
  },
  {
    id: 7,
    name: 'Ecology',
    icon: '🌍',
    description: 'Organisms, Populations & Ecosystems',
    chapters: [
      'Organisms & Environment',
      'Populations',
      'Communities',
      'Ecosystems',
      'Biodiversity',
    ],
    links: [
      { title: 'Ecology Weightage Analysis', slug: 'neet-ecology-weightage-chapter-wise-analysis' },
    ],
  },
]

// Preparation strategy articles
const strategyArticles = [
  {
    title: 'How to Score 360+ in NEET Biology',
    slug: 'how-to-score-360-in-neet-biology',
    description: 'Master the strategies to achieve 360+ marks in NEET Biology exam',
  },
  {
    title: 'How to Score 340+ in NEET Biology',
    slug: 'how-to-score-340-plus-in-neet-biology-expert-strategy',
    description: 'Expert strategies to consistently score 340+ in NEET Biology',
  },
  {
    title: 'NEET Biology Chapter-wise Weightage 2026',
    slug: 'neet-biology-chapter-wise-weightage-2026-advanced',
    description: 'Detailed analysis of chapter weightage to prioritize your studies',
  },
  {
    title: 'NEET Biology Preparation Strategy',
    slug: 'neet-biology-preparation-strategy-score-340-plus',
    description: 'Complete roadmap for NEET Biology preparation from zero to hero',
  },
  {
    title: 'Revision Strategy for NEET 2026',
    slug: 'revision-strategy-neet-2026-complete-guide',
    description: 'Effective revision techniques for maximum score improvement',
  },
]

// FAQ data
const faqQuestions = [
  {
    question: 'What are the best resources for NEET Biology preparation?',
    answer:
      'The best resources include NCERT textbooks, chapter-wise notes from expert faculty, previous year question papers, and structured study plans. Cerebrum provides all these resources with AI-driven personalization to match your learning pace.',
  },
  {
    question: 'How much weightage does Biology carry in NEET?',
    answer:
      'Biology carries 360 marks out of 720 total in NEET, with 90 questions from Botany and 90 from Zoology. It\'s the most scoring subject if approached strategically with proper time management.',
  },
  {
    question: 'What is the best way to study NEET Biology chapters?',
    answer:
      'Follow the NCERT sequence, create concept maps, solve PYQs after each chapter, and revise regularly. Use our chapter-wise weightage analysis to prioritize high-scoring topics. Practice with mock tests weekly to track progress.',
  },
  {
    question: 'How many NEET Biology questions come from each unit?',
    answer:
      'Typically: Diversity (8-10), Cell Biology (8-10), Plant Physiology (7-9), Human Physiology (20-25), Reproduction (4-6), Genetics (8-10), Ecology (8-10). These distributions vary slightly each year—check our weightage analysis for 2026 patterns.',
  },
  {
    question: 'Are these study materials sufficient for NEET or do I need coaching?',
    answer:
      'These resources are comprehensive and NCERT-aligned, covering all NEET requirements. Many students qualify using quality self-study materials. However, structured guidance through online coaching or personalized mentoring can accelerate your progress and reduce confusion.',
  },
]

export default function NEETBiologyResourcesPage() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbSchema
          items={[
            { label: 'Home', url: '/' },
            { label: 'Resources', url: '/neet-biology-resources', isCurrentPage: true },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-20 px-4 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NEET Biology Resource Hub 2026</h1>
          <p className="text-xl text-slate-300 mb-2">Master all biology concepts with expert-curated notes and study materials</p>
          <p className="text-lg text-slate-400">140+ comprehensive articles, previous year analyses, and proven strategies</p>
        </div>
      </section>

      {/* Chapter-Wise Study Material Section */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Chapter-Wise Study Material</h2>
          <p className="text-gray-600 mb-12">
            Complete coverage of all NEET Biology topics with detailed notes and links to comprehensive guides
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6"
              >
                <div className="text-4xl mb-3">{unit.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{unit.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{unit.description}</p>

                {/* Key chapters */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    Key Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {unit.chapters.slice(0, 3).map((chapter, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                      >
                        {chapter}
                      </span>
                    ))}
                    {unit.chapters.length > 3 && (
                      <span className="inline-block text-gray-500 text-xs px-2 py-1">
                        +{unit.chapters.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Links to articles */}
                <div className="space-y-2">
                  {unit.links.map((link, idx) => (
                    <div key={idx}>
                      <Link
                        href={`/blog/${link.slug}`}
                        className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                      >
                        <span className="mr-2">→</span>
                        {link.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Strategy Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Preparation Strategies & Analysis</h2>
          <p className="text-gray-600 mb-12">
            Expert-backed strategies to optimize your study plan and achieve your target score
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategyArticles.map((article, idx) => (
              <Link
                key={idx}
                href={`/blog/${article.slug}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📊</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{article.description}</p>
                    <div className="mt-4 text-green-600 font-semibold text-sm">
                      Read Guide →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Success Stories</h2>
          <p className="text-gray-600 mb-12">
            Real students, real results. Learn from those who achieved their goals with our strategies
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/blog/student-achieves-350-neet-biology-score"
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Student Achieves 350+ in NEET Biology
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Detailed case study of a student\'s journey from average to 350+ marks
              </p>
              <span className="text-blue-600 font-semibold text-sm">Read Case Study →</span>
            </Link>

            <Link
              href="/blog/neet-biology-score-improvement-strategies"
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">📈</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Score Improvement Strategies
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Proven tactics to improve your NEET Biology score in final months
              </p>
              <span className="text-green-600 font-semibold text-sm">Learn Strategies →</span>
            </Link>

            <Link
              href="/blog/neet-biology-topper-interview"
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                NEET Biology Topper Interview
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Exclusive interview with a NEET Biology topper sharing their secrets
              </p>
              <span className="text-purple-600 font-semibold text-sm">Read Interview →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Free Downloads Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Free Downloads</h2>
          <p className="text-gray-600 mb-12">
            Download free study materials, notes PDFs, and previous year question papers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📚</div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">Chapter-wise Notes PDF</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive notes for all 11 NEET Biology chapters with diagrams and key points
                  </p>
                  <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                    Download Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📋</div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">NEET Biology PYQ Collection</h3>
                  <p className="text-gray-600 mb-4">
                    15 years of NEET previous year questions organized by chapter and topic
                  </p>
                  <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                    Download Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <FAQDisplay questions={faqQuestions} title="Frequently Asked Questions" />
          <FAQSchema questions={faqQuestions} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-800 to-yellow-900 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Master NEET Biology?</h2>
          <p className="text-xl text-yellow-100 mb-8">
            Join Cerebrum Biology Academy and get personalized guidance from AIIMS-trained faculty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-free-demo"
              className="px-8 py-4 bg-white text-yellow-800 font-bold rounded-lg hover:bg-yellow-50 transition-colors text-lg"
            >
              Book Free Demo Class
            </Link>
            <a
              href="tel:+918826444334"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-yellow-800 transition-colors text-lg"
            >
              Call: +91-88264-44334
            </a>
          </div>
          <p className="text-yellow-200 mt-6 text-sm">
            Limited slots available | Personalized 1-on-1 guidance | AIIMS-trained faculty
          </p>
        </div>
      </section>

      {/* Related Resources CTA */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Explore More NEET Resources</h3>
            <p className="text-gray-600 mb-6">
              Check out our complete guide to NEET Biology preparation with detailed analysis
            </p>
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              Visit NEET Biology Blog →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
