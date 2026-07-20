/**
 * /ap-biology-tutor-gd-goenka-world-gurgaon
 *
 * Per-school AP Biology feeder page for GD Goenka World School (Gurgaon) students.
 * These schools run the IB Diploma / Cambridge / CBSE, NOT AP as a subject;
 * the page targets students self-studying AP Biology for US college
 * applications. Built from APBiologySchoolTemplate + apBiologySchools['gd-goenka-world-gurgaon'].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'gd-goenka-world-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for GD Goenka World Students · Gurgaon · Cerebrum',
  description:
    'AP Biology tutoring for GD Goenka World School (Gurgaon) students self-studying AP for US university applications, alongside their IB or school coursework. AIIMS-trained biology faculty, weekly FRQ feedback vs the College Board rubric, IST evening live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor GD Goenka World',
    'AP Biology tutor GD Goenka World School',
    'AP Biology coaching GD Goenka World Gurgaon',
    'AP Biology GD Goenka World US college applications',
    'AP Biology for IB students GD Goenka World',
    'self-study AP Biology GD Goenka World',
    'online AP Biology tutor Gurgaon',
    'AP Biology Score 5 GD Goenka World',
    'AP Biology tutor Gurgaon international school',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorGdGoenkaWorldGurgaonPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
