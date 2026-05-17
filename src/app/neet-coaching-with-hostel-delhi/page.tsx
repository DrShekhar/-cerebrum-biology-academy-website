import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const pageData = getIntentPageData('neet-coaching-with-hostel-delhi')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching with hostel delhi',
    'neet coaching with accommodation',
    'pg near neet coaching',
    'hostel for neet students delhi',
    'outstation neet coaching delhi',
    'neet coaching with stay',
  ],
  openGraph: {
    locale: 'en_IN',
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-with-hostel-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-with-hostel-delhi',
  },
}

export default function NEETCoachingWithHostelDelhiPage() {
  return (
    <>
      <DelhiAreaSchema pageSlug="neet-coaching-with-hostel-delhi" />
      <IntentLandingPage data={pageData} />
    </>
  )
}
