import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('class-11-biology-south-delhi')!

export const metadata: Metadata = {
  title: 'Class 11 Biology Coaching South Delhi | NEET Foundation + CBSE Boards | Cerebrum',
  description:
    'Best Class 11 biology coaching in South Delhi. Expert faculty for NEET foundation, CBSE/ICSE boards. Offline classes at Ring Road, South Extension 2. Online & hybrid batches. Call 88264-44334!',
  keywords: [
    'class 11 biology coaching south delhi',
    'class 11 biology tuition south extension',
    'class 11 neet coaching south delhi',
    'class 11 biology classes ring road',
    '11th class biology tuition delhi',
    'cbse class 11 biology coaching south delhi',
    'icse class 11 biology tuition south extension',
    'class 11 biology coaching near me',
    'best class 11 biology teacher south delhi',
    'class 11 biology batch south extension',
    'neet foundation class 11 south delhi',
    'class 11 biology coaching defence colony',
    'class 11 biology tuition lajpat nagar',
    'class 11 biology classes greater kailash',
    'class 11 biology coaching fees south delhi',
    'online class 11 biology coaching delhi',
    'hybrid class 11 biology classes south extension',
  ],
  openGraph: {
    title: 'Class 11 Biology Coaching South Delhi | NEET Foundation + CBSE Boards',
    description:
      'Expert Class 11 biology coaching in South Delhi. NEET foundation + CBSE boards. Ring Road, South Extension center. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-class-11-south-delhi',
    images: ['/images/south-delhi-center.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-class-11-south-delhi',
  },
  other: {
    'geo.region': 'IN-DL',
    'geo.placename': 'South Extension Part 2, New Delhi',
    'geo.position': '28.5732,77.2189',
  },
}

export default function Class11BiologySouthDelhiPage() {
  return <CityHubPage data={cityData} />
}
