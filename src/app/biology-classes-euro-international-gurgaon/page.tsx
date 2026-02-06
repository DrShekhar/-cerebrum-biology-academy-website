import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-euro-international-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes euro international',
    'neet coaching euro school gurgaon',
    'biology tuition euro students',
    'euro international neet prep',
    'biology coaching near euro school',
    'neet preparation euro gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-euro-international-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-euro-international-gurgaon',
  },
}

export default function BiologyClassesEuroInternationalGurgaonPage() {
  return <CityHubPage data={cityData} />
}
