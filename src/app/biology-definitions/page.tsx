import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, GraduationCap, Beaker } from 'lucide-react'
import { biologyDefinitions, categories } from '@/data/biology-definitions'
import { FloatingCTA } from '@/components/common/FloatingCTA'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Biology Definitions for NEET | Important Terms & Concepts',
  description:
    'Master essential biology definitions for NEET 2025-26. Comprehensive glossary of 30+ important terms with examples, key points, and NEET relevance. Free study material by Dr. Shekhar C Singh.',
  keywords: [
    'biology definitions NEET',
    'NEET biology terms',
    'biology glossary',
    'NEET important definitions',
    'biology concepts NEET',
    'cell biology definitions',
    'genetics definitions',
    'ecology terms NEET',
    'NEET biology vocabulary',
    'Class 11 biology definitions',
    'Class 12 biology definitions',
  ].join(', '),
  openGraph: {
    title: 'Biology Definitions for NEET | Essential Terms & Concepts',
    description:
      'Comprehensive biology glossary for NEET preparation. Expert definitions with examples and NEET relevance.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-definitions',
  },
}

export default function BiologyDefinitionsPage() {
  const totalDefinitions = biologyDefinitions.length
  const highRelevance = biologyDefinitions.filter((d) => d.neetRelevance === 'High').length

  const definitionsByCategory = categories.map((category) => ({
    category,
    definitions: biologyDefinitions.filter((d) => d.category === category),
  }))

  const categoryIcons: Record<string, React.ReactNode> = {
    'Cell Biology': <Beaker className="w-5 h-5" />,
    Genetics: <span className="text-lg">🧬</span>,
    Ecology: <span className="text-lg">🌿</span>,
    'Human Physiology': <span className="text-lg">🫀</span>,
    'Plant Biology': <span className="text-lg">🌱</span>,
    Evolution: <span className="text-lg">🦕</span>,
    Biotechnology: <span className="text-lg">🔬</span>,
    Microbiology: <span className="text-lg">🦠</span>,
  }

  const categoryColors: Record<string, string> = {
    'Cell Biology': 'bg-blue-100 text-blue-800 border-blue-200',
    Genetics: 'bg-purple-100 text-purple-800 border-purple-200',
    Ecology: 'bg-green-100 text-green-800 border-green-200',
    'Human Physiology': 'bg-red-100 text-red-800 border-red-200',
    'Plant Biology': 'bg-green-100 text-green-800 border-green-200',
    Evolution: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Biotechnology: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Microbiology: 'bg-teal-100 text-teal-800 border-teal-200',
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Biology Definitions for NEET',
    description:
      'Comprehensive glossary of biology terms for NEET preparation with definitions, examples, and key points',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      founder: {
        '@type': 'Person',
        name: 'Dr. Shekhar C Singh',
      },
    },
    numberOfItems: totalDefinitions,
    about: {
      '@type': 'Course',
      name: 'NEET Biology Preparation',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Script id="collection-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaData)}
      </Script>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 rounded-full text-yellow-300 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              NEET Biology Glossary
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Biology Definitions for NEET
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Master essential biology terms and concepts for NEET 2025-26. Comprehensive
              definitions with examples, key points, and NEET relevance ratings.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">{totalDefinitions}+</div>
                <div className="text-sm text-slate-300">Definitions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">{highRelevance}</div>
                <div className="text-sm text-slate-300">High Priority</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">{categories.length}</div>
                <div className="text-sm text-slate-300">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">100%</div>
                <div className="text-sm text-slate-300">Free Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Browse by Category</h2>
              <p className="text-gray-600">Select a category to jump to those definitions</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <a
                  key={category}
                  href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${categoryColors[category]} hover:shadow-md transition-shadow`}
                >
                  <span className="mr-2">{categoryIcons[category]}</span>
                  {category}
                </a>
              ))}
            </div>
          </div>
        </div>

        {definitionsByCategory
          .filter((c) => c.definitions.length > 0)
          .map(({ category, definitions }) => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-12">
              <div className="flex items-center mb-6">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${categoryColors[category].split(' ')[0]}`}
                >
                  {categoryIcons[category]}
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                  <p className="text-gray-600">{definitions.length} definitions</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {definitions.map((def) => (
                  <Link
                    key={def.slug}
                    href={`/biology-definitions/${def.slug}`}
                    className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 group border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          def.neetRelevance === 'High'
                            ? 'bg-red-100 text-red-800'
                            : def.neetRelevance === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {def.neetRelevance} Priority
                      </span>
                      <span className="text-xs text-gray-500">Class {def.class}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {def.term}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{def.definition}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        {def.keyPoints.length} key points
                      </div>
                      <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Learn More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

        <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need In-Depth NEET Preparation?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join Cerebrum Biology Academy for complete NEET Biology preparation with live classes,
            personalized guidance, and proven strategies by Dr. Shekhar C Singh
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/demo-booking"
              className="inline-block bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-yellow-300 transition-colors text-center"
            >
              Book Free Demo
            </Link>
            <Link
              href="/courses/neet-dropper"
              className="inline-block bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white/10 transition-colors text-center"
            >
              View Courses
            </Link>
          </div>
        </div>
      </div>

      <FloatingCTA />
    </div>
  )
}
