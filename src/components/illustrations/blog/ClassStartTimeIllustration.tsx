'use client'

import type { IllustrationProps } from './shared'

export function ClassStartTimeIllustration({ className = '', animate = true }: IllustrationProps) {
    const wrapperProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
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
      {/* Background timeline */}
      <rect x="50" y="140" width="300" height="8" rx="4" fill="#E2E8F0" />

      {/* Class 9 marker */}
      <g
      >
        <circle cx="100" cy="144" r="25" fill="#8B5CF6" />
        <text x="100" y="140" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Class
        </text>
        <text x="100" y="152" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          9
        </text>
      </g>

      {/* Class 10 marker */}
      <g
      >
        <circle cx="200" cy="144" r="25" fill="#3B82F6" />
        <text x="200" y="140" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Class
        </text>
        <text x="200" y="152" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          10
        </text>
      </g>

      {/* Class 11 marker */}
      <g
      >
        <circle cx="300" cy="144" r="25" fill="#14B8A6" />
        <text x="300" y="140" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Class
        </text>
        <text x="300" y="152" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          11
        </text>
      </g>

      {/* Arrow */}
      <path
        d="M330 144 L360 144 L350 134 M360 144 L350 154"
        stroke="#14B8A6"
        strokeWidth="3"
        fill="none"
      />

      {/* Clock above timeline */}
      <g
        style={{ transformOrigin: '200px 60px' }}
      >
        <circle cx="200" cy="60" r="40" fill="#FEF3C7" stroke="#F97316" strokeWidth="3" />
        <line x1="200" y1="60" x2="200" y2="35" stroke="#1E293B" strokeWidth="3" />
        <line x1="200" y1="60" x2="220" y2="60" stroke="#1E293B" strokeWidth="2" />
        <circle cx="200" cy="60" r="4" fill="#F97316" />
      </g>

      {/* Clock numbers */}
      <text x="200" y="30" fontSize="8" fill="#1E293B" textAnchor="middle">
        12
      </text>
      <text x="235" y="63" fontSize="8" fill="#1E293B">
        3
      </text>
      <text x="200" y="95" fontSize="8" fill="#1E293B" textAnchor="middle">
        6
      </text>
      <text x="163" y="63" fontSize="8" fill="#1E293B">
        9
      </text>

      {/* Students at different stages */}
      {/* Student 1 - Class 9 */}
      <g transform="translate(80, 180)">
        <circle cx="20" cy="15" r="12" fill="#FBBF24" />
        <rect x="12" y="30" width="16" height="25" rx="4" fill="#8B5CF6" />
        <text x="20" y="75" fontSize="8" fill="#64748B" textAnchor="middle">
          Foundation
        </text>
      </g>

      {/* Student 2 - Class 10 */}
      <g transform="translate(180, 180)">
        <circle cx="20" cy="15" r="12" fill="#FBBF24" />
        <rect x="12" y="30" width="16" height="25" rx="4" fill="#3B82F6" />
        <text x="20" y="75" fontSize="8" fill="#64748B" textAnchor="middle">
          Build-up
        </text>
      </g>

      {/* Student 3 - Class 11 */}
      <g transform="translate(280, 180)">
        <circle cx="20" cy="15" r="12" fill="#FBBF24" />
        <rect x="12" y="30" width="16" height="25" rx="4" fill="#14B8A6" />
        <text x="20" y="75" fontSize="8" fill="#64748B" textAnchor="middle">
          Intensive
        </text>
      </g>

      {/* Recommendation badge */}
      <g
      >
        <rect x="70" y="100" width="80" height="20" rx="10" fill="#10B981" />
        <text x="110" y="114" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ⭐ IDEAL START
        </text>
      </g>

      {/* Decorative elements */}
      <circle
        cx="40"
        cy="60"
        r="10"
        fill="#8B5CF6"
        opacity="0.3"
      />
      <circle
        cx="360"
        cy="80"
        r="8"
        fill="#14B8A6"
        opacity="0.3"
      />
    </svg>
  )
}
