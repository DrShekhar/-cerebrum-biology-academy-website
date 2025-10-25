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
        viewBox="0 0 48 48"
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Simplified Iconic Brain - Clean Modern Design */}

        {/* Left Hemisphere */}
        <path
          d="M 14 12 Q 10 12, 8 15 Q 6 18, 6 22 Q 6 26, 7 29 Q 8 32, 10 34 Q 12 36, 15 37 Q 17 38, 19 38"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Left Hemisphere Gyri - 3 clean curves */}
        <path
          d="M 10 18 Q 13 17, 15 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 9 23 Q 12 22, 15 23"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 10 28 Q 13 27, 16 28"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right Hemisphere */}
        <path
          d="M 34 12 Q 38 12, 40 15 Q 42 18, 42 22 Q 42 26, 41 29 Q 40 32, 38 34 Q 36 36, 33 37 Q 31 38, 29 38"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Right Hemisphere Gyri - 3 clean curves */}
        <path
          d="M 38 18 Q 35 17, 33 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 39 23 Q 36 22, 33 23"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 38 28 Q 35 27, 32 28"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Top Connection - Frontal Lobe */}
        <path
          d="M 14 12 Q 18 10, 24 10 Q 30 10, 34 12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Top Gyri */}
        <path
          d="M 18 13 Q 21 11.5, 24 11.5 Q 27 11.5, 30 13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Corpus Callosum - Central Connection */}
        <path
          d="M 19 38 Q 21 39, 24 39 Q 27 39, 29 38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cerebellum Base - Small detailed section */}
        <path
          d="M 19 38 Q 20 40, 21 41"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 29 38 Q 28 40, 27 41"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

export default BrainLogo
