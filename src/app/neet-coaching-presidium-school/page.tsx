import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-presidium-school')!

export const metadata: Metadata = {
  title: 'NEET Coaching for Presidium School Students | Cerebrum Biology Academy',
  description:
    'NEET biology coaching for Presidium School students. Centers across Delhi NCR, after-school batches. Expert faculty. Call 88264-44334.',
  keywords: [
    'neet coaching presidium school',
    'biology classes presidium students',
    'presidium school neet preparation',
    'biology tuition delhi ncr',
    'neet coaching gurgaon',
    'presidium school biology coaching',
  ],
  openGraph: {
    title: 'NEET Coaching for Presidium School Students | Cerebrum Biology Academy',
    description:
      'NEET biology coaching for Presidium School students. Centers across Delhi NCR, after-school batches. Expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-presidium-school',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-presidium-school',
  },
}

export default function PresidiumSchoolPage() {
  return <CityHubPage data={cityData} />
}
