// Mobile optimization utilities for Indian networks and devices
// Optimized for 2G/3G networks, low-end Android devices, and data-saving preferences

interface NetworkInfo {
  type: string
  effectiveType: string
  downlink: number
  rtt: number
  saveData: boolean
}

interface DeviceInfo {
  isMobile: boolean
  isLowEnd: boolean
  screenWidth: number
  screenHeight: number
  pixelRatio: number
  memory?: number
  cores?: number
}

export class MobileOptimizer {
  private networkInfo: NetworkInfo | null = null
  private deviceInfo: DeviceInfo
  private performanceObserver: PerformanceObserver | null = null

  constructor() {
    this.deviceInfo = this.getDeviceInfo()
    this.initNetworkMonitoring()
    this.initPerformanceMonitoring()
  }

  // Detect device capabilities
  private getDeviceInfo(): DeviceInfo {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )

    // Detect low-end devices based on various factors
    const memory = (navigator as any).deviceMemory || 4 // Default to 4GB if unknown
    const cores = (navigator as any).hardwareConcurrency || 4 // Default to 4 cores
    const isLowEnd =
      memory <= 2 || cores <= 2 || /Android.*[2-4]\.|Android.*[5-6]\.0/i.test(userAgent)

    return {
      isMobile,
      isLowEnd,
      screenWidth: typeof window !== 'undefined' ? window.screen.width : 375,
      screenHeight: typeof window !== 'undefined' ? window.screen.height : 667,
      pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
      memory,
      cores,
    }
  }

  // Monitor network conditions
  private initNetworkMonitoring() {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection

      this.networkInfo = {
        type: connection.type || 'unknown',
        effectiveType: connection.effectiveType || '4g',
        downlink: connection.downlink || 10,
        rtt: connection.rtt || 100,
        saveData: connection.saveData || false,
      }

      // Update network info when it changes
      connection.addEventListener('change', () => {
        this.networkInfo = {
          type: connection.type || 'unknown',
          effectiveType: connection.effectiveType || '4g',
          downlink: connection.downlink || 10,
          rtt: connection.rtt || 100,
          saveData: connection.saveData || false,
        }
      })
    }
  }

  // Monitor performance metrics
  private initPerformanceMonitoring() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        this.performanceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              this.onLCPMeasured(entry.startTime)
            }
            if (entry.entryType === 'first-input') {
              this.onFIDMeasured((entry as any).processingStart - entry.startTime)
            }
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              this.onCLSMeasured((entry as any).value)
            }
          }
        })

        this.performanceObserver.observe({
          entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
        })
      } catch (error) {
        console.warn('Performance monitoring not supported:', error)
      }
    }
  }

  // Performance callbacks
  private onLCPMeasured(lcp: number) {
    if (lcp > 4000) {
      // Poor LCP for mobile
      this.enableDataSaverMode()
    }
  }

  private onFIDMeasured(fid: number) {
    if (fid > 300) {
      // Poor FID for mobile
      this.reduceInteractiveElements()
    }
  }

  private onCLSMeasured(cls: number) {
    if (cls > 0.25) {
      // Poor CLS
      this.stabilizeLayout()
    }
  }

  // Optimization strategies
  public shouldUseDataSaverMode(): boolean {
    return (
      this.networkInfo?.saveData ||
      this.networkInfo?.effectiveType === 'slow-2g' ||
      this.networkInfo?.effectiveType === '2g' ||
      this.deviceInfo.isLowEnd
    )
  }

  public shouldPreloadImages(): boolean {
    return (
      !this.shouldUseDataSaverMode() &&
      this.networkInfo?.effectiveType !== '2g' &&
      this.networkInfo?.effectiveType !== 'slow-2g'
    )
  }

  public shouldUseWebP(): boolean {
    return typeof window !== 'undefined' && window.WebAssembly !== undefined
  }

  public getOptimalImageQuality(): number {
    if (this.shouldUseDataSaverMode()) return 60
    if (this.networkInfo?.effectiveType === '3g') return 70
    return 80 // High quality for 4G+
  }

  public getOptimalImageSize(): { width: number; height: number } {
    const baseWidth = this.deviceInfo.screenWidth
    const baseHeight = this.deviceInfo.screenHeight

    if (this.shouldUseDataSaverMode()) {
      return {
        width: Math.floor(baseWidth * 0.8),
        height: Math.floor(baseHeight * 0.8),
      }
    }

    return {
      width: Math.floor(baseWidth * this.deviceInfo.pixelRatio),
      height: Math.floor(baseHeight * this.deviceInfo.pixelRatio),
    }
  }

  public shouldLazyLoad(): boolean {
    return this.deviceInfo.isMobile || this.shouldUseDataSaverMode()
  }

  public shouldUseAnimations(): boolean {
    return (
      !this.deviceInfo.isLowEnd &&
      !this.shouldUseDataSaverMode() &&
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }

  public getOptimalChunkSize(): number {
    if (this.deviceInfo.isLowEnd) return 50 // 50KB chunks
    if (this.shouldUseDataSaverMode()) return 100 // 100KB chunks
    return 250 // 250KB chunks for fast networks
  }

  // Adaptive loading strategies
  public adaptiveLoadScript(
    src: string,
    priority: 'high' | 'medium' | 'low' = 'medium'
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.shouldUseDataSaverMode() && priority === 'low') {
        resolve() // Skip low priority scripts in data saver mode
        return
      }

      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))

      // Delay loading for low-end devices
      if (this.deviceInfo.isLowEnd && priority !== 'high') {
        setTimeout(() => {
          document.head.appendChild(script)
        }, 1000)
      } else {
        document.head.appendChild(script)
      }
    })
  }

  public adaptiveLoadCSS(
    href: string,
    priority: 'high' | 'medium' | 'low' = 'medium'
  ): Promise<void> {
    return new Promise((resolve) => {
      if (this.shouldUseDataSaverMode() && priority === 'low') {
        resolve() // Skip low priority styles in data saver mode
        return
      }

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.onload = () => resolve()
      link.onerror = () => resolve() // Don't fail on CSS errors

      document.head.appendChild(link)
    })
  }

  // Font optimization for Hindi/English content
  public getOptimalFontStrategy(): 'swap' | 'fallback' | 'optional' {
    if (this.shouldUseDataSaverMode()) return 'optional'
    if (this.deviceInfo.isLowEnd) return 'fallback'
    return 'swap'
  }

  // Data usage tracking
  private dataUsage = 0
  private readonly DATA_LIMIT_MB = 50 // 50MB limit for data-conscious users

  public trackDataUsage(bytes: number) {
    this.dataUsage += bytes
    if (this.dataUsage > this.DATA_LIMIT_MB * 1024 * 1024) {
      this.enableDataSaverMode()
    }
  }

  public getDataUsageMB(): number {
    return this.dataUsage / (1024 * 1024)
  }

  // Emergency optimizations
  private enableDataSaverMode() {
    document.documentElement.classList.add('data-saver-mode')

    // Disable non-essential animations
    const style = document.createElement('style')
    style.textContent = `
      .data-saver-mode * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      .data-saver-mode video,
      .data-saver-mode iframe {
        display: none !important;
      }
    `
    document.head.appendChild(style)
  }

  private reduceInteractiveElements() {
    // Simplify interactions for better performance
    document.documentElement.classList.add('simplified-interactions')
  }

  private stabilizeLayout() {
    // Add layout stabilization
    document.documentElement.classList.add('stable-layout')
  }

  // Indian network specific optimizations
  public getIndianNetworkOptimizations() {
    return {
      // Common Indian network conditions
      optimizeFor2G: this.networkInfo?.effectiveType === '2g',
      optimizeFor3G: this.networkInfo?.effectiveType === '3g',
      isJioNetwork: this.detectJioNetwork(),
      isAirtelNetwork: this.detectAirtelNetwork(),
      isViNetwork: this.detectViNetwork(),

      // Recommendations
      recommendations: {
        useCompression: true,
        enableServiceWorker: true,
        preloadCriticalResources: !this.shouldUseDataSaverMode(),
        useImageOptimization: true,
        enableOfflineMode: this.deviceInfo.isMobile,
        useCDN: true,
        enableGzip: true,
      },
    }
  }

  private detectJioNetwork(): boolean {
    // Simplified network detection (in real implementation, use proper APIs)
    return false
  }

  private detectAirtelNetwork(): boolean {
    return false
  }

  private detectViNetwork(): boolean {
    return false
  }

  // Cleanup
  public destroy() {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect()
    }
  }
}

