import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('punjabi-bagh')!

export const metadata: Metadata = {
  title: 'NEET Coaching Punjabi Bagh | Biology Classes West Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching in Punjabi Bagh. Near Rohini DC Chauk center, Ring Road connectivity. AIIMS faculty, 98% success rate. WhatsApp 88264-44334 for demo!',
  keywords: [
    'NEET coaching Punjabi Bagh',
    'biology classes Punjabi Bagh',
    'biology tuition West Delhi',
    'NEET preparation Punjabi Bagh',
    'AIIMS faculty',
    'Dr Shekhar C Singh',
    'NEET biology coaching',
    'medical entrance classes',
    'Rohini center',
    'Class 11 biology',
    'Class 12 biology',
  ],
  openGraph: {
    title: 'NEET Coaching Punjabi Bagh | Biology Classes West Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching in Punjabi Bagh. Near Rohini DC Chauk center, Ring Road connectivity. AIIMS faculty, 98% success rate. WhatsApp 88264-44334 for demo!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-punjabi-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-punjabi-bagh',
  },
}

export default function NEETCoachingPunjabiBaghPage() {
  return <CityHubPage data={cityData} />
}
