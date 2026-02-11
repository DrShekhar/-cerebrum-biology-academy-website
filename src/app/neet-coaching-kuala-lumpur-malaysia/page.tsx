import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { LocalitySchema } from '@/components/seo/LocalitySchema';

export const metadata: Metadata = {
  title: 'NEET Coaching in Kuala Lumpur, Malaysia | Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Kuala Lumpur, Malaysia. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students. Enroll now!',
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
    }],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kuala-lumpur-malaysia',
  },
};

export default function Page() {
  const localityData = {
    name: 'Kuala Lumpur, Malaysia',
    latitude: 3.1390,
    longitude: 101.6869,
    address: 'Kuala Lumpur, Malaysia',
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
      <PageContent city="Kuala Lumpur" country="Malaysia" />
    </>
  );
}
