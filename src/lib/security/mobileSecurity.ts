/**
 * Mobile-Specific Security Features for Test Integrity
 * Handles mobile app security, app switching detection, and mobile-specific cheating prevention
 */

export interface MobileSecurityEvent {
  type:
    | 'app_switch'
    | 'screen_record'
    | 'screenshot'
    | 'orientation_change'
    | 'notification'
    | 'proximity'
    | 'battery_low'
    | 'call_incoming'
    | 'split_screen'
  timestamp: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  details: any
  sessionId: string
  userId: string
  deviceInfo: MobileDeviceInfo
}

export interface MobileDeviceInfo {
  platform: 'iOS' | 'Android' | 'unknown'
  osVersion: string
  deviceModel: string
  screenResolution: { width: number; height: number }
  orientation: 'portrait' | 'landscape'
  batteryLevel?: number
  isCharging?: boolean
  networkType: 'wifi' | 'cellular' | 'offline'
  hasJailbreak?: boolean
  hasRoot?: boolean
  installedApps?: string[]
  runningApps?: string[]
}

export interface AppSwitchEvent {
  fromApp: string
  toApp: string
  duration: number
  timestamp: number
  isBackgroundMode: boolean
}

export interface ProximityEvent {
  isNear: boolean
  timestamp: number
  distance?: number
}

export interface OrientationLock {
  locked: boolean
  allowedOrientations: ('portrait' | 'landscape')[]
  currentOrientation: string
}

export interface MobileSecurityConfig {
  allowAppSwitching: boolean
  maxAppSwitches: number
  allowScreenRecording: boolean
  allowScreenshots: boolean
  enableProximityMonitoring: boolean
  lockOrientation: boolean
  allowedOrientations: ('portrait' | 'landscape')[]
  blockNotifications: boolean
  allowIncomingCalls: boolean
  allowSplitScreen: boolean
  requireFullscreenMode: boolean
  monitorRunningApps: boolean
  detectJailbreakRoot: boolean
}

export class MobileSecurityManager {
  private config: MobileSecurityConfig
  private violations: MobileSecurityEvent[] = []
  private isActive: boolean = false
  private sessionId: string
  private userId: string
  private deviceInfo: MobileDeviceInfo
  private onViolation: (event: MobileSecurityEvent) => void
  private appSwitchHistory: AppSwitchEvent[] = []
  private proximityHistory: ProximityEvent[] = []
  private orientationLock: OrientationLock | null = null

  // Mobile-specific event listeners
  private visibilityChangeHandler: (() => void) | null = null
  private orientationChangeHandler: (() => void) | null = null
  private touchStartHandler: ((event: TouchEvent) => void) | null = null
  private deviceMotionHandler: ((event: DeviceMotionEvent) => void) | null = null
  private batteryhHandler: (() => void) | null = null

  constructor(
    sessionId: string,
    userId: string,
    config: Partial<MobileSecurityConfig> = {},
    onViolation: (event: MobileSecurityEvent) => void
  ) {
    this.sessionId = sessionId
    this.userId = userId
    this.onViolation = onViolation
    this.config = {
      allowAppSwitching: false,
      maxAppSwitches: 3,
      allowScreenRecording: false,
      allowScreenshots: false,
      enableProximityMonitoring: true,
      lockOrientation: true,
      allowedOrientations: ['portrait'],
      blockNotifications: true,
      allowIncomingCalls: false,
      allowSplitScreen: false,
      requireFullscreenMode: true,
      monitorRunningApps: true,
      detectJailbreakRoot: true,
      ...config,
    }

    this.deviceInfo = this.getDeviceInfo()
  }

  /**
   * Start mobile security monitoring
   */
  async startMonitoring(): Promise<void> {
    if (this.isActive) return

    this.isActive = true

    // Check if running on mobile
    if (!this.isMobileDevice()) {
      console.warn('Mobile security features only work on mobile devices')
      return
    }

    // Initialize security features
    await this.initializeMobileSecurity()

    console.log('📱 Mobile security monitoring activated')
  }

  /**
   * Stop mobile security monitoring
   */
  stopMonitoring(): void {
    if (!this.isActive) return

    this.isActive = false
    this.removeEventListeners()
    this.restoreDeviceSettings()

    console.log('📱 Mobile security monitoring deactivated')
  }

