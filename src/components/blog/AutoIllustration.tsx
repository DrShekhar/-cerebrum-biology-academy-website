'use client'

/**
 * AutoIllustration — Dynamic SVG illustration generator for blog posts
 *
 * Generates beautiful, Google-style SVG illustrations based on blog metadata.
 * Each illustration is unique but deterministic (same slug → same visual).
 * Uses category for color palette and neetChapter for biological motifs.
 *
 * Performance: Pure SVG rendered in React — zero external files, zero network requests.
 * The component is lightweight (~5KB) and renders instantly during SSR.
 */

interface AutoIllustrationProps {
  slug: string
  category?: string
  neetChapter?: string
  title?: string
  className?: string
  animate?: boolean
}

// Deterministic hash from string → stable number
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

// Category → color palettes (primary, secondary, accent, bg1, bg2)
const palettes: Record<string, [string, string, string, string, string]> = {
  'neet-preparation': ['#2563EB', '#1D4ED8', '#3B82F6', '#EFF6FF', '#DBEAFE'],
  'chapter-guides':   ['#059669', '#047857', '#10B981', '#ECFDF5', '#D1FAE5'],
  'exam-updates':     ['#D97706', '#B45309', '#F59E0B', '#FFFBEB', '#FEF3C7'],
  'study-tips':       ['#7C3AED', '#6D28D9', '#8B5CF6', '#F5F3FF', '#EDE9FE'],
  'coaching-guide':   ['#0891B2', '#0E7490', '#06B6D4', '#ECFEFF', '#CFFAFE'],
  'success-stories':  ['#CA8A04', '#A16207', '#EAB308', '#FEFCE8', '#FEF9C3'],
  'biology-concepts': ['#16A34A', '#15803D', '#22C55E', '#F0FDF4', '#DCFCE7'],
  'olympiad':         ['#DC2626', '#B91C1C', '#EF4444', '#FEF2F2', '#FECACA'],
  'default':          ['#2563EB', '#1D4ED8', '#3B82F6', '#EFF6FF', '#DBEAFE'],
}

// Chapter-specific motif identifier
function getMotif(neetChapter: string, slug: string): string {
  const chapter = neetChapter.toLowerCase()
  if (chapter.includes('genetics') || chapter.includes('inheritance') || chapter.includes('variation')) return 'dna'
  if (chapter.includes('physiology') && chapter.includes('human')) return 'heart'
  if (chapter.includes('physiology') && chapter.includes('plant')) return 'leaf'
  if (chapter.includes('photosynthesis')) return 'leaf'
  if (chapter.includes('cell') && chapter.includes('division')) return 'mitosis'
  if (chapter.includes('cell')) return 'cell'
  if (chapter.includes('ecology')) return 'ecosystem'
  if (chapter.includes('reproduction')) return 'flower'
  if (chapter.includes('biotechnology')) return 'biotech'
  if (chapter.includes('evolution')) return 'tree'
  if (chapter.includes('animal kingdom')) return 'animal'
  if (chapter.includes('plant kingdom') || chapter.includes('plant morphology')) return 'plant'
  if (chapter.includes('biomolecules')) return 'molecule'
  if (chapter.includes('digestion') || chapter.includes('absorption')) return 'digestive'
  if (chapter.includes('breathing') || chapter.includes('respiration') || chapter.includes('exchange')) return 'lungs'
  if (chapter.includes('excret')) return 'kidney'
  if (chapter.includes('nervous') || chapter.includes('neural')) return 'neuron'
  if (chapter.includes('circulation') || chapter.includes('body fluids')) return 'heart'

  // For "General" or unknown chapters, pick motif from slug keywords
  const s = slug.toLowerCase()
  if (s.includes('book') || s.includes('ncert')) return 'books'
  if (s.includes('coaching') || s.includes('delhi') || s.includes('kota')) return 'academy'
  if (s.includes('topper') || s.includes('secret') || s.includes('700')) return 'trophy'
  if (s.includes('mistake') || s.includes('avoid')) return 'checklist'
  if (s.includes('mock') || s.includes('test') || s.includes('exam')) return 'exam'
  if (s.includes('strategy') || s.includes('plan') || s.includes('month')) return 'strategy'
  if (s.includes('syllabus') || s.includes('pattern') || s.includes('guide')) return 'document'
  if (s.includes('weightage') || s.includes('analysis')) return 'chart'
  if (s.includes('score') || s.includes('cutoff') || s.includes('rank')) return 'target'
  if (s.includes('college') || s.includes('mbbs') || s.includes('admission')) return 'college'
  if (s.includes('dropper') || s.includes('repeater')) return 'refresh'
  if (s.includes('eligibility') || s.includes('form') || s.includes('application')) return 'form'
  if (s.includes('counselling') || s.includes('dmer')) return 'steps'
  if (s.includes('quota') || s.includes('nri') || s.includes('management')) return 'college'
  if (s.includes('pyq') || s.includes('previous')) return 'archive'

  // Hash-based fallback from a set of nice motifs
  const fallbacks = ['microscope', 'books', 'dna', 'atom', 'beaker', 'stethoscope']
  return fallbacks[hashCode(slug) % fallbacks.length]
}

