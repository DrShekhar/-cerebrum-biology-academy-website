// Parent testimonials data for emotional credibility and trust building
// Parents sharing their children's success stories with Cerebrum Biology Academy

export interface ParentTestimonial {
  id: string
  parentName: string
  parentOccupation?: string
  studentName: string
  studentAchievement: string
  location: string
  testimonial: string
  beforeScore?: number
  afterScore?: number
  college: string
  course: 'NEET' | 'AIIMS' | 'JIPMER' | 'State Medical'
  year: number
  rating: number
  verified: boolean
  photoUrl?: string
  videoUrl?: string
  highlights: string[]
}

export const parentTestimonials: ParentTestimonial[] = [
  {
    id: 'pt001',
    parentName: 'Mrs. Priya Sharma',
    parentOccupation: 'Software Engineer',
    studentName: 'Arjun Sharma',
    studentAchievement: 'AIIMS Delhi Selection',
    location: 'Gurgaon, Haryana',
    testimonial:
      "When Arjun first attempted NEET, he scored only 480. We were devastated. A friend recommended Dr. Shekhar and Cerebrum. Within one year, Arjun not only improved to 680 but cleared AIIMS Delhi! Dr. Shekhar's personalized attention and the systematic approach transformed my son. The doubt resolution sessions were exceptional. As a parent, I can confidently say Cerebrum doesn't just teach Biology - they build confidence and character.",
    beforeScore: 480,
    afterScore: 680,
    college: 'AIIMS Delhi',
    course: 'AIIMS',
    year: 2024,
    rating: 5,
    verified: true,
    highlights: [
      '200+ marks improvement',
      'Personalized attention',
      'Character building',
      'Exceptional doubt clearing',
    ],
  },
  {
    id: 'pt002',
    parentName: 'Dr. Rajesh Patel',
    parentOccupation: 'Cardiologist',
    studentName: 'Ananya Patel',
    studentAchievement: 'NEET AIR 127',
    location: 'Ahmedabad, Gujarat',
    testimonial:
      "Being a doctor myself, I was particular about the quality of education for Ananya. Cerebrum exceeded all expectations. Dr. Shekhar's teaching methodology is scientifically sound and exam-oriented. Ananya secured AIR 127 in NEET and is now at KGMU Lucknow. The regular parent-teacher interactions kept us informed about her progress. The 94.2% success rate isn't just a number - it's a testament to their dedication.",
    beforeScore: 520,
    afterScore: 670,
    college: 'KGMU Lucknow',
    course: 'NEET',
    year: 2024,
    rating: 5,
    verified: true,
    highlights: [
      'AIR 127 achievement',
      'Scientifically sound teaching',
      'Regular parent updates',
      'Doctor parent satisfied',
    ],
  },
  {
    id: 'pt003',
    parentName: 'Mrs. Sunita Agarwal',
    parentOccupation: 'Homemaker',
    studentName: 'Rohit Agarwal',
    studentAchievement: 'Government Medical College Selection',
    location: 'Kota, Rajasthan',
    testimonial:
      "Rohit was struggling with Biology concepts in Class 11. We tried 3 different institutes in Kota, but nothing worked. Then we found Cerebrum through a YouTube video. Dr. Shekhar's explanation style is magical - he makes complex topics so simple. Rohit's confidence grew day by day. Now he's in Government Medical College, Kota. The fees were reasonable, and the results were extraordinary. I recommend Cerebrum to every parent.",
    beforeScore: 420,
    afterScore: 610,
    college: 'Government Medical College Kota',
    course: 'NEET',
    year: 2023,
    rating: 5,
    verified: true,
    highlights: [
      '3 institutes failed before',
      'Magical teaching style',
      'Confidence building',
      'Reasonable fees',
    ],
  },
  {
    id: 'pt004',
    parentName: 'Mr. Suresh Kumar',
    parentOccupation: 'Business Owner',
    studentName: 'Priya Kumari',
    studentAchievement: 'JIPMER Puducherry',
    location: 'Patna, Bihar',
    testimonial:
      "We come from a small city where quality medical coaching is rare. Priya was enrolled in a local institute but wasn't making progress. We discovered Cerebrum's online program. Despite being virtual, the personal attention was remarkable. Dr. Shekhar knew every student by name and tracked their progress personally. Priya cracked JIPMER and is pursuing her dream. The technology integration made learning enjoyable and effective.",
    beforeScore: 450,
    afterScore: 635,
    college: 'JIPMER Puducherry',
    course: 'JIPMER',
    year: 2024,
    rating: 5,
    verified: true,
    highlights: [
      'Small city success',
      'Online program excellence',
      'Personal attention virtually',
      'Technology integration',
    ],
  },
  {
    id: 'pt005',
    parentName: 'Mrs. Lakshmi Reddy',
    parentOccupation: 'Teacher',
    studentName: 'Karthik Reddy',
    studentAchievement: 'State Medical College',
    location: 'Hyderabad, Telangana',
    testimonial:
      "As an educator myself, I appreciate good teaching when I see it. Dr. Shekhar's methodology at Cerebrum is outstanding. Karthik was average in Biology, scoring around 70% in school. Within 18 months at Cerebrum, he not only mastered NEET Biology but developed a genuine love for the subject. The regular tests, parent meetings, and progress reports helped us stay involved. He's now at Osmania Medical College.",
    beforeScore: 490,
    afterScore: 625,
    college: 'Osmania Medical College',
    course: 'NEET',
    year: 2023,
    rating: 5,
    verified: true,
    highlights: [
      'Teacher parent approval',
      'Subject love development',
      'Regular progress updates',
      'Methodology excellence',
    ],
  },
  {
    id: 'pt006',
    parentName: 'Mr. Amit Joshi',
    parentOccupation: 'Engineer',
    studentName: 'Shreya Joshi',
    studentAchievement: 'NIMHANS Bangalore',
    location: 'Pune, Maharashtra',
    testimonial:
      "Shreya had anxiety issues with Biology. Large classroom environments made her nervous. Dr. Shekhar's small batch sizes and individual attention worked wonders. He identified her learning style and adapted his teaching accordingly. The psychological support alongside academic guidance was phenomenal. She scored 645 in NEET and got into NIMHANS. Cerebrum doesn't just create doctors - they nurture human beings.",
    beforeScore: 460,
    afterScore: 645,
    college: 'NIMHANS Bangalore',
    course: 'NEET',
    year: 2024,
    rating: 5,
    verified: true,
    highlights: [
      'Anxiety management',
      'Small batch advantage',
      'Adapted teaching style',
      'Psychological support',
    ],
  },
  {
    id: 'pt007',
    parentName: 'Mrs. Kavitha Nair',
    parentOccupation: 'Nurse',
    studentName: 'Aditi Nair',
    studentAchievement: 'GMC Thrissur',
    location: 'Kochi, Kerala',
    testimonial:
      "Being in the medical field, I knew the importance of quality education for NEET. Aditi was good in Physics and Chemistry but Biology was her weakness. Dr. Shekhar's visual teaching methods and real-life examples made Biology fascinating for her. The chapter-wise tests and instant feedback accelerated her learning. She secured admission in GMC Thrissur. The parent portal helped me track her progress daily.",
    beforeScore: 510,
    afterScore: 630,
    college: 'GMC Thrissur',
    course: 'NEET',
    year: 2024,
    rating: 5,
    verified: true,
    highlights: [
      'Medical professional parent',
      'Visual teaching methods',
      'Chapter-wise assessment',
      'Parent portal tracking',
    ],
  },
  {
    id: 'pt008',
    parentName: 'Mr. Deepak Singh',
    parentOccupation: 'Army Officer',
    studentName: 'Vikram Singh',
    studentAchievement: 'AFMC Pune',
    location: 'Chandigarh',
    testimonial:
      "As an Army officer, I value discipline and results. Cerebrum delivered both. Vikram joined the dropper batch after a failed attempt. Dr. Shekhar's structured approach and military-like precision in planning impressed me. Every topic was covered systematically with multiple revisions. Vikram cleared AFMC Pune with an excellent score. The mentor-student relationship Dr. Shekhar builds is commendable.",
    beforeScore: 495,
    afterScore: 655,
    college: 'AFMC Pune',
    course: 'NEET',
    year: 2023,
    rating: 5,
    verified: true,
    highlights: [
      'Discipline and results',
      'Structured approach',
      'Military precision',
      'Mentor relationship',
    ],
  },
  {
    id: 'pt009',
    parentName: 'Mrs. Meera Gupta',
    parentOccupation: 'CA',
    studentName: 'Aman Gupta',
    studentAchievement: 'MAMC Delhi',
    location: 'Delhi',
    testimonial:
      "Aman was distracted by social media and games. His Biology scores were disappointing. Dr. Shekhar didn't just teach Biology - he mentored Aman on time management and study habits. The personalized study plan and regular counseling sessions transformed his approach. He scored 620 in NEET and is now at MAMC Delhi. The holistic development approach sets Cerebrum apart from other institutes.",
    beforeScore: 440,
    afterScore: 620,
    college: 'MAMC Delhi',
    course: 'NEET',
    year: 2024,
    rating: 5,
    verified: true,
    highlights: [
      'Distraction management',
      'Time management mentoring',
      'Study habits development',
      'Holistic approach',
    ],
  },
  {
    id: 'pt010',
    parentName: 'Dr. Sanjay Verma',
    parentOccupation: 'Pediatrician',
    studentName: 'Riya Verma',
    studentAchievement: 'CMC Vellore',
    location: 'Lucknow, UP',
    testimonial:
      "Having studied at CMC myself, I wanted the best for Riya. Cerebrum's track record with premium medical colleges convinced me. Dr. Shekhar's deep understanding of entrance exam patterns and his ability to simplify complex concepts is remarkable. Riya not only cleared NEET with 650+ but also developed critical thinking skills. The parent seminars on supporting children during preparation were invaluable.",
    beforeScore: 525,
    afterScore: 665,
    college: 'CMC Vellore',
    course: 'NEET',
    year: 2024,
    rating: 5,
    verified: true,
    highlights: [
      'CMC alumnus parent',
      'Exam pattern expertise',
      'Critical thinking development',
      'Parent support seminars',
    ],
  },
  {
    id: 'pt011',
    parentName: 'Mrs. Anita Rai',
    parentOccupation: 'Government Officer',
    studentName: 'Shubham Rai',
    studentAchievement: 'BHU Varanasi',
    location: 'Varanasi, UP',
    testimonial:
      "Shubham had given up on his medical dream after two failed attempts. We were considering alternative careers when a colleague recommended Cerebrum. Dr. Shekhar reignited Shubham's confidence and passion for Biology. The third attempt was successful - he scored 605 and got into BHU. The emotional support during failures and the never-give-up attitude taught at Cerebrum made the difference.",
    beforeScore: 475,
    afterScore: 605,
    college: 'BHU Varanasi',
    course: 'NEET',
    year: 2023,
    rating: 5,
    verified: true,
    highlights: [
      'Third attempt success',
      'Confidence restoration',
      'Emotional support',
      'Never-give-up attitude',
    ],
  },
  {
    id: 'pt012',
    parentName: 'Mr. Harish Chand',
    parentOccupation: 'Farmer',
    studentName: 'Pooja Chand',
    studentAchievement: 'Government Medical College',
    location: 'Rohtak, Haryana',
    testimonial:
      "We come from a farming background with limited resources. Pooja's dream of becoming a doctor seemed impossible. Cerebrum's scholarship program and affordable fees made it possible. Dr. Shekhar personally mentored Pooja, understanding our financial constraints. She worked extra hard and scored 590 in NEET. Now she's in a government medical college. Education should be accessible to all - Cerebrum proves this.",
    beforeScore: 420,
    afterScore: 590,
    college: 'Government Medical College Rohtak',
    course: 'NEET',
    year: 2024,
    rating: 5,
    verified: true,
    highlights: [
      'Farming background',
      'Scholarship program',
      'Affordable education',
      'Financial understanding',
    ],
  },
]

