'use client'

import type { IllustrationProps } from './shared'

export function Last6MonthsStrategyIllustration({
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

  // 6-month strategy phases
  const phases = [
    {
      months: '1-2',
      title: 'Foundation',
      focus: 'Complete Syllabus',
      tasks: ['Finish NCERT', 'Notes preparation', 'Basic MCQs'],
      color: '#10B981',
      progress: 100,
    },
    {
      months: '3-4',
      title: 'Practice',
      focus: 'Problem Solving',
      tasks: ['5000+ MCQs', 'Topic-wise tests', 'PYQ practice'],
      color: '#3B82F6',
      progress: 75,
    },
    {
      months: '5-6',
      title: 'Revision',
      focus: 'Final Polish',
      tasks: ['Full mocks', 'Weak areas', 'Quick recalls'],
      color: '#8B5CF6',
      progress: 50,
    },
  ]

  // Weekly schedule
  const weeklySchedule = [
    { day: 'Mon', hours: 8, focus: 'Botany' },
    { day: 'Tue', hours: 8, focus: 'Zoology' },
    { day: 'Wed', hours: 7, focus: 'Physics' },
    { day: 'Thu', hours: 7, focus: 'Chemistry' },
    { day: 'Fri', hours: 8, focus: 'Biology' },
    { day: 'Sat', hours: 6, focus: 'Mock Test' },
    { day: 'Sun', hours: 4, focus: 'Analysis' },
  ]

  // Key milestones
  const milestones = [
    { week: 4, task: 'Class 11 Done', icon: '📚' },
    { week: 8, task: 'Class 12 Done', icon: '✅' },
    { week: 12, task: '50 Mocks', icon: '📝' },
    { week: 16, task: '100 Mocks', icon: '🎯' },
    { week: 20, task: 'Full Revision', icon: '🔄' },
    { week: 24, task: 'NEET Ready!', icon: '🏆' },
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
        <linearGradient id="last6BgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEE2E2" />
          <stop offset="50%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#ECFDF5" />
        </linearGradient>
        {/* Urgency gradient */}
        <linearGradient id="urgencyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        {/* Card shadow */}
        <filter id="last6CardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#last6BgGrad)" rx="16" />

      {/* Decorative urgency pattern */}
      <g opacity="0.1">
        {[...Array(10)].map((_, i) => (
          <circle key={i} cx={35 + i * 70} cy="15" r="15" fill="#EF4444" />
        ))}
      </g>

      {/* Title Section with Countdown */}
      <g
      >
        <rect x="150" y="15" width="400" height="55" rx="27" fill="url(#urgencyGrad)" />
        <text x="350" y="40" fontSize="22" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ⏰ LAST 6 MONTHS STRATEGY
        </text>
        <text
          x="350"
          y="58"
          fontSize="12"
          fill="#FEE2E2"
          textAnchor="middle"
        >
          180 Days to Transform Your NEET Score
        </text>
      </g>

      {/* === LEFT SECTION: Phase Breakdown === */}
      <g
      >
        <g filter="url(#last6CardShadow)">
          <rect x="20" y="85" width="220" height="320" rx="16" fill="#FFFFFF" />
        </g>

        <text x="130" y="108" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          3-Phase Strategy
        </text>

        {/* Phase cards */}
        <g transform="translate(30, 120)">
          {phases.map((phase, i) => (
            <g
              key={i}
              transform={`translate(0, ${i * 100})`}
            >
              {/* Phase card */}
              <rect
                x="0"
                y="0"
                width="200"
                height="90"
                rx="12"
                fill={`${phase.color}10`}
                stroke={phase.color}
                strokeWidth="2"
              />

              {/* Month badge */}
              <circle cx="30" cy="25" r="20" fill={phase.color} />
              <text x="30" y="22" fontSize="10" fill="#FFFFFF" textAnchor="middle">
                Month
              </text>
              <text
                x="30"
                y="34"
                fontSize="12"
                fill="#FFFFFF"
                textAnchor="middle"
                fontWeight="bold"
              >
                {phase.months}
              </text>

              {/* Phase info */}
              <text x="60" y="22" fontSize="12" fill={phase.color} fontWeight="bold">
                {phase.title}
              </text>
              <text x="60" y="38" fontSize="9" fill="#6B7280">
                {phase.focus}
              </text>

              {/* Tasks */}
              <g transform="translate(60, 48)">
                {phase.tasks.map((task, j) => (
                  <g key={j} transform={`translate(0, ${j * 12})`}>
                    <circle cx="5" cy="5" r="3" fill={phase.color} />
                    <text x="12" y="8" fontSize="8" fill="#374151">
                      {task}
                    </text>
                  </g>
                ))}
              </g>

              {/* Progress bar */}
              <rect x="60" y="82" width="130" height="4" rx="2" fill="#E5E7EB" />
              <rect
                x="60"
                y="82"
                width={0}
                height="4"
                rx="2"
                fill={phase.color}
              />
            </g>
          ))}
        </g>
      </g>

      {/* === CENTER SECTION: Weekly Schedule & Milestones === */}
      <g
      >
        {/* Weekly Schedule */}
        <g filter="url(#last6CardShadow)">
          <rect x="255" y="85" width="280" height="150" rx="16" fill="#FFFFFF" />
        </g>

        <text x="395" y="108" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          Ideal Weekly Schedule
        </text>

        {/* Schedule bars */}
        <g transform="translate(270, 125)">
          {weeklySchedule.map((day, i) => (
            <g key={i} transform={`translate(${i * 36}, 0)`}>
              <rect
                x="0"
                y={90 - day.hours * 10}
                width="28"
                height={day.hours * 10}
                rx="4"
                fill={day.day === 'Sat' ? '#8B5CF6' : day.day === 'Sun' ? '#F59E0B' : '#3B82F6'}
              />
              <text x="14" y="100" fontSize="8" fill="#6B7280" textAnchor="middle">
                {day.day}
              </text>
              <text
                x="14"
                y={85 - day.hours * 10}
                fontSize="7"
                fill="#374151"
                textAnchor="middle"
                fontWeight="600"
              >
                {day.hours}h
              </text>
            </g>
          ))}
        </g>

        {/* Milestones Timeline */}
        <g filter="url(#last6CardShadow)">
          <rect x="255" y="250" width="280" height="155" rx="16" fill="#FFFFFF" />
        </g>

        <text x="395" y="273" fontSize="12" fill="#374151" textAnchor="middle" fontWeight="bold">
          Key Milestones (24 Weeks)
        </text>

        {/* Timeline */}
        <g transform="translate(275, 295)">
          {/* Timeline line */}
          <line
            x1="0"
            y1="25"
            x2="240"
            y2="25"
            stroke="#E5E7EB"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Milestone points */}
          {milestones.map((milestone, i) => (
            <g
              key={i}
              transform={`translate(${i * 40}, 0)`}
            >
              <circle
                cx="20"
                cy="25"
                r="12"
                fill={i < 2 ? '#10B981' : i < 4 ? '#3B82F6' : '#8B5CF6'}
              />
              <text x="20" y="29" fontSize="12" textAnchor="middle">
                {milestone.icon}
              </text>
              <text x="20" y="50" fontSize="7" fill="#6B7280" textAnchor="middle">
                W{milestone.week}
              </text>
              <text x="20" y="62" fontSize="6" fill="#374151" textAnchor="middle">
                {milestone.task.split(' ')[0]}
              </text>
              <text x="20" y="72" fontSize="6" fill="#374151" textAnchor="middle">
                {milestone.task.split(' ').slice(1).join(' ')}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* === RIGHT SECTION: Daily Hours & Focus === */}
      <g
      >
        <g filter="url(#last6CardShadow)">
          <rect x="550" y="85" width="130" height="320" rx="16" fill="#FFFFFF" />
        </g>

        <text x="615" y="108" fontSize="12" fill="#374151" textAnchor="middle" fontWeight="bold">
          Daily Targets
        </text>

        {/* Study hours target */}
        <g transform="translate(560, 125)">
          <rect x="0" y="0" width="110" height="70" rx="10" fill="#FEE2E2" />
          <text x="55" y="22" fontSize="9" fill="#B91C1C" textAnchor="middle" fontWeight="600">
            Study Hours
          </text>
          <text
            x="55"
            y="50"
            fontSize="28"
            fill="#DC2626"
            textAnchor="middle"
            fontWeight="bold"
          >
            8-10
          </text>
          <text x="55" y="65" fontSize="8" fill="#EF4444" textAnchor="middle">
            hrs/day
          </text>
        </g>

        {/* MCQs target */}
        <g transform="translate(560, 205)">
          <rect x="0" y="0" width="110" height="70" rx="10" fill="#DBEAFE" />
          <text x="55" y="22" fontSize="9" fill="#1D4ED8" textAnchor="middle" fontWeight="600">
            Daily MCQs
          </text>
          <text
            x="55"
            y="50"
            fontSize="28"
            fill="#2563EB"
            textAnchor="middle"
            fontWeight="bold"
          >
            200+
          </text>
          <text x="55" y="65" fontSize="8" fill="#3B82F6" textAnchor="middle">
            questions
          </text>
        </g>

        {/* Revision cycles */}
        <g transform="translate(560, 285)">
          <rect x="0" y="0" width="110" height="70" rx="10" fill="#EDE9FE" />
          <text x="55" y="22" fontSize="9" fill="#6D28D9" textAnchor="middle" fontWeight="600">
            Revision Cycles
          </text>
          <text
            x="55"
            y="50"
            fontSize="28"
            fill="#7C3AED"
            textAnchor="middle"
            fontWeight="bold"
          >
            3x
          </text>
          <text x="55" y="65" fontSize="8" fill="#8B5CF6" textAnchor="middle">
            minimum
          </text>
        </g>

        {/* Mock tests */}
        <g transform="translate(560, 365)">
          <rect x="0" y="0" width="110" height="35" rx="8" fill="#D1FAE5" />
          <text x="55" y="15" fontSize="9" fill="#065F46" textAnchor="middle" fontWeight="600">
            Weekly Mocks
          </text>
          <text x="55" y="28" fontSize="11" fill="#059669" textAnchor="middle" fontWeight="bold">
            2 Full Tests
          </text>
        </g>
      </g>

      {/* === BOTTOM SECTION: Action Items === */}
      <g
      >
        <g filter="url(#last6CardShadow)">
          <rect x="20" y="420" width="665" height="85" rx="16" fill="#FFFFFF" />
        </g>

        <text x="350" y="442" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          🔥 Critical Success Actions
        </text>

        {/* Action items */}
        <g transform="translate(35, 455)">
          {[
            { icon: '📚', text: 'NCERT 3x', color: '#10B981' },
            { icon: '📝', text: '100 Mocks', color: '#3B82F6' },
            { icon: '🔄', text: 'Daily Revision', color: '#8B5CF6' },
            { icon: '⚡', text: 'Weak Areas First', color: '#F59E0B' },
            { icon: '🎯', text: 'PYQ Focus', color: '#EF4444' },
            { icon: '😴', text: '7hr Sleep', color: '#06B6D4' },
          ].map((item, i) => (
            <g
              key={i}
              transform={`translate(${i * 105}, 0)`}
            >
              <rect
                x="0"
                y="0"
                width="98"
                height="38"
                rx="8"
                fill={`${item.color}15`}
                stroke={item.color}
                strokeWidth="1"
              />
              <text x="20" y="24" fontSize="16">
                {item.icon}
              </text>
              <text x="42" y="24" fontSize="10" fill={item.color} fontWeight="600">
                {item.text}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* Floating urgency indicators */}
      {animate && (
        <>
          <text
            x="30"
            y="50"
            fontSize="18"
            opacity="0.4"
          >
            ⏰
          </text>
          <text
            x="670"
            y="55"
            fontSize="16"
            opacity="0.4"
          >
            🔥
          </text>
        </>
      )}
    </Wrapper>
  )
}
