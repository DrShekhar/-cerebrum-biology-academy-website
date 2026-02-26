import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zoology Teacher Near Me | Expert Zoology Classes for NEET',
  description:
    'Find expert zoology teachers near you at Cerebrum Biology Academy. Specialized zoology coaching for NEET, covering animal physiology, genetics, ecology. Book free demo!',
  openGraph: {
    title: 'Zoology Teacher Near Me | Expert Zoology Classes for NEET',
    description:
      'Find expert zoology teachers near you at Cerebrum Biology Academy. Specialized zoology coaching for NEET, covering animal physiology, genetics, ecology. Book free demo!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/zoology-teacher-near-me',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/zoology-teacher-near-me',
  },
}

export default function ZoologyTeacherNearMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
