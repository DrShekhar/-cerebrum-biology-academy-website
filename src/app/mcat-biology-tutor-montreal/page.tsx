import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMCATMetro } from '@/data/mcat/metros'
import MCATBiologyCityTemplate from '@/components/mcat/MCATBiologyCityTemplate'

const SLUG = 'montreal'
const metro = getMCATMetro(SLUG)

export const metadata: Metadata = metro
  ? {
      title: metro.metaTitle,
      description: metro.metaDescription,
      keywords: metro.keywords,
      alternates: { canonical: `https://cerebrumbiologyacademy.com/mcat-biology-tutor-${SLUG}` },
      openGraph: {
        title: `${metro.metaTitle} | Cerebrum Biology Academy`,
        description: metro.metaDescription,
        url: `https://cerebrumbiologyacademy.com/mcat-biology-tutor-${SLUG}`,
        locale: 'en_CA',
        type: 'website',
      },
    }
  : {}

export default function Page() {
  if (!metro) notFound()
  return <MCATBiologyCityTemplate metro={metro} />
}
