import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-reviews-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching reviews gurugram',
    'neet coaching feedback gurgaon',
    'neet coaching testimonials gurugram',
    'student reviews neet coaching',
    'neet coaching ratings gurugram',
    'honest neet coaching review',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-reviews-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-reviews-gurugram',
  },
}

export default function NEETCoachingReviewsGurugramPage() {
  return <CityHubPage data={cityData} />
}
