/**
 * Native Touch Gestures for Cerebrum Biology Academy
 * Pure JavaScript implementations for optimal performance
 */

// Pull to refresh functionality
interface PullToRefreshOptions {
  threshold?: number
  onRefresh?: () => Promise<void>
  refreshIndicatorSelector?: string
}

export class PullToRefreshHandler {
  private startY = 0
  private isPulling = false
  private threshold: number
  private onRefresh: () => Promise<void>
  private refreshIndicator: HTMLElement | null
  private isRefreshing = false

  constructor(options: PullToRefreshOptions = {}) {
    this.threshold = options.threshold || 100
    this.onRefresh = options.onRefresh || (() => Promise.resolve())
    this.refreshIndicator = options.refreshIndicatorSelector
      ? document.querySelector(options.refreshIndicatorSelector)
      : null

    this.init()
  }

  private init() {
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true })
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false })
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true })
  }

  private handleTouchStart(e: TouchEvent) {
    if (window.scrollY === 0 && !this.isRefreshing) {
      this.startY = e.touches[0].pageY
      this.isPulling = true
    }
  }

  private handleTouchMove(e: TouchEvent) {
    if (this.isPulling && !this.isRefreshing) {
      const currentY = e.touches[0].pageY
      const pullDistance = currentY - this.startY

      if (pullDistance > 0) {
        // Prevent default scrolling when pulling down
        e.preventDefault()

        if (pullDistance > this.threshold) {
          this.showRefreshIndicator()
        } else {
          this.hideRefreshIndicator()
        }

        // Add visual feedback
        this.updatePullProgress(pullDistance)
      }
    }
  }

  private handleTouchEnd() {
    if (this.isPulling && !this.isRefreshing) {
      const pullDistance = this.getCurrentPullDistance()

      if (pullDistance > this.threshold) {
        this.triggerRefresh()
      } else {
        this.resetPull()
      }
    }
  }

  private showRefreshIndicator() {
    if (this.refreshIndicator) {
      this.refreshIndicator.classList.add('active')
      this.refreshIndicator.style.opacity = '1'
      this.refreshIndicator.style.transform = 'translateY(0)'
    }

    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  private hideRefreshIndicator() {
    if (this.refreshIndicator) {
      this.refreshIndicator.classList.remove('active')
      this.refreshIndicator.style.opacity = '0'
      this.refreshIndicator.style.transform = 'translateY(-100%)'
    }
  }

  private updatePullProgress(distance: number) {
    const progress = Math.min(distance / this.threshold, 1)

    if (this.refreshIndicator) {
      this.refreshIndicator.style.transform = `translateY(${Math.min(distance * 0.5, 60)}px)`
      this.refreshIndicator.style.opacity = `${progress}`
    }

    // Update body transform for visual feedback
    document.body.style.transform = `translateY(${Math.min(distance * 0.3, 30)}px)`
  }

  private getCurrentPullDistance(): number {
    const transform = document.body.style.transform
    const match = transform.match(/translateY\(([^)]+)px\)/)
    return match ? parseFloat(match[1]) / 0.3 : 0
  }

  private async triggerRefresh() {
    this.isRefreshing = true
    this.showRefreshIndicator()

    try {
      await this.onRefresh()

      // Success haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100])
      }
    } catch (error) {
      console.error('Refresh failed:', error)

      // Error haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200])
      }
    } finally {
      setTimeout(() => {
        this.resetPull()
        this.isRefreshing = false
      }, 1000)
    }
  }

  private resetPull() {
    this.isPulling = false
    this.hideRefreshIndicator()

    // Reset body transform
    document.body.style.transform = ''
    document.body.style.transition = 'transform 0.3s ease'

    setTimeout(() => {
      document.body.style.transition = ''
    }, 300)
  }

  public destroy() {
    document.removeEventListener('touchstart', this.handleTouchStart)
    document.removeEventListener('touchmove', this.handleTouchMove)
    document.removeEventListener('touchend', this.handleTouchEnd)
  }
}

