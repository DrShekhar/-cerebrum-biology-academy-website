'use client'

import { motion } from 'framer-motion'

// Blog-specific illustrations - topic-appropriate animated SVGs
// Following the same pattern as SEOIllustrations.tsx

interface IllustrationProps {
  className?: string
  animate?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

// Responsive size classes - use these when integrating illustrations
const sizeClasses = {
  sm: 'w-full max-w-[200px] h-auto',
  md: 'w-full max-w-[300px] h-auto',
  lg: 'w-full max-w-[400px] h-auto',
  xl: 'w-full max-w-[500px] h-auto',
  full: 'w-full h-auto',
}

// Responsive wrapper component for blog illustrations
export function ResponsiveIllustrationWrapper({
  children,
  size = 'lg',
  className = '',
}: {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}) {
  return (
    <div className={`mx-auto ${sizeClasses[size]} ${className}`} style={{ aspectRatio: '4/3' }}>
      {children}
    </div>
  )
}

// Helper function to get responsive classes
export function getResponsiveClasses(size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg'): string {
  return sizeClasses[size]
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
      viewBox="0 0 500 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        <linearGradient id="physBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDF2F8" />
          <stop offset="50%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#FAE8FF" />
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="lungGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.1" />
        </filter>
        <filter id="glowPulse" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="15" y="15" width="470" height="350" rx="24" fill="url(#physBgGrad)" />
      <rect x="15" y="15" width="470" height="350" rx="24" fill="white" fillOpacity="0.4" />

      <text
        x="250"
        y="50"
        fontSize="18"
        fill="#BE185D"
        textAnchor="middle"
        fontWeight="700"
        fontFamily="system-ui"
      >
        Human Physiology - 20% Weightage
      </text>

      <g filter="url(#softShadow)">
        <ellipse cx="250" cy="105" rx="32" ry="36" fill="url(#bodyGrad)" />
        <rect x="218" y="138" width="64" height="100" rx="14" fill="url(#bodyGrad)" />
        <ellipse cx="250" cy="238" rx="32" ry="10" fill="#F59E0B" opacity="0.3" />
      </g>

      <motion.g
        animate={animate ? { scale: [1, 1.03, 1] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        filter="url(#glowPulse)"
      >
        <ellipse cx="250" cy="95" rx="22" ry="18" fill="url(#brainGrad)" />
        <path
          d="M232 95 Q241 85 250 95 Q259 85 268 95"
          stroke="#BE185D"
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M235 100 Q250 108 265 100"
          stroke="#BE185D"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <text x="250" y="78" fontSize="9" fill="#831843" textAnchor="middle" fontWeight="600">
          Brain
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { scale: [1, 1.12, 1] } : undefined}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M250 155 L238 143 Q220 130 220 148 Q220 168 250 195 Q280 168 280 148 Q280 130 262 143 Z"
          fill="url(#heartGrad)"
          filter="url(#softShadow)"
        />
        <text x="250" y="175" fontSize="8" fill="white" textAnchor="middle" fontWeight="600">
          Heart
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { scaleX: [1, 1.08, 1] } : undefined}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '250px 165px' }}
      >
        <ellipse
          cx="205"
          cy="165"
          rx="18"
          ry="32"
          fill="url(#lungGrad)"
          filter="url(#softShadow)"
        />
        <ellipse
          cx="295"
          cy="165"
          rx="18"
          ry="32"
          fill="url(#lungGrad)"
          filter="url(#softShadow)"
        />
      </motion.g>

      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect
          x="30"
          y="100"
          width="100"
          height="75"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="30"
          y="100"
          width="100"
          height="75"
          rx="12"
          fill="#FFFBEB"
          fillOpacity="0.8"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <text x="80" y="128" fontSize="11" fill="#92400E" textAnchor="middle" fontWeight="700">
          Digestive
        </text>
        <text x="80" y="143" fontSize="11" fill="#92400E" textAnchor="middle" fontWeight="700">
          System
        </text>
        <path
          d="M55 158 Q80 170 105 158"
          stroke="#F59E0B"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.g
        animate={animate ? { y: [2, -2, 2] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <rect
          x="370"
          y="100"
          width="100"
          height="75"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="370"
          y="100"
          width="100"
          height="75"
          rx="12"
          fill="#FEF2F2"
          fillOpacity="0.8"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text x="420" y="128" fontSize="11" fill="#991B1B" textAnchor="middle" fontWeight="700">
          Circulatory
        </text>
        <text x="420" y="143" fontSize="11" fill="#991B1B" textAnchor="middle" fontWeight="700">
          System
        </text>
        <motion.circle
          cx="420"
          cy="160"
          r="10"
          fill="#EF4444"
          animate={animate ? { scale: [1, 1.25, 1] } : undefined}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      </motion.g>

      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <rect
          x="30"
          y="195"
          width="100"
          height="75"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="30"
          y="195"
          width="100"
          height="75"
          rx="12"
          fill="#EFF6FF"
          fillOpacity="0.8"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text x="80" y="223" fontSize="11" fill="#1E40AF" textAnchor="middle" fontWeight="700">
          Respiratory
        </text>
        <text x="80" y="238" fontSize="11" fill="#1E40AF" textAnchor="middle" fontWeight="700">
          System
        </text>
        <motion.ellipse
          cx="80"
          cy="256"
          rx="14"
          ry="9"
          fill="#60A5FA"
          animate={animate ? { scaleX: [1, 1.15, 1] } : undefined}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.g>

      <motion.g
        animate={animate ? { y: [2, -2, 2] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
      >
        <rect
          x="370"
          y="195"
          width="100"
          height="75"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="370"
          y="195"
          width="100"
          height="75"
          rx="12"
          fill="#ECFDF5"
          fillOpacity="0.8"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="420" y="223" fontSize="11" fill="#065F46" textAnchor="middle" fontWeight="700">
          Excretory
        </text>
        <text x="420" y="238" fontSize="11" fill="#065F46" textAnchor="middle" fontWeight="700">
          System
        </text>
        <path
          d="M405 255 Q420 268 435 255"
          stroke="#10B981"
          strokeWidth="2.5"
          fill="#6EE7B7"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.85, 1, 0.85] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect
          x="145"
          y="280"
          width="95"
          height="60"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="145"
          y="280"
          width="95"
          height="60"
          rx="12"
          fill="#FAF5FF"
          fillOpacity="0.8"
          stroke="#8B5CF6"
          strokeWidth="2"
        />
        <text x="192" y="305" fontSize="10" fill="#5B21B6" textAnchor="middle" fontWeight="700">
          Nervous
        </text>
        <text x="192" y="320" fontSize="10" fill="#5B21B6" textAnchor="middle" fontWeight="700">
          System
        </text>
        <path
          d="M175 330 L192 340 L209 330"
          stroke="#8B5CF6"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [1, 0.85, 1] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <rect
          x="260"
          y="280"
          width="95"
          height="60"
          rx="12"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="260"
          y="280"
          width="95"
          height="60"
          rx="12"
          fill="#FDF2F8"
          fillOpacity="0.8"
          stroke="#EC4899"
          strokeWidth="2"
        />
        <text x="307" y="305" fontSize="10" fill="#9D174D" textAnchor="middle" fontWeight="700">
          Endocrine
        </text>
        <text x="307" y="320" fontSize="10" fill="#9D174D" textAnchor="middle" fontWeight="700">
          System
        </text>
        <circle cx="307" cy="332" r="6" fill="#F472B6" />
      </motion.g>

      <motion.g
        animate={animate ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="160"
          y="350"
          width="180"
          height="36"
          rx="18"
          fill="white"
          filter="url(#cardShadow)"
        />
        <rect
          x="160"
          y="350"
          width="180"
          height="36"
          rx="18"
          fill="#FEF2F2"
          stroke="#DC2626"
          strokeWidth="2"
        />
        <text x="250" y="374" fontSize="13" fill="#DC2626" textAnchor="middle" fontWeight="700">
          18-20 Questions in NEET
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 14. Genetics & Evolution - DNA Helix with chromosomes
export function GeneticsIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 520 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Professional gradients */}
        <linearGradient id="genBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EDE9FE" />
          <stop offset="50%" stopColor="#DDD6FE" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
        <linearGradient id="dnaStrand1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="dnaStrand2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="xChromoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="yChromoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="genShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12" />
        </filter>
        <filter id="genCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
        </filter>
        <filter id="genGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="520" height="400" rx="24" fill="url(#genBgGrad)" />

      {/* Decorative elements */}
      <circle cx="480" cy="60" r="100" fill="#8B5CF6" fillOpacity="0.08" />
      <circle cx="40" cy="350" r="80" fill="#EC4899" fillOpacity="0.06" />

      {/* Title */}
      <text
        x="260"
        y="38"
        fontSize="20"
        fill="#5B21B6"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        Genetics & Evolution
      </text>
      <text
        x="260"
        y="56"
        fontSize="11"
        fill="#7C3AED"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        Principles of Inheritance • 18% NEET Weightage
      </text>

      {/* DNA Double Helix - Professional 3D-style */}
      <g filter="url(#genShadow)">
        <motion.g
          animate={animate ? { rotate: [0, 360] } : undefined}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 220px' }}
        >
          {/* Left strand with gradient */}
          <motion.path
            d="M50 80 Q75 115 50 150 Q25 185 50 220 Q75 255 50 290 Q25 325 50 360"
            stroke="url(#dnaStrand1)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right strand with gradient */}
          <motion.path
            d="M150 80 Q125 115 150 150 Q175 185 150 220 Q125 255 150 290 Q175 325 150 360"
            stroke="url(#dnaStrand2)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Base pairs with enhanced colors */}
          {[
            { y: 95, color: '#F472B6', label: 'A-T' },
            { y: 130, color: '#34D399', label: 'G-C' },
            { y: 165, color: '#FBBF24', label: 'T-A' },
            { y: 200, color: '#60A5FA', label: 'C-G' },
            { y: 235, color: '#F472B6', label: 'A-T' },
            { y: 270, color: '#34D399', label: 'G-C' },
            { y: 305, color: '#FBBF24', label: 'T-A' },
            { y: 340, color: '#60A5FA', label: 'C-G' },
          ].map((pair, i) => (
            <g key={`pair-${i}`}>
              <line
                x1="50"
                y1={pair.y}
                x2="150"
                y2={pair.y}
                stroke={pair.color}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <rect x="80" y={pair.y - 8} width="40" height="16" rx="8" fill={pair.color} />
              <text
                x="100"
                y={pair.y + 4}
                fontSize="9"
                fill="white"
                textAnchor="middle"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                {pair.label}
              </text>
            </g>
          ))}
        </motion.g>
      </g>

      {/* Chromosomes Section */}
      <g filter="url(#genCardShadow)">
        <rect x="200" y="75" width="150" height="130" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="200"
          y="75"
          width="150"
          height="130"
          rx="16"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="2"
        />

        <text
          x="275"
          y="98"
          fontSize="12"
          fill="#5B21B6"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Sex Chromosomes
        </text>

        {/* X Chromosome - Professional */}
        <motion.g
          animate={animate ? { y: [-3, 3, -3] } : undefined}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M225 115 L250 175 M250 115 L225 175"
            stroke="url(#xChromoGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="237" cy="145" r="6" fill="#FDF2F8" stroke="#EC4899" strokeWidth="2" />
        </motion.g>

        {/* Y Chromosome - Professional */}
        <motion.g
          animate={animate ? { y: [3, -3, 3] } : undefined}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M300 115 L300 150"
            stroke="url(#yChromoGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M285 165 L300 150 L315 165"
            stroke="url(#yChromoGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        <text
          x="237"
          y="192"
          fontSize="11"
          fill="#EC4899"
          textAnchor="middle"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Female (XX)
        </text>
        <text
          x="300"
          y="192"
          fontSize="11"
          fill="#3B82F6"
          textAnchor="middle"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Male (XY)
        </text>
      </g>

      {/* Mendel's Laws Card */}
      <motion.g
        filter="url(#genCardShadow)"
        animate={animate ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="365" y="75" width="140" height="130" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="365"
          y="75"
          width="140"
          height="130"
          rx="16"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
        />

        <text
          x="435"
          y="98"
          fontSize="12"
          fill="#5B21B6"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Mendel's Laws
        </text>

        {/* Law icons */}
        <circle cx="385" cy="118" r="8" fill="#DDD6FE" />
        <text x="385" y="122" fontSize="10" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
          1
        </text>
        <text x="395" y="122" fontSize="9" fill="#6B7280" fontFamily="system-ui, sans-serif">
          Segregation
        </text>

        <circle cx="385" cy="143" r="8" fill="#DDD6FE" />
        <text x="385" y="147" fontSize="10" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
          2
        </text>
        <text x="395" y="147" fontSize="9" fill="#6B7280" fontFamily="system-ui, sans-serif">
          Independent
        </text>

        <circle cx="385" cy="168" r="8" fill="#DDD6FE" />
        <text x="385" y="172" fontSize="10" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
          3
        </text>
        <text x="395" y="172" fontSize="9" fill="#6B7280" fontFamily="system-ui, sans-serif">
          Dominance
        </text>

        <rect x="375" y="183" width="120" height="16" rx="8" fill="#F3E8FF" />
        <text
          x="435"
          y="194"
          fontSize="8"
          fill="#7C3AED"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Pea Plant Experiments
        </text>
      </motion.g>

      {/* Punnett Square */}
      <g filter="url(#genCardShadow)">
        <rect x="200" y="220" width="130" height="130" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="200"
          y="220"
          width="130"
          height="130"
          rx="16"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
        />

        <text
          x="265"
          y="243"
          fontSize="11"
          fill="#059669"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Punnett Square
        </text>

        {/* Grid */}
        <line x1="230" y1="258" x2="230" y2="340" stroke="#D1FAE5" strokeWidth="2" />
        <line x1="270" y1="258" x2="270" y2="340" stroke="#D1FAE5" strokeWidth="2" />
        <line x1="210" y1="280" x2="320" y2="280" stroke="#D1FAE5" strokeWidth="2" />
        <line x1="210" y1="310" x2="320" y2="310" stroke="#D1FAE5" strokeWidth="2" />

        {/* Alleles */}
        <text x="250" y="272" fontSize="10" fill="#059669" textAnchor="middle" fontWeight="bold">
          A
        </text>
        <text x="295" y="272" fontSize="10" fill="#059669" textAnchor="middle" fontWeight="bold">
          a
        </text>
        <text x="220" y="297" fontSize="10" fill="#059669" textAnchor="middle" fontWeight="bold">
          A
        </text>
        <text x="220" y="330" fontSize="10" fill="#059669" textAnchor="middle" fontWeight="bold">
          a
        </text>

        {/* Results */}
        <text x="250" y="297" fontSize="9" fill="#10B981" textAnchor="middle">
          AA
        </text>
        <text x="295" y="297" fontSize="9" fill="#10B981" textAnchor="middle">
          Aa
        </text>
        <text x="250" y="330" fontSize="9" fill="#10B981" textAnchor="middle">
          Aa
        </text>
        <text x="295" y="330" fontSize="9" fill="#10B981" textAnchor="middle">
          aa
        </text>
      </g>

      {/* Evolution Card */}
      <motion.g
        filter="url(#genCardShadow)"
        animate={animate ? { x: [-2, 2, -2] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="345" y="220" width="160" height="130" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="345"
          y="220"
          width="160"
          height="130"
          rx="16"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
        />

        <text
          x="425"
          y="243"
          fontSize="11"
          fill="#B45309"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Evolution
        </text>

        {/* Darwin icon */}
        <circle cx="385" cy="275" r="20" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
        <text x="385" y="280" fontSize="16" textAnchor="middle">
          🧬
        </text>

        <text x="440" y="268" fontSize="9" fill="#92400E" fontFamily="system-ui, sans-serif">
          Darwin's Theory
        </text>
        <text x="440" y="282" fontSize="8" fill="#B45309" fontFamily="system-ui, sans-serif">
          Natural Selection
        </text>

        {/* Evolution timeline */}
        <line
          x1="360"
          y1="310"
          x2="490"
          y2="310"
          stroke="#FCD34D"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="380" cy="310" r="6" fill="#F59E0B" />
        <circle cx="425" cy="310" r="6" fill="#FBBF24" />
        <circle cx="470" cy="310" r="6" fill="#FCD34D" />

        <text
          x="425"
          y="335"
          fontSize="8"
          fill="#92400E"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Adaptation → Speciation
        </text>
      </motion.g>

      {/* Questions badge with glow */}
      <motion.g
        filter="url(#genGlow)"
        animate={animate ? { scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="55" cy="55" r="35" fill="#7C3AED" />
        <circle
          cx="55"
          cy="55"
          r="30"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <text
          x="55"
          y="50"
          fontSize="16"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          16-18
        </text>
        <text
          x="55"
          y="68"
          fontSize="10"
          fill="#FFFFFF"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
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
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 520 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Professional gradients */}
        <linearGradient id="cellBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="50%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
        <linearGradient id="cellMembraneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
        <linearGradient id="nucleusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="cytoplasmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.4" />
        </linearGradient>
        <filter id="cellShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12" />
        </filter>
        <filter id="organelleShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15" />
        </filter>
        <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background with gradient */}
      <rect x="0" y="0" width="520" height="400" rx="24" fill="url(#cellBgGrad)" />

      {/* Decorative circles */}
      <circle cx="50" cy="50" r="80" fill="#10B981" fillOpacity="0.05" />
      <circle cx="480" cy="360" r="100" fill="#7C3AED" fillOpacity="0.05" />

      {/* Title with professional styling */}
      <text
        x="260"
        y="38"
        fontSize="20"
        fill="#0F766E"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        Cell Biology
      </text>
      <text
        x="260"
        y="56"
        fontSize="11"
        fill="#059669"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        The Unit of Life • 10% NEET Weightage
      </text>

      {/* Main Cell - centered */}
      <g filter="url(#cellShadow)">
        {/* Cell membrane (outer) with phospholipid bilayer effect */}
        <motion.ellipse
          cx="260"
          cy="210"
          rx="175"
          ry="120"
          fill="url(#cellMembraneGrad)"
          stroke="#A855F7"
          strokeWidth="6"
          strokeDasharray="18 6"
          animate={animate ? { strokeDashoffset: [0, 24] } : undefined}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Cytoplasm */}
        <ellipse cx="260" cy="210" rx="165" ry="110" fill="url(#cytoplasmGrad)" />
      </g>

      {/* Nucleus with professional styling */}
      <motion.g
        filter="url(#organelleShadow)"
        animate={animate ? { scale: [1, 1.03, 1] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '260px 210px' }}
      >
        <ellipse cx="260" cy="210" rx="55" ry="42" fill="url(#nucleusGrad)" />
        <ellipse
          cx="260"
          cy="210"
          rx="50"
          ry="38"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        {/* Nucleolus */}
        <circle cx="260" cy="210" r="15" fill="#5B21B6" />
        {/* Nuclear pores */}
        <circle cx="230" cy="195" r="3" fill="#DDD6FE" />
        <circle cx="290" cy="195" r="3" fill="#DDD6FE" />
        <circle cx="230" cy="225" r="3" fill="#DDD6FE" />
        <circle cx="290" cy="225" r="3" fill="#DDD6FE" />
      </motion.g>
      <text
        x="260"
        y="268"
        fontSize="11"
        fill="#5B21B6"
        textAnchor="middle"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Nucleus
      </text>

      {/* Mitochondria - powerhouse with cristae */}
      <motion.g
        filter="url(#organelleShadow)"
        animate={animate ? { rotate: [0, 5, 0, -5, 0] } : undefined}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '115px 170px' }}
      >
        <ellipse cx="115" cy="170" rx="35" ry="18" fill="url(#mitoGrad)" />
        <ellipse cx="115" cy="170" rx="30" ry="14" fill="none" stroke="#FCA5A5" strokeWidth="1.5" />
        {/* Cristae (inner membrane folds) */}
        <path
          d="M90 170 Q100 163 110 170 Q120 177 130 170"
          stroke="#FEE2E2"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M95 175 Q105 168 115 175 Q125 182 135 175"
          stroke="#FEE2E2"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.g>
      <text
        x="115"
        y="200"
        fontSize="9"
        fill="#DC2626"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Mitochondria
      </text>

      {/* Endoplasmic Reticulum */}
      <motion.g filter="url(#organelleShadow)">
        <motion.path
          d="M330 130 Q350 145 340 165 Q330 185 350 200 Q370 215 360 235"
          stroke="#3B82F6"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          animate={animate ? { pathLength: [0.3, 1, 0.3] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M345 135 Q365 150 355 170 Q345 190 365 205"
          stroke="#60A5FA"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={animate ? { pathLength: [0.5, 1, 0.5] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        {/* Ribosomes on rough ER */}
        {[
          { x: 335, y: 145 },
          { x: 345, y: 175 },
          { x: 355, y: 210 },
        ].map((pos, i) => (
          <motion.circle
            key={`er-ribo-${i}`}
            cx={pos.x}
            cy={pos.y}
            r="4"
            fill="#10B981"
            animate={animate ? { opacity: [0.6, 1, 0.6] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.g>
      <text
        x="370"
        y="170"
        fontSize="9"
        fill="#1D4ED8"
        textAnchor="start"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        ER
      </text>

      {/* Golgi Apparatus with vesicles */}
      <motion.g
        filter="url(#organelleShadow)"
        animate={animate ? { y: [-4, 4, -4] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M370 270 Q400 262 370 254"
          stroke="#F59E0B"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M373 278 Q403 270 373 262"
          stroke="#FBBF24"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M376 286 Q406 278 376 270"
          stroke="#FCD34D"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Vesicles */}
        <circle cx="405" cy="260" r="6" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="412" cy="275" r="5" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="1" />
      </motion.g>
      <text
        x="385"
        y="305"
        fontSize="9"
        fill="#B45309"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Golgi
      </text>

      {/* Free Ribosomes scattered */}
      {[
        { cx: 150, cy: 135 },
        { cx: 165, cy: 150 },
        { cx: 175, cy: 140 },
        { cx: 315, cy: 145 },
        { cx: 300, cy: 160 },
        { cx: 140, cy: 240 },
        { cx: 160, cy: 255 },
        { cx: 180, cy: 245 },
        { cx: 320, cy: 250 },
        { cx: 340, cy: 240 },
      ].map((pos, i) => (
        <motion.circle
          key={`ribo-${i}`}
          cx={pos.cx}
          cy={pos.cy}
          r="5"
          fill="#10B981"
          filter="url(#glowEffect)"
          animate={animate ? { opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] } : undefined}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}

      {/* Vacuole */}
      <motion.g filter="url(#organelleShadow)">
        <motion.ellipse
          cx="155"
          cy="270"
          rx="28"
          ry="22"
          fill="#BFDBFE"
          stroke="#3B82F6"
          strokeWidth="3"
          animate={animate ? { rx: [28, 30, 28], ry: [22, 24, 22] } : undefined}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <ellipse cx="155" cy="270" rx="20" ry="15" fill="#DBEAFE" fillOpacity="0.5" />
      </motion.g>
      <text
        x="155"
        y="305"
        fontSize="9"
        fill="#1E40AF"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Vacuole
      </text>

      {/* Info Cards - Glass morphism style */}
      <g filter="url(#organelleShadow)">
        <rect x="20" y="330" width="230" height="55" rx="12" fill="white" fillOpacity="0.9" />
        <rect
          x="20"
          y="330"
          width="230"
          height="55"
          rx="12"
          fill="none"
          stroke="#14B8A6"
          strokeWidth="2"
        />
        <text
          x="135"
          y="352"
          fontSize="12"
          fill="#0F766E"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Cell Types
        </text>
        <text
          x="135"
          y="368"
          fontSize="10"
          fill="#059669"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Prokaryotic • Eukaryotic
        </text>
        <text
          x="135"
          y="382"
          fontSize="9"
          fill="#6B7280"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Plant Cell vs Animal Cell
        </text>
      </g>

      {/* Questions badge with glow */}
      <motion.g
        filter="url(#glowEffect)"
        animate={animate ? { scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="450" cy="360" r="32" fill="#14B8A6" />
        <circle
          cx="450"
          cy="360"
          r="28"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <text
          x="450"
          y="355"
          fontSize="16"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          8-10
        </text>
        <text
          x="450"
          y="372"
          fontSize="10"
          fill="#FFFFFF"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Questions
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
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 520 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Professional gradients */}
        <linearGradient id="plantBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="50%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#BFDBFE" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#16A34A" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="rootGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <filter id="plantShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12" />
        </filter>
        <filter id="leafShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15" />
        </filter>
        <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="plantCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Background with sky and soil */}
      <rect x="0" y="0" width="520" height="400" rx="24" fill="url(#plantBgGrad)" />
      <rect x="0" y="0" width="520" height="100" rx="24" fill="url(#skyGrad)" fillOpacity="0.5" />
      <rect x="0" y="320" width="520" height="80" rx="24" fill="url(#soilGrad)" fillOpacity="0.3" />

      {/* Title */}
      <text
        x="260"
        y="38"
        fontSize="20"
        fill="#15803D"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        Plant Physiology
      </text>
      <text
        x="260"
        y="56"
        fontSize="11"
        fill="#22C55E"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        Photosynthesis & Transport • 12% NEET Weightage
      </text>

      {/* Sun with professional glow */}
      <g filter="url(#sunGlow)">
        <motion.g
          animate={animate ? { rotate: [0, 360] } : undefined}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '75px 95px' }}
        >
          <circle cx="75" cy="95" r="32" fill="url(#sunGrad)" />
          <circle
            cx="75"
            cy="95"
            r="28"
            fill="none"
            stroke="#FDE047"
            strokeWidth="2"
            strokeOpacity="0.5"
          />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line
              key={`ray-${i}`}
              x1={75 + 38 * Math.cos((angle * Math.PI) / 180)}
              y1={95 + 38 * Math.sin((angle * Math.PI) / 180)}
              x2={75 + 52 * Math.cos((angle * Math.PI) / 180)}
              y2={95 + 52 * Math.sin((angle * Math.PI) / 180)}
              stroke="#FBBF24"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </motion.g>
      </g>

      {/* Light rays hitting plant */}
      <motion.g
        animate={animate ? { opacity: [0.3, 0.8, 0.3] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[
          { x1: 110, y1: 100, x2: 180, y2: 150 },
          { x1: 100, y1: 115, x2: 170, y2: 165 },
          { x1: 95, y1: 130, x2: 165, y2: 180 },
        ].map((ray, i) => (
          <line
            key={`light-${i}`}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            stroke="#FDE047"
            strokeWidth="4"
            strokeDasharray="8 4"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        ))}
      </motion.g>

      {/* Plant structure */}
      <g filter="url(#plantShadow)">
        {/* Main Stem with gradient */}
        <rect x="252" y="170" width="16" height="150" rx="4" fill="url(#stemGrad)" />

        {/* Stem detail lines */}
        <line
          x1="256"
          y1="180"
          x2="256"
          y2="310"
          stroke="#16A34A"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <line
          x1="264"
          y1="180"
          x2="264"
          y2="310"
          stroke="#16A34A"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </g>

      {/* Leaves with professional styling */}
      <motion.g
        filter="url(#leafShadow)"
        animate={animate ? { rotate: [-3, 3, -3] } : undefined}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '260px 180px' }}
      >
        {/* Upper leaves */}
        <ellipse
          cx="195"
          cy="165"
          rx="55"
          ry="25"
          fill="url(#leafGrad1)"
          transform="rotate(-35 195 165)"
        />
        <ellipse
          cx="325"
          cy="165"
          rx="55"
          ry="25"
          fill="url(#leafGrad1)"
          transform="rotate(35 325 165)"
        />

        {/* Lower leaves */}
        <ellipse
          cx="185"
          cy="215"
          rx="50"
          ry="22"
          fill="url(#leafGrad2)"
          transform="rotate(-25 185 215)"
        />
        <ellipse
          cx="335"
          cy="215"
          rx="50"
          ry="22"
          fill="url(#leafGrad2)"
          transform="rotate(25 335 215)"
        />

        {/* Leaf veins */}
        <path
          d="M160 155 Q195 165 220 160"
          stroke="#16A34A"
          strokeWidth="1.5"
          fill="none"
          strokeOpacity="0.5"
        />
        <path
          d="M300 160 Q325 165 360 155"
          stroke="#16A34A"
          strokeWidth="1.5"
          fill="none"
          strokeOpacity="0.5"
        />
      </motion.g>

      {/* Chloroplasts in leaf */}
      <motion.g
        animate={animate ? { scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[
          { cx: 185, cy: 160 },
          { cx: 200, cy: 170 },
          { cx: 175, cy: 175 },
        ].map((pos, i) => (
          <g key={`chloro-${i}`}>
            <ellipse
              cx={pos.cx}
              cy={pos.cy}
              rx="10"
              ry="5"
              fill="#4ADE80"
              stroke="#166534"
              strokeWidth="1"
            />
            <ellipse cx={pos.cx} cy={pos.cy} rx="6" ry="2" fill="#22C55E" />
          </g>
        ))}
      </motion.g>

      {/* Roots with professional styling */}
      <g filter="url(#leafShadow)">
        <path
          d="M260 320 Q220 340 170 365"
          stroke="url(#rootGrad)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M260 320 Q300 340 350 365"
          stroke="url(#rootGrad)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M260 320 Q260 350 260 380"
          stroke="url(#rootGrad)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Root hairs */}
        <path
          d="M200 350 Q185 360 175 375"
          stroke="#A16207"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M320 350 Q335 360 345 375"
          stroke="#A16207"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Water uptake animation */}
      <motion.g
        animate={animate ? { y: [8, -8, 8] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Water droplets */}
        <ellipse cx="190" cy="355" rx="5" ry="8" fill="#60A5FA" fillOpacity="0.8" />
        <ellipse cx="260" cy="370" rx="5" ry="8" fill="#60A5FA" fillOpacity="0.8" />
        <ellipse cx="330" cy="355" rx="5" ry="8" fill="#60A5FA" fillOpacity="0.8" />

        {/* Upward arrows */}
        <path
          d="M190 340 L190 320"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
        />
        <path d="M330 340 L330 320" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
      </motion.g>

      {/* Transpiration water vapor */}
      <motion.g
        animate={animate ? { y: [-5, -15, -5], opacity: [0.8, 0.2, 0.8] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[
          { cx: 180, cy: 135 },
          { cx: 200, cy: 128 },
          { cx: 320, cy: 135 },
          { cx: 340, cy: 128 },
        ].map((pos, i) => (
          <ellipse
            key={`vapor-${i}`}
            cx={pos.cx}
            cy={pos.cy}
            rx="4"
            ry="7"
            fill="#93C5FD"
            fillOpacity="0.7"
          />
        ))}
      </motion.g>

      {/* Photosynthesis Equation Card */}
      <g filter="url(#plantCardShadow)">
        <rect x="350" y="75" width="155" height="110" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="350"
          y="75"
          width="155"
          height="110"
          rx="16"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />

        <text
          x="427"
          y="100"
          fontSize="13"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          🌱 Photosynthesis
        </text>

        <rect x="360" y="110" width="135" height="32" rx="8" fill="#DCFCE7" />
        <text
          x="427"
          y="127"
          fontSize="11"
          fill="#15803D"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          6CO₂ + 6H₂O
        </text>
        <text
          x="427"
          y="138"
          fontSize="9"
          fill="#16A34A"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          → C₆H₁₂O₆ + 6O₂
        </text>

        <motion.g
          animate={animate ? { opacity: [0.6, 1, 0.6] } : undefined}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="360" y="148" width="135" height="24" rx="8" fill="#FEF3C7" />
          <text
            x="427"
            y="164"
            fontSize="9"
            fill="#B45309"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            ☀️ Light Energy Required
          </text>
        </motion.g>
      </g>

      {/* Key Topics Card */}
      <g filter="url(#plantCardShadow)">
        <rect x="15" y="225" width="130" height="120" rx="16" fill="white" fillOpacity="0.95" />
        <rect
          x="15"
          y="225"
          width="130"
          height="120"
          rx="16"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />

        <text
          x="80"
          y="250"
          fontSize="12"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          Key Topics
        </text>

        {[
          { label: 'Photosynthesis', y: 270, color: '#22C55E' },
          { label: 'Respiration', y: 288, color: '#3B82F6' },
          { label: 'Mineral Nutrition', y: 306, color: '#F59E0B' },
          { label: 'Transport', y: 324, color: '#8B5CF6' },
        ].map((topic, i) => (
          <g key={`topic-${i}`}>
            <circle cx="30" cy={topic.y - 3} r="4" fill={topic.color} />
            <text x="40" y={topic.y} fontSize="9" fill="#374151" fontFamily="system-ui, sans-serif">
              {topic.label}
            </text>
          </g>
        ))}
      </g>

      {/* Questions badge with glow */}
      <motion.g
        filter="url(#sunGlow)"
        animate={animate ? { scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="455" cy="330" r="35" fill="#22C55E" />
        <circle
          cx="455"
          cy="330"
          r="30"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <text
          x="455"
          y="325"
          fontSize="16"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          10-12
        </text>
        <text
          x="455"
          y="345"
          fontSize="10"
          fill="#FFFFFF"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Questions
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

// 21. Photosynthesis vs Respiration - Comparison illustration
export function PhotosynthesisVsRespirationIllustration({
  className = '',
  animate = true,
}: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 520 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Professional gradients */}
        <linearGradient id="pvrBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="photoSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DCFCE7" />
          <stop offset="100%" stopColor="#BBF7D0" />
        </linearGradient>
        <linearGradient id="respSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEE2E2" />
          <stop offset="100%" stopColor="#FECACA" />
        </linearGradient>
        <linearGradient id="sunGradPvr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="leafGradPvr" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="mitoGradPvr" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="atpGradPvr" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="vsGradPvr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <filter id="pvrShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12" />
        </filter>
        <filter id="pvrCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
        </filter>
        <filter id="pvrGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="sunGlowPvr" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="520" height="400" rx="24" fill="url(#pvrBgGrad)" />

      {/* Title */}
      <text
        x="260"
        y="38"
        fontSize="22"
        fill="#1E293B"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        Photosynthesis vs Respiration
      </text>
      <text
        x="260"
        y="58"
        fontSize="11"
        fill="#64748B"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        Energy Conversion in Living Organisms
      </text>

      {/* Photosynthesis side panel */}
      <g filter="url(#pvrShadow)">
        <rect x="15" y="75" width="235" height="310" rx="20" fill="url(#photoSideGrad)" />
        <rect
          x="15"
          y="75"
          width="235"
          height="310"
          rx="20"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
      </g>

      {/* Respiration side panel */}
      <g filter="url(#pvrShadow)">
        <rect x="270" y="75" width="235" height="310" rx="20" fill="url(#respSideGrad)" />
        <rect
          x="270"
          y="75"
          width="235"
          height="310"
          rx="20"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
      </g>

      {/* Photosynthesis Header */}
      <text
        x="132"
        y="105"
        fontSize="16"
        fill="#15803D"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        PHOTOSYNTHESIS
      </text>

      {/* Sun with glow */}
      <g filter="url(#sunGlowPvr)">
        <motion.g
          animate={animate ? { rotate: [0, 360] } : undefined}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '80px 160px' }}
        >
          <circle cx="80" cy="160" r="28" fill="url(#sunGradPvr)" />
          <circle
            cx="80"
            cy="160"
            r="24"
            fill="none"
            stroke="#FDE047"
            strokeWidth="2"
            strokeOpacity="0.5"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={`sun-ray-${i}`}
              x1={80 + 34 * Math.cos((angle * Math.PI) / 180)}
              y1={160 + 34 * Math.sin((angle * Math.PI) / 180)}
              x2={80 + 46 * Math.cos((angle * Math.PI) / 180)}
              y2={160 + 46 * Math.sin((angle * Math.PI) / 180)}
              stroke="#F59E0B"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </motion.g>
      </g>
      <text
        x="80"
        y="220"
        fontSize="10"
        fill="#B45309"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Light Energy
      </text>

      {/* Chloroplast/Leaf */}
      <motion.g
        filter="url(#pvrCardShadow)"
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '175px 165px' }}
      >
        <ellipse cx="175" cy="165" rx="38" ry="55" fill="url(#leafGradPvr)" />
        <line x1="175" y1="115" x2="175" y2="215" stroke="#15803D" strokeWidth="3" />
        <line
          x1="150"
          y1="140"
          x2="175"
          y2="165"
          stroke="#15803D"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
        <line
          x1="200"
          y1="140"
          x2="175"
          y2="165"
          stroke="#15803D"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
        <line
          x1="150"
          y1="190"
          x2="175"
          y2="165"
          stroke="#15803D"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
        <line
          x1="200"
          y1="190"
          x2="175"
          y2="165"
          stroke="#15803D"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
      </motion.g>

      {/* Photosynthesis equation card */}
      <g filter="url(#pvrCardShadow)">
        <rect x="30" y="240" width="205" height="85" rx="14" fill="white" fillOpacity="0.95" />
        <rect
          x="30"
          y="240"
          width="205"
          height="85"
          rx="14"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <text
          x="132"
          y="265"
          fontSize="12"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          6CO₂ + 6H₂O + Light
        </text>
        <text
          x="132"
          y="285"
          fontSize="11"
          fill="#16A34A"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          ↓ Chloroplast
        </text>
        <text
          x="132"
          y="310"
          fontSize="12"
          fill="#15803D"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          C₆H₁₂O₆ + 6O₂
        </text>
      </g>

      {/* O2 bubbles */}
      <motion.g
        animate={animate ? { y: [0, -20, 0], opacity: [0.4, 1, 0.4] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="55" cy="345" r="8" fill="#93C5FD" fillOpacity="0.8" />
        <circle cx="80" cy="360" r="6" fill="#93C5FD" fillOpacity="0.7" />
        <circle cx="65" cy="372" r="5" fill="#93C5FD" fillOpacity="0.6" />
      </motion.g>
      <text
        x="70"
        y="395"
        fontSize="10"
        fill="#3B82F6"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        O₂ Released
      </text>

      {/* Respiration Header */}
      <text
        x="387"
        y="105"
        fontSize="16"
        fill="#DC2626"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        RESPIRATION
      </text>

      {/* Mitochondria */}
      <motion.g
        filter="url(#pvrCardShadow)"
        animate={animate ? { scale: [1, 1.06, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '387px 165px' }}
      >
        <ellipse cx="387" cy="165" rx="55" ry="35" fill="url(#mitoGradPvr)" />
        <ellipse cx="387" cy="165" rx="48" ry="28" fill="none" stroke="#FCA5A5" strokeWidth="2" />
        {/* Cristae */}
        <path
          d="M345 165 Q360 145 375 165 Q390 185 405 165 Q420 145 435 165"
          stroke="#DC2626"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>
      <text
        x="387"
        y="215"
        fontSize="10"
        fill="#DC2626"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Mitochondria
      </text>

      {/* Respiration equation card */}
      <g filter="url(#pvrCardShadow)">
        <rect x="285" y="240" width="205" height="85" rx="14" fill="white" fillOpacity="0.95" />
        <rect
          x="285"
          y="240"
          width="205"
          height="85"
          rx="14"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text
          x="387"
          y="265"
          fontSize="12"
          fill="#DC2626"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          C₆H₁₂O₆ + 6O₂
        </text>
        <text
          x="387"
          y="285"
          fontSize="11"
          fill="#EF4444"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          ↓ Mitochondria
        </text>
        <text
          x="387"
          y="310"
          fontSize="12"
          fill="#DC2626"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          6CO₂ + 6H₂O + ATP
        </text>
      </g>

      {/* ATP Energy badge */}
      <motion.g
        filter="url(#pvrGlow)"
        animate={animate ? { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="440" cy="355" r="28" fill="url(#atpGradPvr)" />
        <circle
          cx="440"
          cy="355"
          r="24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.4"
        />
        <text
          x="440"
          y="350"
          fontSize="14"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          ATP
        </text>
        <text
          x="440"
          y="365"
          fontSize="9"
          fill="#FFFFFF"
          textAnchor="middle"
          fillOpacity="0.9"
          fontFamily="system-ui, sans-serif"
        >
          Energy
        </text>
      </motion.g>
      <text
        x="440"
        y="395"
        fontSize="10"
        fill="#B45309"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        38 ATP/Glucose
      </text>

      {/* VS circle in middle */}
      <g filter="url(#pvrGlow)">
        <circle cx="260" cy="165" r="30" fill="url(#vsGradPvr)" />
        <circle
          cx="260"
          cy="165"
          r="26"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <text
          x="260"
          y="172"
          fontSize="16"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          VS
        </text>
      </g>

      {/* Cycle arrows */}
      <motion.path
        d="M200 340 Q260 310 320 340"
        stroke="#8B5CF6"
        strokeWidth="3"
        fill="none"
        strokeDasharray="8 4"
        strokeLinecap="round"
        animate={animate ? { strokeDashoffset: [0, 12] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.path
        d="M320 360 Q260 390 200 360"
        stroke="#8B5CF6"
        strokeWidth="3"
        fill="none"
        strokeDasharray="8 4"
        strokeLinecap="round"
        animate={animate ? { strokeDashoffset: [12, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Arrow labels */}
      <text
        x="260"
        y="325"
        fontSize="9"
        fill="#7C3AED"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Glucose
      </text>
      <text
        x="260"
        y="380"
        fontSize="9"
        fill="#7C3AED"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        CO₂ + H₂O
      </text>
    </Wrapper>
  )
}

// 22. Molecular Biology - DNA/RNA illustration
export function MolecularBiologyIllustration({
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#EDE9FE" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Molecular Biology - 5% Weightage
      </text>

      {/* DNA Double Helix */}
      <motion.g
        animate={animate ? { rotate: [0, 5, 0, -5, 0] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '120px 160px' }}
      >
        {/* Left strand */}
        <path
          d="M80 70 Q100 90 80 110 Q60 130 80 150 Q100 170 80 190 Q60 210 80 230 Q100 250 80 270"
          stroke="#3B82F6"
          strokeWidth="4"
          fill="none"
        />
        {/* Right strand */}
        <path
          d="M160 70 Q140 90 160 110 Q180 130 160 150 Q140 170 160 190 Q180 210 160 230 Q140 250 160 270"
          stroke="#EC4899"
          strokeWidth="4"
          fill="none"
        />
        {/* Base pairs */}
        <line x1="80" y1="90" x2="160" y2="90" stroke="#22C55E" strokeWidth="3" />
        <line x1="80" y1="130" x2="160" y2="130" stroke="#F59E0B" strokeWidth="3" />
        <line x1="80" y1="170" x2="160" y2="170" stroke="#22C55E" strokeWidth="3" />
        <line x1="80" y1="210" x2="160" y2="210" stroke="#F59E0B" strokeWidth="3" />
        <line x1="80" y1="250" x2="160" y2="250" stroke="#22C55E" strokeWidth="3" />

        {/* Base pair labels */}
        <text x="120" y="85" fontSize="6" fill="#166534" textAnchor="middle">
          A-T
        </text>
        <text x="120" y="125" fontSize="6" fill="#B45309" textAnchor="middle">
          G-C
        </text>
        <text x="120" y="165" fontSize="6" fill="#166534" textAnchor="middle">
          T-A
        </text>
        <text x="120" y="205" fontSize="6" fill="#B45309" textAnchor="middle">
          C-G
        </text>
        <text x="120" y="245" fontSize="6" fill="#166534" textAnchor="middle">
          A-T
        </text>
      </motion.g>
      <text x="120" y="285" fontSize="8" fill="#3B82F6" textAnchor="middle" fontWeight="bold">
        DNA Double Helix
      </text>

      {/* Central Dogma arrows */}
      <rect
        x="200"
        y="60"
        width="180"
        height="90"
        rx="10"
        fill="#FFFFFF"
        stroke="#7C3AED"
        strokeWidth="2"
      />
      <text x="290" y="80" fontSize="9" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Central Dogma
      </text>

      <motion.g
        animate={animate ? { x: [0, 5, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <rect x="215" y="95" width="40" height="20" rx="4" fill="#3B82F6" />
        <text x="235" y="109" fontSize="7" fill="#FFFFFF" textAnchor="middle">
          DNA
        </text>
      </motion.g>

      <motion.path
        d="M260 105 L280 105"
        stroke="#7C3AED"
        strokeWidth="2"
        markerEnd="url(#arrow)"
        animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <text x="270" y="100" fontSize="5" fill="#7C3AED" textAnchor="middle">
        Transcription
      </text>

      <motion.g
        animate={animate ? { x: [0, 5, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <rect x="285" y="95" width="40" height="20" rx="4" fill="#EC4899" />
        <text x="305" y="109" fontSize="7" fill="#FFFFFF" textAnchor="middle">
          RNA
        </text>
      </motion.g>

      <motion.path
        d="M330 105 L350 105"
        stroke="#7C3AED"
        strokeWidth="2"
        animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
      />
      <text x="340" y="100" fontSize="5" fill="#7C3AED" textAnchor="middle">
        Translation
      </text>

      <motion.g
        animate={animate ? { x: [0, 5, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        <rect x="340" y="95" width="35" height="20" rx="4" fill="#22C55E" />
        <text x="357" y="109" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Protein
        </text>
      </motion.g>

      {/* Key topics */}
      <rect
        x="200"
        y="160"
        width="180"
        height="120"
        rx="10"
        fill="#FFFFFF"
        stroke="#8B5CF6"
        strokeWidth="1"
      />
      <text x="290" y="180" fontSize="8" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Key Topics:
      </text>
      <text x="290" y="198" fontSize="7" fill="#374151" textAnchor="middle">
        • DNA Replication
      </text>
      <text x="290" y="212" fontSize="7" fill="#374151" textAnchor="middle">
        • Transcription & Translation
      </text>
      <text x="290" y="226" fontSize="7" fill="#374151" textAnchor="middle">
        • Gene Regulation (Lac Operon)
      </text>
      <text x="290" y="240" fontSize="7" fill="#374151" textAnchor="middle">
        • Genetic Code
      </text>
      <text x="290" y="254" fontSize="7" fill="#374151" textAnchor="middle">
        • DNA Fingerprinting
      </text>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="360" cy="260" r="18" fill="#8B5CF6" />
        <text x="360" y="257" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          4-6
        </text>
        <text x="360" y="268" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 23. Plant Kingdom - Plant diversity illustration
export function PlantKingdomIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <text x="200" y="35" fontSize="14" fill="#059669" textAnchor="middle" fontWeight="bold">
        Plant Kingdom - 6% Weightage
      </text>

      {/* Algae */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="25"
          y="55"
          width="70"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <ellipse cx="60" cy="85" rx="20" ry="15" fill="#86EFAC" />
        <ellipse cx="50" cy="100" rx="12" ry="8" fill="#4ADE80" />
        <ellipse cx="70" cy="105" rx="10" ry="6" fill="#22C55E" />
        <text x="60" y="125" fontSize="8" fill="#15803D" textAnchor="middle" fontWeight="bold">
          Algae
        </text>
      </motion.g>

      {/* Bryophytes (Moss) */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <rect
          x="105"
          y="55"
          width="70"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <rect x="125" y="100" width="30" height="25" rx="2" fill="#86EFAC" />
        <line x1="135" y1="100" x2="135" y2="80" stroke="#15803D" strokeWidth="2" />
        <ellipse cx="135" cy="75" rx="8" ry="10" fill="#4ADE80" />
        <line x1="145" y1="100" x2="145" y2="85" stroke="#15803D" strokeWidth="2" />
        <ellipse cx="145" cy="80" rx="6" ry="8" fill="#22C55E" />
        <text x="140" y="125" fontSize="7" fill="#15803D" textAnchor="middle" fontWeight="bold">
          Bryophytes
        </text>
      </motion.g>

      {/* Pteridophytes (Fern) */}
      <motion.g
        animate={animate ? { rotate: [-2, 2, -2] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '220px 100px' }}
      >
        <rect
          x="185"
          y="55"
          width="70"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <line x1="220" y1="125" x2="220" y2="80" stroke="#15803D" strokeWidth="3" />
        <path d="M220 80 Q200 70 195 60" stroke="#22C55E" strokeWidth="2" fill="none" />
        <path d="M220 80 Q240 70 245 60" stroke="#22C55E" strokeWidth="2" fill="none" />
        <path d="M220 90 Q205 85 200 75" stroke="#4ADE80" strokeWidth="2" fill="none" />
        <path d="M220 90 Q235 85 240 75" stroke="#4ADE80" strokeWidth="2" fill="none" />
        <text x="220" y="125" fontSize="7" fill="#15803D" textAnchor="middle" fontWeight="bold">
          Pteridophytes
        </text>
      </motion.g>

      {/* Gymnosperms (Pine) */}
      <motion.g
        animate={animate ? { y: [-1, 1, -1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <rect
          x="265"
          y="55"
          width="70"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <polygon points="300,65 280,115 320,115" fill="#22C55E" />
        <polygon points="300,80 285,105 315,105" fill="#4ADE80" />
        <rect x="295" y="115" width="10" height="10" fill="#8B4513" />
        <text x="300" y="125" fontSize="7" fill="#15803D" textAnchor="middle" fontWeight="bold">
          Gymnosperms
        </text>
      </motion.g>

      {/* Angiosperms (Flower) */}
      <motion.g
        animate={animate ? { scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="345"
          y="55"
          width="45"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <circle cx="367" cy="85" r="15" fill="#F472B6" />
        <circle cx="367" cy="85" r="8" fill="#FCD34D" />
        <line x1="367" y1="100" x2="367" y2="120" stroke="#15803D" strokeWidth="2" />
        <ellipse cx="357" cy="110" rx="8" ry="5" fill="#4ADE80" />
        <ellipse cx="377" cy="110" rx="8" ry="5" fill="#4ADE80" />
        <text x="367" y="125" fontSize="6" fill="#15803D" textAnchor="middle" fontWeight="bold">
          Angiosperms
        </text>
      </motion.g>

      {/* Classification chart */}
      <rect
        x="30"
        y="150"
        width="340"
        height="125"
        rx="10"
        fill="#FFFFFF"
        stroke="#10B981"
        strokeWidth="2"
      />
      <text x="200" y="170" fontSize="9" fill="#059669" textAnchor="middle" fontWeight="bold">
        Plant Classification
      </text>

      {/* Table headers */}
      <line x1="30" y1="180" x2="370" y2="180" stroke="#D1FAE5" strokeWidth="1" />
      <text x="80" y="195" fontSize="7" fill="#374151" textAnchor="middle" fontWeight="bold">
        Group
      </text>
      <text x="160" y="195" fontSize="7" fill="#374151" textAnchor="middle" fontWeight="bold">
        Example
      </text>
      <text x="240" y="195" fontSize="7" fill="#374151" textAnchor="middle" fontWeight="bold">
        Features
      </text>
      <text x="320" y="195" fontSize="7" fill="#374151" textAnchor="middle" fontWeight="bold">
        Vascular
      </text>

      {/* Table rows */}
      <text x="80" y="212" fontSize="6" fill="#22C55E" textAnchor="middle">
        Algae
      </text>
      <text x="160" y="212" fontSize="6" fill="#6B7280" textAnchor="middle">
        Spirogyra
      </text>
      <text x="240" y="212" fontSize="6" fill="#6B7280" textAnchor="middle">
        Thallophyta
      </text>
      <text x="320" y="212" fontSize="6" fill="#EF4444" textAnchor="middle">
        No
      </text>

      <text x="80" y="227" fontSize="6" fill="#22C55E" textAnchor="middle">
        Bryophytes
      </text>
      <text x="160" y="227" fontSize="6" fill="#6B7280" textAnchor="middle">
        Moss, Liverwort
      </text>
      <text x="240" y="227" fontSize="6" fill="#6B7280" textAnchor="middle">
        Amphibians
      </text>
      <text x="320" y="227" fontSize="6" fill="#EF4444" textAnchor="middle">
        No
      </text>

      <text x="80" y="242" fontSize="6" fill="#22C55E" textAnchor="middle">
        Pteridophytes
      </text>
      <text x="160" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
        Fern, Selaginella
      </text>
      <text x="240" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
        Seedless
      </text>
      <text x="320" y="242" fontSize="6" fill="#22C55E" textAnchor="middle">
        Yes
      </text>

      <text x="80" y="257" fontSize="6" fill="#22C55E" textAnchor="middle">
        Gymnosperms
      </text>
      <text x="160" y="257" fontSize="6" fill="#6B7280" textAnchor="middle">
        Pine, Cycas
      </text>
      <text x="240" y="257" fontSize="6" fill="#6B7280" textAnchor="middle">
        Naked Seeds
      </text>
      <text x="320" y="257" fontSize="6" fill="#22C55E" textAnchor="middle">
        Yes
      </text>

      <text x="80" y="272" fontSize="6" fill="#22C55E" textAnchor="middle">
        Angiosperms
      </text>
      <text x="160" y="272" fontSize="6" fill="#6B7280" textAnchor="middle">
        Rose, Mango
      </text>
      <text x="240" y="272" fontSize="6" fill="#6B7280" textAnchor="middle">
        Covered Seeds
      </text>
      <text x="320" y="272" fontSize="6" fill="#22C55E" textAnchor="middle">
        Yes
      </text>
    </Wrapper>
  )
}

// 24. Evolution - Evolutionary tree illustration
export function EvolutionIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FDF4FF" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#A855F7" textAnchor="middle" fontWeight="bold">
        Evolution - 8% Weightage
      </text>

      {/* Tree of Life */}
      <motion.g
        animate={animate ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Main trunk */}
        <rect x="95" y="220" width="10" height="60" fill="#8B4513" />

        {/* Branches */}
        <path d="M100 220 Q100 180 60 150" stroke="#8B4513" strokeWidth="4" fill="none" />
        <path d="M100 220 Q100 180 140 150" stroke="#8B4513" strokeWidth="4" fill="none" />
        <path d="M60 150 Q50 130 40 120" stroke="#8B4513" strokeWidth="3" fill="none" />
        <path d="M60 150 Q70 130 80 120" stroke="#8B4513" strokeWidth="3" fill="none" />
        <path d="M140 150 Q130 130 120 120" stroke="#8B4513" strokeWidth="3" fill="none" />
        <path d="M140 150 Q150 130 160 120" stroke="#8B4513" strokeWidth="3" fill="none" />

        {/* Leaves/endpoints */}
        <circle cx="40" cy="115" r="12" fill="#4ADE80" />
        <circle cx="80" cy="115" r="12" fill="#22C55E" />
        <circle cx="120" cy="115" r="12" fill="#14B8A6" />
        <circle cx="160" cy="115" r="12" fill="#06B6D4" />

        {/* Labels */}
        <text x="40" y="100" fontSize="6" fill="#166534" textAnchor="middle">
          Fish
        </text>
        <text x="80" y="100" fontSize="6" fill="#166534" textAnchor="middle">
          Amphibia
        </text>
        <text x="120" y="100" fontSize="6" fill="#0F766E" textAnchor="middle">
          Reptiles
        </text>
        <text x="160" y="100" fontSize="6" fill="#0891B2" textAnchor="middle">
          Mammals
        </text>
      </motion.g>
      <text x="100" y="290" fontSize="8" fill="#A855F7" textAnchor="middle" fontWeight="bold">
        Phylogenetic Tree
      </text>

      {/* Darwin portrait placeholder */}
      <motion.g
        animate={animate ? { opacity: [0.8, 1, 0.8] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="280" cy="90" r="35" fill="#E9D5FF" stroke="#A855F7" strokeWidth="2" />
        <circle cx="280" cy="80" r="15" fill="#FED7AA" />
        <ellipse cx="280" cy="105" rx="20" ry="15" fill="#1E293B" />
        <text x="280" y="135" fontSize="7" fill="#7C3AED" textAnchor="middle">
          Charles Darwin
        </text>
        <text x="280" y="145" fontSize="6" fill="#9CA3AF" textAnchor="middle">
          1859
        </text>
      </motion.g>

      {/* Key concepts */}
      <rect
        x="210"
        y="160"
        width="170"
        height="120"
        rx="10"
        fill="#FFFFFF"
        stroke="#A855F7"
        strokeWidth="2"
      />
      <text x="295" y="180" fontSize="9" fill="#A855F7" textAnchor="middle" fontWeight="bold">
        Key Concepts
      </text>

      <motion.g
        animate={animate ? { x: [0, 2, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <text x="295" y="200" fontSize="7" fill="#374151" textAnchor="middle">
          • Natural Selection
        </text>
        <text x="295" y="215" fontSize="7" fill="#374151" textAnchor="middle">
          • Homology & Analogy
        </text>
        <text x="295" y="230" fontSize="7" fill="#374151" textAnchor="middle">
          • Hardy-Weinberg Principle
        </text>
        <text x="295" y="245" fontSize="7" fill="#374151" textAnchor="middle">
          • Adaptive Radiation
        </text>
        <text x="295" y="260" fontSize="7" fill="#374151" textAnchor="middle">
          • Human Evolution
        </text>
      </motion.g>

      {/* Human evolution silhouettes */}
      <motion.g
        animate={animate ? { x: [0, 3, 0] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect
          x="25"
          y="170"
          width="170"
          height="45"
          rx="8"
          fill="#FFFFFF"
          stroke="#C084FC"
          strokeWidth="1"
        />
        <text x="110" y="185" fontSize="7" fill="#A855F7" textAnchor="middle" fontWeight="bold">
          Human Evolution
        </text>

        {/* Simple human silhouettes */}
        <ellipse cx="45" cy="200" rx="6" ry="8" fill="#9CA3AF" />
        <ellipse cx="75" cy="198" rx="6" ry="9" fill="#6B7280" />
        <ellipse cx="105" cy="196" rx="6" ry="10" fill="#4B5563" />
        <ellipse cx="135" cy="194" rx="6" ry="11" fill="#374151" />
        <ellipse cx="165" cy="192" rx="6" ry="12" fill="#1F2937" />
      </motion.g>

      {/* Questions badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="360" cy="260" r="18" fill="#A855F7" />
        <text x="360" y="257" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          6-8
        </text>
        <text x="360" y="268" fontSize="6" fill="#FFFFFF" textAnchor="middle">
          Qs
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 25. Microbes in Human Welfare - Bacteria/virus illustration
export function MicrobesIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <text x="200" y="35" fontSize="12" fill="#16A34A" textAnchor="middle" fontWeight="bold">
        Microbes in Human Welfare - 4% Weightage
      </text>

      {/* Bacteria */}
      <motion.g
        animate={animate ? { rotate: [0, 10, 0, -10, 0] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '70px 100px' }}
      >
        <ellipse cx="70" cy="100" rx="30" ry="18" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
        <line x1="40" y1="95" x2="25" y2="85" stroke="#3B82F6" strokeWidth="2" />
        <line x1="40" y1="105" x2="25" y2="115" stroke="#3B82F6" strokeWidth="2" />
        <line x1="100" y1="95" x2="115" y2="85" stroke="#3B82F6" strokeWidth="2" />
        <line x1="100" y1="105" x2="115" y2="115" stroke="#3B82F6" strokeWidth="2" />
        <text x="70" y="130" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Bacteria
        </text>
        <text x="70" y="142" fontSize="6" fill="#6B7280" textAnchor="middle">
          Lactobacillus
        </text>
      </motion.g>

      {/* Yeast */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse
          cx="170"
          cy="100"
          rx="25"
          ry="25"
          fill="#FDE68A"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <circle cx="165" cy="95" r="5" fill="#FEF3C7" />
        <ellipse cx="185" cy="85" rx="12" ry="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
        <text x="170" y="135" fontSize="8" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Yeast
        </text>
        <text x="170" y="147" fontSize="6" fill="#6B7280" textAnchor="middle">
          Saccharomyces
        </text>
      </motion.g>

      {/* Virus */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <polygon
          points="270,75 250,100 270,125 290,100"
          fill="#FCA5A5"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <circle cx="270" cy="100" r="12" fill="#FECACA" />
        <line x1="270" y1="75" x2="270" y2="60" stroke="#EF4444" strokeWidth="2" />
        <line x1="250" y1="100" x2="235" y2="100" stroke="#EF4444" strokeWidth="2" />
        <line x1="290" y1="100" x2="305" y2="100" stroke="#EF4444" strokeWidth="2" />
        <line x1="270" y1="125" x2="270" y2="140" stroke="#EF4444" strokeWidth="2" />
        <text x="270" y="160" fontSize="8" fill="#DC2626" textAnchor="middle" fontWeight="bold">
          Virus
        </text>
        <text x="270" y="172" fontSize="6" fill="#6B7280" textAnchor="middle">
          Bacteriophage
        </text>
      </motion.g>

      {/* Mushroom */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <ellipse cx="360" cy="95" rx="25" ry="12" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
        <rect
          x="352"
          y="95"
          width="16"
          height="30"
          fill="#FDF2F8"
          stroke="#EC4899"
          strokeWidth="1"
        />
        <text x="360" y="135" fontSize="8" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          Fungi
        </text>
        <text x="360" y="147" fontSize="6" fill="#6B7280" textAnchor="middle">
          Penicillium
        </text>
      </motion.g>

      {/* Applications */}
      <rect
        x="30"
        y="180"
        width="340"
        height="95"
        rx="10"
        fill="#FFFFFF"
        stroke="#22C55E"
        strokeWidth="2"
      />
      <text x="200" y="200" fontSize="9" fill="#16A34A" textAnchor="middle" fontWeight="bold">
        Applications in Human Welfare
      </text>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Application boxes */}
        <rect x="45" y="210" width="75" height="55" rx="6" fill="#DBEAFE" />
        <text x="82" y="228" fontSize="7" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Antibiotics
        </text>
        <text x="82" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
          Penicillin
        </text>
        <text x="82" y="254" fontSize="6" fill="#6B7280" textAnchor="middle">
          Streptomycin
        </text>

        <rect x="130" y="210" width="75" height="55" rx="6" fill="#FEF3C7" />
        <text x="167" y="228" fontSize="7" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Fermentation
        </text>
        <text x="167" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
          Bread, Alcohol
        </text>
        <text x="167" y="254" fontSize="6" fill="#6B7280" textAnchor="middle">
          Curd, Cheese
        </text>

        <rect x="215" y="210" width="75" height="55" rx="6" fill="#DCFCE7" />
        <text x="252" y="228" fontSize="7" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          Biogas
        </text>
        <text x="252" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
          Methanogens
        </text>
        <text x="252" y="254" fontSize="6" fill="#6B7280" textAnchor="middle">
          Gobar Gas
        </text>

        <rect x="300" y="210" width="60" height="55" rx="6" fill="#FCE7F3" />
        <text x="330" y="228" fontSize="7" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          STP
        </text>
        <text x="330" y="242" fontSize="6" fill="#6B7280" textAnchor="middle">
          Sewage
        </text>
        <text x="330" y="254" fontSize="6" fill="#6B7280" textAnchor="middle">
          Treatment
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 26. NEET 180+ Strategy - Target score illustration
export function NEET180StrategyIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 520 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Professional gradients */}
        <linearGradient id="stratBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="50%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#BFDBFE" />
        </linearGradient>
        <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="successGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <filter id="stratShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.15" />
        </filter>
        <filter id="stratCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
        </filter>
        <filter id="stratGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="targetGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="520" height="400" rx="24" fill="url(#stratBgGrad)" />

      {/* Decorative elements */}
      <circle cx="450" cy="350" r="120" fill="#3B82F6" fillOpacity="0.06" />
      <circle cx="80" cy="60" r="80" fill="#22C55E" fillOpacity="0.08" />

      {/* Title */}
      <text
        x="260"
        y="38"
        fontSize="22"
        fill="#1D4ED8"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        Score 320+/360 in NEET Biology
      </text>
      <text
        x="260"
        y="58"
        fontSize="11"
        fill="#3B82F6"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        Complete 6-Month Strategy for Top Ranks
      </text>

      {/* Target circle - Professional with rings */}
      <g filter="url(#targetGlow)">
        <motion.g
          animate={animate ? { scale: [1, 1.03, 1] } : undefined}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="120" cy="190" r="75" fill="white" stroke="#DC2626" strokeWidth="10" />
          <circle cx="120" cy="190" r="60" fill="white" stroke="#F97316" strokeWidth="8" />
          <circle cx="120" cy="190" r="45" fill="white" stroke="#FBBF24" strokeWidth="6" />
          <circle cx="120" cy="190" r="30" fill="white" stroke="#84CC16" strokeWidth="4" />
          <circle cx="120" cy="190" r="16" fill="url(#successGrad)" />
          {/* Center dot */}
          <circle cx="120" cy="190" r="5" fill="white" />
        </motion.g>
      </g>

      {/* Arrow hitting target */}
      <motion.g
        animate={animate ? { x: [-30, 0], opacity: [0, 1] } : undefined}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeOut' }}
      >
        <line
          x1="20"
          y1="190"
          x2="100"
          y2="190"
          stroke="url(#arrowGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <polygon points="104,190 92,183 92,197" fill="#1E293B" />
        {/* Arrow fletching */}
        <path d="M25 185 L15 180 L15 200 L25 195" fill="#64748B" />
      </motion.g>

      {/* Score Badge - Glass morphism */}
      <motion.g
        filter="url(#stratShadow)"
        animate={animate ? { y: [-4, 4, -4] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="45" y="290" width="150" height="65" rx="16" fill="url(#successGrad)" />
        <rect x="45" y="290" width="150" height="65" rx="16" fill="white" fillOpacity="0.1" />
        <text
          x="120"
          y="318"
          fontSize="22"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          320+/360
        </text>
        <text
          x="120"
          y="342"
          fontSize="11"
          fill="#FFFFFF"
          textAnchor="middle"
          fillOpacity="0.9"
          fontFamily="system-ui, sans-serif"
        >
          🎯 Target Score
        </text>
      </motion.g>

      {/* Strategy Card */}
      <g filter="url(#stratCardShadow)">
        <rect x="230" y="80" width="275" height="295" rx="20" fill="white" fillOpacity="0.95" />
        <rect
          x="230"
          y="80"
          width="275"
          height="295"
          rx="20"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
        />

        <text
          x="367"
          y="112"
          fontSize="14"
          fill="#1D4ED8"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          📚 6-Month Strategy
        </text>
        <line x1="250" y1="125" x2="485" y2="125" stroke="#E2E8F0" strokeWidth="2" />

        {/* Phase 1 */}
        <motion.g
          animate={animate ? { opacity: [0.85, 1, 0.85] } : undefined}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="245" y="135" width="245" height="45" rx="10" fill="#DBEAFE" />
          <circle cx="265" cy="157" r="12" fill="#3B82F6" />
          <text x="265" y="162" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            1
          </text>
          <text
            x="285"
            y="152"
            fontSize="11"
            fill="#1D4ED8"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Months 1-2: NCERT Foundation
          </text>
          <text x="285" y="168" fontSize="9" fill="#64748B" fontFamily="system-ui, sans-serif">
            Complete Class 11 & 12 NCERT thoroughly
          </text>
        </motion.g>

        {/* Phase 2 */}
        <motion.g
          animate={animate ? { opacity: [0.85, 1, 0.85] } : undefined}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <rect x="245" y="185" width="245" height="45" rx="10" fill="#FEF3C7" />
          <circle cx="265" cy="207" r="12" fill="#F59E0B" />
          <text x="265" y="212" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            2
          </text>
          <text
            x="285"
            y="202"
            fontSize="11"
            fill="#B45309"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Months 3-4: Practice MCQs
          </text>
          <text x="285" y="218" fontSize="9" fill="#64748B" fontFamily="system-ui, sans-serif">
            5000+ topic-wise questions daily
          </text>
        </motion.g>

        {/* Phase 3 */}
        <motion.g
          animate={animate ? { opacity: [0.85, 1, 0.85] } : undefined}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <rect x="245" y="235" width="245" height="45" rx="10" fill="#DCFCE7" />
          <circle cx="265" cy="257" r="12" fill="#22C55E" />
          <text x="265" y="262" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            3
          </text>
          <text
            x="285"
            y="252"
            fontSize="11"
            fill="#16A34A"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Months 5-6: Mock Tests
          </text>
          <text x="285" y="268" fontSize="9" fill="#64748B" fontFamily="system-ui, sans-serif">
            Full syllabus tests every week
          </text>
        </motion.g>

        {/* Phase 4 */}
        <motion.g
          animate={animate ? { opacity: [0.85, 1, 0.85] } : undefined}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <rect x="245" y="285" width="245" height="45" rx="10" fill="#FCE7F3" />
          <circle cx="265" cy="307" r="12" fill="#EC4899" />
          <text x="265" y="312" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
            4
          </text>
          <text
            x="285"
            y="302"
            fontSize="11"
            fill="#DB2777"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            Final Week: Revision
          </text>
          <text x="285" y="318" fontSize="9" fill="#64748B" fontFamily="system-ui, sans-serif">
            Focus only on weak areas
          </text>
        </motion.g>

        {/* Progress bar */}
        <rect x="245" y="340" width="245" height="8" rx="4" fill="#E2E8F0" />
        <motion.rect
          x="245"
          y="340"
          width="0"
          height="8"
          rx="4"
          fill="url(#successGrad)"
          animate={animate ? { width: [0, 245] } : undefined}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text
          x="367"
          y="362"
          fontSize="9"
          fill="#64748B"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Progress to NEET Success
        </text>
      </g>

      {/* Success checkmark */}
      <motion.g
        filter="url(#stratGlow)"
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="480" cy="50" r="25" fill="url(#successGrad)" />
        <circle
          cx="480"
          cy="50"
          r="20"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <path
          d="M468 50 L476 58 L492 42"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Stats badges */}
      <g filter="url(#stratCardShadow)">
        <rect x="35" y="80" width="80" height="65" rx="12" fill="white" fillOpacity="0.95" />
        <text
          x="75"
          y="108"
          fontSize="20"
          fill="#3B82F6"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          98%
        </text>
        <text
          x="75"
          y="130"
          fontSize="8"
          fill="#64748B"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Success Rate
        </text>
      </g>

      <g filter="url(#stratCardShadow)">
        <rect x="125" y="80" width="90" height="65" rx="12" fill="white" fillOpacity="0.95" />
        <text
          x="170"
          y="108"
          fontSize="20"
          fill="#22C55E"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          2500+
        </text>
        <text
          x="170"
          y="130"
          fontSize="8"
          fill="#64748B"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Students Placed
        </text>
      </g>
    </Wrapper>
  )
}

// 27. Dropper Strategy - Second attempt illustration
export function DropperStrategyIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FDF2F8" />

      {/* Title */}
      <text x="200" y="35" fontSize="12" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        NEET Dropper: Score 680+ in Second Attempt
      </text>

      {/* Before vs After comparison */}
      {/* First attempt - faded */}
      <motion.g
        animate={animate ? { opacity: [0.5, 0.7, 0.5] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="30"
          y="60"
          width="150"
          height="100"
          rx="10"
          fill="#FEE2E2"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text x="105" y="85" fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="bold">
          1st Attempt
        </text>
        <circle cx="105" cy="120" r="30" fill="#FECACA" />
        <text x="105" y="125" fontSize="12" fill="#DC2626" textAnchor="middle" fontWeight="bold">
          500
        </text>
        <text x="105" y="155" fontSize="7" fill="#6B7280" textAnchor="middle">
          Marks Scored
        </text>
      </motion.g>

      {/* Arrow */}
      <motion.g
        animate={animate ? { x: [0, 5, 0] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <line x1="190" y1="110" x2="220" y2="110" stroke="#8B5CF6" strokeWidth="3" />
        <polygon points="220,110 210,105 210,115" fill="#8B5CF6" />
        <text x="205" y="100" fontSize="6" fill="#8B5CF6" textAnchor="middle">
          1 Year
        </text>
      </motion.g>

      {/* Second attempt - bright */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="230"
          y="60"
          width="150"
          height="100"
          rx="10"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="3"
        />
        <text x="305" y="85" fontSize="9" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          2nd Attempt
        </text>
        <circle cx="305" cy="120" r="30" fill="#86EFAC" />
        <text x="305" y="125" fontSize="12" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          680+
        </text>
        <text x="305" y="155" fontSize="7" fill="#166534" textAnchor="middle">
          Target Score
        </text>
      </motion.g>

      {/* Key changes */}
      <rect
        x="30"
        y="175"
        width="340"
        height="100"
        rx="12"
        fill="#FFFFFF"
        stroke="#EC4899"
        strokeWidth="2"
      />
      <text x="200" y="195" fontSize="10" fill="#BE185D" textAnchor="middle" fontWeight="bold">
        Dropper Strategy Keys
      </text>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="45" y="205" width="100" height="55" rx="6" fill="#DBEAFE" />
        <text x="95" y="223" fontSize="7" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Identify Weak
        </text>
        <text x="95" y="235" fontSize="7" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Areas
        </text>
        <text x="95" y="250" fontSize="6" fill="#6B7280" textAnchor="middle">
          Analyze last year
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <rect x="155" y="205" width="100" height="55" rx="6" fill="#FEF3C7" />
        <text x="205" y="223" fontSize="7" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Dedicated
        </text>
        <text x="205" y="235" fontSize="7" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Coaching
        </text>
        <text x="205" y="250" fontSize="6" fill="#6B7280" textAnchor="middle">
          12 hrs/day study
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <rect x="265" y="205" width="100" height="55" rx="6" fill="#DCFCE7" />
        <text x="315" y="223" fontSize="7" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          Regular
        </text>
        <text x="315" y="235" fontSize="7" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          Mock Tests
        </text>
        <text x="315" y="250" fontSize="6" fill="#6B7280" textAnchor="middle">
          50+ full tests
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 28. Class 11 Foundation - Building blocks illustration
export function Class11FoundationIllustration({
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#F0FDF4" />

      {/* Title */}
      <text x="200" y="35" fontSize="12" fill="#166534" textAnchor="middle" fontWeight="bold">
        Class 11 NEET Foundation - Build Strong Base
      </text>

      {/* Building blocks pyramid */}
      <motion.g
        animate={animate ? { y: [0, -3, 0] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      >
        <rect
          x="145"
          y="60"
          width="110"
          height="35"
          rx="4"
          fill="#22C55E"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="200" y="82" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          NEET SUCCESS
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { y: [0, -3, 0] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <rect
          x="115"
          y="100"
          width="80"
          height="35"
          rx="4"
          fill="#4ADE80"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="155" y="122" fontSize="7" fill="#166534" textAnchor="middle" fontWeight="bold">
          Class 12
        </text>
        <rect
          x="205"
          y="100"
          width="80"
          height="35"
          rx="4"
          fill="#4ADE80"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="245" y="122" fontSize="7" fill="#166534" textAnchor="middle" fontWeight="bold">
          Practice
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { y: [0, -3, 0] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <rect
          x="85"
          y="140"
          width="75"
          height="35"
          rx="4"
          fill="#86EFAC"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="122" y="162" fontSize="6" fill="#166534" textAnchor="middle" fontWeight="bold">
          Cell Biology
        </text>
        <rect
          x="165"
          y="140"
          width="70"
          height="35"
          rx="4"
          fill="#86EFAC"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="200" y="162" fontSize="6" fill="#166534" textAnchor="middle" fontWeight="bold">
          Diversity
        </text>
        <rect
          x="240"
          y="140"
          width="75"
          height="35"
          rx="4"
          fill="#86EFAC"
          stroke="#166534"
          strokeWidth="2"
        />
        <text x="277" y="162" fontSize="6" fill="#166534" textAnchor="middle" fontWeight="bold">
          Plant Phys.
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { y: [0, -3, 0] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="55"
          y="180"
          width="290"
          height="35"
          rx="4"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <text x="200" y="202" fontSize="9" fill="#166534" textAnchor="middle" fontWeight="bold">
          CLASS 11 FOUNDATION - 60% NEET Weightage
        </text>
      </motion.g>

      {/* Key stats */}
      <rect
        x="30"
        y="225"
        width="340"
        height="55"
        rx="10"
        fill="#FFFFFF"
        stroke="#22C55E"
        strokeWidth="2"
      />

      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="80" cy="252" r="18" fill="#22C55E" />
        <text x="80" y="249" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          60%
        </text>
        <text x="80" y="260" fontSize="5" fill="#FFFFFF" textAnchor="middle">
          Weightage
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <circle cx="155" cy="252" r="18" fill="#3B82F6" />
        <text x="155" y="249" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          16
        </text>
        <text x="155" y="260" fontSize="5" fill="#FFFFFF" textAnchor="middle">
          Chapters
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        <circle cx="230" cy="252" r="18" fill="#F59E0B" />
        <text x="230" y="249" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          54
        </text>
        <text x="230" y="260" fontSize="5" fill="#FFFFFF" textAnchor="middle">
          Questions
        </text>
      </motion.g>

      <text x="310" y="245" fontSize="7" fill="#374151" textAnchor="middle">
        Start early,
      </text>
      <text x="310" y="260" fontSize="7" fill="#166534" textAnchor="middle" fontWeight="bold">
        Win big!
      </text>
    </Wrapper>
  )
}

// 29. Class 12 Board Balance - Dual focus illustration
export function Class12BoardBalanceIllustration({
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#FEF3C7" />

      {/* Title */}
      <text x="200" y="35" fontSize="12" fill="#B45309" textAnchor="middle" fontWeight="bold">
        Class 12: Balance Board Exams + NEET 2025
      </text>

      {/* Balance scale */}
      <line x1="200" y1="70" x2="200" y2="120" stroke="#92400E" strokeWidth="4" />
      <motion.g
        animate={animate ? { rotate: [-3, 3, -3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: '200px 120px' }}
      >
        <line x1="100" y1="120" x2="300" y2="120" stroke="#92400E" strokeWidth="4" />

        {/* Board exam side */}
        <rect x="70" y="130" width="80" height="60" rx="8" fill="#3B82F6" />
        <text x="110" y="155" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Board
        </text>
        <text x="110" y="170" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          Exams
        </text>
        <text x="110" y="185" fontSize="7" fill="#DBEAFE" textAnchor="middle">
          March 2025
        </text>

        {/* NEET side */}
        <rect x="250" y="130" width="80" height="60" rx="8" fill="#22C55E" />
        <text x="290" y="155" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          NEET
        </text>
        <text x="290" y="170" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          2025
        </text>
        <text x="290" y="185" fontSize="7" fill="#DCFCE7" textAnchor="middle">
          May 2025
        </text>
      </motion.g>

      {/* Calendar timeline */}
      <rect
        x="30"
        y="200"
        width="340"
        height="75"
        rx="10"
        fill="#FFFFFF"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      <text x="200" y="220" fontSize="9" fill="#B45309" textAnchor="middle" fontWeight="bold">
        Smart Schedule
      </text>

      {/* Timeline dots */}
      <line x1="60" y1="250" x2="340" y2="250" stroke="#D1D5DB" strokeWidth="2" />

      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="80" cy="250" r="8" fill="#3B82F6" />
        <text x="80" y="242" fontSize="6" fill="#1D4ED8" textAnchor="middle">
          Aug
        </text>
        <text x="80" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Boards+NEET
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      >
        <circle cx="140" cy="250" r="8" fill="#8B5CF6" />
        <text x="140" y="242" fontSize="6" fill="#7C3AED" textAnchor="middle">
          Dec
        </text>
        <text x="140" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Board Focus
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      >
        <circle cx="200" cy="250" r="8" fill="#EC4899" />
        <text x="200" y="242" fontSize="6" fill="#DB2777" textAnchor="middle">
          Mar
        </text>
        <text x="200" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Boards Done
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
      >
        <circle cx="260" cy="250" r="8" fill="#F59E0B" />
        <text x="260" y="242" fontSize="6" fill="#B45309" textAnchor="middle">
          Apr
        </text>
        <text x="260" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          NEET Intensive
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { scale: [1, 1.2, 1] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <circle cx="320" cy="250" r="10" fill="#22C55E" />
        <text x="320" y="242" fontSize="6" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          May
        </text>
        <text x="320" y="268" fontSize="5" fill="#166534" textAnchor="middle" fontWeight="bold">
          NEET Day!
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 30. Free Resources - Open source study materials
export function FreeResourcesIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#EDE9FE" />

      {/* Title */}
      <text x="200" y="35" fontSize="12" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Free NEET Preparation Resources 2025
      </text>

      {/* FREE badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1], rotate: [-5, 5, -5] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: '55px 65px' }}
      >
        <circle cx="55" cy="65" r="25" fill="#22C55E" />
        <text x="55" y="62" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          FREE
        </text>
        <text x="55" y="75" fontSize="7" fill="#DCFCE7" textAnchor="middle">
          100%
        </text>
      </motion.g>

      {/* Resource cards */}
      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="30"
          y="100"
          width="100"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <rect x="45" y="115" width="70" height="25" rx="4" fill="#DBEAFE" />
        <text x="80" y="132" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          NCERT
        </text>
        <text x="80" y="155" fontSize="6" fill="#374151" textAnchor="middle">
          Official Textbooks
        </text>
        <text x="80" y="170" fontSize="6" fill="#22C55E" textAnchor="middle" fontWeight="bold">
          ncert.nic.in
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { y: [2, -2, 2] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect
          x="150"
          y="100"
          width="100"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#EC4899"
          strokeWidth="2"
        />
        <rect x="165" y="115" width="70" height="25" rx="4" fill="#FCE7F3" />
        <text x="200" y="132" fontSize="8" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          YouTube
        </text>
        <text x="200" y="155" fontSize="6" fill="#374151" textAnchor="middle">
          Video Lectures
        </text>
        <text x="200" y="170" fontSize="6" fill="#22C55E" textAnchor="middle" fontWeight="bold">
          1000+ Hours
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <rect
          x="270"
          y="100"
          width="100"
          height="80"
          rx="8"
          fill="#FFFFFF"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <rect x="285" y="115" width="70" height="25" rx="4" fill="#FEF3C7" />
        <text x="320" y="132" fontSize="8" fill="#B45309" textAnchor="middle" fontWeight="bold">
          PYQs
        </text>
        <text x="320" y="155" fontSize="6" fill="#374151" textAnchor="middle">
          Previous Year
        </text>
        <text x="320" y="170" fontSize="6" fill="#22C55E" textAnchor="middle" fontWeight="bold">
          10 Years Free
        </text>
      </motion.g>

      {/* More resources */}
      <rect
        x="30"
        y="195"
        width="340"
        height="80"
        rx="10"
        fill="#FFFFFF"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      <text x="200" y="215" fontSize="9" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        More Free Resources
      </text>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="70" cy="245" r="15" fill="#DCFCE7" />
        <text x="70" y="248" fontSize="7" fill="#166534" textAnchor="middle">
          NTA
        </text>
        <text x="70" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Mock Tests
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      >
        <circle cx="140" cy="245" r="15" fill="#DBEAFE" />
        <text x="140" y="248" fontSize="6" fill="#1D4ED8" textAnchor="middle">
          Apps
        </text>
        <text x="140" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Quizzes
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      >
        <circle cx="210" cy="245" r="15" fill="#FEF3C7" />
        <text x="210" y="248" fontSize="6" fill="#B45309" textAnchor="middle">
          Notes
        </text>
        <text x="210" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Toppers
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
      >
        <circle cx="280" cy="245" r="15" fill="#FCE7F3" />
        <text x="280" y="248" fontSize="6" fill="#DB2777" textAnchor="middle">
          Podcasts
        </text>
        <text x="280" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Biology
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
      >
        <circle cx="340" cy="245" r="15" fill="#E9D5FF" />
        <text x="340" y="248" fontSize="6" fill="#7C3AED" textAnchor="middle">
          Forums
        </text>
        <text x="340" y="268" fontSize="5" fill="#6B7280" textAnchor="middle">
          Q&A
        </text>
      </motion.g>
    </Wrapper>
  )
}

// 31. Results Analysis - Data visualization
export function ResultsAnalysisIllustration({ className = '', animate = true }: IllustrationProps) {
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
      <text x="200" y="35" fontSize="12" fill="#166534" textAnchor="middle" fontWeight="bold">
        NEET 2024 Results Analysis & Trends 2025
      </text>

      {/* Bar chart */}
      <rect
        x="30"
        y="55"
        width="180"
        height="130"
        rx="8"
        fill="#FFFFFF"
        stroke="#22C55E"
        strokeWidth="2"
      />
      <text x="120" y="75" fontSize="8" fill="#166534" textAnchor="middle" fontWeight="bold">
        Score Distribution
      </text>

      {/* Bars */}
      <motion.rect
        x="50"
        y="130"
        width="25"
        height="40"
        rx="2"
        fill="#EF4444"
        animate={animate ? { height: [0, 40], y: [170, 130] } : undefined}
        transition={{ duration: 1 }}
      />
      <text x="62" y="180" fontSize="5" fill="#6B7280" textAnchor="middle">
        0-200
      </text>

      <motion.rect
        x="85"
        y="110"
        width="25"
        height="60"
        rx="2"
        fill="#F59E0B"
        animate={animate ? { height: [0, 60], y: [170, 110] } : undefined}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <text x="97" y="180" fontSize="5" fill="#6B7280" textAnchor="middle">
        200-400
      </text>

      <motion.rect
        x="120"
        y="100"
        width="25"
        height="70"
        rx="2"
        fill="#3B82F6"
        animate={animate ? { height: [0, 70], y: [170, 100] } : undefined}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <text x="132" y="180" fontSize="5" fill="#6B7280" textAnchor="middle">
        400-600
      </text>

      <motion.rect
        x="155"
        y="120"
        width="25"
        height="50"
        rx="2"
        fill="#22C55E"
        animate={animate ? { height: [0, 50], y: [170, 120] } : undefined}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <text x="167" y="180" fontSize="5" fill="#6B7280" textAnchor="middle">
        600+
      </text>

      {/* Key stats */}
      <rect
        x="230"
        y="55"
        width="150"
        height="130"
        rx="8"
        fill="#FFFFFF"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      <text x="305" y="75" fontSize="8" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
        Key Statistics
      </text>

      <motion.g
        animate={animate ? { opacity: [0, 1] } : undefined}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <rect x="245" y="85" width="120" height="22" rx="4" fill="#DCFCE7" />
        <text x="305" y="100" fontSize="7" fill="#166534" textAnchor="middle">
          24 Lakh+ Appeared
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0, 1] } : undefined}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <rect x="245" y="112" width="120" height="22" rx="4" fill="#DBEAFE" />
        <text x="305" y="127" fontSize="7" fill="#1D4ED8" textAnchor="middle">
          720/720 Top Score
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0, 1] } : undefined}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <rect x="245" y="139" width="120" height="22" rx="4" fill="#FEF3C7" />
        <text x="305" y="154" fontSize="7" fill="#B45309" textAnchor="middle">
          137 Cutoff General
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0, 1] } : undefined}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <rect x="245" y="166" width="120" height="15" rx="4" fill="#FCE7F3" />
        <text x="305" y="177" fontSize="6" fill="#DB2777" textAnchor="middle">
          67% Success Rate
        </text>
      </motion.g>

      {/* Trends for 2025 */}
      <rect
        x="30"
        y="195"
        width="340"
        height="80"
        rx="10"
        fill="#FFFFFF"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      <text x="200" y="215" fontSize="9" fill="#7C3AED" textAnchor="middle" fontWeight="bold">
        Trends for NEET 2025
      </text>

      <motion.g
        animate={animate ? { x: [0, 2, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <rect x="45" y="225" width="90" height="40" rx="6" fill="#DCFCE7" />
        <text x="90" y="243" fontSize="7" fill="#166534" textAnchor="middle" fontWeight="bold">
          Biology Focus
        </text>
        <text x="90" y="258" fontSize="6" fill="#6B7280" textAnchor="middle">
          More Assertion
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { x: [0, 2, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <rect x="155" y="225" width="90" height="40" rx="6" fill="#DBEAFE" />
        <text x="200" y="243" fontSize="7" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          NCERT Based
        </text>
        <text x="200" y="258" fontSize="6" fill="#6B7280" textAnchor="middle">
          95% Questions
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { x: [0, 2, 0] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        <rect x="265" y="225" width="90" height="40" rx="6" fill="#FEF3C7" />
        <text x="310" y="243" fontSize="7" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Competition
        </text>
        <text x="310" y="258" fontSize="6" fill="#6B7280" textAnchor="middle">
          25 Lakh Expected
        </text>
      </motion.g>
    </Wrapper>
  )
}

// Delhi NCR Coaching Guide - Map with location pins and coaching centers
export function DelhiNCRGuideIllustration({ className = '', animate = true }: IllustrationProps) {
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
      {/* Background - City skyline gradient */}
      <defs>
        <linearGradient id="delhiSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0FDF4" />
          <stop offset="100%" stopColor="#DCFCE7" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#delhiSkyGradient)" />

      {/* Delhi NCR Map representation */}
      <motion.g
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Map base */}
        <ellipse
          cx="200"
          cy="160"
          rx="140"
          ry="100"
          fill="url(#mapGradient)"
          stroke="#22C55E"
          strokeWidth="2"
        />

        {/* Metro lines */}
        <path
          d="M100 140 Q 150 120 200 130 Q 250 140 300 130"
          stroke="#EF4444"
          strokeWidth="3"
          strokeDasharray="8 4"
          fill="none"
        />
        <path
          d="M120 180 Q 180 200 200 160 Q 220 120 280 150"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeDasharray="8 4"
          fill="none"
        />
        <path
          d="M160 80 L 200 160 L 240 240"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeDasharray="8 4"
          fill="none"
        />
      </motion.g>

      {/* Location pins with animation */}
      {/* Rohini */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
      >
        <circle cx="140" cy="100" r="12" fill="#EF4444" />
        <path d="M140 88 L140 76" stroke="#EF4444" strokeWidth="3" />
        <circle cx="140" cy="100" r="5" fill="#FFF" />
        <text x="140" y="72" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          Rohini
        </text>
      </motion.g>

      {/* South Delhi */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
      >
        <circle cx="200" cy="200" r="12" fill="#8B5CF6" />
        <path d="M200 188 L200 176" stroke="#8B5CF6" strokeWidth="3" />
        <circle cx="200" cy="200" r="5" fill="#FFF" />
        <text x="200" y="172" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          South Delhi
        </text>
      </motion.g>

      {/* Gurugram */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
      >
        <circle cx="130" cy="180" r="12" fill="#14B8A6" />
        <path d="M130 168 L130 156" stroke="#14B8A6" strokeWidth="3" />
        <circle cx="130" cy="180" r="5" fill="#FFF" />
        <text x="130" y="152" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          Gurugram
        </text>
      </motion.g>

      {/* Noida */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 1.0, duration: 0.5, type: 'spring' }}
      >
        <circle cx="280" cy="140" r="12" fill="#F59E0B" />
        <path d="M280 128 L280 116" stroke="#F59E0B" strokeWidth="3" />
        <circle cx="280" cy="140" r="5" fill="#FFF" />
        <text x="280" y="112" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          Noida
        </text>
      </motion.g>

      {/* Faridabad */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
      >
        <circle cx="240" cy="220" r="12" fill="#3B82F6" />
        <path d="M240 208 L240 196" stroke="#3B82F6" strokeWidth="3" />
        <circle cx="240" cy="220" r="5" fill="#FFF" />
        <text x="240" y="192" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="600">
          Faridabad
        </text>
      </motion.g>

      {/* Central building icon - India Gate style */}
      <motion.g
        initial={animate ? { scale: 0 } : undefined}
        animate={animate ? { scale: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
      >
        <rect x="185" y="130" width="30" height="40" fill="#9CA3AF" />
        <path d="M185 130 Q 200 110 215 130" fill="#9CA3AF" />
        <rect x="195" y="150" width="10" height="20" fill="#6B7280" />
      </motion.g>

      {/* Title banner */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <rect x="100" y="255" width="200" height="30" rx="6" fill="#1F2937" />
        <text x="200" y="275" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="600">
          Delhi NCR Coaching Guide
        </text>
      </motion.g>

      {/* Pulsing connection lines */}
      <motion.circle
        cx="200"
        cy="160"
        r="60"
        stroke="#22C55E"
        strokeWidth="1"
        fill="none"
        initial={animate ? { scale: 0.8, opacity: 0.8 } : undefined}
        animate={animate ? { scale: 1.2, opacity: 0 } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </Wrapper>
  )
}

// Laxmi Nagar East Delhi Location - Metro and city landmarks
export function LaxmiNagarIllustration({ className = '', animate = true }: IllustrationProps) {
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
      {/* Background gradient - East Delhi warm tones */}
      <defs>
        <linearGradient id="laxmiSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FFFBEB" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#laxmiSkyGradient)" />

      {/* Metro line representation */}
      <motion.g
        initial={animate ? { x: -100, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Blue Line Metro track */}
        <rect x="0" y="180" width="400" height="6" fill="#3B82F6" />
        <rect x="0" y="186" width="400" height="2" fill="#1D4ED8" />

        {/* Metro pillars */}
        <rect x="60" y="188" width="8" height="50" fill="#9CA3AF" />
        <rect x="150" y="188" width="8" height="50" fill="#9CA3AF" />
        <rect x="240" y="188" width="8" height="50" fill="#9CA3AF" />
        <rect x="330" y="188" width="8" height="50" fill="#9CA3AF" />
      </motion.g>

      {/* Metro train */}
      <motion.g
        initial={animate ? { x: -150 } : undefined}
        animate={animate ? { x: 400 } : undefined}
        transition={{ delay: 0.5, duration: 4, repeat: Infinity, repeatDelay: 2 }}
      >
        <rect x="0" y="155" width="80" height="25" rx="4" fill="#3B82F6" />
        <rect x="5" y="160" width="15" height="12" rx="2" fill="#DBEAFE" />
        <rect x="25" y="160" width="15" height="12" rx="2" fill="#DBEAFE" />
        <rect x="45" y="160" width="15" height="12" rx="2" fill="#DBEAFE" />
        <rect x="65" y="160" width="10" height="12" rx="2" fill="#DBEAFE" />
      </motion.g>

      {/* Laxmi Nagar Metro Station */}
      <motion.g
        initial={animate ? { y: 20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <rect x="160" y="100" width="80" height="80" rx="4" fill="#EF4444" />
        <rect x="165" y="105" width="70" height="45" fill="#FEE2E2" />
        <text x="200" y="130" textAnchor="middle" fill="#B91C1C" fontSize="8" fontWeight="600">
          LAXMI NAGAR
        </text>
        <text x="200" y="142" textAnchor="middle" fill="#B91C1C" fontSize="7">
          METRO STATION
        </text>
        <rect x="185" y="155" width="30" height="25" fill="#7F1D1D" />
        <path d="M185 155 L200 140 L215 155" fill="#DC2626" />
      </motion.g>

      {/* Buildings - East Delhi skyline */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Building 1 */}
        <rect x="40" y="110" width="40" height="70" fill="#F59E0B" />
        <rect x="45" y="115" width="10" height="15" fill="#FEF3C7" />
        <rect x="60" y="115" width="10" height="15" fill="#FEF3C7" />
        <rect x="45" y="135" width="10" height="15" fill="#FEF3C7" />
        <rect x="60" y="135" width="10" height="15" fill="#FEF3C7" />
        <rect x="45" y="155" width="10" height="15" fill="#FEF3C7" />
        <rect x="60" y="155" width="10" height="15" fill="#FEF3C7" />

        {/* Building 2 - Coaching center */}
        <rect x="260" y="90" width="50" height="90" fill="#8B5CF6" />
        <rect x="265" y="95" width="40" height="20" fill="#F3E8FF" />
        <text x="285" y="108" textAnchor="middle" fill="#6D28D9" fontSize="6" fontWeight="600">
          CEREBRUM
        </text>
        <rect x="265" y="120" width="15" height="20" fill="#DDD6FE" />
        <rect x="285" y="120" width="15" height="20" fill="#DDD6FE" />
        <rect x="265" y="145" width="15" height="20" fill="#DDD6FE" />
        <rect x="285" y="145" width="15" height="20" fill="#DDD6FE" />

        {/* Building 3 */}
        <rect x="320" y="120" width="35" height="60" fill="#14B8A6" />
        <rect x="325" y="125" width="10" height="12" fill="#CCFBF1" />
        <rect x="340" y="125" width="10" height="12" fill="#CCFBF1" />
        <rect x="325" y="145" width="10" height="12" fill="#CCFBF1" />
        <rect x="340" y="145" width="10" height="12" fill="#CCFBF1" />
      </motion.g>

      {/* Location pin on coaching center */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
      >
        <circle cx="285" cy="70" r="15" fill="#EF4444" />
        <path d="M285 55 L285 40" stroke="#EF4444" strokeWidth="3" />
        <circle cx="285" cy="70" r="6" fill="#FFF" />
      </motion.g>

      {/* Title banner */}
      <motion.g
        initial={animate ? { y: 20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <rect x="80" y="250" width="240" height="35" rx="6" fill="#1F2937" />
        <text x="200" y="272" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="600">
          NEET Coaching Laxmi Nagar
        </text>
      </motion.g>

      {/* Nearby areas markers */}
      <motion.g
        initial={animate ? { scale: 0 } : undefined}
        animate={animate ? { scale: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <circle cx="100" cy="200" r="8" fill="#22C55E" />
        <text x="100" y="220" textAnchor="middle" fill="#374151" fontSize="7">
          Preet Vihar
        </text>

        <circle cx="320" cy="200" r="8" fill="#22C55E" />
        <text x="320" y="220" textAnchor="middle" fill="#374151" fontSize="7">
          Nirman Vihar
        </text>
      </motion.g>

      {/* Students walking */}
      <motion.g
        initial={animate ? { x: -20, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <circle cx="130" y="235" r="6" fill="#F59E0B" />
        <rect x="127" y="241" width="6" height="12" rx="2" fill="#F59E0B" />

        <circle cx="145" cy="235" r="6" fill="#3B82F6" />
        <rect x="142" y="241" width="6" height="12" rx="2" fill="#3B82F6" />
      </motion.g>
    </Wrapper>
  )
}

// Noida Sector-wise Guide - Tech park style illustration
export function NoidaIllustration({ className = '', animate = true }: IllustrationProps) {
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
      {/* Background gradient - Noida modern tech theme */}
      <defs>
        <linearGradient id="noidaSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0E7FF" />
          <stop offset="100%" stopColor="#EEF2FF" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#noidaSkyGradient)" />

      {/* Road/expressway */}
      <motion.g
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <rect x="0" y="230" width="400" height="40" fill="#374151" />
        <rect x="0" y="248" width="400" height="4" fill="#FCD34D" strokeDasharray="20 10" />
      </motion.g>

      {/* Sector buildings with labels */}
      {/* Sector 62 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <rect x="30" y="100" width="60" height="130" rx="4" fill="#3B82F6" />
        <rect x="35" y="105" width="50" height="20" fill="#DBEAFE" />
        <text x="60" y="118" textAnchor="middle" fill="#1D4ED8" fontSize="8" fontWeight="600">
          SECTOR 62
        </text>
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect x="38" y={130 + row * 25} width="12" height="18" fill="#BFDBFE" />
            <rect x="55" y={130 + row * 25} width="12" height="18" fill="#BFDBFE" />
            <rect x="72" y={130 + row * 25} width="12" height="18" fill="#BFDBFE" />
          </g>
        ))}
      </motion.g>

      {/* Sector 18 - Mall area */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <rect x="110" y="120" width="70" height="110" rx="4" fill="#EC4899" />
        <rect x="115" y="125" width="60" height="25" fill="#FCE7F3" />
        <text x="145" y="142" textAnchor="middle" fill="#BE185D" fontSize="8" fontWeight="600">
          SECTOR 18
        </text>
        <rect x="125" y="155" width="40" height="30" fill="#FBCFE8" />
        <text x="145" y="175" textAnchor="middle" fill="#BE185D" fontSize="6">
          MALL
        </text>
        <rect x="115" y="190" width="25" height="35" fill="#F9A8D4" />
        <rect x="145" y="190" width="25" height="35" fill="#F9A8D4" />
      </motion.g>

      {/* Sector 15/16 - Coaching Hub */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <rect x="200" y="80" width="80" height="150" rx="4" fill="#8B5CF6" />
        <rect x="205" y="85" width="70" height="30" fill="#F3E8FF" />
        <text x="240" y="100" textAnchor="middle" fill="#6D28D9" fontSize="9" fontWeight="700">
          CEREBRUM
        </text>
        <text x="240" y="110" textAnchor="middle" fill="#6D28D9" fontSize="6">
          ACADEMY
        </text>

        {/* Windows */}
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect x="210" y={120 + row * 28} width="18" height="20" fill="#DDD6FE" />
            <rect x="235" y={120 + row * 28} width="18" height="20" fill="#DDD6FE" />
            <rect x="260" y={120 + row * 28} width="18" height="20" fill="#DDD6FE" />
          </g>
        ))}
      </motion.g>

      {/* Sector 50 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <rect x="300" y="110" width="70" height="120" rx="4" fill="#14B8A6" />
        <rect x="305" y="115" width="60" height="20" fill="#CCFBF1" />
        <text x="335" y="128" textAnchor="middle" fill="#0D9488" fontSize="8" fontWeight="600">
          SECTOR 50
        </text>
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <rect x="310" y={140 + row * 28} width="15" height="20" fill="#99F6E4" />
            <rect x="330" y={140 + row * 28} width="15" height="20" fill="#99F6E4" />
            <rect x="350" y={140 + row * 28} width="15" height="20" fill="#99F6E4" />
          </g>
        ))}
      </motion.g>

      {/* Location pin on coaching center */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.7, duration: 0.5, type: 'spring' }}
      >
        <motion.circle
          cx="240"
          cy="55"
          r="18"
          fill="#EF4444"
          animate={animate ? { scale: [1, 1.1, 1] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <path d="M240 37 L240 20" stroke="#EF4444" strokeWidth="3" />
        <circle cx="240" cy="55" r="7" fill="#FFF" />
      </motion.g>

      {/* Metro connection */}
      <motion.g
        initial={animate ? { x: -50, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <rect x="0" y="265" width="400" height="8" fill="#60A5FA" />
        <text x="200" y="290" textAnchor="middle" fill="#374151" fontSize="9">
          Aqua Line Metro
        </text>
      </motion.g>

      {/* Title */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <rect x="120" y="15" width="160" height="30" rx="6" fill="#1F2937" />
        <text x="200" y="35" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="600">
          NEET Coaching Noida
        </text>
      </motion.g>
    </Wrapper>
  )
}

// Dwarka West Delhi Location - Airport and metro theme
export function DwarkaIllustration({ className = '', animate = true }: IllustrationProps) {
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
      {/* Background gradient - West Delhi sunset tones */}
      <defs>
        <linearGradient id="dwarkaSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDF2F8" />
          <stop offset="50%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#FFF1F2" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#dwarkaSkyGradient)" />

      {/* Airplane in sky */}
      <motion.g
        initial={animate ? { x: -100, y: 50 } : undefined}
        animate={animate ? { x: 450, y: -20 } : undefined}
        transition={{ delay: 1, duration: 8, repeat: Infinity, repeatDelay: 3 }}
      >
        <path d="M0 25 L30 20 L35 10 L40 20 L60 25 L40 27 L35 35 L30 27 Z" fill="#9CA3AF" />
        <circle cx="35" cy="22" r="3" fill="#E5E7EB" />
      </motion.g>

      {/* Dwarka Sector buildings */}
      {/* Sector 10 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <rect x="30" y="100" width="55" height="130" rx="4" fill="#F59E0B" />
        <rect x="35" y="105" width="45" height="18" fill="#FEF3C7" />
        <text x="57" y="117" textAnchor="middle" fill="#B45309" fontSize="7" fontWeight="600">
          SECTOR 10
        </text>
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect x="38" y={128 + row * 25} width="10" height="18" fill="#FDE68A" />
            <rect x="53" y={128 + row * 25} width="10" height="18" fill="#FDE68A" />
            <rect x="68" y={128 + row * 25} width="10" height="18" fill="#FDE68A" />
          </g>
        ))}
      </motion.g>

      {/* Main Coaching Center - Sector 12 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <rect x="110" y="70" width="90" height="160" rx="4" fill="#8B5CF6" />
        <rect x="115" y="75" width="80" height="35" fill="#F3E8FF" />
        <text x="155" y="92" textAnchor="middle" fill="#6D28D9" fontSize="10" fontWeight="700">
          CEREBRUM
        </text>
        <text x="155" y="104" textAnchor="middle" fill="#6D28D9" fontSize="7">
          NEET COACHING
        </text>

        {/* Classroom windows */}
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect x="120" y={115 + row * 30} width="20" height="22" fill="#DDD6FE" />
            <rect x="145" y={115 + row * 30} width="20" height="22" fill="#DDD6FE" />
            <rect x="170" y={115 + row * 30} width="20" height="22" fill="#DDD6FE" />
          </g>
        ))}

        {/* Entrance */}
        <rect x="145" y="210" width="20" height="20" fill="#4C1D95" />
      </motion.g>

      {/* Sector 21 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <rect x="220" y="110" width="60" height="120" rx="4" fill="#EC4899" />
        <rect x="225" y="115" width="50" height="18" fill="#FCE7F3" />
        <text x="250" y="127" textAnchor="middle" fill="#BE185D" fontSize="7" fontWeight="600">
          SECTOR 21
        </text>
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <rect x="228" y={138 + row * 28} width="12" height="20" fill="#FBCFE8" />
            <rect x="245" y={138 + row * 28} width="12" height="20" fill="#FBCFE8" />
            <rect x="262" y={138 + row * 28} width="12" height="20" fill="#FBCFE8" />
          </g>
        ))}
      </motion.g>

      {/* Dwarka Mor Metro */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <rect x="300" y="130" width="70" height="100" rx="4" fill="#3B82F6" />
        <rect x="305" y="135" width="60" height="25" fill="#DBEAFE" />
        <text x="335" y="148" textAnchor="middle" fill="#1D4ED8" fontSize="7" fontWeight="600">
          DWARKA
        </text>
        <text x="335" y="157" textAnchor="middle" fill="#1D4ED8" fontSize="6">
          MOR METRO
        </text>
        <rect x="320" y="165" width="30" height="60" fill="#60A5FA" />
        <path d="M320 165 L335 150 L350 165" fill="#3B82F6" />
      </motion.g>

      {/* Metro line */}
      <motion.g
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <rect x="0" y="235" width="400" height="8" fill="#3B82F6" />
        <text x="200" y="260" textAnchor="middle" fill="#374151" fontSize="9">
          Blue Line Metro
        </text>
      </motion.g>

      {/* Location pin */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
      >
        <motion.circle
          cx="155"
          cy="45"
          r="18"
          fill="#EF4444"
          animate={animate ? { scale: [1, 1.1, 1] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <path d="M155 27 L155 10" stroke="#EF4444" strokeWidth="3" />
        <circle cx="155" cy="45" r="7" fill="#FFF" />
      </motion.g>

      {/* Title */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <rect x="90" y="270" width="220" height="25" rx="6" fill="#1F2937" />
        <text x="200" y="287" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="600">
          NEET Coaching Dwarka West Delhi
        </text>
      </motion.g>
    </Wrapper>
  )
}

// Small Batch vs Large Batch Comparison
export function SmallVsLargeBatchIllustration({
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
      <rect width="400" height="300" fill="#F8FAFC" />

      {/* Left side - Small Batch */}
      <motion.g
        initial={animate ? { x: -30, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <rect
          x="20"
          y="40"
          width="160"
          height="200"
          rx="8"
          fill="#ECFDF5"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <text x="100" y="65" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="700">
          SMALL BATCH
        </text>
        <text x="100" y="80" textAnchor="middle" fill="#166534" fontSize="10">
          (15-20 Students)
        </text>

        {/* Teacher */}
        <circle cx="100" cy="110" r="15" fill="#22C55E" />
        <text x="100" y="115" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
          T
        </text>

        {/* Small group of students - 3x3 */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <motion.circle
              key={`small-${row}-${col}`}
              cx={60 + col * 40}
              cy={150 + row * 30}
              r="10"
              fill="#86EFAC"
              initial={animate ? { scale: 0 } : undefined}
              animate={animate ? { scale: 1 } : undefined}
              transition={{ delay: 0.4 + (row * 3 + col) * 0.1 }}
            />
          ))
        )}

        {/* Personal attention arrows */}
        <motion.g
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <path
            d="M85 120 L65 140"
            stroke="#166534"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            markerEnd="url(#arrowGreen)"
          />
          <path d="M100 125 L100 140" stroke="#166534" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M115 120 L135 140" stroke="#166534" strokeWidth="1.5" strokeDasharray="3 2" />
        </motion.g>
      </motion.g>

      {/* Right side - Large Batch */}
      <motion.g
        initial={animate ? { x: 30, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <rect
          x="220"
          y="40"
          width="160"
          height="200"
          rx="8"
          fill="#FEF2F2"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text x="300" y="65" textAnchor="middle" fill="#991B1B" fontSize="12" fontWeight="700">
          LARGE BATCH
        </text>
        <text x="300" y="80" textAnchor="middle" fill="#991B1B" fontSize="10">
          (100+ Students)
        </text>

        {/* Teacher */}
        <circle cx="300" cy="110" r="15" fill="#EF4444" />
        <text x="300" y="115" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
          T
        </text>

        {/* Large group of students - crowded */}
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <motion.circle
              key={`large-${row}-${col}`}
              cx={240 + col * 24}
              cy={140 + row * 22}
              r="8"
              fill="#FECACA"
              initial={animate ? { scale: 0 } : undefined}
              animate={animate ? { scale: 1 } : undefined}
              transition={{ delay: 0.5 + (row * 5 + col) * 0.03 }}
            />
          ))
        )}
      </motion.g>

      {/* VS divider */}
      <motion.g
        initial={animate ? { scale: 0 } : undefined}
        animate={animate ? { scale: 1 } : undefined}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <circle cx="200" cy="140" r="20" fill="#1F2937" />
        <text x="200" y="145" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="700">
          VS
        </text>
      </motion.g>

      {/* Comparison checkmarks */}
      <motion.g
        initial={animate ? { y: 20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 1.4, duration: 0.4 }}
      >
        <rect x="20" y="250" width="160" height="40" rx="4" fill="#22C55E" />
        <text x="100" y="275" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
          Personal Attention
        </text>

        <rect x="220" y="250" width="160" height="40" rx="4" fill="#9CA3AF" />
        <text x="300" y="275" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
          One-size-fits-all
        </text>
      </motion.g>

      {/* Title */}
      <motion.text
        x="200"
        y="25"
        textAnchor="middle"
        fill="#1F2937"
        fontSize="14"
        fontWeight="700"
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.1 }}
      >
        Batch Size Comparison
      </motion.text>
    </Wrapper>
  )
}

// 2-Year NEET Program Timeline
export function TwoYearProgramIllustration({ className = '', animate = true }: IllustrationProps) {
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
        <linearGradient id="twoYearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EEF2FF" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#twoYearGradient)" />

      {/* Timeline line */}
      <motion.path
        d="M50 150 L350 150"
        stroke="#9CA3AF"
        strokeWidth="4"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ delay: 0.2, duration: 1 }}
      />

      {/* Year 1 - Class 11 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <circle cx="100" cy="150" r="25" fill="#8B5CF6" />
        <text x="100" y="145" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="600">
          YEAR
        </text>
        <text x="100" y="158" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="700">
          1
        </text>

        {/* Year 1 content box */}
        <rect
          x="50"
          y="55"
          width="100"
          height="70"
          rx="6"
          fill="#F3E8FF"
          stroke="#8B5CF6"
          strokeWidth="2"
        />
        <text x="100" y="75" textAnchor="middle" fill="#6D28D9" fontSize="10" fontWeight="700">
          CLASS 11
        </text>
        <text x="100" y="90" textAnchor="middle" fill="#7C3AED" fontSize="8">
          Foundation Building
        </text>
        <text x="100" y="105" textAnchor="middle" fill="#7C3AED" fontSize="8">
          60% NEET Syllabus
        </text>
        <text x="100" y="118" textAnchor="middle" fill="#7C3AED" fontSize="8">
          Concept Clarity
        </text>

        {/* Arrow down */}
        <path d="M100 125 L100 125" stroke="#8B5CF6" strokeWidth="2" />
      </motion.g>

      {/* Midpoint - Revision */}
      <motion.g
        initial={animate ? { scale: 0 } : undefined}
        animate={animate ? { scale: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <circle cx="200" cy="150" r="18" fill="#F59E0B" />
        <text x="200" y="154" textAnchor="middle" fill="#FFF" fontSize="8" fontWeight="600">
          MID
        </text>

        <rect
          x="165"
          y="180"
          width="70"
          height="40"
          rx="4"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <text x="200" y="198" textAnchor="middle" fill="#B45309" fontSize="8" fontWeight="600">
          Summer
        </text>
        <text x="200" y="212" textAnchor="middle" fill="#B45309" fontSize="7">
          Revision Camp
        </text>
      </motion.g>

      {/* Year 2 - Class 12 */}
      <motion.g
        initial={animate ? { y: 30, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <circle cx="300" cy="150" r="25" fill="#22C55E" />
        <text x="300" y="145" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="600">
          YEAR
        </text>
        <text x="300" y="158" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="700">
          2
        </text>

        {/* Year 2 content box */}
        <rect
          x="250"
          y="55"
          width="100"
          height="70"
          rx="6"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <text x="300" y="75" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="700">
          CLASS 12
        </text>
        <text x="300" y="90" textAnchor="middle" fill="#15803D" fontSize="8">
          Advanced Topics
        </text>
        <text x="300" y="105" textAnchor="middle" fill="#15803D" fontSize="8">
          40% NEET Syllabus
        </text>
        <text x="300" y="118" textAnchor="middle" fill="#15803D" fontSize="8">
          Mock Tests
        </text>
      </motion.g>

      {/* NEET Exam endpoint */}
      <motion.g
        initial={animate ? { scale: 0 } : undefined}
        animate={animate ? { scale: 1 } : undefined}
        transition={{ delay: 1.4, duration: 0.4, type: 'spring' }}
      >
        <circle cx="350" cy="150" r="15" fill="#EF4444" />
        <text x="350" y="154" textAnchor="middle" fill="#FFF" fontSize="7" fontWeight="700">
          NEET
        </text>

        {/* Trophy */}
        <motion.g
          animate={animate ? { y: [0, -5, 0] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <rect x="338" y="170" width="24" height="30" rx="4" fill="#FCD34D" />
          <circle cx="350" cy="180" r="8" fill="#F59E0B" />
          <rect x="345" y="200" width="10" height="8" fill="#F59E0B" />
        </motion.g>
      </motion.g>

      {/* Progress arrow */}
      <motion.path
        d="M75 150 L325 150"
        stroke="#22C55E"
        strokeWidth="3"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ delay: 1.6, duration: 1.5 }}
      />

      {/* Title */}
      <motion.g
        initial={animate ? { y: -20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <rect x="100" y="250" width="200" height="35" rx="6" fill="#1F2937" />
        <text x="200" y="272" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="600">
          2-Year NEET Program
        </text>
      </motion.g>

      {/* Benefits bubbles */}
      <motion.g
        initial={animate ? { scale: 0 } : undefined}
        animate={animate ? { scale: 1 } : undefined}
        transition={{ delay: 1.8, duration: 0.3 }}
      >
        <circle cx="30" cy="80" r="25" fill="#DBEAFE" />
        <text x="30" y="77" textAnchor="middle" fill="#1D4ED8" fontSize="7" fontWeight="600">
          No
        </text>
        <text x="30" y="87" textAnchor="middle" fill="#1D4ED8" fontSize="7" fontWeight="600">
          Rush
        </text>

        <circle cx="370" cy="80" r="25" fill="#DCFCE7" />
        <text x="370" y="77" textAnchor="middle" fill="#166534" fontSize="7" fontWeight="600">
          Deep
        </text>
        <text x="370" y="87" textAnchor="middle" fill="#166534" fontSize="7" fontWeight="600">
          Learning
        </text>
      </motion.g>
    </Wrapper>
  )
}

// Specialized vs Mass Coaching Comparison
export function SpecializedVsMassIllustration({
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
      <rect width="400" height="300" fill="#FAFAFA" />

      {/* Left - Specialized Biology Coaching */}
      <motion.g
        initial={animate ? { x: -30, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <rect
          x="15"
          y="35"
          width="170"
          height="220"
          rx="10"
          fill="#F0FDF4"
          stroke="#22C55E"
          strokeWidth="2"
        />

        {/* Header */}
        <rect x="15" y="35" width="170" height="40" rx="10" fill="#22C55E" />
        <text x="100" y="60" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="700">
          SPECIALIZED
        </text>

        {/* Biology focus icon */}
        <motion.g
          initial={animate ? { scale: 0 } : undefined}
          animate={animate ? { scale: 1 } : undefined}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <circle cx="100" cy="105" r="25" fill="#86EFAC" />
          {/* DNA helix simplified */}
          <path
            d="M90 95 Q 100 90 110 95 Q 100 100 90 105 Q 100 110 110 115"
            stroke="#166534"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="90" cy="95" r="3" fill="#166534" />
          <circle cx="110" cy="95" r="3" fill="#166534" />
          <circle cx="90" cy="105" r="3" fill="#166534" />
          <circle cx="110" cy="115" r="3" fill="#166534" />
        </motion.g>

        {/* Features */}
        {[
          'NEET Biology Expert',
          'Deep Conceptual Focus',
          'Personal Attention',
          '15-20 Students',
        ].map((text, i) => (
          <motion.g
            key={text}
            initial={animate ? { x: -20, opacity: 0 } : undefined}
            animate={animate ? { x: 0, opacity: 1 } : undefined}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
          >
            <circle cx="35" cy={145 + i * 25} r="6" fill="#22C55E" />
            <path
              d="M32 145 L35 148 L40 142"
              stroke="#FFF"
              strokeWidth="2"
              fill="none"
              transform={`translate(0, ${i * 25})`}
            />
            <text x="50" y={148 + i * 25} fill="#166534" fontSize="9" fontWeight="500">
              {text}
            </text>
          </motion.g>
        ))}
      </motion.g>

      {/* Right - Mass Coaching */}
      <motion.g
        initial={animate ? { x: 30, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <rect
          x="215"
          y="35"
          width="170"
          height="220"
          rx="10"
          fill="#FEF2F2"
          stroke="#EF4444"
          strokeWidth="2"
        />

        {/* Header */}
        <rect x="215" y="35" width="170" height="40" rx="10" fill="#EF4444" />
        <text x="300" y="60" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="700">
          MASS COACHING
        </text>

        {/* Factory icon */}
        <motion.g
          initial={animate ? { scale: 0 } : undefined}
          animate={animate ? { scale: 1 } : undefined}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <rect x="275" y="90" width="50" height="35" fill="#FECACA" />
          <rect x="280" y="95" width="10" height="10" fill="#FEE2E2" />
          <rect x="295" y="95" width="10" height="10" fill="#FEE2E2" />
          <rect x="310" y="95" width="10" height="10" fill="#FEE2E2" />
          {/* Chimneys */}
          <rect x="282" y="80" width="8" height="15" fill="#DC2626" />
          <rect x="310" y="80" width="8" height="15" fill="#DC2626" />
        </motion.g>

        {/* Issues */}
        {['PCM + Biology Mixed', 'Surface-level Coverage', 'Lost in Crowd', '100+ Students'].map(
          (text, i) => (
            <motion.g
              key={text}
              initial={animate ? { x: 20, opacity: 0 } : undefined}
              animate={animate ? { x: 0, opacity: 1 } : undefined}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
            >
              <circle cx="235" cy={145 + i * 25} r="6" fill="#EF4444" />
              <text x="232" y={148 + i * 25} fill="#FFF" fontSize="8" fontWeight="700">
                !
              </text>
              <text x="250" y={148 + i * 25} fill="#991B1B" fontSize="9" fontWeight="500">
                {text}
              </text>
            </motion.g>
          )
        )}
      </motion.g>

      {/* VS Badge */}
      <motion.g
        initial={animate ? { scale: 0 } : undefined}
        animate={animate ? { scale: 1 } : undefined}
        transition={{ delay: 0.6, duration: 0.3, type: 'spring' }}
      >
        <circle cx="200" cy="145" r="22" fill="#1F2937" />
        <text x="200" y="150" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="700">
          VS
        </text>
      </motion.g>

      {/* Bottom recommendation */}
      <motion.g
        initial={animate ? { y: 20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        <rect x="80" y="265" width="240" height="30" rx="6" fill="#22C55E" />
        <text x="200" y="285" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="600">
          Choose Specialized for NEET Biology
        </text>
      </motion.g>

      {/* Title */}
      <motion.text
        x="200"
        y="22"
        textAnchor="middle"
        fill="#1F2937"
        fontSize="13"
        fontWeight="700"
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.1 }}
      >
        Specialized vs Mass Coaching
      </motion.text>
    </Wrapper>
  )
}

// Professional Biomolecules Illustration - Silicon Valley Quality
export function BiomoleculesIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 520 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="biomolBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EEF2FF" />
          <stop offset="50%" stopColor="#F5F3FF" />
          <stop offset="100%" stopColor="#FDF2F8" />
        </linearGradient>

        {/* Carbohydrate gradient - Blue */}
        <linearGradient id="carbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="carbCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#BFDBFE" />
        </linearGradient>

        {/* Protein gradient - Green */}
        <linearGradient id="proteinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="proteinCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>

        {/* Lipid gradient - Orange */}
        <linearGradient id="lipidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="lipidCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        {/* Nucleic Acid gradient - Purple */}
        <linearGradient id="nucleicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="nucleicCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EDE9FE" />
          <stop offset="100%" stopColor="#DDD6FE" />
        </linearGradient>

        {/* Center gradient */}
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </radialGradient>

        {/* Shadow filters */}
        <filter id="biomolShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
        </filter>
        <filter id="biomolCardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
        </filter>
        <filter id="biomolGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="moleculeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="520" height="400" fill="url(#biomolBgGrad)" />

      {/* Decorative background circles */}
      <circle cx="50" cy="50" r="80" fill="#3B82F6" opacity="0.05" />
      <circle cx="470" cy="50" r="60" fill="#10B981" opacity="0.05" />
      <circle cx="50" cy="350" r="70" fill="#F59E0B" opacity="0.05" />
      <circle cx="470" cy="350" r="90" fill="#8B5CF6" opacity="0.05" />

      {/* Center hexagon representing cell/biomolecule hub */}
      <motion.g
        initial={animate ? { scale: 0, opacity: 0 } : undefined}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <circle cx="260" cy="200" r="55" fill="url(#centerGlow)" filter="url(#biomolShadow)" />
        <circle cx="260" cy="200" r="50" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <text x="260" y="192" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
          BIOMOLECULES
        </text>
        <text x="260" y="208" textAnchor="middle" fill="#64748B" fontSize="9">
          Building Blocks
        </text>
        <text x="260" y="222" textAnchor="middle" fill="#64748B" fontSize="9">
          of Life
        </text>
      </motion.g>

      {/* Carbohydrates - Top Left */}
      <motion.g
        initial={animate ? { x: -30, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Card */}
        <rect
          x="30"
          y="40"
          width="140"
          height="130"
          rx="12"
          fill="url(#carbCardGrad)"
          filter="url(#biomolCardShadow)"
        />
        <rect x="30" y="40" width="140" height="130" rx="12" fill="white" fillOpacity="0.5" />

        {/* Glucose ring structure */}
        <g filter="url(#moleculeGlow)">
          {/* Hexagon ring */}
          <polygon
            points="100,65 125,78 125,103 100,116 75,103 75,78"
            fill="none"
            stroke="url(#carbGrad)"
            strokeWidth="3"
          />
          {/* Carbon atoms */}
          <circle cx="100" cy="65" r="6" fill="url(#carbGrad)" />
          <circle cx="125" cy="78" r="5" fill="#60A5FA" />
          <circle cx="125" cy="103" r="5" fill="#60A5FA" />
          <circle cx="100" cy="116" r="6" fill="url(#carbGrad)" />
          <circle cx="75" cy="103" r="5" fill="#60A5FA" />
          <circle cx="75" cy="78" r="5" fill="#60A5FA" />
          {/* Oxygen in ring */}
          <circle cx="100" cy="90" r="4" fill="#EF4444" />
          <text x="100" y="93" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
            O
          </text>
        </g>

        {/* Label */}
        <rect x="45" y="130" width="110" height="28" rx="6" fill="url(#carbGrad)" />
        <text x="100" y="148" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
          CARBOHYDRATES
        </text>

        {/* Info badge */}
        <circle cx="155" cy="55" r="12" fill="url(#carbGrad)" />
        <text x="155" y="59" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
          C
        </text>
      </motion.g>

      {/* Connection line to center */}
      <motion.line
        x1="170"
        y1="105"
        x2="210"
        y2="175"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeDasharray="4 2"
        opacity="0.4"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ delay: 0.6, duration: 0.4 }}
      />

      {/* Proteins - Top Right */}
      <motion.g
        initial={animate ? { x: 30, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {/* Card */}
        <rect
          x="350"
          y="40"
          width="140"
          height="130"
          rx="12"
          fill="url(#proteinCardGrad)"
          filter="url(#biomolCardShadow)"
        />
        <rect x="350" y="40" width="140" height="130" rx="12" fill="white" fillOpacity="0.5" />

        {/* Alpha helix structure */}
        <g filter="url(#moleculeGlow)">
          {/* Helix backbone */}
          <path
            d="M395 70 Q410 80 395 90 Q380 100 395 110"
            stroke="url(#proteinGrad)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M445 70 Q430 80 445 90 Q460 100 445 110"
            stroke="url(#proteinGrad)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Amino acid nodes */}
          <circle cx="395" cy="70" r="5" fill="url(#proteinGrad)" />
          <circle cx="395" cy="90" r="6" fill="#34D399" />
          <circle cx="395" cy="110" r="5" fill="url(#proteinGrad)" />
          <circle cx="445" cy="70" r="5" fill="url(#proteinGrad)" />
          <circle cx="445" cy="90" r="6" fill="#34D399" />
          <circle cx="445" cy="110" r="5" fill="url(#proteinGrad)" />
          {/* Hydrogen bonds */}
          <line
            x1="400"
            y1="80"
            x2="440"
            y2="80"
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0.6"
          />
          <line
            x1="400"
            y1="100"
            x2="440"
            y2="100"
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0.6"
          />
        </g>

        {/* Label */}
        <rect x="365" y="130" width="110" height="28" rx="6" fill="url(#proteinGrad)" />
        <text x="420" y="148" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
          PROTEINS
        </text>

        {/* Info badge */}
        <circle cx="475" cy="55" r="12" fill="url(#proteinGrad)" />
        <text x="475" y="59" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
          P
        </text>
      </motion.g>

      {/* Connection line to center */}
      <motion.line
        x1="350"
        y1="105"
        x2="310"
        y2="175"
        stroke="#10B981"
        strokeWidth="2"
        strokeDasharray="4 2"
        opacity="0.4"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ delay: 0.7, duration: 0.4 }}
      />

      {/* Lipids - Bottom Left */}
      <motion.g
        initial={animate ? { x: -30, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Card */}
        <rect
          x="30"
          y="230"
          width="140"
          height="130"
          rx="12"
          fill="url(#lipidCardGrad)"
          filter="url(#biomolCardShadow)"
        />
        <rect x="30" y="230" width="140" height="130" rx="12" fill="white" fillOpacity="0.5" />

        {/* Phospholipid structure */}
        <g filter="url(#moleculeGlow)">
          {/* Head (circle) */}
          <circle cx="80" cy="265" r="12" fill="url(#lipidGrad)" />
          <circle cx="120" cy="265" r="12" fill="url(#lipidGrad)" />
          {/* Tails (wavy lines) */}
          <path
            d="M80 277 L80 290 Q75 300 80 310 Q85 320 80 330"
            stroke="#F59E0B"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M85 277 L85 290 Q90 300 85 310 Q80 320 85 330"
            stroke="#FBBF24"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M120 277 L120 290 Q115 300 120 310 Q125 320 120 330"
            stroke="#F59E0B"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M125 277 L125 290 Q130 300 125 310 Q120 320 125 330"
            stroke="#FBBF24"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Labels */}
          <text x="100" y="258" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
            PO₄
          </text>
        </g>

        {/* Label */}
        <rect x="45" y="320" width="110" height="28" rx="6" fill="url(#lipidGrad)" />
        <text x="100" y="338" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
          LIPIDS
        </text>

        {/* Info badge */}
        <circle cx="155" cy="245" r="12" fill="url(#lipidGrad)" />
        <text x="155" y="249" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
          L
        </text>
      </motion.g>

      {/* Connection line to center */}
      <motion.line
        x1="170"
        y1="295"
        x2="210"
        y2="225"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="4 2"
        opacity="0.4"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.4 }}
      />

      {/* Nucleic Acids - Bottom Right */}
      <motion.g
        initial={animate ? { x: 30, opacity: 0 } : undefined}
        animate={animate ? { x: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {/* Card */}
        <rect
          x="350"
          y="230"
          width="140"
          height="130"
          rx="12"
          fill="url(#nucleicCardGrad)"
          filter="url(#biomolCardShadow)"
        />
        <rect x="350" y="230" width="140" height="130" rx="12" fill="white" fillOpacity="0.5" />

        {/* DNA double helix */}
        <g filter="url(#moleculeGlow)">
          {/* Left strand */}
          <path
            d="M400 250 Q385 265 400 280 Q415 295 400 310 Q385 325 400 340"
            stroke="url(#nucleicGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right strand */}
          <path
            d="M440 250 Q455 265 440 280 Q425 295 440 310 Q455 325 440 340"
            stroke="#A78BFA"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Base pairs */}
          <line
            x1="400"
            y1="258"
            x2="440"
            y2="272"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="400"
            y1="280"
            x2="440"
            y2="280"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="400"
            y1="302"
            x2="440"
            y2="288"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="400"
            y1="324"
            x2="440"
            y2="310"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity="0.6"
          />
          {/* Base pair labels */}
          <circle cx="420" cy="265" r="6" fill="#C084FC" />
          <text x="420" y="268" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
            AT
          </text>
          <circle cx="420" cy="295" r="6" fill="#A855F7" />
          <text x="420" y="298" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
            GC
          </text>
        </g>

        {/* Label */}
        <rect x="355" y="320" width="120" height="28" rx="6" fill="url(#nucleicGrad)" />
        <text x="415" y="338" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">
          NUCLEIC ACIDS
        </text>

        {/* Info badge */}
        <circle cx="475" cy="245" r="12" fill="url(#nucleicGrad)" />
        <text x="475" y="249" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
          N
        </text>
      </motion.g>

      {/* Connection line to center */}
      <motion.line
        x1="350"
        y1="295"
        x2="310"
        y2="225"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeDasharray="4 2"
        opacity="0.4"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ delay: 0.9, duration: 0.4 }}
      />

      {/* Bottom info bar */}
      <motion.g
        initial={animate ? { y: 20, opacity: 0 } : undefined}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <rect
          x="180"
          y="365"
          width="160"
          height="28"
          rx="14"
          fill="white"
          filter="url(#biomolCardShadow)"
        />
        <text x="260" y="383" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
          C • H • O • N • P • S
        </text>
      </motion.g>

      {/* Title */}
      <motion.text
        x="260"
        y="22"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="14"
        fontWeight="700"
        initial={animate ? { opacity: 0, y: -10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        The 4 Major Biomolecules
      </motion.text>
    </Wrapper>
  )
}

// Professional Cell Division Illustration - Mitosis & Meiosis - Silicon Valley Quality
export function CellDivisionIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="cellDivBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0F9FF" />
          <stop offset="50%" stopColor="#F5F3FF" />
          <stop offset="100%" stopColor="#FDF4FF" />
        </linearGradient>

        {/* Cell membrane gradient */}
        <linearGradient id="cellMembraneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Cytoplasm gradient */}
        <radialGradient id="cytoplasmGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF4FF" />
          <stop offset="70%" stopColor="#FAE8FF" />
          <stop offset="100%" stopColor="#F5D0FE" />
        </radialGradient>

        {/* Nucleus gradient */}
        <radialGradient id="nucleusGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#9333EA" />
        </radialGradient>

        {/* Chromosome gradients */}
        <linearGradient id="chromoBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="chromoRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="chromoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="chromoOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Spindle fiber gradient */}
        <linearGradient id="spindleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#64748B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.3" />
        </linearGradient>

        {/* Label card gradients */}
        <linearGradient id="mitosisCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#BFDBFE" />
        </linearGradient>
        <linearGradient id="meiosisCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#FBCFE8" />
        </linearGradient>

        {/* Centriole gradient */}
        <linearGradient id="centrioleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="cellDivShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.12" />
        </filter>
        <filter id="cellShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
        </filter>
        <filter id="chromoGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="560" height="420" fill="url(#cellDivBgGrad)" />

      {/* Decorative background elements */}
      <circle cx="50" cy="50" r="100" fill="#A855F7" opacity="0.04" />
      <circle cx="510" cy="370" r="120" fill="#3B82F6" opacity="0.04" />
      <circle cx="280" cy="210" r="180" fill="#EC4899" opacity="0.03" />

      {/* Title */}
      <motion.text
        x="280"
        y="28"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="16"
        fontWeight="700"
        initial={animate ? { opacity: 0, y: -10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Cell Division: Mitosis vs Meiosis
      </motion.text>

      {/* MITOSIS SECTION (Left) */}
      <motion.g
        initial={animate ? { opacity: 0, x: -20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Mitosis label card */}
        <rect
          x="15"
          y="42"
          width="255"
          height="32"
          rx="16"
          fill="url(#mitosisCardGrad)"
          filter="url(#cellDivShadow)"
        />
        <text x="142" y="63" textAnchor="middle" fill="#1D4ED8" fontSize="13" fontWeight="700">
          MITOSIS
        </text>
        <text x="142" y="70" textAnchor="middle" fill="#3B82F6" fontSize="7">
          (2n → 2n) Equational Division
        </text>

        {/* Interphase cell (top left) */}
        <g transform="translate(30, 85)">
          <ellipse
            cx="50"
            cy="45"
            rx="42"
            ry="38"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2.5"
            filter="url(#cellShadow)"
          />
          <circle cx="50" cy="45" r="18" fill="url(#nucleusGrad)" />
          {/* Chromatin network */}
          <path
            d="M42 40 Q50 35 58 40 Q55 48 50 50 Q45 48 42 40"
            stroke="#E9D5FF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
          <text x="50" y="95" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="500">
            Interphase
          </text>
        </g>

        {/* Arrow */}
        <motion.path
          d="M125 130 L145 130"
          stroke="#94A3B8"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#94A3B8" />
          </marker>
        </defs>

        {/* Prophase cell */}
        <g transform="translate(150, 85)">
          <ellipse
            cx="50"
            cy="45"
            rx="42"
            ry="38"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2.5"
            filter="url(#cellShadow)"
          />
          {/* Chromosomes condensing */}
          <motion.g
            animate={animate ? { scale: [1, 1.05, 1] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <path
              d="M40 35 L40 55"
              stroke="url(#chromoBlue)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M48 32 L48 52"
              stroke="url(#chromoRed)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M56 38 L56 58"
              stroke="url(#chromoBlue)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M64 35 L64 55"
              stroke="url(#chromoRed)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Centrioles */}
          <rect x="25" y="25" width="6" height="12" rx="2" fill="url(#centrioleGrad)" />
          <rect x="70" y="58" width="6" height="12" rx="2" fill="url(#centrioleGrad)" />
          <text x="50" y="95" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="500">
            Prophase
          </text>
        </g>

        {/* Metaphase cell */}
        <g transform="translate(30, 185)">
          <ellipse
            cx="50"
            cy="45"
            rx="42"
            ry="38"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2.5"
            filter="url(#cellShadow)"
          />
          {/* Spindle fibers */}
          <line x1="20" y1="15" x2="50" y2="45" stroke="url(#spindleGrad)" strokeWidth="1" />
          <line x1="80" y1="15" x2="50" y2="45" stroke="url(#spindleGrad)" strokeWidth="1" />
          <line x1="20" y1="75" x2="50" y2="45" stroke="url(#spindleGrad)" strokeWidth="1" />
          <line x1="80" y1="75" x2="50" y2="45" stroke="url(#spindleGrad)" strokeWidth="1" />
          {/* Chromosomes at metaphase plate */}
          <motion.g
            animate={animate ? { y: [0, -2, 0, 2, 0] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M38 42 L38 48"
              stroke="url(#chromoBlue)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M46 42 L46 48"
              stroke="url(#chromoRed)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M54 42 L54 48"
              stroke="url(#chromoBlue)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M62 42 L62 48"
              stroke="url(#chromoRed)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Metaphase plate line */}
          <line
            x1="30"
            y1="45"
            x2="70"
            y2="45"
            stroke="#94A3B8"
            strokeWidth="1"
            strokeDasharray="2"
            opacity="0.5"
          />
          <text x="50" y="95" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="500">
            Metaphase
          </text>
        </g>

        {/* Anaphase cell */}
        <g transform="translate(150, 185)">
          <ellipse
            cx="50"
            cy="45"
            rx="48"
            ry="35"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2.5"
            filter="url(#cellShadow)"
          />
          {/* Spindle fibers pulling */}
          <line x1="15" y1="45" x2="30" y2="45" stroke="url(#spindleGrad)" strokeWidth="1" />
          <line x1="70" y1="45" x2="85" y2="45" stroke="url(#spindleGrad)" strokeWidth="1" />
          {/* Chromosomes separating */}
          <motion.g
            animate={animate ? { x: [-2, -5, -2] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M28 38 L28 52"
              stroke="url(#chromoBlue)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M36 38 L36 52"
              stroke="url(#chromoRed)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          <motion.g
            animate={animate ? { x: [2, 5, 2] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M64 38 L64 52"
              stroke="url(#chromoBlue)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M72 38 L72 52"
              stroke="url(#chromoRed)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          <text x="50" y="92" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="500">
            Anaphase
          </text>
        </g>

        {/* Telophase/Cytokinesis - Two daughter cells */}
        <g transform="translate(90, 290)">
          {/* First daughter cell */}
          <motion.g
            animate={animate ? { x: [-3, 0, -3] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ellipse
              cx="30"
              cy="35"
              rx="30"
              ry="28"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="2"
              filter="url(#cellShadow)"
            />
            <circle cx="30" cy="35" r="12" fill="url(#nucleusGrad)" opacity="0.8" />
            <path
              d="M24 32 L24 38"
              stroke="url(#chromoBlue)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M36 32 L36 38"
              stroke="url(#chromoRed)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Second daughter cell */}
          <motion.g
            animate={animate ? { x: [3, 0, 3] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ellipse
              cx="90"
              cy="35"
              rx="30"
              ry="28"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="2"
              filter="url(#cellShadow)"
            />
            <circle cx="90" cy="35" r="12" fill="url(#nucleusGrad)" opacity="0.8" />
            <path
              d="M84 32 L84 38"
              stroke="url(#chromoBlue)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M96 32 L96 38"
              stroke="url(#chromoRed)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
          <text x="60" y="78" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="500">
            Telophase & Cytokinesis
          </text>
          {/* Result label */}
          <rect x="25" y="88" width="70" height="18" rx="9" fill="#DBEAFE" />
          <text x="60" y="100" textAnchor="middle" fill="#1D4ED8" fontSize="8" fontWeight="600">
            2 Diploid Cells
          </text>
        </g>
      </motion.g>

      {/* Divider line */}
      <line
        x1="280"
        y1="50"
        x2="280"
        y2="390"
        stroke="#E2E8F0"
        strokeWidth="2"
        strokeDasharray="6"
      />

      {/* MEIOSIS SECTION (Right) */}
      <motion.g
        initial={animate ? { opacity: 0, x: 20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Meiosis label card */}
        <rect
          x="290"
          y="42"
          width="255"
          height="32"
          rx="16"
          fill="url(#meiosisCardGrad)"
          filter="url(#cellDivShadow)"
        />
        <text x="417" y="63" textAnchor="middle" fill="#BE185D" fontSize="13" fontWeight="700">
          MEIOSIS
        </text>
        <text x="417" y="70" textAnchor="middle" fill="#DB2777" fontSize="7">
          (2n → n) Reductional Division
        </text>

        {/* Meiosis I - Prophase I with crossing over */}
        <g transform="translate(300, 85)">
          <ellipse
            cx="45"
            cy="42"
            rx="38"
            ry="35"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2"
            filter="url(#cellShadow)"
          />
          {/* Bivalents with crossing over */}
          <motion.g
            animate={animate ? { rotate: [0, 5, 0, -5, 0] } : undefined}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ transformOrigin: '45px 42px' }}
          >
            {/* Homologous pair 1 with chiasma */}
            <path
              d="M32 30 L32 40 Q40 45 32 50 L32 55"
              stroke="url(#chromoBlue)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M38 30 L38 40 Q30 45 38 50 L38 55"
              stroke="url(#chromoRed)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Homologous pair 2 */}
            <path
              d="M52 30 L52 40 Q60 45 52 50 L52 55"
              stroke="url(#chromoGreen)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M58 30 L58 40 Q50 45 58 50 L58 55"
              stroke="url(#chromoOrange)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>
          <text x="45" y="88" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="500">
            Prophase I
          </text>
          <text x="45" y="96" textAnchor="middle" fill="#94A3B8" fontSize="6">
            (Crossing Over)
          </text>
        </g>

        {/* Metaphase I */}
        <g transform="translate(395, 85)">
          <ellipse
            cx="45"
            cy="42"
            rx="38"
            ry="35"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2"
            filter="url(#cellShadow)"
          />
          {/* Bivalents aligned */}
          <motion.g
            animate={animate ? { y: [0, -1, 0, 1, 0] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M30 38 L30 46"
              stroke="url(#chromoBlue)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M36 38 L36 46"
              stroke="url(#chromoRed)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M54 38 L54 46"
              stroke="url(#chromoGreen)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M60 38 L60 46"
              stroke="url(#chromoOrange)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          <line
            x1="25"
            y1="42"
            x2="65"
            y2="42"
            stroke="#94A3B8"
            strokeWidth="1"
            strokeDasharray="2"
            opacity="0.5"
          />
          <text x="45" y="88" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="500">
            Metaphase I
          </text>
        </g>

        {/* Anaphase I - Homologs separate */}
        <g transform="translate(300, 175)">
          <ellipse
            cx="45"
            cy="38"
            rx="42"
            ry="32"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2"
            filter="url(#cellShadow)"
          />
          <motion.g
            animate={animate ? { x: [-2, -4, -2] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M22 32 L22 44"
              stroke="url(#chromoBlue)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M30 32 L30 44"
              stroke="url(#chromoGreen)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </motion.g>
          <motion.g
            animate={animate ? { x: [2, 4, 2] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M60 32 L60 44"
              stroke="url(#chromoRed)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M68 32 L68 44"
              stroke="url(#chromoOrange)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </motion.g>
          <text x="45" y="82" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="500">
            Anaphase I
          </text>
        </g>

        {/* Telophase I - Two haploid cells */}
        <g transform="translate(395, 175)">
          <motion.ellipse
            cx="25"
            cy="38"
            rx="22"
            ry="25"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2"
            filter="url(#cellShadow)"
            animate={animate ? { x: [-1, 0, -1] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.ellipse
            cx="65"
            cy="38"
            rx="22"
            ry="25"
            fill="url(#cytoplasmGrad)"
            stroke="url(#cellMembraneGrad)"
            strokeWidth="2"
            filter="url(#cellShadow)"
            animate={animate ? { x: [1, 0, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle cx="25" cy="38" r="8" fill="url(#nucleusGrad)" opacity="0.7" />
          <circle cx="65" cy="38" r="8" fill="url(#nucleusGrad)" opacity="0.7" />
          <path d="M22 35 L22 41" stroke="url(#chromoBlue)" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M28 35 L28 41"
            stroke="url(#chromoGreen)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M62 35 L62 41" stroke="url(#chromoRed)" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M68 35 L68 41"
            stroke="url(#chromoOrange)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text x="45" y="75" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="500">
            Telophase I
          </text>
        </g>

        {/* Meiosis II label */}
        <rect
          x="350"
          y="250"
          width="80"
          height="16"
          rx="8"
          fill="#FDF2F8"
          stroke="#FBCFE8"
          strokeWidth="1"
        />
        <text x="390" y="261" textAnchor="middle" fill="#BE185D" fontSize="8" fontWeight="600">
          Meiosis II
        </text>

        {/* Final result - Four haploid cells */}
        <g transform="translate(305, 275)">
          {/* Cell 1 */}
          <motion.g
            animate={animate ? { scale: [1, 1.02, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            <ellipse
              cx="28"
              cy="32"
              rx="22"
              ry="24"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="1.5"
              filter="url(#cellShadow)"
            />
            <circle cx="28" cy="32" r="8" fill="url(#nucleusGrad)" opacity="0.7" />
            <path
              d="M26 30 L26 34"
              stroke="url(#chromoBlue)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Cell 2 */}
          <motion.g
            animate={animate ? { scale: [1, 1.02, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <ellipse
              cx="78"
              cy="32"
              rx="22"
              ry="24"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="1.5"
              filter="url(#cellShadow)"
            />
            <circle cx="78" cy="32" r="8" fill="url(#nucleusGrad)" opacity="0.7" />
            <path
              d="M76 30 L76 34"
              stroke="url(#chromoGreen)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Cell 3 */}
          <motion.g
            animate={animate ? { scale: [1, 1.02, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: 1.0 }}
          >
            <ellipse
              cx="128"
              cy="32"
              rx="22"
              ry="24"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="1.5"
              filter="url(#cellShadow)"
            />
            <circle cx="128" cy="32" r="8" fill="url(#nucleusGrad)" opacity="0.7" />
            <path
              d="M126 30 L126 34"
              stroke="url(#chromoRed)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Cell 4 */}
          <motion.g
            animate={animate ? { scale: [1, 1.02, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          >
            <ellipse
              cx="178"
              cy="32"
              rx="22"
              ry="24"
              fill="url(#cytoplasmGrad)"
              stroke="url(#cellMembraneGrad)"
              strokeWidth="1.5"
              filter="url(#cellShadow)"
            />
            <circle cx="178" cy="32" r="8" fill="url(#nucleusGrad)" opacity="0.7" />
            <path
              d="M176 30 L176 34"
              stroke="url(#chromoOrange)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Result label */}
          <rect x="55" y="70" width="95" height="18" rx="9" fill="#FCE7F3" />
          <text x="102" y="82" textAnchor="middle" fill="#BE185D" fontSize="8" fontWeight="600">
            4 Haploid Cells (n)
          </text>
        </g>
      </motion.g>

      {/* Key differences box at bottom */}
      <motion.g
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <rect
          x="15"
          y="385"
          width="530"
          height="28"
          rx="8"
          fill="white"
          fillOpacity="0.9"
          filter="url(#cellDivShadow)"
        />
        <text x="280" y="402" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="500">
          <tspan fill="#1D4ED8" fontWeight="700">
            Mitosis:
          </tspan>{' '}
          Growth & Repair (2n→2n) |{' '}
          <tspan fill="#BE185D" fontWeight="700">
            Meiosis:
          </tspan>{' '}
          Gamete Formation (2n→n) with Genetic Variation
        </text>
      </motion.g>
    </Wrapper>
  )
}

// Professional Human Digestion Illustration - Silicon Valley Quality
export function HumanDigestionIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 520 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="digestBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="50%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FFEDD5" />
        </linearGradient>

        {/* Organ gradients */}
        <linearGradient id="mouthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>

        <linearGradient id="esophagusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#F87171" />
        </linearGradient>

        <linearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <radialGradient id="stomachInnerGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFEDD5" />
          <stop offset="100%" stopColor="#FED7AA" />
        </radialGradient>

        <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        <linearGradient id="gallbladderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#65A30D" />
        </linearGradient>

        <linearGradient id="pancreasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        <linearGradient id="smallIntestineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>

        <linearGradient id="largeIntestineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        <linearGradient id="villiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>

        {/* Card gradients */}
        <linearGradient id="digestCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>

        {/* Enzyme colors */}
        <linearGradient id="enzymeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="enzymeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="digestShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="organShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.2" />
        </filter>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="520" height="440" fill="url(#digestBgGrad)" />

      {/* Decorative background elements */}
      <circle cx="60" cy="60" r="100" fill="#F97316" opacity="0.05" />
      <circle cx="460" cy="380" r="120" fill="#8B5CF6" opacity="0.05" />
      <circle cx="260" cy="220" r="200" fill="#FBBF24" opacity="0.03" />

      {/* Title */}
      <motion.text
        x="260"
        y="26"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="15"
        fontWeight="700"
        initial={animate ? { opacity: 0, y: -10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Human Digestive System
      </motion.text>

      {/* MAIN DIGESTIVE TRACT - Left side */}
      <motion.g
        initial={animate ? { opacity: 0, x: -20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Mouth/Buccal Cavity */}
        <g transform="translate(40, 45)">
          <ellipse
            cx="45"
            cy="25"
            rx="40"
            ry="22"
            fill="url(#mouthGrad)"
            filter="url(#organShadow)"
          />
          {/* Teeth */}
          <rect x="15" y="18" width="6" height="8" rx="1" fill="white" />
          <rect x="24" y="18" width="6" height="8" rx="1" fill="white" />
          <rect x="33" y="18" width="6" height="8" rx="1" fill="white" />
          <rect x="51" y="18" width="6" height="8" rx="1" fill="white" />
          <rect x="60" y="18" width="6" height="8" rx="1" fill="white" />
          <rect x="69" y="18" width="6" height="8" rx="1" fill="white" />
          {/* Tongue */}
          <ellipse cx="45" cy="32" rx="20" ry="10" fill="#E11D48" opacity="0.7" />
          {/* Salivary gland indicator */}
          <motion.circle
            cx="12"
            cy="25"
            r="6"
            fill="url(#enzymeBlue)"
            animate={animate ? { scale: [1, 1.2, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <text x="45" y="58" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">
            Mouth
          </text>
          <text x="45" y="67" textAnchor="middle" fill="#94A3B8" fontSize="6">
            Salivary Amylase
          </text>
        </g>

        {/* Esophagus */}
        <motion.g
          animate={animate ? { y: [0, 2, 0] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path
            d="M85 115 Q85 135 90 155 Q95 175 90 195"
            stroke="url(#esophagusGrad)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            filter="url(#organShadow)"
          />
          {/* Peristalsis wave indicator */}
          <motion.circle
            cx="87"
            cy="140"
            r="4"
            fill="#FBBF24"
            animate={animate ? { cy: [130, 180, 130] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>
        <text x="115" y="155" fill="#64748B" fontSize="7" fontWeight="500">
          Esophagus
        </text>
        <text x="115" y="163" fill="#94A3B8" fontSize="5">
          (Peristalsis)
        </text>

        {/* Stomach - J-shaped */}
        <g transform="translate(50, 195)">
          <path
            d="M40 0 Q20 0 15 30 Q10 60 25 90 Q40 115 70 110 Q100 105 110 75 Q115 50 100 30 Q85 10 60 5 Q50 2 40 0 Z"
            fill="url(#stomachGrad)"
            filter="url(#organShadow)"
          />
          <path
            d="M45 15 Q30 18 28 40 Q26 60 38 80 Q50 95 70 92 Q88 89 95 65 Q100 45 88 30 Q75 18 55 15 Q50 14 45 15 Z"
            fill="url(#stomachInnerGrad)"
          />
          {/* Gastric glands */}
          <motion.g
            animate={animate ? { opacity: [0.6, 1, 0.6] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <circle cx="45" cy="45" r="3" fill="#DC2626" />
            <circle cx="60" cy="55" r="3" fill="#DC2626" />
            <circle cx="75" cy="50" r="3" fill="#DC2626" />
          </motion.g>
          {/* Labels */}
          <text x="60" y="130" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">
            Stomach
          </text>
          <text x="60" y="139" textAnchor="middle" fill="#94A3B8" fontSize="5">
            HCl + Pepsin
          </text>
        </g>

        {/* Small Intestine - Coiled */}
        <g transform="translate(80, 340)">
          <motion.path
            d="M60 0 Q30 5 25 25 Q20 45 40 50 Q60 55 80 45 Q100 35 95 55 Q90 75 65 80 Q40 85 35 65"
            stroke="url(#smallIntestineGrad)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            filter="url(#organShadow)"
            animate={animate ? { pathLength: [0.95, 1, 0.95] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <text x="60" y="98" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="600">
            Small Intestine
          </text>
          <text x="60" y="106" textAnchor="middle" fill="#94A3B8" fontSize="5">
            (~6m) Main Absorption
          </text>
        </g>

        {/* Large Intestine - Ascending, Transverse, Descending */}
        <g transform="translate(15, 340)">
          <path
            d="M170 65 L170 30 Q170 10 150 10 L60 10 Q40 10 40 30 L40 75"
            stroke="url(#largeIntestineGrad)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            filter="url(#organShadow)"
          />
          <text x="105" y="-3" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="600">
            Large Intestine
          </text>
        </g>
      </motion.g>

      {/* ASSOCIATED GLANDS - Right side */}
      <motion.g
        initial={animate ? { opacity: 0, x: 20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Liver */}
        <g transform="translate(280, 50)">
          <rect
            x="0"
            y="0"
            width="200"
            height="85"
            rx="12"
            fill="url(#digestCardGrad)"
            filter="url(#digestShadow)"
          />
          <path
            d="M25 25 Q15 30 15 50 Q15 65 30 70 Q50 75 90 70 Q120 65 130 50 Q140 35 130 25 Q115 15 80 15 Q45 15 25 25 Z"
            fill="url(#liverGrad)"
            filter="url(#organShadow)"
          />
          {/* Gallbladder */}
          <ellipse
            cx="115"
            cy="55"
            rx="12"
            ry="18"
            fill="url(#gallbladderGrad)"
            filter="url(#organShadow)"
          />
          <motion.path
            d="M115 73 L115 85"
            stroke="#84CC16"
            strokeWidth="3"
            animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="155" y="30" fill="#78350F" fontSize="10" fontWeight="700">
            Liver
          </text>
          <text x="155" y="42" fill="#92400E" fontSize="7">
            Produces Bile
          </text>
          <text x="155" y="52" fill="#92400E" fontSize="6">
            (No enzymes)
          </text>
          <text x="155" y="68" fill="#65A30D" fontSize="8" fontWeight="600">
            Gallbladder
          </text>
          <text x="155" y="78" fill="#84CC16" fontSize="6">
            Stores Bile
          </text>
        </g>

        {/* Pancreas */}
        <g transform="translate(280, 145)">
          <rect
            x="0"
            y="0"
            width="200"
            height="85"
            rx="12"
            fill="url(#digestCardGrad)"
            filter="url(#digestShadow)"
          />
          <path
            d="M20 45 Q15 35 25 30 Q40 25 70 30 Q100 35 120 42 Q130 45 128 50 Q125 55 115 55 Q90 55 60 50 Q30 45 20 45 Z"
            fill="url(#pancreasGrad)"
            filter="url(#organShadow)"
          />
          {/* Pancreatic duct */}
          <motion.path
            d="M70 50 Q70 65 60 75"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="3"
            animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="145" y="25" fill="#92400E" fontSize="10" fontWeight="700">
            Pancreas
          </text>
          <text x="145" y="38" fill="#B45309" fontSize="7">
            Exocrine:
          </text>
          <text x="145" y="48" fill="#D97706" fontSize="6">
            Amylase, Lipase
          </text>
          <text x="145" y="58" fill="#D97706" fontSize="6">
            Trypsin, Chymotrypsin
          </text>
          <text x="145" y="70" fill="#B45309" fontSize="7">
            Endocrine:
          </text>
          <text x="145" y="80" fill="#D97706" fontSize="6">
            Insulin, Glucagon
          </text>
        </g>

        {/* Villi Detail Box */}
        <g transform="translate(280, 240)">
          <rect
            x="0"
            y="0"
            width="200"
            height="95"
            rx="12"
            fill="url(#digestCardGrad)"
            filter="url(#digestShadow)"
          />
          <text x="100" y="18" textAnchor="middle" fill="#EA580C" fontSize="9" fontWeight="700">
            Intestinal Villi
          </text>
          {/* Villi illustration */}
          <g transform="translate(15, 25)">
            {/* Villus 1 */}
            <motion.g
              animate={animate ? { y: [0, -2, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              <path d="M15 50 Q15 20 20 10 Q25 0 30 10 Q35 20 35 50 Z" fill="url(#villiGrad)" />
              <line x1="25" y1="15" x2="25" y2="45" stroke="#DC2626" strokeWidth="1.5" />
            </motion.g>
            {/* Villus 2 */}
            <motion.g
              animate={animate ? { y: [0, -2, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              <path d="M45 50 Q45 20 50 10 Q55 0 60 10 Q65 20 65 50 Z" fill="url(#villiGrad)" />
              <line x1="55" y1="15" x2="55" y2="45" stroke="#DC2626" strokeWidth="1.5" />
            </motion.g>
            {/* Villus 3 */}
            <motion.g
              animate={animate ? { y: [0, -2, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              <path d="M75 50 Q75 20 80 10 Q85 0 90 10 Q95 20 95 50 Z" fill="url(#villiGrad)" />
              <line x1="85" y1="15" x2="85" y2="45" stroke="#DC2626" strokeWidth="1.5" />
            </motion.g>
            {/* Base line */}
            <rect x="5" y="50" width="100" height="5" rx="2" fill="#FDBA74" />
          </g>
          <text x="125" y="42" fill="#64748B" fontSize="7">
            Blood Capillary
          </text>
          <text x="125" y="52" fill="#DC2626" fontSize="6">
            (Red line)
          </text>
          <text x="125" y="66" fill="#64748B" fontSize="7">
            Microvilli increase
          </text>
          <text x="125" y="76" fill="#64748B" fontSize="7">
            surface area 600x
          </text>
          <text x="100" y="90" textAnchor="middle" fill="#94A3B8" fontSize="6">
            Main site of absorption
          </text>
        </g>

        {/* Enzymes Summary */}
        <g transform="translate(280, 345)">
          <rect
            x="0"
            y="0"
            width="200"
            height="85"
            rx="12"
            fill="url(#digestCardGrad)"
            filter="url(#digestShadow)"
          />
          <text x="100" y="16" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="700">
            Key Enzymes
          </text>
          {/* Enzyme list */}
          <g transform="translate(10, 25)">
            <circle cx="8" cy="6" r="4" fill="#3B82F6" />
            <text x="18" y="9" fill="#1E293B" fontSize="7" fontWeight="500">
              Amylase
            </text>
            <text x="65" y="9" fill="#64748B" fontSize="6">
              Starch → Maltose
            </text>

            <circle cx="8" cy="22" r="4" fill="#10B981" />
            <text x="18" y="25" fill="#1E293B" fontSize="7" fontWeight="500">
              Pepsin
            </text>
            <text x="55" y="25" fill="#64748B" fontSize="6">
              Proteins → Peptides
            </text>

            <circle cx="8" cy="38" r="4" fill="#F59E0B" />
            <text x="18" y="41" fill="#1E293B" fontSize="7" fontWeight="500">
              Lipase
            </text>
            <text x="50" y="41" fill="#64748B" fontSize="6">
              Fats → Fatty Acids
            </text>

            <circle cx="8" cy="54" r="4" fill="#8B5CF6" />
            <text x="18" y="57" fill="#1E293B" fontSize="7" fontWeight="500">
              Trypsin
            </text>
            <text x="55" y="57" fill="#64748B" fontSize="6">
              Proteins → Amino Acids
            </text>
          </g>
        </g>
      </motion.g>

      {/* Flow arrows connecting organs */}
      <motion.g
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Food flow indicator */}
        <motion.circle
          cx="85"
          cy="80"
          r="5"
          fill="#FBBF24"
          filter="url(#softGlow)"
          animate={animate ? { cy: [80, 320, 80], opacity: [1, 0.8, 1] } : undefined}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.g>

      {/* Bottom summary bar */}
      <motion.g
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <rect
          x="15"
          y="418"
          width="490"
          height="18"
          rx="6"
          fill="white"
          fillOpacity="0.9"
          filter="url(#digestShadow)"
        />
        <text x="260" y="430" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="500">
          <tspan fill="#F97316" fontWeight="700">
            Mouth
          </tspan>{' '}
          (Carbs) →{' '}
          <tspan fill="#EA580C" fontWeight="700">
            Stomach
          </tspan>{' '}
          (Proteins) →{' '}
          <tspan fill="#F97316" fontWeight="700">
            Small Intestine
          </tspan>{' '}
          (All + Absorption) →{' '}
          <tspan fill="#8B5CF6" fontWeight="700">
            Large Intestine
          </tspan>{' '}
          (Water)
        </text>
      </motion.g>
    </Wrapper>
  )
}

// Professional Respiration/Breathing Illustration - Silicon Valley Quality
export function RespirationIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 540 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="respBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="50%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#ECFEFF" />
        </linearGradient>

        {/* Lung gradients */}
        <linearGradient id="lungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <radialGradient id="lungInnerGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FBCFE8" />
          <stop offset="100%" stopColor="#F9A8D4" />
        </radialGradient>

        {/* Trachea/Bronchi gradient */}
        <linearGradient id="tracheaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>

        {/* Alveoli gradient */}
        <radialGradient id="alveoliGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF2F8" />
          <stop offset="70%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#FBCFE8" />
        </radialGradient>

        {/* Oxygen gradient - Blue */}
        <linearGradient id="oxygenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        {/* CO2 gradient - Gray/Purple */}
        <linearGradient id="co2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Blood vessel gradients */}
        <linearGradient id="arteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Hemoglobin gradient */}
        <linearGradient id="hbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>

        {/* Card gradient */}
        <linearGradient id="respCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="respShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="organShadow2" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.2" />
        </filter>
        <filter id="gasGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="540" height="420" fill="url(#respBgGrad)" />

      {/* Decorative background elements */}
      <circle cx="80" cy="80" r="120" fill="#3B82F6" opacity="0.04" />
      <circle cx="460" cy="340" r="100" fill="#EC4899" opacity="0.04" />
      <circle cx="270" cy="210" r="180" fill="#8B5CF6" opacity="0.03" />

      {/* Title */}
      <motion.text
        x="270"
        y="24"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="15"
        fontWeight="700"
        initial={animate ? { opacity: 0, y: -10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Breathing & Gas Exchange
      </motion.text>

      {/* RESPIRATORY SYSTEM - Left side */}
      <motion.g
        initial={animate ? { opacity: 0, x: -20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Nose/Nasal Cavity */}
        <g transform="translate(85, 40)">
          <path
            d="M30 0 Q20 5 15 20 Q12 35 20 45 L40 45 Q48 35 45 20 Q40 5 30 0 Z"
            fill="#FDA4AF"
            filter="url(#organShadow2)"
          />
          <text x="30" y="58" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="500">
            Nose
          </text>
        </g>

        {/* Pharynx & Larynx */}
        <path
          d="M115 85 L115 105 Q115 115 110 120 L110 130"
          stroke="url(#tracheaGrad)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <text x="135" y="108" fill="#64748B" fontSize="6">
          Pharynx
        </text>
        <text x="135" y="128" fill="#64748B" fontSize="6">
          Larynx
        </text>

        {/* Trachea with cartilage rings */}
        <g transform="translate(95, 130)">
          <rect
            x="5"
            y="0"
            width="20"
            height="50"
            rx="3"
            fill="url(#tracheaGrad)"
            filter="url(#organShadow2)"
          />
          {/* Cartilage rings */}
          <rect x="3" y="5" width="24" height="4" rx="2" fill="#FCA5A5" />
          <rect x="3" y="15" width="24" height="4" rx="2" fill="#FCA5A5" />
          <rect x="3" y="25" width="24" height="4" rx="2" fill="#FCA5A5" />
          <rect x="3" y="35" width="24" height="4" rx="2" fill="#FCA5A5" />
          <text x="35" y="30" fill="#64748B" fontSize="7" fontWeight="500">
            Trachea
          </text>
        </g>

        {/* Bronchi bifurcation */}
        <g transform="translate(60, 180)">
          {/* Left bronchus */}
          <path
            d="M55 0 Q40 15 25 35"
            stroke="url(#tracheaGrad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right bronchus */}
          <path
            d="M55 0 Q70 15 85 35"
            stroke="url(#tracheaGrad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <text x="55" y="-5" textAnchor="middle" fill="#64748B" fontSize="6">
            Bronchi
          </text>
        </g>

        {/* Left Lung */}
        <motion.g
          animate={animate ? { scale: [1, 1.03, 1] } : undefined}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: '60px 280px' }}
        >
          <path
            d="M20 220 Q10 240 15 290 Q20 340 50 360 Q80 375 100 350 Q115 320 110 270 Q105 230 85 215 Q65 200 40 210 Q25 215 20 220 Z"
            fill="url(#lungGrad)"
            filter="url(#organShadow2)"
          />
          <path
            d="M30 235 Q25 255 28 290 Q32 325 55 340 Q75 350 90 335 Q100 315 98 275 Q95 245 80 235 Q65 225 45 230 Q35 232 30 235 Z"
            fill="url(#lungInnerGrad)"
          />
          {/* Bronchioles inside */}
          <path
            d="M85 215 Q70 240 60 270 Q55 290 58 310"
            stroke="#F9A8D4"
            strokeWidth="2"
            fill="none"
          />
          <path d="M60 270 Q45 280 40 300" stroke="#F9A8D4" strokeWidth="1.5" fill="none" />
          <path d="M60 270 Q75 285 80 305" stroke="#F9A8D4" strokeWidth="1.5" fill="none" />
        </motion.g>

        {/* Right Lung */}
        <motion.g
          animate={animate ? { scale: [1, 1.03, 1] } : undefined}
          transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
          style={{ transformOrigin: '170px 280px' }}
        >
          <path
            d="M210 220 Q220 240 215 290 Q210 340 180 360 Q150 375 130 350 Q115 320 120 270 Q125 230 145 215 Q165 200 190 210 Q205 215 210 220 Z"
            fill="url(#lungGrad)"
            filter="url(#organShadow2)"
          />
          <path
            d="M200 235 Q205 255 202 290 Q198 325 175 340 Q155 350 140 335 Q130 315 132 275 Q135 245 150 235 Q165 225 185 230 Q195 232 200 235 Z"
            fill="url(#lungInnerGrad)"
          />
          {/* Bronchioles inside */}
          <path
            d="M145 215 Q160 240 170 270 Q175 290 172 310"
            stroke="#F9A8D4"
            strokeWidth="2"
            fill="none"
          />
          <path d="M170 270 Q185 280 190 300" stroke="#F9A8D4" strokeWidth="1.5" fill="none" />
          <path d="M170 270 Q155 285 150 305" stroke="#F9A8D4" strokeWidth="1.5" fill="none" />
        </motion.g>

        {/* Labels */}
        <text x="60" y="385" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">
          Left Lung
        </text>
        <text x="170" y="385" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">
          Right Lung
        </text>

        {/* Diaphragm */}
        <motion.path
          d="M5 365 Q60 390 115 375 Q170 390 225 365"
          stroke="#94A3B8"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          animate={
            animate
              ? {
                  d: [
                    'M5 365 Q60 390 115 375 Q170 390 225 365',
                    'M5 370 Q60 380 115 370 Q170 380 225 370',
                    'M5 365 Q60 390 115 375 Q170 390 225 365',
                  ],
                }
              : undefined
          }
          transition={{ duration: 3, repeat: Infinity }}
        />
        <text x="115" y="400" textAnchor="middle" fill="#64748B" fontSize="7">
          Diaphragm
        </text>
      </motion.g>

      {/* ALVEOLUS DETAIL - Center/Right */}
      <motion.g
        initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <g transform="translate(245, 38)">
          <rect
            x="0"
            y="0"
            width="280"
            height="165"
            rx="12"
            fill="url(#respCardGrad)"
            filter="url(#respShadow)"
          />
          <text x="140" y="18" textAnchor="middle" fill="#BE185D" fontSize="10" fontWeight="700">
            Gas Exchange at Alveolus
          </text>

          {/* Alveolus structure */}
          <g transform="translate(20, 28)">
            {/* Alveolus bubble */}
            <circle
              cx="65"
              cy="60"
              r="50"
              fill="url(#alveoliGrad)"
              stroke="#F9A8D4"
              strokeWidth="2"
            />
            <text x="65" y="60" textAnchor="middle" fill="#BE185D" fontSize="8" fontWeight="600">
              Alveolus
            </text>
            <text x="65" y="72" textAnchor="middle" fill="#9D174D" fontSize="6">
              (Air space)
            </text>

            {/* Capillary wrapping around */}
            <path
              d="M20 35 Q10 60 20 85 Q30 100 50 105 Q80 110 100 95 Q115 80 115 60 Q115 40 100 30"
              stroke="url(#arteryGrad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />

            {/* O2 molecules moving in */}
            <motion.g
              animate={animate ? { x: [0, 15, 0], opacity: [1, 0.5, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <circle cx="45" cy="45" r="5" fill="url(#oxygenGrad)" filter="url(#gasGlow)" />
              <text x="45" y="48" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">
                O₂
              </text>
            </motion.g>
            <motion.g
              animate={animate ? { x: [0, 15, 0], opacity: [1, 0.5, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <circle cx="55" cy="35" r="5" fill="url(#oxygenGrad)" filter="url(#gasGlow)" />
              <text x="55" y="38" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">
                O₂
              </text>
            </motion.g>

            {/* CO2 molecules moving out */}
            <motion.g
              animate={animate ? { x: [0, -15, 0], opacity: [1, 0.5, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <circle cx="85" cy="80" r="5" fill="url(#co2Grad)" filter="url(#gasGlow)" />
              <text x="85" y="83" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">
                CO₂
              </text>
            </motion.g>
            <motion.g
              animate={animate ? { x: [0, -15, 0], opacity: [1, 0.5, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <circle cx="75" cy="90" r="5" fill="url(#co2Grad)" filter="url(#gasGlow)" />
              <text x="75" y="93" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">
                CO₂
              </text>
            </motion.g>

            {/* Arrows showing diffusion */}
            <path
              d="M35 50 L25 55"
              stroke="#3B82F6"
              strokeWidth="1.5"
              markerEnd="url(#arrowBlue)"
            />
            <path
              d="M95 75 L105 70"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              markerEnd="url(#arrowPurple)"
            />
            <defs>
              <marker
                id="arrowBlue"
                markerWidth="4"
                markerHeight="4"
                refX="3"
                refY="2"
                orient="auto"
              >
                <path d="M0,0 L4,2 L0,4 Z" fill="#3B82F6" />
              </marker>
              <marker
                id="arrowPurple"
                markerWidth="4"
                markerHeight="4"
                refX="3"
                refY="2"
                orient="auto"
              >
                <path d="M0,0 L4,2 L0,4 Z" fill="#8B5CF6" />
              </marker>
            </defs>
          </g>

          {/* Legend */}
          <g transform="translate(155, 35)">
            <circle cx="10" cy="8" r="6" fill="url(#oxygenGrad)" />
            <text x="22" y="11" fill="#1E293B" fontSize="7" fontWeight="500">
              O₂ (into blood)
            </text>

            <circle cx="10" cy="28" r="6" fill="url(#co2Grad)" />
            <text x="22" y="31" fill="#1E293B" fontSize="7" fontWeight="500">
              CO₂ (into alveolus)
            </text>

            <rect x="4" y="43" width="12" height="8" rx="2" fill="url(#arteryGrad)" />
            <text x="22" y="50" fill="#1E293B" fontSize="7" fontWeight="500">
              Capillary
            </text>

            <text x="0" y="72" fill="#64748B" fontSize="6" fontWeight="600">
              Diffusion Distance:
            </text>
            <text x="0" y="82" fill="#64748B" fontSize="6">
              0.2 μm (very thin!)
            </text>

            <text x="0" y="100" fill="#64748B" fontSize="6" fontWeight="600">
              Surface Area:
            </text>
            <text x="0" y="110" fill="#64748B" fontSize="6">
              ~70-100 m² (tennis court)
            </text>
          </g>
        </g>
      </motion.g>

      {/* OXYGEN TRANSPORT - Right side */}
      <motion.g
        initial={animate ? { opacity: 0, x: 20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <g transform="translate(245, 215)">
          <rect
            x="0"
            y="0"
            width="280"
            height="95"
            rx="12"
            fill="url(#respCardGrad)"
            filter="url(#respShadow)"
          />
          <text x="140" y="16" textAnchor="middle" fill="#DC2626" fontSize="10" fontWeight="700">
            O₂ Transport in Blood
          </text>

          {/* Hemoglobin illustration */}
          <g transform="translate(15, 28)">
            {/* RBC shape */}
            <ellipse
              cx="40"
              cy="30"
              rx="30"
              ry="18"
              fill="url(#hbGrad)"
              filter="url(#organShadow2)"
            />
            <ellipse cx="40" cy="30" rx="12" ry="8" fill="#FCA5A5" />

            {/* O2 binding sites */}
            <motion.circle
              cx="20"
              cy="25"
              r="4"
              fill="url(#oxygenGrad)"
              animate={animate ? { scale: [1, 1.2, 1] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            <motion.circle
              cx="35"
              cy="18"
              r="4"
              fill="url(#oxygenGrad)"
              animate={animate ? { scale: [1, 1.2, 1] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.circle
              cx="50"
              cy="18"
              r="4"
              fill="url(#oxygenGrad)"
              animate={animate ? { scale: [1, 1.2, 1] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
            <motion.circle
              cx="60"
              cy="28"
              r="4"
              fill="url(#oxygenGrad)"
              animate={animate ? { scale: [1, 1.2, 1] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
            />

            <text x="40" y="60" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="600">
              Hemoglobin (Hb)
            </text>
            <text x="40" y="70" textAnchor="middle" fill="#94A3B8" fontSize="6">
              4 O₂ binding sites
            </text>
          </g>

          {/* Transport percentages */}
          <g transform="translate(100, 28)">
            <text x="0" y="10" fill="#1E293B" fontSize="8" fontWeight="600">
              O₂ Transport:
            </text>
            <rect x="0" y="16" width="160" height="10" rx="3" fill="#E2E8F0" />
            <rect x="0" y="16" width="155" height="10" rx="3" fill="url(#oxygenGrad)" />
            <text x="70" y="24" fill="white" fontSize="6" fontWeight="bold">
              97% as Oxyhemoglobin
            </text>
            <text x="165" y="24" fill="#64748B" fontSize="6">
              3% dissolved
            </text>

            <text x="0" y="45" fill="#1E293B" fontSize="8" fontWeight="600">
              CO₂ Transport:
            </text>
            <rect x="0" y="51" width="160" height="10" rx="3" fill="#E2E8F0" />
            <rect x="0" y="51" width="112" height="10" rx="3" fill="url(#co2Grad)" />
            <text x="50" y="59" fill="white" fontSize="6" fontWeight="bold">
              70% as HCO₃⁻
            </text>
            <text x="118" y="59" fill="#64748B" fontSize="5">
              23% Hb, 7% dissolved
            </text>
          </g>
        </g>
      </motion.g>

      {/* LUNG VOLUMES - Bottom Right */}
      <motion.g
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <g transform="translate(245, 320)">
          <rect
            x="0"
            y="0"
            width="280"
            height="85"
            rx="12"
            fill="url(#respCardGrad)"
            filter="url(#respShadow)"
          />
          <text x="140" y="16" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="700">
            Lung Volumes & Capacities
          </text>

          {/* Volume bars */}
          <g transform="translate(15, 25)">
            <text x="0" y="10" fill="#64748B" fontSize="7" fontWeight="500">
              TV (Tidal Volume)
            </text>
            <rect x="85" y="3" width="50" height="10" rx="2" fill="#3B82F6" />
            <text x="140" y="11" fill="#64748B" fontSize="6">
              ~500 mL
            </text>

            <text x="0" y="26" fill="#64748B" fontSize="7" fontWeight="500">
              IRV
            </text>
            <rect x="85" y="19" width="100" height="10" rx="2" fill="#60A5FA" />
            <text x="190" y="27" fill="#64748B" fontSize="6">
              ~3000 mL
            </text>

            <text x="0" y="42" fill="#64748B" fontSize="7" fontWeight="500">
              ERV
            </text>
            <rect x="85" y="35" width="45" height="10" rx="2" fill="#93C5FD" />
            <text x="135" y="43" fill="#64748B" fontSize="6">
              ~1100 mL
            </text>

            <text x="0" y="58" fill="#64748B" fontSize="7" fontWeight="500">
              RV (Residual)
            </text>
            <rect x="85" y="51" width="50" height="10" rx="2" fill="#BFDBFE" />
            <text x="140" y="59" fill="#64748B" fontSize="6">
              ~1200 mL
            </text>
          </g>

          {/* Vital Capacity */}
          <g transform="translate(200, 30)">
            <text x="0" y="0" fill="#1E293B" fontSize="7" fontWeight="600">
              Vital Capacity
            </text>
            <text x="0" y="12" fill="#0369A1" fontSize="9" fontWeight="700">
              ~4600 mL
            </text>
            <text x="0" y="24" fill="#64748B" fontSize="6">
              (IRV+TV+ERV)
            </text>
            <text x="0" y="40" fill="#1E293B" fontSize="7" fontWeight="600">
              Total Lung
            </text>
            <text x="0" y="52" fill="#0369A1" fontSize="9" fontWeight="700">
              ~5800 mL
            </text>
          </g>
        </g>
      </motion.g>

      {/* Breathing indicator */}
      <motion.g
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <text x="115" y="410" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="500">
          <motion.tspan
            animate={animate ? { opacity: [1, 0.5, 1] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Inhale ↔ Exhale
          </motion.tspan>
        </text>
      </motion.g>
    </Wrapper>
  )
}

// Professional Body Fluids & Circulation Illustration - Silicon Valley Quality
export function CirculationIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      viewBox="0 0 560 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="circBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF2F2" />
          <stop offset="50%" stopColor="#FFF1F2" />
          <stop offset="100%" stopColor="#FCE7F3" />
        </linearGradient>

        {/* Heart gradients */}
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <radialGradient id="heartInnerGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#EF4444" />
        </radialGradient>

        {/* Chamber colors */}
        <linearGradient id="atriumRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="ventricleRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="atriumLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="ventricleLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>

        {/* Blood vessel gradients */}
        <linearGradient id="arteryGradCirc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="pulmonaryArteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="pulmonaryVeinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        {/* RBC gradient */}
        <radialGradient id="rbcGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#DC2626" />
        </radialGradient>

        {/* ECG gradient */}
        <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>

        {/* Card gradient */}
        <linearGradient id="circCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FEF2F2" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="circShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="heartShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.25" />
        </filter>
        <filter id="vesselGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="560" height="440" fill="url(#circBgGrad)" />

      {/* Decorative background elements */}
      <circle cx="80" cy="80" r="120" fill="#DC2626" opacity="0.03" />
      <circle cx="480" cy="360" r="100" fill="#3B82F6" opacity="0.03" />
      <circle cx="280" cy="220" r="180" fill="#EC4899" opacity="0.02" />

      {/* Title */}
      <motion.text
        x="280"
        y="24"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="15"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={animate ? { opacity: 0, y: -10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Human Heart & Circulatory System
      </motion.text>

      {/* HEART DIAGRAM - Left side */}
      <motion.g
        initial={animate ? { opacity: 0, x: -20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <g transform="translate(25, 45)">
          {/* Heart outline */}
          <path
            d="M100 30 Q60 10 40 40 Q10 80 20 130 Q30 180 100 230 Q170 180 180 130 Q190 80 160 40 Q140 10 100 30 Z"
            fill="url(#heartGrad)"
            filter="url(#heartShadow)"
          />

          {/* Septum - vertical divider */}
          <line x1="100" y1="50" x2="100" y2="200" stroke="#7F1D1D" strokeWidth="3" />

          {/* Right Atrium (upper left in viewer's perspective) */}
          <path
            d="M40 55 Q35 50 50 45 Q65 40 80 48 Q90 55 90 75 L40 75 Q35 65 40 55 Z"
            fill="url(#atriumRightGrad)"
          />
          <text x="65" y="65" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
            RA
          </text>

          {/* Right Ventricle (lower left in viewer's perspective) */}
          <path
            d="M40 85 Q35 80 40 80 L90 80 L90 160 Q70 175 40 155 Q25 140 30 115 Q35 90 40 85 Z"
            fill="url(#ventricleRightGrad)"
          />
          <text x="58" y="125" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
            RV
          </text>

          {/* Left Atrium (upper right in viewer's perspective) */}
          <path
            d="M110 48 Q125 40 145 45 Q165 50 160 60 Q158 75 160 75 L110 75 Q110 60 110 48 Z"
            fill="url(#atriumLeftGrad)"
          />
          <text x="135" y="65" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
            LA
          </text>

          {/* Left Ventricle (lower right - thicker wall!) */}
          <path
            d="M110 80 L160 80 Q165 85 170 115 Q175 145 160 165 Q130 190 110 175 L110 80 Z"
            fill="url(#ventricleLeftGrad)"
          />
          <text x="138" y="130" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
            LV
          </text>

          {/* Superior Vena Cava */}
          <motion.path
            d="M50 45 Q50 20 65 10 L75 10 Q75 20 75 35"
            stroke="url(#veinGrad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <text x="62" y="6" textAnchor="middle" fill="#2563EB" fontSize="6" fontWeight="500">
            SVC
          </text>

          {/* Inferior Vena Cava */}
          <motion.path
            d="M55 85 Q40 100 35 130 L35 155"
            stroke="url(#veinGrad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <text x="22" y="145" fill="#2563EB" fontSize="6" fontWeight="500">
            IVC
          </text>

          {/* Pulmonary Artery */}
          <motion.path
            d="M65 82 Q55 70 45 50 Q35 30 25 25"
            stroke="url(#pulmonaryArteryGrad)"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
            animate={animate ? { strokeDashoffset: [0, -10] } : undefined}
            transition={{ duration: 1, repeat: Infinity }}
            strokeDasharray="5 3"
          />
          <text x="15" y="22" fill="#6366F1" fontSize="6" fontWeight="500">
            PA
          </text>

          {/* Pulmonary Veins */}
          <motion.path
            d="M135 48 Q145 30 160 20 L175 20"
            stroke="url(#pulmonaryVeinGrad)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <text x="180" y="22" fill="#EC4899" fontSize="6" fontWeight="500">
            PV
          </text>

          {/* Aorta */}
          <motion.path
            d="M135 82 Q155 60 165 40 Q175 25 190 20"
            stroke="url(#arteryGradCirc)"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
            animate={animate ? { strokeDashoffset: [0, -10] } : undefined}
            transition={{ duration: 1, repeat: Infinity }}
            strokeDasharray="5 3"
          />
          <text x="192" y="15" fill="#DC2626" fontSize="7" fontWeight="600">
            Aorta
          </text>

          {/* Heartbeat animation - pulsing */}
          <motion.circle
            cx="100"
            cy="120"
            r="8"
            fill="#EF4444"
            opacity="0.5"
            animate={animate ? { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] } : undefined}
            transition={{ duration: 0.8, repeat: Infinity }}
          />

          {/* Labels */}
          <text x="100" y="250" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
            Human Heart (4-chambered)
          </text>
        </g>

        {/* Valve labels */}
        <g transform="translate(25, 45)">
          <circle cx="90" cy="78" r="3" fill="#FBBF24" />
          <text x="78" y="95" fill="#92400E" fontSize="5">
            Tricuspid
          </text>
          <circle cx="110" cy="78" r="3" fill="#FBBF24" />
          <text x="112" y="95" fill="#92400E" fontSize="5">
            Bicuspid
          </text>
        </g>
      </motion.g>

      {/* DOUBLE CIRCULATION DIAGRAM */}
      <motion.g
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <g transform="translate(20, 305)">
          <rect
            x="0"
            y="0"
            width="215"
            height="115"
            rx="12"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="107" y="18" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="700">
            Double Circulation
          </text>

          {/* Pulmonary Circuit */}
          <g transform="translate(15, 30)">
            <rect
              x="0"
              y="0"
              width="85"
              height="70"
              rx="8"
              fill="#EDE9FE"
              stroke="#8B5CF6"
              strokeWidth="1"
            />
            <text x="42" y="14" textAnchor="middle" fill="#6D28D9" fontSize="7" fontWeight="600">
              Pulmonary
            </text>
            <text x="42" y="25" textAnchor="middle" fill="#7C3AED" fontSize="6">
              Heart → Lungs
            </text>
            <text x="42" y="35" textAnchor="middle" fill="#7C3AED" fontSize="6">
              → Heart
            </text>
            {/* Small lung icon */}
            <ellipse cx="30" cy="52" rx="12" ry="10" fill="#F9A8D4" />
            <ellipse cx="54" cy="52" rx="12" ry="10" fill="#F9A8D4" />
            <text x="42" y="55" textAnchor="middle" fill="#BE185D" fontSize="5">
              O₂↔CO₂
            </text>
          </g>

          {/* Systemic Circuit */}
          <g transform="translate(115, 30)">
            <rect
              x="0"
              y="0"
              width="85"
              height="70"
              rx="8"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="1"
            />
            <text x="42" y="14" textAnchor="middle" fill="#B91C1C" fontSize="7" fontWeight="600">
              Systemic
            </text>
            <text x="42" y="25" textAnchor="middle" fill="#DC2626" fontSize="6">
              Heart → Body
            </text>
            <text x="42" y="35" textAnchor="middle" fill="#DC2626" fontSize="6">
              → Heart
            </text>
            {/* Body icon */}
            <circle cx="42" cy="52" r="10" fill="#FCA5A5" />
            <text x="42" y="55" textAnchor="middle" fill="#991B1B" fontSize="5">
              Body
            </text>
          </g>

          {/* Connection arrows */}
          <motion.path
            d="M102 65 L112 65"
            stroke="#DC2626"
            strokeWidth="2"
            markerEnd="url(#circArrow)"
            animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <defs>
            <marker id="circArrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill="#DC2626" />
            </marker>
          </defs>
        </g>
      </motion.g>

      {/* BLOOD COMPOSITION - Right Top */}
      <motion.g
        initial={animate ? { opacity: 0, x: 20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        <g transform="translate(260, 42)">
          <rect
            x="0"
            y="0"
            width="285"
            height="100"
            rx="12"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="142" y="18" textAnchor="middle" fill="#1E293B" fontSize="10" fontWeight="700">
            Blood Composition
          </text>

          {/* Plasma - 55% */}
          <g transform="translate(15, 28)">
            <rect
              x="0"
              y="0"
              width="120"
              height="60"
              rx="8"
              fill="#FEF3C7"
              stroke="#F59E0B"
              strokeWidth="1"
            />
            <text x="60" y="14" textAnchor="middle" fill="#B45309" fontSize="8" fontWeight="600">
              Plasma (55%)
            </text>
            <text x="60" y="26" textAnchor="middle" fill="#92400E" fontSize="6">
              Water: 90-92%
            </text>
            <text x="60" y="36" textAnchor="middle" fill="#92400E" fontSize="6">
              Proteins: 6-8%
            </text>
            <text x="60" y="46" textAnchor="middle" fill="#92400E" fontSize="5">
              Albumin, Globulin
            </text>
            <text x="60" y="55" textAnchor="middle" fill="#92400E" fontSize="5">
              Fibrinogen
            </text>
          </g>

          {/* Formed Elements - 45% */}
          <g transform="translate(150, 28)">
            <rect
              x="0"
              y="0"
              width="120"
              height="60"
              rx="8"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="1"
            />
            <text x="60" y="14" textAnchor="middle" fill="#B91C1C" fontSize="8" fontWeight="600">
              Formed Elements (45%)
            </text>

            {/* RBC */}
            <motion.ellipse
              cx="25"
              cy="38"
              rx="12"
              ry="6"
              fill="url(#rbcGrad)"
              animate={animate ? { scale: [1, 1.05, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <text x="25" y="52" textAnchor="middle" fill="#991B1B" fontSize="5">
              RBC
            </text>

            {/* WBC */}
            <motion.circle
              cx="60"
              cy="38"
              r="8"
              fill="#DBEAFE"
              stroke="#3B82F6"
              strokeWidth="1"
              animate={animate ? { scale: [1, 1.1, 1] } : undefined}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <text x="60" y="52" textAnchor="middle" fill="#1D4ED8" fontSize="5">
              WBC
            </text>

            {/* Platelets */}
            <motion.g
              animate={animate ? { y: [0, -2, 0] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <circle cx="92" cy="35" r="3" fill="#A78BFA" />
              <circle cx="98" cy="38" r="3" fill="#A78BFA" />
              <circle cx="95" cy="42" r="3" fill="#A78BFA" />
            </motion.g>
            <text x="95" y="52" textAnchor="middle" fill="#6D28D9" fontSize="5">
              Platelets
            </text>
          </g>
        </g>
      </motion.g>

      {/* CARDIAC CYCLE - Right Middle */}
      <motion.g
        initial={animate ? { opacity: 0, x: 20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <g transform="translate(260, 152)">
          <rect
            x="0"
            y="0"
            width="285"
            height="95"
            rx="12"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="142" y="18" textAnchor="middle" fill="#1E293B" fontSize="10" fontWeight="700">
            Cardiac Cycle (0.8 sec)
          </text>

          {/* Timeline bar */}
          <g transform="translate(15, 30)">
            <rect x="0" y="0" width="255" height="12" rx="6" fill="#E2E8F0" />

            {/* Atrial Systole */}
            <motion.rect
              x="0"
              y="0"
              width="32"
              height="12"
              rx="6"
              fill="#F59E0B"
              animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
            />
            <text x="16" y="9" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">
              0.1s
            </text>

            {/* Ventricular Systole */}
            <motion.rect
              x="32"
              y="0"
              width="96"
              height="12"
              rx="0"
              fill="#EF4444"
              animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }}
            />
            <text x="80" y="9" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">
              0.3s
            </text>

            {/* Joint Diastole */}
            <motion.rect
              x="128"
              y="0"
              width="127"
              height="12"
              rx="6"
              fill="#22C55E"
              animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
            />
            <text x="192" y="9" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">
              0.4s
            </text>
          </g>

          {/* Labels */}
          <g transform="translate(15, 48)">
            <rect x="0" y="0" width="10" height="10" rx="2" fill="#F59E0B" />
            <text x="15" y="8" fill="#64748B" fontSize="6">
              Atrial Systole
            </text>

            <rect x="85" y="0" width="10" height="10" rx="2" fill="#EF4444" />
            <text x="100" y="8" fill="#64748B" fontSize="6">
              Ventricular Systole
            </text>

            <rect x="185" y="0" width="10" height="10" rx="2" fill="#22C55E" />
            <text x="200" y="8" fill="#64748B" fontSize="6">
              Diastole
            </text>
          </g>

          {/* Key metrics */}
          <g transform="translate(15, 65)">
            <text x="0" y="8" fill="#1E293B" fontSize="7" fontWeight="600">
              Cardiac Output = HR × SV
            </text>
            <text x="0" y="20" fill="#64748B" fontSize="6">
              = 75 × 70mL = ~5 L/min
            </text>
            <text x="140" y="8" fill="#1E293B" fontSize="7" fontWeight="600">
              Stroke Volume: 70mL
            </text>
            <text x="140" y="20" fill="#64748B" fontSize="6">
              EDV (120) - ESV (50)
            </text>
          </g>
        </g>
      </motion.g>

      {/* ECG - Right Bottom */}
      <motion.g
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <g transform="translate(260, 257)">
          <rect
            x="0"
            y="0"
            width="285"
            height="90"
            rx="12"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="142" y="18" textAnchor="middle" fill="#1E293B" fontSize="10" fontWeight="700">
            Electrocardiogram (ECG)
          </text>

          {/* ECG Grid background */}
          <rect x="15" y="28" width="255" height="50" rx="4" fill="#ECFDF5" stroke="#D1FAE5" />

          {/* ECG Wave */}
          <motion.path
            d="M25 55 L45 55 Q50 55 52 48 L55 55 L60 55 L65 25 L70 70 L75 45 L80 55 L100 55 Q105 55 108 50 L112 55 L135 55 Q140 55 142 48 L145 55 L150 55 L155 25 L160 70 L165 45 L170 55 L190 55 Q195 55 198 50 L202 55 L225 55 Q230 55 232 48 L235 55 L240 55 L245 25 L250 70 L255 45 L260 55"
            stroke="url(#ecgGrad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={
              animate
                ? {
                    pathLength: [0, 1],
                    opacity: [0.5, 1],
                  }
                : undefined
            }
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Wave labels */}
          <text x="52" y="42" fill="#6D28D9" fontSize="6" fontWeight="bold">
            P
          </text>
          <text x="67" y="22" fill="#DC2626" fontSize="6" fontWeight="bold">
            QRS
          </text>
          <text x="108" y="45" fill="#0D9488" fontSize="6" fontWeight="bold">
            T
          </text>

          {/* Legend */}
          <text x="25" y="88" fill="#6D28D9" fontSize="6">
            P: Atrial depol.
          </text>
          <text x="95" y="88" fill="#DC2626" fontSize="6">
            QRS: Ventricular depol.
          </text>
          <text x="195" y="88" fill="#0D9488" fontSize="6">
            T: Ventricular repol.
          </text>
        </g>
      </motion.g>

      {/* BLOOD GROUPS & KEY FACTS - Bottom Right */}
      <motion.g
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.45, duration: 0.6 }}
      >
        <g transform="translate(260, 357)">
          <rect
            x="0"
            y="0"
            width="285"
            height="70"
            rx="12"
            fill="url(#circCardGrad)"
            filter="url(#circShadow)"
          />
          <text x="142" y="16" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="700">
            Blood Groups & Key Facts
          </text>

          {/* Blood group circles */}
          <g transform="translate(15, 25)">
            <motion.circle
              cx="20"
              cy="20"
              r="15"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="2"
              animate={animate ? { scale: [1, 1.05, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <text x="20" y="24" textAnchor="middle" fill="#B91C1C" fontSize="10" fontWeight="bold">
              A
            </text>

            <motion.circle
              cx="60"
              cy="20"
              r="15"
              fill="#DBEAFE"
              stroke="#3B82F6"
              strokeWidth="2"
              animate={animate ? { scale: [1, 1.05, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <text x="60" y="24" textAnchor="middle" fill="#1D4ED8" fontSize="10" fontWeight="bold">
              B
            </text>

            <motion.circle
              cx="100"
              cy="20"
              r="15"
              fill="#F3E8FF"
              stroke="#8B5CF6"
              strokeWidth="2"
              animate={animate ? { scale: [1, 1.05, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
            <text x="100" y="24" textAnchor="middle" fill="#6D28D9" fontSize="9" fontWeight="bold">
              AB
            </text>

            <motion.circle
              cx="140"
              cy="20"
              r="15"
              fill="#F1F5F9"
              stroke="#64748B"
              strokeWidth="2"
              animate={animate ? { scale: [1, 1.05, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            />
            <text x="140" y="24" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">
              O
            </text>
          </g>

          {/* Key facts */}
          <g transform="translate(175, 25)">
            <text x="0" y="10" fill="#22C55E" fontSize="7" fontWeight="600">
              ● Universal Donor: O
            </text>
            <text x="0" y="22" fill="#DC2626" fontSize="7" fontWeight="600">
              ● Universal Recipient: AB
            </text>
            <text x="0" y="34" fill="#3B82F6" fontSize="7" fontWeight="600">
              ● Pacemaker: SA Node
            </text>
          </g>
        </g>
      </motion.g>

      {/* SA Node indicator on heart */}
      <motion.g
        animate={animate ? { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <circle cx="108" cy="98" r="6" fill="#22C55E" filter="url(#vesselGlow)" />
        <text x="120" y="95" fill="#166534" fontSize="5" fontWeight="bold">
          SA
        </text>
      </motion.g>

      {/* AV Node indicator */}
      <motion.g
        animate={animate ? { scale: [1, 1.2, 1], opacity: [1, 0.6, 1] } : undefined}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      >
        <circle cx="118" cy="120" r="5" fill="#FBBF24" />
        <text x="128" y="118" fill="#92400E" fontSize="5" fontWeight="bold">
          AV
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
  PhotosynthesisVsRespirationIllustration,
  MolecularBiologyIllustration,
  PlantKingdomIllustration,
  EvolutionIllustration,
  MicrobesIllustration,
  NEET180StrategyIllustration,
  DropperStrategyIllustration,
  Class11FoundationIllustration,
  Class12BoardBalanceIllustration,
  FreeResourcesIllustration,
  ResultsAnalysisIllustration,
  DelhiNCRGuideIllustration,
  LaxmiNagarIllustration,
  NoidaIllustration,
  DwarkaIllustration,
  SmallVsLargeBatchIllustration,
  TwoYearProgramIllustration,
  SpecializedVsMassIllustration,
  BiomoleculesIllustration,
  CellDivisionIllustration,
  HumanDigestionIllustration,
  RespirationIllustration,
  CirculationIllustration,
}
