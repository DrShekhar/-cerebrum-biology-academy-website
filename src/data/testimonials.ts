import { Testimonial } from '@/types'

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    course: 'NEET 2024 - Class 12th',
    rating: 5,
    comment:
      "Sir, I never thought I could score 350+ in NEET! Your teaching methodology and conceptual clarity made all the difference. The way you explained photosynthesis and respiration with real-life examples was amazing. Thank you for believing in me when I didn't believe in myself.",
    image: '/testimonials/priya-sharma.jpg',
    result: 'NEET AIR 2,847 | Biology Score: 346/360 | Total: 648/720',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    location: 'Delhi, India',
  },
  {
    id: '2',
    name: 'Arjun Patel',
    course: 'NEET 2024 - Dropper Batch',
    rating: 5,
    comment:
      'I was a dropper and had lost all confidence after my first attempt. Cerebrum Biology Academy not only improved my biology score from 120 to 175 but also gave me the confidence to face NEET again. The revision strategy and test series were phenomenal.',
    image: '/testimonials/arjun-patel.jpg',
    result: 'NEET AIR 1,234 | Biology Score: 352/360 | Total: 678/720',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    location: 'Mumbai, India',
  },
  {
    id: '3',
    name: 'Sarah Mitchell',
    course: 'International NEET Preparation',
    rating: 5,
    comment:
      'As an international student from Singapore, I was worried about NEET preparation. The online classes were perfectly timed for our timezone, and the faculty understood the unique challenges we face. The biology concepts were explained so clearly!',
    image: '/testimonials/sarah-mitchell.jpg',
    result: 'NEET 2024 Qualified | Biology Score: 342/360 | Total: 632/720',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    location: 'Singapore',
  },
  {
    id: '4',
    name: 'Rahul Kumar',
    course: 'NEET 2024 - Class 11th Foundation',
    rating: 5,
    comment:
      "Starting early with Cerebrum was the best decision! The 2-year foundation program built my concepts from scratch. I went from struggling with basic biology to topping my school exams. Now I'm confident about NEET 2025!",
    image: '/testimonials/rahul-kumar.jpg',
    result: 'School Topper | 95% in Biology Boards',
    location: 'Pune, India',
  },
  {
    id: '5',
    name: 'Anjali Gupta',
    course: 'CBSE Board + NEET Dual Prep',
    rating: 5,
    comment:
      'The dual preparation strategy was perfect! I scored 98% in CBSE Biology and also cleared NEET in the same year. The faculty knew exactly how to balance both syllabi. The board exam preparation was as thorough as NEET prep.',
    image: '/testimonials/anjali-gupta.jpg',
    result: 'CBSE: 98% Biology | NEET AIR 5,672',
    location: 'Gurgaon, India',
  },
  {
    id: '6',
    name: 'David Chen',
    course: 'IB Biology + NEET Bridge Course',
    rating: 5,
    comment:
      'Coming from IB curriculum, I had gaps in NEET-specific topics. The bridge course filled all those gaps perfectly. The faculty understood international curricula and helped me transition smoothly. Achieved my target score!',
    image: '/testimonials/david-chen.jpg',
    result: 'IB: 7/7 Biology HL | NEET Biology: 348/360 | Total: 665/720',
    location: 'Dubai, UAE',
  },
]

export const successStats = [
  {
    number: '2000+',
    label: 'Students Mentored',
    description: 'Across India and International',
  },
  {
    number: '98%',
    label: 'Success Rate',
    description: 'NEET Qualification Rate',
  },
  {
    number: '180+',
    label: 'Average Biology Score',
    description: 'Among our NEET toppers',
  },
  {
    number: '50+',
    label: 'Countries Served',
    description: 'Global online presence',
  },
]

export const videoTestimonials = [
  {
    id: 'video-1',
    title: 'How I scored 186/200 in NEET Biology',
    studentName: 'Priya Sharma',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    thumbnail: '/video-thumbnails/priya-testimonial.jpg',
    duration: '5:23',
    views: '125K',
    result: 'AIR 2,847',
  },
  {
    id: 'video-2',
    title: 'From Dropper to NEET Success Story',
    studentName: 'Arjun Patel',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    thumbnail: '/video-thumbnails/arjun-testimonial.jpg',
    duration: '7:15',
    views: '89K',
    result: 'AIR 1,234',
  },
  {
    id: 'video-3',
    title: 'International Student NEET Journey',
    studentName: 'Sarah Mitchell',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    thumbnail: '/video-thumbnails/sarah-testimonial.jpg',
    duration: '6:42',
    views: '67K',
    result: 'NEET Qualified',
  },
]
