import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('new-gurgaon')!

export const metadata: Metadata = {
  title: 'Biology Classes in New Gurgaon | NEET Coaching Near You | Cerebrum Academy',
  description:
    'Best biology classes for New Gurgaon students. Center in Sector 51 (25 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
  keywords: [
    'biology classes New Gurgaon',
    'NEET coaching New Gurgaon',
    'best biology coaching Gurgaon',
    'AIIMS faculty',
    'Dr. Shekhar Singh',
    'Sohna Road coaching',
  ],
  openGraph: {
    title: 'Biology Classes in New Gurgaon | NEET Coaching Near You | Cerebrum Academy',
    description:
      'Best biology classes for New Gurgaon students. Center in Sector 51 (25 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-new-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-new-gurgaon',
  },
}

export default function NewGurgaonPage() {
  return <CityHubPage data={cityData} />
}