// One-tap actions with enhanced functionality
export const QuickActions = {
  callButton: (phoneNumber: string = '+918826444334') => {
    // Track call action
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'call_initiated', {
        event_category: 'Engagement',
        event_label: 'Quick Call Button',
        phone_number: phoneNumber,
      })
    }

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }

    window.location.href = `tel:${phoneNumber}`
  },

  whatsappButton: (phoneNumber: string = '+918826444334', message?: string) => {
    const defaultMessage = "Hi! I'm interested in NEET Biology coaching at Cerebrum Academy."
    const encodedMessage = encodeURIComponent(message || defaultMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`

    // Track WhatsApp action
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_initiated', {
        event_category: 'Engagement',
        event_label: 'Quick WhatsApp Button',
        phone_number: phoneNumber,
      })
    }

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }

    window.open(whatsappUrl, '_blank')
  },

  shareButton: async (customData?: { title?: string; text?: string; url?: string }) => {
    const shareData = {
      title: customData?.title || 'Cerebrum Biology Academy - NEET Coaching',
      text:
        customData?.text ||
        'Join 10,000+ successful NEET aspirants. 98% success rate with AIIMS faculty.',
      url: customData?.url || window.location.href,
    }

    try {
      if (
        navigator.share &&
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ) {
        await navigator.share(shareData)

        // Track native share
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'native_share', {
            event_category: 'Engagement',
            event_label: 'Native Share API',
            content_id: shareData.url,
          })
        }

        // Success haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate([50, 25, 50])
        }
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        )

        // Show success message
        QuickActions.showToast('Link copied to clipboard!')

        // Track clipboard share
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'clipboard_share', {
            event_category: 'Engagement',
            event_label: 'Clipboard Copy',
            content_id: shareData.url,
          })
        }

        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(100)
        }
      }
    } catch (error) {
      console.error('Share failed:', error)

      // Error haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200])
      }

      // Fallback: open share dialog
      QuickActions.openShareDialog(shareData)
    }
  },

  emailButton: (email: string = 'contact@cerebrumbiologyacademy.com', subject?: string) => {
    const defaultSubject = 'Inquiry about NEET Biology Coaching'
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject || defaultSubject)}`

    // Track email action
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'email_initiated', {
        event_category: 'Engagement',
        event_label: 'Quick Email Button',
        email: email,
      })
    }

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }

    window.location.href = emailUrl
  },

  enrollButton: (courseId?: string) => {
    const enrollUrl = courseId ? `/courses/${courseId}#enroll` : '/enrollment'

    // Track enrollment action
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quick_enroll_clicked', {
        event_category: 'Conversion',
        event_label: 'Quick Enroll Button',
        course_id: courseId || 'general',
      })
    }

    // Strong haptic feedback for important action
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100])
    }

    window.location.href = enrollUrl
  },

  demoButton: (redirectUrl: string = '/demo') => {
    // Track demo booking action
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'demo_booking_clicked', {
        event_category: 'Lead Generation',
        event_label: 'Quick Demo Button',
      })
    }

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    window.location.href = redirectUrl
  },

  // Utility functions
  showToast: (message: string, duration: number = 3000) => {
    // Remove existing toast
    const existingToast = document.querySelector('.quick-action-toast')
    if (existingToast) {
      existingToast.remove()
    }

    // Create toast element
    const toast = document.createElement('div')
    toast.className = 'quick-action-toast'
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 14px;
      z-index: 10000;
      animation: toastSlideUp 0.3s ease;
    `
    toast.textContent = message

    // Add toast styles if not exists
    if (!document.querySelector('#quick-action-toast-styles')) {
      const style = document.createElement('style')
      style.id = 'quick-action-toast-styles'
      style.textContent = `
        @keyframes toastSlideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `
      document.head.appendChild(style)
    }

    document.body.appendChild(toast)

    // Auto remove toast
    setTimeout(() => {
      toast.style.animation = 'toastSlideUp 0.3s ease reverse'
      setTimeout(() => toast.remove(), 300)
    }, duration)
  },

  openShareDialog: (shareData: { title: string; text: string; url: string }) => {
    const shareOptions = [
      {
        name: 'WhatsApp',
        action: () =>
          window.open(
            `https://wa.me/?text=${encodeURIComponent(`${shareData.title}\n${shareData.text}\n${shareData.url}`)}`
          ),
      },
      {
        name: 'Twitter',
        action: () =>
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareData.text}\n${shareData.url}`)}`
          ),
      },
      {
        name: 'Facebook',
        action: () =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`
          ),
      },
      {
        name: 'LinkedIn',
        action: () =>
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`
          ),
      },
      {
        name: 'Copy Link',
        action: async () => {
          await navigator.clipboard.writeText(shareData.url)
          QuickActions.showToast('Link copied!')
        },
      },
    ]

    // Create share dialog (implement based on your UI framework)
    console.log('Share options:', shareOptions)
  },
}

