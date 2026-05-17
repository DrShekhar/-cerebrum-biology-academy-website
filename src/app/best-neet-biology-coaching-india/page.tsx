import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { comparisonSEOPages } from '@/data/seo-landing'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'

const content = comparisonSEOPages['best-neet-biology-coaching-india']

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

export default function BestNeetBiologyCoachingIndiaPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/best-neet-biology-coaching-india"
        pageName="Best NEET Biology Coaching in India"
        parentHub={{
          name: 'Best NEET Biology Tutor',
          url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
        }}
        personKnowsAbout={[
          'Best NEET Biology Coaching India',
          'NEET Biology Pan-India',
          'NEET-UG Biology National Hub',
          'Top NEET Biology Coaching India',
          'AIIMS-Trained NEET Faculty India',
          'Online NEET Biology India',
        ]}
        courseName="Best NEET Biology Coaching in India — National Hub"
        courseDescription="India's only biology-only specialist NEET coaching brand. 680+ medical college selections, 98% NEET-UG qualification rate, 15-20 student batches across 6 Delhi NCR offline centres plus pan-India online live classes serving Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, plus NRI students in 14+ countries."
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
