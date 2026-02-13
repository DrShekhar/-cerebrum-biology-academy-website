'use client'

import type { IllustrationProps } from './shared'

export function RespirationIllustration({ className = '', animate = true }: IllustrationProps) {
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
      viewBox="0 0 700 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="respBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="50%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#ECFEFF" />
        </linearGradient>

        {/* Lung gradients */}
        <linearGradient id="lungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <radialGradient id="lungInnerGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FBCFE8" />
          <stop offset="100%" stopColor="#F9A8D4" />
        </radialGradient>

        {/* Trachea/Bronchi gradient */}
        <linearGradient id="tracheaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>

        {/* Alveoli gradient */}
        <radialGradient id="alveoliGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF2F8" />
          <stop offset="70%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#FBCFE8" />
        </radialGradient>

        {/* Oxygen gradient - Blue */}
        <linearGradient id="oxygenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        {/* CO2 gradient - Gray/Purple */}
        <linearGradient id="co2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Blood vessel gradients */}
        <linearGradient id="arteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Hemoglobin gradient */}
        <linearGradient id="hbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>

        {/* Card gradient */}
        <linearGradient id="respCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="respShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="organShadow2" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.2" />
        </filter>
        <filter id="gasGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#respBgGrad)" rx="16" />

      {/* Decorative background elements */}
      <circle cx="100" cy="100" r="150" fill="#3B82F6" opacity="0.04" />
      <circle cx="600" cy="420" r="130" fill="#EC4899" opacity="0.04" />
      <circle cx="350" cy="260" r="220" fill="#8B5CF6" opacity="0.03" />

      {/* Title */}
      <motion.text
        x="350"
        y="32"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="18"
        fontWeight="700"
      >
        Breathing & Gas Exchange
      </motion.text>

      {/* RESPIRATORY SYSTEM - Left side */}
      <motion.g
      >
        {/* Nose/Nasal Cavity */}
        <g transform="translate(100, 50)">
          <path
            d="M38 0 Q25 8 18 28 Q14 48 25 60 L50 60 Q62 48 58 28 Q50 8 38 0 Z"
            fill="#FDA4AF"
            filter="url(#organShadow2)"
          />
          <text x="38" y="78" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="500">
            Nose
          </text>
        </g>

        {/* Pharynx & Larynx */}
        <path
          d="M138 110 L138 135 Q138 148 132 155 L132 168"
          stroke="url(#tracheaGrad)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <text x="165" y="135" fill="#64748B" fontSize="8">
          Pharynx
        </text>
        <text x="165" y="162" fill="#64748B" fontSize="8">
          Larynx
        </text>

        {/* Trachea with cartilage rings */}
        <g transform="translate(115, 168)">
          <rect
            x="5"
            y="0"
            width="26"
            height="65"
            rx="4"
            fill="url(#tracheaGrad)"
            filter="url(#organShadow2)"
          />
          {/* Cartilage rings */}
          <rect x="2" y="8" width="32" height="5" rx="2" fill="#FCA5A5" />
          <rect x="2" y="20" width="32" height="5" rx="2" fill="#FCA5A5" />
          <rect x="2" y="32" width="32" height="5" rx="2" fill="#FCA5A5" />
          <rect x="2" y="44" width="32" height="5" rx="2" fill="#FCA5A5" />
          <text x="45" y="38" fill="#64748B" fontSize="9" fontWeight="500">
            Trachea
          </text>
        </g>

        {/* Bronchi bifurcation */}
        <g transform="translate(70, 232)">
          {/* Left bronchus */}
          <path
            d="M68 0 Q48 20 28 48"
            stroke="url(#tracheaGrad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right bronchus */}
          <path
            d="M68 0 Q88 20 108 48"
            stroke="url(#tracheaGrad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <text x="68" y="-8" textAnchor="middle" fill="#64748B" fontSize="8">
            Bronchi
          </text>
        </g>

        {/* Left Lung - Realistic anatomical shape with 2 lobes */}
        <motion.g
          style={{ transformOrigin: '75px 360px' }}
        >
          {/* Left lung outer shape - 2 lobes, cardiac notch */}
          <path
            d="M115 275
               C102 280 90 290 82 305
               Q68 325 62 355
               Q55 390 62 420
               Q70 450 85 465
               Q100 480 115 484
               Q130 488 138 480
               L138 435
               Q134 420 130 405
               Q122 385 126 365
               Q130 345 138 330
               L138 295
               Q130 282 115 275 Z"
            fill="url(#lungGrad)"
            filter="url(#organShadow2)"
          />
          {/* Left lung upper lobe highlight */}
          <path
            d="M108 288 Q95 302 88 325 Q80 355 88 375 Q96 362 105 345 Q112 320 115 300 Q115 292 108 288 Z"
            fill="url(#lungInnerGrad)"
            opacity="0.7"
          />
          {/* Left lung lower lobe highlight */}
          <path
            d="M88 395 Q80 418 84 445 Q90 465 105 475 Q120 480 130 470 Q130 450 122 420 Q112 400 98 395 Z"
            fill="url(#lungInnerGrad)"
            opacity="0.7"
          />
          {/* Horizontal fissure line */}
          <path
            d="M68 380 Q95 372 132 380"
            stroke="#DB2777"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4,3"
          />
          {/* Bronchiole tree */}
          <path d="M115 282 Q102 315 95 355" stroke="#F9A8D4" strokeWidth="3" fill="none" />
          <path d="M95 355 Q82 378 75 410" stroke="#F9A8D4" strokeWidth="2.5" fill="none" />
          <path d="M95 355 Q105 385 112 420" stroke="#F9A8D4" strokeWidth="2.5" fill="none" />
          <path d="M75 410 Q65 435 62 460" stroke="#F9A8D4" strokeWidth="2" fill="none" />
          <path d="M75 410 Q82 440 90 465" stroke="#F9A8D4" strokeWidth="2" fill="none" />
          <path d="M112 420 Q120 448 115 472" stroke="#F9A8D4" strokeWidth="2" fill="none" />
          {/* Alveoli clusters (small circles) */}
          <circle cx="62" cy="465" r="4" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
          <circle cx="75" cy="472" r="3.5" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
          <circle cx="92" cy="475" r="4" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
          <circle cx="112" cy="478" r="3.5" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
          <circle cx="80" cy="455" r="3" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
        </motion.g>

        {/* Right Lung - Realistic anatomical shape with 3 lobes */}
        <motion.g
          style={{ transformOrigin: '210px 360px' }}
        >
          {/* Right lung outer shape - 3 lobes, larger */}
          <path
            d="M155 275
               C170 280 185 290 200 305
               Q222 325 235 355
               Q248 390 242 425
               Q235 455 218 470
               Q195 485 172 482
               Q152 478 145 465
               Q138 445 142 410
               Q148 375 155 340
               Q162 305 155 275 Z"
            fill="url(#lungGrad)"
            filter="url(#organShadow2)"
          />
          {/* Right lung upper lobe highlight */}
          <path
            d="M168 290 Q185 305 200 325 Q210 345 202 362 Q188 355 175 335 Q165 315 168 290 Z"
            fill="url(#lungInnerGrad)"
            opacity="0.7"
          />
          {/* Right lung middle lobe highlight */}
          <path
            d="M208 378 Q222 392 230 415 Q230 432 218 440 Q202 428 198 408 Q198 388 208 378 Z"
            fill="url(#lungInnerGrad)"
            opacity="0.7"
          />
          {/* Right lung lower lobe highlight */}
          <path
            d="M172 445 Q188 458 208 472 Q200 482 185 482 Q162 475 152 458 Q158 448 172 445 Z"
            fill="url(#lungInnerGrad)"
            opacity="0.7"
          />
          {/* Horizontal fissure (upper) */}
          <path
            d="M152 360 Q185 352 228 365"
            stroke="#DB2777"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4,3"
          />
          {/* Oblique fissure (lower) */}
          <path
            d="M158 435 Q195 420 235 442"
            stroke="#DB2777"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4,3"
          />
          {/* Bronchiole tree */}
          <path d="M155 282 Q178 315 192 355" stroke="#F9A8D4" strokeWidth="3" fill="none" />
          <path d="M192 355 Q208 378 220 410" stroke="#F9A8D4" strokeWidth="2.5" fill="none" />
          <path d="M192 355 Q182 385 175 420" stroke="#F9A8D4" strokeWidth="2.5" fill="none" />
          <path d="M220 410 Q230 438 222 465" stroke="#F9A8D4" strokeWidth="2" fill="none" />
          <path d="M220 410 Q205 438 198 470" stroke="#F9A8D4" strokeWidth="2" fill="none" />
          <path d="M175 420 Q162 448 155 472" stroke="#F9A8D4" strokeWidth="2" fill="none" />
          {/* Alveoli clusters */}
          <circle cx="222" cy="470" r="4" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
          <circle cx="200" cy="478" r="3.5" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
          <circle cx="175" cy="478" r="4" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
          <circle cx="155" cy="472" r="3.5" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
          <circle cx="212" cy="455" r="3" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
          <circle cx="165" cy="462" r="3" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="0.8" />
        </motion.g>

        {/* Labels */}
        <text x="90" y="500" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">
          Left Lung
        </text>
        <text x="195" y="500" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">
          Right Lung
        </text>
      </motion.g>

      {/* ALVEOLUS DETAIL - Center/Right */}
      <motion.g
      >
        <g transform="translate(290, 50)">
          <rect
            x="0"
            y="0"
            width="390"
            height="200"
            rx="14"
            fill="url(#respCardGrad)"
            filter="url(#respShadow)"
          />
          <text x="195" y="24" textAnchor="middle" fill="#BE185D" fontSize="13" fontWeight="700">
            Gas Exchange at Alveolus
          </text>

          {/* Alveolus structure */}
          <g transform="translate(25, 38)">
            {/* Alveolus bubble */}
            <circle
              cx="85"
              cy="75"
              r="65"
              fill="url(#alveoliGrad)"
              stroke="#F9A8D4"
              strokeWidth="2.5"
            />
            <text x="85" y="72" textAnchor="middle" fill="#BE185D" fontSize="10" fontWeight="600">
              Alveolus
            </text>
            <text x="85" y="88" textAnchor="middle" fill="#9D174D" fontSize="8">
              (Air space)
            </text>

            {/* Capillary wrapping around */}
            <path
              d="M25 45 Q10 75 25 110 Q40 130 65 135 Q105 142 135 122 Q155 100 155 75 Q155 50 135 35"
              stroke="url(#arteryGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />

            {/* O2 molecules moving in */}
            <motion.g
            >
              <circle cx="55" cy="52" r="7" fill="url(#oxygenGrad)" filter="url(#gasGlow)" />
              <text x="55" y="56" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
                O₂
              </text>
            </motion.g>
            <motion.g
            >
              <circle cx="70" cy="40" r="7" fill="url(#oxygenGrad)" filter="url(#gasGlow)" />
              <text x="70" y="44" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
                O₂
              </text>
            </motion.g>

            {/* CO2 molecules moving out */}
            <motion.g
            >
              <circle cx="115" cy="100" r="7" fill="url(#co2Grad)" filter="url(#gasGlow)" />
              <text x="115" y="104" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">
                CO₂
              </text>
            </motion.g>
            <motion.g
            >
              <circle cx="100" cy="115" r="7" fill="url(#co2Grad)" filter="url(#gasGlow)" />
              <text x="100" y="119" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">
                CO₂
              </text>
            </motion.g>

            {/* Arrows showing diffusion */}
            <path d="M42 62 L28 70" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
            <path
              d="M128 95 L145 88"
              stroke="#8B5CF6"
              strokeWidth="2"
              markerEnd="url(#arrowPurple)"
            />
            <defs>
              <marker
                id="arrowBlue"
                markerWidth="5"
                markerHeight="5"
                refX="4"
                refY="2.5"
                orient="auto"
              >
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#3B82F6" />
              </marker>
              <marker
                id="arrowPurple"
                markerWidth="5"
                markerHeight="5"
                refX="4"
                refY="2.5"
                orient="auto"
              >
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#8B5CF6" />
              </marker>
            </defs>
          </g>

          {/* Legend */}
          <g transform="translate(210, 45)">
            <circle cx="12" cy="10" r="8" fill="url(#oxygenGrad)" />
            <text x="28" y="14" fill="#1E293B" fontSize="9" fontWeight="500">
              O₂ (into blood)
            </text>

            <circle cx="12" cy="38" r="8" fill="url(#co2Grad)" />
            <text x="28" y="42" fill="#1E293B" fontSize="9" fontWeight="500">
              CO₂ (into alveolus)
            </text>

            <rect x="4" y="56" width="16" height="10" rx="3" fill="url(#arteryGrad)" />
            <text x="28" y="64" fill="#1E293B" fontSize="9" fontWeight="500">
              Capillary
            </text>

            <text x="0" y="92" fill="#64748B" fontSize="8" fontWeight="600">
              Diffusion Distance:
            </text>
            <text x="0" y="106" fill="#64748B" fontSize="8">
              0.2 μm (very thin!)
            </text>

            <text x="0" y="130" fill="#64748B" fontSize="8" fontWeight="600">
              Surface Area:
            </text>
            <text x="0" y="144" fill="#64748B" fontSize="8">
              ~70-100 m² (tennis court)
            </text>
          </g>
        </g>
      </motion.g>

      {/* OXYGEN TRANSPORT - Right side */}
      <motion.g
      >
        <g transform="translate(290, 265)">
          <rect
            x="0"
            y="0"
            width="390"
            height="115"
            rx="14"
            fill="url(#respCardGrad)"
            filter="url(#respShadow)"
          />
          <text x="195" y="22" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="700">
            O₂ Transport in Blood
          </text>

          {/* Hemoglobin illustration */}
          <g transform="translate(20, 35)">
            {/* RBC shape */}
            <ellipse
              cx="50"
              cy="38"
              rx="40"
              ry="24"
              fill="url(#hbGrad)"
              filter="url(#organShadow2)"
            />
            <ellipse cx="50" cy="38" rx="16" ry="10" fill="#FCA5A5" />

            {/* O2 binding sites */}
            <motion.circle
              cx="24"
              cy="32"
              r="6"
              fill="url(#oxygenGrad)"
            />
            <motion.circle
              cx="42"
              cy="22"
              r="6"
              fill="url(#oxygenGrad)"
            />
            <motion.circle
              cx="62"
              cy="22"
              r="6"
              fill="url(#oxygenGrad)"
            />
            <motion.circle
              cx="76"
              cy="35"
              r="6"
              fill="url(#oxygenGrad)"
            />

            <text x="50" y="75" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
              Hemoglobin (Hb)
            </text>
          </g>

          {/* Transport percentages */}
          <g transform="translate(130, 35)">
            <text x="0" y="10" fill="#1E293B" fontSize="10" fontWeight="600">
              O₂ Transport:
            </text>
            <rect x="0" y="18" width="230" height="14" rx="4" fill="#E2E8F0" />
            <rect x="0" y="18" width="220" height="14" rx="4" fill="url(#oxygenGrad)" />
            <text x="100" y="29" fill="white" fontSize="8" fontWeight="bold">
              97% as Oxyhemoglobin
            </text>
            <text x="238" y="29" fill="#64748B" fontSize="7">
              3% dissolved
            </text>

            <text x="0" y="55" fill="#1E293B" fontSize="10" fontWeight="600">
              CO₂ Transport:
            </text>
            <rect x="0" y="63" width="230" height="14" rx="4" fill="#E2E8F0" />
            <rect x="0" y="63" width="160" height="14" rx="4" fill="url(#co2Grad)" />
            <text x="70" y="74" fill="white" fontSize="8" fontWeight="bold">
              70% as HCO₃⁻
            </text>
            <text x="170" y="74" fill="#64748B" fontSize="7">
              23% Hb, 7% dissolved
            </text>
          </g>
        </g>
      </motion.g>

      {/* LUNG VOLUMES - Bottom Right */}
      <motion.g
      >
        <g transform="translate(290, 395)">
          <rect
            x="0"
            y="0"
            width="390"
            height="108"
            rx="14"
            fill="url(#respCardGrad)"
            filter="url(#respShadow)"
          />
          <text x="195" y="22" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="700">
            Lung Volumes & Capacities
          </text>

          {/* Volume bars */}
          <g transform="translate(20, 35)">
            <text x="0" y="12" fill="#64748B" fontSize="9" fontWeight="500">
              TV (Tidal Volume)
            </text>
            <rect x="110" y="4" width="65" height="14" rx="3" fill="#3B82F6" />
            <text x="185" y="14" fill="#64748B" fontSize="8">
              ~500 mL
            </text>

            <text x="0" y="32" fill="#64748B" fontSize="9" fontWeight="500">
              IRV
            </text>
            <rect x="110" y="24" width="130" height="14" rx="3" fill="#60A5FA" />
            <text x="250" y="34" fill="#64748B" fontSize="8">
              ~3000 mL
            </text>

            <text x="0" y="52" fill="#64748B" fontSize="9" fontWeight="500">
              ERV
            </text>
            <rect x="110" y="44" width="58" height="14" rx="3" fill="#93C5FD" />
            <text x="178" y="54" fill="#64748B" fontSize="8">
              ~1100 mL
            </text>

            <text x="0" y="72" fill="#64748B" fontSize="9" fontWeight="500">
              RV (Residual)
            </text>
            <rect x="110" y="64" width="65" height="14" rx="3" fill="#BFDBFE" />
            <text x="185" y="74" fill="#64748B" fontSize="8">
              ~1200 mL
            </text>
          </g>

          {/* Vital Capacity */}
          <g transform="translate(285, 38)">
            <text x="0" y="0" fill="#1E293B" fontSize="9" fontWeight="600">
              Vital Capacity
            </text>
            <text x="0" y="16" fill="#0369A1" fontSize="12" fontWeight="700">
              ~4600 mL
            </text>
            <text x="0" y="32" fill="#64748B" fontSize="8">
              (IRV+TV+ERV)
            </text>
            <text x="0" y="50" fill="#1E293B" fontSize="9" fontWeight="600">
              Total Lung
            </text>
            <text x="0" y="66" fill="#0369A1" fontSize="12" fontWeight="700">
              ~5800 mL
            </text>
          </g>
        </g>
      </motion.g>
    </Wrapper>
  )
}
