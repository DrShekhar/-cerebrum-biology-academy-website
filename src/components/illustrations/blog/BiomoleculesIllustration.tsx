'use client'

import type { IllustrationProps } from './shared'

export function BiomoleculesIllustration({ className = '', animate = true }: IllustrationProps) {
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
        {/* Background gradient */}
        <linearGradient id="biomolBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EEF2FF" />
          <stop offset="50%" stopColor="#F5F3FF" />
          <stop offset="100%" stopColor="#FDF2F8" />
        </linearGradient>

        {/* Carbohydrate gradient - Blue */}
        <linearGradient id="carbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="carbCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#BFDBFE" />
        </linearGradient>

        {/* Protein gradient - Green */}
        <linearGradient id="proteinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="proteinCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>

        {/* Lipid gradient - Orange */}
        <linearGradient id="lipidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="lipidCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        {/* Nucleic Acid gradient - Purple */}
        <linearGradient id="nucleicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="nucleicCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EDE9FE" />
          <stop offset="100%" stopColor="#DDD6FE" />
        </linearGradient>

        {/* Center gradient */}
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </radialGradient>

        {/* Shadow filters */}
        <filter id="biomolShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
        </filter>
        <filter id="biomolCardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
        </filter>
        <filter id="biomolGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="moleculeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="520" height="400" fill="url(#biomolBgGrad)" />

      {/* Decorative background circles */}
      <circle cx="50" cy="50" r="80" fill="#3B82F6" opacity="0.05" />
      <circle cx="470" cy="50" r="60" fill="#10B981" opacity="0.05" />
      <circle cx="50" cy="350" r="70" fill="#F59E0B" opacity="0.05" />
      <circle cx="470" cy="350" r="90" fill="#8B5CF6" opacity="0.05" />

      {/* Center hexagon representing cell/biomolecule hub */}
      <motion.g
      >
        <circle cx="260" cy="200" r="55" fill="url(#centerGlow)" filter="url(#biomolShadow)" />
        <circle cx="260" cy="200" r="50" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <text x="260" y="192" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
          BIOMOLECULES
        </text>
        <text x="260" y="208" textAnchor="middle" fill="#64748B" fontSize="9">
          Building Blocks
        </text>
        <text x="260" y="222" textAnchor="middle" fill="#64748B" fontSize="9">
          of Life
        </text>
      </motion.g>

      {/* Carbohydrates - Top Left */}
      <motion.g
      >
        {/* Card */}
        <rect
          x="30"
          y="40"
          width="140"
          height="130"
          rx="12"
          fill="url(#carbCardGrad)"
          filter="url(#biomolCardShadow)"
        />
        <rect x="30" y="40" width="140" height="130" rx="12" fill="white" fillOpacity="0.5" />

        {/* Glucose ring structure */}
        <g filter="url(#moleculeGlow)">
          {/* Hexagon ring */}
          <polygon
            points="100,65 125,78 125,103 100,116 75,103 75,78"
            fill="none"
            stroke="url(#carbGrad)"
            strokeWidth="3"
          />
          {/* Carbon atoms */}
          <circle cx="100" cy="65" r="6" fill="url(#carbGrad)" />
          <circle cx="125" cy="78" r="5" fill="#60A5FA" />
          <circle cx="125" cy="103" r="5" fill="#60A5FA" />
          <circle cx="100" cy="116" r="6" fill="url(#carbGrad)" />
          <circle cx="75" cy="103" r="5" fill="#60A5FA" />
          <circle cx="75" cy="78" r="5" fill="#60A5FA" />
          {/* Oxygen in ring */}
          <circle cx="100" cy="90" r="4" fill="#EF4444" />
          <text x="100" y="93" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
            O
          </text>
        </g>

        {/* Label */}
        <rect x="45" y="130" width="110" height="28" rx="6" fill="url(#carbGrad)" />
        <text x="100" y="148" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
          CARBOHYDRATES
        </text>

        {/* Info badge */}
        <circle cx="155" cy="55" r="12" fill="url(#carbGrad)" />
        <text x="155" y="59" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
          C
        </text>
      </motion.g>

      {/* Connection line to center */}
      <motion.line
        x1="170"
        y1="105"
        x2="210"
        y2="175"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeDasharray="4 2"
        opacity="0.4"
      />

      {/* Proteins - Top Right */}
      <motion.g
      >
        {/* Card */}
        <rect
          x="350"
          y="40"
          width="140"
          height="130"
          rx="12"
          fill="url(#proteinCardGrad)"
          filter="url(#biomolCardShadow)"
        />
        <rect x="350" y="40" width="140" height="130" rx="12" fill="white" fillOpacity="0.5" />

        {/* Alpha helix structure */}
        <g filter="url(#moleculeGlow)">
          {/* Helix backbone */}
          <path
            d="M395 70 Q410 80 395 90 Q380 100 395 110"
            stroke="url(#proteinGrad)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M445 70 Q430 80 445 90 Q460 100 445 110"
            stroke="url(#proteinGrad)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Amino acid nodes */}
          <circle cx="395" cy="70" r="5" fill="url(#proteinGrad)" />
          <circle cx="395" cy="90" r="6" fill="#34D399" />
          <circle cx="395" cy="110" r="5" fill="url(#proteinGrad)" />
          <circle cx="445" cy="70" r="5" fill="url(#proteinGrad)" />
          <circle cx="445" cy="90" r="6" fill="#34D399" />
          <circle cx="445" cy="110" r="5" fill="url(#proteinGrad)" />
          {/* Hydrogen bonds */}
          <line
            x1="400"
            y1="80"
            x2="440"
            y2="80"
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0.6"
          />
          <line
            x1="400"
            y1="100"
            x2="440"
            y2="100"
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0.6"
          />
        </g>

        {/* Label */}
        <rect x="365" y="130" width="110" height="28" rx="6" fill="url(#proteinGrad)" />
        <text x="420" y="148" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
          PROTEINS
        </text>

        {/* Info badge */}
        <circle cx="475" cy="55" r="12" fill="url(#proteinGrad)" />
        <text x="475" y="59" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
          P
        </text>
      </motion.g>

      {/* Connection line to center */}
      <motion.line
        x1="350"
        y1="105"
        x2="310"
        y2="175"
        stroke="#10B981"
        strokeWidth="2"
        strokeDasharray="4 2"
        opacity="0.4"
      />

      {/* Lipids - Bottom Left */}
      <motion.g
      >
        {/* Card */}
        <rect
          x="30"
          y="230"
          width="140"
          height="130"
          rx="12"
          fill="url(#lipidCardGrad)"
          filter="url(#biomolCardShadow)"
        />
        <rect x="30" y="230" width="140" height="130" rx="12" fill="white" fillOpacity="0.5" />

        {/* Phospholipid structure */}
        <g filter="url(#moleculeGlow)">
          {/* Head (circle) */}
          <circle cx="80" cy="265" r="12" fill="url(#lipidGrad)" />
          <circle cx="120" cy="265" r="12" fill="url(#lipidGrad)" />
          {/* Tails (wavy lines) */}
          <path
            d="M80 277 L80 290 Q75 300 80 310 Q85 320 80 330"
            stroke="#F59E0B"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M85 277 L85 290 Q90 300 85 310 Q80 320 85 330"
            stroke="#FBBF24"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M120 277 L120 290 Q115 300 120 310 Q125 320 120 330"
            stroke="#F59E0B"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M125 277 L125 290 Q130 300 125 310 Q120 320 125 330"
            stroke="#FBBF24"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Labels */}
          <text x="100" y="258" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
            PO₄
          </text>
        </g>

        {/* Label */}
        <rect x="45" y="320" width="110" height="28" rx="6" fill="url(#lipidGrad)" />
        <text x="100" y="338" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
          LIPIDS
        </text>

        {/* Info badge */}
        <circle cx="155" cy="245" r="12" fill="url(#lipidGrad)" />
        <text x="155" y="249" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
          L
        </text>
      </motion.g>

      {/* Connection line to center */}
      <motion.line
        x1="170"
        y1="295"
        x2="210"
        y2="225"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="4 2"
        opacity="0.4"
      />

      {/* Nucleic Acids - Bottom Right */}
      <motion.g
      >
        {/* Card */}
        <rect
          x="350"
          y="230"
          width="140"
          height="130"
          rx="12"
          fill="url(#nucleicCardGrad)"
          filter="url(#biomolCardShadow)"
        />
        <rect x="350" y="230" width="140" height="130" rx="12" fill="white" fillOpacity="0.5" />

        {/* DNA double helix */}
        <g filter="url(#moleculeGlow)">
          {/* Left strand */}
          <path
            d="M400 250 Q385 265 400 280 Q415 295 400 310 Q385 325 400 340"
            stroke="url(#nucleicGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right strand */}
          <path
            d="M440 250 Q455 265 440 280 Q425 295 440 310 Q455 325 440 340"
            stroke="#A78BFA"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Base pairs */}
          <line
            x1="400"
            y1="258"
            x2="440"
            y2="272"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="400"
            y1="280"
            x2="440"
            y2="280"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="400"
            y1="302"
            x2="440"
            y2="288"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="400"
            y1="324"
            x2="440"
            y2="310"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity="0.6"
          />
          {/* Base pair labels */}
          <circle cx="420" cy="265" r="6" fill="#C084FC" />
          <text x="420" y="268" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
            AT
          </text>
          <circle cx="420" cy="295" r="6" fill="#A855F7" />
          <text x="420" y="298" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
            GC
          </text>
        </g>

        {/* Label */}
        <rect x="355" y="320" width="120" height="28" rx="6" fill="url(#nucleicGrad)" />
        <text x="415" y="338" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">
          NUCLEIC ACIDS
        </text>

        {/* Info badge */}
        <circle cx="475" cy="245" r="12" fill="url(#nucleicGrad)" />
        <text x="475" y="249" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
          N
        </text>
      </motion.g>

      {/* Connection line to center */}
      <motion.line
        x1="350"
        y1="295"
        x2="310"
        y2="225"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeDasharray="4 2"
        opacity="0.4"
      />

      {/* Bottom info bar */}
      <motion.g
      >
        <rect
          x="180"
          y="365"
          width="160"
          height="28"
          rx="14"
          fill="white"
          filter="url(#biomolCardShadow)"
        />
        <text x="260" y="383" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
          C • H • O • N • P • S
        </text>
      </motion.g>

      {/* Title */}
      <motion.text
        x="260"
        y="22"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="14"
        fontWeight="700"
      >
        The 4 Major Biomolecules
      </motion.text>
    </Wrapper>
  )
}
