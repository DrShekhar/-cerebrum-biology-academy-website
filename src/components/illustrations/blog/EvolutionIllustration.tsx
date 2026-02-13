'use client'

import type { IllustrationProps } from './shared'

export function EvolutionIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FDF4FF" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#A855F7" textAnchor="middle" fontWeight="bold">
        Evolution - 8% Weightage
      </text>

      {/* Tree of Life */}
      <g
      >
        {/* Main trunk */}
        <rect x="95" y="220" width="10" height="60" fill="#8B4513" />

        {/* Branches */}
        <path d="M100 220 Q100 180 60 150" stroke="#8B4513" strokeWidth="4" fill="none" />
        <path d="M100 220 Q100 180 140 150" stroke="#8B4513" strokeWidth="4" fill="none" />
        <path d="M60 150 Q50 130 40 120" stroke="#8B4513" strokeWidth="3" fill="none" />
        <path d="M60 150 Q70 130 80 120" stroke="#8B4513" strokeWidth="3" fill="none" />
        <path d="M140 150 Q130 130 120 120" stroke="#8B4513" strokeWidth="3" fill="none" />
        <path d="M140 150 Q150 130 160 120" stroke="#8B4513" strokeWidth="3" fill="none" />

        {/* Leaves/endpoints */}
        <circle cx="40" cy="115" r="12" fill="#4ADE80" />
        <circle cx="80" cy="115" r="12" fill="#22C55E" />
        <circle cx="120" cy="115" r="12" fill="#14B8A6" />
        <circle cx="160" cy="115" r="12" fill="#06B6D4" />

        {/* Labels */}
        <text x="40" y="100" fontSize="6" fill="#166534" textAnchor="middle">
          Fish
        </text>
        <text x="80" y="100" fontSize="6" fill="#166534" textAnchor="middle">
          Amphibia
        </text>
        <text x="120" y="100" fontSize="6" fill="#0F766E" textAnchor="middle">
          Reptiles
        </text>
        <text x="160" y="100" fontSize="6" fill="#0891B2" textAnchor="middle">
          Mammals
        </text>
      </g>
      <text x="100" y="290" fontSize="8" fill="#A855F7" textAnchor="middle" fontWeight="bold">
        Phylogenetic Tree
      </text>

      {/* Darwin portrait placeholder */}
      <g
      >
        <circle cx="280" cy="90" r="35" fill="#E9D5FF" stroke="#A855F7" strokeWidth="2" />
        <circle cx="280" cy="80" r="15" fill="#FED7AA" />
        <ellipse cx="280" cy="105" rx="20" ry="15" fill="#1E293B" />
        <text x="280" y="135" fontSize="7" fill="#7C3AED" textAnchor="middle">
          Charles Darwin
        </text>
        <text x="280" y="145" fontSize="6" fill="#9CA3AF" textAnchor="middle">
          1859
        </text>
      </g>

      {/* Key concepts */}
      <rect
        x="210"
        y="160"
        width="170"
        height="120"
        rx="10"
        fill="#FFFFFF"
        stroke="#A855F7"
        strokeWidth="2"
      />
      <text x="295" y="180" fontSize="9" fill="#A855F7" textAnchor="middle" fontWeight="bold">
        Key Concepts
      </text>

      <g
      >
        <text x="295" y="200" fontSize="7" fill="#374151" textAnchor="middle">
          • Natural Selection
        </text>
        <text x="295" y="215" fontSize="7" fill="#374151" textAnchor="middle">
          • Homology & Analogy
        </text>
        <text x="295" y="230" fontSize="7" fill="#374151" textAnchor="middle">
          • Hardy-Weinberg Principle
        </text>
        <text x="295" y="245" fontSize="7" fill="#374151" textAnchor="middle">
          • Adaptive Radiation
        </text>
        <text x="295" y="260" fontSize="7" fill="#374151" textAnchor="middle">
          • Human Evolution
        </text>
      </g>

      {/* Human evolution silhouettes */}
      <g
      >
        <rect
          x="25"
          y="170"
          width="170"
          height="45"
          rx="8"
          fill="#FFFFFF"
          stroke="#C084FC"
          strokeWidth="1"
        />
        <text x="110" y="185" fontSize="7" fill="#A855F7" textAnchor="middle" fontWeight="bold">
          Human Evolution
        </text>

        {/* Simple human silhouettes */}
        <ellipse cx="45" cy="200" rx="6" ry="8" fill="#9CA3AF" />
        <ellipse cx="75" cy="198" rx="6" ry="9" fill="#6B7280" />
        <ellipse cx="105" cy="196" rx="6" ry="10" fill="#4B5563" />
        <ellipse cx="135" cy="194" rx="6" ry="11" fill="#374151" />
        <ellipse cx="165" cy="192" rx="6" ry="12" fill="#1F2937" />
      </g>

      {/* Questions badge */}
      <g
      >
        <circle cx="360" cy="260" r="18" fill="#A855F7" />
        <text x="360" y="257" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          6-8
        </text>
        <text x="360" y="268" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </g>
    </Wrapper>
  )
}
