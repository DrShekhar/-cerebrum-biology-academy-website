import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Expert NEET Biology Faculty Delhi NCR | AIIMS Qualified Teachers | Cerebrum Academy',
  description:
    'Meet Cerebrum Biology Academy expert faculty. AIIMS-qualified, 15+ years teaching experience, 680+ medical college selections. Led by Dr. Shekhar Singh, founder with AIIMS background.',
  keywords: [
    'NEET faculty Delhi',
    'biology teachers Delhi NCR',
    'AIIMS faculty',
    'Dr Shekhar Singh',
    'best NEET teachers',
    'expert biology faculty',
    'qualified NEET tutors',
    'experienced biology mentors',
    'AIIMS trained teachers',
  ],
  openGraph: {
    title:
      'Expert NEET Biology Faculty | AIIMS Qualified | Cerebrum Academy Delhi NCR',
    description:
      'Learn from AIIMS-qualified faculty with 15+ years experience. Dr. Shekhar Singh leads our team of expert NEET mentors. 680+ medical college selections achieved.',
    url: 'https://cerebrumbiologyacademy.com/faculty',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Expert NEET Biology Faculty - AIIMS Qualified Teachers',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert NEET Biology Faculty',
    description:
      'AIIMS-qualified faculty, 15+ years experience, 680+ medical selections. Learn from the best!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/faculty',
  },
}

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
