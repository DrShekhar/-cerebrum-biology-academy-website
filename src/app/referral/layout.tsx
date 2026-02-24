import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refer & Earn',
  description:
    'Refer friends to Cerebrum Biology Academy and earn rewards. Get ₹500 for every successful referral. Share your unique code and help your friends succeed in NEET.',
  openGraph: {
    title: 'Refer & Earn',
    description:
      'Refer friends to Cerebrum Biology Academy and earn rewards. Get ₹500 for every successful referral.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/referral',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refer & Earn',
    description: 'Refer friends to Cerebrum Biology Academy and earn rewards. Get ₹500 for every successful referral.',
  },
}

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
