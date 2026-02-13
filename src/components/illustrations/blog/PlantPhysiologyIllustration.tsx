'use client'

import type { IllustrationProps } from './shared'

export function PlantPhysiologyIllustration({ className = '', animate = true }: IllustrationProps) {
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
        <linearGradient id="photoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="50%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        <linearGradient id="chloroplastGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="thylakoidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#166534" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
        <linearGradient id="stromaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="100%" stopColor="#86EFAC" />
        </linearGradient>
        <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="atpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="nadphGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="c3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id="c4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <linearGradient id="camGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
        <filter id="photoCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
        </filter>
        <filter id="photoGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="900" height="700" rx="24" fill="url(#photoBgGrad)" />

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
        Photosynthesis in Higher Plants
      </text>
      <text
        x="450"
        y="55"
        fontSize="12"
        fill="#22C55E"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        NEET 2026 Chapter Guide • 4-6 Questions • Very High Weightage
      </text>

      {/* Overall Equation Banner */}
      <g filter="url(#photoCardShadow)">
        <rect x="250" y="70" width="400" height="40" rx="10" fill="#15803D" />
        <text
          x="450"
          y="95"
          fontSize="13"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          6CO₂ + 12H₂O + Light → C₆H₁₂O₆ + 6O₂ + 6H₂O
        </text>
      </g>

      {/* Section 1: Chloroplast Structure (Top Left) */}
      <g filter="url(#photoCardShadow)">
        <rect x="15" y="125" width="280" height="200" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="15"
          y="125"
          width="280"
          height="200"
          rx="16"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />

        <text
          x="155"
          y="150"
          fontSize="14"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Chloroplast Structure
        </text>

        {/* Chloroplast outer shape */}
        <ellipse
          cx="155"
          cy="230"
          rx="100"
          ry="55"
          fill="url(#chloroplastGrad)"
          stroke="#166534"
          strokeWidth="2"
        />

        {/* Outer membrane */}
        <ellipse
          cx="155"
          cy="230"
          rx="95"
          ry="50"
          fill="none"
          stroke="#16A34A"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />

        {/* Inner membrane */}
        <ellipse
          cx="155"
          cy="230"
          rx="85"
          ry="42"
          fill="url(#stromaGrad)"
          stroke="#16A34A"
          strokeWidth="1"
        />

        {/* Stroma label */}
        <text
          x="220"
          y="215"
          fontSize="8"
          fill="#166534"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Stroma
        </text>
        <text x="220" y="225" fontSize="7" fill="#166534" fontFamily="system-ui, sans-serif">
          (Calvin Cycle)
        </text>

        {/* Thylakoid/Grana Stack */}
        <g>
          {[0, 8, 16, 24, 32].map((offset, i) => (
            <ellipse
              key={`thylakoid-${i}`}
              cx="130"
              cy={210 + offset}
              rx="40"
              ry="6"
              fill="url(#thylakoidGrad)"
              stroke="#166534"
              strokeWidth="0.5"
            />
          ))}
          <text
            x="130"
            y="260"
            fontSize="7"
            fill="#166534"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Grana (Thylakoids)
          </text>
          <text
            x="130"
            y="270"
            fontSize="6"
            fill="#166534"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            Light Reactions
          </text>
        </g>

        {/* Stroma Lamellae */}
        <path
          d="M170 215 Q195 230 170 250"
          stroke="#16A34A"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <text x="195" y="255" fontSize="6" fill="#166534" fontFamily="system-ui, sans-serif">
          Stroma
        </text>
        <text x="195" y="263" fontSize="6" fill="#166534" fontFamily="system-ui, sans-serif">
          Lamellae
        </text>

        {/* Labels */}
        <g>
          <line x1="55" y1="175" x2="75" y2="195" stroke="#666" strokeWidth="1" />
          <text x="35" y="175" fontSize="7" fill="#666" fontFamily="system-ui, sans-serif">
            Outer Membrane
          </text>

          <line x1="75" y1="295" x2="100" y2="270" stroke="#666" strokeWidth="1" />
          <text x="45" y="305" fontSize="7" fill="#666" fontFamily="system-ui, sans-serif">
            Inner Membrane
          </text>
        </g>
      </g>

      {/* Section 2: Light Reactions - Z-Scheme (Top Center) */}
      <g filter="url(#photoCardShadow)">
        <rect x="310" y="125" width="280" height="200" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="310"
          y="125"
          width="280"
          height="200"
          rx="16"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />

        <text
          x="450"
          y="150"
          fontSize="14"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Light Reactions (Z-Scheme)
        </text>
        <text
          x="450"
          y="163"
          fontSize="9"
          fill="#16A34A"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Thylakoid Membrane
        </text>

        {/* Z-Scheme Diagram */}
        {/* PS II */}
        <motion.g
        >
          <rect x="330" y="260" width="50" height="50" rx="8" fill="#3B82F6" />
          <text
            x="355"
            y="282"
            fontSize="10"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            PS II
          </text>
          <text
            x="355"
            y="295"
            fontSize="7"
            fill="#BFDBFE"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            P680
          </text>
        </motion.g>

        {/* PS I */}
        <motion.g
        >
          <rect x="520" y="260" width="50" height="50" rx="8" fill="#8B5CF6" />
          <text
            x="545"
            y="282"
            fontSize="10"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            PS I
          </text>
          <text
            x="545"
            y="295"
            fontSize="7"
            fill="#DDD6FE"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            P700
          </text>
        </motion.g>

        {/* Electron flow path (Z shape) */}
        <motion.path
          d="M355 260 L355 195 L425 220 L425 195 L495 220 L495 195 L545 195 L545 260"
          stroke="#22C55E"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 3"
        />

        {/* ETC components */}
        <circle cx="425" cy="220" r="12" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1.5" />
        <text
          x="425"
          y="223"
          fontSize="6"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Cyt b6f
        </text>

        {/* Water splitting */}
        <g>
          <text
            x="335"
            y="320"
            fontSize="8"
            fill="#3B82F6"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            H₂O
          </text>
          <motion.path
            d="M350 315 L355 300"
            stroke="#3B82F6"
            strokeWidth="1.5"
          />
          <text x="365" y="320" fontSize="6" fill="#16A34A" fontFamily="system-ui, sans-serif">
            → O₂ + H⁺
          </text>
        </g>

        {/* NADPH production */}
        <g>
          <rect x="550" y="175" width="35" height="18" rx="4" fill="url(#nadphGrad)" />
          <text
            x="567"
            y="188"
            fontSize="7"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            NADPH
          </text>
        </g>

        {/* Products summary */}
        <rect x="325" y="175" width="100" height="15" rx="4" fill="#FEF3C7" />
        <text
          x="375"
          y="186"
          fontSize="8"
          fill="#B45309"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Products: ATP + NADPH + O₂
        </text>
      </g>

      {/* Section 3: Photosynthetic Pigments (Top Right) */}
      <g filter="url(#photoCardShadow)">
        <rect x="605" y="125" width="280" height="200" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="605"
          y="125"
          width="280"
          height="200"
          rx="16"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />

        <text
          x="745"
          y="150"
          fontSize="14"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Photosynthetic Pigments
        </text>

        {/* Pigments table */}
        <rect x="620" y="165" width="250" height="18" rx="4" fill="#15803D" />
        <text
          x="660"
          y="178"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Pigment
        </text>
        <text
          x="740"
          y="178"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Color
        </text>
        <text
          x="820"
          y="178"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Peak (nm)
        </text>

        {[
          {
            name: 'Chlorophyll a',
            color: '#166534',
            colorName: 'Blue-green',
            peak: '430, 662',
            y: 198,
          },
          {
            name: 'Chlorophyll b',
            color: '#84CC16',
            colorName: 'Yellow-green',
            peak: '453, 642',
            y: 218,
          },
          {
            name: 'Carotenoids',
            color: '#F97316',
            colorName: 'Yellow-orange',
            peak: '400-500',
            y: 238,
          },
          { name: 'Xanthophylls', color: '#FBBF24', colorName: 'Yellow', peak: '400-500', y: 258 },
        ].map((pigment, i) => (
          <g key={`pigment-${i}`}>
            <rect
              x="620"
              y={pigment.y - 12}
              width="250"
              height="18"
              rx="0"
              fill={i % 2 === 0 ? '#F0FDF4' : 'white'}
            />
            <circle cx="635" cy={pigment.y - 3} r="6" fill={pigment.color} />
            <text
              x="648"
              y={pigment.y}
              fontSize="8"
              fill="#374151"
              fontFamily="system-ui, sans-serif"
            >
              {pigment.name}
            </text>
            <text x="740" y={pigment.y} fontSize="7" fill="#666" fontFamily="system-ui, sans-serif">
              {pigment.colorName}
            </text>
            <text x="820" y={pigment.y} fontSize="7" fill="#666" fontFamily="system-ui, sans-serif">
              {pigment.peak}
            </text>
          </g>
        ))}

        {/* Key fact */}
        <rect x="620" y="280" width="250" height="30" rx="8" fill="#DCFCE7" />
        <text
          x="745"
          y="295"
          fontSize="8"
          fill="#166534"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Only Chlorophyll a can directly participate
        </text>
        <text
          x="745"
          y="307"
          fontSize="8"
          fill="#166534"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          in light reactions (reaction center)
        </text>
      </g>

      {/* Section 4: Calvin Cycle (Middle Left) */}
      <g filter="url(#photoCardShadow)">
        <rect x="15" y="340" width="280" height="180" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="15"
          y="340"
          width="280"
          height="180"
          rx="16"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
        />

        <text
          x="155"
          y="365"
          fontSize="14"
          fill="#1D4ED8"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Calvin Cycle (C3 Pathway)
        </text>
        <text
          x="155"
          y="378"
          fontSize="9"
          fill="#3B82F6"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Stroma of Chloroplast
        </text>

        {/* Circular cycle diagram */}
        <circle cx="155" cy="445" r="60" fill="none" stroke="#BFDBFE" strokeWidth="3" />

        {/* Animated cycle arrow */}
        <motion.circle
          cx="155"
          cy="385"
          r="6"
          fill="#3B82F6"
        />

        {/* Stage 1: Carbon Fixation */}
        <g>
          <rect x="125" y="383" width="60" height="24" rx="6" fill="url(#c3Grad)" />
          <text
            x="155"
            y="398"
            fontSize="8"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            CO₂ + RuBP
          </text>
          <text
            x="155"
            y="417"
            fontSize="7"
            fill="#1D4ED8"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            3-PGA (3C)
          </text>
        </g>

        {/* Stage 2: Reduction */}
        <g>
          <rect x="195" y="440" width="55" height="24" rx="6" fill="url(#atpGrad)" />
          <text
            x="222"
            y="455"
            fontSize="8"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            ATP/NADPH
          </text>
          <text
            x="222"
            y="478"
            fontSize="7"
            fill="#B45309"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            G3P (Sugar)
          </text>
        </g>

        {/* Stage 3: Regeneration */}
        <g>
          <rect x="60" y="440" width="55" height="24" rx="6" fill="#22C55E" />
          <text
            x="87"
            y="455"
            fontSize="8"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Regenerate
          </text>
          <text
            x="87"
            y="478"
            fontSize="7"
            fill="#166534"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            RuBP (5C)
          </text>
        </g>

        {/* Key enzyme */}
        <rect x="55" y="395" width="50" height="18" rx="4" fill="#FEE2E2" />
        <text
          x="80"
          y="407"
          fontSize="7"
          fill="#DC2626"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          RuBisCO
        </text>

        {/* Summary */}
        <text
          x="155"
          y="510"
          fontSize="7"
          fill="#374151"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          1 Glucose = 6 CO₂ + 18 ATP + 12 NADPH
        </text>
      </g>

      {/* Section 5: C3 vs C4 vs CAM (Middle Center) */}
      <g filter="url(#photoCardShadow)">
        <rect x="310" y="340" width="280" height="180" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="310"
          y="340"
          width="280"
          height="180"
          rx="16"
          fill="none"
          stroke="#F97316"
          strokeWidth="2"
        />

        <text
          x="450"
          y="365"
          fontSize="14"
          fill="#EA580C"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          C3 vs C4 vs CAM Pathways
        </text>

        {/* Comparison table */}
        <rect x="325" y="380" width="250" height="20" rx="4" fill="#EA580C" />
        <text
          x="365"
          y="394"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Feature
        </text>
        <text
          x="420"
          y="394"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          C3
        </text>
        <text
          x="480"
          y="394"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          C4
        </text>
        <text
          x="540"
          y="394"
          fontSize="8"
          fill="white"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          CAM
        </text>

        {[
          { feature: '1st Product', c3: '3-PGA', c4: 'OAA', cam: 'OAA', y: 415 },
          { feature: 'CO₂ Acceptor', c3: 'RuBP', c4: 'PEP', cam: 'PEP', y: 432 },
          { feature: 'Kranz Anatomy', c3: 'No', c4: 'Yes', cam: 'No', y: 449 },
          { feature: 'Photorespiration', c3: 'High', c4: 'Low', cam: 'Low', y: 466 },
          { feature: 'Separation', c3: 'None', c4: 'Spatial', cam: 'Temporal', y: 483 },
          { feature: 'Examples', c3: 'Wheat', c4: 'Maize', cam: 'Cactus', y: 500 },
        ].map((row, i) => (
          <g key={`compare-${i}`}>
            <rect
              x="325"
              y={row.y - 12}
              width="250"
              height="16"
              fill={i % 2 === 0 ? '#FFF7ED' : 'white'}
            />
            <text x="365" y={row.y} fontSize="7" fill="#374151" fontFamily="system-ui, sans-serif">
              {row.feature}
            </text>
            <text x="420" y={row.y} fontSize="7" fill="#3B82F6" fontFamily="system-ui, sans-serif">
              {row.c3}
            </text>
            <text x="480" y={row.y} fontSize="7" fill="#F97316" fontFamily="system-ui, sans-serif">
              {row.c4}
            </text>
            <text x="540" y={row.y} fontSize="7" fill="#14B8A6" fontFamily="system-ui, sans-serif">
              {row.cam}
            </text>
          </g>
        ))}
      </g>

      {/* Section 6: Kranz Anatomy (Middle Right) */}
      <g filter="url(#photoCardShadow)">
        <rect x="605" y="340" width="280" height="180" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="605"
          y="340"
          width="280"
          height="180"
          rx="16"
          fill="none"
          stroke="#F97316"
          strokeWidth="2"
        />

        <text
          x="745"
          y="365"
          fontSize="14"
          fill="#EA580C"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Kranz Anatomy (C4 Plants)
        </text>

        {/* Cross-section of C4 leaf */}
        {/* Vascular bundle (center) */}
        <ellipse cx="745" cy="440" r="25" ry="30" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
        <text
          x="745"
          y="435"
          fontSize="7"
          fill="#EA580C"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Vascular
        </text>
        <text
          x="745"
          y="445"
          fontSize="7"
          fill="#EA580C"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Bundle
        </text>

        {/* Bundle sheath cells */}
        <ellipse cx="745" cy="440" r="50" ry="55" fill="none" stroke="#22C55E" strokeWidth="8" />
        <text
          x="665"
          y="440"
          fontSize="7"
          fill="#166534"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Bundle
        </text>
        <text x="665" y="450" fontSize="7" fill="#166534" fontFamily="system-ui, sans-serif">
          Sheath
        </text>

        {/* Mesophyll cells */}
        {[
          { cx: 680, cy: 390 },
          { cx: 810, cy: 390 },
          { cx: 660, cy: 440 },
          { cx: 830, cy: 440 },
          { cx: 680, cy: 490 },
          { cx: 810, cy: 490 },
        ].map((pos, i) => (
          <ellipse
            key={`mesophyll-${i}`}
            cx={pos.cx}
            cy={pos.cy}
            rx="20"
            ry="15"
            fill="#BBF7D0"
            stroke="#22C55E"
            strokeWidth="1"
          />
        ))}
        <text x="665" y="502" fontSize="7" fill="#166534" fontFamily="system-ui, sans-serif">
          Mesophyll
        </text>

        {/* Function labels */}
        <g>
          <rect x="620" y="510" width="110" height="35" rx="6" fill="#DCFCE7" />
          <text
            x="675"
            y="525"
            fontSize="7"
            fill="#166534"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Mesophyll:
          </text>
          <text
            x="675"
            y="538"
            fontSize="7"
            fill="#166534"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            CO₂ → OAA (PEPcase)
          </text>
        </g>
        <g>
          <rect x="740" y="510" width="130" height="35" rx="6" fill="#FEF3C7" />
          <text
            x="805"
            y="525"
            fontSize="7"
            fill="#B45309"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Bundle Sheath:
          </text>
          <text
            x="805"
            y="538"
            fontSize="7"
            fill="#B45309"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            Calvin Cycle (RuBisCO)
          </text>
        </g>
      </g>

      {/* Section 7: Photophosphorylation Types (Bottom Left) */}
      <g filter="url(#photoCardShadow)">
        <rect x="15" y="535" width="280" height="150" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="15"
          y="535"
          width="280"
          height="150"
          rx="16"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
        />

        <text
          x="155"
          y="560"
          fontSize="14"
          fill="#7C3AED"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Photophosphorylation
        </text>

        {/* Types comparison */}
        <g>
          <rect x="30" y="575" width="120" height="95" rx="10" fill="#EDE9FE" />
          <text
            x="90"
            y="595"
            fontSize="10"
            fill="#7C3AED"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Non-Cyclic
          </text>
          <text
            x="90"
            y="612"
            fontSize="8"
            fill="#374151"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            PS II → PS I
          </text>
          <text
            x="90"
            y="628"
            fontSize="8"
            fill="#374151"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            ATP + NADPH
          </text>
          <text
            x="90"
            y="644"
            fontSize="8"
            fill="#22C55E"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            O₂ Released ✓
          </text>
          <text
            x="90"
            y="660"
            fontSize="7"
            fill="#666"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            (Water Splitting)
          </text>
        </g>

        <g>
          <rect x="160" y="575" width="120" height="95" rx="10" fill="#FEF3C7" />
          <text
            x="220"
            y="595"
            fontSize="10"
            fill="#B45309"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Cyclic
          </text>
          <text
            x="220"
            y="612"
            fontSize="8"
            fill="#374151"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            PS I only
          </text>
          <text
            x="220"
            y="628"
            fontSize="8"
            fill="#374151"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            ATP only
          </text>
          <text
            x="220"
            y="644"
            fontSize="8"
            fill="#DC2626"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            No O₂ ✗
          </text>
          <text
            x="220"
            y="660"
            fontSize="7"
            fill="#666"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            (Stroma Lamellae)
          </text>
        </g>
      </g>

      {/* Section 8: Photorespiration (Bottom Center) */}
      <g filter="url(#photoCardShadow)">
        <rect x="310" y="535" width="280" height="150" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="310"
          y="535"
          width="280"
          height="150"
          rx="16"
          fill="none"
          stroke="#DC2626"
          strokeWidth="2"
        />

        <text
          x="450"
          y="560"
          fontSize="14"
          fill="#DC2626"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Photorespiration
        </text>
        <text
          x="450"
          y="575"
          fontSize="9"
          fill="#EF4444"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Wasteful Process in C3 Plants
        </text>

        {/* Process flow */}
        <g>
          <rect x="325" y="590" width="70" height="35" rx="8" fill="#FEE2E2" />
          <text
            x="360"
            y="605"
            fontSize="8"
            fill="#DC2626"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            RuBisCO
          </text>
          <text
            x="360"
            y="617"
            fontSize="7"
            fill="#DC2626"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            fixes O₂
          </text>
        </g>

        <path d="M395 607 L415 607" stroke="#DC2626" strokeWidth="2" markerEnd="url(#arrowhead)" />

        <g>
          <rect x="420" y="590" width="75" height="35" rx="8" fill="#FEE2E2" />
          <text
            x="457"
            y="605"
            fontSize="7"
            fill="#DC2626"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Phosphoglycolate
          </text>
          <text
            x="457"
            y="617"
            fontSize="7"
            fill="#DC2626"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            (2C)
          </text>
        </g>

        <path d="M495 607 L515 607" stroke="#DC2626" strokeWidth="2" />

        <g>
          <rect x="520" y="590" width="55" height="35" rx="8" fill="#FEE2E2" />
          <text
            x="547"
            y="605"
            fontSize="8"
            fill="#DC2626"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            CO₂
          </text>
          <text
            x="547"
            y="617"
            fontSize="7"
            fill="#DC2626"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            Released
          </text>
        </g>

        {/* Pathway */}
        <text
          x="450"
          y="645"
          fontSize="8"
          fill="#374151"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Chloroplast → Peroxisome → Mitochondria
        </text>

        {/* Key points */}
        <rect x="325" y="655" width="250" height="20" rx="6" fill="#DCFCE7" />
        <text
          x="450"
          y="669"
          fontSize="8"
          fill="#166534"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          C4 plants avoid this via PEP carboxylase (no oxygenase!)
        </text>
      </g>

      {/* Section 9: Factors Affecting & Key Facts (Bottom Right) */}
      <g filter="url(#photoCardShadow)">
        <rect x="605" y="535" width="280" height="150" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="605"
          y="535"
          width="280"
          height="150"
          rx="16"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />

        <text
          x="745"
          y="560"
          fontSize="14"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Factors & Key Facts
        </text>

        {/* Blackman's Law */}
        <rect x="620" y="575" width="250" height="25" rx="6" fill="#DCFCE7" />
        <text
          x="745"
          y="591"
          fontSize="9"
          fill="#166534"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Blackman's Law of Limiting Factors
        </text>

        {/* Factors */}
        <g>
          {[
            { icon: '☀️', factor: 'Light Intensity', effect: 'Rate ↑ then plateaus' },
            { icon: '💨', factor: 'CO₂ Concentration', effect: 'Rate ↑ up to 0.05%' },
            { icon: '🌡️', factor: 'Temperature', effect: 'Optimum varies by plant' },
            { icon: '💧', factor: 'Water', effect: 'Stomatal opening, e⁻ donor' },
          ].map((item, i) => (
            <g key={`factor-${i}`}>
              <text x="630" y={620 + i * 18} fontSize="10" fontFamily="system-ui, sans-serif">
                {item.icon}
              </text>
              <text
                x="650"
                y={620 + i * 18}
                fontSize="8"
                fill="#374151"
                fontFamily="system-ui, sans-serif"
              >
                {item.factor}
              </text>
              <text
                x="760"
                y={620 + i * 18}
                fontSize="7"
                fill="#666"
                fontFamily="system-ui, sans-serif"
              >
                {item.effect}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* NEET Questions Badge */}
      <motion.g
        filter="url(#photoGlow)"
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
      </motion.g>

      {/* NEET Tip */}
      <g filter="url(#photoCardShadow)">
        <rect x="650" y="68" width="150" height="42" rx="10" fill="#FEF3C7" />
        <text
          x="725"
          y="85"
          fontSize="8"
          fill="#B45309"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          NEET TIP
        </text>
        <text
          x="725"
          y="98"
          fontSize="7"
          fill="#92400E"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          PS II acts first but was
        </text>
        <text
          x="725"
          y="108"
          fontSize="7"
          fill="#92400E"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          discovered after PS I!
        </text>
      </g>
    </Wrapper>
  )
}
