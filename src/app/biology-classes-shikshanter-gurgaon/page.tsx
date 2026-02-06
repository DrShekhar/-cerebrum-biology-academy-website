import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-shikshanter-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes shikshanter gurgaon',
    'neet coaching shikshanter sector 40',
    'biology tuition shikshanter school',
    'shikshanter students neet prep',
    'biology coaching near shikshanter',
    'neet preparation shikshanter students',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-shikshanter-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-shikshanter-gurgaon',
  },
}

export default function BiologyClassesShikshanterGurgaonPage() {
  return <CityHubPage data={cityData} />
}
