import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Free Demo Class | NEET Biology Trial Lesson | Cerebrum Academy',
  description:
    'Book your free NEET Biology demo class with AIIMS faculty. Experience our teaching methodology, curriculum, and student support. No obligation. Available online & offline!',
  keywords:
    'free demo class, NEET biology trial, free biology class, demo lesson NEET, trial class, free consultation, NEET coaching demo',
  openGraph: {
    title: 'Free NEET Biology Demo Class | Experience Excellence',
    description:
      'Try our NEET Biology coaching for free! 60-minute demo with AIIMS faculty. See why 1,50,000+ students chose us. Book now!',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/demo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Demo Class | Cerebrum Academy',
    description: 'Experience AIIMS faculty teaching, get curriculum overview, no obligation',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/demo',
  },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
