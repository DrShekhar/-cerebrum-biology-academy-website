import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGAMSATMetro } from '@/data/gamsat/metros'
import GAMSATBiologyCityTemplate from '@/components/gamsat/GAMSATBiologyCityTemplate'

const SLUG = 'wellington'
const metro = getGAMSATMetro(SLUG)

export const metadata: Metadata = metro
  ? {
      title: metro.metaTitle,
      description: metro.metaDescription,
      keywords: metro.keywords,
      alternates: { canonical: `https://cerebrumbiologyacademy.com/gamsat-biology-tutor-${SLUG}` },
      openGraph: {
        title: `${metro.metaTitle} | Cerebrum Biology Academy`,
        description: metro.metaDescription,
        url: `https://cerebrumbiologyacademy.com/gamsat-biology-tutor-${SLUG}`,
        locale: 'en_NZ',
        type: 'website',
      },
    }
  : {}

export default function Page() {
  if (!metro) notFound()
  return <GAMSATBiologyCityTemplate metro={metro} />
}
