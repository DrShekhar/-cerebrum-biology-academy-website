interface SEOData {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  ogImage?: string
  schema?: any
  hreflang?: Record<string, string>
}

interface CoursePageSEO {
  courseId: string
  className: string
  subject: string
  level: 'beginner' | 'intermediate' | 'advanced'
  targetExam: 'NEET' | 'CBSE' | 'ICSE' | 'IB'
}

export class GlobalSEOService {
  private baseUrl = 'https://cerebrumbiologyacademy.com'

  // Global Biology Keywords for ranking
  private globalKeywords = {
    primary: [
      'biology online coaching',
      'NEET biology preparation',
      'cell biology classes',
      'molecular biology course',
      'human physiology online',
      'botany coaching classes',
      'zoology online course',
      'genetics online learning',
      'biotechnology courses',
      'microbiology classes',
    ],
    international: [
      'biology tuition online',
      'A-level biology coaching',
      'IB biology classes',
      'IGCSE biology course',
      'AP biology preparation',
      'biology exam preparation',
      'online biology teacher',
      'biology homework help',
    ],
    competitive: [
      'NEET biology coaching',
      'medical entrance biology',
      'AIIMS biology preparation',
      'JIPMER biology classes',
      'biology competitive exam',
      'medical college preparation',
    ],
  }

  generateCoursePageSEO(courseData: CoursePageSEO): SEOData {
    const { courseId, className, subject, level, targetExam } = courseData

    const title = `${className} ${subject} Online Classes | Best ${targetExam} Biology Coaching | Cerebrum Academy`
    const description = `🏆 #1 ${className} ${subject} online coaching for ${targetExam}. Expert AIIMS faculty, 94.2% success rate, live classes. Join 10,000+ students. Free demo available!`

    const keywords = [
      `${className} ${subject.toLowerCase()} online classes`,
      `${className} ${subject.toLowerCase()} coaching`,
      `${targetExam} ${subject.toLowerCase()} preparation`,
      `best ${className} ${subject.toLowerCase()} teacher`,
      `${className} ${subject.toLowerCase()} notes pdf`,
      `${className} ${subject.toLowerCase()} mcq practice`,
      `online ${className} ${subject.toLowerCase()} course`,
      `${className} ${subject.toLowerCase()} video lectures`,
      ...this.globalKeywords.primary,
      ...this.globalKeywords.competitive,
    ]

    const schema = this.generateCourseSchema(courseData)

    return {
      title,
      description,
      keywords,
      canonicalUrl: `${this.baseUrl}/courses/${courseId}`,
      ogImage: `/og-images/courses/${courseId}.jpg`,
      schema,
      hreflang: {
        en: `${this.baseUrl}/courses/${courseId}`,
        'en-IN': `${this.baseUrl}/courses/${courseId}`,
        'en-US': `${this.baseUrl}/courses/${courseId}`,
        'en-GB': `${this.baseUrl}/courses/${courseId}`,
      },
    }
  }

  generateTopicPageSEO(topic: string, className: string): SEOData {
    const title = `${topic} - ${className} Biology | Complete Notes, MCQs & Video Lectures | Cerebrum Academy`
    const description = `📚 Master ${topic} in ${className} Biology with expert teaching. Complete notes, practice MCQs, video lectures, and doubt resolution. Join 10,000+ successful students!`

    const keywords = [
      `${topic.toLowerCase()} ${className} biology`,
      `${topic.toLowerCase()} notes ${className}`,
      `${topic.toLowerCase()} mcq questions`,
      `${topic.toLowerCase()} video lecture`,
      `${topic.toLowerCase()} NEET questions`,
      `${topic.toLowerCase()} important questions`,
      `${topic.toLowerCase()} study material`,
      `${topic.toLowerCase()} online classes`,
      `${topic.toLowerCase()} coaching`,
      `${topic.toLowerCase()} biology chapter`,
    ]

    return {
      title,
      description,
      keywords,
      canonicalUrl: `${this.baseUrl}/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`,
      schema: this.generateTopicSchema(topic, className),
    }
  }

  generateLocationPageSEO(city: string, state: string): SEOData {
    const title = `Best Biology Coaching in ${city} | NEET Classes ${city} | Cerebrum Biology Academy`
    const description = `🎯 Top Biology coaching institute in ${city}, ${state}. NEET preparation, expert faculty, 94.2% success rate. Online & offline classes available. Book free demo!`

    const keywords = [
      `biology coaching ${city.toLowerCase()}`,
      `NEET coaching ${city.toLowerCase()}`,
      `biology classes ${city.toLowerCase()}`,
      `best biology teacher ${city.toLowerCase()}`,
      `medical coaching ${city.toLowerCase()}`,
      `biology tuition ${city.toLowerCase()}`,
      `NEET classes ${city.toLowerCase()}`,
      `biology institute ${city.toLowerCase()}`,
      `${city.toLowerCase()} biology coaching`,
      `biology preparation ${city.toLowerCase()}`,
    ]

    return {
      title,
      description,
      keywords,
      canonicalUrl: `${this.baseUrl}/locations/${city.toLowerCase()}`,
      schema: this.generateLocationSchema(city, state),
    }
  }

