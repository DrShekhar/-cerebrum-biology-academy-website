/**
 * Zoom Meeting SDK Service
 * For embedding Zoom meetings directly in the website
 *
 * Requires a Meeting SDK app from Zoom Marketplace:
 * https://marketplace.zoom.us/develop/create
 *
 * SDK credentials are different from Server-to-Server OAuth credentials
 */

import { KJUR } from 'jsrsasign'

interface ZoomSDKConfig {
  sdkKey: string
  sdkSecret: string
  meetingNumber: string
  role: 0 | 1 // 0 = attendee, 1 = host
  userName: string
  userEmail?: string
  password?: string
  leaveUrl?: string
}

interface ZoomSignature {
  signature: string
  sdkKey: string
  meetingNumber: string
  role: number
}

/**
 * Generate a signature for joining a Zoom meeting via SDK
 * This should be called server-side to keep the SDK secret secure
 */
export function generateZoomSignature(
  sdkKey: string,
  sdkSecret: string,
  meetingNumber: string,
  role: 0 | 1
): string {
  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2 // Signature expires in 2 hours

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: sdkKey,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: sdkKey,
    tokenExp: exp,
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)

  return signature
}

/**
 * Validate meeting number format
 */
export function validateMeetingNumber(meetingNumber: string): boolean {
  // Meeting numbers are typically 9-11 digits
  const cleanedNumber = meetingNumber.replace(/\s/g, '')
  return /^\d{9,11}$/.test(cleanedNumber)
}

/**
 * Parse meeting URL to extract meeting number and password
 */
export function parseMeetingUrl(url: string): { meetingNumber: string; password?: string } | null {
  try {
    const urlObj = new URL(url)

    // Handle zoom.us/j/MEETING_NUMBER?pwd=PASSWORD format
    const pathMatch = urlObj.pathname.match(/\/j\/(\d+)/)
    if (pathMatch) {
      const meetingNumber = pathMatch[1]
      const password = urlObj.searchParams.get('pwd') || undefined
      return { meetingNumber, password }
    }

    return null
  } catch {
    return null
  }
}

/**
 * SDK initialization options for client-side
 */
export const getZoomSDKInitOptions = () => ({
  language: 'en-US',
  leaveUrl: '/demo/complete',
  disableInvite: true,
  disableRecord: true,
  showMeetingHeader: true,
  showPureSharingContent: false,
  isSupportAV: true,
  isSupportChat: true,
  isSupportQA: false,
  isSupportCC: false,
  isSupportPolling: false,
  isSupportBreakout: false,
  screenShare: true,
  videoDrag: true,
  sharingMode: 'both',
  videoHeader: true,
  isLockBottom: true,
  isSupportNonverbal: false,
  isShowJoiningErrorDialog: true,
})

/**
 * Check if SDK credentials are configured
 */
export function isZoomSDKConfigured(): boolean {
  return !!(process.env.ZOOM_SDK_KEY && process.env.ZOOM_SDK_SECRET)
}

/**
 * Get SDK configuration from environment
 */
export function getZoomSDKEnvConfig() {
  return {
    sdkKey: process.env.ZOOM_SDK_KEY || '',
    sdkSecret: process.env.ZOOM_SDK_SECRET || '',
  }
}
