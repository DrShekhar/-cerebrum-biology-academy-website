/**
 * QAPage Schema Component
 *
 * Implements schema.org/QAPage structured data for blog posts and articles
 * that contain Q&A style content. This helps with:
 * - Google's featured snippets
 * - Voice search answers
 * - Rich results in search
 *
 * @see https://schema.org/QAPage
 * @see https://developers.google.com/search/docs/appearance/structured-data/qapage
 */

interface QAItem {
  question: string
  answer: string
  author?: string
  dateCreated?: string
  upvoteCount?: number
}

interface QAPageSchemaProps {
  mainQuestion: string
  mainAnswer: string
  additionalQAs?: QAItem[]
  pageUrl: string
  datePublished: string
  dateModified?: string
  author?: {
    name: string
    url?: string
  }
}

/**
 * QAPage Schema for single Q&A focused pages
 * Use this for "What is", "How to", "Why" style articles
 */
export function QAPageSchema({
  mainQuestion,
  mainAnswer,
  additionalQAs = [],
  pageUrl,
  datePublished,
  dateModified,
  author = { name: 'Dr. Shekhar C Singh', url: 'https://cerebrumbiologyacademy.com/about' },
}: QAPageSchemaProps) {
  const qaPageData = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: mainQuestion,
      text: mainQuestion,
      answerCount: 1 + additionalQAs.length,
      dateCreated: datePublished,
      author: {
        '@type': 'Person',
        name: author.name,
        ...(author.url && { url: author.url }),
      },
      acceptedAnswer: {
        '@type': 'Answer',
        text: mainAnswer,
        dateCreated: datePublished,
        ...(dateModified && { dateModified }),
        author: {
          '@type': 'Person',
          name: author.name,
        },
        upvoteCount: 150,
        url: pageUrl,
      },
      ...(additionalQAs.length > 0 && {
        suggestedAnswer: additionalQAs.map((qa) => ({
          '@type': 'Answer',
          text: qa.answer,
          dateCreated: qa.dateCreated || datePublished,
          author: {
            '@type': 'Person',
            name: qa.author || author.name,
          },
          upvoteCount: qa.upvoteCount || 50,
        })),
      }),
    },
    url: pageUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(qaPageData) }}
    />
  )
}

interface HowToSchemaProps {
  name: string
  description: string
  steps: {
    name: string
    text: string
    image?: string
    url?: string
  }[]
  totalTime?: string // ISO 8601 duration format, e.g., "PT30M" for 30 minutes
  estimatedCost?: {
    currency: string
    value: string
  }
  pageUrl: string
  image?: string
}

/**
 * HowTo Schema for step-by-step guides
 * Perfect for "How to prepare for NEET" type content
 */
export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
  pageUrl,
  image,
}: HowToSchemaProps) {
  const howToData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(image && { image }),
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: estimatedCost.currency,
        value: estimatedCost.value,
      },
    }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
    url: pageUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToData) }}
    />
  )
}

interface ItemListSchemaProps {
  name: string
  description: string
  items: {
    name: string
    description?: string
    position: number
    url?: string
    image?: string
  }[]
  pageUrl: string
  itemType?: 'Thing' | 'ListItem' | 'Course' | 'Organization' | 'Product'
}

/**
 * ItemList Schema for "Top 10", "Best X" style content
 * Optimized for featured snippet potential
 */
export function ItemListSchema({
  name,
  description,
  items,
  pageUrl,
  itemType = 'ListItem',
}: ItemListSchemaProps) {
  const itemListData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': itemType,
      position: item.position,
      name: item.name,
      ...(item.description && { description: item.description }),
      ...(item.url && { url: item.url }),
      ...(item.image && { image: item.image }),
    })),
    url: pageUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
    />
  )
}

/**
 * Combined schema for comprehensive AEO optimization
 * Use on pages that have FAQ, HowTo, and List content
 */
interface ComprehensiveAEOSchemaProps {
  pageUrl: string
  pageTitle: string
  pageDescription: string
  faqs?: { question: string; answer: string }[]
  howToSteps?: { name: string; text: string }[]
  listItems?: { name: string; description: string }[]
  speakableSelectors?: string[]
  datePublished: string
  dateModified?: string
}

export function ComprehensiveAEOSchema({
  pageUrl,
  pageTitle,
  pageDescription,
  faqs,
  howToSteps,
  listItems,
  speakableSelectors = ['.speakable-intro', '.speakable-summary'],
  datePublished,
  dateModified,
}: ComprehensiveAEOSchemaProps) {
  const schemas: object[] = []

  // WebPage with Speakable
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    datePublished,
    ...(dateModified && { dateModified }),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: speakableSelectors,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
  })

  // FAQ Schema
  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  // HowTo Schema
  if (howToSteps && howToSteps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: pageTitle,
      description: pageDescription,
      step: howToSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    })
  }

  // ItemList Schema
  if (listItems && listItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: pageTitle,
      numberOfItems: listItems.length,
      itemListElement: listItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        description: item.description,
      })),
    })
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`aeo-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

/**
 * DefinitionBox Component for "What is X" content
 * Optimized for featured snippet "definition" box
 */
interface DefinitionBoxProps {
  term: string
  definition: string
  className?: string
}

export function DefinitionBox({ term, definition, className = '' }: DefinitionBoxProps) {
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
  }

  return (
    <div className={`bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <p className="speakable-definition text-gray-800">
        <strong className="text-blue-700">{term}</strong> {definition}
      </p>
    </div>
  )
}
