/**
 * /ap-biology-tutor-gurugram
 *
 * AP Biology Gurugram landing — Aravali corridor (Pathways Aravali,
 * Shri Ram, Heritage Xperiential, GD Goenka, Suncity, KR Mangalam,
 * Lancers) + Cyber City / DLF / Sushant Lok corridor (Pathways
 * Gurgaon, DPS International Sec 45, Scottish High, Vega, Amity).
 * Built from APBiologyCityTemplate + apBiologyMetros[gurugram].
 * Schemas emitted via APBiologyMetroSchemas with en-IN + IN country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SLUG = 'gurugram'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Gurugram · Pathways + Shri Ram + Heritage · Cerebrum',
  description:
    'AP Biology tutoring for Gurugram — Pathways Aravali, Pathways Gurgaon, Shri Ram Aravali, Heritage Xperiential, GD Goenka, DPS International Sec 45, Suncity. AIIMS-trained PhD faculty, weekly FRQ feedback. From $1,800.',
  keywords: [
    'ap biology tutor gurugram',
    'ap biology tutor gurgaon',
    'ap biology coaching gurugram',
    'ap biology pathways aravali',
    'ap biology pathways gurgaon',
    'ap biology shri ram aravali',
    'ap biology shri ram moulsari',
    'ap biology heritage xperiential',
    'ap biology gd goenka world school',
    'ap biology dps international gurgaon',
    'ap biology lancers gurgaon',
    'ap biology suncity school',
    'ap biology scottish high',
    'ap biology vega schools',
    'ap biology kr mangalam',
    'ap biology amity gurgaon',
    'ap biology online gurugram',
    'ap biology coaching indian students us colleges',
    'best ap biology tutor gurgaon',
    'ap biology cyber city',
    'ap biology dlf phase 1',
    'ap biology sushant lok',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
})

export default function APBiologyTutorGurugramPage() {
  if (!metro) notFound()
  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'AP Biology Gurugram',
          'AP Biology Gurgaon',
          'AP Biology Pathways Aravali',
          'AP Biology Shri Ram School',
          'AP Biology Heritage Xperiential',
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