// Singleton instance
export const mobileOptimizer = new MobileOptimizer()

// React hook for mobile optimization
export function useMobileOptimization() {
  if (typeof window === 'undefined') {
    return {
      isDataSaverMode: false,
      isLowEndDevice: false,
      shouldPreloadImages: true,
      shouldUseAnimations: true,
      shouldLazyLoad: false,
      optimalImageQuality: 80,
      optimalImageSize: { width: 375, height: 667 },
      dataUsageMB: 0,
      indianNetworkOptimizations: {
        optimizeFor2G: false,
        optimizeFor3G: false,
        isJioNetwork: false,
        isAirtelNetwork: false,
        isViNetwork: false,
        recommendations: {
          useCompression: true,
          enableServiceWorker: true,
          preloadCriticalResources: true,
          useImageOptimization: true,
          enableOfflineMode: false,
          useCDN: true,
          enableGzip: true,
        },
      },
    }
  }

  // Only import React on client side
  const React = require('react')
  const [isDataSaverMode, setIsDataSaverMode] = React.useState(
    mobileOptimizer.shouldUseDataSaverMode()
  )
  const [isLowEndDevice, setIsLowEndDevice] = React.useState(
    (mobileOptimizer as any).deviceInfo.isLowEnd
  )

  React.useEffect(() => {
    const checkOptimizations = () => {
      setIsDataSaverMode(mobileOptimizer.shouldUseDataSaverMode())
      setIsLowEndDevice((mobileOptimizer as any).deviceInfo.isLowEnd)
    }

    // Check optimizations periodically
    const interval = setInterval(checkOptimizations, 30000) // Every 30 seconds

    return () => {
      clearInterval(interval)
      mobileOptimizer.destroy()
    }
  }, [])

  return {
    isDataSaverMode,
    isLowEndDevice,
    shouldPreloadImages: mobileOptimizer.shouldPreloadImages(),
    shouldUseAnimations: mobileOptimizer.shouldUseAnimations(),
    shouldLazyLoad: mobileOptimizer.shouldLazyLoad(),
    optimalImageQuality: mobileOptimizer.getOptimalImageQuality(),
    optimalImageSize: mobileOptimizer.getOptimalImageSize(),
    dataUsageMB: mobileOptimizer.getDataUsageMB(),
    indianNetworkOptimizations: mobileOptimizer.getIndianNetworkOptimizations(),
  }
}

// React compatibility check
declare const React: any
