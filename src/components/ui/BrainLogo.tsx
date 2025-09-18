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
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient id="brainHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>

          <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Shadow Filter */}
          <filter id="brainShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Brain Main Structure */}
        <g filter="url(#brainShadow)">
          {/* Left Hemisphere */}
          <path
            d="M25 45
               C20 35, 25 25, 35 20
               C45 15, 55 20, 60 30
               C62 35, 60 40, 58 45
               C56 55, 52 65, 48 70
               C44 75, 38 78, 32 75
               C26 70, 22 60, 25 45 Z"
            fill="url(#brainGradient)"
            stroke="#2563EB"
            strokeWidth="0.5"
            opacity="0.95"
          />

          {/* Right Hemisphere */}
          <path
            d="M95 45
               C100 35, 95 25, 85 20
               C75 15, 65 20, 60 30
               C58 35, 60 40, 62 45
               C64 55, 68 65, 72 70
               C76 75, 82 78, 88 75
               C94 70, 98 60, 95 45 Z"
            fill="url(#brainGradient)"
            stroke="#2563EB"
            strokeWidth="0.5"
            opacity="0.95"
          />

          {/* Central Connection (Corpus Callosum) */}
          <ellipse cx="60" cy="42" rx="8" ry="3" fill="url(#brainHighlight)" opacity="0.8" />

          {/* Frontal Lobe Details */}
          <path
            d="M30 35 C35 30, 40 28, 45 32 C42 38, 38 40, 30 35 Z"
            fill="url(#brainHighlight)"
            opacity="0.6"
          />

          <path
            d="M90 35 C85 30, 80 28, 75 32 C78 38, 82 40, 90 35 Z"
            fill="url(#brainHighlight)"
            opacity="0.6"
          />

          {/* Temporal Lobe Curves */}
          <path
            d="M28 55 C32 52, 38 54, 40 58 C36 62, 30 60, 28 55 Z"
            fill="url(#brainHighlight)"
            opacity="0.5"
          />

          <path
            d="M92 55 C88 52, 82 54, 80 58 C84 62, 90 60, 92 55 Z"
            fill="url(#brainHighlight)"
            opacity="0.5"
          />

          {/* Occipital Lobe */}
          <path
            d="M35 72 C40 68, 48 70, 50 75 C45 78, 38 76, 35 72 Z"
            fill="url(#brainHighlight)"
            opacity="0.5"
          />

          <path
            d="M85 72 C80 68, 72 70, 70 75 C75 78, 82 76, 85 72 Z"
            fill="url(#brainHighlight)"
            opacity="0.5"
          />

          {/* Brain Stem */}
          <rect
            x="57"
            y="75"
            width="6"
            height="12"
            rx="3"
            fill="url(#brainGradient)"
            opacity="0.8"
          />

          {/* Neural Activity Dots */}
          <circle cx="40" cy="40" r="1.5" fill="#60A5FA" opacity="0.8">
            {animate && (
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          <circle cx="80" cy="40" r="1.5" fill="#A78BFA" opacity="0.8">
            {animate && (
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="2.5s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          <circle cx="60" cy="50" r="1" fill="#06B6D4" opacity="0.8">
            {animate && (
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="1.8s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          {/* Sulci and Gyri Details */}
          <path
            d="M32 48 Q38 46, 44 50"
            stroke="#2563EB"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
          />

          <path
            d="M88 48 Q82 46, 76 50"
            stroke="#2563EB"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
          />

          <path
            d="M36 58 Q42 56, 48 60"
            stroke="#8B5CF6"
            strokeWidth="0.6"
            fill="none"
            opacity="0.3"
          />

          <path
            d="M84 58 Q78 56, 72 60"
            stroke="#8B5CF6"
            strokeWidth="0.6"
            fill="none"
            opacity="0.3"
          />

          {/* Cerebellum */}
          <ellipse cx="45" cy="82" rx="8" ry="4" fill="url(#brainGradient)" opacity="0.7" />

          <ellipse cx="75" cy="82" rx="8" ry="4" fill="url(#brainGradient)" opacity="0.7" />

          {/* Cerebellum Folds */}
          <path
            d="M39 80 Q45 78, 51 80"
            stroke="#2563EB"
            strokeWidth="0.5"
            fill="none"
            opacity="0.5"
          />

          <path
            d="M69 80 Q75 78, 81 80"
            stroke="#2563EB"
            strokeWidth="0.5"
            fill="none"
            opacity="0.5"
          />

          {/* Highlight Glow */}
          <ellipse cx="60" cy="50" rx="35" ry="30" fill="url(#neuralGlow)" opacity="0.4" />
        </g>

        {/* Knowledge Connections (Neural Networks) */}
        {animate && (
          <g opacity="0.6">
            <line x1="40" y1="40" x2="80" y2="40" stroke="#60A5FA" strokeWidth="0.5">
              <animate
                attributeName="stroke-opacity"
                values="0;1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </line>
            <line x1="35" y1="55" x2="85" y2="55" stroke="#A78BFA" strokeWidth="0.5">
              <animate
                attributeName="stroke-opacity"
                values="1;0;1"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </line>
            <line x1="45" y1="35" x2="75" y2="65" stroke="#06B6D4" strokeWidth="0.5">
              <animate
                attributeName="stroke-opacity"
                values="0.5;1;0.5"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </line>
          </g>
        )}
      </svg>
    </div>
  )
}

export default BrainLogo
