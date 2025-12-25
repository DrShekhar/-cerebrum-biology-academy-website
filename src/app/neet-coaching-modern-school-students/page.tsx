import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-modern-school-students')!

export const metadata: Metadata = {
  title: 'NEET Coaching for Modern School Students | Cerebrum Biology Academy',
  description:
    'NEET biology coaching for Modern School students across Delhi. Multiple centers, after-school batches. 15+ years experience. Call 88264-44334.',
  keywords: [
    'neet coaching modern school',
    'biology tuition modern school students',
    'modern school neet preparation',
    'biology classes delhi',
    'neet coaching central delhi',
    'modern school biology coaching',
  ],
  openGraph: {
    title: 'NEET Coaching for Modern School Students | Cerebrum Biology Academy',
    description:
      'NEET biology coaching for Modern School students across Delhi. Multiple centers, after-school batches. 15+ years experience.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-students',
  },
}

export default function ModernSchoolPage() {
  return <CityHubPage data={cityData} />
}
