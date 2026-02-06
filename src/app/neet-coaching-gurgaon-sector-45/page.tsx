import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('gurgaon-sector-45')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Sector 45 Gurgaon | DPS Area Biology Classes | Cerebrum Academy',
  description:
    'Best NEET coaching near Sector 45 Gurgaon & DPS. Center in Sector 51 (10 min). AIIMS faculty with 15+ years exp. 98% success. Call 88264-44334!',
  keywords: [
    'NEET coaching Sector 45 Gurgaon',
    'DPS Gurgaon NEET',
    'biology classes Sector 45',
    'best NEET coaching Gurgaon',
    'AIIMS faculty',
    'Dr. Shekhar Singh',
    'NEET biology DPS area',
  ],
  openGraph: {
    title: 'NEET Coaching in Sector 45 Gurgaon | DPS Area Biology Classes | Cerebrum Academy',
    description:
      'Best NEET coaching near Sector 45 Gurgaon & DPS. Center in Sector 51 (10 min). AIIMS faculty with 15+ years exp. 98% success. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-45',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-45',
  },
}

export default function Sector45GurgaonPage() {
  return <CityHubPage data={cityData} />
}
