/**
 * /ap-biology-tutor-los-angeles
 *
 * AP Biology US metro page targeting LA County + Orange County +
 * Westside. Built from APBiologyCityTemplate + apBiologyMetros[los-angeles].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'los-angeles'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Los Angeles · Westside + OC · Cerebrum',
  description:
    'AP Biology tutoring for LA students — Harvard-Westlake, Marlborough, Brentwood, Polytechnic, Canyon Crest. PhD faculty, FRQ mastery, PT live classes. From $1,800.',
  keywords: [
    'AP Biology tutor Los Angeles',
    'AP Biology tutor LA',
    'AP Biology tutor Westside',
    'AP Biology tutor Beverly Hills',
    'AP Biology tutor Orange County',
    'AP Bio tutor Harvard-Westlake',
    'AP Bio tutor Marlborough School',
    'AP Bio tutor Brentwood School',
    'AP Bio tutor Polytechnic',
    'AP Bio tutor Crossroads',
    'AP Bio tutor Loyola',
    'AP Bio tutor Canyon Crest Academy',
    'AP Biology score 5 Los Angeles',
    'AP Biology FRQ tutor California',
    'USABO tutor Los Angeles',
    'private AP Biology tutor LA',
    'online AP Biology tutor California',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorLosAngelesPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
