import { Metadata } from 'next'
import EnrollmentPageClient from './EnrollmentPageClient'
import { EventSchema, EventListSchema } from '@/components/seo/EventSchema'

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

const upcomingBatches = [
  {
    name: 'NEET 2026 Class 11 Biology Batch — New Session',
    description: 'Fresh Class 11 NEET Biology batch starting at Cerebrum Academy. AIIMS faculty, 15-student batches across 6 Delhi NCR centers. Online and offline options.',
    startDate: '2026-04-01T09:00:00+05:30',
    endDate: '2027-03-31T18:00:00+05:30',
    url: 'https://cerebrumbiologyacademy.com/enrollment',
    isAccessibleForFree: false,
  },
  {
    name: 'NEET 2027 Dropper Batch — Intensive Year-Long Program',
    description: 'Intensive NEET dropper batch with AIIMS faculty. Complete Class 11 + 12 revision, 50+ mock tests, personal mentorship. 92% success rate.',
    startDate: '2026-06-15T09:00:00+05:30',
    endDate: '2027-05-01T18:00:00+05:30',
    url: 'https://cerebrumbiologyacademy.com/neet-dropper-batch',
    isAccessibleForFree: false,
  },
  {
    name: 'Free NEET Biology Demo Class — Book Now',
    description: 'Experience Cerebrum Academy teaching firsthand. Free 90-minute demo class with AIIMS faculty. Available at all 6 Delhi NCR centers and online.',
    startDate: '2026-02-15T10:00:00+05:30',
    url: 'https://cerebrumbiologyacademy.com/book-free-demo',
    isAccessibleForFree: true,
  },
]

export default function EnrollmentPage() {
  return (
    <main className="min-h-screen">
      <EventListSchema
        events={upcomingBatches}
        listName="Upcoming NEET Biology Batches at Cerebrum Academy"
      />
      <EnrollmentPageClient />
    </main>
  )
}
