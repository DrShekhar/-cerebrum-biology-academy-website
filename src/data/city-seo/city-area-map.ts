import { noidaAreaDetails } from '@/data/noida-areas'
import { gurugramAreaDetails } from '@/data/gurugram-areas'
import { faridabadAreaDetails } from '@/data/faridabad-areas'
import { ghaziabadAreaDetails } from '@/data/ghaziabad-areas'
import { areaDetails as southDelhiAreaDetails } from '@/data/south-delhi-areas'

interface AreaInfo {
  name: string
  schools: string[]
  nearbyMetro: string[]
  landmarks?: string[]
}

function toAreaInfoList(
  details: Record<string, { name: string; schools: string[]; nearbyMetro: string[]; landmarks?: string[] }>
): AreaInfo[] {
  return Object.values(details).map((d) => ({
    name: d.name,
    schools: d.schools,
    nearbyMetro: d.nearbyMetro,
    landmarks: d.landmarks,
  }))
}

const cityAreaMapping: Record<string, AreaInfo[]> = {
  noida: toAreaInfoList(noidaAreaDetails),
  gurgaon: toAreaInfoList(gurugramAreaDetails),
  gurugram: toAreaInfoList(gurugramAreaDetails),
  faridabad: toAreaInfoList(faridabadAreaDetails),
  ghaziabad: toAreaInfoList(ghaziabadAreaDetails),
  'south-delhi': toAreaInfoList(southDelhiAreaDetails),
}

export function getCityAreas(slug: string): AreaInfo[] {
  const normalizedSlug = slug
    .replace(/^neet-coaching-/, '')
    .replace(/^biology-classes-/, '')
    .replace(/^biology-tutor-/, '')
  return cityAreaMapping[normalizedSlug] || []
}
