'use client'

import { useEffect, useCallback, ReactNode } from 'react'

interface ProtectedContentProps {
  children: ReactNode
  onViolation?: (type: string) => void
  watermarkText?: string
  enableWatermark?: boolean
}

export function ProtectedContent({
  children,
  onViolation,
  watermarkText,
  enableWatermark = false,
}: ProtectedContentProps) {
  const handleViolation = useCallback(
    (type: string) => {
      onViolation?.(type)
    },
    [onViolation]
  )

  useEffect(() => {
    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        handleViolation('printscreen')
        return
      }

      // Ctrl/Cmd + P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        handleViolation('print')
        return
      }

      // Ctrl/Cmd + S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleViolation('save')
        return
      }

      // Ctrl/Cmd + Shift + S (Screenshot on Mac)
      if (
        (e.metaKey && e.shiftKey && e.key === '4') ||
        (e.metaKey && e.shiftKey && e.key === '3')
      ) {
        handleViolation('screenshot_mac')
        return
      }

      // F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault()
        handleViolation('devtools')
        return
      }

      // Ctrl/Cmd + Shift + I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
        e.preventDefault()
        handleViolation('devtools')
        return
      }

      // Ctrl/Cmd + Shift + C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'c') {
        e.preventDefault()
        handleViolation('inspect')
        return
      }

      // Ctrl/Cmd + U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault()
        handleViolation('view_source')
        return
      }
    }

    // Visibility change detection (potential screenshot)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation('visibility_change')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [handleViolation])

  // Disable right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    handleViolation('right_click')
  }

  // Disable text selection (but allow form elements)
  const handleSelectStart = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement
    const tagName = target.tagName.toLowerCase()
    // Allow selection in form elements
    if (
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      target.isContentEditable ||
      target.closest('input, textarea, select, [contenteditable="true"]')
    ) {
      return
    }
    e.preventDefault()
  }

  // Disable copy
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault()
    handleViolation('copy')
  }

  // Disable drag
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div
      className="protected-content relative"
      onContextMenu={handleContextMenu}
      onSelectCapture={handleSelectStart}
      onCopy={handleCopy}
      onDragStart={handleDragStart}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
    >
      {children}

      {/* Watermark Overlay */}
      {enableWatermark && watermarkText && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden z-10"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 100px,
                transparent 100px,
                transparent 200px
              )`,
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-gray-200/30 whitespace-nowrap transform -rotate-45 text-sm font-medium"
                style={{
                  top: `${(i * 150) % 500}px`,
                  left: `${((i * 200) % 800) - 100}px`,
                }}
              >
                {watermarkText}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        .protected-content {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }

        .protected-content * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Allow form elements to be interactive */
        .protected-content input,
        .protected-content textarea,
        .protected-content select,
        .protected-content [contenteditable='true'] {
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
          user-select: text;
          pointer-events: auto;
        }

        .protected-content img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
          pointer-events: none;
        }

        @media print {
          .protected-content {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
