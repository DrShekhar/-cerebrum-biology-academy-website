'use client'

import type { IllustrationProps } from './shared'

export function MolecularBiologyIllustration({
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#EDE9FE" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Molecular Biology - 5% Weightage
      </text>

      {/* DNA Double Helix */}
      <motion.g
        style={{ transformOrigin: '120px 160px' }}
      >
        {/* Left strand */}
        <path
          d="M80 70 Q100 90 80 110 Q60 130 80 150 Q100 170 80 190 Q60 210 80 230 Q100 250 80 270"
          stroke="#3B82F6"
          strokeWidth="4"
          fill="none"
        />
        {/* Right strand */}
        <path
          d="M160 70 Q140 90 160 110 Q180 130 160 150 Q140 170 160 190 Q180 210 160 230 Q140 250 160 270"
          stroke="#EC4899"
          strokeWidth="4"
          fill="none"
        />
        {/* Base pairs */}
        <line x1="80" y1="90" x2="160" y2="90" stroke="#22C55E" strokeWidth="3" />
        <line x1="80" y1="130" x2="160" y2="130" stroke="#F59E0B" strokeWidth="3" />
        <line x1="80" y1="170" x2="160" y2="170" stroke="#22C55E" strokeWidth="3" />
        <line x1="80" y1="210" x2="160" y2="210" stroke="#F59E0B" strokeWidth="3" />
        <line x1="80" y1="250" x2="160" y2="250" stroke="#22C55E" strokeWidth="3" />

        {/* Base pair labels */}
        <text x="120" y="85" fontSize="6" fill="#166534" textAnchor="middle">
          A-T
        </text>
        <text x="120" y="125" fontSize="6" fill="#B45309" textAnchor="middle">
          G-C
        </text>
        <text x="120" y="165" fontSize="6" fill="#166534" textAnchor="middle">
          T-A
        </text>
        <text x="120" y="205" fontSize="6" fill="#B45309" textAnchor="middle">
          C-G
        </text>
        <text x="120" y="245" fontSize="6" fill="#166534" textAnchor="middle">
          A-T
        </text>
      </motion.g>
      <text x="120" y="285" fontSize="8" fill="#3B82F6" textAnchor="middle" fontWeight="bold">
        DNA Double Helix
      </text>

      {/* Central Dogma arrows */}
      <rect
        x="200"
        y="60"
        width="180"
        height="90"
        rx="10"
        fill="#FFFFFF"
        stroke="#7C3AED"
        strokeWidth="2"
      />
      <text x="290" y="80" fontSize="9" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Central Dogma
      </text>

      <motion.g
      >
        <rect x="215" y="95" width="40" height="20" rx="4" fill="#3B82F6" />
        <text x="235" y="109" fontSize="7" fill="#FFFFFF" textAnchor="middle">
          DNA
        </text>
      </motion.g>

      <motion.path
        d="M260 105 L280 105"
        stroke="#7C3AED"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      <text x="270" y="100" fontSize="5" fill="#7C3AED" textAnchor="middle">
        Transcription
      </text>

      <motion.g
      >
        <rect x="285" y="95" width="40" height="20" rx="4" fill="#EC4899" />
        <text x="305" y="109" fontSize="7" fill="#FFFFFF" textAnchor="middle">
          RNA
        </text>
      </motion.g>

      <motion.path
        d="M330 105 L350 105"
        stroke="#7C3AED"
        strokeWidth="2"
      />
      <text x="340" y="100" fontSize="5" fill="#7C3AED" textAnchor="middle">
        Translation
      </text>

      <motion.g
      >
        <rect x="340" y="95" width="35" height="20" rx="4" fill="#22C55E" />
        <text x="357" y="109" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Protein
        </text>
      </motion.g>

      {/* Key topics */}
      <rect
        x="200"
        y="160"
        width="180"
        height="120"
        rx="10"
        fill="#FFFFFF"
        stroke="#8B5CF6"
        strokeWidth="1"
      />
      <text x="290" y="180" fontSize="8" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Key Topics:
      </text>
      <text x="290" y="198" fontSize="7" fill="#374151" textAnchor="middle">
        • DNA Replication
      </text>
      <text x="290" y="212" fontSize="7" fill="#374151" textAnchor="middle">
        • Transcription & Translation
      </text>
      <text x="290" y="226" fontSize="7" fill="#374151" textAnchor="middle">
        • Gene Regulation (Lac Operon)
      </text>
      <text x="290" y="240" fontSize="7" fill="#374151" textAnchor="middle">
        • Genetic Code
      </text>
      <text x="290" y="254" fontSize="7" fill="#374151" textAnchor="middle">
        • DNA Fingerprinting
      </text>

      {/* Questions badge */}
      <motion.g
      >
        <circle cx="360" cy="260" r="18" fill="#8B5CF6" />
        <text x="360" y="257" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          4-6
        </text>
        <text x="360" y="268" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}