  generateComparisonPageSEO(competitor: string): SEOData {
    const title = `Cerebrum vs ${competitor} | Which is Better for NEET Biology? | Detailed Comparison 2025`
    const description = `🔥 Honest comparison: Cerebrum Biology Academy vs ${competitor}. Compare fees, success rate, faculty, features. See why 94.2% students choose Cerebrum!`

    const keywords = [
      `cerebrum vs ${competitor.toLowerCase()}`,
      `${competitor.toLowerCase()} vs cerebrum`,
      `best biology coaching comparison`,
      `NEET coaching comparison`,
      `biology online classes comparison`,
      `which is better cerebrum or ${competitor.toLowerCase()}`,
      `${competitor.toLowerCase()} alternative`,
      `better than ${competitor.toLowerCase()}`,
    ]

    return {
      title,
      description,
      keywords,
      canonicalUrl: `${this.baseUrl}/compare/${competitor.toLowerCase()}`,
      schema: this.generateComparisonSchema(competitor),
    }
  }

  generateBlogPostSEO(title: string, excerpt: string, category: string, tags: string[]): SEOData {
    const seoTitle = `${title} | Cerebrum Biology Academy Blog`
    const description = `📖 ${excerpt} Expert insights from AIIMS faculty. Read more biology tips, NEET strategies, and study guides.`

    const keywords = [
      ...tags,
      'biology blog',
      'NEET preparation tips',
      'biology study guide',
      'medical entrance tips',
      'biology learning',
      'study tips biology',
      `${category.toLowerCase()} biology`,
    ]

    return {
      title: seoTitle,
      description,
      keywords,
      canonicalUrl: `${this.baseUrl}/blog/${title.toLowerCase().replace(/\s+/g, '-')}`,
      schema: this.generateBlogSchema(title, excerpt, category),
    }
  }

  private generateCourseSchema(courseData: CoursePageSEO) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `${courseData.className} ${courseData.subject} Online Course`,
      description: `Comprehensive ${courseData.subject} course for ${courseData.className} students preparing for ${courseData.targetExam}`,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
        sameAs: ['https://cerebrumbiologyacademy.com'],
      },
      educationalLevel: courseData.level,
      teaches: `${courseData.className} ${courseData.subject}`,
      courseMode: 'online',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2847',
      },
      offers: {
        '@type': 'Offer',
        category: 'Educational',
        priceCurrency: 'INR',
        price: '75000',
      },
    }
  }

  private generateTopicSchema(topic: string, className: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: `${topic} - ${className} Biology`,
      description: `Complete study material for ${topic} in ${className} Biology`,
      educationalLevel: className,
      teaches: topic,
      learningResourceType: 'Study Guide',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
      },
    }
  }

  private generateLocationSchema(city: string, state: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: `Cerebrum Biology Academy - ${city}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressRegion: state,
        addressCountry: 'India',
      },
      areaServed: city,
      serviceType: 'Biology Coaching',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2847',
      },
    }
  }

  private generateComparisonSchema(competitor: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
      },
      name: `Cerebrum vs ${competitor} Comparison`,
      description: `Detailed comparison between Cerebrum Biology Academy and ${competitor}`,
      author: {
        '@type': 'Organization',
        name: 'Cerebrum Biology Academy',
      },
    }
  }

  private generateBlogSchema(title: string, excerpt: string, category: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: excerpt,
      author: {
        '@type': 'Organization',
        name: 'Cerebrum Biology Academy',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Cerebrum Biology Academy',
      },
      datePublished: new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.baseUrl}/blog/${title.toLowerCase().replace(/\s+/g, '-')}`,
      },
    }
  }

  // Generate comprehensive sitemap
  generateSitemap() {
    const pages = [
      // Main pages
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/courses', priority: '0.9', changefreq: 'weekly' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },

      // Course pages
      { url: '/courses/class-11', priority: '0.9', changefreq: 'weekly' },
      { url: '/courses/class-12', priority: '0.9', changefreq: 'weekly' },
      { url: '/courses/neet-dropper', priority: '0.9', changefreq: 'weekly' },
      { url: '/courses/foundation', priority: '0.9', changefreq: 'weekly' },

      // Location pages (major cities)
      { url: '/locations/delhi', priority: '0.8', changefreq: 'monthly' },
      { url: '/locations/mumbai', priority: '0.8', changefreq: 'monthly' },
      { url: '/locations/bangalore', priority: '0.8', changefreq: 'monthly' },
      { url: '/locations/chennai', priority: '0.8', changefreq: 'monthly' },
      { url: '/locations/kolkata', priority: '0.8', changefreq: 'monthly' },
      { url: '/locations/hyderabad', priority: '0.8', changefreq: 'monthly' },

      // Topic pages
      { url: '/topics/cell-biology', priority: '0.7', changefreq: 'weekly' },
      { url: '/topics/genetics', priority: '0.7', changefreq: 'weekly' },
      { url: '/topics/ecology', priority: '0.7', changefreq: 'weekly' },
      { url: '/topics/human-physiology', priority: '0.7', changefreq: 'weekly' },

      // Comparison pages
      { url: '/compare/allen', priority: '0.7', changefreq: 'monthly' },
      { url: '/compare/aakash', priority: '0.7', changefreq: 'monthly' },
      { url: '/compare/byjus', priority: '0.7', changefreq: 'monthly' },
      { url: '/compare/unacademy', priority: '0.7', changefreq: 'monthly' },
    ]

    return pages
  }

  // Generate robots.txt
  generateRobotsTxt() {
    return `User-agent: *
Allow: /

# Optimize crawl budget
Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Disallow: /_next/
Disallow: /.well-known/

# Important pages
Allow: /courses/
Allow: /topics/
Allow: /locations/
Allow: /blog/
Allow: /compare/

# Sitemap
Sitemap: ${this.baseUrl}/sitemap.xml

# Crawl delay for better server performance
Crawl-delay: 1`
  }
}

export const globalSEOService = new GlobalSEOService()
