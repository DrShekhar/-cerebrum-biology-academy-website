'use client'

// Modern flat illustration style similar to WhatsApp Business Platform
// Colors: Soft pastels matching the site theme

interface IllustrationProps {
  className?: string
  animate?: boolean
}

// Student studying with laptop - perfect for online learning pages
export function StudentStudyingIllustration({ className = '', animate = true }: IllustrationProps) {
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
      {/* Background shapes */}
      <ellipse cx="200" cy="260" rx="150" ry="20" fill="#E8F4FC" />
      <circle cx="320" cy="80" r="40" fill="#F0FDFA" />
      <circle cx="80" cy="120" r="30" fill="#EDE9FE" />

      {/* Desk */}
      <rect x="80" y="200" width="240" height="10" rx="5" fill="#6366F1" opacity="0.2" />
      <rect x="100" y="210" width="8" height="50" fill="#6366F1" opacity="0.3" />
      <rect x="292" y="210" width="8" height="50" fill="#6366F1" opacity="0.3" />

      {/* Laptop */}
      <rect x="130" y="160" width="140" height="90" rx="8" fill="#1E293B" />
      <rect x="138" y="168" width="124" height="74" rx="4" fill="#3B82F6" />
      <rect x="138" y="168" width="124" height="74" rx="4" fill="url(#screenGradient)" />
      <rect x="100" y="250" width="200" height="8" rx="4" fill="#334155" />

      {/* Screen content - code/learning */}
      <rect x="148" y="180" width="60" height="6" rx="2" fill="#FCD34D" opacity="0.8" />
      <rect x="148" y="192" width="80" height="4" rx="2" fill="#FFFFFF" opacity="0.6" />
      <rect x="148" y="202" width="50" height="4" rx="2" fill="#14B8A6" opacity="0.8" />
      <rect x="148" y="212" width="70" height="4" rx="2" fill="#FFFFFF" opacity="0.6" />
      <rect x="148" y="222" width="40" height="4" rx="2" fill="#A78BFA" opacity="0.8" />

      {/* Student - sitting */}
      {/* Body */}
      <ellipse cx="200" cy="140" rx="35" ry="40" fill="#8B5CF6" />
      {/* Head */}
      <circle cx="200" cy="85" r="30" fill="#FBBF24" opacity="0.9" />
      {/* Face */}
      <circle cx="190" cy="80" r="3" fill="#1E293B" />
      <circle cx="210" cy="80" r="3" fill="#1E293B" />
      <path d="M195 92 Q200 98 205 92" stroke="#1E293B" strokeWidth="2" fill="none" />
      {/* Hair */}
      <path d="M170 75 Q175 55 200 50 Q225 55 230 75" fill="#1E293B" />
      {/* Arms */}
      <ellipse cx="150" cy="170" rx="15" ry="25" fill="#FBBF24" opacity="0.9" />
      <ellipse cx="250" cy="170" rx="15" ry="25" fill="#FBBF24" opacity="0.9" />

      {/* Books stack */}
      <rect x="300" y="180" width="50" height="12" rx="2" fill="#14B8A6" />
      <rect x="305" y="168" width="45" height="12" rx="2" fill="#6366F1" />
      <rect x="302" y="156" width="48" height="12" rx="2" fill="#F97316" />

      {/* Floating elements */}
      <motion.g
      >
        <circle cx="50" cy="80" r="8" fill="#14B8A6" opacity="0.6" />
        <circle cx="350" cy="150" r="6" fill="#8B5CF6" opacity="0.6" />
        <circle cx="70" cy="200" r="5" fill="#F97316" opacity="0.5" />
      </motion.g>

      <defs>
        <linearGradient id="screenGradient" x1="138" y1="168" x2="262" y2="242">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </Wrapper>
  )
}

