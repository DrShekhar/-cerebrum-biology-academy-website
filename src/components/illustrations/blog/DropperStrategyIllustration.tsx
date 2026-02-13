'use client'

import type { IllustrationProps } from './shared'

export function DropperStrategyIllustration({ className = '', animate = true }: IllustrationProps) {
    const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
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
      {/* Background gradient */}
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FDF2F8" />

      {/* Title */}
      <text x="200" y="35" fontSize="12" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        NEET Dropper: Score 680+ in Second Attempt
      </text>

      {/* Before vs After comparison */}
      {/* First attempt - faded */}
      <g
      >
        <rect
          x="30"
          y="60"
          width="150"
          height="100"
          rx="10"
          fill="#FEE2E2"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text x="105" y="85" fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="bold">
          1st Attempt
        </text>
        <circle cx="105" cy="120" r="30" fill="#FECACA" />
        <text x="105" y="125" fontSize="12" fill="#DC2626" textAnchor="middle" fontWeight="bold">
          500
        </text>
        <text x="105" y="155" fontSize="7" fill="#6B7280" textAnchor="middle">
          Marks Scored
        </text>
      </g>

      {/* Arrow */}
      <g
      >
        <line x1="190" y1="110" x2="220" y2="110" stroke="#8B5CF6" strokeWidth="3" />
        <polygon points="220,110 210,105 210,115" fill="#8B5CF6" />
        <text x="205" y="100" fontSize="6" fill="#8B5CF6" textAnchor="middle">
          1 Year
        </text>
      </g>

      {/* Second attempt - bright */}
      <g
      >
        <rect
          x="230"
          y="60"
          width="150"
          height="100"
          rx="10"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="3"
        />
        <text x="305" y="85" fontSize="9" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          2nd Attempt
        </text>
        <circle cx="305" cy="120" r="30" fill="#86EFAC" />
        <text x="305" y="125" fontSize="12" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          680+
        </text>
        <text x="305" y="155" fontSize="7" fill="#166534" textAnchor="middle">
          Target Score
        </text>
      </g>

      {/* Key changes */}
      <rect
        x="30"
        y="175"
        width="340"
        height="100"
        rx="12"
        fill="#FFFFFF"
        stroke="#EC4899"
        strokeWidth="2"
      />
      <text x="200" y="195" fontSize="10" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        Dropper Strategy Keys
      </text>

      <g
      >
        <rect x="45" y="205" width="100" height="55" rx="6" fill="#DBEAFE" />
        <text x="95" y="223" fontSize="7" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Identify Weak
        </text>
        <text x="95" y="235" fontSize="7" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Areas
        </text>
        <text x="95" y="250" fontSize="6" fill="#6B7280" textAnchor="middle">
          Analyze last year
        </text>
      </g>

      <g
      >
        <rect x="155" y="205" width="100" height="55" rx="6" fill="#FEF3C7" />
        <text x="205" y="223" fontSize="7" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Dedicated
        </text>
        <text x="205" y="235" fontSize="7" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Coaching
        </text>
        <text x="205" y="250" fontSize="6" fill="#6B7280" textAnchor="middle">
          12 hrs/day study
        </text>
      </g>

      <g
      >
        <rect x="265" y="205" width="100" height="55" rx="6" fill="#DCFCE7" />
        <text x="315" y="223" fontSize="7" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          Regular
        </text>
        <text x="315" y="235" fontSize="7" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          Mock Tests
        </text>
        <text x="315" y="250" fontSize="6" fill="#6B7280" textAnchor="middle">
          50+ full tests
        </text>
      </g>
    </svg>
  )
}
