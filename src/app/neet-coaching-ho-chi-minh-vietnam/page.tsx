import { Metadata } from 'next';
import NEETCoachingPageContent from './neet-coaching-ho-chi-minh-vietnam/PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Ho Chi Minh City, Vietnam - 98% Success Rate | Cerebrum Academy',
  description: "NEET Coaching in Ho Chi Minh City - Vietnam's emerging medical entrance destination with international school partnerships.",
  keywords: [
    'NEET coaching in Ho Chi Minh City',
    'medical entrance exam preparation Ho Chi Minh City',
    'Dr. Shekhar C Singh Ho Chi Minh City',
    'best NEET institute Ho Chi Minh City',
    'NEET online coaching Vietnam'
  ],
  openGraph: {
    title: 'NEET Coaching in Ho Chi Minh City, Vietnam - 98% Success Rate | Cerebrum Academy',
    description: "NEET Coaching in Ho Chi Minh City - Vietnam's emerging medical entrance destination with international school partnerships.",
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Ho Chi Minh City, Vietnam',
    description: "NEET Coaching in Ho Chi Minh City - Vietnam's emerging medical entrance destination with international school partnerships."
  }
};

export default function HoChiMinhCityNEETCoachingPage() {
  return <NEETCoachingPageContent />;
}
