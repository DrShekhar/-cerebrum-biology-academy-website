import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free NEET Biology Resources [Notes, PYQs, Formulas] | Cerebrum',
  description:
    'Download FREE NEET Biology notes, PYQs, formula sheets & study materials. Used by 1,50,000+ successful students. No login required - start learning now!',
  keywords: [
    'free NEET biology materials',
    'NEET biology study resources',
    'free biology notes',
    'NEET timetable',
    'biology formula sheet',
    'free NEET preparation',
    'Cerebrum Biology Academy resources',
    'Class 11 biology notes',
    'Class 12 biology notes',
    'NEET dropper resources',
  ],
  openGraph: {
    title: 'Free NEET Biology Resources [Notes, PYQs, Formulas]',
    description:
      'FREE study materials used by 1,50,000+ successful students. Notes, PYQs, formula sheets!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/free-resources',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Resources [Notes, PYQs, Formulas] | Cerebrum',
    description: 'Download FREE NEET Biology notes, PYQs, formula sheets & study materials. Used by 1,50,000+ successful students.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/free-resources',
  },
}

export default function FreeResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
