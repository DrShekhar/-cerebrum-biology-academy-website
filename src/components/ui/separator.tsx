'use client'

import * as React from 'react'

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className = '', orientation = 'horizontal', decorative = true, ...props }, ref) => {
    const baseClasses =
      orientation === 'horizontal' ? 'h-[1px] w-full bg-gray-200' : 'h-full w-[1px] bg-gray-200'

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        className={`shrink-0 ${baseClasses} ${className}`}
        {...props}
      />
    )
  }
)
Separator.displayName = 'Separator'

export { Separator }
