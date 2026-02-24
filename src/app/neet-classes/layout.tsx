import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Classes Near Me | Best NEET Coaching Classes 2027',
  description:
    'Join the best NEET classes with live interactive sessions, expert faculty, and comprehensive study material. NEET classes available online and offline. 98% success rate!',
  keywords: [
    'NEET classes',
    'NEET classes near me',
    'NEET coaching classes',
    'NEET coaching classes near me',
    'best NEET classes',
    'online NEET classes',
    'NEET biology classes',
    'NEET preparation classes',
    'NEET classes 2027',
    'NEET live classes',
  ],
  openGraph: {
    title: 'NEET Classes Near Me | Best NEET Coaching Classes 2027',
    description:
      'Best NEET classes with live interactive sessions, expert faculty. Available online and offline. 98% success rate!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-classes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Classes Near Me',
    description: 'Best NEET classes with live sessions and expert faculty. 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-classes',
  },
}

export default function NeetClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
