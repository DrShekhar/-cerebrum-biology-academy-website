/**
 * /ap-biology-tutor-lancers-gurgaon
 *
 * Per-school AP Biology feeder page for Lancers International School (Gurgaon).
 * Lancers runs the IB Diploma / Cambridge, NOT AP as a subject; the page
 * targets students self-studying AP Biology for US college applications.
 * Built from APBiologySchoolTemplate + apBiologySchools['lancers-gurgaon'].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'lancers-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Lancers International Students · Gurgaon · Cerebrum',
  description:
    'AP Biology tutoring for Lancers International School (Gurgaon) students self-studying AP for US university applications, alongside their IB coursework. AIIMS-trained faculty, weekly FRQ feedback vs the College Board rubric, IST evening live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Lancers International',
    'AP Biology tutor Lancers International School',
    'AP Biology coaching Lancers International Gurgaon',
    'AP Biology Lancers International US college applications',
    'AP Biology for IB students Lancers International',
    'self-study AP Biology Lancers International',
    'online AP Biology tutor Gurgaon',
    'AP Biology Score 5 Lancers International',
    'AP Biology tutor Gurgaon international school',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorLancersGurgaonPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
