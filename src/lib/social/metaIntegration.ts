/**
 * Meta/Facebook Ads Integration for Cerebrum Biology Academy
 * Optimized for Indian education market with advanced targeting
 */

export interface FacebookPixelConfig {
  pixelId: string
  accessToken: string
  testEventCode?: string
  conversions: {
    demoBooking: string
    courseEnrollment: string
    leadGeneration: string
    contentView: string
    addToCart: string
  }
}

export interface MetaCampaignConfig {
  campaignName: string
  objective: 'LEAD_GENERATION' | 'CONVERSIONS' | 'REACH' | 'TRAFFIC' | 'VIDEO_VIEWS'
  budget: {
    dailyBudget: number
    lifetimeBudget?: number
  }
  targeting: {
    ageMin: number
    ageMax: number
    genders: ('male' | 'female')[]
    locations: string[]
    languages: string[]
    interests: string[]
    behaviors: string[]
    customAudiences: string[]
    lookalikes: string[]
  }
  placements: string[]
  schedule?: {
    startTime: string
    endTime: string
    timezone: string
  }
}

export interface WhatsAppBusinessConfig {
  phoneNumberId: string
  accessToken: string
  webhookVerifyToken: string
  templates: {
    welcome: string
    demoConfirmation: string
    enrollmentConfirmation: string
    classReminder: string
    paymentReminder: string
  }
}

export interface InstagramAdConfig {
  adType: 'STORY' | 'REEL' | 'FEED' | 'IGTV'
  creative: {
    imageUrl?: string
    videoUrl?: string
    caption: string
    hashtags: string[]
  }
  callToAction: string
  targetAudience: string
}

export class MetaIntegration {
  private pixelConfig: FacebookPixelConfig
  private whatsappConfig: WhatsAppBusinessConfig

  constructor() {
    this.pixelConfig = {
      pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '',
      accessToken: process.env.FACEBOOK_ACCESS_TOKEN || '',
      testEventCode: process.env.FACEBOOK_TEST_EVENT_CODE,
      conversions: {
        demoBooking: 'demo_booking',
        courseEnrollment: 'purchase',
        leadGeneration: 'lead',
        contentView: 'view_content',
        addToCart: 'add_to_cart',
      },
    }

    this.whatsappConfig = {
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
      webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '',
      templates: {
        welcome: 'cerebrum_welcome',
        demoConfirmation: 'demo_confirmation',
        enrollmentConfirmation: 'enrollment_confirmation',
        classReminder: 'class_reminder',
        paymentReminder: 'payment_reminder',
      },
    }
  }

  // Facebook Pixel Implementation
  initializeFacebookPixel(): string {
    return `
      <!-- Facebook Pixel Code -->
      <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', '${this.pixelConfig.pixelId}');
        fbq('track', 'PageView');
        
        // Enhanced tracking for education
        fbq('trackCustom', 'EducationLanding', {
          content_category: 'Education',
          content_type: 'NEET Biology Coaching',
          content_name: document.title,
          page_type: 'landing'
        });
      </script>
      
      <noscript>
        <img height="1" width="1" style="display:none" 
             src="https://www.facebook.com/tr?id=${this.pixelConfig.pixelId}&ev=PageView&noscript=1" />
      </noscript>
      <!-- End Facebook Pixel Code -->
    `
  }

