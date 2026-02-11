import type { Metadata } from 'next'

type Props = {
  params: Promise<{ area: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params
  const areaName = area.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `NEET Coaching in ${areaName}, East Delhi | Cerebrum Biology Academy`,
    description: `Best NEET coaching in ${areaName}, East Delhi with AIIMS faculty. 98% success rate, small batches. Book FREE demo class today!`,
    keywords: `NEET coaching ${areaName}, biology coaching ${areaName} East Delhi, NEET classes ${areaName}, medical coaching East Delhi`,
    openGraph: {
      title: `NEET Coaching in ${areaName} | Cerebrum Biology Academy`,
      description: `Top NEET coaching in ${areaName}, East Delhi. Expert AIIMS faculty, personalized attention, proven results.`,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-east-delhi/${area}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in ${areaName}, East Delhi | Cerebrum Biology Academy',
    description: 'Best NEET coaching in ${areaName}, East Delhi with AIIMS faculty. 98% success rate, small batches.',
  },
  alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-east-delhi/${area}`,
    },
  }
}

export default function AreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
