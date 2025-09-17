// Photo Gallery Data - Authentic moments with Dr. Shekhar and Cerebrum students
// Real photos during classes, seminars, and celebration moments

export interface PhotoItem {
  id: string
  url: string
  title: string
  description: string
  category:
    | 'classroom'
    | 'celebrations'
    | 'seminars'
    | 'awards'
    | 'study_groups'
    | 'mentoring'
    | 'events'
  date: string
  location: string
  students?: string[]
  achievement?: string
  featured: boolean
  tags: string[]
}

export interface PhotoCategory {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

// Photo categories for filtering
export const photoCategories: PhotoCategory[] = [
  {
    id: 'all',
    name: 'All Photos',
    description: 'Complete collection of Cerebrum moments',
    icon: 'Grid',
    count: 48,
  },
  {
    id: 'classroom',
    name: 'Classroom Moments',
    description: 'Dr. Shekhar teaching and interacting with students',
    icon: 'BookOpen',
    count: 15,
  },
  {
    id: 'celebrations',
    name: 'Success Celebrations',
    description: 'Celebrating NEET success with students',
    icon: 'Trophy',
    count: 12,
  },
  {
    id: 'seminars',
    name: 'Seminars & Workshops',
    description: 'Educational seminars and motivational sessions',
    icon: 'Users',
    count: 8,
  },
  {
    id: 'awards',
    name: 'Award Ceremonies',
    description: 'Recognizing and awarding top performers',
    icon: 'Award',
    count: 6,
  },
  {
    id: 'mentoring',
    name: 'Personal Mentoring',
    description: 'One-on-one guidance and counseling sessions',
    icon: 'Heart',
    count: 7,
  },
]

// Sample photo gallery data inspired by biologyforneetug.com homepage showcase
// In production, these would be actual photo URLs from your collection
export const photoGallery: PhotoItem[] = [
  {
    id: 'pg001',
    url: '/images/gallery/classroom-biology-session-1.jpg',
    title: 'Photosynthesis Deep Dive Session',
    description:
      'Dr. Shekhar explaining photosynthesis mechanism to Class 12 NEET students with detailed diagrams and real-life examples.',
    category: 'classroom',
    date: '2024-03-15',
    location: 'Cerebrum Main Campus, Gurgaon',
    students: ['Arjun Sharma', 'Priya Patel', 'Rohit Kumar'],
    featured: true,
    tags: ['photosynthesis', 'class-12', 'biology', 'neet-preparation'],
  },
  {
    id: 'pg002',
    url: '/images/gallery/success-celebration-aiims.jpg',
    title: 'AIIMS Delhi Selection Celebration',
    description:
      'Celebrating with Ananya Patel after her AIIMS Delhi selection with AIR 127. A moment of pure joy and achievement.',
    category: 'celebrations',
    date: '2024-01-20',
    location: 'Cerebrum Academy',
    students: ['Ananya Patel'],
    achievement: 'AIIMS Delhi Selection - AIR 127',
    featured: true,
    tags: ['aiims', 'success', 'celebration', 'top-rank'],
  },
  {
    id: 'pg003',
    url: '/images/gallery/motivational-seminar-neet.jpg',
    title: 'NEET Motivation Seminar 2024',
    description:
      'Inspiring 200+ NEET aspirants with success strategies and mindset development during annual motivation seminar.',
    category: 'seminars',
    date: '2024-02-10',
    location: 'Auditorium, Gurgaon',
    featured: true,
    tags: ['motivation', 'seminar', 'neet-strategy', 'inspiration'],
  },
  {
    id: 'pg004',
    url: '/images/gallery/study-group-discussion.jpg',
    title: 'Interactive Doubt Resolution',
    description:
      'Students actively participating in doubt resolution session with Dr. Shekhar clarifying complex Biology concepts.',
    category: 'classroom',
    date: '2024-03-08',
    location: 'Cerebrum Study Hall',
    students: ['Vikram Singh', 'Shreya Joshi', 'Aman Gupta'],
    featured: false,
    tags: ['doubt-resolution', 'interactive', 'group-study'],
  },
  {
    id: 'pg005',
    url: '/images/gallery/award-ceremony-toppers.jpg',
    title: 'Annual Toppers Award Ceremony',
    description:
      'Recognizing top 10 NEET performers of 2024 batch with awards and certificates in annual ceremony.',
    category: 'awards',
    date: '2024-07-15',
    location: 'Cerebrum Academy',
    achievement: 'Top 10 NEET Performers 2024',
    featured: true,
    tags: ['awards', 'toppers', 'ceremony', 'recognition'],
  },
  {
    id: 'pg006',
    url: '/images/gallery/genetics-lab-session.jpg',
    title: 'Genetics Lab Practical',
    description:
      'Hands-on genetics practical session with microscopes and specimen analysis for better understanding.',
    category: 'classroom',
    date: '2024-04-02',
    location: 'Cerebrum Bio Lab',
    students: ['Riya Verma', 'Shubham Rai'],
    featured: false,
    tags: ['genetics', 'practical', 'lab', 'microscope'],
  },
  {
    id: 'pg007',
    url: '/images/gallery/one-on-one-mentoring.jpg',
    title: 'Personal Counseling Session',
    description:
      'Individual guidance session with struggling student, providing emotional support and study plan adjustment.',
    category: 'mentoring',
    date: '2024-03-20',
    location: 'Dr. Shekhar Office',
    students: ['Pooja Chand'],
    featured: false,
    tags: ['counseling', 'mentoring', 'personal-guidance'],
  },
  {
    id: 'pg008',
    url: '/images/gallery/parent-meeting-success.jpg',
    title: 'Parent-Teacher Success Meet',
    description:
      'Sharing success strategies with parents during quarterly parent-teacher meeting with refreshments and discussions.',
    category: 'seminars',
    date: '2024-03-25',
    location: 'Cerebrum Conference Room',
    featured: false,
    tags: ['parents', 'meeting', 'success-strategies'],
  },
  {
    id: 'pg009',
    url: '/images/gallery/biology-model-explanation.jpg',
    title: 'Heart Model Demonstration',
    description:
      'Using 3D heart model to explain circulatory system to NEET students with detailed anatomical features.',
    category: 'classroom',
    date: '2024-02-28',
    location: 'Cerebrum Main Classroom',
    students: ['Aditi Nair', 'Karthik Reddy'],
    featured: false,
    tags: ['heart', 'anatomy', 'models', 'demonstration'],
  },
  {
    id: 'pg010',
    url: '/images/gallery/neet-result-celebration.jpg',
    title: 'NEET 2024 Results Celebration',
    description:
      'Group celebration with all successful NEET 2024 candidates who secured medical college admissions.',
    category: 'celebrations',
    date: '2024-06-14',
    location: 'Cerebrum Academy',
    achievement: 'NEET 2024 Batch Success',
    featured: true,
    tags: ['neet-results', 'batch-success', 'celebration'],
  },
  {
    id: 'pg011',
    url: '/images/gallery/plant-physiology-outdoor.jpg',
    title: 'Outdoor Plant Study Session',
    description:
      'Field trip to botanical garden for practical plant physiology understanding with live plant examples.',
    category: 'classroom',
    date: '2024-04-15',
    location: 'Delhi Botanical Garden',
    students: ['Multiple students'],
    featured: false,
    tags: ['plant-physiology', 'outdoor', 'field-trip', 'practical'],
  },
  {
    id: 'pg012',
    url: '/images/gallery/mock-test-session.jpg',
    title: 'NEET Mock Test Session',
    description:
      'Students taking serious NEET mock test under exam conditions with Dr. Shekhar monitoring.',
    category: 'classroom',
    date: '2024-04-20',
    location: 'Cerebrum Test Hall',
    featured: false,
    tags: ['mock-test', 'exam-preparation', 'neet-practice'],
  },
  {
    id: 'pg013',
    url: '/images/gallery/sadhna-sirin-celebration.jpg',
    title: 'Sadhna Sirin - NEET 2023 Topper (695 Marks)',
    description:
      'Celebrating with Sadhna Sirin after her exceptional NEET 2023 performance, scoring 695 marks - one of our proudest moments.',
    category: 'celebrations',
    date: '2023-06-08',
    location: 'Cerebrum Academy',
    students: ['Sadhna Sirin'],
    achievement: 'NEET 2023 - 695 Marks',
    featured: true,
    tags: ['neet-2023', 'topper', '695-marks', 'success-story'],
  },
  {
    id: 'pg014',
    url: '/images/gallery/dr-shekhar-teaching-moment.jpg',
    title: 'Dr. Shekhar - Chief Educator in Action',
    description:
      'Dr. Shekhar Singh, Director & Chief Educator of Cerebrum, explaining complex NEET Biology concepts with his signature teaching style.',
    category: 'classroom',
    date: '2024-03-10',
    location: 'Cerebrum Main Classroom',
    featured: true,
    tags: ['dr-shekhar', 'teaching', 'biology-concepts', 'director'],
  },
  {
    id: 'pg015',
    url: '/images/gallery/meet-our-neet-toppers.jpg',
    title: 'Meet Our NEET Toppers Gallery',
    description:
      "Group photo session with multiple NEET toppers who achieved exceptional scores through Cerebrum's guidance and mentorship.",
    category: 'celebrations',
    date: '2024-07-01',
    location: 'Cerebrum Academy',
    achievement: 'Multiple NEET Toppers 2024',
    featured: true,
    tags: ['neet-toppers', 'group-photo', 'success-gallery', 'achievement'],
  },
  {
    id: 'pg016',
    url: '/images/gallery/abhisek-afmc-selection.jpg',
    title: 'Abhisek - AFMC Selection Celebration',
    description:
      'Celebrating with Abhisek after his successful AFMC selection, another proud moment for the Cerebrum family.',
    category: 'celebrations',
    date: '2024-02-15',
    location: 'Cerebrum Academy',
    students: ['Abhisek'],
    achievement: 'AFMC Selection',
    featured: true,
    tags: ['afmc', 'selection', 'abhisek', 'medical-college'],
  },
  {
    id: 'pg017',
    url: '/images/gallery/student-testimonial-recording.jpg',
    title: 'Recording Student Success Testimonials',
    description:
      'Behind the scenes: Recording video testimonials with successful NEET candidates sharing their Cerebrum journey.',
    category: 'events',
    date: '2024-06-20',
    location: 'Cerebrum Media Room',
    featured: false,
    tags: ['testimonials', 'video-recording', 'success-stories', 'behind-scenes'],
  },
  {
    id: 'pg018',
    url: '/images/gallery/biology-practical-lab.jpg',
    title: 'Advanced Biology Practical Session',
    description:
      'Students engaged in hands-on biology practical work, understanding complex concepts through direct observation and experimentation.',
    category: 'classroom',
    date: '2024-04-05',
    location: 'Cerebrum Biology Lab',
    featured: false,
    tags: ['practical', 'biology-lab', 'hands-on-learning', 'experiments'],
  },
]

// Photo gallery statistics
export const galleryStats = {
  totalPhotos: 56,
  yearsOfMemories: 5,
  studentsDocumented: 267,
  successMoments: 98,
  classroomSessions: 168,
  lastUpdated: '2024-04-25',
}

// Helper functions
export function getPhotosByCategory(category: string): PhotoItem[] {
  if (category === 'all') return photoGallery
  return photoGallery.filter((photo) => photo.category === category)
}

export function getFeaturedPhotos(): PhotoItem[] {
  return photoGallery.filter((photo) => photo.featured)
}

export function getPhotosByTag(tag: string): PhotoItem[] {
  return photoGallery.filter((photo) => photo.tags.includes(tag))
}

export function searchPhotos(query: string): PhotoItem[] {
  const searchTerm = query.toLowerCase()
  return photoGallery.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchTerm) ||
      photo.description.toLowerCase().includes(searchTerm) ||
      photo.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  )
}
