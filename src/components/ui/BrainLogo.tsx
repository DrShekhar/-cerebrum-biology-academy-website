'use client'

import React from 'react'

interface BrainLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
}

export const BrainLogo: React.FC<BrainLogoProps> = ({
  className = '',
  size = 'md',
  animate = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Detailed Anatomical Brain Illustration - Fine Pencil Sketch Style */}
        <g
          stroke="#000000"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Head/Face Outline */}
          <path d="M145 180 Q148 165, 155 155 Q162 145, 168 130 Q172 115, 173 100 Q174 85, 172 70 Q170 55, 165 42 Q158 28, 148 18 Q135 8, 120 5 Q105 3, 90 5 Q75 8, 63 15" />

          {/* Forehead continuation */}
          <path d="M63 15 Q55 20, 50 30 Q46 40, 44 52" />

          {/* Nose area */}
          <path d="M155 155 L158 162 Q160 168, 162 172 Q164 176, 165 180" />
          <path d="M158 162 Q161 163, 164 164" />

          {/* Back of head/neck */}
          <path d="M44 52 Q42 65, 42 80 Q42 95, 44 110 Q46 125, 50 138 Q54 150, 60 160" />

          {/* Spinal cord area */}
          <path d="M60 160 L65 175 L68 185" />
          <path d="M68 185 L72 187" />

          {/* Vertebrae indication */}
          <path d="M66 178 L70 178" />
          <path d="M67 182 L71 182" />

          {/* Cerebral Cortex - Top Frontal Lobe with detailed gyri */}
          <path d="M120 5 Q108 8, 98 12 Q88 16, 80 22 Q72 28, 66 36" />

          {/* Frontal Lobe Gyri (brain folds) - Multiple curves */}
          <path d="M66 36 Q62 42, 60 48 Q58 54, 58 60" />
          <path d="M70 30 Q68 36, 68 42" />
          <path d="M78 24 Q76 30, 76 36" />
          <path d="M86 20 Q84 26, 84 32" />
          <path d="M94 16 Q92 22, 92 28" />
          <path d="M102 14 Q100 20, 100 26" />
          <path d="M110 12 Q108 18, 108 24" />

          {/* Parietal Lobe - Top middle area */}
          <path d="M120 5 Q132 8, 142 14 Q152 20, 160 28" />
          <path d="M128 10 Q130 16, 130 22" />
          <path d="M136 12 Q138 18, 138 24" />
          <path d="M144 16 Q146 22, 146 28" />
          <path d="M152 22 Q154 28, 154 34" />

          {/* Occipital Lobe - Back of brain */}
          <path d="M160 28 Q166 36, 170 46 Q172 56, 172 66" />
          <path d="M164 32 Q166 38, 166 44" />
          <path d="M168 38 Q170 44, 170 50" />

          {/* Temporal Lobe - Lower middle */}
          <path d="M58 60 Q56 68, 56 76 Q56 84, 58 92" />
          <path d="M62 64 Q60 70, 60 76" />
          <path d="M66 68 Q64 74, 64 80" />

          {/* Corpus Callosum - Central connecting structure */}
          <ellipse cx="110" cy="85" rx="35" ry="8" opacity="0.8" />
          <path d="M75 85 Q90 83, 110 83 Q130 83, 145 85" />

          {/* Thalamus - Central structure */}
          <ellipse cx="108" cy="95" rx="12" ry="8" />

          {/* Hypothalamus - Below thalamus */}
          <ellipse cx="108" cy="105" rx="8" ry="5" />

          {/* Pituitary Gland */}
          <circle cx="108" cy="112" r="3" />
          <path d="M108 112 L108 118" />

          {/* Brain Stem - Detailed structure */}
          <path d="M100 118 Q98 125, 98 132 Q98 139, 100 145 Q102 150, 106 154" />
          <path d="M116 118 Q118 125, 118 132 Q118 139, 116 145 Q114 150, 110 154" />

          {/* Medulla Oblongata */}
          <path d="M106 154 Q104 160, 104 166" />
          <path d="M110 154 Q112 160, 112 166" />

          {/* Cerebellum - Detailed folds */}
          <path d="M58 92 Q60 100, 64 108 Q68 116, 74 122 Q80 128, 88 132" />

          {/* Cerebellum internal folds - Multiple parallel lines */}
          <path d="M64 100 Q70 104, 76 106" />
          <path d="M66 106 Q72 110, 78 112" />
          <path d="M68 112 Q74 116, 80 118" />
          <path d="M70 118 Q76 122, 82 124" />
          <path d="M72 124 Q78 127, 84 129" />

          {/* Cerebellum connection to brain stem */}
          <path d="M88 132 Q94 134, 100 134" />
          <path d="M88 128 Q94 130, 100 130" />

          {/* Pons - Middle brain stem section */}
          <path d="M96 134 Q94 140, 94 145" />
          <path d="M104 134 Q106 140, 106 145" />
          <path d="M94 138 L106 138" />
          <path d="M94 142 L106 142" />

          {/* Ventricles - Brain cavities */}
          <path
            d="M95 75 Q98 78, 100 82 Q102 86, 102 90 Q102 94, 100 97"
            strokeWidth="1"
            opacity="0.6"
          />
          <path
            d="M115 75 Q118 78, 120 82 Q122 86, 122 90 Q122 94, 120 97"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Sulci - Major brain grooves */}
          <path d="M50 70 Q65 72, 80 70" strokeWidth="1.2" />
          <path d="M52 82 Q67 84, 82 82" strokeWidth="1.2" />
          <path d="M85 40 Q95 42, 105 40" strokeWidth="1.2" />
          <path d="M115 38 Q125 40, 135 38" strokeWidth="1.2" />
          <path d="M140 50 Q150 52, 160 50" strokeWidth="1.2" />

          {/* Gyri details - Fine surface texture */}
          <path d="M70 45 Q75 46, 80 45" strokeWidth="1" opacity="0.7" />
          <path d="M72 52 Q77 53, 82 52" strokeWidth="1" opacity="0.7" />
          <path d="M74 58 Q79 59, 84 58" strokeWidth="1" opacity="0.7" />
          <path d="M90 35 Q95 36, 100 35" strokeWidth="1" opacity="0.7" />
          <path d="M92 42 Q97 43, 102 42" strokeWidth="1" opacity="0.7" />
          <path d="M94 48 Q99 49, 104 48" strokeWidth="1" opacity="0.7" />
          <path d="M120 32 Q125 33, 130 32" strokeWidth="1" opacity="0.7" />
          <path d="M122 39 Q127 40, 132 39" strokeWidth="1" opacity="0.7" />
          <path d="M124 45 Q129 46, 134 45" strokeWidth="1" opacity="0.7" />
          <path d="M145 55 Q150 56, 155 55" strokeWidth="1" opacity="0.7" />
          <path d="M148 62 Q153 63, 158 62" strokeWidth="1" opacity="0.7" />

          {/* Cortex edge detail */}
          <path
            d="M66 36 Q68 32, 72 28 Q76 24, 82 22 Q88 20, 94 18 Q100 17, 106 16 Q112 16, 118 17 Q124 18, 130 20 Q136 22, 142 26 Q148 30, 154 36"
            strokeWidth="1.8"
          />

          {/* Optic nerve pathway */}
          <circle cx="135" cy="115" r="4" opacity="0.6" />
          <path d="M135 115 L125 108" strokeWidth="1" opacity="0.6" />
        </g>
      </svg>
    </div>
  )
}

export default BrainLogo
