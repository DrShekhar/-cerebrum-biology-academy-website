// Harvard-Level Premium UI/UX Design Patterns
// Academic Excellence meets Premium User Experience

export const premiumAnimations = {
  // Sophisticated entrance animations
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },

  // Premium stagger animations for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  // Academic paper-like smooth transitions
  smoothFloat: {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  },

  // Premium hover animations for interactive elements
  premiumHover: {
    whileHover: {
      scale: 1.02,
      y: -2,
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
    },
    whileTap: { scale: 0.98 },
  },

  // Harvard-style reveal animation
  academicReveal: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export const premiumGradients = {
  // Academic Excellence gradients
  academicBlue: 'bg-indigo-600',
  scholarlyPurple: 'bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600',
  researchGreen: 'bg-gradient-to-r from-green-600 via-green-600 to-green-600',
  innovationOrange: 'bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600',

  // Subtle academic backgrounds
  softAcademic: 'bg-gray-50',
  paperWhite: 'bg-gradient-to-br from-gray-50 via-white to-blue-50',
  scholarlyGray: 'bg-gradient-to-br from-gray-100 via-slate-100 to-blue-100',

  // Premium overlays
  darkOverlay: 'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
  lightOverlay: 'bg-gradient-to-t from-white/90 via-white/60 to-transparent',
}

export const premiumSpacing = {
  // Harvard-style spacing system
  section: 'py-24',
  sectionMd: 'py-20',
  sectionSm: 'py-16',

  // Content spacing
  contentGap: 'space-y-8',
  contentGapLg: 'space-y-12',
  contentGapXl: 'space-y-16',

  // Grid spacing
  gridGap: 'gap-8',
  gridGapLg: 'gap-12',
  gridGapXl: 'gap-16',
}

export const premiumTypography = {
  // Academic headline hierarchy
  h1: 'text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-4xl lg:text-5xl font-bold tracking-tight',
  h3: 'text-3xl lg:text-4xl font-bold tracking-tight',
  h4: 'text-2xl lg:text-3xl font-semibold tracking-tight',
  h5: 'text-xl lg:text-2xl font-semibold tracking-tight',

  // Body text with academic spacing
  bodyLarge: 'text-lg lg:text-xl leading-relaxed',
  bodyMedium: 'text-base lg:text-lg leading-relaxed',
  bodySmall: 'text-sm lg:text-base leading-relaxed',

  // Academic emphasis
  emphasis: 'font-medium text-gray-900',
  muted: 'text-gray-600',
  accent: 'text-blue-600 font-semibold',
}

export const premiumCards = {
  // Academic paper-style cards
  academic:
    'bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100',
  research:
    'bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-l-4 border-blue-600',
  premium:
    'bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100',

  // Interactive states
  hover: 'hover:transform hover:-translate-y-1 hover:scale-[1.02]',
  active: 'active:transform active:scale-[0.98]',

  // Content padding
  padding: 'p-8 lg:p-10',
  paddingMd: 'p-6 lg:p-8',
  paddingSm: 'p-4 lg:p-6',
}

export const premiumLayouts = {
  // Harvard-style container widths
  container: 'max-w-7xl mx-auto px-6 lg:px-8',
  containerNarrow: 'max-w-4xl mx-auto px-6 lg:px-8',
  containerWide: 'max-w-8xl mx-auto px-6 lg:px-8',

  // Academic grid systems
  gridAcademic: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12',
  gridResearch: 'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',
  gridHero: 'grid lg:grid-cols-12 gap-8 lg:gap-12 items-center',
}

export const premiumInteractions = {
  // Sophisticated button states
  buttonBase: 'transition-all duration-300 ease-out',
  buttonHover: 'hover:transform hover:-translate-y-1 hover:shadow-xl',
  buttonActive: 'active:transform active:scale-95',

  // Card interactions
  cardHover: 'hover:shadow-2xl hover:transform hover:-translate-y-2 transition-all duration-400',

  // Link interactions
  linkHover: 'hover:text-blue-600 transition-colors duration-200',

  // Form interactions
  inputFocus: 'focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200',
}

export const academicColorPalette = {
  // Primary academic colors
  harvard: '#A41E22',
  oxford: '#002147',
  cambridge: '#A3C1AD',
  mit: '#8A8B8C',

  // Education-specific blues
  trustBlue: '#1E40AF',
  academicBlue: '#2563EB',
  scholarBlue: '#3B82F6',

  // Success and achievement colors
  achievementGold: '#F59E0B',
  successGreen: '#10B981',
  excellenceYellow: '#FCD34D',

  // Supporting neutrals
  academicGray: '#6B7280',
  scholarGray: '#9CA3AF',
  paperWhite: '#FEFEFE',
}

export const premiumEffects = {
  // Glass morphism for modern academic look
  glass: 'backdrop-blur-lg bg-white/80 border border-white/20',
  glassCard: 'backdrop-blur-lg bg-white/90 border border-white/30 shadow-xl',

  // Academic shadows
  paperShadow: 'shadow-lg shadow-gray-200/50',
  researchShadow: 'shadow-xl shadow-blue-200/30',
  premiumShadow: 'shadow-2xl shadow-indigo-200/40',

  // Sophisticated borders
  academicBorder: 'border border-gray-200',
  premiumBorder: 'border-2 border-blue-100',
  accentBorder: 'border-l-4 border-blue-600',
}

// Harvard-Level Section Templates
export const sectionTemplates = {
  hero: {
    container: `${premiumLayouts.container} ${premiumSpacing.section}`,
    gradient: premiumGradients.academicBlue,
    textColor: 'text-white',
    animation: premiumAnimations.fadeInUp,
  },

  features: {
    container: `${premiumLayouts.container} ${premiumSpacing.section}`,
    background: premiumGradients.softAcademic,
    grid: premiumLayouts.gridAcademic,
    card: `${premiumCards.academic} ${premiumCards.padding} ${premiumCards.hover}`,
  },

  testimonials: {
    container: `${premiumLayouts.container} ${premiumSpacing.section}`,
    background: 'bg-white',
    card: `${premiumCards.premium} ${premiumCards.padding}`,
    animation: premiumAnimations.staggerContainer,
  },

  cta: {
    container: `${premiumLayouts.containerNarrow} ${premiumSpacing.section}`,
    gradient: premiumGradients.researchGreen,
    textColor: 'text-white',
    button: 'secondary_cta',
  },
}

// Content Quality Standards
export const contentStandards = {
  // Academic writing standards
  readabilityScore: 'Flesch-Kincaid Grade 12-14 (College level)',
  wordCount: {
    headline: '5-8 words',
    subheadline: '10-20 words',
    paragraph: '100-150 words',
    section: '300-500 words',
  },

  // Research integration requirements
  citations: 'Minimum 1 research reference per major claim',
  dataPoints: 'Quantifiable metrics for all success claims',
  credibility: 'Expert author attribution for all content',

  // Visual hierarchy
  headingLevels: 'Maximum 4 levels of hierarchy',
  scanPattern: 'F-pattern optimized for web reading',
  whiteSpace: 'Minimum 40% white space ratio',
}

export default {
  premiumAnimations,
  premiumGradients,
  premiumSpacing,
  premiumTypography,
  premiumCards,
  premiumLayouts,
  premiumInteractions,
  academicColorPalette,
  premiumEffects,
  sectionTemplates,
  contentStandards,
}
