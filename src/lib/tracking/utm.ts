/**
 * UTM Parameter & Google Ads Tracking Utility
 *
 * Captures UTM parameters and GCLID from URL, stores in sessionStorage,
 * and provides utilities for lead attribution in CRM.
 *
 * Usage:
 * - Call captureTrackingParams() on page load
 * - Use getTrackingParams() to get params for form submission
 * - Use isGoogleAdsLead() to check if lead came from Google Ads
 */

export interface TrackingParams {
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  gclid: string | null
  referrer: string | null
  landingPage: string | null
  source: string
}

const STORAGE_KEY = 'cerebrum_tracking_params'
const STORAGE_EXPIRY_KEY = 'cerebrum_tracking_expiry'
const EXPIRY_HOURS = 24 * 30 // 30 days for attribution window

/**
 * Capture tracking parameters from current URL and store them
 * Call this on initial page load (in layout or _app)
 */
export function captureTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') {
    return getEmptyParams()
  }

  // Check if we already have valid stored params
  const stored = getStoredParams()
  if (stored && !isExpired()) {
    return stored
  }

  const urlParams = new URLSearchParams(window.location.search)

  const params: TrackingParams = {
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmContent: urlParams.get('utm_content'),
    utmTerm: urlParams.get('utm_term'),
    gclid: urlParams.get('gclid'),
    referrer: document.referrer || null,
    landingPage: window.location.pathname,
    source: determineSource(urlParams),
  }

  // Only store if we have any tracking params
  if (hasAnyParams(params)) {
    storeParams(params)
  }

  return params
}

/**
 * Get stored tracking parameters for form submission
 */
export function getTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') {
    return getEmptyParams()
  }

  const stored = getStoredParams()
  if (stored && !isExpired()) {
    return stored
  }

  // Try to capture fresh params
  return captureTrackingParams()
}

/**
 * Check if the current session is from Google Ads
 * Used to tag leads as "google_ads" source in CRM
 */
export function isGoogleAdsLead(): boolean {
  const params = getTrackingParams()

  // GCLID is definitive proof of Google Ads click
  if (params.gclid) {
    return true
  }

  // Check UTM source for Google Ads indicators
  const googleAdsSources = ['google', 'google_ads', 'googleads', 'adwords', 'gads']
  const googleAdsMediums = ['cpc', 'ppc', 'paid', 'paidsearch']

  const source = params.utmSource?.toLowerCase() || ''
  const medium = params.utmMedium?.toLowerCase() || ''

  return googleAdsSources.includes(source) && googleAdsMediums.includes(medium)
}

/**
 * Get the lead source string for CRM
 * Returns "Google Ads" if from Google Ads, otherwise derives from UTM or defaults
 */
export function getLeadSource(): string {
  const params = getTrackingParams()

  if (isGoogleAdsLead()) {
    return 'Google Ads'
  }

  return params.source
}

/**
 * Get formatted tracking data for API submission
 */
export function getTrackingDataForAPI(): {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  gclid?: string
  source: string
  referrer?: string
  landingPage?: string
} {
  const params = getTrackingParams()

  return {
    ...(params.utmSource && { utmSource: params.utmSource }),
    ...(params.utmMedium && { utmMedium: params.utmMedium }),
    ...(params.utmCampaign && { utmCampaign: params.utmCampaign }),
    ...(params.utmContent && { utmContent: params.utmContent }),
    ...(params.utmTerm && { utmTerm: params.utmTerm }),
    ...(params.gclid && { gclid: params.gclid }),
    source: getLeadSource(),
    ...(params.referrer && { referrer: params.referrer }),
    ...(params.landingPage && { landingPage: params.landingPage }),
  }
}

/**
 * Clear stored tracking params (useful for testing)
 */
export function clearTrackingParams(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(STORAGE_KEY)
  sessionStorage.removeItem(STORAGE_EXPIRY_KEY)
}

// --- Private Helper Functions ---

function determineSource(urlParams: URLSearchParams): string {
  // Check for Google Ads first
  if (urlParams.get('gclid')) {
    return 'Google Ads'
  }

  const source = urlParams.get('utm_source')?.toLowerCase()
  const medium = urlParams.get('utm_medium')?.toLowerCase()

  // Map common UTM sources to friendly names
  if (source === 'google' && (medium === 'cpc' || medium === 'ppc')) {
    return 'Google Ads'
  }
  if (source === 'facebook' || source === 'fb') {
    return medium === 'cpc' || medium === 'paid' ? 'Facebook Ads' : 'Facebook'
  }
  if (source === 'instagram' || source === 'ig') {
    return 'Instagram'
  }
  if (source === 'youtube' || source === 'yt') {
    return 'YouTube'
  }
  if (source === 'whatsapp') {
    return 'WhatsApp'
  }
  if (source === 'email' || source === 'newsletter') {
    return 'Email'
  }
  if (source === 'referral') {
    return 'Referral'
  }
  if (source) {
    // Capitalize first letter
    return source.charAt(0).toUpperCase() + source.slice(1)
  }

  // Check referrer for organic sources
  if (typeof document !== 'undefined' && document.referrer) {
    const referrer = document.referrer.toLowerCase()
    if (referrer.includes('google.')) return 'Google Organic'
    if (referrer.includes('bing.')) return 'Bing Organic'
    if (referrer.includes('yahoo.')) return 'Yahoo Organic'
    if (referrer.includes('facebook.')) return 'Facebook'
    if (referrer.includes('instagram.')) return 'Instagram'
    if (referrer.includes('youtube.')) return 'YouTube'
    if (referrer.includes('linkedin.')) return 'LinkedIn'
    if (referrer.includes('twitter.') || referrer.includes('x.com')) return 'Twitter/X'
  }

  return 'Website'
}

function hasAnyParams(params: TrackingParams): boolean {
  return !!(
    params.utmSource ||
    params.utmMedium ||
    params.utmCampaign ||
    params.gclid ||
    params.referrer
  )
}

function storeParams(params: TrackingParams): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params))
    const expiry = Date.now() + EXPIRY_HOURS * 60 * 60 * 1000
    sessionStorage.setItem(STORAGE_EXPIRY_KEY, expiry.toString())
  } catch {
    // sessionStorage might be unavailable
  }
}

function getStoredParams(): TrackingParams | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function isExpired(): boolean {
  try {
    const expiry = sessionStorage.getItem(STORAGE_EXPIRY_KEY)
    if (!expiry) return true
    return Date.now() > parseInt(expiry, 10)
  } catch {
    return true
  }
}

function getEmptyParams(): TrackingParams {
  return {
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
    utmTerm: null,
    gclid: null,
    referrer: null,
    landingPage: null,
    source: 'Website',
  }
}
