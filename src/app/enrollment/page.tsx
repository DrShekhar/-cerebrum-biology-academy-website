import { Metadata } from 'next'
import EnrollmentPageClient from './EnrollmentPageClient'

export const metadata: Metadata = {
  title: 'Enroll Now | Join Cerebrum Biology Academy | NEET Coaching Admission 2026',
  description: 'Enroll in India\'s top NEET Biology coaching institute. 98% success rate, AIIMS-trained faculty. EMI options available. Limited seats for 2026 batch.',
  keywords: 'NEET enrollment, biology coaching admission, NEET 2026 batch, Cerebrum Academy enrollment, NEET coaching fees',
  openGraph: {
    title: 'Enroll Now | Cerebrum Biology Academy',
    description: '98% success rate. AIIMS-trained faculty. EMI options available. Limited seats!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/enrollment',
  },
}

export default function EnrollmentPage() {
  return (
    <main className="min-h-screen">
      <EnrollmentPageClient />
    </main>
  )
}
