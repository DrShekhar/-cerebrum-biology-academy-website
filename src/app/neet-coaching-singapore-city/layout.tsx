import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NEET Coaching in Singapore City, Singapore',
  description: 'Expert NEET coaching in Singapore City, Singapore. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students.',
  keywords: 'NEET coaching Singapore City, NEET exam center Singapore City, best NEET classes Singapore City, NEET preparation Singapore',
  openGraph: {
    title: 'NEET Coaching in Singapore City, Singapore | 98% Success Rate',
    description: 'Premium NEET coaching center in Singapore City. Dr. Shekhar C Singh & expert faculty. Start your medical journey today.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-singapore-city',
    type: 'website',
    images: [{
      url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-singapore-city.jpg',
      width: 1200,
      height: 630,
      alt: 'NEET Coaching in Singapore City, Singapore',
    }],
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Singapore City, Singapore',
    description: '98% Success Rate | Expert Faculty | Proven Results',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-singapore-city.jpg'],
    creator: '@CerebrumBiology',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-singapore-city',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
