'use client'

import type { IllustrationProps } from './shared'

/**
 * NeuronDiagram — a Campbell-style multipolar neuron with a synapse inset.
 *
 * Design language (same audit as the nephron):
 *  - Semantic muted palette: neuron membrane one lavender family; myelin its own
 *    cream/gold; the nerve impulse highlighted in the brand emerald
 *  - Left→right reading = impulse direction (dendrites → soma → axon → terminals)
 *  - Subtle volume (cytoplasm fill + outline); myelin segments with Nodes of Ranvier
 *  - Clean horizontal labels with thin grey leader lines (no arrowheads)
 *  - A "zoom" synapse inset (Campbell's signature callout) with vesicles + cleft
 *  - Pure, accessible SVG (<title>/<desc>) — scalable, tiny, on-brand, zero AI look
 */
export function NeuronDiagram({ className = '', animate = true }: IllustrationProps) {
  const F = 'system-ui, -apple-system, sans-serif'
  const S = 'Iowan Old Style, Palatino, Georgia, serif'

  const MEM = '#6D4C8A' // membrane outline
  const CYTO = '#EEE3F4' // cytoplasm
  const myelin = [312, 400, 488, 576, 664] // segment centres along axon

  const labels = [
    { t: 'Dendrites', x: 70, y: 168, x2: 96, y2: 198, anchor: 'end' as const },
    { t: 'Cell body (soma)', x: 150, y: 150, x2: 190, y2: 216, anchor: 'end' as const },
    { t: 'Nucleus', x: 118, y: 340, x2: 184, y2: 292, anchor: 'end' as const },
    { t: 'Axon hillock', x: 300, y: 150, x2: 252, y2: 262, anchor: 'start' as const },
    { t: 'Node of Ranvier', x: 470, y: 150, x2: 444, y2: 262, anchor: 'start' as const },
    { t: 'Axon terminals', x: 790, y: 168, x2: 760, y2: 246, anchor: 'start' as const },
    { t: 'Myelin sheath', x: 372, y: 356, x2: 400, y2: 286, anchor: 'start' as const },
    { t: 'Schwann cell', x: 560, y: 356, x2: 576, y2: 256, anchor: 'start' as const },
    { t: 'Axon', x: 520, y: 340, x2: 532, y2: 272, anchor: 'start' as const },
  ]

  return (
    <svg
      viewBox="0 0 900 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="neuron-title neuron-desc"
    >
      <title id="neuron-title">A neuron and the synapse</title>
      <desc id="neuron-desc">
        A multipolar neuron: dendrites and cell body on the left receive signals, the axon carries
        the nerve impulse to the right along a myelin sheath interrupted by nodes of Ranvier, ending
        in axon terminals. An inset zooms into a synapse showing vesicles releasing neurotransmitter
        across the synaptic cleft to receptors on the target cell.
      </desc>

      <defs>
        <linearGradient id="neuBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBFAFD" />
          <stop offset="100%" stopColor="#F4F0F8" />
        </linearGradient>
        <radialGradient id="neuSoma" cx="40%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#F7F0FA" />
          <stop offset="100%" stopColor="#E3D2ED" />
        </radialGradient>
        <filter id="neuSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4A3560" floodOpacity="0.16" />
        </filter>
        <marker id="neuFlow" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
          <path
            d="M1,1 L7.5,4.5 L1,8"
            fill="none"
            stroke="#15803D"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <rect x="0" y="0" width="900" height="540" rx="22" fill="url(#neuBg)" />

      {/* Title */}
      <text
        x="450"
        y="42"
        fontSize="26"
        fill="#3A2B4A"
        textAnchor="middle"
        fontWeight="700"
        fontFamily={S}
      >
        The Neuron & the Synapse
      </text>
      <text x="450" y="66" fontSize="13" fill="#7C5E8C" textAnchor="middle" fontFamily={F}>
        Structural & functional unit of the nervous system
      </text>

      {/* Impulse direction ribbon */}
      <line
        x1="150"
        y1="104"
        x2="770"
        y2="104"
        stroke="#15803D"
        strokeWidth="2.5"
        markerEnd="url(#neuFlow)"
        strokeDasharray="1 0"
      />
      <text x="150" y="96" fontSize="12" fill="#15803D" fontWeight="600" fontFamily={F}>
        Direction of nerve impulse →
      </text>

      {/* ===== Dendrites ===== */}
      <g stroke={MEM} fill="none" strokeLinecap="round">
        <path d="M152 238 C120 220 105 205 92 198" strokeWidth="5" />
        <path d="M148 262 C112 258 96 262 80 258" strokeWidth="5" />
        <path d="M150 292 C118 302 100 314 86 324" strokeWidth="5" />
        <path d="M166 226 C150 200 140 182 132 168" strokeWidth="5" />
        <g strokeWidth="3">
          <path d="M92 198 L74 190" />
          <path d="M92 198 L86 180" />
          <path d="M80 258 L62 250" />
          <path d="M80 258 L66 268" />
          <path d="M86 324 L70 332" />
          <path d="M86 324 L80 340" />
          <path d="M132 168 L124 152" />
          <path d="M132 168 L144 156" />
        </g>
      </g>

      {/* ===== Axon core (drawn under myelin) ===== */}
      <line
        x1="242"
        y1="270"
        x2="702"
        y2="270"
        stroke="#C9A9D6"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* ===== Cell body (soma) ===== */}
      <g filter="url(#neuSoft)">
        <ellipse
          cx="190"
          cy="270"
          rx="52"
          ry="56"
          fill="url(#neuSoma)"
          stroke={MEM}
          strokeWidth="3"
        />
      </g>
      <ellipse cx="184" cy="266" rx="22" ry="24" fill="#C9A9D6" stroke={MEM} strokeWidth="1.5" />
      <circle cx="184" cy="266" r="6" fill={MEM} />
      {/* Axon hillock */}
      <polygon points="236,252 236,288 264,270" fill="#E3D2ED" stroke={MEM} strokeWidth="2" />

      {/* ===== Myelin segments + Schwann nuclei + nodes ===== */}
      {myelin.map((cx, i) => (
        <g key={i}>
          <ellipse
            cx={cx}
            cy="270"
            rx="38"
            ry="15"
            fill="#FCEBC6"
            stroke="#D9A441"
            strokeWidth="1.75"
          />
          <ellipse
            cx={cx}
            cy="257"
            rx="6"
            ry="4"
            fill="#E7C36A"
            stroke="#C99A34"
            strokeWidth="0.75"
          />
        </g>
      ))}
      {/* Saltatory impulse hops at two nodes */}
      <path
        d="M352 250 q8 -12 16 0"
        stroke="#15803D"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#neuFlow)"
      />
      <path
        d="M528 250 q8 -12 16 0"
        stroke="#15803D"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#neuFlow)"
      />

      {/* ===== Axon terminals ===== */}
      <g stroke={MEM} fill="none" strokeLinecap="round" strokeWidth="4">
        <path d="M702 270 C724 258 740 250 754 246" />
        <path d="M702 270 C726 270 744 270 758 272" />
        <path d="M702 270 C724 284 740 292 754 298" />
      </g>
      {[
        [758, 245],
        [762, 272],
        [758, 300],
      ].map(([cx, cy], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="9"
          ry="7"
          fill="#EEE3F4"
          stroke={MEM}
          strokeWidth="2"
        />
      ))}
      {/* Target cell strip */}
      <rect
        x="792"
        y="230"
        width="20"
        height="86"
        rx="8"
        fill="#F6D3D3"
        stroke="#C97B7B"
        strokeWidth="2"
      />
      <text x="802" y="332" fontSize="10.5" fill="#9E5B5B" textAnchor="middle" fontFamily={F}>
        target cell
      </text>

      {/* ===== Labels ===== */}
      <g fontFamily={F} fontSize="12.5" fill="#26211A">
        {labels.map((l) => (
          <g key={l.t}>
            <line
              x1={l.anchor === 'end' ? l.x + 6 : l.x - 6}
              y1={l.y - 4}
              x2={l.x2}
              y2={l.y2}
              stroke="#B3ABBE"
              strokeWidth="1.4"
            />
            <text x={l.x} y={l.y} textAnchor={l.anchor}>
              {l.t}
            </text>
          </g>
        ))}
      </g>

      {/* ===== Synapse inset (zoom callout) ===== */}
      <g filter="url(#neuSoft)">
        <rect
          x="556"
          y="378"
          width="316"
          height="140"
          rx="14"
          fill="#FFFFFF"
          stroke="#E5DCEC"
          strokeWidth="1.5"
        />
      </g>
      {/* tapered connector from the middle terminal to the inset */}
      <path d="M762 279 L576 392 L576 420 Z" fill="#EEE3F4" opacity="0.5" />
      <text x="572" y="402" fontSize="11.5" fill="#3A2B4A" fontWeight="700" fontFamily={S}>
        Synapse
      </text>
      {/* presynaptic knob */}
      <path
        d="M596 430 q-24 -30 6 -34 q34 -4 30 24 q-2 22 -18 22 q-14 0 -18 -12 Z"
        fill="#EEE3F4"
        stroke={MEM}
        strokeWidth="2"
      />
      {/* vesicles */}
      {[
        [612, 424],
        [624, 436],
        [606, 446],
        [628, 452],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#BFE9CE" stroke="#15803D" strokeWidth="1.25" />
      ))}
      {/* neurotransmitter crossing the cleft */}
      {[
        [650, 440],
        [662, 452],
        [656, 466],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#15803D" />
      ))}
      {/* postsynaptic membrane + receptors */}
      <rect
        x="690"
        y="404"
        width="14"
        height="96"
        rx="6"
        fill="#F6D3D3"
        stroke="#C97B7B"
        strokeWidth="2"
      />
      {[418, 442, 466].map((cy, i) => (
        <rect key={i} x="684" y={cy} width="8" height="10" rx="2" fill="#C97B7B" />
      ))}
      {/* inset labels */}
      <g fontFamily={F} fontSize="10.5" fill="#5A5064">
        <text x="596" y="500" textAnchor="middle">
          vesicles
        </text>
        <text x="656" y="500" textAnchor="middle">
          cleft
        </text>
        <text x="726" y="446" textAnchor="start">
          receptors
        </text>
      </g>

      {animate && <animate attributeName="opacity" from="0.6" to="1" dur="0.6s" fill="freeze" />}
    </svg>
  )
}
