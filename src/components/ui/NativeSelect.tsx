import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Error message to display - also sets aria-invalid */
  error?: string
  /** ID of the element describing the select (for aria-describedby) */
  describedBy?: string
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, error, describedBy, required, ...props }, ref) => {
    // Combine describedBy with error message ID if error exists
    const errorId = error ? `${props.id || props.name}-error` : undefined
    const ariaDescribedBy = [describedBy, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full">
        <div className="relative">
          <select
            className={cn(
              'flex h-12 w-full appearance-none items-center justify-between rounded-lg border bg-white px-4 py-3 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200',
              className
            )}
            ref={ref}
            aria-invalid={error ? 'true' : undefined}
            aria-required={required ? 'true' : undefined}
            aria-describedby={ariaDescribedBy}
            required={required}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
NativeSelect.displayName = 'NativeSelect'

export { NativeSelect }
