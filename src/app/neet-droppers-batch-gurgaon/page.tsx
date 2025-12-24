import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-droppers-batch-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet droppers batch gurgaon',
    'neet repeater coaching gurugram',
    'neet gap year coaching',
    'dropper batch neet gurgaon',
    'neet 2nd attempt coaching',
    'best neet droppers institute',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-droppers-batch-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-droppers-batch-gurgaon',
  },
}

export default function NEETDroppersBatchGurgaonPage() {
  return <CityHubPage data={cityData} />
}
