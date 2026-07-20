/**
 * /ap-biology-tutor-scottish-high-gurgaon
 *
 * Per-school AP Biology feeder page for Scottish High International School (Gurgaon) students.
 * These schools run the IB Diploma / Cambridge / CBSE, NOT AP as a subject;
 * the page targets students self-studying AP Biology for US college
 * applications. Built from APBiologySchoolTemplate + apBiologySchools['scottish-high-gurgaon'].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'scottish-high-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Scottish High Students · Gurgaon · Cerebrum',
  description:
    'AP Biology tutoring for Scottish High International School (Gurgaon) students self-studying AP for US university applications, alongside their IB or school coursework. AIIMS-trained biology faculty, weekly FRQ feedback vs the College Board rubric, IST evening live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Scottish High',
    'AP Biology tutor Scottish High International School',
    'AP Biology coaching Scottish High Gurgaon',
    'AP Biology Scottish High US college applications',
    'AP Biology for IB students Scottish High',
    'self-study AP Biology Scottish High',
    'online AP Biology tutor Gurgaon',
    'AP Biology Score 5 Scottish High',
    'AP Biology tutor Gurgaon international school',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorScottishHighGurgaonPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
