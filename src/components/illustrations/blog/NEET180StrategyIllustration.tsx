'use client'

import type { IllustrationProps } from './shared'

export function NEET180StrategyIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 520 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Professional gradients */}
        <linearGradient id="stratBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="50%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#BFDBFE" />
        </linearGradient>
        <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="successGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <filter id="stratShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.15" />
        </filter>
        <filter id="stratCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
        </filter>
        <filter id="stratGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="targetGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="520" height="400" rx="24" fill="url(#stratBgGrad)" />

      {/* Decorative elements */}
      <circle cx="450" cy="350" r="120" fill="#3B82F6" fillOpacity="0.06" />
      <circle cx="80" cy="60" r="80" fill="#22C55E" fillOpacity="0.08" />

      {/* Title */}
      <text
        x="260"
        y="38"
        fontSize="22"
        fill="#1D4ED8"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        Score 320+/360 in NEET Biology
      </text>
      <text
        x="260"
        y="58"
        fontSize="11"
        fill="#3B82F6"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        Complete 6-Month Strategy for Top Ranks
      </text>

      {/* Target circle - Professional with rings */}
      <g filter="url(#targetGlow)">
        <motion.g
        >
          <circle cx="120" cy="190" r="75" fill="white" stroke="#DC2626" strokeWidth="10" />
          <circle cx="120" cy="190" r="60" fill="white" stroke="#F97316" strokeWidth="8" />
          <circle cx="120" cy="190" r="45" fill="white" stroke="#FBBF24" strokeWidth="6" />
          <circle cx="120" cy="190" r="30" fill="white" stroke="#84CC16" strokeWidth="4" />
          <circle cx="120" cy="190" r="16" fill="url(#successGrad)" />
          {/* Center dot */}
          <circle cx="120" cy="190" r="5" fill="white" />
        </motion.g>
      </g>

      {/* Arrow hitting target */}
      <motion.g
      >
        <line
          x1="20"
          y1="190"
          x2="100"
          y2="190"
          stroke="url(#arrowGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <polygon points="104,190 92,183 92,197" fill="#1E293B" />
        {/* Arrow fletching */}
        <path d="M25 185 L15 180 L15 200 L25 195" fill="#64748B" />
      </motion.g>

      {/* Score Badge - Glass morphism */}
      <motion.g
        filter="url(#stratShadow)"
      >
        <rect x="45" y="290" width="150" height="65" rx="16" fill="url(#successGrad)" />
        <rect x="45" y="290" width="150" height="65" rx="16" fill="white" fillOpacity="0.1" />
        <text
          x="120"
          y="318"
          fontSize="22"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          320+/360
        </text>
        <text
          x="120"
          y="342"
          fontSize="11"
          fill="#FFFFFF"
          textAnchor="middle"
          fillOpacity="0.9"
          fontFamily="system-ui, sans-serif"
        >
          🎯 Target Score
        </text>
      </motion.g>

      {/* Strategy Card */}
      <g filter="url(#stratCardShadow)">
        <rect x="230" y="80" width="275" height="295" rx="20" fill="white" fillOpacity="0.95" />
        <rect
          x="230"
          y="80"
          width="275"
          height="295"
          rx="20"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
        />

        <text
          x="367"
          y="112"
          fontSize="14"
          fill="#1D4ED8"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          📚 6-Month Strategy
        </text>
        <line x1="250" y1="125" x2="485" y2="125" stroke="#E2E8F0" strokeWidth="2" />

        {/* Phase 1 */}
        <motion.g
        >
          <rect x="245" y="135" width="245" height="45" rx="10" fill="#DBEAFE" />
          <circle cx="265" cy="157" r="12" fill="#3B82F6" />
          <text x="265" y="162" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            1
          </text>
          <text
            x="285"
            y="152"
            fontSize="11"
            fill="#1D4ED8"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Months 1-2: NCERT Foundation
          </text>
          <text x="285" y="168" fontSize="9" fill="#64748B" fontFamily="system-ui, sans-serif">
            Complete Class 11 & 12 NCERT thoroughly
          </text>
        </motion.g>

        {/* Phase 2 */}
        <motion.g
        >
          <rect x="245" y="185" width="245" height="45" rx="10" fill="#FEF3C7" />
          <circle cx="265" cy="207" r="12" fill="#F59E0B" />
          <text x="265" y="212" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            2
          </text>
          <text
            x="285"
            y="202"
            fontSize="11"
            fill="#B45309"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Months 3-4: Practice MCQs
          </text>
          <text x="285" y="218" fontSize="9" fill="#64748B" fontFamily="system-ui, sans-serif">
            5000+ topic-wise questions daily
          </text>
        </motion.g>

        {/* Phase 3 */}
        <motion.g
        >
          <rect x="245" y="235" width="245" height="45" rx="10" fill="#DCFCE7" />
          <circle cx="265" cy="257" r="12" fill="#22C55E" />
          <text x="265" y="262" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            3
          </text>
          <text
            x="285"
            y="252"
            fontSize="11"
            fill="#16A34A"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Months 5-6: Mock Tests
          </text>
          <text x="285" y="268" fontSize="9" fill="#64748B" fontFamily="system-ui, sans-serif">
            Full syllabus tests every week
          </text>
        </motion.g>

        {/* Phase 4 */}
        <motion.g
        >
          <rect x="245" y="285" width="245" height="45" rx="10" fill="#FCE7F3" />
          <circle cx="265" cy="307" r="12" fill="#EC4899" />
          <text x="265" y="312" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            4
          </text>
          <text
            x="285"
            y="302"
            fontSize="11"
            fill="#DB2777"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Final Week: Revision
          </text>
          <text x="285" y="318" fontSize="9" fill="#64748B" fontFamily="system-ui, sans-serif">
            Focus only on weak areas
          </text>
        </motion.g>

        {/* Progress bar */}
        <rect x="245" y="340" width="245" height="8" rx="4" fill="#E2E8F0" />
        <motion.rect
          x="245"
          y="340"
          width="0"
          height="8"
          rx="4"
          fill="url(#successGrad)"
        />
        <text
          x="367"
          y="362"
          fontSize="9"
          fill="#64748B"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Progress to NEET Success
        </text>
      </g>

      {/* Success checkmark */}
      <motion.g
        filter="url(#stratGlow)"
      >
        <circle cx="480" cy="50" r="25" fill="url(#successGrad)" />
        <circle
          cx="480"
          cy="50"
          r="20"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <path
          d="M468 50 L476 58 L492 42"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Stats badges */}
      <g filter="url(#stratCardShadow)">
        <rect x="35" y="80" width="80" height="65" rx="12" fill="white" fillOpacity="0.95" />
        <text
          x="75"
          y="108"
          fontSize="20"
          fill="#3B82F6"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          98%
        </text>
        <text
          x="75"
          y="130"
          fontSize="8"
          fill="#64748B"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Success Rate
        </text>
      </g>

      <g filter="url(#stratCardShadow)">
        <rect x="125" y="80" width="90" height="65" rx="12" fill="white" fillOpacity="0.95" />
        <text
          x="170"
          y="108"
          fontSize="20"
          fill="#22C55E"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          67+
        </text>
        <text
          x="170"
          y="130"
          fontSize="8"
          fill="#64748B"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Students Placed
        </text>
      </g>
    </Wrapper>
  )
}
