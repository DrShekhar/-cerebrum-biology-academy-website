import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enrollment | Join Cerebrum Biology Academy | NEET Coaching Admission 2025',
  description:
    "Enroll in India's best NEET Biology coaching. Simple 3-step admission process, flexible payment options, EMI available. Start your medical journey today!",
  keywords:
    'NEET enrollment, coaching admission, join NEET coaching, biology coaching admission, enroll now, NEET admission 2025, course enrollment',
  openGraph: {
    title: 'Enroll Now NEET Coaching',
    description:
      'Start your journey to medical college. Simple enrollment, flexible payments, instant access to classes. Limited seats for 2025 batch!',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/enrollment',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enroll in NEET Biology Coaching',
    description: 'Simple admission process, flexible EMI options, start immediately',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/enrollment',
  },
}

export default function EnrollmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
