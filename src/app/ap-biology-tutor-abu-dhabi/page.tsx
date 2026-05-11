/**
 * /ap-biology-tutor-abu-dhabi
 *
 * AP Biology UAE metro page targeting Abu Dhabi Island + Saadiyat +
 * Khalifa City + Yas Island (American/Aldar/British clusters). Built
 * from APBiologyCityTemplate + apBiologyMetros[abu-dhabi]. Schemas
 * emitted via APBiologyMetroSchemas with en-AE locale + AE country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'abu-dhabi'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Abu Dhabi · ACS + GEMS · Cerebrum',
  description:
    'AP Biology tutoring for Abu Dhabi — GEMS American Academy, ACS, Cranleigh, Aldar, Brighton, Repton. PhD faculty, FRQ mastery, GST live classes. From $1,800.',
  keywords: [
    'ap biology tutor abu dhabi',
    'ap biology coaching uae',
    'ap biology tutor saadiyat',
    'ap biology tutor khalifa city',
    'ap biology tutor yas island',
    'ap biology gems american academy abu dhabi',
    'ap biology acs abu dhabi',
    'ap biology canadian international abu dhabi',
    'ap biology cranleigh abu dhabi',
    'ap biology aldar academies',
    'ap biology brighton college abu dhabi',
    'ap biology repton abu dhabi',
    'ap biology online uae',
    'ap biology frq tutor abu dhabi',
    'nyu abu dhabi ap biology',
    'usabo tutor abu dhabi',
    'best ap biology tutor uae',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorAbuDhabiPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} inLanguage="en-AE" addressCountry="AE" />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
