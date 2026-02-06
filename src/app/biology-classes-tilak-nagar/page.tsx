import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('tilak-nagar')!

export const metadata: Metadata = {
  title: 'Biology Classes in Tilak Nagar | Best NEET Coaching West Delhi | Cerebrum Academy',
  description:
    'Best biology classes in Tilak Nagar for NEET preparation. Dr. Shekhar C Singh with 15+ years experience. 97% success rate. Book free demo class!',
  keywords: [
    'biology classes Tilak Nagar',
    'NEET coaching Tilak Nagar',
    'NEET preparation West Delhi',
    'Dr Shekhar C Singh',
    'AIIMS faculty',
    'biology tuition Tilak Nagar',
    'NEET biology coaching',
    'medical entrance classes',
    'Janakpuri NEET',
    'West Delhi coaching',
    'Rohini center',
  ],
  openGraph: {
    title: 'Biology Classes in Tilak Nagar | Best NEET Coaching West Delhi | Cerebrum Academy',
    description:
      'Best biology classes in Tilak Nagar for NEET preparation. Dr. Shekhar C Singh with 15+ years experience. 97% success rate. Book free demo class!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-tilak-nagar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-tilak-nagar',
  },
}

export default function TilakNagarPage() {
  return <CityHubPage data={cityData} />
}
