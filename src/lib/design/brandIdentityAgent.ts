// 🎨 CEREBRUM BIOLOGY ACADEMY - BRAND IDENTITY & LOGO DESIGN AGENT
// Harvard-Level Visual Identity System

export interface BrandIdentityAgent {
  generateLogo(variant: LogoVariant): LogoDesign
  createIconSet(category: IconCategory): IconSet
  designBadges(type: BadgeType): BadgeDesign
  generateBrandAssets(application: BrandApplication): BrandAsset[]
}

// Logo Design Variants
export type LogoVariant =
  | 'primary' // Main horizontal logo
  | 'stacked' // Vertical stack version
  | 'icon-only' // Symbol only
  | 'text-only' // Wordmark only
  | 'monochrome' // Single color version
  | 'inverse' // White/light backgrounds
  | 'academic' // Formal institutional style
  | 'simplified' // Minimal version for small sizes

// Icon Categories
export type IconCategory =
  | 'biology' // DNA, cell, microscope, etc.
  | 'academic' // Books, graduation, research
  | 'medical' // Stethoscope, heart, brain
  | 'ui-elements' // Navigation, actions, status
  | 'achievements' // Awards, trophies, badges
  | 'interactive' // Play, pause, zoom, rotate

// Badge Types
export type BadgeType =
  | 'certification' // Course completion badges
  | 'achievement' // Milestone rewards
  | 'quality' // Trust indicators
  | 'faculty' // Credentials and expertise
  | 'accreditation' // Institutional approvals

// Brand Applications
export type BrandApplication =
  | 'website' // Digital platforms
  | 'mobile-app' // Mobile applications
  | 'print-materials' // Brochures, certificates
  | 'merchandise' // Branded items
  | 'social-media' // Profile pictures, covers
  | 'presentations' // Academic presentations

// Harvard-Level Brand Identity System
export class CerebrumBrandIdentityAgent implements BrandIdentityAgent {
  // Brand DNA - Core Identity Elements
  private readonly brandDNA = {
    mission: 'Democratize quality NEET preparation through Harvard-level education',
    vision: "India's most trusted and innovative medical entrance coaching",
    values: ['Academic Excellence', 'Scientific Rigor', 'Student Success', 'Innovation'],
    personality: ['Authoritative', 'Trustworthy', 'Innovative', 'Accessible', 'Premium'],
    voice: ['Professional', 'Encouraging', 'Evidence-based', 'Clear', 'Inspiring'],
  }

