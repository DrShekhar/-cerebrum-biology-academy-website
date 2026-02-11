import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NEET Coaching in Dammam, Saudi Arabia | Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Dammam, Saudi Arabia. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students.',
  keywords: 'NEET coaching Dammam, NEET exam center Dammam, best NEET classes Dammam, NEET preparation Saudi Arabia',
  openGraph: {
    title: 'NEET Coaching in Dammam, Saudi Arabia | 98% Success Rate',
    description: 'Premium NEET coaching center in Dammam. Dr. Shekhar C Singh & expert faculty. Start your medical journey today.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dammam-saudi-arabia',
    type: 'website',
    images: [{
      url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-dammam-saudi-arabia.jpg',
      width: 1200,
      height: 630,
      alt: 'NEET Coaching in Dammam, Saudi Arabia',
    }],
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Dammam, Saudi Arabia',
    description: '98% Success Rate | Expert Faculty | Proven Results',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-dammam-saudi-arabia.jpg'],
    creator: '@CerebrumBiology',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dammam-saudi-arabia',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
