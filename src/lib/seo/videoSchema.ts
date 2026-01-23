// src/lib/seo/videoSchema.ts
// VideoObject Schema for Testimonial Videos - Enables Video Rich Snippets

interface VideoData {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string; // ISO 8601 format
  duration: string; // ISO 8601 duration format (e.g., "PT2M30S")
  contentUrl?: string;
  embedUrl?: string;
  transcript?: string;
}

/**
 * Generate VideoObject schema for testimonial videos
 * Enables video rich snippets in Google Search results
 */
export function generateVideoSchema(video: VideoData) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    ...(video.contentUrl && { "contentUrl": video.contentUrl }),
    ...(video.embedUrl && { "embedUrl": video.embedUrl }),
    ...(video.transcript && { "transcript": video.transcript }),
    "publisher": {
      "@type": "Organization",
      "name": "Cerebrum Biology Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cerebrumbiologyacademy.com/brain-logo.png"
      }
    }
  };
}

// Pre-configured testimonial videos
export const testimonialVideos: VideoData[] = [
  {
    name: "Sadhna Sirin - NEET 2023 Topper (695/720) | Cerebrum Biology Academy",
    description: "Sadhna Sirin shares her journey to scoring 695/720 in NEET 2023 with 100 percentile in Biology. Learn how Cerebrum Biology Academy's teaching methodology helped her achieve this remarkable score.",
    thumbnailUrl: "https://cerebrumbiologyacademy.com/video-thumbnails/sadhna-testimonial.jpg",
    uploadDate: "2023-07-15",
    duration: "PT4M30S",
    embedUrl: "https://www.youtube.com/embed/sadhna-testimonial"
  },
  {
    name: "Rahul Sharma - NEET 680/720 | MAMC Delhi | Cerebrum Student",
    description: "Rahul Sharma talks about his NEET preparation journey at Cerebrum Biology Academy and how he secured admission to Maulana Azad Medical College, Delhi.",
    thumbnailUrl: "https://cerebrumbiologyacademy.com/video-thumbnails/rahul-testimonial.jpg",
    uploadDate: "2023-08-10",
    duration: "PT3M45S",
    embedUrl: "https://www.youtube.com/embed/rahul-testimonial"
  },
  {
    name: "Priya Gupta - JIPMER Selection | Dropper Batch Success Story",
    description: "Priya Gupta shares how she improved her NEET score from 450 to 665 in just one year with Cerebrum's dropper batch and secured JIPMER Puducherry.",
    thumbnailUrl: "https://cerebrumbiologyacademy.com/video-thumbnails/priya-testimonial.jpg",
    uploadDate: "2023-09-05",
    duration: "PT5M15S",
    embedUrl: "https://www.youtube.com/embed/priya-testimonial"
  },
  {
    name: "Parent Testimonial - Why We Chose Cerebrum Biology Academy",
    description: "Parents share their experience with Cerebrum Biology Academy - from small batch sizes to personalized attention and consistent communication about student progress.",
    thumbnailUrl: "https://cerebrumbiologyacademy.com/video-thumbnails/parent-testimonial.jpg",
    uploadDate: "2023-10-20",
    duration: "PT3M00S",
    embedUrl: "https://www.youtube.com/embed/parent-testimonial"
  }
];

/**
 * Generate all video schemas for the testimonials page
 */
export function generateAllVideoSchemas() {
  return testimonialVideos.map(video => generateVideoSchema(video));
}
