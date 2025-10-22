export interface LocalTestimonial {
  id: string
  name: string
  area: string
  school: string
  class: '11th' | '12th' | 'dropper'
  neetScore: {
    biology: number
    total: number
    rank: number
  }
  previousAttempt?: {
    biology: number
    total: number
  }
  improvement?: {
    biology: number
    total: number
  }
  college: string
  quote: string
  longStory: string
  image: string
  parentQuote?: string
  studyTips: string[]
  videoTestimonial?: string
  localDetails: {
    transportUsed: string
    studySpot: string
    favoriteFeature: string
  }
  socialProof: {
    followersOnInstagram?: number
    friendsJoinedAfter?: number
  }
}

export const localTestimonials: LocalTestimonial[] = [
  {
    id: 'arjun-gurgaon',
    name: 'Arjun Sharma',
    area: 'Gurgaon',
    school: 'DPS Gurgaon',
    class: '12th',
    neetScore: {
      biology: 168,
      total: 612,
      rank: 1245,
    },
    previousAttempt: {
      biology: 125,
      total: 478,
    },
    improvement: {
      biology: 43,
      total: 134,
    },
    college: 'AIIMS Delhi',
    quote:
      "Cerebrum's Gurgaon center completely transformed my biology preparation. Going from 125 to 168 in biology was a dream come true!",
    longStory:
      "I was a dropper from Gurgaon who scored poorly in my first NEET attempt. The teachers at Cerebrum Biology Academy near Cyber City not only helped me master difficult concepts but also built my confidence. The personalized attention and doubt-clearing sessions were game-changers. The convenient metro connectivity from DLF meant I never missed a class. Today, I'm pursuing my MBBS from AIIMS Delhi - all thanks to the incredible faculty here.",
    image: '/testimonials/arjun-gurgaon.jpg',
    parentQuote:
      "As working parents in Gurgaon, we needed flexible timings. Cerebrum provided evening batches that fit our schedule perfectly. Arjun's improvement was remarkable - from a dejected dropper to AIIMS qualified student.",
    studyTips: [
      'Used the metro study time for quick revisions',
      'Attended weekend doubt sessions religiously',
      'Made flashcards for biology diagrams during commute',
      'Formed study group with Gurgaon classmates',
    ],
    videoTestimonial: 'https://youtube.com/watch?v=arjun-gurgaon-story',
    localDetails: {
      transportUsed: 'DLF Cyber City Metro + Auto',
      studySpot: 'Cyber Hub CCD during breaks',
      favoriteFeature: 'Evening batches perfect for school students',
    },
    socialProof: {
      followersOnInstagram: 2400,
      friendsJoinedAfter: 8,
    },
  },
  {
    id: 'priya-noida',
    name: 'Priya Agarwal',
    area: 'Noida',
    school: 'DPS Noida',
    class: '12th',
    neetScore: {
      biology: 172,
      total: 635,
      rank: 892,
    },
    college: 'Lady Hardinge Medical College',
    quote:
      'The Sector 18 location was perfect! I could attend classes after school and the faculty made biology so interesting that I started loving the subject.',
    longStory:
      "As a Noida student, I was looking for quality coaching that wouldn't disrupt my school schedule. Cerebrum's Sector 18 center was perfectly located - just 10 minutes from my school. The teachers here have a unique way of explaining complex biological processes. They use real-life examples and stories that make everything memorable. The mock tests helped me practice time management, and the regular counseling sessions kept me motivated throughout my preparation.",
    image: '/testimonials/priya-noida.jpg',
    parentQuote:
      "Living in Sector 62, the transportation to Sector 18 was convenient. Priya's biology scores improved dramatically - from struggling with 110 marks to consistently scoring above 170 in mocks.",
    studyTips: [
      'Created biology corner in bedroom with diagrams',
      'Used Noida metro travel time for MCQ practice',
      'Visited coaching library on Sundays for group study',
      'Made mnemonics for taxonomy and classification',
    ],
    localDetails: {
      transportUsed: 'Noida Metro (Sector 18 station)',
      studySpot: 'Coaching center library',
      favoriteFeature: 'After-school timing perfect for DPS students',
    },
    socialProof: {
      followersOnInstagram: 1800,
      friendsJoinedAfter: 12,
    },
  },
  {
    id: 'rahul-faridabad',
    name: 'Rahul Kumar',
    area: 'Faridabad',
    school: 'MVN School Faridabad',
    class: 'dropper',
    neetScore: {
      biology: 165,
      total: 598,
      rank: 1678,
    },
    previousAttempt: {
      biology: 118,
      total: 445,
    },
    improvement: {
      biology: 47,
      total: 153,
    },
    college: 'Maulana Azad Medical College',
    quote:
      'The dropper batch at Faridabad center gave me exactly what I needed - focused preparation and emotional support during the toughest year of my life.',
    longStory:
      "After failing in my first NEET attempt, I was devastated. My parents suggested Cerebrum's Faridabad center, and it was the best decision ever. The dropper batch had students with similar stories, so I never felt alone. The faculty understood our psychology and provided not just academic support but emotional guidance too. The intensive revision sessions and daily mock tests kept me on track. The counseling sessions helped me stay positive during low phases.",
    image: '/testimonials/rahul-faridabad.jpg',
    parentQuote:
      "Rahul was depressed after his first failure. The counselors at Cerebrum Faridabad center provided psychological support along with academics. We're grateful for their holistic approach.",
    studyTips: [
      'Started each day with biology revision at 5 AM',
      'Used Faridabad metro for distraction-free study',
      'Joined peer study groups for motivation',
      'Practiced previous year papers daily',
    ],
    localDetails: {
      transportUsed: 'Faridabad Metro + Local bus',
      studySpot: 'NIT Faridabad library on weekends',
      favoriteFeature: 'Specialized dropper counseling sessions',
    },
    socialProof: {
      friendsJoinedAfter: 6,
    },
  },
  {
    id: 'anita-ghaziabad',
    name: 'Anita Singh',
    area: 'Ghaziabad',
    school: 'Ryan International Ghaziabad',
    class: '11th',
    neetScore: {
      biology: 158,
      total: 567,
      rank: 2456,
    },
    college: 'UCMS Delhi',
    quote:
      'Starting early in Class 11 at Cerebrum Ghaziabad gave me a solid foundation. The teachers here made biology concepts crystal clear from the beginning.',
    longStory:
      "I joined Cerebrum's Ghaziabad center right after Class 10th. The early start program helped me build strong fundamentals while managing my Class 11 studies. The faculty here is amazing at simplifying complex topics. They taught us how to integrate NCERT with advanced concepts needed for NEET. The weekend tests kept me consistent in my preparation. By the time I reached Class 12, I was already confident about biology section.",
    image: '/testimonials/anita-ghaziabad.jpg',
    parentQuote:
      "The Raj Nagar Extension location was convenient for us. Anita's consistent improvement from Class 11 gave us confidence that she would crack NEET.",
    studyTips: [
      'Made chapter-wise notes from Class 11 itself',
      'Used weekend metro travel for biology reading',
      'Created study schedule balancing school and coaching',
      'Discussed concepts with parents to reinforce learning',
    ],
    localDetails: {
      transportUsed: 'Delhi Metro (Dilshad Garden to Raj Nagar)',
      studySpot: 'Home study room with biology charts',
      favoriteFeature: 'Early foundation building program',
    },
    socialProof: {
      followersOnInstagram: 1200,
      friendsJoinedAfter: 4,
    },
  },
  {
    id: 'vikram-greater-noida',
    name: 'Vikram Gupta',
    area: 'Greater Noida',
    school: 'Shiv Nadar School',
    class: '12th',
    neetScore: {
      biology: 170,
      total: 623,
      rank: 1089,
    },
    college: 'VMMC & Safdarjung Hospital',
    quote:
      'The personal attention I received at Greater Noida center was incredible. The small batch size meant every doubt was cleared immediately.',
    longStory:
      "Being from Greater Noida, I had limited coaching options nearby. Cerebrum's Alpha 1 center was a blessing. The small batches meant personal attention from every teacher. They knew my strengths and weaknesses individually. The faculty helped me balance my Shiv Nadar School assignments with NEET preparation. The mock test series was challenging and prepared me well for the actual exam. The career counseling sessions helped me choose the right college during counseling.",
    image: '/testimonials/vikram-greater-noida.jpg',
    parentQuote:
      'The personalized approach at Greater Noida center was perfect for Vikram. The teachers regularly updated us about his progress and areas of improvement.',
    studyTips: [
      'Used Greater Noida metro for peaceful study',
      'Created biology museum at home with models',
      'Formed online study group with batch mates',
      'Visited medical colleges for motivation',
    ],
    localDetails: {
      transportUsed: 'Greater Noida Metro (Alpha 1 station)',
      studySpot: 'Knowledge Park libraries',
      favoriteFeature: 'Small batch size with personal mentoring',
    },
    socialProof: {
      followersOnInstagram: 950,
      friendsJoinedAfter: 3,
    },
  },
  {
    id: 'sneha-central-delhi',
    name: 'Sneha Malhotra',
    area: 'Central Delhi',
    school: 'Modern School Barakhamba',
    class: '12th',
    neetScore: {
      biology: 174,
      total: 641,
      rank: 765,
    },
    college: 'MAMC Delhi',
    quote:
      "The premium Central Delhi center provided the perfect environment for serious NEET preparation. The faculty's expertise and the location's convenience were unmatched.",
    longStory:
      "Studying at Modern School and preparing for NEET simultaneously was challenging. Cerebrum's Connaught Place center was perfectly located - just 20 minutes from my school. The evening batches were designed for students from premium schools like mine. The faculty understood the pressure we face and provided psychological support along with academics. The library facility was excellent for self-study. The regular interaction with medical professionals gave me insights into the medical field.",
    image: '/testimonials/sneha-central-delhi.jpg',
    parentQuote:
      "The CP location was ideal for our family. Sneha could attend classes after school and we could pick her up easily. The premium environment matched her school's standards.",
    studyTips: [
      'Used Delhi Metro blue line for revision',
      'Attended medical college seminars for motivation',
      'Created digital notes accessible on phone',
      'Joined online study groups with toppers',
    ],
    localDetails: {
      transportUsed: 'Delhi Metro (Rajiv Chowk)',
      studySpot: 'CP coaching center library',
      favoriteFeature: 'Premium location with excellent facilities',
    },
    socialProof: {
      followersOnInstagram: 3200,
      friendsJoinedAfter: 15,
    },
  },
]

export const getTestimonialsByArea = (areaId: string): LocalTestimonial[] => {
  return localTestimonials.filter(
    (testimonial) =>
      testimonial.area.toLowerCase() === areaId.toLowerCase() ||
      (areaId === 'delhi-central' && testimonial.area === 'Central Delhi') ||
      (areaId === 'greater-noida' && testimonial.area === 'Greater Noida')
  )
}

export const getAllSuccessStories = (): LocalTestimonial[] => {
  return localTestimonials
}

export const getTopTestimonials = (count: number = 3): LocalTestimonial[] => {
  return localTestimonials.sort((a, b) => a.neetScore.rank - b.neetScore.rank).slice(0, count)
}
