'use client'

import { cn } from '@/lib/utils'
import { type ReactNode, type ButtonHTMLAttributes } from 'react'

interface LightweightButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'medical' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function LightweightButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: LightweightButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg hover:from-blue-700 hover:to-blue-900',
    secondary:
      'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg hover:from-gray-700 hover:to-gray-900',
    medical:
      'bg-[#4a5d4a] text-white shadow-lg hover:from-green-600 hover:to-green-700',
    outline:
      'bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50',
  }

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300',
        'focus:outline-none focus:ring-4 focus:ring-white/30',
        'active:scale-[0.98] hover:scale-[1.02]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
