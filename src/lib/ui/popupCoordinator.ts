/**
 * 🚨 EMERGENCY FIX: Popup Coordination System
 * Prevents multiple popups from appearing simultaneously
 * Fixes the unusable homepage interface
 */

export interface PopupConfig {
  id: string
  priority: number // 1 = highest, 10 = lowest
  maxPerSession: number
  cooldownMinutes: number
  conflictsWith: string[]
  showConditions: {
    minTimeOnPage?: number // seconds
    maxTimeOnPage?: number // seconds
    userActions?: string[]
    deviceType?: 'mobile' | 'desktop' | 'both'
  }
}

export class PopupCoordinator {
  private static instance: PopupCoordinator
  private activePopup: string | null = null
  private sessionPopups: Map<string, number> = new Map() // popup_id -> timestamp
  private popupConfigs: Map<string, PopupConfig> = new Map()
  private pageLoadTime: number = Date.now()

  static getInstance(): PopupCoordinator {
    if (!PopupCoordinator.instance) {
      PopupCoordinator.instance = new PopupCoordinator()
    }
    return PopupCoordinator.instance
  }

  constructor() {
    this.registerDefaultPopups()
  }

  private registerDefaultPopups() {
    // High priority popups
    this.registerPopup({
      id: 'exit_intent',
      priority: 1,
      maxPerSession: 1,
      cooldownMinutes: 60,
      conflictsWith: ['pwa_install', 'progressive_profiling'],
      showConditions: {
        minTimeOnPage: 30,
        deviceType: 'both',
      },
    })

    this.registerPopup({
      id: 'pwa_install',
      priority: 2,
      maxPerSession: 1,
      cooldownMinutes: 120,
      conflictsWith: ['exit_intent', 'progressive_profiling'],
      showConditions: {
        minTimeOnPage: 60,
        deviceType: 'mobile',
      },
    })

    // Medium priority popups
    this.registerPopup({
      id: 'progressive_profiling',
      priority: 5,
      maxPerSession: 1,
      cooldownMinutes: 30,
      conflictsWith: ['exit_intent', 'pwa_install'],
      showConditions: {
        minTimeOnPage: 45,
        deviceType: 'both',
      },
    })

    this.registerPopup({
      id: 'location_detection',
      priority: 6,
      maxPerSession: 1,
      cooldownMinutes: 60,
      conflictsWith: [],
      showConditions: {
        minTimeOnPage: 10,
        maxTimeOnPage: 30,
        deviceType: 'both',
      },
    })

    // Low priority notifications
    this.registerPopup({
      id: 'notification_permission',
      priority: 8,
      maxPerSession: 1,
      cooldownMinutes: 180,
      conflictsWith: ['exit_intent', 'pwa_install'],
      showConditions: {
        minTimeOnPage: 120,
        deviceType: 'both',
      },
    })
  }

  registerPopup(config: PopupConfig): void {
    this.popupConfigs.set(config.id, config)
  }

  canShowPopup(popupId: string): boolean {
    const config = this.popupConfigs.get(popupId)
    if (!config) return false

    // Check if another popup is already active
    if (this.activePopup && this.activePopup !== popupId) {
      console.log(`[PopupCoordinator] Cannot show ${popupId}: ${this.activePopup} is active`)
      return false
    }

    // Check session limits
    const sessionCount = this.sessionPopups.get(popupId) || 0
    if (sessionCount >= config.maxPerSession) {
      console.log(`[PopupCoordinator] Cannot show ${popupId}: session limit reached`)
      return false
    }

    // Check cooldown
    const lastShown = this.sessionPopups.get(`${popupId}_last_shown`) || 0
    const cooldownMs = config.cooldownMinutes * 60 * 1000
    if (Date.now() - lastShown < cooldownMs) {
      console.log(`[PopupCoordinator] Cannot show ${popupId}: cooldown active`)
      return false
    }

    // Check conflicts
    for (const conflictId of config.conflictsWith) {
      if (this.sessionPopups.has(conflictId)) {
        const conflictLastShown = this.sessionPopups.get(`${conflictId}_last_shown`) || 0
        if (Date.now() - conflictLastShown < 300000) {
          // 5 minutes
          console.log(`[PopupCoordinator] Cannot show ${popupId}: conflicts with ${conflictId}`)
          return false
        }
      }
    }

    // Check time conditions
    const timeOnPage = (Date.now() - this.pageLoadTime) / 1000
    if (config.showConditions.minTimeOnPage && timeOnPage < config.showConditions.minTimeOnPage) {
      return false
    }
    if (config.showConditions.maxTimeOnPage && timeOnPage > config.showConditions.maxTimeOnPage) {
      return false
    }

    // Check device type
    if (config.showConditions.deviceType) {
      const isMobile = window.innerWidth <= 768
      if (config.showConditions.deviceType === 'mobile' && !isMobile) return false
      if (config.showConditions.deviceType === 'desktop' && isMobile) return false
    }

    return true
  }

  showPopup(popupId: string): boolean {
    if (!this.canShowPopup(popupId)) {
      return false
    }

    this.activePopup = popupId
    this.sessionPopups.set(popupId, (this.sessionPopups.get(popupId) || 0) + 1)
    this.sessionPopups.set(`${popupId}_last_shown`, Date.now())

    console.log(`[PopupCoordinator] Showing popup: ${popupId}`)
    return true
  }

  hidePopup(popupId: string): void {
    if (this.activePopup === popupId) {
      this.activePopup = null
      console.log(`[PopupCoordinator] Hidden popup: ${popupId}`)
    }
  }

  getActivePopup(): string | null {
    return this.activePopup
  }

  // Emergency method to disable all popups
  disableAllPopups(): void {
    this.activePopup = null
    this.sessionPopups.clear()
    console.log('[PopupCoordinator] ALL POPUPS DISABLED - Emergency mode active')
  }

  // Get popup queue status for debugging
  getStatus(): {
    activePopup: string | null
    sessionPopups: Record<string, number>
    timeOnPage: number
  } {
    return {
      activePopup: this.activePopup,
      sessionPopups: Object.fromEntries(this.sessionPopups),
      timeOnPage: (Date.now() - this.pageLoadTime) / 1000,
    }
  }
}

// Hook for React components
export function usePopupCoordinator() {
  return PopupCoordinator.getInstance()
}

// Emergency disable function
export function emergencyDisableAllPopups() {
  PopupCoordinator.getInstance().disableAllPopups()
}
