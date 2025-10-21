import { Metadata } from 'next'
import { NEETRepeatersResourceSection } from '@/components/resources/NEETRepeatersResourceSection'

export const metadata: Metadata = {
  title: 'NEET Repeaters Program 2025 | Second Attempt Success | Cerebrum Biology',
  description:
    'Specialized NEET repeater program with proven rank improvement strategies. 89% repeaters qualify NEET with us. Emotional support, focused Biology coaching, motivation. Start again, succeed this time!',
  keywords:
    'NEET repeaters, NEET second attempt, failed NEET, NEET dropper, repeater success, rank improvement, NEET 2025 repeater, second chance NEET, biology repeater course',
  openGraph: {
    title: 'NEET Repeaters 2025 | Transform Failure into Success',
    description:
      '89% of our NEET repeaters qualify! Emotional support + focused Biology coaching + rank improvement strategies. Your second chance at medical college starts here.',
    images: ['/og-images/neet-repeaters.jpg'],
    url: 'https://cerebrumbiologyacademy.com/neet-repeaters',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Repeaters Success Program | Cerebrum Academy',
    description: '89% repeater success rate, emotional support, rank improvement guarantee',
    images: ['/og-images/neet-repeaters.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-repeaters',
  },
}

export default function NEETRepeatersPage() {
  return <NEETRepeatersResourceSection />
}
