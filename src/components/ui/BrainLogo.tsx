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
        viewBox="0 0 32 32"
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Ultra Minimal Brain - Two Hemispheres with Single Fold Line */}

        {/* Left Hemisphere */}
        <path
          d="M 10 8 Q 6 8, 4 12 Q 3 16, 4 20 Q 5 24, 8 26 Q 10 27, 12 27"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left Fold - Single minimal line */}
        <path
          d="M 6 16 Q 8 15.5, 10 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Right Hemisphere */}
        <path
          d="M 22 8 Q 26 8, 28 12 Q 29 16, 28 20 Q 27 24, 24 26 Q 22 27, 20 27"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Fold - Single minimal line */}
        <path
          d="M 26 16 Q 24 15.5, 22 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Top Connection */}
        <path
          d="M 10 8 Q 13 6, 16 6 Q 19 6, 22 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom Connection */}
        <path
          d="M 12 27 Q 14 28, 16 28 Q 18 28, 20 27"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default BrainLogo
