'use client'

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface CountryContent {
  code: string
  name: string
  currency: string
  timezone: string
  heroMessage: string
  value_proposition: string
  localOffers: string[]
  testimonials: CountryTestimonial[]
  contactInfo: CountryContactInfo
  socialProof: SocialProof
  paymentMethods: string[]
  languageSupport: string[]
  courseTiming: string
  localPartnerships?: string[]
  culturalAdaptations?: CulturalAdaptation[]
}

export interface CountryTestimonial {
  name: string
  location: string
  course: string
  score: string
  message: string
  image?: string
  university?: string
  year: number
}

export interface CountryContactInfo {
  phone: string
  email: string
  whatsapp: string
  address: string
  hours: string
  preferredContact: string
  timezone: string
}

export interface SocialProof {
  totalStudents: number
  successRate: string
  averageScore: string
  topUniversities: string[]
  yearsOfExperience: number
}

export interface CulturalAdaptation {
  aspect: string
  description: string
  implementation: string
}

class CountryContentService {
  private static readonly COUNTRY_DATA: Record<string, CountryContent> = {
    // India
    IN: {
      code: 'IN',
      name: 'India',
      currency: 'INR',
      timezone: 'Asia/Kolkata',
      heroMessage: "India's #1 NEET Biology Academy - Join 10,000+ successful students nationwide!",
      value_proposition:
        "Excel in NEET Biology with India's most trusted coaching. 98% success rate with personalized mentorship.",
      localOffers: [
        'EMI starting at ₹2,500/month',
        'Free home visit for course counseling',
        'Scholarship for economically weaker sections',
        'Free printed study material (worth ₹5,000)',
        'Special coaching hub discounts in Kota, Delhi, Hyderabad',
      ],
      testimonials: [
        {
          name: 'Priya Sharma',
          location: 'Delhi',
          course: 'NEET Dropper Program',
          score: 'NEET 2024: 680/720',
          message:
            'Cerebrums biology program helped me crack NEET in my second attempt. The teaching methodology is outstanding!',
          university: 'AIIMS Delhi',
          year: 2024,
        },
        {
          name: 'Arjun Patel',
          location: 'Ahmedabad',
          course: 'Class 12th Intensive',
          score: 'NEET 2024: 650/720',
          message:
            'Perfect balance of board preparation and NEET coaching. Highly recommend for Gujarat students.',
          university: 'B.J. Medical College',
          year: 2024,
        },
      ],
      contactInfo: {
        phone: CONTACT_INFO.phone.display.primary,
        email: 'admissions@cerebrumbiologyacademy.com',
        whatsapp: CONTACT_INFO.phone.display.primary,
        address: 'Delhi NCR Headquarters + 12 coaching hubs across India',
        hours: 'Mon-Sat: 9 AM - 8 PM IST',
        preferredContact: 'WhatsApp or Phone Call',
        timezone: 'Asia/Kolkata',
      },
      socialProof: {
        totalStudents: 10000,
        successRate: '98%',
        averageScore: '580/720',
        topUniversities: ['AIIMS Delhi', 'JIPMER', 'KGMU', 'MAMC', 'LHMC'],
        yearsOfExperience: 8,
      },
      paymentMethods: ['Razorpay', 'UPI', 'Net Banking', 'EMI', 'Cash at Centers'],
      languageSupport: ['Hindi', 'English', 'Mixed (Hindi+English)'],
      courseTiming: 'Morning (9-11 AM), Evening (6-8 PM), Weekend batches available',
    },

    // United States
    US: {
      code: 'US',
      name: 'United States',
      currency: 'USD',
      timezone: 'America/New_York',
      heroMessage:
        'Preparing for medical school abroad? Join 500+ international students who achieved their dreams!',
      value_proposition:
        'Master biology fundamentals for MCAT success and pre-med requirements with expert Indian faculty.',
      localOffers: [
        'Flexible payment plans in USD',
        'MCAT Biology preparation included',
        'US medical school admission guidance',
        'Timezone-friendly class timings',
        'Digital study materials optimized for US curriculum',
      ],
      testimonials: [
        {
          name: 'Ravi Krishnan',
          location: 'California',
          course: 'Pre-Med Biology Foundation',
          score: 'MCAT Bio: 132/132',
          message:
            'Exceptional preparation for MCAT Biology section. The faculty understands both Indian and US medical education systems.',
          university: 'UCLA Medical School',
          year: 2024,
        },
        {
          name: 'Ananya Singh',
          location: 'New York',
          course: 'International NEET Program',
          score: 'NEET 2024: 645/720',
          message:
            'Perfect for students in US wanting to pursue medicine in India. Great flexibility with timings.',
          university: 'Columbia Medical School (Transfer)',
          year: 2024,
        },
      ],
      contactInfo: {
        phone: CONTACT_INFO.phone.display.primary,
        email: 'usa@cerebrumbiologyacademy.com',
        whatsapp: CONTACT_INFO.phone.display.primary,
        address: 'Available Nationwide - Online Classes',
        hours: '24/7 Support Available (EST/PST friendly)',
        preferredContact: 'Email or WhatsApp',
        timezone: 'America/New_York',
      },
      socialProof: {
        totalStudents: 500,
        successRate: '89%',
        averageScore: 'MCAT Bio: 128/132',
        topUniversities: [
          'Harvard Medical',
          'Johns Hopkins',
          'Stanford Medical',
          'UCLA',
          'NYU Medical',
        ],
        yearsOfExperience: 5,
      },
      paymentMethods: ['Stripe', 'PayPal', 'Credit Card', 'Bank Transfer'],
      languageSupport: ['English'],
      courseTiming: 'Evening EST (7-9 PM), Weekend PST (10 AM-12 PM), Flexible scheduling',
    },

    // United Kingdom
    UK: {
      code: 'UK',
      name: 'United Kingdom',
      currency: 'GBP',
      timezone: 'Europe/London',
      heroMessage:
        "UK's trusted Indian medical coaching - Perfect for NEET + international medical programs!",
      value_proposition:
        'Comprehensive biology preparation for UK medical schools and Indian medical entrance exams.',
      localOffers: [
        'UK-specific medical school guidance',
        'BMAT/UCAT preparation support',
        'SEPA payment options available',
        'GMT-friendly live classes',
        'Recognition of Prior Learning (RPL) support',
      ],
      testimonials: [
        {
          name: 'Rohit Mehta',
          location: 'London',
          course: 'UK Medical Entrance Program',
          score: 'BMAT: 7.2/9.0',
          message:
            'Excellent preparation for UK medical entrance exams. The biology foundation helped me excel in BMAT.',
          university: 'Imperial College London',
          year: 2024,
        },
        {
          name: 'Shruti Agarwal',
          location: 'Manchester',
          course: 'Dual NEET-UK Program',
          score: 'NEET: 628/720, UCAT: 2890',
          message:
            'Perfect for students wanting options in both UK and India. Comprehensive curriculum.',
          university: 'University of Manchester',
          year: 2024,
        },
      ],
      contactInfo: {
        phone: CONTACT_INFO.phone.display.primary,
        email: 'uk@cerebrumbiologyacademy.com',
        whatsapp: CONTACT_INFO.phone.display.primary,
        address: 'London Office + Online Classes',
        hours: 'Mon-Fri: 9 AM - 6 PM GMT',
        preferredContact: 'Email or WhatsApp',
        timezone: 'Europe/London',
      },
      socialProof: {
        totalStudents: 300,
        successRate: '86%',
        averageScore: 'BMAT: 6.8/9.0',
        topUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'UCL', 'Kings College London'],
        yearsOfExperience: 4,
      },
      paymentMethods: ['Stripe', 'PayPal', 'SEPA', 'Bank Transfer'],
      languageSupport: ['English'],
      courseTiming: 'Evening GMT (7-9 PM), Weekend intensive sessions',
    },

