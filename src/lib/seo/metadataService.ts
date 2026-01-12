import { Metadata } from 'next'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { globalSEOService } from './globalSEO'
import { citySpecificSEOService } from './citySpecificSEO'

interface PageType {
  type: 'course' | 'topic' | 'location' | 'comparison' | 'blog' | 'exam' | 'international' | 'home'
  data?: any
}

export class MetadataService {
  private baseUrl = 'https://cerebrumbiologyacademy.com'

  generateMetadata(pageType: PageType): Metadata {
    switch (pageType.type) {
      case 'course':
        return this.generateCourseMetadata(pageType.data)
      case 'topic':
        return this.generateTopicMetadata(pageType.data)
      case 'location':
        return this.generateLocationMetadata(pageType.data)
      case 'comparison':
        return this.generateComparisonMetadata(pageType.data)
      case 'blog':
        return this.generateBlogMetadata(pageType.data)
      case 'exam':
        return this.generateExamMetadata(pageType.data)
      case 'international':
        return this.generateInternationalMetadata(pageType.data)
      case 'home':
        return this.generateHomeMetadata()
      default:
        return this.generateDefaultMetadata()
    }
  }

  private generateCourseMetadata(courseData: any): Metadata {
    const seoData = globalSEOService.generateCoursePageSEO({
      courseId: courseData.id,
      className: courseData.className,
      subject: courseData.subject || 'Biology',
      level: courseData.level,
      targetExam: courseData.targetExam,
    })

    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        languages: seoData.hreflang || {},
      },
      openGraph: {
        title: seoData.title,
        description: seoData.description,
        url: seoData.canonicalUrl,
        siteName: 'Cerebrum Biology Academy',
        images: [
          {
            url: seoData.ogImage || '/og-course-default.jpg',
            width: 1200,
            height: 630,
            alt: seoData.title,
          },
        ],
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.title,
        description: seoData.description,
        images: [seoData.ogImage || '/og-course-default.jpg'],
        creator: '@CerebrumBiology',
      },
      other: {
        'application-ld+json': JSON.stringify(seoData.schema),
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    }
  }

  private generateLocationMetadata(locationData: any): Metadata {
    const cityData = citySpecificSEOService.generateCityLandingPage(locationData.city)
    if (!cityData) return this.generateDefaultMetadata()

    return {
      title: cityData.title,
      description: cityData.description,
      keywords: cityData.keywords,
      openGraph: {
        title: cityData.title,
        description: cityData.description,
        url: cityData.canonicalUrl,
        siteName: 'Cerebrum Biology Academy',
        images: [
          {
            url: `/og-images/locations/${locationData.city.toLowerCase()}.jpg`,
            width: 1200,
            height: 630,
            alt: `Best Biology Coaching in ${locationData.city}`,
          },
        ],
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: cityData.title,
        description: cityData.description,
        images: [`/og-images/locations/${locationData.city.toLowerCase()}.jpg`],
      },
      other: {
        'application-ld+json': JSON.stringify(cityData.customSchema),
      },
    }
  }

  private generateTopicMetadata(topicData: any): Metadata {
    const seoData = globalSEOService.generateTopicPageSEO(topicData.topic, topicData.className)

    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      openGraph: {
        title: seoData.title,
        description: seoData.description,
        url: seoData.canonicalUrl,
        siteName: 'Cerebrum Biology Academy',
        images: [
          {
            url: `/og-images/topics/${topicData.topic.toLowerCase().replace(/\s+/g, '-')}.jpg`,
            width: 1200,
            height: 630,
            alt: `${topicData.topic} - ${topicData.className} Biology`,
          },
        ],
        locale: 'en_IN',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.title,
        description: seoData.description,
      },
      other: {
        'application-ld+json': JSON.stringify(seoData.schema),
      },
    }
  }

  private generateExamMetadata(examData: any): Metadata {
    const examInfo = {
      neet: {
        title: 'NEET Biology Coaching 2025 | Best NEET Biology Classes | Cerebrum Academy',
        description:
          '🏆 #1 NEET Biology coaching with 94.2% success rate. Expert AIIMS faculty, comprehensive study material, live classes. Join 10,000+ NEET qualifiers!',
        keywords: [
          'NEET biology coaching',
          'NEET preparation',
          'medical entrance biology',
          'NEET biology classes',
          'biology coaching for NEET',
        ],
      },
      aiims: {
        title: 'AIIMS Biology Preparation 2025 | Best AIIMS Coaching | Cerebrum Academy',
        description:
          '🎯 Crack AIIMS with our specialized Biology coaching. Expert AIIMS faculty, previous year papers, mock tests. 94.2% success rate!',
        keywords: [
          'AIIMS biology preparation',
          'AIIMS coaching',
          'AIIMS biology classes',
          'medical entrance coaching',
        ],
      },
      'ib-biology': {
        title: 'IB Biology Classes | Best IB Biology Coaching Online | Cerebrum Academy',
        description:
          '🌟 Excel in IB Biology with expert teachers. Complete IB curriculum coverage, IA support, exam preparation. International students welcome!',
        keywords: [
          'IB biology classes',
          'IB biology coaching',
          'international baccalaureate biology',
          'IB biology online',
        ],
      },
    }

    const info = examInfo[examData.exam as keyof typeof examInfo] || examInfo.neet

    return {
      title: info.title,
      description: info.description,
      keywords: info.keywords,
      openGraph: {
        title: info.title,
        description: info.description,
        url: `${this.baseUrl}/exams/${examData.exam}`,
        siteName: 'Cerebrum Biology Academy',
        images: [
          {
            url: `/og-images/exams/${examData.exam}.jpg`,
            width: 1200,
            height: 630,
            alt: info.title,
          },
        ],
        locale: 'en_IN',
        type: 'website',
      },
    }
  }

  private generateInternationalMetadata(countryData: any): Metadata {
    const countryInfo = {
      usa: {
        title: 'Biology Classes for US Students | AP Biology Coaching | Cerebrum Academy',
        description:
          '🇺🇸 Expert Biology coaching for US students. AP Biology, SAT Biology, pre-med preparation. Online classes with US-friendly timings!',
        keywords: [
          'AP biology coaching',
          'US biology classes',
          'SAT biology preparation',
          'pre-med biology',
        ],
      },
      uk: {
        title: 'A-Level Biology Classes UK | Best Biology Coaching Online | Cerebrum Academy',
        description:
          '🇬🇧 Excel in A-Level Biology with expert coaching. Complete syllabus coverage, exam techniques, university preparation. UK students welcome!',
        keywords: [
          'A-level biology coaching',
          'UK biology classes',
          'A-level biology online',
          'biology tutoring UK',
        ],
      },
      canada: {
        title: 'Biology Classes Canada | Pre-Med Biology Coaching | Cerebrum Academy',
        description:
          '🇨🇦 Premium Biology coaching for Canadian students. Pre-med preparation, university biology, MCAT prep. Expert online classes!',
        keywords: [
          'biology classes canada',
          'pre-med biology coaching',
          'MCAT biology preparation',
          'canadian biology tutoring',
        ],
      },
    }

    const info = countryInfo[countryData.country as keyof typeof countryInfo] || countryInfo.usa

    return {
      title: info.title,
      description: info.description,
      keywords: info.keywords,
      openGraph: {
        title: info.title,
        description: info.description,
        url: `${this.baseUrl}/international/${countryData.country}`,
        siteName: 'Cerebrum Biology Academy',
      },
    }
  }

  private generateHomeMetadata(): Metadata {
    return {
      title: 'Cerebrum Biology Academy | Best NEET Biology Coaching Online | #1 Biology Classes',
      description:
        "🏆 India's #1 Biology coaching for NEET. 94.2% success rate, AIIMS faculty, live classes, doubt solving. Join 10,000+ medical college students!",
      keywords: [
        'best biology coaching',
        'NEET biology preparation',
        'online biology classes',
        'biology coaching institute',
        'medical entrance biology',
        'NEET coaching',
        'biology tuition',
        'AIIMS preparation biology',
        'biology online classes',
        'medical college preparation',
      ],
      openGraph: {
        title: 'Cerebrum Biology Academy | Best NEET Biology Coaching Online',
        description:
          "🏆 India's #1 Biology coaching for NEET. 94.2% success rate, AIIMS faculty, live classes, doubt solving.",
        url: this.baseUrl,
        siteName: 'Cerebrum Biology Academy',
        images: [
          {
            url: '/og-home.jpg',
            width: 1200,
            height: 630,
            alt: 'Cerebrum Biology Academy - Best NEET Biology Coaching',
          },
        ],
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Cerebrum Biology Academy | Best NEET Biology Coaching',
        description:
          "🏆 India's #1 Biology coaching for NEET. 94.2% success rate, AIIMS faculty, live classes.",
        images: ['/og-home.jpg'],
        creator: '@CerebrumBiology',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    }
  }

  private generateComparisonMetadata(comparisonData: any): Metadata {
    const seoData = globalSEOService.generateComparisonPageSEO(comparisonData.competitor)

    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      openGraph: {
        title: seoData.title,
        description: seoData.description,
        url: seoData.canonicalUrl,
        siteName: 'Cerebrum Biology Academy',
      },
    }
  }

  private generateBlogMetadata(blogData: any): Metadata {
    const seoData = globalSEOService.generateBlogPostSEO(
      blogData.title,
      blogData.excerpt,
      blogData.category,
      blogData.tags
    )

    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      openGraph: {
        title: seoData.title,
        description: seoData.description,
        url: seoData.canonicalUrl,
        siteName: 'Cerebrum Biology Academy',
        type: 'article',
      },
      other: {
        'application-ld+json': JSON.stringify(seoData.schema),
      },
    }
  }

  private generateDefaultMetadata(): Metadata {
    return {
      title: 'Cerebrum Biology Academy | Expert Biology Coaching',
      description:
        'Premium Biology coaching for medical entrance exams. Expert faculty, comprehensive study material, proven results.',
    }
  }

  // Helper method to generate hreflang tags for international SEO
  generateHreflangTags(basePath: string) {
    return {
      en: `${this.baseUrl}${basePath}`,
      'en-IN': `${this.baseUrl}${basePath}`,
      'en-US': `${this.baseUrl}/international/usa${basePath}`,
      'en-GB': `${this.baseUrl}/international/uk${basePath}`,
      'en-CA': `${this.baseUrl}/international/canada${basePath}`,
      'en-AU': `${this.baseUrl}/international/australia${basePath}`,
      'en-AE': `${this.baseUrl}/international/uae${basePath}`,
      'en-SG': `${this.baseUrl}/international/singapore${basePath}`,
    }
  }

  // Generate structured data for organization
  generateOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      alternateName: ['Cerebrum Academy', 'Best Biology Coaching'],
      url: this.baseUrl,
      logo: `${this.baseUrl}/logo.png`,
      description: "India's premier Biology coaching institute for NEET and medical entrance exams",
      telephone: CONTACT_INFO.phone.display.hyphenated.primary,
      email: 'info@cerebrumbiologyacademy.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'India',
        addressRegion: 'All India',
      },
      sameAs: [
        'https://www.facebook.com/cerebrumbiologyacademy',
        'https://www.instagram.com/cerebrumbiologyacademy',
        'https://www.youtube.com/cerebrumbiologyacademy',
        'https://twitter.com/cerebrumbiology',
        'https://www.linkedin.com/company/cerebrumbiologyacademy',
      ],
      foundingDate: '2020',
      areaServed: [
        'India',
        'United States',
        'United Kingdom',
        'Canada',
        'Australia',
        'United Arab Emirates',
        'Singapore',
      ],
      serviceType: [
        'Biology Coaching',
        'NEET Preparation',
        'Medical Entrance Coaching',
        'Online Education',
        'Biology Tutoring',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2847',
        bestRating: '5',
      },
    }
  }
}

export const metadataService = new MetadataService()
