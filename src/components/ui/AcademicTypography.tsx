'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { premiumTypography, premiumAnimations } from '@/lib/design/premiumPatterns'

// Academic Headline Component with Harvard-level typography
interface AcademicHeadlineProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'default' | 'hero' | 'section' | 'research' | 'emphasis'
  align?: 'left' | 'center' | 'right'
  className?: string
  animation?: boolean
  gradient?: boolean
}

export const AcademicHeadline: React.FC<AcademicHeadlineProps> = ({
  children,
  level = 2,
  variant = 'default',
  align = 'left',
  className,
  animation = true,
  gradient = false,
}) => {
  const Tag = `h${level}` as React.ElementType

  const baseClasses = cn(
    'font-bold tracking-tight',
    {
      [premiumTypography.h1]: level === 1,
      [premiumTypography.h2]: level === 2,
      [premiumTypography.h3]: level === 3,
      [premiumTypography.h4]: level === 4,
      [premiumTypography.h5]: level === 5,
      'text-lg lg:text-xl font-semibold': level === 6,
    },
    {
      'text-left': align === 'left',
      'text-center': align === 'center',
      'text-right': align === 'right',
    },
    {
      'text-gray-900': variant === 'default' && !gradient,
      'text-white': variant === 'hero',
      'text-gray-900 border-l-4 border-blue-600 pl-6': variant === 'research',
      'text-blue-900 font-extrabold': variant === 'emphasis' && !gradient,
    },
    gradient &&
      'bg-blue-600 bg-clip-text text-transparent',
    className
  )

  if (animation) {
    return (
      <motion.div
        initial={premiumAnimations.fadeInUp.initial}
        whileInView={premiumAnimations.fadeInUp.animate}
        transition={premiumAnimations.fadeInUp.transition}
        viewport={{ once: true }}
      >
        <Tag className={baseClasses}>{children}</Tag>
      </motion.div>
    )
  }

  return <Tag className={baseClasses}>{children}</Tag>
}

// Academic Paragraph with premium styling
interface AcademicParagraphProps {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'muted' | 'emphasis' | 'research'
  className?: string
  animation?: boolean
}

