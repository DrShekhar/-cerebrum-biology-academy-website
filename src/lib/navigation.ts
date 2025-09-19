export interface NavigationItem {
  title: string
  description: string
  href: string
  icon: string
  category: 'learning' | 'voice' | 'admin' | 'tools' | 'student'
  status: 'active' | 'coming-soon' | 'beta' | 'maintenance'
  requiresAuth?: boolean
}

export const navigationRoutes: NavigationItem[] = [
  // Learning & AI Features
  {
    title: 'ClaudeChat Board',
    description: 'AI-powered Biology learning with voice chat and image analysis',
    href: '/claudechat',
    icon: '🤖',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'AI Doubt Resolution',
    description: "Instant Biology doubt clearing with Shekhar Sir's AI assistant",
    href: '/services/doubt-resolution',
    icon: '🧠',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'Voice Test Studio',
    description: "Test Shekhar Sir's voice synthesis in Hindi, English & Hinglish",
    href: '/test-voice',
    icon: '🎵',
    category: 'voice',
    status: 'active',
  },
  {
    title: 'Voice Training Studio',
    description: 'Advanced voice training and customization interface',
    href: '/voice-training',
    icon: '🎯',
    category: 'voice',
    status: 'active',
  },

  // Main Platform Pages
  {
    title: 'Home',
    description: 'Main landing page with course overview',
    href: '/',
    icon: '🏠',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'About',
    description: 'Learn about Cerebrum Biology Academy',
    href: '/about',
    icon: 'ℹ️',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'Courses',
    description: 'Browse all Biology courses and programs',
    href: '/courses',
    icon: '📚',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'Faculty',
    description: 'Meet our expert Biology teachers',
    href: '/faculty',
    icon: '👨‍🏫',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'Services',
    description: 'All educational services and offerings',
    href: '/services',
    icon: '🛠️',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'Contact',
    description: 'Get in touch with us',
    href: '/contact',
    icon: '📞',
    category: 'learning',
    status: 'active',
  },

  // Student Portal
  {
    title: 'Student Dashboard',
    description: 'Personal learning dashboard and progress tracking',
    href: '/student',
    icon: '📊',
    category: 'student',
    status: 'coming-soon',
    requiresAuth: true,
  },
  {
    title: 'Video Lectures',
    description: 'Access recorded Biology lectures',
    href: '/video-lectures',
    icon: '🎥',
    category: 'learning',
    status: 'active',
  },

  // Admin & Tools
  {
    title: 'Admin Panel',
    description: 'Administrative dashboard and controls',
    href: '/admin',
    icon: '⚙️',
    category: 'admin',
    status: 'active',
    requiresAuth: true,
  },
  {
    title: 'Brand Studio',
    description: 'Marketing materials and brand assets',
    href: '/brand-studio',
    icon: '🎨',
    category: 'tools',
    status: 'active',
  },

  // Location-based Pages
  {
    title: 'Kota Coaching',
    description: 'Biology coaching in Kota',
    href: '/locations/kota',
    icon: '📍',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'Delhi Coaching',
    description: 'Biology coaching in Delhi',
    href: '/locations/delhi',
    icon: '📍',
    category: 'learning',
    status: 'active',
  },

  // Course-specific Pages
  {
    title: 'Class 11 Biology',
    description: 'Comprehensive Class 11 Biology course',
    href: '/courses/class-11',
    icon: '📖',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'Class 12 Biology',
    description: 'Advanced Class 12 Biology course',
    href: '/courses/class-12',
    icon: '📖',
    category: 'learning',
    status: 'active',
  },
  {
    title: 'NEET Preparation',
    description: 'Specialized NEET Biology preparation',
    href: '/courses/neet',
    icon: '🎯',
    category: 'learning',
    status: 'active',
  },
]

export const getRoutesByCategory = (category: NavigationItem['category']) => {
  return navigationRoutes.filter((route) => route.category === category)
}

export const getActiveRoutes = () => {
  return navigationRoutes.filter((route) => route.status === 'active')
}

export const getRouteByPath = (path: string) => {
  return navigationRoutes.find((route) => route.href === path)
}

export const getBreadcrumbs = (currentPath: string) => {
  const route = getRouteByPath(currentPath)
  if (!route) return []

  const breadcrumbs = [{ title: 'Home', href: '/' }]

  if (route.href !== '/') {
    breadcrumbs.push({
      title: route.title,
      href: route.href,
    })
  }

  return breadcrumbs
}
