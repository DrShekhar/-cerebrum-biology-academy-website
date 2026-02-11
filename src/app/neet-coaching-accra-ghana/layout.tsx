import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Accra, Ghana - Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Accra, Ghana. 98% success rate. Biology-focused curriculum with Dr. Shekhar C Singh. Enroll now!',
  keywords: 'NEET coaching Accra, NEET classes Ghana, biology tuition, medical entrance preparation',
  openGraph: {
    title: 'NEET Coaching in Accra, Ghana - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate. Personalized biology curriculum tailored for Ghana students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-accra-ghana',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-accra-ghana.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Accra',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Accra - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate led by Dr. Shekhar C Singh.',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-accra-ghana.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-accra-ghana',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-neet-coaching-accra-ghana">
      {children}
    </div>
  );
}
