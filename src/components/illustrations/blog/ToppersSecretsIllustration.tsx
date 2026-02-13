'use client'

import type { IllustrationProps } from './shared'

export function ToppersSecretsIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  // Topper secrets data
  const secrets = [
    { num: '01', title: 'NCERT Mastery', desc: 'Read 3x minimum', icon: '📚', color: '#10B981' },
    {
      num: '02',
      title: 'Consistent Schedule',
      desc: '6-8 hrs daily',
      icon: '⏰',
      color: '#3B82F6',
    },
    {
      num: '03',
      title: 'Mock Test Practice',
      desc: '100+ full tests',
      icon: '📝',
      color: '#8B5CF6',
    },
    { num: '04', title: 'Error Analysis', desc: 'Track mistakes', icon: '🔍', color: '#EF4444' },
    { num: '05', title: 'Revision Cycles', desc: 'Every 15 days', icon: '🔄', color: '#F59E0B' },
    { num: '06', title: 'Healthy Lifestyle', desc: 'Sleep 7-8 hrs', icon: '💪', color: '#EC4899' },
  ]

  // Success metrics
  const metrics = [
    { label: 'Study Hours', value: '2000+', sub: 'Total hours', color: '#3B82F6' },
    { label: 'PYQs Solved', value: '5000+', sub: 'Questions', color: '#10B981' },
    { label: 'Mock Tests', value: '100+', sub: 'Full-length', color: '#8B5CF6' },
  ]

  // Top rank achievements
  const achievements = [
    { rank: 'AIR 1', name: 'Soyeb Aftab', score: '720/720', year: '2020' },
    { rank: 'AIR 1', name: 'Mrinal Kutteri', score: '720/720', year: '2021' },
    { rank: 'AIR 1', name: 'Tanishka', score: '715/720', year: '2022' },
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
        <linearGradient id="toppersBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#FDF4FF" />
        </linearGradient>
        {/* Trophy gradient */}
        <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        {/* Gold shine */}
        <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
        {/* Card shadow */}
        <filter id="toppersCardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
        </filter>
        {/* Glow effect */}
        <filter id="toppersGlow">
          <feGaussianBlur stdDeviation="6" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Star sparkle */}
        <filter id="starSparkle">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#toppersBgGrad)" rx="16" />

      {/* Decorative sparkles */}
      <g opacity="0.15">
        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            cx={40 + i * 55}
            cy={20 + (i % 3) * 10}
            r={4 + (i % 2) * 2}
            fill="#F59E0B"
          />
        ))}
      </g>

      {/* Title Section */}
      <g
      >
        <rect x="175" y="15" width="350" height="55" rx="27" fill="#F59E0B" opacity="0.15" />
        <text x="350" y="45" fontSize="24" fill="#92400E" textAnchor="middle" fontWeight="bold">
          🏆 NEET Toppers Secrets
        </text>
        <text x="350" y="62" fontSize="11" fill="#B45309" textAnchor="middle">
          Proven Strategies from AIR 1-100 Rankers
        </text>
      </g>

      {/* === LEFT SECTION: Trophy & Achievements === */}
      <g
      >
        <g filter="url(#toppersCardShadow)">
          <rect x="20" y="85" width="200" height="280" rx="16" fill="#FFFFFF" />
        </g>

        <text x="120" y="108" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          Hall of Fame
        </text>

        {/* Trophy illustration */}
        <g
        >
          {/* Trophy cup */}
          <path d="M90 130 L100 185 L140 185 L150 130 Z" fill="url(#trophyGrad)" />
          <ellipse cx="120" cy="130" r="30" ry="10" fill="#FDE047" />
          {/* Trophy handles */}
          <path d="M90 145 C65 145 65 175 90 175" stroke="#F59E0B" strokeWidth="6" fill="none" />
          <path
            d="M150 145 C175 145 175 175 150 175"
            stroke="#F59E0B"
            strokeWidth="6"
            fill="none"
          />
          {/* Trophy base */}
          <rect x="105" y="185" width="30" height="10" fill="#D97706" />
          <rect x="95" y="195" width="50" height="8" rx="2" fill="#B45309" />
          <rect x="85" y="203" width="70" height="12" rx="3" fill="#92400E" />

          {/* Number 1 on trophy */}
          <text
            x="120"
            y="168"
            fontSize="28"
            fill="#FFFFFF"
            textAnchor="middle"
            fontWeight="bold"
          >
            1
          </text>
        </g>

        {/* Recent AIR 1 holders */}
        <g transform="translate(25, 225)">
          <text x="95" y="0" fontSize="10" fill="#6B7280" textAnchor="middle" fontWeight="600">
            Recent AIR 1 Holders
          </text>
          {achievements.map((ach, i) => (
            <g
              key={i}
              transform={`translate(0, ${18 + i * 35})`}
            >
              <rect x="0" y="0" width="170" height="30" rx="8" fill="#FEF3C7" />
              <text x="10" y="13" fontSize="8" fill="#92400E" fontWeight="bold">
                {ach.rank}
              </text>
              <text x="45" y="13" fontSize="8" fill="#374151">
                {ach.name}
              </text>
              <text x="10" y="24" fontSize="7" fill="#059669" fontWeight="600">
                {ach.score}
              </text>
              <text x="60" y="24" fontSize="7" fill="#6B7280">
                NEET {ach.year}
              </text>
              <circle
                cx="155"
                cy="15"
                r="8"
                fill="#FCD34D"
              />
              <text x="155" y="18" fontSize="10" textAnchor="middle">
                🥇
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* === CENTER SECTION: 6 Secrets Grid === */}
      <g
      >
        <g filter="url(#toppersCardShadow)">
          <rect x="235" y="85" width="310" height="280" rx="16" fill="#FFFFFF" />
        </g>

        <text x="390" y="108" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          6 Success Secrets
        </text>

        {/* Secrets grid - 2 columns, 3 rows */}
        <g transform="translate(250, 120)">
          {secrets.map((secret, i) => (
            <g
              key={i}
              transform={`translate(${(i % 2) * 145}, ${Math.floor(i / 2) * 80})`}
            >
              {/* Secret card */}
              <rect
                x="0"
                y="0"
                width="135"
                height="70"
                rx="10"
                fill={`${secret.color}15`}
                stroke={secret.color}
                strokeWidth="1.5"
              />

              {/* Number badge */}
              <circle cx="20" cy="20" r="14" fill={secret.color} />
              <text
                x="20"
                y="24"
                fontSize="10"
                fill="#FFFFFF"
                textAnchor="middle"
                fontWeight="bold"
              >
                {secret.num}
              </text>

              {/* Icon */}
              <text x="110" y="25" fontSize="20" textAnchor="middle">
                {secret.icon}
              </text>

              {/* Title & description */}
              <text x="42" y="22" fontSize="10" fill="#1F2937" fontWeight="bold">
                {secret.title}
              </text>
              <text x="10" y="50" fontSize="9" fill="#6B7280">
                {secret.desc}
              </text>

              {/* Animated glow on hover effect */}
              <rect
                x="0"
                y="0"
                width="135"
                height="70"
                rx="10"
                fill={secret.color}
                opacity="0"
              />
            </g>
          ))}
        </g>
      </g>

      {/* === RIGHT SECTION: Success Metrics === */}
      <g
      >
        <g filter="url(#toppersCardShadow)">
          <rect x="560" y="85" width="125" height="280" rx="16" fill="#FFFFFF" />
        </g>

        <text x="622" y="108" fontSize="12" fill="#374151" textAnchor="middle" fontWeight="bold">
          Success Metrics
        </text>

        {/* Metrics */}
        <g transform="translate(570, 125)">
          {metrics.map((metric, i) => (
            <g
              key={i}
              transform={`translate(0, ${i * 85})`}
            >
              <rect x="0" y="0" width="105" height="75" rx="10" fill={`${metric.color}15`} />

              <text
                x="52"
                y="20"
                fontSize="9"
                fill={metric.color}
                textAnchor="middle"
                fontWeight="600"
              >
                {metric.label}
              </text>

              <text
                x="52"
                y="48"
                fontSize="24"
                fill={metric.color}
                textAnchor="middle"
                fontWeight="bold"
              >
                {metric.value}
              </text>

              <text x="52" y="65" fontSize="8" fill="#6B7280" textAnchor="middle">
                {metric.sub}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* === BOTTOM SECTION: Daily Routine Timeline === */}
      <g
      >
        <g filter="url(#toppersCardShadow)">
          <rect x="20" y="380" width="665" height="125" rx="16" fill="#FFFFFF" />
        </g>

        <text x="350" y="402" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
          Ideal Daily Routine of NEET Toppers
        </text>

        {/* Timeline */}
        <g transform="translate(40, 420)">
          {/* Timeline line */}
          <line
            x1="0"
            y1="30"
            x2="620"
            y2="30"
            stroke="#E5E7EB"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Timeline points */}
          {[
            { time: '5 AM', activity: 'Wake Up', icon: '🌅', x: 0 },
            { time: '5-7 AM', activity: 'Revision', icon: '📖', x: 90 },
            { time: '8-12', activity: 'New Topics', icon: '📚', x: 180 },
            { time: '2-5 PM', activity: 'Practice', icon: '✍️', x: 280 },
            { time: '6-8 PM', activity: 'Mock Test', icon: '📝', x: 380 },
            { time: '9-10 PM', activity: 'Analysis', icon: '🔍', x: 480 },
            { time: '10 PM', activity: 'Sleep', icon: '😴', x: 580 },
          ].map((point, i) => (
            <g
              key={i}
              transform={`translate(${point.x}, 0)`}
            >
              <circle
                cx="20"
                cy="30"
                r="12"
                fill="#F59E0B"
              />
              <text x="20" y="34" fontSize="12" textAnchor="middle">
                {point.icon}
              </text>
              <text x="20" y="55" fontSize="8" fill="#374151" textAnchor="middle" fontWeight="600">
                {point.time}
              </text>
              <text x="20" y="68" fontSize="7" fill="#6B7280" textAnchor="middle">
                {point.activity}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* Floating stars decoration */}
      {animate && (
        <>
          {[...Array(5)].map((_, i) => (
            <text
              key={i}
              x={30 + i * 160}
              y={50 + (i % 2) * 430}
              fontSize="16"
              opacity="0.4"
            >
              ⭐
            </text>
          ))}
        </>
      )}
    </Wrapper>
  )
}
