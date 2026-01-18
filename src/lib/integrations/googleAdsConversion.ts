/**
 * Google Ads Offline Conversion Import Service
 *
 * This service handles sending conversion data back to Google Ads for optimization.
 * It supports multiple conversion actions (lead, demo, enrollment, payment).
 *
 * Prerequisites:
 * 1. Google Ads API credentials set up
 * 2. Conversion actions created in Google Ads
 * 3. GCLID captured and stored with leads
 *
 * Environment Variables Required:
 * - GOOGLE_ADS_CUSTOMER_ID: Your Google Ads customer ID (without dashes)
 * - GOOGLE_ADS_DEVELOPER_TOKEN: API developer token
 * - GOOGLE_ADS_CLIENT_ID: OAuth client ID
 * - GOOGLE_ADS_CLIENT_SECRET: OAuth client secret
 * - GOOGLE_ADS_REFRESH_TOKEN: OAuth refresh token
 */

import { logger } from '@/lib/utils/logger'
import { prisma } from '@/lib/prisma'

// Conversion action names - these must match what's configured in Google Ads
export const CONVERSION_ACTIONS = {
  // Lead generation conversions
  LEAD_FORM_SUBMIT: 'website_lead_form',
  DEMO_BOOKING: 'demo_booking',
  CONTACT_INQUIRY: 'contact_inquiry',

  // Qualification conversions
  DEMO_ATTENDED: 'demo_attended',
  QUALIFIED_LEAD: 'qualified_lead',

  // Sales conversions
  ENROLLMENT: 'enrollment',
  PAYMENT_RECEIVED: 'payment_received',
  FIRST_PAYMENT: 'first_payment',
  FULL_PAYMENT: 'full_payment',
} as const

export type ConversionAction = (typeof CONVERSION_ACTIONS)[keyof typeof CONVERSION_ACTIONS]

export interface ConversionData {
  gclid: string
  conversionAction: ConversionAction
  conversionDateTime: Date
  conversionValue?: number
  currencyCode?: string
  orderId?: string
}

interface GoogleAdsConfig {
  customerId: string
  developerToken: string
  clientId: string
  clientSecret: string
  refreshToken: string
}

/**
 * Get Google Ads API configuration from environment
 */
function getGoogleAdsConfig(): GoogleAdsConfig | null {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN

  if (!customerId || !developerToken || !clientId || !clientSecret || !refreshToken) {
    return null
  }

  return {
    customerId: customerId.replace(/-/g, ''),
    developerToken,
    clientId,
    clientSecret,
    refreshToken,
  }
}

/**
 * Check if Google Ads conversion tracking is configured
 */
export function isGoogleAdsConfigured(): boolean {
  return getGoogleAdsConfig() !== null
}

/**
 * Get OAuth2 access token from refresh token
 */
