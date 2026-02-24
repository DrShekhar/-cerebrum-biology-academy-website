import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { LocalitySchema } from '@/components/seo/LocalitySchema';

export const metadata: Metadata = {
  title: 'NEET Coaching in Singapore City, Singapore',
  description: 'Expert NEET coaching in Singapore City, Singapore. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students. Enroll now!',
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
    }],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-singapore-city',
  },
};

export default function Page() {
  const localityData = {
    name: 'Singapore City, Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    address: 'Singapore City, Singapore',
  };

  return (
    <>
      <LocalitySchema data={{
        ...localityData,
        phone: '+918826444334',
        email: 'info@cerebrumbiologyacademy.com',
        website: 'https://cerebrumbiologyacademy.com',
        doctor: 'Dr. Shekhar C Singh',
      }} />
      <PageContent city="Singapore City" country="Singapore" />
    </>
  );
}
