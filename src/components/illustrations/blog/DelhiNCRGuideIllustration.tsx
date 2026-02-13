'use client'

import type { IllustrationProps } from './shared'

export function DelhiNCRGuideIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background - City skyline gradient */}
      <defs>
        <linearGradient id="delhiSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0FDF4" />
          <stop offset="100%" stopColor="#DCFCE7" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#delhiSkyGradient)" />

      {/* Delhi NCR Map representation */}
      <g
      >
        {/* Map base */}
        <ellipse
          cx="200"
          cy="160"
          rx="140"
          ry="100"
          fill="url(#mapGradient)"
          stroke="#22C55E"
          strokeWidth="2"
        />

        {/* Metro lines */}
        <path
          d="M100 140 Q 150 120 200 130 Q 250 140 300 130"
          stroke="#EF4444"
          strokeWidth="3"
          strokeDasharray="8 4"
          fill="none"
        />
        <path
          d="M120 180 Q 180 200 200 160 Q 220 120 280 150"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeDasharray="8 4"
          fill="none"
        />
        <path
          d="M160 80 L 200 160 L 240 240"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeDasharray="8 4"
          fill="none"
        />
      </g>

      {/* Location pins with animation */}
      {/* Rohini */}
      <g
      >
        <circle cx="140" cy="100" r="12" fill="#EF4444" />
        <path d="M140 88 L140 76" stroke="#EF4444" strokeWidth="3" />
        <circle cx="140" cy="100" r="5" fill="#FFF" />
        <text x="140" y="72" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          Rohini
        </text>
      </g>

      {/* South Delhi */}
      <g
      >
        <circle cx="200" cy="200" r="12" fill="#8B5CF6" />
        <path d="M200 188 L200 176" stroke="#8B5CF6" strokeWidth="3" />
        <circle cx="200" cy="200" r="5" fill="#FFF" />
        <text x="200" y="172" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          South Delhi
        </text>
      </g>

      {/* Gurugram */}
      <g
      >
        <circle cx="130" cy="180" r="12" fill="#14B8A6" />
        <path d="M130 168 L130 156" stroke="#14B8A6" strokeWidth="3" />
        <circle cx="130" cy="180" r="5" fill="#FFF" />
        <text x="130" y="152" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          Gurugram
        </text>
      </g>

      {/* Noida */}
      <g
      >
        <circle cx="280" cy="140" r="12" fill="#F59E0B" />
        <path d="M280 128 L280 116" stroke="#F59E0B" strokeWidth="3" />
        <circle cx="280" cy="140" r="5" fill="#FFF" />
        <text x="280" y="112" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          Noida
        </text>
      </g>

      {/* Faridabad */}
      <g
      >
        <circle cx="240" cy="220" r="12" fill="#3B82F6" />
        <path d="M240 208 L240 196" stroke="#3B82F6" strokeWidth="3" />
        <circle cx="240" cy="220" r="5" fill="#FFF" />
        <text x="240" y="192" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          Faridabad
        </text>
      </g>

      {/* Central building icon - India Gate style */}
      <g
      >
        <rect x="185" y="130" width="30" height="40" fill="#9CA3AF" />
        <path d="M185 130 Q 200 110 215 130" fill="#9CA3AF" />
        <rect x="195" y="150" width="10" height="20" fill="#6B7280" />
      </g>

      {/* Title banner */}
      <g
      >
        <rect x="100" y="255" width="200" height="30" rx="6" fill="#1F2937" />
        <text x="200" y="275" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="600">
          Delhi NCR Coaching Guide
        </text>
      </g>

      {/* Pulsing connection lines */}
      <circle
        cx="200"
        cy="160"
        r="60"
        stroke="#22C55E"
        strokeWidth="1"
        fill="none"
      />
    </Wrapper>
  )
}
