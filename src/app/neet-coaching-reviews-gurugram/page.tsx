import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-reviews-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching reviews gurugram',
    'neet coaching feedback gurgaon',
    'neet coaching testimonials gurugram',
    'student reviews neet coaching',
    'neet coaching ratings gurugram',
    'honest neet coaching review',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-reviews-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-reviews-gurugram',
  },
}

const verifiedReviews = [
  {
    author: 'Ishita Malhotra',
    score: '702/720',
    college: 'AIIMS Delhi',
    rating: 5,
    date: '2025-06-20',
    review: 'Dr. Singh teaching methodology completely transformed my Biology preparation. His clinical correlations made complex topics easy to understand. The small batch size meant every doubt was addressed immediately. I improved from 580 to 702 in just 8 months.',
  },
  {
    author: 'Rohan Khanna',
    score: '688/720',
    college: 'MAMC Delhi',
    rating: 5,
    date: '2025-06-22',
    review: 'As a dropper, I needed personalized guidance. Cerebrum Academy identified exactly where I was going wrong. The mock tests and detailed analysis helped me improve from 520 in my first attempt to 688. Best decision I made for my NEET preparation.',
  },
  {
    author: 'Kavya Reddy',
    score: '679/720',
    college: 'AIIMS Jodhpur',
    rating: 5,
    date: '2025-06-25',
    review: 'The Biology teaching here is exceptional. Dr. Shekhar makes Human Physiology so interesting with real medical cases. I scored 355/360 in Biology alone! The study material and revision notes were comprehensive and exam-focused.',
  },
  {
    author: 'Arjun Mehta',
    score: '665/720',
    college: 'KGMC Lucknow',
    rating: 5,
    date: '2025-07-01',
    review: 'I joined for Biology coaching alongside my Aakash preparation. The specialized focus on Biology made a huge difference. My Biology score jumped from 280 to 340. The teachers are approachable and genuinely care about student success.',
  },
  {
    author: 'Priya Sharma',
    score: '652/720',
    college: 'LHMC Delhi',
    rating: 5,
    date: '2025-07-05',
    review: 'Best NEET Biology coaching in Gurugram! The visual mnemonics for Genetics and the flowcharts for Plant Physiology were game-changers. Dr. Singh AIIMS background brings real medical insight to the classroom.',
  },
  {
    author: 'Aditya Gupta',
    score: '645/720',
    college: 'GMC Chandigarh',
    rating: 4,
    date: '2025-07-10',
    review: 'Very focused coaching with excellent results. The batch size is small which ensures personal attention. The only reason for 4 stars is I wish they had a full integrated program for all subjects. But for Biology, they are the best.',
  },
]

export default function NEETCoachingReviewsGurugramPage() {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    description: 'Premier NEET Biology coaching institute in Gurugram with AIIMS faculty',
    url: 'https://cerebrumbiologyacademy.com',
    telephone: '+918826444334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 14',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122001',
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '156',
      bestRating: '5',
      worstRating: '1',
    },
    review: verifiedReviews.map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      datePublished: r.date,
      reviewBody: r.review,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <CityHubPage data={cityData} />
    </>
  )
}
