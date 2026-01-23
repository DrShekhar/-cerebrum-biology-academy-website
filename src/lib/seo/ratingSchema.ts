// src/lib/seo/ratingSchema.ts
// AggregateRating Schema - Enables Star Ratings in SERP

interface ReviewData {
  author: string;
  reviewBody: string;
  reviewRating: number;
  datePublished: string;
}

/**
 * Generate AggregateRating schema for the organization
 * Shows star ratings in Google Search results
 */
export function generateAggregateRatingSchema(reviews?: ReviewData[]) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Cerebrum Biology Academy",
    "description": "Delhi NCR's leading NEET Biology coaching institute with 98% success rate. Specializing exclusively in Biology coaching for NEET and board exams.",
    "url": "https://cerebrumbiologyacademy.com",
    "logo": "https://cerebrumbiologyacademy.com/brain-logo.png",
    "image": "https://cerebrumbiologyacademy.com/og-image.jpg",
    "telephone": "+91-88264-44334",
    "email": "info@cerebrumbiologyacademy.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Block D, South Extension Part 2",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110049",
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "2547",
      "reviewCount": "1823"
    },
    "sameAs": [
      "https://www.instagram.com/cerebrumbiologyacademy",
      "https://www.youtube.com/@cerebrumbiologyacademy",
      "https://www.linkedin.com/company/cerebrum-biology-academy",
      "https://twitter.com/CerebrumBio",
      "https://www.facebook.com/cerebrumbiologyacademy"
    ]
  };

  // Add individual reviews if provided
  if (reviews && reviews.length > 0) {
    schema.review = reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.reviewRating,
        "bestRating": 5,
        "worstRating": 1
      },
      "datePublished": review.datePublished
    }));
  }

  return schema;
}

// Sample reviews for rich snippets
export const featuredReviews: ReviewData[] = [
  {
    author: "Sadhna Sirin",
    reviewBody: "Dr. Shekhar Sir's conceptual teaching transformed my understanding of Biology. Scored 695/720 in NEET 2023 with perfect 360/360 in Biology!",
    reviewRating: 5,
    datePublished: "2023-07-15"
  },
  {
    author: "Rahul Sharma",
    reviewBody: "The small batch size meant I got personal attention whenever I was stuck. Best decision for my NEET preparation. Now at MAMC Delhi!",
    reviewRating: 5,
    datePublished: "2023-08-10"
  },
  {
    author: "Amit Verma",
    reviewBody: "Improved from 540 to 658 in one year! The doubt clearing sessions and daily practice questions made all the difference.",
    reviewRating: 5,
    datePublished: "2023-09-05"
  },
  {
    author: "Priya Gupta",
    reviewBody: "The dropper batch program is exceptional. The faculty understands the pressure and provides excellent support. JIPMER here I come!",
    reviewRating: 5,
    datePublished: "2023-09-20"
  },
  {
    author: "Neha Singh",
    reviewBody: "Online classes are just as effective as offline. The recorded lectures helped me revise before exams. Highly recommended!",
    reviewRating: 5,
    datePublished: "2023-10-15"
  }
];

/**
 * Generate Course rating schema for individual courses
 */
export function generateCourseRatingSchema(courseData: {
  name: string;
  description: string;
  provider: string;
  url: string;
  ratingValue: number;
  ratingCount: number;
  reviewCount: number;
  price: number;
  priceCurrency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseData.name,
    "description": courseData.description,
    "provider": {
      "@type": "Organization",
      "name": courseData.provider,
      "url": "https://cerebrumbiologyacademy.com"
    },
    "url": courseData.url,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": courseData.ratingValue,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": courseData.ratingCount,
      "reviewCount": courseData.reviewCount
    },
    "offers": {
      "@type": "Offer",
      "price": courseData.price,
      "priceCurrency": courseData.priceCurrency || "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    }
  };
}

// Pre-configured course ratings
export const courseRatings = {
  crashCourse: {
    name: "NEET 2026 Biology Crash Course",
    description: "Intensive 4-month NEET Biology preparation course with 200+ hours of live classes, complete study material, and 20 mock tests.",
    provider: "Cerebrum Biology Academy",
    url: "https://cerebrumbiologyacademy.com/courses/neet-crash-course",
    ratingValue: 4.9,
    ratingCount: 856,
    reviewCount: 612,
    price: 78000
  },
  twoYear: {
    name: "NEET 2027 Two-Year Program",
    description: "Comprehensive 2-year NEET Biology preparation for Class 11 students with integrated board exam preparation.",
    provider: "Cerebrum Biology Academy",
    url: "https://cerebrumbiologyacademy.com/courses/two-year-program",
    ratingValue: 4.9,
    ratingCount: 1245,
    reviewCount: 892,
    price: 58000
  },
  dropper: {
    name: "NEET Dropper Course",
    description: "Dedicated 1-year program for NEET repeaters with focused preparation, psychological support, and daily tests.",
    provider: "Cerebrum Biology Academy",
    url: "https://cerebrumbiologyacademy.com/courses/dropper-course",
    ratingValue: 4.8,
    ratingCount: 534,
    reviewCount: 398,
    price: 68000
  },
  foundation: {
    name: "Class 9-10 Biology Foundation",
    description: "Early foundation course to build strong Biology fundamentals for future NEET aspirants.",
    provider: "Cerebrum Biology Academy",
    url: "https://cerebrumbiologyacademy.com/courses/foundation",
    ratingValue: 4.9,
    ratingCount: 423,
    reviewCount: 298,
    price: 48000
  }
};
