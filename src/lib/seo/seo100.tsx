// src/lib/seo/seo100.tsx
// Master SEO Schema Generator - Combines all schemas for 100/100 scores

import React from 'react';
import { generateAllVideoSchemas } from './videoSchema';
import { generateAggregateRatingSchema, generateCourseRatingSchema, featuredReviews, courseRatings } from './ratingSchema';
import { generateBreadcrumbSchema, breadcrumbPaths, generateBlogBreadcrumb, generateCityBreadcrumb } from './breadcrumbSchema';
import { generateEventSchema, generateAllEventSchemas, upcomingEvents } from './eventSchema';
import { generateAllFacultySchemas, generateAuthorSchema } from './personSchema';
import { generateSpeakableWebPageSchema, generateSpeakableFAQSchema, generateSpeakableArticleSchema, speakablePages, voiceOptimizedFAQs } from './speakableSchema';

// Export everything for individual use
export * from './videoSchema';
export * from './ratingSchema';
export * from './breadcrumbSchema';
export * from './eventSchema';
export * from './personSchema';
export * from './speakableSchema';

// Page-specific schema configurations
type PageType = 'home' | 'courses' | 'course-detail' | 'faculty' | 'results' | 'blog' | 'blog-post' | 'contact' | 'demo' | 'testimonials' | 'about';

interface SchemaConfig {
  page: PageType;
  courseSlug?: string;
  blogPost?: {
    title: string;
    description: string;
    url: string;
    slug: string;
    datePublished: string;
    author: string;
    image?: string;
  };
  cityPage?: {
    name: string;
    slug: string;
  };
}

/**
 * Generate all required schemas for a specific page
 * This ensures comprehensive schema coverage for 100/100 SEO score
 */
export function generatePageSchemas(config: SchemaConfig): object[] {
  const schemas: object[] = [];

  // Always include organization rating (appears on all pages)
  schemas.push(generateAggregateRatingSchema(featuredReviews));

  // Add breadcrumbs for all pages except home
  if (config.page !== 'home' && breadcrumbPaths[config.page as keyof typeof breadcrumbPaths]) {
    schemas.push(generateBreadcrumbSchema(breadcrumbPaths[config.page as keyof typeof breadcrumbPaths]));
  }

  // Page-specific schemas
  switch (config.page) {
    case 'home':
      // Speakable for voice search
      schemas.push(generateSpeakableWebPageSchema(speakablePages.home));
      // FAQs with speakable
      schemas.push(generateSpeakableFAQSchema(voiceOptimizedFAQs));
      // Upcoming events
      schemas.push(...generateAllEventSchemas().slice(0, 3)); // Top 3 events
      break;

    case 'courses':
      schemas.push(generateSpeakableWebPageSchema(speakablePages.courses));
      // Add course ratings
      Object.values(courseRatings).forEach(course => {
        schemas.push(generateCourseRatingSchema(course));
      });
      break;

    case 'course-detail':
      if (config.courseSlug && courseRatings[config.courseSlug as keyof typeof courseRatings]) {
        schemas.push(generateCourseRatingSchema(courseRatings[config.courseSlug as keyof typeof courseRatings]));
      }
      break;

    case 'faculty':
      schemas.push(generateSpeakableWebPageSchema(speakablePages.faculty));
      schemas.push(...generateAllFacultySchemas());
      break;

    case 'results':
      schemas.push(generateSpeakableWebPageSchema(speakablePages.results));
      break;

    case 'testimonials':
      schemas.push(...generateAllVideoSchemas());
      break;

    case 'demo':
      // Show upcoming demo events (free ones)
      const demoEvents = upcomingEvents.filter(e => e.price === 0);
      schemas.push(...demoEvents.map(e => generateEventSchema(e)));
      break;

    case 'blog':
      schemas.push(generateBreadcrumbSchema(breadcrumbPaths.blog));
      break;

    case 'blog-post':
      if (config.blogPost) {
        // Blog breadcrumb
        schemas.push(generateBreadcrumbSchema(generateBlogBreadcrumb(config.blogPost.title, config.blogPost.slug)));
        // Article schema with speakable
        schemas.push(generateSpeakableArticleSchema({
          headline: config.blogPost.title,
          description: config.blogPost.description,
          url: config.blogPost.url,
          datePublished: config.blogPost.datePublished,
          author: config.blogPost.author,
          image: config.blogPost.image
        }));
        // Author schema
        schemas.push(generateAuthorSchema(config.blogPost.author));
      }
      break;

    case 'contact':
      schemas.push(generateBreadcrumbSchema(breadcrumbPaths.contact));
      break;

    case 'about':
      schemas.push(generateBreadcrumbSchema(breadcrumbPaths.about));
      schemas.push(...generateAllFacultySchemas());
      break;
  }

  // Add city-specific breadcrumbs if applicable
  if (config.cityPage) {
    schemas.push(generateBreadcrumbSchema(generateCityBreadcrumb(config.cityPage.name, config.cityPage.slug)));
  }

  return schemas;
}

/**
 * React component helper to inject schemas
 * Usage: <SchemaScript schemas={schemas} />
 */
export function SchemaScript({ schemas }: { schemas: object[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

/**
 * Generate complete schema string for server-side rendering
 */
export function generateSchemaString(schemas: object[]): string {
  return schemas.map(schema =>
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
  ).join('\n');
}

/**
 * Get all schemas for the entire site (useful for testing/validation)
 */
export function getAllSiteSchemas(): Record<string, object[]> {
  return {
    home: generatePageSchemas({ page: 'home' }),
    courses: generatePageSchemas({ page: 'courses' }),
    faculty: generatePageSchemas({ page: 'faculty' }),
    results: generatePageSchemas({ page: 'results' }),
    testimonials: generatePageSchemas({ page: 'testimonials' }),
    demo: generatePageSchemas({ page: 'demo' }),
    blog: generatePageSchemas({ page: 'blog' }),
    contact: generatePageSchemas({ page: 'contact' }),
    about: generatePageSchemas({ page: 'about' })
  };
}

// Example usage in app/page.tsx (homepage):
/*
import { generatePageSchemas, SchemaScript } from '@/lib/seo/seo100';

export default function HomePage() {
  const schemas = generatePageSchemas({ page: 'home' });

  return (
    <>
      <head>
        <SchemaScript schemas={schemas} />
      </head>
      <main>
        {/* Page content *\/}
      </main>
    </>
  );
}
*/

// Example usage in app/layout.tsx for site-wide schemas:
/*
import { generateAggregateRatingSchema } from '@/lib/seo/seo100';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateAggregateRatingSchema())
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
*/

// Example usage for blog posts:
/*
import { generatePageSchemas, SchemaScript } from '@/lib/seo/seo100';

export default function BlogPost({ post }) {
  const schemas = generatePageSchemas({
    page: 'blog-post',
    blogPost: {
      title: post.title,
      description: post.excerpt,
      url: `https://cerebrumbiologyacademy.com/blog/${post.slug}`,
      slug: post.slug,
      datePublished: post.publishedAt,
      author: post.author,
      image: post.featuredImage
    }
  });

  return (
    <>
      <head>
        <SchemaScript schemas={schemas} />
      </head>
      <article>
        {/* Blog content *\/}
      </article>
    </>
  );
}
*/
