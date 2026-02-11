import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Dropper Course 2025 | Best Biology Coaching for Repeaters | Cerebrum Academy',
  description:
    'Specialized NEET Biology coaching for droppers. Transform your second attempt into success with AIIMS faculty guidance. Small batches, personalized attention, proven 98% success rate.',
  keywords: [
    'NEET dropper course',
    'NEET repeater batch',
    'NEET 2025 preparation',
    'Biology coaching for droppers',
    'NEET second attempt',
    'best coaching for NEET repeaters',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/dropper',
  },
  openGraph: {
    title: 'NEET Dropper Course 2025 | Best Biology Coaching for Repeaters',
    description:
      'Specialized NEET Biology coaching for droppers. Transform your second attempt into success with AIIMS faculty guidance.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/dropper',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function DropperLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
