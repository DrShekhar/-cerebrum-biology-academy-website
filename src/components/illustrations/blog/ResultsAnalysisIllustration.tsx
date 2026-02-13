'use client'

import type { IllustrationProps } from './shared'

export function ResultsAnalysisIllustration({ className = '', animate = true }: IllustrationProps) {
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
      {/* Background */}
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#F0FDF4" />

      {/* Title */}
      <text x="200" y="35" fontSize="12" fill="#166534" textAnchor="middle" fontWeight="bold">
        NEET 2024 Results Analysis & Trends 2025
      </text>

      {/* Bar chart */}
      <rect
        x="30"
        y="55"
        width="180"
        height="130"
        rx="8"
        fill="#FFFFFF"
        stroke="#22C55E"
        strokeWidth="2"
      />
      <text x="120" y="75" fontSize="8" fill="#166534" textAnchor="middle" fontWeight="bold">
        Score Distribution
      </text>

      {/* Bars */}
      <motion.rect
        x="50"
        y="130"
        width="25"
        height="40"
        rx="2"
        fill="#EF4444"
      />
      <text x="62" y="180" fontSize="5" fill="#6B7280" textAnchor="middle">
        0-200
      </text>

      <motion.rect
        x="85"
        y="110"
        width="25"
        height="60"
        rx="2"
        fill="#F59E0B"
      />
      <text x="97" y="180" fontSize="5" fill="#6B7280" textAnchor="middle">
        200-400
      </text>

      <motion.rect
        x="120"
        y="100"
        width="25"
        height="70"
        rx="2"
        fill="#3B82F6"
      />
      <text x="132" y="180" fontSize="5" fill="#6B7280" textAnchor="middle">
        400-600
      </text>

      <motion.rect
        x="155"
        y="120"
        width="25"
        height="50"
        rx="2"
        fill="#22C55E"
      />
      <text x="167" y="180" fontSize="5" fill="#6B7280" textAnchor="middle">
        600+
      </text>

      {/* Key stats */}
      <rect
        x="230"
        y="55"
        width="150"
        height="130"
        rx="8"
        fill="#FFFFFF"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      <text x="305" y="75" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
        Key Statistics
      </text>

      <motion.g
      >
        <rect x="245" y="85" width="120" height="22" rx="4" fill="#DCFCE7" />
        <text x="305" y="100" fontSize="7" fill="#166534" textAnchor="middle">
          24 Lakh+ Appeared
        </text>
      </motion.g>

      <motion.g
      >
        <rect x="245" y="112" width="120" height="22" rx="4" fill="#DBEAFE" />
        <text x="305" y="127" fontSize="7" fill="#1D4ED8" textAnchor="middle">
          720/720 Top Score
        </text>
      </motion.g>

      <motion.g
      >
        <rect x="245" y="139" width="120" height="22" rx="4" fill="#FEF3C7" />
        <text x="305" y="154" fontSize="7" fill="#B45309" textAnchor="middle">
          137 Cutoff General
        </text>
      </motion.g>

      <motion.g
      >
        <rect x="245" y="166" width="120" height="15" rx="4" fill="#FCE7F3" />
        <text x="305" y="177" fontSize="6" fill="#DB2777" textAnchor="middle">
          67% Success Rate
        </text>
      </motion.g>

      {/* Trends for 2025 */}
      <rect
        x="30"
        y="195"
        width="340"
        height="80"
        rx="10"
        fill="#FFFFFF"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      <text x="200" y="215" fontSize="9" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Trends for NEET 2025
      </text>

      <motion.g
      >
        <rect x="45" y="225" width="90" height="40" rx="6" fill="#DCFCE7" />
        <text x="90" y="243" fontSize="7" fill="#166534" textAnchor="middle" fontWeight="bold">
          Biology Focus
        </text>
        <text x="90" y="258" fontSize="6" fill="#6B7280" textAnchor="middle">
          More Assertion
        </text>
      </motion.g>

      <motion.g
      >
        <rect x="155" y="225" width="90" height="40" rx="6" fill="#DBEAFE" />
        <text x="200" y="243" fontSize="7" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          NCERT Based
        </text>
        <text x="200" y="258" fontSize="6" fill="#6B7280" textAnchor="middle">
          95% Questions
        </text>
      </motion.g>

      <motion.g
      >
        <rect x="265" y="225" width="90" height="40" rx="6" fill="#FEF3C7" />
        <text x="310" y="243" fontSize="7" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Competition
        </text>
        <text x="310" y="258" fontSize="6" fill="#6B7280" textAnchor="middle">
          25 Lakh Expected
        </text>
      </motion.g>
    </Wrapper>
  )
}