  /**
   * Initialize mobile security features
   */
  private async initializeMobileSecurity(): Promise<void> {
    // Set up app switching detection
    this.setupAppSwitchingDetection()

    // Set up screen recording detection
    this.setupScreenRecordingDetection()

    // Set up screenshot prevention
    this.setupScreenshotPrevention()

    // Set up orientation lock
    if (this.config.lockOrientation) {
      this.setupOrientationLock()
    }

    // Set up proximity monitoring
    if (this.config.enableProximityMonitoring) {
      this.setupProximityMonitoring()
    }

    // Set up notification blocking
    if (this.config.blockNotifications) {
      this.setupNotificationBlocking()
    }

    // Detect jailbreak/root
    if (this.config.detectJailbreakRoot) {
      this.detectJailbreakRoot()
    }

    // Set up battery monitoring
    this.setupBatteryMonitoring()

    // Set up touch monitoring
    this.setupTouchMonitoring()
  }

  /**
   * Set up app switching detection
   */
  private setupAppSwitchingDetection(): void {
    this.visibilityChangeHandler = () => {
      if (document.hidden) {
        this.recordAppSwitch('test_app', 'unknown', true)
      } else {
        this.recordAppSwitch('unknown', 'test_app', false)
      }
    }

    document.addEventListener('visibilitychange', this.visibilityChangeHandler)

    // iOS specific - page focus/blur
    window.addEventListener('pagehide', () => {
      this.recordAppSwitch('test_app', 'background', true)
    })

    window.addEventListener('pageshow', () => {
      this.recordAppSwitch('background', 'test_app', false)
    })

    // Android specific - focus events
    window.addEventListener('blur', () => {
      this.recordAppSwitch('test_app', 'unknown', true)
    })

    window.addEventListener('focus', () => {
      this.recordAppSwitch('unknown', 'test_app', false)
    })
  }

  /**
   * Record app switch event
   */
  private recordAppSwitch(fromApp: string, toApp: string, isBackgroundMode: boolean): void {
    const timestamp = Date.now()
    const lastSwitch = this.appSwitchHistory[this.appSwitchHistory.length - 1]
    const duration = lastSwitch ? timestamp - lastSwitch.timestamp : 0

    const switchEvent: AppSwitchEvent = {
      fromApp,
      toApp,
      duration,
      timestamp,
      isBackgroundMode,
    }

    this.appSwitchHistory.push(switchEvent)

    // Check if app switching is allowed
    if (!this.config.allowAppSwitching && isBackgroundMode) {
      this.recordViolation('app_switch', 'critical', {
        action: 'app_switched_away',
        fromApp,
        toApp,
        duration,
      })
    }

    // Check app switch limits
    const recentSwitches = this.appSwitchHistory.filter(
      (event) => timestamp - event.timestamp < 300000 // Last 5 minutes
    ).length

    if (recentSwitches > this.config.maxAppSwitches) {
      this.recordViolation('app_switch', 'high', {
        action: 'too_many_app_switches',
        count: recentSwitches,
        limit: this.config.maxAppSwitches,
      })
    }

    // Keep only recent history
    this.appSwitchHistory = this.appSwitchHistory.slice(-20)
  }

  /**
   * Set up screen recording detection
   */
  private setupScreenRecordingDetection(): void {
    if (!this.config.allowScreenRecording) {
      // iOS specific - detect screen recording
      if (this.deviceInfo.platform === 'iOS') {
        // Use media capture detection
        setInterval(() => {
          if (this.detectScreenRecording()) {
            this.recordViolation('screen_record', 'critical', {
              action: 'screen_recording_detected',
              platform: 'iOS',
            })
          }
        }, 5000)
      }

      // Android specific - check for screen recording apps
      if (this.deviceInfo.platform === 'Android') {
        this.detectAndroidScreenRecording()
      }

      // Generic detection methods
      this.setupGenericScreenRecordingDetection()
    }
  }

  /**
   * Detect screen recording (iOS specific)
   */
  private detectScreenRecording(): boolean {
    try {
      // Check if screen capture is active
      if ('getDisplayMedia' in navigator.mediaDevices) {
        // This would be blocked by browser security, but we can try to detect
        return false
      }

      // Check for screen recording status (iOS 11+)
      if ((window as any).webkit?.messageHandlers?.screenRecordingStatus) {
        // This would require native app integration
        return false
      }

      return false
    } catch (error) {
      return false
    }
  }

