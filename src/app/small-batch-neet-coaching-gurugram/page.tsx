import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('small-batch-neet-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'small batch neet coaching gurugram',
    'limited seats neet coaching',
    'personal attention neet gurgaon',
    'small class neet coaching',
    'boutique neet coaching gurugram',
    'premium neet coaching gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/small-batch-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/small-batch-neet-coaching-gurugram',
  },
}

export default function SmallBatchNEETCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
