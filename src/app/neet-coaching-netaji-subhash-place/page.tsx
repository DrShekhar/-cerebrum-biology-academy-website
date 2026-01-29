import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('netaji-subhash-place')!

export const metadata: Metadata = {
  title: 'NEET Coaching Netaji Subhash Place | Biology Classes NSP Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching near Netaji Subhash Place (NSP) Delhi. 15-20 min from Rohini center via metro. AIIMS faculty, 98% success rate. WhatsApp 88264-44334!',
  keywords: [
    'NEET coaching NSP',
    'NEET coaching Netaji Subhash Place',
    'biology tuition netaji subhash place',
    'NEET classes near NSP metro',
    'biology coaching NSP Delhi',
    'NEET preparation Netaji Subhash Place',
    'best biology coaching NSP',
    'medical entrance coaching NSP',
    'biology teacher near NSP metro',
    'NEET coaching near NSP metro station',
  ],
  openGraph: {
    title: 'NEET Coaching Netaji Subhash Place | Biology Classes NSP Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching near Netaji Subhash Place (NSP) Delhi. 15-20 min from Rohini center via metro. AIIMS faculty, 98% success rate. WhatsApp 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-netaji-subhash-place',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-netaji-subhash-place',
  },
}

export default function NetajiSubhashPlacePage() {
  return <CityHubPage data={cityData} />
}
