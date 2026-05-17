import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
/**
 * /ap-biology-tutor-delhi-ncr
 *
 * AP Biology India metro page targeting Delhi + Gurgaon + Noida +
 * Faridabad (AES Delhi, Pathways, Sanskriti, Vasant Valley, Modern,
 * Shri Ram, British School, DPS International, GD Goenka, Heritage,
 * Lancers). Cerebrum's South Extension hub sits 4 km from AIIMS Delhi.
 * Built from APBiologyCityTemplate + apBiologyMetros[delhi-ncr].
 * Schemas emitted via APBiologyMetroSchemas with en-IN + IN country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SLUG = 'delhi-ncr'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Delhi NCR · AES + Pathways · Cerebrum',
  description:
    'AP Biology tutoring for Delhi NCR — AES, Pathways, Sanskriti, Vasant Valley, Modern, DPS International. AIIMS-trained PhD faculty, FRQ mastery. From $1,800.',
  keywords: [
    'ap biology tutor delhi',
    'ap biology coaching delhi ncr',
    'ap biology american embassy school',
    'ap biology aes delhi',
    'ap biology pathways world school',
    'ap biology pathways gurgaon',
    'ap biology pathways noida',
    'ap biology sanskriti school',
    'ap biology vasant valley',
    'ap biology modern school',
    'ap biology shri ram school',
    'ap biology dps international',
    'ap biology british school new delhi',
    'ap biology gd goenka world school',
    'ap biology heritage xperiential',
    'ap biology lancers international',
    'ap biology tutor gurgaon',
    'ap biology tutor noida',
    'ap biology coaching indian students us colleges',
    'ap biology online india',
    'best ap biology tutor india',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorDelhiNCRPage() {
  if (!metro) notFound()
  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={['NEET Delhi NCR', 'NEET Biology Delhi NCR', 'Medical entrance coaching Delhi NCR']}
      />
      <DelhiAreaSchema pageSlug="ap-biology-tutor-delhi-ncr" />
      <APBiologyMetroSchemas
        metro={metro}
        inLanguage="en-IN"
        addressCountry="IN"
        availableLanguage={['English', 'Hindi']}
      />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
