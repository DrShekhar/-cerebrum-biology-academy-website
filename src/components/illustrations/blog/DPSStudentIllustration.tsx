'use client'

import type { IllustrationProps } from './shared'

export function DPSStudentIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
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
      {/* Background */}
      <rect x="20" y="20" width="360" height="260" rx="20" fill="#F0FDFA" opacity="0.5" />

      {/* DPS Logo/Badge */}
      <motion.g
        style={{ transformOrigin: '100px 80px' }}
      >
        <circle cx="100" cy="80" r="45" fill="#1E40AF" />
        <circle cx="100" cy="80" r="38" fill="#FFFFFF" />
        <circle cx="100" cy="80" r="32" fill="#1E40AF" />
        <text x="100" y="75" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          DPS
        </text>
        <text x="100" y="90" fontSize="7" fill="#FFFFFF" textAnchor="middle">
          Student
        </text>
      </motion.g>

      {/* Plus sign */}
      <motion.g
      >
        <text x="175" y="90" fontSize="40" fill="#14B8A6" fontWeight="bold">
          +
        </text>
      </motion.g>

      {/* NEET Badge */}
      <motion.g
        style={{ transformOrigin: '280px 80px' }}
      >
        <circle cx="280" cy="80" r="45" fill="#14B8A6" />
        <circle cx="280" cy="80" r="38" fill="#FFFFFF" />
        <circle cx="280" cy="80" r="32" fill="#14B8A6" />
        <text x="280" y="75" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          NEET
        </text>
        <text x="280" y="90" fontSize="7" fill="#FFFFFF" textAnchor="middle">
          2026
        </text>
      </motion.g>

      {/* Success arrow */}
      <motion.path
        d="M190 150 L190 200 L210 180"
        stroke="#10B981"
        strokeWidth="4"
        fill="none"
        strokeDasharray="20"
      />

      {/* Student with books */}
      <g transform="translate(120, 160)">
        <ellipse cx="70" cy="80" rx="35" ry="45" fill="#6366F1" />
        <circle cx="70" cy="35" r="28" fill="#FBBF24" />
        <circle cx="62" cy="30" r="3" fill="#1E293B" />
        <circle cx="78" cy="30" r="3" fill="#1E293B" />
        <path d="M65 42 Q70 48 75 42" stroke="#1E293B" strokeWidth="2" fill="none" />

        {/* School uniform detail */}
        <rect x="55" y="55" width="30" height="5" fill="#FFFFFF" />

        {/* Books in hand */}
        <motion.g
          style={{ transformOrigin: '120px 90px' }}
        >
          <rect x="110" y="70" width="40" height="8" rx="2" fill="#14B8A6" />
          <rect x="112" y="62" width="38" height="8" rx="2" fill="#3B82F6" />
          <rect x="114" y="54" width="36" height="8" rx="2" fill="#F97316" />
        </motion.g>
      </g>

      {/* Result badge */}
      <motion.g
      >
        <rect x="280" y="200" width="90" height="40" rx="8" fill="#10B981" />
        <text x="325" y="218" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          Success Rate
        </text>
        <text x="325" y="232" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          94%+
        </text>
      </motion.g>

      {/* Decorative stars */}
      <motion.text
        x="50"
        y="180"
        fontSize="20"
      >
        ⭐
      </motion.text>
      <motion.text
        x="350"
        y="150"
        fontSize="16"
      >
        ⭐
      </motion.text>
    </Wrapper>
  )
}
