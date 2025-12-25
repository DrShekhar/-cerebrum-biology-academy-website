import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon-sector-73')!

export const metadata: Metadata = {
  title: 'Biology Classes in Sector 73 Gurgaon | NEET Coaching Near You | Cerebrum Academy',
  description: 'Best biology classes for Sector 73 Gurgaon students. Center in Sector 51 (20 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
  keywords: ['biology classes Sector 73 Gurgaon', 'NEET coaching Sector 73', 'best biology coaching Gurgaon', 'AIIMS faculty', 'Dr. Shekhar Singh', 'Sohna Road coaching'],
  openGraph: {
    title: 'Biology Classes in Sector 73 Gurgaon | NEET Coaching Near You | Cerebrum Academy',
    description: 'Best biology classes for Sector 73 Gurgaon students. Center in Sector 51 (20 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-73',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-73',
  },
}

export default function Sector73GurgaonPage() {
  return <CityHubPage data={cityData} />
}
