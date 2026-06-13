import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Mukherjee Nagar | Biology Specialist | Cerebrum Biology Academy',
  description:
    "NEET Biology coaching in Mukherjee Nagar — Delhi's legendary NEET / UPSC coaching hub. Biology-only specialist, AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, weekly 1:1 doubt slots. Located minutes from GTB Nagar metro and major coaching landmarks. Small batches of 15-20, 98% qualification rate. Online + offline options for Mukherjee Nagar droppers / repeaters.",
  keywords: [
    'NEET coaching Mukherjee Nagar',
    'biology coaching Mukherjee Nagar',
    'NEET tutor Mukherjee Nagar',
    'best NEET coaching Mukherjee Nagar',
    'NEET dropper coaching Mukherjee Nagar',
    'NEET classes Mukherjee Nagar',
    'biology classes Mukherjee Nagar',
    'NEET coaching North Delhi',
    'NEET coaching near GTB Nagar metro',
    'AIIMS faculty Mukherjee Nagar',
    'NEET coaching Delhi University area',
    'Mukherjee Nagar coaching hub',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mukherjee-nagar' },
  openGraph: {
    title: 'NEET Coaching in Mukherjee Nagar | Cerebrum Biology Academy',
    description: "Biology-only specialist in Delhi's legendary coaching hub. AIIMS faculty.",
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mukherjee-nagar',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Mukherjee Nagar | Cerebrum',
    description: "Delhi's legendary coaching hub. Biology specialist.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
