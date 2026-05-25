import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDATMetro } from '@/data/dat/metros'
import DATBiologyCityTemplate from '@/components/dat/DATBiologyCityTemplate'

const SLUG = 'houston'
const metro = getDATMetro(SLUG)

export const metadata: Metadata = metro
  ? {
      title: metro.metaTitle,
      description: metro.metaDescription,
      keywords: metro.keywords,
      alternates: { canonical: `https://cerebrumbiologyacademy.com/dat-biology-tutor-${SLUG}` },
      openGraph: {
        title: `${metro.metaTitle} | Cerebrum Biology Academy`,
        description: metro.metaDescription,
        url: `https://cerebrumbiologyacademy.com/dat-biology-tutor-${SLUG}`,
        locale: 'en_US',
        type: 'website',
      },
    }
  : {}

export default function Page() {
  if (!metro) notFound()
  return <DATBiologyCityTemplate metro={metro} />
}
