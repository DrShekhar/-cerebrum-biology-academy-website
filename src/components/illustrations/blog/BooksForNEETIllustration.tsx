'use client'

import { motion } from 'framer-motion'
import type { IllustrationProps } from './shared'

export function BooksForNEETIllustration({ className = '', animate = true }: IllustrationProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {}

  // Book recommendations data
  const biologyBooks = [
    { name: 'NCERT Class 11 & 12', rating: 5, priority: 'ESSENTIAL', color: '#14B8A6' },
    { name: 'MTG Fingertips', rating: 4.5, priority: 'HIGH', color: '#2DD4BF' },
    { name: 'Trueman Biology', rating: 4, priority: 'MEDIUM', color: '#5EEAD4' },
    { name: 'Dinesh Objective', rating: 3.5, priority: 'OPTIONAL', color: '#99F6E4' },
  ]

  // Reading phases
  const readingPhases = [
    { phase: 'Phase 1', focus: 'NCERT Only', months: 'Month 1-3', progress: 100 },
    { phase: 'Phase 2', focus: 'Reference Books', months: 'Month 4-6', progress: 75 },
    { phase: 'Phase 3', focus: 'PYQ Practice', months: 'Month 7-10', progress: 50 },
    { phase: 'Phase 4', focus: 'Revision', months: 'Month 11-12', progress: 25 },
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
        <linearGradient id="booksBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0FDFA" />
          <stop offset="50%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        {/* Card shadow */}
        <filter id="booksCardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#14B8A6" floodOpacity="0.15" />
        </filter>
        {/* Book spine gradient */}
        <linearGradient id="bookSpineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
        {/* Gold gradient for ratings */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#booksBgGrad)" rx="16" />

      {/* Title Section */}
      <motion.g
        initial={animate ? { opacity: 0, y: -20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' as const }}
      >
        <rect
          x="200"
          y="15"
          width="300"
          height="45"
          rx="22"
          fill="#14B8A6"
          filter="url(#booksCardShadow)"
        />
        <text x="350" y="32" fontSize="10" fill="#CCFBF1" textAnchor="middle">
          NEET 2026 Biology
        </text>
        <text x="350" y="48" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📚 Best Books & Reading Strategy
        </text>
      </motion.g>

      {/* Left Section - Book Stack Visualization */}
      <motion.g
        initial={animate ? { opacity: 0, x: -30 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' as const }}
      >
        {/* Bookshelf background */}
        <rect
          x="20"
          y="75"
          width="220"
          height="280"
          rx="12"
          fill="#FFFFFF"
          filter="url(#booksCardShadow)"
        />
        <rect x="20" y="75" width="220" height="35" rx="12" fill="#0D9488" />
        <text x="130" y="98" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📖 Biology Book Stack
        </text>

        {/* NCERT Books - Essential */}
        <motion.g
          animate={animate ? { y: [0, -3, 0] } : undefined}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Book 1 - NCERT Class 11 */}
          <rect x="40" y="125" width="180" height="35" rx="4" fill="#14B8A6" />
          <rect x="40" y="125" width="12" height="35" fill="url(#bookSpineGrad)" />
          <text x="135" y="140" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            NCERT Biology Class 11
          </text>
          <text x="135" y="152" fontSize="7" fill="#CCFBF1" textAnchor="middle">
            Foundation & Diversity
          </text>
          <rect x="190" y="130" width="25" height="12" rx="2" fill="#FCD34D" />
          <text x="202" y="139" fontSize="6" fill="#78350F" textAnchor="middle" fontWeight="bold">
            ⭐ 5.0
          </text>

          {/* Book 2 - NCERT Class 12 */}
          <rect x="45" y="165" width="175" height="35" rx="4" fill="#0D9488" />
          <rect x="45" y="165" width="12" height="35" fill="#0F766E" />
          <text x="138" y="180" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            NCERT Biology Class 12
          </text>
          <text x="138" y="192" fontSize="7" fill="#99F6E4" textAnchor="middle">
            Genetics & Human Bio
          </text>
          <rect x="185" y="170" width="25" height="12" rx="2" fill="#FCD34D" />
          <text x="197" y="179" fontSize="6" fill="#78350F" textAnchor="middle" fontWeight="bold">
            ⭐ 5.0
          </text>
        </motion.g>

        {/* Reference Books */}
        <motion.g
          animate={animate ? { y: [0, -2, 0] } : undefined}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
        >
          {/* MTG Fingertips */}
          <rect x="50" y="210" width="170" height="30" rx="4" fill="#2DD4BF" />
          <rect x="50" y="210" width="10" height="30" fill="#14B8A6" />
          <text x="140" y="223" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
            MTG Fingertips Biology
          </text>
          <text x="140" y="233" fontSize="6" fill="#F0FDFA" textAnchor="middle">
            MCQ Practice
          </text>

          {/* Trueman */}
          <rect x="55" y="245" width="165" height="28" rx="4" fill="#5EEAD4" />
          <rect x="55" y="245" width="10" height="28" fill="#2DD4BF" />
          <text x="142" y="258" fontSize="8" fill="#0F766E" textAnchor="middle" fontWeight="bold">
            Trueman's Biology Vol 1&2
          </text>
          <text x="142" y="267" fontSize="6" fill="#115E59" textAnchor="middle">
            Detailed Theory
          </text>

          {/* Dinesh */}
          <rect x="60" y="278" width="160" height="26" rx="4" fill="#99F6E4" />
          <rect x="60" y="278" width="10" height="26" fill="#5EEAD4" />
          <text x="145" y="290" fontSize="8" fill="#0F766E" textAnchor="middle" fontWeight="bold">
            Dinesh Objective Biology
          </text>
          <text x="145" y="299" fontSize="6" fill="#115E59" textAnchor="middle">
            Advanced MCQs
          </text>
        </motion.g>

        {/* Bookshelf base */}
        <rect x="30" y="315" width="200" height="8" rx="2" fill="#78716C" />
        <rect x="30" y="323" width="10" height="25" fill="#57534E" />
        <rect x="220" y="323" width="10" height="25" fill="#57534E" />
      </motion.g>

      {/* Center Section - Book Rating Chart */}
      <motion.g
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' as const }}
      >
        <rect
          x="250"
          y="75"
          width="200"
          height="195"
          rx="12"
          fill="#FFFFFF"
          filter="url(#booksCardShadow)"
        />
        <rect x="250" y="75" width="200" height="30" rx="12" fill="#0D9488" />
        <text x="350" y="95" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📊 Book Priority Rating
        </text>

        {/* Rating bars */}
        {biologyBooks.map((book, index) => (
          <motion.g
            key={book.name}
            initial={animate ? { opacity: 0, x: -20 } : undefined}
            animate={animate ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: 'easeOut' as const }}
          >
            <text x="260" y={123 + index * 40} fontSize="8" fill="#374151" fontWeight="bold">
              {book.name}
            </text>
            {/* Rating bar background */}
            <rect x="260" y={128 + index * 40} width="120" height="12" rx="6" fill="#E5E7EB" />
            {/* Rating bar fill */}
            <motion.rect
              x="260"
              y={128 + index * 40}
              width={120 * (book.rating / 5)}
              height="12"
              rx="6"
              fill={book.color}
              initial={animate ? { width: 0 } : undefined}
              animate={animate ? { width: 120 * (book.rating / 5) } : undefined}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: 'easeOut' as const }}
            />
            {/* Stars */}
            <text x="390" y={137 + index * 40} fontSize="8" fill="#F59E0B">
              {'★'.repeat(Math.floor(book.rating))}
              {book.rating % 1 !== 0 ? '½' : ''}
            </text>
            {/* Priority badge */}
            <rect
              x="420"
              y={125 + index * 40}
              width="22"
              height="14"
              rx="3"
              fill={
                book.priority === 'ESSENTIAL'
                  ? '#DC2626'
                  : book.priority === 'HIGH'
                    ? '#F59E0B'
                    : book.priority === 'MEDIUM'
                      ? '#3B82F6'
                      : '#6B7280'
              }
            />
            <text
              x="431"
              y={135 + index * 40}
              fontSize="5"
              fill="#FFFFFF"
              textAnchor="middle"
              fontWeight="bold"
            >
              {book.priority.slice(0, 3)}
            </text>
          </motion.g>
        ))}
      </motion.g>

      {/* Right Section - Reading Strategy */}
      <motion.g
        initial={animate ? { opacity: 0, x: 30 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' as const }}
      >
        <rect
          x="460"
          y="75"
          width="220"
          height="280"
          rx="12"
          fill="#FFFFFF"
          filter="url(#booksCardShadow)"
        />
        <rect x="460" y="75" width="220" height="35" rx="12" fill="#0D9488" />
        <text x="570" y="98" fontSize="11" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📅 12-Month Reading Plan
        </text>

        {/* Reading phases */}
        {readingPhases.map((phase, index) => (
          <motion.g
            key={phase.phase}
            initial={animate ? { opacity: 0, y: 10 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.6 + index * 0.15, duration: 0.5, ease: 'easeOut' as const }}
          >
            {/* Phase card */}
            <rect
              x="475"
              y={120 + index * 55}
              width="190"
              height="48"
              rx="8"
              fill="#F0FDFA"
              stroke="#14B8A6"
              strokeWidth="1"
            />

            {/* Phase number */}
            <circle cx="495" y={144 + index * 55} r="12" fill="#14B8A6" />
            <text
              x="495"
              y={148 + index * 55}
              fontSize="9"
              fill="#FFFFFF"
              textAnchor="middle"
              fontWeight="bold"
            >
              {index + 1}
            </text>

            {/* Phase details */}
            <text x="515" y={137 + index * 55} fontSize="9" fill="#0F766E" fontWeight="bold">
              {phase.phase}: {phase.focus}
            </text>
            <text x="515" y={150 + index * 55} fontSize="7" fill="#6B7280">
              {phase.months}
            </text>

            {/* Progress indicator */}
            <rect x="515" y={155 + index * 55} width="80" height="6" rx="3" fill="#E5E7EB" />
            <motion.rect
              x="515"
              y={155 + index * 55}
              width={80 * (phase.progress / 100)}
              height="6"
              rx="3"
              fill={
                index === 0
                  ? '#14B8A6'
                  : index === 1
                    ? '#2DD4BF'
                    : index === 2
                      ? '#5EEAD4'
                      : '#99F6E4'
              }
              initial={animate ? { width: 0 } : undefined}
              animate={animate ? { width: 80 * (phase.progress / 100) } : undefined}
              transition={{ delay: 0.8 + index * 0.15, duration: 0.6, ease: 'easeOut' as const }}
            />
            <text x="600" y={161 + index * 55} fontSize="6" fill="#6B7280">
              {phase.progress}%
            </text>
          </motion.g>
        ))}
      </motion.g>

      {/* Bottom Section - Key Statistics */}
      <motion.g
        initial={animate ? { opacity: 0, y: 30 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' as const }}
      >
        <rect
          x="20"
          y="365"
          width="660"
          height="140"
          rx="12"
          fill="#FFFFFF"
          filter="url(#booksCardShadow)"
        />
        <rect x="20" y="365" width="660" height="35" rx="12" fill="#0D9488" />
        <text x="350" y="388" fontSize="12" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          📈 NEET Biology Book Strategy - Key Statistics
        </text>

        {/* Stat cards */}
        {/* NCERT Coverage */}
        <rect
          x="40"
          y="410"
          width="145"
          height="80"
          rx="8"
          fill="#F0FDFA"
          stroke="#14B8A6"
          strokeWidth="1"
        />
        <text x="112" y="435" fontSize="24" fill="#14B8A6" textAnchor="middle" fontWeight="bold">
          95%
        </text>
        <text x="112" y="452" fontSize="9" fill="#0F766E" textAnchor="middle" fontWeight="bold">
          Questions from
        </text>
        <text x="112" y="465" fontSize="9" fill="#0F766E" textAnchor="middle" fontWeight="bold">
          NCERT Content
        </text>
        <text x="112" y="480" fontSize="7" fill="#6B7280" textAnchor="middle">
          Master NCERT First!
        </text>

        {/* Chapters to Cover */}
        <rect
          x="195"
          y="410"
          width="145"
          height="80"
          rx="8"
          fill="#ECFDF5"
          stroke="#10B981"
          strokeWidth="1"
        />
        <text x="267" y="435" fontSize="24" fill="#10B981" textAnchor="middle" fontWeight="bold">
          38
        </text>
        <text x="267" y="452" fontSize="9" fill="#059669" textAnchor="middle" fontWeight="bold">
          Total Chapters
        </text>
        <text x="267" y="465" fontSize="8" fill="#059669" textAnchor="middle">
          (16 Botany + 22 Zoology)
        </text>
        <text x="267" y="480" fontSize="7" fill="#6B7280" textAnchor="middle">
          Class 11 & 12 Combined
        </text>

        {/* Questions in NEET */}
        <rect
          x="350"
          y="410"
          width="145"
          height="80"
          rx="8"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <text x="422" y="435" fontSize="24" fill="#F59E0B" textAnchor="middle" fontWeight="bold">
          90
        </text>
        <text x="422" y="452" fontSize="9" fill="#B45309" textAnchor="middle" fontWeight="bold">
          Biology MCQs
        </text>
        <text x="422" y="465" fontSize="8" fill="#B45309" textAnchor="middle">
          360 Marks Total
        </text>
        <text x="422" y="480" fontSize="7" fill="#6B7280" textAnchor="middle">
          Highest Weightage Subject
        </text>

        {/* Recommended Books */}
        <rect
          x="505"
          y="410"
          width="160"
          height="80"
          rx="8"
          fill="#EDE9FE"
          stroke="#8B5CF6"
          strokeWidth="1"
        />
        <text x="585" y="435" fontSize="24" fill="#8B5CF6" textAnchor="middle" fontWeight="bold">
          4-5
        </text>
        <text x="585" y="452" fontSize="9" fill="#6D28D9" textAnchor="middle" fontWeight="bold">
          Books Sufficient
        </text>
        <text x="585" y="465" fontSize="8" fill="#6D28D9" textAnchor="middle">
          NCERT + 2-3 Reference
        </text>
        <text x="585" y="480" fontSize="7" fill="#6B7280" textAnchor="middle">
          Quality over Quantity
        </text>
      </motion.g>

      {/* Animated book floating */}
      <motion.g
        animate={animate ? { y: [-5, 5, -5], rotate: [-2, 2, -2] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <rect x="255" y="285" width="40" height="55" rx="4" fill="#14B8A6" />
        <rect x="255" y="285" width="8" height="55" fill="#0D9488" />
        <text x="280" y="308" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          NCERT
        </text>
        <text x="280" y="320" fontSize="6" fill="#CCFBF1" textAnchor="middle">
          Biology
        </text>
        <text x="280" y="332" fontSize="6" fill="#CCFBF1" textAnchor="middle">
          Class 11
        </text>
      </motion.g>

      {/* Must Read Badge */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="310" y="280" width="80" height="25" rx="12" fill="#DC2626" />
        <text x="350" y="297" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
          MUST READ!
        </text>
      </motion.g>

      {/* Pro Tips Section */}
      <motion.g
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' as const }}
      >
        <rect
          x="405"
          y="280"
          width="145"
          height="70"
          rx="8"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <text x="477" y="298" fontSize="9" fill="#B45309" textAnchor="middle" fontWeight="bold">
          💡 Pro Tip
        </text>
        <text x="477" y="312" fontSize="7" fill="#78350F" textAnchor="middle">
          Read NCERT 3 times:
        </text>
        <text x="477" y="324" fontSize="6" fill="#92400E" textAnchor="middle">
          1st - Understand concepts
        </text>
        <text x="477" y="336" fontSize="6" fill="#92400E" textAnchor="middle">
          2nd - Note key points
        </text>
        <text x="477" y="348" fontSize="6" fill="#92400E" textAnchor="middle">
          3rd - Memorize diagrams
        </text>
      </motion.g>

      {/* Success Formula */}
      <motion.g
        animate={animate ? { opacity: [0.8, 1, 0.8] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <rect
          x="560"
          y="280"
          width="120"
          height="70"
          rx="8"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="1"
        />
        <text x="620" y="298" fontSize="9" fill="#166534" textAnchor="middle" fontWeight="bold">
          ✅ Success Formula
        </text>
        <text x="620" y="315" fontSize="7" fill="#15803D" textAnchor="middle">
          NCERT + MTG + PYQs
        </text>
        <text x="620" y="330" fontSize="7" fill="#15803D" textAnchor="middle">
          = 340+ in Biology
        </text>
        <text x="620" y="345" fontSize="6" fill="#6B7280" textAnchor="middle">
          Followed by NEET Toppers
        </text>
      </motion.g>

      {/* Floating decorative elements */}
      <motion.circle
        cx="15"
        cy="60"
        r="8"
        fill="#14B8A6"
        opacity="0.3"
        animate={animate ? { y: [-5, 5, -5] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle
        cx="685"
        cy="45"
        r="6"
        fill="#2DD4BF"
        opacity="0.3"
        animate={animate ? { y: [5, -5, 5] } : undefined}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.rect
        x="660"
        y="500"
        width="15"
        height="10"
        rx="2"
        fill="#5EEAD4"
        opacity="0.4"
        animate={animate ? { rotate: [-5, 5, -5] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </Wrapper>
  )
}
