/**
 * LMS Device Security Service
 *
 * Handles device management, 2-device limit enforcement, and piracy detection.
 *
 * Features:
 * - Device fingerprinting and tracking
 * - 2-device limit per user
 * - Concurrent streaming prevention
 * - Security event logging
 * - Account sharing detection
 */

import { prisma } from '@/lib/prisma'
import { DeviceType, LmsSecurityEvent, SecuritySeverity } from '@/generated/prisma'
import crypto from 'crypto'

interface DeviceInfo {
  fingerprint: string
  deviceType: DeviceType
  browser?: string
  os?: string
  ipAddress?: string
  userAgent?: string
  country?: string
  city?: string
}

interface SecurityCheckResult {
  allowed: boolean
  sessionToken?: string
  deviceSessionId?: string
  error?: string
  requiresDeviceRevocation?: boolean
  activeDevices?: Array<{
    id: string
    deviceName: string
    lastActiveAt: Date
    isTrusted: boolean
  }>
}

/**
 * Generate a device fingerprint from browser/device info
 */
export function generateDeviceFingerprint(
  userAgent: string,
  screenInfo?: string,
  timezone?: string,
  language?: string
): string {
  const components = [
    userAgent,
    screenInfo || 'unknown',
    timezone || 'unknown',
    language || 'unknown',
  ].join('|')

  return crypto.createHash('sha256').update(components).digest('hex').slice(0, 32)
}

/**
 * Parse user agent to get device info
 */
export function parseUserAgent(userAgent: string): {
  deviceType: DeviceType
  browser: string
  os: string
} {
  const ua = userAgent.toLowerCase()

  // Detect device type
  let deviceType: DeviceType = 'UNKNOWN'
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    deviceType = 'MOBILE'
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    deviceType = 'TABLET'
  } else if (ua.includes('smart-tv') || ua.includes('smarttv') || ua.includes('webos')) {
    deviceType = 'TV'
  } else if (ua.includes('windows') || ua.includes('mac') || ua.includes('linux')) {
    deviceType = 'DESKTOP'
  }

  // Detect browser
  let browser = 'Unknown'
  if (ua.includes('firefox')) browser = 'Firefox'
  else if (ua.includes('edg')) browser = 'Edge'
  else if (ua.includes('chrome')) browser = 'Chrome'
  else if (ua.includes('safari')) browser = 'Safari'
  else if (ua.includes('opera')) browser = 'Opera'

  // Detect OS
  let os = 'Unknown'
  if (ua.includes('windows')) os = 'Windows'
  else if (ua.includes('mac')) os = 'macOS'
  else if (ua.includes('linux')) os = 'Linux'
  else if (ua.includes('android')) os = 'Android'
  else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS'

  return { deviceType, browser, os }
}

/**
 * Check if user can access LMS from this device
 * Enforces 2-device limit
 */
