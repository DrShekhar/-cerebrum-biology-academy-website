/**
 * Session Integrity System for Test Security
 * Handles session validation, encryption, and device verification
 */

import { BrowserFingerprinting } from './browserSecurity'

export interface TestSession {
  sessionId: string
  userId: string
  testId: string
  startTime: number
  expiryTime: number
  deviceFingerprint: string
  ipAddress: string
  geolocation?: {
    latitude: number
    longitude: number
    accuracy: number
    country?: string
    city?: string
  }
  browserInfo: {
    userAgent: string
    language: string
    platform: string
    viewport: { width: number; height: number }
  }
  encryptionKey: string
  isValid: boolean
  violations: number
  lastHeartbeat: number
}

export interface SessionValidationResult {
  isValid: boolean
  reason?: string
  action: 'continue' | 'warn' | 'terminate'
  newSession?: TestSession
}

export interface HeartbeatData {
  timestamp: number
  sessionId: string
  isActive: boolean
  currentQuestionId?: string
  batteryLevel?: number
  networkStatus: 'online' | 'offline' | 'slow'
  performanceMetrics: {
    memoryUsage: number
    cpuUsage: number
    frameRate: number
  }
}

export class SessionIntegrityManager {
  private session: TestSession | null = null
  private heartbeatInterval: NodeJS.Timeout | null = null
  private encryptionKey: CryptoKey | null = null
  private onSessionViolation: (violation: string, severity: 'low' | 'medium' | 'high' | 'critical') => void
  private onSessionTerminated: (reason: string) => void

  constructor(
    onSessionViolation: (violation: string, severity: 'low' | 'medium' | 'high' | 'critical') => void,
    onSessionTerminated: (reason: string) => void
  ) {
    this.onSessionViolation = onSessionViolation
    this.onSessionTerminated = onSessionTerminated
  }

  /**
   * Create a new secure test session
   */
  async createSession(userId: string, testId: string, durationMinutes: number): Promise<TestSession> {
    const sessionId = await this.generateSecureSessionId()
    const encryptionKey = await this.generateEncryptionKey()
    const deviceFingerprint = await BrowserFingerprinting.generateFingerprint()
    const ipAddress = await this.getClientIP()
    const geolocation = await this.getGeolocation()

    const session: TestSession = {
      sessionId,
      userId,
      testId,
      startTime: Date.now(),
      expiryTime: Date.now() + (durationMinutes * 60 * 1000),
      deviceFingerprint,
      ipAddress,
      geolocation,
      browserInfo: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      encryptionKey: await this.exportKey(encryptionKey),
      isValid: true,
      violations: 0,
      lastHeartbeat: Date.now()
    }

    this.session = session
    this.encryptionKey = encryptionKey
    this.startHeartbeat()

    console.log('🔐 Secure test session created:', sessionId)
    return session
  }

  /**
   * Validate current session integrity
   */
  async validateSession(): Promise<SessionValidationResult> {
    if (!this.session) {
      return {
        isValid: false,
        reason: 'No active session',
        action: 'terminate'
      }
    }

    // Check session expiry
    if (Date.now() > this.session.expiryTime) {
      return {
        isValid: false,
        reason: 'Session expired',
        action: 'terminate'
      }
    }

    // Validate device fingerprint
    const currentFingerprint = await BrowserFingerprinting.generateFingerprint()
    if (currentFingerprint !== this.session.deviceFingerprint) {
      this.session.violations++
      this.onSessionViolation('Device fingerprint mismatch detected', 'critical')

      if (this.session.violations >= 3) {
        return {
          isValid: false,
          reason: 'Multiple device validation failures',
          action: 'terminate'
        }
      }

      return {
        isValid: false,
        reason: 'Device fingerprint changed',
        action: 'warn'
      }
    }

    // Validate IP address
    const currentIP = await this.getClientIP()
    if (currentIP !== this.session.ipAddress) {
      this.session.violations++
      this.onSessionViolation('IP address changed during test', 'high')

      // Allow some tolerance for mobile networks or VPN switches
      if (this.session.violations >= 2) {
        return {
          isValid: false,
          reason: 'Multiple IP address changes detected',
          action: 'terminate'
        }
      }

      return {
        isValid: true,
        reason: 'IP address changed',
        action: 'warn'
      }
    }

    // Check heartbeat freshness
    const timeSinceLastHeartbeat = Date.now() - this.session.lastHeartbeat
    if (timeSinceLastHeartbeat > 60000) { // 1 minute
      this.onSessionViolation('Session heartbeat missed', 'medium')

      if (timeSinceLastHeartbeat > 300000) { // 5 minutes
        return {
          isValid: false,
          reason: 'Session heartbeat timeout',
          action: 'terminate'
        }
      }
    }

    return {
      isValid: true,
      action: 'continue'
    }
  }

