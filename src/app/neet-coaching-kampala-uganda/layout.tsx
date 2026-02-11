import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Kampala, Uganda - Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Kampala, Uganda. 98% success rate. Biology-focused curriculum with Dr. Shekhar C Singh. Enroll now!',
  keywords: 'NEET coaching Kampala, NEET classes Uganda, biology tuition, medical entrance preparation',
  openGraph: {
    title: 'NEET Coaching in Kampala, Uganda - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate. Personalized biology curriculum tailored for Uganda students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kampala-uganda',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-kampala-uganda.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Kampala',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Kampala - Cerebrum Biology Academy',
    description: 'Expert NEET coaching with 98% success rate led by Dr. Shekhar C Singh.',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-kampala-uganda.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kampala-uganda',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-neet-coaching-kampala-uganda">
      {children}
    </div>
  );
}
