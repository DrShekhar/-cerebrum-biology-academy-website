import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NEET Coaching in Kathmandu, Nepal',
  description: 'Expert NEET coaching in Kathmandu, Nepal. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students.',
  keywords: 'NEET coaching Kathmandu, NEET exam center Kathmandu, best NEET classes Kathmandu, NEET preparation Nepal',
  openGraph: {
    title: 'NEET Coaching in Kathmandu, Nepal | 98% Success Rate',
    description: 'Premium NEET coaching center in Kathmandu. Dr. Shekhar C Singh & expert faculty. Start your medical journey today.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kathmandu-nepal',
    type: 'website',
    images: [{
      url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-kathmandu-nepal.jpg',
      width: 1200,
      height: 630,
      alt: 'NEET Coaching in Kathmandu, Nepal',
    }],
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Kathmandu, Nepal',
    description: '98% Success Rate | Expert Faculty | Proven Results',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-kathmandu-nepal.jpg'],
    creator: '@CerebrumBiology',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kathmandu-nepal',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
