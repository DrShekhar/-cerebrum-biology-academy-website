/**
 * /ap-biology-tutor-mission-san-jose
 *
 * Per-school feeder page for Mission San Jose High School students
 * (Fremont, CA). Built from APBiologySchoolTemplate +
 * apBiologySchools[mission-san-jose].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'mission-san-jose'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title:
    'AP Biology Tutor for Mission San Jose High School Students | Fremont CA | Cerebrum Academy',
  description:
    'AP Biology tutoring for Mission San Jose High School students (Fremont, CA) — PhD biology faculty, FRQ rubric mastery, integrated AP-5 + USABO Semifinal track. Pacific Time. From $1,800.',
  keywords: [
    'AP Biology tutor Mission San Jose',
    'AP Biology tutor Mission San Jose High School',
    'AP Bio tutor MSJ Fremont',
    'Mission San Jose USABO tutor',
    'MSJ biology olympiad coach',
    'AP Biology Score 5 Mission San Jose',
    'MSJ private biology tutor',
    'online AP Biology tutor Mission San Jose',
    'Mission San Jose pre-med biology coaching',
    'UC Berkeley pre-med prep MSJ',
    'Stanford pre-med prep Mission San Jose',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorMissionSanJosePage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
