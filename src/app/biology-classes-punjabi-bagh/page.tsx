import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('punjabi-bagh')!

export const metadata: Metadata = {
  title: 'Biology Classes in Punjabi Bagh | NEET Coaching West Delhi | Cerebrum Academy',
  description:
    'Best biology classes in Punjabi Bagh for NEET & Boards. Dr. Shekhar C Singh with 15+ years experience. 97% success rate. Near Rohini center. Book demo!',
  keywords: [
    'biology classes Punjabi Bagh',
    'NEET coaching Punjabi Bagh',
    'NEET preparation West Delhi',
    'Dr Shekhar C Singh',
    'AIIMS faculty',
    'biology tuition Punjabi Bagh',
    'NEET biology coaching',
    'medical entrance classes',
    'Rohini center',
    'Class 11 biology',
    'Class 12 biology',
  ],
  openGraph: {
    title: 'Biology Classes in Punjabi Bagh | NEET Coaching West Delhi | Cerebrum Academy',
    description:
      'Best biology classes in Punjabi Bagh for NEET & Boards. Dr. Shekhar C Singh with 15+ years experience. 97% success rate. Near Rohini center. Book demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-punjabi-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-punjabi-bagh',
  },
}

export default function PunjabiBaghPage() {
  return <CityHubPage data={cityData} />
}
