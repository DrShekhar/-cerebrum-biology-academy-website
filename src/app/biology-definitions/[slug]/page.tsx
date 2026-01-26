import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  Lightbulb,
  Link as LinkIcon,
  CheckCircle,
  Calendar,
} from 'lucide-react'
import {
  biologyDefinitions,
  getDefinitionBySlug,
  getDefinitionsByCategory,
} from '@/data/biology-definitions'
import { FloatingCTA } from '@/components/common/FloatingCTA'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return biologyDefinitions.map((def) => ({
    slug: def.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const definition = getDefinitionBySlug(resolvedParams.slug)

  if (!definition) {
    return {
      title: 'Definition Not Found | Cerebrum Biology Academy',
      description: 'The requested biology definition could not be found.',
    }
  }

  const metaTitle =
    definition.metaTitle ||
    `${definition.term} - Definition, Key Points & NEET Relevance | Cerebrum Academy`
  const metaDescription =
    definition.metaDescription ||
    `${definition.definition.substring(0, 150)}... Learn key points, examples, and NEET relevance for ${definition.term}.`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      `${definition.term} definition`,
      `what is ${definition.term}`,
      `${definition.term} NEET`,
      `${definition.term} biology`,
      `${definition.term} class ${definition.class}`,
      ...definition.relatedTerms.map((t) => `${t} definition`),
    ].join(', '),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/biology-definitions/${resolvedParams.slug}`,
    },
  }
}

export default async function BiologyDefinitionPage({ params }: PageProps) {
  const resolvedParams = await params
  const definition = getDefinitionBySlug(resolvedParams.slug)

  if (!definition) {
    notFound()
  }

  const relatedDefinitions = getDefinitionsByCategory(definition.category)
    .filter((d) => d.slug !== definition.slug)
    .slice(0, 3)

  const relevanceColors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-gray-100 text-gray-800 border-gray-200',
  }

  const categoryColors: Record<string, string> = {
    'Cell Biology': 'bg-blue-100 text-blue-800',
    Genetics: 'bg-purple-100 text-purple-800',
    Ecology: 'bg-green-100 text-green-800',
    'Human Physiology': 'bg-red-100 text-red-800',
    'Plant Biology': 'bg-green-100 text-green-800',
    Evolution: 'bg-yellow-100 text-yellow-800',
    Biotechnology: 'bg-indigo-100 text-indigo-800',
    Microbiology: 'bg-teal-100 text-teal-800',
  }

  const definitionSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: definition.term,
    description: definition.definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'NEET Biology Glossary',
      url: 'https://cerebrumbiologyacademy.com/biology-definitions',
    },
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${definition.term} - Definition for NEET Biology`,
    description: definition.definition,
    author: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Head Faculty',
      affiliation: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/brain-logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cerebrumbiologyacademy.com/biology-definitions/${definition.slug}`,
    },
    educationalUse: 'NEET Biology Preparation',
    educationalLevel: `Class ${definition.class}`,
    keywords: [definition.term, ...definition.relatedTerms, 'NEET Biology', definition.category],
  }

  return (
    <div className="min-h-screen bg-white">
      <Script id="definition-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(definitionSchema)}
      </Script>
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>

      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link href="/biology-definitions" className="text-blue-600 hover:text-blue-700">
                Biology Definitions
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-gray-700 font-medium truncate">{definition.term}</li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[definition.category]}`}
            >
              {definition.category}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${relevanceColors[definition.neetRelevance]}`}
            >
              {definition.neetRelevance} NEET Priority
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              Class {definition.class}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {definition.term}
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h2 className="sr-only">Definition</h2>
            <p className="text-lg text-gray-800 leading-relaxed">{definition.definition}</p>
          </div>
        </header>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Key Points for NEET
          </h2>
          <ul className="space-y-3">
            {definition.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {definition.example && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
              Example
            </h2>
            <p className="text-gray-700">{definition.example}</p>
          </div>
        )}

        {definition.neetYearAsked && definition.neetYearAsked.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <Calendar className="w-5 h-5 text-purple-600 mr-2" />
              Asked in NEET
            </h2>
            <div className="flex flex-wrap gap-2">
              {definition.neetYearAsked.map((year) => (
                <span
                  key={year}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                >
                  {year}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <LinkIcon className="w-5 h-5 text-gray-600 mr-2" />
            Related Terms
          </h2>
          <div className="flex flex-wrap gap-2">
            {definition.relatedTerms.map((term) => {
              const relatedDef = biologyDefinitions.find(
                (d) => d.term.toLowerCase() === term.toLowerCase()
              )
              return relatedDef ? (
                <Link
                  key={term}
                  href={`/biology-definitions/${relatedDef.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                >
                  {term}
                </Link>
              ) : (
                <span
                  key={term}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                >
                  {term}
                </span>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-2">Want to Master {definition.category}?</h3>
              <p className="text-slate-300 mb-4">
                Join Cerebrum Biology Academy for comprehensive NEET preparation with expert
                faculty.
              </p>
            </div>
            <Link
              href="/demo-booking"
              className="inline-block bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 shadow-lg text-sm sm:text-base min-h-[48px] whitespace-nowrap"
            >
              Book Free Demo
            </Link>
          </div>
        </div>

        {relatedDefinitions.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              More {definition.category} Definitions
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedDefinitions.map((def) => (
                <Link
                  key={def.slug}
                  href={`/biology-definitions/${def.slug}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all group"
                >
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2">
                    {def.term}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{def.definition}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/biology-definitions"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
            >
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">All Definitions</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/biology-notes"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
            >
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Biology Notes</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>
      </article>

      <FloatingCTA />
    </div>
  )
}
