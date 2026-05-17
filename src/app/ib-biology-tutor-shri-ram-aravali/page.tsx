/**
 * /ib-biology-tutor-shri-ram-aravali
 *
 * Per-school IB Biology landing page for The Shri Ram School Aravali
 * (Sector V-37, Gurgaon). The senior IB Diploma campus of the TSRS
 * group; Moulsari (Sector 46) operates the MYP feed.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['shri-ram-aravali'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Shri Ram Aravali" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'shri-ram-aravali'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for The Shri Ram School Aravali · Gurgaon · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for The Shri Ram School Aravali (TSRS) students, Sector V-37 Gurgaon. Examiner-led faculty, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Shri Ram Aravali',
    'IB Biology tutor TSRS Aravali',
    'IB Biology coaching Shri Ram School Aravali',
    'IB Biology HL tutor Shri Ram Aravali',
    'IB Biology SL tutor Shri Ram Aravali',
    'IB Biology IA help Shri Ram Aravali',
    'TSRS Aravali IB Biology tutoring',
    'IB Biology examiner Shri Ram Aravali Gurgaon',
    'IB Biology tutor Sector V-37 Gurugram',
    'IB Biology tutor near Shri Ram School Aravali',
    'online IB Biology tutor Gurgaon',
    'IB+NEET coaching TSRS Aravali',
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
