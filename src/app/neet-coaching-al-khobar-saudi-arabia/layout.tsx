import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Al Khobar, Saudi Arabia - Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Al Khobar, Saudi Arabia. 98% success rate. Biology-focused curriculum with Dr. Shekhar C Singh. Enroll now!',
  keywords: 'NEET coaching Al Khobar, NEET classes Saudi Arabia, biology tuition, medical entrance preparation',
  openGraph: {
    title: 'NEET Coaching in Al Khobar, Saudi Arabia - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate. Personalized biology curriculum tailored for Saudi Arabia students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-al-khobar-saudi-arabia',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-al-khobar-saudi-arabia.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Al Khobar',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Al Khobar - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate led by Dr. Shekhar C Singh.',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-al-khobar-saudi-arabia.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-al-khobar-saudi-arabia',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-neet-coaching-al-khobar-saudi-arabia">
      {children}
    </div>
  );
}
