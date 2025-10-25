/**
 * ResponsiveContainer Component
 *
 * Mobile-first responsive container with adaptive padding and max-width constraints.
 * Optimized for readability and touch interactions across all device sizes.
 *
 * Features:
 * - Adaptive padding (less on mobile, more on desktop)
 * - Safe area handling for notched devices
 * - Multiple variants for different content types
 * - Accessibility-first design
 */

import React from 'react'
import { cn } from '@/lib/utils'

export type ContainerVariant = 'tight' | 'comfortable' | 'wide' | 'full'

interface ResponsiveContainerProps {
  children: React.ReactNode
  variant?: ContainerVariant
  className?: string
  as?: React.ElementType
  safeArea?: boolean
  id?: string
}

const variantStyles: Record<ContainerVariant, string> = {
  // Tight: Minimal padding, narrow max-width (ideal for forms, focused content)
  tight: 'px-4 md:px-6 lg:px-8 max-w-2xl',

  // Comfortable: Balanced padding, standard max-width (ideal for article content)
  comfortable: 'px-4 md:px-8 lg:px-12 max-w-4xl',

  // Wide: Generous padding, wider max-width (ideal for dashboards, grids)
  wide: 'px-4 md:px-8 lg:px-16 max-w-7xl',

  // Full: Edge-to-edge on mobile, padded on desktop (ideal for hero sections)
  full: 'px-0 md:px-8 lg:px-16 max-w-screen-2xl',
}

const safeAreaStyles =
  'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]'

export function ResponsiveContainer({
  children,
  variant = 'comfortable',
  className = '',
  as: Component = 'div',
  safeArea = false,
  id,
}: ResponsiveContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        'mx-auto w-full',
        variantStyles[variant],
        safeArea && safeAreaStyles,
        className
      )}
    >
      {children}
    </Component>
  )
}

/**
 * Specialized container for AI dashboard sections
 */
export function AIDashboardContainer({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ResponsiveContainer variant="wide" className={cn('py-4 md:py-6 lg:py-8', className)}>
      {children}
    </ResponsiveContainer>
  )
}

/**
 * Specialized container for chat interfaces
 */
export function ChatContainer({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ResponsiveContainer variant="tight" safeArea className={cn('py-4 md:py-6', className)}>
      {children}
    </ResponsiveContainer>
  )
}

/**
 * Specialized container for test generation interfaces
 */
export function TestGenerationContainer({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ResponsiveContainer variant="wide" className={cn('py-6 md:py-8 lg:py-10', className)}>
      {children}
    </ResponsiveContainer>
  )
}

/**
 * Full-width section wrapper with background color
 */
export function Section({
  children,
  variant = 'comfortable',
  background = 'transparent',
  className = '',
}: {
  children: React.ReactNode
  variant?: ContainerVariant
  background?: 'transparent' | 'gray' | 'blue' | 'white'
  className?: string
}) {
  const backgroundStyles = {
    transparent: '',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    white: 'bg-white',
  }

  return (
    <section
      className={cn('w-full py-8 md:py-12 lg:py-16', backgroundStyles[background], className)}
    >
      <ResponsiveContainer variant={variant}>{children}</ResponsiveContainer>
    </section>
  )
}

/**
 * Grid container with responsive columns
 */
export function ResponsiveGrid({
  children,
  columns = 1,
  gap = 'comfortable',
  className = '',
}: {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'tight' | 'comfortable' | 'wide'
  className?: string
}) {
  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const gapStyles = {
    tight: 'gap-3 md:gap-4',
    comfortable: 'gap-4 md:gap-6',
    wide: 'gap-6 md:gap-8',
  }

  return (
    <div className={cn('grid', columnStyles[columns], gapStyles[gap], className)}>{children}</div>
  )
}

/**
 * Stack container for vertical layouts
 */
export function Stack({
  children,
  spacing = 'comfortable',
  className = '',
}: {
  children: React.ReactNode
  spacing?: 'tight' | 'comfortable' | 'wide'
  className?: string
}) {
  const spacingStyles = {
    tight: 'space-y-3 md:space-y-4',
    comfortable: 'space-y-4 md:space-y-6',
    wide: 'space-y-6 md:space-y-8',
  }

  return <div className={cn('flex flex-col', spacingStyles[spacing], className)}>{children}</div>
}

/**
 * Mobile-optimized card container
 */
export function MobileCard({
  children,
  clickable = false,
  className = '',
  onClick,
}: {
  children: React.ReactNode
  clickable?: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={cn(
        'bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200',
        clickable &&
          'cursor-pointer active:scale-98 transition-transform duration-100 hover:shadow-md',
        className
      )}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {children}
    </div>
  )
}

/**
 * Bottom sheet container for mobile (slides up from bottom)
 */
export function BottomSheet({
  children,
  isOpen,
  onClose,
  className = '',
}: {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 md:hidden',
          'max-h-[90vh] overflow-y-auto',
          'pb-[env(safe-area-inset-bottom)]',
          'animate-slide-up',
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-4 pb-4">{children}</div>
      </div>
    </>
  )
}

/**
 * Utility function to check if device is mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}
