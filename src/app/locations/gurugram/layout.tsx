import { Metadata } from 'next'
import { GurugramServiceSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Gurugram | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in Gurugram by AIIMS faculty. Small batches of 15 students, 90% success rate. Located near HUDA City Centre. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Gurugram',
    'NEET coaching Gurgaon',
    'Biology coaching Gurugram',
    'NEET Biology classes Gurugram',
    'Best NEET coaching Gurugram',
    'NEET preparation Gurugram',
    'Medical coaching Gurugram',
    'AIIMS coaching Gurugram',
    'NEET coaching near HUDA City Centre',
    'NEET coaching Sector 44 Gurugram',
    'NEET coaching Golf Course Road',
    'NEET coaching DLF Gurugram',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Gurugram | Cerebrum Biology Academy',
    description:
      'Best NEET Biology coaching in Gurugram. AIIMS faculty, small batches, 90% success rate. No need to travel to Delhi!',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/gurugram-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy Gurugram Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Gurugram',
    description: 'Best NEET Biology coaching by AIIMS faculty. 90% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/gurugram',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function GurugramLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GurugramServiceSchema />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Gurugram', item: 'https://cerebrumbiologyacademy.com/locations/gurugram' },
            ],
          }})
        }}
      />

      {children}
    </>
  )
}
