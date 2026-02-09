import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expert Faculty | AIIMS & MBBS Teachers | Cerebrum Biology Academy',
  description:
    'Meet our NEET Biology faculty: AIIMS graduates, PhD holders, 15+ years teaching experience. Expert mentors who have produced 2,847+ medical college selections.',
  keywords:
    'NEET faculty, biology teachers, AIIMS faculty, experienced teachers, NEET mentors, biology experts, qualified teachers, teaching staff',
  openGraph: {
    title: 'Meet Our AIIMS Expert Faculty | 15+ Years Experience',
    description:
      'Learn from the best! Our faculty includes AIIMS graduates, PhD holders, and experienced NEET mentors. Meet the teachers behind 98% success rate.',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/faculty',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert NEET Biology Faculty | Cerebrum Academy',
    description: 'AIIMS graduates, PhD holders, 15+ years experience, 2,847+ selections produced',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/faculty',
  },
}

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
