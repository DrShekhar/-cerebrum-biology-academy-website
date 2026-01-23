import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error message to display - also sets aria-invalid */
  error?: string
  /** ID of the element describing the input (for aria-describedby) */
  describedBy?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, describedBy, required, ...props }, ref) => {
    // Combine describedBy with error message ID if error exists
    const errorId = error ? `${props.id || props.name}-error` : undefined
    const ariaDescribedBy = [describedBy, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 sm:h-12 w-full rounded-lg border bg-white px-3 sm:px-4 py-2 sm:py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
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
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
