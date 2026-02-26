import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Faculty | AIIMS-Trained Biology Teachers at Cerebrum Academy',
  description:
    'Meet our expert faculty at Cerebrum Biology Academy. AIIMS-trained biology teachers with 10+ years experience. Led by Dr. Shekhar with 67+ AIIMS selections.',
  openGraph: {
    title: 'Our Faculty | AIIMS-Trained Biology Teachers at Cerebrum Academy',
    description:
      'Meet our expert faculty at Cerebrum Biology Academy. AIIMS-trained biology teachers with 10+ years experience. Led by Dr. Shekhar with 67+ AIIMS selections.',
    url: 'https://cerebrumbiologyacademy.com/faculty',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/faculty',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
