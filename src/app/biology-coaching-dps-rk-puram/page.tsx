import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rk-puram')!

export const metadata: Metadata = {
  title: 'Biology Coaching for DPS RK Puram Students | NEET & Board Prep',
  description:
    'Specialized biology coaching for DPS RK Puram students. Expert faculty aligned with DPS curriculum. NEET-UG & Class 11-12 board preparation. Call 88264-44334 for demo.',
  keywords: [
    'biology coaching for dps rk puram students',
    'dps rkp biology tuition',
    'neet coaching dps rk puram',
    'biology tutor for dps students',
    'dps rk puram neet preparation',
    'class 11 biology dps rkp',
    'class 12 biology coaching dps rk puram',
    'best coaching for dps rk puram students',
    'biology classes near dps rk puram',
  ],
  openGraph: {
    title: 'Biology Coaching for DPS RK Puram Students | NEET & Board Prep',
    description:
      'Specialized biology coaching for DPS RK Puram students. Expert faculty aligned with DPS curriculum. NEET-UG & Class 11-12 board preparation.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-dps-rk-puram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-dps-rk-puram',
  },
}

export default function BiologyCoachingDPSRKPuramPage() {
  return <CityHubPage data={cityData} />
}