    // Australia
    AU: {
      code: 'AU',
      name: 'Australia',
      currency: 'AUD',
      timezone: 'Australia/Sydney',
      heroMessage:
        "Australia's most trusted NEET Biology academy - Excellence in education down under!",
      value_proposition:
        'Top-quality biology education for Australian students pursuing medical careers in India or Australia.',
      localOffers: [
        'AEDT-friendly class timings',
        'GAMSAT preparation support',
        'Australian payment methods accepted',
        'Recognition by Australian medical councils',
        'Pathway guidance for medical studies',
      ],
      testimonials: [
        {
          name: 'Vikram Joshi',
          location: 'Sydney',
          course: 'GAMSAT Biology Intensive',
          score: 'GAMSAT S3: 75',
          message:
            'Outstanding preparation for GAMSAT biology section. The Indian teaching methodology is very effective.',
          university: 'University of Sydney',
          year: 2024,
        },
        {
          name: 'Meera Reddy',
          location: 'Melbourne',
          course: 'International NEET Program',
          score: 'NEET 2024: 610/720',
          message:
            'Great option for students in Australia wanting to study medicine in India. Flexible timings work perfectly.',
          university: 'Monash University (Transfer)',
          year: 2024,
        },
      ],
      contactInfo: {
        phone: CONTACT_INFO.phone.display.primary,
        email: 'australia@cerebrumbiologyacademy.com',
        whatsapp: CONTACT_INFO.phone.display.primary,
        address: 'Sydney Office + Online Classes',
        hours: 'Mon-Fri: 9 AM - 6 PM AEDT',
        preferredContact: 'Email or WhatsApp',
        timezone: 'Australia/Sydney',
      },
      socialProof: {
        totalStudents: 200,
        successRate: '88%',
        averageScore: 'GAMSAT S3: 68',
        topUniversities: [
          'University of Sydney',
          'Monash University',
          'University of Melbourne',
          'UNSW',
          'UQ',
        ],
        yearsOfExperience: 3,
      },
      paymentMethods: ['Stripe', 'PayPal', 'Bank Transfer'],
      languageSupport: ['English'],
      courseTiming: 'Morning AEDT (8-10 AM), Evening AEDT (7-9 PM)',
    },

