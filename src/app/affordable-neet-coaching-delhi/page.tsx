import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'
import { BreadcrumbSchema } from '@/components/seo'

const pageData = getIntentPageData('affordable-neet-coaching-delhi')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'affordable neet coaching delhi',
    'cheap neet coaching',
    'low cost neet classes',
    'budget neet coaching',
    'neet coaching fees delhi',
    'neet coaching with emi',
    'scholarship neet coaching',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/affordable-neet-coaching-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/affordable-neet-coaching-delhi',
  },
}

export default function AffordableNEETCoachingDelhiPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbSchema
          items={[{ label: 'Affordable NEET Coaching Delhi', isCurrentPage: true }]}
        />
      </div>
      <IntentLandingPage data={pageData} />
    </>
  )
}
