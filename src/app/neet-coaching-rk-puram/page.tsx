import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rk-puram')!

export const metadata: Metadata = {
  title: 'NEET Coaching in RK Puram | Biology Classes for DPS RKP Students',
  description:
    'Best NEET coaching in RK Puram, Delhi. Specialized biology preparation for DPS RK Puram students. Sector 7, 8, 12 & 13 covered. Call 88264-44334 for enrollment.',
  keywords: [
    'neet coaching in rk puram',
    'neet biology classes rk puram',
    'neet coaching for dps rkp students',
    'neet preparation rk puram',
    'neet classes rk puram sector 7',
    'medical entrance coaching rk puram',
    'neet biology tutor rk puram',
    'neet coaching munirka',
  ],
  openGraph: {
    title: 'NEET Coaching in RK Puram | Biology Classes for DPS RKP Students',
    description:
      'Best NEET coaching in RK Puram, Delhi. Specialized biology preparation for DPS RK Puram students. Sector 7, 8, 12 & 13 covered.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rk-puram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rk-puram',
  },
}

export default function NEETCoachingRKPuramPage() {
  return <CityHubPage data={cityData} />
}