// SVG motif renderers - each returns a group of SVG elements
function renderMotif(motif: string, primary: string, secondary: string, accent: string, seed: number) {
  const uid = `auto-${seed}`

  switch (motif) {
    case 'dna':
      return (
        <g transform="translate(350, 260)">
          {/* Double helix */}
          <path d="M-60,-160 C-60,-120 60,-100 60,-60 C60,-20 -60,0 -60,40 C-60,80 60,100 60,140"
                stroke={primary} strokeWidth="4" fill="none" opacity="0.9" />
          <path d="M60,-160 C60,-120 -60,-100 -60,-60 C-60,-20 60,0 60,40 C60,80 -60,100 -60,140"
                stroke={secondary} strokeWidth="4" fill="none" opacity="0.9" />
          {/* Base pairs */}
          {[-140, -100, -60, -20, 20, 60, 100].map((y, i) => (
            <line key={i} x1={-40 + (i % 2 ? 20 : 0)} y1={y} x2={40 - (i % 2 ? 20 : 0)} y2={y}
                  stroke={accent} strokeWidth="3" opacity="0.5" />
          ))}
          {/* Nucleotide dots */}
          {[-160, -60, 40, 140].map((y, i) => (
            <g key={`l${i}`}>
              <circle cx={i % 2 ? 60 : -60} cy={y} r="8" fill={primary} opacity="0.8" />
              <circle cx={i % 2 ? -60 : 60} cy={y} r="8" fill={secondary} opacity="0.8" />
            </g>
          ))}
          {/* Floating particles */}
          <circle cx="-120" cy="-80" r="5" fill={accent} opacity="0.3" />
          <circle cx="130" cy="60" r="7" fill={primary} opacity="0.2" />
          <circle cx="-100" cy="120" r="4" fill={secondary} opacity="0.25" />
        </g>
      )

    case 'heart':
      return (
        <g transform="translate(350, 250)">
          {/* Heart shape */}
          <path d="M0,-70 C-25,-110 -90,-100 -90,-55 C-90,10 0,80 0,80 C0,80 90,10 90,-55 C90,-100 25,-110 0,-70Z"
                fill={`url(#${uid}-hg)`} stroke={primary} strokeWidth="2" />
          <defs>
            <radialGradient id={`${uid}-hg`} cx="40%" cy="35%">
              <stop offset="0%" stopColor={accent} />
              <stop offset="100%" stopColor={primary} />
            </radialGradient>
          </defs>
          {/* Pulse line */}
          <path d="M-200,40 L-120,40 L-100,10 L-80,70 L-60,-10 L-40,50 L-20,40 L200,40"
                fill="none" stroke={primary} strokeWidth="2.5" opacity="0.6" />
          {/* Vessels */}
          <path d="M-45,-80 Q-80,-120 -120,-100" stroke={secondary} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M45,-80 Q80,-120 120,-100" stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Small circles */}
          <circle cx="-140" cy="-90" r="6" fill={secondary} opacity="0.5" />
          <circle cx="140" cy="-90" r="6" fill={accent} opacity="0.5" />
        </g>
      )

    case 'cell':
      return (
        <g transform="translate(350, 260)">
          {/* Cell membrane */}
          <ellipse cx="0" cy="0" rx="140" ry="110" fill={`url(#${uid}-cg)`} stroke={primary} strokeWidth="3" opacity="0.85" />
          <defs>
            <radialGradient id={`${uid}-cg`} cx="35%" cy="35%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.3" />
            </radialGradient>
          </defs>
          {/* Nucleus */}
          <ellipse cx="15" cy="-10" rx="50" ry="40" fill={primary} opacity="0.25" stroke={primary} strokeWidth="2" />
          <ellipse cx="20" cy="-15" rx="22" ry="16" fill={secondary} opacity="0.4" />
          {/* Organelles - ER */}
          <path d="M-70,-20 Q-80,10 -60,20 Q-40,30 -50,50" stroke={secondary} strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M-60,-25 Q-70,5 -50,15 Q-30,25 -40,45" stroke={secondary} strokeWidth="2" fill="none" opacity="0.5" />
          {/* Mitochondria */}
          <ellipse cx="80" cy="30" rx="25" ry="14" fill={primary} opacity="0.3" stroke={primary} strokeWidth="1.5" />
          <path d="M62,30 Q72,22 82,30 Q92,38 102,30" stroke={primary} strokeWidth="1" fill="none" opacity="0.5" />
          <ellipse cx="-90" cy="50" rx="20" ry="12" fill={primary} opacity="0.25" stroke={primary} strokeWidth="1.5" />
          {/* Ribosomes */}
          {[[-30, 40], [40, -50], [-80, -40], [60, -30], [-20, 60]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill={secondary} opacity="0.6" />
          ))}
        </g>
      )

    case 'leaf':
      return (
        <g transform="translate(350, 260)">
          {/* Main leaf */}
          <path d="M0,-130 C80,-100 120,-20 100,60 C80,130 20,160 0,160 C-20,160 -80,130 -100,60 C-120,-20 -80,-100 0,-130Z"
                fill={`url(#${uid}-lg)`} stroke={primary} strokeWidth="2" opacity="0.8" />
          <defs>
            <linearGradient id={`${uid}-lg`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accent} />
              <stop offset="100%" stopColor={primary} />
            </linearGradient>
          </defs>
          {/* Midrib */}
          <line x1="0" y1="-120" x2="0" y2="150" stroke={secondary} strokeWidth="3" opacity="0.7" />
          {/* Veins */}
          {[-80, -40, 0, 40, 80].map((y, i) => (
            <g key={i}>
              <line x1="0" y1={y} x2={60 - Math.abs(y) * 0.3} y2={y + 20}
                    stroke={secondary} strokeWidth="1.5" opacity="0.5" />
              <line x1="0" y1={y} x2={-(60 - Math.abs(y) * 0.3)} y2={y + 20}
                    stroke={secondary} strokeWidth="1.5" opacity="0.5" />
            </g>
          ))}
          {/* Chloroplasts */}
          {[[-35, -50], [40, 20], [-25, 70], [30, -80], [-40, 30]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="8" ry="5"
                     fill={secondary} opacity="0.4" transform={`rotate(${(i * 30) - 30}, ${x}, ${y})`} />
          ))}
          {/* Sun rays top-right */}
          <circle cx="120" cy="-100" r="25" fill="#FBBF24" opacity="0.3" />
          <circle cx="120" cy="-100" r="15" fill="#F59E0B" opacity="0.4" />
        </g>
      )

    case 'microscope':
      return (
        <g transform="translate(350, 260)">
          {/* Eyepiece */}
          <rect x="-12" y="-160" width="24" height="40" rx="4" fill={primary} opacity="0.85" />
          <rect x="-18" y="-165" width="36" height="12" rx="3" fill={secondary} opacity="0.7" />
          {/* Body tube */}
          <rect x="-10" y="-120" width="20" height="100" rx="3" fill={primary} opacity="0.75" />
          {/* Arm */}
          <path d="M10,-20 Q10,10 30,30 Q50,50 50,80" stroke={primary} strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.8" />
          {/* Stage */}
          <rect x="-60" y="-25" width="120" height="10" rx="2" fill={secondary} opacity="0.7" />
          {/* Base */}
          <ellipse cx="30" cy="100" rx="80" ry="16" fill={primary} opacity="0.6" />
          {/* Objective lenses */}
          <rect x="-8" y="-28" width="16" height="20" rx="2" fill={accent} opacity="0.8" />
          <circle cx="0" cy="-8" r="6" fill={secondary} opacity="0.5" />
          {/* Light */}
          <circle cx="0" cy="10" r="12" fill="#FBBF24" opacity="0.3" />
          {/* Specimen on stage */}
          <circle cx="-10" cy="-20" r="3" fill={accent} opacity="0.6" />
          <circle cx="10" cy="-18" r="2" fill={accent} opacity="0.5" />
        </g>
      )

    case 'books':
      return (
        <g transform="translate(350, 260)">
          {/* Stack of books */}
          <rect x="-80" y="40" width="160" height="28" rx="4" fill={primary} opacity="0.8" />
          <rect x="-70" y="10" width="150" height="28" rx="4" fill={secondary} opacity="0.8" />
          <rect x="-75" y="-20" width="155" height="28" rx="4" fill={accent} opacity="0.7" />
          {/* Open book on top */}
          <path d="M-60,-30 L-60,-100 Q0,-90 0,-100 L0,-30" fill="white" stroke={primary} strokeWidth="2" opacity="0.9" />
          <path d="M60,-30 L60,-100 Q0,-90 0,-100 L0,-30" fill="white" stroke={primary} strokeWidth="2" opacity="0.85" />
          <line x1="0" y1="-100" x2="0" y2="-30" stroke={primary} strokeWidth="2" opacity="0.6" />
          {/* Text lines on pages */}
          {[-85, -75, -65, -55].map((y, i) => (
            <g key={i}>
              <line x1="-50" y1={y} x2={-15 + (i % 2 ? -5 : 0)} y2={y}
                    stroke={secondary} strokeWidth="1.5" opacity="0.3" />
              <line x1="10" y1={y} x2={45 + (i % 2 ? 5 : 0)} y2={y}
                    stroke={secondary} strokeWidth="1.5" opacity="0.3" />
            </g>
          ))}
          {/* Bookmark */}
          <path d="M35,-105 L35,-55 L42,-65 L49,-55 L49,-105Z" fill="#EF4444" opacity="0.7" />
          {/* Floating elements */}
          <circle cx="-110" cy="-80" r="6" fill={accent} opacity="0.2" />
          <circle cx="110" cy="-60" r="8" fill={primary} opacity="0.15" />
        </g>
      )

    case 'trophy':
      return (
        <g transform="translate(350, 260)">
          {/* Trophy cup */}
          <path d="M-50,-100 L-50,-20 Q-50,40 0,60 Q50,40 50,-20 L50,-100Z"
                fill={`url(#${uid}-tg)`} stroke={primary} strokeWidth="2" />
          <defs>
            <linearGradient id={`${uid}-tg`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Trophy rim */}
          <rect x="-55" y="-105" width="110" height="12" rx="4" fill="#F59E0B" opacity="0.9" />
          {/* Handles */}
          <path d="M-50,-70 Q-90,-70 -90,-30 Q-90,10 -50,10" stroke="#D97706" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M50,-70 Q90,-70 90,-30 Q90,10 50,10" stroke="#D97706" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Stem */}
          <rect x="-8" y="60" width="16" height="30" rx="2" fill={primary} opacity="0.7" />
          {/* Base */}
          <rect x="-40" y="90" width="80" height="14" rx="4" fill={primary} opacity="0.6" />
          {/* Star */}
          <polygon points="0,-75 8,-55 30,-55 13,-40 20,-18 0,-32 -20,-18 -13,-40 -30,-55 -8,-55"
                   fill="white" opacity="0.5" />
          {/* Sparkles */}
          <circle cx="-70" cy="-110" r="4" fill="#FCD34D" opacity="0.6" />
          <circle cx="80" cy="-100" r="3" fill="#FCD34D" opacity="0.5" />
          <circle cx="60" cy="-120" r="5" fill="#FCD34D" opacity="0.4" />
        </g>
      )

    case 'exam':
      return (
        <g transform="translate(350, 260)">
          {/* Paper */}
          <rect x="-70" y="-130" width="140" height="180" rx="6" fill="white" stroke={primary} strokeWidth="2" opacity="0.9" />
          {/* Header */}
          <rect x="-60" y="-120" width="120" height="20" rx="3" fill={primary} opacity="0.15" />
          <line x1="-40" y1="-110" x2="40" y2="-110" stroke={primary} strokeWidth="2" opacity="0.4" />
          {/* Question lines with bubbles */}
          {[-85, -60, -35, -10, 15].map((y, i) => (
            <g key={i}>
              <line x1="-50" y1={y} x2="20" y2={y} stroke="#94A3B8" strokeWidth="1.5" opacity="0.3" />
              {[35, 48, 61].map((x, j) => (
                <circle key={j} cx={x} cy={y} r="5" fill="none" stroke={primary} strokeWidth="1.5" opacity="0.4" />
              ))}
              {/* Fill one bubble per row */}
              <circle cx={35 + (i % 3) * 13} cy={y} r="4" fill={primary} opacity={i < 3 ? 0.7 : 0} />
            </g>
          ))}
          {/* Pencil */}
          <g transform="translate(90, 50) rotate(-30)">
            <rect x="-3" y="-60" width="6" height="50" fill="#FCD34D" />
            <polygon points="-3,0 3,0 0,12" fill="#1E293B" />
            <rect x="-3" y="-65" width="6" height="8" rx="1" fill="#F472B6" opacity="0.8" />
          </g>
          {/* Timer */}
          <circle cx="-100" cy="-100" r="22" fill="white" stroke={primary} strokeWidth="2" opacity="0.7" />
          <line x1="-100" y1="-100" x2="-100" y2="-115" stroke={primary} strokeWidth="2" strokeLinecap="round" />
          <line x1="-100" y1="-100" x2="-88" y2="-96" stroke={secondary} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )

    case 'strategy':
      return (
        <g transform="translate(350, 260)">
          {/* Calendar/board */}
          <rect x="-100" y="-120" width="200" height="160" rx="8" fill="white" stroke={primary} strokeWidth="2" opacity="0.9" />
          <rect x="-100" y="-120" width="200" height="30" rx="8" fill={primary} opacity="0.15" />
          <rect x="-100" y="-90" width="200" height="0" fill={primary} opacity="0" />
          {/* Grid lines */}
          {[-90, -50, -10, 30].map((y, i) => (
            <line key={i} x1="-90" y1={y} x2="90" y2={y} stroke="#E2E8F0" strokeWidth="1" />
          ))}
          {[-40, 10, 60].map((x, i) => (
            <line key={i} x1={x} y1="-90" x2={x} y2="30" stroke="#E2E8F0" strokeWidth="1" />
          ))}
          {/* Checkmarks */}
          {[[-65, -70], [-15, -30], [35, -70], [-65, 10]].map(([x, y], i) => (
            <path key={i} d={`M${x - 8},${y} L${x - 2},${y + 8} L${x + 10},${y - 6}`}
                  stroke={primary} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
          ))}
          {/* Progress arrow */}
          <path d="M-80,70 Q0,50 80,70" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
          <polygon points="80,70 72,62 74,76" fill={accent} opacity="0.5" />
          {/* Star highlight */}
          <circle cx="85" cy="-30" r="8" fill="#FBBF24" opacity="0.4" />
        </g>
      )

    case 'chart':
      return (
        <g transform="translate(350, 260)">
          {/* Chart background */}
          <rect x="-130" y="-130" width="260" height="200" rx="8" fill="white" stroke={primary} strokeWidth="1.5" opacity="0.8" />
          {/* Y axis */}
          <line x1="-110" y1="-110" x2="-110" y2="50" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* X axis */}
          <line x1="-110" y1="50" x2="110" y2="50" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Bars */}
          {[
            [-85, -80, primary, 0.8],
            [-55, -50, secondary, 0.7],
            [-25, -95, primary, 0.9],
            [5, -30, accent, 0.6],
            [35, -65, secondary, 0.7],
            [65, -110, primary, 0.85],
            [95, -45, accent, 0.65],
          ].map(([x, h, color, op], i) => (
            <rect key={i} x={Number(x) - 10} y={Number(h)} width="20"
                  height={50 - Number(h)} rx="3" fill={String(color)} opacity={Number(op)} />
          ))}
          {/* Trend line */}
          <path d="M-85,-60 Q-25,-90 35,-50 Q65,-65 95,-90"
                stroke="#EF4444" strokeWidth="2" fill="none" strokeDasharray="4,3" opacity="0.6" />
          {/* Label dots on trend */}
          <circle cx="-85" cy="-60" r="4" fill="#EF4444" opacity="0.7" />
          <circle cx="95" cy="-90" r="4" fill="#EF4444" opacity="0.7" />
        </g>
      )

    case 'document':
      return (
        <g transform="translate(350, 260)">
          {/* Document */}
          <path d="M-65,-130 L45,-130 L75,-100 L75,110 L-65,110Z"
                fill="white" stroke={primary} strokeWidth="2" opacity="0.9" />
          <path d="M45,-130 L45,-100 L75,-100" fill={accent} stroke={primary} strokeWidth="2" opacity="0.3" />
          {/* Title line */}
          <rect x="-50" y="-110" width="80" height="8" rx="2" fill={primary} opacity="0.3" />
          {/* Content lines */}
          {[-90, -75, -60, -45, -25, -10, 5, 20, 40, 55, 70, 85].map((y, i) => (
            <rect key={i} x="-50" y={y} width={90 - (i % 3) * 15} height="4" rx="1"
                  fill="#94A3B8" opacity="0.25" />
          ))}
          {/* Highlight box */}
          <rect x="-50" y="-30" width="110" height="25" rx="3" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1" />
          {/* Seal / stamp */}
          <circle cx="45" cy="80" r="18" fill={primary} opacity="0.15" stroke={primary} strokeWidth="1.5" />
          <path d="M40,80 L43,85 L52,77" stroke={primary} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )

    case 'college':
      return (
        <g transform="translate(350, 265)">
          {/* Main building */}
          <rect x="-80" y="-60" width="160" height="110" rx="4" fill="white" stroke={primary} strokeWidth="2" opacity="0.85" />
          {/* Roof/pediment */}
          <polygon points="-90,-60 0,-110 90,-60" fill={primary} opacity="0.2" stroke={primary} strokeWidth="2" />
          {/* Pillars */}
          {[-50, -20, 20, 50].map((x, i) => (
            <rect key={i} x={x - 5} y="-55" width="10" height="100" rx="2" fill={primary} opacity="0.15" />
          ))}
          {/* Door */}
          <rect x="-15" y="10" width="30" height="40" rx="15 15 0 0" fill={primary} opacity="0.3" />
          {/* Windows */}
          {[[-50, -30], [50, -30], [-50, 10], [50, 10]].map(([x, y], i) => (
            <rect key={i} x={x - 8} y={y - 8} width="16" height="16" rx="2" fill={accent} opacity="0.3" />
          ))}
          {/* Flag */}
          <line x1="0" y1="-110" x2="0" y2="-140" stroke={primary} strokeWidth="2" />
          <rect x="0" y="-140" width="20" height="14" rx="2" fill="#EF4444" opacity="0.7" />
          {/* Steps */}
          <rect x="-40" y="50" width="80" height="8" rx="2" fill={primary} opacity="0.1" />
          <rect x="-50" y="58" width="100" height="8" rx="2" fill={primary} opacity="0.08" />
          {/* Trees */}
          <circle cx="-110" cy="-10" r="20" fill="#22C55E" opacity="0.25" />
          <rect x="-112" y="10" width="4" height="25" rx="1" fill="#854D0E" opacity="0.3" />
          <circle cx="110" cy="-10" r="20" fill="#22C55E" opacity="0.25" />
          <rect x="108" y="10" width="4" height="25" rx="1" fill="#854D0E" opacity="0.3" />
        </g>
      )

    case 'target':
      return (
        <g transform="translate(350, 260)">
          {/* Target rings */}
          <circle cx="0" cy="0" r="100" fill="none" stroke={primary} strokeWidth="3" opacity="0.2" />
          <circle cx="0" cy="0" r="75" fill="none" stroke={primary} strokeWidth="3" opacity="0.3" />
          <circle cx="0" cy="0" r="50" fill="none" stroke={accent} strokeWidth="3" opacity="0.4" />
          <circle cx="0" cy="0" r="25" fill={primary} opacity="0.15" />
          <circle cx="0" cy="0" r="8" fill={primary} opacity="0.7" />
          {/* Arrow */}
          <line x1="80" y1="-80" x2="8" y2="-8" stroke={secondary} strokeWidth="3" strokeLinecap="round" />
          <polygon points="5,-5 -5,5 15,-15" fill={secondary} opacity="0.8" />
          {/* Arrow feathers */}
          <line x1="82" y1="-82" x2="95" y2="-95" stroke={accent} strokeWidth="2" />
          <line x1="82" y1="-82" x2="100" y2="-75" stroke={accent} strokeWidth="2" />
          <line x1="82" y1="-82" x2="75" y2="-100" stroke={accent} strokeWidth="2" />
          {/* Score numbers */}
          <text x="-115" y="5" fontSize="14" fill={primary} opacity="0.4" fontWeight="600" fontFamily="system-ui">100</text>
          <text x="108" y="5" fontSize="14" fill={primary} opacity="0.4" fontWeight="600" fontFamily="system-ui">500</text>
        </g>
      )

    case 'checklist':
      return (
        <g transform="translate(350, 260)">
          {/* Clipboard */}
          <rect x="-75" y="-130" width="150" height="200" rx="8" fill="white" stroke={primary} strokeWidth="2" opacity="0.9" />
          <rect x="-30" y="-140" width="60" height="20" rx="10" fill={primary} opacity="0.6" />
          <circle cx="0" cy="-130" r="6" fill="white" />
          {/* Items */}
          {[-100, -65, -30, 5, 40].map((y, i) => (
            <g key={i}>
              <rect x="-55" y={y} width="18" height="18" rx="3" fill="none" stroke={primary} strokeWidth="2" opacity="0.4" />
              {i < 3 ? (
                <path d={`M${-52},${y + 9} L${-46},${y + 15} L${-34},${y + 3}`}
                      stroke={i < 2 ? '#22C55E' : '#EF4444'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              ) : null}
              {i === 3 && (
                <>
                  <line x1="-52" y1={y + 3} x2="-40" y2={y + 15} stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                  <line x1="-40" y1={y + 3} x2="-52" y2={y + 15} stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
              <rect x="-25" y={y + 5} width={70 - (i % 2) * 15} height="5" rx="2"
                    fill="#94A3B8" opacity="0.3" />
            </g>
          ))}
        </g>
      )

    case 'ecosystem':
      return (
        <g transform="translate(350, 260)">
          {/* Sun */}
          <circle cx="-100" cy="-110" r="30" fill="#FBBF24" opacity="0.35" />
          <circle cx="-100" cy="-110" r="18" fill="#F59E0B" opacity="0.45" />
          {/* Mountains */}
          <polygon points="-180,60 -100,-40 -20,60" fill={primary} opacity="0.15" />
          <polygon points="-60,60 30,-60 120,60" fill={secondary} opacity="0.2" />
          {/* Ground */}
          <ellipse cx="0" cy="80" rx="180" ry="30" fill="#22C55E" opacity="0.15" />
          {/* Trees */}
          {[-120, -60, 20, 80, 130].map((x, i) => (
            <g key={i}>
              <polygon points={`${x},${50 - i * 5} ${x - 15},${70 - i * 3} ${x + 15},${70 - i * 3}`}
                       fill="#22C55E" opacity={0.3 + i * 0.05} />
              <rect x={x - 2} y={70 - i * 3} width="4" height="12" fill="#854D0E" opacity="0.3" />
            </g>
          ))}
          {/* Water/river */}
          <path d="M-180,60 Q-80,50 0,65 Q80,80 180,60" fill={accent} opacity="0.15" />
          {/* Birds */}
          <path d="M60,-80 Q65,-87 70,-80" stroke="#1E293B" strokeWidth="1.5" fill="none" opacity="0.3" />
          <path d="M80,-90 Q85,-97 90,-90" stroke="#1E293B" strokeWidth="1.5" fill="none" opacity="0.3" />
          {/* Cycle arrows */}
          <circle cx="0" cy="-20" r="40" fill="none" stroke={primary} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.25" />
        </g>
      )

    case 'mitosis':
      return (
        <g transform="translate(350, 260)">
          {/* Parent cell */}
          <ellipse cx="-90" cy="-40" rx="55" ry="45" fill={accent} opacity="0.2" stroke={primary} strokeWidth="2" />
          <ellipse cx="-90" cy="-40" rx="20" ry="16" fill={primary} opacity="0.3" />
          {/* Arrow */}
          <path d="M-30,-40 L30,-40" stroke={primary} strokeWidth="2" strokeDasharray="4,3" opacity="0.5" />
          <polygon points="30,-40 22,-46 22,-34" fill={primary} opacity="0.5" />
          {/* Dividing cell */}
          <path d="M60,-80 Q100,-80 100,-40 Q100,0 60,0 Q80,-20 80,-40 Q80,-60 60,-80Z"
                fill={accent} opacity="0.2" stroke={primary} strokeWidth="2" />
          <path d="M60,-80 Q20,-80 20,-40 Q20,0 60,0 Q40,-20 40,-40 Q40,-60 60,-80Z"
                fill={accent} opacity="0.2" stroke={primary} strokeWidth="2" />
          {/* Daughter nuclei */}
          <circle cx="40" cy="-40" r="10" fill={primary} opacity="0.3" />
          <circle cx="80" cy="-40" r="10" fill={primary} opacity="0.3" />
          {/* Spindle fibers */}
          {[-60, -50, -40, -30, -20].map((y, i) => (
            <line key={i} x1="45" y1={y} x2="75" y2={y} stroke={secondary} strokeWidth="0.8" opacity="0.3" />
          ))}
          {/* Chromosomes in parent */}
          <line x1="-95" y1="-50" x2="-85" y2="-30" stroke={secondary} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          <line x1="-80" y1="-48" x2="-90" y2="-32" stroke={secondary} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          {/* Stage labels */}
          <text x="-90" y="30" fontSize="11" fill={primary} opacity="0.4" textAnchor="middle" fontFamily="system-ui" fontWeight="500">Interphase</text>
          <text x="60" y="30" fontSize="11" fill={primary} opacity="0.4" textAnchor="middle" fontFamily="system-ui" fontWeight="500">Cytokinesis</text>
        </g>
      )

    case 'flower':
      return (
        <g transform="translate(350, 260)">
          {/* Petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x = Math.cos(rad) * 55
            const y = Math.sin(rad) * 55
            return (
              <ellipse key={i} cx={x} cy={y} rx="35" ry="20"
                       fill={i % 2 === 0 ? accent : primary} opacity="0.3"
                       transform={`rotate(${angle}, ${x}, ${y})`} />
            )
          })}
          {/* Center */}
          <circle cx="0" cy="0" r="25" fill="#FBBF24" opacity="0.6" />
          <circle cx="0" cy="0" r="15" fill="#F59E0B" opacity="0.5" />
          {/* Stamen dots */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            return (
              <circle key={i} cx={Math.cos(rad) * 20} cy={Math.sin(rad) * 20} r="3"
                      fill="#92400E" opacity="0.4" />
            )
          })}
          {/* Stem */}
          <line x1="0" y1="60" x2="0" y2="150" stroke="#22C55E" strokeWidth="4" opacity="0.6" />
          {/* Leaves */}
          <path d="M0,100 Q-40,80 -50,100 Q-40,110 0,100" fill="#22C55E" opacity="0.4" />
          <path d="M0,120 Q40,100 50,120 Q40,130 0,120" fill="#22C55E" opacity="0.35" />
        </g>
      )

    case 'neuron':
      return (
        <g transform="translate(350, 260)">
          {/* Cell body */}
          <circle cx="0" cy="0" r="35" fill={`url(#${uid}-ng)`} stroke={primary} strokeWidth="2" opacity="0.8" />
          <defs>
            <radialGradient id={`${uid}-ng`} cx="40%" cy="40%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
              <stop offset="100%" stopColor={primary} stopOpacity="0.3" />
            </radialGradient>
          </defs>
          {/* Nucleus */}
          <circle cx="-5" cy="-5" r="14" fill={primary} opacity="0.25" />
          {/* Dendrites */}
          <path d="M-30,-20 Q-60,-40 -80,-30 Q-100,-25 -120,-35" stroke={primary} strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
          <path d="M-25,15 Q-50,30 -70,20 Q-85,15 -100,25" stroke={primary} strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M-20,-30 Q-35,-60 -50,-70" stroke={primary} strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M-15,30 Q-30,55 -45,60" stroke={primary} strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
          {/* Axon */}
          <path d="M35,0 L160,0" stroke={secondary} strokeWidth="4" fill="none" opacity="0.7" strokeLinecap="round" />
          {/* Myelin sheath */}
          {[55, 85, 115, 145].map((x, i) => (
            <ellipse key={i} cx={x} cy="0" rx="10" ry="8" fill={accent} opacity="0.2" stroke={secondary} strokeWidth="1" />
          ))}
          {/* Axon terminals */}
          <path d="M160,0 Q170,-15 180,-20" stroke={secondary} strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M160,0 Q170,15 180,20" stroke={secondary} strokeWidth="2" fill="none" opacity="0.5" />
          <circle cx="180" cy="-20" r="5" fill={primary} opacity="0.5" />
          <circle cx="180" cy="20" r="5" fill={primary} opacity="0.5" />
          {/* Signal dots */}
          {[45, 75, 105, 135].map((x, i) => (
            <circle key={i} cx={x} cy="0" r="2.5" fill={primary} opacity={0.3 + i * 0.1} />
          ))}
        </g>
      )

    case 'molecule':
      return (
        <g transform="translate(350, 260)">
          {/* Central atom */}
          <circle cx="0" cy="0" r="20" fill={primary} opacity="0.6" />
          {/* Bonds and atoms */}
          {[
            [0, -80, secondary, 16],
            [70, -40, accent, 14],
            [70, 40, primary, 14],
            [0, 80, secondary, 16],
            [-70, 40, accent, 14],
            [-70, -40, primary, 14],
          ].map(([x, y, color, r], i) => (
            <g key={i}>
              <line x1="0" y1="0" x2={Number(x)} y2={Number(y)} stroke="#94A3B8" strokeWidth="3" opacity="0.4" />
              <circle cx={Number(x)} cy={Number(y)} r={Number(r)} fill={String(color)} opacity="0.5" />
            </g>
          ))}
          {/* Sub-bonds */}
          <line x1="0" y1="-80" x2="-40" y2="-120" stroke="#94A3B8" strokeWidth="2" opacity="0.3" />
          <circle cx="-40" cy="-120" r="10" fill={accent} opacity="0.4" />
          <line x1="70" y1="-40" x2="120" y2="-70" stroke="#94A3B8" strokeWidth="2" opacity="0.3" />
          <circle cx="120" cy="-70" r="10" fill={secondary} opacity="0.4" />
          {/* Electron clouds */}
          <circle cx="0" cy="0" r="45" fill="none" stroke={primary} strokeWidth="1" strokeDasharray="3,3" opacity="0.15" />
          <circle cx="0" cy="0" r="90" fill="none" stroke={primary} strokeWidth="1" strokeDasharray="3,3" opacity="0.1" />
        </g>
      )

    case 'biotech':
      return (
        <g transform="translate(350, 260)">
          {/* Flask */}
          <path d="M-20,-100 L-20,-30 L-60,60 Q-65,80 -45,80 L45,80 Q65,80 60,60 L20,-30 L20,-100Z"
                fill={accent} opacity="0.15" stroke={primary} strokeWidth="2" />
          <rect x="-25" y="-110" width="50" height="15" rx="3" fill={primary} opacity="0.4" />
          {/* Liquid */}
          <path d="M-50,30 Q0,20 50,30 L60,60 Q65,80 45,80 L-45,80 Q-65,80 -60,60Z"
                fill={primary} opacity="0.2" />
          {/* Bubbles */}
          {[[-20, 50], [10, 40], [-5, 60], [20, 55], [-15, 35]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={4 + i} fill="white" opacity="0.4" />
          ))}
          {/* DNA snippet inside */}
          <path d="M-10,30 C-10,15 10,10 10,30 C10,50 -10,45 -10,60" stroke={secondary} strokeWidth="2" fill="none" opacity="0.4" />
          {/* Test tubes beside */}
          <rect x="90" y="-40" width="14" height="70" rx="7" fill={secondary} opacity="0.2" stroke={secondary} strokeWidth="1.5" />
          <rect x="90" y="0" width="14" height="30" rx="0 0 7 7" fill={secondary} opacity="0.3" />
          <rect x="115" y="-20" width="14" height="55" rx="7" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.5" />
          <rect x="115" y="10" width="14" height="25" rx="0 0 7 7" fill={accent} opacity="0.3" />
        </g>
      )

    case 'tree':
      return (
        <g transform="translate(350, 270)">
          {/* Trunk */}
          <rect x="-6" y="20" width="12" height="60" fill="#854D0E" opacity="0.5" rx="3" />
          {/* Main branches */}
          <line x1="0" y1="20" x2="-60" y2="-40" stroke="#854D0E" strokeWidth="4" opacity="0.4" />
          <line x1="0" y1="20" x2="60" y2="-40" stroke="#854D0E" strokeWidth="4" opacity="0.4" />
          <line x1="-60" y1="-40" x2="-100" y2="-80" stroke="#854D0E" strokeWidth="3" opacity="0.35" />
          <line x1="-60" y1="-40" x2="-30" y2="-90" stroke="#854D0E" strokeWidth="3" opacity="0.35" />
          <line x1="60" y1="-40" x2="100" y2="-80" stroke="#854D0E" strokeWidth="3" opacity="0.35" />
          <line x1="60" y1="-40" x2="30" y2="-90" stroke="#854D0E" strokeWidth="3" opacity="0.35" />
          {/* Leaf clusters */}
          {[[-100, -80], [-30, -90], [30, -90], [100, -80], [-70, -110], [70, -110], [0, -120]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={18 + (i % 3) * 4}
                    fill={i % 2 === 0 ? primary : accent} opacity={0.25 + (i % 3) * 0.05} />
          ))}
          {/* Root */}
          <path d="M-6,80 Q-30,90 -40,100" stroke="#854D0E" strokeWidth="2" opacity="0.3" />
          <path d="M6,80 Q30,90 40,100" stroke="#854D0E" strokeWidth="2" opacity="0.3" />
          {/* Time arrow at bottom */}
          <line x1="-120" y1="110" x2="120" y2="110" stroke={primary} strokeWidth="1.5" opacity="0.3" />
          <polygon points="120,110 112,105 112,115" fill={primary} opacity="0.3" />
          <text x="-120" y="125" fontSize="10" fill={primary} opacity="0.3" fontFamily="system-ui">Simple</text>
          <text x="80" y="125" fontSize="10" fill={primary} opacity="0.3" fontFamily="system-ui">Complex</text>
        </g>
      )

    // Additional motifs for variety
    case 'atom':
      return (
        <g transform="translate(350, 260)">
          {/* Nucleus */}
          <circle cx="0" cy="0" r="18" fill={primary} opacity="0.6" />
          {/* Orbits */}
          <ellipse cx="0" cy="0" rx="100" ry="40" fill="none" stroke={primary} strokeWidth="1.5" opacity="0.25" />
          <ellipse cx="0" cy="0" rx="100" ry="40" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.25" transform="rotate(60)" />
          <ellipse cx="0" cy="0" rx="100" ry="40" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.25" transform="rotate(-60)" />
          {/* Electrons */}
          <circle cx="100" cy="0" r="8" fill={primary} opacity="0.7" />
          <circle cx="-50" cy="-35" r="8" fill={secondary} opacity="0.7" />
          <circle cx="-50" cy="35" r="8" fill={accent} opacity="0.7" />
        </g>
      )

    case 'beaker':
      return (
        <g transform="translate(350, 260)">
          {/* Beaker */}
          <path d="M-55,-100 L-55,60 Q-55,80 -35,80 L35,80 Q55,80 55,60 L55,-100"
                fill="white" stroke={primary} strokeWidth="2" opacity="0.85" />
          {/* Liquid */}
          <path d="M-50,-10 Q0,-20 50,-10 L50,60 Q50,75 35,75 L-35,75 Q-50,75 -50,60Z"
                fill={accent} opacity="0.2" />
          {/* Measurement lines */}
          {[-80, -50, -20, 10, 40].map((y, i) => (
            <g key={i}>
              <line x1="-50" y1={y} x2="-35" y2={y} stroke={primary} strokeWidth="1" opacity="0.3" />
              <text x="-60" y={y + 3} fontSize="8" fill={primary} opacity="0.3" textAnchor="end" fontFamily="system-ui">{500 - i * 100}</text>
            </g>
          ))}
          {/* Bubbles */}
          <circle cx="-15" cy="30" r="5" fill="white" opacity="0.5" />
          <circle cx="20" cy="10" r="4" fill="white" opacity="0.4" />
          <circle cx="5" cy="45" r="6" fill="white" opacity="0.45" />
          {/* Stir rod */}
          <line x1="30" y1="-110" x2="10" y2="40" stroke="#94A3B8" strokeWidth="3" opacity="0.4" strokeLinecap="round" />
        </g>
      )

    case 'stethoscope':
      return (
        <g transform="translate(350, 260)">
          {/* Earpieces */}
          <circle cx="-40" cy="-120" r="8" fill={primary} opacity="0.6" />
          <circle cx="40" cy="-120" r="8" fill={primary} opacity="0.6" />
          {/* Tubes */}
          <path d="M-40,-112 Q-40,-60 0,-30" stroke={primary} strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M40,-112 Q40,-60 0,-30" stroke={primary} strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round" />
          {/* Chest piece tube */}
          <path d="M0,-30 Q0,50 0,80" stroke={primary} strokeWidth="5" fill="none" opacity="0.5" strokeLinecap="round" />
          {/* Diaphragm */}
          <circle cx="0" cy="95" r="28" fill={primary} opacity="0.3" stroke={primary} strokeWidth="2.5" />
          <circle cx="0" cy="95" r="18" fill={accent} opacity="0.2" />
          {/* Sound waves */}
          <path d="M35,95 Q55,75 35,55" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.3" />
          <path d="M45,95 Q70,70 45,45" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.2" />
        </g>
      )

    case 'academy':
      return (
        <g transform="translate(350, 260)">
          {/* Graduation cap */}
          <polygon points="0,-100 -100,-60 0,-20 100,-60" fill={primary} opacity="0.6" />
          <rect x="-10" y="-90" width="20" height="30" fill={secondary} opacity="0.4" />
          {/* Tassel */}
          <line x1="100" y1="-60" x2="100" y2="-10" stroke="#D97706" strokeWidth="2" opacity="0.6" />
          <circle cx="100" cy="-10" r="6" fill="#F59E0B" opacity="0.5" />
          {/* Chalkboard */}
          <rect x="-80" y="0" width="160" height="100" rx="6" fill="#1E293B" opacity="0.7" />
          <rect x="-72" y="8" width="144" height="84" rx="3" fill="#334155" opacity="0.8" />
          {/* Math/bio on board */}
          <text x="0" y="45" fontSize="16" fill="white" opacity="0.5" textAnchor="middle" fontFamily="system-ui">E = mc²</text>
          <text x="0" y="70" fontSize="12" fill={accent} opacity="0.4" textAnchor="middle" fontFamily="system-ui">DNA → RNA → Protein</text>
        </g>
      )

    case 'form':
      return (
        <g transform="translate(350, 260)">
          {/* Form paper */}
          <rect x="-80" y="-130" width="160" height="210" rx="6" fill="white" stroke={primary} strokeWidth="2" opacity="0.9" />
          {/* Header */}
          <rect x="-70" y="-120" width="140" height="25" rx="3" fill={primary} opacity="0.1" />
          <rect x="-50" y="-112" width="100" height="6" rx="2" fill={primary} opacity="0.3" />
          {/* Form fields */}
          {[-80, -45, -10, 25].map((y, i) => (
            <g key={i}>
              <rect x="-60" y={y} width="50" height="5" rx="1" fill="#94A3B8" opacity="0.3" />
              <rect x="-60" y={y + 12} width="120" height="20" rx="3" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
              {i < 2 && <rect x="-55" y={y + 16} width={80 - i * 20} height="4" rx="1" fill={primary} opacity="0.15" />}
            </g>
          ))}
          {/* Submit button */}
          <rect x="-30" y="60" width="60" height="24" rx="4" fill={primary} opacity="0.6" />
          <rect x="-15" y="68" width="30" height="5" rx="2" fill="white" opacity="0.7" />
        </g>
      )

    case 'archive':
      return (
        <g transform="translate(350, 260)">
          {/* Stack of papers */}
          <rect x="-70" y="-80" width="140" height="170" rx="4" fill="white" stroke={primary} strokeWidth="1.5" opacity="0.7" />
          <rect x="-65" y="-85" width="140" height="170" rx="4" fill="white" stroke={primary} strokeWidth="1.5" opacity="0.6" />
          <rect x="-60" y="-90" width="140" height="170" rx="4" fill="white" stroke={primary} strokeWidth="2" opacity="0.9" />
          {/* Year labels */}
          {[-70, -40, -10, 20, 50].map((y, i) => (
            <g key={i}>
              <rect x="-45" y={y} width="100" height="18" rx="3" fill={primary} opacity={0.08 + i * 0.03} />
              <text x="-35" y={y + 13} fontSize="10" fill={primary} opacity="0.5" fontFamily="system-ui" fontWeight="500">
                {2020 + i}
              </text>
              <rect x="10" y={y + 5} width={40 + i * 5} height="4" rx="1" fill={accent} opacity="0.3" />
            </g>
          ))}
          {/* Search icon */}
          <circle cx="90" cy="-100" r="18" fill="none" stroke={primary} strokeWidth="2.5" opacity="0.4" />
          <line x1="103" y1="-87" x2="115" y2="-75" stroke={primary} strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
        </g>
      )

    case 'steps':
      return (
        <g transform="translate(350, 270)">
          {/* Staircase steps */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={-100 + i * 45} y={60 - i * 35}
                  width="45" height={120 - (4 - i) * 35} rx="3"
                  fill={primary} opacity={0.15 + i * 0.08} />
          ))}
          {/* Step labels */}
          {['1', '2', '3', '4', '5'].map((n, i) => (
            <text key={i} x={-78 + i * 45} y={75 - i * 35}
                  fontSize="14" fill={primary} opacity="0.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">{n}</text>
          ))}
          {/* Person climbing */}
          <circle cx={-100 + 4 * 45 + 5} cy={60 - 4 * 35 - 30} r="10" fill={primary} opacity="0.5" />
          <line x1={-100 + 4 * 45 + 5} y1={60 - 4 * 35 - 20} x2={-100 + 4 * 45 + 5} y2={60 - 4 * 35 - 5}
                stroke={primary} strokeWidth="2" opacity="0.4" />
          {/* Flag at top */}
          <line x1={-100 + 4 * 45 + 30} y1={60 - 4 * 35 - 40} x2={-100 + 4 * 45 + 30} y2={60 - 4 * 35}
                stroke={primary} strokeWidth="2" opacity="0.5" />
          <polygon points={`${-100 + 4 * 45 + 30},${60 - 4 * 35 - 40} ${-100 + 4 * 45 + 50},${60 - 4 * 35 - 32} ${-100 + 4 * 45 + 30},${60 - 4 * 35 - 24}`}
                   fill="#EF4444" opacity="0.5" />
        </g>
      )

    case 'refresh':
      return (
        <g transform="translate(350, 260)">
          {/* Circular arrow */}
          <path d="M0,-80 A80,80 0 1,1 -56,-56" fill="none" stroke={primary} strokeWidth="5" opacity="0.4" strokeLinecap="round" />
          <polygon points="-56,-56 -70,-40 -42,-42" fill={primary} opacity="0.5" />
          {/* Inner person */}
          <circle cx="0" cy="-15" r="18" fill={primary} opacity="0.3" />
          <rect x="-12" y="5" width="24" height="35" rx="8" fill={primary} opacity="0.25" />
          {/* Stars around */}
          <circle cx="-80" cy="-80" r="6" fill="#FBBF24" opacity="0.4" />
          <circle cx="90" cy="-50" r="4" fill="#FBBF24" opacity="0.3" />
          <circle cx="70" cy="70" r="5" fill="#FBBF24" opacity="0.35" />
          {/* Arrow up */}
          <line x1="0" y1="60" x2="0" y2="100" stroke={accent} strokeWidth="3" opacity="0.4" />
          <polygon points="0,60 -8,72 8,72" fill={accent} opacity="0.4" />
        </g>
      )

    case 'animal':
      return (
        <g transform="translate(350, 260)">
          {/* Simplified butterfly */}
          <path d="M0,-10 Q-60,-80 -100,-40 Q-120,0 -60,30 Q-30,15 0,-10Z"
                fill={primary} opacity="0.3" />
          <path d="M0,-10 Q60,-80 100,-40 Q120,0 60,30 Q30,15 0,-10Z"
                fill={accent} opacity="0.3" />
          <path d="M0,-10 Q-40,30 -70,80 Q-50,90 -20,50 Q-10,30 0,-10Z"
                fill={secondary} opacity="0.25" />
          <path d="M0,-10 Q40,30 70,80 Q50,90 20,50 Q10,30 0,-10Z"
                fill={primary} opacity="0.25" />
          {/* Body */}
          <ellipse cx="0" cy="10" rx="5" ry="30" fill="#1E293B" opacity="0.5" />
          {/* Antennae */}
          <path d="M0,-25 Q-15,-50 -25,-60" stroke="#1E293B" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M0,-25 Q15,-50 25,-60" stroke="#1E293B" strokeWidth="1.5" fill="none" opacity="0.4" />
          <circle cx="-25" cy="-60" r="3" fill="#1E293B" opacity="0.4" />
          <circle cx="25" cy="-60" r="3" fill="#1E293B" opacity="0.4" />
          {/* Wing patterns */}
          <circle cx="-55" cy="-30" r="12" fill="white" opacity="0.2" />
          <circle cx="55" cy="-30" r="12" fill="white" opacity="0.2" />
          <circle cx="-40" cy="40" r="8" fill="white" opacity="0.15" />
          <circle cx="40" cy="40" r="8" fill="white" opacity="0.15" />
        </g>
      )

    case 'plant':
      return (
        <g transform="translate(350, 280)">
          {/* Pot */}
          <path d="M-40,30 L-50,80 L50,80 L40,30Z" fill="#D97706" opacity="0.4" />
          <rect x="-50" y="22" width="100" height="14" rx="4" fill="#B45309" opacity="0.4" />
          {/* Soil */}
          <path d="M-40,30 Q0,25 40,30" fill="#854D0E" opacity="0.3" />
          {/* Stem */}
          <path d="M0,25 Q5,-20 0,-80" stroke="#16A34A" strokeWidth="4" fill="none" opacity="0.6" />
          {/* Leaves */}
          <path d="M0,-20 Q-40,-40 -60,-20 Q-40,-10 0,-20" fill="#22C55E" opacity="0.5" />
          <path d="M0,-45 Q40,-65 60,-45 Q40,-35 0,-45" fill="#16A34A" opacity="0.4" />
          <path d="M0,-65 Q-30,-85 -45,-65 Q-30,-55 0,-65" fill="#22C55E" opacity="0.45" />
          {/* Small flowers */}
          <circle cx="0" cy="-90" r="12" fill={accent} opacity="0.4" />
          <circle cx="0" cy="-90" r="6" fill="#FBBF24" opacity="0.5" />
          {/* Water drops */}
          <path d="M-70,0 Q-72,-8 -74,0 Q-72,5 -70,0Z" fill={primary} opacity="0.3" />
          <path d="M70,-10 Q68,-18 66,-10 Q68,-5 70,-10Z" fill={primary} opacity="0.25" />
        </g>
      )

    case 'digestive':
      return (
        <g transform="translate(350, 260)">
          {/* Simplified digestive tract */}
          <path d="M0,-120 Q-10,-100 0,-80" stroke={primary} strokeWidth="6" fill="none" opacity="0.5" strokeLinecap="round" />
          <ellipse cx="0" cy="-55" rx="35" ry="25" fill={primary} opacity="0.2" stroke={primary} strokeWidth="2" />
          <path d="M0,-30 Q20,0 -10,30 Q-30,60 10,90 Q30,110 0,130"
                stroke={secondary} strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
          {/* Enzymes */}
          {[[-20, -55], [20, -50], [10, 10], [-15, 50], [5, 90]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill={accent} opacity="0.4" />
          ))}
          {/* Labels */}
          <text x="50" y="-50" fontSize="10" fill={primary} opacity="0.35" fontFamily="system-ui">Stomach</text>
          <text x="40" y="50" fontSize="10" fill={secondary} opacity="0.35" fontFamily="system-ui">Intestine</text>
          {/* Arrow */}
          <line x1="0" y1="-130" x2="0" y2="140" stroke={primary} strokeWidth="1" strokeDasharray="4,4" opacity="0.15" />
        </g>
      )

    case 'lungs':
      return (
        <g transform="translate(350, 260)">
          {/* Trachea */}
          <rect x="-8" y="-120" width="16" height="50" rx="6" fill={primary} opacity="0.3" />
          {/* Bronchi */}
          <path d="M-8,-70 Q-40,-50 -60,-30" stroke={primary} strokeWidth="6" fill="none" opacity="0.35" strokeLinecap="round" />
          <path d="M8,-70 Q40,-50 60,-30" stroke={primary} strokeWidth="6" fill="none" opacity="0.35" strokeLinecap="round" />
          {/* Left lung */}
          <path d="M-30,-60 Q-110,-40 -110,30 Q-110,90 -50,90 Q-10,90 -10,-10 Q-10,-50 -30,-60Z"
                fill={accent} opacity="0.15" stroke={primary} strokeWidth="2" />
          {/* Right lung */}
          <path d="M30,-60 Q110,-40 110,30 Q110,90 50,90 Q10,90 10,-10 Q10,-50 30,-60Z"
                fill={accent} opacity="0.15" stroke={primary} strokeWidth="2" />
          {/* Alveoli clusters */}
          {[[-70, 20], [-50, 50], [-80, 55], [70, 20], [50, 50], [80, 55]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="12" fill={primary} opacity="0.1" stroke={primary} strokeWidth="1" />
          ))}
          {/* O2 / CO2 */}
          <text x="-130" y="-20" fontSize="11" fill="#EF4444" opacity="0.4" fontWeight="600" fontFamily="system-ui">O₂</text>
          <text x="120" y="-20" fontSize="11" fill={primary} opacity="0.4" fontWeight="600" fontFamily="system-ui">CO₂</text>
        </g>
      )

    case 'kidney':
      return (
        <g transform="translate(350, 260)">
          {/* Kidney shape */}
          <path d="M-50,-80 Q-90,-40 -70,20 Q-50,80 0,80 Q30,80 30,30 Q30,-10 0,-20 Q-20,-30 -20,-60 Q-20,-80 -50,-80Z"
                fill={primary} opacity="0.2" stroke={primary} strokeWidth="2" />
          {/* Inner structure */}
          <path d="M-10,-20 Q-30,0 -20,30 Q-10,50 10,50"
                stroke={secondary} strokeWidth="2" fill="none" opacity="0.4" />
          {/* Nephron simplified */}
          <circle cx="-30" cy="-10" r="12" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.5" />
          <path d="M-18,-10 Q0,-30 10,-10 Q20,10 10,30 Q0,40 -10,30"
                stroke={accent} strokeWidth="1.5" fill="none" opacity="0.3" />
          {/* Ureter */}
          <path d="M10,60 Q20,80 15,100 Q10,120 15,140"
                stroke={secondary} strokeWidth="4" fill="none" opacity="0.4" strokeLinecap="round" />
          {/* Water drops / filtration */}
          {[[-50, -50], [-60, 0], [-40, 40]].map(([x, y], i) => (
            <path key={i} d={`M${x},${y} Q${x - 2},${y - 6} ${x - 4},${y} Q${x - 2},${y + 3} ${x},${y}Z`}
                  fill={primary} opacity="0.3" />
          ))}
        </g>
      )

    default:
      return (
        <g transform="translate(350, 260)">
          {/* Generic science/education motif */}
          <circle cx="0" cy="0" r="60" fill={primary} opacity="0.08" />
          <circle cx="0" cy="0" r="40" fill={primary} opacity="0.08" />
          <circle cx="0" cy="0" r="20" fill={primary} opacity="0.1" />
          {/* Atom-like orbits */}
          <ellipse cx="0" cy="0" rx="80" ry="25" fill="none" stroke={primary} strokeWidth="1.5" opacity="0.15" transform="rotate(30)" />
          <ellipse cx="0" cy="0" rx="80" ry="25" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.15" transform="rotate(-30)" />
          {/* Corner decorations */}
          <circle cx="-80" cy="-80" r="8" fill={accent} opacity="0.2" />
          <circle cx="80" cy="80" r="6" fill={primary} opacity="0.2" />
          <circle cx="80" cy="-80" r="10" fill={secondary} opacity="0.15" />
        </g>
      )
  }
}

