import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('aiims-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'aiims coaching gurugram',
    'aiims coaching gurgaon',
    'medical entrance coaching gurugram',
    'mbbs coaching gurugram',
    'doctor preparation coaching',
    'neet coaching for aiims',
    'aiims preparation gurugram',
    'top medical college coaching',
    'aiims faculty coaching',
    'neet 700+ coaching gurugram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/aiims-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/aiims-coaching-gurugram',
  },
}

export default function AIMSCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
