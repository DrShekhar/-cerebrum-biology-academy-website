import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Testimonials | NEET Success Stories | Cerebrum Biology Academy',
  description:
    'Read success stories from 2,847+ students who qualified NEET with Cerebrum Biology Academy. AIIMS selections, top ranks, transformation journeys. Join the success club!',
  keywords:
    'NEET testimonials, success stories, student reviews, NEET qualifiers, AIIMS selections, medical college admissions, student feedback, coaching reviews',
  openGraph: {
    title: 'NEET Success Stories | 2,847+ Medical College Selections',
    description:
      'Real students, real results. See how our NEET Biology coaching transformed lives. 98% success rate, 247+ in Top 1000 AIR.',
    images: ['/og-images/testimonials.jpg'],
    url: 'https://cerebrumbiologyacademy.com/testimonials',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Success Testimonials | Cerebrum Biology Academy',
    description:
      '2,847+ medical college selections, 98% success rate, student transformation stories',
    images: ['/og-images/testimonials.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/testimonials',
  },
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
