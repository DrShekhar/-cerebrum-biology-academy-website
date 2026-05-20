/**
 * /ap-biology-tutor-ghaziabad
 *
 * AP Biology Ghaziabad landing — east NCR cluster (Indirapuram +
 * Vaishali + Vasundhara + Kaushambi + Crossings Republik). Schools:
 * Seth Anandram Jaipuria Vasundhara, Cambridge School Indirapuram,
 * DPS Indirapuram, KR Mangalam Vaishali, Amity Vasundhara, GD Goenka
 * Vasundhara, Sapphire International, Ahlcon International, DAV,
 * St. Mary's, Khaitan Vaishali.
 *
 * Built from APBiologyCityTemplate + apBiologyMetros[ghaziabad].
 * Schemas via APBiologyMetroSchemas with en-IN + IN country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SLUG = 'ghaziabad'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Ghaziabad · Jaipuria + Cambridge + DPS Indirapuram · Cerebrum',
  description:
    'AP Biology tutoring for Ghaziabad — Seth Anandram Jaipuria, Cambridge School Indirapuram, DPS Indirapuram, KR Mangalam Vaishali, Amity Vasundhara, GD Goenka Vasundhara. AIIMS-trained PhD faculty, weekly FRQ feedback. From $1,800.',
  keywords: [
    'ap biology tutor ghaziabad',
    'ap biology tutor indirapuram',
    'ap biology tutor vaishali',
    'ap biology tutor vasundhara',
    'ap biology coaching ghaziabad',
    'ap biology seth anandram jaipuria',
    'ap biology cambridge school indirapuram',
    'ap biology dps indirapuram',
    'ap biology kr mangalam vaishali',
    'ap biology amity vasundhara',
    'ap biology gd goenka vasundhara',
    'ap biology online ghaziabad',
    'best ap biology tutor ghaziabad',
    'ap biology coaching indian students us colleges',
    'ap biology crossings republik',
    'ap biology kaushambi',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
})

export default function APBiologyTutorGhaziabadPage() {
  if (!metro) notFound()
  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'AP Biology Ghaziabad',
          'AP Biology Indirapuram',
          'AP Biology Seth Anandram Jaipuria',
          'AP Biology Cambridge School Indirapuram',
          'AP Biology DPS Indirapuram',
          'US college admissions biology coaching India',
        ]}
        jobTitle="Founder & Lead AP Biology Faculty — AIIMS Alumnus"
      />
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
