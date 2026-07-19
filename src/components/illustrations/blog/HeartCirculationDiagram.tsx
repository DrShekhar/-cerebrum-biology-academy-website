'use client'

import type { IllustrationProps } from './shared'

/**
 * HeartCirculationDiagram — a Campbell-style four-chamber heart showing double
 * circulation, with semantic red (oxygenated) / blue (deoxygenated) blood.
 *
 * Design language (same audit as nephron/neuron):
 *  - Semantic MUTED palette: right heart + its vessels blue (deoxygenated),
 *    left heart + its vessels red (oxygenated) — the one rule that makes a heart
 *    diagram read correctly
 *  - Anatomically honest: LV wall visibly thicker than RV; septum; four valves
 *  - Clean labels with thin grey leader lines; subtle chamber volume
 *  - Flow arrows trace the two circuits (pulmonary + systemic)
 *  - Pure, accessible SVG (<title>/<desc>) — scalable, tiny, on-brand, zero AI look
 */
export function HeartCirculationDiagram({ className = '', animate = true }: IllustrationProps) {
  const F = 'system-ui, -apple-system, sans-serif'
  const S = 'Iowan Old Style, Palatino, Georgia, serif'

  const BLUE = '#2C6DA3'
  const RED = '#C0392B'
  const BLUE_FILL = '#DCE9F3'
  const RED_FILL = '#F6DAD5'

  const labels = [
    { t: 'Superior vena cava', x: 150, y: 150, x2: 356, y2: 150, a: 'end' as const },
    { t: 'Inferior vena cava', x: 150, y: 470, x2: 336, y2: 430, a: 'end' as const },
    { t: 'Right atrium', x: 150, y: 250, x2: 340, y2: 262, a: 'end' as const },
    { t: 'Right ventricle', x: 150, y: 400, x2: 356, y2: 430, a: 'end' as const },
    { t: 'Tricuspid valve', x: 150, y: 330, x2: 378, y2: 326, a: 'end' as const },
    { t: 'Pulmonary artery → lungs', x: 470, y: 96, x2: 398, y2: 150, a: 'start' as const },
    { t: 'Aorta → body', x: 690, y: 150, x2: 628, y2: 176, a: 'start' as const },
    { t: 'Pulmonary veins ← lungs', x: 700, y: 236, x2: 636, y2: 214, a: 'start' as const },
    { t: 'Left atrium', x: 748, y: 262, x2: 588, y2: 262, a: 'start' as const },
    { t: 'Left ventricle (thick wall)', x: 748, y: 430, x2: 566, y2: 430, a: 'start' as const },
    { t: 'Bicuspid (mitral) valve', x: 748, y: 330, x2: 520, y2: 326, a: 'start' as const },
    { t: 'Septum', x: 748, y: 500, x2: 452, y2: 460, a: 'start' as const },
  ]

  return (
    <svg
      viewBox="0 0 900 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="heart-title heart-desc"
    >
      <title id="heart-title">The human heart and double circulation</title>
      <desc id="heart-desc">
        A four-chambered heart. Deoxygenated blood (blue) returns from the body via the venae cavae
        to the right atrium and right ventricle, which pumps it to the lungs through the pulmonary
        artery. Oxygenated blood (red) returns from the lungs via the pulmonary veins to the left
        atrium and the thick-walled left ventricle, which pumps it to the body through the aorta.
      </desc>

      <defs>
        <linearGradient id="htBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBF7F7" />
          <stop offset="100%" stopColor="#F5EFF2" />
        </linearGradient>
        <filter id="htSoft" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#5B2A2A" floodOpacity="0.14" />
        </filter>
        <marker id="htBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path
            d="M1,1 L6.5,4 L1,7"
            fill="none"
            stroke={BLUE}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
        <marker id="htRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path
            d="M1,1 L6.5,4 L1,7"
            fill="none"
            stroke={RED}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <rect x="0" y="0" width="900" height="640" rx="22" fill="url(#htBg)" />

      {/* Title */}
      <text
        x="450"
        y="44"
        fontSize="26"
        fill="#5B2A2A"
        textAnchor="middle"
        fontWeight="700"
        fontFamily={S}
      >
        The Heart & Double Circulation
      </text>
      <text x="450" y="68" fontSize="13" fill="#8A4A4A" textAnchor="middle" fontFamily={F}>
        Deoxygenated blood (blue) → lungs · oxygenated blood (red) → body
      </text>

      {/* ===== Great vessels (hollow tubes) ===== */}
      {/* Superior vena cava (blue, into RA) */}
      <path
        d="M362 120 L364 210"
        stroke={BLUE}
        strokeWidth="17"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M362 120 L364 210"
        stroke={BLUE_FILL}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Inferior vena cava (blue, into RA from below) */}
      <path
        d="M336 470 Q330 400 340 336"
        stroke={BLUE}
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M336 470 Q330 400 340 336"
        stroke={BLUE_FILL}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {/* Pulmonary artery (blue, RV → lungs), bifurcating */}
      <path
        d="M398 320 L392 186 Q390 150 360 146"
        stroke={BLUE}
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M398 320 L392 186 Q390 150 360 146"
        stroke={BLUE_FILL}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M366 156 L338 138 M366 168 L342 176"
        stroke={BLUE}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {/* Aorta (red, LV → body), arching */}
      <path
        d="M522 320 L524 200 Q524 156 572 154 Q626 154 628 206 L628 250"
        stroke={RED}
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M522 320 L524 200 Q524 156 572 154 Q626 154 628 206 L628 250"
        stroke={RED_FILL}
        strokeWidth="7.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Pulmonary veins (red, lungs → LA) */}
      <path
        d="M690 216 Q650 210 628 216"
        stroke={RED}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M690 216 Q650 210 628 216"
        stroke={RED_FILL}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* ===== Atria ===== */}
      <g filter="url(#htSoft)">
        <rect
          x="332"
          y="205"
          width="118"
          height="120"
          rx="26"
          fill={BLUE_FILL}
          stroke={BLUE}
          strokeWidth="2.5"
        />
        <rect
          x="452"
          y="205"
          width="136"
          height="120"
          rx="26"
          fill={RED_FILL}
          stroke={RED}
          strokeWidth="2.5"
        />
      </g>
      <text
        x="391"
        y="270"
        fontSize="14"
        fill={BLUE}
        textAnchor="middle"
        fontWeight="700"
        fontFamily={F}
      >
        RA
      </text>
      <text
        x="520"
        y="270"
        fontSize="14"
        fill={RED}
        textAnchor="middle"
        fontWeight="700"
        fontFamily={F}
      >
        LA
      </text>

      {/* ===== Ventricles (LV wall clearly thicker) ===== */}
      <g filter="url(#htSoft)">
        {/* RV — thin wall */}
        <path
          d="M336 332 Q312 344 316 404 L328 500 Q336 540 372 544 L448 544 L448 332 Z"
          fill={BLUE_FILL}
          stroke={BLUE}
          strokeWidth="3"
        />
        {/* LV — thick muscular wall */}
        <path
          d="M452 332 L560 332 Q596 344 590 410 L574 508 Q562 556 512 560 L456 548 Q452 542 452 332 Z"
          fill={RED_FILL}
          stroke={RED}
          strokeWidth="8"
        />
      </g>
      <text
        x="384"
        y="440"
        fontSize="14"
        fill={BLUE}
        textAnchor="middle"
        fontWeight="700"
        fontFamily={F}
      >
        RV
      </text>
      <text
        x="518"
        y="440"
        fontSize="14"
        fill={RED}
        textAnchor="middle"
        fontWeight="700"
        fontFamily={F}
      >
        LV
      </text>
      {/* Interventricular septum */}
      <line x1="450" y1="334" x2="450" y2="544" stroke="#9C6B57" strokeWidth="4" />

      {/* ===== Valves ===== */}
      {/* Tricuspid (RA→RV) */}
      <path
        d="M362 326 l8 16 l8 -16 M378 326 l8 16 l8 -16"
        stroke="#7A5230"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Bicuspid (LA→LV) */}
      <path
        d="M500 326 l9 18 l9 -18"
        stroke="#7A5230"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Pulmonary semilunar (RV outflow) */}
      <path d="M390 322 q8 8 16 0" stroke="#7A5230" strokeWidth="2.5" fill="none" />
      {/* Aortic semilunar (LV outflow) */}
      <path d="M514 322 q8 8 16 0" stroke="#7A5230" strokeWidth="2.5" fill="none" />

      {/* ===== Flow arrows (two circuits) ===== */}
      <path
        d="M366 300 L390 320"
        stroke={BLUE}
        strokeWidth="2"
        fill="none"
        markerEnd="url(#htBlue)"
      />
      <path
        d="M410 430 L410 340"
        stroke={BLUE}
        strokeWidth="2"
        fill="none"
        markerEnd="url(#htBlue)"
        strokeDasharray="4 3"
      />
      <path
        d="M536 300 L516 320"
        stroke={RED}
        strokeWidth="2"
        fill="none"
        markerEnd="url(#htRed)"
      />
      <path
        d="M520 430 L520 340"
        stroke={RED}
        strokeWidth="2"
        fill="none"
        markerEnd="url(#htRed)"
        strokeDasharray="4 3"
      />

      {/* Circuit callouts */}
      <text x="300" y="112" fontSize="11" fill={BLUE} fontWeight="600" fontFamily={F}>
        Pulmonary circuit
      </text>
      <text x="600" y="300" fontSize="11" fill={RED} fontWeight="600" fontFamily={F}>
        Systemic circuit
      </text>

      {/* ===== Labels ===== */}
      <g fontFamily={F} fontSize="12.5" fill="#26211A">
        {labels.map((l) => (
          <g key={l.t}>
            <line
              x1={l.a === 'end' ? l.x + 6 : l.x - 6}
              y1={l.y - 4}
              x2={l.x2}
              y2={l.y2}
              stroke="#C2B2A8"
              strokeWidth="1.4"
            />
            <text x={l.x} y={l.y} textAnchor={l.a}>
              {l.t}
            </text>
          </g>
        ))}
      </g>

      {/* Legend */}
      <g fontFamily={F} fontSize="12" fill="#4B4038">
        <rect
          x="300"
          y="600"
          width="14"
          height="14"
          rx="3"
          fill={BLUE_FILL}
          stroke={BLUE}
          strokeWidth="1.5"
        />
        <text x="320" y="611">
          Deoxygenated blood
        </text>
        <rect
          x="470"
          y="600"
          width="14"
          height="14"
          rx="3"
          fill={RED_FILL}
          stroke={RED}
          strokeWidth="1.5"
        />
        <text x="490" y="611">
          Oxygenated blood
        </text>
      </g>

      {animate && <animate attributeName="opacity" from="0.6" to="1" dur="0.6s" fill="freeze" />}
    </svg>
  )
}
