import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admissions Open 2026-2027 - NEET Biology Coaching',
  description:
    'Enroll in Cerebrum Biology Academy for NEET 2026-27. Limited seats available for Class 11, 12 & Dropper batches. 98% success rate, AIIMS-trained faculty. Apply now!',
  keywords: [
    'NEET coaching admissions 2026-2027',
    'NEET biology batch enrollment',
    'Cerebrum Biology Academy admission',
    'NEET dropper batch admission',
    'Class 11 NEET coaching admission',
    'Class 12 NEET coaching admission',
    'best NEET coaching enrollment',
    'NEET 2026 batch registration',
  ],
  openGraph: {
    title: 'Admissions Open 2026-2027 - NEET Biology Coaching',
    description:
      'Limited seats for NEET 2026-27 batches. 98% success rate, AIIMS faculty. Class 11, 12 & Dropper programs available.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/admissions',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Admissions Open 2026-2027',
    description:
      'Limited seats! 98% success rate. AIIMS faculty. Apply now for Class 11, 12 & Dropper batches.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/admissions',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'Admissions', item: 'https://cerebrumbiologyacademy.com/admissions' },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Admissions - Cerebrum Biology Academy',
    description: 'Enroll in NEET Biology coaching programs at Cerebrum Biology Academy.',
    url: 'https://cerebrumbiologyacademy.com/admissions',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {children}
    </>
  )
}
