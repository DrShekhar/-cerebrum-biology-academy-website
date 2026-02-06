import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('unacademy-alternative-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'unacademy alternative gurugram',
    'unacademy vs offline coaching',
    'better than unacademy for neet',
    'unacademy plus alternative',
    'offline coaching vs unacademy',
    'unacademy neet review',
    'unacademy competitor gurugram',
    'classroom coaching vs unacademy',
    'real teacher vs unacademy',
    'switch from unacademy offline',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/unacademy-alternative-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/unacademy-alternative-gurugram',
  },
}

export default function UnacademyAlternativeGurugramPage() {
  return <CityHubPage data={cityData} />
}
