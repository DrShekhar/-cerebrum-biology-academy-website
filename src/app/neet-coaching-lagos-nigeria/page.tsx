import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { LocalitySchema } from '@/components/seo/LocalitySchema';

export const metadata: Metadata = {
  title: 'NEET Coaching in Lagos, Nigeria',
  description: 'Expert NEET coaching in Lagos, Nigeria. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students. Enroll now!',
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
    }],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-lagos-nigeria',
  },
};

export default function Page() {
  const localityData = {
    name: 'Lagos, Nigeria',
    latitude: 6.5244,
    longitude: 3.3792,
    address: 'Lagos, Nigeria',
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
      <PageContent city="Lagos" country="Nigeria" />
    </>
  );
}
