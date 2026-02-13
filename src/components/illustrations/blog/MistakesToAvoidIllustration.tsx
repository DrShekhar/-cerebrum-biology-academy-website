'use client'

import type { IllustrationProps } from './shared'

export function MistakesToAvoidIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 600 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="mistakeBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF2F2" />
          <stop offset="50%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FFFBEB" />
        </linearGradient>
        {/* Card gradient */}
        <linearGradient id="mistakeCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FEF2F2" />
        </linearGradient>
        {/* Success card gradient */}
        <linearGradient id="successCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#ECFDF5" />
        </linearGradient>
        {/* Warning gradient */}
        <linearGradient id="warningGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        {/* Shadow filters */}
        <filter id="mistakeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="errorGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="600" height="450" fill="url(#mistakeBgGrad)" />

      {/* Decorative elements */}
      <circle cx="50" cy="50" r="80" fill="#EF4444" opacity="0.05" />
      <circle cx="550" cy="400" r="100" fill="#F59E0B" opacity="0.05" />

      {/* Title */}
      <g
      >
        <rect
          x="150"
          y="12"
          width="300"
          height="45"
          rx="22"
          fill="#DC2626"
          filter="url(#mistakeShadow)"
        />
        <text x="300" y="42" fontSize="16" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ⚠️ Top 10 NEET Mistakes to Avoid
        </text>
      </g>

      {/* LEFT COLUMN - DON'T DO */}
      <g
      >
        <rect
          x="20"
          y="70"
          width="270"
          height="365"
          rx="12"
          fill="url(#mistakeCardGrad)"
          filter="url(#mistakeShadow)"
        />
        <rect x="20" y="70" width="270" height="35" rx="12" fill="#DC2626" />
        <text x="155" y="93" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ❌ COMMON MISTAKES
        </text>

        {/* Mistake 1 */}
        <g transform="translate(35, 115)">
          <circle
            cx="18"
            cy="18"
            r="18"
            fill="#FEE2E2"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <text x="18" y="23" fontSize="14" textAnchor="middle" fill="#DC2626" fontWeight="bold">
            1
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            Skipping NCERT
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            85% questions are from NCERT!
          </text>
          <rect x="180" y="5" width="60" height="22" rx="4" fill="#FEE2E2" />
          <text x="210" y="20" fontSize="8" fill="#DC2626" textAnchor="middle" fontWeight="600">
            FATAL ☠️
          </text>
        </g>

        {/* Mistake 2 */}
        <g transform="translate(35, 165)">
          <circle cx="18" cy="18" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          <text x="18" y="23" fontSize="14" textAnchor="middle" fill="#DC2626" fontWeight="bold">
            2
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            Too Many Books
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            Stick to 2-3 quality resources
          </text>
          <rect x="180" y="5" width="60" height="22" rx="4" fill="#FFEDD5" />
          <text x="210" y="20" fontSize="8" fill="#EA580C" textAnchor="middle" fontWeight="600">
            HIGH ⚠️
          </text>
        </g>

        {/* Mistake 3 */}
        <g transform="translate(35, 215)">
          <circle cx="18" cy="18" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          <text x="18" y="23" fontSize="14" textAnchor="middle" fill="#DC2626" fontWeight="bold">
            3
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            No Revision Plan
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            Forgetting curve is real!
          </text>
          <rect x="180" y="5" width="60" height="22" rx="4" fill="#FEE2E2" />
          <text x="210" y="20" fontSize="8" fill="#DC2626" textAnchor="middle" fontWeight="600">
            FATAL ☠️
          </text>
        </g>

        {/* Mistake 4 */}
        <g transform="translate(35, 265)">
          <circle cx="18" cy="18" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          <text x="18" y="23" fontSize="14" textAnchor="middle" fill="#DC2626" fontWeight="bold">
            4
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            Ignoring Mock Tests
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            Practice under exam conditions
          </text>
          <rect x="180" y="5" width="60" height="22" rx="4" fill="#FFEDD5" />
          <text x="210" y="20" fontSize="8" fill="#EA580C" textAnchor="middle" fontWeight="600">
            HIGH ⚠️
          </text>
        </g>

        {/* Mistake 5 */}
        <g transform="translate(35, 315)">
          <circle cx="18" cy="18" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          <text x="18" y="23" fontSize="14" textAnchor="middle" fill="#DC2626" fontWeight="bold">
            5
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            Selective Study
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            Every chapter matters in NEET
          </text>
          <rect x="180" y="5" width="60" height="22" rx="4" fill="#FEF3C7" />
          <text x="210" y="20" fontSize="8" fill="#D97706" textAnchor="middle" fontWeight="600">
            MED ⚡
          </text>
        </g>

        {/* Mistake 6 */}
        <g transform="translate(35, 365)">
          <circle cx="18" cy="18" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          <text x="18" y="23" fontSize="14" textAnchor="middle" fill="#DC2626" fontWeight="bold">
            6
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            Last Minute Panic
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            Stay calm, trust your prep
          </text>
          <rect x="180" y="5" width="60" height="22" rx="4" fill="#FEF3C7" />
          <text x="210" y="20" fontSize="8" fill="#D97706" textAnchor="middle" fontWeight="600">
            MED ⚡
          </text>
        </g>
      </g>

      {/* RIGHT COLUMN - DO THIS INSTEAD */}
      <g
      >
        <rect
          x="310"
          y="70"
          width="270"
          height="280"
          rx="12"
          fill="url(#successCardGrad)"
          filter="url(#mistakeShadow)"
        />
        <rect x="310" y="70" width="270" height="35" rx="12" fill="#059669" />
        <text x="445" y="93" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ✅ DO THIS INSTEAD
        </text>

        {/* Correct 1 */}
        <g transform="translate(325, 115)">
          <circle
            cx="18"
            cy="18"
            r="18"
            fill="#DCFCE7"
            stroke="#22C55E"
            strokeWidth="2"
          />
          <text x="18" y="24" fontSize="16" textAnchor="middle" fill="#16A34A">
            ✓
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            Master NCERT First
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            Read line-by-line, 3x minimum
          </text>
        </g>

        {/* Correct 2 */}
        <g transform="translate(325, 160)">
          <circle cx="18" cy="18" r="18" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2" />
          <text x="18" y="24" fontSize="16" textAnchor="middle" fill="#16A34A">
            ✓
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            Quality over Quantity
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            NCERT + 1 reference = enough
          </text>
        </g>

        {/* Correct 3 */}
        <g transform="translate(325, 205)">
          <circle cx="18" cy="18" r="18" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2" />
          <text x="18" y="24" fontSize="16" textAnchor="middle" fill="#16A34A">
            ✓
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            Weekly Revision Schedule
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            Revise every topic 5+ times
          </text>
        </g>

        {/* Correct 4 */}
        <g transform="translate(325, 250)">
          <circle cx="18" cy="18" r="18" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2" />
          <text x="18" y="24" fontSize="16" textAnchor="middle" fill="#16A34A">
            ✓
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            50+ Full Mock Tests
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            Analyze every mistake
          </text>
        </g>

        {/* Correct 5 */}
        <g transform="translate(325, 295)">
          <circle cx="18" cy="18" r="18" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2" />
          <text x="18" y="24" fontSize="16" textAnchor="middle" fill="#16A34A">
            ✓
          </text>
          <text x="50" y="15" fontSize="10" fill="#1E293B" fontWeight="600">
            Complete Syllabus Coverage
          </text>
          <text x="50" y="28" fontSize="8" fill="#64748B">
            No chapter is unimportant
          </text>
        </g>
      </g>

      {/* STATISTICS BOX */}
      <g
      >
        <rect
          x="310"
          y="360"
          width="270"
          height="75"
          rx="12"
          fill="#1E293B"
          filter="url(#mistakeShadow)"
        />
        <text x="445" y="385" fontSize="10" fill="#94A3B8" textAnchor="middle">
          Students who avoid these mistakes
        </text>
        <text
          x="445"
          y="415"
          fontSize="28"
          fill="#22C55E"
          textAnchor="middle"
          fontWeight="bold"
        >
          3x More Likely
        </text>
        <text x="445" y="430" fontSize="9" fill="#94A3B8" textAnchor="middle">
          to score 600+ in NEET
        </text>
      </g>

      {/* WARNING TRIANGLE */}
      <g
      >
        <g
          style={{ transformOrigin: '155px 440px' }}
        >
          <path
            d="M155 390 L190 440 L120 440 Z"
            fill="url(#warningGrad)"
            stroke="#D97706"
            strokeWidth="3"
            filter="url(#errorGlow)"
          />
          <text x="155" y="430" fontSize="24" textAnchor="middle" fill="#78350F" fontWeight="bold">
            !
          </text>
        </g>
      </g>
    </Wrapper>
  )
}
