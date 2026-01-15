'use client'

import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface DiagramContainerProps {
  title?: string
  subtitle?: string
  width?: number | string
  height?: number | string
  className?: string
  children: ReactNode
  showBorder?: boolean
  showTitle?: boolean
}

export const DiagramContainer = forwardRef<HTMLDivElement, DiagramContainerProps>(
  function DiagramContainer(
    {
      title,
      subtitle,
      width = '100%',
      height = 'auto',
      className,
      children,
      showBorder = true,
      showTitle = true,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'diagram-container relative bg-white rounded-xl overflow-hidden',
          showBorder && 'border border-gray-200 shadow-lg',
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          minHeight: typeof height === 'number' ? `${height}px` : height,
        }}
      >
        {showTitle && title && (
          <div className="diagram-header bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {subtitle && <p className="text-sm text-slate-300 mt-0.5">{subtitle}</p>}
          </div>
        )}

        <div className="diagram-content relative p-4">{children}</div>
      </div>
    )
  }
)
