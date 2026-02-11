import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { LocalitySchema } from '@/components/seo/LocalitySchema';

export const metadata: Metadata = {
  title: 'NEET Coaching in Dammam, Saudi Arabia | Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Dammam, Saudi Arabia. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students. Enroll now!',
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
    }],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dammam-saudi-arabia',
  },
};

export default function Page() {
  const localityData = {
    name: 'Dammam, Saudi Arabia',
    latitude: 26.3927,
    longitude: 49.9777,
    address: 'Dammam, Saudi Arabia',
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
      <PageContent city="Dammam" country="Saudi Arabia" />
    </>
  );
}
