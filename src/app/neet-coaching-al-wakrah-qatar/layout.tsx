import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Al Wakrah, Qatar - Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Al Wakrah, Qatar. 98% success rate. Biology-focused curriculum with Dr. Shekhar C Singh. Enroll now!',
  keywords: 'NEET coaching Al Wakrah, NEET classes Qatar, biology tuition, medical entrance preparation',
  openGraph: {
    title: 'NEET Coaching in Al Wakrah, Qatar - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate. Personalized biology curriculum tailored for Qatar students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-al-wakrah-qatar',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-al-wakrah-qatar.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Al Wakrah',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Al Wakrah - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate led by Dr. Shekhar C Singh.',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-al-wakrah-qatar.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-al-wakrah-qatar',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-neet-coaching-al-wakrah-qatar">
      {children}
    </div>
  );
}
