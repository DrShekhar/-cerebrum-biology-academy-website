import { useEffect, useCallback, useState } from 'react'

export interface HeatmapDataPoint {
  id: string
  userId: string
  sessionId: string
  timestamp: number
  eventType: 'click' | 'hover' | 'scroll' | 'focus' | 'blur' | 'form_interaction' | 'mouse_move'
  elementId?: string
  elementClass?: string
  elementTag?: string
  elementText?: string
  xpath: string
  coordinates: {
    x: number
    y: number
    relativeX: number // percentage within element
    relativeY: number // percentage within element
  }
  viewport: {
    width: number
    height: number
  }
  page: {
    url: string
    title: string
    step?: string // course selector step
  }
  metadata?: Record<string, any>
}

export interface HeatmapConfiguration {
  enableClickTracking: boolean
  enableHoverTracking: boolean
  enableScrollTracking: boolean
  enableMouseMovement: boolean
  enableFormTracking: boolean
  sampleRate: number // 0-1, percentage of interactions to track
  hoverThreshold: number // milliseconds before hover is recorded
  mouseMoveThrottle: number // milliseconds between mouse move recordings
  excludeSelectors: string[] // CSS selectors to exclude from tracking
  includeSelectors: string[] // CSS selectors to specifically include
}

const DEFAULT_CONFIG: HeatmapConfiguration = {
  enableClickTracking: true,
  enableHoverTracking: true,
  enableScrollTracking: true,
  enableMouseMovement: false, // Disabled by default due to volume
  enableFormTracking: true,
  sampleRate: 1.0,
  hoverThreshold: 1000,
  mouseMoveThrottle: 100,
  excludeSelectors: ['.no-track', '[data-no-track]', 'script', 'style', 'meta', 'link'],
  includeSelectors: [
    '.course-selector',
    '.wizard-step',
    'button',
    'a',
    'input',
    'select',
    'textarea',
    '[role="button"]',
    '.clickable',
  ],
}

class HeatmapTracker {
  private dataPoints: HeatmapDataPoint[] = []
  private config: HeatmapConfiguration
  private userId: string
  private sessionId: string
  private hoverTimeouts: Map<Element, NodeJS.Timeout> = new Map()
  private lastMouseMove: number = 0
  private isTracking: boolean = false

