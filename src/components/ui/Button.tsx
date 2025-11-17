import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border-2 border-navy-300 bg-transparent text-navy-700 hover:bg-navy-50 hover:border-navy-400',
        secondary:
          'bg-white hover:bg-navy-50 text-navy-700 border-2 border-navy-300 hover:border-navy-400 font-semibold',
        ghost: 'bg-transparent hover:bg-navy-50 text-navy-700 hover:text-navy-900 font-medium',
        link: 'text-teal-600 underline-offset-4 hover:underline',
        primary: 'bg-teal-600 text-white hover:bg-teal-700 font-semibold shadow-sm hover:shadow-lg',
        success_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        urgency_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        trust_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        premium_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        secondary_cta:
          'bg-white border-2 border-navy-300 text-navy-700 hover:bg-navy-50 hover:border-navy-400 font-semibold',
        phone_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
        demo_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-lg font-semibold',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-10 px-4 text-sm xs:h-11 xs:px-6 sm:h-12 sm:px-8 sm:text-base rounded-md font-semibold',
        xl: 'h-11 px-6 text-base xs:h-12 xs:px-8 sm:h-14 sm:px-10 sm:text-lg rounded-lg font-semibold',
        icon: 'h-10 w-10',
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
    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Slot>
      )
    }

    if (animate) {
      return (
        // @ts-expect-error - Framer Motion types are complex with forwarded refs
        <motion.button
          {...props}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || loading}
          whileHover={disabled || loading ? undefined : { scale: 1.05 }}
          whileTap={disabled || loading ? undefined : { scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
          {children}
        </motion.button>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
