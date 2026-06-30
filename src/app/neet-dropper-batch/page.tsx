import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { dropperSEOPages } from '@/data/seo-landing'

import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
const content = dropperSEOPages.neetDropperBatch

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
  // noindex 2026-06 (national dropper doorway consolidation): redundant intent
  // page; canonical commercial page /courses/neet-dropper carries the index
  // signal. Stays live for visitors + internal links (follow). Reversible.
  robots: 'noindex, follow',
}

export default function NeetDropperBatchPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/neet-dropper-batch"
        pageName="NEET Dropper Batch"
        parentHub={{
          name: 'Best NEET Biology Tutor',
          url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
        }}
        personKnowsAbout={[
          'NEET Dropper Batch',
          'Compressed NEET Curriculum',
          'NEET Dropper Mock Schedule',
          'NEET Class 11 + 12 Revision',
          'Repeat Aspirant Strategy',
        ]}
        courseName="NEET Dropper Batch Programme"
        courseDescription="Compressed 6-10 month NEET dropper batch programme covering Class 11 + 12 NCERT revision with biweekly full-length NEET mocks from month 2 onwards. Higher baseline calibration for repeat aspirants."
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