async function getAccessToken(config: GoogleAdsConfig): Promise<string> {
  const tokenUrl = 'https://oauth2.googleapis.com/token'

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get access token: ${error}`)
  }

  const data = await response.json()
  return data.access_token
}

/**
 * Format datetime for Google Ads API (YYYY-MM-DD HH:MM:SS+TZ format)
 */
function formatConversionDateTime(date: Date): string {
  // Format as IST (India Standard Time) which is UTC+5:30
  const offset = '+05:30'
  const isoString = date.toISOString()
  const dateTimeWithoutZ = isoString.replace('T', ' ').replace('Z', '')
  const dateTimePart = dateTimeWithoutZ.slice(0, 19) // YYYY-MM-DD HH:MM:SS

  return `${dateTimePart}${offset}`
}

/**
 * Upload a single offline conversion to Google Ads
 */
export async function uploadConversion(data: ConversionData): Promise<{
  success: boolean
  error?: string
}> {
  const config = getGoogleAdsConfig()

  if (!config) {
    logger.warn('Google Ads conversion tracking not configured', {
      conversionAction: data.conversionAction,
      gclid: data.gclid.slice(0, 10) + '...',
    })
    return {
      success: false,
      error: 'Google Ads API not configured',
    }
  }

  try {
    const accessToken = await getAccessToken(config)

    // Build the conversion resource
    const conversionResource = {
      gclid: data.gclid,
      conversionAction: `customers/${config.customerId}/conversionActions/${data.conversionAction}`,
      conversionDateTime: formatConversionDateTime(data.conversionDateTime),
      ...(data.conversionValue && {
        conversionValue: data.conversionValue,
        currencyCode: data.currencyCode || 'INR',
      }),
      ...(data.orderId && { orderId: data.orderId }),
    }

    // Google Ads API endpoint for uploading click conversions
    const apiUrl = `https://googleads.googleapis.com/v16/customers/${config.customerId}:uploadClickConversions`

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'developer-token': config.developerToken,
        'login-customer-id': config.customerId,
      },
      body: JSON.stringify({
        conversions: [conversionResource],
        partialFailure: true,
        validateOnly: false,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error?.message || 'API request failed')
    }

    // Check for partial failures
    if (result.partialFailureError) {
      logger.warn('Google Ads conversion upload partial failure', {
        error: result.partialFailureError,
        gclid: data.gclid.slice(0, 10) + '...',
      })
      return {
        success: false,
        error: result.partialFailureError.message,
      }
    }

    logger.businessEvent('google_ads_conversion_uploaded', {
      conversionAction: data.conversionAction,
      gclid: data.gclid.slice(0, 10) + '...',
      value: data.conversionValue,
      orderId: data.orderId,
    })

    return { success: true }
  } catch (error) {
    logger.error('Failed to upload Google Ads conversion', {
      error,
      conversionAction: data.conversionAction,
      gclid: data.gclid.slice(0, 10) + '...',
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Track lead form submission conversion
 */
export async function trackLeadConversion(data: {
  gclid: string
  conversionDateTime?: Date
  leadId?: string
}): Promise<boolean> {
  const result = await uploadConversion({
    gclid: data.gclid,
    conversionAction: CONVERSION_ACTIONS.LEAD_FORM_SUBMIT,
    conversionDateTime: data.conversionDateTime || new Date(),
    orderId: data.leadId,
  })

  return result.success
}

/**
 * Track demo booking conversion
 */
export async function trackDemoBookingConversion(data: {
  gclid: string
  conversionDateTime?: Date
  bookingId?: string
}): Promise<boolean> {
  const result = await uploadConversion({
    gclid: data.gclid,
    conversionAction: CONVERSION_ACTIONS.DEMO_BOOKING,
    conversionDateTime: data.conversionDateTime || new Date(),
    orderId: data.bookingId,
  })

  return result.success
}

/**
 * Track enrollment conversion with value
 */
export async function trackEnrollmentConversion(data: {
  gclid: string
  enrollmentId: string
  value: number
  conversionDateTime?: Date
}): Promise<boolean> {
  const result = await uploadConversion({
    gclid: data.gclid,
    conversionAction: CONVERSION_ACTIONS.ENROLLMENT,
    conversionDateTime: data.conversionDateTime || new Date(),
    conversionValue: data.value,
    currencyCode: 'INR',
    orderId: data.enrollmentId,
  })

  return result.success
}

/**
 * Track payment conversion with value
 */
export async function trackPaymentConversion(data: {
  gclid: string
  paymentId: string
  amount: number
  conversionDateTime?: Date
  isFirstPayment?: boolean
}): Promise<boolean> {
  const result = await uploadConversion({
    gclid: data.gclid,
    conversionAction: data.isFirstPayment
      ? CONVERSION_ACTIONS.FIRST_PAYMENT
      : CONVERSION_ACTIONS.PAYMENT_RECEIVED,
    conversionDateTime: data.conversionDateTime || new Date(),
    conversionValue: data.amount,
    currencyCode: 'INR',
    orderId: data.paymentId,
  })

  return result.success
}

/**
 * Store conversion for later upload (for batch processing)
 * This is useful when you want to queue conversions and upload them periodically
 */
export async function queueConversionForUpload(data: ConversionData): Promise<void> {
  try {
    await prisma.pending_conversions.create({
      data: {
        gclid: data.gclid,
        conversionAction: data.conversionAction,
        conversionDateTime: data.conversionDateTime,
        conversionValue: data.conversionValue,
        currencyCode: data.currencyCode || 'INR',
        orderId: data.orderId,
        status: 'PENDING',
        createdAt: new Date(),
      },
    })

    logger.info('Conversion queued for upload', {
      conversionAction: data.conversionAction,
      gclid: data.gclid.slice(0, 10) + '...',
    })
  } catch (error) {
    logger.error('Failed to queue conversion', {
      error,
      conversionAction: data.conversionAction,
    })
  }
}

/**
 * Process pending conversions (called by cron job)
 */
export async function processPendingConversions(): Promise<{
  processed: number
  succeeded: number
  failed: number
}> {
  const stats = { processed: 0, succeeded: 0, failed: 0 }

  try {
    // Get pending conversions
    const pending = await prisma.pending_conversions.findMany({
      where: { status: 'PENDING' },
      take: 100, // Process in batches
      orderBy: { createdAt: 'asc' },
    })

    for (const conversion of pending) {
      stats.processed++

      const result = await uploadConversion({
        gclid: conversion.gclid,
        conversionAction: conversion.conversionAction as ConversionAction,
        conversionDateTime: conversion.conversionDateTime,
        conversionValue: conversion.conversionValue || undefined,
        currencyCode: conversion.currencyCode || undefined,
        orderId: conversion.orderId || undefined,
      })

      // Update status
      await prisma.pending_conversions.update({
        where: { id: conversion.id },
        data: {
          status: result.success ? 'UPLOADED' : 'FAILED',
          error: result.error,
          uploadedAt: result.success ? new Date() : undefined,
        },
      })

      if (result.success) {
        stats.succeeded++
      } else {
        stats.failed++
      }
    }
  } catch (error) {
    logger.error('Error processing pending conversions', { error })
  }

  return stats
}

export default {
  CONVERSION_ACTIONS,
  isGoogleAdsConfigured,
  uploadConversion,
  trackLeadConversion,
  trackDemoBookingConversion,
  trackEnrollmentConversion,
  trackPaymentConversion,
  queueConversionForUpload,
  processPendingConversions,
}