  // Track Education-Specific Events
  trackEducationEvent(eventName: string, parameters: Record<string, any>): void {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, {
        content_category: 'Education',
        content_type: parameters.contentType || 'NEET Biology Course',
        content_name: parameters.contentName || '',
        value: parameters.value || 0,
        currency: 'INR',
        student_class: parameters.studentClass || '',
        course_interest: parameters.courseInterest || '',
        traffic_source: parameters.trafficSource || '',
        device_type: this.getDeviceType(),
        custom_data: {
          location: parameters.location || '',
          language: parameters.language || 'en',
          education_level: parameters.educationLevel || '',
          exam_year: parameters.examYear || new Date().getFullYear() + 1,
        },
      })
    }
  }

  // Demo Booking Tracking
  trackDemoBooking(demoData: {
    subject: string
    studentClass: string
    studentName: string
    phoneNumber: string
    email: string
    preferredTime: string
    source: string
  }): void {
    this.trackEducationEvent('Lead', {
      contentType: 'Demo Class',
      contentName: `${demoData.subject} Demo - Class ${demoData.studentClass}`,
      value: 500, // Estimated lead value
      studentClass: demoData.studentClass,
      courseInterest: demoData.subject,
      trafficSource: demoData.source,
      preferredTime: demoData.preferredTime,
    })

    // Server-side conversion API
    this.sendConversionAPI('Lead', {
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        em: this.hashEmail(demoData.email),
        ph: this.hashPhone(demoData.phoneNumber),
        fn: this.hashName(demoData.studentName.split(' ')[0]),
        ln: this.hashName(demoData.studentName.split(' ').slice(1).join(' ')),
      },
      custom_data: {
        content_type: 'Demo Class',
        content_category: 'Education',
        value: 500,
        currency: 'INR',
      },
    })
  }

  // Course Enrollment Tracking
  trackCourseEnrollment(enrollmentData: {
    courseId: string
    courseName: string
    coursePrice: number
    studentClass: string
    studentName: string
    email: string
    phoneNumber: string
    paymentMethod: string
  }): void {
    this.trackEducationEvent('Purchase', {
      contentType: 'Course Enrollment',
      contentName: enrollmentData.courseName,
      value: enrollmentData.coursePrice,
      studentClass: enrollmentData.studentClass,
      courseInterest: enrollmentData.courseName,
      paymentMethod: enrollmentData.paymentMethod,
    })

    // Server-side conversion API for higher accuracy
    this.sendConversionAPI('Purchase', {
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        em: this.hashEmail(enrollmentData.email),
        ph: this.hashPhone(enrollmentData.phoneNumber),
        fn: this.hashName(enrollmentData.studentName.split(' ')[0]),
        ln: this.hashName(enrollmentData.studentName.split(' ').slice(1).join(' ')),
      },
      custom_data: {
        content_type: 'Course',
        content_category: 'Education',
        content_ids: [enrollmentData.courseId],
        value: enrollmentData.coursePrice,
        currency: 'INR',
        num_items: 1,
      },
    })
  }

  // Advanced Audience Creation for Education
  createEducationAudiences(): Array<{
    name: string
    description: string
    targeting: Record<string, any>
    estimatedSize: number
  }> {
    return [
      {
        name: 'NEET Aspirants 2025',
        description: 'Students preparing for NEET 2026',
        targeting: {
          age_min: 16,
          age_max: 19,
          geo_locations: {
            countries: ['IN'],
            regions: [
              { key: '1011' }, // Delhi
              { key: '1020' }, // Mumbai
              { key: '1035' }, // Kolkata
              { key: '1007' }, // Chennai
              { key: '1004' }, // Bangalore
              { key: '1018' }, // Hyderabad
              { key: '1014' }, // Pune
              { key: '1003' }, // Ahmedabad
            ],
          },
          interests: [
            'Medical education',
            'Biology',
            'Medical colleges',
            'NEET',
            'Medical entrance exams',
            'Science education',
            'Online learning',
            'Competitive exams',
          ],
          behaviors: [
            'Education levels: High school',
            'Mobile device users',
            'Online education users',
          ],
          languages: ['en', 'hi'],
        },
        estimatedSize: 2500000,
      },
      {
        name: 'Biology Students Class 11-12',
        description: 'Current biology students in classes 11 and 12',
        targeting: {
          age_min: 15,
          age_max: 18,
          geo_locations: {
            countries: ['IN'],
          },
          interests: ['Biology', 'Science education', 'CBSE', 'NCERT', 'Class 11', 'Class 12'],
          detailed_targeting: {
            or: [
              { interests: ['Biology'] },
              { interests: ['Medical education'] },
              { behaviors: ['Online education users'] },
            ],
          },
          languages: ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu'],
        },
        estimatedSize: 5000000,
      },
      {
        name: 'Medical College Aspirants Parents',
        description: 'Parents of students aspiring for medical colleges',
        targeting: {
          age_min: 40,
          age_max: 55,
          geo_locations: {
            countries: ['IN'],
          },
          interests: [
            'Medical colleges',
            'Medical education',
            'Education',
            'Parenting',
            'Higher education',
          ],
          behaviors: ['Parents with teenagers', 'High-value online shoppers'],
          languages: ['en', 'hi'],
        },
        estimatedSize: 3000000,
      },
      {
        name: 'Competition Coaching Students',
        description: 'Students already enrolled in competitive exam coaching',
        targeting: {
          age_min: 16,
          age_max: 20,
          geo_locations: {
            countries: ['IN'],
          },
          interests: [
            'Competitive exams',
            'NEET',
            'JEE',
            'Medical entrance exams',
            'Coaching institutes',
            'Online courses',
          ],
          behaviors: ['Online education users', 'Frequent online shoppers'],
          languages: ['en', 'hi'],
        },
        estimatedSize: 1500000,
      },
    ]
  }

  // Instagram Ad Campaign Strategies
  createInstagramCampaigns(): InstagramAdConfig[] {
    return [
      {
        adType: 'STORY',
        creative: {
          imageUrl: '/instagram-assets/neet-biology-story.jpg',
          caption:
            'Master NEET Biology with AIIMS experts! Join 2000+ successful students. Link in bio for free demo! 🧬📚',
          hashtags: [
            '#NEETBiology',
            '#MedicalEntrance',
            '#OnlineLearning',
            '#BiologyCoaching',
            '#NEET2025',
            '#StudyTips',
            '#BiologyTutor',
            '#MedicalCollege',
            '#EducationIndia',
            '#StudentSuccess',
          ],
        },
        callToAction: 'Book Free Demo',
        targetAudience: 'NEET Aspirants 2025',
      },
      {
        adType: 'REEL',
        creative: {
          videoUrl: '/instagram-assets/biology-concept-reel.mp4',
          caption:
            'Quick Biology hack for NEET! 🚀 Can you solve this in 30 seconds? Follow for more study tips! #NEETBiology #QuickTips',
          hashtags: [
            '#NEETPreparation',
            '#BiologyTricks',
            '#StudyHacks',
            '#MedicalEntrance',
            '#BiologyReels',
            '#EducationContent',
            '#NEET2025',
            '#LearnWithUs',
          ],
        },
        callToAction: 'Learn More',
        targetAudience: 'Biology Students Class 11-12',
      },
      {
        adType: 'FEED',
        creative: {
          imageUrl: '/instagram-assets/success-story-post.jpg',
          caption:
            'From 450 to 680 in NEET! 🎉 Meet Priya, our star student who cracked AIIMS Delhi. Your success story could be next! 💪',
          hashtags: [
            '#SuccessStory',
            '#AIIMS',
            '#NEETSuccess',
            '#MedicalCollege',
            '#Inspiration',
            '#StudentJourney',
            '#Achievement',
            '#DreamsComeTrue',
          ],
        },
        callToAction: 'Start Your Journey',
        targetAudience: 'Medical College Aspirants Parents',
      },
    ]
  }

  // WhatsApp Business Integration
  async sendWhatsAppMessage(
    phoneNumber: string,
    templateName: string,
    parameters: string[]
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.whatsappConfig.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.whatsappConfig.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: phoneNumber,
            type: 'template',
            template: {
              name: templateName,
              language: {
                code: 'en',
              },
              components: [
                {
                  type: 'body',
                  parameters: parameters.map((param) => ({ type: 'text', text: param })),
                },
              ],
            },
          }),
        }
      )

      return response.ok
    } catch (error) {
      console.error('WhatsApp API Error:', error)
      return false
    }
  }

  // Lead Magnet Campaigns
  createLeadMagnetCampaigns(): MetaCampaignConfig[] {
    return [
      {
        campaignName: 'NEET Biology Free Study Material',
        objective: 'LEAD_GENERATION',
        budget: {
          dailyBudget: 2000, // ₹2000/day
        },
        targeting: {
          ageMin: 16,
          ageMax: 19,
          genders: ['male', 'female'],
          locations: ['IN'],
          languages: ['en', 'hi'],
          interests: ['NEET', 'Biology', 'Medical education', 'Competitive exams'],
          behaviors: ['Online education users', 'Mobile device users'],
          customAudiences: ['website_visitors_30_days'],
          lookalikes: ['enrolled_students_lookalike'],
        },
        placements: [
          'facebook_feed',
          'instagram_feed',
          'instagram_stories',
          'facebook_marketplace',
        ],
      },
      {
        campaignName: 'Free Demo Class Campaign',
        objective: 'CONVERSIONS',
        budget: {
          dailyBudget: 3000, // ₹3000/day
        },
        targeting: {
          ageMin: 15,
          ageMax: 20,
          genders: ['male', 'female'],
          locations: ['IN'],
          languages: ['en', 'hi'],
          interests: [
            'Medical colleges',
            'Biology education',
            'Online learning',
            'NEET preparation',
          ],
          behaviors: ['Education levels: High school', 'Interested in online courses'],
          customAudiences: ['video_viewers_75_percent'],
          lookalikes: ['demo_attendees_lookalike'],
        },
        placements: [
          'facebook_feed',
          'instagram_feed',
          'instagram_stories',
          'facebook_right_column',
        ],
      },
    ]
  }

  // Conversion API Implementation
  private async sendConversionAPI(eventName: string, eventData: any): Promise<void> {
    try {
      await fetch(`https://graph.facebook.com/v18.0/${this.pixelConfig.pixelId}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [eventData],
          access_token: this.pixelConfig.accessToken,
          test_event_code: this.pixelConfig.testEventCode,
        }),
      })
    } catch (error) {
      console.error('Facebook Conversion API Error:', error)
    }
  }

  // Utility Methods
  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'unknown'

    const userAgent = navigator.userAgent
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet'
    if (
      /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
        userAgent
      )
    )
      return 'mobile'
    return 'desktop'
  }

  private hashEmail(email: string): string {
    // In production, use proper SHA-256 hashing
    return email.toLowerCase().trim()
  }

  private hashPhone(phone: string): string {
    // In production, use proper SHA-256 hashing
    return phone.replace(/\D/g, '')
  }

  private hashName(name: string): string {
    // In production, use proper SHA-256 hashing
    return name.toLowerCase().trim()
  }

  // Performance Monitoring
  async getMetaCampaignPerformance(): Promise<{
    campaigns: Array<{
      name: string
      reach: number
      impressions: number
      clicks: number
      ctr: number
      cpc: number
      conversions: number
      costPerConversion: number
      roas: number
    }>
    audienceInsights: {
      demographics: Record<string, number>
      interests: Record<string, number>
      devices: Record<string, number>
    }
  }> {
    try {
      const response = await fetch('/api/social/meta-performance')
      if (!response.ok) {
        throw new Error('Failed to fetch Meta campaign performance')
      }
      return await response.json()
    } catch (error) {
      console.error('Meta Performance API Error:', error)
      return {
        campaigns: [],
        audienceInsights: {
          demographics: {},
          interests: {},
          devices: {},
        },
      }
    }
  }
}

// Global Type Extensions are in src/types/globals.d.ts

export const metaIntegration = new MetaIntegration()

// Export for use in components
export default metaIntegration