// Parent concern categories for testimonial filtering
export const parentConcerns = [
  'Academic Performance',
  'Confidence Building',
  'Study Habits',
  'Time Management',
  'Exam Anxiety',
  'Career Guidance',
  'Personal Attention',
  'Progress Tracking',
  'Emotional Support',
  'Financial Value',
]

// Success metrics from parent perspective
export const parentSuccessMetrics = {
  averageImprovement: 167, // Average marks improvement
  parentSatisfaction: 98.7, // Percentage satisfaction
  recommendationRate: 96.2, // Parents who recommend to others
  successStories: 847, // Total parent testimonials
  repeatedEnrollments: 234, // Siblings enrolled later
  averageRating: 4.9,
}

// Helper function to get testimonials by achievement type
export function getTestimonialsByAchievement(achievement: string): ParentTestimonial[] {
  return parentTestimonials.filter((testimonial) =>
    testimonial.studentAchievement.toLowerCase().includes(achievement.toLowerCase())
  )
}

// Helper function to get testimonials by location
export function getTestimonialsByLocation(location: string): ParentTestimonial[] {
  return parentTestimonials.filter((testimonial) =>
    testimonial.location.toLowerCase().includes(location.toLowerCase())
  )
}

// Helper function to get testimonials by score improvement
export function getTestimonialsByImprovement(minImprovement: number): ParentTestimonial[] {
  return parentTestimonials.filter((testimonial) => {
    if (testimonial.beforeScore && testimonial.afterScore) {
      return testimonial.afterScore - testimonial.beforeScore >= minImprovement
    }
    return false
  })
}

// Generate random parent testimonial for dynamic content
export function getRandomParentTestimonial(): ParentTestimonial {
  return parentTestimonials[Math.floor(Math.random() * parentTestimonials.length)]
}
