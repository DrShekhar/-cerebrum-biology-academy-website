import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('girls-neet-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'girls neet coaching gurugram',
    'female neet coaching gurgaon',
    'neet coaching for girls',
    'women neet preparation gurugram',
    'safe neet coaching girls',
    'female students neet gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/girls-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/girls-neet-coaching-gurugram',
  },
}

export default function GirlsNEETCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
