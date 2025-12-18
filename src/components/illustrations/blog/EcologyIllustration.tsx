'use client'

import { motion } from 'framer-motion'
import type { IllustrationProps } from './shared'

export function EcologyIllustration({ className = '', animate = true }: IllustrationProps) {
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
      {/* Sky background */}
      <rect x="10" y="10" width="380" height="180" rx="20" fill="#BFDBFE" />
      {/* Ground */}
      <rect x="10" y="180" width="380" height="110" rx="20" fill="#86EFAC" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#065F46" textAnchor="middle" fontWeight="bold">
        Ecology & Environment - 12% Weightage
      </text>

      {/* Sun with rays */}
      <motion.g
        animate={animate ? { rotate: [0, 360] } : undefined}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '350px 70px' }}
      >
        <circle cx="350" cy="70" r="25" fill="#FCD34D" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={350 + 30 * Math.cos((angle * Math.PI) / 180)}
            y1={70 + 30 * Math.sin((angle * Math.PI) / 180)}
            x2={350 + 40 * Math.cos((angle * Math.PI) / 180)}
            y2={70 + 40 * Math.sin((angle * Math.PI) / 180)}
            stroke="#F59E0B"
            strokeWidth="3"
          />
        ))}
      </motion.g>

      {/* Clouds */}
      <motion.g
        animate={animate ? { x: [-10, 10, -10] } : undefined}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <ellipse cx="80" cy="60" rx="25" ry="15" fill="#FFFFFF" />
        <ellipse cx="100" cy="55" rx="20" ry="12" fill="#FFFFFF" />
        <ellipse cx="60" cy="55" rx="18" ry="10" fill="#FFFFFF" />
      </motion.g>

      {/* Trees */}
      {/* Tree 1 */}
      <motion.g
        animate={animate ? { scaleY: [1, 1.02, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '70px 180px' }}
      >
        <rect x="65" y="140" width="10" height="50" fill="#92400E" />
        <polygon points="70,80 40,140 100,140" fill="#22C55E" />
        <polygon points="70,100 45,150 95,150" fill="#16A34A" />
      </motion.g>

      {/* Tree 2 */}
      <motion.g
        animate={animate ? { scaleY: [1, 1.03, 1] } : undefined}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        style={{ transformOrigin: '140px 180px' }}
      >
        <rect x="135" y="130" width="10" height="60" fill="#92400E" />
        <polygon points="140,70 105,130 175,130" fill="#22C55E" />
        <polygon points="140,95 115,145 165,145" fill="#16A34A" />
      </motion.g>

      {/* Water body */}
      <motion.ellipse
        cx="280"
        cy="230"
        rx="60"
        ry="25"
        fill="#60A5FA"
        animate={animate ? { rx: [60, 62, 60], ry: [25, 26, 25] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x="280" y="235" fontSize="8" fill="#1E40AF" textAnchor="middle">
        Pond
      </text>

      {/* Food Chain arrow */}
      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="30"
          y="200"
          width="130"
          height="80"
          rx="8"
          fill="#FFFFFF"
          fillOpacity="0.9"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="95" y="218" fontSize="9" fill="#065F46" textAnchor="middle" fontWeight="bold">
          Food Chain
        </text>
        <text x="95" y="235" fontSize="7" fill="#374151" textAnchor="middle">
          Producer → Consumer
        </text>
        <text x="95" y="250" fontSize="7" fill="#374151" textAnchor="middle">
          → Decomposer
        </text>
        <path d="M50 262 L140 262" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />
      </motion.g>

      {/* Deer */}
      <motion.g
        animate={animate ? { x: [-5, 5, -5] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <ellipse cx="200" cy="195" rx="20" ry="12" fill="#D97706" />
        <circle cx="215" cy="185" r="8" fill="#D97706" />
        <rect x="190" y="205" width="4" height="15" fill="#92400E" />
        <rect x="205" y="205" width="4" height="15" fill="#92400E" />
      </motion.g>

      {/* Bird */}
      <motion.g
        animate={animate ? { y: [-10, 10, -10], x: [0, 20, 0] } : undefined}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <path d="M250 100 Q260 90 270 100 Q260 95 250 100" fill="#1E293B" />
      </motion.g>

      {/* Topics list */}
      <rect
        x="200"
        y="140"
        width="90"
        height="50"
        rx="6"
        fill="#FFFFFF"
        fillOpacity="0.9"
        stroke="#059669"
        strokeWidth="1"
      />
      <text x="245" y="155" fontSize="7" fill="#065F46" textAnchor="middle" fontWeight="bold">
        Topics:
      </text>
      <text x="245" y="167" fontSize="6" fill="#374151" textAnchor="middle">
        Biodiversity
      </text>
      <text x="245" y="178" fontSize="6" fill="#374151" textAnchor="middle">
        Ecosystem Services
      </text>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="370" cy="270" r="18" fill="#10B981" />
        <text x="370" y="267" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          10-12
        </text>
        <text x="370" y="278" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}
