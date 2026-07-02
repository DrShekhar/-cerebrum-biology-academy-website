import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { class8SEOPages } from '@/data/seo-landing'

const content = class8SEOPages['neet-foundation-class-8']
const canonical = `https://cerebrumbiologyacademy.com/${content.slug}`

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  keywords: content.keywords,
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
    url: canonical,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: content.title,
    description: content.metaDescription,
  },
  alternates: { canonical },
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: content.schema.courseName,
  description: content.schema.description,
  provider: {
    '@type': 'EducationalOrganization',
    name: content.schema.provider,
    url: 'https://cerebrumbiologyacademy.com',
  },
  educationalLevel: content.schema.educationalLevel,
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: content.schema.duration,
  },
  offers: {
    '@type': 'Offer',
    price: content.schema.price,
    priceCurrency: content.schema.priceCurrency,
    category: 'Paid',
    availability: 'https://schema.org/InStock',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: content.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: canonical,
  name: content.title,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
}

export default function NeetFoundationClass8Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <SEOLandingPage content={content} />
    </>
  )
}
