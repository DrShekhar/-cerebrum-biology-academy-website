import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('alaknanda')!

export const metadata: Metadata = {
  title: 'Biology Classes in Alaknanda | NEET Coaching South Delhi',
  description:
    'Top biology classes in Alaknanda for NEET & board preparation. Near Nehru Place metro. Expert faculty. Call 88264-44334 for free demo class.',
  keywords: [
    'biology classes alaknanda',
    'neet coaching alaknanda delhi',
    'biology tuition alaknanda',
    'best biology teacher alaknanda',
    'neet preparation alaknanda',
    'class 11 biology alaknanda',
    'class 12 biology coaching alaknanda',
    'cbse biology tutor alaknanda',
    'medical coaching alaknanda delhi',
  ],
  openGraph: {
    title: 'Biology Classes in Alaknanda | NEET Coaching South Delhi',
    description:
      'Top biology classes in Alaknanda for NEET & board preparation. Near Nehru Place metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-alaknanda',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-alaknanda',
  },
}

export default function BiologyClassesAlaknandaPage() {
  return <CityHubPage data={cityData} />
}
