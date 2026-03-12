export interface GalleryImage {
  id: string
  url: string
  title: string
  description: string
  category: 'faculty' | 'events' | 'seminars' | 'achievements' | 'campus'
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'shekhar-narayana-director',
    url: '/images/gallery/untitled-design-10.png',
    title: "Dr. Shekhar with Sharani Narayana Ma'am",
    description: 'Director of Cerebrum with Director of Narayana Group',
    category: 'faculty',
  },
  {
    id: 'dean-south-city',
    url: '/images/gallery/shekhar-sir-dean-south-city.png',
    title: 'Academic Leadership at Narayana',
    description: 'Dr. Shekhar Sir at Narayana e-techno School South City 2',
    category: 'faculty',
  },
  {
    id: 'pariksha-pe-charcha',
    url: '/images/gallery/untitled-design-9.png',
    title: 'Pariksha pe Charcha Seminar',
    description: 'Educational seminar event at school',
    category: 'seminars',
  },
  {
    id: 'educational-seminar',
    url: '/images/gallery/untitled-design-11.png',
    title: 'Expert Seminar Session',
    description: 'Educational seminar featuring Sharani Narayana',
    category: 'seminars',
  },
  {
    id: 'mgr-welcome',
    url: '/images/gallery/warm-welcome-by-mgr-staff.png',
    title: 'Welcome at MG Road Campus',
    description: 'Warm welcome reception for Dr. Shekhar Sir',
    category: 'events',
  },
  {
    id: 'mgr-welcome-2',
    url: '/images/gallery/warm-welcome-by-mgr-staff-1.png',
    title: 'MG Road Facility Welcome',
    description: 'Formal welcome at MG Road facility',
    category: 'events',
  },
  {
    id: 'teachers-day',
    url: '/images/gallery/teachers-day-mgr.png',
    title: "Teachers' Day Celebration",
    description: "Teachers' Day celebration at MG Road campus",
    category: 'events',
  },
  {
    id: 'gvm-sonipat',
    url: '/images/gallery/untitled-design-16.png',
    title: 'NEET Aspirants Seminar - Sonipat',
    description: 'Dr. Shekhar addressing NEET aspirants at GVM Sonipat',
    category: 'seminars',
  },
  {
    id: 'principal-greeting',
    url: '/images/gallery/untitled-design-17.png',
    title: 'Principal Welcome',
    description: 'Dr. Shekhar greeting incoming principal at South City 2',
    category: 'events',
  },
  {
    id: 'neet-seminar',
    url: '/images/gallery/untitled-design-18.png',
    title: 'NEET UG Guidance Session',
    description: 'Dr. Shekhar addressing NEET UG aspirants',
    category: 'seminars',
  },
  {
    id: 'hero-facility',
    url: '/images/gallery/img-2854.jpg',
    title: 'Cerebrum Academy Facilities',
    description: 'Modern classroom and academy infrastructure',
    category: 'campus',
  },
]
