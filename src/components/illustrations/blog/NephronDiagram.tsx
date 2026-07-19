'use client'

import type { IllustrationProps } from './shared'

/**
 * NephronDiagram — a polished, textbook-quality diagram of the nephron, the
 * functional unit of the kidney, with a colour-coded urine-formation key.
 *
 * Craft + accuracy notes:
 *  - Cortex / medullary-pyramid zones; renal corpuscle with glomerulus + Bowman's
 *    capsule; afferent (wide) vs efferent (narrow) arterioles; faint vasa recta
 *  - Hollow, colour-coded tubule: PCT → descending limb → loop → ascending limb
 *    → DCT → collecting duct, each tinted to its function
 *  - Right-side key ties each colour to what it does (filtration → excretion)
 *  - Pure, accessible SVG (<title>/<desc>) — scalable, tiny, on-brand, zero AI look
 */
export function NephronDiagram({ className = '', animate = true }: IllustrationProps) {
  const F = 'system-ui, -apple-system, sans-serif'
  const S = 'Iowan Old Style, Palatino, Georgia, serif'

  // Colour-coded tubule segments (drawn as hollow tubes)
  const segments = [
    { d: 'M225,258 C270,232 285,300 320,272 C352,248 335,305 362,285', c: '#F59E0B', w: 15 },
    { d: 'M362,285 C388,330 398,430 412,520', c: '#0EA5E9', w: 15 },
    { d: 'M412,520 C417,556 455,556 462,520 C475,430 480,335 486,288', c: '#6366F1', w: 15 },
    { d: 'M486,288 C515,264 530,320 556,300', c: '#8B5CF6', w: 15 },
    { d: 'M556,300 C577,342 566,452 545,586', c: '#15803D', w: 19 },
  ]

  const key = [
    { c: '#DC2626', n: 'Glomerulus', t: 'Filtration of blood under high pressure' },
    { c: '#F59E0B', n: 'PCT', t: 'Reabsorbs glucose, amino acids, ~70–80% Na⁺ & water' },
    { c: '#0EA5E9', n: 'Descending limb', t: 'Permeable to water → filtrate concentrates' },
    { c: '#6366F1', n: 'Ascending limb', t: 'Salts pumped out; impermeable to water' },
    { c: '#8B5CF6', n: 'DCT', t: 'Conditional reabsorption; secretes K⁺, H⁺, NH₃' },
    {
      c: '#15803D',
      n: 'Collecting duct',
      t: 'ADH-controlled water reabsorption → concentrated urine',
    },
  ]

  return (
    <svg
      viewBox="0 0 900 660"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="nephron-title nephron-desc"
    >
      <title id="nephron-title">The nephron, functional unit of the kidney</title>
      <desc id="nephron-desc">
        Diagram of a nephron showing the renal corpuscle (glomerulus and Bowman's capsule) where
        blood is filtered, followed by the proximal convoluted tubule, loop of Henle, distal
        convoluted tubule and collecting duct, where the filtrate is reabsorbed, secreted and
        concentrated into urine.
      </desc>

      <defs>
        <linearGradient id="npBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6FBF8" />
          <stop offset="100%" stopColor="#EEF6F1" />
        </linearGradient>
        <linearGradient id="npMedulla" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE9B8" />
        </linearGradient>
        <radialGradient id="npCapsule" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E7F7EE" />
        </radialGradient>
        <filter id="npSoft" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#134E4A" floodOpacity="0.16" />
        </filter>
        <marker id="npAr" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
          <path
            d="M1,1 L7.5,4.5 L1,8"
            fill="none"
            stroke="#15803D"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="900" height="660" rx="22" fill="url(#npBg)" />

      {/* Title */}
      <text
        x="360"
        y="48"
        fontSize="26"
        fill="#134E4A"
        textAnchor="middle"
        fontWeight="700"
        fontFamily={S}
      >
        The Nephron
      </text>
      <text x="360" y="72" fontSize="13" fill="#0F766E" textAnchor="middle" fontFamily={F}>
        Functional unit of the kidney · ~1 million per kidney
      </text>

      {/* ===== Kidney tissue: cortex + medullary pyramid ===== */}
      <g filter="url(#npSoft)">
        <rect
          x="96"
          y="150"
          width="512"
          height="440"
          rx="28"
          fill="#F0FDF4"
          stroke="#BBF7D0"
          strokeWidth="1.5"
        />
      </g>
      {/* Medullary pyramid (trapezoid, narrows downward) */}
      <path d="M150 330 L560 330 L500 590 L232 590 Z" fill="url(#npMedulla)" opacity="0.85" />
      <text
        x="120"
        y="180"
        fontSize="11"
        fill="#4D7C5A"
        fontWeight="600"
        letterSpacing="1.5"
        fontFamily={F}
      >
        CORTEX
      </text>
      <text
        x="300"
        y="356"
        fontSize="11"
        fill="#B45309"
        fontWeight="600"
        letterSpacing="1.5"
        fontFamily={F}
        opacity="0.8"
      >
        MEDULLA
      </text>

      {/* ===== Vasa recta (faint counter-current vessels behind loop) ===== */}
      <path
        d="M432 335 C428 430 430 520 442 548 C452 566 470 552 470 520 C470 430 470 360 466 338"
        stroke="#FCA5A5"
        strokeWidth="4"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />
      <text x="470" y="500" fontSize="9" fill="#B91C1C" opacity="0.6" fontFamily={F}>
        vasa recta
      </text>

      {/* ===== Renal corpuscle ===== */}
      {/* Afferent arteriole (wide) */}
      <path
        d="M104 200 Q150 214 176 230"
        stroke="#DC2626"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      {/* Efferent arteriole (narrow) */}
      <path
        d="M214 224 Q250 206 286 194"
        stroke="#F87171"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Peritubular capillaries (faint) */}
      <path
        d="M286 194 C330 200 300 250 340 258 C372 264 340 300 372 300"
        stroke="#FCA5A5"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      {/* Bowman's capsule */}
      <circle cx="188" cy="238" r="46" fill="url(#npCapsule)" stroke="#15803D" strokeWidth="3.5" />
      {/* Glomerulus (tangled capillaries) */}
      <g stroke="#EF4444" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M168 250 C158 232 176 222 186 236 C196 250 210 236 206 220" />
        <path d="M172 226 C186 216 200 228 194 244 C188 258 204 256 210 242" />
        <path d="M178 254 C200 258 206 236 190 230" />
      </g>
      <circle cx="188" cy="238" r="7" fill="#B91C1C" opacity="0.5" />

      {/* ===== Colour-coded tubule (hollow tubes) ===== */}
      {segments.map((s, i) => (
        <g key={i}>
          <path d={s.d} stroke={s.c} strokeWidth={s.w} fill="none" strokeLinecap="round" />
          <path
            d={s.d}
            stroke="#FFFFFF"
            strokeOpacity="0.5"
            strokeWidth={s.w * 0.4}
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Collecting-duct exit → urine */}
      <line
        x1="545"
        y1="586"
        x2="545"
        y2="612"
        stroke="#15803D"
        strokeWidth="2.5"
        markerEnd="url(#npAr)"
      />
      <text
        x="545"
        y="628"
        fontSize="11"
        fill="#166534"
        textAnchor="middle"
        fontWeight="600"
        fontFamily={F}
      >
        urine → renal pelvis
      </text>

      {/* ===== On-diagram labels ===== */}
      <g fontFamily={F} fill="#334155">
        {/* Glomerulus */}
        <line x1="188" y1="150" x2="188" y2="196" stroke="#94A3B8" strokeWidth="1" />
        <text x="188" y="142" fontSize="12" textAnchor="middle" fontWeight="700" fill="#B91C1C">
          Glomerulus
        </text>
        {/* Bowman's capsule */}
        <line x1="128" y1="292" x2="164" y2="266" stroke="#94A3B8" strokeWidth="1" />
        <text x="124" y="300" fontSize="11.5" textAnchor="end" fill="#166534" fontWeight="600">
          Bowman's capsule
        </text>
        {/* Afferent / Efferent */}
        <text x="100" y="188" fontSize="10.5" textAnchor="start" fill="#B91C1C">
          Afferent (wide)
        </text>
        <text x="292" y="188" fontSize="10.5" textAnchor="start" fill="#DC2626">
          Efferent (narrow)
        </text>
        {/* PCT */}
        <text x="330" y="236" fontSize="13" fontWeight="700" fill="#B45309">
          PCT
        </text>
        {/* Descending / Ascending */}
        <line x1="352" y1="452" x2="404" y2="452" stroke="#94A3B8" strokeWidth="1" />
        <text x="348" y="456" fontSize="10.5" textAnchor="end" fill="#0369A1">
          Descending limb
        </text>
        <line x1="540" y1="452" x2="490" y2="452" stroke="#94A3B8" strokeWidth="1" />
        <text x="544" y="456" fontSize="10.5" textAnchor="start" fill="#4338CA">
          Ascending limb
        </text>
        {/* Loop of Henle */}
        <text x="447" y="576" fontSize="11.5" textAnchor="middle" fontWeight="600" fill="#475569">
          Loop of Henle
        </text>
        {/* DCT */}
        <text x="522" y="250" fontSize="13" fontWeight="700" fill="#6D28D9">
          DCT
        </text>
        {/* Collecting duct */}
        <line x1="588" y1="430" x2="560" y2="430" stroke="#94A3B8" strokeWidth="1" />
        <text x="592" y="434" fontSize="11" textAnchor="start" fontWeight="600" fill="#166534">
          Collecting
        </text>
        <text x="592" y="448" fontSize="11" textAnchor="start" fontWeight="600" fill="#166534">
          duct
        </text>
      </g>

      {/* ===== Urine-formation key ===== */}
      <g filter="url(#npSoft)">
        <rect
          x="630"
          y="150"
          width="256"
          height="410"
          rx="16"
          fill="#FFFFFF"
          stroke="#E2EAE4"
          strokeWidth="1.5"
        />
      </g>
      <text x="650" y="184" fontSize="15" fill="#134E4A" fontWeight="700" fontFamily={S}>
        How urine forms
      </text>
      <line x1="650" y1="196" x2="866" y2="196" stroke="#E2EAE4" strokeWidth="1.5" />
      {key.map((k, i) => {
        const y = 220 + i * 56
        return (
          <g key={k.n}>
            <circle cx="662" cy={y + 2} r="7" fill={k.c} />
            <text x="680" y={y + 6} fontSize="13" fill="#14211B" fontWeight="700" fontFamily={F}>
              {k.n}
            </text>
            <text x="680" y={y + 24} fontSize="11" fill="#566C61" fontFamily={F}>
              {splitLine(k.t)[0]}
            </text>
            <text x="680" y={y + 38} fontSize="11" fill="#566C61" fontFamily={F}>
              {splitLine(k.t)[1]}
            </text>
          </g>
        )
      })}

      {/* Process flow strip */}
      <g fontFamily={F}>
        {['Filtration', 'Reabsorption', 'Secretion', 'Excretion'].map((p, i) => {
          const x = 108 + i * 122
          return (
            <g key={p}>
              <rect
                x={x}
                y="616"
                width="104"
                height="26"
                rx="13"
                fill="#ECFDF5"
                stroke="#86EFAC"
                strokeWidth="1"
              />
              <text
                x={x + 52}
                y="633"
                fontSize="11"
                fill="#15803D"
                textAnchor="middle"
                fontWeight="600"
              >
                {p}
              </text>
              {i < 3 && (
                <text x={x + 112} y="633" fontSize="12" fill="#94A3B8" textAnchor="middle">
                  →
                </text>
              )}
            </g>
          )
        })}
      </g>

      {animate && <animate attributeName="opacity" from="0.6" to="1" dur="0.6s" fill="freeze" />}
    </svg>
  )
}

// Wrap a key description onto two balanced lines (≈32 chars) without a measurer.
function splitLine(text: string): [string, string] {
  if (text.length <= 32) return [text, '']
  const mid = Math.floor(text.length / 2)
  let cut = text.lastIndexOf(' ', mid + 8)
  if (cut < mid - 8) cut = text.indexOf(' ', mid)
  if (cut < 0) return [text, '']
  return [text.slice(0, cut), text.slice(cut + 1)]
}
