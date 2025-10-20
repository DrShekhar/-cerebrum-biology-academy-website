/**
 * Shared Analytics Type Definitions
 * Centralizes type definitions for analytics services to avoid conflicts
 */

export interface FacebookPixel {
  (command: 'init' | 'track' | 'trackCustom', ...args: any[]): void
  callMethod?: (...args: any[]) => void
  q?: any[]
  loaded?: boolean
  version?: string
  push?: FacebookPixel
  queue?: any[]
}

declare global {
  interface Window {
    fbq: FacebookPixel
    _fbq: FacebookPixel
    gtag: (...args: any[]) => void
    dataLayer: any[]
    clarity: (...args: any[]) => void
    _hsq: any[]
  }
}

export {}
