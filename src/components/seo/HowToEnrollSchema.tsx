/**
 * HowToEnrollSchema - Generates HowTo structured data for course enrollment
 *
 * This schema helps search engines understand the enrollment process,
 * potentially appearing as rich snippets and in voice search results.
 */

interface HowToEnrollSchemaProps {
  courseName: string
  courseUrl: string
  estimatedTime?: string // e.g., "PT30M" for 30 minutes
}

export function HowToEnrollSchema({
  courseName,
  courseUrl,
  estimatedTime = 'PT30M',
}: HowToEnrollSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Enroll in ${courseName} at Cerebrum Biology Academy`,
    description: `Step-by-step guide to enroll in ${courseName}. Book a free demo, choose your batch, and start your NEET journey with AIIMS faculty.`,
    totalTime: estimatedTime,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '0',
      name: 'Free demo class',
    },
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Phone or WhatsApp',
      },
      {
        '@type': 'HowToTool',
        name: 'Valid ID proof',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Book Free Demo Class',
        text: 'Contact us via WhatsApp at +91-88264-44334 or call to book a free 45-minute demo class. Experience our teaching methodology firsthand.',
        url: `${courseUrl}#demo`,
        image: 'https://cerebrumbiologyacademy.com/images/step-1-demo.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Attend Demo & Meet Faculty',
        text: 'Attend the demo class conducted by Dr. Shekhar or our expert faculty. Ask questions, understand the teaching approach, and see if it fits your learning style.',
        url: `${courseUrl}#faculty`,
        image: 'https://cerebrumbiologyacademy.com/images/step-2-attend.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Your Course & Batch',
        text: 'Select from Pinnacle (premium), Ascent (standard), or Pursuit (budget) tiers. Choose morning, afternoon, or evening batch based on your schedule.',
        url: `${courseUrl}#pricing`,
        image: 'https://cerebrumbiologyacademy.com/images/step-3-choose.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Complete Enrollment',
        text: 'Submit required documents (ID proof, recent photo) and complete fee payment. EMI options available through major banks.',
        url: `${courseUrl}#enroll`,
        image: 'https://cerebrumbiologyacademy.com/images/step-4-enroll.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Start Your NEET Journey',
        text: 'Receive study materials, batch schedule, and login credentials. Begin classes with AIIMS-qualified faculty and start your path to medical college.',
        url: `${courseUrl}#start`,
        image: 'https://cerebrumbiologyacademy.com/images/step-5-start.jpg',
      },
    ],
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'NCERT Biology textbooks (Class 11 & 12)',
      },
      {
        '@type': 'HowToSupply',
        name: 'Notebook for class notes',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * CourseSchema with HowTo - Complete course schema with enrollment steps
 */
interface CourseWithHowToSchemaProps {
  courseName: string
  courseDescription: string
  courseUrl: string
  price: number
  duration: string // e.g., "10 months"
  educationalLevel: string // e.g., "Class 11", "Class 12", "12th Pass"
  syllabus?: string[]
}

export function CourseWithHowToSchema({
  courseName,
  courseDescription,
  courseUrl,
  price,
  duration,
  educationalLevel,
  syllabus = [],
}: CourseWithHowToSchemaProps) {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: courseDescription,
    url: courseUrl,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      sameAs: [
        'https://www.youtube.com/@cerebrumbiologyacademy',
        'https://www.youtube.com/@drshekharcsingh',
        'https://www.instagram.com/cerebrumbiologyacademy',
      ],
    },
    instructor: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      honorificPrefix: 'Dr.',
      jobTitle: 'Founder & Head Faculty',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'All India Institute of Medical Sciences (AIIMS)',
      },
      knowsAbout: ['NEET Biology', 'Human Physiology', 'Genetics', 'Cell Biology'],
    },
    educationalLevel: educationalLevel,
    timeRequired: `P${duration.replace(/\s+/g, '').toUpperCase()}`,
    teaches: 'NEET Biology',
    coursePrerequisites: educationalLevel === 'Class 11' ? 'Class 10 completed' : 'Class 11 completed',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['online', 'onsite'],
      courseWorkload: 'PT15H/week',
      instructor: {
        '@type': 'Person',
        name: 'Dr. Shekhar C Singh',
      },
    },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '32',
      reviewCount: '38',
    },
    ...(syllabus.length > 0 && {
      syllabusSections: syllabus.map((topic, index) => ({
        '@type': 'Syllabus',
        position: index + 1,
        name: topic,
      })),
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
    />
  )
}
