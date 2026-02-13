'use client'

import type { IllustrationProps } from './shared'

export function KotaVsOnlineIllustration({ className = '', animate = true }: IllustrationProps) {
    const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  // Comparison metrics data
  const comparisonData = [
    { factor: 'Annual Cost', kota: '₹3-5 Lakh', online: '₹50K-1.5L', winner: 'online' },
    { factor: 'Living Expenses', kota: '₹1.5-2L/yr', online: '₹0 (Home)', winner: 'online' },
    { factor: 'Travel Time', kota: '2-3 hrs daily', online: 'Zero', winner: 'online' },
    { factor: 'Batch Size', kota: '100-500', online: '20-50', winner: 'online' },
    { factor: 'Faculty Access', kota: 'Limited', online: '1-on-1', winner: 'online' },
  ]

  // Pros and cons
  const kotaPros = ['Peer Competition', 'Focused Environment', 'Library Access']
  const onlinePros = ['Flexible Schedule', 'Recorded Classes', 'Cost Effective', 'Home Comfort']

  return (
    <svg
      viewBox="0 0 700 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Background gradients */}
        <linearGradient id="kotaBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="onlineBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
        {/* Card shadow */}
        <filter id="kotaCardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#F97316" floodOpacity="0.15" />
        </filter>
        <filter id="onlineCardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#14B8A6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="#F8FAFC" rx="16" />

      {/* Title Section */}
      <g
      >
        <rect
          x="175"
          y="10"
          width="350"
          height="50"
          rx="25"
          fill="#6366F1"
          filter="url(#kotaCardShadow)"
        />
        <text x="350" y="28" fontSize="10" fill="#C7D2FE" textAnchor="middle">
          NEET Coaching Decision Guide
        </text>
        <text x="350" y="45" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          🏛️ Kota vs 💻 Online Coaching Comparison
        </text>
      </g>

      {/* Left Section - Kota Coaching */}
      <g
      >
        <rect
          x="20"
          y="70"
          width="220"
          height="280"
          rx="12"
          fill="url(#kotaBgGrad)"
          filter="url(#kotaCardShadow)"
        />
        <rect x="20" y="70" width="220" height="35" rx="12" fill="#F97316" />
        <text x="130" y="93" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          🏛️ Kota Coaching
        </text>

        {/* Kota Building Illustration */}
        <g
        >
          {/* Building */}
          <rect x="60" y="115" width="120" height="80" rx="6" fill="#EA580C" />
          <rect x="70" y="125" width="20" height="20" rx="3" fill="#FFFFFF" />
          <rect x="100" y="125" width="20" height="20" rx="3" fill="#FFFFFF" />
          <rect x="130" y="125" width="20" height="20" rx="3" fill="#FFFFFF" />
          <rect x="70" y="155" width="20" height="20" rx="3" fill="#FFFFFF" />
          <rect x="100" y="155" width="20" height="20" rx="3" fill="#FFFFFF" />
          <rect x="130" y="155" width="20" height="20" rx="3" fill="#FFFFFF" />
          <rect x="95" y="175" width="30" height="20" rx="2" fill="#7C2D12" />

          {/* Kota Banner */}
          <rect x="75" y="100" width="90" height="18" rx="4" fill="#DC2626" />
          <text x="120" y="113" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            KOTA
          </text>
        </g>

        {/* Walking students */}
        <g
        >
          <circle cx="50" cy="210" r="8" fill="#FBBF24" />
          <rect x="46" y="220" width="8" height="12" rx="2" fill="#3B82F6" />
        </g>
        <g
        >
          <circle cx="75" cy="215" r="8" fill="#FBBF24" />
          <rect x="71" y="225" width="8" height="12" rx="2" fill="#8B5CF6" />
        </g>

        {/* Auto/Taxi */}
        <g
        >
          <rect x="140" y="205" width="35" height="18" rx="4" fill="#FCD34D" />
          <circle cx="148" cy="223" r="5" fill="#1E293B" />
          <circle cx="167" cy="223" r="5" fill="#1E293B" />
          <text x="157" y="217" fontSize="6" fill="#78350F" textAnchor="middle" fontWeight="bold">
            AUTO
          </text>
        </g>

        {/* Kota Pros List */}
        <rect x="35" y="245" width="190" height="95" rx="8" fill="#FFFFFF" opacity="0.8" />
        <text x="130" y="262" fontSize="9" fill="#B45309" textAnchor="middle" fontWeight="bold">
          ✓ Advantages
        </text>
        {kotaPros.map((pro, index) => (
          <g key={pro}>
            <circle cx="50" cy={280 + index * 18} r="4" fill="#22C55E" />
            <text x="60" y={284 + index * 18} fontSize="8" fill="#374151">
              {pro}
            </text>
          </g>
        ))}
      </g>

      {/* Center Section - Comparison Chart */}
      <g
      >
        <rect
          x="250"
          y="70"
          width="200"
          height="280"
          rx="12"
          fill="#FFFFFF"
          filter="url(#kotaCardShadow)"
        />
        <rect x="250" y="70" width="200" height="35" rx="12" fill="#6366F1" />
        <text x="350" y="93" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📊 Comparison Chart
        </text>

        {/* Comparison rows */}
        {comparisonData.map((item, index) => (
          <g
            key={item.factor}
          >
            {/* Row background */}
            <rect
              x="260"
              y={115 + index * 48}
              width="180"
              height="42"
              rx="6"
              fill={index % 2 === 0 ? '#F8FAFC' : '#F1F5F9'}
            />

            {/* Factor label */}
            <text
              x="350"
              y={128 + index * 48}
              fontSize="8"
              fill="#6366F1"
              textAnchor="middle"
              fontWeight="bold"
            >
              {item.factor}
            </text>

            {/* Kota value */}
            <rect x="265" y={132 + index * 48} width="70" height="18" rx="4" fill="#FEF3C7" />
            <text x="300" y={144 + index * 48} fontSize="7" fill="#B45309" textAnchor="middle">
              {item.kota}
            </text>

            {/* Online value - with winner highlight */}
            <rect
              x="365"
              y={132 + index * 48}
              width="70"
              height="18"
              rx="4"
              fill={item.winner === 'online' ? '#D1FAE5' : '#F1F5F9'}
              stroke={item.winner === 'online' ? '#10B981' : 'none'}
              strokeWidth="1"
            />
            <text
              x="400"
              y={144 + index * 48}
              fontSize="7"
              fill={item.winner === 'online' ? '#059669' : '#6B7280'}
              textAnchor="middle"
              fontWeight={item.winner === 'online' ? 'bold' : 'normal'}
            >
              {item.online}
            </text>

            {/* Winner indicator */}
            {item.winner === 'online' && (
              <text
                x="440"
                y={144 + index * 48}
                fontSize="10"
              >
                ✓
              </text>
            )}
          </g>
        ))}
      </g>

      {/* Right Section - Online Coaching */}
      <g
      >
        <rect
          x="460"
          y="70"
          width="220"
          height="280"
          rx="12"
          fill="url(#onlineBgGrad)"
          filter="url(#onlineCardShadow)"
        />
        <rect x="460" y="70" width="220" height="35" rx="12" fill="#14B8A6" />
        <text x="570" y="93" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          💻 Online Coaching
        </text>

        {/* Laptop with Live Class */}
        <g
        >
          <rect x="495" y="115" width="150" height="90" rx="8" fill="#1E293B" />
          <rect x="503" y="123" width="134" height="74" rx="4" fill="#3B82F6" />

          {/* Teacher on screen */}
          <circle cx="570" cy="145" r="18" fill="#FBBF24" />
          <circle cx="565" cy="142" r="2.5" fill="#1E293B" />
          <circle cx="575" cy="142" r="2.5" fill="#1E293B" />
          <path d="M567 152 Q570 156 573 152" stroke="#1E293B" strokeWidth="2" fill="none" />

          {/* Whiteboard content */}
          <rect x="510" y="165" width="50" height="25" rx="3" fill="#FFFFFF" opacity="0.9" />
          <text x="535" y="175" fontSize="5" fill="#1E293B" textAnchor="middle">
            DNA Structure
          </text>
          <text x="535" y="185" fontSize="4" fill="#6B7280" textAnchor="middle">
            NCERT Ch.6
          </text>

          {/* Live indicator */}
          <circle
            cx="625"
            cy="130"
            r="6"
            fill="#EF4444"
          />
          <text x="625" y="145" fontSize="6" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            LIVE
          </text>

          {/* Chat bubbles */}
          <g
          >
            <rect x="595" y="165" width="35" height="10" rx="3" fill="#FFFFFF" />
            <rect x="600" y="178" width="28" height="8" rx="3" fill="#10B981" />
          </g>

          {/* Laptop base */}
          <rect x="485" y="205" width="170" height="10" rx="5" fill="#334155" />
        </g>

        {/* Student at home */}
        <g
        >
          <ellipse cx="570" cy="250" rx="25" ry="20" fill="#0D9488" />
          <circle cx="570" cy="228" r="15" fill="#FBBF24" />
          <circle cx="566" cy="225" r="2" fill="#1E293B" />
          <circle cx="574" cy="225" r="2" fill="#1E293B" />
          <path d="M567 232 Q570 235 573 232" stroke="#1E293B" strokeWidth="1.5" fill="none" />
        </g>

        {/* Home comfort icon */}
        <path d="M620 230 L635 218 L650 230 L650 255 L620 255 Z" fill="#8B5CF6" opacity="0.3" />
        <rect x="632" y="242" width="10" height="13" fill="#8B5CF6" opacity="0.5" />

        {/* Online Pros List */}
        <rect x="475" y="275" width="190" height="65" rx="8" fill="#FFFFFF" opacity="0.8" />
        <text x="570" y="290" fontSize="9" fill="#059669" textAnchor="middle" fontWeight="bold">
          ✓ Advantages
        </text>
        {onlinePros.map((pro, index) => (
          <g key={pro}>
            <circle
              cx={490 + (index % 2) * 95}
              cy={305 + Math.floor(index / 2) * 15}
              r="4"
              fill="#22C55E"
            />
            <text
              x={500 + (index % 2) * 95}
              y={309 + Math.floor(index / 2) * 15}
              fontSize="7"
              fill="#374151"
            >
              {pro}
            </text>
          </g>
        ))}
      </g>

      {/* VS Badge */}
      <g
      >
        <circle cx="350" cy="360" r="25" fill="#EF4444" />
        <text x="350" y="365" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          VS
        </text>
      </g>

      {/* Bottom Section - Final Verdict */}
      <g
      >
        <rect
          x="20"
          y="395"
          width="660"
          height="110"
          rx="12"
          fill="#FFFFFF"
          filter="url(#kotaCardShadow)"
        />
        <rect x="20" y="395" width="660" height="30" rx="12" fill="#6366F1" />
        <text x="350" y="415" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📈 Success Rate & Final Verdict
        </text>

        {/* Success stats */}
        <rect
          x="40"
          y="435"
          width="145"
          height="60"
          rx="8"
          fill="#FEF3C7"
          stroke="#F97316"
          strokeWidth="1"
        />
        <text x="112" y="455" fontSize="18" fill="#F97316" textAnchor="middle" fontWeight="bold">
          15-20%
        </text>
        <text x="112" y="472" fontSize="8" fill="#B45309" textAnchor="middle">
          Kota Success Rate
        </text>
        <text x="112" y="485" fontSize="6" fill="#6B7280" textAnchor="middle">
          (Large batches, high dropout)
        </text>

        <rect
          x="195"
          y="435"
          width="145"
          height="60"
          rx="8"
          fill="#D1FAE5"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="267" y="455" fontSize="18" fill="#10B981" textAnchor="middle" fontWeight="bold">
          35-45%
        </text>
        <text x="267" y="472" fontSize="8" fill="#059669" textAnchor="middle">
          Online Success Rate
        </text>
        <text x="267" y="485" fontSize="6" fill="#6B7280" textAnchor="middle">
          (Small batches, personalized)
        </text>

        {/* Cost comparison */}
        <rect
          x="350"
          y="435"
          width="145"
          height="60"
          rx="8"
          fill="#EDE9FE"
          stroke="#8B5CF6"
          strokeWidth="1"
        />
        <text x="422" y="455" fontSize="18" fill="#8B5CF6" textAnchor="middle" fontWeight="bold">
          60-70%
        </text>
        <text x="422" y="472" fontSize="8" fill="#6D28D9" textAnchor="middle">
          Cost Savings
        </text>
        <text x="422" y="485" fontSize="6" fill="#6B7280" textAnchor="middle">
          Online vs Kota
        </text>

        {/* Verdict */}
        <rect
          x="505"
          y="435"
          width="160"
          height="60"
          rx="8"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <text x="585" y="452" fontSize="9" fill="#166534" textAnchor="middle" fontWeight="bold">
          🏆 Winner: Online
        </text>
        <text x="585" y="468" fontSize="7" fill="#15803D" textAnchor="middle">
          Better ROI, Flexibility
        </text>
        <text x="585" y="482" fontSize="7" fill="#15803D" textAnchor="middle">
          & Personalized Learning
        </text>
      </g>

      {/* Floating decorative elements */}
      <circle
        cx="15"
        cy="55"
        r="8"
        fill="#F97316"
        opacity="0.3"
      />
      <circle
        cx="685"
        cy="45"
        r="6"
        fill="#14B8A6"
        opacity="0.3"
      />
      <rect
        x="660"
        y="380"
        width="15"
        height="10"
        rx="2"
        fill="#6366F1"
        opacity="0.3"
      />
    </svg>
  )
}
