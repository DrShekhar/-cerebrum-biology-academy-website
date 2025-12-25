import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-tuition-ryan-international')!

export const metadata: Metadata = {
  title: 'Biology Tuition for Ryan International Students | NEET Coaching',
  description:
    'NEET biology coaching for Ryan International students across Delhi NCR. Multiple centers, flexible batches. 15+ years experience. Call 88264-44334.',
  keywords: [
    'biology tuition ryan international',
    'neet coaching ryan international students',
    'ryan international neet preparation',
    'biology classes delhi ncr',
    'neet coaching rohini',
    'ryan international biology coaching',
  ],
  openGraph: {
    title: 'Biology Tuition for Ryan International Students | NEET Coaching',
    description:
      'NEET biology coaching for Ryan International students across Delhi NCR. Multiple centers, flexible batches. 15+ years experience.',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-ryan-international',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-ryan-international',
  },
}

export default function RyanInternationalPage() {
  return <CityHubPage data={cityData} />
}