// Teacher with whiteboard - for teaching/faculty pages
export function TeacherIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
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
      <rect x="50" y="30" width="300" height="200" rx="12" fill="#F0FDFA" />

      {/* Whiteboard */}
      <rect
        x="80"
        y="50"
        width="200"
        height="140"
        rx="8"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="2"
      />

      {/* Whiteboard content - Biology diagram */}
      <circle cx="140" cy="100" r="25" stroke="#14B8A6" strokeWidth="2" fill="none" />
      <circle cx="140" cy="100" r="8" fill="#14B8A6" opacity="0.3" />
      <text x="130" y="104" fontSize="8" fill="#14B8A6" fontWeight="bold">
        Cell
      </text>
      <line
        x1="165"
        y1="100"
        x2="200"
        y2="100"
        stroke="#6366F1"
        strokeWidth="2"
        strokeDasharray="4"
      />
      <rect x="200" y="85" width="60" height="30" rx="4" fill="#EDE9FE" />
      <text x="210" y="105" fontSize="8" fill="#6366F1">
        Nucleus
      </text>

      {/* DNA helix hint */}
      <path
        d="M100 150 Q110 140 120 150 Q130 160 140 150"
        stroke="#F97316"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M100 160 Q110 150 120 160 Q130 170 140 160"
        stroke="#F97316"
        strokeWidth="2"
        fill="none"
      />

      {/* Teacher */}
      {/* Body */}
      <rect x="300" y="120" width="60" height="80" rx="20" fill="#6366F1" />
      {/* Head */}
      <circle cx="330" cy="90" r="28" fill="#FBBF24" opacity="0.9" />
      {/* Face */}
      <circle cx="320" cy="85" r="3" fill="#1E293B" />
      <circle cx="340" cy="85" r="3" fill="#1E293B" />
      <path d="M325 100 Q330 105 335 100" stroke="#1E293B" strokeWidth="2" fill="none" />
      {/* Glasses */}
      <circle cx="320" cy="85" r="8" stroke="#1E293B" strokeWidth="1.5" fill="none" />
      <circle cx="340" cy="85" r="8" stroke="#1E293B" strokeWidth="1.5" fill="none" />
      <line x1="328" y1="85" x2="332" y2="85" stroke="#1E293B" strokeWidth="1.5" />
      {/* Hair */}
      <path d="M302 80 Q310 55 330 50 Q350 55 358 80" fill="#1E293B" />
      {/* Pointing arm */}
      <ellipse cx="280" cy="140" rx="20" ry="10" fill="#FBBF24" opacity="0.9" />
      {/* Pointer */}
      <line x1="260" y1="140" x2="220" y2="120" stroke="#1E293B" strokeWidth="3" />

      {/* Floor */}
      <ellipse cx="200" cy="270" rx="160" ry="15" fill="#E8F4FC" />

      {/* Floating elements */}
      <motion.g
      >
        <path d="M60 60 L70 50 L80 60 L70 70 Z" fill="#14B8A6" opacity="0.5" />
      </motion.g>
      <motion.circle
        cx="350"
        cy="40"
        r="8"
        fill="#F97316"
        opacity="0.5"
      />
    </Wrapper>
  )
}

// Books stack - for NCERT/reference book pages
export function BookStackIllustration({ className = '', animate = true }: IllustrationProps) {
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
      viewBox="0 0 300 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Shadow */}
      <ellipse cx="150" cy="230" rx="100" ry="15" fill="#E8F4FC" />

      {/* Book 1 - Bottom (NCERT Green) */}
      <motion.g
      >
        <rect x="60" y="170" width="180" height="30" rx="4" fill="#14B8A6" />
        <rect x="65" y="175" width="5" height="20" fill="#0D9488" />
        <text x="90" y="190" fontSize="10" fill="#FFFFFF" fontWeight="bold">
          NCERT Biology
        </text>
      </motion.g>

      {/* Book 2 - Blue */}
      <motion.g
      >
        <rect x="70" y="140" width="170" height="28" rx="4" fill="#3B82F6" />
        <rect x="75" y="145" width="5" height="18" fill="#2563EB" />
        <text x="95" y="158" fontSize="9" fill="#FFFFFF" fontWeight="bold">
          Class 11 Biology
        </text>
      </motion.g>

      {/* Book 3 - Purple */}
      <motion.g
      >
        <rect x="65" y="112" width="175" height="26" rx="4" fill="#8B5CF6" />
        <rect x="70" y="117" width="5" height="16" fill="#7C3AED" />
        <text x="90" y="129" fontSize="9" fill="#FFFFFF" fontWeight="bold">
          Class 12 Biology
        </text>
      </motion.g>

      {/* Book 4 - Orange (Fingertips) */}
      <motion.g
      >
        <rect x="75" y="86" width="165" height="24" rx="4" fill="#F97316" />
        <rect x="80" y="90" width="5" height="16" fill="#EA580C" />
        <text x="100" y="102" fontSize="8" fill="#FFFFFF" fontWeight="bold">
          NCERT Fingertips
        </text>
      </motion.g>

      {/* Book 5 - Top (Red) */}
      <motion.g
      >
        <rect x="80" y="62" width="155" height="22" rx="4" fill="#EF4444" />
        <rect x="85" y="66" width="5" height="14" fill="#DC2626" />
        <text x="105" y="77" fontSize="8" fill="#FFFFFF" fontWeight="bold">
          Trueman Biology
        </text>
      </motion.g>

      {/* Decorative elements */}
      <motion.circle
        cx="250"
        cy="100"
        r="20"
        fill="#F0FDFA"
      />
      <motion.circle
        cx="50"
        cy="130"
        r="15"
        fill="#EDE9FE"
      />

      {/* Bookmark */}
      <path d="M200 62 L200 40 L210 50 L220 40 L220 62" fill="#FCD34D" />

      {/* Reading glasses */}
      <ellipse cx="270" cy="180" rx="20" ry="10" stroke="#1E293B" strokeWidth="2" fill="none" />
      <ellipse cx="270" cy="180" rx="12" ry="6" fill="#BFDBFE" opacity="0.5" />
      <line x1="250" y1="180" x2="230" y2="175" stroke="#1E293B" strokeWidth="2" />
    </Wrapper>
  )
}

