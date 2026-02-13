'use client'

import type { IllustrationProps } from './shared'

export function MockTestIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  // Mock test strategy data
  const testSchedule = [
    { week: 'Week 1-4', type: 'Chapter Tests', count: 16, color: '#3B82F6' },
    { week: 'Week 5-8', type: 'Unit Tests', count: 8, color: '#8B5CF6' },
    { week: 'Week 9-12', type: 'Full Syllabus', count: 12, color: '#10B981' },
    { week: 'Last 4 Weeks', type: 'Final Mocks', count: 8, color: '#EF4444' },
  ]

  // Score progression data
  const scoreProgress = [
    { month: 'Jan', score: 420 },
    { month: 'Feb', score: 480 },
    { month: 'Mar', score: 520 },
    { month: 'Apr', score: 580 },
    { month: 'May', score: 640 },
  ]

  // Question analysis
  const questionBreakdown = [
    { status: 'Correct', count: 145, color: '#10B981' },
    { status: 'Wrong', count: 30, color: '#EF4444' },
    { status: 'Skipped', count: 5, color: '#F59E0B' },
  ]

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
        <linearGradient id="mockBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EDE9FE" />
          <stop offset="50%" stopColor="#F3E8FF" />
          <stop offset="100%" stopColor="#FCE7F3" />
        </linearGradient>
        {/* Timer gradient */}
        <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        {/* Score gradient */}
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        {/* Card shadow */}
        <filter id="mockCardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#mockBgGrad)" rx="16" />

      {/* Decorative elements */}
      <g opacity="0.1">
        {[...Array(10)].map((_, i) => (
          <circle key={i} cx={35 + i * 70} cy="15" r="15" fill="#6366F1" />
        ))}
      </g>

      {/* Title Section */}
      <motion.g
      >
        <rect x="175" y="15" width="350" height="55" rx="27" fill="#6366F1" opacity="0.15" />
        <text x="350" y="45" fontSize="24" fill="#4F46E5" textAnchor="middle" fontWeight="bold">
          📝 Mock Test Strategy
        </text>
        <text x="350" y="62" fontSize="11" fill="#7C3AED" textAnchor="middle">
          The Key to NEET Success - Practice Makes Perfect
        </text>
      </motion.g>

      {/* === LEFT SECTION: Test Paper & Timer === */}
      <motion.g
      >
        <g filter="url(#mockCardShadow)">
          <rect x="20" y="85" width="200" height="300" rx="16" fill="#FFFFFF" />
        </g>

        <text x="120" y="108" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          Live Test Mode
        </text>

        {/* Mock test paper */}
        <g transform="translate(35, 120)">
          <rect
            x="0"
            y="0"
            width="170"
            height="180"
            rx="8"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="2"
          />

          {/* Paper header */}
          <rect x="0" y="0" width="170" height="30" rx="8" fill="#6366F1" />
          <text x="85" y="20" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            NEET MOCK TEST - 01
          </text>

          {/* Question grid */}
          <g transform="translate(10, 40)">
            {[...Array(20)].map((_, i) => {
              const row = Math.floor(i / 5)
              const col = i % 5
              const status = i < 12 ? '#10B981' : i < 17 ? '#EF4444' : '#F59E0B'
              return (
                <motion.g key={i}>
                  <motion.rect
                    x={col * 30}
                    y={row * 32}
                    width="25"
                    height="25"
                    rx="4"
                    fill={status}
                    opacity="0.8"
                  />
                  <text
                    x={col * 30 + 12.5}
                    y={row * 32 + 17}
                    fontSize="9"
                    fill="#FFFFFF"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {i + 1}
                  </text>
                </motion.g>
              )
            })}
          </g>

          {/* Legend */}
          <g transform="translate(10, 175)">
            <circle cx="8" cy="-8" r="5" fill="#10B981" />
            <text x="18" y="-5" fontSize="7" fill="#374151">
              Correct
            </text>
            <circle cx="58" cy="-8" r="5" fill="#EF4444" />
            <text x="68" y="-5" fontSize="7" fill="#374151">
              Wrong
            </text>
            <circle cx="108" cy="-8" r="5" fill="#F59E0B" />
            <text x="118" y="-5" fontSize="7" fill="#374151">
              Skip
            </text>
          </g>
        </g>

        {/* Timer */}
        <g transform="translate(55, 315)">
          <motion.g
          >
            <rect x="0" y="0" width="130" height="55" rx="10" fill="url(#timerGrad)" />
            <text x="65" y="22" fontSize="10" fill="#FFFFFF" textAnchor="middle">
              Time Remaining
            </text>
            <motion.text
              x="65"
              y="45"
              fontSize="20"
              fill="#FFFFFF"
              textAnchor="middle"
              fontWeight="bold"
            >
              2:45:32
            </motion.text>
          </motion.g>
        </g>
      </motion.g>

      {/* === CENTER SECTION: Progress Graph & Schedule === */}
      <motion.g
      >
        {/* Score Progress Graph */}
        <g filter="url(#mockCardShadow)">
          <rect x="235" y="85" width="280" height="175" rx="16" fill="#FFFFFF" />
        </g>

        <text x="375" y="108" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          Score Progression (Jan - May)
        </text>

        {/* Graph */}
        <g transform="translate(260, 125)">
          {/* Y-axis */}
          <line x1="0" y1="0" x2="0" y2="110" stroke="#E5E7EB" strokeWidth="1" />
          {/* X-axis */}
          <line x1="0" y1="110" x2="230" y2="110" stroke="#E5E7EB" strokeWidth="1" />

          {/* Y-axis labels */}
          <text x="-10" y="5" fontSize="7" fill="#6B7280" textAnchor="end">
            700
          </text>
          <text x="-10" y="55" fontSize="7" fill="#6B7280" textAnchor="end">
            550
          </text>
          <text x="-10" y="105" fontSize="7" fill="#6B7280" textAnchor="end">
            400
          </text>

          {/* Score line */}
          <motion.path
            d="M 10 95 L 55 78 L 100 65 L 145 48 L 190 25"
            fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data points */}
          {scoreProgress.map((point, i) => (
            <motion.g key={i} transform={`translate(${10 + i * 45}, 0)`}>
              <motion.circle
                cy={110 - ((point.score - 400) / 300) * 110}
                cx="0"
                r="6"
                fill="#10B981"
              />
              <text y="125" x="0" fontSize="8" fill="#6B7280" textAnchor="middle">
                {point.month}
              </text>
              <text
                y={105 - ((point.score - 400) / 300) * 110}
                x="0"
                fontSize="8"
                fill="#10B981"
                textAnchor="middle"
                fontWeight="600"
              >
                {point.score}
              </text>
            </motion.g>
          ))}

          {/* Target line */}
          <line
            x1="0"
            y1="30"
            x2="230"
            y2="30"
            stroke="#EF4444"
            strokeWidth="1"
            strokeDasharray="5,3"
          />
          <text x="235" y="33" fontSize="7" fill="#EF4444">
            650 Target
          </text>
        </g>

        {/* Mock Test Schedule */}
        <g filter="url(#mockCardShadow)">
          <rect x="235" y="275" width="280" height="110" rx="16" fill="#FFFFFF" />
        </g>

        <text x="375" y="298" fontSize="12" fill="#374151" textAnchor="middle" fontWeight="bold">
          Recommended Mock Test Schedule
        </text>

        <g transform="translate(250, 310)">
          {testSchedule.map((item, i) => (
            <g key={i} transform={`translate(${i * 65}, 0)`}>
              <rect
                x="0"
                y="0"
                width="60"
                height="60"
                rx="8"
                fill={`${item.color}15`}
                stroke={item.color}
                strokeWidth="1"
              />
              <text
                x="30"
                y="15"
                fontSize="7"
                fill={item.color}
                textAnchor="middle"
                fontWeight="600"
              >
                {item.week}
              </text>
              <motion.text
                x="30"
                y="38"
                fontSize="18"
                fill={item.color}
                textAnchor="middle"
                fontWeight="bold"
              >
                {item.count}
              </motion.text>
              <text x="30" y="52" fontSize="6" fill="#6B7280" textAnchor="middle">
                {item.type}
              </text>
            </g>
          ))}
        </g>
      </motion.g>

      {/* === RIGHT SECTION: Analysis & Tips === */}
      <motion.g
      >
        <g filter="url(#mockCardShadow)">
          <rect x="530" y="85" width="150" height="300" rx="16" fill="#FFFFFF" />
        </g>

        <text x="605" y="108" fontSize="12" fill="#374151" textAnchor="middle" fontWeight="bold">
          Test Analysis
        </text>

        {/* Question breakdown */}
        <g transform="translate(545, 125)">
          {questionBreakdown.map((item, i) => (
            <motion.g
              key={i}
              transform={`translate(0, ${i * 55})`}
            >
              <rect x="0" y="0" width="120" height="45" rx="8" fill={`${item.color}15`} />
              <circle cx="25" cy="22" r="15" fill={item.color} />
              <text
                x="25"
                y="27"
                fontSize="12"
                fill="#FFFFFF"
                textAnchor="middle"
                fontWeight="bold"
              >
                {item.count}
              </text>
              <text x="70" y="18" fontSize="10" fill={item.color} fontWeight="600">
                {item.status}
              </text>
              <text x="70" y="32" fontSize="8" fill="#6B7280">
                Questions
              </text>
            </motion.g>
          ))}
        </g>

        {/* Accuracy meter */}
        <g transform="translate(545, 300)">
          <rect x="0" y="0" width="120" height="70" rx="10" fill="#EDE9FE" />
          <text x="60" y="20" fontSize="9" fill="#6366F1" textAnchor="middle" fontWeight="600">
            Accuracy Rate
          </text>
          <motion.text
            x="60"
            y="50"
            fontSize="28"
            fill="#4F46E5"
            textAnchor="middle"
            fontWeight="bold"
          >
            80.5%
          </motion.text>
        </g>
      </motion.g>

      {/* === BOTTOM SECTION: Strategy Tips === */}
      <motion.g
      >
        <g filter="url(#mockCardShadow)">
          <rect x="20" y="400" width="665" height="105" rx="16" fill="#FFFFFF" />
        </g>

        <text x="350" y="422" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          🎯 Mock Test Success Formula
        </text>

        {/* Tips */}
        <g transform="translate(40, 440)">
          {[
            { icon: '📅', tip: 'Weekly full mocks', desc: 'Every Sunday', color: '#3B82F6' },
            { icon: '⏱️', tip: 'Strict timing', desc: '3 hrs 20 min', color: '#F59E0B' },
            { icon: '🔍', tip: 'Error analysis', desc: 'Same day review', color: '#EF4444' },
            { icon: '📊', tip: 'Track progress', desc: 'Score trends', color: '#10B981' },
            { icon: '🎯', tip: 'Target 650+', desc: 'Consistent practice', color: '#8B5CF6' },
          ].map((item, i) => (
            <motion.g
              key={i}
              transform={`translate(${i * 125}, 0)`}
            >
              <rect
                x="0"
                y="0"
                width="115"
                height="50"
                rx="8"
                fill={`${item.color}10`}
                stroke={item.color}
                strokeWidth="1"
              />
              <text x="18" y="22" fontSize="18">
                {item.icon}
              </text>
              <text x="40" y="18" fontSize="9" fill={item.color} fontWeight="600">
                {item.tip}
              </text>
              <text x="40" y="32" fontSize="8" fill="#6B7280">
                {item.desc}
              </text>
            </motion.g>
          ))}
        </g>
      </motion.g>

      {/* Floating decorations */}
      {animate && (
        <>
          <motion.circle
            cx="50"
            cy="50"
            r="6"
            fill="#6366F1"
            opacity="0.3"
          />
          <motion.text
            x="650"
            y="60"
            fontSize="16"
            opacity="0.5"
          >
            📝
          </motion.text>
        </>
      )}
    </Wrapper>
  )
}
