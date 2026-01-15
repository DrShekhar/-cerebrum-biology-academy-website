/**
 * DefinedTerm Schema Component
 * For biology glossary terms - targets featured snippets and voice search
 * Implements schema.org/DefinedTerm for AEO optimization
 *
 * SECURITY NOTE: dangerouslySetInnerHTML is safe here as content comes from
 * trusted props, not user input. This is the standard pattern for JSON-LD.
 */

interface DefinedTermProps {
  term: string
  definition: string
  description?: string
  category?: string
  relatedTerms?: string[]
  url?: string
  imageUrl?: string
  source?: string
  dateModified?: string
}

interface DefinedTermListProps {
  terms: DefinedTermProps[]
  category?: string
}

/**
 * Single defined term with schema markup
 */
export function DefinedTermSchema({
  term,
  definition,
  category = 'Biology',
  url,
  imageUrl,
  source = 'NCERT Biology Textbook',
  dateModified,
}: DefinedTermProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: `${category} Glossary - Cerebrum Biology Academy`,
      description: `Comprehensive ${category.toLowerCase()} terms and definitions for NEET preparation`,
    },
    ...(url && { url }),
    ...(imageUrl && { image: imageUrl }),
    ...(dateModified && { dateModified }),
    termCode: term.toLowerCase().replace(/\s+/g, '-'),
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${term} - Definition & Explanation`,
    description: definition,
    mainEntity: {
      '@type': 'DefinedTerm',
      name: term,
      description: definition,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.term-definition', '.term-explanation'],
    },
    citation: {
      '@type': 'CreativeWork',
      name: source,
      publisher: {
        '@type': 'Organization',
        name: 'NCERT',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  )
}

/**
 * Multiple defined terms in a glossary list
 */
export function DefinedTermListSchema({ terms, category = 'Biology' }: DefinedTermListProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: `${category} Glossary - NEET Biology Terms`,
    description: `Complete glossary of ${category.toLowerCase()} terms for NEET 2026 preparation by Cerebrum Biology Academy`,
    url: 'https://cerebrumbiologyacademy.com/glossary',
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      termCode: t.term.toLowerCase().replace(/\s+/g, '-'),
    })),
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
    },
    inLanguage: 'en-IN',
    educationalLevel: 'Class 11-12, NEET Aspirants',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Visual component to display a defined term with proper semantic markup
 */
export function DefinedTermDisplay({
  term,
  definition,
  description,
  category = 'Biology',
  relatedTerms = [],
  source = 'NCERT Biology',
}: DefinedTermProps) {
  return (
    <article
      className="term-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      itemScope
      itemType="https://schema.org/DefinedTerm"
    >
      <header className="mb-3">
        <span className="mb-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
          {category}
        </span>
        <h3 className="term-name text-xl font-bold text-slate-900" itemProp="name">
          {term}
        </h3>
      </header>

      <div className="term-definition mb-4 text-slate-700" itemProp="description">
        <p className="font-medium">{definition}</p>
        {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      </div>

      {relatedTerms && relatedTerms.length > 0 && (
        <div className="related-terms mb-3">
          <span className="text-xs font-medium text-slate-500">Related Terms: </span>
          {relatedTerms.map((rt, idx) => (
            <span key={rt}>
              <a
                href={`/glossary/${rt.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs text-teal-600 hover:underline"
              >
                {rt}
              </a>
              {idx < relatedTerms.length - 1 && ', '}
            </span>
          ))}
        </div>
      )}

      <footer className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span>
          Source: <cite>{source}</cite>
        </span>
        <span itemProp="provider" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">Cerebrum Biology Academy</span>
        </span>
      </footer>

      <DefinedTermSchema
        term={term}
        definition={definition}
        description={description}
        category={category}
        relatedTerms={relatedTerms}
        source={source}
      />
    </article>
  )
}

export default DefinedTermSchema
