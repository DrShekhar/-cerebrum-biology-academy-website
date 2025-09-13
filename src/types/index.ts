export interface BasicCourse {
  id: string
  title: string
  description: string
  duration: string
  price: number
  features: string[]
  targetClass: '11th' | '12th' | 'Dropper'
}

export interface Course extends BasicCourse {
  slug: string
  category: 'classroom' | 'online' | 'hybrid'
  startDate: string
  endDate: string
  batchSize: number
  language: string[]
  curriculum: CourseCurriculum
  instructor: CourseInstructor
  schedule: CourseSchedule
  testimonials: string[] // IDs of testimonials
  gallery: string[] // Image URLs
  highlights: string[]
  prerequisites: string[]
  benefits: string[]
  faq: FAQ[]
  seoTitle?: string
  seoDescription?: string
  isPopular?: boolean
  discount?: {
    percentage: number
    validUntil: string
    originalPrice: number
  }
}

export interface CourseCurriculum {
  modules: CurriculumModule[]
  totalHours: number
  practicalHours: number
  testSeries: number
}

export interface CurriculumModule {
  id: string
  title: string
  duration: number
  topics: string[]
  learningObjectives: string[]
  practicals?: string[]
}

export interface CourseInstructor {
  name: string
  qualification: string
  experience: string
  specialization: string[]
  rating: number
  image: string
  bio: string
}

export interface CourseSchedule {
  days: string[]
  timing: string
  frequency: string
  totalClasses: number
  duration: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

export interface Faculty {
  id: string
  name: string
  qualification: string
  experience: string
  specialization: string[]
  image: string
  designation?: string
  bio?: string
  achievements?: string[]
  teachingStyle?: string
  successRate?: number
  studentTestimonial?: string
}

export interface Testimonial {
  id: string
  name: string
  course: string
  rating: number
  comment: string
  image?: string
  result: string
  location?: string
  videoId?: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  course: string
  message?: string
  preferredTime?: string
}
