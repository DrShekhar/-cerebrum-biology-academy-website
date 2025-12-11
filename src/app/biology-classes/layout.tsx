import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Classes | Best Bio Classes for NEET & Boards 2025',
  description:
    'Join the best biology classes for NEET & board exams. Expert AIIMS-trained faculty, structured curriculum, small batches of 15-20 students. Online & offline bio classes available.',
  keywords: [
    'biology classes',
    'bio classes',
    'biology class',
    'best biology classes',
    'biology classes for neet',
    'biology classes online',
    'bio classes near me',
    'biology coaching classes',
    'neet biology classes',
    'biology classes for class 11',
    'biology classes for class 12',
  ],
  openGraph: {
    title: 'Best Biology Classes | AIIMS-Trained Faculty',
    description:
      'Expert biology classes with structured curriculum and batch learning. 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-classes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Classes',
    description: 'AIIMS-trained faculty with 15+ years experience. 98% success rate!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-classes',
  },
}

export default function BiologyClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
