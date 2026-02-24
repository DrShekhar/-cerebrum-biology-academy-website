import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Book Free NEET Biology Demo Class',
  description:
    'Experience our expert NEET biology teaching with a free 1-hour demo class. Meet our faculty, preview study materials, and discover our proven methodology that helped 98% of students crack NEET. Book your slot now!',
  keywords: [
    'free NEET demo class',
    'NEET biology demo',
    'free biology coaching trial',
    'NEET preparation demo',
    'biology coaching demo class',
    'medical entrance demo',
    'NEET coaching free trial',
    'Cerebrum Biology Academy demo',
    'online NEET demo class',
    'biology tuition trial',
  ],
  authors: [{ name: 'Cerebrum Biology Academy' }],
  openGraph: {
    title: 'Book Free NEET Biology Demo Class',
    description:
      'Experience our expert teaching with a free demo class. 98% NEET success rate. Book your free slot today!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/support/demo',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/api/og?title=Book+Free+Demo+Class&subtitle=Experience+Expert+NEET+Teaching',
        width: 1200,
        height: 630,
        alt: 'Free NEET Biology Demo Class at Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Free NEET Biology Demo Class',
    description:
      'Experience our expert teaching with a free demo. 98% NEET success rate. Book now!',
    images: ['/api/og?title=Book+Free+Demo+Class&subtitle=Experience+Expert+NEET+Teaching'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/support/demo',
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

// JSON-LD structured data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Free NEET Biology Demo Class',
  description: 'Free 1-hour live demo class for NEET biology preparation with expert faculty',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  serviceType: 'Educational Demo Class',
  areaServed: 'India',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Demo Class Options',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Class 11th Foundation Demo',
        },
        price: '0',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Class 12th Intensive Demo',
        },
        price: '0',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dropper Batch Demo',
        },
        price: '0',
        priceCurrency: 'INR',
      },
    ],
  },
}

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
