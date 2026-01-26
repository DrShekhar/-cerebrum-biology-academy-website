import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /** Whether the associated field is required */
  required?: boolean
  /** Optional helper text shown below label */
  helperText?: string
  /** ID for the helper text (for aria-describedby on the input) */
  helperTextId?: string
}

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, children, required, helperText, helperTextId, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}>
        {children}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </LabelPrimitive.Root>
      {helperText && (
        <span id={helperTextId} className="text-xs text-gray-500">
          {helperText}
        </span>
      )}
    </div>
  )
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
