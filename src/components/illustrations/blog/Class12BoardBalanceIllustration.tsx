'use client'

import type { IllustrationProps } from './shared'

export function Class12BoardBalanceIllustration({
  className = '',
  animate = true,
}: IllustrationProps) {
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
      {/* Background */}
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FEF3C7" />

      {/* Title */}
      <text x="200" y="35" fontSize="12" fill="#B45309" textAnchor="middle" fontWeight="bold">
        Class 12: Balance Board Exams + NEET 2025
      </text>

      {/* Balance scale */}
      <line x1="200" y1="70" x2="200" y2="120" stroke="#92400E" strokeWidth="4" />
      <g
        style={{ transformOrigin: '200px 120px' }}
      >
        <line x1="100" y1="120" x2="300" y2="120" stroke="#92400E" strokeWidth="4" />

        {/* Board exam side */}
        <rect x="70" y="130" width="80" height="60" rx="8" fill="#3B82F6" />
        <text x="110" y="155" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Board
        </text>
        <text x="110" y="170" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Exams
        </text>
        <text x="110" y="185" fontSize="7" fill="#DBEAFE" textAnchor="middle">
          March 2025
        </text>

        {/* NEET side */}
        <rect x="250" y="130" width="80" height="60" rx="8" fill="#22C55E" />
        <text x="290" y="155" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          NEET
        </text>
        <text x="290" y="170" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          2025
        </text>
        <text x="290" y="185" fontSize="7" fill="#DCFCE7" textAnchor="middle">
          May 2025
        </text>
      </g>

      {/* Calendar timeline */}
      <rect
        x="30"
        y="200"
        width="340"
        height="75"
        rx="10"
        fill="#FFFFFF"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      <text x="200" y="220" fontSize="9" fill="#B45309" textAnchor="middle" fontWeight="bold">
        Smart Schedule
      </text>

      {/* Timeline dots */}
      <line x1="60" y1="250" x2="340" y2="250" stroke="#D1D5DB" strokeWidth="2" />

      <g
      >
        <circle cx="80" cy="250" r="8" fill="#3B82F6" />
        <text x="80" y="242" fontSize="6" fill="#1D4ED8" textAnchor="middle">
          Aug
        </text>
        <text x="80" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Boards+NEET
        </text>
      </g>

      <g
      >
        <circle cx="140" cy="250" r="8" fill="#8B5CF6" />
        <text x="140" y="242" fontSize="6" fill="#7C3AED" textAnchor="middle">
          Dec
        </text>
        <text x="140" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Board Focus
        </text>
      </g>

      <g
      >
        <circle cx="200" cy="250" r="8" fill="#EC4899" />
        <text x="200" y="242" fontSize="6" fill="#DB2777" textAnchor="middle">
          Mar
        </text>
        <text x="200" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Boards Done
        </text>
      </g>

      <g
      >
        <circle cx="260" cy="250" r="8" fill="#F59E0B" />
        <text x="260" y="242" fontSize="6" fill="#B45309" textAnchor="middle">
          Apr
        </text>
        <text x="260" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          NEET Intensive
        </text>
      </g>

      <g
      >
        <circle cx="320" cy="250" r="10" fill="#22C55E" />
        <text x="320" y="242" fontSize="6" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          May
        </text>
        <text x="320" y="268" fontSize="5" fill="#166534" textAnchor="middle" fontWeight="bold">
          NEET Day!
        </text>
      </g>
    </svg>
  )
}
