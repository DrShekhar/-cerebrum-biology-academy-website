import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('vasant-vihar')!

export const metadata: Metadata = {
  title: 'Biology Coaching for DPS Vasant Kunj Students | NEET & Boards',
  description:
    'Specialized biology coaching for DPS Vasant Kunj students. DPS curriculum aligned with NEET-UG preparation. Class 11-12 board excellence. Call 88264-44334.',
  keywords: [
    'biology coaching for dps vasant kunj students',
    'dps vasant kunj biology tuition',
    'neet coaching dps vk students',
    'biology tutor dps vasant kunj',
    'dps vk neet preparation',
    'class 11 biology dps vasant kunj',
    'class 12 biology coaching dps vk',
    'best coaching for dps vasant kunj students',
    'biology classes near dps vasant kunj',
  ],
  openGraph: {
    title: 'Biology Coaching for DPS Vasant Kunj Students | NEET & Boards',
    description:
      'Specialized biology coaching for DPS Vasant Kunj students. DPS curriculum aligned with NEET-UG preparation. Class 11-12 board excellence.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-dps-vasant-kunj',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-dps-vasant-kunj',
  },
}

export default function BiologyCoachingDPSVasantKunjPage() {
  return <CityHubPage data={cityData} />
}
