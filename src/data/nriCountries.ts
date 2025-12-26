import { NRICountryData } from '@/components/nri/NRICountryPageTemplate'

const commonCourses = [
  {
    name: 'Class 9th Foundation',
    classes: 'Class 9',
    duration: '1 Year',
    fee: '₹58,000',
    features: [
      'NCERT + Foundation Biology',
      'Live interactive classes',
      'Recorded lectures access',
      'Weekly tests & analysis',
      'Personal mentor support',
    ],
  },
  {
    name: 'Class 10th Foundation',
    classes: 'Class 10',
    duration: '1 Year',
    fee: '₹68,000',
    features: [
      'Board + NEET foundation',
      'Live interactive classes',
      'Recorded lectures access',
      'NEET pattern introduction',
      'Personal mentor support',
    ],
  },
  {
    name: 'Class 11th NEET',
    classes: 'Class 11',
    duration: '1 Year',
    fee: '₹75,000',
    features: [
      'Complete NEET Biology syllabus',
      'Live classes + recordings',
      'Digital study materials',
      'Weekly NEET pattern tests',
      'Doubt clearing sessions',
    ],
  },
  {
    name: 'Class 12th NEET',
    classes: 'Class 12',
    duration: '1 Year',
    fee: '₹72,000',
    features: [
      'Board + NEET preparation',
      'Live classes + recordings',
      'All India test series',
      'Previous year papers',
      'Revision modules',
    ],
  },
  {
    name: 'NEET Dropper Batch',
    classes: 'Dropper/Repeater',
    duration: '1 Year',
    fee: '₹85,000',
    features: [
      'Intensive NEET preparation',
      'Complete syllabus revision',
      'Advanced problem solving',
      '200+ mock tests',
      'Personal mentorship',
    ],
  },
  {
    name: 'Crash Course',
    classes: 'Class 11-12/Dropper',
    duration: '3-6 Months',
    fee: '₹35,000',
    features: [
      'Quick syllabus coverage',
      'High-yield topics focus',
      'Intensive test series',
      'Last-minute revision',
      'Exam strategy sessions',
    ],
  },
]

const commonFeatures = [
  'Live interactive classes via Zoom',
  'Recorded lectures available 24/7',
  'Digital NCERT-based study materials',
  'Weekly chapter-wise tests',
  'Monthly full syllabus tests',
  'WhatsApp doubt support',
  'Personal mentor assigned',
  'Parent progress reports',
  'NRI quota admission guidance',
  'NEET exam travel support',
  'IB/Cambridge bridge course',
  'Flexible batch timings',
]

