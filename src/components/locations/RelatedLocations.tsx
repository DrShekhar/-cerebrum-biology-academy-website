'use client'

import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

interface RelatedLocation {
  name: string
  slug: string
  distance?: string
}

interface RelatedLocationsProps {
  currentLocation: string
  locations: RelatedLocation[]
  title?: string
  className?: string
}

/**
 * RelatedLocations - Cross-linking component for location pages
 * Improves internal SEO and helps users discover nearby areas
 */
export function RelatedLocations({
  currentLocation,
  locations,
  title = 'Nearby Areas We Serve',
  className = '',
}: RelatedLocationsProps) {
  // Filter out current location
  const filteredLocations = locations.filter(
    (loc) => loc.name.toLowerCase() !== currentLocation.toLowerCase()
  )

  if (filteredLocations.length === 0) return null

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          {title}
        </h3>
        <div className="flex flex-wrap gap-3">
          {filteredLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="group flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all"
            >
              <span className="text-gray-700 group-hover:text-green-600">{location.name}</span>
              {location.distance && (
                <span className="text-xs text-gray-400">({location.distance})</span>
              )}
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pre-defined location clusters for easy use
export const SOUTH_DELHI_LOCATIONS: RelatedLocation[] = [
  { name: 'South Extension', slug: 'south-extension', distance: 'Flagship' },
  { name: 'Greater Kailash', slug: 'greater-kailash', distance: '5 min' },
  { name: 'Defence Colony', slug: 'defence-colony', distance: '8 min' },
  { name: 'Lajpat Nagar', slug: 'lajpat-nagar', distance: '5 min' },
  { name: 'Saket', slug: 'saket', distance: '12 min' },
  { name: 'Malviya Nagar', slug: 'malviya-nagar', distance: '10 min' },
  { name: 'Green Park', slug: 'green-park', distance: '10 min' },
  { name: 'Hauz Khas', slug: 'hauz-khas', distance: '12 min' },
  { name: 'Kalkaji', slug: 'kalkaji', distance: '10 min' },
  { name: 'CR Park', slug: 'cr-park', distance: '12 min' },
]

export const PREMIUM_LOCATIONS: RelatedLocation[] = [
  { name: 'Golf Links', slug: 'golf-links', distance: '15 min' },
  { name: 'Jor Bagh', slug: 'jor-bagh', distance: '15 min' },
  { name: 'Sundar Nagar', slug: 'sundar-nagar', distance: '18 min' },
  { name: 'Shanti Niketan', slug: 'shanti-niketan', distance: '20 min' },
  { name: 'Anand Niketan', slug: 'anand-niketan', distance: '22 min' },
  { name: 'Vasant Vihar', slug: 'vasant-vihar', distance: '15 min' },
  { name: 'Panchsheel', slug: 'panchsheel', distance: '12 min' },
  { name: 'Gulmohar Park', slug: 'gulmohar-park', distance: '10 min' },
  { name: 'Maharani Bagh', slug: 'maharani-bagh', distance: '12 min' },
  { name: 'Neeti Bagh', slug: 'neeti-bagh', distance: '7 min' },
  { name: 'Westend', slug: 'westend', distance: '18 min' },
  { name: 'Safdarjung Enclave', slug: 'safdarjung-enclave', distance: '12 min' },
]

export const ALL_DELHI_LOCATIONS: RelatedLocation[] = [
  ...SOUTH_DELHI_LOCATIONS,
  ...PREMIUM_LOCATIONS,
  { name: 'New Friends Colony', slug: 'new-friends-colony', distance: '10 min' },
]

/**
 * Get related locations based on current location
 */
export function getRelatedLocations(currentSlug: string): RelatedLocation[] {
  const premiumSlugs = PREMIUM_LOCATIONS.map((l) => l.slug)
  const southDelhiSlugs = SOUTH_DELHI_LOCATIONS.map((l) => l.slug)

  // If current is premium, show other premium + nearby south delhi
  if (premiumSlugs.includes(currentSlug)) {
    return [...PREMIUM_LOCATIONS, ...SOUTH_DELHI_LOCATIONS.slice(0, 4)].filter(
      (l) => l.slug !== currentSlug
    )
  }

  // If current is south delhi, show other south delhi + some premium
  if (southDelhiSlugs.includes(currentSlug)) {
    return [...SOUTH_DELHI_LOCATIONS, ...PREMIUM_LOCATIONS.slice(0, 3)].filter(
      (l) => l.slug !== currentSlug
    )
  }

  // Default: show all
  return ALL_DELHI_LOCATIONS.filter((l) => l.slug !== currentSlug)
}
