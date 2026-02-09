import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Malviya Nagar | Near Saket | Cerebrum Academy',
  description:
    'Best NEET Biology coaching for Malviya Nagar students. High student population area near Saket. AIIMS faculty, small batches, 98% success rate. Affordable fees with EMI options.',
  keywords: [
    'NEET coaching Malviya Nagar',
    'Biology tuition Malviya Nagar',
    'NEET Biology classes Malviya Nagar',
    'Biology coaching near Saket',
    'NEET preparation Malviya Nagar Delhi',
    'Best Biology teacher Malviya Nagar',
    'NEET coaching Hauz Khas',
    'Biology tutor Malviya Nagar',
    'NEET coaching near IIT Delhi',
    'Biology classes South Delhi',
    'NEET Biology coaching fees Delhi',
    'Affordable NEET coaching Delhi',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/malviya-nagar',
  },
  openGraph: {
    title: 'NEET Biology Coaching Malviya Nagar | Cerebrum Academy',
    description:
      'Best NEET Biology coaching for Malviya Nagar students. Near Saket Metro, affordable fees.',
    type: 'website',
  },
}

export default function MalviyaNagarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Malviya Nagar Students',
            description:
              'Expert NEET Biology coaching serving Malviya Nagar and nearby areas. Affordable fees, AIIMS faculty, 98% success rate.',
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
              'Malviya Nagar',
              'Saket',
              'Hauz Khas',
              'Sarvapriya Vihar',
              'SDA',
              'Khirki Extension',
              'Sheikh Sarai',
              'Panchsheel Park',
            ],
            serviceType: 'NEET Biology Coaching',
            priceRange: '₹45,000 - ₹1,80,000',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '420',
              bestRating: '5',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
