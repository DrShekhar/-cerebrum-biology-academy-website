/**
 * Unit tests for ARIA Error Boundary
 * Tests error catching, retry logic, and WhatsApp fallback
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AriaErrorBoundary, AriaLoadingFallback } from '@/components/sales-agent/AriaErrorBoundary'

// Mock window.open for WhatsApp links
const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
})

// Component that throws an error for testing
function ThrowingComponent({ shouldThrow = true }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error for boundary')
  }
  return <div data-testid="child-component">Child rendered successfully</div>
}

// Suppress console.error for cleaner test output
const originalConsoleError = console.error
beforeAll(() => {
  console.error = jest.fn()
})
afterAll(() => {
  console.error = originalConsoleError
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('AriaErrorBoundary', () => {
  describe('normal operation', () => {
    it('should render children when no error occurs', () => {
      render(
        <AriaErrorBoundary>
          <div data-testid="child">Child content</div>
        </AriaErrorBoundary>
      )

      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(screen.getByText('Child content')).toBeInTheDocument()
    })

    it('should render multiple children', () => {
      render(
        <AriaErrorBoundary>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </AriaErrorBoundary>
      )

      expect(screen.getByTestId('child1')).toBeInTheDocument()
      expect(screen.getByTestId('child2')).toBeInTheDocument()
    })
  })

  describe('error handling', () => {
    it('should catch errors and display fallback UI', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent shouldThrow={true} />
        </AriaErrorBoundary>
      )

      expect(screen.queryByTestId('child-component')).not.toBeInTheDocument()
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    })

    it('should display error header', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      expect(screen.getByText('ARIA - Error')).toBeInTheDocument()
    })

    it('should display helpful message', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      expect(screen.getByText(/ARIA is temporarily unavailable/i)).toBeInTheDocument()
      // Check that WhatsApp is mentioned in the helpful message
      expect(screen.getByText(/you can still reach us on WhatsApp/i)).toBeInTheDocument()
    })

    it('should display error ID', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      const errorIdElement = screen.getByText(/Error ID: aria_/i)
      expect(errorIdElement).toBeInTheDocument()
    })

    it('should call onError callback when error occurs', () => {
      const onError = jest.fn()

      render(
        <AriaErrorBoundary onError={onError}>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      )
    })
  })

  describe('retry functionality', () => {
    it('should show retry button', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      const retryButton = screen.getByRole('button', { name: /try again/i })
      expect(retryButton).toBeInTheDocument()
    })

    it('should show retry count', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      expect(screen.getByText(/2 left/i)).toBeInTheDocument()
    })

    it('should attempt to re-render children on retry', () => {
      const { rerender } = render(
        <AriaErrorBoundary>
          <ThrowingComponent shouldThrow={true} />
        </AriaErrorBoundary>
      )

      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()

      const retryButton = screen.getByRole('button', { name: /try again/i })
      fireEvent.click(retryButton)

      // Since component still throws, error boundary catches again
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
      expect(screen.getByText(/1 left/i)).toBeInTheDocument()
    })

    it('should hide retry button after max retries', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      // First retry
      fireEvent.click(screen.getByRole('button', { name: /try again/i }))
      expect(screen.getByText(/1 left/i)).toBeInTheDocument()

      // Second retry
      fireEvent.click(screen.getByRole('button', { name: /try again/i }))

      // Should no longer show retry button
      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument()
    })
  })

  describe('WhatsApp fallback', () => {
    it('should show WhatsApp button', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      const whatsAppButton = screen.getByRole('button', { name: /chat on whatsapp/i })
      expect(whatsAppButton).toBeInTheDocument()
    })

    it('should open WhatsApp link when clicked', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      const whatsAppButton = screen.getByRole('button', { name: /chat on whatsapp/i })
      fireEvent.click(whatsAppButton)

      expect(mockWindowOpen).toHaveBeenCalledTimes(1)
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('wa.me'),
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should include error ID in WhatsApp message', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      const whatsAppButton = screen.getByRole('button', { name: /chat on whatsapp/i })
      fireEvent.click(whatsAppButton)

      const [url] = mockWindowOpen.mock.calls[0]
      expect(url).toContain('aria_')
      expect(url).toContain('error')
    })
  })

  describe('close functionality', () => {
    it('should show close button when onClose is provided', () => {
      const onClose = jest.fn()

      render(
        <AriaErrorBoundary onClose={onClose}>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      const closeButton = screen.getByRole('button', { name: /close/i })
      expect(closeButton).toBeInTheDocument()
    })

    it('should not show close button when onClose is not provided', () => {
      render(
        <AriaErrorBoundary>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()
    })

    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn()

      render(
        <AriaErrorBoundary onClose={onClose}>
          <ThrowingComponent />
        </AriaErrorBoundary>
      )

      const closeButton = screen.getByRole('button', { name: /close/i })
      fireEvent.click(closeButton)

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})

describe('AriaLoadingFallback', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render loading state', () => {
    render(<AriaLoadingFallback />)

    expect(screen.getByText('Loading ARIA...')).toBeInTheDocument()
    expect(screen.getByText('ARIA - Loading...')).toBeInTheDocument()
  })

  it('should show helpful message', () => {
    render(<AriaLoadingFallback />)

    expect(screen.getByText(/Taking longer than expected/i)).toBeInTheDocument()
  })

  it('should show WhatsApp button', () => {
    render(<AriaLoadingFallback />)

    const whatsAppButton = screen.getByRole('button', { name: /chat on whatsapp/i })
    expect(whatsAppButton).toBeInTheDocument()
  })

  it('should open WhatsApp when clicked', () => {
    render(<AriaLoadingFallback />)

    const whatsAppButton = screen.getByRole('button', { name: /chat on whatsapp/i })
    fireEvent.click(whatsAppButton)

    expect(mockWindowOpen).toHaveBeenCalledTimes(1)
    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank',
      'noopener,noreferrer'
    )
  })

  it('should show retry button when onRetry is provided', () => {
    const onRetry = jest.fn()

    render(<AriaLoadingFallback onRetry={onRetry} />)

    const retryButton = screen.getByRole('button', { name: /retry loading/i })
    expect(retryButton).toBeInTheDocument()
  })

  it('should not show retry button when onRetry is not provided', () => {
    render(<AriaLoadingFallback />)

    expect(screen.queryByRole('button', { name: /retry loading/i })).not.toBeInTheDocument()
  })

  it('should call onRetry when retry button is clicked', () => {
    const onRetry = jest.fn()

    render(<AriaLoadingFallback onRetry={onRetry} />)

    const retryButton = screen.getByRole('button', { name: /retry loading/i })
    fireEvent.click(retryButton)

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('should show close button when onClose is provided', () => {
    const onClose = jest.fn()

    render(<AriaLoadingFallback onClose={onClose} />)

    const closeButton = screen.getByRole('button', { name: /close/i })
    expect(closeButton).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn()

    render(<AriaLoadingFallback onClose={onClose} />)

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should have spinning loader animation', () => {
    render(<AriaLoadingFallback />)

    const loader = document.querySelector('.animate-spin')
    expect(loader).toBeInTheDocument()
  })
})

describe('error boundary integration', () => {
  it('should recover when error is fixed', () => {
    let shouldThrow = true

    function ConditionalThrower() {
      if (shouldThrow) {
        throw new Error('Conditional error')
      }
      return <div data-testid="recovered">Recovered!</div>
    }

    const { rerender } = render(
      <AriaErrorBoundary>
        <ConditionalThrower />
      </AriaErrorBoundary>
    )

    // Initially shows error
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()

    // Fix the error condition
    shouldThrow = false

    // Click retry
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))

    // Should now show recovered content
    expect(screen.getByTestId('recovered')).toBeInTheDocument()
    expect(screen.getByText('Recovered!')).toBeInTheDocument()
  })

  it('should log error to console', () => {
    render(
      <AriaErrorBoundary>
        <ThrowingComponent />
      </AriaErrorBoundary>
    )

    expect(console.error).toHaveBeenCalled()
  })
})
