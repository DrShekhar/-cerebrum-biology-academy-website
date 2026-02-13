'use client'

import type { IllustrationProps } from './shared'

export function FreeResourcesIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#EDE9FE" />

      {/* Title */}
      <text x="200" y="35" fontSize="12" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Free NEET Preparation Resources 2025
      </text>

      {/* FREE badge */}
      <g
        style={{ transformOrigin: '55px 65px' }}
      >
        <circle cx="55" cy="65" r="25" fill="#22C55E" />
        <text x="55" y="62" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          FREE
        </text>
        <text x="55" y="75" fontSize="7" fill="#DCFCE7" textAnchor="middle">
          100%
        </text>
      </g>

      {/* Resource cards */}
      <g
      >
        <rect
          x="30"
          y="100"
          width="100"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <rect x="45" y="115" width="70" height="25" rx="4" fill="#DBEAFE" />
        <text x="80" y="132" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          NCERT
        </text>
        <text x="80" y="155" fontSize="6" fill="#374151" textAnchor="middle">
          Official Textbooks
        </text>
        <text x="80" y="170" fontSize="6" fill="#22C55E" textAnchor="middle" fontWeight="bold">
          ncert.nic.in
        </text>
      </g>

      <g
      >
        <rect
          x="150"
          y="100"
          width="100"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#EC4899"
          strokeWidth="2"
        />
        <rect x="165" y="115" width="70" height="25" rx="4" fill="#FCE7F3" />
        <text x="200" y="132" fontSize="8" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          YouTube
        </text>
        <text x="200" y="155" fontSize="6" fill="#374151" textAnchor="middle">
          Video Lectures
        </text>
        <text x="200" y="170" fontSize="6" fill="#22C55E" textAnchor="middle" fontWeight="bold">
          1000+ Hours
        </text>
      </g>

      <g
      >
        <rect
          x="270"
          y="100"
          width="100"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <rect x="285" y="115" width="70" height="25" rx="4" fill="#FEF3C7" />
        <text x="320" y="132" fontSize="8" fill="#B45309" textAnchor="middle" fontWeight="bold">
          PYQs
        </text>
        <text x="320" y="155" fontSize="6" fill="#374151" textAnchor="middle">
          Previous Year
        </text>
        <text x="320" y="170" fontSize="6" fill="#22C55E" textAnchor="middle" fontWeight="bold">
          10 Years Free
        </text>
      </g>

      {/* More resources */}
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
        More Free Resources
      </text>

      <g
      >
        <circle cx="70" cy="245" r="15" fill="#DCFCE7" />
        <text x="70" y="248" fontSize="7" fill="#166534" textAnchor="middle">
          NTA
        </text>
        <text x="70" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Mock Tests
        </text>
      </g>

      <g
      >
        <circle cx="140" cy="245" r="15" fill="#DBEAFE" />
        <text x="140" y="248" fontSize="6" fill="#1D4ED8" textAnchor="middle">
          Apps
        </text>
        <text x="140" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Quizzes
        </text>
      </g>

      <g
      >
        <circle cx="210" cy="245" r="15" fill="#FEF3C7" />
        <text x="210" y="248" fontSize="6" fill="#B45309" textAnchor="middle">
          Notes
        </text>
        <text x="210" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Toppers
        </text>
      </g>

      <g
      >
        <circle cx="280" cy="245" r="15" fill="#FCE7F3" />
        <text x="280" y="248" fontSize="6" fill="#DB2777" textAnchor="middle">
          Podcasts
        </text>
        <text x="280" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Biology
        </text>
      </g>

      <g
      >
        <circle cx="340" cy="245" r="15" fill="#E9D5FF" />
        <text x="340" y="248" fontSize="6" fill="#7C3AED" textAnchor="middle">
          Forums
        </text>
        <text x="340" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Q&A
        </text>
      </g>
    </svg>
  )
}
