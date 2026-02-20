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
          "Our teaching methodology complements Heritage School's experiential learning philosophy with hands-on biology practicals.",
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
          "Similar to Heritage School's pedagogy, we use hands-on biology practicals, 3D models, virtual dissections, and real-world case studies. This experiential approach helps students understand concepts deeply rather than just memorizing.",
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

  'neet-coaching-dps-faridabad-students': {
    slug: 'neet-coaching-dps-faridabad-students',
    schoolName: 'DPS Faridabad',
    locality: 'Sector 19, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '2 km',
    metaTitle: 'NEET Coaching for DPS Faridabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET coaching for DPS Faridabad students. Sector 17 center just 2 km away. After-school batches, AIIMS faculty. Join 60+ DPS Faridabad students preparing for NEET.',
    heroTitle: 'NEET Coaching for DPS Faridabad Students',
    heroSubtitle:
      'Join 60+ DPS Faridabad students preparing for NEET at our Sector 17 center. After-school batches designed around your DPS schedule.',
    schoolHighlights: [
      '60+ DPS Faridabad students enrolled',
      'Just 2 km from DPS Sector 19 campus',
      'After-school batches from 3:30 PM',
      'DPS academic calendar synchronized',
      '20+ DPS Faridabad alumni in top medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Close to Campus',
        description:
          'Our Sector 17 center is just 2 km from DPS Faridabad - reach in under 10 minutes after school.',
      },
      {
        title: 'DPS-Friendly Schedule',
        description:
          'Batches starting at 3:30 PM and 4:30 PM are designed around DPS Faridabad timings.',
      },
      {
        title: 'Strong DPS Peer Group',
        description:
          '60+ DPS Faridabad students creates a familiar and competitive learning environment.',
      },
      {
        title: 'Proven Results',
        description:
          '20+ DPS Faridabad alumni selected to AIIMS, MAMC, and other top medical colleges.',
      },
    ],
    successStories: [
      {
        name: 'Aarav Khanna',
        batch: 'DPS Faridabad, Class of 2024',
        result: 'NEET Score: 682',
        quote:
          'Cerebrum is so close to DPS Faridabad that I could reach in 10 minutes. The after-school batch timing was perfect for my schedule.',
      },
      {
        name: 'Nandini Yadav',
        batch: 'DPS Faridabad, Class of 2023',
        result: 'AIIMS Delhi - MBBS',
        quote:
          'Having 60+ DPS Faridabad friends at Cerebrum made preparation enjoyable. We formed study groups and pushed each other to do better.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from DPS Faridabad?',
        answer:
          'Our Faridabad center at Sector 17 is just 2 km from DPS Faridabad Sector 19 campus. Most students reach in under 10 minutes by auto or car after school.',
      },
      {
        question: 'What batch timings suit DPS Faridabad students?',
        answer:
          'Our 3:30 PM and 4:30 PM batches are most popular among DPS Faridabad students. Weekend batches are also available for intensive preparation.',
      },
      {
        question: 'How many DPS Faridabad students are enrolled at Cerebrum?',
        answer:
          'We currently have 60+ students from DPS Faridabad across various batches. This strong peer group creates healthy competition and mutual support.',
      },
      {
        question: 'Do you adjust schedules around DPS Faridabad exams?',
        answer:
          'Yes, we follow the DPS Faridabad academic calendar closely. During school exams, coaching tests are postponed or made optional so students can focus on their school performance.',
      },
      {
        question: 'What results have DPS Faridabad students achieved at Cerebrum?',
        answer:
          '20+ DPS Faridabad alumni have been selected to top medical colleges including AIIMS Delhi, MAMC, and UCMS. Many students consistently score 650+ in NEET.',
      },
    ],
    relatedSchools: [
      { name: 'MVN Faridabad', url: '/neet-coaching-mvn-faridabad-students' },
      { name: 'Apeejay Faridabad', url: '/neet-coaching-apeejay-faridabad-students' },
      { name: 'DAV Faridabad', url: '/neet-coaching-dav-faridabad-students' },
      { name: 'Greenfields Faridabad', url: '/neet-coaching-greenfields-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-mvn-faridabad-students': {
    slug: 'neet-coaching-mvn-faridabad-students',
    schoolName: 'MVN (Modern Vidya Niketan)',
    locality: 'Sector 17, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '0.5 km',
    metaTitle: 'NEET Coaching for MVN Faridabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Top NEET coaching for MVN (Modern Vidya Niketan) Faridabad students. Sector 17 center just 0.5 km away - walking distance! After-school batches, AIIMS faculty.',
    heroTitle: 'NEET Coaching for MVN Faridabad Students',
    heroSubtitle:
      'Our Sector 17 center is walking distance from MVN campus. Join 45+ MVN students preparing for NEET with after-school and weekend batches.',
    schoolHighlights: [
      '45+ MVN Faridabad students enrolled',
      'Walking distance - just 0.5 km from MVN campus',
      'After-school batches from 2:30 PM',
      'MVN curriculum synchronized schedule',
      '15+ MVN alumni in top medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Walking Distance',
        description:
          'Our Sector 17 center is just 0.5 km from MVN - students walk directly from school in 5 minutes.',
      },
      {
        title: 'Early Afternoon Batches',
        description:
          'MVN ends early, so our 2:30 PM batch is designed specifically for MVN students.',
      },
      {
        title: 'Strong MVN Community',
        description: '45+ MVN students means you study with familiar faces from your own school.',
      },
      {
        title: 'AIIMS-Quality Teaching',
        description:
          'Learn from AIIMS alumni faculty who deliver medical-college-level conceptual teaching.',
      },
    ],
    successStories: [
      {
        name: 'Ritika Aggarwal',
        batch: 'MVN Faridabad, Class of 2024',
        result: 'NEET Score: 668',
        quote:
          'I used to walk from MVN to Cerebrum daily. Being so close meant I never missed a class. The convenience was unbeatable.',
      },
      {
        name: 'Harsh Taneja',
        batch: 'MVN Faridabad, Class of 2023',
        result: 'MAMC Delhi - MBBS',
        quote:
          'Cerebrum understood the MVN schedule perfectly. The 2:30 PM batch gave me time to have lunch and still start coaching on time.',
      },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum to MVN Faridabad?',
        answer:
          'Our Faridabad center at Sector 17 is just 0.5 km from MVN campus - literally walking distance. Students walk from school to our center in about 5 minutes.',
      },
      {
        question: 'What is the best batch timing for MVN students?',
        answer:
          'Our 2:30 PM batch is the most popular among MVN students since school ends early. We also have 4 PM and weekend batches for flexibility.',
      },
      {
        question: 'How many MVN students currently study at Cerebrum?',
        answer:
          'We have 45+ MVN students enrolled across various batches. This creates a strong peer group where students motivate each other.',
      },
      {
        question: 'Do you coordinate with MVN exam schedule?',
        answer:
          'Absolutely. We follow the MVN academic calendar and adjust test schedules during school exams. Students can focus on school exams without coaching pressure.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Faridabad', url: '/neet-coaching-dps-faridabad-students' },
      { name: 'Modern School Faridabad', url: '/neet-coaching-modern-school-faridabad-students' },
      { name: 'Apeejay Faridabad', url: '/neet-coaching-apeejay-faridabad-students' },
      { name: 'Aggarwal Public School', url: '/neet-coaching-aggarwal-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-apeejay-faridabad-students': {
    slug: 'neet-coaching-apeejay-faridabad-students',
    schoolName: 'Apeejay School Faridabad',
    locality: 'Sector 15, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '2 km',
    metaTitle: 'NEET Coaching for Apeejay Faridabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET coaching for Apeejay School Faridabad students. Sector 17 center just 2 km from campus. After-school batches, experienced AIIMS faculty. Book free demo!',
    heroTitle: 'NEET Coaching for Apeejay Faridabad Students',
    heroSubtitle:
      'Specialized NEET preparation for Apeejay School students at our convenient Sector 17 center. Join 35+ Apeejay students already enrolled.',
    schoolHighlights: [
      '35+ Apeejay Faridabad students enrolled',
      'Just 2 km from Apeejay Sector 15 campus',
      'After-school batches from 3:30 PM',
      'Apeejay CBSE curriculum aligned teaching',
      '12+ Apeejay alumni in top medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Convenient Location',
        description:
          'Our Sector 17 center is just 2 km from Apeejay School - a quick 10-minute commute after school.',
      },
      {
        title: 'Apeejay-Friendly Timing',
        description:
          'After-school batches at 3:30 PM and 4:30 PM designed around Apeejay dismissal times.',
      },
      {
        title: 'Familiar Peer Group',
        description:
          '35+ Apeejay students means you study alongside classmates who understand your school workload.',
      },
      {
        title: 'Conceptual Teaching',
        description:
          'AIIMS alumni faculty focus on deep conceptual understanding - not rote memorization.',
      },
    ],
    successStories: [
      {
        name: 'Sneha Malik',
        batch: 'Apeejay Faridabad, Class of 2024',
        result: 'NEET Score: 658',
        quote:
          'The Sector 17 center was so convenient from Apeejay. My parents loved that I could reach quickly and safely after school.',
      },
      {
        name: 'Aryan Bhardwaj',
        batch: 'Apeejay Faridabad, Class of 2023',
        result: 'UCMS Delhi - MBBS',
        quote:
          'Cerebrum teachers helped me understand biology concepts at a much deeper level than what school alone could offer. That made the difference in NEET.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Apeejay School Faridabad?',
        answer:
          'Our Faridabad center at Sector 17 is approximately 2 km from Apeejay School Sector 15. Students typically reach in 10 minutes by auto or car.',
      },
      {
        question: 'What batch options are available for Apeejay students?',
        answer:
          'We offer 3:30 PM and 4:30 PM after-school batches on weekdays, plus Saturday-Sunday intensive batches. Choose based on your preference and school schedule.',
      },
      {
        question: 'How many Apeejay students are at Cerebrum currently?',
        answer:
          'We have 35+ Apeejay School students enrolled across different batches. This creates a supportive learning environment with familiar faces.',
      },
      {
        question: 'Is the coaching syllabus aligned with Apeejay CBSE curriculum?',
        answer:
          'Yes, our NEET preparation is fully aligned with the CBSE curriculum that Apeejay follows. We cover the same NCERT chapters and add NEET-specific depth and practice.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Faridabad', url: '/neet-coaching-dps-faridabad-students' },
      { name: 'DAV Faridabad', url: '/neet-coaching-dav-faridabad-students' },
      { name: 'MVN Faridabad', url: '/neet-coaching-mvn-faridabad-students' },
      { name: 'MRIS Faridabad', url: '/neet-coaching-mris-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-dav-faridabad-students': {
    slug: 'neet-coaching-dav-faridabad-students',
    schoolName: 'DAV Public School Faridabad',
    locality: 'Sector 14, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '3 km',
    metaTitle: 'NEET Coaching for DAV Faridabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Specialized NEET coaching for DAV Public School Faridabad students. Sector 17 center, 3 km from campus. After-school batches, AIIMS faculty. Proven results.',
    heroTitle: 'NEET Coaching for DAV Faridabad Students',
    heroSubtitle:
      'Join 40+ DAV Faridabad students at our Sector 17 center. Convenient after-school batches with AIIMS-quality teaching designed for DAV students.',
    schoolHighlights: [
      '40+ DAV Faridabad students enrolled',
      '3 km from DAV Sector 14 campus',
      'After-school batches from 3:30 PM',
      'DAV CBSE curriculum aligned preparation',
      '15+ DAV alumni in medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Nearby Center',
        description:
          'Our Sector 17 center is just 3 km from DAV Public School - about 12 minutes by auto.',
      },
      {
        title: 'DAV Schedule Compatible',
        description: 'After-school batches at 3:30 PM and 4:30 PM work perfectly with DAV timings.',
      },
      {
        title: 'DAV Peer Group',
        description:
          '40+ DAV students at Cerebrum creates a familiar and competitive study atmosphere.',
      },
      {
        title: 'Experienced Faculty',
        description:
          'AIIMS alumni faculty who have mentored hundreds of DAV students to NEET success.',
      },
    ],
    successStories: [
      {
        name: 'Prateek Chaudhary',
        batch: 'DAV Faridabad, Class of 2024',
        result: 'NEET Score: 672',
        quote:
          'The DAV batch at Cerebrum was like an extended school. My DAV friends and I studied together and kept each other motivated throughout the preparation.',
      },
      {
        name: 'Anushka Srivastava',
        batch: 'DAV Faridabad, Class of 2023',
        result: 'AIIMS Delhi - MBBS',
        quote:
          'Cerebrum faculty understood the DAV academic pressure. They helped me balance school boards and NEET without burning out.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from DAV Public School Faridabad?',
        answer:
          'Our Faridabad center at Sector 17 is approximately 3 km from DAV Public School Sector 14. The commute takes about 12-15 minutes by auto or car.',
      },
      {
        question: 'What batch timings work best for DAV students?',
        answer:
          'Our 3:30 PM and 4:30 PM after-school batches are most popular with DAV students. Weekend intensive batches are also available for those who prefer concentrated weekend study.',
      },
      {
        question: 'How many DAV Faridabad students study at Cerebrum?',
        answer:
          'We currently have 40+ DAV Public School students across various batches. This creates a strong peer group that supports and motivates each other.',
      },
      {
        question: 'Do you help DAV students balance boards and NEET?',
        answer:
          'Yes, our curriculum covers both CBSE board syllabus and NEET-specific topics simultaneously. During board exam season, we adjust schedules and focus on board-relevant topics.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Faridabad', url: '/neet-coaching-dps-faridabad-students' },
      { name: 'Apeejay Faridabad', url: '/neet-coaching-apeejay-faridabad-students' },
      { name: 'MRIS Faridabad', url: '/neet-coaching-mris-faridabad-students' },
      { name: 'Greenfields Faridabad', url: '/neet-coaching-greenfields-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-manav-rachna-faridabad-students': {
    slug: 'neet-coaching-manav-rachna-faridabad-students',
    schoolName: 'Manav Rachna International School',
    locality: 'Sector 46, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '8 km',
    metaTitle: 'NEET Coaching for Manav Rachna Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET coaching for Manav Rachna International School Faridabad students. Expert AIIMS faculty, flexible batches. Online and offline options available.',
    heroTitle: 'NEET Coaching for Manav Rachna International School Students',
    heroSubtitle:
      'Elite NEET preparation for Manav Rachna students. Our Sector 17 center offers weekend and online batches to suit the commute from Sector 46.',
    schoolHighlights: [
      '30+ Manav Rachna students enrolled',
      'Weekend and online batch options',
      'AIIMS-quality conceptual teaching',
      'Flexible scheduling for Sector 46 commute',
      '10+ Manav Rachna alumni in medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Hybrid Learning Options',
        description:
          'Combine weekend offline classes at Sector 17 with weekday online sessions to manage the 8 km commute.',
      },
      {
        title: 'Weekend Intensive Batches',
        description:
          'Saturday-Sunday intensive batches are popular with Manav Rachna students for focused preparation.',
      },
      {
        title: 'Elite Academic Standards',
        description:
          'Teaching rigor that matches the high academic standards Manav Rachna is known for.',
      },
      {
        title: 'Personalized Attention',
        description:
          'Small batch sizes ensure every Manav Rachna student gets individual doubt resolution.',
      },
    ],
    successStories: [
      {
        name: 'Ishita Sharma',
        batch: 'Manav Rachna, Class of 2024',
        result: 'NEET Score: 690',
        quote:
          'The weekend batches at Cerebrum were perfect for me. I covered intensive biology on Saturdays and Sundays without missing any school activities during the week.',
      },
      {
        name: 'Rohan Goel',
        batch: 'Manav Rachna, Class of 2023',
        result: 'AIIMS Delhi - MBBS',
        quote:
          'Even though Manav Rachna is 8 km away, the online option made it seamless. I attended live classes from home on weekdays and visited the center on weekends.',
      },
    ],
    faqs: [
      {
        question: 'How do Manav Rachna students commute to Cerebrum?',
        answer:
          'Our Sector 17 center is about 8 km from Manav Rachna Sector 46. Most students use weekend batches and online classes during weekdays. Parents often drop students on Saturdays and Sundays.',
      },
      {
        question: 'Are online classes available for Manav Rachna students?',
        answer:
          'Yes, we offer live online classes on weekdays so Manav Rachna students can attend from home. Weekend offline sessions at our Sector 17 center complement the online learning.',
      },
      {
        question: 'What are the weekend batch timings?',
        answer:
          'Saturday and Sunday batches run from 10 AM to 1 PM and 2 PM to 5 PM. Manav Rachna students typically prefer the morning batch for intensive weekend preparation.',
      },
      {
        question: 'How many Manav Rachna students are enrolled?',
        answer:
          'We have 30+ Manav Rachna International School students. Despite the distance, students value our AIIMS-quality teaching and choose us over closer but less effective coaching options.',
      },
    ],
    relatedSchools: [
      { name: 'MRIS Faridabad', url: '/neet-coaching-mris-faridabad-students' },
      { name: 'GD Goenka Faridabad', url: '/neet-coaching-gd-goenka-faridabad-students' },
      { name: 'DPS Faridabad', url: '/neet-coaching-dps-faridabad-students' },
      { name: 'MVN Faridabad', url: '/neet-coaching-mvn-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-mris-faridabad-students': {
    slug: 'neet-coaching-mris-faridabad-students',
    schoolName: 'MRIS (Manav Rachna International School)',
    locality: 'Sector 14, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '3 km',
    metaTitle: 'NEET Coaching for MRIS Faridabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Specialized NEET coaching for MRIS Sector 14 Faridabad students. Sector 17 center just 3 km away. After-school batches, AIIMS faculty. Proven NEET results.',
    heroTitle: 'NEET Coaching for MRIS Faridabad Students',
    heroSubtitle:
      'Our Sector 17 center is just 3 km from MRIS Sector 14. Join 35+ MRIS students preparing for NEET with convenient after-school batches.',
    schoolHighlights: [
      '35+ MRIS Faridabad students enrolled',
      'Just 3 km from MRIS Sector 14 campus',
      'After-school batches from 3:30 PM',
      'CBSE curriculum aligned NEET preparation',
      '12+ MRIS alumni in top medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Close to MRIS Campus',
        description:
          'Our Sector 17 center is just 3 km from MRIS Sector 14 - about 10-12 minutes by auto.',
      },
      {
        title: 'MRIS-Friendly Timing',
        description: 'After-school batches at 3:30 PM are timed perfectly for MRIS students.',
      },
      {
        title: 'MRIS Peer Group',
        description:
          '35+ MRIS students at Cerebrum means a familiar and motivating study environment.',
      },
      {
        title: 'Proven Track Record',
        description:
          '12+ MRIS alumni have made it to top medical colleges including AIIMS and MAMC.',
      },
    ],
    successStories: [
      {
        name: 'Tanvi Gupta',
        batch: 'MRIS Faridabad, Class of 2024',
        result: 'NEET Score: 664',
        quote:
          'The short commute from MRIS to Cerebrum meant I could attend coaching daily without exhaustion. The teachers were brilliant at explaining complex biology topics.',
      },
      {
        name: 'Karan Singh',
        batch: 'MRIS Faridabad, Class of 2023',
        result: 'MAMC Delhi - MBBS',
        quote:
          'Cerebrum was the best decision for my NEET preparation. The proximity to MRIS and the quality of teaching gave me the edge I needed.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from MRIS Sector 14?',
        answer:
          'Our Faridabad center at Sector 17 is just 3 km from MRIS Sector 14 campus. The commute takes approximately 10-12 minutes by auto or car.',
      },
      {
        question: 'What batch timings suit MRIS students?',
        answer:
          'Our 3:30 PM after-school batch is the most popular among MRIS students. We also offer 4:30 PM evening and weekend batches.',
      },
      {
        question: 'How many MRIS students are currently enrolled?',
        answer:
          'We have 35+ MRIS students across various batches. The MRIS community at Cerebrum is one of our strongest school groups in Faridabad.',
      },
      {
        question: 'Is there any overlap with Manav Rachna International School Sector 46 students?',
        answer:
          'Yes, we have students from both MRIS Sector 14 and Manav Rachna Sector 46. Combined, they form one of the largest school communities at our center, often studying together.',
      },
      {
        question: 'Do you provide study material aligned with MRIS curriculum?',
        answer:
          'Our study material is aligned with CBSE curriculum that MRIS follows, plus additional NEET-specific depth. We provide comprehensive notes, practice papers, and previous year solutions.',
      },
    ],
    relatedSchools: [
      { name: 'Manav Rachna Faridabad', url: '/neet-coaching-manav-rachna-faridabad-students' },
      { name: 'DAV Faridabad', url: '/neet-coaching-dav-faridabad-students' },
      { name: 'DPS Faridabad', url: '/neet-coaching-dps-faridabad-students' },
      { name: 'Aggarwal Public School', url: '/neet-coaching-aggarwal-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-greenfields-faridabad-students': {
    slug: 'neet-coaching-greenfields-faridabad-students',
    schoolName: 'Greenfields School Faridabad',
    locality: 'Sector 19, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '2 km',
    metaTitle: 'NEET Coaching for Greenfields School Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET coaching for Greenfields School Faridabad students. Sector 17 center just 2 km from campus. After-school batches, AIIMS faculty, proven results.',
    heroTitle: 'NEET Coaching for Greenfields School Faridabad Students',
    heroSubtitle:
      'Our Sector 17 center is just 2 km from Greenfields School. Join 25+ Greenfields students preparing for NEET with personalized coaching.',
    schoolHighlights: [
      '25+ Greenfields School students enrolled',
      'Just 2 km from Greenfields Sector 19 campus',
      'After-school batches from 3:30 PM',
      'CBSE aligned NEET preparation',
      '8+ Greenfields alumni in medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Close Proximity',
        description:
          'Our Sector 17 center is just 2 km from Greenfields School - a quick 10-minute ride after school.',
      },
      {
        title: 'After-School Batches',
        description:
          '3:30 PM and 4:30 PM batches designed to fit Greenfields School dismissal timings.',
      },
      {
        title: 'Personalized Coaching',
        description:
          'Small batch sizes mean Greenfields students get individual attention and doubt clearing.',
      },
      {
        title: 'Comprehensive Preparation',
        description:
          'Full NEET syllabus coverage with NCERT-based teaching and extensive practice tests.',
      },
    ],
    successStories: [
      {
        name: 'Megha Verma',
        batch: 'Greenfields School, Class of 2024',
        result: 'NEET Score: 652',
        quote:
          'Cerebrum was just a short ride from Greenfields. The personalized attention helped me improve my biology score from 280 to 340 in just 6 months.',
      },
      {
        name: 'Aditya Bansal',
        batch: 'Greenfields School, Class of 2023',
        result: 'UCMS Delhi - MBBS',
        quote:
          'The faculty at Cerebrum went beyond regular coaching. They understood my weak areas and created a custom study plan that worked perfectly for NEET.',
      },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum to Greenfields School?',
        answer:
          'Our Faridabad center at Sector 17 is just 2 km from Greenfields School Sector 19 campus. Most students reach in about 10 minutes by auto or car.',
      },
      {
        question: 'What batch timings are available for Greenfields students?',
        answer:
          'We offer 3:30 PM and 4:30 PM after-school batches on weekdays. Saturday-Sunday intensive batches are also available for comprehensive weekend preparation.',
      },
      {
        question: 'How many Greenfields students study at Cerebrum?',
        answer:
          'Currently 25+ Greenfields School students are enrolled across various batches. They form an active study group and often prepare together after classes.',
      },
      {
        question: 'What makes Cerebrum different from other coaching centers near Greenfields?',
        answer:
          'Our AIIMS alumni faculty, small batch sizes, and proven track record with 8+ Greenfields alumni in medical colleges set us apart. We focus on conceptual understanding, not just rote memorization.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Faridabad', url: '/neet-coaching-dps-faridabad-students' },
      { name: 'MVN Faridabad', url: '/neet-coaching-mvn-faridabad-students' },
      { name: 'DAV Faridabad', url: '/neet-coaching-dav-faridabad-students' },
      { name: 'Aggarwal Public School', url: '/neet-coaching-aggarwal-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-aggarwal-faridabad-students': {
    slug: 'neet-coaching-aggarwal-faridabad-students',
    schoolName: 'Aggarwal Public School Faridabad',
    locality: 'NIT-3, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '4 km',
    metaTitle: 'NEET Coaching for Aggarwal Public School Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET coaching for Aggarwal Public School NIT Faridabad students. Sector 17 center, convenient batches. AIIMS faculty, affordable fees. Book free demo!',
    heroTitle: 'NEET Coaching for Aggarwal Public School Faridabad Students',
    heroSubtitle:
      'Join 30+ Aggarwal Public School students at our Sector 17 center. After-school and weekend batches with AIIMS-quality teaching at affordable fees.',
    schoolHighlights: [
      '30+ Aggarwal Public School students enrolled',
      '4 km from APS NIT-3 campus',
      'After-school batches from 4 PM',
      'Affordable NEET coaching with AIIMS faculty',
      '10+ APS alumni in medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Accessible Location',
        description:
          'Our Sector 17 center is 4 km from APS NIT-3 - about 15 minutes by auto or bus.',
      },
      {
        title: 'Affordable Excellence',
        description:
          'AIIMS-quality teaching at fees that are reasonable for Aggarwal Public School families.',
      },
      {
        title: 'APS Peer Group',
        description: '30+ APS students means you prepare alongside friends from your own school.',
      },
      {
        title: 'Result-Oriented Teaching',
        description:
          '10+ APS alumni in medical colleges proves our coaching delivers real results.',
      },
    ],
    successStories: [
      {
        name: 'Ravi Kumar',
        batch: 'Aggarwal Public School, Class of 2024',
        result: 'NEET Score: 648',
        quote:
          'Coming from NIT-3, I was worried about the commute but it was just 15 minutes. The quality of teaching at Cerebrum was far better than anything available near my school.',
      },
      {
        name: 'Pooja Sharma',
        batch: 'Aggarwal Public School, Class of 2023',
        result: 'MAMC Delhi - MBBS',
        quote:
          'Cerebrum believed in me when I doubted myself. The teachers gave extra attention and practice that helped me crack NEET with a great score.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Aggarwal Public School NIT-3?',
        answer:
          'Our Faridabad center at Sector 17 is approximately 4 km from Aggarwal Public School NIT-3. The commute takes about 15 minutes by auto, bus, or car.',
      },
      {
        question: 'What batch timings work for APS students?',
        answer:
          'Our 4 PM and 5 PM after-school batches are popular with APS students. Weekend batches running Saturday-Sunday are also available for intensive preparation.',
      },
      {
        question: 'How many APS students are enrolled at Cerebrum?',
        answer:
          'We currently have 30+ Aggarwal Public School students across different batches. They form a tight-knit study group and support each other throughout preparation.',
      },
      {
        question: 'Is the fee structure affordable for APS families?',
        answer:
          'We offer competitive fees with flexible payment options including EMI. Our focus is on making quality NEET coaching accessible. Contact us for current fee details.',
      },
      {
        question: 'Are there any transport arrangements from NIT-3 to Sector 17?',
        answer:
          'While we do not provide transport directly, many APS students coordinate shared autos or car pools. We can connect you with other APS students through our WhatsApp group.',
      },
    ],
    relatedSchools: [
      { name: 'MVN Faridabad', url: '/neet-coaching-mvn-faridabad-students' },
      { name: 'Modern School Faridabad', url: '/neet-coaching-modern-school-faridabad-students' },
      { name: 'DAV Faridabad', url: '/neet-coaching-dav-faridabad-students' },
      { name: 'Greenfields Faridabad', url: '/neet-coaching-greenfields-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-modern-school-faridabad-students': {
    slug: 'neet-coaching-modern-school-faridabad-students',
    schoolName: 'Modern School Faridabad',
    locality: 'Sector 17, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '0.5 km',
    metaTitle: 'NEET Coaching for Modern School Faridabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Top NEET coaching for Modern School Faridabad students. Sector 17 center walking distance - just 0.5 km! After-school batches, AIIMS faculty. Book free demo!',
    heroTitle: 'NEET Coaching for Modern School Faridabad Students',
    heroSubtitle:
      'Walking distance from Modern School! Our Sector 17 center is just 0.5 km away. Join 40+ Modern School students preparing for NEET.',
    schoolHighlights: [
      '40+ Modern School Faridabad students enrolled',
      'Walking distance - just 0.5 km from campus',
      'After-school batches from 2:30 PM',
      'Modern School curriculum aligned teaching',
      '14+ Modern School alumni in medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Walking Distance',
        description:
          'Our Sector 17 center is just 0.5 km from Modern School - walk from school to coaching in 5 minutes.',
      },
      {
        title: 'Earliest Batches',
        description:
          'Our 2:30 PM batch is designed for Modern School students who finish school early.',
      },
      {
        title: 'Strong Modern School Community',
        description:
          '40+ Modern School students means a strong peer group for motivation and group study.',
      },
      {
        title: 'Maximum Study Time',
        description: 'Zero commute time means more hours for actual study and practice.',
      },
    ],
    successStories: [
      {
        name: 'Simran Kaur',
        batch: 'Modern School Faridabad, Class of 2024',
        result: 'NEET Score: 676',
        quote:
          'I literally walked to Cerebrum from Modern School every day. The 5-minute walk saved so much time that I used for extra practice questions.',
      },
      {
        name: 'Vivek Joshi',
        batch: 'Modern School Faridabad, Class of 2023',
        result: 'AIIMS Delhi - MBBS',
        quote:
          'Being steps away from coaching meant I attended every single class without fail. That consistency made all the difference in my NEET score.',
      },
    ],
    faqs: [
      {
        question: 'How close is Cerebrum to Modern School Faridabad?',
        answer:
          'Our Faridabad center at Sector 17 is just 0.5 km from Modern School campus - literally walking distance. Students walk over in about 5 minutes after school.',
      },
      {
        question: 'What is the earliest batch for Modern School students?',
        answer:
          'Our 2:30 PM batch is the earliest and most popular among Modern School students. Since school ends early, students can have a quick lunch and walk to coaching.',
      },
      {
        question: 'How many Modern School Faridabad students are enrolled?',
        answer:
          'We have 40+ Modern School Faridabad students across our batches. This is one of our largest school groups at the Faridabad center.',
      },
      {
        question: 'Can parents wait at the center during coaching?',
        answer:
          'Yes, we have a waiting area for parents. However, given the walking distance, most Modern School parents prefer to have their children walk home after coaching.',
      },
    ],
    relatedSchools: [
      { name: 'MVN Faridabad', url: '/neet-coaching-mvn-faridabad-students' },
      { name: 'DPS Faridabad', url: '/neet-coaching-dps-faridabad-students' },
      { name: 'Aggarwal Public School', url: '/neet-coaching-aggarwal-faridabad-students' },
      { name: 'Apeejay Faridabad', url: '/neet-coaching-apeejay-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-gd-goenka-faridabad-students': {
    slug: 'neet-coaching-gd-goenka-faridabad-students',
    schoolName: 'GD Goenka Public School Faridabad',
    locality: 'Sector 48, Faridabad',
    nearestCenter: 'Faridabad Center',
    distance: '9 km',
    metaTitle: 'NEET Coaching for GD Goenka Faridabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET coaching for GD Goenka Public School Sector 48 Faridabad students. Expert AIIMS faculty, weekend and online batches. Proven NEET results.',
    heroTitle: 'NEET Coaching for GD Goenka Faridabad Students',
    heroSubtitle:
      'Elite NEET preparation for GD Goenka students. Our Sector 17 center offers weekend intensive and online batch options for students from Sector 48.',
    schoolHighlights: [
      '20+ GD Goenka Faridabad students enrolled',
      'Weekend and online batch options available',
      'AIIMS-quality conceptual teaching',
      'Flexible scheduling for Sector 48 students',
      '8+ GD Goenka alumni in medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Flexible Learning Modes',
        description:
          'Combine weekend offline classes at Sector 17 with weekday online sessions for maximum convenience from Sector 48.',
      },
      {
        title: 'Weekend Intensive Batches',
        description:
          'Saturday-Sunday intensive sessions are ideal for GD Goenka students who prefer focused weekend preparation.',
      },
      {
        title: 'Premium Academic Standards',
        description:
          'Teaching quality that matches the high standards GD Goenka students are accustomed to.',
      },
      {
        title: 'Individual Mentoring',
        description:
          'Small batch sizes ensure personalized guidance and regular progress tracking for each student.',
      },
    ],
    successStories: [
      {
        name: 'Ananya Mittal',
        batch: 'GD Goenka Faridabad, Class of 2024',
        result: 'NEET Score: 696',
        quote:
          'The weekend batches at Cerebrum were intense and productive. I covered more in two weekend sessions than most students cover in a week of evening classes.',
      },
      {
        name: 'Siddharth Agarwal',
        batch: 'GD Goenka Faridabad, Class of 2023',
        result: 'AIIMS Delhi - MBBS',
        quote:
          'Despite being 9 km away, I chose Cerebrum for the quality. The online classes on weekdays and offline on weekends was the perfect combination.',
      },
    ],
    faqs: [
      {
        question: 'How do GD Goenka students manage the 9 km commute?',
        answer:
          'Most GD Goenka students use our weekend batches (Saturday-Sunday at Sector 17) and attend live online classes during weekdays. Parents typically drop students for weekend sessions.',
      },
      {
        question: 'Are online classes as effective as offline?',
        answer:
          'Our live online classes use the same faculty and curriculum as offline batches. Students can interact, ask doubts, and participate in real-time. Many GD Goenka students prefer this hybrid approach.',
      },
      {
        question: 'What are the weekend batch timings?',
        answer:
          'Weekend batches run from 10 AM to 1 PM and 2 PM to 5 PM on both Saturday and Sunday. GD Goenka students typically choose the morning batch for intensive preparation.',
      },
      {
        question: 'How many GD Goenka students are enrolled at Cerebrum?',
        answer:
          'We have 20+ GD Goenka Public School students. Despite being the farthest school, they choose us for AIIMS-quality teaching and proven track record.',
      },
      {
        question: 'Is there a trial class available for GD Goenka students?',
        answer:
          'Yes, we offer a free demo class so you can experience our teaching quality before enrolling. Contact us on WhatsApp or call to schedule your free demo.',
      },
    ],
    relatedSchools: [
      { name: 'Manav Rachna Faridabad', url: '/neet-coaching-manav-rachna-faridabad-students' },
      { name: 'DPS Faridabad', url: '/neet-coaching-dps-faridabad-students' },
      { name: 'MRIS Faridabad', url: '/neet-coaching-mris-faridabad-students' },
      { name: 'Apeejay Faridabad', url: '/neet-coaching-apeejay-faridabad-students' },
    ],
    centerDetails: {
      name: 'Faridabad Center',
      address: 'Sector 17, Faridabad 121002',
      timing: '8 AM - 8 PM',
      phone: '+91-88264-44334',
    },
  },

  'neet-coaching-dps-noida-students': {
    slug: 'neet-coaching-dps-noida-students',
    schoolName: 'DPS Noida',
    locality: 'Sector 30, Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '4 km',
    metaTitle: 'NEET Coaching for DPS Noida Students | Cerebrum Biology Academy',
    metaDescription:
      'Top NEET biology coaching for DPS Noida Sector 30 students. After-school batches, AIIMS faculty, 19,000+ MCQ bank. Just 4 km from DPS Noida campus.',
    heroTitle: 'NEET Biology Coaching for DPS Noida Students',
    heroSubtitle:
      'Join DPS Noida students preparing for NEET at Cerebrum Biology Academy, Sector 62 — only 4 km from your school. Expert faculty, small batches, proven results.',
    schoolHighlights: [
      'CBSE school with strong science stream',
      'Excellent track record in board and competitive exams',
      'Well-equipped biology and chemistry labs',
      'Active science clubs and Olympiad participation',
      'Dedicated career guidance for medical aspirants',
    ],
    whyStudentsChoose: [
      {
        title: 'Close to School',
        description:
          'Our Sector 62 center is just 4 km from DPS Noida, making post-school commute easy.',
      },
      {
        title: 'Small Batches',
        description:
          'Maximum 15 students per batch ensures individual attention and doubt resolution.',
      },
      {
        title: 'AIIMS-Trained Faculty',
        description:
          'Learn from faculty with AIIMS and top medical college backgrounds for NEET-level depth.',
      },
      {
        title: 'Largest MCQ Bank',
        description:
          '19,000+ curated NEET MCQs covering NCERT, previous papers, and high-yield topics.',
      },
    ],
    successStories: [
      {
        name: 'Arjun Kapoor',
        batch: 'DPS Noida, Class of 2024',
        result: 'NEET Score: 665',
        quote:
          'Cerebrum faculty explained biology concepts so clearly I could tackle any NEET question confidently.',
      },
      {
        name: 'Sneha Gupta',
        batch: 'DPS Noida, Class of 2025',
        result: 'NEET Score: 642',
        quote:
          'The proximity to school and evening batches made managing both DPS academics and NEET prep seamless.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from DPS Noida Sector 30?',
        answer:
          'Our Sector 62 center is approximately 4 km from DPS Noida, about 10-15 minutes by car or auto.',
      },
      {
        question: 'What batch timings are available for DPS Noida students?',
        answer:
          'We offer evening batches starting at 4:30 PM and 5:30 PM on weekdays, plus weekend batches on Saturday and Sunday.',
      },
      {
        question: 'Do you follow NCERT strictly for NEET preparation?',
        answer:
          'Yes, NCERT is our foundation. We cover every line of NCERT biology and then build on it with NEET-level concept depth and MCQ practice.',
      },
      {
        question: 'How do you handle DPS board exam schedules?',
        answer:
          'We adjust our test and revision schedule around DPS board exams so students are never overwhelmed during school examination periods.',
      },
      {
        question: 'Is there a free demo class for DPS Noida students?',
        answer:
          'Yes, we offer a free demo class. Call +91-99536-43938 or WhatsApp us to schedule your session at the Sector 62 center.',
      },
    ],
    relatedSchools: [
      { name: 'Amity International Noida', url: '/neet-coaching-amity-noida-students' },
      { name: 'Ryan International Noida', url: '/neet-coaching-ryan-noida-students' },
      { name: 'Kendriya Vidyalaya Noida', url: '/neet-coaching-kv-noida-students' },
      { name: 'Somerville School Noida', url: '/neet-coaching-somerville-noida-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-amity-noida-students': {
    slug: 'neet-coaching-amity-noida-students',
    schoolName: 'Amity International School Noida',
    locality: 'Sector 44, Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '3 km',
    metaTitle: 'NEET Coaching for Amity International Noida Students | Cerebrum Biology Academy',
    metaDescription:
      'Specialized NEET biology coaching for Amity International Noida Sector 44 students. 3 km away, small batches, AIIMS faculty. Achieve your medical dream.',
    heroTitle: 'NEET Biology Coaching for Amity International Noida Students',
    heroSubtitle:
      'Cerebrum Biology Academy is just 3 km from Amity International School Noida. Join our focused NEET batches and boost your biology score significantly.',
    schoolHighlights: [
      'CBSE affiliated with strong academic reputation',
      'Comprehensive science stream with modern labs',
      'Regular science fairs and project-based learning',
      'Strong Olympiad participation track record',
      'Career counseling with medical college guidance',
      'Active parent-teacher collaboration for board results',
    ],
    whyStudentsChoose: [
      {
        title: 'Nearest Center',
        description:
          'Sector 62 is only 3 km from Amity Sector 44 — the closest quality NEET coaching available.',
      },
      {
        title: 'Small Batches',
        description:
          'Limited seats per batch mean your doubts never go unanswered in a crowd.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Our teachers come from AIIMS backgrounds and know exactly what NEET demands.',
      },
      {
        title: 'MCQ Practice Bank',
        description:
          '19,000+ MCQs with chapter-wise, topic-wise and difficulty-wise filtering for targeted practice.',
      },
    ],
    successStories: [
      {
        name: 'Priya Agarwal',
        batch: 'Amity Noida, Class of 2024',
        result: 'NEET Score: 658',
        quote:
          'Coming from Amity where academics are intense, Cerebrum helped me balance both without burning out.',
      },
      {
        name: 'Varun Sinha',
        batch: 'Amity Noida, Class of 2025',
        result: 'NEET Score: 631',
        quote:
          'The MCQ bank was a game changer. Practicing 19,000 questions built my confidence for the real exam.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Amity International School Sector 44?',
        answer:
          'Our Sector 62 Noida center is approximately 3 km from Amity International School Sector 44, about 8-10 minutes by car.',
      },
      {
        question: 'What timings are available for Amity students?',
        answer:
          'We offer post-school batches at 4:30 PM and 5:30 PM on weekdays and morning/afternoon weekend batches.',
      },
      {
        question: 'Do you cover NEET syllabus separate from school curriculum?',
        answer:
          'We cover the complete NEET syllabus which is largely NCERT-aligned. We supplement school learning with NEET-specific depth, previous year patterns, and MCQ practice.',
      },
      {
        question: 'Can Class 11 Amity students join NEET coaching?',
        answer:
          'Absolutely. We recommend joining in Class 11 for best results. Starting early gives more time for thorough NCERT coverage and revision cycles.',
      },
      {
        question: 'Is Cerebrum the best NEET coaching near Amity Noida?',
        answer:
          'We are the nearest specialized biology-focused NEET coaching center to Amity Noida, with AIIMS faculty and the largest MCQ bank in the NCR region.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Noida', url: '/neet-coaching-dps-noida-students' },
      { name: 'Ryan International Noida', url: '/neet-coaching-ryan-noida-students' },
      { name: 'Pathways World School Noida', url: '/neet-coaching-pathways-noida-students' },
      { name: 'Lotus Valley International', url: '/neet-coaching-lotus-valley-noida-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-ryan-noida-students': {
    slug: 'neet-coaching-ryan-noida-students',
    schoolName: 'Ryan International School Noida',
    locality: 'Sector 39, Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '3 km',
    metaTitle: 'NEET Coaching for Ryan International Noida Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET biology coaching for Ryan International School Noida Sector 39 students. Only 3 km away. Small batches, 19,000+ MCQs, AIIMS faculty.',
    heroTitle: 'NEET Biology Coaching for Ryan International Noida Students',
    heroSubtitle:
      'Ryan International Noida students trust Cerebrum Biology Academy for NEET prep — just 3 km from your Sector 39 campus. Expert biology faculty, proven methods.',
    schoolHighlights: [
      'CBSE school with strong science and medical stream focus',
      'Modern laboratories supporting practical biology learning',
      'Dedicated coaching and competitive exam guidance cell',
      'Regular mock tests and inter-school competitions',
      'Strong alumni in medical and engineering colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Proximity',
        description:
          'Our Sector 62 center is just 3 km from Ryan International Sector 39 for a hassle-free commute.',
      },
      {
        title: 'AIIMS-Level Teaching',
        description:
          'Faculty with AIIMS pedigree brings the standard of teaching that matches top NEET ranks.',
      },
      {
        title: 'Small Batches',
        description:
          'Batches of maximum 15 ensure personalized guidance and regular performance tracking.',
      },
      {
        title: 'MCQ Bank',
        description:
          'Access 19,000+ NEET-focused MCQs for daily practice, chapter tests and full syllabus revisions.',
      },
    ],
    successStories: [
      {
        name: 'Ankita Verma',
        batch: 'Ryan International Noida, Class of 2024',
        result: 'NEET Score: 645',
        quote:
          'The faculty at Cerebrum made biology simple and interesting. I scored 160+ in biology in NEET.',
      },
      {
        name: 'Rahul Bansal',
        batch: 'Ryan International Noida, Class of 2025',
        result: 'NEET Score: 619',
        quote:
          'Joining Cerebrum in Class 11 gave me a solid head start. The structured approach was perfect.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Ryan International Noida Sector 39?',
        answer:
          'Our Sector 62 Noida center is about 3 km from Ryan International School Sector 39, roughly 10 minutes by car.',
      },
      {
        question: 'What NEET batch options are available for Ryan students?',
        answer:
          'Post-school batches at 4:30 PM and 5:30 PM on weekdays, and Saturday-Sunday morning batches for intensive preparation.',
      },
      {
        question: 'Do you provide study material aligned with NCERT?',
        answer:
          'Yes, all our study material is NCERT-based and supplemented with NEET-specific notes, diagrams, and high-yield summaries.',
      },
      {
        question: 'Can we attend a trial class before enrolling?',
        answer:
          'Yes, we offer a free demo class at our Sector 62 center. Call or WhatsApp +91-99536-43938 to book your slot.',
      },
      {
        question: 'How do you track individual student progress?',
        answer:
          'We conduct weekly topic tests and monthly mock NEET exams. Individual performance reports are shared with parents regularly.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Noida', url: '/neet-coaching-dps-noida-students' },
      { name: 'Amity International Noida', url: '/neet-coaching-amity-noida-students' },
      { name: 'Kendriya Vidyalaya Noida', url: '/neet-coaching-kv-noida-students' },
      { name: 'Somerville School Noida', url: '/neet-coaching-somerville-noida-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-lotus-valley-noida-students': {
    slug: 'neet-coaching-lotus-valley-noida-students',
    schoolName: 'Lotus Valley International School',
    locality: 'Sector 126, Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '7 km',
    metaTitle:
      'NEET Coaching for Lotus Valley International Students | Cerebrum Biology Academy',
    metaDescription:
      'Top NEET biology coaching for Lotus Valley International School Noida students. 7 km from Sector 126, AIIMS faculty, small batches, 19,000+ MCQ bank.',
    heroTitle: 'NEET Biology Coaching for Lotus Valley International Students',
    heroSubtitle:
      'Lotus Valley International School students from Noida Sector 126 choose Cerebrum Biology Academy for focused NEET preparation. Expert faculty, structured batches.',
    schoolHighlights: [
      'CBSE school renowned for academic excellence',
      'State-of-the-art science laboratories',
      'Strong tradition of Olympiad and competitive exam success',
      'Career-oriented programs for medical aspirants',
      'Holistic development with sports and academics',
    ],
    whyStudentsChoose: [
      {
        title: 'Accessible Location',
        description:
          'Sector 62 center is 7 km from Lotus Valley Sector 126 — easy via Noida Expressway.',
      },
      {
        title: 'Small Batches',
        description:
          'Each batch is capped at 15 students so every student gets individual attention and mentoring.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Our AIIMS-trained faculty ensures you learn biology at the depth NEET demands.',
      },
      {
        title: 'Massive MCQ Practice',
        description:
          '19,000+ NEET MCQs with performance analytics to track and improve your weak areas.',
      },
    ],
    successStories: [
      {
        name: 'Divya Nair',
        batch: 'Lotus Valley International, Class of 2024',
        result: 'NEET Score: 651',
        quote:
          'The 15-student batch at Cerebrum was unlike anything — every doubt was resolved in class itself.',
      },
      {
        name: 'Karan Sharma',
        batch: 'Lotus Valley International, Class of 2025',
        result: 'NEET Score: 628',
        quote:
          'Coming 7 km was worth it. The biology teaching here is in a different league altogether.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Lotus Valley International Sector 126?',
        answer:
          'Our Sector 62 center is approximately 7 km from Lotus Valley International School Sector 126, about 15-20 minutes via Noida Expressway.',
      },
      {
        question: 'Are there weekend batches for Lotus Valley students?',
        answer:
          'Yes, we offer Saturday and Sunday batches for students who prefer weekend-intensive preparation alongside school weekdays.',
      },
      {
        question: 'Do you provide NCERT-based notes and summary sheets?',
        answer:
          'Yes, we provide comprehensive NCERT-based notes, chapter summaries, and high-yield topic sheets designed specifically for NEET.',
      },
      {
        question: 'How early should Lotus Valley students join NEET coaching?',
        answer:
          'We recommend joining in Class 11 to cover the full 2-year NEET syllabus thoroughly. Class 12 and dropper batches are also available.',
      },
      {
        question: 'Is there online coaching available for Lotus Valley students?',
        answer:
          'Yes, we offer hybrid options with online classes that can supplement your in-center coaching for added flexibility.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Noida', url: '/neet-coaching-dps-noida-students' },
      { name: 'Jaypee Public School Noida', url: '/neet-coaching-jaypee-noida-students' },
      { name: 'Pathways World School Noida', url: '/neet-coaching-pathways-noida-students' },
      { name: 'Amity International Noida', url: '/neet-coaching-amity-noida-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-kv-noida-students': {
    slug: 'neet-coaching-kv-noida-students',
    schoolName: 'Kendriya Vidyalaya Noida',
    locality: 'Sector 24, Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '4 km',
    metaTitle: 'NEET Coaching for Kendriya Vidyalaya Noida Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET biology coaching for KV Noida Sector 24 students. 4 km from your school, small batches, AIIMS faculty, 19,000+ MCQs. Start your medical journey.',
    heroTitle: 'NEET Biology Coaching for Kendriya Vidyalaya Noida Students',
    heroSubtitle:
      'KV Noida students preparing for NEET — Cerebrum Biology Academy in Sector 62 is just 4 km away. Join small focused batches and achieve your AIIMS dream.',
    schoolHighlights: [
      'CBSE school under central government with disciplined academics',
      'Strong focus on science and mathematics from early classes',
      'Regular Olympiad and national scholarship participation',
      'Good track record in board examinations',
      'Affordable quality education with dedicated teachers',
    ],
    whyStudentsChoose: [
      {
        title: 'Nearby Center',
        description:
          'Sector 62 is just 4 km from KV Noida Sector 24, making daily commute convenient.',
      },
      {
        title: 'Affordable Excellence',
        description:
          'We offer AIIMS-quality teaching at accessible fees — perfect for KV students aspiring for top medical colleges.',
      },
      {
        title: 'Small Batches',
        description:
          'Maximum 15 students per batch ensures the personalized attention KV students deserve.',
      },
      {
        title: 'Proven Results',
        description:
          'Our students consistently achieve NEET scores in the 600-680 range for top medical college admissions.',
      },
    ],
    successStories: [
      {
        name: 'Aman Tripathi',
        batch: 'KV Noida, Class of 2024',
        result: 'NEET Score: 638',
        quote:
          'Cerebrum gave me the NEET-level depth that my school could not provide. Best decision I made.',
      },
      {
        name: 'Ritu Kumari',
        batch: 'KV Noida, Class of 2025',
        result: 'NEET Score: 612',
        quote:
          'The faculty here understands how to prepare government school students for NEET. Very supportive.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Kendriya Vidyalaya Noida Sector 24?',
        answer:
          'Our Sector 62 center is approximately 4 km from KV Noida Sector 24, about 10-12 minutes by auto or car.',
      },
      {
        question: 'What are the fee options for KV Noida students?',
        answer:
          'We offer affordable fee structures with EMI options. Contact us at +91-99536-43938 for current fee details and scholarship opportunities.',
      },
      {
        question: 'Do you provide special support for first-generation medical aspirants?',
        answer:
          'Yes, we have dedicated counseling and mentoring support for students who are the first in their family to pursue medicine.',
      },
      {
        question: 'Are NCERT exercises covered in full?',
        answer:
          'Every NCERT exercise, intext question, and example is covered. We also add diagram-based and assertion-reason questions crucial for NEET.',
      },
      {
        question: 'Can KV students get a free trial class?',
        answer:
          'Yes, call or WhatsApp +91-99536-43938 to book a free demo class at our Sector 62 Noida center.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Noida', url: '/neet-coaching-dps-noida-students' },
      { name: 'Ryan International Noida', url: '/neet-coaching-ryan-noida-students' },
      { name: 'Somerville School Noida', url: '/neet-coaching-somerville-noida-students' },
      { name: 'Amity International Noida', url: '/neet-coaching-amity-noida-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-pathways-noida-students': {
    slug: 'neet-coaching-pathways-noida-students',
    schoolName: 'Pathways World School Noida',
    locality: 'Sector 100, Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '5 km',
    metaTitle: 'NEET Coaching for Pathways World School Noida Students | Cerebrum Biology Academy',
    metaDescription:
      'Specialized NEET biology coaching for Pathways World School Noida Sector 100 students. 5 km away, AIIMS faculty, small batches, 19,000+ MCQ bank.',
    heroTitle: 'NEET Biology Coaching for Pathways World School Noida Students',
    heroSubtitle:
      'Pathways World School Noida students — Cerebrum Biology Academy at Sector 62 is just 5 km away. Top NEET biology faculty, structured preparation, small batches.',
    schoolHighlights: [
      'IB and CBSE streams with international academic standards',
      'Globally minded curriculum encouraging critical thinking',
      'State-of-the-art science facilities and research culture',
      'Medical stream with dedicated biology and chemistry labs',
      'College counseling for Indian and international medical colleges',
    ],
    whyStudentsChoose: [
      {
        title: 'Bridge IB to NEET',
        description:
          'We help Pathways IB/CBSE students bridge the gap between school curriculum and NEET MCQ pattern.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Our faculty from top medical colleges brings the teaching depth needed for high NEET scores.',
      },
      {
        title: 'Small Batches',
        description: 'Max 15 students ensures focused attention on each Pathways aspirant.',
      },
      {
        title: 'MCQ Practice',
        description:
          '19,000+ MCQs to convert Pathways conceptual understanding into NEET exam readiness.',
      },
    ],
    successStories: [
      {
        name: 'Ishaan Mehra',
        batch: 'Pathways World School, Class of 2024',
        result: 'NEET Score: 660',
        quote:
          'Transitioning from IB-style learning to NEET MCQ format was smooth thanks to Cerebrum faculty.',
      },
      {
        name: 'Anika Joshi',
        batch: 'Pathways World School, Class of 2025',
        result: 'NEET Score: 634',
        quote:
          'The structured NCERT-focused approach complemented my Pathways education perfectly for NEET.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Pathways World School Sector 100?',
        answer:
          'Our Sector 62 center is approximately 5 km from Pathways World School Sector 100, about 12-15 minutes by car.',
      },
      {
        question: 'Do you help IB students prepare for NEET?',
        answer:
          'Yes, we have experience guiding IB students to NEET. We bridge the curriculum gap with structured NCERT coverage and NEET-pattern MCQ training.',
      },
      {
        question: 'What batch timings suit Pathways students?',
        answer:
          'Post-school evening batches at 4:30 PM and 5:30 PM work well for Pathways students. Weekend batches are also available.',
      },
      {
        question: 'Is the teaching style different for Pathways vs CBSE students?',
        answer:
          'Our teaching is NEET-focused and adapts to each student background. We ensure Pathways students get the NCERT depth and MCQ practice they need.',
      },
      {
        question: 'How do you ensure Pathways students cover full NEET syllabus?',
        answer:
          'We follow a structured syllabus covering all NEET biology topics chapter by chapter, supplemented by regular tests and revision cycles.',
      },
    ],
    relatedSchools: [
      { name: 'Lotus Valley International', url: '/neet-coaching-lotus-valley-noida-students' },
      { name: 'Amity International Noida', url: '/neet-coaching-amity-noida-students' },
      { name: 'DPS Noida', url: '/neet-coaching-dps-noida-students' },
      { name: 'Jaypee Public School Noida', url: '/neet-coaching-jaypee-noida-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-jaypee-noida-students': {
    slug: 'neet-coaching-jaypee-noida-students',
    schoolName: 'Jaypee Public School Noida',
    locality: 'Sector 128, Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '8 km',
    metaTitle: 'NEET Coaching for Jaypee Public School Noida Students | Cerebrum Biology Academy',
    metaDescription:
      'Top NEET biology coaching for Jaypee Public School Noida Sector 128 students. 8 km to Sector 62 center. AIIMS faculty, small batches, 19,000+ MCQs.',
    heroTitle: 'NEET Biology Coaching for Jaypee Public School Noida Students',
    heroSubtitle:
      'Jaypee Public School Noida students choose Cerebrum Biology Academy for focused NEET biology preparation. Expert faculty at our Sector 62 center, 8 km away.',
    schoolHighlights: [
      'CBSE school with strong science programs',
      'Modern infrastructure with science and biology labs',
      'Focus on academic excellence and competitive exams',
      'Regular parent-teacher meetings for academic tracking',
      'Career guidance for medical and engineering streams',
    ],
    whyStudentsChoose: [
      {
        title: 'Dedicated Biology Focus',
        description:
          'Cerebrum specializes exclusively in NEET biology — the subject that makes or breaks NEET ranks.',
      },
      {
        title: 'Small Batches',
        description:
          'Max 15 students per batch means your questions always get answered and doubts never accumulate.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Learn from teachers who have studied at AIIMS and understand what top NEET ranks require.',
      },
      {
        title: 'MCQ Bank',
        description:
          '19,000+ curated MCQs for systematic practice from basics to advanced NEET level.',
      },
    ],
    successStories: [
      {
        name: 'Neha Saxena',
        batch: 'Jaypee Public School, Class of 2024',
        result: 'NEET Score: 648',
        quote:
          'The biology faculty at Cerebrum is exceptional. I improved my biology score by 40 marks in 3 months.',
      },
      {
        name: 'Vikram Yadav',
        batch: 'Jaypee Public School, Class of 2025',
        result: 'NEET Score: 622',
        quote:
          'The distance from Sector 128 was worth every minute. Cerebrum prepared me better than I imagined.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Jaypee Public School Sector 128?',
        answer:
          'Our Sector 62 center is approximately 8 km from Jaypee Public School Sector 128, about 20 minutes via Noida Expressway.',
      },
      {
        question: 'Are there weekend batches for Jaypee students?',
        answer:
          'Yes, Saturday and Sunday batches are available for Jaypee students who prefer weekend-intensive NEET prep.',
      },
      {
        question: 'What makes Cerebrum worth the commute from Sector 128?',
        answer:
          'Our AIIMS faculty, small batch size, 19,000+ MCQ bank, and proven results make Cerebrum the best NEET biology coaching in Noida, worth any commute.',
      },
      {
        question: 'How often are tests conducted?',
        answer:
          'We conduct weekly chapter tests and monthly full-length NEET mock exams. Performance reports are shared after every test.',
      },
      {
        question: 'Is there a free demo class available for Jaypee students?',
        answer:
          'Yes, contact us at +91-99536-43938 to schedule a free demo class at our Sector 62 Noida center.',
      },
    ],
    relatedSchools: [
      { name: 'Lotus Valley International', url: '/neet-coaching-lotus-valley-noida-students' },
      { name: 'DPS Greater Noida', url: '/neet-coaching-dps-greater-noida-students' },
      { name: 'Pathways World School Noida', url: '/neet-coaching-pathways-noida-students' },
      { name: 'DPS Noida', url: '/neet-coaching-dps-noida-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-somerville-noida-students': {
    slug: 'neet-coaching-somerville-noida-students',
    schoolName: 'Somerville School Noida',
    locality: 'Sector 22, Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '4 km',
    metaTitle: 'NEET Coaching for Somerville School Noida Students | Cerebrum Biology Academy',
    metaDescription:
      'Focused NEET biology coaching for Somerville School Noida Sector 22 students. 4 km from campus, AIIMS faculty, small batches. Achieve top NEET scores.',
    heroTitle: 'NEET Biology Coaching for Somerville School Noida Students',
    heroSubtitle:
      'Somerville School Noida students — Cerebrum Biology Academy at Sector 62 is just 4 km away. Expert NEET biology teaching, small batches, structured preparation.',
    schoolHighlights: [
      'CBSE school with strong academic reputation in Noida',
      'Excellent science stream with well-equipped labs',
      'Regular extracurricular and competitive exam support',
      'Good board exam results with medical stream focus',
      'Supportive faculty for competitive exam preparation',
    ],
    whyStudentsChoose: [
      {
        title: 'Close to Home',
        description:
          'Sector 62 is just 4 km from Somerville School Sector 22 — easy after-school commute.',
      },
      {
        title: 'Small Batches',
        description:
          'Limited to 15 students per batch ensuring every Somerville student gets personal mentoring.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Our teachers are from AIIMS and top medical colleges, bringing real exam insight to teaching.',
      },
      {
        title: 'Structured Program',
        description:
          'Two-year NEET program covering full syllabus with regular tests, revision, and mock exams.',
      },
    ],
    successStories: [
      {
        name: 'Pooja Rawat',
        batch: 'Somerville School Noida, Class of 2024',
        result: 'NEET Score: 643',
        quote:
          'Cerebrum helped me stay consistent throughout two years of NEET prep. The batch size was perfect.',
      },
      {
        name: 'Siddharth Chauhan',
        batch: 'Somerville School Noida, Class of 2025',
        result: 'NEET Score: 617',
        quote:
          'My confidence in biology grew tremendously at Cerebrum. The faculty is incredibly dedicated.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Somerville School Noida?',
        answer:
          'Our Sector 62 center is approximately 4 km from Somerville School Sector 22, about 10 minutes by car or auto.',
      },
      {
        question: 'What timings work best for Somerville students?',
        answer:
          'Evening batches at 4:30 PM and 5:30 PM on weekdays are popular with Somerville students. Weekend batches are also available.',
      },
      {
        question: 'Do you prepare students for board exams too?',
        answer:
          'Our NEET preparation is NCERT-based which directly helps board exam preparation. Students often see improvement in school biology marks too.',
      },
      {
        question: 'What is the batch size and why does it matter?',
        answer:
          'We cap batches at 15 students. This ensures every student can ask questions freely and receive individual attention from faculty.',
      },
      {
        question: 'How do I enroll at Cerebrum from Somerville School?',
        answer:
          'Call or WhatsApp +91-99536-43938, visit our Sector 62 center, or fill the enrollment form on our website to get started.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Noida', url: '/neet-coaching-dps-noida-students' },
      { name: 'Ryan International Noida', url: '/neet-coaching-ryan-noida-students' },
      { name: 'Kendriya Vidyalaya Noida', url: '/neet-coaching-kv-noida-students' },
      { name: 'Amity International Noida', url: '/neet-coaching-amity-noida-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-dps-indirapuram-students': {
    slug: 'neet-coaching-dps-indirapuram-students',
    schoolName: 'DPS Indirapuram',
    locality: 'Indirapuram, Ghaziabad',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '8 km',
    metaTitle: 'NEET Coaching for DPS Indirapuram Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET biology coaching for DPS Indirapuram Ghaziabad students. 8 km to Sector 62 Noida center. AIIMS faculty, small batches, 19,000+ MCQs.',
    heroTitle: 'NEET Biology Coaching for DPS Indirapuram Students',
    heroSubtitle:
      'DPS Indirapuram students — Cerebrum Biology Academy at Sector 62 Noida is just 8 km away. Top NEET biology coaching with AIIMS faculty and small batches.',
    schoolHighlights: [
      'Premier CBSE school in Indirapuram, Ghaziabad',
      'Strong science stream with excellent infrastructure',
      'Regular competitive exam preparation support',
      'Outstanding board exam results year after year',
      'Active medical and engineering aspirant communities',
    ],
    whyStudentsChoose: [
      {
        title: 'Nearest Specialized Coaching',
        description:
          'Cerebrum at Sector 62 Noida is the closest NEET biology specialist center for Indirapuram students.',
      },
      {
        title: 'Small Batches',
        description:
          'Max 15 students ensures DPS Indirapuram students receive individual attention every class.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Faculty with AIIMS credentials brings examination insight that transforms NEET preparation.',
      },
      {
        title: 'MCQ Practice Bank',
        description:
          '19,000+ NEET MCQs for exhaustive practice covering every chapter and NEET topic.',
      },
    ],
    successStories: [
      {
        name: 'Shreya Pandey',
        batch: 'DPS Indirapuram, Class of 2024',
        result: 'NEET Score: 654',
        quote:
          'The 8 km drive to Cerebrum was the best investment of my NEET preparation year.',
      },
      {
        name: 'Aditya Mishra',
        batch: 'DPS Indirapuram, Class of 2025',
        result: 'NEET Score: 629',
        quote:
          'Cerebrum faculty understood DPS Indirapuram syllabus pressure and helped me manage both effectively.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from DPS Indirapuram?',
        answer:
          'Our Sector 62 Noida center is approximately 8 km from DPS Indirapuram, about 20-25 minutes by car.',
      },
      {
        question: 'Is the commute from Indirapuram to Sector 62 Noida easy?',
        answer:
          'Yes, there are direct roads from Indirapuram to Sector 62 Noida. Many students car pool or use autos. The commute is straightforward.',
      },
      {
        question: 'Do you have batches that accommodate DPS Indirapuram school schedule?',
        answer:
          'Yes, our 4:30 PM and 5:30 PM evening batches are timed for students coming from schools in Indirapuram. Weekend batches are also available.',
      },
      {
        question: 'What makes Cerebrum better than coaching institutes in Indirapuram?',
        answer:
          'Cerebrum specializes exclusively in NEET biology with AIIMS-trained faculty and 19,000+ MCQs — a combination not available in Indirapuram coaching institutes.',
      },
      {
        question: 'How do I book a free demo class?',
        answer:
          'Call or WhatsApp +91-99536-43938 to schedule your free demo class at our Sector 62 Noida center.',
      },
    ],
    relatedSchools: [
      { name: 'Cambridge School Ghaziabad', url: '/neet-coaching-cambridge-ghaziabad-students' },
      { name: 'GD Goenka Ghaziabad', url: '/neet-coaching-gd-goenka-ghaziabad-students' },
      { name: 'Presidium School Ghaziabad', url: '/neet-coaching-presidium-ghaziabad-students' },
      { name: 'KR Mangalam Ghaziabad', url: '/neet-coaching-kr-mangalam-ghaziabad-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-cambridge-ghaziabad-students': {
    slug: 'neet-coaching-cambridge-ghaziabad-students',
    schoolName: 'Cambridge School Indirapuram',
    locality: 'Indirapuram, Ghaziabad',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '8 km',
    metaTitle:
      'NEET Coaching for Cambridge School Ghaziabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Top NEET biology coaching for Cambridge School Indirapuram Ghaziabad students. 8 km to Noida Sector 62. AIIMS faculty, small batches, 19,000+ MCQs.',
    heroTitle: 'NEET Biology Coaching for Cambridge School Ghaziabad Students',
    heroSubtitle:
      'Cambridge School Indirapuram Ghaziabad students — join Cerebrum Biology Academy Sector 62 for expert NEET biology coaching. Small batches, AIIMS faculty.',
    schoolHighlights: [
      'CBSE school with strong academic standards in Ghaziabad',
      'Science stream with well-equipped biology and chemistry labs',
      'Regular Olympiad and science competition participation',
      'Focused medical stream with career counseling',
      'Good board exam results and university admissions track record',
    ],
    whyStudentsChoose: [
      {
        title: 'Expert Biology Faculty',
        description:
          'AIIMS-trained teachers who have mastered NEET biology teaching for top results.',
      },
      {
        title: 'Small Batches',
        description:
          'Max 15 students per batch for individualized attention and doubt resolution.',
      },
      {
        title: 'Comprehensive MCQ Bank',
        description:
          '19,000+ NEET-focused MCQs covering every chapter and previous year patterns.',
      },
      {
        title: 'Structured Program',
        description:
          'Systematic coverage of full NEET syllabus with tests, revision, and parent feedback.',
      },
    ],
    successStories: [
      {
        name: 'Tanvi Bhatt',
        batch: 'Cambridge School Indirapuram, Class of 2024',
        result: 'NEET Score: 647',
        quote:
          'Cerebrum faculty made complex biology chapters look easy. My score improved dramatically.',
      },
      {
        name: 'Rohan Srivastava',
        batch: 'Cambridge School Indirapuram, Class of 2025',
        result: 'NEET Score: 621',
        quote:
          'The small batch at Cerebrum meant I never hesitated to ask questions. That made all the difference.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Cambridge School Indirapuram?',
        answer:
          'Our Sector 62 Noida center is approximately 8 km from Cambridge School Indirapuram, about 20-25 minutes by car.',
      },
      {
        question: 'Are there batch options after school hours?',
        answer:
          'Yes, we offer evening batches at 4:30 PM and 5:30 PM on weekdays, plus Saturday and Sunday batches.',
      },
      {
        question: 'How does Cerebrum compare to local Ghaziabad coaching?',
        answer:
          'Cerebrum specializes exclusively in NEET biology with AIIMS faculty and 19,000+ MCQs — a depth of focus unavailable in general coaching institutes.',
      },
      {
        question: 'Do you provide study material and notes?',
        answer:
          'Yes, comprehensive NCERT-based notes, chapter summaries, and topic-wise MCQ sheets are provided to all enrolled students.',
      },
      {
        question: 'How can Cambridge School Ghaziabad students enroll?',
        answer:
          'Call or WhatsApp +91-99536-43938, or visit our Sector 62 Noida center to enroll and book a free demo class.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Indirapuram', url: '/neet-coaching-dps-indirapuram-students' },
      { name: 'GD Goenka Ghaziabad', url: '/neet-coaching-gd-goenka-ghaziabad-students' },
      { name: 'Presidium School Ghaziabad', url: '/neet-coaching-presidium-ghaziabad-students' },
      { name: 'KR Mangalam Ghaziabad', url: '/neet-coaching-kr-mangalam-ghaziabad-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-gd-goenka-ghaziabad-students': {
    slug: 'neet-coaching-gd-goenka-ghaziabad-students',
    schoolName: 'GD Goenka School Indirapuram',
    locality: 'Indirapuram, Ghaziabad',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '9 km',
    metaTitle: 'NEET Coaching for GD Goenka Ghaziabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET biology coaching for GD Goenka School Indirapuram Ghaziabad students. 9 km to Sector 62 Noida. AIIMS faculty, small batches, 19,000+ MCQs.',
    heroTitle: 'NEET Biology Coaching for GD Goenka Ghaziabad Students',
    heroSubtitle:
      'GD Goenka Indirapuram Ghaziabad students — Cerebrum Biology Academy at Sector 62 Noida is the top choice for NEET biology. AIIMS faculty, focused batches.',
    schoolHighlights: [
      'CBSE school with high academic standards',
      'Comprehensive science stream with practical focus',
      'Regular science Olympiad participation',
      'Career counseling for medical aspirants',
      'Modern infrastructure with well-equipped labs',
    ],
    whyStudentsChoose: [
      {
        title: 'AIIMS-Level Depth',
        description:
          'Our AIIMS faculty brings the depth and clarity needed to score 650+ in NEET biology.',
      },
      {
        title: 'Small Batches',
        description:
          'With max 15 students, GD Goenka students get individualized attention every session.',
      },
      {
        title: 'MCQ Practice',
        description:
          '19,000+ carefully curated MCQs ensure exhaustive NEET exam preparation.',
      },
      {
        title: 'Proven Track Record',
        description:
          'Our students consistently achieve 600-680 NEET scores for top medical college admissions.',
      },
    ],
    successStories: [
      {
        name: 'Kritika Sharma',
        batch: 'GD Goenka Indirapuram, Class of 2024',
        result: 'NEET Score: 649',
        quote:
          'The 9 km commute to Cerebrum was absolutely worth it. My biology marks jumped 35 points.',
      },
      {
        name: 'Vivek Tiwari',
        batch: 'GD Goenka Indirapuram, Class of 2025',
        result: 'NEET Score: 623',
        quote:
          'Cerebrum faculty is patient, knowledgeable and truly dedicated to each student success.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from GD Goenka Indirapuram?',
        answer:
          'Our Sector 62 Noida center is approximately 9 km from GD Goenka School Indirapuram, about 20-25 minutes by car.',
      },
      {
        question: 'Are evening and weekend batches available for GD Goenka students?',
        answer:
          'Yes, we have post-school batches at 4:30 PM and 5:30 PM on weekdays and morning/afternoon batches on weekends.',
      },
      {
        question: 'Do you provide NEET-specific notes and study material?',
        answer:
          'Yes, all students receive NCERT-based notes, high-yield summaries, diagram sheets, and chapter-wise MCQ sets.',
      },
      {
        question: 'Is there a scholarship or discount for meritorious students?',
        answer:
          'Yes, we have scholarship programs for academically meritorious students. Contact us at +91-99536-43938 for details.',
      },
      {
        question: 'How do GD Goenka Ghaziabad students enroll at Cerebrum?',
        answer:
          'Call or WhatsApp +91-99536-43938 or visit our Sector 62 Noida center. A free demo class is available before enrollment.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Indirapuram', url: '/neet-coaching-dps-indirapuram-students' },
      { name: 'Cambridge School Ghaziabad', url: '/neet-coaching-cambridge-ghaziabad-students' },
      { name: 'Presidium School Ghaziabad', url: '/neet-coaching-presidium-ghaziabad-students' },
      { name: 'KR Mangalam Ghaziabad', url: '/neet-coaching-kr-mangalam-ghaziabad-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-kr-mangalam-ghaziabad-students': {
    slug: 'neet-coaching-kr-mangalam-ghaziabad-students',
    schoolName: 'K.R. Mangalam World School Vaishali',
    locality: 'Vaishali, Ghaziabad',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '5 km',
    metaTitle:
      'NEET Coaching for KR Mangalam Ghaziabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Specialized NEET biology coaching for KR Mangalam World School Vaishali Ghaziabad students. Only 5 km to Sector 62 Noida. AIIMS faculty, small batches.',
    heroTitle: 'NEET Biology Coaching for K.R. Mangalam World School Students',
    heroSubtitle:
      'K.R. Mangalam World School Vaishali Ghaziabad students — Cerebrum Biology Academy at Sector 62 Noida is just 5 km away. Top NEET biology preparation.',
    schoolHighlights: [
      'CBSE school with outstanding academic reputation in Vaishali',
      'Strong science stream with state-of-the-art laboratories',
      'Consistent top board exam performers',
      'Medical stream with dedicated science faculty',
      'Active Olympiad and science competition participation',
      'Comprehensive career guidance for medical aspirants',
    ],
    whyStudentsChoose: [
      {
        title: 'Closest Quality Coaching',
        description:
          'At just 5 km from Vaishali, Cerebrum Sector 62 is the nearest specialized NEET biology center.',
      },
      {
        title: 'Small Batches',
        description:
          'Max 15 students ensures KR Mangalam students get focused individual attention and mentoring.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Faculty from AIIMS and premier medical colleges teaching NEET biology at the highest level.',
      },
      {
        title: 'MCQ Practice',
        description:
          '19,000+ curated MCQs for systematic practice and comprehensive NEET preparation.',
      },
    ],
    successStories: [
      {
        name: 'Megha Agarwal',
        batch: 'KR Mangalam Vaishali, Class of 2024',
        result: 'NEET Score: 657',
        quote:
          'Cerebrum faculty made every difficult chapter approachable. My biology score improved by 42 marks.',
      },
      {
        name: 'Yash Gupta',
        batch: 'KR Mangalam Vaishali, Class of 2025',
        result: 'NEET Score: 630',
        quote:
          'Joining Cerebrum in Class 11 was the best decision for my NEET journey. Structured and focused.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from KR Mangalam World School Vaishali?',
        answer:
          'Our Sector 62 Noida center is approximately 5 km from KR Mangalam Vaishali, about 12-15 minutes by car.',
      },
      {
        question: 'What batch timings are suitable for KR Mangalam students?',
        answer:
          'Post-school batches at 4:30 PM and 5:30 PM work well for Vaishali students. Saturday and Sunday batches are also available.',
      },
      {
        question: 'How do you cover the NEET syllabus in two years?',
        answer:
          'We follow a structured chapter-by-chapter plan for Class 11 and 12 biology, with regular tests, revision cycles, and full-length mock NEET exams.',
      },
      {
        question: 'Are NCERT exemplar questions covered?',
        answer:
          'Yes, NCERT exemplar, previous year NEET questions, and our in-house MCQ bank are all covered as part of the comprehensive program.',
      },
      {
        question: 'How can KR Mangalam students enroll at Cerebrum?',
        answer:
          'Call or WhatsApp +91-99536-43938 or visit the Sector 62 Noida center. A free demo class is available before enrollment.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Indirapuram', url: '/neet-coaching-dps-indirapuram-students' },
      { name: 'Cambridge School Ghaziabad', url: '/neet-coaching-cambridge-ghaziabad-students' },
      { name: 'GD Goenka Ghaziabad', url: '/neet-coaching-gd-goenka-ghaziabad-students' },
      { name: 'Presidium School Ghaziabad', url: '/neet-coaching-presidium-ghaziabad-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-presidium-ghaziabad-students': {
    slug: 'neet-coaching-presidium-ghaziabad-students',
    schoolName: 'Presidium School Indirapuram',
    locality: 'Indirapuram, Ghaziabad',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '8 km',
    metaTitle: 'NEET Coaching for Presidium School Ghaziabad Students | Cerebrum Biology Academy',
    metaDescription:
      'Top NEET biology coaching for Presidium School Indirapuram Ghaziabad students. 8 km to Noida Sector 62. AIIMS faculty, small batches, 19,000+ MCQs.',
    heroTitle: 'NEET Biology Coaching for Presidium School Ghaziabad Students',
    heroSubtitle:
      'Presidium School Indirapuram Ghaziabad students choose Cerebrum Biology Academy at Sector 62 Noida for top NEET biology preparation. Expert faculty, focused batches.',
    schoolHighlights: [
      'CBSE school with progressive teaching methodology',
      'Holistic education with focus on academics and development',
      'Modern labs and technology-enabled learning',
      'Science stream with active lab-based learning',
      'Regular parent-teacher collaboration and feedback',
    ],
    whyStudentsChoose: [
      {
        title: 'Specialist Biology Teaching',
        description:
          'Cerebrum focuses exclusively on NEET biology — ensuring depth that general coaching cannot match.',
      },
      {
        title: 'Small Batches',
        description:
          'Max 15 students ensures all Presidium students get the individual attention they deserve.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Our teachers bring AIIMS-level knowledge and exam strategy to every biology class.',
      },
      {
        title: 'Largest MCQ Bank',
        description:
          '19,000+ NEET MCQs for comprehensive chapter and full-syllabus practice.',
      },
    ],
    successStories: [
      {
        name: 'Aditi Singh',
        batch: 'Presidium Indirapuram, Class of 2024',
        result: 'NEET Score: 641',
        quote:
          'The focused biology coaching at Cerebrum filled all gaps my school preparation left. Highly recommended.',
      },
      {
        name: 'Nikhil Saxena',
        batch: 'Presidium Indirapuram, Class of 2025',
        result: 'NEET Score: 615',
        quote:
          'Coming from Indirapuram, I was worried about commute. But the quality at Cerebrum made it worth it.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Presidium School Indirapuram?',
        answer:
          'Our Sector 62 Noida center is approximately 8 km from Presidium School Indirapuram, about 20 minutes by car.',
      },
      {
        question: 'Is there a convenient route from Indirapuram to Sector 62 Noida?',
        answer:
          'Yes, there is a direct road from Indirapuram to Sector 62 Noida. Many students use autos or car pools for the commute.',
      },
      {
        question: 'Do you have batch options for Class 11 and Class 12 separately?',
        answer:
          'Yes, we have separate batches for Class 11 and Class 12 NEET aspirants, each covering the appropriate syllabus portion.',
      },
      {
        question: 'Are dropper batches available for Presidium graduates?',
        answer:
          'Yes, we have dedicated dropper batches for students who want to attempt NEET again after Class 12. Intensive preparation with full syllabus revision.',
      },
      {
        question: 'How do Presidium Ghaziabad students enroll at Cerebrum?',
        answer:
          'Call or WhatsApp +91-99536-43938 or visit our Sector 62 Noida center. A free demo class is available.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Indirapuram', url: '/neet-coaching-dps-indirapuram-students' },
      { name: 'Cambridge School Ghaziabad', url: '/neet-coaching-cambridge-ghaziabad-students' },
      { name: 'GD Goenka Ghaziabad', url: '/neet-coaching-gd-goenka-ghaziabad-students' },
      { name: 'KR Mangalam Ghaziabad', url: '/neet-coaching-kr-mangalam-ghaziabad-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-sharda-greater-noida-students': {
    slug: 'neet-coaching-sharda-greater-noida-students',
    schoolName: 'Sharda University School',
    locality: 'Knowledge Park, Greater Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '18 km',
    metaTitle:
      'NEET Coaching for Sharda University School Greater Noida Students | Cerebrum Biology Academy',
    metaDescription:
      'Best NEET biology coaching for Sharda University School Greater Noida students. 18 km to Sector 62 Noida. AIIMS faculty, small batches, 19,000+ MCQs.',
    heroTitle: 'NEET Biology Coaching for Sharda University School Students',
    heroSubtitle:
      'Sharda University School Greater Noida students — Cerebrum Biology Academy is the top NEET biology coaching in the NCR. AIIMS faculty, small batches, structured preparation.',
    schoolHighlights: [
      'CBSE school within Sharda University campus, Greater Noida',
      'Academic exposure to university-level science environment',
      'Modern labs and research-oriented biology curriculum',
      'Medical aspirant support with competitive exam guidance',
      'Excellent infrastructure and faculty support',
    ],
    whyStudentsChoose: [
      {
        title: 'Best Biology Coaching NCR',
        description:
          'Cerebrum is the top NEET biology specialist in NCR with AIIMS faculty and proven 600+ scores.',
      },
      {
        title: 'Small Batches',
        description:
          'Max 15 students per batch for personal mentoring and focused doubt resolution.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Teachers from AIIMS and top medical colleges bring unmatched NEET exam insight.',
      },
      {
        title: 'Massive MCQ Practice',
        description:
          '19,000+ NEET MCQs ensure thorough preparation for every chapter and exam pattern.',
      },
    ],
    successStories: [
      {
        name: 'Swati Rao',
        batch: 'Sharda University School, Class of 2024',
        result: 'NEET Score: 638',
        quote:
          'Despite the distance from Greater Noida, Cerebrum was worth it. Faculty quality is exceptional.',
      },
      {
        name: 'Manish Kumar',
        batch: 'Sharda University School, Class of 2025',
        result: 'NEET Score: 612',
        quote:
          'The weekend batches at Cerebrum helped me prepare thoroughly without disrupting school schedule.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from Sharda University School Greater Noida?',
        answer:
          'Our Sector 62 Noida center is approximately 18 km from Sharda University School Knowledge Park, about 30-40 minutes via Yamuna Expressway.',
      },
      {
        question: 'Are weekend batches a good option for Greater Noida students?',
        answer:
          'Yes, many Greater Noida students prefer our Saturday and Sunday intensive batches to minimize weekday commute while maintaining preparation quality.',
      },
      {
        question: 'Is online coaching available for Greater Noida students?',
        answer:
          'Yes, we offer hybrid and online coaching options to supplement in-center classes, ideal for students from Greater Noida.',
      },
      {
        question: 'What is the fee structure for Greater Noida students?',
        answer:
          'Fee structure is the same for all students. Contact +91-99536-43938 for current details and EMI options.',
      },
      {
        question: 'How can Sharda University School students enroll?',
        answer:
          'Call or WhatsApp +91-99536-43938, visit our Sector 62 Noida center, or fill the online enrollment form on our website.',
      },
    ],
    relatedSchools: [
      { name: 'DPS Greater Noida', url: '/neet-coaching-dps-greater-noida-students' },
      { name: 'Jaypee Public School Noida', url: '/neet-coaching-jaypee-noida-students' },
      { name: 'Lotus Valley International', url: '/neet-coaching-lotus-valley-noida-students' },
      { name: 'DPS Indirapuram', url: '/neet-coaching-dps-indirapuram-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },

  'neet-coaching-dps-greater-noida-students': {
    slug: 'neet-coaching-dps-greater-noida-students',
    schoolName: 'DPS Greater Noida',
    locality: 'Sector 132, Greater Noida',
    nearestCenter: 'Cerebrum Biology Academy, Sector 62 Noida Center',
    distance: '10 km',
    metaTitle: 'NEET Coaching for DPS Greater Noida Students | Cerebrum Biology Academy',
    metaDescription:
      'Expert NEET biology coaching for DPS Greater Noida Sector 132 students. 10 km to Sector 62 Noida. AIIMS faculty, small batches, 19,000+ MCQ bank.',
    heroTitle: 'NEET Biology Coaching for DPS Greater Noida Students',
    heroSubtitle:
      'DPS Greater Noida Sector 132 students — Cerebrum Biology Academy at Sector 62 Noida is just 10 km away. Expert NEET biology coaching, AIIMS faculty, small batches.',
    schoolHighlights: [
      'Premier CBSE school in Greater Noida with excellent academics',
      'Strong science stream with modern labs and infrastructure',
      'Outstanding board exam results and national competition participation',
      'Comprehensive medical stream career guidance',
      'Active science clubs and Olympiad teams',
    ],
    whyStudentsChoose: [
      {
        title: 'Nearby NEET Specialist',
        description:
          'Cerebrum at Sector 62 is just 10 km from DPS Greater Noida — the best NEET biology coaching accessible from Sector 132.',
      },
      {
        title: 'Small Batches',
        description:
          'Max 15 students ensures every DPS Greater Noida student gets focused attention and mentoring.',
      },
      {
        title: 'AIIMS Faculty',
        description:
          'Our AIIMS-trained faculty brings the highest standard of biology teaching for NEET success.',
      },
      {
        title: 'MCQ Practice Bank',
        description:
          '19,000+ NEET MCQs for systematic daily practice and comprehensive exam preparation.',
      },
    ],
    successStories: [
      {
        name: 'Ananya Dubey',
        batch: 'DPS Greater Noida, Class of 2024',
        result: 'NEET Score: 653',
        quote:
          'Cerebrum faculty made biology my strongest subject. I scored 165/180 in biology in NEET.',
      },
      {
        name: 'Aryan Verma',
        batch: 'DPS Greater Noida, Class of 2025',
        result: 'NEET Score: 627',
        quote:
          'The 10 km drive to Cerebrum was a small price for the quality of teaching I received.',
      },
    ],
    faqs: [
      {
        question: 'How far is Cerebrum from DPS Greater Noida Sector 132?',
        answer:
          'Our Sector 62 Noida center is approximately 10 km from DPS Greater Noida Sector 132, about 20-25 minutes by car.',
      },
      {
        question: 'Are there batch options suited for DPS Greater Noida timings?',
        answer:
          'Yes, we have evening batches at 4:30 PM and 5:30 PM on weekdays and morning/afternoon batches on Saturday and Sunday.',
      },
      {
        question: 'Do you offer online sessions for students who cannot commute daily?',
        answer:
          'Yes, we offer hybrid coaching options combining in-center classes with online sessions for students who prefer flexibility.',
      },
      {
        question: 'Is there transport available from DPS Greater Noida to Cerebrum?',
        answer:
          'We do not arrange transport but many DPS Greater Noida students coordinate car pools. Our team can help connect you with other students from your area.',
      },
      {
        question: 'How do DPS Greater Noida students book a free demo?',
        answer:
          'Call or WhatsApp +91-99536-43938 to schedule a free demo class at our Sector 62 Noida center. No commitment required.',
      },
    ],
    relatedSchools: [
      { name: 'Sharda University School', url: '/neet-coaching-sharda-greater-noida-students' },
      { name: 'Jaypee Public School Noida', url: '/neet-coaching-jaypee-noida-students' },
      { name: 'Lotus Valley International', url: '/neet-coaching-lotus-valley-noida-students' },
      { name: 'DPS Noida', url: '/neet-coaching-dps-noida-students' },
    ],
    centerDetails: {
      name: 'Cerebrum Biology Academy, Sector 62 Noida Center',
      address: 'B-45, Sector 62, Noida, UP 201301',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM',
      phone: '+91-99536-43938',
    },
  },
}

export function getSchoolPageData(slug: string): SchoolPageData | undefined {
  return schoolPagesData[slug]
}
