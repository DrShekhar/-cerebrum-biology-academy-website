/**
 * /ap-biology-tutor-shri-ram-aravali
 *
 * Per-school AP Biology feeder page for The Shri Ram School Aravali (Gurgaon) students.
 * These schools run the IB Diploma / Cambridge / CBSE, NOT AP as a subject;
 * the page targets students self-studying AP Biology for US college
 * applications. Built from APBiologySchoolTemplate + apBiologySchools['shri-ram-aravali'].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'shri-ram-aravali'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for TSRS Aravali Students · Gurgaon · Cerebrum',
  description:
    'AP Biology tutoring for The Shri Ram School Aravali (Gurgaon) students self-studying AP for US university applications, alongside their IB or school coursework. AIIMS-trained biology faculty, weekly FRQ feedback vs the College Board rubric, IST evening live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor TSRS Aravali',
    'AP Biology tutor The Shri Ram School Aravali',
    'AP Biology coaching TSRS Aravali Gurgaon',
    'AP Biology TSRS Aravali US college applications',
    'AP Biology for IB students TSRS Aravali',
    'self-study AP Biology TSRS Aravali',
    'online AP Biology tutor Gurgaon',
    'AP Biology Score 5 TSRS Aravali',
    'AP Biology tutor Gurgaon international school',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorShriRamAravaliGurgaonPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