  /**
   * Generate a cryptographically secure session ID
   */
  private async generateSecureSessionId(): Promise<string> {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Generate encryption key for session data
   */
  private async generateEncryptionKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    )
  }

  /**
   * Export encryption key as string
   */
  private async exportKey(key: CryptoKey): Promise<string> {
    const exported = await crypto.subtle.exportKey('raw', key)
    return Array.from(new Uint8Array(exported))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
  }

  /**
   * Import encryption key from string
   */
  private async importKey(keyString: string): Promise<CryptoKey> {
    const keyBytes = new Uint8Array(
      keyString.match(/.{2}/g)?.map(byte => parseInt(byte, 16)) || []
    )

    return await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    )
  }

  /**
   * Encrypt sensitive data
   */
  async encryptData(data: string): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('No encryption key available')
    }

    const encoder = new TextEncoder()
    const dataBytes = encoder.encode(data)
    const iv = crypto.getRandomValues(new Uint8Array(12))

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.encryptionKey,
      dataBytes
    )

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength)
    combined.set(iv)
    combined.set(new Uint8Array(encrypted), iv.length)

    return btoa(String.fromCharCode(...combined))
  }

  /**
   * Decrypt sensitive data
   */
  async decryptData(encryptedData: string): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('No encryption key available')
    }

    const combined = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    )

    const iv = combined.slice(0, 12)
    const encrypted = combined.slice(12)

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      this.encryptionKey,
      encrypted
    )

    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  }

  /**
   * Get client IP address
   */
  private async getClientIP(): Promise<string> {
    try {
      // In a real implementation, this would call your backend API
      // For now, we'll use a public IP service
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
    } catch (error) {
      console.warn('Failed to get IP address:', error)
      return 'unknown'
    }
  }

  /**
   * Get user's geolocation
   */
  private async getGeolocation(): Promise<TestSession['geolocation']> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(undefined)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          })
        },
        (error) => {
          console.warn('Geolocation error:', error)
          resolve(undefined)
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    })
  }

  /**
   * Start session heartbeat monitoring
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(async () => {
      if (!this.session) return

      const heartbeatData: HeartbeatData = {
        timestamp: Date.now(),
        sessionId: this.session.sessionId,
        isActive: !document.hidden,
        networkStatus: navigator.onLine ? 'online' : 'offline',
        performanceMetrics: this.getPerformanceMetrics()
      }

      // Add battery info if available
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery()
          heartbeatData.batteryLevel = battery.level
        } catch (e) {
          // Battery API not available
        }
      }

      await this.sendHeartbeat(heartbeatData)
      this.session.lastHeartbeat = Date.now()
    }, 30000) // Every 30 seconds
  }

  /**
   * Send heartbeat to server
   */
  private async sendHeartbeat(heartbeatData: HeartbeatData): Promise<void> {
    try {
      const encryptedData = await this.encryptData(JSON.stringify(heartbeatData))

      await fetch('/api/test/heartbeat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.session?.sessionId,
          data: encryptedData
        })
      })
    } catch (error) {
      console.warn('Failed to send heartbeat:', error)
      this.onSessionViolation('Heartbeat transmission failed', 'medium')
    }
  }

  /**
   * Get performance metrics
   */
  private getPerformanceMetrics() {
    const performance = window.performance

    return {
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
      cpuUsage: 0, // Not directly available in browser
      frameRate: this.estimateFrameRate()
    }
  }

  /**
   * Estimate current frame rate
   */
  private estimateFrameRate(): number {
    let lastTime = performance.now()
    let frameCount = 0
    let fps = 60

    const countFrames = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        fps = frameCount
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(countFrames)
    }

    requestAnimationFrame(countFrames)
    return fps
  }

  /**
   * Validate geolocation hasn't changed significantly
   */
  async validateLocation(): Promise<boolean> {
    if (!this.session?.geolocation) return true

    const currentLocation = await this.getGeolocation()
    if (!currentLocation) return true

    const distance = this.calculateDistance(
      this.session.geolocation.latitude,
      this.session.geolocation.longitude,
      currentLocation.latitude,
      currentLocation.longitude
    )

    // Allow up to 50km movement (to account for GPS inaccuracy and legitimate movement)
    if (distance > 50) {
      this.onSessionViolation(`Location changed by ${distance.toFixed(2)}km`, 'high')
      return false
    }

    return true
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  /**
   * Convert degrees to radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  /**
   * Terminate session
   */
  terminateSession(reason: string): void {
    if (this.session) {
      this.session.isValid = false
      console.log(`🚫 Session terminated: ${reason}`)
    }

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }

    this.onSessionTerminated(reason)
  }

  /**
   * Get session status
   */
  getSessionStatus() {
    if (!this.session) {
      return {
        isActive: false,
        reason: 'No session'
      }
    }

    const timeRemaining = this.session.expiryTime - Date.now()
    const isExpired = timeRemaining <= 0

    return {
      isActive: this.session.isValid && !isExpired,
      sessionId: this.session.sessionId,
      timeRemaining: Math.max(0, timeRemaining),
      violations: this.session.violations,
      lastHeartbeat: this.session.lastHeartbeat,
      deviceFingerprint: this.session.deviceFingerprint,
      isExpired
    }
  }

  /**
   * Extend session time (for legitimate reasons)
   */
  extendSession(additionalMinutes: number): boolean {
    if (!this.session || !this.session.isValid) {
      return false
    }

    this.session.expiryTime += additionalMinutes * 60 * 1000
    console.log(`⏰ Session extended by ${additionalMinutes} minutes`)
    return true
  }

  /**
   * Generate session report
   */
  generateSessionReport() {
    if (!this.session) {
      return null
    }

    const totalDuration = Date.now() - this.session.startTime
    const expectedDuration = this.session.expiryTime - this.session.startTime

    return {
      sessionId: this.session.sessionId,
      userId: this.session.userId,
      testId: this.session.testId,
      startTime: new Date(this.session.startTime).toISOString(),
      endTime: new Date().toISOString(),
      totalDuration: totalDuration,
      expectedDuration: expectedDuration,
      wasCompleted: totalDuration >= expectedDuration * 0.9, // 90% completion threshold
      violations: this.session.violations,
      deviceInfo: {
        fingerprint: this.session.deviceFingerprint,
        browser: this.session.browserInfo,
        ipAddress: this.session.ipAddress,
        geolocation: this.session.geolocation
      },
      integrity: {
        sessionValid: this.session.isValid,
        heartbeatStatus: Date.now() - this.session.lastHeartbeat < 60000 ? 'active' : 'stale'
      }
    }
  }
}

export default SessionIntegrityManager