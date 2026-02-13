'use client'

import type { IllustrationProps } from './shared'

export function MicrobesIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <text x="200" y="35" fontSize="12" fill="#16A34A" textAnchor="middle" fontWeight="bold">
        Microbes in Human Welfare - 4% Weightage
      </text>

      {/* Bacteria */}
      <g
        style={{ transformOrigin: '70px 100px' }}
      >
        <ellipse cx="70" cy="100" rx="30" ry="18" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
        <line x1="40" y1="95" x2="25" y2="85" stroke="#3B82F6" strokeWidth="2" />
        <line x1="40" y1="105" x2="25" y2="115" stroke="#3B82F6" strokeWidth="2" />
        <line x1="100" y1="95" x2="115" y2="85" stroke="#3B82F6" strokeWidth="2" />
        <line x1="100" y1="105" x2="115" y2="115" stroke="#3B82F6" strokeWidth="2" />
        <text x="70" y="130" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Bacteria
        </text>
        <text x="70" y="142" fontSize="6" fill="#6B7280" textAnchor="middle">
          Lactobacillus
        </text>
      </g>

      {/* Yeast */}
      <g
      >
        <ellipse
          cx="170"
          cy="100"
          rx="25"
          ry="25"
          fill="#FDE68A"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <circle cx="165" cy="95" r="5" fill="#FEF3C7" />
        <ellipse cx="185" cy="85" rx="12" ry="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
        <text x="170" y="135" fontSize="8" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Yeast
        </text>
        <text x="170" y="147" fontSize="6" fill="#6B7280" textAnchor="middle">
          Saccharomyces
        </text>
      </g>

      {/* Virus */}
      <g
      >
        <polygon
          points="270,75 250,100 270,125 290,100"
          fill="#FCA5A5"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <circle cx="270" cy="100" r="12" fill="#FECACA" />
        <line x1="270" y1="75" x2="270" y2="60" stroke="#EF4444" strokeWidth="2" />
        <line x1="250" y1="100" x2="235" y2="100" stroke="#EF4444" strokeWidth="2" />
        <line x1="290" y1="100" x2="305" y2="100" stroke="#EF4444" strokeWidth="2" />
        <line x1="270" y1="125" x2="270" y2="140" stroke="#EF4444" strokeWidth="2" />
        <text x="270" y="160" fontSize="8" fill="#DC2626" textAnchor="middle" fontWeight="bold">
          Virus
        </text>
        <text x="270" y="172" fontSize="6" fill="#6B7280" textAnchor="middle">
          Bacteriophage
        </text>
      </g>

      {/* Mushroom */}
      <g
      >
        <ellipse cx="360" cy="95" rx="25" ry="12" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
        <rect
          x="352"
          y="95"
          width="16"
          height="30"
          fill="#FDF2F8"
          stroke="#EC4899"
          strokeWidth="1"
        />
        <text x="360" y="135" fontSize="8" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          Fungi
        </text>
        <text x="360" y="147" fontSize="6" fill="#6B7280" textAnchor="middle">
          Penicillium
        </text>
      </g>

      {/* Applications */}
      <rect
        x="30"
        y="180"
        width="340"
        height="95"
        rx="10"
        fill="#FFFFFF"
        stroke="#22C55E"
        strokeWidth="2"
      />
      <text x="200" y="200" fontSize="9" fill="#16A34A" textAnchor="middle" fontWeight="bold">
        Applications in Human Welfare
      </text>

      <g
      >
        {/* Application boxes */}
        <rect x="45" y="210" width="75" height="55" rx="6" fill="#DBEAFE" />
        <text x="82" y="228" fontSize="7" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Antibiotics
        </text>
        <text x="82" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
          Penicillin
        </text>
        <text x="82" y="254" fontSize="6" fill="#6B7280" textAnchor="middle">
          Streptomycin
        </text>

        <rect x="130" y="210" width="75" height="55" rx="6" fill="#FEF3C7" />
        <text x="167" y="228" fontSize="7" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Fermentation
        </text>
        <text x="167" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
          Bread, Alcohol
        </text>
        <text x="167" y="254" fontSize="6" fill="#6B7280" textAnchor="middle">
          Curd, Cheese
        </text>

        <rect x="215" y="210" width="75" height="55" rx="6" fill="#DCFCE7" />
        <text x="252" y="228" fontSize="7" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          Biogas
        </text>
        <text x="252" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
          Methanogens
        </text>
        <text x="252" y="254" fontSize="6" fill="#6B7280" textAnchor="middle">
          Gobar Gas
        </text>

        <rect x="300" y="210" width="60" height="55" rx="6" fill="#FCE7F3" />
        <text x="330" y="228" fontSize="7" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          STP
        </text>
        <text x="330" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
          Sewage
        </text>
        <text x="330" y="254" fontSize="6" fill="#6B7280" textAnchor="middle">
          Treatment
        </text>
      </g>
    </Wrapper>
  )
}
