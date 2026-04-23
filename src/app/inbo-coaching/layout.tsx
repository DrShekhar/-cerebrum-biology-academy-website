import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'INBO Coaching Online | Indian Biology Olympiad Preparation',
  description:
    'Expert INBO coaching for Indian students. Indian Biology Olympiad preparation with NSEB and INBiO focus. Get selected for OCSC and IBO. Online 1:1 and batch coaching.',
  keywords: [
    'INBO preparation',
    'Indian Biology Olympiad',
    'INBO coaching',
    'NSEB preparation',
    'INBiO coaching',
    'OCSC training',
    'biology olympiad India',
    'HBCSE olympiad',
    'IBO India team',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'INBO Coaching Online | Indian Biology Olympiad Preparation',
    description:
      'Expert INBO coaching for Indian students. Indian Biology Olympiad preparation with NSEB and INBiO focus.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/inbo-coaching',
    languages: {
      'en-IN': 'https://cerebrumbiologyacademy.com/inbo-coaching',
      en: 'https://cerebrumbiologyacademy.com/inbo-coaching',
      'x-default': 'https://cerebrumbiologyacademy.com/biology-olympiads',
    },
  },
  openGraph: {
    title: 'INBO Coaching Online | Indian Biology Olympiad Preparation',
    description:
      'Expert INBO coaching for Indian students. Indian Biology Olympiad preparation with NSEB and INBiO focus. Get selected for OCSC and IBO.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Biology Olympiads',
      item: 'https://cerebrumbiologyacademy.com/biology-olympiads',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'INBO Coaching',
      item: 'https://cerebrumbiologyacademy.com/inbo-coaching',
    },
  ],
}

export default function INBOLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
