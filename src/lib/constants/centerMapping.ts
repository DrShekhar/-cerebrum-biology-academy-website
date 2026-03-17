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
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5351350896896!2d77.22066!3d28.5678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c16e000001%3A0x5027e47c24e3e43e!2sSouth%20Extension%20Part%202%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000',
  rohini:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.123!2d77.1025!3d28.7041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0147e0000001%3A0xdc_chowk_rohini!2sVikas%20Surya%20Tower%2C%20DC%20Chowk%2C%20Rohini%20Sector%209!5e0!3m2!1sen!2sin!4v1710000000000',
  greenPark:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8!2d77.2089!3d28.5597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a4e0000001%3A0xgreen_park!2sGulmohar%20Park%2C%20Green%20Park%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000',
  gurugram:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.5!2d77.0426!3d28.4295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19c4e0000001%3A0xm2k_corporate_park!2sM2K%20Corporate%20Park%2C%20Sector%2051%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1710000000000',
  faridabad:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.8!2d77.3178!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd7ae0000001%3A0xhuda_market_sector17!2sHuda%20Market%2C%20Sector%2017%2C%20Faridabad!5e0!3m2!1sen!2sin!4v1710000000000',
  noida:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5!2d77.3649!3d28.628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a0e0000001%3A0xsector_62_noida!2sSector%2062%2C%20Noida!5e0!3m2!1sen!2sin!4v1710000000000',
}

/**
 * Maps a city route slug to its nearest physical center key.
 * Used to determine which center's data to show on location pages.
 */
export function getCenterForCity(citySlug: string): CenterKey {
  const mapping: Record<string, CenterKey> = {
    noida: 'noida',
    'greater-noida': 'noida',
    gurugram: 'gurugram',
    gurgaon: 'gurugram',
    faridabad: 'faridabad',
    ghaziabad: 'noida',
    'south-delhi': 'southExtension',
    'north-delhi': 'rohini',
    'east-delhi': 'noida',
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
    nearbyLandmarks: center.nearbyLandmarks,
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
      opens: '07:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '09:00',
      closes: '18:00',
    },
  ]
}
