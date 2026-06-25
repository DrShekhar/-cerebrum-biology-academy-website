/**
 * /ap-biology-tutor-faridabad
 *
 * AP Biology Faridabad landing — industrial-base + multi-generational
 * business families + Greater Faridabad / NIT Faridabad / Sectors 14/
 * 15/17/19/80 residential. Schools: Manav Rachna International, DPS
 * Faridabad, Shri Ram Faridabad, Apeejay Faridabad, Modern DPS, Ryan
 * International, DAV Public, Vidya Mandir, Eicher.
 *
 * Built from APBiologyCityTemplate + apBiologyMetros[faridabad].
 * Schemas via APBiologyMetroSchemas with en-IN + IN country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SLUG = 'faridabad'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Faridabad · Manav Rachna + DPS + Shri Ram · Cerebrum',
  description:
    'AP Biology tutoring for Faridabad — Manav Rachna International, DPS Faridabad, Shri Ram Faridabad, Apeejay Faridabad, Modern DPS, Ryan International. AIIMS-trained biology faculty, weekly FRQ feedback. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'ap biology tutor faridabad',
    'ap biology tutor greater faridabad',
    'ap biology coaching faridabad',
    'ap biology manav rachna international',
    'ap biology dps faridabad',
    'ap biology shri ram school faridabad',
    'ap biology apeejay faridabad',
    'ap biology modern dps faridabad',
    'ap biology ryan international faridabad',
    'ap biology online faridabad',
    'best ap biology tutor faridabad',
    'ap biology coaching indian students us colleges',
    'ap biology nit faridabad',
    'ap biology sector 14 faridabad',
    'ap biology sector 15 faridabad',
    'ap biology sector 19 faridabad',
    'ap biology sector 80 faridabad',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
})

export default function APBiologyTutorFaridabadPage() {
  if (!metro) notFound()
  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'AP Biology Faridabad',
          'AP Biology Manav Rachna International',
          'AP Biology DPS Faridabad',
          'AP Biology Shri Ram School Faridabad',
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
