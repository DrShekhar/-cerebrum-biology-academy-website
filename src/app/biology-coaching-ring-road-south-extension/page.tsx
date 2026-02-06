import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('ring-road-south-extension')!

export const metadata: Metadata = {
  title: 'Biology Coaching Ring Road South Extension 2 | Class 9-12, NEET, Olympiad | Cerebrum',
  description:
    'Best biology coaching at Ring Road, South Extension 2, Delhi. Classes for Class 9, 10, 11, 12, NEET droppers, Board exams & Biology Olympiad. 5 min from South Extension Metro. Online/Offline/Hybrid. Call 88264-44334!',
  keywords: [
    'biology coaching ring road south extension',
    'biology classes south extension 2',
    'neet coaching ring road delhi',
    'class 9 biology tuition south extension',
    'class 10 biology coaching south delhi',
    'class 11 biology classes ring road',
    'class 12 biology tuition south extension 2',
    'neet dropper coaching south delhi',
    'biology olympiad coaching delhi',
    'nseb coaching south extension',
    'board exam biology tuition south delhi',
    'cbse biology coaching ring road',
    'icse biology tuition south extension',
    'online biology classes south delhi',
    'hybrid biology coaching ring road',
    'biology coaching near south extension metro',
    'biology teacher south extension delhi',
    'best biology coaching south delhi',
  ],
  openGraph: {
    title: 'Biology Coaching Ring Road South Extension 2 | Class 9-12, NEET, Olympiad',
    description:
      'Best biology coaching at Ring Road, South Extension 2, Delhi. Class 9-12, NEET, Board exams & Olympiad. 5 min from South Extension Metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-ring-road-south-extension',
    images: ['/images/south-delhi-center.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-ring-road-south-extension',
  },
  other: {
    'geo.region': 'IN-DL',
    'geo.placename': 'South Extension Part 2, New Delhi',
    'geo.position': '28.5732,77.2189',
  },
}

export default function BiologyCoachingRingRoadSouthExtensionPage() {
  return <CityHubPage data={cityData} />
}
