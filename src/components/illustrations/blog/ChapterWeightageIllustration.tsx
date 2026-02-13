'use client'

import type { IllustrationProps } from './shared'

export function ChapterWeightageIllustration({
  className = '',
  animate = true,
}: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  // Chapter weightage data with NEET-specific information
  const chapterData = [
    { name: 'Human Physiology', questions: 18, percentage: 20, color: '#EF4444', priority: 'HIGH' },
    {
      name: 'Genetics & Evolution',
      questions: 16,
      percentage: 18,
      color: '#F97316',
      priority: 'HIGH',
    },
    {
      name: 'Ecology & Environment',
      questions: 12,
      percentage: 13,
      color: '#10B981',
      priority: 'HIGH',
    },
    { name: 'Reproduction', questions: 11, percentage: 12, color: '#3B82F6', priority: 'MED' },
    { name: 'Cell Biology', questions: 9, percentage: 10, color: '#8B5CF6', priority: 'MED' },
    { name: 'Plant Physiology', questions: 8, percentage: 9, color: '#EC4899', priority: 'MED' },
    { name: 'Diversity', questions: 7, percentage: 8, color: '#06B6D4', priority: 'LOW' },
    { name: 'Biotechnology', questions: 5, percentage: 6, color: '#84CC16', priority: 'MED' },
    { name: 'Others', questions: 4, percentage: 4, color: '#6366F1', priority: 'LOW' },
  ]

  // Year-wise trend data
  const yearData = [
    { year: '2022', botany: 42, zoology: 48 },
    { year: '2023', botany: 45, zoology: 45 },
    { year: '2024', botany: 43, zoology: 47 },
  ]

  // Pie chart segments (calculated angles)
  const pieSegments = [
    { start: 0, end: 72, color: '#EF4444' }, // Human Physiology 20%
    { start: 72, end: 137, color: '#F97316' }, // Genetics 18%
    { start: 137, end: 184, color: '#10B981' }, // Ecology 13%
    { start: 184, end: 227, color: '#3B82F6' }, // Reproduction 12%
    { start: 227, end: 263, color: '#8B5CF6' }, // Cell Biology 10%
    { start: 263, end: 295, color: '#EC4899' }, // Plant Physiology 9%
    { start: 295, end: 324, color: '#06B6D4' }, // Diversity 8%
    { start: 324, end: 346, color: '#84CC16' }, // Biotechnology 6%
    { start: 346, end: 360, color: '#6366F1' }, // Others 4%
  ]

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
    return `M ${x} ${y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`
  }

  return (
    <Wrapper
      viewBox="0 0 700 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="weightBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        {/* Card shadow */}
        <filter id="weightCardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
        </filter>
        {/* Glow effect */}
        <filter id="weightGlow">
          <feGaussianBlur stdDeviation="4" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Priority badge gradients */}
        <linearGradient id="highPriorityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="medPriorityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="lowPriorityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#weightBgGrad)" rx="16" />

      {/* Decorative patterns */}
      <g opacity="0.05">
        {[...Array(10)].map((_, i) => (
          <circle key={i} cx={35 + i * 70} cy="15" r="20" fill="#F59E0B" />
        ))}
      </g>

      {/* Title Section */}
      <g
      >
        <rect x="175" y="15" width="350" height="55" rx="27" fill="#F59E0B" opacity="0.15" />
        <text x="350" y="42" fontSize="22" fill="#B45309" textAnchor="middle" fontWeight="bold">
          NEET Biology Chapter Weightage
        </text>
        <text x="350" y="60" fontSize="11" fill="#D97706" textAnchor="middle">
          Based on Last 5 Years Analysis (2020-2024)
        </text>
      </g>

      {/* === LEFT SECTION: Pie Chart === */}
      <g
      >
        <g filter="url(#weightCardShadow)">
          <rect x="20" y="85" width="250" height="250" rx="16" fill="#FFFFFF" />
        </g>

        {/* Pie Chart */}
        <g
          style={{ transformOrigin: '145px 210px' }}
        >
          {pieSegments.map((segment, i) => (
            <path
              key={i}
              d={describeArc(145, 210, 85, segment.start, segment.end)}
              fill={segment.color}
              style={{ transformOrigin: '145px 210px' }}
            />
          ))}
        </g>

        {/* Center circle */}
        <g
        >
          <circle cx="145" cy="210" r="45" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
          <text x="145" y="200" fontSize="12" fill="#6B7280" textAnchor="middle">
            Total
          </text>
          <text x="145" y="218" fontSize="22" fill="#1F2937" textAnchor="middle" fontWeight="bold">
            90
          </text>
          <text x="145" y="232" fontSize="10" fill="#F59E0B" textAnchor="middle" fontWeight="600">
            Questions
          </text>
        </g>

        {/* Card title */}
        <text x="145" y="108" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          Topic-wise Distribution
        </text>
      </g>

      {/* === CENTER SECTION: Bar Chart === */}
      <g
      >
        <g filter="url(#weightCardShadow)">
          <rect x="285" y="85" width="260" height="250" rx="16" fill="#FFFFFF" />
        </g>

        <text x="415" y="108" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          Questions per Chapter
        </text>

        {/* Bar chart */}
        <g transform="translate(300, 125)">
          {chapterData.slice(0, 7).map((chapter, i) => (
            <g key={i} transform={`translate(0, ${i * 28})`}>
              {/* Chapter name */}
              <text x="0" y="12" fontSize="8" fill="#6B7280">
                {chapter.name.length > 14 ? chapter.name.slice(0, 14) + '...' : chapter.name}
              </text>

              {/* Bar background */}
              <rect x="90" y="2" width="130" height="16" rx="4" fill="#F3F4F6" />

              {/* Animated bar */}
              <rect
                x="90"
                y="2"
                width={0}
                height="16"
                rx="4"
                fill={chapter.color}
              />

              {/* Question count */}
              <text
                x={95 + (chapter.questions / 18) * 130}
                y="14"
                fontSize="9"
                fill="#374151"
                fontWeight="600"
              >
                {chapter.questions}Q
              </text>

              {/* Priority badge */}
              <rect
                x="225"
                y="3"
                width="28"
                height="14"
                rx="7"
                fill={
                  chapter.priority === 'HIGH'
                    ? 'url(#highPriorityGrad)'
                    : chapter.priority === 'MED'
                      ? 'url(#medPriorityGrad)'
                      : 'url(#lowPriorityGrad)'
                }
              />
              <text
                x="239"
                y="13"
                fontSize="6"
                fill="#FFFFFF"
                textAnchor="middle"
                fontWeight="bold"
              >
                {chapter.priority}
              </text>
            </g>
          ))}
        </g>

        {/* Priority legend */}
        <g transform="translate(300, 315)">
          <text x="0" y="0" fontSize="8" fill="#6B7280">
            Priority:
          </text>
          <rect x="40" y="-8" width="30" height="12" rx="6" fill="url(#highPriorityGrad)" />
          <text x="55" y="0" fontSize="7" fill="#FFFFFF" textAnchor="middle">
            HIGH
          </text>
          <rect x="80" y="-8" width="30" height="12" rx="6" fill="url(#medPriorityGrad)" />
          <text x="95" y="0" fontSize="7" fill="#FFFFFF" textAnchor="middle">
            MED
          </text>
          <rect x="120" y="-8" width="30" height="12" rx="6" fill="url(#lowPriorityGrad)" />
          <text x="135" y="0" fontSize="7" fill="#FFFFFF" textAnchor="middle">
            LOW
          </text>
        </g>
      </g>

      {/* === RIGHT SECTION: Key Stats === */}
      <g
      >
        <g filter="url(#weightCardShadow)">
          <rect x="560" y="85" width="125" height="250" rx="16" fill="#FFFFFF" />
        </g>

        <text x="622" y="108" fontSize="12" fill="#374151" textAnchor="middle" fontWeight="bold">
          Key Stats
        </text>

        {/* Total marks */}
        <g transform="translate(575, 125)">
          <rect x="0" y="0" width="95" height="55" rx="10" fill="#FEF3C7" />
          <text x="47" y="22" fontSize="9" fill="#92400E" textAnchor="middle">
            Total Marks
          </text>
          <text
            x="47"
            y="44"
            fontSize="22"
            fill="#B45309"
            textAnchor="middle"
            fontWeight="bold"
          >
            360
          </text>
        </g>

        {/* Class distribution */}
        <g transform="translate(575, 190)">
          <rect x="0" y="0" width="95" height="65" rx="10" fill="#ECFDF5" />
          <text x="47" y="18" fontSize="9" fill="#065F46" textAnchor="middle" fontWeight="600">
            Class Split
          </text>
          <g transform="translate(10, 28)">
            <rect x="0" y="0" width="35" height="28" rx="6" fill="#10B981" />
            <text x="17" y="12" fontSize="8" fill="#FFFFFF" textAnchor="middle">
              11th
            </text>
            <text x="17" y="23" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
              42
            </text>
          </g>
          <g transform="translate(50, 28)">
            <rect x="0" y="0" width="35" height="28" rx="6" fill="#8B5CF6" />
            <text x="17" y="12" fontSize="8" fill="#FFFFFF" textAnchor="middle">
              12th
            </text>
            <text x="17" y="23" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
              48
            </text>
          </g>
        </g>

        {/* Top scoring chapter */}
        <g transform="translate(575, 265)">
          <rect x="0" y="0" width="95" height="55" rx="10" fill="#FEE2E2" />
          <text x="47" y="18" fontSize="8" fill="#991B1B" textAnchor="middle" fontWeight="600">
            Top Scoring
          </text>
          <text x="47" y="34" fontSize="9" fill="#B91C1C" textAnchor="middle">
            Human
          </text>
          <text x="47" y="46" fontSize="9" fill="#B91C1C" textAnchor="middle">
            Physiology
          </text>
        </g>
      </g>

      {/* === BOTTOM SECTION: Year-wise Comparison === */}
      <g
      >
        <g filter="url(#weightCardShadow)">
          <rect x="20" y="350" width="665" height="155" rx="16" fill="#FFFFFF" />
        </g>

        <text x="350" y="375" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          Year-wise Distribution (Botany vs Zoology)
        </text>

        {/* Year comparison bars */}
        <g transform="translate(60, 400)">
          {yearData.map((year, i) => (
            <g key={i} transform={`translate(${i * 200}, 0)`}>
              {/* Year label */}
              <text x="75" y="0" fontSize="12" fill="#1F2937" textAnchor="middle" fontWeight="bold">
                NEET {year.year}
              </text>

              {/* Botany bar */}
              <g transform="translate(0, 15)">
                <text x="0" y="15" fontSize="9" fill="#22C55E">
                  Botany
                </text>
                <rect x="45" y="5" width="100" height="18" rx="4" fill="#DCFCE7" />
                <rect
                  x="45"
                  y="5"
                  width={0}
                  height="18"
                  rx="4"
                  fill="#22C55E"
                />
                <text x={50 + year.botany * 2} y="18" fontSize="9" fill="#166534" fontWeight="600">
                  {year.botany}
                </text>
              </g>

              {/* Zoology bar */}
              <g transform="translate(0, 40)">
                <text x="0" y="15" fontSize="9" fill="#EF4444">
                  Zoology
                </text>
                <rect x="45" y="5" width="100" height="18" rx="4" fill="#FEE2E2" />
                <rect
                  x="45"
                  y="5"
                  width={0}
                  height="18"
                  rx="4"
                  fill="#EF4444"
                />
                <text x={50 + year.zoology * 2} y="18" fontSize="9" fill="#991B1B" fontWeight="600">
                  {year.zoology}
                </text>
              </g>
            </g>
          ))}
        </g>

        {/* Insight badge */}
        <g
        >
          <rect x="250" y="480" width="200" height="22" rx="11" fill="#F59E0B" />
          <text x="350" y="494" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            💡 Zoology slightly dominates in NEET
          </text>
        </g>
      </g>

      {/* Floating decorations */}
      {animate && (
        <>
          <circle
            cx="30"
            cy="50"
            r="6"
            fill="#F59E0B"
            opacity="0.4"
          />
          <circle
            cx="670"
            cy="40"
            r="5"
            fill="#10B981"
            opacity="0.3"
          />
        </>
      )}
    </Wrapper>
  )
}
