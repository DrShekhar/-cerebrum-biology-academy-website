import type { Metadata } from 'next'
import IBOCountryTemplate from '@/components/ibo/IBOCountryTemplate'
import { IBO_COUNTRY_BY_SLUG } from '@/data/ibo/iboCountries'

const country = IBO_COUNTRY_BY_SLUG['uk']
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const url = `${SITE_URL}/ibo-coaching-uk`

export const metadata: Metadata = {
  title: `IBO Coaching in ${country.country} | ${country.nationalOlympiad} → International Biology Olympiad`,
  description: `International Biology Olympiad (IBO) preparation for ${country.country} students via the ${country.nationalOlympiadFull} (${country.nationalOlympiad}) route. AIIMS-trained faculty, ${country.timezone} live classes, Campbell-based depth. Free assessment.`,
  keywords: [
    `IBO coaching ${country.country}`,
    `IBO ${country.country} team selection`,
    `${country.nationalOlympiad} coaching`,
    `biology olympiad ${country.country}`,
    `international biology olympiad ${country.country}`,
    `${country.nationalOlympiad} to IBO`,
  ],
  alternates: { canonical: url },
  openGraph: {
    title: `IBO Coaching in ${country.country} · Cerebrum Biology Academy`,
    description: `IBO preparation for ${country.country} students via ${country.nationalOlympiad}. AIIMS-trained faculty, ${country.timezone} live classes.`,
    url,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `IBO Coaching in ${country.country} | ${country.nationalOlympiad} → IBO`,
    description: `International Biology Olympiad prep for ${country.country} via ${country.nationalOlympiad}, AIIMS-trained faculty.`,
  },
  robots: 'index, follow, max-image-preview:large',
}

export default function Page() {
  return <IBOCountryTemplate country={country} />
}
