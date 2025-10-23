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
        viewBox="0 0 500 500"
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Detailed Anatomical Brain - Sagittal View (Based on reference image) */}
        <g
          stroke="#000000"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Skull/Head Outline */}
          <path
            d="M 180 50 Q 150 50, 130 70 Q 110 90, 100 120 Q 95 150, 95 180 Q 95 210, 100 240 Q 105 270, 115 295 Q 125 320, 140 340 Q 155 360, 175 375 Q 195 390, 220 400 Q 245 410, 270 415"
            strokeWidth="2.5"
          />

          {/* Face Profile */}
          <path
            d="M 270 415 Q 285 420, 300 425 Q 315 430, 330 440 Q 345 450, 355 465"
            strokeWidth="2.5"
          />
          <path d="M 355 465 L 360 480" strokeWidth="2" />

          {/* Forehead/Front */}
          <path d="M 180 50 Q 210 45, 240 45 Q 270 45, 295 50 Q 320 55, 340 65" strokeWidth="2.5" />

          {/* Cerebrum - Outer contour with detailed gyri */}
          <path d="M 130 70 Q 140 60, 155 55 Q 170 50, 185 48" />
          <path d="M 240 45 Q 255 45, 270 47 Q 285 50, 298 55" />
          <path d="M 298 55 Q 310 60, 320 68 Q 330 76, 338 88" />
          <path d="M 338 88 Q 345 100, 350 115 Q 354 130, 355 145" />
          <path d="M 355 145 Q 356 160, 355 175 Q 354 190, 350 205" />

          {/* Frontal Lobe - detailed gyri */}
          <path d="M 155 85 Q 165 80, 175 78" strokeWidth="1.5" />
          <path d="M 155 100 Q 165 95, 175 93" strokeWidth="1.5" />
          <path d="M 152 115 Q 162 110, 172 108" strokeWidth="1.5" />
          <path d="M 150 130 Q 160 125, 170 123" strokeWidth="1.5" />
          <path d="M 148 145 Q 158 140, 168 138" strokeWidth="1.5" />

          {/* Parietal Lobe - gyri */}
          <path d="M 185 65 Q 195 60, 205 58" strokeWidth="1.5" />
          <path d="M 195 75 Q 205 70, 215 68" strokeWidth="1.5" />
          <path d="M 205 85 Q 215 80, 225 78" strokeWidth="1.5" />
          <path d="M 215 95 Q 225 90, 235 88" strokeWidth="1.5" />
          <path d="M 225 105 Q 235 100, 245 98" strokeWidth="1.5" />
          <path d="M 235 115 Q 245 110, 255 108" strokeWidth="1.5" />

          {/* Occipital Lobe - back of brain */}
          <path d="M 270 70 Q 280 68, 290 68" strokeWidth="1.5" />
          <path d="M 280 80 Q 290 78, 300 78" strokeWidth="1.5" />
          <path d="M 290 90 Q 300 88, 310 88" strokeWidth="1.5" />
          <path d="M 300 100 Q 310 98, 320 98" strokeWidth="1.5" />
          <path d="M 310 115 Q 320 113, 330 115" strokeWidth="1.5" />
          <path d="M 318 130 Q 328 128, 338 130" strokeWidth="1.5" />
          <path d="M 325 145 Q 335 143, 345 145" strokeWidth="1.5" />

          {/* Temporal Lobe - lower front */}
          <path d="M 148 160 Q 158 155, 168 153" strokeWidth="1.5" />
          <path d="M 146 175 Q 156 170, 166 168" strokeWidth="1.5" />
          <path d="M 145 190 Q 155 185, 165 183" strokeWidth="1.5" />

          {/* Corpus Callosum - central connector */}
          <ellipse cx="220" cy="180" rx="60" ry="12" opacity="0.7" />
          <path d="M 160 180 Q 190 175, 220 175 Q 250 175, 280 180" strokeWidth="1.5" />

          {/* Thalamus */}
          <ellipse cx="215" cy="200" rx="18" ry="12" />
          <path d="M 197 200 Q 207 198, 215 198 Q 223 198, 233 200" strokeWidth="1" />

          {/* Hypothalamus */}
          <ellipse cx="215" cy="220" rx="12" ry="8" />

          {/* Pituitary Gland */}
          <circle cx="215" cy="235" r="5" />
          <path d="M 215 235 L 215 245" strokeWidth="1.5" />

          {/* Brainstem - detailed */}
          <path
            d="M 205 250 Q 200 265, 198 280 Q 197 295, 200 310 Q 203 325, 210 338"
            strokeWidth="2"
          />
          <path
            d="M 225 250 Q 230 265, 232 280 Q 233 295, 230 310 Q 227 325, 220 338"
            strokeWidth="2"
          />

          {/* Pons - horizontal lines */}
          <path d="M 200 285 L 230 285" strokeWidth="1" />
          <path d="M 200 295 L 230 295" strokeWidth="1" />
          <path d="M 200 305 L 230 305" strokeWidth="1" />

          {/* Medulla Oblongata */}
          <path d="M 210 338 Q 208 350, 208 362" strokeWidth="2" />
          <path d="M 220 338 Q 222 350, 222 362" strokeWidth="2" />

          {/* Cerebellum - with characteristic folds */}
          <path
            d="M 100 240 Q 110 250, 125 260 Q 140 270, 160 280 Q 180 290, 200 295"
            strokeWidth="2"
          />

          {/* Cerebellum folds - parallel lines */}
          <path d="M 115 250 Q 130 255, 145 258" strokeWidth="1.2" />
          <path d="M 120 260 Q 135 265, 150 268" strokeWidth="1.2" />
          <path d="M 125 270 Q 140 275, 155 278" strokeWidth="1.2" />
          <path d="M 130 280 Q 145 285, 160 288" strokeWidth="1.2" />
          <path d="M 135 290 Q 150 293, 165 295" strokeWidth="1.2" />
          <path d="M 142 298 Q 157 300, 172 302" strokeWidth="1.2" />
          <path d="M 150 305 Q 165 307, 180 308" strokeWidth="1.2" />
          <path d="M 158 312 Q 173 313, 188 314" strokeWidth="1.2" />

          {/* Spinal Cord */}
          <path d="M 208 362 L 208 390" strokeWidth="2" />
          <path d="M 222 362 L 222 390" strokeWidth="2" />

          {/* Vertebrae markings */}
          <path d="M 205 375 L 225 375" strokeWidth="1.5" />
          <path d="M 205 385 L 225 385" strokeWidth="1.5" />

          {/* Ventricles - brain cavities */}
          <path d="M 185 160 Q 190 165, 195 170 Q 200 175, 205 180" strokeWidth="1" opacity="0.5" />
          <path d="M 235 160 Q 240 165, 245 170 Q 250 175, 255 180" strokeWidth="1" opacity="0.5" />

          {/* Major sulci */}
          <path d="M 130 150 Q 145 148, 160 150" strokeWidth="1.5" />
          <path d="M 128 170 Q 143 168, 158 170" strokeWidth="1.5" />
          <path d="M 175 90 Q 190 88, 205 90" strokeWidth="1.5" />
          <path d="M 220 80 Q 235 78, 250 80" strokeWidth="1.5" />
          <path d="M 265 90 Q 280 88, 295 90" strokeWidth="1.5" />
          <path d="M 290 120 Q 305 118, 320 120" strokeWidth="1.5" />
          <path d="M 310 150 Q 325 148, 340 150" strokeWidth="1.5" />

          {/* Cortex fine detail */}
          <path d="M 145 92 Q 152 90, 159 92" strokeWidth="0.8" opacity="0.6" />
          <path d="M 147 107 Q 154 105, 161 107" strokeWidth="0.8" opacity="0.6" />
          <path d="M 149 122 Q 156 120, 163 122" strokeWidth="0.8" opacity="0.6" />
          <path d="M 151 137 Q 158 135, 165 137" strokeWidth="0.8" opacity="0.6" />
        </g>
      </svg>
    </div>
  )
}

export default BrainLogo
