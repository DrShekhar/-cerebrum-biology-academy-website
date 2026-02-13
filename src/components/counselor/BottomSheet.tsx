'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { X } from 'lucide-react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  snapPoints?: number[] // Percentage values (e.g., [90, 50] for 90% and 50% height)
  initialSnap?: number // Index of snapPoints array
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  snapPoints = [90],
  initialSnap = 0,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const currentSnapIndex = useRef(initialSnap)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when sheet is open
      document.body.style.overflow = 'hidden'
      // Add safe area padding for iOS
      document.body.style.paddingBottom = 'env(safe-area-inset-bottom)'
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingBottom = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingBottom = ''
    }
  }, [isOpen])

  function handleDragEnd(event: any, info: PanInfo) {
    const threshold = 100

    if (info.offset.y > threshold) {
      // Swipe down to close
      onClose()
    } else if (snapPoints.length > 1) {
      // Snap to nearest snap point
      const currentHeight = snapPoints[currentSnapIndex.current]
      const dragPercentage = (info.offset.y / window.innerHeight) * 100

      if (dragPercentage > 10 && currentSnapIndex.current < snapPoints.length - 1) {
        // Snap to smaller size
        currentSnapIndex.current++
      } else if (dragPercentage < -10 && currentSnapIndex.current > 0) {
        // Snap to larger size
        currentSnapIndex.current--
      }
    }
  }

  const sheetHeight = `${snapPoints[currentSnapIndex.current]}vh`

  return (
{isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-fadeInUp"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <div
            ref={sheetRef}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ height: sheetHeight }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl flex flex-col animate-fadeInUp"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </div>
        </>
      )}
)
}
