import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('hauz-khas')!

export const metadata: Metadata = {
  title: 'Biology Coaching for Sardar Patel Vidyalaya Students | NEET Delhi',
  description:
    'Expert biology coaching for Sardar Patel Vidyalaya (SPV) students. Lodi Estate location. CBSE & NEET-UG preparation excellence. Call 88264-44334 for enrollment.',
  keywords: [
    'biology coaching for sardar patel vidyalaya students',
    'spv biology tuition delhi',
    'neet coaching sardar patel vidyalaya',
    'biology tutor spv lodi estate',
    'sardar patel vidyalaya neet preparation',
    'class 11 biology spv delhi',
    'class 12 biology coaching sardar patel vidyalaya',
    'best coaching for spv students',
    'biology classes near sardar patel vidyalaya',
  ],
  openGraph: {
    title: 'Biology Coaching for Sardar Patel Vidyalaya Students | NEET Delhi',
    description:
      'Expert biology coaching for Sardar Patel Vidyalaya (SPV) students. Lodi Estate location. CBSE & NEET-UG preparation excellence.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-sardar-patel-vidyalaya',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-sardar-patel-vidyalaya',
  },
}

export default function BiologyCoachingSardarPatelVidyalayaPage() {
  return <CityHubPage data={cityData} />
}
