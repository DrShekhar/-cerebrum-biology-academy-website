'use client'

import type { IllustrationProps } from './shared'

/**
 * HeartCirculationDiagram (v2) — a Campbell-style four-chamber heart with an
 * organic silhouette, a numbered ①→⑦ blood-flow pathway, and AV valves anchored
 * by chordae tendineae to papillary muscles.
 *
 * Design language (Campbell art audit + heart-figure comparison):
 *  - Semantic MUTED palette: right heart + its vessels blue (deoxygenated),
 *    left heart + its vessels red (oxygenated)
 *  - Organic anatomical outline (not boxy chambers); LV cavity ringed by a thick
 *    muscular wall; curved interventricular septum
 *  - Numbered flow ①→⑦ walks the reader through double circulation
 *  - AV valves drawn with leaflets + chordae tendineae + papillary muscles
 *  - Clean labels with thin grey leaders; pure accessible SVG (<title>/<desc>)
 */
export function HeartCirculationDiagram({ className = '', animate = true }: IllustrationProps) {
  const F = 'system-ui, -apple-system, sans-serif'
  const S = 'Iowan Old Style, Palatino, Georgia, serif'

  const BLUE = '#2C6DA3'
  const RED = '#C0392B'
  const BLUE_FILL = '#D3E4F1'
  const RED_FILL = '#F4D4CE'
  const MUSCLE = '#EFD3C7'
  const MUSCLE_LINE = '#C08E7C'
  const CHORD = '#8A6246'

  const steps = [
    { n: '1', x: 360, y: 176, t: 'Venae cavae → right atrium' },
    { n: '2', x: 396, y: 352, t: 'Tricuspid valve → right ventricle' },
    { n: '3', x: 404, y: 214, t: 'Pulmonary artery → lungs' },
    { n: '4', x: 596, y: 214, t: 'Pulmonary veins → left atrium' },
    { n: '5', x: 500, y: 350, t: 'Bicuspid valve → left ventricle' },
    { n: '6', x: 556, y: 176, t: 'Aorta → body' },
    { n: '7', x: 660, y: 300, t: 'Body → venae cavae (repeat)' },
  ]

  const labels = [
    { t: 'Superior vena cava', x: 150, y: 150, x2: 360, y2: 150, a: 'end' as const },
    { t: 'Right atrium', x: 150, y: 264, x2: 372, y2: 276, a: 'end' as const },
    { t: 'Tricuspid valve', x: 150, y: 336, x2: 384, y2: 344, a: 'end' as const },
    { t: 'Right ventricle', x: 150, y: 430, x2: 388, y2: 440, a: 'end' as const },
    { t: 'Chordae tendineae', x: 150, y: 486, x2: 392, y2: 424, a: 'end' as const },
    { t: 'Papillary muscle', x: 150, y: 520, x2: 396, y2: 470, a: 'end' as const },
    { t: 'Aorta → body', x: 690, y: 150, x2: 566, y2: 150, a: 'start' as const },
    { t: 'Pulmonary veins ← lungs', x: 690, y: 236, x2: 590, y2: 246, a: 'start' as const },
    { t: 'Left atrium', x: 690, y: 276, x2: 520, y2: 274, a: 'start' as const },
    { t: 'Bicuspid (mitral) valve', x: 690, y: 336, x2: 512, y2: 344, a: 'start' as const },
    { t: 'Left ventricle (thick wall)', x: 690, y: 430, x2: 540, y2: 440, a: 'start' as const },
    { t: 'Septum', x: 690, y: 520, x2: 452, y2: 470, a: 'start' as const },
  ]

  return (
    <svg
      viewBox="0 0 900 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="heart-title heart-desc"
    >
      <title id="heart-title">The human heart and double circulation</title>
      <desc id="heart-desc">
        A four-chambered heart with a numbered blood-flow pathway. Deoxygenated blood (blue) returns
        via the venae cavae to the right atrium and ventricle and is pumped to the lungs; oxygenated
        blood (red) returns via the pulmonary veins to the left atrium and the thick-walled left
        ventricle and is pumped to the body through the aorta. Atrioventricular valves are anchored
        by chordae tendineae to papillary muscles.
      </desc>

      <defs>
        <linearGradient id="htBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBF7F7" />
          <stop offset="100%" stopColor="#F4EEF0" />
        </linearGradient>
        <filter id="htSoft" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#5B2A2A" floodOpacity="0.16" />
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

      <rect x="0" y="0" width="900" height="700" rx="22" fill="url(#htBg)" />

      {/* Title */}
      <text
        x="420"
        y="44"
        fontSize="26"
        fill="#5B2A2A"
        textAnchor="middle"
        fontWeight="700"
        fontFamily={S}
      >
        The Heart & Double Circulation
      </text>
      <text x="420" y="68" fontSize="13" fill="#8A4A4A" textAnchor="middle" fontFamily={F}>
        Follow the numbered path: body → right heart → lungs → left heart → body
      </text>

      {/* ===== Great vessels ===== */}
      {/* SVC (blue) */}
      <path
        d="M362 118 L370 236"
        stroke={BLUE}
        strokeWidth="17"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M362 118 L370 236"
        stroke={BLUE_FILL}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* IVC (blue) */}
      <path
        d="M344 470 Q336 400 352 336"
        stroke={BLUE}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      {/* Pulmonary artery (blue → lungs), bifurcating */}
      <path
        d="M410 344 L402 188 Q400 150 368 146"
        stroke={BLUE}
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M410 344 L402 188 Q400 150 368 146"
        stroke={BLUE_FILL}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M374 156 L346 138 M374 168 L350 178"
        stroke={BLUE}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {/* Aorta (red → body), arching + head/arm branch */}
      <path
        d="M508 340 L520 190 Q522 150 566 150 Q616 150 620 202 L620 250"
        stroke={RED}
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M508 340 L520 190 Q522 150 566 150 Q616 150 620 202 L620 250"
        stroke={RED_FILL}
        strokeWidth="7.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M556 150 L556 120 M576 150 L582 122"
        stroke={RED}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Pulmonary veins (red ← lungs) */}
      <path
        d="M676 214 Q636 224 596 244"
        stroke={RED}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M676 214 Q636 224 596 244"
        stroke={RED_FILL}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* ===== Organic heart silhouette (myocardium) ===== */}
      <g filter="url(#htSoft)">
        <path
          d="M340 250 C330 224 352 214 378 222 C405 210 445 208 472 220 C500 210 524 222 520 248
             C566 262 600 292 600 356 C600 430 576 512 508 566 C476 592 452 600 440 600
             C426 600 402 584 384 552 C360 508 344 448 342 388 C340 330 336 288 340 250 Z"
          fill={MUSCLE}
          stroke={MUSCLE_LINE}
          strokeWidth="2.5"
        />
      </g>

      {/* Interventricular septum (curved muscular wall) */}
      <path
        d="M452 344 C448 420 446 500 442 566"
        stroke={MUSCLE_LINE}
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />

      {/* ===== Chamber cavities (organic) ===== */}
      {/* RA (blue) */}
      <path
        d="M362 244 C392 232 420 246 416 280 C412 312 386 322 362 314 C344 308 346 270 350 258 C352 250 356 246 362 244 Z"
        fill={BLUE_FILL}
        stroke={BLUE}
        strokeWidth="2.5"
      />
      {/* LA (red) */}
      <path
        d="M470 242 C500 232 528 244 522 278 C516 308 492 318 470 310 C452 304 456 268 460 256 C462 248 466 244 470 242 Z"
        fill={RED_FILL}
        stroke={RED}
        strokeWidth="2.5"
      />
      {/* RV (blue, thin wall) */}
      <path
        d="M360 356 C382 344 414 350 422 384 C432 424 420 500 396 536 C384 552 368 546 360 522 C346 476 342 402 348 378 C350 366 354 360 360 356 Z"
        fill={BLUE_FILL}
        stroke={BLUE}
        strokeWidth="2.5"
      />
      {/* LV (red, small cavity ⇒ thick wall to silhouette edge) */}
      <path
        d="M474 356 C500 346 528 354 534 392 C540 434 528 500 502 532 C488 548 476 540 470 514 C458 462 458 400 464 376 C466 366 470 360 474 356 Z"
        fill={RED_FILL}
        stroke={RED}
        strokeWidth="2.5"
      />

      {/* Chamber letters */}
      <text
        x="384"
        y="286"
        fontSize="14"
        fill={BLUE}
        textAnchor="middle"
        fontWeight="700"
        fontFamily={F}
      >
        RA
      </text>
      <text
        x="494"
        y="284"
        fontSize="14"
        fill={RED}
        textAnchor="middle"
        fontWeight="700"
        fontFamily={F}
      >
        LA
      </text>
      <text
        x="386"
        y="446"
        fontSize="15"
        fill={BLUE}
        textAnchor="middle"
        fontWeight="700"
        fontFamily={F}
      >
        RV
      </text>
      <text
        x="498"
        y="446"
        fontSize="15"
        fill={RED}
        textAnchor="middle"
        fontWeight="700"
        fontFamily={F}
      >
        LV
      </text>

      {/* ===== AV valves: leaflets + chordae tendineae + papillary muscles ===== */}
      {/* Tricuspid (RA→RV) */}
      <path d="M366 340 l7 22 M384 340 l3 24 M402 340 l-4 22" stroke={CHORD} strokeWidth="1.25" />
      <path
        d="M360 340 l10 14 l8 -12 l8 14 l8 -14"
        stroke={BLUE}
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      {/* chordae to papillary muscle */}
      <path
        d="M373 362 L390 418 M387 364 L392 418 M398 362 L396 418"
        stroke={CHORD}
        strokeWidth="1"
      />
      <ellipse cx="393" cy="424" rx="9" ry="7" fill={MUSCLE_LINE} />
      {/* Bicuspid (LA→LV) */}
      <path
        d="M486 338 l8 20 l10 -18"
        stroke={RED}
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M494 358 L500 416 M504 358 L502 416" stroke={CHORD} strokeWidth="1" />
      <ellipse cx="501" cy="422" rx="9" ry="7" fill={MUSCLE_LINE} />
      {/* Semilunar valves (three cusps each) at outflows */}
      <path d="M400 340 q6 7 12 0 q-6 5 -12 0" stroke={CHORD} strokeWidth="1.75" fill="none" />
      <path d="M500 338 q6 7 12 0 q-6 5 -12 0" stroke={CHORD} strokeWidth="1.75" fill="none" />

      {/* ===== Numbered flow markers ===== */}
      {steps.map((s) => (
        <g key={s.n}>
          <circle cx={s.x} cy={s.y} r="11" fill="#7A2E2E" />
          <text
            x={s.x}
            y={s.y + 4}
            fontSize="12"
            fill="#FFFFFF"
            textAnchor="middle"
            fontWeight="700"
            fontFamily={F}
          >
            {s.n}
          </text>
        </g>
      ))}

      {/* ===== Labels ===== */}
      <g fontFamily={F} fontSize="12" fill="#26211A">
        {labels.map((l) => (
          <g key={l.t}>
            <line
              x1={l.a === 'end' ? l.x + 6 : l.x - 6}
              y1={l.y - 4}
              x2={l.x2}
              y2={l.y2}
              stroke="#C7B7AD"
              strokeWidth="1.3"
            />
            <text x={l.x} y={l.y} textAnchor={l.a}>
              {l.t}
            </text>
          </g>
        ))}
      </g>

      {/* ===== Numbered pathway legend ===== */}
      <g filter="url(#htSoft)">
        <rect
          x="662"
          y="360"
          width="216"
          height="252"
          rx="14"
          fill="#FFFFFF"
          stroke="#ECE2E2"
          strokeWidth="1.5"
        />
      </g>
      <text x="680" y="390" fontSize="14" fill="#5B2A2A" fontWeight="700" fontFamily={S}>
        Double circulation
      </text>
      {steps.map((s, i) => (
        <g key={`lg${s.n}`} fontFamily={F}>
          <circle cx="686" cy={414 + i * 28} r="9" fill="#7A2E2E" />
          <text
            x="686"
            y={418 + i * 28}
            fontSize="11"
            fill="#FFFFFF"
            textAnchor="middle"
            fontWeight="700"
          >
            {s.n}
          </text>
          <text x="704" y={418 + i * 28} fontSize="11.5" fill="#4B4038">
            {s.t}
          </text>
        </g>
      ))}

      {/* Colour legend */}
      <g fontFamily={F} fontSize="12" fill="#4B4038">
        <rect
          x="300"
          y="656"
          width="14"
          height="14"
          rx="3"
          fill={BLUE_FILL}
          stroke={BLUE}
          strokeWidth="1.5"
        />
        <text x="320" y="667">
          Deoxygenated blood
        </text>
        <rect
          x="470"
          y="656"
          width="14"
          height="14"
          rx="3"
          fill={RED_FILL}
          stroke={RED}
          strokeWidth="1.5"
        />
        <text x="490" y="667">
          Oxygenated blood
        </text>
      </g>

      {animate && <animate attributeName="opacity" from="0.6" to="1" dur="0.6s" fill="freeze" />}
    </svg>
  )
}
