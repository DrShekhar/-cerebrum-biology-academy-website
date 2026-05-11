/**
 * /ap-biology-tutor-singapore
 *
 * AP Biology APAC metro page targeting Singapore — anchored on
 * Singapore American School (SAS) and Stamford American (SAIS), with
 * feeder demand from GEMS World Academy, Hwa Chong International, NPS
 * International, UWC Dover/East, and ISS. Built from
 * APBiologyCityTemplate + apBiologyMetros[singapore]. Schemas emitted
 * via APBiologyMetroSchemas with en-SG locale + SG country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'singapore'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Singapore · SAS + SAIS + UWC · Cerebrum',
  description:
    'AP Biology tutoring for Singapore — SAS, Stamford American (SAIS), GEMS, Hwa Chong International, UWC, ISS. PhD faculty, FRQ mastery, SGT live classes.',
  keywords: [
    'ap biology tutor singapore',
    'ap biology coaching singapore',
    'ap biology sas',
    'ap biology singapore american school',
    'ap biology stamford american',
    'ap biology sais singapore',
    'ap biology gems world academy singapore',
    'ap biology hwa chong international',
    'ap biology nps international singapore',
    'ap biology uwc singapore',
    'ap biology iss international school',
    'ap biology tanglin trust',
    'ap biology chatsworth international',
    'ap biology online singapore',
    'ap biology frq tutor singapore',
    'best ap biology tutor singapore',
    'ap biology tutor woodlands singapore',
    'ap biology tutor bukit timah',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorSingaporePage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} inLanguage="en-SG" addressCountry="SG" />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
