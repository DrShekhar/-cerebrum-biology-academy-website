'use client'

import type { IllustrationProps } from './shared'

export function HumanReproductionIllustration({
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FCE7F3" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        Human Reproduction - 12% Weightage
      </text>

      {/* Male symbol */}
      <motion.g
      >
        <circle cx="100" cy="120" r="30" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="3" />
        <line x1="120" y1="100" x2="145" y2="75" stroke="#3B82F6" strokeWidth="3" />
        <line x1="145" y1="75" x2="135" y2="75" stroke="#3B82F6" strokeWidth="3" />
        <line x1="145" y1="75" x2="145" y2="85" stroke="#3B82F6" strokeWidth="3" />
        <text x="100" y="165" fontSize="9" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Male
        </text>
      </motion.g>

      {/* Female symbol */}
      <motion.g
      >
        <circle cx="300" cy="120" r="30" fill="#FBCFE8" stroke="#EC4899" strokeWidth="3" />
        <line x1="300" y1="150" x2="300" y2="180" stroke="#EC4899" strokeWidth="3" />
        <line x1="285" y1="165" x2="315" y2="165" stroke="#EC4899" strokeWidth="3" />
        <text x="300" y="195" fontSize="9" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          Female
        </text>
      </motion.g>

      {/* Connecting heart */}
      <motion.g
      >
        <path
          d="M200 110 L190 100 Q175 90 175 105 Q175 120 200 140 Q225 120 225 105 Q225 90 210 100 Z"
          fill="#F472B6"
          stroke="#DB2777"
          strokeWidth="2"
        />
      </motion.g>

      {/* Gametogenesis boxes */}
      <motion.g
      >
        <rect
          x="40"
          y="180"
          width="120"
          height="50"
          rx="8"
          fill="#FFFFFF"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text x="100" y="200" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Spermatogenesis
        </text>
        <text x="100" y="215" fontSize="6" fill="#6B7280" textAnchor="middle">
          Sperm production
        </text>
        <text x="100" y="225" fontSize="6" fill="#6B7280" textAnchor="middle">
          in testes
        </text>
      </motion.g>

      <motion.g
      >
        <rect
          x="240"
          y="180"
          width="120"
          height="50"
          rx="8"
          fill="#FFFFFF"
          stroke="#EC4899"
          strokeWidth="2"
        />
        <text x="300" y="200" fontSize="8" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          Oogenesis
        </text>
        <text x="300" y="215" fontSize="6" fill="#6B7280" textAnchor="middle">
          Egg production
        </text>
        <text x="300" y="225" fontSize="6" fill="#6B7280" textAnchor="middle">
          in ovaries
        </text>
      </motion.g>

      {/* Fertilization central */}
      <motion.g
      >
        <ellipse
          cx="200"
          cy="210"
          rx="35"
          ry="25"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <text x="200" y="207" fontSize="8" fill="#92400E" textAnchor="middle" fontWeight="bold">
          Fertilization
        </text>
        <text x="200" y="220" fontSize="6" fill="#92400E" textAnchor="middle">
          Zygote Formation
        </text>
      </motion.g>

      {/* Development stages */}
      <rect
        x="100"
        y="245"
        width="200"
        height="40"
        rx="6"
        fill="#FFFFFF"
        stroke="#BE185D"
        strokeWidth="1"
      />
      <text x="200" y="260" fontSize="7" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        Development: Zygote → Embryo → Fetus → Baby
      </text>
      <text x="200" y="275" fontSize="6" fill="#6B7280" textAnchor="middle">
        Pregnancy: 40 weeks (280 days)
      </text>

      {/* Topics sidebar */}
      <rect
        x="320"
        y="60"
        width="70"
        height="100"
        rx="6"
        fill="#FFFFFF"
        stroke="#EC4899"
        strokeWidth="1"
      />
      <text x="355" y="78" fontSize="7" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        Topics:
      </text>
      <text x="355" y="92" fontSize="5" fill="#374151" textAnchor="middle">
        Gametogenesis
      </text>
      <text x="355" y="104" fontSize="5" fill="#374151" textAnchor="middle">
        Menstrual Cycle
      </text>
      <text x="355" y="116" fontSize="5" fill="#374151" textAnchor="middle">
        Fertilization
      </text>
      <text x="355" y="128" fontSize="5" fill="#374151" textAnchor="middle">
        Embryo Dev.
      </text>
      <text x="355" y="140" fontSize="5" fill="#374151" textAnchor="middle">
        Lactation
      </text>
      <text x="355" y="152" fontSize="5" fill="#374151" textAnchor="middle">
        Contraception
      </text>

      {/* Questions badge */}
      <motion.g
      >
        <circle cx="40" cy="260" r="18" fill="#EC4899" />
        <text x="40" y="257" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          10-12
        </text>
        <text x="40" y="268" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}
