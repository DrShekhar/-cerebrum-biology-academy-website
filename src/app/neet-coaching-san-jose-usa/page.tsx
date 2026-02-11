import { Metadata } from 'next';
import NEETCoachingPageContent from './neet-coaching-san-jose-usa/PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in San Jose, USA - 98% Success Rate | Cerebrum Academy',
  description: 'NEET Coaching in San Jose - Premium medical entrance prep in Silicon Valley's heart with highest Indian-American concentration.',
  keywords: [
    'NEET coaching in San Jose',
    'medical entrance exam preparation San Jose',
    'Dr. Shekhar C Singh San Jose',
    'best NEET institute San Jose',
    'NEET online coaching USA'
  ],
  openGraph: {
    title: 'NEET Coaching in San Jose, USA - 98% Success Rate | Cerebrum Academy',
    description: 'NEET Coaching in San Jose - Premium medical entrance prep in Silicon Valley's heart with highest Indian-American concentration.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in San Jose, USA',
    description: 'NEET Coaching in San Jose - Premium medical entrance prep in Silicon Valley's heart with highest Indian-American concentration.'
  }
};

export default function SanJoseNEETCoachingPage() {
  return <NEETCoachingPageContent />;
}