  constructor(userId: string, sessionId: string, config: Partial<HeatmapConfiguration> = {}) {
    this.userId = userId
    this.sessionId = sessionId
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  startTracking(): void {
    if (this.isTracking || typeof window === 'undefined') return

    this.isTracking = true
    this.attachEventListeners()
  }

  stopTracking(): void {
    if (!this.isTracking) return

    this.isTracking = false
    this.removeEventListeners()
    this.clearHoverTimeouts()
  }

  private attachEventListeners(): void {
    if (this.config.enableClickTracking) {
      document.addEventListener('click', this.handleClick, true)
    }

    if (this.config.enableHoverTracking) {
      document.addEventListener('mouseenter', this.handleMouseEnter, true)
      document.addEventListener('mouseleave', this.handleMouseLeave, true)
    }

    if (this.config.enableScrollTracking) {
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    }

    if (this.config.enableMouseMovement) {
      document.addEventListener('mousemove', this.handleMouseMove, { passive: true })
    }

    if (this.config.enableFormTracking) {
      document.addEventListener('focus', this.handleFocus, true)
      document.addEventListener('blur', this.handleBlur, true)
      document.addEventListener('input', this.handleInput, true)
    }
  }

  private removeEventListeners(): void {
    document.removeEventListener('click', this.handleClick, true)
    document.removeEventListener('mouseenter', this.handleMouseEnter, true)
    document.removeEventListener('mouseleave', this.handleMouseLeave, true)
    window.removeEventListener('scroll', this.handleScroll)
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('focus', this.handleFocus, true)
    document.removeEventListener('blur', this.handleBlur, true)
    document.removeEventListener('input', this.handleInput, true)
  }

  private handleClick = (event: MouseEvent): void => {
    const target = event.target as Element
    if (!this.shouldTrackElement(target)) return

    const dataPoint = this.createDataPoint('click', event, target)
    this.recordDataPoint(dataPoint)
  }

  private handleMouseEnter = (event: MouseEvent): void => {
    const target = event.target as Element
    if (!this.shouldTrackElement(target)) return

    const timeout = setTimeout(() => {
      const dataPoint = this.createDataPoint('hover', event, target)
      this.recordDataPoint(dataPoint)
    }, this.config.hoverThreshold)

    this.hoverTimeouts.set(target, timeout)
  }

  private handleMouseLeave = (event: MouseEvent): void => {
    const target = event.target as Element
    const timeout = this.hoverTimeouts.get(target)

    if (timeout) {
      clearTimeout(timeout)
      this.hoverTimeouts.delete(target)
    }
  }

  private handleScroll = (): void => {
    const dataPoint: HeatmapDataPoint = {
      id: this.generateId(),
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      eventType: 'scroll',
      xpath: '/html/body',
      coordinates: {
        x: window.pageXOffset,
        y: window.pageYOffset,
        relativeX: window.pageXOffset / document.body.scrollWidth,
        relativeY: window.pageYOffset / document.body.scrollHeight,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      page: this.getPageInfo(),
      metadata: {
        scrollTop: window.pageYOffset,
        scrollLeft: window.pageXOffset,
        scrollHeight: document.body.scrollHeight,
        scrollWidth: document.body.scrollWidth,
      },
    }

    this.recordDataPoint(dataPoint)
  }

  private handleMouseMove = (event: MouseEvent): void => {
    const now = Date.now()
    if (now - this.lastMouseMove < this.config.mouseMoveThrottle) return

    this.lastMouseMove = now
    const target = event.target as Element

    const dataPoint = this.createDataPoint('mouse_move', event, target)
    this.recordDataPoint(dataPoint)
  }

  private handleFocus = (event: FocusEvent): void => {
    const target = event.target as Element
    if (!this.shouldTrackElement(target)) return

    const dataPoint = this.createDataPoint('focus', event, target)
    this.recordDataPoint(dataPoint)
  }

  private handleBlur = (event: FocusEvent): void => {
    const target = event.target as Element
    if (!this.shouldTrackElement(target)) return

    const dataPoint = this.createDataPoint('blur', event, target)
    this.recordDataPoint(dataPoint)
  }

  private handleInput = (event: Event): void => {
    const target = event.target as HTMLInputElement
    if (!this.shouldTrackElement(target)) return

    const dataPoint = this.createDataPoint('form_interaction', event, target, {
      inputType: target.type,
      inputName: target.name,
      inputValue: target.type === 'password' ? '[HIDDEN]' : target.value?.substring(0, 100),
      inputLength: target.value?.length || 0,
    })

    this.recordDataPoint(dataPoint)
  }

  private createDataPoint(
    eventType: HeatmapDataPoint['eventType'],
    event: Event,
    target: Element,
    additionalMetadata?: Record<string, any>
  ): HeatmapDataPoint {
    const rect = target.getBoundingClientRect()
    const mouseEvent = event as MouseEvent

    const x = mouseEvent.clientX || rect.left + rect.width / 2
    const y = mouseEvent.clientY || rect.top + rect.height / 2

    return {
      id: this.generateId(),
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      eventType,
      elementId: target.id || undefined,
      elementClass: target.className || undefined,
      elementTag: target.tagName.toLowerCase(),
      elementText: this.getElementText(target),
      xpath: this.getXPath(target),
      coordinates: {
        x: x + window.pageXOffset,
        y: y + window.pageYOffset,
        relativeX: rect.width > 0 ? (x - rect.left) / rect.width : 0,
        relativeY: rect.height > 0 ? (y - rect.top) / rect.height : 0,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      page: this.getPageInfo(),
      metadata: {
        elementRect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
        ...additionalMetadata,
      },
    }
  }

  private shouldTrackElement(element: Element): boolean {
    if (Math.random() > this.config.sampleRate) return false

    // Check exclude selectors
    for (const selector of this.config.excludeSelectors) {
      if (element.matches(selector)) return false
    }

    // If include selectors are specified, element must match one
    if (this.config.includeSelectors.length > 0) {
      return this.config.includeSelectors.some((selector) => element.matches(selector))
    }

    return true
  }

  private getElementText(element: Element): string {
    const text = element.textContent?.trim() || ''
    return text.length > 50 ? text.substring(0, 50) + '...' : text
  }

  private getXPath(element: Element): string {
    if (element.id) {
      return `//*[@id="${element.id}"]`
    }

    const parts: string[] = []
    let currentElement = element

    while (currentElement && currentElement !== document.body) {
      let selector = currentElement.tagName.toLowerCase()

      if (currentElement.className) {
        selector += '.' + currentElement.className.split(' ').join('.')
      }

      const siblings = Array.from(currentElement.parentNode?.children || []).filter(
        (child) => child.tagName === currentElement.tagName
      )

      if (siblings.length > 1) {
        const index = siblings.indexOf(currentElement) + 1
        selector += `[${index}]`
      }

      parts.unshift(selector)
      currentElement = currentElement.parentElement as Element
    }

    return '/' + parts.join('/')
  }

  private getPageInfo() {
    const url = window.location.href
    const title = document.title

    // Extract course selector step if present
    const stepMatch = url.match(/step=(\d+)/) || url.match(/step\/(\d+)/)
    const step = stepMatch ? stepMatch[1] : undefined

    return { url, title, step }
  }

  private generateId(): string {
    return `heatmap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private recordDataPoint(dataPoint: HeatmapDataPoint): void {
    this.dataPoints.push(dataPoint)

    // Send to analytics endpoint
    this.sendToAnalytics(dataPoint)

    // Keep only last 1000 data points in memory
    if (this.dataPoints.length > 1000) {
      this.dataPoints = this.dataPoints.slice(-1000)
    }
  }

  private async sendToAnalytics(dataPoint: HeatmapDataPoint): Promise<void> {
    try {
      await fetch('/api/analytics/heatmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataPoint),
      })
    } catch (error) {
      console.warn('Failed to send heatmap data:', error)
    }
  }

  private clearHoverTimeouts(): void {
    this.hoverTimeouts.forEach((timeout) => clearTimeout(timeout))
    this.hoverTimeouts.clear()
  }

  getDataPoints(): HeatmapDataPoint[] {
    return [...this.dataPoints]
  }

  // Export data for analysis
  exportData(): string {
    return JSON.stringify(
      {
        userId: this.userId,
        sessionId: this.sessionId,
        dataPoints: this.dataPoints,
        config: this.config,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    )
  }
}

// React hook for heatmap tracking
export function useHeatmapTracking(
  userId: string,
  isEnabled: boolean = true,
  config: Partial<HeatmapConfiguration> = {}
) {
  const [tracker] = useState(
    () =>
      new HeatmapTracker(
        userId,
        `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        config
      )
  )
  const [isTracking, setIsTracking] = useState(false)

  const startTracking = useCallback(() => {
    if (!isEnabled) return
    tracker.startTracking()
    setIsTracking(true)
  }, [tracker, isEnabled])

  const stopTracking = useCallback(() => {
    tracker.stopTracking()
    setIsTracking(false)
  }, [tracker])

  const getDataPoints = useCallback(() => {
    return tracker.getDataPoints()
  }, [tracker])

  const exportData = useCallback(() => {
    return tracker.exportData()
  }, [tracker])

  useEffect(() => {
    if (isEnabled) {
      startTracking()
    } else {
      stopTracking()
    }

    return () => {
      stopTracking()
    }
  }, [isEnabled, startTracking, stopTracking])

  return {
    isTracking,
    startTracking,
    stopTracking,
    getDataPoints,
    exportData,
  }
}

// Heatmap analysis utilities
export class HeatmapAnalyzer {
  static generateClickHeatmap(
    dataPoints: HeatmapDataPoint[],
    elementSelector?: string
  ): Array<{
    x: number
    y: number
    intensity: number
    count: number
  }> {
    const clickPoints = dataPoints.filter(
      (point) =>
        point.eventType === 'click' && (!elementSelector || point.xpath.includes(elementSelector))
    )

    // Group clicks by proximity (within 20px)
    const clusters: Array<{ x: number; y: number; points: HeatmapDataPoint[] }> = []
    const CLUSTER_RADIUS = 20

    clickPoints.forEach((point) => {
      let addedToCluster = false

      for (const cluster of clusters) {
        const distance = Math.sqrt(
          Math.pow(cluster.x - point.coordinates.x, 2) +
            Math.pow(cluster.y - point.coordinates.y, 2)
        )

        if (distance <= CLUSTER_RADIUS) {
          cluster.points.push(point)
          // Update cluster center
          cluster.x =
            cluster.points.reduce((sum, p) => sum + p.coordinates.x, 0) / cluster.points.length
          cluster.y =
            cluster.points.reduce((sum, p) => sum + p.coordinates.y, 0) / cluster.points.length
          addedToCluster = true
          break
        }
      }

      if (!addedToCluster) {
        clusters.push({
          x: point.coordinates.x,
          y: point.coordinates.y,
          points: [point],
        })
      }
    })

    // Convert clusters to heatmap points
    const maxCount = Math.max(...clusters.map((c) => c.points.length))

    return clusters.map((cluster) => ({
      x: cluster.x,
      y: cluster.y,
      intensity: cluster.points.length / maxCount,
      count: cluster.points.length,
    }))
  }

  static generateScrollHeatmap(dataPoints: HeatmapDataPoint[]): Array<{
    y: number
    intensity: number
    duration: number
  }> {
    const scrollPoints = dataPoints.filter((point) => point.eventType === 'scroll')

    // Group by vertical position (50px buckets)
    const BUCKET_SIZE = 50
    const buckets: Map<number, number[]> = new Map()

    scrollPoints.forEach((point) => {
      const bucket = Math.floor(point.coordinates.y / BUCKET_SIZE) * BUCKET_SIZE
      if (!buckets.has(bucket)) {
        buckets.set(bucket, [])
      }
      buckets.get(bucket)!.push(point.timestamp)
    })

    // Calculate intensity and duration for each bucket
    const maxDuration = Math.max(
      ...Array.from(buckets.values()).map((timestamps) =>
        timestamps.length > 1 ? Math.max(...timestamps) - Math.min(...timestamps) : 0
      )
    )

    return Array.from(buckets.entries()).map(([y, timestamps]) => {
      const duration = timestamps.length > 1 ? Math.max(...timestamps) - Math.min(...timestamps) : 0
      return {
        y,
        intensity: timestamps.length / scrollPoints.length,
        duration: duration / maxDuration,
      }
    })
  }

  static getElementInteractionStats(
    dataPoints: HeatmapDataPoint[],
    elementSelector: string
  ): {
    clicks: number
    hovers: number
    focuses: number
    totalInteractions: number
    averageInteractionTime: number
    uniqueUsers: number
  } {
    const elementPoints = dataPoints.filter(
      (point) =>
        point.xpath.includes(elementSelector) ||
        point.elementId === elementSelector ||
        point.elementClass?.includes(elementSelector)
    )

    const clicks = elementPoints.filter((p) => p.eventType === 'click').length
    const hovers = elementPoints.filter((p) => p.eventType === 'hover').length
    const focuses = elementPoints.filter((p) => p.eventType === 'focus').length

    const userInteractions = elementPoints.reduce(
      (acc, point) => {
        if (!acc[point.userId]) acc[point.userId] = []
        acc[point.userId].push(point)
        return acc
      },
      {} as Record<string, HeatmapDataPoint[]>
    )

    const interactionTimes = Object.values(userInteractions).map((userPoints) => {
      if (userPoints.length < 2) return 0
      const sorted = userPoints.sort((a, b) => a.timestamp - b.timestamp)
      return sorted[sorted.length - 1].timestamp - sorted[0].timestamp
    })

    return {
      clicks,
      hovers,
      focuses,
      totalInteractions: elementPoints.length,
      averageInteractionTime:
        interactionTimes.length > 0
          ? interactionTimes.reduce((a, b) => a + b, 0) / interactionTimes.length / 1000
          : 0,
      uniqueUsers: Object.keys(userInteractions).length,
    }
  }
}
