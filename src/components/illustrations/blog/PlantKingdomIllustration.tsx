'use client'

import type { IllustrationProps } from './shared'

export function PlantKingdomIllustration({ className = '', animate = true }: IllustrationProps) {
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
      viewBox="0 0 900 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Professional gradients */}
        <linearGradient id="plantKingdomBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="50%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        <linearGradient id="algaeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="bryoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="pteriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="gymnoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#166534" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
        <linearGradient id="angioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="chlorophytaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>
        <linearGradient id="phaeophytaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="rhodophytaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <filter id="pkCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
        </filter>
        <filter id="pkGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="900" height="700" rx="24" fill="url(#plantKingdomBg)" />

      {/* Title Section */}
      <text
        x="450"
        y="35"
        fontSize="22"
        fill="#15803D"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        Plant Kingdom Classification
      </text>
      <text
        x="450"
        y="55"
        fontSize="12"
        fill="#22C55E"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        NEET 2026 Chapter Guide • 4-6 Questions • High Weightage
      </text>

      {/* Evolution Progression Banner */}
      <g filter="url(#pkCardShadow)">
        <rect x="100" y="70" width="700" height="35" rx="10" fill="#15803D" />
        <text
          x="450"
          y="93"
          fontSize="11"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Progression: Thallus → No Vascular → Vascular Seedless → Naked Seeds → Enclosed Seeds
        </text>
      </g>

      {/* Section 1: Algae (Thallophyta) */}
      <g filter="url(#pkCardShadow)">
        <rect x="15" y="120" width="280" height="185" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="15"
          y="120"
          width="280"
          height="185"
          rx="16"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />

        <text
          x="155"
          y="145"
          fontSize="14"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Algae (Thallophyta)
        </text>
        <text
          x="155"
          y="160"
          fontSize="9"
          fill="#22C55E"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Simple, chlorophyll-bearing, aquatic
        </text>

        {/* Three types of Algae */}
        <g>
          {/* Chlorophyta */}
          <g
          >
            <rect
              x="30"
              y="175"
              width="75"
              height="65"
              rx="8"
              fill="#DCFCE7"
              stroke="#22C55E"
              strokeWidth="1.5"
            />
            <text
              x="67"
              y="190"
              fontSize="8"
              fill="#166534"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Chlorophyta
            </text>
            <text
              x="67"
              y="202"
              fontSize="7"
              fill="#15803D"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              (Green)
            </text>
            {/* Spirogyra spiral */}
            <ellipse
              cx="67"
              cy="220"
              rx="22"
              ry="10"
              fill="#4ADE80"
              stroke="#166534"
              strokeWidth="1"
            />
            <path
              d="M50 218 Q58 214 67 220 Q76 226 84 222"
              stroke="#166534"
              strokeWidth="1"
              fill="none"
            />
            <text
              x="67"
              y="238"
              fontSize="6"
              fill="#166534"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              Spirogyra
            </text>
          </g>

          {/* Phaeophyta */}
          <g
          >
            <rect
              x="115"
              y="175"
              width="75"
              height="65"
              rx="8"
              fill="#FEF3C7"
              stroke="#B45309"
              strokeWidth="1.5"
            />
            <text
              x="152"
              y="190"
              fontSize="8"
              fill="#92400E"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Phaeophyta
            </text>
            <text
              x="152"
              y="202"
              fontSize="7"
              fill="#B45309"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              (Brown)
            </text>
            {/* Kelp shape */}
            <path d="M152 210 Q145 218 147 230" stroke="#92400E" strokeWidth="3" fill="none" />
            <ellipse cx="152" cy="233" rx="15" ry="6" fill="#B45309" />
            <text
              x="152"
              y="238"
              fontSize="6"
              fill="#92400E"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              Laminaria
            </text>
          </g>

          {/* Rhodophyta */}
          <g
          >
            <rect
              x="200"
              y="175"
              width="75"
              height="65"
              rx="8"
              fill="#FEE2E2"
              stroke="#DC2626"
              strokeWidth="1.5"
            />
            <text
              x="237"
              y="190"
              fontSize="8"
              fill="#DC2626"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Rhodophyta
            </text>
            <text
              x="237"
              y="202"
              fontSize="7"
              fill="#EF4444"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              (Red)
            </text>
            {/* Red algae shape */}
            <ellipse cx="237" cy="220" rx="18" ry="12" fill="#EF4444" />
            <ellipse cx="237" cy="220" rx="10" ry="6" fill="#FCA5A5" />
            <text
              x="237"
              y="238"
              fontSize="6"
              fill="#DC2626"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              Porphyra
            </text>
          </g>
        </g>

        {/* Key facts */}
        <rect x="30" y="250" width="250" height="45" rx="8" fill="#F0FDF4" />
        <text
          x="155"
          y="265"
          fontSize="8"
          fill="#166534"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Key Pigments:
        </text>
        <text
          x="155"
          y="278"
          fontSize="7"
          fill="#374151"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Green: Chl a,b | Brown: Fucoxanthin | Red: Phycoerythrin
        </text>
        <text
          x="155"
          y="291"
          fontSize="7"
          fill="#374151"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          No vascular tissue • Reproduction: Isogamy, Anisogamy, Oogamy
        </text>
      </g>

      {/* Section 2: Bryophytes */}
      <g filter="url(#pkCardShadow)">
        <rect x="310" y="120" width="280" height="185" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="310"
          y="120"
          width="280"
          height="185"
          rx="16"
          fill="none"
          stroke="#4ADE80"
          strokeWidth="2"
        />

        <text
          x="450"
          y="145"
          fontSize="14"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Bryophytes (Amphibians)
        </text>
        <text
          x="450"
          y="160"
          fontSize="9"
          fill="#22C55E"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          First land plants • Need water for fertilization
        </text>

        {/* Liverworts and Mosses */}
        <g>
          {/* Liverwort (Marchantia) */}
          <g
          >
            <rect
              x="325"
              y="175"
              width="120"
              height="70"
              rx="8"
              fill="#DCFCE7"
              stroke="#22C55E"
              strokeWidth="1.5"
            />
            <text
              x="385"
              y="190"
              fontSize="9"
              fill="#166534"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Liverworts
            </text>
            {/* Marchantia thallus */}
            <ellipse
              cx="385"
              cy="215"
              rx="35"
              ry="12"
              fill="#4ADE80"
              stroke="#166534"
              strokeWidth="1"
            />
            <ellipse cx="385" cy="213" rx="25" ry="8" fill="#22C55E" />
            {/* Gemma cups */}
            <circle cx="375" cy="213" r="4" fill="#166534" />
            <circle cx="395" cy="213" r="4" fill="#166534" />
            <text
              x="385"
              y="237"
              fontSize="7"
              fill="#166534"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              Marchantia (Gemmae)
            </text>
          </g>

          {/* Mosses */}
          <g
          >
            <rect
              x="455"
              y="175"
              width="120"
              height="70"
              rx="8"
              fill="#DCFCE7"
              stroke="#22C55E"
              strokeWidth="1.5"
            />
            <text
              x="515"
              y="190"
              fontSize="9"
              fill="#166534"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Mosses
            </text>
            {/* Moss with sporophyte */}
            <rect x="505" y="225" width="20" height="12" rx="2" fill="#86EFAC" />
            <line x1="510" y1="225" x2="510" y2="200" stroke="#166534" strokeWidth="2" />
            <ellipse
              cx="510"
              cy="197"
              rx="5"
              ry="8"
              fill="#4ADE80"
              stroke="#166534"
              strokeWidth="1"
            />
            <line x1="520" y1="225" x2="520" y2="208" stroke="#166534" strokeWidth="2" />
            <ellipse cx="520" cy="205" rx="4" ry="6" fill="#22C55E" />
            <text
              x="515"
              y="237"
              fontSize="7"
              fill="#166534"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              Funaria (Sporophyte)
            </text>
          </g>
        </g>

        {/* Key facts */}
        <rect x="325" y="255" width="250" height="40" rx="8" fill="#FEF3C7" />
        <text
          x="450"
          y="270"
          fontSize="8"
          fill="#B45309"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Dominant Generation: Gametophyte (n)
        </text>
        <text
          x="450"
          y="283"
          fontSize="7"
          fill="#374151"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          No vascular tissue • Rhizoids (not true roots) • Flagellated sperm
        </text>
      </g>

      {/* Section 3: Pteridophytes */}
      <g filter="url(#pkCardShadow)">
        <rect x="605" y="120" width="280" height="185" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="605"
          y="120"
          width="280"
          height="185"
          rx="16"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
        />

        <text
          x="745"
          y="145"
          fontSize="14"
          fill="#059669"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Pteridophytes (First Vascular)
        </text>
        <text
          x="745"
          y="160"
          fontSize="9"
          fill="#10B981"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          True roots, stems, leaves • Seedless
        </text>

        {/* Fern diagram */}
        <g
          style={{ transformOrigin: '745px 210px' }}
        >
          {/* Fern fronds with circinate vernation */}
          <line x1="745" y1="245" x2="745" y2="195" stroke="#166534" strokeWidth="4" />
          {/* Left frond */}
          <path d="M745 195 Q715 185 700 170" stroke="#22C55E" strokeWidth="3" fill="none" />
          <path d="M745 205 Q720 195 708 185" stroke="#4ADE80" strokeWidth="2.5" fill="none" />
          <path d="M745 215 Q725 205 715 198" stroke="#86EFAC" strokeWidth="2" fill="none" />
          {/* Right frond */}
          <path d="M745 195 Q775 185 790 170" stroke="#22C55E" strokeWidth="3" fill="none" />
          <path d="M745 205 Q770 195 782 185" stroke="#4ADE80" strokeWidth="2.5" fill="none" />
          <path d="M745 215 Q765 205 775 198" stroke="#86EFAC" strokeWidth="2" fill="none" />
          {/* Sori on fronds */}
          {[708, 715, 722, 768, 775, 782].map((x, i) => (
            <circle key={`sori-${i}`} cx={x} cy={185 + (i % 3) * 5} r="3" fill="#92400E" />
          ))}
          {/* Coiled young frond */}
          <path
            d="M755 180 Q760 170 755 165 Q750 170 752 175"
            stroke="#166534"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Prothallus label */}
        <g>
          <ellipse
            cx="665"
            cy="235"
            rx="30"
            ry="15"
            fill="#BBF7D0"
            stroke="#22C55E"
            strokeWidth="1"
          />
          <text
            x="665"
            y="238"
            fontSize="6"
            fill="#166534"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Prothallus
          </text>
          <text
            x="665"
            y="255"
            fontSize="6"
            fill="#666"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            (Gametophyte)
          </text>
        </g>

        {/* Types */}
        <rect x="620" y="265" width="250" height="30" rx="8" fill="#F0FDF4" />
        <text
          x="745"
          y="278"
          fontSize="7"
          fill="#166534"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Lycopsida (Selaginella) • Sphenopsida (Equisetum) • Pteropsida (Ferns)
        </text>
        <text
          x="745"
          y="290"
          fontSize="7"
          fill="#059669"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Heterospory: Selaginella, Salvinia (→ Seed habit)
        </text>
      </g>

      {/* Section 4: Gymnosperms */}
      <g filter="url(#pkCardShadow)">
        <rect x="15" y="320" width="280" height="185" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="15"
          y="320"
          width="280"
          height="185"
          rx="16"
          fill="none"
          stroke="#166534"
          strokeWidth="2"
        />

        <text
          x="155"
          y="345"
          fontSize="14"
          fill="#14532D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Gymnosperms (Naked Seeds)
        </text>
        <text
          x="155"
          y="360"
          fontSize="9"
          fill="#166534"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Seeds not enclosed in fruit • Wind pollinated
        </text>

        {/* Cycas and Pinus */}
        <g>
          {/* Cycas */}
          <g
          >
            <rect
              x="30"
              y="375"
              width="115"
              height="75"
              rx="8"
              fill="#DCFCE7"
              stroke="#166534"
              strokeWidth="1.5"
            />
            <text
              x="87"
              y="390"
              fontSize="9"
              fill="#14532D"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Cycas
            </text>
            {/* Cycas palm shape */}
            <rect x="82" y="415" width="10" height="30" fill="#92400E" rx="2" />
            <path d="M87 415 Q60 400 45 410" stroke="#22C55E" strokeWidth="4" fill="none" />
            <path d="M87 415 Q70 398 60 405" stroke="#4ADE80" strokeWidth="3" fill="none" />
            <path d="M87 415 Q114 400 129 410" stroke="#22C55E" strokeWidth="4" fill="none" />
            <path d="M87 415 Q104 398 114 405" stroke="#4ADE80" strokeWidth="3" fill="none" />
            <text
              x="87"
              y="448"
              fontSize="6"
              fill="#166534"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              Coralloid roots
            </text>
          </g>

          {/* Pinus */}
          <g
          >
            <rect
              x="155"
              y="375"
              width="125"
              height="75"
              rx="8"
              fill="#DCFCE7"
              stroke="#166534"
              strokeWidth="1.5"
            />
            <text
              x="217"
              y="390"
              fontSize="9"
              fill="#14532D"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Pinus (Pine)
            </text>
            {/* Pine tree */}
            <polygon points="217,400 192,435 242,435" fill="#166534" />
            <polygon points="217,410 198,430 236,430" fill="#22C55E" />
            <rect x="212" y="435" width="10" height="10" fill="#92400E" />
            {/* Cones */}
            <ellipse cx="195" cy="415" rx="5" ry="8" fill="#B45309" />
            <ellipse cx="239" cy="420" rx="6" ry="10" fill="#92400E" />
            <text
              x="217"
              y="448"
              fontSize="6"
              fill="#166534"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              Male & Female cones
            </text>
          </g>
        </g>

        {/* Key facts */}
        <rect x="30" y="460" width="250" height="35" rx="8" fill="#F0FDF4" />
        <text
          x="155"
          y="475"
          fontSize="8"
          fill="#166534"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Dominant: Sporophyte (2n) • Heterosporous
        </text>
        <text
          x="155"
          y="488"
          fontSize="7"
          fill="#374151"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Pollen tube for fertilization (no water needed)
        </text>
      </g>

      {/* Section 5: Angiosperms */}
      <g filter="url(#pkCardShadow)">
        <rect x="310" y="320" width="280" height="185" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="310"
          y="320"
          width="280"
          height="185"
          rx="16"
          fill="none"
          stroke="#EC4899"
          strokeWidth="2"
        />

        <text
          x="450"
          y="345"
          fontSize="14"
          fill="#BE185D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Angiosperms (Flowering Plants)
        </text>
        <text
          x="450"
          y="360"
          fontSize="9"
          fill="#EC4899"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Seeds enclosed in fruits • Double fertilization
        </text>

        {/* Dicot vs Monocot comparison */}
        <g>
          {/* Dicot */}
          <g
          >
            <rect
              x="325"
              y="375"
              width="115"
              height="75"
              rx="8"
              fill="#FCE7F3"
              stroke="#EC4899"
              strokeWidth="1.5"
            />
            <text
              x="382"
              y="390"
              fontSize="9"
              fill="#BE185D"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Dicots
            </text>
            {/* Flower */}
            <circle cx="382" cy="415" r="18" fill="#F472B6" />
            <circle cx="382" cy="415" r="10" fill="#FCD34D" />
            {/* Leaves */}
            <ellipse cx="362" cy="432" rx="12" ry="6" fill="#4ADE80" />
            <ellipse cx="402" cy="432" rx="12" ry="6" fill="#4ADE80" />
            <text
              x="382"
              y="448"
              fontSize="6"
              fill="#BE185D"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              2 cotyledons, Tap root
            </text>
          </g>

          {/* Monocot */}
          <g
          >
            <rect
              x="450"
              y="375"
              width="125"
              height="75"
              rx="8"
              fill="#DCFCE7"
              stroke="#22C55E"
              strokeWidth="1.5"
            />
            <text
              x="512"
              y="390"
              fontSize="9"
              fill="#166534"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Monocots
            </text>
            {/* Grass/wheat shape */}
            <line x1="512" y1="440" x2="512" y2="400" stroke="#22C55E" strokeWidth="3" />
            <ellipse cx="512" cy="398" rx="8" ry="15" fill="#FCD34D" />
            {/* Parallel veined leaf */}
            <path d="M495 420 L505 400" stroke="#4ADE80" strokeWidth="2" />
            <path d="M529 420 L519 400" stroke="#4ADE80" strokeWidth="2" />
            <text
              x="512"
              y="448"
              fontSize="6"
              fill="#166534"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              1 cotyledon, Fibrous root
            </text>
          </g>
        </g>

        {/* Double fertilization */}
        <rect x="325" y="460" width="250" height="35" rx="8" fill="#FEF3C7" />
        <text
          x="450"
          y="475"
          fontSize="8"
          fill="#B45309"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Double Fertilization (Unique to Angiosperms)
        </text>
        <text
          x="450"
          y="488"
          fontSize="7"
          fill="#374151"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Sperm + Egg → Zygote (2n) | Sperm + Polar nuclei → Endosperm (3n)
        </text>
      </g>

      {/* Section 6: Alternation of Generations */}
      <g filter="url(#pkCardShadow)">
        <rect x="605" y="320" width="280" height="185" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="605"
          y="320"
          width="280"
          height="185"
          rx="16"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
        />

        <text
          x="745"
          y="345"
          fontSize="14"
          fill="#7C3AED"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Alternation of Generations
        </text>

        {/* Table header */}
        <rect x="620" y="360" width="250" height="20" rx="4" fill="#7C3AED" />
        <text
          x="665"
          y="374"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Group
        </text>
        <text
          x="760"
          y="374"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Dominant
        </text>
        <text
          x="840"
          y="374"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Gametophyte
        </text>

        {[
          { group: 'Algae', dominant: 'Variable', gameto: 'Independent', y: 395 },
          { group: 'Bryophytes', dominant: 'Gametophyte (n)', gameto: 'Independent', y: 412 },
          { group: 'Pteridophytes', dominant: 'Sporophyte (2n)', gameto: 'Independent', y: 429 },
          { group: 'Gymnosperms', dominant: 'Sporophyte (2n)', gameto: 'Reduced', y: 446 },
          { group: 'Angiosperms', dominant: 'Sporophyte (2n)', gameto: 'Highly reduced', y: 463 },
        ].map((row, i) => (
          <g key={`alt-${i}`}>
            <rect
              x="620"
              y={row.y - 12}
              width="250"
              height="16"
              fill={i % 2 === 0 ? '#F5F3FF' : 'white'}
            />
            <text x="665" y={row.y} fontSize="7" fill="#374151" fontFamily="system-ui, sans-serif">
              {row.group}
            </text>
            <text x="760" y={row.y} fontSize="7" fill="#7C3AED" fontFamily="system-ui, sans-serif">
              {row.dominant}
            </text>
            <text x="840" y={row.y} fontSize="7" fill="#666" fontFamily="system-ui, sans-serif">
              {row.gameto}
            </text>
          </g>
        ))}

        {/* Trend arrow */}
        <rect x="620" y="478" width="250" height="18" rx="6" fill="#EDE9FE" />
        <text
          x="745"
          y="490"
          fontSize="8"
          fill="#7C3AED"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Trend: Gametophyte ↓ | Sporophyte ↑
        </text>
      </g>

      {/* Section 7: Major Plant Groups Comparison Table */}
      <g filter="url(#pkCardShadow)">
        <rect x="15" y="520" width="575" height="165" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="15"
          y="520"
          width="575"
          height="165"
          rx="16"
          fill="none"
          stroke="#15803D"
          strokeWidth="2"
        />

        <text
          x="302"
          y="545"
          fontSize="14"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Plant Kingdom Classification Summary
        </text>

        {/* Table header */}
        <rect x="30" y="555" width="545" height="20" rx="4" fill="#15803D" />
        <text
          x="75"
          y="569"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Group
        </text>
        <text
          x="155"
          y="569"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Vascular
        </text>
        <text
          x="225"
          y="569"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Seeds
        </text>
        <text
          x="310"
          y="569"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Examples
        </text>
        <text
          x="435"
          y="569"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Key Feature
        </text>
        <text
          x="540"
          y="569"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Water for Fert.
        </text>

        {[
          {
            group: 'Algae',
            vascular: 'No',
            seeds: 'No',
            example: 'Spirogyra, Ulva, Laminaria',
            feature: 'Thalloid body',
            water: 'Yes',
            color: '#22C55E',
          },
          {
            group: 'Bryophytes',
            vascular: 'No',
            seeds: 'No',
            example: 'Marchantia, Funaria',
            feature: 'Amphibians',
            water: 'Yes',
            color: '#4ADE80',
          },
          {
            group: 'Pteridophytes',
            vascular: 'Yes',
            seeds: 'No',
            example: 'Fern, Selaginella',
            feature: 'First vascular',
            water: 'Yes',
            color: '#10B981',
          },
          {
            group: 'Gymnosperms',
            vascular: 'Yes',
            seeds: 'Naked',
            example: 'Pinus, Cycas',
            feature: 'Pollen tube',
            water: 'No',
            color: '#166534',
          },
          {
            group: 'Angiosperms',
            vascular: 'Yes',
            seeds: 'Enclosed',
            example: 'Rose, Rice, Mango',
            feature: 'Double fertil.',
            water: 'No',
            color: '#EC4899',
          },
        ].map((row, i) => (
          <g key={`summary-${i}`}>
            <rect
              x="30"
              y={580 + i * 18}
              width="545"
              height="17"
              fill={i % 2 === 0 ? '#F0FDF4' : 'white'}
            />
            <circle cx="45" cy={588 + i * 18} r="5" fill={row.color} />
            <text
              x="55"
              y={592 + i * 18}
              fontSize="7"
              fill="#374151"
              fontFamily="system-ui, sans-serif"
            >
              {row.group}
            </text>
            <text
              x="155"
              y={592 + i * 18}
              fontSize="7"
              fill={row.vascular === 'Yes' ? '#22C55E' : '#EF4444'}
              fontFamily="system-ui, sans-serif"
            >
              {row.vascular}
            </text>
            <text
              x="225"
              y={592 + i * 18}
              fontSize="7"
              fill="#374151"
              fontFamily="system-ui, sans-serif"
            >
              {row.seeds}
            </text>
            <text
              x="310"
              y={592 + i * 18}
              fontSize="7"
              fill="#666"
              fontFamily="system-ui, sans-serif"
            >
              {row.example}
            </text>
            <text
              x="435"
              y={592 + i * 18}
              fontSize="7"
              fill="#374151"
              fontFamily="system-ui, sans-serif"
            >
              {row.feature}
            </text>
            <text
              x="540"
              y={592 + i * 18}
              fontSize="7"
              fill={row.water === 'No' ? '#22C55E' : '#EF4444'}
              fontFamily="system-ui, sans-serif"
            >
              {row.water}
            </text>
          </g>
        ))}
      </g>

      {/* Section 8: Quick Revision */}
      <g filter="url(#pkCardShadow)">
        <rect x="605" y="520" width="280" height="165" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="605"
          y="520"
          width="280"
          height="165"
          rx="16"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
        />

        <text
          x="745"
          y="545"
          fontSize="14"
          fill="#B45309"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Quick Revision Points
        </text>

        {[
          'Amphibians of plants: Bryophytes',
          'First vascular plants: Pteridophytes',
          'Largest algae: Brown (Giant kelp)',
          'Red algae pigment: Phycoerythrin',
          'Heterosporous pteridophyte: Selaginella',
          'Naked seeds: Gymnosperms',
          'Double fertilization: Angiosperms only',
          'Circinate vernation: Ferns',
          'Coralloid roots: Cycas',
          'Largest sperm in plants: Cycas',
        ].map((point, i) => (
          <g key={`revision-${i}`}>
            <circle cx="625" cy={565 + i * 13} r="3" fill="#F59E0B" />
            <text
              x="635"
              y={568 + i * 13}
              fontSize="7"
              fill="#374151"
              fontFamily="system-ui, sans-serif"
            >
              {point}
            </text>
          </g>
        ))}
      </g>

      {/* NEET Questions Badge */}
      <g
        filter="url(#pkGlow)"
      >
        <circle cx="850" cy="50" r="35" fill="#15803D" />
        <text
          x="850"
          y="45"
          fontSize="14"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          4-6
        </text>
        <text
          x="850"
          y="60"
          fontSize="8"
          fill="#BBF7D0"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Questions
        </text>
      </g>
    </Wrapper>
  )
}
