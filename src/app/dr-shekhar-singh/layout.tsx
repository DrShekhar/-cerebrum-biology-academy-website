import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dr. Shekhar C Singh - Director',
  description:
    'Meet Dr. Shekhar C Singh, AIIMS faculty and Director of Cerebrum Biology Academy. 15+ years experience, 1,50,000+ students mentored, 98% NEET success rate. Book a demo class today.',
  keywords:
    'Dr. Shekhar Singh, AIIMS faculty, NEET biology teacher, Cerebrum Biology Academy, NEET coach, biology mentor',
  openGraph: {
    title: 'Dr. Shekhar C Singh - Expert NEET Biology Educator',
    description:
      'AIIMS faculty with proven track record of 98% success rate. Mentored 1,50,000+ students to medical college admissions.',
    images: [
      {
        url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=571,fit=crop/meP3n6VKelS9LnOn/img-0034-meP3pJDRGxsyRZyy.jpg',
        width: 375,
        height: 571,
        alt: 'Dr. Shekhar C Singh - Director of Cerebrum Biology Academy',
      },
    ],
    type: 'profile',
    url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Shekhar C Singh - Expert NEET Biology Educator',
    description: 'AIIMS faculty with proven track record of 98% success rate',
    images: [
      'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=571,fit=crop/meP3n6VKelS9LnOn/img-0034-meP3pJDRGxsyRZyy.jpg',
    ],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh',
  },
}

export default function DrShekharSinghLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
