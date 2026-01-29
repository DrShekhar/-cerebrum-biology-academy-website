export interface SchoolPageData {
  slug: string
  schoolName: string
  locality: string
  nearestCenter: string
  distance: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  schoolHighlights: string[]
  whyStudentsChoose: Array<{
    title: string
    description: string
  }>
  successStories: Array<{
    name: string
    batch: string
    result: string
    quote: string
  }>
  faqs: Array<{ question: string; answer: string }>
  relatedSchools: Array<{ name: string; url: string }>
  centerDetails: {
    name: string
    address: string
    timing: string
    phone: string
  }
}

export const schoolPagesData: Record<string, SchoolPageData> = {
  'neet-coaching-dps-rk-puram-students': {
    slug: 'neet-coaching-dps-rk-puram-students',
    schoolName: 'DPS RK Puram',
    locality: 'RK Puram, South Delhi',
    nearestCenter: 'South Delhi Center',
    distance: '4-5 km',
    metaTitle: 'NEET Coaching for DPS RK Puram Students | Cerebrum Biology Academy',
    metaDescription:
      'Specialized NEET biology coaching for DPS RK Puram students. After-school batches, sync with DPS curriculum. 15+ DPS RK Puram alumni selected to AIIMS.',
    heroTitle: 'NEET Coaching for DPS RK Puram Students',
    heroSubtitle:
      'Join 50+ DPS RK Puram students preparing for NEET at our South Delhi center. After-school batches designed around your school schedule.',
    schoolHighlights: [
      '50+ DPS RK Puram students enrolled',
      '15+ alumni selected to AIIMS/top medical colleges',
      'After-school batches starting 4:30 PM',
      'Curriculum synced with DPS academic calendar',
    ],
    whyStudentsChoose: [
      {
        title: 'Convenient Location',
        description: 'Our South Extension center is just 15 minutes from DPS RK Puram campus.',
      },
      {
        title: 'DPS-Friendly Schedule',
        description: 'Classes start after 4:30 PM, perfectly timed for DPS students.',
      },
      {
        title: 'Peer Group',
        description: 'Study with fellow DPS students who understand your academic environment.',
      },
      {
        title: 'Exam Coordination',
        description: 'We adjust our schedule around DPS exam periods and holidays.',
      },
    ],
    successStories: [
      {
        name: 'Ananya Sharma',
        batch: 'DPS RK Puram, Class of 2023',
        result: 'AIIMS Delhi - MBBS',
        quote:
          'Cerebrum understood the pressure of DPS academics. They helped me balance both perfectly.',
      },
      {
        name: 'Rohan Mehta',
        batch: 'DPS RK Puram, Class of 2024',
        result: 'NEET Score: 685',
        quote:
          'The after-school timing was perfect. I could attend classes without missing anything at school.',
      },
    ],
    faqs: [
      {
        question: 'What time do classes start for DPS RK Puram students?',
        answer:
          'Our evening batches for DPS students start at 4:30 PM and 5:30 PM, giving you enough time to reach from school. Weekend batches are also available for those who prefer intensive weekend learning.',
      },
      {
        question: 'How far is Cerebrum from DPS RK Puram?',
        answer:
          'Our South Extension center is approximately 4-5 km from DPS RK Puram, about 15-20 minutes by car or metro. Many DPS students commute directly after school.',
      },
      {
        question: 'Do you coordinate with DPS exam schedule?',
        answer:
          'Yes! We are aware of DPS academic calendar and adjust our test schedules accordingly. During your school exams, coaching tests are postponed or made optional.',
      },
      {
        question: 'How many DPS RK Puram students study at Cerebrum?',
        answer:
          'Currently, we have 50+ students from DPS RK Puram across various batches. This creates a supportive peer environment where students can study together.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Vasant Kunj', url: '/neet-coaching-dps-vasant-kunj-students' },
      { name: 'Modern School Barakhamba', url: '/neet-coaching-modern-school-students' },
      { name: 'Sanskriti School', url: '/neet-coaching-sanskriti-school-students' },
    ],
    centerDetails: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-dps-vasant-kunj-students': {
    slug: 'neet-coaching-dps-vasant-kunj-students',
    schoolName: 'DPS Vasant Kunj',
    locality: 'Vasant Kunj, South Delhi',
    nearestCenter: 'South Delhi Center',
    distance: '6-7 km',
    metaTitle: 'NEET Coaching for DPS Vasant Kunj Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET coaching for DPS Vasant Kunj students near Vasant Kunj. After-school biology classes, experienced faculty. Join 40+ DPS VK students.',
    heroTitle: 'NEET Coaching for DPS Vasant Kunj Students',
    heroSubtitle:
      'Specialized NEET preparation for DPS Vasant Kunj students at our South Delhi center. After-school and weekend options available.',
    schoolHighlights: [
      '40+ DPS Vasant Kunj students enrolled',
      '12+ alumni in top medical colleges',
      'Evening batches from 5 PM',
      'Weekend intensive options available',
    ],
    whyStudentsChoose: [
      {
        title: 'South Delhi Location',
        description:
          'South Extension center is easily accessible from Vasant Kunj via Outer Ring Road.',
      },
      {
        title: 'Flexible Timing',
        description: 'Multiple batch options including 5 PM evening and Saturday-Sunday batches.',
      },
      {
        title: 'DPS Network',
        description: 'Connect with DPS RK Puram and other DPS students for group study.',
      },
      {
        title: 'Transport Friendly',
        description: 'Good metro connectivity via Chattarpur and AIIMS metro stations.',
      },
    ],
    successStories: [
      {
        name: 'Priya Singh',
        batch: 'DPS Vasant Kunj, Class of 2024',
        result: 'NEET Score: 670',
        quote: 'The weekend batches helped me cover the entire syllabus without missing school.',
      },
    ],
    faqs: [
      {
        question: 'Which center is best for DPS Vasant Kunj students?',
        answer:
          'Our South Extension center is the closest at about 6-7 km. The Green Park center is also accessible. Many students choose based on batch timing preference.',
      },
      {
        question: 'Is there a car pool arrangement for DPS VK students?',
        answer:
          'While we do not officially arrange car pools, many DPS VK students connect through our WhatsApp groups and arrange shared transport. We can help connect you with other students from your area.',
      },
      {
        question: 'What are the batch options for DPS VK students?',
        answer:
          'We offer 5 PM evening batches on weekdays and intensive Saturday-Sunday batches. You can also combine online classes for flexibility.',
      },
    ],
    relatedSchools: [
      { name: 'DPS RK Puram', url: '/neet-coaching-dps-rk-puram-students' },
      { name: 'Springdales Pusa Road', url: '/neet-coaching-springdales-students' },
      { name: 'Vasant Valley School', url: '/neet-coaching-vasant-valley-students' },
    ],
    centerDetails: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-modern-school-students': {
    slug: 'neet-coaching-modern-school-students',
    schoolName: 'Modern School Barakhamba Road',
    locality: 'Barakhamba Road, Central Delhi',
    nearestCenter: 'South Delhi Center',
    distance: '5-6 km',
    metaTitle: 'NEET Coaching for Modern School Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET coaching for Modern School Barakhamba students. After-school batches, AIIMS faculty. 20+ Modern School alumni in medical colleges.',
    heroTitle: 'NEET Coaching for Modern School Students',
    heroSubtitle:
      'Join other Modern School students at Cerebrum for focused NEET preparation. Convenient South Delhi location with after-school batches.',
    schoolHighlights: [
      '35+ Modern School students enrolled',
      '20+ alumni in prestigious medical colleges',
      'After-school and online batch options',
      'School exam schedule coordination',
    ],
    whyStudentsChoose: [
      {
        title: 'Central Location',
        description:
          'South Extension is easily accessible from Connaught Place and Barakhamba area.',
      },
      {
        title: 'Modern School Peer Group',
        description:
          'Study with fellow Modern School students who share similar academic standards.',
      },
      {
        title: 'Hybrid Learning',
        description: 'Combine offline classes with online sessions for maximum flexibility.',
      },
      {
        title: 'AIIMS-Quality Teaching',
        description:
          'Learn from AIIMS alumni who understand the rigor required for top medical colleges.',
      },
    ],
    successStories: [
      {
        name: 'Arjun Kapoor',
        batch: 'Modern School, Class of 2023',
        result: 'AIIMS Delhi - MBBS',
        quote:
          'Dr. Shekhar teaching style matched what I was used to at Modern School - rigorous and thorough.',
      },
    ],
    faqs: [
      {
        question: 'How do Modern School students commute to Cerebrum?',
        answer:
          'Most Modern School students take metro to South Extension or get dropped by parents. The journey takes about 20-25 minutes from school via Barakhamba Road metro.',
      },
      {
        question: 'Do you offer online classes for Central Delhi students?',
        answer:
          'Yes! Many Modern School students prefer our hybrid model - attending offline when possible and online during busy periods. Same faculty, same curriculum.',
      },
    ],
    relatedSchools: [
      { name: 'DPS RK Puram', url: '/neet-coaching-dps-rk-puram-students' },
      { name: 'Springdales Pusa Road', url: '/neet-coaching-springdales-students' },
      { name: 'St. Columba School', url: '/neet-coaching-st-columba-students' },
    ],
    centerDetails: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-amity-gurgaon-students': {
    slug: 'neet-coaching-amity-gurgaon-students',
    schoolName: 'Amity International School Gurgaon',
    locality: 'Sector 46, Gurgaon',
    nearestCenter: 'Gurugram Center',
    distance: '3-4 km',
    metaTitle: 'NEET Coaching for Amity Gurgaon Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET coaching for Amity International School Gurgaon students. Sector 51 center just 10 mins away. After-school batches available.',
    heroTitle: 'NEET Coaching for Amity Gurgaon Students',
    heroSubtitle:
      'Our Gurugram Sector 51 center is perfectly located for Amity students. Join 60+ Amity students preparing for NEET with us.',
    schoolHighlights: [
      '60+ Amity Gurgaon students enrolled',
      'Just 10 minutes from Amity Sector 46 campus',
      'After-school batches from 3:30 PM',
      'Synced with Amity CBSE curriculum',
    ],
    whyStudentsChoose: [
      {
        title: 'Closest Center',
        description:
          'Our Sector 51 center is just 3-4 km from Amity, the closest quality coaching available.',
      },
      {
        title: 'Amity-Specific Timing',
        description: 'Amity ends early - our 3:30 PM batch is designed for your schedule.',
      },
      {
        title: 'Large Amity Batch',
        description: 'With 60+ Amity students, you have a ready peer group for motivation.',
      },
      {
        title: 'Proven Results',
        description: '25+ Amity alumni have qualified NEET with our guidance.',
      },
    ],
    successStories: [
      {
        name: 'Ishaan Malhotra',
        batch: 'Amity Gurgaon, Class of 2024',
        result: 'NEET Score: 695',
        quote:
          'Being so close to school made it easy to attend daily. The 3:30 batch was perfect for Amity timing.',
      },
      {
        name: 'Sanya Gupta',
        batch: 'Amity Gurgaon, Class of 2023',
        result: 'MAMC Delhi - MBBS',
        quote: 'I could walk to Cerebrum from school. Saved so much commute time for extra study.',
      },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum to Amity Sector 46?',
        answer:
          'Our Gurugram center at M2K Corporate Park, Sector 51 is just 3-4 km from Amity Sector 46 campus. It takes about 10 minutes by car or school bus drop.',
      },
      {
        question: 'What batch timing suits Amity students best?',
        answer:
          'Our 3:30 PM batch is most popular among Amity students as school ends around 2:30 PM. This gives time for lunch before class.',
      },
      {
        question: 'Is there school bus coordination?',
        answer:
          'Some parents arrange shared transport. We can connect you with other Amity parents through our WhatsApp group for coordination.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Gurgaon', url: '/neet-coaching-dps-gurgaon-students' },
      { name: 'The Shri Ram School', url: '/neet-coaching-shri-ram-school-students' },
      { name: 'GD Goenka Gurgaon', url: '/neet-coaching-gd-goenka-students' },
    ],
    centerDetails: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-dps-gurgaon-students': {
    slug: 'neet-coaching-dps-gurgaon-students',
    schoolName: 'DPS Gurgaon',
    locality: 'Sector 45, Gurgaon',
    nearestCenter: 'Gurugram Center',
    distance: '2-3 km',
    metaTitle: 'NEET Coaching for DPS Gurgaon Students | Cerebrum Biology Academy',
    metaDescription:
      'Specialized NEET coaching for DPS Gurgaon students. Sector 51 center walking distance. 80+ DPS Gurgaon students enrolled. Book free demo!',
    heroTitle: 'NEET Coaching for DPS Gurgaon Students',
    heroSubtitle:
      'Our most popular school batch! 80+ DPS Gurgaon students trust Cerebrum for their NEET preparation. Center just 2-3 km from campus.',
    schoolHighlights: [
      '80+ DPS Gurgaon students - largest school batch',
      '30+ alumni in AIIMS/top medical colleges',
      'Walking distance from DPS Sector 45',
      'Dedicated DPS batch with school-sync schedule',
    ],
    whyStudentsChoose: [
      {
        title: 'Walkable Distance',
        description: 'Just 2-3 km - many students walk or cycle from DPS to our center.',
      },
      {
        title: 'Largest DPS Batch',
        description: 'With 80+ students, DPS Gurgaon has the largest representation at our center.',
      },
      {
        title: 'DPS Academic Sync',
        description: 'We follow DPS academic calendar for tests and holidays.',
      },
      {
        title: 'Proven Track Record',
        description: '30+ DPS Gurgaon alumni in top medical colleges including AIIMS.',
      },
    ],
    successStories: [
      {
        name: 'Aditya Sharma',
        batch: 'DPS Gurgaon, Class of 2023',
        result: 'AIIMS Delhi - MBBS (AIR 234)',
        quote: 'I used to cycle from DPS to Cerebrum daily. The proximity was a game-changer.',
      },
      {
        name: 'Kavya Jain',
        batch: 'DPS Gurgaon, Class of 2024',
        result: 'NEET Score: 710',
        quote:
          'Having 80+ DPS friends at coaching created healthy competition. We pushed each other.',
      },
    ],
    faqs: [
      {
        question: 'How many DPS Gurgaon students study at Cerebrum?',
        answer:
          'We have 80+ students from DPS Gurgaon - the largest school batch at our Gurugram center. This creates a strong peer group and healthy competition.',
      },
      {
        question: 'Is walking possible from DPS to Cerebrum?',
        answer:
          'Yes! Our Sector 51 center is just 2-3 km from DPS Sector 45 campus. Many students walk or cycle, especially in good weather.',
      },
      {
        question: 'Do you have a dedicated batch for DPS Gurgaon?',
        answer:
          'Given the large number, our 3:30 PM batch is predominantly DPS Gurgaon students. This ensures schedule synchronization with your school.',
      },
    ],
    relatedSchools: [
      { name: 'Amity Gurgaon', url: '/neet-coaching-amity-gurgaon-students' },
      { name: 'The Shri Ram School', url: '/neet-coaching-shri-ram-school-students' },
      { name: 'Pathways Gurgaon', url: '/neet-coaching-pathways-gurgaon-students' },
    ],
    centerDetails: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-bal-bharati-rohini-students': {
    slug: 'neet-coaching-bal-bharati-rohini-students',
    schoolName: 'Bal Bharati Public School Rohini',
    locality: 'Sector 14, Rohini',
    nearestCenter: 'Rohini Center',
    distance: '1-2 km',
    metaTitle: 'NEET Coaching for Bal Bharati Rohini Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET coaching for Bal Bharati Rohini students. DC Chauk center just 5 mins away. After-school batches, AIIMS faculty. Join 70+ BBP students.',
    heroTitle: 'NEET Coaching for Bal Bharati Rohini Students',
    heroSubtitle:
      'Our Rohini center is the closest coaching for Bal Bharati students. Walk from school to coaching in just 5 minutes!',
    schoolHighlights: [
      '70+ Bal Bharati Rohini students enrolled',
      'Just 1-2 km from BBP Sector 14 campus',
      'After-school batches from 2:30 PM',
      '25+ BBP alumni in medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Extremely Close',
        description: 'Our DC Chauk center is just 5 minutes walk from Bal Bharati.',
      },
      {
        title: 'BBP-Friendly Timing',
        description: 'School ends at 2 PM - our 2:30 PM batch is designed for you.',
      },
      {
        title: 'Strong BBP Community',
        description: '70+ BBP students creates a familiar learning environment.',
      },
      {
        title: 'Local Support',
        description: 'Parents can easily visit for PTMs and progress updates.',
      },
    ],
    successStories: [
      {
        name: 'Shreya Verma',
        batch: 'Bal Bharati Rohini, Class of 2024',
        result: 'NEET Score: 680',
        quote:
          'I literally walked to Cerebrum after school. It felt like an extension of my school day.',
      },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum to Bal Bharati Rohini?',
        answer:
          'Our Rohini center at DC Chauk is just 1-2 km from Bal Bharati Sector 14 campus. Students can walk in 5-7 minutes.',
      },
      {
        question: 'What is the earliest batch for BBP students?',
        answer:
          'Since BBP ends around 2 PM, our 2:30 PM batch is perfect. This is our most popular batch among Bal Bharati students.',
      },
      {
        question: 'Can parents pick up children after coaching?',
        answer:
          'Yes, we have a safe waiting area. Most BBP parents find it convenient as our center is on the way home for many Rohini residents.',
      },
    ],
    relatedSchools: [
      { name: 'Venkateshwar Rohini', url: '/neet-coaching-venkateshwar-rohini-students' },
      { name: 'Ryan Rohini', url: '/neet-coaching-ryan-rohini-students' },
      { name: 'DPS Rohini', url: '/neet-coaching-dps-rohini-students' },
    ],
    centerDetails: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-dps-rohini-students': {
    slug: 'neet-coaching-dps-rohini-students',
    schoolName: 'DPS Rohini',
    locality: 'Sector 24, Rohini',
    nearestCenter: 'Rohini Center',
    distance: '3-4 km',
    metaTitle: 'NEET Coaching for DPS Rohini Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET coaching for DPS Rohini students. DC Chauk center, after-school batches. 55+ DPS Rohini students enrolled. Book free demo!',
    heroTitle: 'NEET Coaching for DPS Rohini Students',
    heroSubtitle:
      'Join 55+ DPS Rohini students preparing for NEET at our DC Chauk center. Designed around DPS schedule with convenient timing.',
    schoolHighlights: [
      '55+ DPS Rohini students enrolled',
      '20+ alumni in AIIMS and top medical colleges',
      'After-school batches starting 3:30 PM',
      'DPS curriculum synchronized',
    ],
    whyStudentsChoose: [
      {
        title: 'Rohini Location',
        description: 'DC Chauk center is easily accessible from DPS Sector 24 campus.',
      },
      {
        title: 'DPS Network',
        description: 'Connect with DPS RK Puram and DPS Gurgaon students in combined batches.',
      },
      {
        title: 'Proven DPS Success',
        description: '20+ DPS Rohini alumni have made it to top medical colleges.',
      },
      {
        title: 'Evening Convenience',
        description: '3:30 PM batch allows time for lunch and travel after school.',
      },
    ],
    successStories: [
      {
        name: 'Rahul Gupta',
        batch: 'DPS Rohini, Class of 2023',
        result: 'MAMC Delhi - MBBS',
        quote:
          'The DPS network at Cerebrum is amazing. I made friends from DPS schools across Delhi.',
      },
    ],
    faqs: [
      {
        question: 'Which center should DPS Rohini students choose?',
        answer:
          'Our Rohini DC Chauk center is the most convenient, about 3-4 km from DPS Sector 24. The journey takes about 10-15 minutes.',
      },
      {
        question: 'Do you have online options for DPS Rohini students?',
        answer:
          'Yes! Many DPS Rohini students use our hybrid model - attending offline when possible and online during exam periods or bad weather.',
      },
    ],
    relatedSchools: [
      { name: 'Bal Bharati Rohini', url: '/neet-coaching-bal-bharati-rohini-students' },
      { name: 'Venkateshwar Rohini', url: '/neet-coaching-venkateshwar-rohini-students' },
      { name: 'Mount Abu Rohini', url: '/neet-coaching-mount-abu-rohini-students' },
    ],
    centerDetails: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-venkateshwar-rohini-students': {
    slug: 'neet-coaching-venkateshwar-rohini-students',
    schoolName: 'Venkateshwar International School Rohini',
    locality: 'Sector 18, Rohini',
    nearestCenter: 'Rohini Center',
    distance: '2-3 km',
    metaTitle: 'NEET Coaching for Venkateshwar Rohini Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET coaching for Venkateshwar International School Rohini students. DC Chauk center nearby. After-school batches available.',
    heroTitle: 'NEET Coaching for Venkateshwar Rohini Students',
    heroSubtitle:
      'Our Rohini center is the perfect choice for Venkateshwar students. Close proximity and flexible timing options.',
    schoolHighlights: [
      '40+ Venkateshwar students enrolled',
      '2-3 km from VIS Sector 18 campus',
      'Multiple batch timing options',
      'Strong Rohini student community',
    ],
    whyStudentsChoose: [
      {
        title: 'Close Location',
        description: 'DC Chauk center is just 10 minutes from Venkateshwar campus.',
      },
      {
        title: 'Flexible Options',
        description: 'Choose from 3 PM, 4 PM, or 5 PM batches based on your preference.',
      },
      {
        title: 'Rohini Community',
        description: 'Study with students from other Rohini schools for diverse perspectives.',
      },
      {
        title: 'Quality + Convenience',
        description: 'No need to travel far - AIIMS-quality teaching in your neighborhood.',
      },
    ],
    successStories: [
      {
        name: 'Ayush Sharma',
        batch: 'Venkateshwar Rohini, Class of 2024',
        result: 'NEET Score: 665',
        quote: 'Being close to home and school made regular attendance easy. No excuses!',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Venkateshwar Rohini?',
        answer:
          'Our DC Chauk center is approximately 2-3 km from Venkateshwar International School Sector 18. Most students reach in 10 minutes.',
      },
      {
        question: 'What batch options are available for VIS students?',
        answer:
          'We offer 3 PM, 4 PM, and 5 PM evening batches on weekdays, plus weekend intensive batches. Choose based on your school ending time.',
      },
    ],
    relatedSchools: [
      { name: 'Bal Bharati Rohini', url: '/neet-coaching-bal-bharati-rohini-students' },
      { name: 'DPS Rohini', url: '/neet-coaching-dps-rohini-students' },
      { name: 'Ryan Rohini', url: '/neet-coaching-ryan-rohini-students' },
    ],
    centerDetails: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-shri-ram-school-students': {
    slug: 'neet-coaching-shri-ram-school-students',
    schoolName: 'The Shri Ram School',
    locality: 'Aravalli, Gurgaon',
    nearestCenter: 'Gurugram Center',
    distance: '8-10 km',
    metaTitle: 'NEET Coaching for Shri Ram School Students | Cerebrum Biology Academy',
    metaDescription:
      'Specialized NEET coaching for The Shri Ram School students. Gurugram Sector 51 center. Flexible timing, AIIMS faculty. Book free demo!',
    heroTitle: 'NEET Coaching for The Shri Ram School Students',
    heroSubtitle:
      'Elite NEET preparation for TSRS students. Our Gurugram center offers the academic rigor that Shri Ram students are accustomed to.',
    schoolHighlights: [
      '25+ Shri Ram School students enrolled',
      'AIIMS-level academic rigor',
      'Flexible weekend and evening options',
      'Individual attention for high achievers',
    ],
    whyStudentsChoose: [
      {
        title: 'Matching Standards',
        description: 'Academic rigor that matches TSRS expectations and prepares for AIIMS.',
      },
      {
        title: 'Flexibility for IB/CBSE',
        description: 'We accommodate both curriculum tracks with personalized guidance.',
      },
      {
        title: 'Small Batch Advantage',
        description: 'More individual attention compared to large coaching factories.',
      },
      {
        title: 'Online Option',
        description: 'Live online classes for days when commute is not feasible.',
      },
    ],
    successStories: [
      {
        name: 'Aryan Malhotra',
        batch: 'TSRS Aravalli, Class of 2024',
        result: 'NEET Score: 705',
        quote:
          'Coming from TSRS, I needed coaching that matched our school level. Cerebrum delivered.',
      },
    ],
    faqs: [
      {
        question: 'Do you accommodate IB curriculum students?',
        answer:
          'Yes! Many TSRS students follow IB curriculum. We provide bridge content to cover CBSE-specific topics required for NEET.',
      },
      {
        question: 'Is online coaching available for TSRS students?',
        answer:
          'Yes, we offer live online classes for students who find daily commute challenging. Same faculty, same quality.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Gurgaon', url: '/neet-coaching-dps-gurgaon-students' },
      { name: 'Pathways Gurgaon', url: '/neet-coaching-pathways-gurgaon-students' },
      { name: 'Amity Gurgaon', url: '/neet-coaching-amity-gurgaon-students' },
    ],
    centerDetails: {
      name: 'Gurugram Center',
      address: 'M2K Corporate Park, Sector 51, Gurugram 122018',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-sanskriti-school-students': {
    slug: 'neet-coaching-sanskriti-school-students',
    schoolName: 'Sanskriti School',
    locality: 'Chanakyapuri, Delhi',
    nearestCenter: 'South Delhi Center',
    distance: '6-7 km',
    metaTitle: 'NEET Coaching for Sanskriti School Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET coaching for Sanskriti School Chanakyapuri students. South Delhi center, flexible timings. AIIMS faculty, proven results.',
    heroTitle: 'NEET Coaching for Sanskriti School Students',
    heroSubtitle:
      'Quality NEET preparation for Sanskriti School students. Our South Delhi center offers the right balance of academic excellence and convenience.',
    schoolHighlights: [
      '30+ Sanskriti School students enrolled',
      'Convenient South Delhi location',
      'After-school and online options',
      'High-achieving peer group',
    ],
    whyStudentsChoose: [
      {
        title: 'South Delhi Access',
        description: 'South Extension is accessible from Chanakyapuri via diplomatic routes.',
      },
      {
        title: 'Academic Excellence',
        description: 'Faculty who understand the expectations of top Delhi schools.',
      },
      {
        title: 'Hybrid Flexibility',
        description: 'Combine offline and online classes based on daily convenience.',
      },
      {
        title: 'Diplomat Friendly',
        description: "We understand the unique needs of Sanskriti's international community.",
      },
    ],
    successStories: [
      {
        name: 'Anika Chadha',
        batch: 'Sanskriti School, Class of 2024',
        result: 'NEET Score: 675',
        quote: 'The hybrid option was perfect for my schedule. I never missed a class.',
      },
    ],
    faqs: [
      {
        question: 'How do Sanskriti students commute to Cerebrum?',
        answer:
          'Most Sanskriti students are dropped by parents or take uber/ola. The journey via Africa Avenue and Ring Road takes about 25-30 minutes. Online option is also popular.',
      },
      {
        question: 'Do you offer special batches for diplomatic community students?',
        answer:
          'While we do not have separate batches, we accommodate schedule needs of students who may need to travel with family. Online classes and flexible attendance help.',
      },
    ],
    relatedSchools: [
      { name: 'DPS RK Puram', url: '/neet-coaching-dps-rk-puram-students' },
      { name: 'Vasant Valley', url: '/neet-coaching-vasant-valley-students' },
      { name: 'Modern School', url: '/neet-coaching-modern-school-students' },
    ],
    centerDetails: {
      name: 'South Delhi Center',
      address: 'Block D, South Extension Part 2, New Delhi 110049',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-heritage-school-rohini-students': {
    slug: 'neet-coaching-heritage-school-rohini-students',
    schoolName: 'Heritage School Rohini',
    locality: 'Sector 23, Rohini',
    nearestCenter: 'Rohini Center',
    distance: '1-2 km',
    metaTitle: 'NEET Coaching for Heritage School Rohini Students | Biology Classes',
    metaDescription:
      'Best NEET coaching for Heritage School Rohini students. DC Chauk center very close to campus. 1:17 teacher-student ratio, experiential learning approach. After-school batches, free NEET tools.',
    heroTitle: 'NEET Coaching for Heritage School Rohini Students',
    heroSubtitle:
      'Our Rohini DC Chauk center is very close to Heritage School campus. Join 35+ Heritage School students preparing for NEET with personalized 1:17 teacher-student ratio.',
    schoolHighlights: [
      '35+ Heritage School Rohini students enrolled',
      'Very close to Heritage School Sector 23 campus',
      '1:17 teacher-student ratio for personalized attention',
      'Experiential learning approach matching Heritage pedagogy',
      '15+ Heritage School alumni in top medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Very Close to Campus',
        description:
          'Our DC Chauk center is just 1-2 km from Heritage School - walk or reach in under 5 minutes by car.',
      },
      {
        title: '1:17 Teacher-Student Ratio',
        description:
          'Small batch sizes ensure every student gets personalized attention and doubt resolution.',
      },
      {
        title: 'Experiential Learning',
        description:
          'Our teaching methodology complements Heritage School\'s experiential learning philosophy with hands-on biology practicals.',
      },
      {
        title: 'Free NEET Tools',
        description:
          'Access free NEET preparation tools including practice tests, study materials, and performance analytics.',
      },
    ],
    successStories: [
      {
        name: 'Riya Malhotra',
        batch: 'Heritage School Rohini, Class of 2024',
        result: 'NEET Score: 672',
        quote:
          'The 1:17 ratio meant I could ask questions freely. The teachers knew my strengths and weaknesses personally.',
      },
      {
        name: 'Arjun Kapoor',
        batch: 'Heritage School Rohini, Class of 2023',
        result: 'UCMS Delhi - MBBS',
        quote:
          'Being so close to school made daily attendance easy. The experiential learning approach helped me understand biology conceptually.',
      },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum to Heritage School Rohini?',
        answer:
          'Our Rohini center at DC Chauk is just 1-2 km from Heritage School Sector 23 campus. Students can walk in 5-7 minutes or reach by car in under 5 minutes. We are one of the closest NEET coaching centers to Heritage School.',
      },
      {
        question: 'What is the teacher-student ratio at Cerebrum?',
        answer:
          'We maintain a 1:17 teacher-student ratio to ensure every Heritage School student gets personalized attention. This allows for individual doubt sessions and customized learning paths.',
      },
      {
        question: 'How does experiential learning work for NEET preparation?',
        answer:
          'Similar to Heritage School\'s pedagogy, we use hands-on biology practicals, 3D models, virtual dissections, and real-world case studies. This experiential approach helps students understand concepts deeply rather than just memorizing.',
      },
      {
        question: 'What free NEET tools do you provide?',
        answer:
          'All Heritage School students get access to our free NEET preparation toolkit including: chapter-wise practice tests, previous year question banks, video lectures for revision, performance analytics dashboard, and doubt resolution via WhatsApp.',
      },
      {
        question: 'What batch timings suit Heritage School students?',
        answer:
          'Our 3 PM and 4 PM batches are popular among Heritage School students. Weekend intensive batches are also available for comprehensive NEET preparation.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Rohini', url: '/neet-coaching-dps-rohini-students' },
      { name: 'Bal Bharati Rohini', url: '/neet-coaching-bal-bharati-rohini-students' },
      { name: 'Venkateshwar Rohini', url: '/neet-coaching-venkateshwar-rohini-students' },
      { name: 'GD Goenka Rohini', url: '/neet-coaching-gd-goenka-rohini-students' },
    ],
    centerDetails: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