export async function checkDeviceAccess(
  userId: string,
  deviceInfo: DeviceInfo
): Promise<SecurityCheckResult> {
  // Get user's device limits
  let limits = await prisma.user_device_limits.findUnique({
    where: { userId },
  })

  if (!limits) {
    // Create default limits for new user
    limits = await prisma.user_device_limits.create({
      data: {
        userId,
        maxDevices: 2,
        activeDevices: 0,
      },
    })
  }

  // Check if user is restricted
  if (limits.isRestricted) {
    if (limits.restrictedUntil && limits.restrictedUntil > new Date()) {
      await logSecurityEvent({
        userId,
        eventType: 'DEVICE_LIMIT_EXCEEDED',
        severity: 'HIGH',
        description: `Access denied: Account restricted until ${limits.restrictedUntil.toISOString()}`,
        deviceFingerprint: deviceInfo.fingerprint,
        ipAddress: deviceInfo.ipAddress,
      })

      return {
        allowed: false,
        error: `Account access restricted until ${limits.restrictedUntil.toLocaleDateString()}. Reason: ${limits.restrictedReason}`,
      }
    } else {
      // Restriction expired, remove it
      await prisma.user_device_limits.update({
        where: { userId },
        data: { isRestricted: false, restrictedUntil: null, restrictedReason: null },
      })
    }
  }

  // Check for existing session with this device
  const existingSession = await prisma.lms_device_sessions.findFirst({
    where: {
      userId,
      deviceId: deviceInfo.fingerprint,
      isActive: true,
      isRevoked: false,
    },
  })

  if (existingSession) {
    // Update existing session
    await prisma.lms_device_sessions.update({
      where: { id: existingSession.id },
      data: {
        lastActiveAt: new Date(),
        ipAddress: deviceInfo.ipAddress,
      },
    })

    return {
      allowed: true,
      sessionToken: existingSession.sessionToken,
      deviceSessionId: existingSession.id,
    }
  }

  // Get all active devices for this user
  const activeDevices = await prisma.lms_device_sessions.findMany({
    where: {
      userId,
      isActive: true,
      isRevoked: false,
    },
    orderBy: { lastActiveAt: 'desc' },
  })

  // Check if device limit reached
  if (activeDevices.length >= limits.maxDevices) {
    // Log security event
    await logSecurityEvent({
      userId,
      eventType: 'DEVICE_LIMIT_EXCEEDED',
      severity: 'MEDIUM',
      description: `Device limit reached. Active devices: ${activeDevices.length}, Max: ${limits.maxDevices}`,
      deviceFingerprint: deviceInfo.fingerprint,
      ipAddress: deviceInfo.ipAddress,
    })

    // Update violation count
    await prisma.user_device_limits.update({
      where: { userId },
      data: {
        violationCount: { increment: 1 },
        lastViolationAt: new Date(),
      },
    })

    return {
      allowed: false,
      error: 'Device limit reached. Please remove a device to continue.',
      requiresDeviceRevocation: true,
      activeDevices: activeDevices.map((d) => ({
        id: d.id,
        deviceName: d.deviceName || `${d.browser} on ${d.os}`,
        lastActiveAt: d.lastActiveAt,
        isTrusted: d.isTrusted,
      })),
    }
  }

  // Create new device session
  const sessionToken = crypto.randomBytes(32).toString('hex')
  const newSession = await prisma.lms_device_sessions.create({
    data: {
      userId,
      deviceId: deviceInfo.fingerprint,
      deviceName: `${deviceInfo.browser} on ${deviceInfo.os}`,
      deviceType: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      ipAddress: deviceInfo.ipAddress,
      country: deviceInfo.country,
      city: deviceInfo.city,
      sessionToken,
      isActive: true,
    },
  })

  // Update active device count
  await prisma.user_device_limits.update({
    where: { userId },
    data: { activeDevices: activeDevices.length + 1 },
  })

  return {
    allowed: true,
    sessionToken,
    deviceSessionId: newSession.id,
  }
}

/**
 * Verify session token is valid
 */
export async function verifySession(
  sessionToken: string
): Promise<{ valid: boolean; userId?: string; deviceSessionId?: string }> {
  const session = await prisma.lms_device_sessions.findUnique({
    where: { sessionToken },
  })

  if (!session || !session.isActive || session.isRevoked) {
    return { valid: false }
  }

  // Check expiry
  if (session.expiresAt && session.expiresAt < new Date()) {
    await prisma.lms_device_sessions.update({
      where: { id: session.id },
      data: { isActive: false },
    })
    return { valid: false }
  }

  // Update last active
  await prisma.lms_device_sessions.update({
    where: { id: session.id },
    data: { lastActiveAt: new Date() },
  })

  return {
    valid: true,
    userId: session.userId,
    deviceSessionId: session.id,
  }
}

/**
 * Revoke a device session
 */
export async function revokeDevice(
  userId: string,
  deviceSessionId: string,
  reason?: string
): Promise<boolean> {
  const session = await prisma.lms_device_sessions.findFirst({
    where: { id: deviceSessionId, userId },
  })

  if (!session) return false

  await prisma.lms_device_sessions.update({
    where: { id: deviceSessionId },
    data: {
      isActive: false,
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: reason || 'Manually revoked',
    },
  })

  // Update device count
  const activeCount = await prisma.lms_device_sessions.count({
    where: { userId, isActive: true, isRevoked: false },
  })

  await prisma.user_device_limits.update({
    where: { userId },
    data: { activeDevices: activeCount },
  })

  return true
}

/**
 * Check for concurrent streaming on multiple devices
 */
export async function checkConcurrentStream(
  userId: string,
  videoLectureId: string,
  currentDeviceId: string
): Promise<{ allowed: boolean; error?: string }> {
  // Find active video progress in last 5 minutes from other devices
  const recentActivity = await prisma.video_progress.findMany({
    where: {
      userId,
      videoLectureId,
      lastWatchedAt: {
        gte: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes
      },
      lastDeviceId: { not: currentDeviceId },
    },
  })

  if (recentActivity.length > 0) {
    await logSecurityEvent({
      userId,
      videoLectureId,
      eventType: 'CONCURRENT_STREAM',
      severity: 'HIGH',
      description: `Same video being watched from ${recentActivity.length + 1} devices simultaneously`,
    })

    return {
      allowed: false,
      error: 'This video is being played on another device. Please close it there first.',
    }
  }

  return { allowed: true }
}

