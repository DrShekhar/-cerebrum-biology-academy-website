import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'INBO Coaching Online | Indian Biology Olympiad Preparation',
  description:
    'Expert INBO coaching for Indian students. Indian Biology Olympiad preparation with NSEB and INBiO focus. Get selected for OCSC and IBO. Online 1:1 and batch coaching.',
  keywords: [
    'INBO preparation',
    'Indian Biology Olympiad',
    'INBO coaching',
    'NSEB preparation',
    'INBiO coaching',
    'OCSC training',
    'biology olympiad India',
    'HBCSE olympiad',
    'IBO India team',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'INBO Coaching Online | Indian Biology Olympiad Preparation',
    description:
      'Expert INBO coaching for Indian students. Indian Biology Olympiad preparation with NSEB and INBiO focus.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/inbo-coaching',
  },
  openGraph: {
    title: 'INBO Coaching Online | Indian Biology Olympiad Preparation',
    description:
      'Expert INBO coaching for Indian students. Indian Biology Olympiad preparation with NSEB and INBiO focus. Get selected for OCSC and IBO.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function INBOLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
