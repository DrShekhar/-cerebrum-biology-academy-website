import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Al Ain, UAE - Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Al Ain, UAE. 98% success rate. Biology-focused curriculum with Dr. Shekhar C Singh. Enroll now!',
  keywords: 'NEET coaching Al Ain, NEET classes UAE, biology tuition, medical entrance preparation',
  openGraph: {
    title: 'NEET Coaching in Al Ain, UAE - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate. Personalized biology curriculum tailored for UAE students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-al-ain-uae',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-al-ain-uae.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Al Ain',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Al Ain - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate led by Dr. Shekhar C Singh.',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-al-ain-uae.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-al-ain-uae',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-neet-coaching-al-ain-uae">
      {children}
    </div>
  );
}
