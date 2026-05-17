import { Metadata } from 'next'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { SEOLandingPage } from '@/components/seo-landing'
import { crashCourseSEOPages } from '@/data/seo-landing'

const content = crashCourseSEOPages['neet-biology-crash-course']

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

export default function NeetBiologyCrashCoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(content.schema),
        }}
      />
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/neet-biology-crash-course"
        pageName="NEET Biology Crash Course"
        parentHub={{
          name: 'Best NEET Biology Tutor',
          url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
        }}
        personKnowsAbout={[
          'NEET Biology Crash Course',
          'NEET 6-8 Week Sprint',
          'NEET Last-Minute Revision',
          'RE-NEET 2026 Crash Course',
          'NEET Dropper Crash Course',
          'NEET Biology Mock Test Sprint',
        ]}
        courseName="NEET Biology Crash Course — 6-8 Week Sprint"
        courseDescription="Intensive 6-8 week NEET Biology crash course built for the final preparation window. Diagnostic mock → weakness mapping → Botany sprint → Zoology sprint → full-length mocks every 48 hours. Led by Dr. Shekhar C Singh."
      />
      <SEOLandingPage content={content} />
    </>
  )
}
