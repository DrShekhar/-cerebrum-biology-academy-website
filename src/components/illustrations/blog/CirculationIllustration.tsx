'use client'

import type { IllustrationProps } from './shared'

export function CirculationIllustration({ className = '', animate = true }: IllustrationProps) {
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
        <linearGradient id="circBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF2F2" />
          <stop offset="50%" stopColor="#FFF1F2" />
          <stop offset="100%" stopColor="#FCE7F3" />
        </linearGradient>

        {/* Heart gradients */}
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <radialGradient id="heartInnerGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#EF4444" />
        </radialGradient>

        {/* Chamber colors */}
        <linearGradient id="atriumRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="ventricleRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="atriumLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="ventricleLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>

        {/* Blood vessel gradients */}
        <linearGradient id="arteryGradCirc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="pulmonaryArteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="pulmonaryVeinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        {/* RBC gradient */}
        <radialGradient id="rbcGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#DC2626" />
        </radialGradient>

        {/* ECG gradient */}
        <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>

        {/* Card gradient */}
        <linearGradient id="circCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FEF2F2" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="circShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="heartShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.25" />
        </filter>
        <filter id="vesselGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#circBgGrad)" rx="16" />

      {/* Decorative background elements */}
      <circle cx="100" cy="100" r="150" fill="#DC2626" opacity="0.03" />
      <circle cx="600" cy="430" r="125" fill="#3B82F6" opacity="0.03" />
      <circle cx="350" cy="260" r="220" fill="#EC4899" opacity="0.02" />

      {/* Title */}
      <text
        x="350"
        y="32"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="18"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        Human Heart & Circulatory System
      </text>

      {/* HEART DIAGRAM - Left side */}
      <g
      >
        <g transform="translate(30, 55)">
          {/* Heart outline */}
          <path
            d="M100 30 Q60 10 40 40 Q10 80 20 130 Q30 180 100 230 Q170 180 180 130 Q190 80 160 40 Q140 10 100 30 Z"
            fill="url(#heartGrad)"
            filter="url(#heartShadow)"
          />

          {/* Septum - vertical divider */}
          <line x1="100" y1="50" x2="100" y2="200" stroke="#7F1D1D" strokeWidth="3" />

          {/* Right Atrium (upper left in viewer's perspective) */}
          <path
            d="M40 55 Q35 50 50 45 Q65 40 80 48 Q90 55 90 75 L40 75 Q35 65 40 55 Z"
            fill="url(#atriumRightGrad)"
          />
          <text x="65" y="65" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
            RA
          </text>

          {/* Right Ventricle (lower left in viewer's perspective) */}
          <path
            d="M40 85 Q35 80 40 80 L90 80 L90 160 Q70 175 40 155 Q25 140 30 115 Q35 90 40 85 Z"
            fill="url(#ventricleRightGrad)"
          />
          <text x="58" y="125" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
            RV
          </text>

          {/* Left Atrium (upper right in viewer's perspective) */}
          <path
            d="M110 48 Q125 40 145 45 Q165 50 160 60 Q158 75 160 75 L110 75 Q110 60 110 48 Z"
            fill="url(#atriumLeftGrad)"
          />
          <text x="135" y="65" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
            LA
          </text>

          {/* Left Ventricle (lower right - thicker wall!) */}
          <path
            d="M110 80 L160 80 Q165 85 170 115 Q175 145 160 165 Q130 190 110 175 L110 80 Z"
            fill="url(#ventricleLeftGrad)"
          />
          <text x="138" y="130" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
            LV
          </text>

          {/* Superior Vena Cava */}
          <path
            d="M50 45 Q50 20 65 10 L75 10 Q75 20 75 35"
            stroke="url(#veinGrad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <text x="62" y="6" textAnchor="middle" fill="#2563EB" fontSize="6" fontWeight="500">
            SVC
          </text>

          {/* Inferior Vena Cava */}
          <path
            d="M55 85 Q40 100 35 130 L35 155"
            stroke="url(#veinGrad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <text x="22" y="145" fill="#2563EB" fontSize="6" fontWeight="500">
            IVC
          </text>

          {/* Pulmonary Artery */}
          <path
            d="M65 82 Q55 70 45 50 Q35 30 25 25"
            stroke="url(#pulmonaryArteryGrad)"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="5 3"
          />
          <text x="15" y="22" fill="#6366F1" fontSize="6" fontWeight="500">
            PA
          </text>

          {/* Pulmonary Veins */}
          <path
            d="M135 48 Q145 30 160 20 L175 20"
            stroke="url(#pulmonaryVeinGrad)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <text x="180" y="22" fill="#EC4899" fontSize="6" fontWeight="500">
            PV
          </text>

          {/* Aorta */}
          <path
            d="M135 82 Q155 60 165 40 Q175 25 190 20"
            stroke="url(#arteryGradCirc)"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="5 3"
          />
          <text x="192" y="15" fill="#DC2626" fontSize="7" fontWeight="600">
            Aorta
          </text>

          {/* Heartbeat animation - pulsing */}
          <circle
            cx="100"
            cy="120"
            r="8"
            fill="#EF4444"
            opacity="0.5"
          />

          {/* Labels */}
          <text x="100" y="250" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
            Human Heart (4-chambered)
          </text>
        </g>

        {/* Valve labels */}
        <g transform="translate(25, 45)">
          <circle cx="90" cy="78" r="3" fill="#FBBF24" />
          <text x="78" y="95" fill="#92400E" fontSize="5">
            Tricuspid
          </text>
          <circle cx="110" cy="78" r="3" fill="#FBBF24" />
          <text x="112" y="95" fill="#92400E" fontSize="5">
            Bicuspid
          </text>
        </g>
      </g>

      {/* DOUBLE CIRCULATION DIAGRAM */}
      <g
      >
        <g transform="translate(25, 370)">
          <rect
            x="0"
            y="0"
            width="265"
            height="130"
            rx="14"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="132" y="22" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
            Double Circulation
          </text>

          {/* Pulmonary Circuit */}
          <g transform="translate(18, 35)">
            <rect
              x="0"
              y="0"
              width="105"
              height="80"
              rx="10"
              fill="#EDE9FE"
              stroke="#8B5CF6"
              strokeWidth="1.5"
            />
            <text x="52" y="16" textAnchor="middle" fill="#6D28D9" fontSize="9" fontWeight="600">
              Pulmonary
            </text>
            <text x="52" y="30" textAnchor="middle" fill="#7C3AED" fontSize="8">
              Heart → Lungs
            </text>
            <text x="52" y="42" textAnchor="middle" fill="#7C3AED" fontSize="8">
              → Heart
            </text>
            {/* Small lung icon */}
            <ellipse cx="36" cy="60" rx="14" ry="12" fill="#F9A8D4" />
            <ellipse cx="68" cy="60" rx="14" ry="12" fill="#F9A8D4" />
            <text x="52" y="64" textAnchor="middle" fill="#BE185D" fontSize="6">
              O₂↔CO₂
            </text>
          </g>

          {/* Systemic Circuit */}
          <g transform="translate(142, 35)">
            <rect
              x="0"
              y="0"
              width="105"
              height="80"
              rx="10"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="1.5"
            />
            <text x="52" y="16" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="600">
              Systemic
            </text>
            <text x="52" y="30" textAnchor="middle" fill="#DC2626" fontSize="8">
              Heart → Body
            </text>
            <text x="52" y="42" textAnchor="middle" fill="#DC2626" fontSize="8">
              → Heart
            </text>
            {/* Body icon */}
            <circle cx="52" cy="60" r="12" fill="#FCA5A5" />
            <text x="52" y="64" textAnchor="middle" fill="#991B1B" fontSize="6">
              Body
            </text>
          </g>

          {/* Connection arrows */}
          <path
            d="M125 75 L140 75"
            stroke="#DC2626"
            strokeWidth="2.5"
            markerEnd="url(#circArrow)"
          />
          <defs>
            <marker
              id="circArrow"
              markerWidth="5"
              markerHeight="5"
              refX="4"
              refY="2.5"
              orient="auto"
            >
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#DC2626" />
            </marker>
          </defs>
        </g>
      </g>

      {/* BLOOD COMPOSITION - Right Top */}
      <g
      >
        <g transform="translate(315, 52)">
          <rect
            x="0"
            y="0"
            width="365"
            height="120"
            rx="14"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="182" y="22" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="700">
            Blood Composition
          </text>

          {/* Plasma - 55% */}
          <g transform="translate(18, 35)">
            <rect
              x="0"
              y="0"
              width="155"
              height="72"
              rx="10"
              fill="#FEF3C7"
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            <text x="77" y="16" textAnchor="middle" fill="#B45309" fontSize="10" fontWeight="600">
              Plasma (55%)
            </text>
            <text x="77" y="32" textAnchor="middle" fill="#92400E" fontSize="8">
              Water: 90-92%
            </text>
            <text x="77" y="46" textAnchor="middle" fill="#92400E" fontSize="8">
              Proteins: 6-8%
            </text>
            <text x="77" y="58" textAnchor="middle" fill="#92400E" fontSize="7">
              Albumin, Globulin, Fibrinogen
            </text>
          </g>

          {/* Formed Elements - 45% */}
          <g transform="translate(192, 35)">
            <rect
              x="0"
              y="0"
              width="155"
              height="72"
              rx="10"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="1.5"
            />
            <text x="77" y="16" textAnchor="middle" fill="#B91C1C" fontSize="10" fontWeight="600">
              Formed Elements (45%)
            </text>

            {/* RBC */}
            <ellipse
              cx="32"
              cy="42"
              rx="15"
              ry="8"
              fill="url(#rbcGrad)"
            />
            <text x="32" y="60" textAnchor="middle" fill="#991B1B" fontSize="7">
              RBC
            </text>

            {/* WBC */}
            <circle
              cx="77"
              cy="42"
              r="10"
              fill="#DBEAFE"
              stroke="#3B82F6"
              strokeWidth="1.5"
            />
            <text x="77" y="60" textAnchor="middle" fill="#1D4ED8" fontSize="7">
              WBC
            </text>

            {/* Platelets */}
            <g
            >
              <circle cx="118" cy="38" r="4" fill="#A78BFA" />
              <circle cx="126" cy="42" r="4" fill="#A78BFA" />
              <circle cx="122" cy="48" r="4" fill="#A78BFA" />
            </g>
            <text x="122" y="60" textAnchor="middle" fill="#6D28D9" fontSize="7">
              Platelets
            </text>
          </g>
        </g>
      </g>

      {/* CARDIAC CYCLE - Right Middle */}
      <g
      >
        <g transform="translate(315, 185)">
          <rect
            x="0"
            y="0"
            width="365"
            height="110"
            rx="14"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="182" y="22" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="700">
            Cardiac Cycle (0.8 sec)
          </text>

          {/* Timeline bar */}
          <g transform="translate(18, 38)">
            <rect x="0" y="0" width="330" height="16" rx="8" fill="#E2E8F0" />

            {/* Atrial Systole */}
            <rect
              x="0"
              y="0"
              width="42"
              height="16"
              rx="8"
              fill="#F59E0B"
            />
            <text x="21" y="12" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
              0.1s
            </text>

            {/* Ventricular Systole */}
            <rect
              x="42"
              y="0"
              width="124"
              height="16"
              rx="0"
              fill="#EF4444"
            />
            <text x="104" y="12" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
              0.3s
            </text>

            {/* Joint Diastole */}
            <rect
              x="166"
              y="0"
              width="164"
              height="16"
              rx="8"
              fill="#22C55E"
            />
            <text x="248" y="12" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
              0.4s
            </text>
          </g>

          {/* Labels */}
          <g transform="translate(18, 62)">
            <rect x="0" y="0" width="12" height="12" rx="3" fill="#F59E0B" />
            <text x="18" y="10" fill="#64748B" fontSize="8">
              Atrial Systole
            </text>

            <rect x="115" y="0" width="12" height="12" rx="3" fill="#EF4444" />
            <text x="133" y="10" fill="#64748B" fontSize="8">
              Ventricular Systole
            </text>

            <rect x="255" y="0" width="12" height="12" rx="3" fill="#22C55E" />
            <text x="273" y="10" fill="#64748B" fontSize="8">
              Diastole
            </text>
          </g>

          {/* Key metrics */}
          <g transform="translate(18, 82)">
            <text x="0" y="10" fill="#1E293B" fontSize="9" fontWeight="600">
              Cardiac Output = HR × SV
            </text>
            <text x="0" y="24" fill="#64748B" fontSize="8">
              = 75 × 70mL = ~5 L/min
            </text>
            <text x="185" y="10" fill="#1E293B" fontSize="9" fontWeight="600">
              Stroke Volume: 70mL
            </text>
            <text x="185" y="24" fill="#64748B" fontSize="8">
              EDV (120) - ESV (50)
            </text>
          </g>
        </g>
      </g>

      {/* ECG - Right Bottom */}
      <g
      >
        <g transform="translate(315, 310)">
          <rect
            x="0"
            y="0"
            width="365"
            height="105"
            rx="14"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="182" y="22" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="700">
            Electrocardiogram (ECG)
          </text>

          {/* ECG Grid background */}
          <rect x="18" y="32" width="330" height="55" rx="6" fill="#ECFDF5" stroke="#D1FAE5" />

          {/* ECG Wave */}
          <path
            d="M30 62 L55 62 Q62 62 65 53 L70 62 L78 62 L85 28 L92 78 L98 50 L105 62 L135 62 Q142 62 145 55 L150 62 L180 62 Q187 62 190 53 L195 62 L203 62 L210 28 L217 78 L223 50 L230 62 L260 62 Q267 62 270 55 L275 62 L305 62 Q312 62 315 53 L320 62 L328 62 L335 28 L342 78 L348 50 L355 62"
            stroke="url(#ecgGrad)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Wave labels */}
          <text x="65" y="48" fill="#6D28D9" fontSize="8" fontWeight="bold">
            P
          </text>
          <text x="88" y="24" fill="#DC2626" fontSize="8" fontWeight="bold">
            QRS
          </text>
          <text x="145" y="50" fill="#0D9488" fontSize="8" fontWeight="bold">
            T
          </text>

          {/* Legend */}
          <text x="30" y="100" fill="#6D28D9" fontSize="8">
            P: Atrial depol.
          </text>
          <text x="130" y="100" fill="#DC2626" fontSize="8">
            QRS: Ventricular depol.
          </text>
          <text x="275" y="100" fill="#0D9488" fontSize="8">
            T: Ventricular repol.
          </text>
        </g>
      </g>

      {/* BLOOD GROUPS & KEY FACTS - Bottom Right */}
      <g
      >
        <g transform="translate(315, 430)">
          <rect
            x="0"
            y="0"
            width="365"
            height="78"
            rx="14"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="182" y="20" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="700">
            Blood Groups & Key Facts
          </text>

          {/* Blood group circles */}
          <g transform="translate(18, 30)">
            <circle
              cx="25"
              cy="22"
              r="18"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="2.5"
            />
            <text x="25" y="27" textAnchor="middle" fill="#B91C1C" fontSize="12" fontWeight="bold">
              A
            </text>

            <circle
              cx="75"
              cy="22"
              r="18"
              fill="#DBEAFE"
              stroke="#3B82F6"
              strokeWidth="2.5"
            />
            <text x="75" y="27" textAnchor="middle" fill="#1D4ED8" fontSize="12" fontWeight="bold">
              B
            </text>

            <circle
              cx="125"
              cy="22"
              r="18"
              fill="#F3E8FF"
              stroke="#8B5CF6"
              strokeWidth="2.5"
            />
            <text x="125" y="27" textAnchor="middle" fill="#6D28D9" fontSize="11" fontWeight="bold">
              AB
            </text>

            <circle
              cx="175"
              cy="22"
              r="18"
              fill="#F1F5F9"
              stroke="#64748B"
              strokeWidth="2.5"
            />
            <text x="175" y="27" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">
              O
            </text>
          </g>

          {/* Key facts */}
          <g transform="translate(220, 32)">
            <text x="0" y="12" fill="#22C55E" fontSize="9" fontWeight="600">
              ● Universal Donor: O
            </text>
            <text x="0" y="28" fill="#DC2626" fontSize="9" fontWeight="600">
              ● Universal Recipient: AB
            </text>
            <text x="0" y="44" fill="#3B82F6" fontSize="9" fontWeight="600">
              ● Pacemaker: SA Node
            </text>
          </g>
        </g>
      </g>

      {/* SA Node indicator on heart */}
      <g
      >
        <circle cx="115" cy="108" r="7" fill="#22C55E" filter="url(#vesselGlow)" />
        <text x="128" y="105" fill="#166534" fontSize="6" fontWeight="bold">
          SA
        </text>
      </g>

      {/* AV Node indicator */}
      <g
      >
        <circle cx="128" cy="135" r="6" fill="#FBBF24" />
        <text x="140" y="133" fill="#92400E" fontSize="6" fontWeight="bold">
          AV
        </text>
      </g>
    </svg>
  )
}