/**
 * Log a security event
 */
export async function logSecurityEvent(data: {
  userId?: string
  videoLectureId?: string
  deviceSessionId?: string
  eventType: LmsSecurityEvent
  severity: SecuritySeverity
  description: string
  ipAddress?: string
  userAgent?: string
  deviceFingerprint?: string
  evidence?: Record<string, unknown>
}): Promise<void> {
  await prisma.lms_security_events.create({
    data: {
      userId: data.userId,
      videoLectureId: data.videoLectureId,
      deviceSessionId: data.deviceSessionId,
      eventType: data.eventType,
      severity: data.severity,
      description: data.description,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      deviceFingerprint: data.deviceFingerprint,
      evidence: data.evidence,
    },
  })
}

/**
 * Get user's active devices
 */
export async function getUserDevices(userId: string) {
  return prisma.lms_device_sessions.findMany({
    where: { userId, isRevoked: false },
    orderBy: { lastActiveAt: 'desc' },
    select: {
      id: true,
      deviceName: true,
      deviceType: true,
      browser: true,
      os: true,
      country: true,
      city: true,
      isActive: true,
      isTrusted: true,
      lastActiveAt: true,
      firstSeenAt: true,
    },
  })
}

/**
 * Trust a device (won't be auto-revoked)
 */
export async function trustDevice(userId: string, deviceSessionId: string): Promise<boolean> {
  const result = await prisma.lms_device_sessions.updateMany({
    where: { id: deviceSessionId, userId },
    data: { isTrusted: true, trustVerifiedAt: new Date() },
  })

  return result.count > 0
}

/**
 * Restrict user account for suspicious activity
 */
export async function restrictUser(
  userId: string,
  reason: string,
  durationDays: number
): Promise<void> {
  await prisma.user_device_limits.update({
    where: { userId },
    data: {
      isRestricted: true,
      restrictedUntil: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000),
      restrictedReason: reason,
    },
  })

  // Revoke all active sessions
  await prisma.lms_device_sessions.updateMany({
    where: { userId, isActive: true },
    data: {
      isActive: false,
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: `Account restricted: ${reason}`,
    },
  })

  await logSecurityEvent({
    userId,
    eventType: 'SUSPICIOUS_ACTIVITY',
    severity: 'CRITICAL',
    description: `Account restricted for ${durationDays} days. Reason: ${reason}`,
  })
}

/**
 * Detect suspicious patterns (call periodically)
 */
export async function detectSuspiciousActivity(userId: string): Promise<{
  suspicious: boolean
  reasons: string[]
}> {
  const reasons: string[] = []
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

  // Check for many different IPs in short time
  const recentSessions = await prisma.lms_device_sessions.findMany({
    where: { userId, firstSeenAt: { gte: oneDayAgo } },
    select: { ipAddress: true },
  })

  const uniqueIPs = new Set(recentSessions.map((s) => s.ipAddress).filter(Boolean))
  if (uniqueIPs.size > 5) {
    reasons.push(`Account accessed from ${uniqueIPs.size} different IPs in 24 hours`)
  }

  // Check for rapid device changes
  const deviceChanges = await prisma.lms_device_sessions.count({
    where: { userId, firstSeenAt: { gte: oneHourAgo } },
  })

  if (deviceChanges > 3) {
    reasons.push(`${deviceChanges} new devices registered in the last hour`)
  }

  // Check security events
  const securityEvents = await prisma.lms_security_events.count({
    where: {
      userId,
      createdAt: { gte: oneDayAgo },
      severity: { in: ['HIGH', 'CRITICAL'] },
    },
  })

  if (securityEvents >= 5) {
    reasons.push(`${securityEvents} high-severity security events in 24 hours`)
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  }
}

export const deviceSecurityService = {
  generateDeviceFingerprint,
  parseUserAgent,
  checkDeviceAccess,
  verifySession,
  revokeDevice,
  checkConcurrentStream,
  logSecurityEvent,
  getUserDevices,
  trustDevice,
  restrictUser,
  detectSuspiciousActivity,
}
