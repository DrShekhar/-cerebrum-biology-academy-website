import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-golf-course-road-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching golf course road gurgaon',
    'neet classes dlf magnolias aralias',
    'neet coaching palm springs gurgaon',
    'best neet institute golf course road',
    'neet preparation camellias gurgaon',
    'neet biology coaching gcr gurugram',
    'neet classes near ireo skyon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-golf-course-road-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-golf-course-road-gurgaon',
  },
}

export default function NEETCoachingGolfCourseRoadGurgaonPage() {
  return <CityHubPage data={cityData} />
}
