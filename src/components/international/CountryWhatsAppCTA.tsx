'use client'

import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { getCountryWhatsAppMessage, type MessageType } from '@/lib/international/whatsapp-messages'

interface CountryWhatsAppCTAProps {
  variant?: 'hero' | 'primary' | 'secondary' | 'inline' | 'floating'
  country: string
  message?: MessageType
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: React.ReactNode
  showIcon?: boolean
  campaign?: string
}

const variantStyles = {
  hero: 'bg-green-500 hover:bg-green-600 text-white shadow-xl hover:shadow-2xl',
  primary: 'bg-green-500 hover:bg-green-600 text-white shadow-lg',
  secondary: 'bg-white border-2 border-green-500 text-green-600 hover:bg-green-50',
  inline: 'bg-green-100 hover:bg-green-200 text-green-700',
  floating: 'bg-green-500 hover:bg-green-600 text-white shadow-2xl rounded-full',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
}

export function CountryWhatsAppCTA({
  variant = 'primary',
  country,
  message = 'default',
  size = 'lg',
  className,
  children,
  showIcon = true,
  campaign,
}: CountryWhatsAppCTAProps) {
  const whatsappMessage = getCountryWhatsAppMessage(country, message)

  const handleClick = async () => {
    await trackAndOpenWhatsApp({
      source: `international-${country}`,
      message: whatsappMessage,
      campaign: campaign || `country-landing-${country}`,
      buttonText: typeof children === 'string' ? children : 'Chat on WhatsApp',
    })
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-3 font-semibold rounded-lg transition-all duration-200',
        'focus:outline-none focus:ring-4 focus:ring-green-500/30',
        'min-h-[48px]', // Touch-friendly minimum height
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {showIcon && <MessageCircle className="w-6 h-6" />}
      {children || 'Chat on WhatsApp'}
    </button>
  )
}

export default CountryWhatsAppCTA
