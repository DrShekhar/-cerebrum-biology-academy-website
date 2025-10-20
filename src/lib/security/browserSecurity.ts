/**
 * Browser-Level Security Framework for Test Integrity
 * Implements comprehensive anti-cheating measures
 */

export interface SecurityEvent {
  type: 'tab_switch' | 'window_blur' | 'fullscreen_exit' | 'context_menu' | 'devtools' | 'copy_paste' | 'screenshot' | 'zoom_change' | 'window_resize'
  timestamp: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  details: any
  sessionId: string
  userId: string
}

export interface SecurityConfig {
  enforceFullscreen: boolean
  allowTabSwitching: boolean
  maxTabSwitches: number
  allowCopyPaste: boolean
  allowRightClick: boolean
  allowDevTools: boolean
  allowScreenshots: boolean
  maxZoomLevel: number
  minZoomLevel: number
  allowWindowResize: boolean
  autoTerminateOnViolation: boolean
  warningThreshold: number
}

export class BrowserSecurityManager {
  private config: SecurityConfig
  private violations: SecurityEvent[] = []
  private isActive: boolean = false
  private sessionId: string
  private userId: string
  private onViolation: (event: SecurityEvent) => void
  private originalVisibilityHandler: ((event: Event) => void) | null = null
  private keyboardHandler: ((event: KeyboardEvent) => void) | null = null
  private mouseHandler: ((event: MouseEvent) => void) | null = null
  private resizeHandler: ((event: Event) => void) | null = null
  private fullscreenHandler: ((event: Event) => void) | null = null
  private beforeUnloadHandler: ((event: BeforeUnloadEvent) => void) | null = null

  constructor(
    sessionId: string,
    userId: string,
    config: Partial<SecurityConfig> = {},
    onViolation: (event: SecurityEvent) => void
  ) {
    this.sessionId = sessionId
    this.userId = userId
    this.onViolation = onViolation
    this.config = {
      enforceFullscreen: true,
      allowTabSwitching: false,
      maxTabSwitches: 3,
      allowCopyPaste: false,
      allowRightClick: false,
      allowDevTools: false,
      allowScreenshots: false,
      maxZoomLevel: 150,
      minZoomLevel: 75,
      allowWindowResize: false,
      autoTerminateOnViolation: false,
      warningThreshold: 5,
      ...config
    }
  }

  /**
   * Start security monitoring
   */
  startMonitoring(): void {
    if (this.isActive) return

    this.isActive = true
    this.setupEventListeners()
    this.enforceFullscreen()
    this.disableDevTools()
    this.preventScreenshots()
    this.monitorZoomLevel()

    console.log('🔒 Test security monitoring activated')
  }

  /**
   * Stop security monitoring and restore normal browser behavior
   */
  stopMonitoring(): void {
    if (!this.isActive) return

    this.isActive = false
    this.removeEventListeners()
    this.exitFullscreen()

    console.log('🔓 Test security monitoring deactivated')
  }

