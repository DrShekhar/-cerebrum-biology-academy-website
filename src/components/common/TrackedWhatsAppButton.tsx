'use client'

import { useState, useCallback } from 'react'
import { MessageCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

export type WhatsAppButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'floating' | 'icon'
export type WhatsAppButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface TrackedWhatsAppButtonProps {
  source: string
  message?: string
  campaign?: string
  buttonText?: string
  variant?: WhatsAppButtonVariant
  size?: WhatsAppButtonSize
  className?: string
  showIcon?: boolean
  iconOnly?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<WhatsAppButtonVariant, string> = {
  primary:
    'bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg hover:shadow-xl',
  secondary:
    'bg-green-100 hover:bg-green-200 text-green-700 border border-green-300',
  outline:
    'border-2 border-green-500 text-green-600 hover:bg-green-50',
  ghost:
    'text-green-600 hover:bg-green-50',
  floating:
    'bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-2xl hover:shadow-3xl rounded-full',
  icon:
    'bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full p-2',
}

const sizeStyles: Record<WhatsAppButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2',
  xl: 'px-8 py-4 text-xl gap-3',
}

const iconSizes: Record<WhatsAppButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
}

export function TrackedWhatsAppButton({
  source,
  message = WHATSAPP_MESSAGES.default,
  campaign,
  buttonText = 'WhatsApp',
  variant = 'primary',
  size = 'md',
  className,
  showIcon = true,
  iconOnly = false,
  disabled = false,
  fullWidth = false,
}: TrackedWhatsAppButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(async () => {
    if (disabled || isLoading) return

    setIsLoading(true)
    try {
      await trackAndOpenWhatsApp({
        source,
        message,
        campaign,
        buttonText,
      })
    } finally {
      setIsLoading(false)
    }
  }, [source, message, campaign, buttonText, disabled, isLoading])

  const iconSize = iconSizes[size]

  if (iconOnly) {
    return (
      <button
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles.icon,
          className
        )}
        aria-label="Contact on WhatsApp"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={iconSize} />
        ) : (
          <MessageCircle size={iconSize} />
        )}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-lg',
        'transition-all duration-200 transform hover:scale-[1.02]',
        'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={iconSize} />
      ) : (
        showIcon && <MessageCircle size={iconSize} />
      )}
      <span>{buttonText}</span>
    </button>
  )
}

interface TrackedWhatsAppLinkProps {
  source: string
  message?: string
  campaign?: string
  children: React.ReactNode
  className?: string
}

export function TrackedWhatsAppLink({
  source,
  message = WHATSAPP_MESSAGES.default,
  campaign,
  children,
  className,
}: TrackedWhatsAppLinkProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      if (isLoading) return

      setIsLoading(true)
      try {
        await trackAndOpenWhatsApp({
          source,
          message,
          campaign,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [source, message, campaign, isLoading]
  )

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'cursor-pointer inline bg-transparent border-none p-0 font-inherit text-inherit',
        isLoading && 'opacity-50 cursor-wait',
        className
      )}
    >
      {children}
    </button>
  )
}

export function WhatsAppFloatingButton({
  source = 'floating-button',
  message = WHATSAPP_MESSAGES.default,
  campaign,
  className,
}: {
  source?: string
  message?: string
  campaign?: string
  className?: string
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      await trackAndOpenWhatsApp({
        source,
        message,
        campaign,
      })
    } finally {
      setIsLoading(false)
    }
  }, [source, message, campaign, isLoading])

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-14 h-14 rounded-full',
        'bg-[#25D366] hover:bg-[#20BD5A]',
        'text-white shadow-2xl hover:shadow-3xl',
        'flex items-center justify-center',
        'transition-all duration-300 transform hover:scale-110',
        'focus:outline-none focus:ring-4 focus:ring-green-300',
        'animate-pulse hover:animate-none',
        isLoading && 'opacity-50 cursor-wait',
        className
      )}
      aria-label="Chat on WhatsApp"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={28} />
      ) : (
        <MessageCircle size={28} />
      )}
    </button>
  )
}

export default TrackedWhatsAppButton
