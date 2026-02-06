import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { notFound } from 'next/navigation'

export default function BiologyTutorWestDelhiPage() {
  const cityData = getCityData('west-delhi')

  if (!cityData) {
    notFound()
  }

  return <CityHubPage data={cityData} />
}
