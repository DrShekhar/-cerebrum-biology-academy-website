'use client'

import { motion } from 'framer-motion'
import type { IllustrationProps } from './shared'

export function DwarkaIllustration({ className = '', animate = true }: IllustrationProps) {
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
      {/* Background gradient - West Delhi sunset tones */}
      <defs>
        <linearGradient id="dwarkaSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDF2F8" />
          <stop offset="50%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#FFF1F2" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#dwarkaSkyGradient)" />

      {/* Airplane in sky */}
      <motion.g
        initial={animate ? { x: -100, y: 50 } : undefined}
        animate={animate ? { x: 450, y: -20 } : undefined}
        transition={{ delay: 1, duration: 8, repeat: Infinity, repeatDelay: 3 }}
      >
        <path d="M0 25 L30 20 L35 10 L40 20 L60 25 L40 27 L35 35 L30 27 Z" fill="#9CA3AF" />
        <circle cx="35" cy="22" r="3" fill="#E5E7EB" />
      </motion.g>

      {/* Dwarka Sector buildings */}
      {/* Sector 10 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <rect x="30" y="100" width="55" height="130" rx="4" fill="#F59E0B" />
        <rect x="35" y="105" width="45" height="18" fill="#FEF3C7" />
        <text x="57" y="117" textAnchor="middle" fill="#B45309" fontSize="7" fontWeight="600">
          SECTOR 10
        </text>
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect x="38" y={128 + row * 25} width="10" height="18" fill="#FDE68A" />
            <rect x="53" y={128 + row * 25} width="10" height="18" fill="#FDE68A" />
            <rect x="68" y={128 + row * 25} width="10" height="18" fill="#FDE68A" />
          </g>
        ))}
      </motion.g>

      {/* Main Coaching Center - Sector 12 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <rect x="110" y="70" width="90" height="160" rx="4" fill="#8B5CF6" />
        <rect x="115" y="75" width="80" height="35" fill="#F3E8FF" />
        <text x="155" y="92" textAnchor="middle" fill="#6D28D9" fontSize="10" fontWeight="700">
          CEREBRUM
        </text>
        <text x="155" y="104" textAnchor="middle" fill="#6D28D9" fontSize="7">
          NEET COACHING
        </text>

        {/* Classroom windows */}
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect x="120" y={115 + row * 30} width="20" height="22" fill="#DDD6FE" />
            <rect x="145" y={115 + row * 30} width="20" height="22" fill="#DDD6FE" />
            <rect x="170" y={115 + row * 30} width="20" height="22" fill="#DDD6FE" />
          </g>
        ))}

        {/* Entrance */}
        <rect x="145" y="210" width="20" height="20" fill="#4C1D95" />
      </motion.g>

      {/* Sector 21 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <rect x="220" y="110" width="60" height="120" rx="4" fill="#EC4899" />
        <rect x="225" y="115" width="50" height="18" fill="#FCE7F3" />
        <text x="250" y="127" textAnchor="middle" fill="#BE185D" fontSize="7" fontWeight="600">
          SECTOR 21
        </text>
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <rect x="228" y={138 + row * 28} width="12" height="20" fill="#FBCFE8" />
            <rect x="245" y={138 + row * 28} width="12" height="20" fill="#FBCFE8" />
            <rect x="262" y={138 + row * 28} width="12" height="20" fill="#FBCFE8" />
          </g>
        ))}
      </motion.g>

      {/* Dwarka Mor Metro */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <rect x="300" y="130" width="70" height="100" rx="4" fill="#3B82F6" />
        <rect x="305" y="135" width="60" height="25" fill="#DBEAFE" />
        <text x="335" y="148" textAnchor="middle" fill="#1D4ED8" fontSize="7" fontWeight="600">
          DWARKA
        </text>
        <text x="335" y="157" textAnchor="middle" fill="#1D4ED8" fontSize="6">
          MOR METRO
        </text>
        <rect x="320" y="165" width="30" height="60" fill="#60A5FA" />
        <path d="M320 165 L335 150 L350 165" fill="#3B82F6" />
      </motion.g>

      {/* Metro line */}
      <motion.g
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <rect x="0" y="235" width="400" height="8" fill="#3B82F6" />
        <text x="200" y="260" textAnchor="middle" fill="#374151" fontSize="9">
          Blue Line Metro
        </text>
      </motion.g>

      {/* Location pin */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
      >
        <motion.circle
          cx="155"
          cy="45"
          r="18"
          fill="#EF4444"
          animate={animate ? { scale: [1, 1.1, 1] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <path d="M155 27 L155 10" stroke="#EF4444" strokeWidth="3" />
        <circle cx="155" cy="45" r="7" fill="#FFF" />
      </motion.g>

      {/* Title */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <rect x="90" y="270" width="220" height="25" rx="6" fill="#1F2937" />
        <text x="200" y="287" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="600">
          NEET Coaching Dwarka West Delhi
        </text>
      </motion.g>
    </Wrapper>
  )
}
