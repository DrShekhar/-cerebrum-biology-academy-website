'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  premiumAnimations,
  premiumGradients,
  premiumSpacing,
  premiumLayouts,
} from '@/lib/design/premiumPatterns'

interface PremiumSectionProps {
  children: React.ReactNode
  className?: string
  variant?: 'hero' | 'features' | 'testimonials' | 'cta' | 'content' | 'research'
  background?: 'white' | 'gradient' | 'soft' | 'academic' | 'dark'
  spacing?: 'default' | 'large' | 'small'
  animation?: boolean
  container?: 'default' | 'narrow' | 'wide'
}

const backgroundVariants = {
  white: 'bg-white',
  gradient: premiumGradients.academicBlue,
  soft: premiumGradients.softAcademic,
  academic: premiumGradients.paperWhite,
  dark: 'bg-gray-900',
}

const spacingVariants = {
  default: premiumSpacing.section,
  large: 'py-32',
  small: premiumSpacing.sectionSm,
}

const containerVariants = {
  default: premiumLayouts.container,
  narrow: premiumLayouts.containerNarrow,
  wide: premiumLayouts.containerWide,
}

export const PremiumSection: React.FC<PremiumSectionProps> = ({
  children,
  className,
  variant = 'content',
  background = 'white',
  spacing = 'default',
  animation = true,
  container = 'default',
  ...props
}) => {
  const sectionClasses = cn(spacingVariants[spacing], backgroundVariants[background], className)

  const containerClasses = containerVariants[container]

  if (animation) {
    return (
      <motion.section
        className={sectionClasses}
        initial={premiumAnimations.fadeInUp.initial}
        whileInView={premiumAnimations.fadeInUp.animate}
        transition={premiumAnimations.fadeInUp.transition}
        viewport={{ once: true, margin: '-100px' }}
        {...props}
      >
        <div className={containerClasses}>{children}</div>
      </motion.section>
    )
  }

  return (
    <section className={sectionClasses} {...props}>
      <div className={containerClasses}>{children}</div>
    </section>
  )
}

// Specialized section components for different use cases
export const HeroSection: React.FC<Omit<PremiumSectionProps, 'variant'>> = (props) => (
  <PremiumSection variant="hero" background="gradient" spacing="large" {...props} />
)

export const FeatureSection: React.FC<Omit<PremiumSectionProps, 'variant'>> = (props) => (
  <PremiumSection variant="features" background="soft" {...props} />
)

export const TestimonialSection: React.FC<Omit<PremiumSectionProps, 'variant'>> = (props) => (
  <PremiumSection variant="testimonials" background="white" {...props} />
)

export const CTASection: React.FC<Omit<PremiumSectionProps, 'variant'>> = (props) => (
  <PremiumSection variant="cta" background="gradient" container="narrow" {...props} />
)

export const ContentSection: React.FC<Omit<PremiumSectionProps, 'variant'>> = (props) => (
  <PremiumSection variant="content" background="white" {...props} />
)

export const ResearchSection: React.FC<Omit<PremiumSectionProps, 'variant'>> = (props) => (
  <PremiumSection variant="research" background="academic" {...props} />
)

// Academic-specific section headers
interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  variant?: 'center' | 'left' | 'research'
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  variant = 'center',
  className,
}) => {
  const headerClasses = cn(
    'mb-16',
    variant === 'center' && 'text-center',
    variant === 'left' && 'text-left',
    variant === 'research' && 'text-left border-l-4 border-blue-600 pl-6',
    className
  )

  return (
    <motion.div
      className={headerClasses}
      initial={premiumAnimations.fadeInUp.initial}
      whileInView={premiumAnimations.fadeInUp.animate}
      transition={premiumAnimations.fadeInUp.transition}
      viewport={{ once: true }}
    >
      {subtitle && (
        <div className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
          {subtitle}
        </div>
      )}
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">{title}</h2>
      {description && (
        <p className="text-xl lg:text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto font-medium">
          {description}
        </p>
      )}
    </motion.div>
  )
}

// Premium grid layouts for academic content
interface AcademicGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  gap?: 'small' | 'medium' | 'large'
  className?: string
}

export const AcademicGrid: React.FC<AcademicGridProps> = ({
  children,
  columns = 3,
  gap = 'medium',
  className,
}) => {
  const gridClasses = cn(
    'grid',
    {
      'md:grid-cols-2': columns === 2,
      'md:grid-cols-2 lg:grid-cols-3': columns === 3,
      'md:grid-cols-2 lg:grid-cols-4': columns === 4,
    },
    {
      'gap-6': gap === 'small',
      'gap-8 lg:gap-12': gap === 'medium',
      'gap-12 lg:gap-16': gap === 'large',
    },
    className
  )

  return (
    <motion.div
      className={gridClasses}
      variants={premiumAnimations.staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

// Academic card component with premium styling
interface AcademicCardProps {
  children: React.ReactNode
  variant?: 'default' | 'research' | 'premium' | 'minimal'
  hover?: boolean
  className?: string
}

export const AcademicCard: React.FC<AcademicCardProps> = ({
  children,
  variant = 'default',
  hover = true,
  className,
}) => {
  const cardClasses = cn(
    'bg-white rounded-3xl p-8 transition-all duration-500',
    {
      'shadow-lg hover:shadow-2xl border border-gray-100': variant === 'default',
      'shadow-xl hover:shadow-2xl border-l-4 border-blue-600': variant === 'research',
      'bg-gradient-to-br from-white to-blue-50 shadow-xl hover:shadow-2xl border border-blue-100':
        variant === 'premium',
      'shadow-md hover:shadow-lg border border-gray-100': variant === 'minimal',
    },
    hover && 'hover:transform hover:-translate-y-1 hover:scale-[1.02]',
    className
  )

  return (
    <motion.div
      className={cardClasses}
      variants={premiumAnimations.academicReveal}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      whileHover={hover ? premiumAnimations.premiumHover.whileHover : undefined}
      whileTap={hover ? premiumAnimations.premiumHover.whileTap : undefined}
    >
      {children}
    </motion.div>
  )
}
