import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in GTB Nagar | Biology Specialist | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching in GTB Nagar — gateway to Delhi University campus + Mukherjee Nagar coaching belt. Biology-only specialist, AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, weekly 1:1 doubt slots. Walking distance from GTB Nagar metro (Yellow Line). Small batches of 15-20, 98% qualification rate. Online + offline for North Delhi droppers / repeaters / North Campus aspirants.',
  keywords: [
    'NEET coaching GTB Nagar',
    'biology coaching GTB Nagar',
    'NEET tutor GTB Nagar',
    'best NEET coaching GTB Nagar',
    'NEET dropper coaching GTB Nagar',
    'NEET classes GTB Nagar',
    'NEET coaching North Delhi',
    'NEET coaching DU North Campus',
    'NEET coaching near GTB Nagar metro',
    'AIIMS faculty GTB Nagar',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gtb-nagar' },
  openGraph: {
    title: 'NEET Coaching in GTB Nagar | Cerebrum Biology Academy',
    description: 'Biology specialist near GTB Nagar metro + DU North Campus. AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gtb-nagar',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in GTB Nagar | Cerebrum',
    description: 'Gateway to DU North Campus + coaching belt.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