    // Canada
    CA: {
      code: 'CA',
      name: 'Canada',
      currency: 'CAD',
      timezone: 'America/Toronto',
      heroMessage:
        "Canada's premier NEET Biology coaching - Join 250+ successful Canadian students!",
      value_proposition:
        'Comprehensive biology preparation for Canadian students pursuing medical education globally.',
      localOffers: [
        'MCAT Biology excellence program',
        'Canadian payment methods (Interac)',
        'EST/PST timezone support',
        'Pre-med counseling included',
        'Canadian medical school pathway guidance',
      ],
      testimonials: [
        {
          name: 'Arjun Singh',
          location: 'Toronto',
          course: 'MCAT Biology Mastery',
          score: 'MCAT Bio: 130/132',
          message:
            'Incredible depth of biology concepts. Helped me excel in MCAT and secure admission to top Canadian medical schools.',
          university: 'University of Toronto',
          year: 2024,
        },
        {
          name: 'Priya Gupta',
          location: 'Vancouver',
          course: 'Dual NEET-MCAT Program',
          score: 'NEET: 625/720, MCAT: 516',
          message:
            'Perfect for keeping options open in both Canada and India. Excellent faculty and support.',
          university: 'UBC Faculty of Medicine',
          year: 2024,
        },
      ],
      contactInfo: {
        phone: CONTACT_INFO.phone.display.primary,
        email: 'canada@cerebrumbiologyacademy.com',
        whatsapp: CONTACT_INFO.phone.display.primary,
        address: 'Toronto Office + Online Classes',
        hours: 'Mon-Fri: 9 AM - 6 PM EST/PST',
        preferredContact: 'Email or WhatsApp',
        timezone: 'America/Toronto',
      },
      socialProof: {
        totalStudents: 250,
        successRate: '91%',
        averageScore: 'MCAT Bio: 129/132',
        topUniversities: [
          'University of Toronto',
          'UBC',
          'McGill University',
          'University of Alberta',
          'Queens University',
        ],
        yearsOfExperience: 3,
      },
      paymentMethods: ['Stripe', 'PayPal', 'Interac', 'Bank Transfer'],
      languageSupport: ['English'],
      courseTiming: 'Evening EST (7-9 PM), Weekend PST (10 AM-12 PM)',
    },

