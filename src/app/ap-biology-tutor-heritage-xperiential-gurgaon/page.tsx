/**
 * /ap-biology-tutor-heritage-xperiential-gurgaon
 *
 * Per-school AP Biology feeder page for Heritage Xperiential Learning School (Gurgaon) students.
 * These schools run the IB Diploma / Cambridge / CBSE, NOT AP as a subject;
 * the page targets students self-studying AP Biology for US college
 * applications. Built from APBiologySchoolTemplate + apBiologySchools['heritage-xperiential-gurgaon'].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'heritage-xperiential-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Heritage Xperiential Students · Gurgaon · Cerebrum',
  description:
    'AP Biology tutoring for Heritage Xperiential Learning School (Gurgaon) students self-studying AP for US university applications, alongside their IB or school coursework. AIIMS-trained biology faculty, weekly FRQ feedback vs the College Board rubric, IST evening live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Heritage Xperiential',
    'AP Biology tutor Heritage Xperiential Learning School',
    'AP Biology coaching Heritage Xperiential Gurgaon',
    'AP Biology Heritage Xperiential US college applications',
    'AP Biology for IB students Heritage Xperiential',
    'self-study AP Biology Heritage Xperiential',
    'online AP Biology tutor Gurgaon',
    'AP Biology Score 5 Heritage Xperiential',
    'AP Biology tutor Gurgaon international school',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorHeritageXperientialGurgaonPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
