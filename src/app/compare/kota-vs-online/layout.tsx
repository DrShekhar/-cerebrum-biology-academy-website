import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kota vs Online NEET Coaching 2025: Complete Comparison | Cerebrum Biology Academy',
  description:
    'Kota vs Online NEET coaching — data-backed comparison of costs, results, safety, and mental health. Save ₹2.5L+ annually with 85% success rate. See the complete side-by-side analysis.',
  keywords: [
    'kota vs online coaching',
    'kota vs online neet coaching',
    'should i go to kota for neet',
    'online coaching vs kota',
    'kota coaching fees',
    'kota coaching comparison',
    'online neet coaching vs kota',
    'best alternative to kota coaching',
    'neet coaching at home vs kota',
  ],
  openGraph: {
    title: 'Kota vs Online NEET Coaching: The 2025 Truth',
    description:
      'Same results, ₹2.5L+ savings, zero stress. Complete data-backed comparison every parent must read before choosing.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/compare/kota-vs-online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kota vs Online NEET Coaching: The 2025 Truth',
    description:
      'Same results, ₹2.5L+ savings, zero stress. Complete data-backed comparison for parents.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/compare/kota-vs-online',
  },
}

export default function KotaVsOnlineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
