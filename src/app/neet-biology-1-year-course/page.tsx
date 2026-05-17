import { Metadata } from 'next'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { SEOLandingPage } from '@/components/seo-landing'
import { crashCourseSEOPages } from '@/data/seo-landing'

const content = crashCourseSEOPages['neet-biology-1-year-course']

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

export default function NeetBiology1YearCoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(content.schema),
        }}
      />
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/neet-biology-1-year-course"
        pageName="NEET Biology 1-Year Course"
        parentHub={{
          name: 'Best NEET Biology Tutor',
          url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
        }}
        personKnowsAbout={[
          'NEET Biology 1-Year Course',
          'NEET Biology Annual Programme',
          'NEET Biology Dropper Programme',
          'NEET Biology Full-Year Curriculum',
        ]}
        courseName="NEET Biology 1-Year Course — Full Annual Programme"
        courseDescription="Comprehensive 1-year NEET Biology programme covering Class 11 + Class 12 NCERT line-by-line, weekly chapter tests, monthly full-length NEET mocks, biweekly 1:1 doubt sessions. Pursuit / Ascent / Pinnacle tier options."
      />
      <SEOLandingPage content={content} />
    </>
  )
}