    // United Arab Emirates
    AE: {
      code: 'AE',
      name: 'United Arab Emirates',
      currency: 'AED',
      timezone: 'Asia/Dubai',
      heroMessage:
        "UAE's #1 NEET Biology coaching - Join 300+ Gulf students achieving medical dreams!",
      value_proposition:
        'Premium biology education for UAE students with weekend offline classes in Dubai and Abu Dhabi.',
      localOffers: [
        'Weekend offline classes in Dubai/Abu Dhabi',
        'GST timezone live sessions',
        'UAE payment gateway support',
        'Special Gulf student community',
        'Ramadan-friendly flexible scheduling',
      ],
      testimonials: [
        {
          name: 'Ahmed Al-Rashid',
          location: 'Dubai',
          course: 'NEET Intensive Program',
          score: 'NEET 2024: 635/720',
          message:
            'Excellent coaching with cultural sensitivity. The offline classes in Dubai are very convenient.',
          university: 'RAK Medical College',
          year: 2024,
        },
        {
          name: 'Fatima Khan',
          location: 'Abu Dhabi',
          course: 'Foundation + NEET Program',
          score: 'NEET 2024: 590/720',
          message:
            'Strong foundation building followed by intensive NEET preparation. Perfect for Gulf students.',
          university: 'Gulf Medical University',
          year: 2024,
        },
      ],
      contactInfo: {
        phone: CONTACT_INFO.phone.display.primary,
        email: 'uae@cerebrumbiologyacademy.com',
        whatsapp: CONTACT_INFO.phone.display.primary,
        address: 'Dubai Office: Business Bay, Abu Dhabi Center: Al Maryah Island',
        hours: 'Sun-Thu: 9 AM - 6 PM GST, Fri-Sat: Weekend Classes',
        preferredContact: 'WhatsApp preferred',
        timezone: 'Asia/Dubai',
      },
      socialProof: {
        totalStudents: 300,
        successRate: '89%',
        averageScore: '565/720',
        topUniversities: [
          'RAK Medical College',
          'Gulf Medical University',
          'Ajman University',
          'University of Sharjah',
        ],
        yearsOfExperience: 4,
      },
      paymentMethods: ['Stripe', 'PayPal', 'Bank Transfer', 'Credit Card'],
      languageSupport: ['English', 'Hindi', 'Arabic (basic support)'],
      courseTiming: 'Weekend intensive: Fri 2-6 PM, Sat 9 AM-1 PM, Evening online: Sun-Thu 8-10 PM',
    },

