'use client'

import type { IllustrationProps } from './shared'

export function BiotechnologyIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <text x="200" y="35" fontSize="14" fill="#059669" textAnchor="middle" fontWeight="bold">
        Biotechnology - 8% Weightage
      </text>

      {/* DNA strand being cut */}
      <motion.g
      >
        {/* DNA helix segment */}
        <path
          d="M40 80 Q60 100 40 120 Q20 140 40 160"
          stroke="#8B5CF6"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M80 80 Q60 100 80 120 Q100 140 80 160"
          stroke="#A78BFA"
          strokeWidth="3"
          fill="none"
        />
        <line x1="40" y1="90" x2="80" y2="90" stroke="#EC4899" strokeWidth="2" />
        <line x1="40" y1="110" x2="80" y2="110" stroke="#10B981" strokeWidth="2" />
        <line x1="40" y1="130" x2="80" y2="130" stroke="#F59E0B" strokeWidth="2" />
        <line x1="40" y1="150" x2="80" y2="150" stroke="#3B82F6" strokeWidth="2" />
      </motion.g>

      {/* Scissors (restriction enzyme) */}
      <motion.g
        style={{ transformOrigin: '120px 120px' }}
      >
        <path d="M100 100 L120 120 L100 140" stroke="#EF4444" strokeWidth="3" fill="none" />
        <path d="M140 100 L120 120 L140 140" stroke="#EF4444" strokeWidth="3" fill="none" />
        <circle cx="120" cy="120" r="5" fill="#EF4444" />
      </motion.g>
      <text x="120" y="165" fontSize="7" fill="#DC2626" textAnchor="middle">
        Restriction
      </text>
      <text x="120" y="175" fontSize="7" fill="#DC2626" textAnchor="middle">
        Enzyme
      </text>

      {/* Plasmid vector */}
      <motion.g
        style={{ transformOrigin: '200px 120px' }}
      >
        <circle cx="200" cy="120" r="40" fill="none" stroke="#3B82F6" strokeWidth="4" />
        <circle cx="200" cy="80" r="5" fill="#EF4444" />
        <text x="200" y="70" fontSize="6" fill="#DC2626" textAnchor="middle">
          ori
        </text>
      </motion.g>
      <text x="200" y="175" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
        Plasmid Vector
      </text>

      {/* Arrow showing insertion */}
      <motion.path
        d="M145 120 L155 120 M152 115 L158 120 L152 125"
        stroke="#059669"
        strokeWidth="2"
        fill="none"
      />

      {/* Recombinant DNA */}
      <motion.g
      >
        <circle cx="300" cy="120" r="45" fill="none" stroke="#10B981" strokeWidth="4" />
        <line x1="280" y1="100" x2="320" y2="100" stroke="#EC4899" strokeWidth="3" />
        <line x1="280" y1="140" x2="320" y2="140" stroke="#F59E0B" strokeWidth="3" />
        <circle cx="300" cy="75" r="5" fill="#EF4444" />
      </motion.g>
      <text x="300" y="180" fontSize="8" fill="#059669" textAnchor="middle" fontWeight="bold">
        Recombinant DNA
      </text>

      {/* Applications box */}
      <rect
        x="20"
        y="195"
        width="160"
        height="85"
        rx="8"
        fill="#FFFFFF"
        stroke="#10B981"
        strokeWidth="2"
      />
      <text x="100" y="215" fontSize="9" fill="#059669" textAnchor="middle" fontWeight="bold">
        Applications
      </text>
      <text x="100" y="232" fontSize="7" fill="#374151" textAnchor="middle">
        • GM Crops (Bt Cotton)
      </text>
      <text x="100" y="246" fontSize="7" fill="#374151" textAnchor="middle">
        • Insulin Production
      </text>
      <text x="100" y="260" fontSize="7" fill="#374151" textAnchor="middle">
        • Gene Therapy
      </text>
      <text x="100" y="274" fontSize="7" fill="#374151" textAnchor="middle">
        • DNA Fingerprinting
      </text>

      {/* Tools box */}
      <rect
        x="220"
        y="195"
        width="160"
        height="85"
        rx="8"
        fill="#FFFFFF"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      <text x="300" y="215" fontSize="9" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Tools & Techniques
      </text>
      <text x="300" y="232" fontSize="7" fill="#374151" textAnchor="middle">
        • PCR (DNA Amplification)
      </text>
      <text x="300" y="246" fontSize="7" fill="#374151" textAnchor="middle">
        • Gel Electrophoresis
      </text>
      <text x="300" y="260" fontSize="7" fill="#374151" textAnchor="middle">
        • ELISA, Blotting
      </text>
      <text x="300" y="274" fontSize="7" fill="#374151" textAnchor="middle">
        • Bioreactors
      </text>

      {/* Questions badge */}
      <motion.g
      >
        <circle cx="360" cy="70" r="18" fill="#10B981" />
        <text x="360" y="67" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          6-8
        </text>
        <text x="360" y="78" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}
