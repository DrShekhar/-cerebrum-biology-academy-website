import { Metadata } from 'next'
import { NEETRepeatersResourceSection } from '@/components/resources/NEETRepeatersResourceSection'

export const metadata: Metadata = {
  title: 'NEET Repeaters Resources | From Failure to Success - Cerebrum Biology Academy',
  description:
    'Comprehensive resources for NEET repeaters: Success stories, study strategies, mental health support, and expert guidance to transform failure into medical college admission.',
  keywords:
    'NEET repeaters, NEET failure, medical entrance repeat, NEET second attempt, NEET motivation, biology mastery, repeater strategy',
  openGraph: {
    title: 'NEET Repeaters - Transform Your Failure into Success',
    description:
      'Join thousands of successful NEET repeaters who turned their dreams into reality with our expert guidance.',
    images: ['/resources/neet-repeaters-success-og.jpg'],
  },
}

export default function NEETRepeatersPage() {
  return <NEETRepeatersResourceSection />
}
