'use client'

import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useSwipeGesture } from '@/hooks/useSwipeGesture'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxHeight?: string
  showHandle?: boolean
  className?: string
  closeOnBackdropClick?: boolean
  closeOnSwipeDown?: boolean
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = '90vh',
  showHandle = true,
  className = '',
  closeOnBackdropClick = true,
  closeOnSwipeDown = true,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const dragThreshold = 100

  const swipeHandlers = useSwipeGesture({
    onSwipeDown: () => {
      if (closeOnSwipeDown) {
        onClose()
      }
    },
    threshold: 50,
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (closeOnSwipeDown && info.offset.y > dragThreshold) {
      onClose()
    }
  }

  return (
{isOpen && (
        <>
          <div
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm animate-fadeInUp"
            aria-hidden="true"
          />

          <div
            ref={sheetRef}
            drag={closeOnSwipeDown ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={handleDragEnd}
            {...(closeOnSwipeDown ? swipeHandlers : {})}
            className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl ${className}`}
            style={{ maxHeight }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'bottom-sheet-title' : undefined}
          >
            {showHandle && (
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" aria-hidden="true" />
              </div>
            )}

            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 id="bottom-sheet-title" className="text-xl font-bold text-gray-900">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors touch-action-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            )}

            <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(90vh - 120px)' }}>
              {children}
            </div>

            <div className="h-safe-area-bottom" />
          </div>
        </>
      )}
)
}

export function useBottomSheet(initialState = false) {
  const [isOpen, setIsOpen] = React.useState(initialState)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
