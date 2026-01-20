/**
 * Unit tests for useProactiveEngagement hook
 * Tests proactive engagement triggers: exit intent, scroll depth, time on page, etc.
 */

import { renderHook, act, waitFor } from '@testing-library/react'

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

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

import { useProactiveEngagement, type ProactiveTriggerType } from '@/components/sales-agent/hooks/useProactiveEngagement'
import { usePathname } from 'next/navigation'

describe('useProactiveEngagement', () => {
  const mockOnTrigger = jest.fn()

  beforeEach(() => {
    localStorageMock.clear()
    mockOnTrigger.mockClear()
    jest.useFakeTimers()
    ;(usePathname as jest.Mock).mockReturnValue('/')

    // Reset scroll position
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with default config', () => {
      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      expect(result.current.shouldShowWidget).toBe(false)
      expect(result.current.triggerType).toBeNull()
      expect(result.current.hasBeenDismissed).toBe(false)
    })

    it('should respect disabled state', () => {
      const { result } = renderHook(() =>
        useProactiveEngagement({ onTrigger: mockOnTrigger, enabled: false })
      )

      expect(result.current.shouldShowWidget).toBe(false)

      // Advance time significantly
      act(() => {
        jest.advanceTimersByTime(60000)
      })

      expect(result.current.shouldShowWidget).toBe(false)
    })

    it('should not trigger if user has "doNotShow" preference', () => {
      localStorageMock.setItem('aria_proactive_doNotShow', 'true')

      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      act(() => {
        jest.advanceTimersByTime(60000)
      })

      expect(result.current.shouldShowWidget).toBe(false)
    })
  })

  describe('time on page trigger', () => {
    it('should trigger after default delay (45 seconds)', () => {
      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      expect(result.current.shouldShowWidget).toBe(false)

      act(() => {
        jest.advanceTimersByTime(45000)
      })

      expect(result.current.shouldShowWidget).toBe(true)
      expect(result.current.triggerType).toBe('time_on_page')
      expect(mockOnTrigger).toHaveBeenCalledWith('time_on_page')
    })

    it('should respect custom delay', () => {
      const { result } = renderHook(() =>
        useProactiveEngagement({
          onTrigger: mockOnTrigger,
          config: { timeOnPageDelay: 30000 }
        })
      )

      act(() => {
        jest.advanceTimersByTime(29000)
      })
      expect(result.current.shouldShowWidget).toBe(false)

      act(() => {
        jest.advanceTimersByTime(2000)
      })
      expect(result.current.shouldShowWidget).toBe(true)
    })
  })

  describe('exit intent trigger', () => {
    it('should trigger on mouse leave (desktop)', () => {
      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      // First, advance time past the initial delay
      act(() => {
        jest.advanceTimersByTime(31000) // Past 30s exit intent delay
      })

      // Simulate mouse leaving viewport (exit intent)
      act(() => {
        const event = new MouseEvent('mouseout', {
          clientY: -10, // Mouse went above viewport
          relatedTarget: null,
        })
        Object.defineProperty(event, 'relatedTarget', { value: null })
        document.dispatchEvent(event)
      })

      expect(result.current.shouldShowWidget).toBe(true)
      expect(result.current.triggerType).toBe('exit_intent')
    })
  })

  describe('scroll depth trigger', () => {
    it('should trigger when scroll depth exceeds threshold (60%)', () => {
      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      // Simulate scroll to 70%
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 800, writable: true })
        window.dispatchEvent(new Event('scroll'))
      })

      expect(result.current.shouldShowWidget).toBe(true)
      expect(result.current.triggerType).toBe('scroll_depth')
    })

    it('should not trigger when scroll depth is below threshold', () => {
      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      // Simulate scroll to 30%
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 300, writable: true })
        window.dispatchEvent(new Event('scroll'))
      })

      expect(result.current.shouldShowWidget).toBe(false)
    })
  })

  describe('pricing page trigger', () => {
    it('should trigger quickly on pricing pages', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/pricing')

      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      // Should trigger after short delay on pricing pages
      act(() => {
        jest.advanceTimersByTime(5500)
      })

      expect(result.current.shouldShowWidget).toBe(true)
      expect(result.current.triggerType).toBe('pricing_page')
    })

    it('should trigger on course pages', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/courses/intensive-neet-biology')

      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      act(() => {
        jest.advanceTimersByTime(5500)
      })

      expect(result.current.shouldShowWidget).toBe(true)
      expect(result.current.triggerType).toBe('pricing_page')
    })
  })

  describe('returning visitor trigger', () => {
    it('should trigger quickly for returning visitors', () => {
      localStorageMock.setItem('aria_visit_count', '2')

      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      act(() => {
        jest.advanceTimersByTime(5500)
      })

      expect(result.current.shouldShowWidget).toBe(true)
      expect(result.current.triggerType).toBe('returning_visitor')
    })

    it('should increment visit count', () => {
      localStorageMock.setItem('aria_visit_count', '1')

      renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      expect(localStorageMock.setItem).toHaveBeenCalledWith('aria_visit_count', '2')
    })
  })

  describe('dismiss behavior', () => {
    it('should stop showing widget when dismissed', () => {
      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      // Trigger the widget
      act(() => {
        jest.advanceTimersByTime(45000)
      })
      expect(result.current.shouldShowWidget).toBe(true)

      // Dismiss
      act(() => {
        result.current.dismissWidget()
      })

      expect(result.current.shouldShowWidget).toBe(false)
      expect(result.current.hasBeenDismissed).toBe(true)
    })

    it('should record "doNotShow" preference when user opts out', () => {
      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      act(() => {
        result.current.setDoNotShowAgain()
      })

      expect(localStorageMock.setItem).toHaveBeenCalledWith('aria_proactive_doNotShow', 'true')
    })

    it('should not trigger again after user engagement', () => {
      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      // Trigger
      act(() => {
        jest.advanceTimersByTime(45000)
      })
      expect(result.current.shouldShowWidget).toBe(true)

      // User engages (marks as engaged)
      act(() => {
        result.current.markAsEngaged()
      })

      expect(result.current.shouldShowWidget).toBe(false)

      // Should not trigger again
      act(() => {
        jest.advanceTimersByTime(60000)
      })
      expect(result.current.triggerType).toBe('time_on_page') // Original trigger type preserved
    })
  })

  describe('trigger priority', () => {
    it('should only trigger once (first trigger wins)', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/pricing')

      const { result } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      // Pricing page should trigger first
      act(() => {
        jest.advanceTimersByTime(5500)
      })

      expect(result.current.triggerType).toBe('pricing_page')

      // Further triggers should not change the type
      act(() => {
        jest.advanceTimersByTime(40000) // Past time on page threshold
      })

      expect(result.current.triggerType).toBe('pricing_page')
      expect(mockOnTrigger).toHaveBeenCalledTimes(1)
    })
  })

  describe('cleanup', () => {
    it('should cleanup event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
      const windowRemoveEventListenerSpy = jest.spyOn(window, 'removeEventListener')

      const { unmount } = renderHook(() => useProactiveEngagement({ onTrigger: mockOnTrigger }))

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalled()
      expect(windowRemoveEventListenerSpy).toHaveBeenCalled()

      removeEventListenerSpy.mockRestore()
      windowRemoveEventListenerSpy.mockRestore()
    })
  })
})
