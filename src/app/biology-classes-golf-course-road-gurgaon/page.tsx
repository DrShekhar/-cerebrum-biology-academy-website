import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('golf-course-road-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes golf course road gurgaon',
    'neet coaching golf course road gurugram',
    'biology tuition dlf magnolias',
    'best biology teacher golf course road',
    'class 11 biology coaching central park gurgaon',
    'class 12 biology tuition belaire gurgaon',
    'neet biology classes aralias gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-golf-course-road-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-golf-course-road-gurgaon',
  },
}

export default function BiologyClassesGolfCourseRoadGurgaonPage() {
  return <CityHubPage data={cityData} />
}
