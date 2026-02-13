'use client'

import type { IllustrationProps } from './shared'

export function ExcretorySystemIllustration({ className = '', animate = true }: IllustrationProps) {
    const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  return (
    <svg
      viewBox="0 0 700 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="excBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        {/* Kidney gradients */}
        <linearGradient id="kidneyOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="cortexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <linearGradient id="medullaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="pelvisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Nephron part gradients */}
        <linearGradient id="glomerulusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="bowmanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="pctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="lohDescGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
        <linearGradient id="lohAscGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="dctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
        <linearGradient id="collectingDuctGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Urine/filtrate gradient */}
        <linearGradient id="urineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#FACC15" />
        </linearGradient>

        {/* Card gradient */}
        <linearGradient id="excCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFBEB" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="excShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="kidneyShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.2" />
        </filter>
        <filter id="nephronGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#excBgGrad)" rx="16" />

      {/* Decorative background elements */}
      <circle cx="90" cy="85" r="125" fill="#F59E0B" opacity="0.05" />
      <circle cx="610" cy="435" r="150" fill="#8B5CF6" opacity="0.04" />
      <circle cx="350" cy="260" r="225" fill="#DC2626" opacity="0.03" />

      {/* Title */}
      <text
        x="350"
        y="30"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="18"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        Excretory System - Kidney & Nephron
      </text>

      {/* KIDNEY CROSS-SECTION - Left side */}
      <g
      >
        <g transform="translate(25, 50)">
          {/* Kidney outline - bean shape */}
          <path
            d="M90 20 Q140 10 160 40 Q185 80 180 140 Q175 200 140 230 Q100 255 60 230 Q25 200 20 140 Q15 80 40 45 Q60 15 90 20 Z"
            fill="url(#kidneyOuterGrad)"
            filter="url(#kidneyShadow)"
          />

          {/* Cortex (outer layer) */}
          <path
            d="M90 30 Q130 22 150 48 Q170 82 167 135 Q164 185 135 212 Q100 235 68 215 Q40 192 35 140 Q30 90 50 55 Q68 28 90 30 Z"
            fill="url(#cortexGrad)"
          />

          {/* Medulla (pyramids) */}
          <g>
            <path d="M60 80 L85 160 L110 80 Z" fill="url(#medullaGrad)" opacity="0.9" />
            <path d="M95 75 L115 145 L135 75 Z" fill="url(#medullaGrad)" opacity="0.9" />
            <path d="M120 85 L140 155 L155 85 Z" fill="url(#medullaGrad)" opacity="0.9" />
          </g>

          {/* Pelvis (center) */}
          <path
            d="M85 160 Q95 180 115 180 Q135 180 145 160 Q155 145 140 135 Q110 125 90 135 Q75 145 85 160 Z"
            fill="url(#pelvisGrad)"
          />

          {/* Hilum area */}
          <ellipse cx="50" cy="130" rx="15" ry="30" fill="#78350F" />

          {/* Renal artery */}
          <path
            d="M10 115 Q30 115 45 120"
            stroke="#DC2626"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          <text x="5" y="105" fill="#B91C1C" fontSize="6" fontWeight="500">
            Renal Artery
          </text>

          {/* Renal vein */}
          <path
            d="M45 140 Q30 140 10 145"
            stroke="#3B82F6"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <text x="5" y="158" fill="#2563EB" fontSize="6" fontWeight="500">
            Renal Vein
          </text>

          {/* Ureter */}
          <path
            d="M100 185 Q100 210 95 240"
            stroke="url(#urineGrad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="5 3"
          />
          <text x="110" y="225" fill="#B45309" fontSize="6" fontWeight="500">
            Ureter
          </text>

          {/* Labels */}
          <g>
            <line x1="140" y1="50" x2="170" y2="35" stroke="#64748B" strokeWidth="1" />
            <text x="172" y="38" fill="#DC2626" fontSize="6" fontWeight="600">
              Cortex
            </text>

            <line x1="135" y1="110" x2="175" y2="100" stroke="#64748B" strokeWidth="1" />
            <text x="177" y="103" fill="#EA580C" fontSize="6" fontWeight="600">
              Medulla
            </text>

            <line x1="115" y1="170" x2="155" y2="185" stroke="#64748B" strokeWidth="1" />
            <text x="157" y="188" fill="#D97706" fontSize="6" fontWeight="600">
              Pelvis
            </text>
          </g>

          <text x="100" y="260" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
            Kidney Cross-Section
          </text>
        </g>
      </g>

      {/* NEPHRON DIAGRAM - Center */}
      <g
      >
        <g transform="translate(240, 50)">
          {/* Nephron background card */}
          <rect
            x="0"
            y="0"
            width="210"
            height="310"
            rx="14"
            fill="url(#excCardGrad)"
            filter="url(#excShadow)"
          />
          <text x="105" y="22" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="700">
            Nephron Structure
          </text>

          {/* Afferent arteriole */}
          <path
            d="M25 55 Q35 50 45 55"
            stroke="#DC2626"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="3 2"
          />
          <text x="20" y="48" fill="#DC2626" fontSize="5">
            Afferent
          </text>

          {/* Glomerulus */}
          <g
          >
            <circle cx="60" cy="55" r="15" fill="url(#glomerulusGrad)" filter="url(#nephronGlow)" />
            {/* Capillary loops inside */}
            <path
              d="M52 50 Q55 45 60 48 Q65 45 68 50"
              stroke="#FCA5A5"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M52 58 Q55 62 60 58 Q65 62 68 58"
              stroke="#FCA5A5"
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* Bowman's capsule */}
          <path
            d="M40 55 Q40 35 60 30 Q80 35 80 55 Q80 75 60 80 Q40 75 40 55"
            stroke="url(#bowmanGrad)"
            strokeWidth="3"
            fill="none"
          />
          <text x="60" y="95" textAnchor="middle" fill="#2563EB" fontSize="6" fontWeight="500">
            Bowman&apos;s Capsule
          </text>

          {/* Efferent arteriole */}
          <path
            d="M75 55 Q85 50 95 55"
            stroke="#B91C1C"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="3 2"
          />
          <text x="100" y="48" fill="#B91C1C" fontSize="5">
            Efferent
          </text>

          {/* PCT */}
          <path
            d="M65 80 Q90 85 100 100 Q110 115 100 130"
            stroke="url(#pctGrad)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <text x="115" y="110" fill="#7C3AED" fontSize="6" fontWeight="600">
            PCT
          </text>

          {/* Loop of Henle - Descending */}
          <path
            d="M100 130 Q95 150 90 180 Q85 210 90 225"
            stroke="url(#lohDescGrad)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          <text x="70" y="180" fill="#0891B2" fontSize="5" fontWeight="500">
            Desc.
          </text>

          {/* Loop of Henle - Hairpin turn */}
          <path
            d="M90 225 Q100 235 110 225"
            stroke="#06B6D4"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Loop of Henle - Ascending */}
          <path
            d="M110 225 Q115 210 120 180 Q125 150 130 130"
            stroke="url(#lohAscGrad)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          <text x="135" y="180" fill="#0D9488" fontSize="5" fontWeight="500">
            Asc.
          </text>

          {/* DCT */}
          <path
            d="M130 130 Q140 115 150 105 Q160 95 155 80 Q150 65 135 60"
            stroke="url(#dctGrad)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <text x="155" y="75" fill="#DB2777" fontSize="6" fontWeight="600">
            DCT
          </text>

          {/* Collecting Duct */}
          <path
            d="M135 60 Q145 70 150 90 Q155 120 155 160 Q155 200 155 240"
            stroke="url(#collectingDuctGrad)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="5 3"
          />
          <text x="165" y="150" fill="#D97706" fontSize="5" fontWeight="600">
            Collecting
          </text>
          <text x="165" y="160" fill="#D97706" fontSize="5" fontWeight="600">
            Duct
          </text>

          {/* Urine droplet at bottom */}
          <ellipse
            cx="155"
            cy="248"
            rx="5"
            ry="7"
            fill="url(#urineGrad)"
          />
        </g>
      </g>

      {/* URINE FORMATION PROCESS - Right Top */}
      <g
      >
        <g transform="translate(470, 50)">
          <rect
            x="0"
            y="0"
            width="210"
            height="160"
            rx="14"
            fill="url(#excCardGrad)"
            filter="url(#excShadow)"
          />
          <text x="105" y="22" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
            Urine Formation
          </text>

          {/* Step 1: Filtration */}
          <g
          >
            <circle cx="30" cy="50" r="15" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
            <text x="30" y="55" textAnchor="middle" fill="#DC2626" fontSize="10" fontWeight="bold">
              1
            </text>
          </g>
          <text x="55" y="47" fill="#1E293B" fontSize="9" fontWeight="600">
            Glomerular
          </text>
          <text x="55" y="60" fill="#64748B" fontSize="7">
            Filtration
          </text>

          {/* Step 2: Reabsorption */}
          <g
          >
            <circle cx="30" cy="90" r="15" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
            <text x="30" y="95" textAnchor="middle" fill="#7C3AED" fontSize="10" fontWeight="bold">
              2
            </text>
          </g>
          <text x="55" y="87" fill="#1E293B" fontSize="9" fontWeight="600">
            Tubular
          </text>
          <text x="55" y="100" fill="#64748B" fontSize="7">
            Reabsorption
          </text>

          {/* Step 3: Secretion */}
          <g
          >
            <circle cx="30" cy="130" r="15" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
            <text x="30" y="135" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">
              3
            </text>
          </g>
          <text x="55" y="127" fill="#1E293B" fontSize="9" fontWeight="600">
            Tubular
          </text>
          <text x="55" y="140" fill="#64748B" fontSize="7">
            Secretion
          </text>

          {/* Arrow indicating flow */}
          <path
            d="M175 50 L175 135"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeDasharray="4"
            markerEnd="url(#excArrow)"
          />
          <text x="182" y="92" fill="#64748B" fontSize="6" transform="rotate(90 182 92)">
            Flow
          </text>
          <defs>
            <marker
              id="excArrow"
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#94A3B8" />
            </marker>
          </defs>
        </g>
      </g>

      {/* GFR & KEY STATS - Right Middle */}
      <g
      >
        <g transform="translate(470, 225)">
          <rect
            x="0"
            y="0"
            width="210"
            height="135"
            rx="14"
            fill="url(#excCardGrad)"
            filter="url(#excShadow)"
          />
          <text x="105" y="22" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
            Key Numbers
          </text>

          {/* GFR */}
          <g transform="translate(15, 35)">
            <rect x="0" y="0" width="180" height="26" rx="6" fill="#DBEAFE" />
            <text x="12" y="17" fill="#1D4ED8" fontSize="9" fontWeight="600">
              GFR:
            </text>
            <text
              x="100"
              y="17"
              fill="#1E40AF"
              fontSize="10"
              fontWeight="bold"
            >
              125 mL/min
            </text>
          </g>

          {/* Daily Filtrate */}
          <g transform="translate(15, 68)">
            <rect x="0" y="0" width="180" height="26" rx="6" fill="#FEF3C7" />
            <text x="12" y="17" fill="#B45309" fontSize="9" fontWeight="600">
              Daily Filtrate:
            </text>
            <text x="115" y="17" fill="#92400E" fontSize="10" fontWeight="bold">
              180 L
            </text>
          </g>

          {/* Urine Output */}
          <g transform="translate(15, 101)">
            <rect x="0" y="0" width="180" height="26" rx="6" fill="#DCFCE7" />
            <text x="12" y="17" fill="#166534" fontSize="9" fontWeight="600">
              Urine Output:
            </text>
            <text x="115" y="17" fill="#15803D" fontSize="10" fontWeight="bold">
              1.5 L/day
            </text>
          </g>
        </g>
      </g>

      {/* HORMONAL REGULATION - Bottom Left */}
      <g
      >
        <g transform="translate(25, 375)">
          <rect
            x="0"
            y="0"
            width="210"
            height="130"
            rx="14"
            fill="url(#excCardGrad)"
            filter="url(#excShadow)"
          />
          <text x="105" y="22" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
            Hormonal Regulation
          </text>

          {/* ADH */}
          <g transform="translate(15, 35)">
            <circle
              cx="18"
              cy="16"
              r="14"
              fill="#3B82F6"
            />
            <text x="18" y="20" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
              ADH
            </text>
            <text x="42" y="13" fill="#1E293B" fontSize="8" fontWeight="600">
              Antidiuretic Hormone
            </text>
            <text x="42" y="25" fill="#64748B" fontSize="6">
              ↑ Water reabsorption
            </text>
          </g>

          {/* Aldosterone */}
          <g transform="translate(15, 68)">
            <circle
              cx="18"
              cy="16"
              r="14"
              fill="#F59E0B"
            />
            <text x="18" y="20" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
              ALD
            </text>
            <text x="42" y="13" fill="#1E293B" fontSize="8" fontWeight="600">
              Aldosterone
            </text>
            <text x="42" y="25" fill="#64748B" fontSize="6">
              ↑ Na⁺ reabsorption
            </text>
          </g>

          {/* ANP */}
          <g transform="translate(15, 101)">
            <circle
              cx="18"
              cy="16"
              r="14"
              fill="#10B981"
            />
            <text x="18" y="20" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
              ANP
            </text>
            <text x="42" y="13" fill="#1E293B" fontSize="8" fontWeight="600">
              Atrial Natriuretic Peptide
            </text>
            <text x="42" y="25" fill="#64748B" fontSize="6">
              ↑ Na⁺ excretion
            </text>
          </g>
        </g>
      </g>

      {/* TYPES OF ANIMALS - Bottom Center */}
      <g
      >
        <g transform="translate(250, 375)">
          <rect
            x="0"
            y="0"
            width="205"
            height="130"
            rx="14"
            fill="url(#excCardGrad)"
            filter="url(#excShadow)"
          />
          <text x="102" y="22" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
            Nitrogenous Waste Types
          </text>

          {/* Ammonotelic */}
          <g transform="translate(12, 35)">
            <rect
              x="0"
              y="0"
              width="180"
              height="28"
              rx="6"
              fill="#DBEAFE"
              stroke="#3B82F6"
              strokeWidth="1.5"
            />
            <text x="12" y="12" fill="#1D4ED8" fontSize="8" fontWeight="600">
              Ammonotelic
            </text>
            <text x="12" y="24" fill="#64748B" fontSize="6">
              Ammonia • Fish, Aquatic
            </text>
          </g>

          {/* Ureotelic */}
          <g transform="translate(12, 68)">
            <rect
              x="0"
              y="0"
              width="180"
              height="28"
              rx="6"
              fill="#FEF3C7"
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            <text x="12" y="12" fill="#B45309" fontSize="8" fontWeight="600">
              Ureotelic
            </text>
            <text x="12" y="24" fill="#64748B" fontSize="6">
              Urea • Mammals, Humans
            </text>
          </g>

          {/* Uricotelic */}
          <g transform="translate(12, 101)">
            <rect
              x="0"
              y="0"
              width="180"
              height="28"
              rx="6"
              fill="#F3E8FF"
              stroke="#8B5CF6"
              strokeWidth="1.5"
            />
            <text x="12" y="12" fill="#6D28D9" fontSize="8" fontWeight="600">
              Uricotelic
            </text>
            <text x="12" y="24" fill="#64748B" fontSize="6">
              Uric Acid • Birds, Reptiles
            </text>
          </g>
        </g>
      </g>

      {/* COUNTERCURRENT INFO - Bottom Right */}
      <g
      >
        <g transform="translate(470, 375)">
          <rect
            x="0"
            y="0"
            width="210"
            height="130"
            rx="14"
            fill="url(#excCardGrad)"
            filter="url(#excShadow)"
          />
          <text x="105" y="22" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
            Countercurrent
          </text>

          {/* Osmolarity gradient visualization */}
          <g transform="translate(18, 35)">
            <rect x="0" y="0" width="175" height="85" rx="6" fill="#F1F5F9" />

            {/* Gradient bars */}
            <rect x="12" y="10" width="28" height="14" rx="2" fill="#BFDBFE" />
            <text x="48" y="21" fill="#64748B" fontSize="7">
              300 mOsm/L
            </text>
            <text x="125" y="21" fill="#94A3B8" fontSize="6">
              Cortex
            </text>

            <rect x="12" y="30" width="50" height="14" rx="2" fill="#93C5FD" />
            <text x="70" y="41" fill="#64748B" fontSize="7">
              600 mOsm/L
            </text>

            <rect x="12" y="50" width="78" height="14" rx="2" fill="#60A5FA" />
            <text x="98" y="61" fill="#64748B" fontSize="7">
              900 mOsm/L
            </text>

            <rect x="12" y="70" width="110" height="10" rx="2" fill="#3B82F6" />
            <text x="130" y="78" fill="#1E40AF" fontSize="7" fontWeight="bold">
              1200
            </text>
            <text x="125" y="88" fill="#94A3B8" fontSize="6">
              Medulla
            </text>
          </g>
        </g>
      </g>
    </svg>
  )
}
