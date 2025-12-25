import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-classes-amity-gurgaon')!

export const metadata: Metadata = {
  title: 'Biology Classes for Amity Gurgaon Students | NEET Coaching',
  description:
    'NEET biology coaching for Amity International Gurgaon students. Sector 51 center nearby. Flexible timings, expert faculty. Call 88264-44334.',
  keywords: [
    'biology classes amity gurgaon',
    'neet coaching amity international gurgaon',
    'amity gurgaon neet preparation',
    'biology tuition sector 51 gurgaon',
    'neet coaching gurgaon',
    'amity school biology coaching',
  ],
  openGraph: {
    title: 'Biology Classes for Amity Gurgaon Students | NEET Coaching',
    description:
      'NEET biology coaching for Amity International Gurgaon students. Sector 51 center nearby. Flexible timings, expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-amity-gurgaon',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-amity-gurgaon',
  },
}

export default function AmityGurgaonPage() {
  return <CityHubPage data={cityData} />
}