  /**
   * Set up all security event listeners
   */
  private setupEventListeners(): void {
    // Tab/Window focus monitoring
    this.originalVisibilityHandler = () => {
      if (document.hidden) {
        this.recordViolation('tab_switch', 'high', {
          action: 'tab_switched_away',
          visibilityState: document.visibilityState
        })
      }
    }
    document.addEventListener('visibilitychange', this.originalVisibilityHandler)

    // Window blur detection
    const blurHandler = () => {
      this.recordViolation('window_blur', 'medium', {
        action: 'window_lost_focus'
      })
    }
    window.addEventListener('blur', blurHandler)

    // Keyboard event monitoring
    this.keyboardHandler = (event: KeyboardEvent) => {
      // Prevent common cheating shortcuts
      const forbiddenKeys = [
        'F12', // Dev tools
        'PrintScreen', // Screenshots
        'Insert' // Screenshots on some systems
      ]

      // Prevent Ctrl+combinations
      if (event.ctrlKey || event.metaKey) {
        const forbiddenCombos = ['c', 'v', 'x', 'a', 's', 'z', 'y', 'f', 'h', 'r', 'shift+i', 'shift+j', 'shift+c']
        const key = event.shiftKey ? `shift+${event.key.toLowerCase()}` : event.key.toLowerCase()

        if (forbiddenCombos.includes(key) || !this.config.allowCopyPaste) {
          event.preventDefault()
          this.recordViolation('copy_paste', 'medium', {
            action: 'forbidden_keyboard_combo',
            keys: key
          })
          return false
        }
      }

      // Prevent function keys
      if (forbiddenKeys.includes(event.key)) {
        event.preventDefault()
        this.recordViolation('devtools', 'high', {
          action: 'forbidden_key_pressed',
          key: event.key
        })
        return false
      }

      // Alt+Tab detection
      if (event.altKey && event.key === 'Tab') {
        event.preventDefault()
        this.recordViolation('tab_switch', 'high', {
          action: 'alt_tab_detected'
        })
        return false
      }
    }
    document.addEventListener('keydown', this.keyboardHandler)

    // Mouse event monitoring
    this.mouseHandler = (event: MouseEvent) => {
      // Prevent right-click
      if (event.button === 2 && !this.config.allowRightClick) {
        event.preventDefault()
        this.recordViolation('context_menu', 'low', {
          action: 'right_click_attempted',
          coordinates: { x: event.clientX, y: event.clientY }
        })
        return false
      }
    }
    document.addEventListener('contextmenu', this.mouseHandler)
    document.addEventListener('mousedown', this.mouseHandler)

    // Fullscreen monitoring
    this.fullscreenHandler = () => {
      if (!document.fullscreenElement && this.config.enforceFullscreen) {
        this.recordViolation('fullscreen_exit', 'critical', {
          action: 'fullscreen_exited'
        })

        // Re-enforce fullscreen after a short delay
        setTimeout(() => {
          if (this.isActive) {
            this.enforceFullscreen()
          }
        }, 1000)
      }
    }
    document.addEventListener('fullscreenchange', this.fullscreenHandler)

    // Window resize monitoring
    this.resizeHandler = () => {
      if (!this.config.allowWindowResize) {
        this.recordViolation('window_resize', 'medium', {
          action: 'window_resized',
          dimensions: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        })
      }
    }
    window.addEventListener('resize', this.resizeHandler)

    // Prevent page refresh/navigation
    this.beforeUnloadHandler = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = 'Are you sure you want to leave the test? Your progress may be lost.'
      return event.returnValue
    }
    window.addEventListener('beforeunload', this.beforeUnloadHandler)