  // Harvard-Inspired Color Palette
  private readonly colorPalette = {
    primary: {
      cerebrumBlue: '#1E40AF', // Primary brand color
      academicNavy: '#1E3A8A', // Deep authority
      scholarBlue: '#3B82F6', // Modern academic
      trustIndigo: '#4F46E5', // Reliability
    },
    secondary: {
      harvardCrimson: '#A41E22', // Academic tradition
      successGreen: '#10B981', // Achievement
      innovationPurple: '#8B5CF6', // Future-forward
      excellenceGold: '#F59E0B', // Awards & recognition
    },
    neutral: {
      academicGray: '#374151', // Professional text
      scholarGray: '#6B7280', // Supporting text
      lightGray: '#E5E7EB', // Subtle backgrounds
      paperWhite: '#FEFEFE', // Clean backgrounds
    },
    gradients: {
      primary: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
      premium: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      excellence: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)',
    },
  }

  // Logo Design Generator
  generateLogo(variant: LogoVariant): LogoDesign {
    const logoSpecs: LogoDesign = {
      variant,
      specifications: this.getLogoSpecs(variant),
      svgCode: this.generateLogoSVG(variant),
      usage: this.getLogoUsage(variant),
      dimensions: this.getLogoDimensions(variant),
      colorVariations: this.getLogoColorVariations(variant),
    }

    return logoSpecs
  }

  // Primary Logo SVG Generator
  private generateLogoSVG(variant: LogoVariant): string {
    switch (variant) {
      case 'primary':
        return this.generatePrimaryLogo()
      case 'stacked':
        return this.generateStackedLogo()
      case 'icon-only':
        return this.generateIconOnlyLogo()
      case 'academic':
        return this.generateAcademicLogo()
      default:
        return this.generatePrimaryLogo()
    }
  }

  // Primary Horizontal Logo
  private generatePrimaryLogo(): string {
    return `
      <svg width="320" height="80" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cerebrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#1E40AF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="academyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
          </linearGradient>
        </defs>

        <!-- DNA Helix Symbol -->
        <g transform="translate(10, 15)">
          <!-- Outer helix strand -->
          <path d="M0,25 Q12.5,0 25,25 Q37.5,50 50,25"
                stroke="url(#cerebrumGradient)"
                stroke-width="3"
                fill="none"
                opacity="0.8"/>

          <!-- Inner helix strand -->
          <path d="M0,25 Q12.5,50 25,25 Q37.5,0 50,25"
                stroke="url(#academyGradient)"
                stroke-width="3"
                fill="none"
                opacity="0.8"/>

          <!-- Base pairs -->
          <circle cx="12.5" cy="25" r="2" fill="#1E40AF"/>
          <circle cx="37.5" cy="25" r="2" fill="#8B5CF6"/>

          <!-- Connecting lines -->
          <line x1="12.5" y1="18" x2="12.5" y2="32" stroke="#1E40AF" stroke-width="1" opacity="0.6"/>
          <line x1="37.5" y1="18" x2="37.5" y2="32" stroke="#8B5CF6" stroke-width="1" opacity="0.6"/>
        </g>

        <!-- Text: CEREBRUM -->
        <text x="80" y="35"
              font-family="Inter, sans-serif"
              font-size="24"
              font-weight="700"
              fill="url(#cerebrumGradient)"
              letter-spacing="-0.02em">
          CEREBRUM
        </text>

        <!-- Text: BIOLOGY ACADEMY -->
        <text x="80" y="55"
              font-family="Inter, sans-serif"
              font-size="14"
              font-weight="600"
              fill="#6B7280"
              letter-spacing="0.05em">
          BIOLOGY ACADEMY
        </text>

        <!-- Tagline -->
        <text x="80" y="70"
              font-family="Inter, sans-serif"
              font-size="10"
              font-weight="500"
              fill="#9CA3AF"
              letter-spacing="0.02em">
          Harvard-Level NEET Preparation
        </text>
      </svg>
    `
  }

  // Stacked Vertical Logo
  private generateStackedLogo(): string {
    return `
      <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cerebrumStackedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#1E40AF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
          </linearGradient>
        </defs>

        <!-- Centered DNA Helix Symbol -->
        <g transform="translate(75, 20)">
          <path d="M0,25 Q12.5,0 25,25 Q37.5,50 50,25"
                stroke="url(#cerebrumStackedGradient)"
                stroke-width="4"
                fill="none"/>
          <path d="M0,25 Q12.5,50 25,25 Q37.5,0 50,25"
                stroke="#8B5CF6"
                stroke-width="4"
                fill="none"/>
          <circle cx="12.5" cy="25" r="3" fill="#1E40AF"/>
          <circle cx="37.5" cy="25" r="3" fill="#8B5CF6"/>
        </g>

        <!-- Centered Text -->
        <text x="100" y="100"
              text-anchor="middle"
              font-family="Inter, sans-serif"
              font-size="20"
              font-weight="700"
              fill="url(#cerebrumStackedGradient)">
          CEREBRUM
        </text>

        <text x="100" y="120"
              text-anchor="middle"
              font-family="Inter, sans-serif"
              font-size="12"
              font-weight="600"
              fill="#6B7280">
          BIOLOGY ACADEMY
        </text>

        <text x="100" y="135"
              text-anchor="middle"
              font-family="Inter, sans-serif"
              font-size="9"
              font-weight="500"
              fill="#9CA3AF">
          Harvard-Level NEET Preparation
        </text>
      </svg>
    `
  }

  // Icon-Only Logo
  private generateIconOnlyLogo(): string {
    return `
      <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1E40AF;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#1E40AF" flood-opacity="0.3"/>
          </filter>
        </defs>

        <!-- Background circle -->
        <circle cx="30" cy="30" r="28" fill="url(#iconGradient)" filter="url(#shadow)"/>

        <!-- DNA Helix (centered and larger) -->
        <g transform="translate(15, 17.5)">
          <path d="M0,12.5 Q7.5,0 15,12.5 Q22.5,25 30,12.5"
                stroke="white"
                stroke-width="3"
                fill="none"
                opacity="0.9"/>
          <path d="M0,12.5 Q7.5,25 15,12.5 Q22.5,0 30,12.5"
                stroke="white"
                stroke-width="3"
                fill="none"
                opacity="0.7"/>

          <!-- Enhanced base pairs -->
          <circle cx="7.5" cy="12.5" r="2.5" fill="white" opacity="0.9"/>
          <circle cx="22.5" cy="12.5" r="2.5" fill="white" opacity="0.9"/>

          <!-- Connecting bonds -->
          <line x1="7.5" y1="8" x2="7.5" y2="17" stroke="white" stroke-width="1.5" opacity="0.6"/>
          <line x1="22.5" y1="8" x2="22.5" y2="17" stroke="white" stroke-width="1.5" opacity="0.6"/>
        </g>
      </svg>
    `
  }

  // Academic Formal Logo
  private generateAcademicLogo(): string {
    return `
      <svg width="350" height="100" viewBox="0 0 350 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Academic shield background -->
        <path d="M20,20 L70,20 Q75,20 75,25 L75,65 Q75,75 65,80 L45,85 L25,80 Q20,75 20,65 Z"
              fill="#1E40AF"
              stroke="#2563EB"
              stroke-width="1"/>

        <!-- DNA symbol in shield -->
        <g transform="translate(30, 35)">
          <path d="M0,15 Q7.5,5 15,15 Q22.5,25 30,15" stroke="white" stroke-width="2" fill="none"/>
          <path d="M0,15 Q7.5,25 15,15 Q22.5,5 30,15" stroke="#FCD34D" stroke-width="2" fill="none"/>
          <circle cx="7.5" cy="15" r="1.5" fill="white"/>
          <circle cx="22.5" cy="15" r="1.5" fill="#FCD34D"/>
        </g>

        <!-- Academic typography -->
        <text x="95" y="40"
              font-family="Georgia, serif"
              font-size="26"
              font-weight="700"
              fill="#1E40AF">
          CEREBRUM
        </text>

        <text x="95" y="60"
              font-family="Georgia, serif"
              font-size="16"
              font-weight="600"
              fill="#374151">
          BIOLOGY ACADEMY
        </text>

        <text x="95" y="75"
              font-family="Georgia, serif"
              font-size="11"
              font-weight="400"
              fill="#6B7280"
              font-style="italic">
          Est. 2015 • Harvard-Level Excellence
        </text>

        <!-- Academic decorative elements -->
        <line x1="95" y1="45" x2="320" y2="45" stroke="#E5E7EB" stroke-width="1"/>
        <circle cx="325" cy="45" r="2" fill="#1E40AF"/>
      </svg>
    `
  }

  // Icon Set Generator
  createIconSet(category: IconCategory): IconSet {
    const icons: Record<string, string> = {}

    switch (category) {
      case 'biology':
        icons['dna'] = this.generateDNAIcon()
        icons['cell'] = this.generateCellIcon()
        icons['microscope'] = this.generateMicroscopeIcon()
        icons['molecule'] = this.generateMoleculeIcon()
        icons['chromosome'] = this.generateChromosomeIcon()
        break

      case 'academic':
        icons['graduation-cap'] = this.generateGraduationCapIcon()
        icons['diploma'] = this.generateDiplomaIcon()
        icons['research'] = this.generateResearchIcon()
        icons['library'] = this.generateLibraryIcon()
        icons['academic-award'] = this.generateAcademicAwardIcon()
        break

      case 'medical':
        icons['heart'] = this.generateHeartIcon()
        icons['brain'] = this.generateBrainIcon()
        icons['stethoscope'] = this.generateStethoscopeIcon()
        icons['medical-cross'] = this.generateMedicalCrossIcon()
        icons['pulse'] = this.generatePulseIcon()
        break

      case 'achievements':
        icons['trophy'] = this.generateTrophyIcon()
        icons['medal'] = this.generateMedalIcon()
        icons['star-achievement'] = this.generateStarAchievementIcon()
        icons['badge'] = this.generateBadgeIcon()
        icons['crown'] = this.generateCrownIcon()
        break
    }

    return {
      category,
      icons,
      usage: this.getIconUsage(category),
      specifications: this.getIconSpecifications(),
    }
  }

  // DNA Icon Generator
  private generateDNAIcon(): string {
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1E40AF"/>
            <stop offset="100%" style="stop-color:#3B82F6"/>
          </linearGradient>
        </defs>
        <path d="M6,4 Q12,2 18,4 Q12,6 6,8 Q12,10 18,12 Q12,14 6,16 Q12,18 18,20"
              stroke="url(#dnaGradient)"
              stroke-width="2"
              fill="none"/>
        <path d="M6,4 Q12,6 18,4 Q12,2 6,8 Q12,6 18,12 Q12,10 6,16 Q12,14 18,20"
              stroke="#8B5CF6"
              stroke-width="2"
              fill="none"
              opacity="0.7"/>
        <circle cx="9" cy="6" r="1.5" fill="#1E40AF"/>
        <circle cx="15" cy="6" r="1.5" fill="#8B5CF6"/>
        <circle cx="9" cy="12" r="1.5" fill="#1E40AF"/>
        <circle cx="15" cy="12" r="1.5" fill="#8B5CF6"/>
        <circle cx="9" cy="18" r="1.5" fill="#1E40AF"/>
        <circle cx="15" cy="18" r="1.5" fill="#8B5CF6"/>
      </svg>
    `
  }

  // Trophy Achievement Icon
  private generateTrophyIcon(): string {
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#F59E0B"/>
            <stop offset="100%" style="stop-color:#FCD34D"/>
          </linearGradient>
        </defs>
        <!-- Trophy cup -->
        <path d="M8,2 L16,2 Q18,2 18,4 L18,8 Q18,12 14,14 L14,16 L16,16 Q17,16 17,17 L17,19 Q17,20 16,20 L8,20 Q7,20 7,19 L7,17 Q7,16 8,16 L10,16 L10,14 Q6,12 6,8 L6,4 Q6,2 8,2 Z"
              fill="url(#trophyGradient)"/>
        <!-- Trophy handles -->
        <path d="M6,6 Q4,6 4,8 Q4,10 6,10" stroke="#F59E0B" stroke-width="2" fill="none"/>
        <path d="M18,6 Q20,6 20,8 Q20,10 18,10" stroke="#F59E0B" stroke-width="2" fill="none"/>
        <!-- Trophy base -->
        <rect x="7" y="18" width="10" height="2" fill="#D97706" rx="1"/>
      </svg>
    `
  }

  // Badge Design Generator
  designBadges(type: BadgeType): BadgeDesign {
    const badgeSpecs: BadgeDesign = {
      type,
      variations: this.getBadgeVariations(type),
      specifications: this.getBadgeSpecifications(),
      usage: this.getBadgeUsage(type),
    }

    return badgeSpecs
  }

  // Helper methods for specifications
  private getLogoSpecs(variant: LogoVariant): LogoSpecifications {
    return {
      minSize: variant === 'icon-only' ? '16px' : '120px',
      maxSize: variant === 'academic' ? '400px' : '320px',
      clearSpace: '1x logo height',
      fileFormats: ['SVG', 'PNG', 'JPG', 'PDF'],
      colorModes: ['Full Color', 'Monochrome', 'Inverse'],
      backgrounds: ['Light', 'Dark', 'Branded'],
    }
  }

  private getLogoUsage(variant: LogoVariant): LogoUsage {
    const usageMap: Record<LogoVariant, string[]> = {
      primary: ['Website headers', 'Business cards', 'Letterheads'],
      stacked: ['Social media profiles', 'App icons', 'Vertical layouts'],
      'icon-only': ['Favicons', 'App icons', 'Small applications'],
      'text-only': ['Wordmark applications', 'Text-heavy designs'],
      monochrome: ['Single-color applications', 'Embossing', 'Watermarks'],
      inverse: ['Dark backgrounds', 'Photography overlays'],
      academic: ['Certificates', 'Academic publications', 'Formal documents'],
      simplified: ['Small sizes', 'Embroidery', 'Low-resolution media'],
    }

    return {
      recommended: usageMap[variant] || [],
      restrictions: ['Do not stretch or distort', 'Maintain minimum size', 'Preserve clear space'],
      backgrounds: variant === 'inverse' ? ['Dark only'] : ['Light recommended'],
    }
  }

  private getLogoDimensions(variant: LogoVariant): LogoDimensions {
    const dimensionMap: Record<LogoVariant, { width: number; height: number; ratio: string }> = {
      primary: { width: 320, height: 80, ratio: '4:1' },
      stacked: { width: 200, height: 150, ratio: '4:3' },
      'icon-only': { width: 60, height: 60, ratio: '1:1' },
      'text-only': { width: 240, height: 40, ratio: '6:1' },
      monochrome: { width: 320, height: 80, ratio: '4:1' },
      inverse: { width: 320, height: 80, ratio: '4:1' },
      academic: { width: 350, height: 100, ratio: '3.5:1' },
      simplified: { width: 160, height: 40, ratio: '4:1' },
    }

    return dimensionMap[variant] || dimensionMap['primary']
  }

  private getLogoColorVariations(variant: LogoVariant): ColorVariation[] {
    return [
      {
        name: 'Primary',
        description: 'Full color with gradients',
        colors: ['#1E40AF', '#3B82F6', '#8B5CF6'],
        usage: 'Primary applications on light backgrounds',
      },
      {
        name: 'Monochrome Blue',
        description: 'Single color blue',
        colors: ['#1E40AF'],
        usage: 'Single color printing, embossing',
      },
      {
        name: 'White/Inverse',
        description: 'White version for dark backgrounds',
        colors: ['#FFFFFF'],
        usage: 'Dark backgrounds, photography overlays',
      },
      {
        name: 'Black',
        description: 'Black version',
        colors: ['#000000'],
        usage: 'Single color printing, fax, black and white',
      },
    ]
  }

  private getIconUsage(category: IconCategory): IconUsage {
    return {
      category,
      contexts: ['UI elements', 'Marketing materials', 'Educational content'],
      sizes: ['16px', '24px', '32px', '48px', '64px'],
      formats: ['SVG', 'PNG', 'Icon Font'],
      styling: 'Consistent with brand visual language',
    }
  }

  private getIconSpecifications(): IconSpecifications {
    return {
      gridSize: '24x24px',
      strokeWidth: '2px',
      cornerRadius: '2px',
      colorPalette: ['#1E40AF', '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'],
      exportFormats: ['SVG', 'PNG @1x @2x @3x'],
      naming: 'kebab-case-naming',
    }
  }

  private getBadgeVariations(type: BadgeType): BadgeVariation[] {
    return [
      {
        name: 'Achievement Gold',
        colors: ['#F59E0B', '#FCD34D'],
        usage: 'Top performance recognition',
      },
      {
        name: 'Excellence Silver',
        colors: ['#6B7280', '#D1D5DB'],
        usage: 'High achievement recognition',
      },
      {
        name: 'Progress Bronze',
        colors: ['#D97706', '#F3E8FF'],
        usage: 'Milestone completion',
      },
    ]
  }

  private getBadgeSpecifications(): BadgeSpecifications {
    return {
      baseSize: '80x80px',
      formats: ['SVG', 'PNG'],
      animations: 'CSS animations for digital use',
      typography: 'Inter font family',
      hierarchy: 'Icon -> Title -> Subtitle',
    }
  }

  private getBadgeUsage(type: BadgeType): BadgeUsage {
    return {
      type,
      applications: ['Student profiles', 'Certificates', 'Marketing materials'],
      contexts: ['Achievement systems', 'Course completion', 'Quality indicators'],
      restrictions: ['Maintain aspect ratio', 'Use approved colors only'],
    }
  }

  // Additional icon generators (truncated for brevity)
  private generateCellIcon(): string {
    return `<!-- Cell icon SVG -->`
  }
  private generateMicroscopeIcon(): string {
    return `<!-- Microscope icon SVG -->`
  }
  private generateMoleculeIcon(): string {
    return `<!-- Molecule icon SVG -->`
  }
  private generateChromosomeIcon(): string {
    return `<!-- Chromosome icon SVG -->`
  }
  private generateGraduationCapIcon(): string {
    return `<!-- Graduation cap icon SVG -->`
  }
  private generateDiplomaIcon(): string {
    return `<!-- Diploma icon SVG -->`
  }
  private generateResearchIcon(): string {
    return `<!-- Research icon SVG -->`
  }
  private generateLibraryIcon(): string {
    return `<!-- Library icon SVG -->`
  }
  private generateAcademicAwardIcon(): string {
    return `<!-- Academic award icon SVG -->`
  }
  private generateHeartIcon(): string {
    return `<!-- Heart icon SVG -->`
  }
  private generateBrainIcon(): string {
    return `<!-- Brain icon SVG -->`
  }
  private generateStethoscopeIcon(): string {
    return `<!-- Stethoscope icon SVG -->`
  }
  private generateMedicalCrossIcon(): string {
    return `<!-- Medical cross icon SVG -->`
  }
  private generatePulseIcon(): string {
    return `<!-- Pulse icon SVG -->`
  }
  private generateMedalIcon(): string {
    return `<!-- Medal icon SVG -->`
  }
  private generateStarAchievementIcon(): string {
    return `<!-- Star achievement icon SVG -->`
  }
  private generateBadgeIcon(): string {
    return `<!-- Badge icon SVG -->`
  }
  private generateCrownIcon(): string {
    return `<!-- Crown icon SVG -->`
  }

  // Generate Brand Assets Implementation
  generateBrandAssets(application: BrandApplication): BrandAsset[] {
    const assets: BrandAsset[] = []

    switch (application) {
      case 'website':
        assets.push({
          name: 'Website Logo Pack',
          category: 'Digital Assets',
          files: [
            {
              format: 'SVG',
              size: 'Vector',
              url: '/assets/logo-primary.svg',
              description: 'Primary logo for headers',
            },
            {
              format: 'PNG',
              size: '512x128px',
              url: '/assets/logo-primary@2x.png',
              description: 'High-res logo for retina displays',
            },
            {
              format: 'ICO',
              size: '32x32px',
              url: '/assets/favicon.ico',
              description: 'Favicon for browsers',
            },
          ],
          usage: 'Website headers, navigation, and branding',
          specifications: { format: 'SVG preferred', minSize: '120px', maxSize: '400px' },
        })
        break

      case 'mobile-app':
        assets.push({
          name: 'Mobile App Icons',
          category: 'App Assets',
          files: [
            {
              format: 'PNG',
              size: '1024x1024px',
              url: '/assets/app-icon-ios.png',
              description: 'iOS app icon',
            },
            {
              format: 'PNG',
              size: '512x512px',
              url: '/assets/app-icon-android.png',
              description: 'Android app icon',
            },
            {
              format: 'SVG',
              size: 'Vector',
              url: '/assets/app-icon-adaptive.svg',
              description: 'Adaptive icon for Android',
            },
          ],
          usage: 'Mobile application icons and splash screens',
          specifications: { format: 'PNG/SVG', cornerRadius: '22%', padding: '10%' },
        })
        break

      case 'print-materials':
        assets.push({
          name: 'Print Materials Pack',
          category: 'Print Assets',
          files: [
            {
              format: 'PDF',
              size: 'Vector',
              url: '/assets/logo-print.pdf',
              description: 'High-resolution logo for print',
            },
            {
              format: 'EPS',
              size: 'Vector',
              url: '/assets/logo-print.eps',
              description: 'Vector logo for professional printing',
            },
            {
              format: 'PNG',
              size: '3000x750px',
              url: '/assets/logo-print-300dpi.png',
              description: '300 DPI raster logo',
            },
          ],
          usage: 'Brochures, certificates, business cards',
          specifications: {
            format: 'Vector preferred',
            resolution: '300 DPI minimum',
            colorSpace: 'CMYK',
          },
        })
        break

      case 'social-media':
        assets.push({
          name: 'Social Media Kit',
          category: 'Social Assets',
          files: [
            {
              format: 'PNG',
              size: '1200x630px',
              url: '/assets/social-cover-facebook.png',
              description: 'Facebook cover image',
            },
            {
              format: 'PNG',
              size: '1500x500px',
              url: '/assets/social-cover-twitter.png',
              description: 'Twitter header image',
            },
            {
              format: 'PNG',
              size: '400x400px',
              url: '/assets/social-profile.png',
              description: 'Profile picture',
            },
          ],
          usage: 'Social media profiles, covers, and posts',
          specifications: {
            format: 'PNG/JPG',
            colorSpace: 'RGB',
            compression: 'Optimized for web',
          },
        })
        break

      default:
        assets.push({
          name: 'Basic Brand Package',
          category: 'General Assets',
          files: [
            {
              format: 'SVG',
              size: 'Vector',
              url: '/assets/logo-primary.svg',
              description: 'Primary brand logo',
            },
            {
              format: 'PNG',
              size: '512x128px',
              url: '/assets/logo-primary.png',
              description: 'Raster logo',
            },
          ],
          usage: 'General branding applications',
          specifications: { format: 'SVG/PNG', usage: 'Maintain clear space and minimum size' },
        })
    }

    return assets
  }
}

