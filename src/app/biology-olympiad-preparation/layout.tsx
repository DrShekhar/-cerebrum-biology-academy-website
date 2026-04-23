import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Olympiad Preparation | IBO, USABO, BBO Coaching',
  description:
    'Expert Biology Olympiad preparation for IBO, USABO, BBO, and national olympiads. Structured curriculum, past paper practice, and mentorship from olympiad medalists.',
  keywords: [
    'biology olympiad preparation',
    'IBO preparation',
    'USABO coaching',
    'BBO preparation',
    'biology olympiad coaching',
    'international biology olympiad',
    'olympiad biology tutor',
    'biology competition preparation',
  ],
  openGraph: {
    title: 'Biology Olympiad Preparation | IBO, USABO, BBO',
    description:
      'Comprehensive biology olympiad coaching. Expert mentors, structured curriculum, past papers. Prepare for IBO, USABO, BBO & national olympiads.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Olympiad Preparation',
    description: 'Expert coaching for IBO, USABO, BBO. Mentorship from olympiad medalists.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
    languages: {
      en: 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
      'en-IN': 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
      'en-US': 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
      'en-GB': 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
      'x-default': 'https://cerebrumbiologyacademy.com/biology-olympiads',
    },
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
      name: 'Biology Olympiad Preparation',
      item: 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
    },
  ],
}

export default function BiologyOlympiadPreparationLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
