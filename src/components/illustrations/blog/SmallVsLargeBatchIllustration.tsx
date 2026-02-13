'use client'

import type { IllustrationProps } from './shared'

export function SmallVsLargeBatchIllustration({
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
      <rect width="400" height="300" fill="#F8FAFC" />

      {/* Left side - Small Batch */}
      <g
      >
        <rect
          x="20"
          y="40"
          width="160"
          height="200"
          rx="8"
          fill="#ECFDF5"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <text x="100" y="65" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="700">
          SMALL BATCH
        </text>
        <text x="100" y="80" textAnchor="middle" fill="#166534" fontSize="10">
          (15-20 Students)
        </text>

        {/* Teacher */}
        <circle cx="100" cy="110" r="15" fill="#22C55E" />
        <text x="100" y="115" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
          T
        </text>

        {/* Small group of students - 3x3 */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`small-${row}-${col}`}
              cx={60 + col * 40}
              cy={150 + row * 30}
              r="10"
              fill="#86EFAC"
            />
          ))
        )}

        {/* Personal attention arrows */}
        <g
        >
          <path
            d="M85 120 L65 140"
            stroke="#166534"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            markerEnd="url(#arrowGreen)"
          />
          <path d="M100 125 L100 140" stroke="#166534" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M115 120 L135 140" stroke="#166534" strokeWidth="1.5" strokeDasharray="3 2" />
        </g>
      </g>

      {/* Right side - Large Batch */}
      <g
      >
        <rect
          x="220"
          y="40"
          width="160"
          height="200"
          rx="8"
          fill="#FEF2F2"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text x="300" y="65" textAnchor="middle" fill="#991B1B" fontSize="12" fontWeight="700">
          LARGE BATCH
        </text>
        <text x="300" y="80" textAnchor="middle" fill="#991B1B" fontSize="10">
          (100+ Students)
        </text>

        {/* Teacher */}
        <circle cx="300" cy="110" r="15" fill="#EF4444" />
        <text x="300" y="115" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
          T
        </text>

        {/* Large group of students - crowded */}
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <circle
              key={`large-${row}-${col}`}
              cx={240 + col * 24}
              cy={140 + row * 22}
              r="8"
              fill="#FECACA"
            />
          ))
        )}
      </g>

      {/* VS divider */}
      <g
      >
        <circle cx="200" cy="140" r="20" fill="#1F2937" />
        <text x="200" y="145" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="700">
          VS
        </text>
      </g>

      {/* Comparison checkmarks */}
      <g
      >
        <rect x="20" y="250" width="160" height="40" rx="4" fill="#22C55E" />
        <text x="100" y="275" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
          Personal Attention
        </text>

        <rect x="220" y="250" width="160" height="40" rx="4" fill="#9CA3AF" />
        <text x="300" y="275" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
          One-size-fits-all
        </text>
      </g>

      {/* Title */}
      <text
        x="200"
        y="25"
        textAnchor="middle"
        fill="#1F2937"
        fontSize="14"
        fontWeight="700"
      >
        Batch Size Comparison
      </text>
    </svg>
  )
}
