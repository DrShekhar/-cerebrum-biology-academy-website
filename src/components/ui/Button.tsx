import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

// CSS-based animation classes (replaces framer-motion for 90KB bundle savings)
const animationClasses =
  'transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.98]'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-teal-600 text-white hover:bg-teal-700 font-semibold shadow-sm hover:shadow-lg',
        primary: 'bg-teal-600 text-white hover:bg-teal-700 font-semibold shadow-sm hover:shadow-lg',
        secondary:
          'bg-white hover:bg-navy-50 text-navy-700 border-2 border-navy-300 hover:border-navy-400 font-semibold',
        outline:
          'border-2 border-navy-300 bg-transparent text-navy-700 hover:bg-navy-50 hover:border-navy-400',
        ghost: 'bg-transparent hover:bg-navy-50 text-navy-700 hover:text-navy-900 font-medium',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // Legacy aliases - map to standard variants (for backwards compatibility during migration)
        success_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        urgency_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        trust_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        premium_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        phone_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        demo_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        secondary_cta:
          'bg-white border-2 border-navy-300 text-navy-700 hover:bg-navy-50 hover:border-navy-400 font-semibold',
        link: 'text-teal-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 min-h-[44px] px-4 py-2 text-sm',
        sm: 'h-10 min-h-[40px] rounded-md px-3 text-xs sm:text-sm',
        lg: 'h-12 min-h-[48px] px-6 text-sm sm:text-base rounded-md font-semibold',
        xl: 'h-14 min-h-[56px] px-8 text-base sm:text-lg rounded-lg font-semibold',
        icon: 'h-11 w-11 min-h-[44px] min-w-[44px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  animate?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      animate = true,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Apply animation classes only when enabled and not disabled/loading
    const shouldAnimate = animate && !disabled && !loading
    const classes = cn(
      buttonVariants({ variant, size, className }),
      shouldAnimate && animationClasses
    )

    if (asChild) {
      return (
        <Slot className={classes} ref={ref} {...props}>
          {children}
        </Slot>
      )
    }

    return (
      <button className={classes} ref={ref} disabled={disabled || loading} {...props}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