export function AutoIllustration({
  slug,
  category = 'default',
  neetChapter = 'General',
  title = '',
  className = '',
  animate = false,
}: AutoIllustrationProps) {
  const seed = hashCode(slug)
  const palette = palettes[category] || palettes['default']
  const [primary, secondary, accent, bg1, bg2] = palette
  const motif = getMotif(neetChapter, slug)
  const uid = `auto-${seed}`

  // Decorative circle positions derived from seed for uniqueness
  const c1x = 80 + (seed % 100)
  const c1y = 60 + (seed % 80)
  const c2x = 500 + (seed % 120)
  const c2y = 350 + (seed % 100)
  const c3x = 600 + (seed % 60)
  const c3y = 80 + (seed % 70)

  return (
    <svg
      viewBox="0 0 700 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title || 'Blog illustration'}
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={bg1} />
          <stop offset="50%" stopColor={bg2} />
          <stop offset="100%" stopColor={bg1} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill={`url(#${uid}-bg)`} rx="16" />

      {/* Subtle decorative circles */}
      <circle cx={c1x} cy={c1y} r="120" fill={primary} opacity="0.04" />
      <circle cx={c2x} cy={c2y} r="90" fill={secondary} opacity="0.04" />
      <circle cx={c3x} cy={c3y} r="60" fill={accent} opacity="0.03" />

      {/* Grid pattern for texture */}
      <pattern id={`${uid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="0.5" fill={primary} opacity="0.08" />
      </pattern>
      <rect width="700" height="520" fill={`url(#${uid}-grid)`} />

      {/* Main illustration motif */}
      {renderMotif(motif, primary, secondary, accent, seed)}

      {/* Bottom branding bar */}
      <rect x="0" y="480" width="700" height="40" fill={primary} opacity="0.05" />
      <text x="350" y="505" textAnchor="middle" fontSize="12" fontWeight="500"
            fontFamily="system-ui, -apple-system, sans-serif" fill={primary} opacity="0.35">
        Cerebrum Biology Academy
      </text>
    </svg>
  )
}

export default AutoIllustration