// Type definitions
export interface LogoDesign {
  variant: LogoVariant
  specifications: LogoSpecifications
  svgCode: string
  usage: LogoUsage
  dimensions: LogoDimensions
  colorVariations: ColorVariation[]
}

export interface LogoSpecifications {
  minSize: string
  maxSize: string
  clearSpace: string
  fileFormats: string[]
  colorModes: string[]
  backgrounds: string[]
}

export interface LogoUsage {
  recommended: string[]
  restrictions: string[]
  backgrounds: string[]
}

export interface LogoDimensions {
  width: number
  height: number
  ratio: string
}

export interface ColorVariation {
  name: string
  description: string
  colors: string[]
  usage: string
}

export interface IconSet {
  category: IconCategory
  icons: Record<string, string>
  usage: IconUsage
  specifications: IconSpecifications
}

export interface IconUsage {
  category: IconCategory
  contexts: string[]
  sizes: string[]
  formats: string[]
  styling: string
}

export interface IconSpecifications {
  gridSize: string
  strokeWidth: string
  cornerRadius: string
  colorPalette: string[]
  exportFormats: string[]
  naming: string
}

export interface BadgeDesign {
  type: BadgeType
  variations: BadgeVariation[]
  specifications: BadgeSpecifications
  usage: BadgeUsage
}

export interface BadgeVariation {
  name: string
  colors: string[]
  usage: string
}

export interface BadgeSpecifications {
  baseSize: string
  formats: string[]
  animations: string
  typography: string
  hierarchy: string
}

export interface BadgeUsage {
  type: BadgeType
  applications: string[]
  contexts: string[]
  restrictions: string[]
}

export interface BrandAsset {
  name: string
  category: string
  files: BrandAssetFile[]
  usage: string
  specifications: Record<string, any>
}

export interface BrandAssetFile {
  format: string
  size: string
  url: string
  description: string
}

// Export the brand identity agent
export const cerebrumBrandAgent = new CerebrumBrandIdentityAgent()
