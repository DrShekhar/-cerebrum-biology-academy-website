import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-class-12-ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'Class 12 Biology Ghaziabad tuition',
    'Class 12 Biology Ghaziabad coaching',
    'Class 12 Biology Ghaziabad classes',
    'CBSE Class 12 Biology Ghaziabad',
    'board exam Class 12 Biology Ghaziabad',
    'NCERT Class 12 Biology Ghaziabad',
    'biology tutor Class 12 Biology Ghaziabad',
    'NEET foundation Class 12 Biology Ghaziabad',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-class-12-ghaziabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-class-12-ghaziabad`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