// Enhanced quick action buttons with positioning
export class QuickActionButtons {
  private container: HTMLElement | null = null
  private buttons: Array<{
    id: string
    icon: string
    action: () => void
    label: string
    variant?: 'primary' | 'secondary'
  }> = []

  constructor(
    private options: {
      position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
      phoneNumber?: string
      emailAddress?: string
    } = {}
  ) {}

  public addButton(config: {
    id: string
    icon: string
    action: () => void
    label: string
    variant?: 'primary' | 'secondary'
  }) {
    this.buttons.push(config)
    this.render()
  }

  public init() {
    // Add default buttons
    this.addButton({
      id: 'call',
      icon: '📞',
      action: () => QuickActions.callButton(this.options.phoneNumber),
      label: 'Call',
      variant: 'primary',
    })

    this.addButton({
      id: 'whatsapp',
      icon: '💬',
      action: () => QuickActions.whatsappButton(this.options.phoneNumber),
      label: 'WhatsApp',
      variant: 'secondary',
    })

    this.addButton({
      id: 'share',
      icon: '📤',
      action: () => QuickActions.shareButton(),
      label: 'Share',
      variant: 'secondary',
    })
  }

  private render() {
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.className = 'quick-action-buttons'
      this.container.style.cssText = this.getContainerStyles()
      document.body.appendChild(this.container)
    }

    this.container.innerHTML = this.buttons
      .map(
        (button) => `
      <button
        class="quick-action-btn quick-action-btn-${button.variant || 'secondary'}"
        data-id="${button.id}"
        style="${this.getButtonStyles(button.variant)}"
        title="${button.label}"
      >
        ${button.icon}
      </button>
    `
      )
      .join('')

    // Add event listeners
    this.buttons.forEach((button) => {
      const element = this.container?.querySelector(`[data-id="${button.id}"]`)
      if (element) {
        element.addEventListener('click', button.action)
      }
    })
  }

  private getContainerStyles(): string {
    const position = this.options.position || 'bottom-right'
    const baseStyles = `
      position: fixed;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 1000;
      bottom: 20px;
    `

    switch (position) {
      case 'bottom-left':
        return baseStyles + 'left: 20px;'
      case 'bottom-center':
        return baseStyles + 'left: 50%; transform: translateX(-50%);'
      case 'bottom-right':
      default:
        return baseStyles + 'right: 20px;'
    }
  }

  private getButtonStyles(variant?: 'primary' | 'secondary'): string {
    const baseStyles = `
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: manipulation;
      min-width: 48px;
      min-height: 48px;
    `

    if (variant === 'primary') {
      return (
        baseStyles +
        `
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
      `
      )
    }

    return (
      baseStyles +
      `
      background: white;
      color: #374151;
      border: 1px solid #e5e7eb;
    `
    )
  }

  public destroy() {
    if (this.container) {
      this.container.remove()
      this.container = null
    }
  }
}

// Auto-initialize for mobile devices
export function initNativeTouchGestures(
  options: {
    enablePullToRefresh?: boolean
    enableQuickActions?: boolean
    onRefresh?: () => Promise<void>
    phoneNumber?: string
    emailAddress?: string
  } = {}
) {
  // Only initialize on mobile devices
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )

  if (!isMobile) return

  let pullToRefresh: PullToRefreshHandler | null = null
  let quickActions: QuickActionButtons | null = null

  if (options.enablePullToRefresh !== false) {
    pullToRefresh = new PullToRefreshHandler({
      onRefresh: options.onRefresh,
      refreshIndicatorSelector: '.pull-refresh-indicator',
    })
  }

  if (options.enableQuickActions !== false) {
    quickActions = new QuickActionButtons({
      phoneNumber: options.phoneNumber,
      emailAddress: options.emailAddress,
    })
    quickActions.init()
  }

  // Return cleanup function
  return () => {
    pullToRefresh?.destroy()
    quickActions?.destroy()
  }
}

export default {
  PullToRefreshHandler,
  QuickActions,
  QuickActionButtons,
  initNativeTouchGestures,
}
