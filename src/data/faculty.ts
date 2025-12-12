import { Faculty } from '@/types'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'

export const facultyMembers: Faculty[] = [
  {
    id: 'dr-shekhar-singh',
    name: 'Dr. Shekhar C Singh',
    qualification: 'AIIMS New Delhi',
    experience: '15+ years',
    specialization: [],
    image:
      'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=571,fit=crop/meP3n6VKelS9LnOn/img-0034-meP3pJDRGxsyRZyy.jpg',
    designation: 'Director & Chief Educator',
    bio: 'Dr. Shekhar C Singh is an AIIMS New Delhi alumnus with over 15 years of specialized experience in NEET Biology coaching. As Director of Cerebrum Biology Academy, he has mentored thousands of top NEET scorers. His student Sadhna Sirin scored 695 marks in NEET 2023 and achieved 100 percentile in Biology, becoming Delhi-NCR topper.',
    achievements: [
      'AIIMS New Delhi Alumnus',
      'Former Academic Head & CO-Campus Faculty at Narayana Group',
      'Founded Delhi Science Foundation and Quark Education',
      'Student Sadhna Sirin: 695 marks in NEET 2023, 100%ile Biology (Delhi-NCR Rank 1)',
      'Student Priya Sehgal: Perfect 360/360 Biology score',
      'Mentored 2500+ students to medical college admissions',
    ],
    teachingStyle:
      'Believes "all humans are equally talented; hard work done smartly brings extraordinary success." Focuses on converting underperforming students into high achievers through unconventional teaching approaches that extend beyond textbooks to include life skills and character development.',
    successRate: 98,
    studentTestimonial:
      'Dr. Shekhar Sir made Biology so clear and interesting. His unique teaching methods helped me score 695 marks in NEET. - Sadhna Sirin',
    studentsGuided: 2500,
    rating: 4.9,
  },
  {
    id: 'dr-priya-sharma',
    name: 'Dr. Priya Sharma',
    qualification: 'MSc Botany (JNU), PhD Plant Physiology (IISc)',
    experience: '12+ years',
    specialization: ['Plant Biology', 'Ecology', 'Genetics'],
    image: getPlaceholderAvatar('Priya Sharma', 200, '7C3AED', 'fff'),
    designation: 'Senior Faculty - Botany',
    bio: 'Dr. Priya Sharma is a renowned botanist with expertise in plant sciences. Her research background from IISc brings cutting-edge knowledge to NEET preparation.',
    achievements: [
      'PhD from IISc Bangalore in Plant Physiology',
      'Published 8 research papers in international journals',
      'Expert in NEET Plant Biology sections',
      'Developed innovative teaching methods for botany',
    ],
    teachingStyle: 'Uses visual aids and real plant specimens for effective learning',
    successRate: 94,
    studentTestimonial: "Ma'am makes botany interesting with her practical approach and examples.",
    studentsGuided: 1800,
    rating: 4.8,
  },
  {
    id: 'dr-amit-singh',
    name: 'Dr. Amit Singh',
    qualification: 'MBBS (AIIMS Rishikesh), MS Surgery',
    experience: '10+ years',
    specialization: ['Animal Physiology', 'Human Biology', 'Surgery Basics'],
    image: getPlaceholderAvatar('Amit Singh', 200, '2563EB', 'fff'),
    designation: 'Senior Faculty - Zoology',
    bio: 'Dr. Amit Singh combines his medical practice experience with teaching excellence, providing students with practical insights into human biology and physiology.',
    achievements: [
      'AIIMS Rishikesh alumnus with MS in Surgery',
      'Active medical practitioner and educator',
      'Specialized in human physiology for NEET',
      'Conducted 100+ doubt clearing sessions',
    ],
    teachingStyle: 'Integrates clinical knowledge with NEET concepts for better understanding',
    successRate: 92,
    studentTestimonial:
      "Sir's medical background helps us understand concepts from exam perspective.",
    studentsGuided: 1500,
    rating: 4.7,
  },
  {
    id: 'prof-meera-gupta',
    name: 'Prof. Meera Gupta',
    qualification: 'MSc Genetics (DU), PhD Molecular Biology (JNU)',
    experience: '8+ years',
    specialization: ['Genetics', 'Molecular Biology', 'Evolution', 'Biotechnology'],
    image: getPlaceholderAvatar('Meera Gupta', 200, 'DC2626', 'fff'),
    designation: 'Associate Professor - Genetics',
    bio: 'Prof. Meera Gupta is a molecular biology expert who simplifies complex genetic concepts for NEET aspirants with her research-backed teaching approach.',
    achievements: [
      'PhD in Molecular Biology from JNU',
      'Research experience in genetic engineering',
      'Expert in NEET genetics and evolution topics',
      'Developed unique mnemonics for genetic concepts',
    ],
    teachingStyle: 'Breaks down complex genetics into simple, memorable concepts',
    successRate: 95,
    studentTestimonial:
      "Ma'am made genetics so easy with her unique teaching methods and examples.",
    studentsGuided: 1200,
    rating: 4.8,
  },
  {
    id: 'dr-vikram-joshi',
    name: 'Dr. Vikram Joshi',
    qualification: 'MSc Biochemistry (BHU), PhD Cell Biology (TIFR)',
    experience: '11+ years',
    specialization: ['Cell Biology', 'Biochemistry', 'Biophysics', 'Molecular Processes'],
    image: getPlaceholderAvatar('Vikram Joshi', 200, '059669', 'fff'),
    designation: 'Senior Faculty - Cell Biology',
    bio: 'Dr. Vikram Joshi brings cutting-edge research experience from TIFR to make cell biology and biochemistry concepts crystal clear for NEET aspirants.',
    achievements: [
      'PhD from TIFR Mumbai in Cell Biology',
      'Published 12 research papers in cell biology',
      'Expert in biochemistry and molecular processes',
      'Designed innovative cell biology curriculum',
    ],
    teachingStyle: 'Uses animations and 3D models to explain cellular processes',
    successRate: 93,
    studentTestimonial:
      "Sir's explanations of cell biology are so detailed yet easy to understand.",
    studentsGuided: 1600,
    rating: 4.7,
  },
  {
    id: 'dr-anita-verma',
    name: 'Dr. Anita Verma',
    qualification: 'MSc Environmental Science (JNU), PhD Ecology (IIT Delhi)',
    experience: '9+ years',
    specialization: ['Environmental Biology', 'Biodiversity', 'Ecosystem Ecology'],
    image: getPlaceholderAvatar('Anita Verma', 200, 'EA580C', 'fff'),
    designation: 'Faculty - Environmental Biology',
    bio: 'Dr. Anita Verma is an environmental scientist who makes ecology and environmental biology engaging through field examples and current environmental issues.',
    achievements: [
      'PhD in Ecology from IIT Delhi',
      'Environmental consultant for government projects',
      'Expert in NEET ecology and environment topics',
      'Organized 50+ environmental awareness programs',
    ],
    teachingStyle: 'Connects environmental concepts with current affairs and real-world examples',
    successRate: 91,
    studentTestimonial:
      "Ma'am connects environmental topics with current issues, making them memorable.",
    studentsGuided: 1100,
    rating: 4.6,
  },
]

export const facultyStats = [
  {
    number: '50+',
    label: 'Expert Faculty',
    description: 'PhD & Medical Graduates',
  },
  {
    number: '20+',
    label: 'AIIMS Alumni',
    description: 'Teaching Excellence',
  },
  {
    number: '15+',
    label: 'Average Experience',
    description: 'Years in NEET Coaching',
  },
  {
    number: '98%',
    label: 'Success Rate',
    description: 'Student Achievement',
  },
]

export const facultyHighlights = [
  'AIIMS and top medical college graduates',
  'PhD holders from premier institutes',
  'Combined 100+ years of teaching experience',
  'Expert NEET question paper analysis',
  'Research-backed teaching methodologies',
  'Personalized student mentoring approach',
]
