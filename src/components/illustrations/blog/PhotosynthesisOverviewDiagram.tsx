'use client'

import type { IllustrationProps } from './shared'

/**
 * PhotosynthesisOverviewDiagram — a polished, textbook-quality diagram of the
 * two stages of photosynthesis inside a chloroplast.
 *
 * Craft notes (the "polished diagram" bar):
 *  - Double-membrane chloroplast with depth (radial sheen + soft cast shadow)
 *  - 3D-shaded grana: stacked thylakoid discs with vertical gradients + lamellae
 *  - Molecular glyphs: hexagon glucose, bonded O₂/CO₂, a water droplet
 *  - Numbered stage badges, a slowly-turning Calvin cycle, a colour legend
 *  - Scientifically accurate: H₂O + light → O₂; ATP+NADPH hand-off; CO₂ → glucose
 *  - Pure, accessible SVG (<title>/<desc>) — scalable, tiny, on-brand, zero AI look
 */
export function PhotosynthesisOverviewDiagram({
  className = '',
  animate = true,
}: IllustrationProps) {
  const F = 'system-ui, -apple-system, sans-serif'
  const S = 'Iowan Old Style, Palatino, Georgia, serif'

  // Grana stacks — 3D thylakoid discs
  const stackA = [250, 268, 286, 304, 322, 340, 358]
  const stackB = [264, 282, 300, 318, 336, 354]

  return (
    <svg
      viewBox="0 0 900 660"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="photosynthesis-title photosynthesis-desc"
    >
      <title id="photosynthesis-title">The two stages of photosynthesis in a chloroplast</title>
      <desc id="photosynthesis-desc">
        Diagram of a chloroplast. The light reactions in the thylakoid grana use sunlight and water
        to release oxygen and produce ATP and NADPH. These carriers power the Calvin cycle in the
        stroma, which fixes carbon dioxide into glucose.
      </desc>

      <defs>
        <linearGradient id="poBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3FBF5" />
          <stop offset="100%" stopColor="#EAF7EE" />
        </linearGradient>
        <radialGradient id="poBody" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#E8FBEE" />
          <stop offset="55%" stopColor="#C6F6D5" />
          <stop offset="100%" stopColor="#8CE6AC" />
        </radialGradient>
        <linearGradient id="poDisc" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="45%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
        <radialGradient id="poSun" cx="42%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="55%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        <linearGradient id="poGlucose" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="poRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <filter id="poSoft" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#14532D" floodOpacity="0.18" />
        </filter>
        <filter id="poGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="poCast" x="-30%" y="-40%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <marker id="poAr" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
          <path
            d="M1,1 L7.5,4.5 L1,8"
            fill="none"
            stroke="#334155"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
        <marker id="poArG" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
          <path
            d="M1,1 L7.5,4.5 L1,8"
            fill="none"
            stroke="#B45309"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="900" height="660" rx="22" fill="url(#poBg)" />

      {/* Title */}
      <text
        x="450"
        y="50"
        fontSize="27"
        fill="#14532D"
        textAnchor="middle"
        fontWeight="700"
        fontFamily={S}
      >
        How Photosynthesis Works
      </text>
      <text
        x="450"
        y="76"
        fontSize="13.5"
        fill="#15803D"
        textAnchor="middle"
        fontFamily={F}
        letterSpacing="0.2"
      >
        6CO₂ + 12H₂O + light energy → C₆H₁₂O₆ + 6O₂ + 6H₂O
      </text>
      <line
        x1="360"
        y1="90"
        x2="540"
        y2="90"
        stroke="#86EFAC"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sun */}
      <g filter="url(#poGlow)">
        <g>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180
            return (
              <line
                key={i}
                x1={110 + Math.cos(a) * 44}
                y1={168 + Math.sin(a) * 44}
                x2={110 + Math.cos(a) * (i % 2 ? 62 : 56)}
                y2={168 + Math.sin(a) * (i % 2 ? 62 : 56)}
                stroke="#FBBF24"
                strokeWidth="3.5"
                strokeLinecap="round"
              >
                {animate && (
                  <animate
                    attributeName="opacity"
                    values="0.45;1;0.45"
                    dur="3s"
                    begin={`${i * 0.12}s`}
                    repeatCount="indefinite"
                  />
                )}
              </line>
            )
          })}
        </g>
        <circle cx="110" cy="168" r="38" fill="url(#poSun)" stroke="#F59E0B" strokeWidth="1.5" />
      </g>
      <text
        x="110"
        y="240"
        fontSize="13.5"
        fill="#B45309"
        textAnchor="middle"
        fontWeight="600"
        fontFamily={F}
      >
        Sunlight
      </text>

      {/* Chloroplast cast shadow */}
      <ellipse
        cx="452"
        cy="470"
        rx="270"
        ry="42"
        fill="#166534"
        opacity="0.16"
        filter="url(#poCast)"
      />

      {/* Chloroplast body — double membrane + sheen */}
      <g filter="url(#poSoft)">
        <rect
          x="160"
          y="180"
          width="580"
          height="300"
          rx="150"
          fill="url(#poBody)"
          stroke="#15803D"
          strokeWidth="3.5"
        />
      </g>
      <rect
        x="174"
        y="194"
        width="552"
        height="272"
        rx="136"
        fill="none"
        stroke="#22C55E"
        strokeWidth="1.5"
        strokeDasharray="6 5"
        opacity="0.8"
      />
      {/* Top-left sheen */}
      <ellipse
        cx="330"
        cy="250"
        rx="150"
        ry="52"
        fill="#FFFFFF"
        opacity="0.28"
        filter="url(#poCast)"
      />
      {/* Stroma detail: starch granule + plastoglobuli */}
      <ellipse
        cx="455"
        cy="420"
        rx="34"
        ry="20"
        fill="#F0FDF4"
        stroke="#86EFAC"
        strokeWidth="1.5"
      />
      <text x="455" y="424" fontSize="9.5" fill="#4D7C5A" textAnchor="middle" fontFamily={F}>
        starch
      </text>
      <circle cx="640" cy="235" r="6" fill="#15803D" opacity="0.28" />
      <circle cx="662" cy="250" r="4" fill="#15803D" opacity="0.22" />
      <text
        x="700"
        y="200"
        fontSize="12"
        fill="#166534"
        textAnchor="end"
        fontWeight="600"
        fontFamily={F}
        letterSpacing="1.5"
        opacity="0.8"
      >
        CHLOROPLAST
      </text>

      {/* ===== Stage 1 badge + grana ===== */}
      <g filter="url(#poSoft)">
        <circle cx="215" cy="228" r="14" fill="#15803D" />
        <text
          x="215"
          y="233"
          fontSize="15"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="700"
          fontFamily={F}
        >
          1
        </text>
      </g>
      <text x="236" y="226" fontSize="16.5" fill="#14532D" fontWeight="700" fontFamily={F}>
        Light Reactions
      </text>
      <text x="236" y="242" fontSize="11" fill="#16A34A" fontFamily={F}>
        capture light energy
      </text>

      {/* Stroma lamellae linking grana */}
      <path
        d="M300 300 Q330 292 360 300"
        stroke="#16A34A"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M300 330 Q332 340 362 330"
        stroke="#16A34A"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M398 312 Q440 320 470 336"
        stroke="#16A34A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Granum stack A (3D discs) */}
      {stackA.map((cy, i) => (
        <g key={`a${i}`}>
          <ellipse
            cx="258"
            cy={cy}
            rx="52"
            ry="12"
            fill="url(#poDisc)"
            stroke="#14532D"
            strokeWidth="0.75"
          />
          <ellipse cx="258" cy={cy - 3.5} rx="40" ry="5" fill="#86EFAC" opacity="0.45" />
        </g>
      ))}
      {/* Granum stack B */}
      {stackB.map((cy, i) => (
        <g key={`b${i}`}>
          <ellipse
            cx="360"
            cy={cy}
            rx="44"
            ry="11"
            fill="url(#poDisc)"
            stroke="#14532D"
            strokeWidth="0.75"
          />
          <ellipse cx="360" cy={cy - 3} rx="33" ry="4.5" fill="#86EFAC" opacity="0.4" />
        </g>
      ))}
      <text
        x="300"
        y="392"
        fontSize="12.5"
        fill="#166534"
        textAnchor="middle"
        fontWeight="600"
        fontFamily={F}
      >
        Grana (thylakoids)
      </text>
      <text x="300" y="408" fontSize="10.5" fill="#16A34A" textAnchor="middle" fontFamily={F}>
        thylakoid membrane
      </text>

      {/* ===== Stage 2 badge + Calvin cycle ===== */}
      <g filter="url(#poSoft)">
        <circle cx="558" cy="216" r="14" fill="#15803D" />
        <text
          x="558"
          y="221"
          fontSize="15"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="700"
          fontFamily={F}
        >
          2
        </text>
      </g>
      <text x="579" y="214" fontSize="16.5" fill="#14532D" fontWeight="700" fontFamily={F}>
        Calvin Cycle
      </text>
      <text x="579" y="230" fontSize="11" fill="#16A34A" fontFamily={F}>
        light-independent
      </text>

      {/* Ring */}
      <circle
        cx="572"
        cy="330"
        r="60"
        fill="#FFFFFF"
        fillOpacity="0.72"
        stroke="url(#poRing)"
        strokeWidth="7"
      />
      <g>
        <path d="M572,270 l11,-6 l-2,14 z" fill="#15803D" />
        <path d="M572,390 l-11,6 l2,-14 z" fill="#15803D" />
        {animate && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 572 330"
            to="360 572 330"
            dur="16s"
            repeatCount="indefinite"
          />
        )}
      </g>
      <text
        x="572"
        y="318"
        fontSize="13.5"
        fill="#14532D"
        textAnchor="middle"
        fontWeight="700"
        fontFamily={F}
      >
        CO₂ fixed
      </text>
      <text x="572" y="336" fontSize="11" fill="#166534" textAnchor="middle" fontFamily={F}>
        RuBP → 3-PGA
      </text>
      <text x="572" y="351" fontSize="11" fill="#166534" textAnchor="middle" fontFamily={F}>
        → G3P (sugar)
      </text>
      <text x="572" y="412" fontSize="10.5" fill="#16A34A" textAnchor="middle" fontFamily={F}>
        in the stroma
      </text>

      {/* ===== Energy carriers ===== */}
      <line
        x1="412"
        y1="296"
        x2="500"
        y2="300"
        stroke="#B45309"
        strokeWidth="2.5"
        markerEnd="url(#poArG)"
      />
      <g filter="url(#poSoft)">
        <rect
          x="404"
          y="272"
          width="108"
          height="24"
          rx="12"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="1.25"
        />
        <circle cx="418" cy="284" r="4" fill="#F59E0B" />
        <text
          x="466"
          y="288"
          fontSize="12"
          fill="#B45309"
          textAnchor="middle"
          fontWeight="700"
          fontFamily={F}
        >
          ATP + NADPH
        </text>
      </g>
      <line
        x1="500"
        y1="360"
        x2="412"
        y2="356"
        stroke="#94A3B8"
        strokeWidth="2"
        markerEnd="url(#poAr)"
        strokeDasharray="5 4"
      />
      <text x="456" y="378" fontSize="10.5" fill="#64748B" textAnchor="middle" fontFamily={F}>
        ADP + NADP⁺ + Pᵢ
      </text>

      {/* ===== Inputs ===== */}
      {/* Light */}
      <line
        x1="140"
        y1="196"
        x2="212"
        y2="256"
        stroke="#F59E0B"
        strokeWidth="2.5"
        markerEnd="url(#poAr)"
      />
      {/* H2O droplet token */}
      <g filter="url(#poSoft)">
        <rect
          x="34"
          y="304"
          width="86"
          height="32"
          rx="16"
          fill="#DBEAFE"
          stroke="#3B82F6"
          strokeWidth="1.25"
        />
        <path
          d="M52 312 C58 318 60 322 60 325 a6 6 0 0 1 -12 0 c0 -3 2 -7 6 -13 z"
          fill="#3B82F6"
        />
        <text
          x="88"
          y="325"
          fontSize="15"
          fill="#1D4ED8"
          textAnchor="middle"
          fontWeight="700"
          fontFamily={F}
        >
          H₂O
        </text>
      </g>
      <line
        x1="124"
        y1="320"
        x2="206"
        y2="322"
        stroke="#3B82F6"
        strokeWidth="2.5"
        markerEnd="url(#poAr)"
      />
      {/* CO2 token (O=C=O) */}
      <g filter="url(#poSoft)">
        <rect
          x="732"
          y="302"
          width="128"
          height="32"
          rx="16"
          fill="#E2E8F0"
          stroke="#475569"
          strokeWidth="1.25"
        />
        <circle cx="750" cy="318" r="6" fill="#94A3B8" />
        <circle cx="768" cy="318" r="7" fill="#475569" />
        <circle cx="786" cy="318" r="6" fill="#94A3B8" />
        <text
          x="826"
          y="323"
          fontSize="14"
          fill="#334155"
          textAnchor="middle"
          fontWeight="700"
          fontFamily={F}
        >
          CO₂
        </text>
      </g>
      <line
        x1="728"
        y1="320"
        x2="638"
        y2="326"
        stroke="#475569"
        strokeWidth="2.5"
        markerEnd="url(#poAr)"
      />

      {/* ===== Outputs ===== */}
      {/* O2 (from water splitting) */}
      <line
        x1="272"
        y1="248"
        x2="300"
        y2="150"
        stroke="#0EA5E9"
        strokeWidth="2.5"
        markerEnd="url(#poAr)"
      />
      <g filter="url(#poSoft)">
        <rect
          x="270"
          y="110"
          width="86"
          height="32"
          rx="16"
          fill="#E0F2FE"
          stroke="#0EA5E9"
          strokeWidth="1.25"
        />
        <circle cx="288" cy="126" r="7" fill="#38BDF8" />
        <circle cx="300" cy="126" r="7" fill="#0EA5E9" />
        <text
          x="330"
          y="131"
          fontSize="14"
          fill="#0369A1"
          textAnchor="middle"
          fontWeight="700"
          fontFamily={F}
        >
          O₂
        </text>
      </g>
      <text x="370" y="128" fontSize="10.5" fill="#0369A1" fontFamily={F}>
        from splitting of H₂O
      </text>

      {/* Glucose hexagon token */}
      <line
        x1="572"
        y1="392"
        x2="572"
        y2="516"
        stroke="#EA580C"
        strokeWidth="2.5"
        markerEnd="url(#poAr)"
      />
      <g filter="url(#poSoft)">
        <rect
          x="470"
          y="520"
          width="204"
          height="44"
          rx="22"
          fill="#FFF3E9"
          stroke="#EA580C"
          strokeWidth="1.5"
        />
        <path
          d="M503 528 l16 0 l8 14 l-8 14 l-16 0 l-8 -14 z"
          fill="url(#poGlucose)"
          stroke="#C2410C"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <text
          x="592"
          y="547"
          fontSize="14.5"
          fill="#C2410C"
          textAnchor="middle"
          fontWeight="700"
          fontFamily={F}
        >
          Glucose (C₆H₁₂O₆)
        </text>
      </g>

      {/* ===== Legend ===== */}
      <g fontFamily={F} fontSize="11.5" fill="#475569">
        <circle cx="250" cy="620" r="6" fill="#3B82F6" />
        <text x="262" y="624">
          Inputs
        </text>
        <rect x="356" y="614" width="12" height="12" rx="3" fill="#FEF3C7" stroke="#F59E0B" />
        <text x="374" y="624">
          Energy carriers
        </text>
        <path d="M512 614 L524 614 L530 620 L524 626 L512 626 L506 620 Z" fill="url(#poGlucose)" />
        <text x="540" y="624">
          Product
        </text>
      </g>
    </svg>
  )
}
