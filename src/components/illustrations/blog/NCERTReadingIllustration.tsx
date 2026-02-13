'use client'

import type { IllustrationProps } from './shared'

export function NCERTReadingIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  // NCERT chapter data with question counts
  const class11Chapters = [
    { name: 'Cell Structure', questions: 8, color: '#10B981' },
    { name: 'Biomolecules', questions: 6, color: '#3B82F6' },
    { name: 'Plant Kingdom', questions: 5, color: '#22C55E' },
    { name: 'Animal Kingdom', questions: 7, color: '#F59E0B' },
    { name: 'Morphology', questions: 4, color: '#8B5CF6' },
  ]

  const class12Chapters = [
    { name: 'Reproduction', questions: 9, color: '#EC4899' },
    { name: 'Genetics', questions: 12, color: '#EF4444' },
    { name: 'Evolution', questions: 5, color: '#06B6D4' },
    { name: 'Ecology', questions: 8, color: '#22C55E' },
    { name: 'Biotechnology', questions: 6, color: '#8B5CF6' },
  ]

  const readingStages = [
    { stage: '1st', title: 'Overview', desc: 'Skim through', color: '#3B82F6', icon: '👁️' },
    { stage: '2nd', title: 'Deep Read', desc: 'Understand concepts', color: '#10B981', icon: '📖' },
    { stage: '3rd', title: 'Revision', desc: 'Highlight & memorize', color: '#F59E0B', icon: '✨' },
  ]

  return (
    <Wrapper
      viewBox="0 0 650 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="ncertBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0FDF4" />
          <stop offset="50%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#F0F9FF" />
        </linearGradient>
        {/* Book cover gradients */}
        <linearGradient id="class11BookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="class12BookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        {/* Highlight gradient */}
        <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        {/* Page shadow */}
        <filter id="ncertBookShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.15" />
        </filter>
        {/* Glow effect */}
        <filter id="ncertGlow">
          <feGaussianBlur stdDeviation="3" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="650" height="480" fill="url(#ncertBgGrad)" rx="16" />

      {/* Decorative patterns */}
      <g opacity="0.1">
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={50 + i * 80} cy="25" r="15" fill="#14B8A6" />
        ))}
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={90 + i * 80} cy="460" r="12" fill="#8B5CF6" />
        ))}
      </g>

      {/* Title Section */}
      <g
      >
        <rect x="175" y="15" width="300" height="50" rx="25" fill="#14B8A6" opacity="0.1" />
        <text x="325" y="45" fontSize="20" fill="#0D9488" textAnchor="middle" fontWeight="bold">
          NCERT READING STRATEGY
        </text>
        <text x="325" y="58" fontSize="10" fill="#5EEAD4" textAnchor="middle">
          The Foundation of NEET Biology
        </text>
      </g>

      {/* === LEFT SECTION: Class 11 Book Stack === */}
      <g
      >
        {/* Class 11 Book */}
        <g filter="url(#ncertBookShadow)">
          {/* Book spine */}
          <rect x="25" y="85" width="20" height="170" fill="#0D9488" rx="2" />
          {/* Book cover */}
          <rect x="45" y="80" width="130" height="180" fill="url(#class11BookGrad)" rx="4" />
          {/* Book pages edge */}
          <rect x="175" y="85" width="8" height="170" fill="#F5F5F5" />
          {/* Book page lines */}
          {[...Array(15)].map((_, i) => (
            <line
              key={i}
              x1="176"
              y1={90 + i * 11}
              x2="182"
              y2={90 + i * 11}
              stroke="#E5E5E5"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* NCERT Logo on book */}
        <circle cx="110" cy="130" r="25" fill="#FFFFFF" opacity="0.9" />
        <text x="110" y="127" fontSize="9" fill="#0D9488" textAnchor="middle" fontWeight="bold">
          NCERT
        </text>
        <text x="110" y="140" fontSize="7" fill="#14B8A6" textAnchor="middle">
          Biology
        </text>

        {/* Class label */}
        <rect x="60" y="160" width="90" height="28" rx="4" fill="#FFFFFF" opacity="0.95" />
        <text x="105" y="178" fontSize="14" fill="#0D9488" textAnchor="middle" fontWeight="bold">
          Class 11
        </text>

        {/* Book decoration */}
        <rect
          x="60"
          y="200"
          width="90"
          height="6"
          rx="3"
          fill="#FFFFFF"
          opacity="0.6"
        />

        {/* Chapter list for Class 11 */}
        <g transform="translate(20, 275)">
          <rect
            x="0"
            y="0"
            width="170"
            height="130"
            rx="8"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <text x="85" y="20" fontSize="10" fill="#0D9488" textAnchor="middle" fontWeight="bold">
            Important Chapters
          </text>
          {class11Chapters.map((ch, i) => (
            <g key={i} transform={`translate(10, ${32 + i * 19})`}>
              <rect
                x="0"
                y="0"
                width={Math.min(ch.questions * 12, 110)}
                height="14"
                rx="3"
                fill={ch.color}
                opacity="0.8"
                style={{ transformOrigin: 'left' }}
              />
              <text x="5" y="11" fontSize="7" fill="#FFFFFF" fontWeight="500">
                {ch.name}
              </text>
              <text x="145" y="11" fontSize="8" fill="#6B7280" textAnchor="end">
                {ch.questions}Q
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* === CENTER SECTION: Reading Strategy Flow === */}
      <g
      >
        {/* 3-Stage Reading Process */}
        <g transform="translate(210, 80)">
          <rect
            x="0"
            y="0"
            width="230"
            height="180"
            rx="12"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="2"
          />

          {/* Header */}
          <rect x="0" y="0" width="230" height="35" rx="12" fill="#F0FDF4" />
          <text x="115" y="23" fontSize="12" fill="#059669" textAnchor="middle" fontWeight="bold">
            📚 3-Reading Strategy
          </text>

          {/* Reading stages */}
          {readingStages.map((stage, i) => (
            <g
              key={i}
              transform={`translate(15, ${45 + i * 45})`}
            >
              {/* Stage circle */}
              <circle
                cx="20"
                cy="18"
                r="18"
                fill={stage.color}
              />
              <text x="20" y="14" fontSize="10" fill="#FFFFFF" textAnchor="middle">
                {stage.icon}
              </text>
              <text x="20" y="26" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
                {stage.stage}
              </text>

              {/* Stage details */}
              <text x="50" y="14" fontSize="11" fill="#1F2937" fontWeight="bold">
                {stage.title}
              </text>
              <text x="50" y="28" fontSize="9" fill="#6B7280">
                {stage.desc}
              </text>

              {/* Connector arrow */}
              {i < 2 && (
                <path
                  d="M20 38 L20 42"
                  stroke={stage.color}
                  strokeWidth="2"
                  strokeDasharray="3,2"
                />
              )}
            </g>
          ))}
        </g>

        {/* NEET Statistics Card */}
        <g transform="translate(210, 275)">
          <rect
            x="0"
            y="0"
            width="230"
            height="130"
            rx="12"
            fill="#FEF3C7"
            stroke="#FCD34D"
            strokeWidth="2"
          />

          {/* Header */}
          <rect x="0" y="0" width="230" height="32" rx="12" fill="#F59E0B" />
          <text x="115" y="21" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            🎯 NEET Questions from NCERT
          </text>

          {/* Stats */}
          <g transform="translate(15, 45)">
            <g
            >
              <circle cx="30" cy="25" r="28" fill="#10B981" />
              <text
                x="30"
                y="22"
                fontSize="16"
                fill="#FFFFFF"
                textAnchor="middle"
                fontWeight="bold"
              >
                95%
              </text>
              <text x="30" y="35" fontSize="7" fill="#D1FAE5" textAnchor="middle">
                Direct
              </text>
            </g>

            <g transform="translate(75, 0)">
              <text x="0" y="12" fontSize="9" fill="#92400E" fontWeight="bold">
                Direct from NCERT:
              </text>
              <text x="0" y="28" fontSize="8" fill="#78350F">
                • Diagrams & flowcharts
              </text>
              <text x="0" y="42" fontSize="8" fill="#78350F">
                • Line-by-line questions
              </text>
              <text x="0" y="56" fontSize="8" fill="#78350F">
                • NCERT examples in MCQs
              </text>
            </g>
          </g>

          {/* Tip badge */}
          <g
          >
            <rect x="60" y="105" width="110" height="20" rx="10" fill="#059669" />
            <text x="115" y="118" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
              Master NCERT First! 📖
            </text>
          </g>
        </g>
      </g>

      {/* === RIGHT SECTION: Class 12 Book Stack === */}
      <g
      >
        {/* Class 12 Book */}
        <g filter="url(#ncertBookShadow)" transform="translate(455, 0)">
          {/* Book spine */}
          <rect x="25" y="85" width="20" height="170" fill="#6D28D9" rx="2" />
          {/* Book cover */}
          <rect x="45" y="80" width="130" height="180" fill="url(#class12BookGrad)" rx="4" />
          {/* Book pages edge */}
          <rect x="175" y="85" width="8" height="170" fill="#F5F5F5" />
          {/* Book page lines */}
          {[...Array(15)].map((_, i) => (
            <line
              key={i}
              x1="176"
              y1={90 + i * 11}
              x2="182"
              y2={90 + i * 11}
              stroke="#E5E5E5"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* NCERT Logo on book */}
        <circle cx="565" cy="130" r="25" fill="#FFFFFF" opacity="0.9" />
        <text x="565" y="127" fontSize="9" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
          NCERT
        </text>
        <text x="565" y="140" fontSize="7" fill="#8B5CF6" textAnchor="middle">
          Biology
        </text>

        {/* Class label */}
        <rect x="515" y="160" width="90" height="28" rx="4" fill="#FFFFFF" opacity="0.95" />
        <text x="560" y="178" fontSize="14" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
          Class 12
        </text>

        {/* Book decoration */}
        <rect
          x="515"
          y="200"
          width="90"
          height="6"
          rx="3"
          fill="#FFFFFF"
          opacity="0.6"
        />

        {/* Chapter list for Class 12 */}
        <g transform="translate(455, 275)">
          <rect
            x="0"
            y="0"
            width="170"
            height="130"
            rx="8"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <text x="85" y="20" fontSize="10" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
            High Weightage Topics
          </text>
          {class12Chapters.map((ch, i) => (
            <g key={i} transform={`translate(10, ${32 + i * 19})`}>
              <rect
                x="0"
                y="0"
                width={Math.min(ch.questions * 10, 110)}
                height="14"
                rx="3"
                fill={ch.color}
                opacity="0.8"
                style={{ transformOrigin: 'left' }}
              />
              <text x="5" y="11" fontSize="7" fill="#FFFFFF" fontWeight="500">
                {ch.name}
              </text>
              <text x="145" y="11" fontSize="8" fill="#6B7280" textAnchor="end">
                {ch.questions}Q
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* === BOTTOM SECTION: Highlighting Tools === */}
      <g
        transform="translate(20, 420)"
      >
        {/* Highlighter pens */}
        <g>
          {/* Yellow highlighter */}
          <g
          >
            <rect x="0" y="10" width="80" height="18" rx="4" fill="url(#highlightGrad)" />
            <rect x="75" y="13" width="20" height="12" rx="2" fill="#F59E0B" />
            <rect x="0" y="13" width="12" height="12" fill="#EAB308" rx="2" />
          </g>

          {/* Pink highlighter */}
          <g
          >
            <rect x="110" y="10" width="80" height="18" rx="4" fill="#F9A8D4" />
            <rect x="185" y="13" width="20" height="12" rx="2" fill="#EC4899" />
            <rect x="110" y="13" width="12" height="12" fill="#DB2777" rx="2" />
          </g>

          {/* Green highlighter */}
          <g
          >
            <rect x="220" y="10" width="80" height="18" rx="4" fill="#86EFAC" />
            <rect x="295" y="13" width="20" height="12" rx="2" fill="#22C55E" />
            <rect x="220" y="13" width="12" height="12" fill="#16A34A" rx="2" />
          </g>
        </g>

        {/* Quick tips */}
        <g transform="translate(330, 0)">
          <rect x="0" y="5" width="290" height="35" rx="6" fill="#EDE9FE" />
          <text x="20" y="22" fontSize="9" fill="#7C3AED" fontWeight="bold">
            💡 Pro Tips:
          </text>
          <text x="85" y="22" fontSize="8" fill="#6D28D9">
            Mark definitions • Underline diagrams • Note NEET PYQs
          </text>
          <text x="145" y="34" fontSize="7" fill="#8B5CF6">
            Read every line - NEET tests exact NCERT wordings!
          </text>
        </g>
      </g>

      {/* Floating elements for visual interest */}
      {animate && (
        <>
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="#14B8A6"
            opacity="0.3"
          />
          <circle
            cx="600"
            cy="60"
            r="6"
            fill="#8B5CF6"
            opacity="0.3"
          />
          <rect
            x="320"
            y="440"
            width="10"
            height="10"
            rx="2"
            fill="#F59E0B"
            opacity="0.4"
          />
        </>
      )}
    </Wrapper>
  )
}
