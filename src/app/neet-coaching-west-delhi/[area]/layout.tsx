import type { Metadata } from 'next'

type Props = {
  params: Promise<{ area: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params
  const areaName = area.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `NEET Coaching in ${areaName}, West Delhi | Cerebrum Biology Academy`,
    description: `Best NEET coaching in ${areaName}, West Delhi with AIIMS faculty. 98% success rate, small batches. Book FREE demo class today!`,
    keywords: `NEET coaching ${areaName}, biology coaching ${areaName} West Delhi, NEET classes ${areaName}, medical coaching West Delhi`,
    openGraph: {
      title: `NEET Coaching in ${areaName} | Cerebrum Biology Academy`,
      description: `Top NEET coaching in ${areaName}, West Delhi. Expert AIIMS faculty, personalized attention, proven results.`,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-west-delhi/${area}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-west-delhi/${area}`,
    },
  }
}

export default function AreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
