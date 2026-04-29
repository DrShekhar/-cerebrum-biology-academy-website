/**
 * /ap-biology-tutor-walter-payton
 *
 * Per-school feeder page for Walter Payton College Preparatory High
 * School students (Chicago). Built from APBiologySchoolTemplate +
 * apBiologySchools[walter-payton].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'walter-payton'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title:
    'AP Biology Tutor for Walter Payton College Prep Students | Chicago Selective Enrollment | Cerebrum Academy',
  description:
    'AP Biology tutoring for Walter Payton College Prep students (Chicago). PhD biology faculty, FRQ rubric mastery, USABO Semifinal track. Central Time live classes. From $1,800.',
  keywords: [
    'AP Biology tutor Walter Payton',
    'AP Biology tutor Walter Payton College Prep',
    'AP Bio tutor Walter Payton Chicago',
    'Walter Payton USABO tutor',
    'Walter Payton biology olympiad coach',
    'AP Biology Score 5 Walter Payton',
    'Walter Payton private biology tutor',
    'online AP Biology tutor Walter Payton',
    'Walter Payton pre-med biology coaching',
    'Northwestern HPME prep Walter Payton',
    'U Chicago pre-med prep Walter Payton',
    'Chicago selective enrollment biology tutor',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorWalterPaytonPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
