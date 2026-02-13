'use client'

import type { IllustrationProps } from './shared'

export function TwoYearProgramIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <defs>
        <linearGradient id="twoYearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EEF2FF" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#twoYearGradient)" />

      {/* Timeline line */}
      <path
        d="M50 150 L350 150"
        stroke="#9CA3AF"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Year 1 - Class 11 */}
      <g
      >
        <circle cx="100" cy="150" r="25" fill="#8B5CF6" />
        <text x="100" y="145" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="600">
          YEAR
        </text>
        <text x="100" y="158" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="700">
          1
        </text>

        {/* Year 1 content box */}
        <rect
          x="50"
          y="55"
          width="100"
          height="70"
          rx="6"
          fill="#F3E8FF"
          stroke="#8B5CF6"
          strokeWidth="2"
        />
        <text x="100" y="75" textAnchor="middle" fill="#6D28D9" fontSize="10" fontWeight="700">
          CLASS 11
        </text>
        <text x="100" y="90" textAnchor="middle" fill="#7C3AED" fontSize="8">
          Foundation Building
        </text>
        <text x="100" y="105" textAnchor="middle" fill="#7C3AED" fontSize="8">
          60% NEET Syllabus
        </text>
        <text x="100" y="118" textAnchor="middle" fill="#7C3AED" fontSize="8">
          Concept Clarity
        </text>

        {/* Arrow down */}
        <path d="M100 125 L100 125" stroke="#8B5CF6" strokeWidth="2" />
      </g>

      {/* Midpoint - Revision */}
      <g
      >
        <circle cx="200" cy="150" r="18" fill="#F59E0B" />
        <text x="200" y="154" textAnchor="middle" fill="#FFF" fontSize="8" fontWeight="600">
          MID
        </text>

        <rect
          x="165"
          y="180"
          width="70"
          height="40"
          rx="4"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <text x="200" y="198" textAnchor="middle" fill="#B45309" fontSize="8" fontWeight="600">
          Summer
        </text>
        <text x="200" y="212" textAnchor="middle" fill="#B45309" fontSize="7">
          Revision Camp
        </text>
      </g>

      {/* Year 2 - Class 12 */}
      <g
      >
        <circle cx="300" cy="150" r="25" fill="#22C55E" />
        <text x="300" y="145" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="600">
          YEAR
        </text>
        <text x="300" y="158" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="700">
          2
        </text>

        {/* Year 2 content box */}
        <rect
          x="250"
          y="55"
          width="100"
          height="70"
          rx="6"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <text x="300" y="75" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="700">
          CLASS 12
        </text>
        <text x="300" y="90" textAnchor="middle" fill="#15803D" fontSize="8">
          Advanced Topics
        </text>
        <text x="300" y="105" textAnchor="middle" fill="#15803D" fontSize="8">
          40% NEET Syllabus
        </text>
        <text x="300" y="118" textAnchor="middle" fill="#15803D" fontSize="8">
          Mock Tests
        </text>
      </g>

      {/* NEET Exam endpoint */}
      <g
      >
        <circle cx="350" cy="150" r="15" fill="#EF4444" />
        <text x="350" y="154" textAnchor="middle" fill="#FFF" fontSize="7" fontWeight="700">
          NEET
        </text>

        {/* Trophy */}
        <g
        >
          <rect x="338" y="170" width="24" height="30" rx="4" fill="#FCD34D" />
          <circle cx="350" cy="180" r="8" fill="#F59E0B" />
          <rect x="345" y="200" width="10" height="8" fill="#F59E0B" />
        </g>
      </g>

      {/* Progress arrow */}
      <path
        d="M75 150 L325 150"
        stroke="#22C55E"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Title */}
      <g
      >
        <rect x="100" y="250" width="200" height="35" rx="6" fill="#1F2937" />
        <text x="200" y="272" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="600">
          2-Year NEET Program
        </text>
      </g>

      {/* Benefits bubbles */}
      <g
      >
        <circle cx="30" cy="80" r="25" fill="#DBEAFE" />
        <text x="30" y="77" textAnchor="middle" fill="#1D4ED8" fontSize="7" fontWeight="600">
          No
        </text>
        <text x="30" y="87" textAnchor="middle" fill="#1D4ED8" fontSize="7" fontWeight="600">
          Rush
        </text>

        <circle cx="370" cy="80" r="25" fill="#DCFCE7" />
        <text x="370" y="77" textAnchor="middle" fill="#166534" fontSize="7" fontWeight="600">
          Deep
        </text>
        <text x="370" y="87" textAnchor="middle" fill="#166534" fontSize="7" fontWeight="600">
          Learning
        </text>
      </g>
    </svg>
  )
}
