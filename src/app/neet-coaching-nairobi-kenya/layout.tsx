import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Nairobi, Kenya',
  description: 'Expert NEET coaching in Nairobi, Kenya. 98% success rate. Biology-focused curriculum with Dr. Shekhar C Singh. Enroll now!',
  keywords: 'NEET coaching Nairobi, NEET classes Kenya, biology tuition, medical entrance preparation',
  openGraph: {
    title: 'NEET Coaching in Nairobi, Kenya',
    description: 'Expert NEET coaching with 98% success rate. Personalized biology curriculum tailored for Kenya students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-nairobi-kenya',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-nairobi-kenya.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Nairobi',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Nairobi',
    description: 'Expert NEET coaching with 98% success rate led by Dr. Shekhar C Singh.',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-nairobi-kenya.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-nairobi-kenya',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-neet-coaching-nairobi-kenya">
      {children}
    </div>
  );
}
