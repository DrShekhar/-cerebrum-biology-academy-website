/**
 * /ib-biology-tutor-shikshantar-gurgaon
 *
 * Per-school IB Biology landing page for Shikshantar School (Sector 31,
 * Gurugram). Co-educational day school founded 1986 — one of the oldest
 * established schools in Gurgaon, predating the city's IB-school boom by
 * 15–25 years. CBSE primary curriculum through Class 10; IB DP option at
 * Classes 11–12. Distinctive identity around music + performing arts.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['shikshantar-gurgaon'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Shikshantar" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'shikshantar-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Shikshantar School · Gurgaon · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Shikshantar School (Sector 31 Gurgaon) students. CBSE-to-IB bridge, IA + EE mentorship, schedule flexibility for music & performing-arts students. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Shikshantar',
    'IB Biology tutor Shikshantar School',
    'IB Biology coaching Shikshantar Gurgaon',
    'IB Biology HL tutor Shikshantar',
    'IB Biology SL tutor Shikshantar',
    'IB Biology IA help Shikshantar',
    'Shikshantar IB Biology tutoring',
    'IB Biology examiner Shikshantar Gurgaon',
    'IB Biology tutor Sector 31 Gurgaon',
    'IB Biology tutor near Shikshantar School',
    'CBSE to IB Biology Shikshantar',
    'online IB Biology tutor Gurgaon',
    'IB+NEET coaching Shikshantar',
    'IB Biology tutor for music students Gurgaon',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
})

export default function Page() {
  if (!school) notFound()
  return (
    <>
      <IBBiologySchoolSchemas school={school} />
      <IBBiologySchoolTemplate school={school} />
    </>
  )
}
