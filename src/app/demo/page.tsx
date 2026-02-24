import { Metadata } from 'next'
import DemoPageClient from './DemoPageClient'

export const metadata: Metadata = {
  title: 'Book Free Demo Class | NEET Biology Trial Lesson',
  description: 'Book a free demo class for NEET Biology coaching. Experience our teaching methodology with AIIMS-trained faculty. Limited slots available. Instant confirmation via WhatsApp.',
  keywords: 'NEET demo class, free biology demo, NEET trial class, biology coaching demo, Cerebrum Academy demo',
  openGraph: {
    title: 'Book Free Demo Class',
    description: 'Experience NEET Biology coaching with AIIMS-trained faculty. Book your free demo class today!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/demo',
  },
}

export default function DemoPage() {
  return (
    <main className="min-h-screen">
      <DemoPageClient />
    </main>
  )
}
