import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('kalkaji')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Kalkaji | Biology Classes Near Nehru Place Delhi',
  description:
    'Top NEET coaching in Kalkaji, South Delhi. Expert biology classes near Nehru Place & Lotus Temple. Comprehensive NEET-UG preparation. Call 88264-44334 today.',
  keywords: [
    'neet coaching in kalkaji',
    'neet biology classes kalkaji delhi',
    'neet coaching near nehru place',
    'neet preparation kalkaji',
    'neet classes govind puri',
    'medical entrance coaching kalkaji',
    'neet biology tutor kalkaji',
    'neet coaching near lotus temple',
  ],
  openGraph: {
    title: 'NEET Coaching in Kalkaji | Biology Classes Near Nehru Place Delhi',
    description:
      'Top NEET coaching in Kalkaji, South Delhi. Expert biology classes near Nehru Place & Lotus Temple. Comprehensive NEET-UG preparation.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kalkaji',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kalkaji',
  },
}

export default function NEETCoachingKalkajiPage() {
  return <CityHubPage data={cityData} />
}
