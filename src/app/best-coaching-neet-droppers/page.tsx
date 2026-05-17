import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { dropperSEOPages } from '@/data/seo-landing'

import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
const content = dropperSEOPages.bestCoachingNeetDroppers

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

export default function BestCoachingNeetDroppersPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/best-coaching-neet-droppers"
        pageName="Best Coaching for NEET Droppers"
        parentHub={{
          name: 'Best NEET Biology Tutor',
          url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
        }}
        personKnowsAbout={[
          'NEET Dropper Coaching',
          'NEET Repeat Aspirant Strategy',
          '1-Year NEET Dropper Programme',
          'NEET Biology Dropper Track',
          'AIIMS Dropper Strategy',
          'NEET 650+ Dropper Target',
        ]}
        courseName="Best NEET Dropper Coaching"
        courseDescription="Dedicated 1-year NEET dropper programme for repeat aspirants. Class 11 + 12 NCERT compressed into 6-10 months with biweekly full-length NEET mocks from month 2 onwards. Same AIIMS-trained faculty as fresh batches, calibrated to higher dropper baseline."
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
