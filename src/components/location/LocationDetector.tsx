'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, X, ChevronRight, Loader2 } from 'lucide-react'
import { getLocationBySlug, locationDatabase } from '@/data/locationData'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { usePopupCoordinator } from '@/lib/ui/popupCoordinator'

interface LocationDetectorProps {
  className?: string
  showBanner?: boolean
  useCoordination?: boolean
}

interface LocationInfo {
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
}

export function LocationDetector({
  className = '',
  showBanner = true,
  useCoordination = false,
}: LocationDetectorProps) {
  const [userLocation, setUserLocation] = useState<LocationInfo | null>(null)
  const [suggestedLocation, setSuggestedLocation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showLocationBanner, setShowLocationBanner] = useState(false)
  const [hasDetected, setHasDetected] = useState(false)
  const [coordinationActive, setCoordinationActive] = useState(false)
  const popupCoordinator = usePopupCoordinator()
  const router = useRouter()

  // Coordination effect
  useEffect(() => {
    if (!useCoordination) {
      setCoordinationActive(true)
      return
    }

    // Location detection has low priority
    const coordinationTimer = setTimeout(() => {
      if (popupCoordinator.canShowPopup('location_detection')) {
        if (popupCoordinator.showPopup('location_detection')) {
          setCoordinationActive(true)
        }
      }
    }, 2000) // 2 second delay

    return () => clearTimeout(coordinationTimer)
  }, [useCoordination, popupCoordinator])

  // Check if we already have stored location preference
  useEffect(() => {
    if (!coordinationActive) return

    const storedLocation = localStorage.getItem('preferredLocation')
    const locationDetected = localStorage.getItem('locationDetected')

    if (storedLocation) {
      const location = getLocationBySlug(storedLocation)
      if (location) {
        setSuggestedLocation(location)
        setHasDetected(true)
      }
    } else if (!locationDetected && showBanner) {
      detectUserLocation()
    }
  }, [showBanner, coordinationActive])

  const detectUserLocation = async () => {
    if (!navigator.geolocation) {
      // Fallback to IP-based detection
      detectLocationByIP()
      return
    }

    setIsLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          // Use reverse geocoding to get city name
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&limit=1`
          )

          if (response.ok) {
            const data = await response.json()
            if (data.results && data.results.length > 0) {
              const result = data.results[0]
              const locationInfo: LocationInfo = {
                city:
                  result.components.city ||
                  result.components.town ||
                  result.components.village ||
                  '',
                state: result.components.state || '',
                country: result.components.country || '',
                latitude,
                longitude,
              }

              setUserLocation(locationInfo)
              findSuggestedLocation(locationInfo)
            }
          } else {
            // Fallback to IP detection
            detectLocationByIP()
          }
        } catch (error) {
          console.error('Geocoding error:', error)
          detectLocationByIP()
        } finally {
          setIsLoading(false)
        }
      },
      () => {
        // User denied location access, try IP-based detection
        detectLocationByIP()
      },
      {
        timeout: 10000,
        enableHighAccuracy: false,
      }
    )
  }

  const detectLocationByIP = async () => {
    setIsLoading(true)

    try {
      // Try multiple IP geolocation services
      const services = [
        'https://ipapi.co/json/',
        'https://api.ipify.org?format=json',
        'https://freegeoip.app/json/',
      ]

      for (const service of services) {
        try {
          const response = await fetch(service)
          if (response.ok) {
            const data = await response.json()

            let locationInfo: LocationInfo | null = null

            if (data.city && data.region) {
              locationInfo = {
                city: data.city,
                state: data.region,
                country: data.country_name || data.country || '',
                latitude: data.latitude || 0,
                longitude: data.longitude || 0,
              }
            }

            if (locationInfo && locationInfo.city) {
              setUserLocation(locationInfo)
              findSuggestedLocation(locationInfo)
              break
            }
          }
        } catch (error) {
          console.warn(`Failed to get location from ${service}:`, error)
          continue
        }
      }
    } catch (error) {
      console.error('IP-based location detection failed:', error)
    } finally {
      setIsLoading(false)
      localStorage.setItem('locationDetected', 'true')
    }
  }

  const findSuggestedLocation = (location: LocationInfo) => {
    // First, try exact city match
    let suggested = locationDatabase.find(
      (loc) => loc.city.toLowerCase() === location.city.toLowerCase()
    )

    // If no exact match, try state-based suggestion
    if (!suggested) {
      suggested = locationDatabase.find(
        (loc) => loc.state.toLowerCase() === location.state.toLowerCase()
      )
    }

    // If still no match, suggest closest tier 1 city
    if (!suggested) {
      suggested = locationDatabase.find((loc) => loc.tier === 'tier1')
    }

    if (suggested) {
      setSuggestedLocation(suggested)
      setShowLocationBanner(true)
    }
  }

  const handleLocationSelection = (accept: boolean) => {
    if (accept && suggestedLocation) {
      localStorage.setItem('preferredLocation', suggestedLocation.slug)
      router.push(`/locations/${suggestedLocation.slug}`)
    } else {
      localStorage.setItem('locationDetected', 'true')
    }
    setShowLocationBanner(false)
  }

  const handleManualLocationSelect = () => {
    router.push('/locations')
    setShowLocationBanner(false)
  }

  if (!showBanner || !showLocationBanner || !suggestedLocation) {
    return null
  }

  return (
{showLocationBanner && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 ${className}`}
        >
          <Card className="mx-4 mt-4 border-2 border-primary/20 shadow-lg bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : (
                    <MapPin className="w-5 h-5 text-primary" />
                  )}

                  <div className="flex-1">
                    {userLocation ? (
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Studying in {userLocation.city}?
                          <span className="ml-2">
                            Get personalized NEET Biology coaching for {suggestedLocation.city}
                          </span>
                        </p>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            {suggestedLocation.neetAspirants.toLocaleString()}+ aspirants
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Save ₹
                            {(suggestedLocation.localContext.avgCoachingFee * 0.4).toLocaleString()}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-gray-900">
                        Looking for NEET Biology coaching? We found the perfect program for you!
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    size="sm"
                    onClick={() => handleLocationSelection(true)}
                    className="text-xs px-3 py-1"
                  >
                    Explore {suggestedLocation.city}
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleManualLocationSelect}
                    className="text-xs px-3 py-1"
                  >
                    Other Cities
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLocationSelection(false)}
                    className="text-xs p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
)
}

// Hook for getting user's preferred location
export function useUserLocation() {
  const [preferredLocation, setPreferredLocation] = useState<any>(null)

  useEffect(() => {
    const storedLocation = localStorage.getItem('preferredLocation')
    if (storedLocation) {
      const location = getLocationBySlug(storedLocation)
      setPreferredLocation(location)
    }
  }, [])

  const updatePreferredLocation = (locationSlug: string) => {
    localStorage.setItem('preferredLocation', locationSlug)
    const location = getLocationBySlug(locationSlug)
    setPreferredLocation(location)
  }

  return {
    preferredLocation,
    updatePreferredLocation,
  }
}
