import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('1-year-neet-course-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    '1 year neet course gurugram',
    'one year neet program gurgaon',
    'neet 1 year coaching gurugram',
    '12 month neet course gurgaon',
    'intensive neet course gurugram',
    'neet dropper 1 year course',
    'class 12 neet 1 year program',
    'annual neet coaching gurugram',
    'neet 2026 1 year batch',
    'single year neet preparation',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/1-year-neet-course-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/1-year-neet-course-gurugram',
  },
}

export default function OneYearNEETCourseGurugramPage() {
  return <CityHubPage data={cityData} />
}
