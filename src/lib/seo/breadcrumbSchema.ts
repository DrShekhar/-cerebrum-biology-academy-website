// src/lib/seo/breadcrumbSchema.ts
// BreadcrumbList Schema - Better Navigation Display in SERP

interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generate BreadcrumbList schema for improved SERP navigation
 * Shows site hierarchy in Google Search results
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Pre-configured breadcrumb paths for all main pages
export const breadcrumbPaths: Record<string, BreadcrumbItem[]> = {
  courses: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Courses', url: 'https://cerebrumbiologyacademy.com/courses' },
  ],
  crashCourse: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Courses', url: 'https://cerebrumbiologyacademy.com/courses' },
    {
      name: 'NEET Crash Course',
      url: 'https://cerebrumbiologyacademy.com/courses/neet-crash-course',
    },
  ],
  twoYearProgram: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Courses', url: 'https://cerebrumbiologyacademy.com/courses' },
    {
      name: 'Two-Year Program',
      url: 'https://cerebrumbiologyacademy.com/courses/neet-complete',
    },
  ],
  dropperCourse: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Courses', url: 'https://cerebrumbiologyacademy.com/courses' },
    { name: 'Dropper Course', url: 'https://cerebrumbiologyacademy.com/courses/neet-dropper' },
  ],
  foundation: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Courses', url: 'https://cerebrumbiologyacademy.com/courses' },
    { name: 'Foundation Course', url: 'https://cerebrumbiologyacademy.com/courses/foundation' },
  ],
  faculty: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Faculty', url: 'https://cerebrumbiologyacademy.com/faculty' },
  ],
  results: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Results', url: 'https://cerebrumbiologyacademy.com/results' },
  ],
  testimonials: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Testimonials', url: 'https://cerebrumbiologyacademy.com/testimonials' },
  ],
  blog: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Blog', url: 'https://cerebrumbiologyacademy.com/blog' },
  ],
  contact: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Contact', url: 'https://cerebrumbiologyacademy.com/contact' },
  ],
  demo: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Book Demo', url: 'https://cerebrumbiologyacademy.com/demo' },
  ],
  about: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'About Us', url: 'https://cerebrumbiologyacademy.com/about' },
  ],
  // Location-specific breadcrumbs
  southExtension: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Locations', url: 'https://cerebrumbiologyacademy.com/locations' },
    {
      name: 'South Extension',
      url: 'https://cerebrumbiologyacademy.com/locations/south-extension',
    },
  ],
  rohini: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Locations', url: 'https://cerebrumbiologyacademy.com/locations' },
    { name: 'Rohini', url: 'https://cerebrumbiologyacademy.com/locations/rohini' },
  ],
  gurugram: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Locations', url: 'https://cerebrumbiologyacademy.com/locations' },
    { name: 'Gurugram', url: 'https://cerebrumbiologyacademy.com/locations/gurugram' },
  ],
  greenPark: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Locations', url: 'https://cerebrumbiologyacademy.com/locations' },
    { name: 'Green Park', url: 'https://cerebrumbiologyacademy.com/locations/green-park' },
  ],
  faridabad: [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Locations', url: 'https://cerebrumbiologyacademy.com/locations' },
    { name: 'Faridabad', url: 'https://cerebrumbiologyacademy.com/locations/faridabad' },
  ],
}

/**
 * Generate breadcrumb schema for a blog post
 */
export function generateBlogBreadcrumb(postTitle: string, postSlug: string): BreadcrumbItem[] {
  return [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Blog', url: 'https://cerebrumbiologyacademy.com/blog' },
    { name: postTitle, url: `https://cerebrumbiologyacademy.com/blog/${postSlug}` },
  ]
}

/**
 * Generate breadcrumb schema for a city page
 */
export function generateCityBreadcrumb(cityName: string, citySlug: string): BreadcrumbItem[] {
  return [
    { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
    { name: 'Locations', url: 'https://cerebrumbiologyacademy.com/locations' },
    { name: cityName, url: `https://cerebrumbiologyacademy.com/locations/${citySlug}` },
  ]
}