// Location/Map illustration - for "near me" pages
export function LocationIllustration({ className = '', animate = true }: IllustrationProps) {
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
      viewBox="0 0 350 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Map background */}
      <rect x="30" y="40" width="290" height="180" rx="20" fill="#E8F4FC" />

      {/* Roads */}
      <line x1="30" y1="130" x2="320" y2="130" stroke="#CBD5E1" strokeWidth="8" />
      <line x1="175" y1="40" x2="175" y2="220" stroke="#CBD5E1" strokeWidth="8" />

      {/* Buildings/Areas */}
      <rect
        x="60"
        y="70"
        width="60"
        height="40"
        rx="6"
        fill="#F0FDFA"
        stroke="#14B8A6"
        strokeWidth="2"
      />
      <rect
        x="230"
        y="70"
        width="60"
        height="40"
        rx="6"
        fill="#EDE9FE"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      <rect
        x="60"
        y="155"
        width="60"
        height="40"
        rx="6"
        fill="#FEF3C7"
        stroke="#F97316"
        strokeWidth="2"
      />
      <rect
        x="230"
        y="155"
        width="60"
        height="40"
        rx="6"
        fill="#DBEAFE"
        stroke="#3B82F6"
        strokeWidth="2"
      />

      {/* Location labels */}
      <text x="70" y="95" fontSize="8" fill="#14B8A6" fontWeight="bold">
        Rohini
      </text>
      <text x="235" y="95" fontSize="8" fill="#8B5CF6" fontWeight="bold">
        Gurugram
      </text>
      <text x="65" y="180" fontSize="8" fill="#F97316" fontWeight="bold">
        South Ex
      </text>
      <text x="232" y="180" fontSize="8" fill="#3B82F6" fontWeight="bold">
        Faridabad
      </text>

      {/* Location pins */}
      <motion.g
      >
        <path
          d="M90 55 C90 40 75 35 75 50 C75 60 90 70 90 70 C90 70 105 60 105 50 C105 35 90 40 90 55"
          fill="#14B8A6"
        />
        <circle cx="90" cy="50" r="5" fill="#FFFFFF" />
      </motion.g>

      <motion.g
      >
        <path
          d="M260 55 C260 40 245 35 245 50 C245 60 260 70 260 70 C260 70 275 60 275 50 C275 35 260 40 260 55"
          fill="#8B5CF6"
        />
        <circle cx="260" cy="50" r="5" fill="#FFFFFF" />
      </motion.g>

      <motion.g
      >
        <path
          d="M90 140 C90 125 75 120 75 135 C75 145 90 155 90 155 C90 155 105 145 105 135 C105 120 90 125 90 140"
          fill="#F97316"
        />
        <circle cx="90" cy="135" r="5" fill="#FFFFFF" />
      </motion.g>

      <motion.g
      >
        <path
          d="M260 140 C260 125 245 120 245 135 C245 145 260 155 260 155 C260 155 275 145 275 135 C275 120 260 125 260 140"
          fill="#3B82F6"
        />
        <circle cx="260" cy="135" r="5" fill="#FFFFFF" />
      </motion.g>

      {/* Central marker - main location */}
      <motion.g
      >
        <circle cx="175" cy="130" r="25" fill="#EF4444" opacity="0.2" />
        <circle cx="175" cy="130" r="15" fill="#EF4444" opacity="0.4" />
        <circle cx="175" cy="130" r="8" fill="#EF4444" />
        <text x="162" y="134" fontSize="6" fill="#FFFFFF" fontWeight="bold">
          YOU
        </text>
      </motion.g>

      {/* Compass */}
      <g transform="translate(300, 230)">
        <circle cx="0" cy="0" r="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <path d="M0 -15 L5 5 L0 0 L-5 5 Z" fill="#EF4444" />
        <path d="M0 15 L5 -5 L0 0 L-5 -5 Z" fill="#1E293B" />
        <text x="-3" y="-5" fontSize="6" fill="#1E293B" fontWeight="bold">
          N
        </text>
      </g>

      {/* Distance lines */}
      <line
        x1="175"
        y1="130"
        x2="90"
        y2="55"
        stroke="#14B8A6"
        strokeWidth="1"
        strokeDasharray="4"
        opacity="0.5"
      />
      <line
        x1="175"
        y1="130"
        x2="260"
        y2="55"
        stroke="#8B5CF6"
        strokeWidth="1"
        strokeDasharray="4"
        opacity="0.5"
      />
    </Wrapper>
  )
}