  /**
   * Detect Android screen recording
   */
  private detectAndroidScreenRecording(): void {
    // Check for common screen recording apps
    const screenRecordingApps = [
      'com.mobizen.mirroring.uimode',
      'com.screenrecorder.android',
      'com.hecorat.screenrecorder.free',
      'com.kimcy929.screenrecorder',
    ]

    // This would require native app integration to check running apps
    // For web-based detection, we rely on other methods
  }

  /**
   * Set up generic screen recording detection
   */
  private setupGenericScreenRecordingDetection(): void {
    // Monitor for suspicious activity patterns
    let screenActivityCount = 0
    const resetInterval = 60000 // 1 minute

    setInterval(() => {
      screenActivityCount = 0
    }, resetInterval)

    // Monitor touch patterns that might indicate screen recording setup
    document.addEventListener('touchstart', () => {
      screenActivityCount++
      if (screenActivityCount > 50) {
        // Unusually high activity
        this.recordViolation('screen_record', 'medium', {
          action: 'suspicious_touch_activity',
          count: screenActivityCount,
        })
      }
    })
  }

  /**
   * Set up screenshot prevention
   */
  private setupScreenshotPrevention(): void {
    if (!this.config.allowScreenshots) {
      // Add security flag to prevent screenshots (Android)
      if (this.deviceInfo.platform === 'Android') {
        try {
          // This would require native app integration
          // document.body.style.setProperty('-webkit-user-select', 'none')
          // document.body.style.setProperty('-webkit-touch-callout', 'none')
        } catch (error) {
          console.warn('Could not set screenshot prevention flags')
        }
      }

      // iOS screenshot detection
      if (this.deviceInfo.platform === 'iOS') {
        // Listen for screenshot gestures
        this.detectiOSScreenshot()
      }

      // Add watermark overlay to discourage screenshots
      this.addWatermarkOverlay()
    }
  }

  /**
   * Detect iOS screenshot attempts
   */
  private detectiOSScreenshot(): void {
    // Monitor for screenshot key combinations
    document.addEventListener('keydown', (event) => {
      // iOS screenshot: Home + Power or Volume Up + Power
      if (
        event.key === 'PrintScreen' ||
        (event.metaKey && event.key === 'Shift') ||
        (event.ctrlKey && event.key === 'Shift')
      ) {
        this.recordViolation('screenshot', 'high', {
          action: 'screenshot_key_combination',
          keys: `${event.metaKey ? 'Meta+' : ''}${event.ctrlKey ? 'Ctrl+' : ''}${event.key}`,
        })
      }
    })

    // Monitor for rapid screen touches (screenshot gesture)
    let touchCount = 0
    let touchStartTime = 0

    document.addEventListener('touchstart', (event) => {
      if (event.touches.length >= 2) {
        touchCount++
        if (touchCount === 1) {
          touchStartTime = Date.now()
        }
      }
    })

    document.addEventListener('touchend', () => {
      if (touchCount > 0 && Date.now() - touchStartTime < 1000) {
        this.recordViolation('screenshot', 'medium', {
          action: 'multi_touch_gesture',
          touchCount,
          duration: Date.now() - touchStartTime,
        })
      }
      touchCount = 0
    })
  }

