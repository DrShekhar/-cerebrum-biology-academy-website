import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IBO Preparation Online | International Biology Olympiad Coaching',
  description:
    'Expert IBO preparation for students worldwide. International Biology Olympiad coaching from IBO medalists and national team trainers. Prepare to compete with 80+ countries.',
  keywords: [
    'IBO preparation',
    'International Biology Olympiad',
    'IBO coaching',
    'biology olympiad international',
    'IBO training online',
    'biology olympiad gold medal',
    'IBO practical preparation',
    'international biology competition',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'IBO Preparation Online | International Biology Olympiad Coaching',
    description: 'Expert IBO preparation for students worldwide.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ibo-preparation',
    languages: {
      en: 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'en-IN': 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'en-US': 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'en-GB': 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'en-SG': 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'x-default': 'https://cerebrumbiologyacademy.com/ibo-preparation',
    },
  },
  openGraph: {
    title: 'IBO Preparation Online | International Biology Olympiad Coaching',
    description:
      'Expert IBO preparation for students worldwide. International Biology Olympiad coaching from IBO medalists and national team trainers.',
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
      name: 'IBO Preparation',
      item: 'https://cerebrumbiologyacademy.com/ibo-preparation',
    },
  ],
}

export default function IBOLayout({ children }: { children: React.ReactNode }) {
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
