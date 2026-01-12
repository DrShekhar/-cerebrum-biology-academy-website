import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admissions Open 2025 - NEET Biology Coaching | Cerebrum Biology Academy',
  description:
    'Enroll in Cerebrum Biology Academy for NEET 2025-26. Limited seats available for Class 11, 12 & Dropper batches. 98% success rate, AIIMS-trained faculty. Apply now!',
  keywords: [
    'NEET coaching admissions 2025',
    'NEET biology batch enrollment',
    'Cerebrum Biology Academy admission',
    'NEET dropper batch admission',
    'Class 11 NEET coaching admission',
    'Class 12 NEET coaching admission',
    'best NEET coaching enrollment',
    'NEET 2026 batch registration',
  ],
  openGraph: {
    title: 'Admissions Open 2025 - NEET Biology Coaching',
    description:
      'Limited seats for NEET 2025-26 batches. 98% success rate, AIIMS faculty. Class 11, 12 & Dropper programs available.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/admissions',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Admissions Open 2025 | Cerebrum Biology Academy',
    description: 'Limited seats! 98% success rate. AIIMS faculty. Apply now for Class 11, 12 & Dropper batches.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/admissions',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