  /**
   * Add watermark overlay
   */
  private addWatermarkOverlay(): void {
    const watermark = document.createElement('div')
    watermark.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background-image:
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 50px,
          rgba(255,0,0,0.05) 50px,
          rgba(255,0,0,0.05) 100px
        );
      font-family: Arial, sans-serif;
      color: rgba(255,0,0,0.2);
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 1.2;
    `
    watermark.innerHTML = `
      SECURE TEST SESSION<br>
      ${this.sessionId}<br>
      ${new Date().toISOString()}
    `
    document.body.appendChild(watermark)
  }

  /**
   * Set up orientation lock
   */
  private setupOrientationLock(): void {
    const lockOrientation = () => {
      try {
        if (screen.orientation && 'lock' in screen.orientation) {
          const orientation = this.config.allowedOrientations[0]
          const orientationLockType = `${orientation}-primary` as any
          ;(screen.orientation.lock as any)(orientationLockType).catch((error: any) => {
            console.warn('Could not lock screen orientation:', error)
          })
        }
      } catch (error) {
        console.warn('Screen orientation lock not supported')
      }
    }

    // Lock orientation initially
    lockOrientation()

    // Monitor orientation changes
    this.orientationChangeHandler = () => {
      const currentOrientation = this.getCurrentOrientation()

      if (!this.config.allowedOrientations.includes(currentOrientation as any)) {
        this.recordViolation('orientation_change', 'medium', {
          action: 'orientation_violation',
          currentOrientation,
          allowedOrientations: this.config.allowedOrientations,
        })

        // Try to lock orientation again
        setTimeout(lockOrientation, 500)
      }
    }

    screen.orientation?.addEventListener('change', this.orientationChangeHandler)
    window.addEventListener('orientationchange', this.orientationChangeHandler)
  }

  /**
   * Set up proximity monitoring
   */
  private setupProximityMonitoring(): void {
    if ('ProximitySensor' in window) {
      try {
        const sensor = new (window as any).ProximitySensor({ frequency: 10 })
        sensor.addEventListener('reading', () => {
          const proximityEvent: ProximityEvent = {
            isNear: sensor.near,
            timestamp: Date.now(),
            distance: sensor.distance,
          }

          this.proximityHistory.push(proximityEvent)

          if (sensor.near) {
            this.recordViolation('proximity', 'low', {
              action: 'proximity_detected',
              distance: sensor.distance,
            })
          }

          // Keep only recent history
          this.proximityHistory = this.proximityHistory.slice(-50)
        })

        sensor.start()
      } catch (error) {
        console.warn('Proximity sensor not available:', error)
      }
    }
  }

  /**
   * Set up notification blocking
   */
  private setupNotificationBlocking(): void {
    if (this.config.blockNotifications) {
      // Request notification permission to detect if notifications are enabled
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            this.recordViolation('notification', 'low', {
              action: 'notifications_enabled',
              permission,
            })
          }
        })
      }

      // Monitor for notification sounds or vibrations
      this.monitorNotificationActivity()
    }
  }

  /**
   * Monitor notification activity
   */
  private monitorNotificationActivity(): void {
    // Monitor for vibration API usage (could indicate notifications)
    const originalVibrate = navigator.vibrate
    if (originalVibrate) {
      navigator.vibrate = function (pattern) {
        // Log vibration events
        console.warn('Vibration detected during test')
        return originalVibrate.call(navigator, pattern)
      }
    }

    // Monitor for audio context creation (notification sounds)
    const originalAudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (originalAudioContext) {
      const OriginalConstructor = originalAudioContext
      window.AudioContext = function (this: AudioContext, ...args: any[]) {
        console.warn('Audio context created during test')
        return new OriginalConstructor(...(args as [AudioContextOptions?]))
      } as any
    }
  }

  /**
   * Detect jailbreak/root
   */
  private detectJailbreakRoot(): void {
    // iOS jailbreak detection
    if (this.deviceInfo.platform === 'iOS') {
      this.detectiOSJailbreak()
    }

    // Android root detection
    if (this.deviceInfo.platform === 'Android') {
      this.detectAndroidRoot()
    }
  }

  /**
   * Detect iOS jailbreak
   */
  private detectiOSJailbreak(): void {
    // Check for common jailbreak files/apps
    const jailbreakIndicators = [
      'cydia://',
      'file:///Applications/Cydia.app',
      'file:///usr/sbin/sshd',
      'file:///etc/apt',
    ]

    // This would require native app integration for proper detection
    // For web apps, detection is limited
  }

  /**
   * Detect Android root
   */
  private detectAndroidRoot(): void {
    // Check for root indicators
    try {
      // These checks would require native app integration
      // Web browsers don't have access to root detection methods
    } catch (error) {
      console.warn('Root detection not available in web context')
    }
  }

  /**
   * Set up battery monitoring
   */
  private setupBatteryMonitoring(): void {
    if ('getBattery' in navigator) {
      ;(navigator as any)
        .getBattery()
        .then((battery: any) => {
          this.deviceInfo.batteryLevel = battery.level * 100
          this.deviceInfo.isCharging = battery.charging

          battery.addEventListener('levelchange', () => {
            this.deviceInfo.batteryLevel = battery.level * 100

            // Warn if battery is critically low
            if (battery.level < 0.1) {
              this.recordViolation('battery_low', 'medium', {
                action: 'critical_battery_level',
                level: battery.level * 100,
              })
            }
          })

          battery.addEventListener('chargingchange', () => {
            this.deviceInfo.isCharging = battery.charging
          })
        })
        .catch((error: any) => {
          console.warn('Battery API not available:', error)
        })
    }
  }

  /**
   * Set up touch monitoring
   */
  private setupTouchMonitoring(): void {
    let touchStartTime = 0
    let touchEndTime = 0

    this.touchStartHandler = (event: TouchEvent) => {
      touchStartTime = Date.now()

      // Detect split-screen mode by unusual touch areas
      if (!this.config.allowSplitScreen) {
        const screenHeight = window.screen.height
        const touchY = event.touches[0].clientY

        // Check if touch is in potential split-screen boundary area
        if (touchY < screenHeight * 0.1 || touchY > screenHeight * 0.9) {
          this.recordViolation('split_screen', 'medium', {
            action: 'split_screen_boundary_touch',
            touchY,
            screenHeight,
          })
        }
      }

      // Detect multiple simultaneous touches (could indicate assistance)
      if (event.touches.length > 1) {
        this.recordViolation('app_switch', 'low', {
          action: 'multi_touch_detected',
          touchCount: event.touches.length,
        })
      }
    }

    document.addEventListener('touchstart', this.touchStartHandler)

    document.addEventListener('touchend', () => {
      touchEndTime = Date.now()
      const touchDuration = touchEndTime - touchStartTime

      // Unusually long touches might indicate reading assistance tools
      if (touchDuration > 5000) {
        this.recordViolation('app_switch', 'low', {
          action: 'long_touch_detected',
          duration: touchDuration,
        })
      }
    })
  }

  /**
   * Get device information
   */
  private getDeviceInfo(): MobileDeviceInfo {
    const userAgent = navigator.userAgent
    const platform = this.detectPlatform(userAgent)

    return {
      platform,
      osVersion: this.extractOSVersion(userAgent, platform),
      deviceModel: this.extractDeviceModel(userAgent, platform),
      screenResolution: {
        width: window.screen.width,
        height: window.screen.height,
      },
      orientation: this.getCurrentOrientation(),
      networkType: this.getNetworkType(),
    }
  }

  /**
   * Detect mobile platform
   */
  private detectPlatform(userAgent: string): 'iOS' | 'Android' | 'unknown' {
    if (/iPad|iPhone|iPod/.test(userAgent)) return 'iOS'
    if (/Android/.test(userAgent)) return 'Android'
    return 'unknown'
  }

  /**
   * Extract OS version
   */
  private extractOSVersion(userAgent: string, platform: 'iOS' | 'Android' | 'unknown'): string {
    if (platform === 'iOS') {
      const match = userAgent.match(/OS (\d+_\d+)/)
      return match ? match[1].replace('_', '.') : 'unknown'
    }

    if (platform === 'Android') {
      const match = userAgent.match(/Android (\d+\.?\d*)/)
      return match ? match[1] : 'unknown'
    }

    return 'unknown'
  }

  /**
   * Extract device model
   */
  private extractDeviceModel(userAgent: string, platform: 'iOS' | 'Android' | 'unknown'): string {
    if (platform === 'iOS') {
      if (userAgent.includes('iPad')) return 'iPad'
      if (userAgent.includes('iPhone')) return 'iPhone'
      if (userAgent.includes('iPod')) return 'iPod'
    }

    if (platform === 'Android') {
      const match = userAgent.match(/\(([^)]+)\)/)
      return match ? match[1] : 'Android Device'
    }

    return 'unknown'
  }

  /**
   * Get current orientation
   */
  private getCurrentOrientation(): 'portrait' | 'landscape' {
    if (screen.orientation) {
      return screen.orientation.angle === 0 || screen.orientation.angle === 180
        ? 'portrait'
        : 'landscape'
    }

    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  }

  /**
   * Get network type
   */
  private getNetworkType(): 'wifi' | 'cellular' | 'offline' {
    if (!navigator.onLine) return 'offline'

    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection

    if (connection) {
      if (connection.type === 'wifi') return 'wifi'
      if (connection.type === 'cellular') return 'cellular'
    }

    return 'wifi' // default assumption
  }

  /**
   * Check if device is mobile
   */
  private isMobileDevice(): boolean {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    )
  }

  /**
   * Record a security violation
   */
  private recordViolation(
    type: MobileSecurityEvent['type'],
    severity: MobileSecurityEvent['severity'],
    details: any
  ): void {
    const event: MobileSecurityEvent = {
      type,
      severity,
      details,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      deviceInfo: this.deviceInfo,
    }

    this.violations.push(event)
    console.warn(`📱 Mobile security violation:`, event)

    // Trigger callback
    this.onViolation(event)

    // Keep only recent violations
    this.violations = this.violations.slice(-50)
  }

  /**
   * Remove event listeners
   */
  private removeEventListeners(): void {
    if (this.visibilityChangeHandler) {
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler)
    }
    if (this.orientationChangeHandler) {
      screen.orientation?.removeEventListener('change', this.orientationChangeHandler)
      window.removeEventListener('orientationchange', this.orientationChangeHandler)
    }
    if (this.touchStartHandler) {
      document.removeEventListener('touchstart', this.touchStartHandler)
    }
  }

  /**
   * Restore device settings
   */
  private restoreDeviceSettings(): void {
    try {
      // Unlock orientation
      if (screen.orientation && 'unlock' in screen.orientation) {
        screen.orientation.unlock()
      }
    } catch (error) {
      console.warn('Could not restore device settings:', error)
    }
  }

  /**
   * Get mobile security status
   */
  getMobileSecurityStatus() {
    return {
      isActive: this.isActive,
      deviceInfo: this.deviceInfo,
      violationCount: this.violations.length,
      violations: this.violations,
      appSwitchCount: this.appSwitchHistory.length,
      lastAppSwitch: this.appSwitchHistory[this.appSwitchHistory.length - 1] || null,
      orientationLock: this.orientationLock,
      proximityEvents: this.proximityHistory.length,
    }
  }

  /**
   * Generate mobile security report
   */
  generateMobileSecurityReport() {
    const violationsByType = this.violations.reduce(
      (acc, violation) => {
        if (!acc[violation.type]) {
          acc[violation.type] = []
        }
        acc[violation.type].push(violation)
        return acc
      },
      {} as Record<string, MobileSecurityEvent[]>
    )

    return {
      sessionId: this.sessionId,
      userId: this.userId,
      deviceInfo: this.deviceInfo,
      totalViolations: this.violations.length,
      violationsByType: Object.entries(violationsByType).map(([type, events]) => ({
        type,
        count: events.length,
        lastOccurrence: Math.max(...events.map((e) => e.timestamp)),
        severity: events.reduce(
          (max, e) => {
            const levels = { low: 1, medium: 2, high: 3, critical: 4 }
            return levels[e.severity] > levels[max] ? e.severity : max
          },
          'low' as MobileSecurityEvent['severity']
        ),
      })),
      appSwitchHistory: this.appSwitchHistory,
      securityFeatures: {
        appSwitchingBlocked: !this.config.allowAppSwitching,
        screenRecordingBlocked: !this.config.allowScreenRecording,
        screenshotsBlocked: !this.config.allowScreenshots,
        orientationLocked: this.config.lockOrientation,
        notificationsBlocked: this.config.blockNotifications,
      },
      recommendations: this.generateMobileRecommendations(),
    }
  }

  /**
   * Generate mobile security recommendations
   */
  private generateMobileRecommendations(): string[] {
    const recommendations: string[] = []
    const violationTypes = [...new Set(this.violations.map((v) => v.type))]

    if (violationTypes.includes('app_switch')) {
      recommendations.push('Consider implementing stricter app switching penalties')
    }
    if (violationTypes.includes('screen_record')) {
      recommendations.push('Enable native app-level screen recording prevention')
    }
    if (violationTypes.includes('screenshot')) {
      recommendations.push('Implement stronger screenshot detection and prevention')
    }
    if (violationTypes.includes('orientation_change')) {
      recommendations.push('Enforce stricter orientation locks')
    }
    if (this.deviceInfo.hasJailbreak || this.deviceInfo.hasRoot) {
      recommendations.push('Block access from jailbroken/rooted devices')
    }

    return recommendations
  }
}

export default MobileSecurityManager
