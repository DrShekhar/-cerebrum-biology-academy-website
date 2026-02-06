import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('safdarjung-enclave')!

export const metadata: Metadata = {
  title: 'Biology Classes in Safdarjung Enclave | NEET Coaching Delhi',
  description:
    'Quality biology classes in Safdarjung Enclave for NEET-UG & boards. Near AIIMS metro. Experienced faculty. Call 88264-44334 for enrollment.',
  keywords: [
    'biology classes safdarjung enclave',
    'neet coaching safdarjung enclave delhi',
    'biology tuition safdarjung enclave',
    'best biology teacher safdarjung enclave',
    'neet preparation safdarjung enclave',
    'class 11 biology safdarjung enclave',
    'class 12 biology coaching safdarjung enclave',
    'cbse biology tutor safdarjung enclave',
    'medical coaching safdarjung enclave',
  ],
  openGraph: {
    title: 'Biology Classes in Safdarjung Enclave | NEET Coaching Delhi',
    description:
      'Quality biology classes in Safdarjung Enclave for NEET-UG & boards. Near AIIMS metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-safdarjung-enclave',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-safdarjung-enclave',
  },
}

export default function BiologyClassesSafdarjungEnclavePage() {
  return <CityHubPage data={cityData} />
}
