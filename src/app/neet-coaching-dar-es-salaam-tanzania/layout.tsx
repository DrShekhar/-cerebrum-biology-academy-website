import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Dar es Salaam, Tanzania',
  description: 'Expert NEET coaching in Dar es Salaam, Tanzania. 98% success rate. Biology-focused curriculum with Dr. Shekhar C Singh. Enroll now!',
  keywords: 'NEET coaching Dar es Salaam, NEET classes Tanzania, biology tuition, medical entrance preparation',
  openGraph: {
    title: 'NEET Coaching in Dar es Salaam, Tanzania',
    description: 'Expert NEET coaching with 98% success rate. Personalized biology curriculum tailored for Tanzania students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dar-es-salaam-tanzania',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-dar-es-salaam-tanzania.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Dar es Salaam',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Dar es Salaam',
    description: 'Expert NEET coaching with 98% success rate led by Dr. Shekhar C Singh.',
    images: ['https://cerebrumbiologyacademy.com/og-neet-coaching-dar-es-salaam-tanzania.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dar-es-salaam-tanzania',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-neet-coaching-dar-es-salaam-tanzania">
      {children}
    </div>
  );
}
