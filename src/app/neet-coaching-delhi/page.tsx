import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const cityData = getCityData('delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'best neet coaching in delhi',
    'best neet biology coaching delhi',
    'neet coaching delhi',
    'neet coaching delhi south extension',
    'neet coaching delhi rohini',
    'neet coaching delhi green park',
    'best biology coaching delhi',
    'aiims faculty neet delhi',
    'cerebrum biology academy delhi',
    'top neet coaching delhi 2026',
    'neet coaching south delhi',
    'neet coaching north delhi',
    'dr shekhar singh delhi',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `${BASE_URL}/neet-coaching-delhi`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-delhi`,
  },
}

export default function NEETCoachingDelhiPage() {
  return (
    <>
      <DelhiAreaSchema
        pageSlug="neet-coaching-delhi"
        serviceName="Best NEET Biology Coaching in Delhi"
        description="India's only biology-only specialist NEET coaching in Delhi. 3 offline centres + online live classes. AIIMS-trained faculty led by Dr. Shekhar C Singh."
      />
      <CityHubPage data={cityData} />
    </>
  )
}
