import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in OMR Chennai | Sholinganallur, Perungudi | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in OMR IT Corridor, Chennai. 94.2% success rate, AIIMS faculty. Perungudi, Thoraipakkam, Sholinganallur, Navalur, Siruseri. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching OMR, NEET biology coaching OMR Chennai, best NEET coaching Sholinganallur, NEET classes Perungudi, biology coaching Thoraipakkam, NEET tuition Navalur, NEET coaching IT corridor Chennai, premium NEET coaching tech families, DPS OMR NEET coaching, SBOA NEET prep, Velammal NEET preparation',
  openGraph: {
    title: 'Best NEET Coaching in OMR Chennai | IT Corridor | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in OMR IT Corridor with 94.2% success rate. AIIMS faculty, tech-forward platform. Perfect for IT families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-omr-chennai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in OMR Chennai | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in OMR IT Corridor. 94.2% success rate. Perungudi, Sholinganallur, Navalur.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-omr-chennai',
  },
}

export default function OMRChennaiCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
