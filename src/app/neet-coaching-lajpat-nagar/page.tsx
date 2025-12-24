import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('lajpat-nagar')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Lajpat Nagar | Best Biology Classes Central Delhi',
  description:
    'Expert NEET coaching in Lajpat Nagar, Delhi. Comprehensive biology preparation for medical entrance. Metro-connected location. Call 88264-44334 for free counseling.',
  keywords: [
    'neet coaching in lajpat nagar',
    'neet biology classes lajpat nagar',
    'best neet coaching central delhi',
    'neet preparation lajpat nagar',
    'neet classes defence colony',
    'medical entrance coaching lajpat nagar',
    'neet biology tutor jangpura',
    'neet coaching near lajpat nagar metro',
  ],
  openGraph: {
    title: 'NEET Coaching in Lajpat Nagar | Best Biology Classes Central Delhi',
    description:
      'Expert NEET coaching in Lajpat Nagar, Delhi. Comprehensive biology preparation for medical entrance. Metro-connected location.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-lajpat-nagar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-lajpat-nagar',
  },
}

export default function NEETCoachingLajpatNagarPage() {
  return <CityHubPage data={cityData} />
}
