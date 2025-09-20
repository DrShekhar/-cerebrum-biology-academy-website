/**
 * Image Optimization Utilities for Cerebrum Biology Academy
 * Handles WebP detection, responsive images, and performance optimization
 */

// WebP support detection
export function detectWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webpTestImages = {
      lossy: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
      lossless: 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
      alpha:
        'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
      animation:
        'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
    }

    const img = new Image()
    img.onload = () => resolve(img.width > 0 && img.height > 0)
    img.onerror = () => resolve(false)
    img.src = webpTestImages.lossy
  })
}

// Add WebP class to document
export async function addWebPClass() {
  if (typeof document === 'undefined') return

  const supportsWebP = await detectWebPSupport()
  document.documentElement.classList.add(supportsWebP ? 'webp' : 'no-webp')
  return supportsWebP
}

// Generate responsive image srcSet
export function generateSrcSet(basePath: string, sizes: number[]): string {
  return sizes
    .map((size) => {
      const extension = basePath.includes('.webp') ? 'webp' : 'jpg'
      const optimizedPath = basePath.replace(/\.(jpg|jpeg|png|webp)$/, `_${size}.${extension}`)
      return `${optimizedPath} ${size}w`
    })
    .join(', ')
}

// Get optimal image sizes for different breakpoints
export const getResponsiveSizes = {
  hero: '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px',
  course: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  faculty: '(max-width: 640px) 120px, (max-width: 1024px) 200px, 300px',
  testimonial: '80px',
  gallery: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px',
}

// Image loading priorities for Indian networks
export const getLoadingPriority = (imageType: string, position: number): 'eager' | 'lazy' => {
  // Above-the-fold images
  if (imageType === 'hero' || (imageType === 'course' && position < 3)) {
    return 'eager'
  }
  return 'lazy'
}

// Generate blur placeholder
export function generateBlurPlaceholder(width: number, height: number): string {
  // Create a simple SVG blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f1f5f9;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `

  const encoded = btoa(svg)
  return `data:image/svg+xml;base64,${encoded}`
}

// Image optimization configuration for different types
export const imageConfig = {
  hero: {
    sizes: [640, 1024, 1920],
    quality: 85,
    format: 'webp',
    placeholder: true,
  },
  course: {
    sizes: [300, 400, 600],
    quality: 80,
    format: 'webp',
    placeholder: true,
  },
  faculty: {
    sizes: [120, 200, 300],
    quality: 90,
    format: 'webp',
    placeholder: true,
  },
  testimonial: {
    sizes: [80, 120],
    quality: 85,
    format: 'webp',
    placeholder: false,
  },
  gallery: {
    sizes: [200, 300, 400, 600],
    quality: 75,
    format: 'webp',
    placeholder: true,
  },
}

// Preload critical images
export function preloadCriticalImages() {
  const criticalImages = [
    { href: '/images/hero-mobile.webp', media: '(max-width: 640px)' },
    { href: '/images/hero-tablet.webp', media: '(max-width: 1024px)' },
    { href: '/images/hero-desktop.webp', media: '(min-width: 1025px)' },
    { href: '/images/logo.webp' },
    { href: '/images/cta-background.webp' },
  ]

  criticalImages.forEach(({ href, media }) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    if (media) link.media = media
    document.head.appendChild(link)
  })
}

// Intersection Observer for lazy loading
export function createImageObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.1,
  }

  return new IntersectionObserver(callback, { ...defaultOptions, ...options })
}

// Performance monitoring for images
export function trackImagePerformance(imageSrc: string, startTime: number) {
  const loadTime = performance.now() - startTime

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🖼️ Image loaded: ${imageSrc.split('/').pop()} in ${Math.round(loadTime)}ms`)
  }

  // Track in analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'image_load_time', {
      event_category: 'Performance',
      event_label: imageSrc,
      value: Math.round(loadTime),
    })
  }
}

// Get device pixel ratio for high-DPI displays
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1
  return window.devicePixelRatio || 1
}

// Calculate optimal image size based on container and DPR
export function calculateOptimalSize(
  containerWidth: number,
  containerHeight: number,
  dpr: number = getDevicePixelRatio()
): { width: number; height: number } {
  return {
    width: Math.ceil(containerWidth * dpr),
    height: Math.ceil(containerHeight * dpr),
  }
}

// Image format priority based on browser support
export function getImageFormatPriority(): string[] {
  if (typeof window === 'undefined') return ['webp', 'jpg']

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const formats: string[] = []

  // Check AVIF support (most modern)
  if (canvas.toDataURL('image/avif').indexOf('image/avif') === 5) {
    formats.push('avif')
  }

  // Check WebP support
  if (canvas.toDataURL('image/webp').indexOf('image/webp') === 5) {
    formats.push('webp')
  }

  // Fallback formats
  formats.push('jpg', 'png')

  return formats
}

// Indian network optimization
export function isIndianUser(): boolean {
  if (typeof window === 'undefined') return false

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const language = navigator.language

  return timezone.includes('Asia/Kolkata') || language.includes('hi') || language.includes('en-IN')
}

// Adjust image quality for Indian networks
export function getOptimalQuality(defaultQuality: number): number {
  if (!isIndianUser()) return defaultQuality

  // Check connection speed
  const connection = (navigator as any).connection
  if (connection) {
    const effectiveType = connection.effectiveType

    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return Math.max(defaultQuality - 30, 40)
      case '3g':
        return Math.max(defaultQuality - 15, 60)
      case '4g':
      default:
        return defaultQuality
    }
  }

  return defaultQuality
}

// Error tracking for failed image loads
export function trackImageError(imageSrc: string, error: Event) {
  console.error(`Failed to load image: ${imageSrc}`, error)

  // Track in analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'image_load_error', {
      event_category: 'Error',
      event_label: imageSrc,
      value: 1,
    })
  }
}

// Utility to convert images to WebP format (for build process)
export const webpConverter = {
  // This would be used in a build script
  convertToWebP: (inputPath: string, outputPath: string, quality: number = 80) => {
    // Implementation would use sharp or imagemin in Node.js
    console.log(`Converting ${inputPath} to ${outputPath} with quality ${quality}`)
  },

  // Generate all responsive variants
  generateResponsiveVariants: (inputPath: string, sizes: number[], quality: number = 80) => {
    sizes.forEach((size) => {
      console.log(`Generating ${size}w variant of ${inputPath}`)
    })
  },
}
