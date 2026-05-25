import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUSMLEMetro } from '@/data/usmle-step-1/metros'
import USMLEStep1CityTemplate from '@/components/usmle/USMLEStep1CityTemplate'

const SLUG = 'mumbai'
const metro = getUSMLEMetro(SLUG)

export const metadata: Metadata = metro
  ? {
      title: metro.metaTitle,
      description: metro.metaDescription,
      keywords: metro.keywords,
      alternates: { canonical: `https://cerebrumbiologyacademy.com/usmle-step-1-tutor-${SLUG}` },
      openGraph: {
        title: `${metro.metaTitle} | Cerebrum Biology Academy`,
        description: metro.metaDescription,
        url: `https://cerebrumbiologyacademy.com/usmle-step-1-tutor-${SLUG}`,
        locale: 'en_IN',
        type: 'website',
      },
    }
  : {}

export default function Page() {
  if (!metro) notFound()
  return <USMLEStep1CityTemplate metro={metro} />
}
