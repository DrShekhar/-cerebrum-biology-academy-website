import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Complete Program | 2-Year Integrated Biology Coaching | Cerebrum Academy',
  description:
    'Join our comprehensive 2-year NEET Biology program for Class 11 & 12 students. AIIMS faculty, 98% success rate, complete syllabus coverage with adaptive tests. Enroll now!',
  keywords:
    'NEET complete program, 2 year NEET coaching, Class 11 12 NEET, NEET biology coaching, integrated NEET program, NEET preparation course, medical entrance coaching',
  openGraph: {
    title: 'Best 2-Year NEET Biology Complete Program | 98% Success Rate',
    description:
      'Comprehensive NEET Biology coaching for Class 11 & 12. AIIMS expert faculty, proven curriculum, 2,847+ medical college selections. Start your journey today!',
    images: ['/og-images/neet-complete-program.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/neet-complete',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Complete 2-Year Program | Cerebrum Biology Academy',
    description:
      '98% success rate, AIIMS faculty, complete NEET Biology preparation for Class 11-12',
    images: ['/og-images/neet-complete-program.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/neet-complete',
  },
}

export default function NEETCompleteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
