import { Metadata } from 'next';
import NEETCoachingPageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Chicago, USA - 98% Success Rate',
  description: 'NEET Coaching in Chicago - Leading medical entrance exam preparation in Illinois with expert guidance from Dr. Shekhar C Singh.',
  keywords: [
    'NEET coaching in Chicago',
    'medical entrance exam preparation Chicago',
    'Dr. Shekhar C Singh Chicago',
    'best NEET institute Chicago',
    'NEET online coaching USA'
  ],
  openGraph: {
    title: 'NEET Coaching in Chicago, USA - 98% Success Rate',
    description: 'NEET Coaching in Chicago - Leading medical entrance exam preparation in Illinois with expert guidance from Dr. Shekhar C Singh.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Chicago, USA',
    description: 'NEET Coaching in Chicago - Leading medical entrance exam preparation in Illinois with expert guidance from Dr. Shekhar C Singh.'
  }
};

export default function ChicagoNEETCoachingPage() {
  return <NEETCoachingPageContent />;
}
