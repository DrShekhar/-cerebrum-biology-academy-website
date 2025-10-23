# Technical Architecture - Cerebrum Biology Academy

## 🏗️ Modern Stack Overview

### Core Framework

- **Framework:** Next.js 15.5.3 with App Router
- **Language:** TypeScript 5.x with strict type checking
- **Styling:** Tailwind CSS 4.x with custom design system
- **State Management:** React Context + Zustand for complex state
- **Database:** PostgreSQL with Prisma ORM
- **Deployment:** Vercel with serverless functions

### Performance Optimization

#### Image & Asset Optimization

```typescript
// Next.js Image component with optimization
import Image from 'next/image'

const OptimizedImage = ({ src, alt, width, height }) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,..."
    priority={false} // Only for above-the-fold images
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
)
```

#### Service Worker Implementation

```typescript
// sw.js - Offline support and caching
const CACHE_NAME = 'cerebrum-v1'
const urlsToCache = ['/', '/courses', '/contact', '/static/css/main.css', '/static/js/main.js']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})
```

#### CDN Configuration

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.cerebrumbiologyacademy.com'],
    loader: 'custom',
    loaderFile: './src/lib/cloudinary-loader.js',
  },
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### SEO Structure Implementation

#### Schema Markup Service

```typescript
// src/lib/seo/schemaService.ts
export class SchemaService {
  static generateCourseSchema(course: Course) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.name,
      description: course.description,
      provider: {
        '@type': 'Organization',
        name: 'Cerebrum Biology Academy',
        url: 'https://cerebrumbiologyacademy.com',
      },
      courseCode: course.code,
      educationalLevel: 'University',
      teaches: course.topics,
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    }
  }

  static generateLocalBusinessSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'A-47, First Floor, Lajpat Nagar-II',
          addressLocality: 'New Delhi',
          postalCode: '110024',
          addressCountry: 'IN',
        },
      ],
      telephone: '+91-88264-44334',
      url: 'https://cerebrumbiologyacademy.com',
      sameAs: [
        'https://facebook.com/cerebrumbiologyacademy',
        'https://instagram.com/cerebrumbiologyacademy',
      ],
    }
  }
}
```

#### Sitemap Generation

```typescript
// src/app/sitemap.xml/route.ts
import { MetadataRoute } from 'next'

export async function GET(): Promise<Response> {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const staticPages = ['', '/courses', '/about', '/contact', '/neet-repeaters', '/blog']

  const sitemap: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly',
    priority: page === '' ? 1 : 0.8,
  }))

  // Add dynamic blog posts
  const blogPosts = await getBlogPosts()
  blogPosts.forEach((post) => {
    sitemap.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap
  .map(
    (item) => `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified.toISOString()}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>
`
  )
  .join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
```

### Conversion Tracking System

#### GTM Implementation

```typescript
// src/lib/analytics/gtm.ts
export class GTMService {
  static initialize(gtmId: string) {
    const script = document.createElement('script')
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `
    document.head.appendChild(script)
  }

  static trackEvent(eventName: string, parameters: Record<string, any>) {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters,
      })
    }
  }

  static trackPurchase(transactionId: string, value: number, currency: string = 'INR') {
    this.trackEvent('purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
    })
  }
}
```

#### Facebook Pixel Integration

```typescript
// src/lib/analytics/facebookPixel.ts
export class FacebookPixelService {
  static initialize(pixelId: string) {
    if (typeof window !== 'undefined') {
      window.fbq =
        window.fbq ||
        function () {
          ;(window.fbq.q = window.fbq.q || []).push(arguments)
        }
      window._fbq = window._fbq || window.fbq
      window.fbq.push = window.fbq
      window.fbq.loaded = true
      window.fbq.version = '2.0'
      window.fbq.queue = []

      const script = document.createElement('script')
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(script)

      window.fbq('init', pixelId)
      window.fbq('track', 'PageView')
    }
  }

  static trackLead(email?: string) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', email ? { email } : {})
    }
  }

  static trackPurchase(value: number, currency: string = 'INR') {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', { value, currency })
    }
  }
}
```

### Forms & Lead Capture System

#### Multi-step Form Component

```typescript
// src/components/forms/MultiStepForm.tsx
interface FormStep {
  id: string
  title: string
  component: React.ComponentType<any>
  validation: any
}

