import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Online Classes | Live Interactive NEET Classes Online',
  description:
    'Attend live NEET online classes from anywhere in India. Expert faculty, interactive sessions, recorded lectures for revision. Join 1,50,000+ students preparing for NEET 2026 online!',
  keywords: [
    'neet online classes',
    'online neet classes',
    'neet classes online',
    'live neet classes',
    'neet biology online classes',
    'online classes for neet preparation',
    'best neet online classes',
    'neet 2027 online classes',
  ],
  openGraph: {
    title: 'NEET Online Classes | Live Interactive NEET Classes Online',
    description:
      'Attend live NEET online classes from anywhere in India. Expert faculty, interactive sessions, recorded lectures for revision.',
    url: 'https://cerebrumbiologyacademy.com/neet-online-classes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Online Classes | Live Interactive NEET Classes Online',
    description:
      'Attend live NEET online classes from anywhere in India. Expert faculty, interactive sessions, recorded lectures for revision.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-online-classes',
  },
}

export default function NeetOnlineClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
