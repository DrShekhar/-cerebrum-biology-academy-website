/**
 * /ap-biology-tutor-dps-international-gurgaon
 *
 * Per-school AP Biology feeder page for DPS International School (Gurgaon) students.
 * These schools run the IB Diploma / Cambridge / CBSE, NOT AP as a subject;
 * the page targets students self-studying AP Biology for US college
 * applications. Built from APBiologySchoolTemplate + apBiologySchools['dps-international-gurgaon'].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'dps-international-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for DPS International Students · Gurgaon · Cerebrum',
  description:
    'AP Biology tutoring for DPS International School (Gurgaon) students self-studying AP for US university applications, alongside their IB or school coursework. AIIMS-trained biology faculty, weekly FRQ feedback vs the College Board rubric, IST evening live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor DPS International',
    'AP Biology tutor DPS International School',
    'AP Biology coaching DPS International Gurgaon',
    'AP Biology DPS International US college applications',
    'AP Biology for IB students DPS International',
    'self-study AP Biology DPS International',
    'online AP Biology tutor Gurgaon',
    'AP Biology Score 5 DPS International',
    'AP Biology tutor Gurgaon international school',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorDpsInternationalGurgaonPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
