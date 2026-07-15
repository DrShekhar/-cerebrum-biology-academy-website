import type { Metadata } from 'next'
import { IBCountryHubPage } from '@/components/seo/IBCountryHubPage'
import { getCountryHub } from '@/data/ib-biology/countryHubs'

const hub = getCountryHub('usa')!

export const metadata: Metadata = {
  title: hub.metaTitle,
  description: hub.metaDescription,
  keywords: hub.keywords.join(', '),
  alternates: { canonical: `https://cerebrumbiologyacademy.com/ib-biology-tutor-usa` },
  openGraph: {
    title: hub.metaTitle,
    description: hub.metaDescription,
    type: 'website',
    locale: 'en_IN',
    url: `https://cerebrumbiologyacademy.com/ib-biology-tutor-usa`,
  },
  twitter: {
    card: 'summary_large_image',
    title: hub.metaTitle,
    description: hub.metaDescription,
  },
}

export default function Page() {
  return <IBCountryHubPage hub={hub} />
}
