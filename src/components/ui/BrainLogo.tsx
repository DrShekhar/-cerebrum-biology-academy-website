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
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simple, Bold, Iconic Brain Logo - Recognizable at Small Sizes */}
        <g
          stroke="#000000"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Left Hemisphere - Simple Bold Shape */}
          <path d="M30 50 C25 35, 30 20, 45 18 C50 17, 50 25, 50 30 C50 40, 48 50, 45 60 C42 70, 35 75, 30 72 C25 68, 25 58, 30 50 Z" />

          {/* Right Hemisphere - Simple Bold Shape */}
          <path d="M70 50 C75 35, 70 20, 55 18 C50 17, 50 25, 50 30 C50 40, 52 50, 55 60 C58 70, 65 75, 70 72 C75 68, 75 58, 70 50 Z" />

          {/* Central Division - Bold */}
          <path d="M50 20 L50 70" strokeWidth="2.5" />

          {/* Simple Brain Folds - Just 3 curves per side for clarity */}
          {/* Left side folds */}
          <path d="M35 35 Q40 33, 45 35" strokeWidth="2.5" />
          <path d="M33 45 Q38 43, 43 45" strokeWidth="2.5" />
          <path d="M35 55 Q40 53, 45 55" strokeWidth="2.5" />

          {/* Right side folds */}
          <path d="M65 35 Q60 33, 55 35" strokeWidth="2.5" />
          <path d="M67 45 Q62 43, 57 45" strokeWidth="2.5" />
          <path d="M65 55 Q60 53, 55 55" strokeWidth="2.5" />

          {/* Brain Stem - Simple */}
          <rect x="47" y="72" width="6" height="12" rx="3" strokeWidth="2.5" />

          {/* Small Cerebellum Indication */}
          <ellipse cx="42" cy="78" rx="6" ry="3" strokeWidth="2" />
          <ellipse cx="58" cy="78" rx="6" ry="3" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}

export default BrainLogo
