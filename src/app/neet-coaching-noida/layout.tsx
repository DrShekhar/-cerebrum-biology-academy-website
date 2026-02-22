import type { Metadata } from 'next'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Noida 2026 [1200+ Students] 98% Success | Cerebrum',
  description:
    'Top NEET biology coaching in Noida & Greater Noida. AIIMS faculty Dr. Shekhar Singh, 98% success rate, 67+ AIIMS selections. Fee Rs 48,000-98,000. Sector 18, 62, 137, 150 covered. FREE demo class!',
  keywords: [
    // Primary location keywords
    'NEET coaching Noida',
    'best NEET coaching Noida',
    'NEET coaching Greater Noida',
    'NEET coaching Greater Noida West',
    // Sector keywords
    'NEET coaching Sector 18 Noida',
    'NEET coaching Sector 62 Noida',
    'NEET coaching Sector 137 Noida',
    'NEET coaching Sector 150 Noida',
    'NEET coaching Gaur City',
    // Fee/price keywords (missing - high priority)
    'NEET coaching fee Noida',
    'affordable NEET coaching Noida',
    'NEET coaching fees Noida sector wise',
    'best value NEET coaching Noida',
    // Results/proof keywords (missing - high priority)
    'NEET toppers Noida',
    'AIIMS selection Noida',
    'NEET result Noida',
    'NEET success rate Noida',
    // Student type keywords (missing - high priority)
    'NEET dropper coaching Noida',
    'NEET foundation class 9 Noida',
    'NEET foundation class 10 Noida',
    'NEET repeater batch Noida',
    // Online/mode keywords
    'online NEET coaching Noida',
    'online vs offline NEET coaching Noida',
    // Comparison keywords
    'best vs Kota NEET coaching Noida',
    'top 10 NEET coaching Noida',
    // School proximity keywords
    'NEET coaching near DPS Noida',
    'NEET coaching near Amity Noida',
    // Metro keywords
    'NEET coaching near Botanical Garden metro',
    'NEET coaching Aqua Line Noida',
    // Voice search keywords
    'where is best NEET coaching in Noida',
    'how much NEET coaching cost Noida',
  ].join(', '),
  openGraph: {
    title: 'Best NEET Coaching in Noida 2025 [1200+ Students]',
    description:
      'Top NEET biology coaching in Noida with 98% success rate. AIIMS faculty, small batches. Join 1,200+ students from all Noida sectors.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/api/og?title=Best+NEET+Coaching+in+Noida&subtitle=98%25+Success+Rate+%E2%80%A2+AIIMS+Faculty&locality=Noida',
        width: 1200,
        height: 630,
        alt: 'Best NEET Coaching in Noida - Cerebrum Biology Academy',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Noida | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Noida. 98% success rate. All sectors covered - Sector 18, 62, 137, 150, Greater Noida West.',
    images: ['/api/og?title=Best+NEET+Coaching+in+Noida&subtitle=98%25+Success+Rate&locality=Noida'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
  },
}

export default function NoidaCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NearMeKeywordInjector
        location="Noida"
        parentLocation="Delhi NCR"
        centerAddress="B-45, Sector 62, Noida, Uttar Pradesh - 201301"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['Sector 18', 'Sector 62', 'Sector 137', 'Sector 150', 'Greater Noida', 'Greater Noida West', 'Gaur City', 'Pari Chowk']}
      />
    </>
  )
}
