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

// 21. Photosynthesis vs Respiration - Comparison illustration
export function PhotosynthesisVsRespirationIllustration({
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
      {/* Background split */}
      <rect x="10" y="10" width="185" height="280" rx="15" fill="#DCFCE7" />
      <rect x="205" y="10" width="185" height="280" rx="15" fill="#FEE2E2" />

      {/* Title */}
      <text x="200" y="35" fontSize="12" fill="#1E293B" textAnchor="middle" fontWeight="bold">
        Photosynthesis vs Respiration
      </text>

      {/* Photosynthesis side */}
      <text x="102" y="55" fontSize="10" fill="#15803D" textAnchor="middle" fontWeight="bold">
        PHOTOSYNTHESIS
      </text>

      {/* Sun */}
      <motion.g
        animate={animate ? { rotate: [0, 360] } : undefined}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '70px 90px' }}
      >
        <circle cx="70" cy="90" r="15" fill="#FCD34D" />
        <line x1="70" y1="68" x2="70" y2="60" stroke="#F59E0B" strokeWidth="2" />
        <line x1="70" y1="112" x2="70" y2="120" stroke="#F59E0B" strokeWidth="2" />
        <line x1="48" y1="90" x2="40" y2="90" stroke="#F59E0B" strokeWidth="2" />
        <line x1="92" y1="90" x2="100" y2="90" stroke="#F59E0B" strokeWidth="2" />
      </motion.g>
      <text x="70" y="135" fontSize="6" fill="#B45309" textAnchor="middle">
        Light Energy
      </text>

      {/* Leaf */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ellipse cx="130" cy="100" rx="25" ry="35" fill="#22C55E" />
        <line x1="130" y1="65" x2="130" y2="135" stroke="#15803D" strokeWidth="2" />
        <line x1="115" y1="85" x2="130" y2="100" stroke="#15803D" strokeWidth="1" />
        <line x1="145" y1="85" x2="130" y2="100" stroke="#15803D" strokeWidth="1" />
        <line x1="115" y1="115" x2="130" y2="100" stroke="#15803D" strokeWidth="1" />
        <line x1="145" y1="115" x2="130" y2="100" stroke="#15803D" strokeWidth="1" />
      </motion.g>

      {/* Photosynthesis equation */}
      <rect
        x="25"
        y="150"
        width="160"
        height="60"
        rx="8"
        fill="#FFFFFF"
        stroke="#22C55E"
        strokeWidth="2"
      />
      <text x="105" y="168" fontSize="7" fill="#15803D" textAnchor="middle" fontWeight="bold">
        6CO₂ + 6H₂O + Light
      </text>
      <text x="105" y="182" fontSize="7" fill="#15803D" textAnchor="middle">
        ↓ Chloroplast
      </text>
      <text x="105" y="196" fontSize="7" fill="#15803D" textAnchor="middle" fontWeight="bold">
        C₆H₁₂O₆ + 6O₂
      </text>

      {/* O2 bubbles going up */}
      <motion.g
        animate={animate ? { y: [0, -15, 0], opacity: [0.3, 1, 0.3] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="50" cy="230" r="5" fill="#93C5FD" />
        <circle cx="70" cy="240" r="4" fill="#93C5FD" />
        <circle cx="60" cy="250" r="3" fill="#93C5FD" />
        <text x="60" y="270" fontSize="6" fill="#3B82F6" textAnchor="middle">
          O₂ Released
        </text>
      </motion.g>

      {/* Respiration side */}
      <text x="297" y="55" fontSize="10" fill="#DC2626" textAnchor="middle" fontWeight="bold">
        RESPIRATION
      </text>

      {/* Mitochondria */}
      <motion.g
        animate={animate ? { scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ellipse
          cx="297"
          cy="100"
          rx="40"
          ry="25"
          fill="#FCA5A5"
          stroke="#DC2626"
          strokeWidth="2"
        />
        <path
          d="M267 100 Q277 85 287 100 Q297 115 307 100 Q317 85 327 100"
          stroke="#DC2626"
          strokeWidth="2"
          fill="none"
        />
      </motion.g>
      <text x="297" y="135" fontSize="6" fill="#DC2626" textAnchor="middle">
        Mitochondria
      </text>

      {/* Respiration equation */}
      <rect
        x="220"
        y="150"
        width="160"
        height="60"
        rx="8"
        fill="#FFFFFF"
        stroke="#EF4444"
        strokeWidth="2"
      />
      <text x="300" y="168" fontSize="7" fill="#DC2626" textAnchor="middle" fontWeight="bold">
        C₆H₁₂O₆ + 6O₂
      </text>
      <text x="300" y="182" fontSize="7" fill="#DC2626" textAnchor="middle">
        ↓ Mitochondria
      </text>
      <text x="300" y="196" fontSize="7" fill="#DC2626" textAnchor="middle" fontWeight="bold">
        6CO₂ + 6H₂O + ATP
      </text>

      {/* Energy/ATP */}
      <motion.g
        animate={animate ? { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <circle cx="330" cy="240" r="18" fill="#FBBF24" />
        <text x="330" y="237" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          ATP
        </text>
        <text x="330" y="248" fontSize="5" fill="#FFFFFF" textAnchor="middle">
          Energy
        </text>
      </motion.g>
      <text x="330" y="270" fontSize="6" fill="#B45309" textAnchor="middle">
        38 ATP/Glucose
      </text>

      {/* VS circle in middle */}
      <circle cx="200" cy="100" r="20" fill="#6366F1" />
      <text x="200" y="105" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
        VS
      </text>

      {/* Arrows showing cycle */}
      <motion.path
        d="M170 220 Q200 200 230 220"
        stroke="#8B5CF6"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
        animate={animate ? { strokeDashoffset: [0, 10] } : undefined}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
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
      <rect x="10" y="10" width="380" height="280" rx="20" fill="#EFF6FF" />

      {/* Title */}
      <text x="200" y="35" fontSize="14" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
        Score 180+ in NEET Biology
      </text>

      {/* Target circle */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="100" cy="140" r="55" fill="#FFFFFF" stroke="#DC2626" strokeWidth="8" />
        <circle cx="100" cy="140" r="40" fill="#FFFFFF" stroke="#F97316" strokeWidth="6" />
        <circle cx="100" cy="140" r="25" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="4" />
        <circle cx="100" cy="140" r="12" fill="#22C55E" />
      </motion.g>

      {/* Arrow hitting target */}
      <motion.g
        animate={animate ? { x: [-20, 0], opacity: [0, 1] } : undefined}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <line x1="30" y1="140" x2="88" y2="140" stroke="#1E293B" strokeWidth="3" />
        <polygon points="88,140 75,135 75,145" fill="#1E293B" />
      </motion.g>

      {/* 180+ Badge */}
      <motion.g
        animate={animate ? { y: [-3, 3, -3] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <rect x="55" y="210" width="90" height="40" rx="8" fill="#22C55E" />
        <text x="100" y="227" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          180+
        </text>
        <text x="100" y="242" fontSize="8" fill="#FFFFFF" textAnchor="middle">
          Target Score
        </text>
      </motion.g>

      {/* Strategy steps */}
      <rect
        x="180"
        y="60"
        width="200"
        height="195"
        rx="12"
        fill="#FFFFFF"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      <text x="280" y="85" fontSize="10" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
        6-Month Strategy
      </text>

      {/* Timeline */}
      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="195" y="100" width="170" height="30" rx="6" fill="#DBEAFE" />
        <text x="280" y="112" fontSize="7" fill="#1D4ED8" textAnchor="middle" fontWeight="bold">
          Months 1-2: NCERT Foundation
        </text>
        <text x="280" y="124" fontSize="6" fill="#6B7280" textAnchor="middle">
          Complete Class 11 & 12 NCERT
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <rect x="195" y="135" width="170" height="30" rx="6" fill="#FEF3C7" />
        <text x="280" y="147" fontSize="7" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Months 3-4: Practice MCQs
        </text>
        <text x="280" y="159" fontSize="6" fill="#6B7280" textAnchor="middle">
          5000+ topic-wise questions
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <rect x="195" y="170" width="170" height="30" rx="6" fill="#DCFCE7" />
        <text x="280" y="182" fontSize="7" fill="#16A34A" textAnchor="middle" fontWeight="bold">
          Months 5-6: Mock Tests
        </text>
        <text x="280" y="194" fontSize="6" fill="#6B7280" textAnchor="middle">
          Full syllabus tests weekly
        </text>
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      >
        <rect x="195" y="205" width="170" height="30" rx="6" fill="#FCE7F3" />
        <text x="280" y="217" fontSize="7" fill="#DB2777" textAnchor="middle" fontWeight="bold">
          Final Week: Revision
        </text>
        <text x="280" y="229" fontSize="6" fill="#6B7280" textAnchor="middle">
          Focus on weak areas only
        </text>
      </motion.g>

      {/* Success indicator */}
      <motion.g
        animate={animate ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <circle cx="355" cy="45" r="15" fill="#22C55E" />
        <path d="M347 45 L352 50 L363 39" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      </motion.g>
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
}
