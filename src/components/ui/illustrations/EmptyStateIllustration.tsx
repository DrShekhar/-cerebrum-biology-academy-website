'use client'

import React from 'react'
interface EmptyStateIllustrationProps {
  type: 'test' | 'chat' | 'progress' | 'search' | 'default'
  className?: string
  animate?: boolean
}

export function EmptyStateIllustration({
  type,
  className = '',
  animate = true,
}: EmptyStateIllustrationProps) {
  const animations = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  }

  const illustrations = {
    test: (
      <svg className={className} viewBox="0 0 200 200" fill="none">
        <motion.g>
          {/* Paper */}
          <rect x="50" y="30" width="100" height="140" rx="4" fill="#E5E7EB" />
          <rect x="50" y="30" width="100" height="140" rx="4" stroke="#9CA3AF" strokeWidth="2" />

          {/* Lines representing text */}
          <rect x="65" y="50" width="70" height="4" rx="2" fill="#9CA3AF" />
          <rect x="65" y="65" width="50" height="4" rx="2" fill="#9CA3AF" />
          <rect x="65" y="80" width="60" height="4" rx="2" fill="#9CA3AF" />

          {/* Checkboxes */}
          <circle cx="70" cy="100" r="6" fill="white" stroke="#9CA3AF" strokeWidth="2" />
          <circle cx="70" cy="120" r="6" fill="white" stroke="#9CA3AF" strokeWidth="2" />
          <circle cx="70" cy="140" r="6" fill="white" stroke="#9CA3AF" strokeWidth="2" />

          {/* Checkmark on first option */}
          <motion.path
            d="M 67 100 L 69 102 L 73 98"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>

        {/* Pencil */}
        <motion.g>
          <rect
            x="130"
            y="150"
            width="8"
            height="35"
            rx="2"
            fill="#FCD34D"
            transform="rotate(-45 134 167)"
          />
          <path d="M 145 155 L 150 160 L 140 170 L 135 165 Z" fill="#F59E0B" />
        </motion.g>
      </svg>
    ),

    chat: (
      <svg className={className} viewBox="0 0 200 200" fill="none">
        {/* Left bubble (user) */}
        <motion.g
        >
          <circle cx="60" cy="70" r="30" fill="#DBEAFE" />
          <path d="M 45 95 L 60 85 L 75 95" fill="#DBEAFE" />
          <circle cx="52" cy="65" r="3" fill="#3B82F6" />
          <circle cx="60" cy="65" r="3" fill="#3B82F6" />
          <circle cx="68" cy="65" r="3" fill="#3B82F6" />
        </motion.g>

        {/* Right bubble (bot) */}
        <motion.g
        >
          <circle cx="140" cy="120" r="35" fill="#D1FAE5" />
          <path d="M 120 150 L 140 140 L 160 150" fill="#D1FAE5" />
          <rect x="130" y="110" width="20" height="2" rx="1" fill="#10B981" />
          <rect x="130" y="118" width="15" height="2" rx="1" fill="#10B981" />
          <rect x="130" y="126" width="18" height="2" rx="1" fill="#10B981" />
        </motion.g>

        {/* Sparkles */}
        <motion.g
        >
          <circle cx="40" cy="50" r="2" fill="#FCD34D" />
          <circle cx="160" cy="90" r="2" fill="#FCD34D" />
        </motion.g>
      </svg>
    ),

    progress: (
      <svg className={className} viewBox="0 0 200 200" fill="none">
        <motion.g>
          {/* Bar chart */}
          <rect x="40" y="120" width="20" height="40" rx="2" fill="#DBEAFE" />
          <rect x="70" y="90" width="20" height="70" rx="2" fill="#93C5FD" />
          <rect x="100" y="60" width="20" height="100" rx="2" fill="#60A5FA" />
          <rect x="130" y="80" width="20" height="80" rx="2" fill="#3B82F6" />

          {/* Trend line */}
          <motion.path
            d="M 50 130 L 80 100 L 110 70 L 140 90"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Arrow */}
          <path d="M 135 85 L 140 90 L 145 85" fill="none" stroke="#10B981" strokeWidth="3" />
        </motion.g>

        {/* Base line */}
        <line x1="30" y1="165" x2="160" y2="165" stroke="#9CA3AF" strokeWidth="2" />
      </svg>
    ),

    search: (
      <svg className={className} viewBox="0 0 200 200" fill="none">
        {/* Magnifying glass */}
        <motion.g
        >
          <circle
            cx="90"
            cy="90"
            r="35"
            fill="white"
            stroke="#9CA3AF"
            strokeWidth="4"
            opacity="0.5"
          />
          <circle cx="90" cy="90" r="30" fill="none" stroke="#3B82F6" strokeWidth="5" />
          <line
            x1="115"
            y1="115"
            x2="140"
            y2="140"
            stroke="#3B82F6"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Question marks */}
        <motion.g
        >
          <text x="80" y="95" fontSize="24" fontWeight="bold" fill="#9CA3AF">
            ?
          </text>
        </motion.g>

        {/* Small circles decoration */}
        <motion.circle
          cx="50"
          cy="60"
          r="3"
          fill="#FCD34D"
        />
        <motion.circle
          cx="140"
          cy="70"
          r="3"
          fill="#FCD34D"
        />
      </svg>
    ),

    default: (
      <svg className={className} viewBox="0 0 200 200" fill="none">
        <motion.g>
          {/* Document stack */}
          <rect x="50" y="60" width="90" height="110" rx="4" fill="#F3F4F6" />
          <rect x="55" y="55" width="90" height="110" rx="4" fill="#E5E7EB" />
          <rect
            x="60"
            y="50"
            width="90"
            height="110"
            rx="4"
            fill="white"
            stroke="#D1D5DB"
            strokeWidth="2"
          />

          {/* Content lines */}
          <rect x="75" y="70" width="60" height="3" rx="1.5" fill="#9CA3AF" />
          <rect x="75" y="85" width="50" height="3" rx="1.5" fill="#9CA3AF" />
          <rect x="75" y="100" width="55" height="3" rx="1.5" fill="#9CA3AF" />

          {/* Star */}
          <motion.path
            d="M 100 120 L 105 130 L 115 130 L 108 137 L 110 147 L 100 140 L 90 147 L 92 137 L 85 130 L 95 130 Z"
            fill="#FCD34D"
            style={{ originX: '100px', originY: '133px' }}
          />
        </motion.g>
      </svg>
    ),
  }

  return illustrations[type] || illustrations.default
}
