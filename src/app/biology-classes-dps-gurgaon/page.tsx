import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-dps-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes dps gurgaon',
    'neet coaching dps sector 45',
    'neet coaching dps sector 67c',
    'biology tuition near dps gurgaon',
    'best neet institute for dps students',
    'biology classes near dps gurugram',
    'class 11 12 biology dps gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-dps-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-dps-gurgaon',
  },
}

export default function BiologyClassesDPSGurgaonPage() {
  return <CityHubPage data={cityData} />
}
