import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Success Stories [2500+ Selections, 98% Success] | Cerebrum',
  description:
    'Real student reviews: 2500+ NEET selections, 98% success rate, 247+ in Top 1000 AIR. See transformation stories & join the success club today!',
  keywords:
    'NEET testimonials, success stories, student reviews, NEET qualifiers, AIIMS selections, medical college admissions, student feedback, coaching reviews',
  openGraph: {
    title: 'NEET Success Stories | 1,50,000+ Students Trained',
    description:
      'Real students, real results. See how our NEET Biology coaching transformed lives. 98% success rate, 247+ in Top 1000 AIR.',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/testimonials',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Success Testimonials | Cerebrum Biology Academy',
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
