import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('udyog-vihar-gurgaon')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Udyog Vihar Gurgaon | Best Biology Classes | Cerebrum Academy',
  description:
    'Top NEET coaching for Udyog Vihar Gurgaon students. Center in Sector 51 (15 min). AIIMS faculty Dr. Shekhar Singh, 98% success. Call 88264-44334!',
  keywords: [
    'NEET coaching Udyog Vihar Gurgaon',
    'biology classes Udyog Vihar',
    'best NEET coaching Gurgaon',
    'AIIMS faculty',
    'Dr. Shekhar Singh',
    'NEET biology Udyog Vihar',
  ],
  openGraph: {
    title: 'NEET Coaching in Udyog Vihar Gurgaon | Best Biology Classes | Cerebrum Academy',
    description:
      'Top NEET coaching for Udyog Vihar Gurgaon students. Center in Sector 51 (15 min). AIIMS faculty Dr. Shekhar Singh, 98% success. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-udyog-vihar-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-udyog-vihar-gurgaon',
  },
}

export default function UdyogViharGurgaonPage() {
  return <CityHubPage data={cityData} />
}
