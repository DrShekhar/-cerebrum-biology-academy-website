import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('2-year-neet-course-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    '2 year neet course gurugram',
    'two year neet program gurgaon',
    'neet 2 year coaching gurugram',
    '24 month neet course gurgaon',
    'class 11 12 neet program gurugram',
    'integrated neet course gurugram',
    'long term neet coaching gurgaon',
    'neet 2027 2 year batch',
    'foundation neet course gurugram',
    'neet preparation from class 11',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/2-year-neet-course-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/2-year-neet-course-gurugram',
  },
}

export default function TwoYearNEETCourseGurugramPage() {
  return <CityHubPage data={cityData} />
}