    // Monitor for developer tools
    this.detectDevTools()
  }

  /**
   * Remove all event listeners
   */
  private removeEventListeners(): void {
    if (this.originalVisibilityHandler) {
      document.removeEventListener('visibilitychange', this.originalVisibilityHandler)
    }
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler)
    }
    if (this.mouseHandler) {
      document.removeEventListener('contextmenu', this.mouseHandler)
      document.removeEventListener('mousedown', this.mouseHandler)
    }
    if (this.fullscreenHandler) {
      document.removeEventListener('fullscreenchange', this.fullscreenHandler)
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    if (this.beforeUnloadHandler) {
      window.removeEventListener('beforeunload', this.beforeUnloadHandler)
    }
  }

  /**
   * Enforce fullscreen mode
   */
  private async enforceFullscreen(): Promise<void> {
    if (!this.config.enforceFullscreen) return

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      }
    } catch (error) {
      console.warn('Failed to enter fullscreen:', error)
      this.recordViolation('fullscreen_exit', 'high', {
        action: 'fullscreen_enforcement_failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  /**
   * Exit fullscreen mode
   */
  private async exitFullscreen(): Promise<void> {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.warn('Failed to exit fullscreen:', error)
    }
  }

  /**
   * Disable developer tools (detection-based approach)
   */
  private disableDevTools(): void {
    if (!this.config.allowDevTools) {
      // Monitor console usage
      let devtools = false
      const threshold = 160

      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold ||
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools) {
            devtools = true
            this.recordViolation('devtools', 'critical', {
              action: 'devtools_detected',
              method: 'window_size_difference'
            })
          }
        } else {
          devtools = false
        }
      }, 500)

      // Console detection
      let element = new Image()
      Object.defineProperty(element, 'id', {
        get: () => {
          this.recordViolation('devtools', 'critical', {
            action: 'console_accessed',
            method: 'image_element_id'
          })
        }
      })
      console.log(element)
    }
  }

  /**
   * Detect developer tools using various methods
   */
  private detectDevTools(): void {
    const devToolsDetector = () => {
      const startTime = performance.now()
      debugger
      const endTime = performance.now()

      if (endTime - startTime > 100) {
        this.recordViolation('devtools', 'critical', {
          action: 'debugger_detected',
          timeDifference: endTime - startTime
        })
      }
    }

    // Run detection every 5 seconds
    setInterval(devToolsDetector, 5000)
  }

  /**
   * Prevent screenshots
   */
  private preventScreenshots(): void {
    if (!this.config.allowScreenshots) {
      // Add watermark overlay to discourage screenshots
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
            transparent 35px,
            rgba(255,0,0,0.1) 35px,
            rgba(255,0,0,0.1) 70px
          );
        font-family: Arial, sans-serif;
        color: rgba(255,0,0,0.3);
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1.4;
      `
      watermark.innerHTML = `
        CONFIDENTIAL TEST<br>
        Session: ${this.sessionId}<br>
        User: ${this.userId}<br>
        ${new Date().toISOString()}
      `
      document.body.appendChild(watermark)

      // Detect PrintScreen key
      document.addEventListener('keyup', (event) => {
        if (event.key === 'PrintScreen') {
          this.recordViolation('screenshot', 'high', {
            action: 'printscreen_detected'
          })
        }
      })
    }
  }

  /**
   * Monitor zoom level changes
   */
  private monitorZoomLevel(): void {
    let lastZoom = Math.round(window.devicePixelRatio * 100)

    const checkZoom = () => {
      const currentZoom = Math.round(window.devicePixelRatio * 100)

      if (currentZoom !== lastZoom) {
        if (currentZoom > this.config.maxZoomLevel || currentZoom < this.config.minZoomLevel) {
          this.recordViolation('zoom_change', 'medium', {
            action: 'zoom_violation',
            currentZoom,
            allowedRange: [this.config.minZoomLevel, this.config.maxZoomLevel]
          })
        }
        lastZoom = currentZoom
      }
    }

    setInterval(checkZoom, 1000)
  }

  /**
   * Record a security violation
   */
  private recordViolation(
    type: SecurityEvent['type'],
    severity: SecurityEvent['severity'],
    details: any
  ): void {
    const event: SecurityEvent = {
      type,
      severity,
      details,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    }

    this.violations.push(event)
    console.warn(`🚨 Security violation detected:`, event)

    // Trigger callback
    this.onViolation(event)

    // Auto-terminate if configured
    if (this.config.autoTerminateOnViolation && severity === 'critical') {
      this.terminateTest('Critical security violation detected')
    }

    // Check warning threshold
    if (this.violations.length >= this.config.warningThreshold) {
      this.terminateTest('Too many security violations')
    }
  }

  /**
   * Terminate the test due to security violations
   */
  private terminateTest(reason: string): void {
    console.error(`🛑 Test terminated: ${reason}`)

    // Force submit current answers
    const event = new CustomEvent('forceTestSubmission', {
      detail: { reason, violations: this.violations }
    })
    window.dispatchEvent(event)

    // Redirect to violation page
    window.location.href = '/test/security-violation'
  }

  /**
   * Get current security status
   */
  getSecurityStatus() {
    return {
      isActive: this.isActive,
      violationCount: this.violations.length,
      violations: this.violations,
      lastViolation: this.violations[this.violations.length - 1] || null,
      riskLevel: this.calculateRiskLevel()
    }
  }

  /**
   * Calculate current risk level based on violations
   */
  private calculateRiskLevel(): 'low' | 'medium' | 'high' | 'critical' {
    const severityScores = { low: 1, medium: 3, high: 7, critical: 15 }
    const totalScore = this.violations.reduce((sum, v) => sum + severityScores[v.severity], 0)

    if (totalScore >= 30) return 'critical'
    if (totalScore >= 15) return 'high'
    if (totalScore >= 7) return 'medium'
    return 'low'
  }

  /**
   * Generate security report
   */
  generateSecurityReport() {
    const groupedViolations = this.violations.reduce((acc, violation) => {
      if (!acc[violation.type]) {
        acc[violation.type] = []
      }
      acc[violation.type].push(violation)
      return acc
    }, {} as Record<string, SecurityEvent[]>)

    return {
      sessionId: this.sessionId,
      userId: this.userId,
      totalViolations: this.violations.length,
      riskLevel: this.calculateRiskLevel(),
      violationsByType: Object.entries(groupedViolations).map(([type, events]) => ({
        type,
        count: events.length,
        lastOccurrence: Math.max(...events.map(e => e.timestamp)),
        severity: events.reduce((max, e) => {
          const levels = { low: 1, medium: 2, high: 3, critical: 4 }
          return levels[e.severity] > levels[max] ? e.severity : max
        }, 'low' as SecurityEvent['severity'])
      })),
      timeline: this.violations.map(v => ({
        timestamp: v.timestamp,
        type: v.type,
        severity: v.severity
      })),
      recommendations: this.generateRecommendations()
    }
  }

  /**
   * Generate security recommendations based on violations
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = []
    const violationTypes = [...new Set(this.violations.map(v => v.type))]

    if (violationTypes.includes('tab_switch')) {
      recommendations.push('Implement stricter tab monitoring with immediate test termination')
    }
    if (violationTypes.includes('devtools')) {
      recommendations.push('Consider additional developer tools detection methods')
    }
    if (violationTypes.includes('fullscreen_exit')) {
      recommendations.push('Enforce mandatory fullscreen mode with forced re-entry')
    }
    if (violationTypes.includes('copy_paste')) {
      recommendations.push('Implement content protection and clipboard monitoring')
    }
    if (violationTypes.includes('screenshot')) {
      recommendations.push('Add stronger screenshot prevention and detection')
    }

    return recommendations
  }
}

/**
 * Browser fingerprinting for device identification
 */
export class BrowserFingerprinting {
  static async generateFingerprint(): Promise<string> {
    const components = [
      navigator.userAgent,
      navigator.language,
      navigator.languages?.join(',') || '',
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      !!window.sessionStorage,
      !!window.localStorage,
      !!window.indexedDB,
      navigator.hardwareConcurrency || 0,
      navigator.maxTouchPoints || 0
    ]

    // Add WebGL fingerprint if available
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl) {
      components.push(
        gl.getParameter(gl.RENDERER) || '',
        gl.getParameter(gl.VENDOR) || ''
      )
    }

    // Add audio context fingerprint
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const analyser = audioContext.createAnalyser()
      oscillator.connect(analyser)
      components.push(analyser.frequencyBinCount.toString())
      audioContext.close()
    } catch (e) {
      // Audio fingerprinting failed
    }

    const fingerprint = components.join('|')

    // Generate hash of the fingerprint
    const encoder = new TextEncoder()
    const data = encoder.encode(fingerprint)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  static async validateFingerprint(sessionFingerprint: string): Promise<boolean> {
    const currentFingerprint = await this.generateFingerprint()
    return currentFingerprint === sessionFingerprint
  }
}

export default BrowserSecurityManager