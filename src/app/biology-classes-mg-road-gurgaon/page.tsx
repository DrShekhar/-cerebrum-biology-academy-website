import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('mg-road-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes mg road gurgaon',
    'neet coaching mg road gurugram',
    'biology tuition near iffco chowk',
    'best biology teacher mg road gurgaon',
    'class 11 biology coaching signature tower gurgaon',
    'class 12 biology tuition huda city centre',
    'neet biology classes sikanderpur gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-mg-road-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-mg-road-gurgaon',
  },
}

export default function BiologyClassesMGRoadGurgaonPage() {
  return <CityHubPage data={cityData} />
}
