'use client'

import type { IllustrationProps } from './shared'

export function HumanDigestionIllustration({ className = '', animate = true }: IllustrationProps) {
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
        <linearGradient id="digestBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="50%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FFEDD5" />
        </linearGradient>

        {/* Organ gradients */}
        <linearGradient id="mouthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>

        <linearGradient id="esophagusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#F87171" />
        </linearGradient>

        <linearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <radialGradient id="stomachInnerGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFEDD5" />
          <stop offset="100%" stopColor="#FED7AA" />
        </radialGradient>

        <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        <linearGradient id="gallbladderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#65A30D" />
        </linearGradient>

        <linearGradient id="pancreasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        <linearGradient id="smallIntestineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>

        <linearGradient id="largeIntestineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        <linearGradient id="villiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>

        {/* Card gradients */}
        <linearGradient id="digestCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>

        {/* Enzyme colors */}
        <linearGradient id="enzymeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="enzymeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="digestShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="organShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.2" />
        </filter>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#digestBgGrad)" rx="16" />

      {/* Decorative background elements */}
      <circle cx="80" cy="70" r="130" fill="#F97316" opacity="0.05" />
      <circle cx="620" cy="450" r="150" fill="#8B5CF6" opacity="0.05" />
      <circle cx="350" cy="260" r="260" fill="#FBBF24" opacity="0.03" />

      {/* Title */}
      <text
        x="350"
        y="30"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="18"
        fontWeight="700"
      >
        Human Digestive System
      </text>

      {/* MAIN DIGESTIVE TRACT - Left side */}
      <g
      >
        {/* Mouth/Buccal Cavity */}
        <g transform="translate(50, 55)">
          <ellipse
            cx="55"
            cy="30"
            rx="50"
            ry="27"
            fill="url(#mouthGrad)"
            filter="url(#organShadow)"
          />
          {/* Teeth */}
          <rect x="18" y="22" width="7" height="10" rx="1" fill="white" />
          <rect x="29" y="22" width="7" height="10" rx="1" fill="white" />
          <rect x="40" y="22" width="7" height="10" rx="1" fill="white" />
          <rect x="62" y="22" width="7" height="10" rx="1" fill="white" />
          <rect x="73" y="22" width="7" height="10" rx="1" fill="white" />
          <rect x="84" y="22" width="7" height="10" rx="1" fill="white" />
          {/* Tongue */}
          <ellipse cx="55" cy="40" rx="25" ry="12" fill="#E11D48" opacity="0.7" />
          {/* Salivary gland indicator */}
          <circle
            cx="15"
            cy="30"
            r="7"
            fill="url(#enzymeBlue)"
          />
          <text x="55" y="72" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
            Mouth
          </text>
          <text x="55" y="83" textAnchor="middle" fill="#94A3B8" fontSize="7">
            Salivary Amylase
          </text>
        </g>

        {/* Esophagus */}
        <g
        >
          <path
            d="M105 145 Q105 170 112 195 Q118 220 112 245"
            stroke="url(#esophagusGrad)"
            strokeWidth="17"
            fill="none"
            strokeLinecap="round"
            filter="url(#organShadow)"
          />
          {/* Peristalsis wave indicator */}
          <circle
            cx="108"
            cy="175"
            r="5"
            fill="#FBBF24"
          />
        </g>
        <text x="145" y="195" fill="#64748B" fontSize="8" fontWeight="500">
          Esophagus
        </text>
        <text x="145" y="206" fill="#94A3B8" fontSize="6">
          (Peristalsis)
        </text>

        {/* Stomach - J-shaped */}
        <g transform="translate(60, 245)">
          <path
            d="M50 0 Q25 0 18 38 Q12 75 31 113 Q50 143 87 138 Q125 131 137 93 Q143 62 125 38 Q106 12 75 6 Q62 2 50 0 Z"
            fill="url(#stomachGrad)"
            filter="url(#organShadow)"
          />
          <path
            d="M56 18 Q37 22 35 50 Q32 75 47 100 Q62 118 87 115 Q110 111 118 81 Q125 56 110 38 Q94 22 68 18 Q62 17 56 18 Z"
            fill="url(#stomachInnerGrad)"
          />
          {/* Gastric glands */}
          <g
          >
            <circle cx="56" cy="56" r="4" fill="#DC2626" />
            <circle cx="75" cy="68" r="4" fill="#DC2626" />
            <circle cx="93" cy="62" r="4" fill="#DC2626" />
          </g>
          {/* Labels */}
          <text x="75" y="160" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
            Stomach
          </text>
          <text x="75" y="172" textAnchor="middle" fill="#94A3B8" fontSize="6">
            HCl + Pepsin
          </text>
        </g>

        {/* Small Intestine - Coiled */}
        <g transform="translate(100, 420)">
          <path
            d="M75 0 Q37 6 31 31 Q25 56 50 62 Q75 68 100 56 Q125 43 118 68 Q112 93 81 100 Q50 106 43 81"
            stroke="url(#smallIntestineGrad)"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            filter="url(#organShadow)"
          />
          <text x="75" y="122" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">
            Small Intestine
          </text>
          <text x="75" y="133" textAnchor="middle" fill="#94A3B8" fontSize="6">
            (~6m) Main Absorption
          </text>
        </g>

        {/* Large Intestine - Ascending, Transverse, Descending */}
        <g transform="translate(20, 420)">
          <path
            d="M210 80 L210 37 Q210 12 187 12 L75 12 Q50 12 50 37 L50 93"
            stroke="url(#largeIntestineGrad)"
            strokeWidth="17"
            fill="none"
            strokeLinecap="round"
            filter="url(#organShadow)"
          />
          <text x="130" y="-3" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">
            Large Intestine
          </text>
        </g>
      </g>

      {/* ASSOCIATED GLANDS - Right side */}
      <g
      >
        {/* Liver */}
        <g transform="translate(360, 60)">
          <rect
            x="0"
            y="0"
            width="320"
            height="100"
            rx="14"
            fill="url(#digestCardGrad)"
            filter="url(#digestShadow)"
          />
          <path
            d="M31 31 Q18 37 18 62 Q18 81 37 87 Q62 93 112 87 Q150 81 162 62 Q175 43 162 31 Q143 18 100 18 Q56 18 31 31 Z"
            fill="url(#liverGrad)"
            filter="url(#organShadow)"
          />
          {/* Gallbladder */}
          <ellipse
            cx="143"
            cy="68"
            rx="15"
            ry="22"
            fill="url(#gallbladderGrad)"
            filter="url(#organShadow)"
          />
          <path
            d="M143 90 L143 105"
            stroke="#84CC16"
            strokeWidth="3.5"
          />
          <text x="195" y="35" fill="#78350F" fontSize="12" fontWeight="700">
            Liver
          </text>
          <text x="195" y="50" fill="#92400E" fontSize="8">
            Produces Bile
          </text>
          <text x="195" y="63" fill="#92400E" fontSize="7">
            (No enzymes)
          </text>
          <text x="195" y="82" fill="#65A30D" fontSize="9" fontWeight="600">
            Gallbladder
          </text>
          <text x="195" y="94" fill="#84CC16" fontSize="7">
            Stores Bile
          </text>
        </g>

        {/* Pancreas */}
        <g transform="translate(360, 175)">
          <rect
            x="0"
            y="0"
            width="320"
            height="100"
            rx="14"
            fill="url(#digestCardGrad)"
            filter="url(#digestShadow)"
          />
          <path
            d="M25 55 Q18 43 31 37 Q50 31 87 37 Q125 43 150 52 Q162 55 160 62 Q156 68 143 68 Q112 68 75 62 Q37 55 25 55 Z"
            fill="url(#pancreasGrad)"
            filter="url(#organShadow)"
          />
          {/* Pancreatic duct */}
          <path
            d="M87 62 Q87 81 75 93"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeDasharray="4"
          />
          <text x="185" y="28" fill="#92400E" fontSize="12" fontWeight="700">
            Pancreas
          </text>
          <text x="185" y="44" fill="#B45309" fontSize="8">
            Exocrine:
          </text>
          <text x="185" y="57" fill="#D97706" fontSize="7">
            Amylase, Lipase
          </text>
          <text x="185" y="69" fill="#D97706" fontSize="7">
            Trypsin, Chymotrypsin
          </text>
          <text x="185" y="83" fill="#B45309" fontSize="8">
            Endocrine:
          </text>
          <text x="185" y="95" fill="#D97706" fontSize="7">
            Insulin, Glucagon
          </text>
        </g>

        {/* Villi Detail Box */}
        <g transform="translate(360, 290)">
          <rect
            x="0"
            y="0"
            width="320"
            height="115"
            rx="14"
            fill="url(#digestCardGrad)"
            filter="url(#digestShadow)"
          />
          <text x="160" y="22" textAnchor="middle" fill="#EA580C" fontSize="11" fontWeight="700">
            Intestinal Villi
          </text>
          {/* Villi illustration */}
          <g transform="translate(20, 32)">
            {/* Villus 1 */}
            <g
            >
              <path d="M18 62 Q18 25 25 12 Q31 0 37 12 Q43 25 43 62 Z" fill="url(#villiGrad)" />
              <line x1="31" y1="18" x2="31" y2="56" stroke="#DC2626" strokeWidth="2" />
            </g>
            {/* Villus 2 */}
            <g
            >
              <path d="M56 62 Q56 25 62 12 Q68 0 75 12 Q81 25 81 62 Z" fill="url(#villiGrad)" />
              <line x1="68" y1="18" x2="68" y2="56" stroke="#DC2626" strokeWidth="2" />
            </g>
            {/* Villus 3 */}
            <g
            >
              <path
                d="M93 62 Q93 25 100 12 Q106 0 112 12 Q118 25 118 62 Z"
                fill="url(#villiGrad)"
              />
              <line x1="106" y1="18" x2="106" y2="56" stroke="#DC2626" strokeWidth="2" />
            </g>
            {/* Base line */}
            <rect x="6" y="62" width="125" height="6" rx="3" fill="#FDBA74" />
          </g>
          <text x="170" y="52" fill="#64748B" fontSize="8">
            Blood Capillary
          </text>
          <text x="170" y="64" fill="#DC2626" fontSize="7">
            (Red line)
          </text>
          <text x="170" y="80" fill="#64748B" fontSize="8">
            Microvilli increase
          </text>
          <text x="170" y="92" fill="#64748B" fontSize="8">
            surface area 600x
          </text>
          <text x="160" y="108" textAnchor="middle" fill="#94A3B8" fontSize="7">
            Main site of absorption
          </text>
        </g>

        {/* Enzymes Summary */}
        <g transform="translate(360, 420)">
          <rect
            x="0"
            y="0"
            width="320"
            height="90"
            rx="14"
            fill="url(#digestCardGrad)"
            filter="url(#digestShadow)"
          />
          <text x="160" y="20" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
            Key Enzymes
          </text>
          {/* Enzyme list */}
          <g transform="translate(15, 32)">
            <circle cx="10" cy="7" r="5" fill="#3B82F6" />
            <text x="22" y="11" fill="#1E293B" fontSize="8" fontWeight="500">
              Amylase
            </text>
            <text x="80" y="11" fill="#64748B" fontSize="7">
              Starch → Maltose
            </text>

            <circle cx="10" cy="27" r="5" fill="#10B981" />
            <text x="22" y="31" fill="#1E293B" fontSize="8" fontWeight="500">
              Pepsin
            </text>
            <text x="68" y="31" fill="#64748B" fontSize="7">
              Proteins → Peptides
            </text>

            <circle cx="160" cy="7" r="5" fill="#F59E0B" />
            <text x="172" y="11" fill="#1E293B" fontSize="8" fontWeight="500">
              Lipase
            </text>
            <text x="212" y="11" fill="#64748B" fontSize="7">
              Fats → Fatty Acids
            </text>

            <circle cx="160" cy="27" r="5" fill="#8B5CF6" />
            <text x="172" y="31" fill="#1E293B" fontSize="8" fontWeight="500">
              Trypsin
            </text>
            <text x="218" y="31" fill="#64748B" fontSize="7">
              Proteins → Amino Acids
            </text>
          </g>
        </g>
      </g>

      {/* Flow arrows connecting organs */}
      <g
      >
        {/* Food flow indicator */}
        <circle
          cx="105"
          cy="100"
          r="6"
          fill="#FBBF24"
          filter="url(#softGlow)"
        />
      </g>

      {/* Bottom summary bar - removed as illustration now uses full height */}
    </Wrapper>
  )
}
