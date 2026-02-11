/**
 * NEET Parents Guidance Seminar Configuration
 * Weekly seminars every Friday at 8:00 PM IST
 */

export interface SeminarSlot {
  id: string
  date: Date
  time: string
  timezone: string
  zoomLink?: string
  maxSeats: number
  registeredCount: number
  status: 'upcoming' | 'full' | 'completed' | 'cancelled'
}

export interface SeminarPricing {
  earlyBird: number
  standard: number
  premium: number
  currency: string
  currencySymbol: string
}

export interface SeminarConfig {
  title: string
  subtitle: string
  description: string
  duration: number
  weekday: number
  time: string
  timezone: string
  pricing: SeminarPricing
  maxSeatsPerSession: number
  speakerName: string
  speakerTitle: string
  speakerBio: string
  speakerImage: string
  zoomMeetingId?: string
}

export const SEMINAR_CONFIG: SeminarConfig = {
  title: 'NEET Guidance Seminar for Parents',
  subtitle: 'Does Your Child Have What It Takes to Crack NEET?',
  description:
    "Learn the 3 critical mistakes 90% of NEET parents make and how to avoid them. Get expert guidance on supporting your child's NEET preparation journey.",
  duration: 60,
  weekday: 5, // Friday (0 = Sunday, 5 = Friday)
  time: '20:00', // 8:00 PM
  timezone: 'Asia/Kolkata',
  pricing: {
    earlyBird: 99,
    standard: 199,
    premium: 299,
    currency: 'INR',
    currencySymbol: '₹',
  },
  maxSeatsPerSession: 50,
  speakerName: 'Dr. Shekhar',
  speakerTitle: 'Founder, Cerebrum Biology Academy',
  speakerBio:
    '15+ years of teaching experience with 1,50,000+ students mentored. Specializes in Biology and NEET preparation strategies.',
  speakerImage: '/images/dr-shekhar.jpg',
}

/**
 * Get the next upcoming seminar date (next Friday at 8 PM IST)
 */
export function getNextSeminarDate(): Date {
  const now = new Date()
  const istOffset = 5.5 * 60 * 60 * 1000 // IST is UTC+5:30
  const nowIST = new Date(now.getTime() + istOffset)

  // Find next Friday
  const dayOfWeek = nowIST.getUTCDay()
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7 // 5 = Friday

  // If it's Friday and past 8 PM, get next Friday
  const fridayDate = new Date(nowIST)
  fridayDate.setUTCDate(fridayDate.getUTCDate() + daysUntilFriday)
  fridayDate.setUTCHours(14, 30, 0, 0) // 8:00 PM IST = 14:30 UTC

  // If we're on Friday but past seminar time, move to next week
  if (daysUntilFriday === 0 && nowIST.getUTCHours() >= 14) {
    fridayDate.setUTCDate(fridayDate.getUTCDate() + 7)
  }

  return fridayDate
}

/**
 * Get upcoming seminar slots for the next N weeks
 */
export function getUpcomingSeminars(weeks: number = 4): SeminarSlot[] {
  const slots: SeminarSlot[] = []
  const baseDate = getNextSeminarDate()

  for (let i = 0; i < weeks; i++) {
    const slotDate = new Date(baseDate)
    slotDate.setDate(slotDate.getDate() + i * 7)

    slots.push({
      id: `seminar-${slotDate.toISOString().split('T')[0]}`,
      date: slotDate,
      time: '8:00 PM IST',
      timezone: 'Asia/Kolkata',
      maxSeats: SEMINAR_CONFIG.maxSeatsPerSession,
      registeredCount: 0, // Will be fetched from database
      status: 'upcoming',
    })
  }

  return slots
}

/**
 * Format date for display
 */
export function formatSeminarDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Calculate time remaining until seminar
 */
export function getTimeUntilSeminar(seminarDate: Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
} {
  const now = new Date()
  const total = seminarDate.getTime() - now.getTime()

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((total % (1000 * 60)) / 1000),
    total,
  }
}

/**
 * Generate .ics calendar file content for the seminar
 */
