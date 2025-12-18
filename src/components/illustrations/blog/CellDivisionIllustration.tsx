'use client'

import { motion } from 'framer-motion'
import type { IllustrationProps } from './shared'

export function CellDivisionIllustration({ className = '', animate = true }: IllustrationProps) {
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
        <linearGradient id="cellDivBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0F9FF" />
          <stop offset="50%" stopColor="#F5F3FF" />
          <stop offset="100%" stopColor="#FDF4FF" />
        </linearGradient>

        {/* Cell membrane gradient */}
        <linearGradient id="cellMembraneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Cytoplasm gradient */}
        <radialGradient id="cytoplasmGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF4FF" />
          <stop offset="70%" stopColor="#FAE8FF" />
          <stop offset="100%" stopColor="#F5D0FE" />
        </radialGradient>

        {/* Nucleus gradient */}
        <radialGradient id="nucleusGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#9333EA" />
        </radialGradient>

        {/* Chromosome gradients */}
        <linearGradient id="chromoBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="chromoRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="chromoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="chromoOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Spindle fiber gradient */}
        <linearGradient id="spindleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#64748B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.3" />
        </linearGradient>

        {/* Label card gradients */}
        <linearGradient id="mitosisCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#BFDBFE" />
        </linearGradient>
        <linearGradient id="meiosisCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#FBCFE8" />
        </linearGradient>

        {/* Centriole gradient */}
        <linearGradient id="centrioleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="cellDivShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.12" />
        </filter>
        <filter id="cellShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
        </filter>
        <filter id="chromoGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#cellDivBgGrad)" rx="16" />

      {/* Decorative background elements */}
      <circle cx="60" cy="60" r="120" fill="#A855F7" opacity="0.04" />
      <circle cx="640" cy="460" r="140" fill="#3B82F6" opacity="0.04" />
      <circle cx="350" cy="260" r="200" fill="#EC4899" opacity="0.03" />

      {/* Title */}
      <motion.text
        x="350"
        y="32"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="18"
        fontWeight="700"
        initial={animate ? { opacity: 0, y: -10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Cell Division: Mitosis vs Meiosis
      </motion.text>

      {/* MITOSIS SECTION (Left) */}
      <motion.g
        initial={animate ? { opacity: 0, x: -20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Mitosis label card */}
        <rect
          x="20"
          y="50"
          width="320"
          height="40"
          rx="20"
          fill="url(#mitosisCardGrad)"
          filter="url(#cellDivShadow)"
        />
        <text x="180" y="75" textAnchor="middle" fill="#1D4ED8" fontSize="15" fontWeight="700">
          MITOSIS
        </text>
        <text x="180" y="86" textAnchor="middle" fill="#3B82F6" fontSize="9">
          (2n → 2n) Equational Division
        </text>

        {/* Interphase cell (top left) */}
        <g transform="translate(35, 105)">
          <ellipse
            cx="60"
            cy="55"
            rx="52"
            ry="48"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="3"
            filter="url(#cellShadow)"
          />
          <circle cx="60" cy="55" r="22" fill="url(#nucleusGrad)" />
          {/* Chromatin network */}
          <path
            d="M50 50 Q60 42 70 50 Q65 60 60 62 Q55 60 50 50"
            stroke="#E9D5FF"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          <text x="60" y="118" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">
            Interphase
          </text>
        </g>

        {/* Arrow */}
        <motion.path
          d="M155 160 L180 160"
          stroke="#94A3B8"
          strokeWidth="2.5"
          markerEnd="url(#arrowhead)"
          animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#94A3B8" />
          </marker>
        </defs>

        {/* Prophase cell */}
        <g transform="translate(185, 105)">
          <ellipse
            cx="60"
            cy="55"
            rx="52"
            ry="48"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="3"
            filter="url(#cellShadow)"
          />
          {/* Chromosomes condensing */}
          <motion.g
            animate={animate ? { scale: [1, 1.05, 1] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <path
              d="M45 42 L45 68"
              stroke="url(#chromoBlue)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M55 38 L55 65"
              stroke="url(#chromoRed)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M65 45 L65 72"
              stroke="url(#chromoBlue)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M75 42 L75 68"
              stroke="url(#chromoRed)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Centrioles */}
          <rect x="28" y="30" width="8" height="15" rx="3" fill="url(#centrioleGrad)" />
          <rect x="85" y="72" width="8" height="15" rx="3" fill="url(#centrioleGrad)" />
          <text x="60" y="118" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">
            Prophase
          </text>
        </g>

        {/* Metaphase cell */}
        <g transform="translate(35, 235)">
          <ellipse
            cx="60"
            cy="55"
            rx="52"
            ry="48"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="3"
            filter="url(#cellShadow)"
          />
          {/* Spindle fibers */}
          <line x1="20" y1="15" x2="60" y2="55" stroke="url(#spindleGrad)" strokeWidth="1.5" />
          <line x1="100" y1="15" x2="60" y2="55" stroke="url(#spindleGrad)" strokeWidth="1.5" />
          <line x1="20" y1="95" x2="60" y2="55" stroke="url(#spindleGrad)" strokeWidth="1.5" />
          <line x1="100" y1="95" x2="60" y2="55" stroke="url(#spindleGrad)" strokeWidth="1.5" />
          {/* Chromosomes at metaphase plate */}
          <motion.g
            animate={animate ? { y: [0, -2, 0, 2, 0] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M44 50 L44 60"
              stroke="url(#chromoBlue)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M54 50 L54 60"
              stroke="url(#chromoRed)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M66 50 L66 60"
              stroke="url(#chromoBlue)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M76 50 L76 60"
              stroke="url(#chromoRed)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Metaphase plate line */}
          <line
            x1="35"
            y1="55"
            x2="85"
            y2="55"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeDasharray="3"
            opacity="0.6"
          />
          <text x="60" y="118" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">
            Metaphase
          </text>
        </g>

        {/* Anaphase cell */}
        <g transform="translate(185, 235)">
          <ellipse
            cx="60"
            cy="55"
            rx="60"
            ry="45"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="3"
            filter="url(#cellShadow)"
          />
          {/* Spindle fibers pulling */}
          <line x1="10" y1="55" x2="35" y2="55" stroke="url(#spindleGrad)" strokeWidth="1.5" />
          <line x1="85" y1="55" x2="110" y2="55" stroke="url(#spindleGrad)" strokeWidth="1.5" />
          {/* Chromosomes separating */}
          <motion.g
            animate={animate ? { x: [-2, -6, -2] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M32 45 L32 65"
              stroke="url(#chromoBlue)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M42 45 L42 65"
              stroke="url(#chromoRed)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
          <motion.g
            animate={animate ? { x: [2, 6, 2] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M78 45 L78 65"
              stroke="url(#chromoBlue)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M88 45 L88 65"
              stroke="url(#chromoRed)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
          <text x="60" y="115" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">
            Anaphase
          </text>
        </g>

        {/* Telophase/Cytokinesis - Two daughter cells */}
        <g transform="translate(50, 370)">
          {/* First daughter cell */}
          <motion.g
            animate={animate ? { x: [-3, 0, -3] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ellipse
              cx="55"
              cy="45"
              rx="45"
              ry="40"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="2.5"
              filter="url(#cellShadow)"
            />
            <circle cx="55" cy="45" r="18" fill="url(#nucleusGrad)" opacity="0.8" />
            <path
              d="M46 40 L46 50"
              stroke="url(#chromoBlue)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M64 40 L64 50"
              stroke="url(#chromoRed)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Second daughter cell */}
          <motion.g
            animate={animate ? { x: [3, 0, 3] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ellipse
              cx="165"
              cy="45"
              rx="45"
              ry="40"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="2.5"
              filter="url(#cellShadow)"
            />
            <circle cx="165" cy="45" r="18" fill="url(#nucleusGrad)" opacity="0.8" />
            <path
              d="M156 40 L156 50"
              stroke="url(#chromoBlue)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M174 40 L174 50"
              stroke="url(#chromoRed)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          <text x="110" y="100" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">
            Telophase & Cytokinesis
          </text>
          {/* Result label */}
          <rect x="60" y="108" width="100" height="22" rx="11" fill="#DBEAFE" />
          <text x="110" y="123" textAnchor="middle" fill="#1D4ED8" fontSize="10" fontWeight="600">
            2 Diploid Cells
          </text>
        </g>
      </motion.g>

      {/* Divider line */}
      <line
        x1="350"
        y1="50"
        x2="350"
        y2="480"
        stroke="#E2E8F0"
        strokeWidth="2"
        strokeDasharray="6"
      />

      {/* MEIOSIS SECTION (Right) */}
      <motion.g
        initial={animate ? { opacity: 0, x: 20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Meiosis label card */}
        <rect
          x="365"
          y="50"
          width="320"
          height="40"
          rx="20"
          fill="url(#meiosisCardGrad)"
          filter="url(#cellDivShadow)"
        />
        <text x="525" y="75" textAnchor="middle" fill="#BE185D" fontSize="15" fontWeight="700">
          MEIOSIS
        </text>
        <text x="525" y="86" textAnchor="middle" fill="#DB2777" fontSize="9">
          (2n → n) Reductional Division
        </text>

        {/* Meiosis I - Prophase I with crossing over */}
        <g transform="translate(380, 105)">
          <ellipse
            cx="55"
            cy="52"
            rx="48"
            ry="45"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="3"
            filter="url(#cellShadow)"
          />
          {/* Bivalents with crossing over */}
          <motion.g
            animate={animate ? { rotate: [0, 5, 0, -5, 0] } : undefined}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ transformOrigin: '55px 52px' }}
          >
            {/* Homologous pair 1 with chiasma */}
            <path
              d="M38 35 L38 48 Q48 55 38 62 L38 70"
              stroke="url(#chromoBlue)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M46 35 L46 48 Q36 55 46 62 L46 70"
              stroke="url(#chromoRed)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Homologous pair 2 */}
            <path
              d="M64 35 L64 48 Q74 55 64 62 L64 70"
              stroke="url(#chromoGreen)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M72 35 L72 48 Q62 55 72 62 L72 70"
              stroke="url(#chromoOrange)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>
          <text x="55" y="112" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">
            Prophase I
          </text>
          <text x="55" y="122" textAnchor="middle" fill="#94A3B8" fontSize="8">
            (Crossing Over)
          </text>
        </g>

        {/* Metaphase I */}
        <g transform="translate(510, 105)">
          <ellipse
            cx="55"
            cy="52"
            rx="48"
            ry="45"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="3"
            filter="url(#cellShadow)"
          />
          {/* Bivalents aligned */}
          <motion.g
            animate={animate ? { y: [0, -1, 0, 1, 0] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M35 46 L35 58"
              stroke="url(#chromoBlue)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M45 46 L45 58"
              stroke="url(#chromoRed)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M65 46 L65 58"
              stroke="url(#chromoGreen)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M75 46 L75 58"
              stroke="url(#chromoOrange)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
          <line
            x1="28"
            y1="52"
            x2="82"
            y2="52"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeDasharray="3"
            opacity="0.5"
          />
          <text x="55" y="112" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">
            Metaphase I
          </text>
        </g>

        {/* Anaphase I - Homologs separate */}
        <g transform="translate(380, 235)">
          <ellipse
            cx="55"
            cy="48"
            rx="55"
            ry="42"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="3"
            filter="url(#cellShadow)"
          />
          <motion.g
            animate={animate ? { x: [-2, -5, -2] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M25 40 L25 56"
              stroke="url(#chromoBlue)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M35 40 L35 56"
              stroke="url(#chromoGreen)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
          <motion.g
            animate={animate ? { x: [2, 5, 2] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M75 40 L75 56"
              stroke="url(#chromoRed)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M85 40 L85 56"
              stroke="url(#chromoOrange)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
          <text x="55" y="105" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">
            Anaphase I
          </text>
        </g>

        {/* Telophase I - Two haploid cells */}
        <g transform="translate(510, 235)">
          <motion.ellipse
            cx="30"
            cy="48"
            rx="28"
            ry="32"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2.5"
            filter="url(#cellShadow)"
            animate={animate ? { x: [-1, 0, -1] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.ellipse
            cx="85"
            cy="48"
            rx="28"
            ry="32"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2.5"
            filter="url(#cellShadow)"
            animate={animate ? { x: [1, 0, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle cx="30" cy="48" r="10" fill="url(#nucleusGrad)" opacity="0.7" />
          <circle cx="85" cy="48" r="10" fill="url(#nucleusGrad)" opacity="0.7" />
          <path d="M26 44 L26 52" stroke="url(#chromoBlue)" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M34 44 L34 52"
            stroke="url(#chromoGreen)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M81 44 L81 52" stroke="url(#chromoRed)" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M89 44 L89 52"
            stroke="url(#chromoOrange)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="57" y="98" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">
            Telophase I
          </text>
        </g>

        {/* Meiosis II label */}
        <rect
          x="475"
          y="340"
          width="100"
          height="22"
          rx="11"
          fill="#FDF2F8"
          stroke="#FBCFE8"
          strokeWidth="1.5"
        />
        <text x="525" y="355" textAnchor="middle" fill="#BE185D" fontSize="10" fontWeight="600">
          Meiosis II
        </text>

        {/* Final result - Four haploid cells */}
        <g transform="translate(375, 370)">
          {/* Cell 1 */}
          <motion.g
            animate={animate ? { scale: [1, 1.02, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            <ellipse
              cx="35"
              cy="40"
              rx="28"
              ry="30"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="2"
              filter="url(#cellShadow)"
            />
            <circle cx="35" cy="40" r="10" fill="url(#nucleusGrad)" opacity="0.7" />
            <path
              d="M33 37 L33 43"
              stroke="url(#chromoBlue)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Cell 2 */}
          <motion.g
            animate={animate ? { scale: [1, 1.02, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <ellipse
              cx="100"
              cy="40"
              rx="28"
              ry="30"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="2"
              filter="url(#cellShadow)"
            />
            <circle cx="100" cy="40" r="10" fill="url(#nucleusGrad)" opacity="0.7" />
            <path
              d="M98 37 L98 43"
              stroke="url(#chromoGreen)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Cell 3 */}
          <motion.g
            animate={animate ? { scale: [1, 1.02, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: 1.0 }}
          >
            <ellipse
              cx="165"
              cy="40"
              rx="28"
              ry="30"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="2"
              filter="url(#cellShadow)"
            />
            <circle cx="165" cy="40" r="10" fill="url(#nucleusGrad)" opacity="0.7" />
            <path
              d="M163 37 L163 43"
              stroke="url(#chromoRed)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Cell 4 */}
          <motion.g
            animate={animate ? { scale: [1, 1.02, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          >
            <ellipse
              cx="230"
              cy="40"
              rx="28"
              ry="30"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="2"
              filter="url(#cellShadow)"
            />
            <circle cx="230" cy="40" r="10" fill="url(#nucleusGrad)" opacity="0.7" />
            <path
              d="M228 37 L228 43"
              stroke="url(#chromoOrange)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Result label */}
          <rect x="70" y="85" width="120" height="24" rx="12" fill="#FCE7F3" />
          <text x="130" y="101" textAnchor="middle" fill="#BE185D" fontSize="10" fontWeight="600">
            4 Haploid Cells (n)
          </text>
        </g>
      </motion.g>

      {/* Key differences box at bottom */}
      <motion.g
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <rect
          x="20"
          y="485"
          width="660"
          height="28"
          rx="10"
          fill="white"
          fillOpacity="0.95"
          filter="url(#cellDivShadow)"
        />
        <text x="350" y="503" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="500">
          <tspan fill="#1D4ED8" fontWeight="700">
            Mitosis:
          </tspan>{' '}
          Growth & Repair (2n→2n) |{' '}
          <tspan fill="#BE185D" fontWeight="700">
            Meiosis:
          </tspan>{' '}
          Gamete Formation (2n→n) with Genetic Variation
        </text>
      </motion.g>
    </Wrapper>
  )
}
