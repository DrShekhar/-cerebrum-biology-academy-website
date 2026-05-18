/**
 * /ap-biology-tutor-noida
 *
 * AP Biology Noida landing — IT-corridor demographics, Sectors 18 / 62
 * / 132 / 128 tech-employee cohort + Greater Noida + Sector 50/93
 * residential. Schools: Pathways Noida, Shiv Nadar, Step by Step,
 * Genesis Global, Lotus Valley, GD Goenka Public, Amity, DPS Noida,
 * Cambridge School, DPS Greater Noida, Khaitan, Apeejay.
 *
 * Built from APBiologyCityTemplate + apBiologyMetros[noida]. Schemas
 * via APBiologyMetroSchemas with en-IN + IN country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SLUG = 'noida'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Noida · Pathways + Shiv Nadar + Step by Step · Cerebrum',
  description:
    'AP Biology tutoring for Noida — Pathways Noida, Shiv Nadar, Step by Step, Genesis Global, Lotus Valley, GD Goenka Public, Amity, DPS Noida. AIIMS-trained PhD faculty, weekly FRQ feedback. From $1,800.',
  keywords: [
    'ap biology tutor noida',
    'ap biology tutor greater noida',
    'ap biology coaching noida',
    'ap biology pathways noida',
    'ap biology shiv nadar school noida',
    'ap biology step by step school',
    'ap biology genesis global noida',
    'ap biology lotus valley noida',
    'ap biology gd goenka public noida',
    'ap biology amity international noida',
    'ap biology dps noida sector 30',
    'ap biology cambridge school noida',
    'ap biology dps greater noida',
    'ap biology online noida',
    'best ap biology tutor noida',
    'ap biology coaching indian students us colleges',
    'ap biology sector 18 noida',
    'ap biology sector 62 noida',
    'ap biology sector 132 noida',
    'ap biology sector 50 noida',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
})

export default function APBiologyTutorNoidaPage() {
  if (!metro) notFound()
  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'AP Biology Noida',
          'AP Biology Greater Noida',
          'AP Biology Pathways Noida',
          'AP Biology Shiv Nadar School',
          'AP Biology Step by Step School',
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
