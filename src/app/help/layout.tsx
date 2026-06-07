import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center | Cerebrum Biology Academy',
  description:
    'Cerebrum Biology Academy help center — guidance on enrollment, fees, batch schedules, demo class booking, login / dashboard, NRI quota questions, technical support, and contact information.',
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/help' },
  openGraph: {
    title: 'Help Center | Cerebrum Biology Academy',
    description: 'Enrollment, fees, batches, demo, NRI quota, login, technical support.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/help',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Help Center | Cerebrum',
    description: 'Enrollment, fees, batches, demo, login.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
