'use client'

import type { IllustrationProps } from './shared'

export function CoachingCenterIllustration({ className = '', animate = true }: IllustrationProps) {
    const wrapperProps = animate
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Grid background */}
      <rect x="20" y="20" width="360" height="260" rx="16" fill="#EDE9FE" opacity="0.3" />

      {/* Top 10 badge */}
      <g
      >
        <circle cx="200" cy="45" r="30" fill="#F97316" />
        <text x="200" y="42" fontSize="10" fill="#FFFFFF" textAnchor="middle">
          TOP
        </text>
        <text x="200" y="55" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          10
        </text>
      </g>

      {/* Building 1 - Gold (1st place) */}
      <g
      >
        <rect x="60" y="90" width="60" height="80" rx="6" fill="#F59E0B" />
        <rect x="70" y="100" width="15" height="15" rx="2" fill="#FEF3C7" />
        <rect x="95" y="100" width="15" height="15" rx="2" fill="#FEF3C7" />
        <rect x="70" y="125" width="15" height="15" rx="2" fill="#FEF3C7" />
        <rect x="95" y="125" width="15" height="15" rx="2" fill="#FEF3C7" />
        <rect x="80" y="150" width="20" height="20" rx="2" fill="#78350F" />
        <text x="90" y="85" fontSize="20" textAnchor="middle">
          🥇
        </text>
      </g>

      {/* Building 2 - Silver */}
      <g
      >
        <rect x="140" y="100" width="55" height="70" rx="6" fill="#9CA3AF" />
        <rect x="150" y="110" width="12" height="12" rx="2" fill="#F3F4F6" />
        <rect x="170" y="110" width="12" height="12" rx="2" fill="#F3F4F6" />
        <rect x="150" y="130" width="12" height="12" rx="2" fill="#F3F4F6" />
        <rect x="170" y="130" width="12" height="12" rx="2" fill="#F3F4F6" />
        <rect x="157" y="150" width="18" height="20" rx="2" fill="#4B5563" />
        <text x="167" y="95" fontSize="18" textAnchor="middle">
          🥈
        </text>
      </g>

      {/* Building 3 - Bronze */}
      <g
      >
        <rect x="215" y="105" width="50" height="65" rx="6" fill="#B45309" />
        <rect x="223" y="115" width="12" height="12" rx="2" fill="#FEF3C7" />
        <rect x="243" y="115" width="12" height="12" rx="2" fill="#FEF3C7" />
        <rect x="223" y="135" width="12" height="12" rx="2" fill="#FEF3C7" />
        <rect x="243" y="135" width="12" height="12" rx="2" fill="#FEF3C7" />
        <rect x="230" y="153" width="16" height="17" rx="2" fill="#78350F" />
        <text x="240" y="100" fontSize="16" textAnchor="middle">
          🥉
        </text>
      </g>

      {/* More buildings (4-10) smaller */}
      {[285, 310, 335].map((x, i) => (
        <rect
          key={i}
          x={x}
          y={120}
          width="20"
          height="50"
          rx="3"
          fill="#6366F1"
          opacity={0.7 - i * 0.15}
        />
      ))}

      {/* Cerebrum highlighted */}
      <g
      >
        <rect x="40" y="190" width="140" height="60" rx="8" fill="#14B8A6" />
        <text x="110" y="215" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          CEREBRUM
        </text>
        <text x="110" y="230" fontSize="8" fill="#D1FAE5" textAnchor="middle">
          Biology Academy
        </text>
        <text x="110" y="243" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          ⭐ 98% Success Rate
        </text>
      </g>

      {/* Location pin */}
      <g
      >
        <path
          d="M300 200 C300 185 285 180 285 195 C285 205 300 215 300 215 C300 215 315 205 315 195 C315 180 300 185 300 200"
          fill="#EF4444"
        />
        <circle cx="300" cy="195" r="5" fill="#FFFFFF" />
        <text x="300" y="240" fontSize="8" fill="#64748B" textAnchor="middle">
          Delhi NCR
        </text>
      </g>

      {/* Stars decoration */}
      <circle
        cx="360"
        cy="50"
        r="6"
        fill="#F97316"
        opacity="0.5"
      />
    </svg>
  )
}
