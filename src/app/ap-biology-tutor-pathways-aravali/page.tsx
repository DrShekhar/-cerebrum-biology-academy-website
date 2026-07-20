/**
 * /ap-biology-tutor-pathways-aravali
 *
 * Per-school AP Biology feeder page for Pathways World School Aravali (Gurgaon) students.
 * These schools run the IB Diploma / Cambridge / CBSE, NOT AP as a subject;
 * the page targets students self-studying AP Biology for US college
 * applications. Built from APBiologySchoolTemplate + apBiologySchools['pathways-aravali'].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'pathways-aravali'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Pathways Aravali Students · Gurgaon · Cerebrum',
  description:
    'AP Biology tutoring for Pathways World School Aravali (Gurgaon) students self-studying AP for US university applications, alongside their IB or school coursework. AIIMS-trained biology faculty, weekly FRQ feedback vs the College Board rubric, IST evening live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Pathways Aravali',
    'AP Biology tutor Pathways World School Aravali',
    'AP Biology coaching Pathways Aravali Gurgaon',
    'AP Biology Pathways Aravali US college applications',
    'AP Biology for IB students Pathways Aravali',
    'self-study AP Biology Pathways Aravali',
    'online AP Biology tutor Gurgaon',
    'AP Biology Score 5 Pathways Aravali',
    'AP Biology tutor Gurgaon international school',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorPathwaysAravaliGurgaonPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
