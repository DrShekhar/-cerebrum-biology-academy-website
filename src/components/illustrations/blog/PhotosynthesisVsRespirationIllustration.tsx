'use client'

import type { IllustrationProps } from './shared'

export function PhotosynthesisVsRespirationIllustration({
  className = '',
  animate = true,
}: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 520 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Professional gradients */}
        <linearGradient id="pvrBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="photoSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DCFCE7" />
          <stop offset="100%" stopColor="#BBF7D0" />
        </linearGradient>
        <linearGradient id="respSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEE2E2" />
          <stop offset="100%" stopColor="#FECACA" />
        </linearGradient>
        <linearGradient id="sunGradPvr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="leafGradPvr" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="mitoGradPvr" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="atpGradPvr" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="vsGradPvr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <filter id="pvrShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12" />
        </filter>
        <filter id="pvrCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
        </filter>
        <filter id="pvrGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="sunGlowPvr" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="520" height="400" rx="24" fill="url(#pvrBgGrad)" />

      {/* Title */}
      <text
        x="260"
        y="38"
        fontSize="22"
        fill="#1E293B"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        Photosynthesis vs Respiration
      </text>
      <text
        x="260"
        y="58"
        fontSize="11"
        fill="#64748B"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        Energy Conversion in Living Organisms
      </text>

      {/* Photosynthesis side panel */}
      <g filter="url(#pvrShadow)">
        <rect x="15" y="75" width="235" height="310" rx="20" fill="url(#photoSideGrad)" />
        <rect
          x="15"
          y="75"
          width="235"
          height="310"
          rx="20"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
      </g>

      {/* Respiration side panel */}
      <g filter="url(#pvrShadow)">
        <rect x="270" y="75" width="235" height="310" rx="20" fill="url(#respSideGrad)" />
        <rect
          x="270"
          y="75"
          width="235"
          height="310"
          rx="20"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
      </g>

      {/* Photosynthesis Header */}
      <text
        x="132"
        y="105"
        fontSize="16"
        fill="#15803D"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        PHOTOSYNTHESIS
      </text>

      {/* Sun with glow */}
      <g filter="url(#sunGlowPvr)">
        <motion.g
          style={{ transformOrigin: '80px 160px' }}
        >
          <circle cx="80" cy="160" r="28" fill="url(#sunGradPvr)" />
          <circle
            cx="80"
            cy="160"
            r="24"
            fill="none"
            stroke="#FDE047"
            strokeWidth="2"
            strokeOpacity="0.5"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={`sun-ray-${i}`}
              x1={80 + 34 * Math.cos((angle * Math.PI) / 180)}
              y1={160 + 34 * Math.sin((angle * Math.PI) / 180)}
              x2={80 + 46 * Math.cos((angle * Math.PI) / 180)}
              y2={160 + 46 * Math.sin((angle * Math.PI) / 180)}
              stroke="#F59E0B"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </motion.g>
      </g>
      <text
        x="80"
        y="220"
        fontSize="10"
        fill="#B45309"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Light Energy
      </text>

      {/* Chloroplast/Leaf */}
      <motion.g
        filter="url(#pvrCardShadow)"
        style={{ transformOrigin: '175px 165px' }}
      >
        <ellipse cx="175" cy="165" rx="38" ry="55" fill="url(#leafGradPvr)" />
        <line x1="175" y1="115" x2="175" y2="215" stroke="#15803D" strokeWidth="3" />
        <line
          x1="150"
          y1="140"
          x2="175"
          y2="165"
          stroke="#15803D"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
        <line
          x1="200"
          y1="140"
          x2="175"
          y2="165"
          stroke="#15803D"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
        <line
          x1="150"
          y1="190"
          x2="175"
          y2="165"
          stroke="#15803D"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
        <line
          x1="200"
          y1="190"
          x2="175"
          y2="165"
          stroke="#15803D"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
      </motion.g>

      {/* Photosynthesis equation card */}
      <g filter="url(#pvrCardShadow)">
        <rect x="30" y="240" width="205" height="85" rx="14" fill="white" fillOpacity="0.95" />
        <rect
          x="30"
          y="240"
          width="205"
          height="85"
          rx="14"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <text
          x="132"
          y="265"
          fontSize="12"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          6CO₂ + 6H₂O + Light
        </text>
        <text
          x="132"
          y="285"
          fontSize="11"
          fill="#16A34A"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          ↓ Chloroplast
        </text>
        <text
          x="132"
          y="310"
          fontSize="12"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          C₆H₁₂O₆ + 6O₂
        </text>
      </g>

      {/* O2 bubbles */}
      <motion.g
      >
        <circle cx="55" cy="345" r="8" fill="#93C5FD" fillOpacity="0.8" />
        <circle cx="80" cy="360" r="6" fill="#93C5FD" fillOpacity="0.7" />
        <circle cx="65" cy="372" r="5" fill="#93C5FD" fillOpacity="0.6" />
      </motion.g>
      <text
        x="70"
        y="395"
        fontSize="10"
        fill="#3B82F6"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        O₂ Released
      </text>

      {/* Respiration Header */}
      <text
        x="387"
        y="105"
        fontSize="16"
        fill="#DC2626"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        RESPIRATION
      </text>

      {/* Mitochondria */}
      <motion.g
        filter="url(#pvrCardShadow)"
        style={{ transformOrigin: '387px 165px' }}
      >
        <ellipse cx="387" cy="165" rx="55" ry="35" fill="url(#mitoGradPvr)" />
        <ellipse cx="387" cy="165" rx="48" ry="28" fill="none" stroke="#FCA5A5" strokeWidth="2" />
        {/* Cristae */}
        <path
          d="M345 165 Q360 145 375 165 Q390 185 405 165 Q420 145 435 165"
          stroke="#DC2626"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>
      <text
        x="387"
        y="215"
        fontSize="10"
        fill="#DC2626"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Mitochondria
      </text>

      {/* Respiration equation card */}
      <g filter="url(#pvrCardShadow)">
        <rect x="285" y="240" width="205" height="85" rx="14" fill="white" fillOpacity="0.95" />
        <rect
          x="285"
          y="240"
          width="205"
          height="85"
          rx="14"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text
          x="387"
          y="265"
          fontSize="12"
          fill="#DC2626"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          C₆H₁₂O₆ + 6O₂
        </text>
        <text
          x="387"
          y="285"
          fontSize="11"
          fill="#EF4444"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          ↓ Mitochondria
        </text>
        <text
          x="387"
          y="310"
          fontSize="12"
          fill="#DC2626"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          6CO₂ + 6H₂O + ATP
        </text>
      </g>

      {/* ATP Energy badge */}
      <motion.g
        filter="url(#pvrGlow)"
      >
        <circle cx="440" cy="355" r="28" fill="url(#atpGradPvr)" />
        <circle
          cx="440"
          cy="355"
          r="24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.4"
        />
        <text
          x="440"
          y="350"
          fontSize="14"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          ATP
        </text>
        <text
          x="440"
          y="365"
          fontSize="9"
          fill="#FFFFFF"
          textAnchor="middle"
          fillOpacity="0.9"
          fontFamily="system-ui, sans-serif"
        >
          Energy
        </text>
      </motion.g>
      <text
        x="440"
        y="395"
        fontSize="10"
        fill="#B45309"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        38 ATP/Glucose
      </text>

      {/* VS circle in middle */}
      <g filter="url(#pvrGlow)">
        <circle cx="260" cy="165" r="30" fill="url(#vsGradPvr)" />
        <circle
          cx="260"
          cy="165"
          r="26"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <text
          x="260"
          y="172"
          fontSize="16"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          VS
        </text>
      </g>

      {/* Cycle arrows */}
      <motion.path
        d="M200 340 Q260 310 320 340"
        stroke="#8B5CF6"
        strokeWidth="3"
        fill="none"
        strokeDasharray="8 4"
        strokeLinecap="round"
      />
      <motion.path
        d="M320 360 Q260 390 200 360"
        stroke="#8B5CF6"
        strokeWidth="3"
        fill="none"
        strokeDasharray="8 4"
        strokeLinecap="round"
      />

      {/* Arrow labels */}
      <text
        x="260"
        y="325"
        fontSize="9"
        fill="#7C3AED"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Glucose
      </text>
      <text
        x="260"
        y="380"
        fontSize="9"
        fill="#7C3AED"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        CO₂ + H₂O
      </text>
    </Wrapper>
  )
}
