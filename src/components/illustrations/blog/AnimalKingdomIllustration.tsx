'use client'

import type { IllustrationProps } from './shared'

export function AnimalKingdomIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FEF9C3" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#CA8A04" textAnchor="middle" fontWeight="bold">
        Animal Kingdom - 8% Weightage
      </text>

      {/* Invertebrates section */}
      <rect
        x="20"
        y="50"
        width="175"
        height="120"
        rx="10"
        fill="#FFFFFF"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      <text x="107" y="70" fontSize="10" fill="#B45309" textAnchor="middle" fontWeight="bold">
        Invertebrates
      </text>

      {/* Jellyfish */}
      <g
      >
        <ellipse cx="55" cy="100" rx="15" ry="10" fill="#E879F9" />
        <path d="M45 110 Q55 120 65 110" stroke="#D946EF" strokeWidth="2" fill="none" />
        <text x="55" y="135" fontSize="6" fill="#A21CAF" textAnchor="middle">
          Cnidaria
        </text>
      </g>

      {/* Earthworm */}
      <g
        style={{ transformOrigin: '107px 100px' }}
      >
        <path
          d="M85 100 Q100 95 115 100 Q130 105 115 100"
          stroke="#D97706"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <text x="107" y="125" fontSize="6" fill="#92400E" textAnchor="middle">
          Annelida
        </text>
      </g>

      {/* Insect */}
      <g
        style={{ transformOrigin: '160px 100px' }}
      >
        <ellipse cx="160" cy="100" rx="12" ry="8" fill="#84CC16" />
        <circle cx="148" cy="98" r="4" fill="#65A30D" />
        <line x1="155" y1="92" x2="150" y2="85" stroke="#84CC16" strokeWidth="1" />
        <line x1="165" y1="92" x2="170" y2="85" stroke="#84CC16" strokeWidth="1" />
        <text x="160" y="125" fontSize="6" fill="#4D7C0F" textAnchor="middle">
          Arthropoda
        </text>
      </g>

      {/* More invertebrate labels */}
      <text x="55" y="155" fontSize="5" fill="#6B7280" textAnchor="middle">
        Porifera, Platyhelminthes
      </text>
      <text x="145" y="155" fontSize="5" fill="#6B7280" textAnchor="middle">
        Mollusca, Echinodermata
      </text>

      {/* Vertebrates section */}
      <rect
        x="205"
        y="50"
        width="175"
        height="120"
        rx="10"
        fill="#FFFFFF"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      <text x="292" y="70" fontSize="10" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
        Vertebrates
      </text>

      {/* Fish */}
      <g
      >
        <ellipse cx="235" cy="95" rx="15" ry="8" fill="#60A5FA" />
        <polygon points="250,95 260,88 260,102" fill="#3B82F6" />
        <circle cx="228" cy="93" r="2" fill="#1E293B" />
        <text x="235" y="115" fontSize="5" fill="#1D4ED8" textAnchor="middle">
          Pisces
        </text>
      </g>

      {/* Frog */}
      <g
      >
        <ellipse cx="275" cy="95" rx="12" ry="10" fill="#4ADE80" />
        <circle cx="270" cy="88" r="3" fill="#FFFFFF" stroke="#166534" strokeWidth="1" />
        <circle cx="280" cy="88" r="3" fill="#FFFFFF" stroke="#166534" strokeWidth="1" />
        <text x="275" y="115" fontSize="5" fill="#166534" textAnchor="middle">
          Amphibia
        </text>
      </g>

      {/* Bird */}
      <g
      >
        <ellipse cx="315" cy="95" rx="10" ry="8" fill="#F472B6" />
        <polygon points="325,95 335,95 325,90" fill="#EC4899" />
        <circle cx="312" cy="93" r="2" fill="#1E293B" />
        <text x="315" y="115" fontSize="5" fill="#DB2777" textAnchor="middle">
          Aves
        </text>
      </g>

      {/* Mammal */}
      <g
      >
        <ellipse cx="355" cy="95" rx="12" ry="10" fill="#FBBF24" />
        <circle cx="362" cy="90" r="5" fill="#F59E0B" />
        <text x="355" y="115" fontSize="5" fill="#B45309" textAnchor="middle">
          Mammalia
        </text>
      </g>

      <text x="292" y="155" fontSize="5" fill="#6B7280" textAnchor="middle">
        Reptilia (Snakes, Lizards)
      </text>

      {/* Classification tree hint */}
      <rect
        x="60"
        y="180"
        width="280"
        height="95"
        rx="10"
        fill="#FFFFFF"
        stroke="#CA8A04"
        strokeWidth="2"
      />
      <text x="200" y="200" fontSize="9" fill="#CA8A04" textAnchor="middle" fontWeight="bold">
        Classification Basis
      </text>
      <text x="200" y="218" fontSize="7" fill="#374151" textAnchor="middle">
        Body Symmetry • Coelom • Segmentation
      </text>
      <text x="200" y="233" fontSize="7" fill="#374151" textAnchor="middle">
        Notochord • Germ Layers • Embryo Development
      </text>
      <text x="200" y="255" fontSize="8" fill="#92400E" textAnchor="middle" fontWeight="bold">
        35+ Phyla to Study!
      </text>
      <text x="200" y="268" fontSize="6" fill="#6B7280" textAnchor="middle">
        Focus: Chordata (Vertebrates) - 5 Classes
      </text>

      {/* Questions badge */}
      <g
      >
        <circle cx="360" cy="200" r="18" fill="#F59E0B" />
        <text x="360" y="197" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          6-8
        </text>
        <text x="360" y="208" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </g>
    </svg>
  )
}
