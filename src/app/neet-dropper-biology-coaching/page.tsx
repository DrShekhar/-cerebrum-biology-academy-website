import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { dropperSEOPages } from '@/data/seo-landing'

import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
const content = dropperSEOPages.neetDropperBiologyCoaching

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  keywords: content.keywords,
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
    url: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: content.title,
    description: content.metaDescription,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
}

export default function NeetDropperBiologyCoachingPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/neet-dropper-biology-coaching"
        pageName="NEET Dropper Biology Coaching"
        parentHub={{
          name: 'Best NEET Biology Tutor',
          url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
        }}
        personKnowsAbout={[
          'NEET Dropper Biology',
          'Dropper Botany Revision',
          'Dropper Zoology Mastery',
          'NEET Biology 350+ Target',
          'Dropper NCERT Mapping',
        ]}
        courseName="NEET Dropper Biology Coaching"
        courseDescription="Biology-only dropper programme — compressed 6-10 month Class 11 + 12 NCERT revision with NEET PYQ pattern drilling. 30-60 mark biology improvement year-over-year typical for Cerebrum droppers."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(content.schema),
        }}
      />
      <SEOLandingPage content={content} />
    </>
  )
}