'neet-coaching-gd-goenka-rohini-students': {
    slug: 'neet-coaching-gd-goenka-rohini-students',
    schoolName: 'GD Goenka Public School Rohini',
    locality: 'Sector 22, Rohini',
    nearestCenter: 'Rohini Center',
    distance: '2-3 km',
    metaTitle: 'NEET Coaching for GD Goenka Rohini Students | Biology Classes',
    metaDescription:
      'Best NEET coaching for GD Goenka Public School Rohini (Sector 22) students. DC Chauk center just 10 mins away. Ranked #1 Most Elite School North Zone 2023. After-school batches, AIIMS faculty.',
    heroTitle: 'NEET Coaching for GD Goenka Rohini Students',
    heroSubtitle:
      'Our Rohini DC Chauk center is the perfect choice for GD Goenka Public School students. Join 45+ GD Goenka students preparing for NEET with AIIMS-quality teaching.',
    schoolHighlights: [
      '45+ GD Goenka Rohini students enrolled',
      '#1 Most Elite School North Zone 2023 students trust us',
      'Just 2-3 km from GD Goenka Sector 22 campus',
      'After-school batches starting 3:30 PM',
      '18+ GD Goenka alumni in top medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Very Close Location',
        description:
          'Our DC Chauk center is just 10 minutes from GD Goenka Sector 22 campus - one of the closest NEET coaching options.',
      },
      {
        title: 'Elite School Standards',
        description:
          'Teaching quality that matches the academic excellence GD Goenka is known for - ranked #1 Most Elite School North Zone 2023.',
      },
      {
        title: 'Strong GD Goenka Community',
        description:
          '45+ GD Goenka students creates a familiar and competitive learning environment.',
      },
      {
        title: 'Flexible Timing',
        description:
          'Multiple batch options including 3:30 PM, 4:30 PM evening and weekend batches to suit your schedule.',
      },
    ],
    successStories: [
      {
        name: 'Ananya Khanna',
        batch: 'GD Goenka Rohini, Class of 2024',
        result: 'NEET Score: 688',
        quote:
          'Being from the #1 Elite School, I needed coaching that matched our standards. Cerebrum exceeded expectations.',
      },
      {
        name: 'Vikram Sethi',
        batch: 'GD Goenka Rohini, Class of 2023',
        result: 'MAMC Delhi - MBBS',
        quote:
          'The proximity to school made it so convenient. I could reach Cerebrum in just 10 minutes after school.',
      },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum to GD Goenka Public School Rohini?',
        answer:
          'Our Rohini center at DC Chauk is just 2-3 km from GD Goenka Public School Sector 22 campus. Students typically reach in 10 minutes by car or auto.',
      },
      {
        question: 'What batch timings suit GD Goenka students best?',
        answer:
          'Our 3:30 PM and 4:30 PM batches are most popular among GD Goenka students. Weekend intensive batches are also available for comprehensive preparation.',
      },
      {
        question: 'How many GD Goenka students are currently enrolled at Cerebrum?',
        answer:
          'We have 45+ students from GD Goenka Public School Rohini across various batches. This strong peer group creates healthy competition and mutual support.',
      },
      {
        question: 'Do you coordinate with GD Goenka exam schedule?',
        answer:
          'Yes! We are aware of GD Goenka academic calendar and adjust our test schedules accordingly. During school exams, coaching tests are postponed or made optional.',
      },
      {
        question: 'What makes Cerebrum the best choice for GD Goenka students?',
        answer:
          'As the #1 Most Elite School North Zone 2023, GD Goenka students need coaching that matches their academic standards. Our AIIMS faculty, proximity to school, and proven track record with 18+ GD Goenka alumni in top medical colleges makes us the ideal choice.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Rohini', url: '/neet-coaching-dps-rohini-students' },
      { name: 'Bal Bharati Rohini', url: '/neet-coaching-bal-bharati-rohini-students' },
      { name: 'Venkateshwar Rohini', url: '/neet-coaching-venkateshwar-rohini-students' },
    ],
    centerDetails: {
      name: 'Rohini Center',
      address: 'DC Chauk, Sector 9, Rohini, New Delhi 110085',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },
}

export function getSchoolPageData(slug: string): SchoolPageData | undefined {
  return schoolPagesData[slug]
}
