import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border-2 border-navy-300 bg-transparent text-navy-700 hover:bg-navy-50 hover:border-navy-400 transition-all duration-200',
        secondary:
          'bg-white hover:bg-navy-50 text-navy-700 border-2 border-navy-300 hover:border-navy-400 font-semibold transition-all duration-200',
        ghost:
          'bg-transparent hover:bg-navy-50 text-navy-700 hover:text-navy-900 font-medium transition-all duration-200',
        link: 'text-teal-600 underline-offset-4 hover:underline',

        // Primary CTA - Teal
        primary:
          'bg-teal-600 text-white hover:bg-teal-700 font-semibold shadow-sm hover:shadow-md transition-all duration-200',

        // Success CTA - Teal
        success_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md transition-all duration-200 font-semibold',

        // Urgency CTA - Teal
        urgency_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md transition-all duration-200 font-semibold',

        // Trust CTA - Teal
        trust_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md transition-all duration-200 font-semibold',

        // Premium CTA - Teal
        premium_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md transition-all duration-200 font-semibold',

        // Secondary CTA - Navy outline
        secondary_cta:
          'bg-white border-2 border-navy-300 text-navy-700 hover:bg-navy-50 hover:border-navy-400 transition-all duration-200 font-semibold',

        // Phone/Call CTA - Teal
        phone_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md transition-all duration-200 font-semibold',

        // Demo/Trial CTA - Teal
        demo_cta:
          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md transition-all duration-200 font-semibold',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 rounded-md px-8 text-base font-semibold',
        xl: 'h-14 rounded-lg px-10 text-lg font-semibold',
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
