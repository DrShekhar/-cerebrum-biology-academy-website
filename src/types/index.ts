export interface Course {
  id: string
  title: string
  description: string
  duration: string
  price: number
  features: string[]
  targetClass: '11th' | '12th' | 'Dropper'
}

export interface Faculty {
  id: string
  name: string
  qualification: string
  experience: string
  specialization: string[]
  image: string
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
