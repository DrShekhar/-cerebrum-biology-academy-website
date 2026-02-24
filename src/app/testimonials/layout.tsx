import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Success Stories [67+ AIIMS Selections, 98% Success]',
  description:
    'Real NEET success stories at Cerebrum Academy — 67+ AIIMS selections, 98% success rate, 1,50,000+ students trained. Watch video testimonials today!',
  keywords:
    'NEET testimonials, success stories, student reviews, NEET qualifiers, AIIMS selections, medical college admissions, student feedback, coaching reviews',
  openGraph: {
    title: 'NEET Success Stories | 1,50,000+ Students Trained',
    description:
      'Real students, real results. See how our NEET Biology coaching transformed lives. 98% success rate, 67+ AIIMS selections.',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/testimonials',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Success Testimonials',
    description:
      '1,50,000+ students trained, 98% success rate, student transformation stories',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/testimonials',
  },
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
