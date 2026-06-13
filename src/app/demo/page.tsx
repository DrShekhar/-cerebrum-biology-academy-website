import { Metadata } from 'next'
import DemoPageClient from './DemoPageClient'

export const metadata: Metadata = {
  title: 'Book Free Demo Class | NEET Biology Trial Lesson',
  description:
    'Book a free demo class for NEET Biology coaching. Experience our teaching methodology with AIIMS-trained faculty. Limited slots available. Instant confirmation via WhatsApp.',
  keywords:
    'NEET demo class, free biology demo, NEET trial class, biology coaching demo, Cerebrum Academy demo',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/demo',
  },

  openGraph: {
    title: 'Book Free Demo Class',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Book Free Demo Class | NEET Biology Trial Lesson',
      },
    ],
    description:
      'Experience NEET Biology coaching with AIIMS-trained faculty. Book your free demo class today!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/demo',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Book Free Demo Class | NEET Biology Trial Lesson',
    description:
      'Book a free demo class for NEET Biology coaching. Experience our teaching methodology with AIIMS-trained faculty. Limited slots available. Instant confirmation via WhatsApp.',
  },
}

export default function DemoPage() {
  return (
    <main className="min-h-screen">
      <DemoPageClient />
    </main>
  )
}
