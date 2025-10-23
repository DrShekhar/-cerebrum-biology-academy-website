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
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=454,fit=crop/meP3n6VKelS9LnOn/untitled-design-10-Yle6eBZzWoUXG23m.png',
    title: "Dr. Shekhar with Sharani Narayana Ma'am",
    description: 'Director of Cerebrum with Director of Narayana Group',
    category: 'faculty',
  },
  {
    id: 'dean-south-city',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=454,fit=crop/meP3n6VKelS9LnOn/shekhar-sir-dean-south-city-meP1PKZLe3Hr9XWl.png',
    title: 'Academic Leadership at Narayana',
    description: 'Dr. Shekhar Sir at Narayana e-techno School South City 2',
    category: 'faculty',
  },
  {
    id: 'pariksha-pe-charcha',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/untitled-design-9-ALpOpZl03Bha1Bnj.png',
    title: 'Pariksha pe Charcha Seminar',
    description: 'Educational seminar event at school',
    category: 'seminars',
  },
  {
    id: 'educational-seminar',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/untitled-design-11-YanMnwj3k6hKxk4G.png',
    title: 'Expert Seminar Session',
    description: 'Educational seminar featuring Sharani Narayana',
    category: 'seminars',
  },
  {
    id: 'mgr-welcome',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=492,fit=crop/meP3n6VKelS9LnOn/warm-welcome-by-mgr-staff-YBg8EJ3w40SNWe0G.png',
    title: 'Welcome at MG Road Campus',
    description: 'Warm welcome reception for Dr. Shekhar Sir',
    category: 'events',
  },
  {
    id: 'mgr-welcome-2',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/warm-welcome-by-mgr-staff-1-A1aQe64xlbTX5o0y.png',
    title: 'MG Road Facility Welcome',
    description: 'Formal welcome at MG Road facility',
    category: 'events',
  },
  {
    id: 'teachers-day',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/meP3n6VKelS9LnOn/teachers-day-mgr-YZ97MLJx15TGoJOO.png',
    title: "Teachers' Day Celebration",
    description: "Teachers' Day celebration at MG Road campus",
    category: 'events',
  },
  {
    id: 'gvm-sonipat',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1226,fit=crop/meP3n6VKelS9LnOn/untitled-design-16-YZ97M50Rq4sJVv2b.png',
    title: 'NEET Aspirants Seminar - Sonipat',
    description: 'Dr. Shekhar addressing NEET aspirants at GVM Sonipat',
    category: 'seminars',
  },
  {
    id: 'principal-greeting',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1226,fit=crop/meP3n6VKelS9LnOn/untitled-design-17-Yg2a7xKM1Ws1w5B9.png',
    title: 'Principal Welcome',
    description: 'Dr. Shekhar greeting incoming principal at South City 2',
    category: 'events',
  },
  {
    id: 'neet-seminar',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1226,fit=crop/meP3n6VKelS9LnOn/untitled-design-18-AwvJOG3MwMIPX0l5.png',
    title: 'NEET UG Guidance Session',
    description: 'Dr. Shekhar addressing NEET UG aspirants',
    category: 'seminars',
  },
  {
    id: 'hero-facility',
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/meP3n6VKelS9LnOn/img_2854-YD0v2gX7w8TZqBql.jpg',
    title: 'Cerebrum Academy Facilities',
    description: 'Modern classroom and academy infrastructure',
    category: 'campus',
  },
]
