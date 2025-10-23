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
        viewBox="0 0 120 120"
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>

        {/* Minimalist Brain Icon - Bold & Clean */}
        <g fill="url(#brainGradient)">
          {/* Left Hemisphere - Simplified Bold Shape */}
          <path
            d="M30 35
               C25 28, 28 18, 38 15
               C48 12, 58 18, 60 30
               C60 35, 58 42, 55 48
               C52 58, 48 68, 43 75
               C38 80, 30 82, 25 76
               C20 70, 22 58, 25 48
               C27 42, 28 38, 30 35 Z"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right Hemisphere - Simplified Bold Shape */}
          <path
            d="M90 35
               C95 28, 92 18, 82 15
               C72 12, 62 18, 60 30
               C60 35, 62 42, 65 48
               C68 58, 72 68, 77 75
               C82 80, 90 82, 95 76
               C100 70, 98 58, 95 48
               C93 42, 92 38, 90 35 Z"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Division (Longitudinal Fissure) */}
          <path d="M60 20 L60 78" stroke="#000000" strokeWidth="2" strokeLinecap="round" />

          {/* Cerebellum - Lower Brain Section */}
          <ellipse cx="45" cy="85" rx="12" ry="6" stroke="#000000" strokeWidth="2.5" />
          <ellipse cx="75" cy="85" rx="12" ry="6" stroke="#000000" strokeWidth="2.5" />

          {/* Brain Stem */}
          <rect x="56" y="88" width="8" height="16" rx="4" stroke="#000000" strokeWidth="2.5" />

          {/* Minimalist Sulci/Gyri Lines - Clean & Bold */}
          <path
            d="M35 40 Q42 38, 48 42"
            stroke="#000000"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M85 40 Q78 38, 72 42"
            stroke="#000000"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M38 55 Q45 52, 52 56"
            stroke="#000000"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M82 55 Q75 52, 68 56"
            stroke="#000000"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Neural Network Nodes - Minimal Design */}
          <circle cx="40" cy="45" r="2.5" fill="#000000" />
          <circle cx="80" cy="45" r="2.5" fill="#000000" />
          <circle cx="60" cy="60" r="2.5" fill="#000000" />
        </g>
      </svg>
    </div>
  )
}

export default BrainLogo
