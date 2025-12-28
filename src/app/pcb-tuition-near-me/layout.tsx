import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PCB Tuition Near Me | Physics Chemistry Biology Classes 2025',
  description:
    'Looking for PCB tuition near you? Expert coaching for Physics, Chemistry & Biology. Perfect for NEET aspirants. AIIMS faculty, small batches. Book free demo class!',
  keywords: [
    'pcb tuition near me',
    'physics chemistry biology tuition',
    'pcb classes near me',
    'pcb coaching near me',
    'physics chemistry biology tuition near me',
    'pcb tuition for neet',
    'pcb online tuition',
    'best pcb tuition',
    'pcb tuition classes',
    'pcb coaching for neet',
  ],
  openGraph: {
    title: 'PCB Tuition Near Me | Complete NEET Preparation',
    description:
      'Expert PCB tuition for NEET aspirants. Physics, Chemistry & Biology with expert faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/pcb-tuition-near-me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PCB Tuition Near Me',
    description: 'Complete PCB coaching for NEET. Expert faculty, comprehensive preparation!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/pcb-tuition-near-me',
  },
}

export default function PcbTuitionNearMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
