import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NEET Coaching in Kuala Lumpur, Malaysia',
  description: 'Expert NEET coaching in Kuala Lumpur, Malaysia. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students.',
  keywords: 'NEET coaching Kuala Lumpur, NEET exam center Kuala Lumpur, best NEET classes Kuala Lumpur, NEET preparation Malaysia',
  openGraph: {
    title: 'NEET Coaching in Kuala Lumpur, Malaysia | 98% Success Rate',
    description: 'Premium NEET coaching center in Kuala Lumpur. Dr. Shekhar C Singh & expert faculty. Start your medical journey today.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kuala-lumpur-malaysia',
    type: 'website',
    images: [{
      url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-kuala-lumpur-malaysia.jpg',
      width: 1200,
      height: 630,
      alt: 'NEET Coaching in Kuala Lumpur, Malaysia',
    }],
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Kuala Lumpur, Malaysia',
    description: '98% Success Rate | Expert Faculty | Proven Results',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-kuala-lumpur-malaysia.jpg'],
    creator: '@CerebrumBiology',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kuala-lumpur-malaysia',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