    // Singapore
    SG: {
      code: 'SG',
      name: 'Singapore',
      currency: 'SGD',
      timezone: 'Asia/Singapore',
      heroMessage:
        "Singapore's trusted NEET Biology academy - Excellence in education with Asian values!",
      value_proposition:
        'World-class biology education combining Eastern and Western teaching methodologies for maximum effectiveness.',
      localOffers: [
        'SGT timezone live classes',
        'Singapore payment gateway support',
        'Hybrid online-offline model',
        'Cultural bridge program',
        'Southeast Asian student community',
      ],
      testimonials: [
        {
          name: 'Li Wei Ming',
          location: 'Singapore',
          course: 'International NEET Program',
          score: 'NEET 2024: 615/720',
          message:
            'Excellent program that respects both Asian learning culture and modern teaching methods. Highly recommended.',
          university: 'NUS Medicine (Transfer Program)',
          year: 2024,
        },
        {
          name: 'Rajesh Kumar',
          location: 'Singapore',
          course: 'Biology Excellence Program',
          score: 'NEET 2024: 598/720',
          message:
            'Great for Singaporean students who want quality Indian medical coaching. Perfect timing and curriculum.',
          university: 'Manipal University',
          year: 2024,
        },
      ],
      contactInfo: {
        phone: CONTACT_INFO.phone.display.primary,
        email: 'singapore@cerebrumbiologyacademy.com',
        whatsapp: CONTACT_INFO.phone.display.primary,
        address: 'Singapore Office: Raffles Place + Online Classes',
        hours: 'Mon-Fri: 9 AM - 6 PM SGT, Weekend sessions available',
        preferredContact: 'Email or WhatsApp',
        timezone: 'Asia/Singapore',
      },
      socialProof: {
        totalStudents: 150,
        successRate: '92%',
        averageScore: '595/720',
        topUniversities: ['NUS Medicine', 'NTU Medicine', 'Duke-NUS', 'Manipal Singapore'],
        yearsOfExperience: 3,
      },
      paymentMethods: ['Stripe', 'PayPal', 'Bank Transfer'],
      languageSupport: ['English', 'Mandarin (basic support)'],
      courseTiming: 'Evening SGT (8-10 PM), Weekend intensive sessions',
    },
  }

  static getCountryContent(countryCode: string): CountryContent | null {
    return this.COUNTRY_DATA[countryCode?.toUpperCase()] || null
  }

  static getAllCountries(): CountryContent[] {
    return Object.values(this.COUNTRY_DATA)
  }

  static getSupportedCountries(): string[] {
    return Object.keys(this.COUNTRY_DATA)
  }

  static getCountryByTimezone(timezone: string): CountryContent | null {
    const country = Object.values(this.COUNTRY_DATA).find(
      (country) => country.timezone === timezone
    )
    return country || null
  }

  static getLocalizedContent(
    countryCode: string,
    contentType: 'hero' | 'testimonials' | 'offers' | 'contact' | 'social_proof'
  ): any {
    const country = this.getCountryContent(countryCode)
    if (!country) return null

    switch (contentType) {
      case 'hero':
        return {
          message: country.heroMessage,
          value_proposition: country.value_proposition,
        }
      case 'testimonials':
        return country.testimonials
      case 'offers':
        return country.localOffers
      case 'contact':
        return country.contactInfo
      case 'social_proof':
        return country.socialProof
      default:
        return null
    }
  }

  static getRegionalTestimonials(countryCode: string, limit: number = 3): CountryTestimonial[] {
    const country = this.getCountryContent(countryCode)
    if (!country) return []

    return country.testimonials.slice(0, limit)
  }

  static getCountrySpecificOffers(countryCode: string): string[] {
    const country = this.getCountryContent(countryCode)
    return country?.localOffers || []
  }

  static getPaymentMethodsForCountry(countryCode: string): string[] {
    const country = this.getCountryContent(countryCode)
    return country?.paymentMethods || ['Stripe', 'PayPal']
  }

  static getLanguageSupportForCountry(countryCode: string): string[] {
    const country = this.getCountryContent(countryCode)
    return country?.languageSupport || ['English']
  }

  static getCourseTiming(countryCode: string): string {
    const country = this.getCountryContent(countryCode)
    return country?.courseTiming || 'Flexible timing available'
  }

  static isCountrySupported(countryCode: string): boolean {
    return this.getSupportedCountries().includes(countryCode?.toUpperCase())
  }

  static getNearnestSupportedCountry(countryCode: string): CountryContent | null {
    // Fallback logic for unsupported countries
    const regionMapping: Record<string, string> = {
      // Europe -> UK
      DE: 'UK',
      FR: 'UK',
      IT: 'UK',
      ES: 'UK',
      NL: 'UK',
      // Middle East -> UAE
      SA: 'AE',
      QA: 'AE',
      KW: 'AE',
      BH: 'AE',
      OM: 'AE',
      // Asia Pacific -> Singapore
      MY: 'SG',
      TH: 'SG',
      PH: 'SG',
      ID: 'SG',
      VN: 'SG',
      // Oceania -> Australia
      NZ: 'AU',
      // Americas -> US/Canada based on geography
      MX: 'US',
      BR: 'US',
      AR: 'US',
    }

    const mappedCountry = regionMapping[countryCode?.toUpperCase()]
    return mappedCountry ? this.getCountryContent(mappedCountry) : this.getCountryContent('IN') // Default to India
  }

  static generateCountryLandingPage(countryCode: string): {
    meta: { title: string; description: string; keywords: string[] }
    content: CountryContent
    structured_data: any
  } | null {
    const country = this.getCountryContent(countryCode)
    if (!country) return null

    return {
      meta: {
        title: `NEET Biology Coaching in ${country.name} | Cerebrum Biology Academy`,
        description: `${country.value_proposition} Join ${country.socialProof.totalStudents}+ students with ${country.socialProof.successRate} success rate.`,
        keywords: [
          `NEET Biology ${country.name}`,
          `Medical Entrance Coaching ${country.name}`,
          `Biology Classes ${country.name}`,
          'NEET Preparation',
          'Medical School Admission',
          country.name === 'India' ? 'AIIMS' : 'International Medical Programs',
        ],
      },
      content: country,
      structured_data: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: `Cerebrum Biology Academy - ${country.name}`,
        description: country.value_proposition,
        address: {
          '@type': 'PostalAddress',
          addressCountry: country.code,
          addressLocality: country.contactInfo.address,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: country.contactInfo.phone,
          contactType: 'customer service',
          availableLanguage: country.languageSupport,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: country.socialProof.totalStudents,
        },
      },
    }
  }
}

export { CountryContentService }
