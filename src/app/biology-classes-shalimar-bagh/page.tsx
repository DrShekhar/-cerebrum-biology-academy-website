import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('shalimar-bagh')!

export const metadata: Metadata = {
  title: 'Biology Classes Shalimar Bagh | NEET Coaching Delhi | Cerebrum Academy',
  description:
    'Best biology classes in Shalimar Bagh. Metro to DC Chauk Rohini center. AIIMS faculty, 98% NEET success. 15+ years experience. Call 88264-44334!',
  keywords: [
    'biology classes Shalimar Bagh',
    'NEET coaching Shalimar Bagh',
    'best biology tuition Delhi',
    'DC Chauk biology coaching',
    'NEET preparation Shalimar Bagh',
    'Dr Shekhar Singh',
    'AIIMS trained faculty',
    'biology coaching Delhi',
    'medical entrance coaching',
    'NEET biology classes',
  ],
  openGraph: {
    title: 'Biology Classes Shalimar Bagh | NEET Coaching Delhi | Cerebrum Academy',
    description:
      'Best biology classes in Shalimar Bagh. Metro to DC Chauk Rohini center. AIIMS faculty, 98% NEET success. 15+ years experience. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-shalimar-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-shalimar-bagh',
  },
}

export default function ShalimarBaghPage() {
  return <CityHubPage data={cityData} />
}
