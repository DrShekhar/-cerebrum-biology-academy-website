'use client'

import type { IllustrationProps } from './shared'

export function HumanPhysiologyIllustration({ className = '', animate = true }: IllustrationProps) {
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
      viewBox="0 0 500 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        <linearGradient id="physBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDF2F8" />
          <stop offset="50%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#FAE8FF" />
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="lungGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.1" />
        </filter>
        <filter id="glowPulse" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="15" y="15" width="470" height="350" rx="24" fill="url(#physBgGrad)" />
      <rect x="15" y="15" width="470" height="350" rx="24" fill="white" fillOpacity="0.4" />

      <text
        x="250"
        y="50"
        fontSize="18"
        fill="#BE185D"
        textAnchor="middle"
        fontWeight="700"
        fontFamily="system-ui"
      >
        Human Physiology - 20% Weightage
      </text>

      <g filter="url(#softShadow)">
        <ellipse cx="250" cy="105" rx="32" ry="36" fill="url(#bodyGrad)" />
        <rect x="218" y="138" width="64" height="100" rx="14" fill="url(#bodyGrad)" />
        <ellipse cx="250" cy="238" rx="32" ry="10" fill="#F59E0B" opacity="0.3" />
      </g>

      <g
        filter="url(#glowPulse)"
      >
        <ellipse cx="250" cy="95" rx="22" ry="18" fill="url(#brainGrad)" />
        <path
          d="M232 95 Q241 85 250 95 Q259 85 268 95"
          stroke="#BE185D"
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M235 100 Q250 108 265 100"
          stroke="#BE185D"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <text x="250" y="78" fontSize="9" fill="#831843" textAnchor="middle" fontWeight="600">
          Brain
        </text>
      </g>

      <g
      >
        <path
          d="M250 155 L238 143 Q220 130 220 148 Q220 168 250 195 Q280 168 280 148 Q280 130 262 143 Z"
          fill="url(#heartGrad)"
          filter="url(#softShadow)"
        />
        <text x="250" y="175" fontSize="8" fill="white" textAnchor="middle" fontWeight="600">
          Heart
        </text>
      </g>

      <g
        style={{ transformOrigin: '250px 165px' }}
      >
        <ellipse
          cx="205"
          cy="165"
          rx="18"
          ry="32"
          fill="url(#lungGrad)"
          filter="url(#softShadow)"
        />
        <ellipse
          cx="295"
          cy="165"
          rx="18"
          ry="32"
          fill="url(#lungGrad)"
          filter="url(#softShadow)"
        />
      </g>

      <g
      >
        <rect
          x="30"
          y="100"
          width="100"
          height="75"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="30"
          y="100"
          width="100"
          height="75"
          rx="12"
          fill="#FFFBEB"
          fillOpacity="0.8"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <text x="80" y="128" fontSize="11" fill="#92400E" textAnchor="middle" fontWeight="700">
          Digestive
        </text>
        <text x="80" y="143" fontSize="11" fill="#92400E" textAnchor="middle" fontWeight="700">
          System
        </text>
        <path
          d="M55 158 Q80 170 105 158"
          stroke="#F59E0B"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      <g
      >
        <rect
          x="370"
          y="100"
          width="100"
          height="75"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="370"
          y="100"
          width="100"
          height="75"
          rx="12"
          fill="#FEF2F2"
          fillOpacity="0.8"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text x="420" y="128" fontSize="11" fill="#991B1B" textAnchor="middle" fontWeight="700">
          Circulatory
        </text>
        <text x="420" y="143" fontSize="11" fill="#991B1B" textAnchor="middle" fontWeight="700">
          System
        </text>
        <circle
          cx="420"
          cy="160"
          r="10"
          fill="#EF4444"
        />
      </g>

      <g
      >
        <rect
          x="30"
          y="195"
          width="100"
          height="75"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="30"
          y="195"
          width="100"
          height="75"
          rx="12"
          fill="#EFF6FF"
          fillOpacity="0.8"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text x="80" y="223" fontSize="11" fill="#1E40AF" textAnchor="middle" fontWeight="700">
          Respiratory
        </text>
        <text x="80" y="238" fontSize="11" fill="#1E40AF" textAnchor="middle" fontWeight="700">
          System
        </text>
        <ellipse
          cx="80"
          cy="256"
          rx="14"
          ry="9"
          fill="#60A5FA"
        />
      </g>

      <g
      >
        <rect
          x="370"
          y="195"
          width="100"
          height="75"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="370"
          y="195"
          width="100"
          height="75"
          rx="12"
          fill="#ECFDF5"
          fillOpacity="0.8"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="420" y="223" fontSize="11" fill="#065F46" textAnchor="middle" fontWeight="700">
          Excretory
        </text>
        <text x="420" y="238" fontSize="11" fill="#065F46" textAnchor="middle" fontWeight="700">
          System
        </text>
        <path
          d="M405 255 Q420 268 435 255"
          stroke="#10B981"
          strokeWidth="2.5"
          fill="#6EE7B7"
          strokeLinecap="round"
        />
      </g>

      <g
      >
        <rect
          x="145"
          y="280"
          width="95"
          height="60"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="145"
          y="280"
          width="95"
          height="60"
          rx="12"
          fill="#FAF5FF"
          fillOpacity="0.8"
          stroke="#8B5CF6"
          strokeWidth="2"
        />
        <text x="192" y="305" fontSize="10" fill="#5B21B6" textAnchor="middle" fontWeight="700">
          Nervous
        </text>
        <text x="192" y="320" fontSize="10" fill="#5B21B6" textAnchor="middle" fontWeight="700">
          System
        </text>
        <path
          d="M175 330 L192 340 L209 330"
          stroke="#8B5CF6"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      <g
      >
        <rect
          x="260"
          y="280"
          width="95"
          height="60"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="260"
          y="280"
          width="95"
          height="60"
          rx="12"
          fill="#FDF2F8"
          fillOpacity="0.8"
          stroke="#EC4899"
          strokeWidth="2"
        />
        <text x="307" y="305" fontSize="10" fill="#9D174D" textAnchor="middle" fontWeight="700">
          Endocrine
        </text>
        <text x="307" y="320" fontSize="10" fill="#9D174D" textAnchor="middle" fontWeight="700">
          System
        </text>
        <circle cx="307" cy="332" r="6" fill="#F472B6" />
      </g>

      <g
      >
        <rect
          x="160"
          y="350"
          width="180"
          height="36"
          rx="18"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="160"
          y="350"
          width="180"
          height="36"
          rx="18"
          fill="#FEF2F2"
          stroke="#DC2626"
          strokeWidth="2"
        />
        <text x="250" y="374" fontSize="13" fill="#DC2626" textAnchor="middle" fontWeight="700">
          18-20 Questions in NEET
        </text>
      </g>
    </Wrapper>
  )
}
