'use client'

import React from 'react'

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
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  }

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 64 64"
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        {/* Left Hemisphere */}
        <path d="M20 12C16 12 12 16 12 20C12 22 12.5 23.8 13.5 25.2C11.5 26.5 10 28.8 10 31.5C10 34 11.2 36.2 13 37.5C13 38 13 38.5 13 39C13 43 16 46 20 46C21 46 22 45.8 22.8 45.5C23.5 47.5 25.3 49 27.5 49C28.5 49 29.4 48.7 30.2 48.2C30.5 50.5 31.5 52 32 52V12C28 12 24 12 20 12Z" />

        {/* Right Hemisphere */}
        <path d="M44 12C48 12 52 16 52 20C52 22 51.5 23.8 50.5 25.2C52.5 26.5 54 28.8 54 31.5C54 34 52.8 36.2 51 37.5C51 38 51 38.5 51 39C51 43 48 46 44 46C43 46 42 45.8 41.2 45.5C40.5 47.5 38.7 49 36.5 49C35.5 49 34.6 48.7 33.8 48.2C33.5 50.5 32.5 52 32 52V12C36 12 40 12 44 12Z" />

        {/* Brain Folds - Left */}
        <ellipse cx="18" cy="24" rx="3" ry="4" fill="white" opacity="0.2" />
        <ellipse cx="16" cy="34" rx="2.5" ry="3.5" fill="white" opacity="0.2" />
        <ellipse cx="22" cy="30" rx="2" ry="3" fill="white" opacity="0.2" />

        {/* Brain Folds - Right */}
        <ellipse cx="46" cy="24" rx="3" ry="4" fill="white" opacity="0.2" />
        <ellipse cx="48" cy="34" rx="2.5" ry="3.5" fill="white" opacity="0.2" />
        <ellipse cx="42" cy="30" rx="2" ry="3" fill="white" opacity="0.2" />

        {/* Center Division */}
        <line x1="32" y1="12" x2="32" y2="52" stroke="white" strokeWidth="1" opacity="0.15" />
      </svg>
    </div>
  )
}

export default BrainLogo
