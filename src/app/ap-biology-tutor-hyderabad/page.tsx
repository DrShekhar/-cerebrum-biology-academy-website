/**
 * /ap-biology-tutor-hyderabad
 *
 * AP Biology India metro page targeting Hyderabad + Gachibowli +
 * Madhapur + Banjara Hills (Oakridge Gachibowli/Bachupally, CHIREC,
 * Indus, Glendale, Sancta Maria, ISH, Aga Khan Academy, Silver Oaks,
 * HPS Begumpet, Phoenix Greens, Manthan, Jubilee Hills Public School).
 * Built from APBiologyCityTemplate + apBiologyMetros[hyderabad].
 * Schemas emitted via APBiologyMetroSchemas with en-IN + IN country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'hyderabad'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Hyderabad · Oakridge + CHIREC · Cerebrum',
  description:
    'AP Biology tutoring for Hyderabad — Oakridge Gachibowli, CHIREC, Indus, Glendale, Sancta Maria, ISH, Aga Khan. AIIMS-trained PhD faculty, IST live. From $1,800.',
  keywords: [
    'ap biology tutor hyderabad',
    'ap biology coaching hyderabad',
    'ap biology oakridge gachibowli',
    'ap biology oakridge bachupally',
    'ap biology chirec kondapur',
    'ap biology indus international hyderabad',
    'ap biology glendale academy',
    'ap biology sancta maria',
    'ap biology international school of hyderabad',
    'ap biology aga khan academy hyderabad',
    'ap biology silver oaks',
    'ap biology hyderabad public school',
    'ap biology phoenix greens',
    'ap biology tutor gachibowli',
    'ap biology tutor madhapur',
    'ap biology tutor banjara hills',
    'ap biology tutor hitech city',
    'ap biology coaching indian students us colleges',
    'ap biology online india',
    'best ap biology tutor india',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
})

export default function APBiologyTutorHyderabadPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas
        metro={metro}
        inLanguage="en-IN"
        addressCountry="IN"
        availableLanguage={['English', 'Hindi']}
      />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
