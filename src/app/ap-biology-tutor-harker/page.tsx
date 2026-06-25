/**
 * /ap-biology-tutor-harker
 *
 * Per-school feeder page for The Harker School students (San Jose, CA).
 * Built from APBiologySchoolTemplate + apBiologySchools[harker].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'harker'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Harker School Students · San Jose · Cerebrum',
  description:
    'AP Biology tutoring for Harker Upper School students — AIIMS-trained faculty, FRQ mastery, AP-5 + USABO Semifinal track. PT live, fits Stanford/UCSF research. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Harker',
    'AP Biology tutor Harker School',
    'AP Bio tutor Harker San Jose',
    'Harker School USABO tutor',
    'Harker biology olympiad coach',
    'AP Biology Score 5 Harker',
    'Harker private biology tutor',
    'online AP Biology tutor Harker',
    'Harker pre-med biology coaching',
    'Stanford pre-med prep Harker',
    'Harker Mitra Family Endowment research',
    'Harker BS/MD prep',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorHarkerPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
