import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free NEET Biology Resources | Notes, Tests & Study Material',
  description:
    'Access free NEET Biology resources: chapter notes, practice tests, previous year papers, video lectures, mock tests. Download study material for Class 11, 12 & droppers.',
  keywords:
    'NEET resources, biology notes, free study material, NEET previous papers, mock tests, practice questions, NEET PDF, biology resources, free downloads',
  openGraph: {
    title: 'Free NEET Biology Resources | Notes, Tests & Study Material',
    description:
      'Download free NEET Biology notes, previous year papers, mock tests, and study material. Comprehensive resources for Class 11, 12 & droppers.',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Resources',
    description: 'Free notes, previous papers, mock tests, study material - download now',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/resources',
  },
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
