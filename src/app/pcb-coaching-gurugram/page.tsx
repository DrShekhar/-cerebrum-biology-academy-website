import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('pcb-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'pcb coaching gurugram',
    'physics chemistry biology coaching',
    'science coaching gurugram',
    'pcb tuition gurgaon',
    'complete neet coaching gurugram',
    'all subjects neet coaching',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/pcb-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/pcb-coaching-gurugram',
  },
}

export default function PCBCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
