'use client'

import type { IllustrationProps } from './shared'

export function CellBiologyIllustration({ className = '', animate = true }: IllustrationProps) {
    const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  return (
    <svg
      viewBox="0 0 900 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Background gradients */}
        <linearGradient id="cellBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="50%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
        <linearGradient id="cellHeaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Cell component gradients */}
        <linearGradient id="cellMembraneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
        <linearGradient id="nucleusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="chloroGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="cytoplasmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="prokaryCytoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0.4" />
        </linearGradient>

        {/* Filters */}
        <filter id="cellShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="organelleShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
        </filter>
        <filter id="cellGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="900" height="650" rx="24" fill="url(#cellBgGrad)" />

      {/* Decorative background elements */}
      <circle cx="850" cy="100" r="120" fill="#10B981" fillOpacity="0.05" />
      <circle cx="50" cy="580" r="100" fill="#7C3AED" fillOpacity="0.05" />
      <circle cx="450" cy="350" r="200" fill="#059669" fillOpacity="0.03" />

      {/* Header */}
      <rect
        x="20"
        y="15"
        width="860"
        height="50"
        rx="12"
        fill="url(#cellHeaderGrad)"
        filter="url(#cellShadow)"
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
        Cell: The Unit of Life - Structure and Function
      </text>

      {/* NEET Badge */}
      <g
        filter="url(#cellGlow)"
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
          8-10
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

      {/* ============ SECTION 1: Cell Theory (Top Left) ============ */}
      <g filter="url(#cellShadow)">
        <rect x="30" y="80" width="250" height="170" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="30" y="80" width="250" height="30" rx="16" fill="#14B8A6" />
        <rect x="30" y="95" width="250" height="15" fill="#14B8A6" />
        <text
          x="155"
          y="100"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Cell Theory Timeline
        </text>

        {/* Timeline */}
        <line x1="55" y1="130" x2="55" y2="235" stroke="#D1D5DB" strokeWidth="2" />

        {/* Scientists */}
        {[
          { year: '1665', name: 'Robert Hooke', desc: 'Coined "cell"', y: 130 },
          { year: '1838', name: 'Schleiden', desc: 'Plant cells', y: 160 },
          { year: '1839', name: 'Schwann', desc: 'Animal cells', y: 190 },
          { year: '1855', name: 'Virchow', desc: 'Cells from cells', y: 220 },
        ].map((item, i) => (
          <g
            key={`ct-${i}`}
          >
            <circle cx="55" cy={item.y} r="6" fill="#14B8A6" />
            <text x="70" y={item.y - 5} fontSize="9" fill="#0D9488" fontWeight="bold">
              {item.year}
            </text>
            <text x="70" y={item.y + 7} fontSize="8" fill="#374151">
              {item.name}
            </text>
            <text x="150" y={item.y + 2} fontSize="7" fill="#6B7280">
              {item.desc}
            </text>
          </g>
        ))}
      </g>

      {/* ============ SECTION 2: Prokaryotic vs Eukaryotic (Top Center) ============ */}
      <g filter="url(#cellShadow)">
        <rect x="295" y="80" width="320" height="170" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="295" y="80" width="320" height="30" rx="16" fill="#3B82F6" />
        <rect x="295" y="95" width="320" height="15" fill="#3B82F6" />
        <text
          x="455"
          y="100"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Prokaryotic vs Eukaryotic
        </text>

        {/* Comparison table */}
        <g>
          {/* Headers */}
          <rect x="305" y="118" width="100" height="20" rx="4" fill="#DBEAFE" />
          <text x="355" y="132" fontSize="9" fill="#1E40AF" textAnchor="middle" fontWeight="bold">
            Feature
          </text>
          <rect x="410" y="118" width="95" height="20" rx="4" fill="#FEE2E2" />
          <text x="457" y="132" fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="bold">
            Prokaryotic
          </text>
          <rect x="510" y="118" width="95" height="20" rx="4" fill="#D1FAE5" />
          <text x="557" y="132" fontSize="9" fill="#059669" textAnchor="middle" fontWeight="bold">
            Eukaryotic
          </text>

          {/* Rows */}
          {[
            { feature: 'Size', pro: '1-10 μm', euk: '10-100 μm' },
            { feature: 'Nucleus', pro: 'Nucleoid', euk: 'True nucleus' },
            { feature: 'Organelles', pro: 'Absent', euk: 'Present' },
            { feature: 'Ribosomes', pro: '70S', euk: '80S' },
            { feature: 'DNA', pro: 'Circular', euk: 'Linear' },
          ].map((row, i) => (
            <g key={`row-${i}`}>
              <text x="355" y={155 + i * 18} fontSize="8" fill="#374151" textAnchor="middle">
                {row.feature}
              </text>
              <text x="457" y={155 + i * 18} fontSize="8" fill="#7F1D1D" textAnchor="middle">
                {row.pro}
              </text>
              <text x="557" y={155 + i * 18} fontSize="8" fill="#065F46" textAnchor="middle">
                {row.euk}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* ============ SECTION 3: Cell Membrane (Top Right) ============ */}
      <g filter="url(#cellShadow)">
        <rect x="630" y="80" width="245" height="170" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="630" y="80" width="245" height="30" rx="16" fill="#8B5CF6" />
        <rect x="630" y="95" width="245" height="15" fill="#8B5CF6" />
        <text
          x="752"
          y="100"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Fluid Mosaic Model
        </text>

        {/* Phospholipid bilayer illustration */}
        <g>
          {/* Upper layer - heads and tails */}
          {[0, 30, 60, 90, 120, 150, 180].map((x, i) => (
            <g key={`upper-${i}`}>
              <circle cx={655 + x} cy="135" r="6" fill="#A78BFA" />
              <line
                x1={655 + x}
                y1="141"
                x2={655 + x - 4}
                y2="158"
                stroke="#DDD6FE"
                strokeWidth="2"
              />
              <line
                x1={655 + x}
                y1="141"
                x2={655 + x + 4}
                y2="158"
                stroke="#DDD6FE"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Lower layer - heads and tails */}
          {[0, 30, 60, 90, 120, 150, 180].map((x, i) => (
            <g key={`lower-${i}`}>
              <circle cx={655 + x} cy="195" r="6" fill="#A78BFA" />
              <line
                x1={655 + x}
                y1="189"
                x2={655 + x - 4}
                y2="172"
                stroke="#DDD6FE"
                strokeWidth="2"
              />
              <line
                x1={655 + x}
                y1="189"
                x2={655 + x + 4}
                y2="172"
                stroke="#DDD6FE"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Integral protein */}
          <rect
            x="720"
            y="130"
            width="20"
            height="70"
            rx="10"
            fill="#F472B6"
          />
          <text x="730" y="220" fontSize="7" fill="#BE185D" textAnchor="middle">
            Protein
          </text>

          {/* Cholesterol */}
          <ellipse
            cx="780"
            cy="165"
            rx="8"
            ry="15"
            fill="#FBBF24"
          />
        </g>

        {/* Legend */}
        <g>
          <circle cx="650" cy="235" r="5" fill="#A78BFA" />
          <text x="660" y="238" fontSize="7" fill="#6B7280">
            Phospholipid
          </text>
          <rect x="720" y="230" width="10" height="10" rx="3" fill="#F472B6" />
          <text x="735" y="238" fontSize="7" fill="#6B7280">
            Protein
          </text>
          <ellipse cx="800" cy="235" rx="5" ry="8" fill="#FBBF24" />
          <text x="810" y="238" fontSize="7" fill="#6B7280">
            Cholesterol
          </text>
        </g>
      </g>

      {/* ============ SECTION 4: Eukaryotic Animal Cell (Center) ============ */}
      <g filter="url(#cellShadow)">
        <rect x="30" y="265" width="420" height="365" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="30" y="265" width="420" height="30" rx="16" fill="#EC4899" />
        <rect x="30" y="280" width="420" height="15" fill="#EC4899" />
        <text
          x="240"
          y="285"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Eukaryotic Animal Cell
        </text>

        {/* Cell membrane */}
        <ellipse
          cx="240"
          cy="465"
          rx="180"
          ry="140"
          fill="url(#cellMembraneGrad)"
          stroke="#A855F7"
          strokeWidth="6"
          strokeDasharray="12 4"
        />

        {/* Cytoplasm */}
        <ellipse cx="240" cy="465" rx="170" ry="130" fill="url(#cytoplasmGrad)" />

        {/* Nucleus */}
        <g
          filter="url(#organelleShadow)"
          style={{ transformOrigin: '240px 465px' }}
        >
          <ellipse cx="240" cy="465" rx="50" ry="38" fill="url(#nucleusGrad)" />
          <ellipse
            cx="240"
            cy="465"
            rx="45"
            ry="34"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeOpacity="0.5"
          />
          {/* Nucleolus */}
          <circle cx="240" cy="465" r="12" fill="#5B21B6" />
          {/* Chromatin */}
          <path
            d="M220 455 Q230 460 225 470 Q235 475 230 480"
            stroke="#DDD6FE"
            strokeWidth="2"
            fill="none"
          />
          {/* Nuclear pores */}
          <circle cx="210" cy="450" r="3" fill="#EDE9FE" />
          <circle cx="270" cy="450" r="3" fill="#EDE9FE" />
          <circle cx="210" cy="480" r="3" fill="#EDE9FE" />
          <circle cx="270" cy="480" r="3" fill="#EDE9FE" />
        </g>
        <text x="240" y="520" fontSize="9" fill="#5B21B6" textAnchor="middle" fontWeight="600">
          Nucleus
        </text>

        {/* Mitochondria */}
        <g
          filter="url(#organelleShadow)"
          style={{ transformOrigin: '110px 410px' }}
        >
          <ellipse cx="110" cy="410" rx="32" ry="16" fill="url(#mitoGrad)" />
          <ellipse
            cx="110"
            cy="410"
            rx="28"
            ry="12"
            fill="none"
            stroke="#FCA5A5"
            strokeWidth="1.5"
          />
          {/* Cristae */}
          <path
            d="M88 410 Q98 403 108 410 Q118 417 128 410"
            stroke="#FEE2E2"
            strokeWidth="2"
            fill="none"
          />
        </g>
        <text x="110" y="438" fontSize="8" fill="#DC2626" textAnchor="middle" fontWeight="500">
          Mitochondria
        </text>
        <text x="110" y="448" fontSize="6" fill="#991B1B" textAnchor="middle">
          (Powerhouse)
        </text>

        {/* Rough ER */}
        <g filter="url(#organelleShadow)">
          <path
            d="M310 380 Q330 395 320 415 Q310 435 330 450"
            stroke="#3B82F6"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ribosomes on RER */}
          {[385, 415, 445].map((y, i) => (
            <circle
              key={`rer-${i}`}
              cx={325 - i * 5}
              cy={y}
              r="4"
              fill="#10B981"
            />
          ))}
        </g>
        <text x="350" y="420" fontSize="8" fill="#1D4ED8" textAnchor="start" fontWeight="500">
          Rough ER
        </text>

        {/* Smooth ER */}
        <path
          d="M340 470 Q360 485 350 505"
          stroke="#60A5FA"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <text x="365" y="490" fontSize="8" fill="#2563EB" textAnchor="start" fontWeight="500">
          Smooth ER
        </text>

        {/* Golgi Apparatus */}
        <g
          filter="url(#organelleShadow)"
        >
          <path
            d="M340 530 Q370 522 340 514"
            stroke="#F59E0B"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M343 538 Q373 530 343 522"
            stroke="#FBBF24"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M346 546 Q376 538 346 530"
            stroke="#FCD34D"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Vesicles */}
          <circle cx="375" cy="520" r="5" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="380" cy="535" r="4" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="1" />
        </g>
        <text x="360" y="565" fontSize="8" fill="#B45309" textAnchor="middle" fontWeight="500">
          Golgi Apparatus
        </text>

        {/* Lysosomes */}
        <g
        >
          <circle cx="150" cy="530" r="15" fill="#A78BFA" />
          <circle cx="150" cy="530" r="12" fill="#C4B5FD" />
          <text x="150" y="533" fontSize="6" fill="#5B21B6" textAnchor="middle" fontWeight="bold">
            pH~5
          </text>
        </g>
        <text x="150" y="555" fontSize="8" fill="#7C3AED" textAnchor="middle" fontWeight="500">
          Lysosome
        </text>
        <text x="150" y="565" fontSize="6" fill="#6D28D9" textAnchor="middle">
          (Suicidal bag)
        </text>

        {/* Centrioles */}
        <g>
          <rect
            x="90"
            cy="490"
            width="20"
            height="8"
            rx="2"
            fill="#6366F1"
            transform="rotate(-30, 100, 494)"
          />
          <rect
            x="105"
            cy="495"
            width="20"
            height="8"
            rx="2"
            fill="#818CF8"
            transform="rotate(60, 115, 499)"
          />
        </g>
        <text x="110" y="515" fontSize="7" fill="#4F46E5" textAnchor="middle">
          Centrioles
        </text>

        {/* Free Ribosomes */}
        {[
          { cx: 165, cy: 370 },
          { cx: 180, cy: 385 },
          { cx: 195, cy: 375 },
          { cx: 280, cy: 380 },
          { cx: 295, cy: 395 },
          { cx: 170, cy: 570 },
          { cx: 185, cy: 580 },
          { cx: 290, cy: 570 },
        ].map((pos, i) => (
          <circle
            key={`ribo-${i}`}
            cx={pos.cx}
            cy={pos.cy}
            r="4"
            fill="#10B981"
          />
        ))}
        <text x="190" y="360" fontSize="7" fill="#059669">
          Ribosomes (80S)
        </text>
      </g>

      {/* ============ SECTION 5: Prokaryotic Cell (Top Right side) ============ */}
      <g filter="url(#cellShadow)">
        <rect x="465" y="265" width="205" height="185" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="465" y="265" width="205" height="30" rx="16" fill="#EF4444" />
        <rect x="465" y="280" width="205" height="15" fill="#EF4444" />
        <text
          x="567"
          y="285"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Prokaryotic Cell
        </text>

        {/* Cell wall */}
        <ellipse cx="567" cy="380" rx="85" ry="55" fill="none" stroke="#DC2626" strokeWidth="4" />
        {/* Cell membrane */}
        <ellipse
          cx="567"
          cy="380"
          rx="78"
          ry="48"
          fill="url(#prokaryCytoGrad)"
          stroke="#F87171"
          strokeWidth="2"
        />

        {/* Nucleoid */}
        <path
          d="M535 370 Q545 360 555 375 Q565 385 575 370 Q585 360 595 375"
          stroke="#1E40AF"
          strokeWidth="3"
          fill="none"
        />
        <text x="567" y="400" fontSize="8" fill="#1E3A8A" textAnchor="middle" fontWeight="500">
          Nucleoid (DNA)
        </text>

        {/* 70S Ribosomes */}
        {[
          { cx: 520, cy: 365 },
          { cx: 530, cy: 380 },
          { cx: 540, cy: 395 },
          { cx: 595, cy: 365 },
          { cx: 605, cy: 380 },
          { cx: 615, cy: 395 },
        ].map((pos, i) => (
          <circle key={`prok-ribo-${i}`} cx={pos.cx} cy={pos.cy} r="3" fill="#10B981" />
        ))}
        <text x="567" y="420" fontSize="7" fill="#059669" textAnchor="middle">
          70S Ribosomes
        </text>

        {/* Flagellum */}
        <path
          d="M567 435 Q580 450 565 465 Q550 480 565 490"
          stroke="#F59E0B"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="5,5"
        />
        <text x="567" y="440" fontSize="7" fill="#B45309" textAnchor="middle">
          Flagellum
        </text>
      </g>

      {/* ============ SECTION 6: Organelle Functions (Right bottom) ============ */}
      <g filter="url(#cellShadow)">
        <rect x="465" y="465" width="410" height="165" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="465" y="465" width="410" height="30" rx="16" fill="#0EA5E9" />
        <rect x="465" y="480" width="410" height="15" fill="#0EA5E9" />
        <text
          x="670"
          y="485"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Key Organelles & Functions
        </text>

        {/* Organelle cards */}
        {[
          {
            name: 'Nucleus',
            func: 'Control center, DNA storage',
            color: '#7C3AED',
            bg: '#EDE9FE',
            x: 480,
          },
          {
            name: 'Mitochondria',
            func: 'ATP production, Respiration',
            color: '#DC2626',
            bg: '#FEE2E2',
            x: 620,
          },
          { name: 'ER', func: 'Protein/Lipid synthesis', color: '#2563EB', bg: '#DBEAFE', x: 760 },
        ].map((org, i) => (
          <g
            key={`org-${i}`}
          >
            <rect x={org.x} y="505" width="125" height="50" rx="8" fill={org.bg} />
            <text
              x={org.x + 62}
              y="522"
              fontSize="9"
              fill={org.color}
              textAnchor="middle"
              fontWeight="bold"
            >
              {org.name}
            </text>
            <text x={org.x + 62} y="538" fontSize="7" fill="#4B5563" textAnchor="middle">
              {org.func}
            </text>
          </g>
        ))}

        {[
          {
            name: 'Golgi',
            func: 'Packaging, Modification',
            color: '#B45309',
            bg: '#FEF3C7',
            x: 480,
          },
          {
            name: 'Lysosome',
            func: 'Intracellular digestion',
            color: '#7C3AED',
            bg: '#F3E8FF',
            x: 620,
          },
          { name: 'Ribosome', func: 'Protein synthesis', color: '#059669', bg: '#D1FAE5', x: 760 },
        ].map((org, i) => (
          <g
            key={`org2-${i}`}
          >
            <rect x={org.x} y="565" width="125" height="50" rx="8" fill={org.bg} />
            <text
              x={org.x + 62}
              y="582"
              fontSize="9"
              fill={org.color}
              textAnchor="middle"
              fontWeight="bold"
            >
              {org.name}
            </text>
            <text x={org.x + 62} y="598" fontSize="7" fill="#4B5563" textAnchor="middle">
              {org.func}
            </text>
          </g>
        ))}
      </g>

      {/* ============ SECTION 7: Plant vs Animal (Bottom Right) ============ */}
      <g filter="url(#cellShadow)">
        <rect x="685" y="265" width="190" height="185" rx="16" fill="white" fillOpacity="0.95" />
        <rect x="685" y="265" width="190" height="30" rx="16" fill="#22C55E" />
        <rect x="685" y="280" width="190" height="15" fill="#22C55E" />
        <text
          x="780"
          y="285"
          fontSize="11"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Plant vs Animal Cell
        </text>

        {/* Comparison */}
        <g>
          <text x="780" y="315" fontSize="9" fill="#15803D" textAnchor="middle" fontWeight="bold">
            Plant Cell Has:
          </text>
          {['Cell Wall (Cellulose)', 'Large Central Vacuole', 'Chloroplasts', 'Plasmodesmata'].map(
            (item, i) => (
              <g key={`plant-${i}`}>
                <circle cx="705" cy={335 + i * 18} r="4" fill="#22C55E" />
                <text x="715" y={338 + i * 18} fontSize="8" fill="#166534">
                  {item}
                </text>
              </g>
            )
          )}

          <text x="780" y="410" fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="bold">
            Animal Cell Has:
          </text>
          {['Centrioles', 'Small Vacuoles', 'Lysosomes (abundant)'].map((item, i) => (
            <g key={`animal-${i}`}>
              <circle cx="705" cy={428 + i * 18} r="4" fill="#EF4444" />
              <text x="715" y={431 + i * 18} fontSize="8" fill="#991B1B">
                {item}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* Key Facts Panel */}
      <g filter="url(#cellShadow)">
        <rect x="30" y="635" width="840" height="12" rx="6" fill="#059669" />
        <text
          x="450"
          y="644"
          fontSize="8"
          fill="white"
          textAnchor="middle"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          Key: Double membrane: Nucleus, Mitochondria, Chloroplast • Semi-autonomous: Mitochondria &
          Chloroplast (own DNA, 70S ribosomes) • No membrane: Ribosome, Centriole
        </text>
      </g>
    </svg>
  )
}
