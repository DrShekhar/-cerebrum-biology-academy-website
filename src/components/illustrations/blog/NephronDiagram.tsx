'use client'

import type { IllustrationProps } from './shared'

/**
 * NephronDiagram — a Campbell-style, textbook-quality nephron.
 *
 * Design language (from a Campbell Biology art audit):
 *  - Position = anatomy: convoluted tubules + corpuscle in the CORTEX band; the
 *    loop of Henle plunges into the MEDULLA band (vertical axis = cortico-medullary depth)
 *  - Semantic, MUTED palette — filtrate has its OWN colour (warm cream/tan),
 *    never confused with blood; blood is red (arterial) → blue (venous)
 *  - Afferent arteriole visibly WIDER than efferent (drives filtration)
 *  - Vasa recta hairpin (red↓ / blue↑) parallels the loop; wide collecting duct
 *  - Subtle tube volume (wall + lumen), clean horizontal labels in side columns
 *    with thin grey leader lines (no arrowheads); a light medullary osmotic tint
 *  - Pure, accessible SVG (<title>/<desc>) — scalable, tiny, on-brand, zero AI look
 */
export function NephronDiagram({ className = '', animate = true }: IllustrationProps) {
  const F = 'system-ui, -apple-system, sans-serif'
  const S = 'Iowan Old Style, Palatino, Georgia, serif'

  // Filtrate tubule — one colour family, calibre varies by segment (wall + lumen)
  const WALL = '#B08A57'
  const LUMEN = '#FBEBC8'
  const tube = [
    {
      d: 'M300 220 C324 200 348 214 338 236 C329 256 360 262 380 244 C398 228 402 250 398 262',
      w: 15,
    }, // PCT
    { d: 'M398 262 C404 350 401 480 408 596', w: 10 }, // descending limb (thin)
    { d: 'M408 596 C412 630 452 630 458 596 C468 480 465 350 470 264', w: 15 }, // loop + ascending (thick)
    { d: 'M470 264 C452 244 478 226 496 244 C512 260 500 232 524 248', w: 14 }, // DCT
    { d: 'M524 248 C556 300 552 470 545 648', w: 19 }, // collecting duct (widest)
  ]

  const leftLabels = [
    { t: 'Afferent arteriole (wide)', ty: 196, x2: 214, y2: 224 },
    { t: 'Glomerulus', ty: 224, x2: 260, y2: 208 },
    { t: "Bowman's capsule", ty: 252, x2: 244, y2: 236 },
    { t: 'Proximal tubule (PCT)', ty: 292, x2: 352, y2: 224 },
    { t: 'Descending limb', ty: 470, x2: 402, y2: 470 },
  ]
  const rightLabels = [
    { t: 'Efferent arteriole (narrow)', ty: 196, x2: 344, y2: 200 },
    { t: 'Distal tubule (DCT)', ty: 250, x2: 502, y2: 244 },
    { t: 'Ascending limb', ty: 430, x2: 466, y2: 430 },
    { t: 'Collecting duct', ty: 500, x2: 542, y2: 500 },
    { t: 'Vasa recta', ty: 560, x2: 452, y2: 540 },
  ]

  return (
    <svg
      viewBox="0 0 820 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="nephron-title nephron-desc"
    >
      <title id="nephron-title">The nephron, functional unit of the kidney</title>
      <desc id="nephron-desc">
        A nephron shown across the renal cortex and medulla. Blood enters the glomerulus through a
        wide afferent arteriole and leaves by a narrow efferent arteriole; filtrate passes from
        Bowman's capsule through the proximal tubule, down the loop of Henle into the medulla, up
        again, through the distal tubule and into the collecting duct, alongside the vasa recta.
      </desc>

      <defs>
        <linearGradient id="npBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBF9F5" />
          <stop offset="100%" stopColor="#F5F1EA" />
        </linearGradient>
        <linearGradient id="npMedulla" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EADBCB" />
          <stop offset="100%" stopColor="#D8BC9E" />
        </linearGradient>
        <radialGradient id="npCapsule" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="100%" stopColor="#F3E7D6" />
        </radialGradient>
        <filter id="npSoft" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#5B4A33" floodOpacity="0.16" />
        </filter>
        <marker id="npFlow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path
            d="M1,1 L6.5,4 L1,7"
            fill="none"
            stroke="#8A6D3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="820" height="720" rx="22" fill="url(#npBg)" />

      {/* Title */}
      <text
        x="410"
        y="46"
        fontSize="26"
        fill="#3F3222"
        textAnchor="middle"
        fontWeight="700"
        fontFamily={S}
      >
        The Nephron
      </text>
      <text x="410" y="70" fontSize="13" fill="#8A6D3B" textAnchor="middle" fontFamily={F}>
        Functional unit of the kidney · filtrate flows cortex → medulla → urine
      </text>

      {/* ===== Kidney tissue: cortex (top) + medulla (bottom) ===== */}
      <g filter="url(#npSoft)">
        <rect
          x="185"
          y="120"
          width="450"
          height="560"
          rx="26"
          fill="#F5EADD"
          stroke="#DDCBB6"
          strokeWidth="1.5"
        />
      </g>
      {/* Medulla band with downward-deepening osmotic tint */}
      <path
        d="M185 330 H635 V654 a26 26 0 0 1 -26 26 H211 a26 26 0 0 1 -26 -26 Z"
        fill="url(#npMedulla)"
        opacity="0.9"
      />
      <line
        x1="185"
        y1="330"
        x2="635"
        y2="330"
        stroke="#D8C3A8"
        strokeWidth="1.25"
        strokeDasharray="5 4"
      />
      <text
        x="205"
        y="150"
        fontSize="12"
        fill="#7C6A50"
        fontWeight="600"
        letterSpacing="2"
        fontFamily={F}
      >
        CORTEX
      </text>
      <text
        x="205"
        y="360"
        fontSize="12"
        fill="#9A7B52"
        fontWeight="600"
        letterSpacing="2"
        fontFamily={F}
      >
        MEDULLA
      </text>
      {/* Osmotic-gradient cue (inside medulla, right edge) */}
      <g fontFamily={F} fill="#9A7B52" fontSize="10" textAnchor="end" opacity="0.9">
        <text x="622" y="352">
          300
        </text>
        <text x="622" y="470">
          600
        </text>
        <text x="622" y="590">
          900
        </text>
        <text x="622" y="662">
          1200
        </text>
        <text x="628" y="508" fontSize="9" transform="rotate(90 628 508)" textAnchor="middle">
          mOsm/L ↓
        </text>
      </g>

      {/* ===== Vasa recta (behind tubule): descending red / ascending blue ===== */}
      <path
        d="M424 340 C420 460 422 560 434 588"
        stroke="#C0392B"
        strokeWidth="6"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M434 588 C446 606 462 596 462 566 C462 470 460 400 456 342"
        stroke="#2C6DA3"
        strokeWidth="6"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />

      {/* ===== Peritubular capillary hint (from efferent, over cortex) ===== */}
      <path
        d="M356 200 C392 196 372 238 404 240 C430 242 408 276 436 274"
        stroke="#B4708A"
        strokeWidth="3"
        fill="none"
        opacity="0.45"
      />

      {/* ===== Renal corpuscle ===== */}
      {/* Afferent arteriole (WIDE) */}
      <path
        d="M185 236 Q214 234 240 226"
        stroke="#C0392B"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />
      {/* Efferent arteriole (NARROW) */}
      <path
        d="M300 206 Q330 196 356 200"
        stroke="#C0392B"
        strokeWidth="6.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Bowman's capsule */}
      <circle cx="270" cy="222" r="34" fill="url(#npCapsule)" stroke="#9C7A4E" strokeWidth="3" />
      {/* Glomerulus — neat tuft of capillary loops (cross-sections) */}
      <g stroke="#C0392B" strokeWidth="2" fill="#EBB7AE">
        {[
          [270, 210],
          [256, 220],
          [284, 220],
          [262, 232],
          [278, 232],
          [270, 224],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="7.5" />
        ))}
      </g>

      {/* ===== Filtrate tubule (wall + lumen) ===== */}
      {tube.map((s, i) => (
        <path
          key={`w${i}`}
          d={s.d}
          stroke={WALL}
          strokeWidth={s.w}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {tube.map((s, i) => (
        <path
          key={`l${i}`}
          d={s.d}
          stroke={LUMEN}
          strokeWidth={s.w * 0.52}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {/* Ghosted second nephron feeding the collecting duct */}
      <path
        d="M572 250 C560 288 556 300 540 320"
        stroke={WALL}
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* Collecting-duct exit → urine */}
      <line
        x1="545"
        y1="648"
        x2="545"
        y2="694"
        stroke="#8A6D3B"
        strokeWidth="2.5"
        markerEnd="url(#npFlow)"
      />
      <text x="556" y="686" fontSize="11" fill="#6B5A40" fontWeight="600" fontFamily={F}>
        urine → renal pelvis
      </text>

      {/* ===== Process labels (Campbell four processes) ===== */}
      <g fontFamily={F} fontSize="10.5">
        {/* Filtration */}
        <path
          d="M292 220 l16 2 M294 228 l16 0"
          stroke="#C0392B"
          strokeWidth="1.5"
          markerEnd="url(#npFlow)"
        />
        <text x="300" y="188" fill="#B23A2E" fontWeight="600" textAnchor="middle" fontSize="10">
          Filtration
        </text>
        {/* Reabsorption at PCT (out to blood) */}
        <path d="M406 232 l22 -6" stroke="#2C6DA3" strokeWidth="1.5" markerEnd="url(#npFlow)" />
        <text x="446" y="222" fill="#245C8A" fontWeight="600">
          Reabsorption
        </text>
        {/* Secretion at DCT (into lumen) */}
        <path d="M556 262 l-22 -6" stroke="#8E5AA0" strokeWidth="1.5" markerEnd="url(#npFlow)" />
        <text x="560" y="262" fill="#7A4C8C" fontWeight="600">
          Secretion
        </text>
      </g>

      {/* ===== Side-column labels (thin grey leaders, no arrowheads) ===== */}
      <g fontFamily={F} fontSize="12.5" fill="#26211A">
        {leftLabels.map((l) => (
          <g key={l.t}>
            <line x1="176" y1={l.ty - 4} x2={l.x2} y2={l.y2} stroke="#B0A798" strokeWidth="1.4" />
            <text x="170" y={l.ty} textAnchor="end">
              {l.t}
            </text>
          </g>
        ))}
        {rightLabels.map((l) => (
          <g key={l.t}>
            <line x1="644" y1={l.ty - 4} x2={l.x2} y2={l.y2} stroke="#B0A798" strokeWidth="1.4" />
            <text x="650" y={l.ty} textAnchor="start">
              {l.t}
            </text>
          </g>
        ))}
        <text x="433" y="704" textAnchor="middle" fontWeight="600" fill="#5B4A33">
          Loop of Henle
        </text>
      </g>

      {animate && <animate attributeName="opacity" from="0.6" to="1" dur="0.6s" fill="freeze" />}
    </svg>
  )
}