// Online class illustration - split screen teacher/student
export function OnlineClassIllustration({ className = '', animate = true }: IllustrationProps) {
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
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapperProps}
    >
      {/* Left side - Lavender background */}
      <rect x="0" y="0" width="200" height="280" fill="#EDE9FE" />

      {/* Right side - Mint background */}
      <rect x="200" y="0" width="200" height="280" fill="#D1FAE5" />

      {/* Left side - Teacher with computer */}
      <rect x="30" y="160" width="140" height="90" rx="8" fill="#6366F1" opacity="0.2" />
      <rect x="50" y="100" width="100" height="70" rx="6" fill="#1E293B" />
      <rect x="55" y="105" width="90" height="55" rx="4" fill="#3B82F6" />

      {/* Teacher avatar on screen */}
      <circle cx="100" cy="130" r="18" fill="#FBBF24" />
      <circle cx="94" cy="126" r="2" fill="#1E293B" />
      <circle cx="106" cy="126" r="2" fill="#1E293B" />
      <path d="M96 136 Q100 140 104 136" stroke="#1E293B" strokeWidth="1.5" fill="none" />

      {/* Speech bubble from teacher */}
      <motion.g
      >
        <rect x="130" y="80" width="50" height="30" rx="8" fill="#FFFFFF" />
        <polygon points="135,110 145,110 140,120" fill="#FFFFFF" />
        <text x="140" y="92" fontSize="6" fill="#6366F1" textAnchor="middle">
          Cell Division
        </text>
        <text x="140" y="102" fontSize="6" fill="#6366F1" textAnchor="middle">
          is...
        </text>
      </motion.g>

      {/* Person at computer */}
      <ellipse cx="100" cy="200" rx="25" ry="30" fill="#8B5CF6" />
      <circle cx="100" cy="165" r="20" fill="#FBBF24" opacity="0.9" />
      <circle cx="94" cy="162" r="2" fill="#1E293B" />
      <circle cx="106" cy="162" r="2" fill="#1E293B" />

      {/* Right side - Student with phone/tablet */}
      <rect x="230" y="130" width="80" height="120" rx="10" fill="#14B8A6" opacity="0.2" />

      {/* Student */}
      <ellipse cx="300" cy="200" rx="25" ry="30" fill="#14B8A6" />
      <circle cx="300" cy="165" r="20" fill="#FBBF24" opacity="0.9" />
      <circle cx="294" cy="162" r="2" fill="#1E293B" />
      <circle cx="306" cy="162" r="2" fill="#1E293B" />
      <path d="M296 172 Q300 176 304 172" stroke="#1E293B" strokeWidth="1.5" fill="none" />

      {/* Phone in hand */}
      <rect x="330" y="180" width="40" height="60" rx="6" fill="#1E293B" />
      <rect x="334" y="185" width="32" height="45" rx="3" fill="#3B82F6" />

      {/* Speech bubble from student */}
      <motion.g
      >
        <ellipse cx="250" cy="100" rx="30" ry="20" fill="#FFFFFF" />
        <polygon points="265,118 275,118 270,128" fill="#FFFFFF" />
        <text x="250" y="98" fontSize="6" fill="#14B8A6" textAnchor="middle">
          Got it!
        </text>
        <text x="250" y="108" fontSize="10" textAnchor="middle"></text>
      </motion.g>

      {/* Connection line */}
      <motion.path
        d="M160 140 Q200 120 240 140"
        stroke="#F97316"
        strokeWidth="2"
        strokeDasharray="5"
        fill="none"
      />

      {/* Decorative elements */}
      <circle cx="30" cy="50" r="15" fill="#8B5CF6" opacity="0.3" />
      <circle cx="370" cy="50" r="15" fill="#14B8A6" opacity="0.3" />
      <rect x="180" y="250" width="40" height="4" rx="2" fill="#6366F1" opacity="0.5" />
    </Wrapper>
  )
}

export default {
  StudentStudyingIllustration,
  TeacherIllustration,
  BookStackIllustration,
  LocationIllustration,
  OnlineClassIllustration,
}
