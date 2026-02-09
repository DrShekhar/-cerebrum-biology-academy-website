import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Lajpat Nagar | Walking Distance | Cerebrum Academy',
  description:
    'Best NEET Biology coaching in Lajpat Nagar - walking distance from our flagship center. AIIMS faculty, small batches, 98% success rate. Most convenient location for South Delhi students.',
  keywords: [
    'NEET coaching Lajpat Nagar',
    'Biology tuition Lajpat Nagar',
    'NEET Biology classes Lajpat Nagar',
    'Biology coaching near Lajpat Nagar Metro',
    'NEET preparation Lajpat Nagar Delhi',
    'Best Biology teacher Lajpat Nagar',
    'NEET coaching Defence Colony',
    'Biology tutor Lajpat Nagar',
    'NEET coaching near Central Market',
    'Biology classes South Extension',
    'NEET Biology coaching fees Delhi',
    'Best NEET coaching near me',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/lajpat-nagar',
  },
  openGraph: {
    title: 'NEET Biology Coaching Lajpat Nagar | Cerebrum Academy',
    description:
      'Best NEET Biology coaching in Lajpat Nagar. Walking distance from metro, affordable fees.',
    type: 'website',
  },
}

export default function LajpatNagarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Lajpat Nagar Students',
            description:
              'Expert NEET Biology coaching in Lajpat Nagar area. Walking distance from metro, AIIMS faculty, 98% success rate.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
              founder: {
                '@type': 'Person',
                name: 'Dr. Shekhar C Singh',
                honorificPrefix: 'Dr.',
                jobTitle: 'Founder & Head Faculty',
                alumniOf: 'AIIMS Delhi',
              },
            },
            areaServed: [
              'Lajpat Nagar',
              'Defence Colony',
              'South Extension',
              'Jangpura',
              'Andrews Ganj',
              'Amar Colony',
              'Moolchand',
              'Bhogal',
            ],
            serviceType: 'NEET Biology Coaching',
            priceRange: '₹45,000 - ₹1,80,000',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '450',
              bestRating: '5',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Cerebrum Biology Academy - Lajpat Nagar',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/lajpat-nagar',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Lajpat Nagar',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5685,
              'longitude': 77.2373,
            },
            'openingHoursSpecification': [
              {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                'opens': '08:00',
                'closes': '20:00',
              },
            ],
            'priceRange': '₹45,000 - ₹1,80,000',
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '485',
              'bestRating': '5',
            },
            'sameAs': [
              'https://www.youtube.com/@CerebrumBiologyAcademy',
              'https://www.instagram.com/cerebrumbiologyacademy/',
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
