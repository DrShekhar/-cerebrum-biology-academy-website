import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pre-NEET Foundation Coaching | Class 8-10 Biology Preparation',
  description:
    'Pre-NEET foundation coaching for Class 8-10 students. Build a strong biology foundation early for NEET success. AIIMS-trained faculty, concept-based learning. Enroll now!',
  openGraph: {
    title: 'Pre-NEET Foundation Coaching | Class 8-10 Biology Preparation',
    description:
      'Pre-NEET foundation coaching for Class 8-10 students. Build a strong biology foundation early for NEET success. AIIMS-trained faculty, concept-based learning. Enroll now!',
    url: 'https://cerebrumbiologyacademy.com/pre-neet-coaching',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/pre-neet-coaching',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
