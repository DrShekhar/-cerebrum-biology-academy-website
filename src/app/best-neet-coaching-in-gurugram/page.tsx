import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('best-neet-coaching-in-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'best neet coaching in gurugram',
    'which is best neet coaching gurugram',
    'top neet coaching gurugram',
    'best neet institute gurugram',
    'number 1 neet coaching gurgaon',
    'best medical coaching gurugram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/best-neet-coaching-in-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-coaching-in-gurugram',
  },
}

export default function BestNEETCoachingInGurugramPage() {
  return <CityHubPage data={cityData} />
}
