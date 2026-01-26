import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('how-to-prepare-for-neet-in-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'how to prepare for neet in gurugram',
    'neet preparation tips gurugram',
    'neet study plan gurugram',
    'neet preparation guide gurgaon',
    'how to crack neet gurugram',
    'neet preparation strategy',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
  },
}

export default function HowToPrepareForNEETInGurugramPage() {
  return <CityHubPage data={cityData} />
}