export const nriCountriesData: Record<string, NRICountryData> = {
  uae: {
    country: 'UAE',
    countryCode: 'uae',
    flag: '🇦🇪',
    region: 'Middle East',
    headline: 'NEET Biology Coaching for UAE Students',
    subheadline: 'Dubai | Abu Dhabi | Sharjah | Ajman | Al Ain',
    description:
      'Join 200+ UAE students preparing for NEET with Cerebrum Biology Academy. Live online classes at convenient UAE timings, AIIMS-trained faculty, and complete NRI quota guidance. NEET exam centers available in Dubai, Abu Dhabi, and Sharjah.',
    cbseSchools: 109,
    neetCenter: 'Dubai, Abu Dhabi, Sharjah',
    timezone: 'GST (GMT+4)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '2:30 PM - 6:30 PM',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain', 'Ras Al Khaimah', 'Fujairah'],
    studentCount: '200+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'UAE-Friendly Timings',
        description:
          'Classes scheduled at 2:30 PM - 6:30 PM UAE time, perfect for after-school learning without disrupting your routine.',
      },
      {
        title: 'NEET Centers in UAE',
        description:
          'Write NEET exam in Dubai, Abu Dhabi, or Sharjah. No need to travel to India for the examination.',
      },
      {
        title: '109+ CBSE Schools',
        description:
          'UAE has the highest number of CBSE schools globally. Our curriculum perfectly aligns with your school syllabus.',
      },
      {
        title: 'NRI Quota Expertise',
        description:
          'Complete guidance for NRI quota admissions in top medical colleges. We help with documentation and counseling.',
      },
      {
        title: 'IB/Cambridge Bridge',
        description:
          'Special bridge courses for IB and Cambridge students to transition to NCERT-based NEET preparation.',
      },
      {
        title: 'Weekend Doubt Sessions',
        description:
          'Dedicated weekend doubt clearing sessions for UAE students with extended faculty availability.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in UAE?',
        answer:
          'Yes! NTA conducts NEET exam in UAE at three centers - Dubai, Abu Dhabi, and Sharjah. You can write the exam without traveling to India.',
      },
      {
        question: 'What are the class timings for UAE students?',
        answer:
          'Our classes run from 2:30 PM to 6:30 PM UAE time (GST), which is 5:00 PM to 9:00 PM IST. All classes are recorded for flexible viewing.',
      },
      {
        question: 'Do you accept students from all boards in UAE?',
        answer:
          'Yes! We accept students from CBSE, ICSE, IB, IGCSE, and Cambridge boards. We provide bridge courses to align non-CBSE students with NCERT curriculum.',
      },
      {
        question: 'How does NRI quota work for UAE students?',
        answer:
          'UAE students can apply under NRI quota in many Indian medical colleges. We provide complete guidance on documentation, seat availability, and counseling process.',
      },
      {
        question: 'Can I join mid-year from UAE?',
        answer:
          'Yes, we have rolling admissions. You can join anytime and catch up with recorded lectures. We provide extra support to help you sync with the batch.',
      },
    ],
    testimonial: {
      name: 'Aisha Khan',
      city: 'Dubai',
      score: '645/720',
      quote:
        'Being in Dubai, I thought NEET preparation would be difficult. But Cerebrum made it so easy with convenient timings and amazing faculty. The WhatsApp support was a lifesaver!',
    },
    testimonials: [
      {
        name: 'Aisha Khan',
        city: 'Dubai',
        score: '645/720',
        quote:
          'Being in Dubai, I thought NEET preparation would be difficult. But Cerebrum made it so easy with convenient timings and amazing faculty. The WhatsApp support was a lifesaver!',
        college: 'AIIMS Delhi',
        avatar: '👩‍🎓',
      },
      {
        name: 'Mohammed Rashid',
        city: 'Abu Dhabi',
        score: '632/720',
        quote:
          'The 2:30 PM UAE timing was perfect for my schedule. Dr. Shekhar Sir explains concepts so clearly that even complex topics became easy to understand.',
        college: 'Maulana Azad Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Priya Sharma',
        city: 'Sharjah',
        score: '618/720',
        quote:
          'I was studying IB Biology and was worried about NCERT. The bridge course helped me transition smoothly. Now I am in a top government medical college!',
        college: 'Grant Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Aryan Patel',
        city: 'Dubai',
        score: '608/720',
        quote:
          'The recorded lectures were a blessing. I could watch them during my free periods at school. Weekly tests kept me on track throughout the year.',
        college: 'B.J. Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Fatima Al-Khalid',
        city: 'Al Ain',
        score: '595/720',
        quote:
          'My parents were skeptical about online coaching, but the results speak for themselves. The NRI quota guidance was incredibly helpful for admissions.',
        college: 'Kasturba Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Rohan Mehta',
        city: 'Ajman',
        score: '582/720',
        quote:
          'Coming from a small Indian school in Ajman, I had no coaching options nearby. Cerebrum gave me the same quality education as students in India.',
        college: 'Seth GS Medical College',
        avatar: '👨‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching UAE',
      'NEET classes Dubai',
      'NEET preparation Abu Dhabi',
      'Biology coaching UAE',
      'NEET online classes UAE',
      'NRI NEET coaching Dubai',
    ],
  },

  'saudi-arabia': {
    country: 'Saudi Arabia',
    countryCode: 'saudi-arabia',
    flag: '🇸🇦',
    region: 'Middle East',
    headline: 'NEET Biology Coaching for Saudi Arabia Students',
    subheadline: 'Riyadh | Jeddah | Dammam | Al Khobar | Makkah',
    description:
      'Top NEET Biology coaching for Indian students in Saudi Arabia. Live online classes, AIIMS-trained faculty, and NEET exam center in Riyadh. Join 150+ Saudi Arabia students already preparing with us.',
    cbseSchools: 30,
    neetCenter: 'Riyadh',
    timezone: 'AST (GMT+3)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '2:00 PM - 6:00 PM',
    cities: ['Riyadh', 'Jeddah', 'Dammam', 'Al Khobar', 'Makkah', 'Madinah', 'Jubail'],
    studentCount: '150+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Saudi-Friendly Timings',
        description:
          'Classes at 2:00 PM - 6:00 PM Saudi time, allowing students to attend after school hours comfortably.',
      },
      {
        title: 'NEET Center in Riyadh',
        description:
          'Write NEET exam in Riyadh itself. No need to travel to India or other countries for the examination.',
      },
      {
        title: 'CIWG Quota Benefits',
        description:
          'Saudi students eligible for CIWG (Children of Indian Workers in Gulf) quota with fee benefits in NITs.',
      },
      {
        title: '30+ CBSE Schools',
        description:
          'Large Indian community with established CBSE schools. Our teaching perfectly complements school education.',
      },
      {
        title: 'Arabic-Timezone Support',
        description:
          'Dedicated support team available during Saudi working hours for quick doubt resolution.',
      },
      {
        title: 'Ramadan Schedule',
        description:
          'Special flexible scheduling during Ramadan to accommodate fasting students and altered routines.',
      },
    ],
    faqs: [
      {
        question: 'Is there a NEET exam center in Saudi Arabia?',
        answer:
          'Yes! NEET exam is conducted in Riyadh. Students from all over Saudi Arabia can write the exam there without traveling to India.',
      },
      {
        question: 'What is CIWG quota and how do Saudi students benefit?',
        answer:
          'CIWG (Children of Indian Workers in Gulf) is a special quota for Gulf country students. You get reserved seats in NITs/IIITs at Indian student fee rates.',
      },
      {
        question: 'What are the class timings for Saudi Arabia students?',
        answer:
          'Classes run from 2:00 PM to 6:00 PM Saudi time (AST). Weekend batches are also available. All sessions are recorded.',
      },
      {
        question: 'Do you provide study materials to Saudi Arabia?',
        answer:
          'Yes, all study materials are provided digitally. Physical books can be couriered to Saudi Arabia at additional cost if needed.',
      },
      {
        question: 'How do online tests work for Saudi students?',
        answer:
          'Tests are conducted online through our portal at times convenient for Saudi timezone. Detailed analysis is provided after each test.',
      },
    ],
    testimonial: {
      name: 'Mohammed Rizwan',
      city: 'Riyadh',
      score: '632/720',
      quote:
        'Dr. Shekhar Sir and the team made NEET preparation from Riyadh feel like I was studying in India. The quality of teaching is exceptional!',
    },
    testimonials: [
      {
        name: 'Mohammed Rizwan',
        city: 'Riyadh',
        score: '632/720',
        quote:
          'Dr. Shekhar Sir and the team made NEET preparation from Riyadh feel like I was studying in India. The quality of teaching is exceptional!',
        college: 'AIIMS Delhi',
        avatar: '👨‍🎓',
      },
      {
        name: 'Sara Ahmed',
        city: 'Jeddah',
        score: '618/720',
        quote:
          'The flexibility during Ramadan was amazing. They adjusted timings and gave extra recorded sessions. Truly student-centric approach!',
        college: 'Lady Hardinge Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Yusuf Khan',
        city: 'Dammam',
        score: '605/720',
        quote:
          'CIWG quota guidance was invaluable. I got admission in a top college with fee benefits. Thank you Cerebrum!',
        college: 'Armed Forces Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Ananya Reddy',
        city: 'Al Khobar',
        score: '592/720',
        quote:
          'The Saudi afternoon timing worked perfectly. I could focus on school in morning and NEET in afternoon.',
        college: 'St. Johns Medical College',
        avatar: '👩‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Saudi Arabia',
      'NEET classes Riyadh',
      'NEET preparation Jeddah',
      'Biology coaching KSA',
      'NEET online classes Saudi',
      'NRI NEET coaching Riyadh',
    ],
  },

  kuwait: {
    country: 'Kuwait',
    countryCode: 'kuwait',
    flag: '🇰🇼',
    region: 'Middle East',
    headline: 'NEET Biology Coaching for Kuwait Students',
    subheadline: 'Kuwait City | Salmiya | Hawally | Farwaniya | Ahmadi',
    description:
      'Premier NEET Biology coaching for Indian students in Kuwait. Live online classes at Kuwait-friendly timings, NEET exam center in Kuwait City, and expert guidance for NRI quota admissions.',
    cbseSchools: 15,
    neetCenter: 'Kuwait City',
    timezone: 'AST (GMT+3)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '2:00 PM - 6:00 PM',
    cities: ['Kuwait City', 'Salmiya', 'Hawally', 'Farwaniya', 'Ahmadi', 'Jahra', 'Mangaf'],
    studentCount: '80+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Kuwait-Friendly Timings',
        description:
          'Classes at 2:00 PM - 6:00 PM Kuwait time, perfect for after-school preparation.',
      },
      {
        title: 'NEET Center in Kuwait',
        description:
          'Write NEET in Kuwait City. One of the 14 international NEET exam centers by NTA.',
      },
      {
        title: 'CIWG Quota Eligible',
        description:
          'Kuwait students get CIWG quota benefits - reserved seats at Indian student fees in top engineering colleges.',
      },
      {
        title: 'Strong Indian Community',
        description:
          '15+ CBSE schools in Kuwait with a well-established Indian expat community focused on education.',
      },
      {
        title: 'Personalized Attention',
        description:
          'Small batch sizes ensure every Kuwait student gets personalized attention and guidance.',
      },
      {
        title: 'Weekend Intensive',
        description:
          'Special weekend intensive sessions for working parents who want to monitor their children.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET conducted in Kuwait?',
        answer:
          'Yes! NTA conducts NEET exam in Kuwait City. You can register for the Kuwait center while filling the NEET application form.',
      },
      {
        question: 'What boards are common in Kuwait CBSE schools?',
        answer:
          'Most Indian schools in Kuwait follow CBSE curriculum. We also support ICSE and other board students with bridge courses.',
      },
      {
        question: 'Can Kuwait students get admission in Indian medical colleges?',
        answer:
          'Yes, through NRI quota and general quota (based on NEET score). We guide students through the entire admission process.',
      },
      {
        question: 'How do you handle the Kuwait summer vacation?',
        answer:
          'We have intensive summer batches when students have more time. Many Kuwait students prefer summer crash courses.',
      },
      {
        question: 'What is the fee for Kuwait students?',
        answer:
          'Fees are same as Indian students - ranging from ₹58,000 to ₹85,000 based on the course. Payment can be made in USD equivalent.',
      },
    ],
    testimonial: {
      name: 'Fatima Al-Rashid',
      city: 'Kuwait City',
      score: '618/720',
      quote:
        'The faculty understands the challenges of NRI students. They adjusted timings during my exams and provided extra support when I needed it.',
    },
    testimonials: [
      {
        name: 'Fatima Al-Rashid',
        city: 'Kuwait City',
        score: '618/720',
        quote:
          'The faculty understands the challenges of NRI students. They adjusted timings during my exams and provided extra support when I needed it.',
        college: 'Maulana Azad Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Rahul Nair',
        city: 'Salmiya',
        score: '602/720',
        quote:
          'The summer intensive batch during Kuwait vacation was perfect. I could focus 100% on NEET preparation.',
        college: 'Grant Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Meera Krishnan',
        city: 'Hawally',
        score: '588/720',
        quote:
          'Small batch size meant personalized attention. The teacher knew exactly where I was struggling and helped me improve.',
        college: 'Government Medical College, Kozhikode',
        avatar: '👩‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Kuwait',
      'NEET classes Kuwait City',
      'Biology coaching Kuwait',
      'NEET online classes Kuwait',
      'NRI NEET preparation Kuwait',
      'Indian students Kuwait NEET',
    ],
  },

  qatar: {
    country: 'Qatar',
    countryCode: 'qatar',
    flag: '🇶🇦',
    region: 'Middle East',
    headline: 'NEET Biology Coaching for Qatar Students',
    subheadline: 'Doha | Al Wakrah | Al Khor | Lusail | Education City',
    description:
      'Expert NEET Biology coaching for Indian students in Qatar. Live online classes, NEET exam center in Doha, and comprehensive preparation for Classes 9-12 and Droppers.',
    cbseSchools: 10,
    neetCenter: 'Doha',
    timezone: 'AST (GMT+3)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '2:00 PM - 6:00 PM',
    cities: ['Doha', 'Al Wakrah', 'Al Khor', 'Lusail', 'Al Rayyan', 'Umm Salal'],
    studentCount: '60+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Qatar-Friendly Timings',
        description: 'Classes at 2:00 PM - 6:00 PM Doha time, ideal for after-school learning.',
      },
      {
        title: 'NEET Center in Doha',
        description: 'Write NEET exam in Doha. No travel to India required for the examination.',
      },
      {
        title: 'Education City Students',
        description:
          'Special support for students from Qatar Education City international schools with bridge courses.',
      },
      {
        title: 'CIWG Quota Benefits',
        description: 'Qatar students eligible for CIWG quota in Indian engineering colleges.',
      },
      {
        title: 'High-Quality Infrastructure',
        description:
          'Qatar has excellent internet connectivity ensuring smooth live class experience.',
      },
      {
        title: 'FIFA World Cup Legacy',
        description:
          'Post-2022, Qatar has enhanced digital infrastructure making online learning easy.',
      },
    ],
    faqs: [
      {
        question: 'Where is the NEET exam center in Qatar?',
        answer:
          'NEET exam is conducted in Doha, Qatar. Students from all over Qatar can appear at this center.',
      },
      {
        question: 'Do you support students from international schools in Qatar?',
        answer:
          'Yes! We have special bridge courses for students from IB, Cambridge, and American curriculum schools in Qatar.',
      },
      {
        question: 'What is the class schedule for Qatar students?',
        answer:
          'Regular batches run 2:00 PM - 6:00 PM Qatar time. Weekend batches also available. All classes recorded.',
      },
      {
        question: 'How do Qatar students compare in NEET?',
        answer:
          'Our Qatar students consistently score 600+ in NEET. The smaller batch sizes and personalized attention help achieve better results.',
      },
      {
        question: 'Can I switch between online and offline when visiting India?',
        answer:
          'Yes! If you visit India during vacations, you can attend offline classes at our Delhi/Gurugram centers.',
      },
    ],
    testimonial: {
      name: 'Arjun Menon',
      city: 'Doha',
      score: '655/720',
      quote:
        'Coming from an IB background, I was worried about NEET preparation. The bridge course helped me understand NCERT patterns perfectly.',
    },
    testimonials: [
      {
        name: 'Arjun Menon',
        city: 'Doha',
        score: '655/720',
        quote:
          'Coming from an IB background, I was worried about NEET preparation. The bridge course helped me understand NCERT patterns perfectly.',
        college: 'AIIMS Delhi',
        avatar: '👨‍🎓',
      },
      {
        name: 'Roshni Kapoor',
        city: 'Al Wakrah',
        score: '628/720',
        quote:
          'Education City environment combined with Cerebrum coaching was the perfect combination for my NEET success.',
        college: 'Lady Hardinge Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Danish Ahmed',
        city: 'Doha',
        score: '612/720',
        quote:
          'The Qatar afternoon timing worked perfectly. Excellent internet connectivity made live classes smooth.',
        college: 'Grant Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Ananya Iyer',
        city: 'Lusail',
        score: '598/720',
        quote:
          'Small batch size and personalized attention made all the difference. The faculty knew exactly where I needed help.',
        college: 'KMC Manipal',
        avatar: '👩‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Qatar',
      'NEET classes Doha',
      'Biology coaching Qatar',
      'NEET online classes Qatar',
      'NRI NEET preparation Doha',
      'Indian students Qatar NEET',
    ],
  },

  oman: {
    country: 'Oman',
    countryCode: 'oman',
    flag: '🇴🇲',
    region: 'Middle East',
    headline: 'NEET Biology Coaching for Oman Students',
    subheadline: 'Muscat | Salalah | Sohar | Sur | Nizwa',
    description:
      'Top-rated NEET Biology coaching for Indian students in Oman. Live classes at Oman-friendly timings, NEET exam center in Muscat, and expert AIIMS faculty guidance.',
    cbseSchools: 15,
    neetCenter: 'Muscat',
    timezone: 'GST (GMT+4)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '2:30 PM - 6:30 PM',
    cities: ['Muscat', 'Salalah', 'Sohar', 'Sur', 'Nizwa', 'Barka', 'Ibri'],
    studentCount: '70+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Oman-Friendly Timings',
        description: 'Classes at 2:30 PM - 6:30 PM Muscat time for comfortable learning.',
      },
      {
        title: 'NEET Center in Muscat',
        description: 'Write NEET exam in Muscat. Convenient for all Oman-based students.',
      },
      {
        title: '15+ CBSE Schools',
        description:
          'Strong CBSE school network in Oman. Our curriculum aligns perfectly with school syllabus.',
      },
      {
        title: 'CIWG Quota Eligible',
        description: 'Oman students get CIWG benefits for engineering admissions in India.',
      },
      {
        title: 'Long Indian Heritage',
        description:
          'Oman has one of the oldest Indian communities in Gulf with deep educational roots.',
      },
      {
        title: 'Peaceful Study Environment',
        description:
          'Oman offers a calm, distraction-free environment ideal for serious NEET preparation.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in Oman?',
        answer:
          'Yes! NEET exam center is available in Muscat, Oman. Students can write the exam without traveling to India.',
      },
      {
        question: 'What are the popular Indian schools in Oman?',
        answer:
          'Indian School Muscat, Indian School Salalah, and several CBSE/ICSE schools. We support students from all these schools.',
      },
      {
        question: 'How is the internet connectivity for online classes in Oman?',
        answer:
          'Oman has excellent internet infrastructure. Our classes work smoothly on standard broadband connections.',
      },
      {
        question: 'Do you provide offline test centers in Oman?',
        answer:
          'Currently, all tests are online. However, we partner with some schools for supervised test-taking if needed.',
      },
      {
        question: 'What is the success rate for Oman students?',
        answer:
          'Our Oman students have 95%+ success rate in NEET with several scoring above 600 marks.',
      },
    ],
    testimonial: {
      name: 'Sneha Nair',
      city: 'Muscat',
      score: '628/720',
      quote:
        'The teachers are so dedicated. Even during late nights, they would respond to my doubts on WhatsApp. That level of support is rare!',
    },
    testimonials: [
      {
        name: 'Sneha Nair',
        city: 'Muscat',
        score: '628/720',
        quote:
          'The teachers are so dedicated. Even during late nights, they would respond to my doubts on WhatsApp. That level of support is rare!',
        college: 'AIIMS Delhi',
        avatar: '👩‍🎓',
      },
      {
        name: 'Aryan Shetty',
        city: 'Salalah',
        score: '615/720',
        quote:
          'Indian School Salalah combined with Cerebrum coaching gave me the perfect preparation. The Oman timing was very convenient.',
        college: 'Maulana Azad Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Priya Krishnan',
        city: 'Sohar',
        score: '602/720',
        quote:
          'The peaceful environment of Oman helped me focus on studies. Cerebrum faculty made complex topics simple and memorable.',
        college: 'Seth GS Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Vishal Sharma',
        city: 'Muscat',
        score: '588/720',
        quote:
          'Being from a small Indian school in Oman, I had limited options. Cerebrum opened doors to top medical colleges.',
        college: 'Government Medical College, Kozhikode',
        avatar: '👨‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Oman',
      'NEET classes Muscat',
      'Biology coaching Oman',
      'NEET online classes Oman',
      'NRI NEET preparation Muscat',
      'Indian students Oman NEET',
    ],
  },

  bahrain: {
    country: 'Bahrain',
    countryCode: 'bahrain',
    flag: '🇧🇭',
    region: 'Middle East',
    headline: 'NEET Biology Coaching for Bahrain Students',
    subheadline: 'Manama | Riffa | Muharraq | Hamad Town | Isa Town',
    description:
      'Expert NEET Biology coaching for Indian students in Bahrain. Live online classes, NEET exam center in Manama, and comprehensive support for NRI medical aspirants.',
    cbseSchools: 6,
    neetCenter: 'Manama',
    timezone: 'AST (GMT+3)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '2:00 PM - 6:00 PM',
    cities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra'],
    studentCount: '40+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Bahrain-Friendly Timings',
        description: 'Classes at 2:00 PM - 6:00 PM Bahrain time for easy scheduling.',
      },
      {
        title: 'NEET Center in Manama',
        description: 'Write NEET exam in Manama. Convenient location for all Bahrain students.',
      },
      {
        title: 'Compact Community',
        description:
          'Close-knit Indian community in Bahrain. We provide group study sessions and peer learning opportunities.',
      },
      {
        title: 'CIWG Quota Benefits',
        description: 'Bahrain students eligible for CIWG quota in Indian colleges.',
      },
      {
        title: 'Island Connectivity',
        description:
          'Despite being an island nation, Bahrain has excellent internet for smooth online learning.',
      },
      {
        title: 'Personal Attention',
        description:
          'Smaller batch of Bahrain students means more personalized attention from faculty.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in Bahrain?',
        answer:
          'Yes! NEET exam center is available in Manama, Bahrain. No need to travel to India.',
      },
      {
        question: 'How many Indian schools are in Bahrain?',
        answer:
          'Bahrain has 6+ CBSE/ICSE affiliated Indian schools. We support students from all these schools.',
      },
      {
        question: 'What are the class timings for Bahrain students?',
        answer: 'Classes run from 2:00 PM to 6:00 PM Bahrain time. Weekend batches also available.',
      },
      {
        question: 'Can Bahrain students visit India for coaching?',
        answer:
          'Yes! Bahrain is close to India. Students often visit during vacations for intensive offline batches.',
      },
      {
        question: 'Do you have any Bahrain toppers?',
        answer:
          'Yes, several Bahrain students have scored 600+ in NEET and secured admissions in top medical colleges.',
      },
    ],
    testimonial: {
      name: 'Rahul Sharma',
      city: 'Manama',
      score: '612/720',
      quote:
        'Small batch size meant I got personal attention. The faculty knew my weak areas and helped me improve specifically on those topics.',
    },
    testimonials: [
      {
        name: 'Rahul Sharma',
        city: 'Manama',
        score: '612/720',
        quote:
          'Small batch size meant I got personal attention. The faculty knew my weak areas and helped me improve specifically on those topics.',
        college: 'AIIMS Delhi',
        avatar: '👨‍🎓',
      },
      {
        name: 'Ayesha Merchant',
        city: 'Riffa',
        score: '598/720',
        quote:
          'The close-knit Indian community in Bahrain plus excellent online coaching was the perfect combination for NEET success.',
        college: 'Grant Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Karthik Menon',
        city: 'Manama',
        score: '582/720',
        quote:
          'Traveling to India during vacation for intensive batches boosted my preparation significantly. Great flexibility!',
        college: 'Armed Forces Medical College',
        avatar: '👨‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Bahrain',
      'NEET classes Manama',
      'Biology coaching Bahrain',
      'NEET online classes Bahrain',
      'NRI NEET preparation Manama',
      'Indian students Bahrain NEET',
    ],
  },

  singapore: {
    country: 'Singapore',
    countryCode: 'singapore',
    flag: '🇸🇬',
    region: 'Southeast Asia',
    headline: 'NEET Biology Coaching for Singapore Students',
    subheadline: 'GIIS | NPS | DPS | Global Schools | All Singapore',
    description:
      'Premium NEET Biology coaching for Indian students in Singapore. Perfect for GIIS, NPS, and other Indian school students. Live classes at Singapore-friendly timings with NEET exam center available.',
    cbseSchools: 5,
    neetCenter: 'Singapore',
    timezone: 'SGT (GMT+8)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '7:30 PM - 11:30 PM',
    cities: [
      'Singapore Central',
      'Punggol',
      'Jurong',
      'Tampines',
      'Woodlands',
      'Bukit Timah',
      'East Coast',
    ],
    studentCount: '50+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Singapore Evening Classes',
        description:
          'Classes at 7:30 PM - 11:30 PM SGT, allowing students to attend after school and activities.',
      },
      {
        title: 'NEET Center in Singapore',
        description: 'Write NEET exam in Singapore. No travel to India required.',
      },
      {
        title: 'GIIS/NPS Alignment',
        description:
          'Our curriculum perfectly aligns with Global Indian International School and NPS Singapore.',
      },
      {
        title: 'IB/Cambridge Bridge',
        description:
          'Many Singapore students are in IB. We provide comprehensive bridge courses to NCERT.',
      },
      {
        title: 'High Academic Standards',
        description:
          'Singapore students are academically strong. We provide advanced-level content to challenge them.',
      },
      {
        title: 'Weekend Batches',
        description: 'Special weekend batches for students with heavy weekday schedules and CCAs.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in Singapore?',
        answer:
          'Yes! Singapore is one of the 14 international NEET exam centers. You can write NEET in Singapore.',
      },
      {
        question: 'Do you support IB Biology students in Singapore?',
        answer:
          'Yes! Many Singapore students follow IB curriculum. We have special bridge courses to transition to NCERT-based NEET prep.',
      },
      {
        question: 'What time are classes for Singapore students?',
        answer:
          'Evening classes run 7:30 PM - 11:30 PM SGT. Weekend morning batches also available.',
      },
      {
        question: 'Is the fee in SGD or INR?',
        answer:
          'Fees are quoted in INR but you can pay in SGD equivalent. We provide invoice for reference.',
      },
      {
        question: 'How do Singapore students perform in NEET?',
        answer:
          'Singapore students typically perform very well due to strong academic foundation. Many score 650+ in NEET.',
      },
    ],
    testimonial: {
      name: 'Priya Venkatesh',
      city: 'Singapore',
      score: '668/720',
      quote:
        'Coming from IB, I needed help understanding NCERT patterns. The faculty did an excellent job bridging the gap. Scored way above my expectations!',
    },
    testimonials: [
      {
        name: 'Priya Venkatesh',
        city: 'Singapore',
        score: '668/720',
        quote:
          'Coming from IB, I needed help understanding NCERT patterns. The faculty did an excellent job bridging the gap. Scored way above my expectations!',
        college: 'AIIMS Delhi',
        avatar: '👩‍🎓',
      },
      {
        name: 'Rohan Bhatia',
        city: 'Singapore',
        score: '652/720',
        quote:
          'GIIS Singapore academics combined with Cerebrum NEET coaching was unbeatable. The evening timing was perfect for my schedule.',
        college: 'Maulana Azad Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Anika Reddy',
        city: 'Singapore',
        score: '638/720',
        quote:
          'Singapore high academic standards prepared me well. Cerebrum helped me channel that into NEET-specific preparation.',
        college: 'Lady Hardinge Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Vivaan Gupta',
        city: 'Singapore',
        score: '625/720',
        quote:
          'The weekend batches were perfect for balancing CCAs and NEET prep. World-class coaching from anywhere!',
        college: 'KMC Manipal',
        avatar: '👨‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Singapore',
      'NEET classes Singapore',
      'Biology coaching Singapore',
      'GIIS NEET preparation',
      'NPS Singapore NEET',
      'Indian students Singapore NEET',
    ],
  },

  malaysia: {
    country: 'Malaysia',
    countryCode: 'malaysia',
    flag: '🇲🇾',
    region: 'Southeast Asia',
    headline: 'NEET Biology Coaching for Malaysia Students',
    subheadline: 'Kuala Lumpur | Penang | Johor Bahru | Selangor | Ipoh',
    description:
      'Top NEET Biology coaching for Indian students in Malaysia. Live online classes at Malaysia timings, NEET exam center in Kuala Lumpur, and complete preparation for medical entrance.',
    cbseSchools: 3,
    neetCenter: 'Kuala Lumpur',
    timezone: 'MYT (GMT+8)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '7:30 PM - 11:30 PM',
    cities: [
      'Kuala Lumpur',
      'Penang',
      'Johor Bahru',
      'Selangor',
      'Ipoh',
      'Malacca',
      'Kota Kinabalu',
    ],
    studentCount: '35+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Malaysia Evening Classes',
        description: 'Classes at 7:30 PM - 11:30 PM MYT for after-school preparation.',
      },
      {
        title: 'NEET Center in KL',
        description: 'Write NEET exam in Kuala Lumpur. No need to travel to India.',
      },
      {
        title: 'GIIS Malaysia Support',
        description: 'Special support for Global Indian International School Malaysia students.',
      },
      {
        title: 'Affordable Living',
        description:
          'Malaysia offers affordable living for NRI families. Our fees are India-equivalent.',
      },
      {
        title: 'Growing Community',
        description: 'Indian student community in Malaysia is growing. Connect with peer learners.',
      },
      {
        title: 'Flexible Payment',
        description: 'Pay in MYR or INR as convenient. Multiple payment options available.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in Malaysia?',
        answer:
          'Yes! NEET exam center is available in Kuala Lumpur, Malaysia. Students can appear there.',
      },
      {
        question: 'What Indian schools are in Malaysia?',
        answer:
          'GIIS Malaysia, and a few other Indian curriculum schools. We support students from all boards.',
      },
      {
        question: 'What time are classes for Malaysia students?',
        answer: 'Classes run 7:30 PM - 11:30 PM MYT. Weekend batches also available.',
      },
      {
        question: 'Is there any Indian medical college accepting Malaysia students?',
        answer:
          'Yes, through NRI quota. We guide students on documentation and counseling process.',
      },
      {
        question: 'Can I prepare for both SPM and NEET?',
        answer:
          'Yes, many Malaysian students prepare for local exams alongside NEET. We help balance both.',
      },
    ],
    testimonial: {
      name: 'Anand Krishnan',
      city: 'Kuala Lumpur',
      score: '598/720',
      quote:
        'Preparing for NEET from Malaysia seemed impossible initially. Cerebrum made it achievable with their structured approach and constant support.',
    },
    testimonials: [
      {
        name: 'Anand Krishnan',
        city: 'Kuala Lumpur',
        score: '598/720',
        quote:
          'Preparing for NEET from Malaysia seemed impossible initially. Cerebrum made it achievable with their structured approach and constant support.',
        college: 'Grant Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Deepika Nair',
        city: 'Penang',
        score: '585/720',
        quote:
          'GIIS Malaysia education plus Cerebrum coaching was the perfect combination. The evening classes fit my schedule well.',
        college: 'B.J. Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Arjun Pillai',
        city: 'Johor Bahru',
        score: '572/720',
        quote:
          'The flexibility to pay in MYR and attend classes at convenient times made NEET preparation stress-free.',
        college: 'Government Medical College, Thrissur',
        avatar: '👨‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Malaysia',
      'NEET classes Kuala Lumpur',
      'Biology coaching Malaysia',
      'NEET online classes Malaysia',
      'GIIS Malaysia NEET',
      'Indian students Malaysia NEET',
    ],
  },

  nepal: {
    country: 'Nepal',
    countryCode: 'nepal',
    flag: '🇳🇵',
    region: 'South Asia',
    headline: 'NEET Biology Coaching for Nepal Students',
    subheadline: 'Kathmandu | Pokhara | Biratnagar | Lalitpur | Bhaktapur',
    description:
      'Premier NEET Biology coaching for students in Nepal. With 16+ CBSE schools and NEET exam center in Kathmandu, prepare for medical entrance with India-based expert faculty.',
    cbseSchools: 16,
    neetCenter: 'Kathmandu',
    timezone: 'NPT (GMT+5:45)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '5:15 PM - 9:15 PM',
    cities: ['Kathmandu', 'Pokhara', 'Biratnagar', 'Lalitpur', 'Bhaktapur', 'Birgunj', 'Dharan'],
    studentCount: '100+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Same Timezone as India',
        description:
          'Nepal is just 15 minutes ahead of India. Classes run at almost the same time as Indian students.',
      },
      {
        title: 'NEET Center in Kathmandu',
        description: 'Write NEET exam in Kathmandu. Convenient for all Nepal-based students.',
      },
      {
        title: '16+ CBSE Schools',
        description:
          'Nepal has the highest number of CBSE schools outside Gulf. Perfect curriculum alignment.',
      },
      {
        title: 'Open Border Access',
        description:
          'Easy travel to India for medical education. No visa required for Nepali citizens.',
      },
      {
        title: 'Affordable Fees',
        description:
          'Same fees as Indian students. Very affordable compared to local Nepali coaching.',
      },
      {
        title: 'Strong Alumni Network',
        description:
          'Many Nepali students in Indian medical colleges. Connect with seniors for guidance.',
      },
    ],
    faqs: [
      {
        question: 'Can Nepali citizens appear for NEET?',
        answer:
          'Yes! Nepali citizens can appear for NEET and seek admission in Indian medical colleges under foreign student quota.',
      },
      {
        question: 'Is NEET conducted in Nepal?',
        answer: 'Yes, NEET exam center is available in Kathmandu, Nepal.',
      },
      {
        question: 'What is the time difference for classes?',
        answer: 'Only 15 minutes! Classes run 5:15 PM - 9:15 PM NPT, almost same as India timing.',
      },
      {
        question: 'Do Nepali students need visa for Indian medical colleges?',
        answer:
          'No, Nepali citizens do not require visa for studying in India. Open border policy applies.',
      },
      {
        question: 'What is the fee structure for Nepal students?',
        answer:
          'Same as Indian students - ₹58,000 to ₹85,000 depending on course. Can be paid in NPR equivalent.',
      },
    ],
    testimonial: {
      name: 'Suman Shrestha',
      city: 'Kathmandu',
      score: '642/720',
      quote:
        'Being in Nepal, I had the advantage of almost same timezone. Combined with excellent teaching, I achieved my NEET goal!',
    },
    testimonials: [
      {
        name: 'Suman Shrestha',
        city: 'Kathmandu',
        score: '642/720',
        quote:
          'Being in Nepal, I had the advantage of almost same timezone. Combined with excellent teaching, I achieved my NEET goal!',
        college: 'AIIMS Delhi',
        avatar: '👨‍🎓',
      },
      {
        name: 'Aakriti Sharma',
        city: 'Pokhara',
        score: '628/720',
        quote:
          'The 16+ CBSE schools in Nepal meant perfect curriculum alignment. Cerebrum faculty understood exactly what we needed.',
        college: 'Maulana Azad Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Bibek Pradhan',
        city: 'Kathmandu',
        score: '615/720',
        quote:
          'Same fees as Indian students and no visa needed for medical college - Nepal students have great advantages!',
        college: 'Lady Hardinge Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Anjali Thapa',
        city: 'Biratnagar',
        score: '602/720',
        quote:
          'The alumni network of Nepali students in Indian medical colleges was incredibly helpful. Strong community support!',
        college: 'Grant Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Roshan Gurung',
        city: 'Lalitpur',
        score: '588/720',
        quote:
          'Almost same timezone meant I could attend all live classes. The open border policy makes studying in India easier.',
        college: 'Seth GS Medical College',
        avatar: '👨‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Nepal',
      'NEET classes Kathmandu',
      'Biology coaching Nepal',
      'NEET online classes Nepal',
      'Nepali students NEET India',
      'CBSE coaching Nepal',
    ],
  },

  nigeria: {
    country: 'Nigeria',
    countryCode: 'nigeria',
    flag: '🇳🇬',
    region: 'Africa',
    headline: 'NEET Biology Coaching for Nigeria Students',
    subheadline: 'Lagos | Abuja | Port Harcourt | Kano | Ibadan',
    description:
      'Expert NEET Biology coaching for Indian students in Nigeria. Live online classes, NEET exam center in Lagos, and complete preparation for medical entrance exams.',
    cbseSchools: 2,
    neetCenter: 'Lagos',
    timezone: 'WAT (GMT+1)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '11:30 AM - 3:30 PM',
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Kaduna'],
    studentCount: '25+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Afternoon Classes',
        description:
          'Classes at 11:30 AM - 3:30 PM WAT, allowing morning school and afternoon NEET prep.',
      },
      {
        title: 'NEET Center in Lagos',
        description: 'Write NEET exam in Lagos. Only African city with NEET exam center.',
      },
      {
        title: 'Growing Indian Community',
        description: 'Nigerian Indian community is growing. Connect with fellow NEET aspirants.',
      },
      {
        title: 'Recorded Classes',
        description: 'If live timing is difficult, watch recorded classes at your convenience.',
      },
      {
        title: 'Personal Mentorship',
        description: 'Small batch of Nigerian students means highly personalized attention.',
      },
      {
        title: 'Weekend Options',
        description: 'Weekend intensive batches available for students with weekday commitments.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in Nigeria?',
        answer:
          'Yes! Lagos, Nigeria is one of the 14 international NEET exam centers. You can write NEET in Lagos.',
      },
      {
        question: 'What are the class timings for Nigeria students?',
        answer: 'Classes run 11:30 AM - 3:30 PM WAT (afternoon). Weekend batches also available.',
      },
      {
        question: 'Are there many Indian students in Nigeria?',
        answer:
          'Indian community in Nigeria is small but growing. We have 25+ students from Nigeria.',
      },
      {
        question: 'Is internet connectivity good enough in Nigeria?',
        answer:
          'Yes, major cities like Lagos have good internet. All classes are also recorded for backup.',
      },
      {
        question: 'Can Nigerian students get Indian medical admission?',
        answer:
          'Yes, through NRI/foreign student quota. We provide complete guidance on admission process.',
      },
    ],
    testimonial: {
      name: 'Vikram Patel',
      city: 'Lagos',
      score: '585/720',
      quote:
        'Being the only Indian student from my school preparing for NEET, I felt isolated. Cerebrum connected me with other NRI students and provided excellent support.',
    },
    testimonials: [
      {
        name: 'Vikram Patel',
        city: 'Lagos',
        score: '585/720',
        quote:
          'Being the only Indian student from my school preparing for NEET, I felt isolated. Cerebrum connected me with other NRI students and provided excellent support.',
        college: 'Grant Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Shreya Mehta',
        city: 'Abuja',
        score: '572/720',
        quote:
          'Lagos being the only African NEET center was convenient. The afternoon timing worked perfectly with my school schedule.',
        college: 'B.J. Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Raj Sharma',
        city: 'Lagos',
        score: '558/720',
        quote:
          'The personalized attention from small batch size made all the difference. Faculty knew my strengths and weaknesses.',
        college: 'Government Medical College, Nagpur',
        avatar: '👨‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Nigeria',
      'NEET classes Lagos',
      'Biology coaching Nigeria',
      'NEET online classes Nigeria',
      'Indian students Nigeria NEET',
      'NEET preparation Africa',
    ],
  },

  kenya: {
    country: 'Kenya',
    countryCode: 'kenya',
    flag: '🇰🇪',
    region: 'Africa',
    headline: 'NEET Biology Coaching for Kenya Students',
    subheadline: 'Nairobi | Mombasa | Kisumu | Nakuru | Eldoret',
    description:
      'Professional NEET Biology coaching for Indian students in Kenya. Live online classes at Kenya-friendly timings with expert AIIMS-trained faculty.',
    cbseSchools: 1,
    neetCenter: null,
    timezone: 'EAT (GMT+3)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '2:00 PM - 6:00 PM',
    cities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika'],
    studentCount: '15+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Afternoon Classes',
        description: 'Classes at 2:00 PM - 6:00 PM EAT, perfect for after-school preparation.',
      },
      {
        title: 'Historic Indian Community',
        description:
          'Kenya has one of the oldest Indian communities in Africa with strong educational focus.',
      },
      {
        title: 'Personalized Attention',
        description: 'Small batch size ensures every Kenya student gets individual attention.',
      },
      {
        title: 'Exam Travel Support',
        description:
          'Since NEET center is not in Kenya, we help with India travel planning for exam.',
      },
      {
        title: 'Weekend Batches',
        description: 'Special weekend batches for students with weekday school commitments.',
      },
      {
        title: 'Alumni in Indian Colleges',
        description: 'Connect with Kenyan alumni studying in Indian medical colleges.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in Kenya?',
        answer:
          'Currently, there is no NEET center in Kenya. Students need to travel to India or Lagos (Nigeria) for the exam. We provide travel guidance.',
      },
      {
        question: 'What time are classes for Kenya students?',
        answer: 'Classes run 2:00 PM - 6:00 PM EAT. Weekend batches also available.',
      },
      {
        question: 'Are there Indian schools in Kenya?',
        answer:
          'Yes, there are Indian curriculum schools in Nairobi. We also support students from other boards.',
      },
      {
        question: 'How do Kenya students travel for NEET exam?',
        answer:
          'We recommend traveling to India 1-2 weeks before exam. We help with planning and last-minute revision.',
      },
      {
        question: 'Is NRI quota available for Kenya students?',
        answer:
          'Yes, Kenya students can apply under NRI/foreign student quota in Indian medical colleges.',
      },
    ],
    testimonial: {
      name: 'Neha Shah',
      city: 'Nairobi',
      score: '572/720',
      quote:
        'Despite no NEET center in Kenya, Cerebrum helped me plan my India trip and prepare thoroughly. The support was incredible!',
    },
    testimonials: [
      {
        name: 'Neha Shah',
        city: 'Nairobi',
        score: '572/720',
        quote:
          'Despite no NEET center in Kenya, Cerebrum helped me plan my India trip and prepare thoroughly. The support was incredible!',
        college: 'Grant Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Akash Patel',
        city: 'Nairobi',
        score: '558/720',
        quote:
          'The historic Indian community in Kenya has great educational focus. Cerebrum coaching connected me to that legacy.',
        college: 'B.J. Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Priya Joshi',
        city: 'Mombasa',
        score: '545/720',
        quote:
          'Traveling to India for NEET exam was well-planned with Cerebrum help. The intensive revision before exam boosted my score.',
        college: 'Government Medical College, Kozhikode',
        avatar: '👩‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Kenya',
      'NEET classes Nairobi',
      'Biology coaching Kenya',
      'NEET online classes Kenya',
      'Indian students Kenya NEET',
      'NEET preparation Africa',
    ],
  },

  thailand: {
    country: 'Thailand',
    countryCode: 'thailand',
    flag: '🇹🇭',
    region: 'Southeast Asia',
    headline: 'NEET Biology Coaching for Thailand Students',
    subheadline: 'Bangkok | Phuket | Chiang Mai | Pattaya | Samut Prakan',
    description:
      'Expert NEET Biology coaching for Indian students in Thailand. Live online classes at Thailand timings, NEET exam center in Bangkok, and complete preparation support.',
    cbseSchools: 2,
    neetCenter: 'Bangkok',
    timezone: 'ICT (GMT+7)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '6:30 PM - 10:30 PM',
    cities: ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Samut Prakan', 'Hat Yai'],
    studentCount: '20+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Evening Classes',
        description: 'Classes at 6:30 PM - 10:30 PM ICT, suitable for after-school preparation.',
      },
      {
        title: 'NEET Center in Bangkok',
        description: 'Write NEET exam in Bangkok. No need to travel to India.',
      },
      {
        title: 'GIIS Thailand',
        description: 'Special support for Global Indian International School Thailand students.',
      },
      {
        title: 'Tourist-Friendly',
        description:
          'Thailand is easy to visit. Students can come to India during vacations for intensive batches.',
      },
      {
        title: 'Growing Community',
        description: 'Indian student community in Thailand is growing steadily.',
      },
      {
        title: 'Flexible Timing',
        description: 'Multiple batch options to suit different school schedules.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in Thailand?',
        answer: 'Yes! NEET exam center is available in Bangkok, Thailand.',
      },
      {
        question: 'What time are classes for Thailand students?',
        answer: 'Classes run 6:30 PM - 10:30 PM ICT. Weekend batches also available.',
      },
      {
        question: 'Are there Indian schools in Thailand?',
        answer:
          'Yes, GIIS Thailand and other Indian curriculum schools exist. We support all board students.',
      },
      {
        question: 'Can I combine NEET prep with travel during Thai holidays?',
        answer:
          'Yes! We have intensive batches during holidays. You can visit India for focused preparation.',
      },
      {
        question: 'What is the success rate for Thailand students?',
        answer: 'Our Thailand students have good success rate with several scoring 600+ in NEET.',
      },
    ],
    testimonial: {
      name: 'Riya Mehta',
      city: 'Bangkok',
      score: '608/720',
      quote:
        'The evening timing worked perfectly with my school schedule. I could attend live classes and still have time for revision.',
    },
    testimonials: [
      {
        name: 'Riya Mehta',
        city: 'Bangkok',
        score: '608/720',
        quote:
          'The evening timing worked perfectly with my school schedule. I could attend live classes and still have time for revision.',
        college: 'Maulana Azad Medical College',
        avatar: '👩‍🎓',
      },
      {
        name: 'Aryan Kapoor',
        city: 'Bangkok',
        score: '595/720',
        quote:
          'GIIS Thailand plus Cerebrum coaching was an unbeatable combination. The NEET center in Bangkok made things convenient.',
        college: 'Grant Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Kavya Nair',
        city: 'Phuket',
        score: '582/720',
        quote:
          'Visiting India during Thai holidays for intensive batches helped accelerate my preparation significantly.',
        college: 'B.J. Medical College',
        avatar: '👩‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Thailand',
      'NEET classes Bangkok',
      'Biology coaching Thailand',
      'NEET online classes Thailand',
      'GIIS Thailand NEET',
      'Indian students Thailand NEET',
    ],
  },

  indonesia: {
    country: 'Indonesia',
    countryCode: 'indonesia',
    flag: '🇮🇩',
    region: 'Southeast Asia',
    headline: 'NEET Biology Coaching for Indonesia Students',
    subheadline: 'Jakarta | Surabaya | Bandung | Bali | Medan',
    description:
      'Professional NEET Biology coaching for Indian students in Indonesia. Live online classes with AIIMS-trained faculty for medical entrance preparation.',
    cbseSchools: 2,
    neetCenter: null,
    timezone: 'WIB (GMT+7)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '6:30 PM - 10:30 PM',
    cities: ['Jakarta', 'Surabaya', 'Bandung', 'Bali', 'Medan', 'Semarang'],
    studentCount: '15+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Evening Classes',
        description: 'Classes at 6:30 PM - 10:30 PM WIB for comfortable after-school learning.',
      },
      {
        title: 'GIIS Indonesia',
        description: 'Support for Global Indian International School Jakarta students.',
      },
      {
        title: 'Close to Singapore',
        description: 'Indonesia is close to Singapore NEET center. Easy travel for exam.',
      },
      {
        title: 'Growing Community',
        description: 'Indian expat community in Indonesia is growing rapidly.',
      },
      {
        title: 'Recorded Classes',
        description: 'All classes recorded for flexible viewing if timing is challenging.',
      },
      {
        title: 'Personal Mentorship',
        description: 'Small batch ensures personalized attention for each student.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in Indonesia?',
        answer:
          'Currently, no NEET center in Indonesia. Nearest centers are Singapore and Bangkok. We help with travel planning.',
      },
      {
        question: 'What time are classes for Indonesia students?',
        answer: 'Classes run 6:30 PM - 10:30 PM WIB. Weekend batches also available.',
      },
      {
        question: 'Are there Indian schools in Indonesia?',
        answer: 'Yes, GIIS Jakarta and a few other schools. We support all board students.',
      },
      {
        question: 'Where should Indonesia students write NEET exam?',
        answer: 'Singapore or Bangkok are closest NEET centers. We provide travel guidance.',
      },
      {
        question: 'Is online coaching effective for Indonesia students?',
        answer:
          'Yes! Indonesia has good internet in major cities. Our students perform well in NEET.',
      },
    ],
    testimonial: {
      name: 'Aditya Kapoor',
      city: 'Jakarta',
      score: '565/720',
      quote:
        'Even without a NEET center in Indonesia, Cerebrum helped me prepare. Traveled to Singapore for the exam confidently.',
    },
    testimonials: [
      {
        name: 'Aditya Kapoor',
        city: 'Jakarta',
        score: '565/720',
        quote:
          'Even without a NEET center in Indonesia, Cerebrum helped me prepare. Traveled to Singapore for the exam confidently.',
        college: 'B.J. Medical College',
        avatar: '👨‍🎓',
      },
      {
        name: 'Ishita Sharma',
        city: 'Jakarta',
        score: '552/720',
        quote:
          'GIIS Jakarta education combined with Cerebrum NEET coaching gave me the edge I needed for medical entrance.',
        college: 'Government Medical College, Nagpur',
        avatar: '👩‍🎓',
      },
      {
        name: 'Varun Reddy',
        city: 'Surabaya',
        score: '538/720',
        quote:
          'Traveling to Singapore for NEET was easy with Cerebrum guidance. The personalized attention made all the difference.',
        college: 'KMC Manipal',
        avatar: '👨‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Indonesia',
      'NEET classes Jakarta',
      'Biology coaching Indonesia',
      'NEET online classes Indonesia',
      'GIIS Jakarta NEET',
      'Indian students Indonesia NEET',
    ],
  },

  tanzania: {
    country: 'Tanzania',
    countryCode: 'tanzania',
    flag: '🇹🇿',
    region: 'Africa',
    headline: 'NEET Biology Coaching for Tanzania Students',
    subheadline: 'Dar es Salaam | Arusha | Mwanza | Dodoma | Zanzibar',
    description:
      'Expert NEET Biology coaching for Indian students in Tanzania. Home to the only CBSE school in Tanzania - Indian School Dar es Salaam. Live online classes with expert faculty.',
    cbseSchools: 1,
    neetCenter: null,
    timezone: 'EAT (GMT+3)',
    istConversion: '5:00 PM - 9:00 PM IST',
    classTimings: '2:00 PM - 6:00 PM',
    cities: ['Dar es Salaam', 'Arusha', 'Mwanza', 'Dodoma', 'Zanzibar', 'Moshi'],
    studentCount: '10+',
    features: commonFeatures,
    courses: commonCourses,
    whyChoose: [
      {
        title: 'Afternoon Classes',
        description: 'Classes at 2:00 PM - 6:00 PM EAT for after-school preparation.',
      },
      {
        title: 'Indian School DSM',
        description:
          'Support for students from Indian School Dar es Salaam - only CBSE school in Tanzania.',
      },
      {
        title: 'IIT Madras Zanzibar',
        description:
          'With IIT opening in Zanzibar, Indian education ecosystem in Tanzania is growing.',
      },
      {
        title: 'Personal Attention',
        description: 'Very small batch means exceptional personalized attention.',
      },
      {
        title: 'Exam Travel Support',
        description: 'Help with travel planning to India for NEET examination.',
      },
      {
        title: 'Historic Community',
        description: 'Tanzania has long-standing Indian community with educational heritage.',
      },
    ],
    faqs: [
      {
        question: 'Is NEET exam conducted in Tanzania?',
        answer:
          'No NEET center in Tanzania currently. Students travel to India or Lagos for exam. We provide travel guidance.',
      },
      {
        question: 'What are the class timings for Tanzania students?',
        answer: 'Classes run 2:00 PM - 6:00 PM EAT. Weekend batches also available.',
      },
      {
        question: 'Is there only one Indian school in Tanzania?',
        answer:
          'Indian School Dar es Salaam is the main CBSE school. We also support students from other schools.',
      },
      {
        question: 'How do Tanzania students appear for NEET?',
        answer:
          'Travel to India 1-2 weeks before exam. We help plan the trip and provide intensive revision.',
      },
      {
        question: 'Are there other NRI students from Tanzania?',
        answer:
          'Yes, we have a small community of Tanzania students. You can connect with peer learners.',
      },
    ],
    testimonial: {
      name: 'Kavita Patel',
      city: 'Dar es Salaam',
      score: '548/720',
      quote:
        'Being one of the few NEET aspirants in Tanzania, I felt alone. Cerebrum connected me with other African students and provided amazing support.',
    },
    testimonials: [
      {
        name: 'Kavita Patel',
        city: 'Dar es Salaam',
        score: '548/720',
        quote:
          'Being one of the few NEET aspirants in Tanzania, I felt alone. Cerebrum connected me with other African students and provided amazing support.',
        college: 'Government Medical College, Nagpur',
        avatar: '👩‍🎓',
      },
      {
        name: 'Rohan Mehta',
        city: 'Dar es Salaam',
        score: '535/720',
        quote:
          'Indian School DSM gave me strong foundation. Cerebrum coaching helped me convert that into NEET success.',
        college: 'KMC Manipal',
        avatar: '👨‍🎓',
      },
      {
        name: 'Anisha Shah',
        city: 'Arusha',
        score: '522/720',
        quote:
          'With IIT coming to Zanzibar, the Indian education ecosystem in Tanzania is growing. Cerebrum was ahead of the curve!',
        college: 'Government Medical College, Thrissur',
        avatar: '👩‍🎓',
      },
    ],
    seoKeywords: [
      'NEET coaching Tanzania',
      'NEET classes Dar es Salaam',
      'Biology coaching Tanzania',
      'Indian School DSM NEET',
      'NEET online classes Tanzania',
      'Indian students Tanzania NEET',
    ],
  },
}

export const nriCountriesList = Object.keys(nriCountriesData)

export const nriRegions = {
  'Middle East': ['uae', 'saudi-arabia', 'kuwait', 'qatar', 'oman', 'bahrain'],
  'Southeast Asia': ['singapore', 'malaysia', 'thailand', 'indonesia'],
  'South Asia': ['nepal'],
  Africa: ['nigeria', 'kenya', 'tanzania'],
}
