// India-specific mobile optimizations for low bandwidth and diverse user needs

interface NetworkInfo {
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g'
  downlink: number
  rtt: number
  saveData: boolean
}

interface DeviceInfo {
  ram: number
  cores: number
  platform: string
  isTouchDevice: boolean
}

export class IndianMobileOptimizer {
  private networkInfo: NetworkInfo | null = null
  private deviceInfo: DeviceInfo | null = null
  private isLowEndDevice = false
  private isSlowNetwork = false
  private _isInitialized = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize()
    }
  }

  public initialize() {
    if (this._isInitialized) return

    this.detectNetworkCapabilities()
    this.detectDeviceCapabilities()
    this.applyOptimizations()
    this._isInitialized = true
  }

  private detectNetworkCapabilities() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return

    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      this.networkInfo = {
        effectiveType: connection.effectiveType || '4g',
        downlink: connection.downlink || 10,
        rtt: connection.rtt || 100,
        saveData: connection.saveData || false,
      }

      this.isSlowNetwork =
        this.networkInfo.effectiveType === '2g' ||
        this.networkInfo.effectiveType === 'slow-2g' ||
        this.networkInfo.effectiveType === '3g' ||
        this.networkInfo.downlink < 1.5 ||
        this.networkInfo.saveData

      // Listen for network changes
      connection.addEventListener('change', () => {
        this.detectNetworkCapabilities()
        this.applyOptimizations()
      })
    }
  }

  private detectDeviceCapabilities() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return

    // Detect low-end devices (common in India)
    this.deviceInfo = {
      ram: (navigator as any).deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4,
      platform: navigator.platform,
      isTouchDevice: typeof window !== 'undefined' ? 'ontouchstart' in window : false,
    }

    this.isLowEndDevice =
      this.deviceInfo.ram <= 2 ||
      this.deviceInfo.cores <= 2 ||
      /Android.*[2-4]\.|iPhone.*[5-7]/.test(navigator.userAgent)
  }

  // Image optimization for Indian networks
  getOptimizedImageSrc(originalSrc: string, width: number, height: number): string {
    if (this.isSlowNetwork || this.isLowEndDevice) {
      // Use WebP with aggressive compression for slow networks
      const quality = this.isSlowNetwork ? 60 : 75
      return `${originalSrc}?f=webp&w=${width}&h=${height}&q=${quality}&c=fill&g=auto`
    }

    // Standard optimization for faster networks
    return `${originalSrc}?f=webp&w=${width}&h=${height}&q=85&c=fill&g=auto`
  }

  // Progressive loading strategy
  shouldUseProgressiveLoading(): boolean {
    return this.isSlowNetwork || this.isLowEndDevice
  }

  // Lazy loading thresholds
  getLazyLoadingThreshold(): string {
    if (this.isSlowNetwork) return '400px' // Load images later
    if (this.isLowEndDevice) return '200px' // Moderate threshold
    return '100px' // Default threshold
  }

  // Font loading strategy
  getFontLoadingStrategy(): 'swap' | 'block' | 'fallback' {
    if (this.isSlowNetwork) return 'swap' // Show fallback fonts immediately
    return 'fallback' // Standard strategy
  }

  // Animation preferences
  shouldReduceAnimations(): boolean {
    return this.isLowEndDevice || this.isSlowNetwork
  }

  // Prefetch strategy
  shouldPrefetchResources(): boolean {
    return !this.isSlowNetwork && this.networkInfo && !this.networkInfo.saveData
  }

  // Bundle splitting strategy
  getChunkLoadingStrategy(): 'aggressive' | 'conservative' | 'minimal' {
    if (this.isSlowNetwork) return 'minimal'
    if (this.isLowEndDevice) return 'conservative'
    return 'aggressive'
  }

  private applyOptimizations() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    // Apply CSS optimizations
    this.applyCSSOptimizations()

    // Apply loading optimizations
    this.applyLoadingOptimizations()

    // Apply interaction optimizations
    this.applyInteractionOptimizations()
  }

  private applyCSSOptimizations() {
    if (typeof document === 'undefined') return

    const style = document.createElement('style')
    style.id = 'indian-mobile-optimizations'

    // Remove existing optimization styles
    const existing = document.getElementById('indian-mobile-optimizations')
    if (existing) existing.remove()

    let cssRules = `
      /* India-specific mobile optimizations */
      :root {
        --network-quality: ${this.isSlowNetwork ? '0' : '1'};
        --device-quality: ${this.isLowEndDevice ? '0' : '1'};
      }
    `

    if (this.isSlowNetwork) {
      cssRules += `
        /* Optimize for slow networks */
        * {
          background-attachment: scroll !important; /* Prevent parallax */
        }

        .course-card img,
        .hero-image,
        .testimonial-avatar {
          background-size: contain !important;
          image-rendering: -webkit-optimize-contrast;
        }

        /* Reduce shadow and gradient usage */
        .shadow-lg { box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important; }
        .shadow-xl { box-shadow: 0 4px 16px rgba(0,0,0,0.1) !important; }

        /* Simplified gradients */
        .bg-gradient-to-r,
        .bg-gradient-to-br {
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) !important;
        }
      `
    }

    if (this.isLowEndDevice) {
      cssRules += `
        /* Optimize for low-end devices */
        * {
          will-change: auto !important; /* Reduce GPU layers */
        }

        .transform,
        .transition {
          transform: none !important;
          transition: none !important;
        }

        /* Simpler animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-pulse,
        .animate-bounce,
        .animate-spin {
          animation: fadeIn 0.3s ease !important;
        }
      `
    }

    // Hindi font optimizations
    cssRules += `
      /* Hindi font loading optimization */
      @font-face {
        font-family: 'Noto Sans Devanagari';
        src: url('/fonts/NotoSansDevanagari-VF.woff2') format('woff2-variations');
        font-display: ${this.getFontLoadingStrategy()};
        font-weight: 300 700;
        unicode-range: U+0900-097F, U+1CD0-1CFF, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF;
      }

      /* Regional font fallbacks */
      .hindi-text {
        font-family: 'Noto Sans Devanagari', 'Arial Unicode MS', sans-serif;
      }

      .tamil-text {
        font-family: 'Noto Sans Tamil', 'Latha', sans-serif;
      }

      .bengali-text {
        font-family: 'Noto Sans Bengali', 'Shonar Bangla', sans-serif;
      }
    `

    style.textContent = cssRules
    document.head.appendChild(style)
  }

  private applyLoadingOptimizations() {
    // Implement resource hints for Indian CDNs
    if (this.shouldPrefetchResources()) {
      this.addResourceHints()
    }

    // Set up intersection observer for lazy loading
    this.setupLazyLoading()
  }

  private addResourceHints() {
    if (typeof document === 'undefined') return

    const hints = [
      // Indian CDN endpoints
      { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },

      // Payment gateways popular in India
      { rel: 'dns-prefetch', href: 'https://api.razorpay.com' },
      { rel: 'dns-prefetch', href: 'https://checkout.razorpay.com' },
      { rel: 'dns-prefetch', href: 'https://api.payu.in' },
    ]

    hints.forEach((hint) => {
      const link = document.createElement('link')
      link.rel = hint.rel
      link.href = hint.href
      document.head.appendChild(link)
    })
  }

  private setupLazyLoading() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const threshold = this.getLazyLoadingThreshold()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = this.getOptimizedImageSrc(
                img.dataset.src,
                img.width || 400,
                img.height || 300
              )
              img.removeAttribute('data-src')
              observer.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: threshold,
      }
    )

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach((img) => {
      observer.observe(img)
    })
  }

  private applyInteractionOptimizations() {
    // Add touch delay reduction for Indian users
    if (this.deviceInfo?.isTouchDevice) {
      this.optimizeTouchInteractions()
    }
  }

  private optimizeTouchInteractions() {
    if (typeof document === 'undefined') return

    // Add touch event optimizations
    const style = document.createElement('style')
    style.textContent = `
      /* Optimized touch interactions for Indian users */
      .mobile-cta,
      .course-card,
      .demo-button {
        touch-action: manipulation;
        -webkit-tap-highlight-color: rgba(0,0,0,0.1);
      }

      /* Larger touch targets for common Indian phone sizes */
      @media (max-width: 414px) {
        .mobile-cta {
          min-height: 60px !important;
          font-size: 18px !important;
        }

        .mobile-nav-item {
          min-height: 52px !important;
        }
      }

      /* Extra spacing for thumb navigation */
      .thumb-navigation {
        padding-bottom: calc(20px + env(safe-area-inset-bottom));
      }
    `

    document.head.appendChild(style)
  }

  // Performance monitoring
  measurePerformance() {
    if (typeof window === 'undefined' || !('performance' in window)) return

    if ('performance' in window) {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming

      const metrics = {
        networkType: this.networkInfo?.effectiveType,
        deviceRAM: this.deviceInfo?.ram,
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: this.getFirstPaint(),
        isOptimized: this.isSlowNetwork || this.isLowEndDevice,
      }

      // Send to analytics (only in production)
      if (process.env.NODE_ENV === 'production') {
        this.sendPerformanceMetrics(metrics)
      }

      return metrics
    }
  }

  private getFirstPaint(): number {
    const paintEntries = performance.getEntriesByType('paint')
    const firstPaint = paintEntries.find((entry) => entry.name === 'first-contentful-paint')
    return firstPaint ? firstPaint.startTime : 0
  }

  private sendPerformanceMetrics(metrics: any) {
    // Send to analytics endpoint
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...metrics,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {
      // Fail silently for performance metrics
    })
  }

  // Public API
  getNetworkInfo() {
    return this.networkInfo
  }
  getDeviceInfo() {
    return this.deviceInfo
  }
  isOptimizedDevice() {
    return this.isLowEndDevice || this.isSlowNetwork
  }
  get isInitialized() {
    return this._isInitialized
  }
}

// Singleton instance
export const indianMobileOptimizer = new IndianMobileOptimizer()

// React hook for using in components
export function useIndianMobileOptimizations() {
  // Server-side safe defaults
  if (typeof window === 'undefined') {
    return {
      isSlowNetwork: false,
      getOptimizedImageSrc: (src: string, width: number, height: number) => src,
      shouldReduceAnimations: false,
      getLazyLoadingThreshold: () => '100px',
      networkInfo: null,
      deviceInfo: null,
    }
  }

  // Initialize client-side if not already done
  if (!indianMobileOptimizer.isInitialized) {
    indianMobileOptimizer.initialize()
  }

  return {
    isSlowNetwork: indianMobileOptimizer.isOptimizedDevice(),
    getOptimizedImageSrc: indianMobileOptimizer.getOptimizedImageSrc.bind(indianMobileOptimizer),
    shouldReduceAnimations: indianMobileOptimizer.shouldReduceAnimations(),
    getLazyLoadingThreshold: indianMobileOptimizer.getLazyLoadingThreshold(),
    networkInfo: indianMobileOptimizer.getNetworkInfo(),
    deviceInfo: indianMobileOptimizer.getDeviceInfo(),
  }
}
