'use client'

import type { IllustrationProps } from './shared'

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
      >
        <rect x="0" y="230" width="400" height="40" fill="#374151" />
        <rect x="0" y="248" width="400" height="4" fill="#FCD34D" strokeDasharray="20 10" />
      </motion.g>

      {/* Sector buildings with labels */}
      {/* Sector 62 */}
      <motion.g
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
      >
        <motion.circle
          cx="240"
          cy="55"
          r="18"
          fill="#EF4444"
        />
        <path d="M240 37 L240 20" stroke="#EF4444" strokeWidth="3" />
        <circle cx="240" cy="55" r="7" fill="#FFF" />
      </motion.g>

      {/* Metro connection */}
      <motion.g
      >
        <rect x="0" y="265" width="400" height="8" fill="#60A5FA" />
        <text x="200" y="290" textAnchor="middle" fill="#374151" fontSize="9">
          Aqua Line Metro
        </text>
      </motion.g>

      {/* Title */}
      <motion.g
      >
        <rect x="120" y="15" width="160" height="30" rx="6" fill="#1F2937" />
        <text x="200" y="35" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="600">
          NEET Coaching Noida
        </text>
      </motion.g>
    </Wrapper>
  )
}
