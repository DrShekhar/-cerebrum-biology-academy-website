'use client'

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface HrefLangTag {
  hreflang: string
  href: string
  title: string
}

export interface InternationalSEOData {
  title: string
  description: string
  keywords: string[]
  hreflangTags: HrefLangTag[]
  canonicalUrl: string
  openGraphData: OpenGraphData
  structuredData: any
}

export interface OpenGraphData {
  title: string
  description: string
  image: string
  url: string
  locale: string
  alternateLocales: string[]
  siteName: string
  type: string
}

export interface CountrySpecificSEO {
  countryCode: string
  countryName: string
  language: string
  locale: string
  currency: string
  timezone: string
  domain: string
  localKeywords: string[]
  localBusinessSchema: any
}

class GlobalSEOService {
  private static readonly BASE_DOMAIN = 'cerebrumbiologyacademy.com'

  private static readonly COUNTRY_SEO_CONFIG: Record<string, CountrySpecificSEO> = {
    IN: {
      countryCode: 'IN',
      countryName: 'India',
      language: 'en',
      locale: 'en_IN',
      currency: 'INR',
      timezone: 'Asia/Kolkata',
      domain: `cerebrumbiologyacademy.com`,
      localKeywords: [
        'NEET Biology coaching India',
        'AIIMS Biology preparation',
        'Medical entrance Biology classes',
        'NEET Biology coaching Delhi',
        'NEET Biology coaching Kota',
        'Best Biology teacher India',
        'NEET Biology online classes',
        'AIIMS Biology online coaching',
        'Medical Biology entrance coaching',
        'NEET Biology study material',
      ],
      localBusinessSchema: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
        alternateName: 'Cerebrum NEET Biology Coaching',
        url: `https://cerebrumbiologyacademy.com`,
        logo: `https://cerebrumbiologyacademy.com/images/logo.png`,
        description: "India's leading NEET Biology coaching institute with 94.2% success rate",
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
          addressRegion: 'Delhi NCR',
          addressLocality: 'New Delhi',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: CONTACT_INFO.phone.display.hyphenated.primary,
          contactType: 'customer service',
          availableLanguage: ['Hindi', 'English'],
        },
        sameAs: [
          'https://www.facebook.com/cerebrumbiologyacademy',
          'https://www.instagram.com/cerebrumbiologyacademy',
          'https://www.youtube.com/cerebrumbiologyacademy',
        ],
      },
    },

    US: {
      countryCode: 'US',
      countryName: 'United States',
      language: 'en',
      locale: 'en_US',
      currency: 'USD',
      timezone: 'America/New_York',
      domain: `cerebrumbiologyacademy.com/international/usa`,
      localKeywords: [
        'MCAT Biology preparation USA',
        'Medical school Biology tutoring',
        'Pre-med Biology coaching',
        'MCAT Biology section prep',
        'Biology for medical school USA',
        'Indian medical coaching USA',
        'NEET Biology coaching America',
        'Medical entrance Biology USA',
        'Biology tutor for pre-med',
        'MCAT Biology online classes',
      ],
      localBusinessSchema: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy - USA',
        url: `https://cerebrumbiologyacademy.com/international/usa`,
        description:
          'Premier Biology coaching for US medical school aspirants and MCAT preparation',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-123-4567',
          contactType: 'customer service',
          availableLanguage: ['English'],
        },
      },
    },

    UK: {
      countryCode: 'UK',
      countryName: 'United Kingdom',
      language: 'en',
      locale: 'en_GB',
      currency: 'GBP',
      timezone: 'Europe/London',
      domain: `cerebrumbiologyacademy.com/international/uk`,
      localKeywords: [
        'Medical school Biology coaching UK',
        'BMAT Biology preparation',
        'UCAT Biology section prep',
        'UK medical entrance Biology',
        'Biology tutoring for medicine UK',
        'A-level Biology for medicine',
        'Medical Biology coaching London',
        'UK medical school preparation',
        'Biology for UCAS medicine',
        'Medical entrance Biology UK',
      ],
      localBusinessSchema: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy - UK',
        url: `https://cerebrumbiologyacademy.com/international/uk`,
        description: 'Expert Biology coaching for UK medical school admissions and entrance exams',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'GB',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+44-20-7946-0958',
          contactType: 'customer service',
          availableLanguage: ['English'],
        },
      },
    },

    AU: {
      countryCode: 'AU',
      countryName: 'Australia',
      language: 'en',
      locale: 'en_AU',
      currency: 'AUD',
      timezone: 'Australia/Sydney',
      domain: `cerebrumbiologyacademy.com/international/australia`,
      localKeywords: [
        'GAMSAT Biology preparation Australia',
        'Medical school Biology coaching Australia',
        'Biology tutoring for medicine Australia',
        'GAMSAT Section 3 Biology prep',
        'Australian medical entrance Biology',
        'Biology for medical school Australia',
        'GAMSAT Biology online classes',
        'Medical Biology coaching Sydney',
        'Medical Biology coaching Melbourne',
        'Australian medical school prep',
      ],
      localBusinessSchema: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy - Australia',
        url: `https://cerebrumbiologyacademy.com/international/australia`,
        description:
          'Leading Biology coaching for Australian medical school admissions and GAMSAT preparation',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'AU',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+61-2-8123-4567',
          contactType: 'customer service',
          availableLanguage: ['English'],
        },
      },
    },

    CA: {
      countryCode: 'CA',
      countryName: 'Canada',
      language: 'en',
      locale: 'en_CA',
      currency: 'CAD',
      timezone: 'America/Toronto',
      domain: `cerebrumbiologyacademy.com/international/canada`,
      localKeywords: [
        'MCAT Biology preparation Canada',
        'Medical school Biology coaching Canada',
        'Canadian medical entrance Biology',
        'Biology tutoring for medicine Canada',
        'MCAT Biology section Canada',
        'Pre-med Biology coaching Canada',
        'Medical Biology coaching Toronto',
        'Medical Biology coaching Vancouver',
        'Canadian medical school prep',
        'Biology for CaRMS',
      ],
      localBusinessSchema: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy - Canada',
        url: `https://cerebrumbiologyacademy.com/international/canada`,
        description:
          'Expert Biology coaching for Canadian medical school admissions and MCAT preparation',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CA',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-416-123-4567',
          contactType: 'customer service',
          availableLanguage: ['English'],
        },
      },
    },

    AE: {
      countryCode: 'AE',
      countryName: 'United Arab Emirates',
      language: 'en',
      locale: 'en_AE',
      currency: 'AED',
      timezone: 'Asia/Dubai',
      domain: `cerebrumbiologyacademy.com/international/uae`,
      localKeywords: [
        'NEET Biology coaching UAE',
        'Medical entrance Biology Dubai',
        'Biology classes Abu Dhabi',
        'NEET preparation UAE',
        'Medical Biology coaching Dubai',
        'Biology tutoring UAE',
        'NEET Biology online classes UAE',
        'Medical entrance coaching UAE',
        'Biology for medical school UAE',
        'Indian medical coaching UAE',
      ],
      localBusinessSchema: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy - UAE',
        url: `https://cerebrumbiologyacademy.com/international/uae`,
        description:
          'Premier NEET Biology coaching in UAE with offline classes in Dubai and Abu Dhabi',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'AE',
          addressLocality: 'Dubai',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+971-4-123-4567',
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi', 'Arabic'],
        },
      },
    },

    SG: {
      countryCode: 'SG',
      countryName: 'Singapore',
      language: 'en',
      locale: 'en_SG',
      currency: 'SGD',
      timezone: 'Asia/Singapore',
      domain: `cerebrumbiologyacademy.com/international/singapore`,
      localKeywords: [
        'NEET Biology coaching Singapore',
        'Medical entrance Biology Singapore',
        'Biology tutoring Singapore',
        'NEET preparation Singapore',
        'Medical Biology coaching Singapore',
        'Biology classes Singapore',
        'Indian medical coaching Singapore',
        'Biology for medical school Singapore',
        'NEET Biology online classes Singapore',
        'Medical entrance prep Singapore',
      ],
      localBusinessSchema: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy - Singapore',
        url: `https://cerebrumbiologyacademy.com/international/singapore`,
        description: 'Expert NEET Biology coaching in Singapore with hybrid online-offline model',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'SG',
          addressLocality: 'Singapore',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+65-6123-4567',
          contactType: 'customer service',
          availableLanguage: ['English', 'Mandarin'],
        },
      },
    },
  }

  static getCountrySpecificSEO(countryCode: string): CountrySpecificSEO | null {
    return this.COUNTRY_SEO_CONFIG[countryCode.toUpperCase()] || null
  }

  static generateHrefLangTags(currentPath: string): HrefLangTag[] {
    const tags: HrefLangTag[] = []

    // Add hreflang for each supported country
    Object.values(this.COUNTRY_SEO_CONFIG).forEach((country) => {
      const href =
        country.countryCode === 'IN'
          ? `https://cerebrumbiologyacademy.com${currentPath}`
          : `https://${country.domain}${currentPath}`

      tags.push({
        hreflang: country.locale,
        href,
        title: `${country.countryName} - Cerebrum Biology Academy`,
      })
    })

    // Add x-default for international users
    tags.push({
      hreflang: 'x-default',
      href: `https://cerebrumbiologyacademy.com${currentPath}`,
      title: 'Cerebrum Biology Academy - Global',
    })

    return tags
  }

  static generateInternationalSEOData(
    countryCode: string,
    pageType: 'home' | 'courses' | 'contact' | 'about',
    currentPath: string = ''
  ): InternationalSEOData | null {
    const countryConfig = this.getCountrySpecificSEO(countryCode)
    if (!countryConfig) return null

    const hreflangTags = this.generateHrefLangTags(currentPath)

    // Generate country-specific content
    const title = this.generateCountrySpecificTitle(countryConfig, pageType)
    const description = this.generateCountrySpecificDescription(countryConfig, pageType)
    const keywords = this.generateCountrySpecificKeywords(countryConfig, pageType)

    const canonicalUrl =
      countryCode === 'IN'
        ? `https://cerebrumbiologyacademy.com${currentPath}`
        : `https://${countryConfig.domain}${currentPath}`

    return {
      title,
      description,
      keywords,
      hreflangTags,
      canonicalUrl,
      openGraphData: {
        title,
        description,
        image: `https://cerebrumbiologyacademy.com/images/og-${countryCode.toLowerCase()}.jpg`,
        url: canonicalUrl,
        locale: countryConfig.locale,
        alternateLocales: hreflangTags
          .map((tag) => tag.hreflang)
          .filter((lang) => lang !== countryConfig.locale && lang !== 'x-default'),
        siteName: `Cerebrum Biology Academy - ${countryConfig.countryName}`,
        type: 'website',
      },
      structuredData: countryConfig.localBusinessSchema,
    }
  }

  private static generateCountrySpecificTitle(
    config: CountrySpecificSEO,
    pageType: string
  ): string {
    const titleMap: Record<string, Record<string, string>> = {
      IN: {
        home: 'NEET Biology Coaching India | #1 AIIMS Biology Academy | 94.2% Success Rate',
        courses: 'NEET Biology Courses | Best Online & Offline Classes India | Cerebrum Academy',
        contact: 'Contact Cerebrum Biology Academy India | NEET Biology Coaching Admission',
        about: "About Cerebrum Biology Academy | India's Most Trusted NEET Biology Institute",
      },
      US: {
        home: 'MCAT Biology Preparation USA | Medical School Biology Coaching | Cerebrum Academy',
        courses: 'MCAT Biology Courses USA | Pre-Med Biology Classes | Expert Tutoring',
        contact: 'Contact Cerebrum Biology Academy USA | MCAT Biology Coaching Admission',
        about: 'About Cerebrum Biology Academy USA | Premier Medical Biology Coaching',
      },
      UK: {
        home: 'Medical School Biology Coaching UK | BMAT UCAT Preparation | Cerebrum Academy',
        courses: 'Medical Biology Courses UK | BMAT UCAT Biology Classes | Expert Coaching',
        contact: 'Contact Cerebrum Biology Academy UK | Medical School Biology Coaching',
        about: 'About Cerebrum Biology Academy UK | Leading Medical Biology Institute',
      },
      AU: {
        home: 'GAMSAT Biology Preparation Australia | Medical School Coaching | Cerebrum Academy',
        courses: 'GAMSAT Biology Courses Australia | Medical School Biology Classes',
        contact: 'Contact Cerebrum Biology Academy Australia | GAMSAT Biology Coaching',
        about: 'About Cerebrum Biology Academy Australia | Expert Medical Biology Coaching',
      },
      CA: {
        home: 'MCAT Biology Preparation Canada | Medical School Biology Coaching | Cerebrum Academy',
        courses: 'MCAT Biology Courses Canada | Pre-Med Biology Classes | Expert Tutoring',
        contact: 'Contact Cerebrum Biology Academy Canada | MCAT Biology Coaching Admission',
        about: 'About Cerebrum Biology Academy Canada | Premier Medical Biology Institute',
      },
      AE: {
        home: 'NEET Biology Coaching UAE | Dubai Abu Dhabi Medical Entrance Classes | Cerebrum Academy',
        courses: 'NEET Biology Courses UAE | Medical Entrance Classes Dubai | Expert Coaching',
        contact: 'Contact Cerebrum Biology Academy UAE | NEET Biology Coaching Dubai',
        about: 'About Cerebrum Biology Academy UAE | Leading NEET Biology Institute',
      },
      SG: {
        home: 'NEET Biology Coaching Singapore | Medical Entrance Classes | Cerebrum Academy',
        courses: 'NEET Biology Courses Singapore | Medical Entrance Biology Classes',
        contact: 'Contact Cerebrum Biology Academy Singapore | NEET Biology Coaching',
        about: 'About Cerebrum Biology Academy Singapore | Expert NEET Biology Institute',
      },
    }

    return (
      titleMap[config.countryCode]?.[pageType] || `Cerebrum Biology Academy - ${config.countryName}`
    )
  }

  private static generateCountrySpecificDescription(
    config: CountrySpecificSEO,
    pageType: string
  ): string {
    const descriptionMap: Record<string, Record<string, string>> = {
      IN: {
        home: "India's #1 NEET Biology coaching with 94.2% success rate. Expert faculty, personalized teaching, and proven results. Join 10,000+ successful students across Delhi, Kota, Hyderabad & more.",
        courses:
          'Comprehensive NEET Biology courses for Class 11, 12 & Droppers. Live classes, recorded sessions, study materials & mock tests. Choose from foundation, intensive & crash courses.',
        contact:
          'Get in touch with Cerebrum Biology Academy for NEET Biology coaching admission. Call ${CONTACT_INFO.phone.display.hyphenated.primary} or visit our centers across India for course details.',
        about:
          "Cerebrum Biology Academy is India's most trusted NEET Biology institute with 8 years of excellence, expert faculty, and 94.2% success rate in medical entrance exams.",
      },
      US: {
        home: 'Premier MCAT Biology preparation for US medical school aspirants. Expert Indian faculty, flexible timings, and comprehensive curriculum designed for American pre-med students.',
        courses:
          'MCAT Biology courses tailored for US medical schools. Section-wise preparation, practice tests, and personalized coaching to excel in MCAT Biology section.',
        contact:
          'Contact Cerebrum Biology Academy USA for MCAT Biology coaching. Call +1-555-123-4567 or email usa@cerebrumbiologyacademy.com for course information.',
        about:
          'Cerebrum Biology Academy USA provides world-class Biology coaching for American medical school aspirants with 5 years of proven success in MCAT preparation.',
      },
      UK: {
        home: 'Expert Biology coaching for UK medical school admissions. BMAT, UCAT preparation with experienced faculty. Perfect for A-level students pursuing medicine in UK universities.',
        courses:
          'Medical Biology courses for UK universities. BMAT Biology, UCAT preparation, and A-level Biology coaching designed for UK medical school admissions.',
        contact:
          'Contact Cerebrum Biology Academy UK for medical school Biology coaching. Call +44-20-7946-0958 or email uk@cerebrumbiologyacademy.com.',
        about:
          'Cerebrum Biology Academy UK specializes in medical school Biology coaching with 4 years of success helping students secure admission to top UK medical universities.',
      },
      AU: {
        home: 'Leading GAMSAT Biology preparation in Australia. Expert coaching for medical school admissions with personalized study plans and Section 3 mastery.',
        courses:
          'GAMSAT Biology courses for Australian medical schools. Section 3 preparation, practice tests, and comprehensive Biology coaching for GAMSAT success.',
        contact:
          'Contact Cerebrum Biology Academy Australia for GAMSAT Biology coaching. Call +61-2-8123-4567 or email australia@cerebrumbiologyacademy.com.',
        about:
          'Cerebrum Biology Academy Australia provides expert GAMSAT Biology coaching with 3 years of proven success in Australian medical school admissions.',
      },
      CA: {
        home: 'Expert MCAT Biology preparation for Canadian medical schools. Comprehensive coaching with flexible timings designed for Canadian pre-med students.',
        courses:
          'MCAT Biology courses for Canadian medical schools. Section-wise preparation, practice tests, and expert coaching for MCAT Biology success.',
        contact:
          'Contact Cerebrum Biology Academy Canada for MCAT Biology coaching. Call +1-416-123-4567 or email canada@cerebrumbiologyacademy.com.',
        about:
          'Cerebrum Biology Academy Canada specializes in MCAT Biology preparation with 3 years of success helping students enter top Canadian medical schools.',
      },
      AE: {
        home: 'Premier NEET Biology coaching in UAE with offline classes in Dubai & Abu Dhabi. Weekend batches, expert faculty, and proven results for Gulf students.',
        courses:
          'NEET Biology courses in UAE with hybrid online-offline model. Weekend classes in Dubai, expert coaching, and comprehensive study materials.',
        contact:
          'Contact Cerebrum Biology Academy UAE for NEET Biology coaching. Call +971-4-123-4567 or visit our Dubai & Abu Dhabi centers.',
        about:
          'Cerebrum Biology Academy UAE provides excellent NEET Biology coaching with 4 years of success and physical centers in Dubai and Abu Dhabi.',
      },
      SG: {
        home: 'Trusted NEET Biology coaching in Singapore with world-class faculty. Hybrid learning model combining Asian education values with modern teaching.',
        courses:
          'NEET Biology courses in Singapore with flexible timings. Expert coaching, comprehensive curriculum, and personalized attention for success.',
        contact:
          'Contact Cerebrum Biology Academy Singapore for NEET Biology coaching. Call +65-6123-4567 or email singapore@cerebrumbiologyacademy.com.',
        about:
          'Cerebrum Biology Academy Singapore offers premium NEET Biology coaching with 3 years of excellence and 92% success rate.',
      },
    }

    return (
      descriptionMap[config.countryCode]?.[pageType] ||
      `Expert Biology coaching in ${config.countryName} by Cerebrum Biology Academy`
    )
  }

  private static generateCountrySpecificKeywords(
    config: CountrySpecificSEO,
    pageType: string
  ): string[] {
    const baseKeywords = config.localKeywords
    const pageKeywords: Record<string, string[]> = {
      home: [...baseKeywords, 'best', 'top', 'coaching', 'classes', 'online', 'offline'],
      courses: [
        ...baseKeywords,
        'courses',
        'syllabus',
        'curriculum',
        'study material',
        'mock tests',
      ],
      contact: [...baseKeywords, 'contact', 'admission', 'enrollment', 'fees', 'phone number'],
      about: [...baseKeywords, 'about', 'faculty', 'experience', 'success rate', 'testimonials'],
    }

    return pageKeywords[pageType] || baseKeywords
  }

  static generateSitemapEntries(): Array<{
    url: string
    lastModified: string
    changeFrequency: string
    priority: number
    alternates?: Array<{ hreflang: string; href: string }>
  }> {
    const entries: any[] = []
    const lastModified = new Date().toISOString()

    // Main pages for each country
    const pages = ['', '/courses', '/contact', '/about']

    pages.forEach((page) => {
      Object.values(this.COUNTRY_SEO_CONFIG).forEach((country) => {
        const url =
          country.countryCode === 'IN'
            ? `https://cerebrumbiologyacademy.com${page}`
            : `https://${country.domain}${page}`

        const alternates = this.generateHrefLangTags(page).map((tag) => ({
          hreflang: tag.hreflang,
          href: tag.href,
        }))

        entries.push({
          url,
          lastModified,
          changeFrequency: page === '' ? 'daily' : 'weekly',
          priority: page === '' ? 1.0 : 0.8,
          alternates,
        })
      })
    })

    return entries
  }

  static generateRobotsTxt(): string {
    const supportedDomains = Object.values(this.COUNTRY_SEO_CONFIG)
      .map((config) => config.domain)
      .join('\n')

    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://cerebrumbiologyacademy.com/sitemap.xml

# International domains
${supportedDomains
  .split('\n')
  .map((domain) => `Sitemap: https://${domain}/sitemap.xml`)
  .join('\n')}

# Crawl delay
Crawl-delay: 1`
  }
}

export { GlobalSEOService }
