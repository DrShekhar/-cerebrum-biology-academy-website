import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('6-month-neet-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    '6 month neet coaching gurugram',
    'six month neet course gurgaon',
    'neet crash course gurugram',
    'short term neet coaching gurgaon',
    'neet revision course gurugram',
    'fast track neet preparation',
    'neet 6 month batch gurugram',
    'intensive neet revision course',
    'late joiner neet course gurugram',
    'neet dropper short course',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/6-month-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/6-month-neet-coaching-gurugram',
  },
}

export default function SixMonthNEETCoachingGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: '6 Month NEET Biology Course - Gurugram',
    description: '6-month intensive NEET Biology coaching for late starters and droppers needing focused preparation',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'M2K Corporate Park',
        addressLocality: 'Sector 51, Gurugram',
        addressRegion: 'Haryana',
        postalCode: '122018',
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 12 / Dropper',
    timeRequired: 'P6M',
    teaches: ['NEET Biology Complete Syllabus', 'NCERT Mastery', 'Mock Tests', 'Doubt Clearing'],
    offers: {
      '@type': 'Offer',
      price: '45000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Offline',
      duration: 'P6M',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <CityHubPage data={cityData} />
    </>
  )
}
