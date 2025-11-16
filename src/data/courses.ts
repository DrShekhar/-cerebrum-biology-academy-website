import { BasicCourse } from '@/types'

export const courses: BasicCourse[] = [
  {
    id: 'class-9th-foundation',
    title: 'Class 9th Foundation Biology',
    description:
      'Build a strong foundation in Biology for Class 9th students. Early preparation for competitive exams with conceptual clarity.',
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
    title: 'Class 10th Foundation Biology',
    description:
      'Advanced foundation program for Class 10th students preparing for NEET. Bridge course to competitive exam preparation.',
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
    id: 'class-12th-neet-intensive',
    title: 'Class 12th NEET Intensive',
    description:
      'Intensive program for Class 12th students with focus on both boards and NEET preparation simultaneously.',
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
    title: 'NEET Dropper Year Program',
    description:
      'Specialized intensive course for students who want to improve their NEET score. Complete preparation with proven results.',
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
