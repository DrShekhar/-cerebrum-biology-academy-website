'use client'

import { useState } from 'react'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'

interface GoogleMapEmbedProps {
  coordinates: {
    lat: number
    lng: number
  }
  localityName: string
  centerAddress: string
  className?: string
}

export function GoogleMapEmbed({
  coordinates,
  localityName,
  centerAddress,
  className = '',
}: GoogleMapEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const { lat, lng } = coordinates

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`NEET coaching near ${localityName}`)}`

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="relative">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading map...</p>
            </div>
          </div>
        )}

        {hasError ? (
          <div className="h-[300px] flex flex-col items-center justify-center bg-gray-50 p-6">
            <MapPin className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{localityName} Location</h3>
            <p className="text-sm text-gray-600 text-center mb-4 max-w-sm">{centerAddress}</p>
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Open in Google Maps
            </a>
          </div>
        ) : (
          <iframe
            src={googleMapsEmbedUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing ${localityName} location`}
            aria-label={`Interactive map showing the location of NEET coaching center near ${localityName}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={isLoaded ? 'opacity-100' : 'opacity-0'}
          />
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Serving {localityName} Students</p>
              <p className="text-xs text-gray-500">{centerAddress}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Navigation className="w-4 h-4 mr-1" />
              Directions
            </a>
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View Area
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleMapEmbed
