import { Metadata } from 'next'
import { NEETRepeatersResourceSection } from '@/components/resources/NEETRepeatersResourceSection'

export const metadata: Metadata = {
  title: 'NEET Repeaters Program 2026 | Second Attempt Biology Coaching | Cerebrum',
  description:
    'Specialized NEET 2027 repeater Biology programme — diagnostic gap-fill, rank improvement strategies, weekly 1:1 emotional support. 89% of our repeaters qualify NEET. Start your second-attempt biology journey with AIIMS faculty.',
  keywords:
    'NEET repeaters, NEET 2027 repeaters, NEET second attempt, failed NEET, NEET dropper, NEET repeater coaching, rank improvement NEET, biology repeater course, NEET retake biology, second chance NEET',
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Repeaters 2026 | Biology Second Attempt Coaching',
    description:
      '89% of our NEET repeaters qualify. Diagnostic-led biology gap-fill + AIIMS faculty + weekly 1:1 doubt slots + emotional support. Your second NEET attempt starts with the right plan.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Repeaters Program 2026 | Second Attempt Biology Coaching | Cer...',
      },
    ],
    url: 'https://cerebrumbiologyacademy.com/neet-repeaters',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Repeaters Success Program 2026',
    description: 'AIIMS faculty + 89% repeater qualify rate + diagnostic gap-fill biology coaching',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Repeaters Program 2026 | Second Attempt Biology Coaching | Cer...',
      },
    ],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-repeaters',
  },
}

export default function NEETRepeatersPage() {
  return <NEETRepeatersResourceSection />
}
