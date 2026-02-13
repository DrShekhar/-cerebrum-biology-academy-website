'use client'

import type { IllustrationProps } from './shared'

export function SpecializedVsMassIllustration({
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

  // Comparison data
  const comparisonMetrics = [
    { metric: 'Batch Size', specialized: '15-25', mass: '100-500', winner: 'specialized' },
    { metric: 'Faculty Ratio', specialized: '1:15', mass: '1:100+', winner: 'specialized' },
    {
      metric: 'Doubt Sessions',
      specialized: 'Daily 1-on-1',
      mass: 'Weekly Group',
      winner: 'specialized',
    },
    { metric: 'Focus Area', specialized: 'Biology Only', mass: 'PCB Mixed', winner: 'specialized' },
  ]

  // Success indicators
  const specializedFeatures = [
    { icon: '🎯', text: 'NEET Biology Expert Faculty' },
    { icon: '📚', text: 'Deep Conceptual Teaching' },
    { icon: '💬', text: 'Personal Doubt Resolution' },
    { icon: '📊', text: 'Individual Progress Tracking' },
  ]

  const massDrawbacks = [
    { icon: '⚠️', text: 'One-size-fits-all Approach' },
    { icon: '😰', text: 'Easy to Get Lost in Crowd' },
    { icon: '📉', text: 'Generic Teaching Style' },
    { icon: '⏰', text: 'Limited Personal Attention' },
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
        <linearGradient id="specVsMassBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0FDF4" />
          <stop offset="50%" stopColor="#FAFAFA" />
          <stop offset="100%" stopColor="#FEF2F2" />
        </linearGradient>
        {/* Card shadows */}
        <filter id="specCardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#22C55E" floodOpacity="0.15" />
        </filter>
        <filter id="massCardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#EF4444" floodOpacity="0.15" />
        </filter>
        {/* Specialized gradient */}
        <linearGradient id="specGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        {/* Mass gradient */}
        <linearGradient id="massGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#specVsMassBg)" rx="16" />

      {/* Title Section */}
      <g
      >
        <rect
          x="150"
          y="10"
          width="400"
          height="50"
          rx="25"
          fill="#1F2937"
          filter="url(#specCardShadow)"
        />
        <text x="350" y="28" fontSize="10" fill="#9CA3AF" textAnchor="middle">
          NEET Biology Coaching Decision
        </text>
        <text x="350" y="45" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          🎯 Specialized vs 🏭 Mass Coaching Comparison
        </text>
      </g>

      {/* Left Section - Specialized Coaching */}
      <g
      >
        <rect
          x="20"
          y="70"
          width="220"
          height="295"
          rx="12"
          fill="#F0FDF4"
          stroke="#22C55E"
          strokeWidth="2"
          filter="url(#specCardShadow)"
        />
        <rect x="20" y="70" width="220" height="40" rx="12" fill="url(#specGrad)" />
        <text x="130" y="95" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          🎯 SPECIALIZED COACHING
        </text>

        {/* DNA/Biology Icon */}
        <g
          style={{ transformOrigin: '130px 145px' }}
        >
          <circle cx="130" cy="145" r="30" fill="#86EFAC" opacity="0.5" />
        </g>
        <g
        >
          {/* DNA Helix */}
          <path
            d="M115 130 Q130 125 145 130 Q130 140 115 145 Q130 155 145 160"
            stroke="#166534"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="115" cy="130" r="4" fill="#166534" />
          <circle cx="145" cy="130" r="4" fill="#166534" />
          <circle cx="115" cy="145" r="4" fill="#166534" />
          <circle cx="145" cy="160" r="4" fill="#166534" />
        </g>

        {/* Features list */}
        {specializedFeatures.map((feature, index) => (
          <g
            key={feature.text}
          >
            <rect
              x="35"
              y={185 + index * 40}
              width="190"
              height="32"
              rx="6"
              fill="#FFFFFF"
              stroke="#86EFAC"
              strokeWidth="1"
            />
            <text x="50" y={205 + index * 40} fontSize="14">
              {feature.icon}
            </text>
            <text x="70" y={205 + index * 40} fontSize="8" fill="#166534" fontWeight="bold">
              {feature.text}
            </text>
          </g>
        ))}

        {/* Success badge */}
        <g
        >
          <rect x="55" y="335" width="150" height="22" rx="11" fill="#22C55E" />
          <text x="130" y="350" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            ✓ 40-50% Success Rate
          </text>
        </g>
      </g>

      {/* Center Section - Comparison Metrics */}
      <g
      >
        <rect
          x="250"
          y="70"
          width="200"
          height="295"
          rx="12"
          fill="#FFFFFF"
          filter="url(#specCardShadow)"
        />
        <rect x="250" y="70" width="200" height="35" rx="12" fill="#1F2937" />
        <text x="350" y="93" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📊 Head-to-Head Comparison
        </text>

        {/* Comparison rows */}
        {comparisonMetrics.map((item, index) => (
          <g
            key={item.metric}
          >
            {/* Row background */}
            <rect
              x="260"
              y={115 + index * 60}
              width="180"
              height="52"
              rx="8"
              fill={index % 2 === 0 ? '#F8FAFC' : '#FFFFFF'}
            />

            {/* Metric label */}
            <text
              x="350"
              y={130 + index * 60}
              fontSize="9"
              fill="#6366F1"
              textAnchor="middle"
              fontWeight="bold"
            >
              {item.metric}
            </text>

            {/* Specialized value - Winner */}
            <rect
              x="265"
              y={135 + index * 60}
              width="75"
              height="24"
              rx="6"
              fill="#D1FAE5"
              stroke="#22C55E"
              strokeWidth="1.5"
            />
            <text
              x="302"
              y={151 + index * 60}
              fontSize="8"
              fill="#166534"
              textAnchor="middle"
              fontWeight="bold"
            >
              {item.specialized}
            </text>

            {/* Mass value */}
            <rect x="355" y={135 + index * 60} width="75" height="24" rx="6" fill="#FEE2E2" />
            <text x="392" y={151 + index * 60} fontSize="8" fill="#991B1B" textAnchor="middle">
              {item.mass}
            </text>

            {/* Winner indicator */}
            <text
              x="340"
              y={151 + index * 60}
              fontSize="10"
              fill="#22C55E"
            >
              ✓
            </text>
          </g>
        ))}
      </g>

      {/* Right Section - Mass Coaching */}
      <g
      >
        <rect
          x="460"
          y="70"
          width="220"
          height="295"
          rx="12"
          fill="#FEF2F2"
          stroke="#EF4444"
          strokeWidth="2"
          filter="url(#massCardShadow)"
        />
        <rect x="460" y="70" width="220" height="40" rx="12" fill="url(#massGrad)" />
        <text x="570" y="95" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          🏭 MASS COACHING
        </text>

        {/* Factory Building Icon */}
        <g
        >
          {/* Factory building */}
          <rect x="530" y="125" width="80" height="50" rx="4" fill="#FECACA" />
          <rect x="540" y="135" width="15" height="15" rx="2" fill="#FEE2E2" />
          <rect x="562" y="135" width="15" height="15" rx="2" fill="#FEE2E2" />
          <rect x="585" y="135" width="15" height="15" rx="2" fill="#FEE2E2" />
          <rect x="540" y="155" width="55" height="15" rx="2" fill="#7C2D12" />
          {/* Chimneys with smoke */}
          <rect x="545" y="110" width="12" height="20" fill="#DC2626" />
          <rect x="583" y="110" width="12" height="20" fill="#DC2626" />
          <circle
            cx="551"
            cy="105"
            r="5"
            fill="#9CA3AF"
            opacity="0.6"
          />
          <circle
            cx="589"
            cy="105"
            r="5"
            fill="#9CA3AF"
            opacity="0.6"
          />
        </g>

        {/* Drawbacks list */}
        {massDrawbacks.map((drawback, index) => (
          <g
            key={drawback.text}
          >
            <rect
              x="475"
              y={185 + index * 40}
              width="190"
              height="32"
              rx="6"
              fill="#FFFFFF"
              stroke="#FECACA"
              strokeWidth="1"
            />
            <text x="490" y={205 + index * 40} fontSize="14">
              {drawback.icon}
            </text>
            <text x="510" y={205 + index * 40} fontSize="8" fill="#991B1B" fontWeight="bold">
              {drawback.text}
            </text>
          </g>
        ))}

        {/* Low success badge */}
        <rect x="495" y="335" width="150" height="22" rx="11" fill="#EF4444" />
        <text x="570" y="350" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ✗ 10-15% Success Rate
        </text>
      </g>

      {/* VS Badge */}
      <g
      >
        <circle cx="350" cy="380" r="28" fill="#1F2937" />
        <text x="350" y="386" fontSize="16" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          VS
        </text>
      </g>

      {/* Bottom Section - Final Verdict */}
      <g
      >
        <rect
          x="20"
          y="415"
          width="660"
          height="90"
          rx="12"
          fill="#FFFFFF"
          filter="url(#specCardShadow)"
        />
        <rect x="20" y="415" width="660" height="30" rx="12" fill="#1F2937" />
        <text x="350" y="435" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          🏆 Why Choose Specialized Biology Coaching?
        </text>

        {/* Verdict cards */}
        <rect
          x="40"
          y="455"
          width="145"
          height="40"
          rx="8"
          fill="#D1FAE5"
          stroke="#22C55E"
          strokeWidth="1"
        />
        <text x="112" y="472" fontSize="9" fill="#166534" textAnchor="middle" fontWeight="bold">
          3x Better Results
        </text>
        <text x="112" y="486" fontSize="7" fill="#15803D" textAnchor="middle">
          40% vs 15% success
        </text>

        <rect
          x="195"
          y="455"
          width="145"
          height="40"
          rx="8"
          fill="#DBEAFE"
          stroke="#3B82F6"
          strokeWidth="1"
        />
        <text x="267" y="472" fontSize="9" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          7x More Attention
        </text>
        <text x="267" y="486" fontSize="7" fill="#2563EB" textAnchor="middle">
          1:15 vs 1:100 ratio
        </text>

        <rect
          x="350"
          y="455"
          width="145"
          height="40"
          rx="8"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <text x="422" y="472" fontSize="9" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Deep Conceptual
        </text>
        <text x="422" y="486" fontSize="7" fill="#D97706" textAnchor="middle">
          Biology-only focus
        </text>

        <rect x="505" y="455" width="160" height="40" rx="8" fill="#22C55E" />
        <text x="585" y="472" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          🎯 Clear Winner
        </text>
        <text x="585" y="486" fontSize="8" fill="#DCFCE7" textAnchor="middle">
          Specialized Coaching
        </text>
      </g>

      {/* Floating decorative elements */}
      <circle
        cx="15"
        cy="55"
        r="8"
        fill="#22C55E"
        opacity="0.3"
      />
      <circle
        cx="685"
        cy="45"
        r="6"
        fill="#EF4444"
        opacity="0.3"
      />
      <rect
        x="660"
        y="400"
        width="15"
        height="10"
        rx="2"
        fill="#1F2937"
        opacity="0.2"
      />
    </Wrapper>
  )
}
