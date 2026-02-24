import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Dropper Course 2027 | Best Biology Coaching for Repeaters',
  description:
    'Specialized NEET Biology coaching for droppers. Transform your second attempt into success with AIIMS faculty guidance. Small batches, personalized attention, proven 98% success rate.',
  keywords: [
    'NEET dropper course',
    'NEET repeater batch',
    'NEET 2027 preparation',
    'Biology coaching for droppers',
    'NEET second attempt',
    'best coaching for NEET repeaters',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Dropper Course 2027 | Best Biology Coaching for Repeaters',
    description: 'Specialized NEET Biology coaching for droppers. Transform your second attempt into success with AIIMS faculty guidance.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/dropper',
  },
  openGraph: {
    title: 'NEET Dropper Course 2027 | Best Biology Coaching for Repeaters',
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
