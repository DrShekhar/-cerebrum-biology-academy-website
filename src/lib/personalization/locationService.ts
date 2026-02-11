'use client'

export interface LocationData {
  city?: string
  state?: string
  country?: string
  timezone?: string
  latitude?: number
  longitude?: number
  pincode?: string
  ipAddress?: string
}

export interface LocationBasedContent {
  heroMessage?: string
  testimonials?: any[]
  localOffers?: string[]
  contactInfo?: {
    phone?: string
    address?: string
    timings?: string
  }
  courseModifications?: {
    highlightOnline?: boolean
    highlightOffline?: boolean
    showLocalBatches?: boolean
  }
}

class LocationService {
  private static LOCATION_CACHE_KEY = 'cerebrum_user_location'
  private static IP_GEOLOCATION_API = 'https://ipapi.co/json/'

  static async detectUserLocation(): Promise<LocationData> {
    // Try to get cached location first
    const cached = this.getCachedLocation()
    if (cached && this.isCacheValid(cached)) {
      return cached
    }

    const location: LocationData = {}

    try {
      // Try HTML5 Geolocation first (most accurate)
      if ('geolocation' in navigator) {
        try {
          const position = await this.getGeolocation()
          location.latitude = position.coords.latitude
          location.longitude = position.coords.longitude

          // You could integrate with a reverse geocoding service here
          // For now, we'll use the IP-based method for city/state
        } catch (geoError) {
          console.log('Geolocation denied or unavailable')
        }
      }

      // Fall back to IP-based geolocation
      const ipLocation = await this.getIPLocation()
      Object.assign(location, ipLocation)

      // Add timezone
      location.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      // Cache the result
      this.cacheLocation(location)

      return location
    } catch (error) {
      console.error('Location detection failed:', error)

      // Return basic timezone info at minimum
      return {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    }
  }

  private static getGeolocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        enableHighAccuracy: false,
      })
    })
  }

  private static async getIPLocation(): Promise<LocationData> {
    try {
      const response = await fetch(this.IP_GEOLOCATION_API)
      const data = await response.json()

      return {
        city: data.city,
        state: data.region,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        ipAddress: data.ip,
      }
    } catch (error) {
      console.error('IP geolocation failed:', error)
      return {}
    }
  }

  private static getCachedLocation(): (LocationData & { timestamp: number }) | null {
    try {
      const cached = localStorage.getItem(this.LOCATION_CACHE_KEY)
      return cached ? JSON.parse(cached) : null
    } catch (error) {
      return null
    }
  }

  private static cacheLocation(location: LocationData): void {
    try {
      const cacheData = {
        ...location,
        timestamp: Date.now(),
      }
      localStorage.setItem(this.LOCATION_CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Failed to cache location:', error)
    }
  }

  private static isCacheValid(cached: { timestamp: number }): boolean {
    const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours
    return Date.now() - cached.timestamp < CACHE_DURATION
  }

  static getLocationBasedContent(location: LocationData): LocationBasedContent {
    const content: LocationBasedContent = {}

    if (!location.city && !location.state && !location.country) {
      return content
    }

    // India-specific content
    if (location.country === 'India' || location.country === 'IN') {
      content.heroMessage = this.getIndianHeroMessage(location)
      content.testimonials = this.getIndianTestimonials(location)
      content.localOffers = this.getIndianOffers(location)
      content.contactInfo = this.getIndianContactInfo(location)
      content.courseModifications = this.getIndianCourseModifications(location)
    }
    // International content
    else {
      content.heroMessage = this.getInternationalHeroMessage(location)
      content.testimonials = this.getInternationalTestimonials(location)
      content.localOffers = this.getInternationalOffers(location)
      content.contactInfo = this.getInternationalContactInfo(location)
      content.courseModifications = this.getInternationalCourseModifications(location)
    }

    return content
  }

  // India-specific content methods
  private static getIndianHeroMessage(location: LocationData): string {
    const city = location.city?.toLowerCase()

    // Delhi NCR variations
    if (
      ['delhi', 'new delhi', 'gurgaon', 'gurugram', 'noida', 'faridabad', 'ghaziabad'].includes(
        city || ''
      )
    ) {
      return `Delhi NCR's most trusted NEET Biology coaching - Now available in ${location.city}!`
    }

    // Major coaching hubs
    if (city === 'kota') {
      return "Experience AIIMS-level teaching right here in Kota - India's coaching capital!"
    }
    if (city === 'bangalore' || city === 'bengaluru') {
      return "Bangalore's top choice for NEET Biology - Join 500+ local students who cleared NEET!"
    }
    if (city === 'hyderabad') {
      return "Hyderabad's premier NEET Biology academy - 200+ local AIIMS selections!"
    }
    if (city === 'mumbai') {
      return "Mumbai's fastest-growing NEET Biology institute - 98% success rate!"
    }
    if (city === 'pune') {
      return "Pune's most results-oriented NEET Biology coaching!"
    }
    if (city === 'chennai') {
      return "Chennai's trusted NEET Biology academy - Tamil + English medium available!"
    }

    // State-wise variations
    if (location.state) {
      return `${location.state}'s most trusted NEET Biology coaching - Join students from your state!`
    }

    return "India's #1 NEET Biology coaching - Join 10,000+ successful students nationwide!"
  }

  private static getIndianTestimonials(location: LocationData): any[] {
    // Return testimonials from same city/state if available
    // This would be populated from your testimonials database
    return []
  }

  private static getIndianOffers(location: LocationData): string[] {
    const offers = []
    const city = location.city?.toLowerCase()

    // City-specific offers
    if (['delhi', 'new delhi', 'gurgaon', 'gurugram', 'noida', 'faridabad'].includes(city || '')) {
      offers.push('Free home visit for course counseling in Delhi NCR')
      offers.push('Special Delhi NCR batch with weekend offline classes')
    }

    if (city === 'kota') {
      offers.push('Special Kota student discount - 15% off')
      offers.push('Hostel partnership for outstation students')
    }

    // General Indian offers
    offers.push('EMI starting at ₹2,500/month')
    offers.push('Scholarship for economically weaker sections')
    offers.push('Free printed study material (worth ₹5,000)')

    return offers
  }

  private static getIndianContactInfo(location: LocationData) {
    return {
      phone: '+91 88264 44334',
      address: location.city ? `Available in ${location.city}` : 'Delhi NCR Headquarters',
      timings: 'Mon-Sat: 9 AM - 8 PM IST',
    }
  }

  private static getIndianCourseModifications(location: LocationData) {
    const city = location.city?.toLowerCase()

    // For major cities, highlight both online and offline
    if (
      ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'chennai', 'pune', 'kota'].includes(city || '')
    ) {
      return {
        highlightOnline: true,
        highlightOffline: true,
        showLocalBatches: true,
      }
    }

    // For smaller cities, emphasize online
    return {
      highlightOnline: true,
      highlightOffline: false,
      showLocalBatches: false,
    }
  }

  // International content methods
  private static getInternationalHeroMessage(location: LocationData): string {
    const country = location.country

    if (country === 'United States') {
      return 'Preparing for medical school abroad? Join 500+ international students who achieved their dreams!'
    }
    if (country === 'United Kingdom') {
      return "UK's trusted Indian medical coaching - Perfect for NEET + international medical programs!"
    }
    if (country === 'Canada') {
      return "Canada's premier NEET Biology coaching - Flexible timings for your timezone!"
    }
    if (country === 'Australia') {
      return "Australia's most trusted NEET preparation academy!"
    }
    if (country === 'United Arab Emirates') {
      return "UAE's #1 NEET Biology coaching - Join 300+ Gulf students!"
    }
    if (country === 'Singapore') {
      return "Singapore's trusted NEET Biology academy - Excellence in education!"
    }

    return "International students' #1 choice for NEET Biology preparation - Available in 50+ countries!"
  }

  private static getInternationalTestimonials(location: LocationData): any[] {
    // Return international testimonials
    return []
  }

  private static getInternationalOffers(location: LocationData): string[] {
    const offers = []

    offers.push('Special international student pricing')
    offers.push('Flexible payment in USD, GBP, CAD, AUD')
    offers.push('Timezone-friendly class timings')
    offers.push('Digital study materials included')
    offers.push('WhatsApp support available 24/7')

    return offers
  }

  private static getInternationalContactInfo(location: LocationData) {
    return {
      phone: '+91 88264 44334 (WhatsApp)',
      address: 'Available Worldwide - Online Classes',
      timings: '24/7 Support Available',
    }
  }

  private static getInternationalCourseModifications(location: LocationData) {
    return {
      highlightOnline: true,
      highlightOffline: false,
      showLocalBatches: false,
    }
  }

  // Timezone utilities
  static getLocalTime(timezone?: string): string {
    const tz = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    return new Date().toLocaleTimeString('en-US', {
      timeZone: tz,
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  static isBusinessHours(timezone?: string): boolean {
    const tz = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    const now = new Date()
    const localTime = new Date().toLocaleString('en-US', { timeZone: tz })
    const hour = new Date(localTime).getHours()
    const day = new Date(localTime).getDay()

    // Business hours: Monday-Saturday, 9 AM - 8 PM
    return day >= 1 && day <= 6 && hour >= 9 && hour < 20
  }

  static getNextBusinessHour(timezone?: string): string {
    const tz = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone

    if (this.isBusinessHours(tz)) {
      return 'Available now'
    }

    // Calculate next business hour
    const now = new Date()
    const localTime = new Date().toLocaleString('en-US', { timeZone: tz })
    const localDate = new Date(localTime)
    const hour = localDate.getHours()
    const day = localDate.getDay()

    if (day === 0) {
      // Sunday
      return 'Monday 9:00 AM'
    } else if (hour < 9) {
      return 'Today 9:00 AM'
    } else if (hour >= 20) {
      return day === 6 ? 'Monday 9:00 AM' : 'Tomorrow 9:00 AM'
    }

    return 'Next business day 9:00 AM'
  }
}

export { LocationService }
