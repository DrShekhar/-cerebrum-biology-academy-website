import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-classes-scottish-high-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes scottish high gurgaon',
    'neet coaching scottish high sushant lok',
    'ib biology neet preparation scottish high',
    'biology tuition scottish high international',
    'best neet institute near scottish high',
    'biology classes scottish high gurugram',
    'ib to neet biology scottish high',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-scottish-high-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-scottish-high-gurgaon',
  },
}

export default function BiologyClassesScottishHighGurgaonPage() {
  return <CityHubPage data={cityData} />
}
