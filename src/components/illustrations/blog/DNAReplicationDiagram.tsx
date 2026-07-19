'use client'

import type { IllustrationProps } from './shared'

/**
 * DNAReplicationDiagram — a Campbell-style replication fork (browser-verified).
 *
 * Design language (Campbell art audit):
 *  - Semantic muted palette: parental DNA one colour, new (daughter) strands
 *    another, RNA primers a distinct third; enzymes as labelled shapes
 *  - Correct biology: antiparallel 3'/5' ends; leading strand continuous toward
 *    the fork; lagging strand in Okazaki fragments (each from an RNA primer),
 *    joined by ligase; helicase at the fork; SSB proteins on the open strands
 *  - New strands run PARALLEL to their templates (proper base-pair ladders);
 *    enzymes drawn clearly separated; labels contained with thin grey leaders
 *  - Pure, accessible SVG (<title>/<desc>) — scalable, tiny, on-brand, zero AI look
 */
export function DNAReplicationDiagram({ className = '', animate = true }: IllustrationProps) {
  const F = 'system-ui, -apple-system, sans-serif'
  const S = 'Iowan Old Style, Palatino, Georgia, serif'

  const PAR = '#3D5A80'
  const NEW = '#2A9D8F'
  const PRIMER = '#E76F51'

  return (
    <svg
      viewBox="0 0 880 560"
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
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1F3A45" floodOpacity="0.18" />
        </filter>
        <marker id="dnaArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path
            d="M1,1 L6.5,4 L1,7"
            fill="none"
            stroke={NEW}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <rect x="0" y="0" width="880" height="560" rx="20" fill="url(#dnaBg)" />

      <text
        x="440"
        y="42"
        fontSize="25"
        fill="#1F3A45"
        textAnchor="middle"
        fontWeight="700"
        fontFamily={S}
      >
        DNA Replication at the Fork
      </text>
      <text x="440" y="66" fontSize="13" fill="#2A6B6B" textAnchor="middle" fontFamily={F}>
        Semiconservative · leading strand continuous · lagging strand in Okazaki fragments
      </text>

      {/* base-pair rungs (behind backbones) */}
      <g stroke="#C0CBD3" strokeWidth="2">
        <line x1="630" y1="283" x2="630" y2="297" />
        <line x1="670" y1="281" x2="670" y2="300" />
        <line x1="710" y1="278" x2="710" y2="302" />
        <line x1="750" y1="276" x2="750" y2="304" />
        <line x1="790" y1="274" x2="790" y2="306" />
        <line x1="250" y1="184" x2="250" y2="202" />
        <line x1="320" y1="205" x2="320" y2="223" />
        <line x1="390" y1="226" x2="390" y2="244" />
        <line x1="460" y1="247" x2="460" y2="265" />
        <line x1="530" y1="267" x2="530" y2="285" />
        <line x1="520" y1="298" x2="520" y2="316" />
        <line x1="450" y1="318" x2="450" y2="336" />
        <line x1="380" y1="339" x2="380" y2="357" />
        <line x1="310" y1="360" x2="310" y2="378" />
      </g>

      {/* parental duplex */}
      <path d="M820 272 L590 285" stroke={PAR} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M820 308 L590 295" stroke={PAR} strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* templates splay from the fork */}
      <path d="M590 285 L150 155" stroke={PAR} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M590 295 L150 425" stroke={PAR} strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* SSB proteins */}
      <circle cx="500" cy="258" r="9" fill="#9AA7B8" stroke="#7A8794" strokeWidth="1" />
      <circle cx="420" cy="235" r="9" fill="#9AA7B8" stroke="#7A8794" strokeWidth="1" />
      <circle cx="500" cy="322" r="9" fill="#9AA7B8" stroke="#7A8794" strokeWidth="1" />
      <circle cx="420" cy="345" r="9" fill="#9AA7B8" stroke="#7A8794" strokeWidth="1" />

      {/* leading strand (parallel to template) */}
      <path
        d="M172 178 L560 294"
        stroke={NEW}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#dnaArr)"
      />

      {/* lagging strand: 3 Okazaki fragments (fork-end primer + new DNA) */}
      <path
        d="M560 286 L535 293"
        stroke={PRIMER}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M535 293 L470 312"
        stroke={NEW}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M452 318 L427 325"
        stroke={PRIMER}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M427 325 L362 344"
        stroke={NEW}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M344 350 L319 357"
        stroke={PRIMER}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M319 357 L230 383"
        stroke={NEW}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="461" cy="315" r="7.5" fill="#C08457" stroke="#96633F" strokeWidth="1.25" />
      <circle cx="353" cy="347" r="7.5" fill="#C08457" stroke="#96633F" strokeWidth="1.25" />

      {/* enzymes (separated) */}
      <g filter="url(#dnaSoft)">
        <path
          d="M588 268 a22 22 0 1 0 0 44 l16 -22 Z"
          fill="#8878A0"
          stroke="#5E5270"
          strokeWidth="1.5"
        />
      </g>
      <g filter="url(#dnaSoft)">
        <ellipse
          cx="538"
          cy="288"
          rx="16"
          ry="13"
          fill="#5B8C5A"
          stroke="#3F6B3F"
          strokeWidth="1.5"
        />
      </g>
      <g filter="url(#dnaSoft)">
        <ellipse
          cx="516"
          cy="290"
          rx="14"
          ry="11"
          fill="#5B8C5A"
          stroke="#3F6B3F"
          strokeWidth="1.5"
        />
      </g>

      {/* 3'/5' ends */}
      <g fontFamily={F} fontSize="12" fill="#1F3A45" fontWeight="700">
        <text x="826" y="270">
          5′
        </text>
        <text x="826" y="314">
          3′
        </text>
        <text x="140" y="152" textAnchor="end">
          3′
        </text>
        <text x="140" y="430" textAnchor="end">
          5′
        </text>
        <text x="158" y="180" textAnchor="end">
          5′
        </text>
      </g>

      {/* labels */}
      <g fontFamily={F} fontSize="12.5" fill="#26313A">
        <line x1="286" y1="112" x2="330" y2="223" stroke="#AEB9C2" strokeWidth="1.3" />
        <text x="200" y="108">
          Leading strand (continuous)
        </text>
        <line x1="196" y1="266" x2="420" y2="235" stroke="#AEB9C2" strokeWidth="1.3" />
        <text x="190" y="270" textAnchor="end">
          SSB proteins
        </text>
        <line x1="286" y1="452" x2="400" y2="352" stroke="#AEB9C2" strokeWidth="1.3" />
        <text x="200" y="456">
          Lagging strand (Okazaki fragments)
        </text>
        <line x1="256" y1="484" x2="353" y2="347" stroke="#AEB9C2" strokeWidth="1.3" />
        <text x="200" y="488">
          DNA ligase joins fragments
        </text>
        <line x1="712" y1="230" x2="740" y2="280" stroke="#AEB9C2" strokeWidth="1.3" />
        <text x="706" y="226">
          Parental DNA
        </text>
        <line x1="614" y1="212" x2="540" y2="276" stroke="#AEB9C2" strokeWidth="1.3" />
        <text x="620" y="208">
          DNA polymerase III
        </text>
        <line x1="646" y1="330" x2="600" y2="292" stroke="#AEB9C2" strokeWidth="1.3" />
        <text x="652" y="334">
          Helicase (unwinds)
        </text>
        <line x1="606" y1="374" x2="556" y2="290" stroke="#AEB9C2" strokeWidth="1.3" />
        <text x="612" y="378">
          RNA primer
        </text>
      </g>

      {/* legend */}
      <g fontFamily={F} fontSize="12" fill="#3A4750">
        <line
          x1="300"
          y1="524"
          x2="326"
          y2="524"
          stroke={PAR}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="334" y="528">
          Parental DNA
        </text>
        <line
          x1="452"
          y1="524"
          x2="478"
          y2="524"
          stroke={NEW}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="486" y="528">
          New DNA
        </text>
        <line
          x1="566"
          y1="524"
          x2="592"
          y2="524"
          stroke={PRIMER}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="600" y="528">
          RNA primer
        </text>
      </g>

      {animate && <animate attributeName="opacity" from="0.6" to="1" dur="0.6s" fill="freeze" />}
    </svg>
  )
}
