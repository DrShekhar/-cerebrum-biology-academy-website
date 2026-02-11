import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NEET Coaching in Lagos, Nigeria | Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Lagos, Nigeria. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students.',
  keywords: 'NEET coaching Lagos, NEET exam center Lagos, best NEET classes Lagos, NEET preparation Nigeria',
  openGraph: {
    title: 'NEET Coaching in Lagos, Nigeria | 98% Success Rate',
    description: 'Premium NEET coaching center in Lagos. Dr. Shekhar C Singh & expert faculty. Start your medical journey today.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-lagos-nigeria',
    type: 'website',
    images: [{
      url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-lagos-nigeria.jpg',
      width: 1200,
      height: 630,
      alt: 'NEET Coaching in Lagos, Nigeria',
    }],
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Lagos, Nigeria',
    description: '98% Success Rate | Expert Faculty | Proven Results',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-lagos-nigeria.jpg'],
    creator: '@CerebrumBiology',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-lagos-nigeria',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