export const AcademicParagraph: React.FC<AcademicParagraphProps> = ({
  children,
  size = 'medium',
  variant = 'default',
  className,
  animation = true,
}) => {
  const classes = cn(
    'leading-relaxed',
    {
      [premiumTypography.bodySmall]: size === 'small',
      [premiumTypography.bodyMedium]: size === 'medium',
      [premiumTypography.bodyLarge]: size === 'large',
    },
    {
      'text-gray-700': variant === 'default',
      [premiumTypography.muted]: variant === 'muted',
      [premiumTypography.emphasis]: variant === 'emphasis',
      'text-gray-800 font-medium italic border-l-2 border-blue-300 pl-4': variant === 'research',
    },
    className
  )

  if (animation) {
    return (
      <motion.p
        className={classes}
        initial={premiumAnimations.fadeInUp.initial}
        whileInView={premiumAnimations.fadeInUp.animate}
        transition={{ ...premiumAnimations.fadeInUp.transition, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.p>
    )
  }

  return <p className={classes}>{children}</p>
}

// Research Citation Component
interface ResearchCitationProps {
  source: string
  year?: string | number
  link?: string
  className?: string
}

export const ResearchCitation: React.FC<ResearchCitationProps> = ({
  source,
  year,
  link,
  className,
}) => {
  const classes = cn(
    'inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors',
    className
  )

  const content = (
    <>
      <span>({source}</span>
      {year && <span>, {year}</span>}
      <span>)</span>
    </>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return <span className={classes}>{content}</span>
}

// Academic Quote Component
interface AcademicQuoteProps {
  children: React.ReactNode
  author?: string
  designation?: string
  source?: string
  variant?: 'default' | 'testimonial' | 'research'
  className?: string
}

export const AcademicQuote: React.FC<AcademicQuoteProps> = ({
  children,
  author,
  designation,
  source,
  variant = 'default',
  className,
}) => {
  const quoteClasses = cn(
    'relative',
    {
      'bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl': variant === 'default',
      'bg-white p-8 rounded-3xl shadow-lg border border-gray-100': variant === 'testimonial',
      'bg-gray-50 border border-gray-200 p-6 rounded-xl italic': variant === 'research',
    },
    className
  )

  return (
    <motion.blockquote
      className={quoteClasses}
      initial={premiumAnimations.fadeInUp.initial}
      whileInView={premiumAnimations.fadeInUp.animate}
      transition={premiumAnimations.fadeInUp.transition}
      viewport={{ once: true }}
    >
      {variant !== 'research' && <div className="text-4xl text-blue-300 mb-4 font-serif">"</div>}

      <div
        className={cn(
          'mb-4',
          variant === 'testimonial' ? 'text-gray-700 text-lg' : 'text-gray-800'
        )}
      >
        {children}
      </div>

      {(author || source) && (
        <footer className="flex flex-col gap-1">
          {author && <cite className="text-gray-900 font-semibold not-italic">{author}</cite>}
          {designation && <span className="text-blue-600 text-sm font-medium">{designation}</span>}
          {source && <span className="text-gray-600 text-sm">{source}</span>}
        </footer>
      )}
    </motion.blockquote>
  )
}

// Academic List Component
interface AcademicListProps {
  items: (string | React.ReactNode)[]
  variant?: 'bulleted' | 'numbered' | 'checkmark' | 'research'
  className?: string
  animation?: boolean
}

export const AcademicList: React.FC<AcademicListProps> = ({
  items,
  variant = 'bulleted',
  className,
  animation = true,
}) => {
  const listClasses = cn(
    'space-y-3',
    {
      'list-disc list-inside': variant === 'bulleted',
      'list-decimal list-inside': variant === 'numbered',
    },
    className
  )

  const ListTag = variant === 'numbered' ? 'ol' : 'ul'

  const listContent = (
    <ListTag className={listClasses}>
      {items.map((item, index) => (
        <li
          key={index}
          className={cn(
            'text-gray-700 leading-relaxed',
            variant === 'checkmark' && 'flex items-start gap-3 list-none',
            variant === 'research' && 'list-none text-gray-800 font-medium'
          )}
        >
          {variant === 'checkmark' && <span className="text-green-600 text-lg mt-0.5">✓</span>}
          {variant === 'research' && <span className="text-blue-600 font-bold mr-2">→</span>}
          {item}
        </li>
      ))}
    </ListTag>
  )

  if (animation) {
    return (
      <motion.div
        variants={premiumAnimations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {listContent}
      </motion.div>
    )
  }

  return listContent
}

// Academic Emphasis Component
interface AcademicEmphasisProps {
  children: React.ReactNode
  variant?: 'highlight' | 'stat' | 'achievement' | 'research'
  color?: 'blue' | 'green' | 'purple' | 'orange'
  className?: string
}

export const AcademicEmphasis: React.FC<AcademicEmphasisProps> = ({
  children,
  variant = 'highlight',
  color = 'blue',
  className,
}) => {
  const classes = cn(
    'font-semibold',
    {
      'bg-yellow-50 text-yellow-900 px-2 py-1 rounded': variant === 'highlight',
      'text-3xl font-bold': variant === 'stat',
      'text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent':
        variant === 'achievement',
      'italic font-medium': variant === 'research',
    },
    {
      'text-blue-600': color === 'blue' && variant !== 'highlight',
      'text-green-600': color === 'green' && variant !== 'highlight',
      'text-purple-600': color === 'purple' && variant !== 'highlight',
      'text-orange-600': color === 'orange' && variant !== 'highlight',
      'bg-blue-600': color === 'blue' && variant === 'achievement',
      'bg-green-600 text-white': color === 'green' && variant === 'achievement',
      'from-purple-600 to-violet-600': color === 'purple' && variant === 'achievement',
      'from-orange-600 to-yellow-600': color === 'orange' && variant === 'achievement',
    },
    className
  )

  return <span className={classes}>{children}</span>
}

// Academic Caption Component for images and figures
interface AcademicCaptionProps {
  children: React.ReactNode
  number?: string | number
  className?: string
}

export const AcademicCaption: React.FC<AcademicCaptionProps> = ({
  children,
  number,
  className,
}) => {
  const classes = cn('text-sm text-gray-600 italic mt-2 text-center', className)

  return (
    <div className={classes}>
      {number && <span className="font-semibold">Figure {number}: </span>}
      {children}
    </div>
  )
}
