/**
 * City-to-Center Mapping
 * Maps city slugs used in routes to their nearest physical center data.
 * Used by: Google Maps embeds, LocalBusiness schema, area-specific CTAs
 */

import { CONTACT_INFO } from './contactInfo'

export type CenterKey = keyof typeof CONTACT_INFO.centers

export interface CenterInfo {
  centerKey: CenterKey
  name: string
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  geo: { latitude: number; longitude: number }
  mapUrl: string
  googleBusinessUrl?: string
  nearbyLandmarks: string[]
  isPhysicalCenter: boolean
  googleMapsEmbed: string
}

const GOOGLE_MAPS_EMBEDS: Record<CenterKey, string> = {
  southExtension:
    'https://www.google.com/maps?q=South+Extension+Part+2,+New+Delhi+110049&output=embed',
  rohini:
    'https://www.google.com/maps?q=Vikas+Surya+Tower,+DC+Chowk,+Sector+9,+Rohini,+New+Delhi+110085&output=embed',
  greenPark: 'https://www.google.com/maps?q=Green+Park,+New+Delhi+110016&output=embed',
  gurugram:
    'https://www.google.com/maps?q=M2K+Corporate+Park,+Sector+51,+Gurugram+122003&output=embed',
  // Address-query embed (renders a real pin at the exact street address; the
  // old pb= embed carried a fabricated place-id that wouldn't resolve). Swap
  // to a real place-id embed once the GBP listing is verified.
  faridabad:
    'https://www.google.com/maps?q=SCF-130,+Above+Union+Bank,+Huda+Market,+Sector+17,+Faridabad,+Haryana+121002&output=embed',
  // ONLINE-ONLY area (no walk-in center). Kept only to satisfy the CenterKey
  // Record; no city routes to it now — online cities map to South Extension.
  // Points at the real South Extension flagship, NOT a fake Sector 62 pin.
  noida: 'https://www.google.com/maps?q=South+Extension+Part+2,+New+Delhi+110049&output=embed',
}

/**
 * Maps a city route slug to its nearest physical center key.
 * Used to determine which center's data to show on location pages.
 */
export function getCenterForCity(citySlug: string): CenterKey {
  // Online-only areas (noida, greater-noida, ghaziabad, east-delhi) map to their
  // nearest REAL walk-in center (South Extension), NOT a fake Noida center.
  const mapping: Record<string, CenterKey> = {
    noida: 'southExtension',
    'greater-noida': 'southExtension',
    gurugram: 'gurugram',
    gurgaon: 'gurugram',
    faridabad: 'faridabad',
    ghaziabad: 'southExtension',
    'south-delhi': 'southExtension',
    'north-delhi': 'rohini',
    'east-delhi': 'southExtension',
    'west-delhi': 'rohini',
    delhi: 'southExtension',
    'delhi-ncr': 'southExtension',
  }

  return mapping[citySlug] || 'southExtension'
}

/**
 * Returns full center info for a given city slug, including embed URL.
 */
export function getCenterInfo(citySlug: string): CenterInfo {
  const centerKey = getCenterForCity(citySlug)
  const center = CONTACT_INFO.centers[centerKey]

  return {
    centerKey,
    name: center.name,
    streetAddress: center.streetAddress,
    addressLocality: center.addressLocality,
    addressRegion: center.addressRegion,
    postalCode: center.postalCode,
    geo: center.geo,
    mapUrl: center.mapUrl,
    googleBusinessUrl: (center as any).googleBusinessUrl,
    nearbyLandmarks: [...center.nearbyLandmarks],
    isPhysicalCenter: center.isPhysicalCenter,
    googleMapsEmbed: GOOGLE_MAPS_EMBEDS[centerKey],
  }
}

/**
 * Returns the Google Maps embed URL for a given city slug.
 */
export function getMapEmbedForCity(citySlug: string): string {
  const centerKey = getCenterForCity(citySlug)
  return GOOGLE_MAPS_EMBEDS[centerKey]
}

/**
 * Returns placeholder data for LazyGoogleMap component for a given city.
 */
export function getMapPlaceholder(citySlug: string): {
  lat: number
  lng: number
  address: string
} {
  const center = getCenterInfo(citySlug)
  return {
    lat: center.geo.latitude,
    lng: center.geo.longitude,
    address: `${center.name}, ${center.streetAddress}, ${center.addressLocality}`,
  }
}

/**
 * Returns LocalBusiness schema data for a given city slug.
 */
export function getLocalBusinessSchemaForCity(citySlug: string) {
  const center = getCenterInfo(citySlug)
  return {
    '@type': 'PostalAddress',
    streetAddress: center.streetAddress,
    addressLocality: center.addressLocality,
    addressRegion: center.addressRegion,
    postalCode: center.postalCode,
    addressCountry: 'IN',
  }
}

/**
 * Returns geo schema for a given city slug.
 */
export function getGeoSchemaForCity(citySlug: string) {
  const center = getCenterInfo(citySlug)
  return {
    '@type': 'GeoCoordinates',
    latitude: center.geo.latitude,
    longitude: center.geo.longitude,
  }
}

/**
 * Returns opening hours specification for schema.
 */
export function getOpeningHoursSchema() {
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '10:00',
      closes: '18:00',
    },
  ]
}
