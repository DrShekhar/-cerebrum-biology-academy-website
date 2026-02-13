'use client'

import type { IllustrationProps } from './shared'

export function Class11FoundationIllustration({
  className = '',
  animate = true,
}: IllustrationProps) {
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
        Class 11 NEET Foundation - Build Strong Base
      </text>

      {/* Building blocks pyramid */}
      <motion.g
      >
        <rect
          x="145"
          y="60"
          width="110"
          height="35"
          rx="4"
          fill="#22C55E"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="200" y="82" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          NEET SUCCESS
        </text>
      </motion.g>

      <motion.g
      >
        <rect
          x="115"
          y="100"
          width="80"
          height="35"
          rx="4"
          fill="#4ADE80"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="155" y="122" fontSize="7" fill="#166534" textAnchor="middle" fontWeight="bold">
          Class 12
        </text>
        <rect
          x="205"
          y="100"
          width="80"
          height="35"
          rx="4"
          fill="#4ADE80"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="245" y="122" fontSize="7" fill="#166534" textAnchor="middle" fontWeight="bold">
          Practice
        </text>
      </motion.g>

      <motion.g
      >
        <rect
          x="85"
          y="140"
          width="75"
          height="35"
          rx="4"
          fill="#86EFAC"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="122" y="162" fontSize="6" fill="#166534" textAnchor="middle" fontWeight="bold">
          Cell Biology
        </text>
        <rect
          x="165"
          y="140"
          width="70"
          height="35"
          rx="4"
          fill="#86EFAC"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="200" y="162" fontSize="6" fill="#166534" textAnchor="middle" fontWeight="bold">
          Diversity
        </text>
        <rect
          x="240"
          y="140"
          width="75"
          height="35"
          rx="4"
          fill="#86EFAC"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="277" y="162" fontSize="6" fill="#166534" textAnchor="middle" fontWeight="bold">
          Plant Phys.
        </text>
      </motion.g>

      <motion.g
      >
        <rect
          x="55"
          y="180"
          width="290"
          height="35"
          rx="4"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <text x="200" y="202" fontSize="9" fill="#166534" textAnchor="middle" fontWeight="bold">
          CLASS 11 FOUNDATION - 60% NEET Weightage
        </text>
      </motion.g>

      {/* Key stats */}
      <rect
        x="30"
        y="225"
        width="340"
        height="55"
        rx="10"
        fill="#FFFFFF"
        stroke="#22C55E"
        strokeWidth="2"
      />

      <motion.g
      >
        <circle cx="80" cy="252" r="18" fill="#22C55E" />
        <text x="80" y="249" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          60%
        </text>
        <text x="80" y="260" fontSize="5" fill="#FFFFFF" textAnchor="middle">
          Weightage
        </text>
      </motion.g>

      <motion.g
      >
        <circle cx="155" cy="252" r="18" fill="#3B82F6" />
        <text x="155" y="249" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          16
        </text>
        <text x="155" y="260" fontSize="5" fill="#FFFFFF" textAnchor="middle">
          Chapters
        </text>
      </motion.g>

      <motion.g
      >
        <circle cx="230" cy="252" r="18" fill="#F59E0B" />
        <text x="230" y="249" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          54
        </text>
        <text x="230" y="260" fontSize="5" fill="#FFFFFF" textAnchor="middle">
          Questions
        </text>
      </motion.g>

      <text x="310" y="245" fontSize="7" fill="#374151" textAnchor="middle">
        Start early,
      </text>
      <text x="310" y="260" fontSize="7" fill="#166534" textAnchor="middle" fontWeight="bold">
        Win big!
      </text>
    </Wrapper>
  )
}
