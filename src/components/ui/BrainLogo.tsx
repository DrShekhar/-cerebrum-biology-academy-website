'use client'

import React from 'react'
import Image from 'next/image'

interface BrainLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
}

export const BrainLogo: React.FC<BrainLogoProps> = ({
  className = '',
  size = 'md',
  animate = false,
}) => {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center relative`}>
      <Image
        src="/brain-anatomy-logo.png"
        alt="Cerebrum Biology Academy - Brain Anatomy Logo"
        width={sizeMap[size]}
        height={sizeMap[size]}
        className={`w-full h-full object-contain ${animate ? 'animate-pulse' : ''} rounded-lg`}
        priority
      />
    </div>
  )
}

export default BrainLogo
