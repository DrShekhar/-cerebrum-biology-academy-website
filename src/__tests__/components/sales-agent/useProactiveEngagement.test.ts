/**
 * Unit tests for useProactiveEngagement hook
 * Tests proactive engagement triggers: exit intent, scroll depth, time on page, etc.
 */

import { renderHook, act } from '@testing-library/react'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

import { useProactiveEngagement } from '@/components/sales-agent/hooks/useProactiveEngagement'
import type { Language } from '@/lib/aria/types'

describe('useProactiveEngagement', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.useFakeTimers()

    // Reset scroll position
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true, configurable: true })
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })

    // Reset pathname using history.pushState (JSDOM-compatible)
    window.history.pushState({}, '', '/')
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with default config', () => {
      const { result } = renderHook(() => useProactiveEngagement())

      expect(result.current.shouldShowProactive).toBe(false)
      expect(result.current.proactiveTrigger).toBeNull()
      expect(result.current.hasTriggered).toBe(false)
    })

    it('should not trigger if user has "doNotShow" preference', () => {
      const stored = {
        hasSeenProactive: false,
        doNotShow: true,
        lastProactiveTime: 0,
        sessionCount: 0,
      }
      localStorageMock.setItem('aria_engagement', JSON.stringify(stored))

      const { result } = renderHook(() => useProactiveEngagement())

      act(() => {
        jest.advanceTimersByTime(60000)
      })

      expect(result.current.shouldShowProactive).toBe(false)
    })

    it('should not trigger if shown in last hour', () => {
      const stored = {
        hasSeenProactive: true,
        doNotShow: false,
        lastProactiveTime: Date.now() - 30 * 60 * 1000, // 30 minutes ago
        sessionCount: 0,
      }
      localStorageMock.setItem('aria_engagement', JSON.stringify(stored))

      const { result } = renderHook(() => useProactiveEngagement())

      act(() => {
        jest.advanceTimersByTime(60000)
      })

      expect(result.current.shouldShowProactive).toBe(false)
    })
  })

  describe('time on page trigger', () => {
    it('should trigger after default delay (45 seconds)', () => {
      const { result } = renderHook(() => useProactiveEngagement())

      expect(result.current.shouldShowProactive).toBe(false)

      act(() => {
        jest.advanceTimersByTime(45000)
      })

      expect(result.current.shouldShowProactive).toBe(true)
      expect(result.current.proactiveTrigger?.type).toBe('time_on_page')
      expect(result.current.hasTriggered).toBe(true)
    })

    it('should respect custom delay', () => {
      const { result } = renderHook(() => useProactiveEngagement('en', { timeOnPageDelay: 30000 }))

      act(() => {
        jest.advanceTimersByTime(29000)
      })
      expect(result.current.shouldShowProactive).toBe(false)

      act(() => {
        jest.advanceTimersByTime(2000)
      })
      expect(result.current.shouldShowProactive).toBe(true)
      expect(result.current.proactiveTrigger?.type).toBe('time_on_page')
    })
  })

  describe('exit intent trigger', () => {
    it('should trigger on mouse leave (desktop)', () => {
      const { result } = renderHook(() => useProactiveEngagement())

      // First, advance time past the initial delay
      act(() => {
        jest.advanceTimersByTime(31000) // Past 30s exit intent delay
      })

      // Simulate mouse leaving viewport (exit intent)
      act(() => {
        const event = new MouseEvent('mouseleave', {
          clientY: -10, // Mouse went above viewport
        })
        document.dispatchEvent(event)
      })

      expect(result.current.shouldShowProactive).toBe(true)
      expect(result.current.proactiveTrigger?.type).toBe('exit_intent')
    })
  })

  describe('scroll depth trigger', () => {
    it('should trigger when scroll depth exceeds threshold (60%)', () => {
      const { result } = renderHook(() => useProactiveEngagement())

      // Simulate scroll to 70% (scrollY = 840 out of scrollHeight 2000 - innerHeight 800 = 1200)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 840, writable: true, configurable: true })
        window.dispatchEvent(new Event('scroll'))
      })

      expect(result.current.shouldShowProactive).toBe(true)
      expect(result.current.proactiveTrigger?.type).toBe('scroll_depth')
    })

    it('should not trigger when scroll depth is below threshold', () => {
      const { result } = renderHook(() => useProactiveEngagement())

      // Simulate scroll to 30%
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 360, writable: true, configurable: true })
        window.dispatchEvent(new Event('scroll'))
      })

      expect(result.current.shouldShowProactive).toBe(false)
    })

    it('should respect custom scroll depth threshold', () => {
      const { result } = renderHook(
        () => useProactiveEngagement('en', { scrollDepthThreshold: 0.8 }) // 80%
      )

      // Scroll to 70% (should NOT trigger with 80% threshold)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 840, writable: true, configurable: true })
        window.dispatchEvent(new Event('scroll'))
      })

      expect(result.current.shouldShowProactive).toBe(false)

      // Scroll to 85% (should trigger)
      act(() => {
        Object.defineProperty(window, 'scrollY', {
          value: 1020,
          writable: true,
          configurable: true,
        })
        window.dispatchEvent(new Event('scroll'))
      })

      expect(result.current.shouldShowProactive).toBe(true)
      expect(result.current.proactiveTrigger?.type).toBe('scroll_depth')
    })
  })

  describe('pricing page trigger', () => {
    it('should trigger quickly on pricing pages', () => {
      window.history.pushState({}, '', '/pricing')

      const { result } = renderHook(() => useProactiveEngagement())

      // Should trigger after short delay on pricing pages
      act(() => {
        jest.advanceTimersByTime(5500)
      })

      expect(result.current.shouldShowProactive).toBe(true)
      expect(result.current.proactiveTrigger?.type).toBe('pricing_page')
    })

    it('should trigger on course pages', () => {
      window.history.pushState({}, '', '/courses/intensive-neet-biology')

      const { result } = renderHook(() => useProactiveEngagement())

      act(() => {
        jest.advanceTimersByTime(5500)
      })

      expect(result.current.shouldShowProactive).toBe(true)
      expect(result.current.proactiveTrigger?.type).toBe('pricing_page')
    })
  })

  describe('returning visitor trigger', () => {
    it('should trigger quickly for returning visitors', () => {
      const stored = {
        hasSeenProactive: false,
        doNotShow: false,
        lastProactiveTime: 0,
        sessionCount: 1, // Has visited before
      }
      localStorageMock.setItem('aria_engagement', JSON.stringify(stored))

      const { result } = renderHook(() => useProactiveEngagement())

      act(() => {
        jest.advanceTimersByTime(5500)
      })

      expect(result.current.shouldShowProactive).toBe(true)
      expect(result.current.proactiveTrigger?.type).toBe('returning_visitor')
    })

    it('should increment session count', () => {
      const stored = {
        hasSeenProactive: false,
        doNotShow: false,
        lastProactiveTime: 0,
        sessionCount: 1,
      }
      localStorageMock.setItem('aria_engagement', JSON.stringify(stored))

      renderHook(() => useProactiveEngagement())

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'aria_engagement',
        expect.stringContaining('"sessionCount":2')
      )
    })
  })

  describe('dismiss behavior', () => {
    it('should stop showing widget when dismissed', () => {
      const { result } = renderHook(() => useProactiveEngagement())

      // Trigger the widget
      act(() => {
        jest.advanceTimersByTime(45000)
      })
      expect(result.current.shouldShowProactive).toBe(true)

      // Dismiss
      act(() => {
        result.current.dismissProactive(false)
      })

      expect(result.current.shouldShowProactive).toBe(false)
      expect(result.current.proactiveTrigger).toBeNull()
    })

    it('should record "doNotShow" preference when user opts out', () => {
      const { result } = renderHook(() => useProactiveEngagement())

      // Trigger the widget
      act(() => {
        jest.advanceTimersByTime(45000)
      })

      act(() => {
        result.current.dismissProactive(true) // doNotShowAgain = true
      })

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'aria_engagement',
        expect.stringContaining('"doNotShow":true')
      )
    })

    it('should not trigger again after being triggered once', () => {
      const { result } = renderHook(() => useProactiveEngagement())

      // Trigger
      act(() => {
        jest.advanceTimersByTime(45000)
      })
      expect(result.current.shouldShowProactive).toBe(true)
      const firstTriggerType = result.current.proactiveTrigger?.type

      // Accept (user clicks to open widget)
      act(() => {
        result.current.acceptProactive()
      })

      expect(result.current.shouldShowProactive).toBe(false)

      // Should not trigger again (hasTriggered prevents it)
      act(() => {
        jest.advanceTimersByTime(60000)
      })
      expect(result.current.shouldShowProactive).toBe(false)
      expect(result.current.hasTriggered).toBe(true)
    })
  })

  describe('trigger priority', () => {
    it('should only trigger once (first trigger wins)', () => {
      window.history.pushState({}, '', '/pricing')

      const { result } = renderHook(() => useProactiveEngagement())

      // Pricing page should trigger first
      act(() => {
        jest.advanceTimersByTime(5500)
      })

      expect(result.current.proactiveTrigger?.type).toBe('pricing_page')

      // Further triggers should not change the type
      act(() => {
        jest.advanceTimersByTime(40000) // Past time on page threshold
      })

      expect(result.current.proactiveTrigger?.type).toBe('pricing_page')
      expect(result.current.hasTriggered).toBe(true)
    })
  })

  describe('language support', () => {
    it('should use specified language for trigger messages', () => {
      const { result } = renderHook(() => useProactiveEngagement('hi'))

      act(() => {
        jest.advanceTimersByTime(45000)
      })

      expect(result.current.proactiveTrigger).not.toBeNull()
      expect(result.current.proactiveTrigger?.message).toBeDefined()
      // Message should be in Hindi (we can't test exact message without importing translations)
    })
  })

  describe('reset functionality', () => {
    it('should reset all engagement state', () => {
      const { result } = renderHook(() => useProactiveEngagement())

      // Trigger
      act(() => {
        jest.advanceTimersByTime(45000)
      })
      expect(result.current.hasTriggered).toBe(true)

      // Reset
      act(() => {
        result.current.resetEngagement()
      })

      expect(result.current.hasTriggered).toBe(false)
      expect(result.current.shouldShowProactive).toBe(false)
      expect(result.current.proactiveTrigger).toBeNull()
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('aria_engagement')
    })
  })
})
