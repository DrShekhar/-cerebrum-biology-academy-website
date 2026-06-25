/**
 * /ap-biology-tutor-dubai
 *
 * AP Biology UAE metro page targeting Dubai + JLT + Dubai Hills +
 * Downtown + Marina (and the cross-emirate American/British cluster).
 * Built from APBiologyCityTemplate + apBiologyMetros[dubai]. Schemas
 * emitted via APBiologyMetroSchemas with en-AE locale + AE country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'dubai'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Dubai · GEMS DAA + Universal · Cerebrum',
  description:
    'AP Biology tutoring for Dubai — GEMS DAA, Universal American, ASD, Repton, Nord Anglia. AIIMS-trained faculty, FRQ mastery, GST live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'ap biology tutor dubai',
    'ap biology coaching uae',
    'ap biology tutor jlt',
    'ap biology tutor dubai hills',
    'ap biology gems dubai american academy',
    'ap biology universal american school',
    'ap biology tutor american school of dubai',
    'ap biology repton dubai',
    'ap biology nord anglia dubai',
    'ap biology jess dubai',
    'ap biology online uae',
    'ap biology frq tutor dubai',
    'ap capstone diploma tutor dubai',
    'usabo tutor dubai',
    'best ap biology tutor uae',
    'ap biology tutor downtown dubai',
    'ap biology tutor dubai marina',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-AE',
})

export default function APBiologyTutorDubaiPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} inLanguage="en-AE" addressCountry="AE" />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
