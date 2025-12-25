import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon-sector-55')!

export const metadata: Metadata = {
  title: 'Biology Classes in Sector 55 Gurgaon | NEET Coaching Near You | Cerebrum Academy',
  description: 'Best biology classes for Sector 55 Gurgaon students. Center in Sector 51 (4 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
  keywords: ['biology classes Sector 55 Gurgaon', 'NEET coaching Sector 55', 'best biology coaching Gurgaon', 'AIIMS faculty', 'Dr. Shekhar Singh', 'Rapid Metro Gurgaon coaching'],
  openGraph: {
    title: 'Biology Classes in Sector 55 Gurgaon | NEET Coaching Near You | Cerebrum Academy',
    description: 'Best biology classes for Sector 55 Gurgaon students. Center in Sector 51 (4 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-55',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-55',
  },
}

export default function Sector55GurgaonPage() {
  return <CityHubPage data={cityData} />
}
