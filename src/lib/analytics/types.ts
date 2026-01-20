// Type definitions for Google Analytics and tracking
// Note: Window interface extensions are in src/types/globals.d.ts

// Gtag namespace for proper typing
export namespace Gtag {
  export type Gtag = (
    command: 'config' | 'set' | 'event' | 'js' | 'consent',
    targetIdOrParams: string | Date | GtagEventParams | GtagConsentParams,
    params?: GtagEventParams | GtagConsentParams
  ) => void

  export interface GtagEventParams {
    event_category?: string
    event_label?: string
    value?: number
    non_interaction?: boolean
    [key: string]: any
  }

  export interface GtagConsentParams {
    ad_storage?: 'granted' | 'denied'
    analytics_storage?: 'granted' | 'denied'
    [key: string]: any
  }
}

// Safe gtag wrapper that handles undefined
export function safeGtag(
  command: 'config' | 'set' | 'event' | 'js' | 'consent',
  targetIdOrParams: string | Date | Gtag.GtagEventParams | Gtag.GtagConsentParams,
  params?: Gtag.GtagEventParams | Gtag.GtagConsentParams
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(command, targetIdOrParams, params)
  }
}

// Helper to check if gtag is available
export function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

export {}
