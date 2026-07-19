'use client'

import type { IllustrationProps } from './shared'

/**
 * DNAReplicationDiagram — a Campbell-style replication fork.
 *
 * Design language (Campbell art audit):
 *  - Semantic muted palette: parental DNA one colour, new (daughter) strands
 *    another, RNA primers a distinct third; enzymes as labelled shapes
 *  - Correct biology: antiparallel 3'/5' ends; leading strand continuous toward
 *    the fork; lagging strand in Okazaki fragments (each from an RNA primer),
 *    joined by ligase; helicase at the fork; SSB proteins on the open strands
 *  - Clean labels with thin grey leaders; a legend; direction-of-replication arrow
 *  - Pure, accessible SVG (<title>/<desc>) — scalable, tiny, on-brand, zero AI look
 */
export function DNAReplicationDiagram({ className = '', animate = true }: IllustrationProps) {
  const F = 'system-ui, -apple-system, sans-serif'
  const S = 'Iowan Old Style, Palatino, Georgia, serif'

  const PAR = '#3D5A80' // parental backbone
  const NEW = '#2A9D8F' // new (daughter) backbone
  const PRIMER = '#E76F51' // RNA primer
  const RUNG = '#B9C4CE' // base pairs

  const labels = [
    { t: 'Parental DNA', x: 830, y: 250, x2: 726, y2: 292, a: 'start' as const },
    { t: 'Helicase (unwinds)', x: 700, y: 372, x2: 606, y2: 312, a: 'start' as const },
    { t: 'Leading strand (continuous)', x: 250, y: 120, x2: 360, y2: 214, a: 'start' as const },
    { t: 'DNA polymerase III', x: 636, y: 210, x2: 574, y2: 268, a: 'start' as const },
    { t: 'Lagging strand', x: 250, y: 470, x2: 380, y2: 392, a: 'start' as const },
    { t: 'Okazaki fragments', x: 250, y: 500, x2: 330, y2: 404, a: 'start' as const },
    { t: 'RNA primer', x: 620, y: 402, x2: 556, y2: 344, a: 'start' as const },
    { t: 'DNA ligase (joins)', x: 250, y: 440, x2: 452, y2: 372, a: 'start' as const },
    { t: 'Single-strand binding proteins', x: 250, y: 190, x2: 430, y2: 250, a: 'start' as const },
  ]

  return (
    <svg
      viewBox="0 0 900 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="dna-title dna-desc"
    >
      <title id="dna-title">The DNA replication fork</title>
      <desc id="dna-desc">
        A replication fork. Helicase unwinds the parental DNA double helix into two template
        strands. On the leading-strand template, DNA polymerase III builds a new strand continuously
        toward the fork. On the lagging-strand template, the new strand is built away from the fork
        in short Okazaki fragments, each started by an RNA primer and later joined by DNA ligase.
      </desc>

      <defs>
        <linearGradient id="dnaBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7FAFA" />
          <stop offset="100%" stopColor="#EEF4F4" />
        </linearGradient>
        <filter id="dnaSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1F3A45" floodOpacity="0.16" />
        </filter>
        <marker id="dnaArr" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
          <path
            d="M1,1 L7.5,4.5 L1,8"
            fill="none"
            stroke={NEW}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
        <marker id="dnaGrey" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
          <path
            d="M1,1 L7.5,4.5 L1,8"
            fill="none"
            stroke="#5B6B75"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <rect x="0" y="0" width="900" height="600" rx="22" fill="url(#dnaBg)" />

      {/* Title */}
      <text
        x="450"
        y="44"
        fontSize="26"
        fill="#1F3A45"
        textAnchor="middle"
        fontWeight="700"
        fontFamily={S}
      >
        DNA Replication at the Fork
      </text>
      <text x="450" y="68" fontSize="13" fill="#2A6B6B" textAnchor="middle" fontFamily={F}>
        Semiconservative · leading strand continuous · lagging strand in Okazaki fragments
      </text>

      {/* Direction of replication */}
      <line
        x1="470"
        y1="300"
        x2="590"
        y2="300"
        stroke="#5B6B75"
        strokeWidth="2"
        markerEnd="url(#dnaGrey)"
        strokeDasharray="2 3"
      />
      <text x="470" y="292" fontSize="11" fill="#5B6B75" fontWeight="600" fontFamily={F}>
        fork moves →
      </text>

      {/* ===== Parental duplex (right, unwound at the fork) ===== */}
      <path d="M840 288 L610 296" stroke={PAR} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M840 312 L610 304" stroke={PAR} strokeWidth="6" fill="none" strokeLinecap="round" />
      {[636, 664, 692, 720, 748, 776, 804].map((x, i) => (
        <line key={i} x1={x} y1="292" x2={x} y2="308" stroke={RUNG} strokeWidth="2" />
      ))}

      {/* ===== Templates splay from the fork ===== */}
      {/* Top (leading) template */}
      <path d="M610 296 L150 176" stroke={PAR} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Bottom (lagging) template */}
      <path d="M610 304 L150 424" stroke={PAR} strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* Helicase at the fork */}
      <g filter="url(#dnaSoft)">
        <path
          d="M604 278 A26 26 0 1 0 604 322 L620 300 Z"
          fill="#7B6D8D"
          stroke="#5E5270"
          strokeWidth="1.5"
        />
      </g>

      {/* SSB proteins on the open single strands */}
      {[
        [452, 250],
        [372, 230],
        [452, 350],
        [372, 372],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="9"
          fill="#9AA7B8"
          stroke="#7A8794"
          strokeWidth="1"
          opacity="0.9"
        />
      ))}

      {/* ===== Leading strand (continuous, new) ===== */}
      <path
        d="M196 200 L582 300"
        stroke={NEW}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#dnaArr)"
      />
      {[236, 300, 364, 428, 492].map((x, i) => {
        const t = (x - 150) / (610 - 150)
        const yT = 176 + t * (296 - 176)
        const yN = yT + 22
        return (
          <line
            key={i}
            x1={x}
            y1={yT + 4}
            x2={x + 5}
            y2={yN - 2}
            stroke={RUNG}
            strokeWidth="1.75"
          />
        )
      })}
      {/* DNA pol III on leading strand (near fork) */}
      <g filter="url(#dnaSoft)">
        <ellipse
          cx="572"
          cy="278"
          rx="18"
          ry="15"
          fill="#5B8C5A"
          stroke="#3F6B3F"
          strokeWidth="1.5"
        />
      </g>

      {/* ===== Lagging strand: Okazaki fragments + primers ===== */}
      {/* fragment 1 (nearest fork) */}
      <path
        d="M556 336 L536 342"
        stroke={PRIMER}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M536 342 L462 361"
        stroke={NEW}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <g filter="url(#dnaSoft)">
        <ellipse
          cx="548"
          cy="330"
          rx="16"
          ry="13"
          fill="#5B8C5A"
          stroke="#3F6B3F"
          strokeWidth="1.5"
        />
      </g>
      {/* fragment 2 */}
      <path
        d="M446 366 L426 371"
        stroke={PRIMER}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M426 371 L346 392"
        stroke={NEW}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* fragment 3 (oldest) */}
      <path
        d="M330 396 L310 401"
        stroke={PRIMER}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M310 401 L214 426"
        stroke={NEW}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* ligase joining fragment gaps */}
      {[
        [454, 364],
        [338, 394],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="8" fill="#C08457" stroke="#96633F" strokeWidth="1.25" />
      ))}
      {/* base pairs on lagging side */}
      {[500, 420, 340, 260].map((x, i) => {
        const t = (610 - x) / (610 - 150)
        const yT = 304 + t * (424 - 304)
        return (
          <line
            key={i}
            x1={x}
            y1={yT - 4}
            x2={x - 5}
            y2={yT - 24}
            stroke={RUNG}
            strokeWidth="1.75"
          />
        )
      })}

      {/* ===== 3'/5' end labels ===== */}
      <g fontFamily={F} fontSize="12" fill="#1F3A45" fontWeight="700">
        <text x="842" y="286">
          5′
        </text>
        <text x="842" y="322">
          3′
        </text>
        <text x="138" y="174" textAnchor="end">
          3′
        </text>
        <text x="138" y="430" textAnchor="end">
          5′
        </text>
        <text x="196" y="196">
          5′
        </text>
        <text x="214" y="440">
          3′
        </text>
      </g>

      {/* ===== Labels ===== */}
      <g fontFamily={F} fontSize="12" fill="#26313A">
        {labels.map((l) => (
          <g key={l.t}>
            <line
              x1={l.a === 'end' ? l.x + 6 : l.x - 6}
              y1={l.y - 4}
              x2={l.x2}
              y2={l.y2}
              stroke="#AEB9C2"
              strokeWidth="1.3"
            />
            <text x={l.x} y={l.y} textAnchor={l.a}>
              {l.t}
            </text>
          </g>
        ))}
      </g>

      {/* Legend */}
      <g fontFamily={F} fontSize="12" fill="#3A4750">
        <line
          x1="300"
          y1="566"
          x2="326"
          y2="566"
          stroke={PAR}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="334" y="570">
          Parental DNA
        </text>
        <line
          x1="452"
          y1="566"
          x2="478"
          y2="566"
          stroke={NEW}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="486" y="570">
          New DNA
        </text>
        <line
          x1="574"
          y1="566"
          x2="600"
          y2="566"
          stroke={PRIMER}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="608" y="570">
          RNA primer
        </text>
      </g>

      {animate && <animate attributeName="opacity" from="0.6" to="1" dur="0.6s" fill="freeze" />}
    </svg>
  )
}
