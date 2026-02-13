'use client'

import type { IllustrationProps } from './shared'

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
      >
        <rect x="0" y="155" width="80" height="25" rx="4" fill="#3B82F6" />
        <rect x="5" y="160" width="15" height="12" rx="2" fill="#DBEAFE" />
        <rect x="25" y="160" width="15" height="12" rx="2" fill="#DBEAFE" />
        <rect x="45" y="160" width="15" height="12" rx="2" fill="#DBEAFE" />
        <rect x="65" y="160" width="10" height="12" rx="2" fill="#DBEAFE" />
      </motion.g>

      {/* Laxmi Nagar Metro Station */}
      <motion.g
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
      >
        <circle cx="285" cy="70" r="15" fill="#EF4444" />
        <path d="M285 55 L285 40" stroke="#EF4444" strokeWidth="3" />
        <circle cx="285" cy="70" r="6" fill="#FFF" />
      </motion.g>

      {/* Title banner */}
      <motion.g
      >
        <rect x="80" y="250" width="240" height="35" rx="6" fill="#1F2937" />
        <text x="200" y="272" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="600">
          NEET Coaching Laxmi Nagar
        </text>
      </motion.g>

      {/* Nearby areas markers */}
      <motion.g
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
      >
        <circle cx="130" y="235" r="6" fill="#F59E0B" />
        <rect x="127" y="241" width="6" height="12" rx="2" fill="#F59E0B" />

        <circle cx="145" cy="235" r="6" fill="#3B82F6" />
        <rect x="142" y="241" width="6" height="12" rx="2" fill="#3B82F6" />
      </motion.g>
    </Wrapper>
  )
}
