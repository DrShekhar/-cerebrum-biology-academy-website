'use client'

import { motion } from 'framer-motion'

// Blog-specific illustrations - topic-appropriate animated SVGs
// Following the same pattern as SEOIllustrations.tsx

interface IllustrationProps {
  className?: string
  animate?: boolean
}

// 1. Kota vs Online NEET Coaching - Split screen comparison
export function KotaVsOnlineIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Divider line */}
      <line
        x1="200"
        y1="20"
        x2="200"
        y2="280"
        stroke="#E2E8F0"
        strokeWidth="3"
        strokeDasharray="8"
      />

      {/* Left side - Kota (Physical Coaching) */}
      <rect x="10" y="30" width="175" height="240" rx="12" fill="#FEF3C7" opacity="0.5" />

      {/* Kota building */}
      <rect x="40" y="100" width="120" height="100" rx="6" fill="#F97316" />
      <rect x="55" y="115" width="25" height="25" rx="3" fill="#FFFFFF" />
      <rect x="95" y="115" width="25" height="25" rx="3" fill="#FFFFFF" />
      <rect x="55" y="155" width="25" height="25" rx="3" fill="#FFFFFF" />
      <rect x="95" y="155" width="25" height="25" rx="3" fill="#FFFFFF" />
      <rect x="70" y="170" width="30" height="30" rx="2" fill="#7C2D12" />

      {/* Kota sign */}
      <rect x="50" y="70" width="100" height="25" rx="4" fill="#DC2626" />
      <text x="100" y="88" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
        KOTA
      </text>

      {/* Students walking */}
      <motion.g
        animate={animate ? { x: [-5, 5, -5] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <circle cx="45" cy="220" r="8" fill="#FBBF24" />
        <rect x="41" y="230" width="8" height="15" rx="2" fill="#3B82F6" />
      </motion.g>
      <motion.g
        animate={animate ? { x: [5, -5, 5] } : undefined}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <circle cx="70" cy="225" r="8" fill="#FBBF24" />
        <rect x="66" y="235" width="8" height="15" rx="2" fill="#8B5CF6" />
      </motion.g>

      {/* Travel icon */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse cx="140" cy="220" rx="20" ry="8" fill="#94A3B8" />
        <rect x="125" y="205" width="30" height="15" rx="3" fill="#64748B" />
        <circle cx="130" cy="220" r="4" fill="#1E293B" />
        <circle cx="150" cy="220" r="4" fill="#1E293B" />
      </motion.g>

      {/* Right side - Online Learning */}
      <rect x="215" y="30" width="175" height="240" rx="12" fill="#D1FAE5" opacity="0.5" />

      {/* Laptop */}
      <rect x="240" y="100" width="120" height="80" rx="8" fill="#1E293B" />
      <rect x="248" y="108" width="104" height="64" rx="4" fill="#3B82F6" />

      {/* Screen content - live class */}
      <circle cx="300" cy="130" r="15" fill="#FBBF24" />
      <circle cx="295" cy="127" r="2" fill="#1E293B" />
      <circle cx="305" cy="127" r="2" fill="#1E293B" />
      <path d="M297 136 Q300 140 303 136" stroke="#1E293B" strokeWidth="1.5" fill="none" />

      {/* Live indicator */}
      <motion.circle
        cx="340"
        cy="115"
        r="5"
        fill="#EF4444"
        animate={animate ? { opacity: [1, 0.3, 1] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <text x="333" y="130" fontSize="6" fill="#FFFFFF" fontWeight="bold">
        LIVE
      </text>

      {/* Chat bubbles */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      >
        <rect x="255" y="145" width="35" height="12" rx="4" fill="#FFFFFF" opacity="0.9" />
        <rect x="310" y="155" width="30" height="10" rx="4" fill="#10B981" opacity="0.9" />
      </motion.g>

      {/* Laptop base */}
      <rect x="230" y="180" width="140" height="8" rx="4" fill="#334155" />

      {/* Person at home */}
      <ellipse cx="300" cy="230" rx="25" ry="30" fill="#14B8A6" />
      <circle cx="300" cy="195" r="18" fill="#FBBF24" opacity="0.9" />
      <circle cx="295" cy="192" r="2" fill="#1E293B" />
      <circle cx="305" cy="192" r="2" fill="#1E293B" />
      <path d="M297 200 Q300 204 303 200" stroke="#1E293B" strokeWidth="1.5" fill="none" />

      {/* Home icon */}
      <path d="M360 220 L375 205 L390 220 L390 245 L360 245 Z" fill="#6366F1" opacity="0.3" />
      <rect x="370" y="230" width="10" height="15" fill="#6366F1" opacity="0.5" />

      {/* VS text */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="200" cy="150" r="20" fill="#EF4444" />
        <text x="200" y="155" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          VS
        </text>
      </motion.g>

      {/* Labels */}
      <text x="97" y="55" fontSize="11" fill="#B45309" textAnchor="middle" fontWeight="bold">
        Traditional Kota
      </text>
      <text x="302" y="55" fontSize="11" fill="#059669" textAnchor="middle" fontWeight="bold">
        Online Learning
      </text>

      {/* Floating elements */}
      <motion.circle
        cx="30"
        cy="50"
        r="8"
        fill="#F97316"
        opacity="0.4"
        animate={animate ? { y: [-5, 5, -5] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle
        cx="370"
        cy="60"
        r="6"
        fill="#14B8A6"
        opacity="0.4"
        animate={animate ? { y: [5, -5, 5] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </Wrapper>
  )
}

// 2. When to Start NEET Preparation - Timeline/Clock illustration
export function ClassStartTimeIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background timeline */}
      <rect x="50" y="140" width="300" height="8" rx="4" fill="#E2E8F0" />

      {/* Class 9 marker */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="100" cy="144" r="25" fill="#8B5CF6" />
        <text x="100" y="140" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Class
        </text>
        <text x="100" y="152" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          9
        </text>
      </motion.g>

      {/* Class 10 marker */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      >
        <circle cx="200" cy="144" r="25" fill="#3B82F6" />
        <text x="200" y="140" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Class
        </text>
        <text x="200" y="152" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          10
        </text>
      </motion.g>

      {/* Class 11 marker */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      >
        <circle cx="300" cy="144" r="25" fill="#14B8A6" />
        <text x="300" y="140" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Class
        </text>
        <text x="300" y="152" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          11
        </text>
      </motion.g>

      {/* Arrow */}
      <motion.path
        d="M330 144 L360 144 L350 134 M360 144 L350 154"
        stroke="#14B8A6"
        strokeWidth="3"
        fill="none"
        animate={animate ? { x: [0, 5, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Clock above timeline */}
      <motion.g
        animate={animate ? { rotate: [0, 360] } : undefined}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '200px 60px' }}
      >
        <circle cx="200" cy="60" r="40" fill="#FEF3C7" stroke="#F97316" strokeWidth="3" />
        <line x1="200" y1="60" x2="200" y2="35" stroke="#1E293B" strokeWidth="3" />
        <line x1="200" y1="60" x2="220" y2="60" stroke="#1E293B" strokeWidth="2" />
        <circle cx="200" cy="60" r="4" fill="#F97316" />
      </motion.g>

      {/* Clock numbers */}
      <text x="200" y="30" fontSize="8" fill="#1E293B" textAnchor="middle">
        12
      </text>
      <text x="235" y="63" fontSize="8" fill="#1E293B">
        3
      </text>
      <text x="200" y="95" fontSize="8" fill="#1E293B" textAnchor="middle">
        6
      </text>
      <text x="163" y="63" fontSize="8" fill="#1E293B">
        9
      </text>

      {/* Students at different stages */}
      {/* Student 1 - Class 9 */}
      <g transform="translate(80, 180)">
        <circle cx="20" cy="15" r="12" fill="#FBBF24" />
        <rect x="12" y="30" width="16" height="25" rx="4" fill="#8B5CF6" />
        <text x="20" y="75" fontSize="8" fill="#64748B" textAnchor="middle">
          Foundation
        </text>
      </g>

      {/* Student 2 - Class 10 */}
      <g transform="translate(180, 180)">
        <circle cx="20" cy="15" r="12" fill="#FBBF24" />
        <rect x="12" y="30" width="16" height="25" rx="4" fill="#3B82F6" />
        <text x="20" y="75" fontSize="8" fill="#64748B" textAnchor="middle">
          Build-up
        </text>
      </g>

      {/* Student 3 - Class 11 */}
      <g transform="translate(280, 180)">
        <circle cx="20" cy="15" r="12" fill="#FBBF24" />
        <rect x="12" y="30" width="16" height="25" rx="4" fill="#14B8A6" />
        <text x="20" y="75" fontSize="8" fill="#64748B" textAnchor="middle">
          Intensive
        </text>
      </g>

      {/* Recommendation badge */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="70" y="100" width="80" height="20" rx="10" fill="#10B981" />
        <text x="110" y="114" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ⭐ IDEAL START
        </text>
      </motion.g>

      {/* Decorative elements */}
      <motion.circle
        cx="40"
        cy="60"
        r="10"
        fill="#8B5CF6"
        opacity="0.3"
        animate={animate ? { scale: [1, 1.2, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle
        cx="360"
        cy="80"
        r="8"
        fill="#14B8A6"
        opacity="0.3"
        animate={animate ? { scale: [1.2, 1, 1.2] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </Wrapper>
  )
}

// 3. DPS Students NEET Preparation - School + NEET badge
export function DPSStudentIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background */}
      <rect x="20" y="20" width="360" height="260" rx="20" fill="#F0FDFA" opacity="0.5" />

      {/* DPS Logo/Badge */}
      <motion.g
        animate={animate ? { rotate: [-5, 5, -5] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '100px 80px' }}
      >
        <circle cx="100" cy="80" r="45" fill="#1E40AF" />
        <circle cx="100" cy="80" r="38" fill="#FFFFFF" />
        <circle cx="100" cy="80" r="32" fill="#1E40AF" />
        <text x="100" y="75" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          DPS
        </text>
        <text x="100" y="90" fontSize="7" fill="#FFFFFF" textAnchor="middle">
          Student
        </text>
      </motion.g>

      {/* Plus sign */}
      <motion.g
        animate={animate ? { scale: [1, 1.2, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <text x="175" y="90" fontSize="40" fill="#14B8A6" fontWeight="bold">
          +
        </text>
      </motion.g>

      {/* NEET Badge */}
      <motion.g
        animate={animate ? { rotate: [5, -5, 5] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '280px 80px' }}
      >
        <circle cx="280" cy="80" r="45" fill="#14B8A6" />
        <circle cx="280" cy="80" r="38" fill="#FFFFFF" />
        <circle cx="280" cy="80" r="32" fill="#14B8A6" />
        <text x="280" y="75" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          NEET
        </text>
        <text x="280" y="90" fontSize="7" fill="#FFFFFF" textAnchor="middle">
          2026
        </text>
      </motion.g>

      {/* Success arrow */}
      <motion.path
        d="M190 150 L190 200 L210 180"
        stroke="#10B981"
        strokeWidth="4"
        fill="none"
        animate={animate ? { strokeDashoffset: [20, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
        strokeDasharray="20"
      />

      {/* Student with books */}
      <g transform="translate(120, 160)">
        <ellipse cx="70" cy="80" rx="35" ry="45" fill="#6366F1" />
        <circle cx="70" cy="35" r="28" fill="#FBBF24" />
        <circle cx="62" cy="30" r="3" fill="#1E293B" />
        <circle cx="78" cy="30" r="3" fill="#1E293B" />
        <path d="M65 42 Q70 48 75 42" stroke="#1E293B" strokeWidth="2" fill="none" />

        {/* School uniform detail */}
        <rect x="55" y="55" width="30" height="5" fill="#FFFFFF" />

        {/* Books in hand */}
        <motion.g
          animate={animate ? { rotate: [-5, 5, -5] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '120px 90px' }}
        >
          <rect x="110" y="70" width="40" height="8" rx="2" fill="#14B8A6" />
          <rect x="112" y="62" width="38" height="8" rx="2" fill="#3B82F6" />
          <rect x="114" y="54" width="36" height="8" rx="2" fill="#F97316" />
        </motion.g>
      </g>

      {/* Result badge */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="280" y="200" width="90" height="40" rx="8" fill="#10B981" />
        <text x="325" y="218" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          Success Rate
        </text>
        <text x="325" y="232" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          94%+
        </text>
      </motion.g>

      {/* Decorative stars */}
      <motion.text
        x="50"
        y="180"
        fontSize="20"
        animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ⭐
      </motion.text>
      <motion.text
        x="350"
        y="150"
        fontSize="16"
        animate={animate ? { opacity: [1, 0.5, 1] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        ⭐
      </motion.text>
    </Wrapper>
  )
}

// 4. Top 10 Coaching Centers - Building/Institute grid
export function CoachingCenterIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Grid background */}
      <rect x="20" y="20" width="360" height="260" rx="16" fill="#EDE9FE" opacity="0.3" />

      {/* Top 10 badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="200" cy="45" r="30" fill="#F97316" />
        <text x="200" y="42" fontSize="10" fill="#FFFFFF" textAnchor="middle">
          TOP
        </text>
        <text x="200" y="55" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          10
        </text>
      </motion.g>

      {/* Building 1 - Gold (1st place) */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="60" y="90" width="60" height="80" rx="6" fill="#F59E0B" />
        <rect x="70" y="100" width="15" height="15" rx="2" fill="#FEF3C7" />
        <rect x="95" y="100" width="15" height="15" rx="2" fill="#FEF3C7" />
        <rect x="70" y="125" width="15" height="15" rx="2" fill="#FEF3C7" />
        <rect x="95" y="125" width="15" height="15" rx="2" fill="#FEF3C7" />
        <rect x="80" y="150" width="20" height="20" rx="2" fill="#78350F" />
        <text x="90" y="85" fontSize="20" textAnchor="middle">
          🥇
        </text>
      </motion.g>

      {/* Building 2 - Silver */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      >
        <rect x="140" y="100" width="55" height="70" rx="6" fill="#9CA3AF" />
        <rect x="150" y="110" width="12" height="12" rx="2" fill="#F3F4F6" />
        <rect x="170" y="110" width="12" height="12" rx="2" fill="#F3F4F6" />
        <rect x="150" y="130" width="12" height="12" rx="2" fill="#F3F4F6" />
        <rect x="170" y="130" width="12" height="12" rx="2" fill="#F3F4F6" />
        <rect x="157" y="150" width="18" height="20" rx="2" fill="#4B5563" />
        <text x="167" y="95" fontSize="18" textAnchor="middle">
          🥈
        </text>
      </motion.g>

      {/* Building 3 - Bronze */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
      >
        <rect x="215" y="105" width="50" height="65" rx="6" fill="#B45309" />
        <rect x="223" y="115" width="12" height="12" rx="2" fill="#FEF3C7" />
        <rect x="243" y="115" width="12" height="12" rx="2" fill="#FEF3C7" />
        <rect x="223" y="135" width="12" height="12" rx="2" fill="#FEF3C7" />
        <rect x="243" y="135" width="12" height="12" rx="2" fill="#FEF3C7" />
        <rect x="230" y="153" width="16" height="17" rx="2" fill="#78350F" />
        <text x="240" y="100" fontSize="16" textAnchor="middle">
          🥉
        </text>
      </motion.g>

      {/* More buildings (4-10) smaller */}
      {[285, 310, 335].map((x, i) => (
        <motion.rect
          key={i}
          x={x}
          y={120}
          width="20"
          height="50"
          rx="3"
          fill="#6366F1"
          opacity={0.7 - i * 0.15}
          animate={animate ? { y: [-1, 1, -1] } : undefined}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 + i * 0.1 }}
        />
      ))}

      {/* Cerebrum highlighted */}
      <motion.g
        animate={animate ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <rect x="40" y="190" width="140" height="60" rx="8" fill="#14B8A6" />
        <text x="110" y="215" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          CEREBRUM
        </text>
        <text x="110" y="230" fontSize="8" fill="#D1FAE5" textAnchor="middle">
          Biology Academy
        </text>
        <text x="110" y="243" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          ⭐ 98% Success Rate
        </text>
      </motion.g>

      {/* Location pin */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <path
          d="M300 200 C300 185 285 180 285 195 C285 205 300 215 300 215 C300 215 315 205 315 195 C315 180 300 185 300 200"
          fill="#EF4444"
        />
        <circle cx="300" cy="195" r="5" fill="#FFFFFF" />
        <text x="300" y="240" fontSize="8" fill="#64748B" textAnchor="middle">
          Delhi NCR
        </text>
      </motion.g>

      {/* Stars decoration */}
      <motion.circle
        cx="360"
        cy="50"
        r="6"
        fill="#F97316"
        opacity="0.5"
        animate={animate ? { scale: [1, 1.3, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </Wrapper>
  )
}

// 5. Best Books for NEET - Physics, Chemistry, Biology stack
export function BooksForNEETIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Shadow */}
      <ellipse cx="200" cy="250" rx="150" ry="15" fill="#E8F4FC" />

      {/* Physics Books Stack */}
      <motion.g
        animate={animate ? { y: [0, -3, 0] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <rect x="40" y="160" width="90" height="25" rx="4" fill="#3B82F6" />
        <rect x="45" y="165" width="5" height="15" fill="#1D4ED8" />
        <text x="60" y="177" fontSize="8" fill="#FFFFFF" fontWeight="bold">
          HC Verma
        </text>

        <rect x="45" y="135" width="85" height="23" rx="4" fill="#60A5FA" />
        <rect x="50" y="140" width="5" height="13" fill="#3B82F6" />
        <text x="65" y="151" fontSize="7" fill="#FFFFFF" fontWeight="bold">
          DC Pandey
        </text>

        <text x="85" y="125" fontSize="10" fill="#1E40AF" textAnchor="middle" fontWeight="bold">
          Physics
        </text>
        <text x="85" y="115" fontSize="16" textAnchor="middle">
          ⚡
        </text>
      </motion.g>

      {/* Chemistry Books Stack */}
      <motion.g
        animate={animate ? { y: [0, -3, 0] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
      >
        <rect x="155" y="150" width="90" height="25" rx="4" fill="#F97316" />
        <rect x="160" y="155" width="5" height="15" fill="#EA580C" />
        <text x="180" y="167" fontSize="7" fill="#FFFFFF" fontWeight="bold">
          NCERT Chem
        </text>

        <rect x="160" y="125" width="85" height="23" rx="4" fill="#FB923C" />
        <rect x="165" y="130" width="5" height="13" fill="#F97316" />
        <text x="182" y="141" fontSize="7" fill="#FFFFFF" fontWeight="bold">
          OP Tandon
        </text>

        <rect x="158" y="102" width="82" height="21" rx="4" fill="#FDBA74" />
        <rect x="163" y="106" width="5" height="13" fill="#FB923C" />
        <text x="180" y="117" fontSize="6" fill="#7C2D12" fontWeight="bold">
          MS Chauhan
        </text>

        <text x="200" y="90" fontSize="10" fill="#C2410C" textAnchor="middle" fontWeight="bold">
          Chemistry
        </text>
        <text x="200" y="80" fontSize="16" textAnchor="middle">
          ⚗️
        </text>
      </motion.g>

      {/* Biology Books Stack - Highlighted */}
      <motion.g
        animate={animate ? { y: [0, -4, 0], scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      >
        <rect x="270" y="140" width="95" height="28" rx="4" fill="#14B8A6" />
        <rect x="275" y="146" width="6" height="16" fill="#0D9488" />
        <text x="295" y="159" fontSize="8" fill="#FFFFFF" fontWeight="bold">
          NCERT Bio
        </text>

        <rect x="275" y="112" width="90" height="26" rx="4" fill="#2DD4BF" />
        <rect x="280" y="117" width="5" height="16" fill="#14B8A6" />
        <text x="300" y="130" fontSize="7" fill="#FFFFFF" fontWeight="bold">
          Fingertips
        </text>

        <rect x="278" y="86" width="85" height="24" rx="4" fill="#5EEAD4" />
        <rect x="283" y="91" width="5" height="14" fill="#2DD4BF" />
        <text x="300" y="102" fontSize="7" fill="#0F766E" fontWeight="bold">
          Trueman
        </text>

        <rect x="280" y="62" width="80" height="22" rx="4" fill="#99F6E4" />
        <rect x="285" y="66" width="5" height="14" fill="#5EEAD4" />
        <text x="298" y="77" fontSize="6" fill="#0F766E" fontWeight="bold">
          Dinesh
        </text>

        <text x="320" y="50" fontSize="10" fill="#0F766E" textAnchor="middle" fontWeight="bold">
          Biology
        </text>
        <text x="320" y="40" fontSize="16" textAnchor="middle">
          🧬
        </text>

        {/* Star highlight for Biology */}
        <motion.circle
          cx="375"
          cy="100"
          r="15"
          fill="#FCD34D"
          opacity="0.8"
          animate={animate ? { scale: [1, 1.2, 1] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <text x="375" y="105" fontSize="12" textAnchor="middle">
          ⭐
        </text>
      </motion.g>

      {/* Floor line */}
      <rect x="30" y="185" width="340" height="3" rx="1" fill="#CBD5E1" />

      {/* Bookshelf supports */}
      <rect x="30" y="188" width="8" height="50" fill="#78716C" />
      <rect x="362" y="188" width="8" height="50" fill="#78716C" />

      {/* Best Books badge */}
      <motion.g
        animate={animate ? { rotate: [-5, 5, -5] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '200px 220px' }}
      >
        <rect x="140" y="205" width="120" height="35" rx="17" fill="#EF4444" />
        <text x="200" y="220" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          NEET 2026
        </text>
        <text x="200" y="232" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Must-Have Books
        </text>
      </motion.g>

      {/* Floating elements */}
      <motion.circle
        cx="30"
        cy="60"
        r="8"
        fill="#3B82F6"
        opacity="0.4"
        animate={animate ? { y: [-5, 5, -5] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle
        cx="140"
        cy="40"
        r="6"
        fill="#F97316"
        opacity="0.4"
        animate={animate ? { y: [5, -5, 5] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </Wrapper>
  )
}

// 6. Common Mistakes NEET Aspirants - Warning signs illustration
export function MistakesToAvoidIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background */}
      <rect x="20" y="20" width="360" height="240" rx="16" fill="#FEF2F2" opacity="0.5" />

      {/* Warning triangle */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path d="M200 40 L260 140 L140 140 Z" fill="#FCD34D" stroke="#F97316" strokeWidth="3" />
        <text x="200" y="115" fontSize="40" textAnchor="middle" fill="#1E293B">
          !
        </text>
      </motion.g>

      {/* Mistake 1 - No revision */}
      <motion.g
        animate={animate ? { x: [-2, 2, -2] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <circle cx="80" cy="180" r="30" fill="#EF4444" opacity="0.2" />
        <circle cx="80" cy="180" r="22" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
        <line x1="65" y1="165" x2="95" y2="195" stroke="#EF4444" strokeWidth="3" />
        <text x="80" y="225" fontSize="8" fill="#7F1D1D" textAnchor="middle">
          No Revision
        </text>
      </motion.g>

      {/* Mistake 2 - Skipping NCERT */}
      <motion.g
        animate={animate ? { x: [2, -2, 2] } : undefined}
        transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
      >
        <circle cx="160" cy="200" r="30" fill="#EF4444" opacity="0.2" />
        <circle cx="160" cy="200" r="22" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
        <rect x="150" y="190" width="20" height="15" rx="2" fill="#14B8A6" />
        <line x1="145" y1="185" x2="175" y2="215" stroke="#EF4444" strokeWidth="3" />
        <text x="160" y="245" fontSize="8" fill="#7F1D1D" textAnchor="middle">
          Skip NCERT
        </text>
      </motion.g>

      {/* Mistake 3 - Too many books */}
      <motion.g
        animate={animate ? { x: [-2, 2, -2] } : undefined}
        transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
      >
        <circle cx="240" cy="200" r="30" fill="#EF4444" opacity="0.2" />
        <circle cx="240" cy="200" r="22" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
        <rect x="228" y="192" width="8" height="12" rx="1" fill="#3B82F6" />
        <rect x="238" y="190" width="8" height="14" rx="1" fill="#8B5CF6" />
        <rect x="248" y="193" width="8" height="11" rx="1" fill="#F97316" />
        <line x1="225" y1="185" x2="255" y2="215" stroke="#EF4444" strokeWidth="3" />
        <text x="240" y="245" fontSize="8" fill="#7F1D1D" textAnchor="middle">
          Too Many Books
        </text>
      </motion.g>

      {/* Mistake 4 - No mock tests */}
      <motion.g
        animate={animate ? { x: [2, -2, 2] } : undefined}
        transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}
      >
        <circle cx="320" cy="180" r="30" fill="#EF4444" opacity="0.2" />
        <circle cx="320" cy="180" r="22" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
        <rect x="308" y="170" width="24" height="18" rx="2" fill="#E2E8F0" />
        <text x="320" y="182" fontSize="8" fill="#64748B" textAnchor="middle">
          TEST
        </text>
        <line x1="305" y1="165" x2="335" y2="195" stroke="#EF4444" strokeWidth="3" />
        <text x="320" y="225" fontSize="8" fill="#7F1D1D" textAnchor="middle">
          No Mocks
        </text>
      </motion.g>

      {/* Correct way badge */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="280" y="50" width="100" height="35" rx="8" fill="#10B981" />
        <text x="330" y="65" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          Learn the
        </text>
        <text x="330" y="78" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          RIGHT WAY →
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 7. Last 6 Months Strategy - Calendar/countdown illustration
export function Last6MonthsStrategyIllustration({
  className = '',
  animate = true,
}: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Calendar base */}
      <rect
        x="50"
        y="50"
        width="180"
        height="180"
        rx="12"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="2"
      />
      <rect x="50" y="50" width="180" height="40" rx="12" fill="#EF4444" />
      <text x="140" y="78" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
        6 MONTHS LEFT
      </text>

      {/* Calendar grid */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <motion.rect
            key={`${row}-${col}`}
            x={60 + col * 28}
            y={100 + row * 25}
            width={24}
            height={22}
            rx={4}
            fill={row < 2 ? '#10B981' : row < 4 ? '#3B82F6' : '#8B5CF6'}
            opacity={0.3 + (row + col) * 0.05}
            animate={
              animate
                ? { opacity: [0.3 + (row + col) * 0.05, 0.7, 0.3 + (row + col) * 0.05] }
                : undefined
            }
            transition={{ duration: 2, repeat: Infinity, delay: (row + col) * 0.1 }}
          />
        ))
      )}

      {/* Strategy timeline on right */}
      <g transform="translate(250, 60)">
        {/* Month 1-2 */}
        <motion.g
          animate={animate ? { x: [-2, 2, -2] } : undefined}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <rect x="0" y="0" width="120" height="45" rx="8" fill="#10B981" opacity="0.2" />
          <circle cx="20" cy="22" r="12" fill="#10B981" />
          <text x="20" y="27" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            1-2
          </text>
          <text x="45" y="18" fontSize="9" fill="#065F46" fontWeight="bold">
            Foundation
          </text>
          <text x="45" y="32" fontSize="7" fill="#047857">
            Complete Syllabus
          </text>
        </motion.g>

        {/* Month 3-4 */}
        <motion.g
          animate={animate ? { x: [2, -2, 2] } : undefined}
          transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
        >
          <rect x="0" y="55" width="120" height="45" rx="8" fill="#3B82F6" opacity="0.2" />
          <circle cx="20" cy="77" r="12" fill="#3B82F6" />
          <text x="20" y="82" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            3-4
          </text>
          <text x="45" y="73" fontSize="9" fill="#1E40AF" fontWeight="bold">
            Practice
          </text>
          <text x="45" y="87" fontSize="7" fill="#1D4ED8">
            MCQs + Mocks
          </text>
        </motion.g>

        {/* Month 5-6 */}
        <motion.g
          animate={animate ? { x: [-2, 2, -2] } : undefined}
          transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
        >
          <rect x="0" y="110" width="120" height="45" rx="8" fill="#8B5CF6" opacity="0.2" />
          <circle cx="20" cy="132" r="12" fill="#8B5CF6" />
          <text x="20" y="137" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            5-6
          </text>
          <text x="45" y="128" fontSize="9" fill="#5B21B6" fontWeight="bold">
            Revision
          </text>
          <text x="45" y="142" fontSize="7" fill="#6D28D9">
            Quick Recalls
          </text>
        </motion.g>
      </g>

      {/* Countdown timer */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <rect x="100" y="235" width="200" height="35" rx="17" fill="#1E293B" />
        <text x="200" y="258" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ⏰ 180 DAYS TO NEET 2026
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 8. Mock Test Strategy - Test paper with timer
export function MockTestIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background */}
      <rect x="20" y="20" width="360" height="240" rx="16" fill="#EDE9FE" opacity="0.3" />

      {/* Test paper */}
      <rect
        x="60"
        y="50"
        width="160"
        height="200"
        rx="8"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="2"
      />

      {/* Paper header */}
      <rect x="70" y="60" width="140" height="25" rx="4" fill="#6366F1" />
      <text x="140" y="78" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
        MOCK TEST - 01
      </text>

      {/* Questions */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.g
          key={i}
          animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        >
          <circle cx="80" cy={100 + i * 28} r="8" fill={i < 3 ? '#10B981' : '#E2E8F0'} />
          <text x="80" y={104 + i * 28} fontSize="8" fill="#FFFFFF" textAnchor="middle">
            {i + 1}
          </text>
          <rect
            x="95"
            y={95 + i * 28}
            width="110"
            height="8"
            rx="2"
            fill={i < 3 ? '#D1FAE5' : '#F1F5F9'}
          />
        </motion.g>
      ))}

      {/* Timer */}
      <motion.g
        animate={animate ? { rotate: [0, 360] } : undefined}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '300px 100px' }}
      >
        <circle cx="300" cy="100" r="50" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="4" />
        <line x1="300" y1="100" x2="300" y2="65" stroke="#1E293B" strokeWidth="3" />
        <line x1="300" y1="100" x2="330" y2="100" stroke="#EF4444" strokeWidth="2" />
        <circle cx="300" cy="100" r="5" fill="#3B82F6" />
      </motion.g>

      {/* Timer text */}
      <text x="300" y="165" fontSize="12" fill="#1E293B" textAnchor="middle" fontWeight="bold">
        3:20:00
      </text>
      <text x="300" y="180" fontSize="8" fill="#64748B" textAnchor="middle">
        Time Remaining
      </text>

      {/* Score card */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="250" y="195" width="100" height="55" rx="8" fill="#10B981" />
        <text x="300" y="215" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          Target Score
        </text>
        <text x="300" y="238" fontSize="20" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          650+
        </text>
      </motion.g>

      {/* Strategy tips */}
      <g transform="translate(250, 50)">
        <text x="50" y="0" fontSize="9" fill="#4F46E5" textAnchor="middle" fontWeight="bold">
          STRATEGY
        </text>
        <motion.circle
          cx="20"
          cy="20"
          r="6"
          fill="#10B981"
          animate={animate ? { scale: [1, 1.3, 1] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <text x="35" y="24" fontSize="7" fill="#374151">
          Weekly mocks
        </text>
        <motion.circle
          cx="20"
          cy="40"
          r="6"
          fill="#3B82F6"
          animate={animate ? { scale: [1, 1.3, 1] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <text x="35" y="44" fontSize="7" fill="#374151">
          Analyze errors
        </text>
      </g>
    </Wrapper>
  )
}

// 9. NCERT Reading Strategy - Open book with highlighter
export function NCERTReadingIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Open book - left page */}
      <path d="M200 50 L40 70 L40 230 L200 210 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      {/* Open book - right page */}
      <path
        d="M200 50 L360 70 L360 230 L200 210 Z"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="2"
      />
      {/* Book spine */}
      <rect x="195" y="50" width="10" height="160" fill="#14B8A6" />

      {/* Left page content - Class 11 */}
      <text x="120" y="90" fontSize="10" fill="#14B8A6" textAnchor="middle" fontWeight="bold">
        Class 11
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={`left-${i}`}
          x="55"
          y={105 + i * 22}
          width={100 - i * 10}
          height="8"
          rx="2"
          fill={i === 1 ? '#FCD34D' : '#E2E8F0'}
          animate={animate && i === 1 ? { opacity: [0.5, 1, 0.5] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      ))}

      {/* Right page content - Class 12 */}
      <text x="280" y="90" fontSize="10" fill="#8B5CF6" textAnchor="middle" fontWeight="bold">
        Class 12
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={`right-${i}`}
          x="215"
          y={105 + i * 22}
          width={100 - i * 10}
          height="8"
          rx="2"
          fill={i === 2 ? '#FCD34D' : '#E2E8F0'}
          animate={animate && i === 2 ? { opacity: [0.5, 1, 0.5] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
      ))}

      {/* Highlighter */}
      <motion.g
        animate={animate ? { x: [-5, 20, -5], rotate: [-10, 10, -10] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '320px 150px' }}
      >
        <rect x="310" y="140" width="60" height="15" rx="3" fill="#FCD34D" />
        <rect x="365" y="143" width="15" height="9" rx="2" fill="#FBBF24" />
        <rect x="310" y="143" width="8" height="9" fill="#F59E0B" />
      </motion.g>

      {/* NCERT badge */}
      <motion.g
        animate={animate ? { rotate: [-5, 5, -5] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '80px 240px' }}
      >
        <rect x="40" y="225" width="80" height="35" rx="8" fill="#14B8A6" />
        <text x="80" y="243" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          NCERT
        </text>
        <text x="80" y="255" fontSize="7" fill="#D1FAE5" textAnchor="middle">
          Biology
        </text>
      </motion.g>

      {/* Reading tips */}
      <g transform="translate(280, 225)">
        <rect x="0" y="0" width="100" height="40" rx="8" fill="#EDE9FE" />
        <text x="50" y="15" fontSize="7" fill="#6366F1" textAnchor="middle" fontWeight="bold">
          3 READINGS
        </text>
        <text x="50" y="28" fontSize="6" fill="#7C3AED" textAnchor="middle">
          1. Understand 2. Mark
        </text>
        <text x="50" y="38" fontSize="6" fill="#7C3AED" textAnchor="middle">
          3. Memorize
        </text>
      </g>
    </Wrapper>
  )
}

// 10. NEET 2026 Complete Guide - Exam paper with medal
export function NEET2026GuideIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background badge */}
      <ellipse cx="200" cy="140" rx="150" ry="120" fill="#F0FDFA" opacity="0.5" />

      {/* NEET 2026 text */}
      <motion.g
        animate={animate ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="120" y="30" width="160" height="50" rx="25" fill="#14B8A6" />
        <text x="200" y="52" fontSize="12" fill="#FFFFFF" textAnchor="middle">
          NEET
        </text>
        <text x="200" y="70" fontSize="18" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          2026
        </text>
      </motion.g>

      {/* Exam paper */}
      <rect
        x="80"
        y="95"
        width="130"
        height="160"
        rx="8"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="2"
      />
      <rect x="90" y="105" width="110" height="20" rx="4" fill="#3B82F6" />
      <text x="145" y="120" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
        QUESTION PAPER
      </text>

      {/* Paper content */}
      <text x="100" y="145" fontSize="8" fill="#374151">
        Physics: 45 Qs
      </text>
      <text x="100" y="160" fontSize="8" fill="#374151">
        Chemistry: 45 Qs
      </text>
      <text x="100" y="175" fontSize="8" fill="#14B8A6" fontWeight="bold">
        Biology: 90 Qs
      </text>
      <rect x="90" y="185" width="110" height="1" fill="#E2E8F0" />
      <text x="100" y="200" fontSize="8" fill="#1E293B" fontWeight="bold">
        Total: 180 Qs
      </text>
      <text x="100" y="215" fontSize="8" fill="#1E293B" fontWeight="bold">
        Marks: 720
      </text>
      <text x="100" y="230" fontSize="8" fill="#64748B">
        Time: 3 hrs 20 min
      </text>

      {/* Medal */}
      <motion.g
        animate={animate ? { y: [-5, 5, -5], rotate: [-5, 5, -5] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '300px 180px' }}
      >
        <path d="M300 120 L290 140 L300 135 L310 140 Z" fill="#F97316" />
        <circle cx="300" cy="180" r="45" fill="#FCD34D" stroke="#F97316" strokeWidth="3" />
        <circle cx="300" cy="180" r="35" fill="#FBBF24" />
        <text x="300" y="175" fontSize="10" fill="#78350F" textAnchor="middle">
          AIR
        </text>
        <text x="300" y="192" fontSize="16" fill="#78350F" textAnchor="middle" fontWeight="bold">
          TOP
        </text>
        <text x="300" y="205" fontSize="8" fill="#92400E" textAnchor="middle">
          100
        </text>
      </motion.g>

      {/* Syllabus completion */}
      <motion.g
        animate={animate ? { x: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="240" y="240" width="130" height="30" rx="6" fill="#10B981" />
        <text x="305" y="260" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Complete Guide Inside →
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 11. Toppers Secrets - Trophy with light bulb
export function ToppersSecretsIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background glow */}
      <ellipse cx="200" cy="150" rx="160" ry="120" fill="#FEF3C7" opacity="0.3" />

      {/* Trophy */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Trophy cup */}
        <path d="M150 100 L160 180 L240 180 L250 100 Z" fill="#FCD34D" />
        <ellipse cx="200" cy="100" rx="50" ry="15" fill="#FBBF24" />
        {/* Trophy handles */}
        <path d="M150 120 C120 120 120 160 150 160" stroke="#F59E0B" strokeWidth="8" fill="none" />
        <path d="M250 120 C280 120 280 160 250 160" stroke="#F59E0B" strokeWidth="8" fill="none" />
        {/* Trophy base */}
        <rect x="175" y="180" width="50" height="15" fill="#F59E0B" />
        <rect x="160" y="195" width="80" height="10" rx="2" fill="#D97706" />
        <rect x="150" y="205" width="100" height="15" rx="4" fill="#92400E" />

        {/* Star on trophy */}
        <motion.text
          x="200"
          y="150"
          fontSize="30"
          textAnchor="middle"
          animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ⭐
        </motion.text>
      </motion.g>

      {/* Light bulbs - secrets */}
      <motion.g
        animate={animate ? { opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="80" cy="80" r="25" fill="#FCD34D" />
        <rect x="72" y="105" width="16" height="10" fill="#94A3B8" />
        <text x="80" y="85" fontSize="20" textAnchor="middle">
          💡
        </text>
        <text x="80" y="130" fontSize="7" fill="#78350F" textAnchor="middle">
          Secret 1
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <circle cx="320" cy="80" r="25" fill="#FCD34D" />
        <rect x="312" y="105" width="16" height="10" fill="#94A3B8" />
        <text x="320" y="85" fontSize="20" textAnchor="middle">
          💡
        </text>
        <text x="320" y="130" fontSize="7" fill="#78350F" textAnchor="middle">
          Secret 2
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <circle cx="80" cy="200" r="25" fill="#FCD34D" />
        <rect x="72" y="225" width="16" height="10" fill="#94A3B8" />
        <text x="80" y="205" fontSize="20" textAnchor="middle">
          💡
        </text>
        <text x="80" y="250" fontSize="7" fill="#78350F" textAnchor="middle">
          Secret 3
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      >
        <circle cx="320" cy="200" r="25" fill="#FCD34D" />
        <rect x="312" y="225" width="16" height="10" fill="#94A3B8" />
        <text x="320" y="205" fontSize="20" textAnchor="middle">
          💡
        </text>
        <text x="320" y="250" fontSize="7" fill="#78350F" textAnchor="middle">
          Secret 4
        </text>
      </motion.g>

      {/* Toppers badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="145" y="235" width="110" height="30" rx="15" fill="#6366F1" />
        <text x="200" y="255" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          🏆 TOPPERS SECRETS
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 12. Chapter Weightage - Pie chart style
export function ChapterWeightageIllustration({
  className = '',
  animate = true,
}: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, rotate: -10 },
        animate: { opacity: 1, rotate: 0 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Pie chart */}
      <motion.g
        animate={animate ? { rotate: [0, 5, 0] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '150px 140px' }}
      >
        {/* Human Physiology - 20% */}
        <path d="M150 140 L150 50 A90 90 0 0 1 227 95 Z" fill="#EF4444" />
        {/* Genetics - 18% */}
        <path d="M150 140 L227 95 A90 90 0 0 1 240 140 Z" fill="#F97316" />
        {/* Ecology - 12% */}
        <path d="M150 140 L240 140 A90 90 0 0 1 210 210 Z" fill="#14B8A6" />
        {/* Reproduction - 12% */}
        <path d="M150 140 L210 210 A90 90 0 0 1 120 220 Z" fill="#3B82F6" />
        {/* Cell Biology - 10% */}
        <path d="M150 140 L120 220 A90 90 0 0 1 60 160 Z" fill="#8B5CF6" />
        {/* Others - 28% */}
        <path d="M150 140 L60 160 A90 90 0 0 1 150 50 Z" fill="#6366F1" />
      </motion.g>

      {/* Legend */}
      <g transform="translate(260, 40)">
        <rect x="0" y="0" width="12" height="12" rx="2" fill="#EF4444" />
        <text x="18" y="10" fontSize="8" fill="#374151">
          Human Physiology 20%
        </text>

        <rect x="0" y="20" width="12" height="12" rx="2" fill="#F97316" />
        <text x="18" y="30" fontSize="8" fill="#374151">
          Genetics 18%
        </text>

        <rect x="0" y="40" width="12" height="12" rx="2" fill="#14B8A6" />
        <text x="18" y="50" fontSize="8" fill="#374151">
          Ecology 12%
        </text>

        <rect x="0" y="60" width="12" height="12" rx="2" fill="#3B82F6" />
        <text x="18" y="70" fontSize="8" fill="#374151">
          Reproduction 12%
        </text>

        <rect x="0" y="80" width="12" height="12" rx="2" fill="#8B5CF6" />
        <text x="18" y="90" fontSize="8" fill="#374151">
          Cell Biology 10%
        </text>

        <rect x="0" y="100" width="12" height="12" rx="2" fill="#6366F1" />
        <text x="18" y="110" fontSize="8" fill="#374151">
          Others 28%
        </text>
      </g>

      {/* Center text */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="150" cy="140" r="35" fill="#FFFFFF" />
        <text x="150" y="135" fontSize="10" fill="#1E293B" textAnchor="middle">
          NEET
        </text>
        <text x="150" y="150" fontSize="12" fill="#14B8A6" textAnchor="middle" fontWeight="bold">
          Biology
        </text>
      </motion.g>

      {/* Questions breakdown */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="260"
          y="170"
          width="120"
          height="90"
          rx="8"
          fill="#F0FDFA"
          stroke="#14B8A6"
          strokeWidth="2"
        />
        <text x="320" y="190" fontSize="9" fill="#0F766E" textAnchor="middle" fontWeight="bold">
          Questions: 90
        </text>
        <text x="320" y="210" fontSize="8" fill="#374151" textAnchor="middle">
          Class 11: 40-45 Qs
        </text>
        <text x="320" y="225" fontSize="8" fill="#374151" textAnchor="middle">
          Class 12: 45-50 Qs
        </text>
        <text x="320" y="245" fontSize="9" fill="#14B8A6" textAnchor="middle" fontWeight="bold">
          Marks: 360
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 13. Human Physiology - Heart, Lungs, Brain systems
export function HumanPhysiologyIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="physiologyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FECACA" />
          <stop offset="100%" stopColor="#FEE2E2" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="380"
        height="280"
        rx="20"
        fill="url(#physiologyGradient)"
        opacity="0.3"
      />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#DC2626" textAnchor="middle" fontWeight="bold">
        Human Physiology - 20% Weightage
      </text>

      {/* Human body outline */}
      <ellipse cx="200" cy="75" rx="25" ry="28" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      <rect
        x="175"
        y="100"
        width="50"
        height="80"
        rx="10"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="2"
      />

      {/* Brain - animated */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse cx="200" cy="68" rx="18" ry="15" fill="#F472B6" />
        <path
          d="M185 68 Q192 60 200 68 Q208 60 215 68"
          stroke="#DB2777"
          strokeWidth="2"
          fill="none"
        />
        <path d="M188 72 Q200 78 212 72" stroke="#DB2777" strokeWidth="1.5" fill="none" />
        <text x="200" y="55" fontSize="7" fill="#1E293B" textAnchor="middle">
          Brain
        </text>
      </motion.g>

      {/* Heart - beating animation */}
      <motion.g
        animate={animate ? { scale: [1, 1.15, 1] } : undefined}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <path
          d="M200 120 L190 110 Q175 100 175 115 Q175 130 200 150 Q225 130 225 115 Q225 100 210 110 Z"
          fill="#EF4444"
          stroke="#DC2626"
          strokeWidth="2"
        />
        <text x="200" y="140" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Heart
        </text>
      </motion.g>

      {/* Lungs - breathing animation */}
      <motion.g
        animate={animate ? { scaleX: [1, 1.1, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '200px 130px' }}
      >
        {/* Left lung */}
        <ellipse
          cx="160"
          cy="130"
          rx="15"
          ry="25"
          fill="#60A5FA"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        {/* Right lung */}
        <ellipse
          cx="240"
          cy="130"
          rx="15"
          ry="25"
          fill="#60A5FA"
          stroke="#3B82F6"
          strokeWidth="2"
        />
      </motion.g>

      {/* System boxes around */}
      {/* Digestive System */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <rect
          x="20"
          y="80"
          width="70"
          height="60"
          rx="8"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <text x="55" y="100" fontSize="8" fill="#92400E" textAnchor="middle" fontWeight="bold">
          Digestive
        </text>
        <text x="55" y="112" fontSize="8" fill="#92400E" textAnchor="middle" fontWeight="bold">
          System
        </text>
        <path d="M35 125 Q55 135 75 125" stroke="#F59E0B" strokeWidth="2" fill="none" />
      </motion.g>

      {/* Circulatory System */}
      <motion.g
        animate={animate ? { y: [3, -3, 3] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <rect
          x="310"
          y="80"
          width="70"
          height="60"
          rx="8"
          fill="#FEE2E2"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text x="345" y="100" fontSize="8" fill="#991B1B" textAnchor="middle" fontWeight="bold">
          Circulatory
        </text>
        <text x="345" y="112" fontSize="8" fill="#991B1B" textAnchor="middle" fontWeight="bold">
          System
        </text>
        <motion.circle
          cx="345"
          cy="128"
          r="8"
          fill="#EF4444"
          animate={animate ? { scale: [1, 1.2, 1] } : undefined}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.g>

      {/* Respiratory System */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <rect
          x="20"
          y="160"
          width="70"
          height="60"
          rx="8"
          fill="#DBEAFE"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text x="55" y="180" fontSize="8" fill="#1E40AF" textAnchor="middle" fontWeight="bold">
          Respiratory
        </text>
        <text x="55" y="192" fontSize="8" fill="#1E40AF" textAnchor="middle" fontWeight="bold">
          System
        </text>
        <ellipse cx="55" cy="208" rx="12" ry="8" fill="#60A5FA" />
      </motion.g>

      {/* Excretory System */}
      <motion.g
        animate={animate ? { y: [2, -2, 2] } : undefined}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <rect
          x="310"
          y="160"
          width="70"
          height="60"
          rx="8"
          fill="#D1FAE5"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="345" y="180" fontSize="8" fill="#065F46" textAnchor="middle" fontWeight="bold">
          Excretory
        </text>
        <text x="345" y="192" fontSize="8" fill="#065F46" textAnchor="middle" fontWeight="bold">
          System
        </text>
        <path d="M335 205 Q345 215 355 205" stroke="#10B981" strokeWidth="2" fill="#6EE7B7" />
      </motion.g>

      {/* Nervous System */}
      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="120"
          y="200"
          width="70"
          height="50"
          rx="8"
          fill="#F3E8FF"
          stroke="#8B5CF6"
          strokeWidth="2"
        />
        <text x="155" y="218" fontSize="8" fill="#5B21B6" textAnchor="middle" fontWeight="bold">
          Nervous
        </text>
        <text x="155" y="230" fontSize="8" fill="#5B21B6" textAnchor="middle" fontWeight="bold">
          System
        </text>
        <path d="M140 238 L155 245 L170 238" stroke="#8B5CF6" strokeWidth="2" fill="none" />
      </motion.g>

      {/* Endocrine System */}
      <motion.g
        animate={animate ? { opacity: [1, 0.7, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <rect
          x="210"
          y="200"
          width="70"
          height="50"
          rx="8"
          fill="#FCE7F3"
          stroke="#EC4899"
          strokeWidth="2"
        />
        <text x="245" y="218" fontSize="8" fill="#9D174D" textAnchor="middle" fontWeight="bold">
          Endocrine
        </text>
        <text x="245" y="230" fontSize="8" fill="#9D174D" textAnchor="middle" fontWeight="bold">
          System
        </text>
        <circle cx="245" cy="242" r="5" fill="#F472B6" />
      </motion.g>

      {/* Questions info */}
      <rect
        x="140"
        y="260"
        width="120"
        height="30"
        rx="6"
        fill="#FFFFFF"
        stroke="#DC2626"
        strokeWidth="2"
      />
      <text x="200" y="280" fontSize="10" fill="#DC2626" textAnchor="middle" fontWeight="bold">
        18-20 Questions in NEET
      </text>
    </Wrapper>
  )
}

// 14. Genetics & Evolution - DNA Helix with chromosomes
export function GeneticsIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background */}
      <defs>
        <linearGradient id="geneticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="100%" stopColor="#EDE9FE" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="380"
        height="280"
        rx="20"
        fill="url(#geneticsGradient)"
        opacity="0.4"
      />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Genetics & Evolution - 18% Weightage
      </text>

      {/* DNA Double Helix - rotating */}
      <motion.g
        animate={animate ? { rotate: [0, 360] } : undefined}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '100px 160px' }}
      >
        {/* Left strand */}
        <path
          d="M60 60 Q80 90 60 120 Q40 150 60 180 Q80 210 60 240 Q40 270 60 290"
          stroke="#8B5CF6"
          strokeWidth="4"
          fill="none"
        />
        {/* Right strand */}
        <path
          d="M140 60 Q120 90 140 120 Q160 150 140 180 Q120 210 140 240 Q160 270 140 290"
          stroke="#A78BFA"
          strokeWidth="4"
          fill="none"
        />
        {/* Base pairs */}
        <line x1="60" y1="75" x2="140" y2="75" stroke="#EC4899" strokeWidth="3" />
        <line x1="60" y1="105" x2="140" y2="105" stroke="#10B981" strokeWidth="3" />
        <line x1="60" y1="135" x2="140" y2="135" stroke="#F59E0B" strokeWidth="3" />
        <line x1="60" y1="165" x2="140" y2="165" stroke="#3B82F6" strokeWidth="3" />
        <line x1="60" y1="195" x2="140" y2="195" stroke="#EC4899" strokeWidth="3" />
        <line x1="60" y1="225" x2="140" y2="225" stroke="#10B981" strokeWidth="3" />
        <line x1="60" y1="255" x2="140" y2="255" stroke="#F59E0B" strokeWidth="3" />
        {/* Base labels */}
        <text x="100" y="78" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          A-T
        </text>
        <text x="100" y="108" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          G-C
        </text>
        <text x="100" y="138" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          T-A
        </text>
        <text x="100" y="168" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          C-G
        </text>
      </motion.g>

      {/* Chromosomes */}
      <motion.g
        animate={animate ? { y: [-5, 5, -5] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <text x="280" y="70" fontSize="10" fill="#5B21B6" textAnchor="middle" fontWeight="bold">
          Chromosomes
        </text>
        {/* X chromosome */}
        <path
          d="M240 90 L260 140 M260 90 L240 140"
          stroke="#EC4899"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Y chromosome */}
        <path
          d="M290 90 L290 120 M280 130 L290 120 L300 130"
          stroke="#3B82F6"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <text x="250" y="155" fontSize="8" fill="#EC4899" textAnchor="middle">
          XX
        </text>
        <text x="290" y="155" fontSize="8" fill="#3B82F6" textAnchor="middle">
          XY
        </text>
      </motion.g>

      {/* Mendel's Laws box */}
      <motion.g
        animate={animate ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="200"
          y="170"
          width="180"
          height="70"
          rx="10"
          fill="#FFFFFF"
          stroke="#8B5CF6"
          strokeWidth="2"
        />
        <text x="290" y="190" fontSize="9" fill="#5B21B6" textAnchor="middle" fontWeight="bold">
          Mendel's Laws
        </text>
        <text x="290" y="205" fontSize="7" fill="#6B7280" textAnchor="middle">
          Law of Segregation
        </text>
        <text x="290" y="218" fontSize="7" fill="#6B7280" textAnchor="middle">
          Law of Independent Assortment
        </text>
        <text x="290" y="231" fontSize="7" fill="#6B7280" textAnchor="middle">
          Law of Dominance
        </text>
      </motion.g>

      {/* Evolution Darwin */}
      <motion.g
        animate={animate ? { x: [-3, 3, -3] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <rect
          x="200"
          y="250"
          width="180"
          height="35"
          rx="8"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <text x="290" y="268" fontSize="8" fill="#92400E" textAnchor="middle" fontWeight="bold">
          Evolution: Darwin's Theory
        </text>
        <text x="290" y="280" fontSize="7" fill="#92400E" textAnchor="middle">
          Natural Selection • Adaptation
        </text>
      </motion.g>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="100" cy="290" r="20" fill="#7C3AED" />
        <text x="100" y="287" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          16-18
        </text>
        <text x="100" y="297" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Questions
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 15. Ecology & Environment - Ecosystem illustration
export function EcologyIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Sky background */}
      <rect x="10" y="10" width="380" height="180" rx="20" fill="#BFDBFE" />
      {/* Ground */}
      <rect x="10" y="180" width="380" height="110" rx="20" fill="#86EFAC" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#065F46" textAnchor="middle" fontWeight="bold">
        Ecology & Environment - 12% Weightage
      </text>

      {/* Sun with rays */}
      <motion.g
        animate={animate ? { rotate: [0, 360] } : undefined}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '350px 70px' }}
      >
        <circle cx="350" cy="70" r="25" fill="#FCD34D" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={350 + 30 * Math.cos((angle * Math.PI) / 180)}
            y1={70 + 30 * Math.sin((angle * Math.PI) / 180)}
            x2={350 + 40 * Math.cos((angle * Math.PI) / 180)}
            y2={70 + 40 * Math.sin((angle * Math.PI) / 180)}
            stroke="#F59E0B"
            strokeWidth="3"
          />
        ))}
      </motion.g>

      {/* Clouds */}
      <motion.g
        animate={animate ? { x: [-10, 10, -10] } : undefined}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <ellipse cx="80" cy="60" rx="25" ry="15" fill="#FFFFFF" />
        <ellipse cx="100" cy="55" rx="20" ry="12" fill="#FFFFFF" />
        <ellipse cx="60" cy="55" rx="18" ry="10" fill="#FFFFFF" />
      </motion.g>

      {/* Trees */}
      {/* Tree 1 */}
      <motion.g
        animate={animate ? { scaleY: [1, 1.02, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '70px 180px' }}
      >
        <rect x="65" y="140" width="10" height="50" fill="#92400E" />
        <polygon points="70,80 40,140 100,140" fill="#22C55E" />
        <polygon points="70,100 45,150 95,150" fill="#16A34A" />
      </motion.g>

      {/* Tree 2 */}
      <motion.g
        animate={animate ? { scaleY: [1, 1.03, 1] } : undefined}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        style={{ transformOrigin: '140px 180px' }}
      >
        <rect x="135" y="130" width="10" height="60" fill="#92400E" />
        <polygon points="140,70 105,130 175,130" fill="#22C55E" />
        <polygon points="140,95 115,145 165,145" fill="#16A34A" />
      </motion.g>

      {/* Water body */}
      <motion.ellipse
        cx="280"
        cy="230"
        rx="60"
        ry="25"
        fill="#60A5FA"
        animate={animate ? { rx: [60, 62, 60], ry: [25, 26, 25] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x="280" y="235" fontSize="8" fill="#1E40AF" textAnchor="middle">
        Pond
      </text>

      {/* Food Chain arrow */}
      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="30"
          y="200"
          width="130"
          height="80"
          rx="8"
          fill="#FFFFFF"
          fillOpacity="0.9"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="95" y="218" fontSize="9" fill="#065F46" textAnchor="middle" fontWeight="bold">
          Food Chain
        </text>
        <text x="95" y="235" fontSize="7" fill="#374151" textAnchor="middle">
          Producer → Consumer
        </text>
        <text x="95" y="250" fontSize="7" fill="#374151" textAnchor="middle">
          → Decomposer
        </text>
        <path d="M50 262 L140 262" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />
      </motion.g>

      {/* Deer */}
      <motion.g
        animate={animate ? { x: [-5, 5, -5] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <ellipse cx="200" cy="195" rx="20" ry="12" fill="#D97706" />
        <circle cx="215" cy="185" r="8" fill="#D97706" />
        <rect x="190" y="205" width="4" height="15" fill="#92400E" />
        <rect x="205" y="205" width="4" height="15" fill="#92400E" />
      </motion.g>

      {/* Bird */}
      <motion.g
        animate={animate ? { y: [-10, 10, -10], x: [0, 20, 0] } : undefined}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <path d="M250 100 Q260 90 270 100 Q260 95 250 100" fill="#1E293B" />
      </motion.g>

      {/* Topics list */}
      <rect
        x="200"
        y="140"
        width="90"
        height="50"
        rx="6"
        fill="#FFFFFF"
        fillOpacity="0.9"
        stroke="#059669"
        strokeWidth="1"
      />
      <text x="245" y="155" fontSize="7" fill="#065F46" textAnchor="middle" fontWeight="bold">
        Topics:
      </text>
      <text x="245" y="167" fontSize="6" fill="#374151" textAnchor="middle">
        Biodiversity
      </text>
      <text x="245" y="178" fontSize="6" fill="#374151" textAnchor="middle">
        Ecosystem Services
      </text>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="370" cy="270" r="18" fill="#10B981" />
        <text x="370" y="267" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          10-12
        </text>
        <text x="370" y="278" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 16. Cell Biology - Cell structure with organelles
export function CellBiologyIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background */}
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#ECFDF5" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#0D9488" textAnchor="middle" fontWeight="bold">
        Cell Biology - 10% Weightage
      </text>

      {/* Cell membrane (outer) */}
      <motion.ellipse
        cx="200"
        cy="160"
        rx="150"
        ry="100"
        fill="#FDF4FF"
        stroke="#A855F7"
        strokeWidth="4"
        strokeDasharray="15 5"
        animate={animate ? { strokeDashoffset: [0, 20] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Cytoplasm */}
      <ellipse cx="200" cy="160" rx="140" ry="90" fill="#FEF9C3" fillOpacity="0.5" />

      {/* Nucleus */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <ellipse
          cx="200"
          cy="160"
          rx="45"
          ry="35"
          fill="#C4B5FD"
          stroke="#7C3AED"
          strokeWidth="3"
        />
        <ellipse cx="200" cy="160" rx="15" ry="12" fill="#7C3AED" />
        <text x="200" y="195" fontSize="8" fill="#5B21B6" textAnchor="middle" fontWeight="bold">
          Nucleus
        </text>
      </motion.g>

      {/* Mitochondria */}
      <motion.g
        animate={animate ? { rotate: [0, 10, 0, -10, 0] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '100px 130px' }}
      >
        <ellipse
          cx="100"
          cy="130"
          rx="25"
          ry="12"
          fill="#FCA5A5"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <path
          d="M80 130 Q90 125 100 130 Q110 135 120 130"
          stroke="#EF4444"
          strokeWidth="1"
          fill="none"
        />
        <text x="100" y="155" fontSize="7" fill="#DC2626" textAnchor="middle">
          Mitochondria
        </text>
      </motion.g>

      {/* Endoplasmic Reticulum */}
      <motion.path
        d="M260 100 Q280 110 270 130 Q260 150 280 160 Q300 170 290 190"
        stroke="#3B82F6"
        strokeWidth="3"
        fill="none"
        animate={animate ? { pathLength: [0, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <text x="305" y="150" fontSize="6" fill="#1D4ED8" textAnchor="start">
        ER
      </text>

      {/* Golgi Apparatus */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <path d="M300 200 Q320 195 300 190" stroke="#F59E0B" strokeWidth="4" fill="none" />
        <path d="M302 205 Q322 200 302 195" stroke="#F59E0B" strokeWidth="3" fill="none" />
        <path d="M304 210 Q324 205 304 200" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <text x="330" y="205" fontSize="6" fill="#B45309" textAnchor="start">
          Golgi
        </text>
      </motion.g>

      {/* Ribosomes */}
      {[
        { cx: 140, cy: 100 },
        { cx: 150, cy: 115 },
        { cx: 160, cy: 105 },
        { cx: 240, cy: 110 },
        { cx: 250, cy: 125 },
        { cx: 130, cy: 180 },
        { cx: 145, cy: 195 },
        { cx: 255, cy: 190 },
      ].map((pos, i) => (
        <motion.circle
          key={i}
          cx={pos.cx}
          cy={pos.cy}
          r="4"
          fill="#10B981"
          animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      <text x="175" y="100" fontSize="6" fill="#059669" textAnchor="middle">
        Ribosomes
      </text>

      {/* Vacuole */}
      <motion.ellipse
        cx="120"
        cy="200"
        rx="20"
        ry="15"
        fill="#BFDBFE"
        stroke="#3B82F6"
        strokeWidth="2"
        animate={animate ? { rx: [20, 22, 20], ry: [15, 16, 15] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x="120" y="225" fontSize="6" fill="#1E40AF" textAnchor="middle">
        Vacuole
      </text>

      {/* Cell type labels */}
      <rect
        x="20"
        y="250"
        width="170"
        height="35"
        rx="6"
        fill="#FFFFFF"
        stroke="#14B8A6"
        strokeWidth="2"
      />
      <text x="105" y="268" fontSize="8" fill="#0F766E" textAnchor="middle" fontWeight="bold">
        Types: Prokaryotic & Eukaryotic
      </text>
      <text x="105" y="280" fontSize="7" fill="#6B7280" textAnchor="middle">
        Plant Cell vs Animal Cell
      </text>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="360" cy="265" r="18" fill="#14B8A6" />
        <text x="360" y="262" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          8-10
        </text>
        <text x="360" y="273" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 17. Plant Physiology - Photosynthesis and Transport
export function PlantPhysiologyIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background */}
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#DCFCE7" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#15803D" textAnchor="middle" fontWeight="bold">
        Plant Physiology - 12% Weightage
      </text>

      {/* Sun */}
      <motion.g
        animate={animate ? { rotate: [0, 360] } : undefined}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '60px 70px' }}
      >
        <circle cx="60" cy="70" r="20" fill="#FCD34D" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={60 + 25 * Math.cos((angle * Math.PI) / 180)}
            y1={70 + 25 * Math.sin((angle * Math.PI) / 180)}
            x2={60 + 35 * Math.cos((angle * Math.PI) / 180)}
            y2={70 + 35 * Math.sin((angle * Math.PI) / 180)}
            stroke="#F59E0B"
            strokeWidth="2"
          />
        ))}
      </motion.g>

      {/* Light rays hitting leaf */}
      <motion.g
        animate={animate ? { opacity: [0.3, 0.8, 0.3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <line
          x1="80"
          y1="80"
          x2="130"
          y2="120"
          stroke="#FCD34D"
          strokeWidth="3"
          strokeDasharray="5"
        />
        <line
          x1="70"
          y1="90"
          x2="120"
          y2="130"
          stroke="#FCD34D"
          strokeWidth="3"
          strokeDasharray="5"
        />
      </motion.g>

      {/* Plant structure */}
      {/* Stem */}
      <rect x="195" y="130" width="10" height="130" fill="#15803D" />

      {/* Leaves */}
      <motion.g
        animate={animate ? { rotate: [-5, 5, -5] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '200px 140px' }}
      >
        <ellipse cx="150" cy="130" rx="40" ry="20" fill="#22C55E" transform="rotate(-30 150 130)" />
        <ellipse cx="250" cy="130" rx="40" ry="20" fill="#22C55E" transform="rotate(30 250 130)" />
        <ellipse cx="145" cy="170" rx="35" ry="18" fill="#16A34A" transform="rotate(-20 145 170)" />
        <ellipse cx="255" cy="170" rx="35" ry="18" fill="#16A34A" transform="rotate(20 255 170)" />
      </motion.g>

      {/* Chloroplast */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse cx="150" cy="130" rx="12" ry="6" fill="#4ADE80" stroke="#166534" strokeWidth="1" />
        <text x="150" y="115" fontSize="6" fill="#166534" textAnchor="middle">
          Chloroplast
        </text>
      </motion.g>

      {/* Roots */}
      <path d="M200 260 Q180 270 160 280" stroke="#92400E" strokeWidth="4" fill="none" />
      <path d="M200 260 Q220 270 240 280" stroke="#92400E" strokeWidth="4" fill="none" />
      <path d="M200 260 Q200 275 200 290" stroke="#92400E" strokeWidth="4" fill="none" />

      {/* Water uptake arrows */}
      <motion.g
        animate={animate ? { y: [5, -5, 5] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path
          d="M170 285 L170 265 L165 270 M170 265 L175 270"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M230 285 L230 265 L225 270 M230 265 L235 270"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
        />
        <text x="200" y="295" fontSize="7" fill="#1D4ED8" textAnchor="middle">
          H₂O Absorption
        </text>
      </motion.g>

      {/* Photosynthesis equation box */}
      <rect
        x="260"
        y="60"
        width="130"
        height="70"
        rx="8"
        fill="#FFFFFF"
        stroke="#22C55E"
        strokeWidth="2"
      />
      <text x="325" y="80" fontSize="9" fill="#15803D" textAnchor="middle" fontWeight="bold">
        Photosynthesis
      </text>
      <text x="325" y="95" fontSize="7" fill="#374151" textAnchor="middle">
        6CO₂ + 6H₂O → C₆H₁₂O₆
      </text>
      <text x="325" y="108" fontSize="7" fill="#374151" textAnchor="middle">
        + 6O₂
      </text>
      <motion.text
        x="325"
        y="122"
        fontSize="6"
        fill="#22C55E"
        textAnchor="middle"
        animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Light Energy Required
      </motion.text>

      {/* Transpiration */}
      <motion.g
        animate={animate ? { y: [-3, -8, -3], opacity: [1, 0.3, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <ellipse cx="160" cy="100" rx="3" ry="5" fill="#60A5FA" />
        <ellipse cx="175" cy="95" rx="3" ry="5" fill="#60A5FA" />
        <ellipse cx="225" cy="100" rx="3" ry="5" fill="#60A5FA" />
        <text x="200" y="85" fontSize="6" fill="#3B82F6" textAnchor="middle">
          Transpiration
        </text>
      </motion.g>

      {/* Topics list */}
      <rect
        x="20"
        y="200"
        width="120"
        height="80"
        rx="6"
        fill="#FFFFFF"
        stroke="#22C55E"
        strokeWidth="1"
      />
      <text x="80" y="218" fontSize="8" fill="#15803D" textAnchor="middle" fontWeight="bold">
        Key Topics:
      </text>
      <text x="80" y="232" fontSize="6" fill="#374151" textAnchor="middle">
        • Photosynthesis
      </text>
      <text x="80" y="244" fontSize="6" fill="#374151" textAnchor="middle">
        • Respiration
      </text>
      <text x="80" y="256" fontSize="6" fill="#374151" textAnchor="middle">
        • Mineral Nutrition
      </text>
      <text x="80" y="268" fontSize="6" fill="#374151" textAnchor="middle">
        • Transport in Plants
      </text>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="350" cy="250" r="20" fill="#22C55E" />
        <text x="350" y="247" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          10-12
        </text>
        <text x="350" y="258" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 18. Human Reproduction - Reproductive system illustration
export function HumanReproductionIllustration({
  className = '',
  animate = true,
}: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background */}
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FCE7F3" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        Human Reproduction - 12% Weightage
      </text>

      {/* Male symbol */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="100" cy="120" r="30" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="3" />
        <line x1="120" y1="100" x2="145" y2="75" stroke="#3B82F6" strokeWidth="3" />
        <line x1="145" y1="75" x2="135" y2="75" stroke="#3B82F6" strokeWidth="3" />
        <line x1="145" y1="75" x2="145" y2="85" stroke="#3B82F6" strokeWidth="3" />
        <text x="100" y="165" fontSize="9" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Male
        </text>
      </motion.g>

      {/* Female symbol */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <circle cx="300" cy="120" r="30" fill="#FBCFE8" stroke="#EC4899" strokeWidth="3" />
        <line x1="300" y1="150" x2="300" y2="180" stroke="#EC4899" strokeWidth="3" />
        <line x1="285" y1="165" x2="315" y2="165" stroke="#EC4899" strokeWidth="3" />
        <text x="300" y="195" fontSize="9" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          Female
        </text>
      </motion.g>

      {/* Connecting heart */}
      <motion.g
        animate={animate ? { scale: [1, 1.2, 1] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <path
          d="M200 110 L190 100 Q175 90 175 105 Q175 120 200 140 Q225 120 225 105 Q225 90 210 100 Z"
          fill="#F472B6"
          stroke="#DB2777"
          strokeWidth="2"
        />
      </motion.g>

      {/* Gametogenesis boxes */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <rect
          x="40"
          y="180"
          width="120"
          height="50"
          rx="8"
          fill="#FFFFFF"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text x="100" y="200" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Spermatogenesis
        </text>
        <text x="100" y="215" fontSize="6" fill="#6B7280" textAnchor="middle">
          Sperm production
        </text>
        <text x="100" y="225" fontSize="6" fill="#6B7280" textAnchor="middle">
          in testes
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { y: [2, -2, 2] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <rect
          x="240"
          y="180"
          width="120"
          height="50"
          rx="8"
          fill="#FFFFFF"
          stroke="#EC4899"
          strokeWidth="2"
        />
        <text x="300" y="200" fontSize="8" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          Oogenesis
        </text>
        <text x="300" y="215" fontSize="6" fill="#6B7280" textAnchor="middle">
          Egg production
        </text>
        <text x="300" y="225" fontSize="6" fill="#6B7280" textAnchor="middle">
          in ovaries
        </text>
      </motion.g>

      {/* Fertilization central */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <ellipse
          cx="200"
          cy="210"
          rx="35"
          ry="25"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <text x="200" y="207" fontSize="8" fill="#92400E" textAnchor="middle" fontWeight="bold">
          Fertilization
        </text>
        <text x="200" y="220" fontSize="6" fill="#92400E" textAnchor="middle">
          Zygote Formation
        </text>
      </motion.g>

      {/* Development stages */}
      <rect
        x="100"
        y="245"
        width="200"
        height="40"
        rx="6"
        fill="#FFFFFF"
        stroke="#BE185D"
        strokeWidth="1"
      />
      <text x="200" y="260" fontSize="7" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        Development: Zygote → Embryo → Fetus → Baby
      </text>
      <text x="200" y="275" fontSize="6" fill="#6B7280" textAnchor="middle">
        Pregnancy: 40 weeks (280 days)
      </text>

      {/* Topics sidebar */}
      <rect
        x="320"
        y="60"
        width="70"
        height="100"
        rx="6"
        fill="#FFFFFF"
        stroke="#EC4899"
        strokeWidth="1"
      />
      <text x="355" y="78" fontSize="7" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        Topics:
      </text>
      <text x="355" y="92" fontSize="5" fill="#374151" textAnchor="middle">
        Gametogenesis
      </text>
      <text x="355" y="104" fontSize="5" fill="#374151" textAnchor="middle">
        Menstrual Cycle
      </text>
      <text x="355" y="116" fontSize="5" fill="#374151" textAnchor="middle">
        Fertilization
      </text>
      <text x="355" y="128" fontSize="5" fill="#374151" textAnchor="middle">
        Embryo Dev.
      </text>
      <text x="355" y="140" fontSize="5" fill="#374151" textAnchor="middle">
        Lactation
      </text>
      <text x="355" y="152" fontSize="5" fill="#374151" textAnchor="middle">
        Contraception
      </text>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="40" cy="260" r="18" fill="#EC4899" />
        <text x="40" y="257" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          10-12
        </text>
        <text x="40" y="268" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 19. Biotechnology - DNA manipulation and applications
export function BiotechnologyIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background */}
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#F0FDF4" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#059669" textAnchor="middle" fontWeight="bold">
        Biotechnology - 8% Weightage
      </text>

      {/* DNA strand being cut */}
      <motion.g
        animate={animate ? { x: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* DNA helix segment */}
        <path
          d="M40 80 Q60 100 40 120 Q20 140 40 160"
          stroke="#8B5CF6"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M80 80 Q60 100 80 120 Q100 140 80 160"
          stroke="#A78BFA"
          strokeWidth="3"
          fill="none"
        />
        <line x1="40" y1="90" x2="80" y2="90" stroke="#EC4899" strokeWidth="2" />
        <line x1="40" y1="110" x2="80" y2="110" stroke="#10B981" strokeWidth="2" />
        <line x1="40" y1="130" x2="80" y2="130" stroke="#F59E0B" strokeWidth="2" />
        <line x1="40" y1="150" x2="80" y2="150" stroke="#3B82F6" strokeWidth="2" />
      </motion.g>

      {/* Scissors (restriction enzyme) */}
      <motion.g
        animate={animate ? { rotate: [-10, 10, -10] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ transformOrigin: '120px 120px' }}
      >
        <path d="M100 100 L120 120 L100 140" stroke="#EF4444" strokeWidth="3" fill="none" />
        <path d="M140 100 L120 120 L140 140" stroke="#EF4444" strokeWidth="3" fill="none" />
        <circle cx="120" cy="120" r="5" fill="#EF4444" />
      </motion.g>
      <text x="120" y="165" fontSize="7" fill="#DC2626" textAnchor="middle">
        Restriction
      </text>
      <text x="120" y="175" fontSize="7" fill="#DC2626" textAnchor="middle">
        Enzyme
      </text>

      {/* Plasmid vector */}
      <motion.g
        animate={animate ? { rotate: [0, 360] } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '200px 120px' }}
      >
        <circle cx="200" cy="120" r="40" fill="none" stroke="#3B82F6" strokeWidth="4" />
        <circle cx="200" cy="80" r="5" fill="#EF4444" />
        <text x="200" y="70" fontSize="6" fill="#DC2626" textAnchor="middle">
          ori
        </text>
      </motion.g>
      <text x="200" y="175" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
        Plasmid Vector
      </text>

      {/* Arrow showing insertion */}
      <motion.path
        d="M145 120 L155 120 M152 115 L158 120 L152 125"
        stroke="#059669"
        strokeWidth="2"
        fill="none"
        animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Recombinant DNA */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="300" cy="120" r="45" fill="none" stroke="#10B981" strokeWidth="4" />
        <line x1="280" y1="100" x2="320" y2="100" stroke="#EC4899" strokeWidth="3" />
        <line x1="280" y1="140" x2="320" y2="140" stroke="#F59E0B" strokeWidth="3" />
        <circle cx="300" cy="75" r="5" fill="#EF4444" />
      </motion.g>
      <text x="300" y="180" fontSize="8" fill="#059669" textAnchor="middle" fontWeight="bold">
        Recombinant DNA
      </text>

      {/* Applications box */}
      <rect
        x="20"
        y="195"
        width="160"
        height="85"
        rx="8"
        fill="#FFFFFF"
        stroke="#10B981"
        strokeWidth="2"
      />
      <text x="100" y="215" fontSize="9" fill="#059669" textAnchor="middle" fontWeight="bold">
        Applications
      </text>
      <text x="100" y="232" fontSize="7" fill="#374151" textAnchor="middle">
        • GM Crops (Bt Cotton)
      </text>
      <text x="100" y="246" fontSize="7" fill="#374151" textAnchor="middle">
        • Insulin Production
      </text>
      <text x="100" y="260" fontSize="7" fill="#374151" textAnchor="middle">
        • Gene Therapy
      </text>
      <text x="100" y="274" fontSize="7" fill="#374151" textAnchor="middle">
        • DNA Fingerprinting
      </text>

      {/* Tools box */}
      <rect
        x="220"
        y="195"
        width="160"
        height="85"
        rx="8"
        fill="#FFFFFF"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      <text x="300" y="215" fontSize="9" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Tools & Techniques
      </text>
      <text x="300" y="232" fontSize="7" fill="#374151" textAnchor="middle">
        • PCR (DNA Amplification)
      </text>
      <text x="300" y="246" fontSize="7" fill="#374151" textAnchor="middle">
        • Gel Electrophoresis
      </text>
      <text x="300" y="260" fontSize="7" fill="#374151" textAnchor="middle">
        • ELISA, Blotting
      </text>
      <text x="300" y="274" fontSize="7" fill="#374151" textAnchor="middle">
        • Bioreactors
      </text>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="360" cy="70" r="18" fill="#10B981" />
        <text x="360" y="67" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          6-8
        </text>
        <text x="360" y="78" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 20. Animal Kingdom - Diversity of animals
export function AnimalKingdomIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Background */}
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FEF9C3" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#CA8A04" textAnchor="middle" fontWeight="bold">
        Animal Kingdom - 8% Weightage
      </text>

      {/* Invertebrates section */}
      <rect
        x="20"
        y="50"
        width="175"
        height="120"
        rx="10"
        fill="#FFFFFF"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      <text x="107" y="70" fontSize="10" fill="#B45309" textAnchor="middle" fontWeight="bold">
        Invertebrates
      </text>

      {/* Jellyfish */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse cx="55" cy="100" rx="15" ry="10" fill="#E879F9" />
        <path d="M45 110 Q55 120 65 110" stroke="#D946EF" strokeWidth="2" fill="none" />
        <text x="55" y="135" fontSize="6" fill="#A21CAF" textAnchor="middle">
          Cnidaria
        </text>
      </motion.g>

      {/* Earthworm */}
      <motion.g
        animate={animate ? { scaleX: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ transformOrigin: '107px 100px' }}
      >
        <path
          d="M85 100 Q100 95 115 100 Q130 105 115 100"
          stroke="#D97706"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <text x="107" y="125" fontSize="6" fill="#92400E" textAnchor="middle">
          Annelida
        </text>
      </motion.g>

      {/* Insect */}
      <motion.g
        animate={animate ? { rotate: [-5, 5, -5] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ transformOrigin: '160px 100px' }}
      >
        <ellipse cx="160" cy="100" rx="12" ry="8" fill="#84CC16" />
        <circle cx="148" cy="98" r="4" fill="#65A30D" />
        <line x1="155" y1="92" x2="150" y2="85" stroke="#84CC16" strokeWidth="1" />
        <line x1="165" y1="92" x2="170" y2="85" stroke="#84CC16" strokeWidth="1" />
        <text x="160" y="125" fontSize="6" fill="#4D7C0F" textAnchor="middle">
          Arthropoda
        </text>
      </motion.g>

      {/* More invertebrate labels */}
      <text x="55" y="155" fontSize="5" fill="#6B7280" textAnchor="middle">
        Porifera, Platyhelminthes
      </text>
      <text x="145" y="155" fontSize="5" fill="#6B7280" textAnchor="middle">
        Mollusca, Echinodermata
      </text>

      {/* Vertebrates section */}
      <rect
        x="205"
        y="50"
        width="175"
        height="120"
        rx="10"
        fill="#FFFFFF"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      <text x="292" y="70" fontSize="10" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
        Vertebrates
      </text>

      {/* Fish */}
      <motion.g
        animate={animate ? { x: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse cx="235" cy="95" rx="15" ry="8" fill="#60A5FA" />
        <polygon points="250,95 260,88 260,102" fill="#3B82F6" />
        <circle cx="228" cy="93" r="2" fill="#1E293B" />
        <text x="235" y="115" fontSize="5" fill="#1D4ED8" textAnchor="middle">
          Pisces
        </text>
      </motion.g>

      {/* Frog */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      >
        <ellipse cx="275" cy="95" rx="12" ry="10" fill="#4ADE80" />
        <circle cx="270" cy="88" r="3" fill="#FFFFFF" stroke="#166534" strokeWidth="1" />
        <circle cx="280" cy="88" r="3" fill="#FFFFFF" stroke="#166534" strokeWidth="1" />
        <text x="275" y="115" fontSize="5" fill="#166534" textAnchor="middle">
          Amphibia
        </text>
      </motion.g>

      {/* Bird */}
      <motion.g
        animate={animate ? { y: [-3, 0, -3] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ellipse cx="315" cy="95" rx="10" ry="8" fill="#F472B6" />
        <polygon points="325,95 335,95 325,90" fill="#EC4899" />
        <circle cx="312" cy="93" r="2" fill="#1E293B" />
        <text x="315" y="115" fontSize="5" fill="#DB2777" textAnchor="middle">
          Aves
        </text>
      </motion.g>

      {/* Mammal */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse cx="355" cy="95" rx="12" ry="10" fill="#FBBF24" />
        <circle cx="362" cy="90" r="5" fill="#F59E0B" />
        <text x="355" y="115" fontSize="5" fill="#B45309" textAnchor="middle">
          Mammalia
        </text>
      </motion.g>

      <text x="292" y="155" fontSize="5" fill="#6B7280" textAnchor="middle">
        Reptilia (Snakes, Lizards)
      </text>

      {/* Classification tree hint */}
      <rect
        x="60"
        y="180"
        width="280"
        height="95"
        rx="10"
        fill="#FFFFFF"
        stroke="#CA8A04"
        strokeWidth="2"
      />
      <text x="200" y="200" fontSize="9" fill="#CA8A04" textAnchor="middle" fontWeight="bold">
        Classification Basis
      </text>
      <text x="200" y="218" fontSize="7" fill="#374151" textAnchor="middle">
        Body Symmetry • Coelom • Segmentation
      </text>
      <text x="200" y="233" fontSize="7" fill="#374151" textAnchor="middle">
        Notochord • Germ Layers • Embryo Development
      </text>
      <text x="200" y="255" fontSize="8" fill="#92400E" textAnchor="middle" fontWeight="bold">
        35+ Phyla to Study!
      </text>
      <text x="200" y="268" fontSize="6" fill="#6B7280" textAnchor="middle">
        Focus: Chordata (Vertebrates) - 5 Classes
      </text>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="360" cy="200" r="18" fill="#F59E0B" />
        <text x="360" y="197" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          6-8
        </text>
        <text x="360" y="208" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}

// Export all illustrations
export default {
  KotaVsOnlineIllustration,
  ClassStartTimeIllustration,
  DPSStudentIllustration,
  CoachingCenterIllustration,
  BooksForNEETIllustration,
  MistakesToAvoidIllustration,
  Last6MonthsStrategyIllustration,
  MockTestIllustration,
  NCERTReadingIllustration,
  NEET2026GuideIllustration,
  ToppersSecretsIllustration,
  ChapterWeightageIllustration,
  HumanPhysiologyIllustration,
  GeneticsIllustration,
  EcologyIllustration,
  CellBiologyIllustration,
  PlantPhysiologyIllustration,
  HumanReproductionIllustration,
  BiotechnologyIllustration,
  AnimalKingdomIllustration,
}
