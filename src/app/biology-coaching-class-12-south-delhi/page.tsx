import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('class-12-biology-south-delhi')!

export const metadata: Metadata = {
  title: 'Class 12 Biology Coaching South Delhi | NEET + Board Exam Expert | Cerebrum',
  description:
    'Best Class 12 biology coaching in South Delhi. Expert NEET + Board preparation at Ring Road, South Extension. Crash courses, revision batches, test series. Online/Offline. Call 88264-44334!',
  keywords: [
    'class 12 biology coaching south delhi',
    'class 12 biology tuition south extension',
    'class 12 neet coaching south delhi',
    'class 12 biology classes ring road',
    '12th class biology tuition delhi',
    'cbse class 12 biology coaching south delhi',
    'icse class 12 biology tuition south extension',
    'class 12 biology coaching near me',
    'best class 12 biology teacher south delhi',
    'class 12 biology batch south extension',
    'neet class 12 biology south delhi',
    'class 12 biology coaching defence colony',
    'class 12 biology tuition lajpat nagar',
    'class 12 biology classes greater kailash',
    'class 12 biology coaching fees south delhi',
    'class 12 board exam biology coaching delhi',
    'class 12 biology crash course south delhi',
    'online class 12 biology coaching delhi',
    'hybrid class 12 biology classes south extension',
  ],
  openGraph: {
    title: 'Class 12 Biology Coaching South Delhi | NEET + Board Exam Expert',
    description:
      'Expert Class 12 biology coaching in South Delhi. NEET + Boards. Ring Road, South Extension center. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-class-12-south-delhi',
    images: ['/images/south-delhi-center.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-class-12-south-delhi',
  },
  other: {
    'geo.region': 'IN-DL',
    'geo.placename': 'South Extension Part 2, New Delhi',
    'geo.position': '28.5732,77.2189',
  },
}

export default function Class12BiologySouthDelhiPage() {
  return <CityHubPage data={cityData} />
}