export const MultiStepForm = ({ steps, onComplete }: {
  steps: FormStep[]
  onComplete: (data: any) => void
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [savedProgress, setSavedProgress] = useState(false)

  // Auto-save progress
  useEffect(() => {
    const saveProgress = () => {
      localStorage.setItem('formProgress', JSON.stringify({
        step: currentStep,
        data: formData,
        timestamp: Date.now()
      }))
      setSavedProgress(true)
    }

    const timer = setTimeout(saveProgress, 2000)
    return () => clearTimeout(timer)
  }, [currentStep, formData])

  const handleNext = (stepData: any) => {
    const updatedData = { ...formData, ...stepData }
    setFormData(updatedData)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(updatedData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {index + 1}
              </div>
              <span className="ml-2 text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-blue-600 rounded transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current step component */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {React.createElement(steps[currentStep].component, {
          onNext: handleNext,
          data: formData
        })}
      </div>

      {savedProgress && (
        <div className="mt-4 text-sm text-green-600">
          ✓ Progress saved automatically
        </div>
      )}
    </div>
  )
}
```

### Security & Compliance

#### GDPR Compliance Banner

```typescript
// src/components/compliance/GDPRBanner.tsx
export const GDPRBanner = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('gdpr-consent', 'accepted')
    localStorage.setItem('gdpr-consent-date', new Date().toISOString())
    setIsVisible(false)

    // Initialize tracking after consent
    GTMService.initialize(process.env.NEXT_PUBLIC_GTM_ID!)
    FacebookPixelService.initialize(process.env.NEXT_PUBLIC_FB_PIXEL_ID!)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex-1 mr-4">
          <p className="text-sm">
            We use cookies and similar technologies to provide the best experience on our website.
            <a href="/privacy-policy" className="underline ml-1">Learn more</a>
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Accept All
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}
```

### API Integrations

#### WhatsApp Business API Service

```typescript
// src/lib/integrations/whatsappService.ts
export class WhatsAppService {
  private static readonly baseUrl = 'https://graph.facebook.com/v17.0'
  private static readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  private static readonly accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  static async sendMessage(to: string, message: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          text: { body: message },
        }),
      })

      return await response.json()
    } catch (error) {
      console.error('WhatsApp API Error:', error)
      throw error
    }
  }

  static async sendTemplate(to: string, templateName: string, parameters: string[]) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'en' },
            components: [
              {
                type: 'body',
                parameters: parameters.map((param) => ({ type: 'text', text: param })),
              },
            ],
          },
        }),
      })

      return await response.json()
    } catch (error) {
      console.error('WhatsApp Template Error:', error)
      throw error
    }
  }
}
```

#### Payment Gateway Integration (Razorpay)

```typescript
// src/lib/payments/razorpayService.ts
import Razorpay from 'razorpay'

export class RazorpayService {
  private static instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })

  static async createOrder(amount: number, currency: string = 'INR', receipt?: string) {
    try {
      const order = await this.instance.orders.create({
        amount: amount * 100, // Convert to paise
        currency: currency,
        receipt: receipt || `receipt_${Date.now()}`,
        payment_capture: 1,
      })

      return order
    } catch (error) {
      console.error('Razorpay Order Creation Error:', error)
      throw error
    }
  }

  static async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ) {
    const crypto = require('crypto')
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex')

    return generated_signature === razorpaySignature
  }
}
```

### Database Structure

#### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Student {
  id           String   @id @default(cuid())
  email        String   @unique
  phone        String?
  name         String
  attemptNumber Int     @default(1)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  enrollments  Enrollment[]
  progress     Progress[]
  payments     Payment[]

  @@map("students")
}

model Course {
  id           String   @id @default(cuid())
  name         String
  description  String
  price        Int
  duration     Int      // in months
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  enrollments  Enrollment[]
  modules      Module[]

  @@map("courses")
}

model Enrollment {
  id        String   @id @default(cuid())
  studentId String
  courseId  String
  status    EnrollmentStatus @default(ACTIVE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  student   Student  @relation(fields: [studentId], references: [id])
  course    Course   @relation(fields: [courseId], references: [id])

  @@unique([studentId, courseId])
  @@map("enrollments")
}

model Payment {
  id              String        @id @default(cuid())
  studentId       String
  amount          Int
  currency        String        @default("INR")
  status          PaymentStatus @default(PENDING)
  razorpayOrderId String?
  razorpayPaymentId String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  student         Student       @relation(fields: [studentId], references: [id])

  @@map("payments")
}

enum EnrollmentStatus {
  ACTIVE
  COMPLETED
  SUSPENDED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}
```

### Testing Setup

#### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/test/**'],
}
```

#### A/B Testing Setup

```typescript
// src/lib/testing/abTestService.ts
export class ABTestService {
  static getVariant(testName: string, variants: string[]): string {
    const userId = this.getUserId()
    const hash = this.hash(testName + userId)
    const bucketIndex = hash % variants.length

    // Track variant assignment
    GTMService.trackEvent('ab_test_assignment', {
      test_name: testName,
      variant: variants[bucketIndex],
      user_id: userId,
    })

    return variants[bucketIndex]
  }

  private static getUserId(): string {
    let userId = localStorage.getItem('ab_test_user_id')
    if (!userId) {
      userId = Math.random().toString(36).substring(2, 15)
      localStorage.setItem('ab_test_user_id', userId)
    }
    return userId
  }

  private static hash(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }
}
```

### Deployment Configuration

#### Vercel Configuration

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["bom1"],
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Monitoring & Analytics

#### Custom Analytics Dashboard

```typescript
// src/lib/analytics/customAnalytics.ts
export class CustomAnalytics {
  static async trackPageView(page: string, userId?: string) {
    await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page,
        userId,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      }),
    })
  }

  static async trackConversion(event: string, value?: number, metadata?: any) {
    await fetch('/api/analytics/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        value,
        metadata,
        timestamp: Date.now(),
      }),
    })
  }

  static async getConversionFunnel(timeRange: string = '30d') {
    const response = await fetch(`/api/analytics/funnel?range=${timeRange}`)
    return response.json()
  }
}
```

## 🚀 Performance Targets

- **PageSpeed Score:** 90+ (Desktop), 85+ (Mobile)
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3.5s

## 🔒 Security Measures

- SSL/TLS encryption
- CSRF protection
- XSS prevention
- SQL injection protection
- Rate limiting
- Input validation
- Secure headers implementation

## 📊 Key Metrics Tracking

- Conversion funnel analysis
- User journey mapping
- A/B testing results
- Performance monitoring
- Error tracking
- Revenue attribution
