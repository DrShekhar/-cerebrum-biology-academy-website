import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Bhopal | Biology Classes',
  description:
    'Best NEET biology coaching in Bhopal. 98% success rate. AIIMS faculty. MP Nagar, Arera Colony, Kolar Road, Hoshangabad Road. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Bhopal, best NEET biology coaching Bhopal, biology tuition Bhopal, NEET classes MP Nagar, biology coaching Arera Colony, NEET preparation Madhya Pradesh, Bhopal NEET coaching online, Class 12 biology Bhopal, CBSE biology tuition Bhopal',
  openGraph: {
    title: 'Best NEET Coaching in Bhopal | Biology Classes',
    description:
      'Best NEET biology coaching in Bhopal with 98% success rate. AIIMS faculty. MP Nagar, Arera Colony, Kolar Road.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-bhopal',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Bhopal | Biology Classes',
    description: 'Best NEET biology coaching in Bhopal. 98% success rate. AIIMS faculty.',
  },
  other: { 'article:modified_time': '2026-05-27' },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-bhopal',
  },
}

export default function BhopalCoachingLayout({ children }: { children: React.ReactNode }) {
  return <><LocalBusinessSchema />
      {children}</>
}
