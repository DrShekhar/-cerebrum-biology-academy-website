import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Salalah, Oman - Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Salalah, Oman. 98% success rate. Biology-focused curriculum with Dr. Shekhar C Singh. Enroll now!',
  keywords: 'NEET coaching Salalah, NEET classes Oman, biology tuition, medical entrance preparation',
  openGraph: {
    title: 'NEET Coaching in Salalah, Oman - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate. Personalized biology curriculum tailored for Oman students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-salalah-oman',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-salalah-oman.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Salalah',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Salalah - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate led by Dr. Shekhar C Singh.',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-salalah-oman.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-salalah-oman',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-neet-coaching-salalah-oman">
      {children}
    </div>
  );
}
