import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Online & Offline NEET Biology Coaching | Cerebrum Academy',
  description:
    'Comprehensive NEET Biology services: Live classes, doubt resolution, mock tests, study material, performance analytics. Online, offline & hybrid learning options available.',
  keywords:
    'NEET services, biology coaching services, online classes, offline coaching, doubt clearing, mock tests, study material, NEET preparation services',
  openGraph: {
    title: 'Complete NEET Biology Services | All-in-One Learning Platform',
    description:
      'From live classes to mock tests, we provide everything you need for NEET success. 98% success rate with comprehensive support system.',
    images: ['/og-images/services.jpg'],
    url: 'https://cerebrumbiologyacademy.com/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Services | Cerebrum Academy',
    description: 'Live classes, doubt resolution, mock tests, study material - everything you need',
    images: ['/og-images/services.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
