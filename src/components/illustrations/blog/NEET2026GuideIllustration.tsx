'use client'

import type { IllustrationProps } from './shared'

export function NEET2026GuideIllustration({ className = '', animate = true }: IllustrationProps) {
    const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  return (
    <svg
      viewBox="0 0 600 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="neet2026BgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="50%" stopColor="#F0FDFA" />
          <stop offset="100%" stopColor="#F0F9FF" />
        </linearGradient>
        {/* Card gradient */}
        <linearGradient id="neetCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>
        {/* Subject gradients */}
        <linearGradient id="physicsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="chemistryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="biologyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="botanyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="zoologyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        {/* Medal gradient */}
        <radialGradient id="medalGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        {/* Shadow filters */}
        <filter id="neetShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
        </filter>
        <filter id="neetGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="600" height="450" fill="url(#neet2026BgGrad)" />

      {/* Decorative circles */}
      <circle cx="50" cy="50" r="80" fill="#10B981" opacity="0.05" />
      <circle cx="550" cy="400" r="100" fill="#3B82F6" opacity="0.05" />
      <circle cx="300" cy="225" r="200" fill="#14B8A6" opacity="0.03" />

      {/* Title Banner */}
      <g
      >
        <rect
          x="150"
          y="15"
          width="300"
          height="50"
          rx="25"
          fill="#14B8A6"
          filter="url(#neetShadow)"
        />
        <g
        >
          <text x="300" y="35" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="500">
            COMPLETE GUIDE
          </text>
          <text x="300" y="55" fontSize="20" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            NEET 2026
          </text>
        </g>
      </g>

      {/* EXAM PATTERN CARD - Left */}
      <g
      >
        <rect
          x="20"
          y="80"
          width="180"
          height="250"
          rx="12"
          fill="url(#neetCardGrad)"
          filter="url(#neetShadow)"
        />
        <rect x="20" y="80" width="180" height="35" rx="12" fill="#1E293B" />
        <text x="110" y="103" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📋 EXAM PATTERN
        </text>

        {/* Question breakdown */}
        <text x="35" y="135" fontSize="9" fill="#64748B" fontWeight="600">
          Subject Breakdown:
        </text>

        {/* Physics */}
        <rect x="35" y="145" width="150" height="22" rx="4" fill="#EFF6FF" />
        <rect x="35" y="145" width="75" height="22" rx="4" fill="url(#physicsGrad)" />
        <text x="42" y="160" fontSize="8" fill="#FFFFFF" fontWeight="600">
          Physics
        </text>
        <text x="175" y="160" fontSize="8" fill="#3B82F6" fontWeight="bold" textAnchor="end">
          45 Qs
        </text>

        {/* Chemistry */}
        <rect x="35" y="172" width="150" height="22" rx="4" fill="#F5F3FF" />
        <rect x="35" y="172" width="75" height="22" rx="4" fill="url(#chemistryGrad)" />
        <text x="42" y="187" fontSize="8" fill="#FFFFFF" fontWeight="600">
          Chemistry
        </text>
        <text x="175" y="187" fontSize="8" fill="#8B5CF6" fontWeight="bold" textAnchor="end">
          45 Qs
        </text>

        {/* Botany */}
        <rect x="35" y="199" width="150" height="22" rx="4" fill="#ECFDF5" />
        <rect x="35" y="199" width="75" height="22" rx="4" fill="url(#botanyGrad)" />
        <text x="42" y="214" fontSize="8" fill="#FFFFFF" fontWeight="600">
          Botany
        </text>
        <text x="175" y="214" fontSize="8" fill="#22C55E" fontWeight="bold" textAnchor="end">
          45 Qs
        </text>

        {/* Zoology */}
        <rect x="35" y="226" width="150" height="22" rx="4" fill="#F0FDFA" />
        <rect x="35" y="226" width="75" height="22" rx="4" fill="url(#zoologyGrad)" />
        <text x="42" y="241" fontSize="8" fill="#FFFFFF" fontWeight="600">
          Zoology
        </text>
        <text x="175" y="241" fontSize="8" fill="#14B8A6" fontWeight="bold" textAnchor="end">
          45 Qs
        </text>

        {/* Total */}
        <rect x="35" y="258" width="150" height="2" fill="#E2E8F0" />
        <text x="35" y="278" fontSize="10" fill="#1E293B" fontWeight="bold">
          Total: 180 Questions
        </text>
        <text x="35" y="295" fontSize="10" fill="#14B8A6" fontWeight="bold">
          Max Marks: 720
        </text>
        <text x="35" y="312" fontSize="9" fill="#64748B">
          Duration: 3 hrs 20 min
        </text>
      </g>

      {/* MARKING SCHEME CARD - Center */}
      <g
      >
        <rect
          x="210"
          y="80"
          width="180"
          height="165"
          rx="12"
          fill="url(#neetCardGrad)"
          filter="url(#neetShadow)"
        />
        <rect x="210" y="80" width="180" height="35" rx="12" fill="#059669" />
        <text x="300" y="103" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ✅ MARKING SCHEME
        </text>

        {/* Correct answer */}
        <g transform="translate(225, 125)">
          <circle cx="15" cy="12" r="12" fill="#DCFCE7" />
          <text x="15" y="16" fontSize="12" textAnchor="middle" fill="#16A34A">
            ✓
          </text>
          <text x="40" y="10" fontSize="9" fill="#1E293B" fontWeight="600">
            Correct Answer
          </text>
          <text x="40" y="24" fontSize="14" fill="#16A34A" fontWeight="bold">
            +4 marks
          </text>
        </g>

        {/* Wrong answer */}
        <g transform="translate(225, 165)">
          <circle cx="15" cy="12" r="12" fill="#FEE2E2" />
          <text x="15" y="16" fontSize="12" textAnchor="middle" fill="#DC2626">
            ✗
          </text>
          <text x="40" y="10" fontSize="9" fill="#1E293B" fontWeight="600">
            Wrong Answer
          </text>
          <text x="40" y="24" fontSize="14" fill="#DC2626" fontWeight="bold">
            -1 mark
          </text>
        </g>

        {/* Unanswered */}
        <g transform="translate(225, 205)">
          <circle cx="15" cy="12" r="12" fill="#F3F4F6" />
          <text x="15" y="16" fontSize="12" textAnchor="middle" fill="#6B7280">
            −
          </text>
          <text x="40" y="10" fontSize="9" fill="#1E293B" fontWeight="600">
            Unanswered
          </text>
          <text x="40" y="24" fontSize="14" fill="#6B7280" fontWeight="bold">
            0 marks
          </text>
        </g>
      </g>

      {/* IMPORTANT DATES CARD */}
      <g
      >
        <rect
          x="400"
          y="80"
          width="180"
          height="165"
          rx="12"
          fill="url(#neetCardGrad)"
          filter="url(#neetShadow)"
        />
        <rect x="400" y="80" width="180" height="35" rx="12" fill="#7C3AED" />
        <text x="490" y="103" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📅 KEY DATES 2026
        </text>

        {/* Timeline */}
        <line x1="425" y1="130" x2="425" y2="230" stroke="#E2E8F0" strokeWidth="2" />

        {/* Registration */}
        <circle cx="425" cy="140" r="6" fill="#3B82F6" />
        <text x="440" y="138" fontSize="8" fill="#64748B">
          Registration
        </text>
        <text x="440" y="150" fontSize="9" fill="#1E293B" fontWeight="600">
          Feb 2026
        </text>

        {/* Admit Card */}
        <circle cx="425" cy="175" r="6" fill="#8B5CF6" />
        <text x="440" y="173" fontSize="8" fill="#64748B">
          Admit Card
        </text>
        <text x="440" y="185" fontSize="9" fill="#1E293B" fontWeight="600">
          Apr 2026
        </text>

        {/* Exam Date */}
        <circle
          cx="425"
          cy="210"
          r="8"
          fill="#EF4444"
        />
        <text x="440" y="208" fontSize="8" fill="#64748B">
          Exam Date
        </text>
        <text x="440" y="220" fontSize="10" fill="#EF4444" fontWeight="bold">
          May 2026
        </text>
      </g>

      {/* SUBJECT DISTRIBUTION PIE CHART */}
      <g
      >
        <rect
          x="210"
          y="255"
          width="180"
          height="180"
          rx="12"
          fill="url(#neetCardGrad)"
          filter="url(#neetShadow)"
        />
        <text x="300" y="278" fontSize="10" fill="#1E293B" textAnchor="middle" fontWeight="bold">
          Subject Distribution
        </text>

        {/* Pie chart */}
        <g transform="translate(300, 355)">
          {/* Physics - 25% */}
          <path
            d="M0,-45 A45,45 0 0,1 39,22.5 L0,0 Z"
            fill="#3B82F6"
          />
          {/* Chemistry - 25% */}
          <path
            d="M39,22.5 A45,45 0 0,1 -39,22.5 L0,0 Z"
            fill="#8B5CF6"
          />
          {/* Biology - 50% */}
          <path
            d="M-39,22.5 A45,45 0 0,1 0,-45 L0,0 Z"
            fill="#10B981"
          />
          <circle cx="0" cy="0" r="20" fill="white" />
          <text x="0" y="5" fontSize="10" fill="#1E293B" textAnchor="middle" fontWeight="bold">
            720
          </text>
        </g>

        {/* Legend */}
        <g transform="translate(225, 410)">
          <rect x="0" y="0" width="10" height="10" rx="2" fill="#3B82F6" />
          <text x="15" y="9" fontSize="7" fill="#64748B">
            Physics 25%
          </text>
          <rect x="65" y="0" width="10" height="10" rx="2" fill="#8B5CF6" />
          <text x="80" y="9" fontSize="7" fill="#64748B">
            Chem 25%
          </text>
          <rect x="125" y="0" width="10" height="10" rx="2" fill="#10B981" />
          <text x="140" y="9" fontSize="7" fill="#64748B">
            Bio 50%
          </text>
        </g>
      </g>

      {/* QUALIFYING CUTOFF CARD */}
      <g
      >
        <rect
          x="400"
          y="255"
          width="180"
          height="100"
          rx="12"
          fill="url(#neetCardGrad)"
          filter="url(#neetShadow)"
        />
        <rect x="400" y="255" width="180" height="30" rx="12" fill="#F59E0B" />
        <text x="490" y="275" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          🎯 QUALIFYING CUTOFF
        </text>

        <text x="415" y="305" fontSize="8" fill="#64748B">
          General Category:
        </text>
        <text x="565" y="305" fontSize="9" fill="#1E293B" fontWeight="bold" textAnchor="end">
          50th %ile
        </text>

        <text x="415" y="322" fontSize="8" fill="#64748B">
          OBC/SC/ST:
        </text>
        <text x="565" y="322" fontSize="9" fill="#1E293B" fontWeight="bold" textAnchor="end">
          40th %ile
        </text>

        <text x="415" y="339" fontSize="8" fill="#64748B">
          PwD Category:
        </text>
        <text x="565" y="339" fontSize="9" fill="#1E293B" fontWeight="bold" textAnchor="end">
          45th %ile
        </text>
      </g>

      {/* SUCCESS MEDAL */}
      <g
      >
        <g
          style={{ transformOrigin: '110px 370px' }}
        >
          {/* Ribbon */}
          <path d="M110 300 L90 330 L110 320 L130 330 Z" fill="#DC2626" />
          <path d="M95 310 L85 340 L100 325 Z" fill="#B91C1C" />
          <path d="M125 310 L135 340 L120 325 Z" fill="#B91C1C" />

          {/* Medal */}
          <circle cx="110" cy="370" r="50" fill="url(#medalGrad)" filter="url(#neetGlow)" />
          <circle cx="110" cy="370" r="42" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="110" cy="370" r="35" fill="#FBBF24" />

          {/* Medal content */}
          <text x="110" y="358" fontSize="8" fill="#92400E" textAnchor="middle" fontWeight="500">
            TARGET
          </text>
          <text x="110" y="378" fontSize="18" fill="#78350F" textAnchor="middle" fontWeight="bold">
            650+
          </text>
          <text x="110" y="395" fontSize="8" fill="#92400E" textAnchor="middle">
            MARKS
          </text>
        </g>
      </g>

      {/* BOTTOM CTA */}
      <g
      >
        <rect
          x="400"
          y="365"
          width="180"
          height="70"
          rx="12"
          fill="#14B8A6"
          filter="url(#neetShadow)"
        />
        <g
        >
          <text x="490" y="390" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="500">
            Start Your Journey
          </text>
          <text x="490" y="410" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            NEET 2026 🚀
          </text>
          <text x="490" y="428" fontSize="8" fill="#A7F3D0" textAnchor="middle">
            Complete Guide Inside →
          </text>
        </g>
      </g>
    </svg>
  )
}
