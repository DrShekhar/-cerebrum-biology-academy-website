'use client'

import { motion } from 'framer-motion'
import type { IllustrationProps } from './shared'

export function NervousSystemIllustration({ className = '', animate = true }: IllustrationProps) {
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
      viewBox="0 0 700 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...wrapperProps}
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="nerveBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EDE9FE" />
          <stop offset="50%" stopColor="#DDD6FE" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>

        {/* Neuron gradients */}
        <radialGradient id="somaGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </radialGradient>
        <linearGradient id="axonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="myelinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="dendriteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Brain gradients */}
        <linearGradient id="cerebrumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
        <linearGradient id="cerebellumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="brainstemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Synapse gradients */}
        <linearGradient id="vesicleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="receptorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        {/* Action potential gradient */}
        <linearGradient id="apLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Card gradient */}
        <linearGradient id="nerveCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F3FF" />
        </linearGradient>

        {/* Shadow filters */}
        <filter id="nerveShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <filter id="neuronGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="impulseGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="520" fill="url(#nerveBgGrad)" rx="16" />

      {/* Decorative background elements */}
      <circle cx="125" cy="120" r="185" fill="#8B5CF6" opacity="0.05" />
      <circle cx="575" cy="400" r="150" fill="#EC4899" opacity="0.04" />
      <circle cx="350" cy="260" r="250" fill="#6366F1" opacity="0.03" />

      {/* Title */}
      <motion.text
        x="350"
        y="30"
        textAnchor="middle"
        fill="#1E293B"
        fontSize="18"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={animate ? { opacity: 0, y: -10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Neural Control & Coordination
      </motion.text>

      {/* NEURON STRUCTURE - Top Left */}
      <motion.g
        initial={animate ? { opacity: 0, x: -20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <g transform="translate(20, 50)">
          <rect
            x="0"
            y="0"
            width="310"
            height="185"
            rx="14"
            fill="url(#nerveCardGrad)"
            filter="url(#nerveShadow)"
          />
          <text x="155" y="22" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="700">
            Neuron Structure
          </text>

          {/* Dendrites */}
          <g transform="translate(25, 70)">
            <motion.path
              d="M35 40 Q20 30 10 20"
              stroke="url(#dendriteGrad)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              animate={animate ? { pathLength: [0.9, 1, 0.9] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M35 40 Q15 40 5 35"
              stroke="url(#dendriteGrad)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              animate={animate ? { pathLength: [0.9, 1, 0.9] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.path
              d="M35 40 Q20 50 10 60"
              stroke="url(#dendriteGrad)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              animate={animate ? { pathLength: [0.9, 1, 0.9] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
            <text x="5" y="75" fill="#A855F7" fontSize="6" fontWeight="500">
              Dendrites
            </text>

            {/* Cell body (Soma) */}
            <motion.ellipse
              cx="50"
              cy="40"
              rx="18"
              ry="15"
              fill="url(#somaGrad)"
              filter="url(#neuronGlow)"
              animate={animate ? { scale: [1, 1.03, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <circle cx="50" cy="38" r="6" fill="#DDD6FE" opacity="0.7" />
            <text x="50" y="60" textAnchor="middle" fill="#7C3AED" fontSize="6" fontWeight="500">
              Soma
            </text>

            {/* Axon hillock */}
            <path d="M68 40 Q75 40 80 40" stroke="#7C3AED" strokeWidth="5" fill="none" />

            {/* Axon with myelin sheaths */}
            <line x1="80" y1="40" x2="200" y2="40" stroke="url(#axonGrad)" strokeWidth="4" />

            {/* Myelin sheaths */}
            <motion.rect
              x="85"
              y="33"
              width="25"
              height="14"
              rx="7"
              fill="url(#myelinGrad)"
              animate={animate ? { opacity: [0.8, 1, 0.8] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.rect
              x="120"
              y="33"
              width="25"
              height="14"
              rx="7"
              fill="url(#myelinGrad)"
              animate={animate ? { opacity: [0.8, 1, 0.8] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.rect
              x="155"
              y="33"
              width="25"
              height="14"
              rx="7"
              fill="url(#myelinGrad)"
              animate={animate ? { opacity: [0.8, 1, 0.8] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />

            {/* Nodes of Ranvier labels */}
            <circle cx="115" cy="40" r="2" fill="#6D28D9" />
            <circle cx="150" cy="40" r="2" fill="#6D28D9" />
            <circle cx="185" cy="40" r="2" fill="#6D28D9" />

            {/* Action potential traveling */}
            <motion.circle
              cx="90"
              cy="40"
              r="4"
              fill="#22C55E"
              filter="url(#impulseGlow)"
              animate={animate ? { cx: [90, 115, 150, 185, 200] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Axon terminal */}
            <g transform="translate(195, 30)">
              <circle cx="8" cy="10" r="5" fill="#A78BFA" />
              <circle cx="15" cy="5" r="4" fill="#A78BFA" />
              <circle cx="15" cy="15" r="4" fill="#A78BFA" />
            </g>

            {/* Labels */}
            <text x="130" y="20" textAnchor="middle" fill="#F59E0B" fontSize="5">
              Myelin Sheath
            </text>
            <text x="115" y="55" fill="#6D28D9" fontSize="5">
              Node of Ranvier
            </text>
            <text x="130" y="70" textAnchor="middle" fill="#7C3AED" fontSize="6" fontWeight="500">
              Axon
            </text>
            <text x="205" y="55" fill="#A855F7" fontSize="5">
              Terminal
            </text>
          </g>

          {/* Speed info */}
          <g transform="translate(20, 155)">
            <text x="0" y="12" fill="#22C55E" fontSize="7" fontWeight="600">
              ● Myelinated: 100 m/s
            </text>
            <text x="130" y="12" fill="#F59E0B" fontSize="7" fontWeight="600">
              ● Unmyelinated: 1 m/s
            </text>
          </g>
        </g>
      </motion.g>

      {/* ACTION POTENTIAL GRAPH - Top Right */}
      <motion.g
        initial={animate ? { opacity: 0, x: 20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        <g transform="translate(350, 50)">
          <rect
            x="0"
            y="0"
            width="330"
            height="185"
            rx="14"
            fill="url(#nerveCardGrad)"
            filter="url(#nerveShadow)"
          />
          <text x="165" y="22" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="700">
            Action Potential
          </text>

          {/* Graph axes */}
          <g transform="translate(35, 42)">
            {/* Y-axis */}
            <line x1="0" y1="0" x2="0" y2="115" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="-6" y="6" textAnchor="end" fill="#64748B" fontSize="6">
              +30
            </text>
            <text x="-6" y="40" textAnchor="end" fill="#64748B" fontSize="6">
              0
            </text>
            <text x="-6" y="75" textAnchor="end" fill="#64748B" fontSize="6">
              -55
            </text>
            <text x="-6" y="100" textAnchor="end" fill="#64748B" fontSize="6">
              -70
            </text>
            <text
              x="-18"
              y="58"
              textAnchor="middle"
              fill="#64748B"
              fontSize="6"
              transform="rotate(-90 -18 58)"
            >
              mV
            </text>

            {/* X-axis */}
            <line x1="0" y1="95" x2="240" y2="95" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="120" y="112" textAnchor="middle" fill="#64748B" fontSize="6">
              Time (ms)
            </text>

            {/* Threshold line */}
            <line
              x1="0"
              y1="72"
              x2="240"
              y2="72"
              stroke="#F59E0B"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <text x="245" y="75" fill="#F59E0B" fontSize="6">
              Threshold
            </text>

            {/* Resting potential line */}
            <line
              x1="0"
              y1="95"
              x2="240"
              y2="95"
              stroke="#3B82F6"
              strokeWidth="1"
              strokeDasharray="4"
            />

            {/* Action potential curve */}
            <motion.path
              d="M0 95 L36 95 Q48 95 54 72 Q60 24 66 6 Q72 0 78 6 Q90 36 96 72 Q102 108 108 102 Q114 95 120 95 L240 95"
              stroke="url(#apLineGrad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={
                animate
                  ? {
                      pathLength: [0, 1],
                      opacity: [0.5, 1],
                    }
                  : undefined
              }
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            {/* Phase labels */}
            <text x="42" y="88" fill="#3B82F6" fontSize="6">
              Rest
            </text>
            <text x="66" y="18" fill="#22C55E" fontSize="6">
              Depol.
            </text>
            <text x="94" y="54" fill="#EF4444" fontSize="6">
              Repol.
            </text>
            <text x="110" y="110" fill="#8B5CF6" fontSize="6">
              Hyper
            </text>
          </g>

          {/* Ion movement legend */}
          <g transform="translate(195, 120)">
            <rect x="0" y="0" width="115" height="48" rx="6" fill="#F1F5F9" />
            <text x="57" y="15" textAnchor="middle" fill="#1E293B" fontSize="7" fontWeight="600">
              Ion Channels
            </text>
            <text x="12" y="30" fill="#22C55E" fontSize="6">
              Depol: Na⁺ in
            </text>
            <text x="12" y="42" fill="#EF4444" fontSize="6">
              Repol: K⁺ out
            </text>
          </g>
        </g>
      </motion.g>

      {/* BRAIN REGIONS - Bottom Left */}
      <motion.g
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <g transform="translate(20, 250)">
          <rect
            x="0"
            y="0"
            width="240"
            height="255"
            rx="14"
            fill="url(#nerveCardGrad)"
            filter="url(#nerveShadow)"
          />
          <text x="120" y="22" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="700">
            Brain Regions
          </text>

          {/* Brain diagram */}
          <g transform="translate(30, 35)">
            {/* Cerebrum */}
            <motion.path
              d="M75 15 Q20 15 15 60 Q10 100 30 120 Q50 135 75 130 Q100 135 120 120 Q140 100 135 60 Q130 15 75 15"
              fill="url(#cerebrumGrad)"
              animate={animate ? { scale: [1, 1.02, 1] } : undefined}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Brain folds */}
            <path
              d="M30 40 Q50 35 70 40 Q90 35 110 40"
              stroke="#BE185D"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M25 60 Q45 55 65 60 Q85 55 105 60 Q120 55 130 60"
              stroke="#BE185D"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M30 80 Q50 75 70 80 Q90 75 110 80"
              stroke="#BE185D"
              strokeWidth="1.5"
              fill="none"
            />
            <text x="75" y="65" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">
              Cerebrum
            </text>
            <text x="75" y="78" textAnchor="middle" fill="white" fontSize="5">
              (Thinking, Memory)
            </text>

            {/* Cerebellum */}
            <motion.path
              d="M100 125 Q90 140 100 155 Q115 165 130 155 Q145 140 135 125"
              fill="url(#cerebellumGrad)"
              animate={animate ? { scale: [1, 1.03, 1] } : undefined}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            {/* Cerebellum folds */}
            <path d="M105 135 Q115 130 125 135" stroke="#6D28D9" strokeWidth="1" fill="none" />
            <path d="M105 145 Q115 140 125 145" stroke="#6D28D9" strokeWidth="1" fill="none" />
            <text x="117" y="175" textAnchor="middle" fill="#7C3AED" fontSize="6" fontWeight="600">
              Cerebellum
            </text>

            {/* Brain stem */}
            <motion.path
              d="M65 120 Q60 130 55 150 Q50 170 55 185"
              stroke="url(#brainstemGrad)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              animate={animate ? { opacity: [0.9, 1, 0.9] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <text x="30" y="155" fill="#4F46E5" fontSize="6" fontWeight="600">
              Brain
            </text>
            <text x="30" y="165" fill="#4F46E5" fontSize="6" fontWeight="600">
              Stem
            </text>
          </g>

          {/* Function cards */}
          <g transform="translate(12, 185)">
            <rect x="0" y="0" width="215" height="60" rx="6" fill="#F1F5F9" />
            <text x="107" y="14" textAnchor="middle" fill="#1E293B" fontSize="7" fontWeight="600">
              Key Functions
            </text>
            <text x="12" y="28" fill="#DB2777" fontSize="6">
              ● Cerebrum: Higher mental functions
            </text>
            <text x="12" y="40" fill="#7C3AED" fontSize="6">
              ● Cerebellum: Balance, coordination
            </text>
            <text x="12" y="52" fill="#4F46E5" fontSize="6">
              ● Medulla: Vital functions (HR, BP)
            </text>
          </g>
        </g>
      </motion.g>

      {/* SYNAPSE - Bottom Center */}
      <motion.g
        initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <g transform="translate(280, 250)">
          <rect
            x="0"
            y="0"
            width="195"
            height="255"
            rx="14"
            fill="url(#nerveCardGrad)"
            filter="url(#nerveShadow)"
          />
          <text x="97" y="22" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="700">
            Synapse
          </text>

          {/* Presynaptic terminal */}
          <g transform="translate(40, 42)">
            <path
              d="M50 0 Q80 0 90 30 Q100 60 90 90 Q80 100 50 100 Q20 100 10 70 L10 30 Q10 0 50 0"
              fill="#A78BFA"
              stroke="#7C3AED"
              strokeWidth="2"
            />
            <text x="50" y="15" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">
              Presynaptic
            </text>

            {/* Synaptic vesicles */}
            <motion.circle
              cx="30"
              cy="45"
              r="6"
              fill="url(#vesicleGrad)"
              animate={animate ? { y: [0, 5, 0] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle
              cx="50"
              cy="40"
              r="6"
              fill="url(#vesicleGrad)"
              animate={animate ? { y: [0, 8, 0] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.circle
              cx="70"
              cy="45"
              r="6"
              fill="url(#vesicleGrad)"
              animate={animate ? { y: [0, 5, 0] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
            <text x="50" y="60" textAnchor="middle" fill="#0891B2" fontSize="5">
              Vesicles
            </text>

            {/* Ca2+ entry */}
            <motion.text
              x="85"
              y="25"
              fill="#22C55E"
              fontSize="6"
              fontWeight="bold"
              animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Ca²⁺
            </motion.text>

            {/* Neurotransmitter release */}
            <motion.circle
              cx="35"
              cy="85"
              r="3"
              fill="#06B6D4"
              animate={animate ? { cy: [85, 115, 85], opacity: [1, 0.5, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="50"
              cy="85"
              r="3"
              fill="#06B6D4"
              animate={animate ? { cy: [85, 120, 85], opacity: [1, 0.5, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.circle
              cx="65"
              cy="85"
              r="3"
              fill="#06B6D4"
              animate={animate ? { cy: [85, 115, 85], opacity: [1, 0.5, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </g>

          {/* Synaptic cleft */}
          <g transform="translate(40, 155)">
            <rect x="10" y="0" width="95" height="18" fill="#E2E8F0" rx="3" />
            <text x="57" y="12" textAnchor="middle" fill="#64748B" fontSize="6">
              Synaptic Cleft (20-40 nm)
            </text>
          </g>

          {/* Postsynaptic membrane */}
          <g transform="translate(40, 180)">
            <path
              d="M10 0 L90 0 Q100 10 90 30 Q80 50 50 50 Q20 50 10 30 Q0 10 10 0"
              fill="#F9A8D4"
              stroke="#EC4899"
              strokeWidth="2"
            />
            <text x="50" y="15" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">
              Postsynaptic
            </text>

            {/* Receptors */}
            <rect x="25" y="-5" width="8" height="10" rx="2" fill="url(#receptorGrad)" />
            <rect x="45" y="-5" width="8" height="10" rx="2" fill="url(#receptorGrad)" />
            <rect x="65" y="-5" width="8" height="10" rx="2" fill="url(#receptorGrad)" />
            <text x="50" y="35" textAnchor="middle" fill="#DB2777" fontSize="5">
              Receptors
            </text>
          </g>
        </g>
      </motion.g>

      {/* NEUROTRANSMITTERS & ANS - Bottom Right */}
      <motion.g
        initial={animate ? { opacity: 0, x: 20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <g transform="translate(495, 250)">
          <rect
            x="0"
            y="0"
            width="185"
            height="255"
            rx="14"
            fill="url(#nerveCardGrad)"
            filter="url(#nerveShadow)"
          />
          <text x="92" y="22" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">
            Key Facts
          </text>

          {/* Neurotransmitters */}
          <g transform="translate(12, 35)">
            <text x="0" y="12" fill="#1E293B" fontSize="8" fontWeight="600">
              Neurotransmitters
            </text>
            <g transform="translate(0, 18)">
              <circle cx="10" cy="7" r="6" fill="#22C55E" />
              <text x="22" y="11" fill="#64748B" fontSize="6">
                ACh - NMJ, Brain
              </text>
            </g>
            <g transform="translate(0, 34)">
              <circle cx="10" cy="7" r="6" fill="#8B5CF6" />
              <text x="22" y="11" fill="#64748B" fontSize="6">
                Dopamine - Pleasure
              </text>
            </g>
            <g transform="translate(0, 50)">
              <circle cx="10" cy="7" r="6" fill="#3B82F6" />
              <text x="22" y="11" fill="#64748B" fontSize="6">
                Serotonin - Mood
              </text>
            </g>
            <g transform="translate(0, 66)">
              <circle cx="10" cy="7" r="6" fill="#EF4444" />
              <text x="22" y="11" fill="#64748B" fontSize="6">
                GABA - Inhibitory
              </text>
            </g>
          </g>

          {/* ANS comparison */}
          <g transform="translate(12, 130)">
            <text x="80" y="12" textAnchor="middle" fill="#1E293B" fontSize="8" fontWeight="600">
              Autonomic NS
            </text>

            {/* Sympathetic */}
            <g transform="translate(0, 22)">
              <rect
                x="0"
                y="0"
                width="78"
                height="85"
                rx="6"
                fill="#FEE2E2"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text x="39" y="14" textAnchor="middle" fill="#B91C1C" fontSize="7" fontWeight="600">
                Sympathetic
              </text>
              <text x="39" y="27" textAnchor="middle" fill="#64748B" fontSize="6">
                Fight or Flight
              </text>
              <text x="6" y="42" fill="#DC2626" fontSize="6">
                ↑ Heart rate
              </text>
              <text x="6" y="55" fill="#DC2626" fontSize="6">
                ↑ Pupil dilation
              </text>
              <text x="6" y="68" fill="#DC2626" fontSize="6">
                ↓ Digestion
              </text>
            </g>

            {/* Parasympathetic */}
            <g transform="translate(82, 22)">
              <rect
                x="0"
                y="0"
                width="78"
                height="85"
                rx="6"
                fill="#DCFCE7"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text x="39" y="14" textAnchor="middle" fill="#166534" fontSize="6" fontWeight="600">
                Parasympathetic
              </text>
              <text x="39" y="27" textAnchor="middle" fill="#64748B" fontSize="6">
                Rest & Digest
              </text>
              <text x="6" y="42" fill="#15803D" fontSize="6">
                ↓ Heart rate
              </text>
              <text x="6" y="55" fill="#15803D" fontSize="6">
                ↓ Pupil (constr.)
              </text>
              <text x="6" y="68" fill="#15803D" fontSize="6">
                ↑ Digestion
              </text>
            </g>
          </g>
        </g>
      </motion.g>

      {/* Key values badge */}
      <motion.g
        initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <g transform="translate(565, 175)">
          <rect x="0" y="0" width="115" height="58" rx="10" fill="#1E293B" opacity="0.9" />
          <text x="57" y="17" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
            Key Potentials
          </text>
          <text x="12" y="34" fill="#3B82F6" fontSize="7">
            Resting: -70 mV
          </text>
          <text x="12" y="48" fill="#22C55E" fontSize="7">
            Action: +30 mV
          </text>
        </g>
      </motion.g>
    </Wrapper>
  )
}