export function generateCalendarICS(seminarDate: Date, zoomLink?: string): string {
  const endDate = new Date(seminarDate.getTime() + SEMINAR_CONFIG.duration * 60 * 1000)

  const formatICSDate = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cerebrum Biology Academy//NEET Seminar//EN
BEGIN:VEVENT
UID:${seminarDate.toISOString()}-neet-seminar@cerebrumbiologyacademy.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(seminarDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${SEMINAR_CONFIG.title}
DESCRIPTION:${SEMINAR_CONFIG.description}${zoomLink ? `\\n\\nJoin: ${zoomLink}` : ''}
LOCATION:Online (Zoom)
STATUS:CONFIRMED
ORGANIZER;CN=${SEMINAR_CONFIG.speakerName}:mailto:info@cerebrumbiologyacademy.com
END:VEVENT
END:VCALENDAR`
}

/**
 * What parents will learn (value propositions)
 */
export const SEMINAR_VALUE_PROPS = [
  {
    icon: 'Target',
    title: 'NEET 2025 Exam Pattern',
    description: 'Understand the latest exam format, marking scheme, and cut-off analysis',
  },
  {
    icon: 'Users',
    title: "Parent's Role in NEET Success",
    description: '3 critical mistakes to avoid and 3 proven strategies for effective support',
  },
  {
    icon: 'BookOpen',
    title: 'Biology Mastery Roadmap',
    description: 'Why Biology is the key differentiator and how to score 340+ marks',
  },
  {
    icon: 'Heart',
    title: 'Managing Stress & Mental Health',
    description: 'Proven techniques to keep your child motivated without adding pressure',
  },
  {
    icon: 'Award',
    title: 'Right Coaching Strategy',
    description: 'How to choose the right coaching approach and balance self-study',
  },
]

/**
 * Parent pain points (for landing page)
 */
export const PARENT_PAIN_POINTS = [
  'Is coaching alone enough for NEET success?',
  'How do I support my child without adding pressure?',
  "What's the right study strategy for Biology?",
  'How do I know if my child is on track?',
  'When should NEET preparation really start?',
]

/**
 * FAQs for the seminar
 */
export const SEMINAR_FAQS = [
  {
    question: 'Is this a sales pitch?',
    answer:
      "No, this is a genuine guidance session. We share practical strategies that work, regardless of where your child studies. Of course, we'll briefly mention our courses, but the focus is on providing value.",
  },
  {
    question: 'Will there be a recording available?',
    answer:
      'Yes! All registered participants receive the recording within 24 hours of the session, so you can revisit the content anytime.',
  },
  {
    question: 'Can both parents attend with one registration?',
    answer:
      'Absolutely! One registration allows both parents to attend on the same device. We encourage both parents to join for maximum benefit.',
  },
  {
    question: 'Why is there a registration fee?',
    answer:
      'The nominal ₹199 fee ensures only serious parents attend, leading to better engagement and Q&A sessions. Free webinars typically have 10-20% attendance, while paid ones have 60%+ attendance.',
  },
  {
    question: 'What if I miss the live session?',
    answer:
      "You'll receive the recording and all resources via WhatsApp and email. However, we recommend attending live for the interactive Q&A.",
  },
  {
    question: 'Is this suitable for Class 11 or 12 parents?',
    answer:
      'Both! Class 11 parents can start early with the right strategy, while Class 12 parents can course-correct and optimize remaining time.',
  },
]

/**
 * Testimonials for the seminar page
 */
export const SEMINAR_TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    avatar: '👩',
    quote:
      'The seminar completely changed my perspective. I was unknowingly putting too much pressure on my daughter. Now I know how to support her effectively.',
    childResult: 'Daughter scored AIR 1500 in NEET 2024',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    avatar: '👨',
    quote:
      "Dr. Shekhar's insights about Biology strategy were eye-opening. My son improved from 50th percentile to 95th percentile in just 6 months.",
    childResult: 'Son improved by 45 percentile points',
  },
  {
    name: 'Meenakshi Iyer',
    location: 'Chennai',
    avatar: '👩',
    quote:
      "As a working parent, I felt helpless about my daughter's preparation. This seminar gave me actionable steps I could actually follow.",
    childResult: 'Daughter got admission in top medical college',
  },
]
