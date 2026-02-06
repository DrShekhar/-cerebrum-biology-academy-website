import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('gurgaon-sector-60')!

export const metadata: Metadata = {
  title: 'Biology Classes in Sector 60 Gurgaon | NEET Coaching Near You | Cerebrum Academy',
  description:
    'Best biology classes for Sector 60 Gurgaon students. Center in Sector 51 (12 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
  keywords: [
    'biology classes Sector 60 Gurgaon',
    'NEET coaching Sector 60',
    'best biology coaching Gurgaon',
    'AIIMS faculty',
    'Dr. Shekhar Singh',
    'Golf Course Extension coaching',
  ],
  openGraph: {
    title: 'Biology Classes in Sector 60 Gurgaon | NEET Coaching Near You | Cerebrum Academy',
    description:
      'Best biology classes for Sector 60 Gurgaon students. Center in Sector 51 (12 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-60',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-60',
  },
}

export default function Sector60GurgaonPage() {
  return <CityHubPage data={cityData} />
}
