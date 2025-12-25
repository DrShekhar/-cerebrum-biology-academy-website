import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('cyber-city-gurgaon')!

export const metadata: Metadata = {
  title: 'Biology Classes in Cyber City Gurgaon | NEET Coaching Near You | Cerebrum Academy',
  description: 'Best biology classes for Cyber City Gurgaon students. Center in Sector 51 (8 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
  keywords: ['biology classes Cyber City Gurgaon', 'NEET coaching Cyber City', 'best biology coaching Gurgaon', 'AIIMS faculty', 'Dr. Shekhar Singh', 'DLF Cyber City coaching'],
  openGraph: {
    title: 'Biology Classes in Cyber City Gurgaon | NEET Coaching Near You | Cerebrum Academy',
    description: 'Best biology classes for Cyber City Gurgaon students. Center in Sector 51 (8 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-cyber-city-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-cyber-city-gurgaon',
  },
}

export default function CyberCityGurgaonPage() {
  return <CityHubPage data={cityData} />
}
