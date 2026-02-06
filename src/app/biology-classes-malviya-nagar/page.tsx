import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('malviya-nagar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in malviya nagar',
    'biology coaching malviya nagar delhi',
    'neet biology classes malviya nagar',
    'best biology tuition malviya nagar',
    'affordable biology coaching south delhi',
    'biology classes shivalik',
    'class 11 biology tuition malviya nagar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-malviya-nagar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-malviya-nagar',
  },
}

export default function BiologyClassesMalviyaNagarPage() {
  return <CityHubPage data={cityData} />
}
