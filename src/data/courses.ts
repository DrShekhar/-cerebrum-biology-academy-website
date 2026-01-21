import { BasicCourse } from '@/types'

export const courses: BasicCourse[] = [
  {
    id: 'class-9th-foundation',
    title: 'Class 9th Foundation',
    description:
      'Build a strong foundation in Biology for Class 9th students with early preparation for competitive exams. Our program covers fundamental concepts of Cell Biology, Plant and Animal Tissues, Diversity in Living Organisms, and basic Human Physiology. Students develop conceptual clarity through interactive learning, practical demonstrations, and NCERT-aligned curriculum that lays the groundwork for future NEET success.',
    duration: '1 Year',
    price: 58000,
    targetClass: '9th',
    features: [
      'Live Interactive Classes',
      'Complete Study Material',
      'Weekly Tests & Analysis',
      'Doubt Resolution Sessions',
      'Conceptual Learning Focus',
      'Biology Lab Sessions',
      'Personal Mentorship',
      'Foundation for NEET',
    ],
  },
  {
    id: 'class-10th-foundation',
    title: 'Class 10th Foundation',
    description:
      'Advanced foundation program for Class 10th students preparing for NEET with focus on Life Processes, Control and Coordination, Reproduction, Heredity and Evolution. This bridge course introduces NEET exam patterns while strengthening CBSE board fundamentals. Students learn advanced Biology concepts including Genetics basics, Ecosystem understanding, and Natural Resources conservation through AIIMS Trained faculty mentorship.',
    duration: '1 Year',
    price: 68000,
    targetClass: '10th',
    features: [
      'Live Interactive Classes',
      'Complete Study Material',
      'Weekly Tests & Analysis',
      'Doubt Resolution Sessions',
      'NEET Pattern Introduction',
      'Previous Year Questions',
      'Mock Tests & Analysis',
      'Career Counseling',
    ],
  },
  {
    id: 'class-12th-neet-ascent',
    title: 'NEET 2026 - Class 12th Ascent',
    description:
      'Intensive dual-preparation program for Class 12th students targeting both CBSE Boards and NEET 2026. Comprehensive coverage of Human Reproduction, Genetics and Evolution, Biotechnology, Ecology and Environment, Plant Physiology, and Animal Kingdom classification. Our AIIMS Trained faculty ensure mastery of high-weightage topics like Genetics, Human Physiology, and Ecology through strategic teaching methods and regular NEET pattern assessments.',
    duration: '1 Year',
    price: 72000,
    targetClass: '12th',
    features: [
      'Dual Preparation (Board + NEET)',
      'Advanced Biology Concepts',
      'Speed & Accuracy Training',
      'All India Test Series',
      'Strategy Sessions',
      'Revision Modules',
      'Expert Faculty Guidance',
      'Performance Analytics',
    ],
  },
  {
    id: 'neet-dropper-year',
    title: 'NEET 2026 - Dropper Batch',
    description:
      'Specialized intensive course for NEET aspirants seeking score improvement with complete syllabus revision from Class 11 and 12. Focus on high-yield topics including Genetics, Evolution, Human Physiology, Plant Physiology, Ecology, and Biotechnology. Our proven methodology includes weakness identification, targeted practice sessions, extensive previous year question analysis, and strategic time management training to help students achieve their target NEET rank.',
    duration: '1 Year',
    price: 85000,
    targetClass: 'Dropper',
    features: [
      'Complete Syllabus Revision',
      'High-Yield Topics Focus',
      'Intensive Test Series',
      'Score Improvement Strategy',
      'Weakness Analysis',
      'Time Management Training',
      'Motivational Sessions',
      'Success Guarantee Program',
    ],
  },
]

export const courseCategories = [
  {
    id: 'classroom',
    name: 'Classroom Program',
    description: 'Traditional face-to-face learning with expert faculty',
    icon: 'Users',
  },
  {
    id: 'online',
    name: 'Online Live Classes',
    description: 'Interactive online sessions from anywhere',
    icon: 'Monitor',
  },
  {
    id: 'hybrid',
    name: 'Hybrid Learning',
    description: 'Best of both classroom and online learning',
    icon: 'Smartphone',
  },
]
