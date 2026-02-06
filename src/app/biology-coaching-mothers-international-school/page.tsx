import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('hauz-khas')!

export const metadata: Metadata = {
  title: "Biology Coaching for Mother's International School | NEET Prep",
  description:
    "Specialized biology coaching for The Mother's International School students. Sri Aurobindo Marg location. NEET-UG & board excellence. Call 88264-44334.",
  keywords: [
    "biology coaching for mother's international school students",
    'mothers international school biology tuition',
    "neet coaching mother's international delhi",
    'biology tutor mothers international school',
    "mother's international school neet preparation",
    "class 11 biology mother's international",
    "class 12 biology coaching mother's international school",
    "best coaching for mother's international students",
    "biology classes near mother's international school",
  ],
  openGraph: {
    title: "Biology Coaching for Mother's International School | NEET Prep",
    description:
      "Specialized biology coaching for The Mother's International School students. Sri Aurobindo Marg location. NEET-UG & board excellence.",
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-mothers-international-school',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-mothers-international-school',
  },
}

export default function BiologyCoachingMothersInternationalSchoolPage() {
  return <CityHubPage data={cityData} />
}
