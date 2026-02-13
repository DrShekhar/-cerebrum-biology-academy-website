'use client'

import type { IllustrationProps } from './shared'

export function GeneticsIllustration({ className = '', animate = true }: IllustrationProps) {
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
      viewBox="0 0 900 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradients */}
        <linearGradient id="genBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF5FF" />
          <stop offset="50%" stopColor="#F3E8FF" />
          <stop offset="100%" stopColor="#EDE9FE" />
        </linearGradient>
        <linearGradient id="genHeaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* DNA strand gradients */}
        <linearGradient id="dnaStrand1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="dnaStrand2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* Chromosome gradients */}
        <linearGradient id="xChromoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="yChromoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="autoChromoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Card gradients */}
        <linearGradient id="mendelCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FAFAFA" />
        </linearGradient>
        <linearGradient id="punnettGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="disorderCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        {/* Filters */}
        <filter id="genShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
        </filter>
        <filter id="genCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.12" />
        </filter>
        <filter id="genGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="genInnerGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="900" height="650" rx="24" fill="url(#genBgGrad)" />

      {/* Decorative background elements */}
      <circle cx="850" cy="80" r="120" fill="#8B5CF6" fillOpacity="0.06" />
      <circle cx="50" cy="600" r="100" fill="#EC4899" fillOpacity="0.05" />
      <circle cx="450" cy="325" r="200" fill="#A78BFA" fillOpacity="0.03" />

      {/* Header */}
      <rect
        x="20"
        y="15"
        width="860"
        height="50"
        rx="12"
        fill="url(#genHeaderGrad)"
        filter="url(#genShadow)"
      />
      <text
        x="450"
        y="48"
        fontSize="22"
        fill="#FFFFFF"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        Principles of Inheritance and Variation
      </text>

      {/* NEET Badge */}
      <g
        filter="url(#genGlow)"
      >
        <circle cx="820" cy="40" r="28" fill="#FBBF24" />
        <text
          x="820"
          y="36"
          fontSize="12"
          fill="#78350F"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          8-12
        </text>
        <text
          x="820"
          y="50"
          fontSize="9"
          fill="#78350F"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Qs
        </text>
      </g>

      {/* ============ SECTION 1: DNA Double Helix (Left) ============ */}
      <g filter="url(#genCardShadow)">
        <rect x="30" y="80" width="180" height="280" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="30" y="80" width="180" height="30" rx="16" fill="#8B5CF6" />
        <rect x="30" y="95" width="180" height="15" fill="#8B5CF6" />
        <text
          x="120"
          y="100"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          DNA Structure
        </text>

        {/* DNA Double Helix Animation */}
        <g
          style={{ transformOrigin: '120px 230px' }}
        >
          {/* Left strand */}
          <path
            d="M70 130 Q100 155 70 180 Q40 205 70 230 Q100 255 70 280 Q40 305 70 330"
            stroke="url(#dnaStrand1)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right strand */}
          <path
            d="M170 130 Q140 155 170 180 Q200 205 170 230 Q140 255 170 280 Q200 305 170 330"
            stroke="url(#dnaStrand2)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Base pairs with labels */}
          {[
            { y: 145, color: '#F472B6', left: 'A', right: 'T' },
            { y: 170, color: '#34D399', left: 'G', right: 'C' },
            { y: 195, color: '#FBBF24', left: 'T', right: 'A' },
            { y: 220, color: '#60A5FA', left: 'C', right: 'G' },
            { y: 245, color: '#F472B6', left: 'A', right: 'T' },
            { y: 270, color: '#34D399', left: 'G', right: 'C' },
            { y: 295, color: '#FBBF24', left: 'T', right: 'A' },
            { y: 320, color: '#60A5FA', left: 'C', right: 'G' },
          ].map((pair, i) => (
            <g key={`bp-${i}`}>
              <line
                x1="70"
                y1={pair.y}
                x2="170"
                y2={pair.y}
                stroke={pair.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="85" cy={pair.y} r="8" fill={pair.color} />
              <text
                x="85"
                y={pair.y + 4}
                fontSize="8"
                fill="white"
                textAnchor="middle"
                fontWeight="bold"
              >
                {pair.left}
              </text>
              <circle cx="155" cy={pair.y} r="8" fill={pair.color} />
              <text
                x="155"
                y={pair.y + 4}
                fontSize="8"
                fill="white"
                textAnchor="middle"
                fontWeight="bold"
              >
                {pair.right}
              </text>
            </g>
          ))}
        </g>

        {/* Legend */}
        <rect x="45" y="340" width="150" height="15" rx="4" fill="#F3E8FF" />
        <text
          x="120"
          y="351"
          fontSize="8"
          fill="#6D28D9"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          A-T (2 H-bonds) • G-C (3 H-bonds)
        </text>
      </g>

      {/* ============ SECTION 2: Mendel's Laws (Center-Left) ============ */}
      <g filter="url(#genCardShadow)">
        <rect x="225" y="80" width="200" height="175" rx="16" fill="url(#mendelCardGrad)" />
        <rect x="225" y="80" width="200" height="30" rx="16" fill="#7C3AED" />
        <rect x="225" y="95" width="200" height="15" fill="#7C3AED" />
        <text
          x="325"
          y="100"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Mendel's Laws
        </text>

        {/* Law 1: Dominance */}
        <g
        >
          <circle cx="250" cy="130" r="12" fill="#DDD6FE" />
          <text x="250" y="135" fontSize="11" fill="#6D28D9" textAnchor="middle" fontWeight="bold">
            1
          </text>
          <text
            x="270"
            y="128"
            fontSize="10"
            fill="#374151"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            Law of Dominance
          </text>
          <text x="270" y="140" fontSize="8" fill="#6B7280" fontFamily="system-ui, sans-serif">
            F1 shows dominant trait only
          </text>
        </g>

        {/* Law 2: Segregation */}
        <g
        >
          <circle cx="250" cy="165" r="12" fill="#C4B5FD" />
          <text x="250" y="170" fontSize="11" fill="#6D28D9" textAnchor="middle" fontWeight="bold">
            2
          </text>
          <text
            x="270"
            y="163"
            fontSize="10"
            fill="#374151"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            Law of Segregation
          </text>
          <text x="270" y="175" fontSize="8" fill="#6B7280" fontFamily="system-ui, sans-serif">
            Alleles separate in gametes
          </text>
        </g>

        {/* Law 3: Independent Assortment */}
        <g
        >
          <circle cx="250" cy="200" r="12" fill="#A78BFA" />
          <text x="250" y="205" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">
            3
          </text>
          <text
            x="270"
            y="198"
            fontSize="10"
            fill="#374151"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            Independent Assortment
          </text>
          <text x="270" y="210" fontSize="8" fill="#6B7280" fontFamily="system-ui, sans-serif">
            Genes assort independently
          </text>
        </g>

        {/* Pea plant traits */}
        <rect x="235" y="225" width="180" height="22" rx="6" fill="#F3E8FF" />
        <text
          x="325"
          y="240"
          fontSize="9"
          fill="#7C3AED"
          textAnchor="middle"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          7 Contrasting Traits in Pea Plant
        </text>
      </g>

      {/* ============ SECTION 3: Monohybrid Cross / Punnett Square ============ */}
      <g filter="url(#genCardShadow)">
        <rect x="440" y="80" width="200" height="175" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="440" y="80" width="200" height="30" rx="16" fill="#10B981" />
        <rect x="440" y="95" width="200" height="15" fill="#10B981" />
        <text
          x="540"
          y="100"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Monohybrid Cross (Tt × Tt)
        </text>

        {/* Punnett Square Grid */}
        <rect
          x="470"
          y="115"
          width="140"
          height="110"
          rx="8"
          fill="#ECFDF5"
          stroke="#10B981"
          strokeWidth="2"
        />

        {/* Grid lines */}
        <line x1="540" y1="115" x2="540" y2="225" stroke="#A7F3D0" strokeWidth="2" />
        <line x1="470" y1="145" x2="610" y2="145" stroke="#A7F3D0" strokeWidth="2" />
        <line x1="470" y1="170" x2="610" y2="170" stroke="#A7F3D0" strokeWidth="2" />
        <line x1="470" y1="195" x2="610" y2="195" stroke="#A7F3D0" strokeWidth="2" />

        {/* Headers */}
        <text x="505" y="138" fontSize="11" fill="#059669" textAnchor="middle" fontWeight="bold">
          T
        </text>
        <text x="575" y="138" fontSize="11" fill="#059669" textAnchor="middle" fontWeight="bold">
          t
        </text>
        <text x="480" y="160" fontSize="11" fill="#059669" fontWeight="bold">
          T
        </text>
        <text x="480" y="188" fontSize="11" fill="#059669" fontWeight="bold">
          t
        </text>

        {/* Results with animation */}
        <g
        >
          <rect x="490" y="148" width="40" height="20" rx="4" fill="#059669" />
          <text x="510" y="162" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            TT
          </text>
        </g>

        <g
        >
          <rect x="550" y="148" width="40" height="20" rx="4" fill="#10B981" />
          <text x="570" y="162" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            Tt
          </text>
        </g>

        <g
        >
          <rect x="490" y="173" width="40" height="20" rx="4" fill="#10B981" />
          <text x="510" y="187" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            Tt
          </text>
        </g>

        <g
        >
          <rect x="550" y="173" width="40" height="20" rx="4" fill="#6EE7B7" />
          <text x="570" y="187" fontSize="10" fill="#065F46" textAnchor="middle" fontWeight="bold">
            tt
          </text>
        </g>

        {/* Ratio */}
        <rect x="460" y="230" width="160" height="18" rx="6" fill="#D1FAE5" />
        <text
          x="540"
          y="243"
          fontSize="9"
          fill="#047857"
          textAnchor="middle"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          F2 Ratio: 3 Tall : 1 Dwarf (3:1)
        </text>
      </g>

      {/* ============ SECTION 4: Dihybrid Cross ============ */}
      <g filter="url(#genCardShadow)">
        <rect x="655" y="80" width="220" height="175" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="655" y="80" width="220" height="30" rx="16" fill="#3B82F6" />
        <rect x="655" y="95" width="220" height="15" fill="#3B82F6" />
        <text
          x="765"
          y="100"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Dihybrid Cross (9:3:3:1)
        </text>

        {/* Phenotype boxes */}
        <g
        >
          <rect
            x="670"
            y="120"
            width="90"
            height="35"
            rx="8"
            fill="#DBEAFE"
            stroke="#3B82F6"
            strokeWidth="1"
          />
          <text x="715" y="135" fontSize="9" fill="#1E40AF" textAnchor="middle" fontWeight="bold">
            Round Yellow
          </text>
          <text x="715" y="148" fontSize="14" fill="#2563EB" textAnchor="middle" fontWeight="bold">
            9
          </text>
        </g>

        <g
        >
          <rect
            x="770"
            y="120"
            width="90"
            height="35"
            rx="8"
            fill="#FEF3C7"
            stroke="#F59E0B"
            strokeWidth="1"
          />
          <text x="815" y="135" fontSize="9" fill="#B45309" textAnchor="middle" fontWeight="bold">
            Round Green
          </text>
          <text x="815" y="148" fontSize="14" fill="#D97706" textAnchor="middle" fontWeight="bold">
            3
          </text>
        </g>

        <g
        >
          <rect
            x="670"
            y="162"
            width="90"
            height="35"
            rx="8"
            fill="#FCE7F3"
            stroke="#EC4899"
            strokeWidth="1"
          />
          <text x="715" y="177" fontSize="9" fill="#BE185D" textAnchor="middle" fontWeight="bold">
            Wrinkled Yellow
          </text>
          <text x="715" y="190" fontSize="14" fill="#DB2777" textAnchor="middle" fontWeight="bold">
            3
          </text>
        </g>

        <g
        >
          <rect
            x="770"
            y="162"
            width="90"
            height="35"
            rx="8"
            fill="#E0E7FF"
            stroke="#6366F1"
            strokeWidth="1"
          />
          <text x="815" y="177" fontSize="9" fill="#4338CA" textAnchor="middle" fontWeight="bold">
            Wrinkled Green
          </text>
          <text x="815" y="190" fontSize="14" fill="#4F46E5" textAnchor="middle" fontWeight="bold">
            1
          </text>
        </g>

        {/* Cross notation */}
        <rect x="675" y="205" width="180" height="18" rx="6" fill="#EFF6FF" />
        <text
          x="765"
          y="218"
          fontSize="9"
          fill="#1D4ED8"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          RrYy × RrYy → 16 combinations
        </text>

        {/* Genotypic ratio */}
        <text
          x="765"
          y="245"
          fontSize="8"
          fill="#6B7280"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Genotypic: 1:2:1:2:4:2:1:2:1
        </text>
      </g>

      {/* ============ SECTION 5: Sex Determination & Chromosomes ============ */}
      <g filter="url(#genCardShadow)">
        <rect x="30" y="375" width="255" height="255" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="30" y="375" width="255" height="30" rx="16" fill="#EC4899" />
        <rect x="30" y="390" width="255" height="15" fill="#EC4899" />
        <text
          x="157"
          y="395"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Sex Determination (XX-XY System)
        </text>

        {/* Sex chromosomes diagram */}
        <g>
          {/* Female XX */}
          <g
          >
            <text x="85" y="425" fontSize="10" fill="#BE185D" textAnchor="middle" fontWeight="bold">
              Female (XX)
            </text>
            <path
              d="M55 440 L80 500 M80 440 L55 500"
              stroke="url(#xChromoGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="67" cy="470" r="5" fill="#FDF2F8" stroke="#EC4899" strokeWidth="2" />
            <path
              d="M95 440 L120 500 M120 440 L95 500"
              stroke="url(#xChromoGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="107" cy="470" r="5" fill="#FDF2F8" stroke="#EC4899" strokeWidth="2" />
            <text x="85" y="520" fontSize="9" fill="#9D174D" textAnchor="middle">
              44 + XX
            </text>
          </g>

          {/* Male XY */}
          <g
          >
            <text
              x="200"
              y="425"
              fontSize="10"
              fill="#1E40AF"
              textAnchor="middle"
              fontWeight="bold"
            >
              Male (XY)
            </text>
            <path
              d="M165 440 L190 500 M190 440 L165 500"
              stroke="url(#xChromoGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="177" cy="470" r="5" fill="#FDF2F8" stroke="#EC4899" strokeWidth="2" />
            <path
              d="M215 440 L215 475"
              stroke="url(#yChromoGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M200 490 L215 475 L230 490"
              stroke="url(#yChromoGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="200" y="520" fontSize="9" fill="#1E3A8A" textAnchor="middle">
              44 + XY
            </text>
          </g>
        </g>

        {/* Gametes arrow */}
        <g
        >
          <line
            x1="85"
            y1="535"
            x2="85"
            y2="555"
            stroke="#EC4899"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <text x="85" y="570" fontSize="8" fill="#BE185D" textAnchor="middle">
            All X
          </text>

          <line x1="200" y1="535" x2="200" y2="555" stroke="#3B82F6" strokeWidth="2" />
          <text x="200" y="570" fontSize="8" fill="#1E40AF" textAnchor="middle">
            X or Y
          </text>
        </g>

        {/* Key point */}
        <rect x="50" y="590" width="215" height="30" rx="8" fill="#FDF2F8" />
        <text
          x="157"
          y="605"
          fontSize="9"
          fill="#BE185D"
          textAnchor="middle"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          Father determines sex of offspring
        </text>
        <text
          x="157"
          y="616"
          fontSize="8"
          fill="#9D174D"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          (by contributing X or Y sperm)
        </text>
      </g>

      {/* ============ SECTION 6: Sex-Linked Inheritance ============ */}
      <g filter="url(#genCardShadow)">
        <rect x="300" y="270" width="280" height="150" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="300" y="270" width="280" height="30" rx="16" fill="#F59E0B" />
        <rect x="300" y="285" width="280" height="15" fill="#F59E0B" />
        <text
          x="440"
          y="290"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          X-Linked Inheritance (Color Blindness)
        </text>

        {/* Criss-cross inheritance diagram */}
        <g>
          {/* Carrier mother */}
          <circle cx="350" cy="330" r="18" fill="#FDF2F8" stroke="#EC4899" strokeWidth="2" />
          <text x="350" y="327" fontSize="8" fill="#BE185D" textAnchor="middle" fontWeight="bold">
            X
          </text>
          <text x="350" y="338" fontSize="7" fill="#BE185D" textAnchor="middle">
            Carrier
          </text>
          <text x="350" y="360" fontSize="8" fill="#6B7280" textAnchor="middle">
            XᶜX
          </text>

          {/* Normal father */}
          <rect
            x="498"
            y="312"
            width="36"
            height="36"
            rx="4"
            fill="#DBEAFE"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <text x="516" y="327" fontSize="8" fill="#1E40AF" textAnchor="middle" fontWeight="bold">
            XY
          </text>
          <text x="516" y="338" fontSize="7" fill="#1E40AF" textAnchor="middle">
            Normal
          </text>
          <text x="516" y="360" fontSize="8" fill="#6B7280" textAnchor="middle">
            XY
          </text>

          {/* Arrows */}
          <path
            d="M368 330 L420 370"
            stroke="#EC4899"
            strokeWidth="2"
            strokeDasharray="5,3"
            fill="none"
          />
          <path
            d="M498 330 L450 370"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="5,3"
            fill="none"
          />

          {/* Offspring */}
          <circle cx="390" y="395" r="14" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.5" />
          <text x="390" y="399" fontSize="7" fill="#BE185D" textAnchor="middle">
            XX
          </text>

          <circle
            cx="420"
            y="395"
            r="14"
            fill="#FCE7F3"
            stroke="#EC4899"
            strokeWidth="1.5"
            strokeDasharray="3,2"
          />
          <text x="420" y="399" fontSize="7" fill="#BE185D" textAnchor="middle">
            XᶜX
          </text>

          <rect
            x="438"
            y="381"
            width="28"
            height="28"
            rx="3"
            fill="#DBEAFE"
            stroke="#3B82F6"
            strokeWidth="1.5"
          />
          <text x="452" y="399" fontSize="7" fill="#1E40AF" textAnchor="middle">
            XY
          </text>

          <rect
            x="472"
            y="381"
            width="28"
            height="28"
            rx="3"
            fill="#FEF2F2"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <text x="486" y="395" fontSize="6" fill="#DC2626" textAnchor="middle" fontWeight="bold">
            XᶜY
          </text>
          <text x="486" y="404" fontSize="5" fill="#DC2626" textAnchor="middle">
            CB
          </text>
        </g>

        {/* Legend */}
        <text
          x="440"
          y="415"
          fontSize="7"
          fill="#6B7280"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Criss-cross: Father→Daughter→Grandson
        </text>
      </g>

      {/* ============ SECTION 7: Chromosomal Disorders ============ */}
      <g filter="url(#genCardShadow)">
        <rect x="300" y="435" width="280" height="195" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="300" y="435" width="280" height="30" rx="16" fill="#EF4444" />
        <rect x="300" y="450" width="280" height="15" fill="#EF4444" />
        <text
          x="440"
          y="455"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Chromosomal Disorders
        </text>

        {/* Down Syndrome */}
        <g
        >
          <rect
            x="315"
            y="475"
            width="120"
            height="45"
            rx="8"
            fill="#FEF2F2"
            stroke="#FECACA"
            strokeWidth="1"
          />
          <text x="375" y="490" fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="bold">
            Down Syndrome
          </text>
          <text x="375" y="503" fontSize="10" fill="#7F1D1D" textAnchor="middle" fontWeight="bold">
            47, +21
          </text>
          <text x="375" y="515" fontSize="7" fill="#991B1B" textAnchor="middle">
            Trisomy 21
          </text>
        </g>

        {/* Turner Syndrome */}
        <g
        >
          <rect
            x="445"
            y="475"
            width="120"
            height="45"
            rx="8"
            fill="#FCE7F3"
            stroke="#FBCFE8"
            strokeWidth="1"
          />
          <text x="505" y="490" fontSize="9" fill="#BE185D" textAnchor="middle" fontWeight="bold">
            Turner Syndrome
          </text>
          <text x="505" y="503" fontSize="10" fill="#831843" textAnchor="middle" fontWeight="bold">
            45, X
          </text>
          <text x="505" y="515" fontSize="7" fill="#9D174D" textAnchor="middle">
            Female, Monosomy X
          </text>
        </g>

        {/* Klinefelter Syndrome */}
        <g
        >
          <rect
            x="315"
            y="530"
            width="120"
            height="45"
            rx="8"
            fill="#DBEAFE"
            stroke="#BFDBFE"
            strokeWidth="1"
          />
          <text x="375" y="545" fontSize="9" fill="#1E40AF" textAnchor="middle" fontWeight="bold">
            Klinefelter
          </text>
          <text x="375" y="558" fontSize="10" fill="#1E3A8A" textAnchor="middle" fontWeight="bold">
            47, XXY
          </text>
          <text x="375" y="570" fontSize="7" fill="#1D4ED8" textAnchor="middle">
            Male, sterile
          </text>
        </g>

        {/* Super Female */}
        <g
        >
          <rect
            x="445"
            y="530"
            width="120"
            height="45"
            rx="8"
            fill="#F3E8FF"
            stroke="#E9D5FF"
            strokeWidth="1"
          />
          <text x="505" y="545" fontSize="9" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
            Super Female
          </text>
          <text x="505" y="558" fontSize="10" fill="#5B21B6" textAnchor="middle" fontWeight="bold">
            47, XXX
          </text>
          <text x="505" y="570" fontSize="7" fill="#6D28D9" textAnchor="middle">
            Female, usually normal
          </text>
        </g>

        {/* Cause */}
        <rect x="330" y="585" width="220" height="20" rx="6" fill="#FEE2E2" />
        <text
          x="440"
          y="599"
          fontSize="8"
          fill="#B91C1C"
          textAnchor="middle"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          Cause: Non-disjunction during meiosis
        </text>
        <text
          x="440"
          y="620"
          fontSize="7"
          fill="#6B7280"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Risk increases with maternal age
        </text>
      </g>

      {/* ============ SECTION 8: Extensions of Mendelian Genetics ============ */}
      <g filter="url(#genCardShadow)">
        <rect x="595" y="270" width="280" height="150" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="595" y="270" width="280" height="30" rx="16" fill="#8B5CF6" />
        <rect x="595" y="285" width="280" height="15" fill="#8B5CF6" />
        <text
          x="735"
          y="290"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Extensions of Mendelian Genetics
        </text>

        {/* Incomplete Dominance */}
        <g>
          <rect x="610" y="310" width="125" height="50" rx="8" fill="#FCE7F3" />
          <text x="672" y="325" fontSize="9" fill="#BE185D" textAnchor="middle" fontWeight="bold">
            Incomplete Dominance
          </text>
          <circle cx="630" cy="345" r="8" fill="#DC2626" />
          <text x="652" y="348" fontSize="10" fill="#374151">
            +
          </text>
          <circle cx="672" cy="345" r="8" fill="white" stroke="#9CA3AF" strokeWidth="1" />
          <text x="692" y="348" fontSize="10" fill="#374151">
            =
          </text>
          <circle cx="712" cy="345" r="8" fill="#F472B6" />
          <text x="672" y="358" fontSize="7" fill="#9D174D" textAnchor="middle">
            1:2:1 (Snapdragon)
          </text>
        </g>

        {/* Co-dominance */}
        <g>
          <rect x="745" y="310" width="120" height="50" rx="8" fill="#FEF3C7" />
          <text x="805" y="325" fontSize="9" fill="#B45309" textAnchor="middle" fontWeight="bold">
            Co-dominance
          </text>
          <text x="805" y="345" fontSize="10" fill="#92400E" textAnchor="middle" fontWeight="bold">
            ABO Blood Groups
          </text>
          <text x="805" y="358" fontSize="7" fill="#B45309" textAnchor="middle">
            Iᴬ Iᴮ = AB (both express)
          </text>
        </g>

        {/* Multiple Alleles & Pleiotropy */}
        <g>
          <rect x="610" y="368" width="85" height="42" rx="6" fill="#ECFDF5" />
          <text x="652" y="383" fontSize="8" fill="#047857" textAnchor="middle" fontWeight="bold">
            Multiple Alleles
          </text>
          <text x="652" y="396" fontSize="7" fill="#059669" textAnchor="middle">
            ABO: Iᴬ, Iᴮ, i
          </text>
          <text x="652" y="406" fontSize="6" fill="#6B7280" textAnchor="middle">
            3 alleles, 6 genotypes
          </text>
        </g>

        <g>
          <rect x="705" y="368" width="75" height="42" rx="6" fill="#EDE9FE" />
          <text x="742" y="383" fontSize="8" fill="#6D28D9" textAnchor="middle" fontWeight="bold">
            Pleiotropy
          </text>
          <text x="742" y="396" fontSize="7" fill="#7C3AED" textAnchor="middle">
            1 gene →
          </text>
          <text x="742" y="406" fontSize="6" fill="#6B7280" textAnchor="middle">
            multiple effects
          </text>
        </g>

        <g>
          <rect x="790" y="368" width="75" height="42" rx="6" fill="#DBEAFE" />
          <text x="827" y="383" fontSize="8" fill="#1E40AF" textAnchor="middle" fontWeight="bold">
            Epistasis
          </text>
          <text x="827" y="396" fontSize="7" fill="#2563EB" textAnchor="middle">
            Gene masks
          </text>
          <text x="827" y="406" fontSize="6" fill="#6B7280" textAnchor="middle">
            another (9:3:4)
          </text>
        </g>
      </g>

      {/* ============ SECTION 9: Mendelian Disorders ============ */}
      <g filter="url(#genCardShadow)">
        <rect x="595" y="435" width="280" height="195" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="595" y="435" width="280" height="30" rx="16" fill="#F97316" />
        <rect x="595" y="450" width="280" height="15" fill="#F97316" />
        <text
          x="735"
          y="455"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Mendelian Disorders (Single Gene)
        </text>

        {/* Sickle Cell Anemia - detailed */}
        <g
        >
          <rect
            x="610"
            y="475"
            width="250"
            height="55"
            rx="8"
            fill="#FEF2F2"
            stroke="#FECACA"
            strokeWidth="1"
          />
          <text x="735" y="490" fontSize="10" fill="#DC2626" textAnchor="middle" fontWeight="bold">
            Sickle Cell Anemia
          </text>
          <text x="735" y="505" fontSize="8" fill="#7F1D1D" textAnchor="middle">
            GAG→GUG (Glu→Val at position 6)
          </text>
          <text x="735" y="518" fontSize="7" fill="#991B1B" textAnchor="middle">
            Autosomal recessive • Malaria resistance in carriers (HbA HbS)
          </text>

          {/* Normal vs Sickle RBC */}
          <ellipse cx="640" cy="505" rx="12" ry="8" fill="#EF4444" opacity="0.6" />
          <text x="660" y="508" fontSize="8" fill="#7F1D1D">
            →
          </text>
          <path d="M675 500 Q680 505 675 510 Q685 505 675 500" fill="#DC2626" />
        </g>

        {/* Other disorders list */}
        <g>
          <rect x="610" y="540" width="120" height="35" rx="6" fill="#FFFBEB" />
          <text x="670" y="555" fontSize="8" fill="#B45309" textAnchor="middle" fontWeight="bold">
            Autosomal Dominant
          </text>
          <text x="670" y="568" fontSize="7" fill="#92400E" textAnchor="middle">
            Huntington's, Polydactyly
          </text>
        </g>

        <g>
          <rect x="740" y="540" width="120" height="35" rx="6" fill="#F0FDF4" />
          <text x="800" y="555" fontSize="8" fill="#047857" textAnchor="middle" fontWeight="bold">
            Autosomal Recessive
          </text>
          <text x="800" y="568" fontSize="7" fill="#059669" textAnchor="middle">
            PKU, Thalassemia, CF
          </text>
        </g>

        {/* Linkage info */}
        <rect x="610" y="585" width="250" height="40" rx="8" fill="#F3E8FF" />
        <text x="735" y="600" fontSize="9" fill="#6D28D9" textAnchor="middle" fontWeight="bold">
          Linkage & Recombination
        </text>
        <text x="735" y="613" fontSize="7" fill="#7C3AED" textAnchor="middle">
          Genes on same chromosome don't assort independently
        </text>
        <text x="735" y="623" fontSize="7" fill="#6B7280" textAnchor="middle">
          1% RF = 1 centiMorgan (cM) = 1 map unit
        </text>
      </g>

      {/* Key Facts Panel */}
      <g filter="url(#genCardShadow)">
        <rect x="30" y="635" width="840" height="12" rx="6" fill="#7C3AED" />
        <text
          x="450"
          y="644"
          fontSize="8"
          fill="white"
          textAnchor="middle"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          Key: Test Cross (Tt×tt) reveals genotype • Monohybrid 3:1 • Dihybrid 9:3:3:1 • Epistasis
          9:3:4 or 12:3:1 • Incomplete Dominance 1:2:1
        </text>
      </g>
    </Wrapper>
  )
}
