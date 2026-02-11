import { Metadata } from "next";
import PageContent from "./PageContent";
import LocalitySchema from "@/components/seo/LocalitySchema";

export const metadata: Metadata = {
  title: "NEET Coaching for Nepali Students | Cerebrum Biology Academy",
  description: "NEET coaching for Nepali students. NEET is the primary exam for medical education. 98% success rate with Nepali curriculum bridge.",
  alternates: {
    canonical: "https://cerebrumbiologyacademy.com/neet-coaching-nri-nepal",
  },
  openGraph: {
    title: "NEET Coaching for Nepali Students | Cerebrum Biology Academy",
    description: "NEET coaching for Nepali students. NEET is the primary exam for medical education. 98% success rate with Nepali curriculum bridge.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-nepal",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-nepal.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in Nepal - Cerebrum Biology Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for Nepali Students | Cerebrum Biology Academy",
    description: "NEET coaching for Nepali students. NEET is the primary exam for medical education. 98% success rate with Nepali curriculum bridge.",
    creator: "@cerebrumbiology",
    images: ["https://cerebrumbiologyacademy.com/og-neet-coaching-nepal.jpg"],
  },
};

export default function Page() {
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://cerebrumbiologyacademy.com/#organization",
        "name": "Cerebrum Biology Academy",
        "url": "https://cerebrumbiologyacademy.com",
        "logo": "https://cerebrumbiologyacademy.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/cerebrumbiology",
          "https://www.youtube.com/cerebrumbiology",
          "https://www.instagram.com/cerebrumbiology"
        ],
        "foundingDate": "2010",
        "description": "Expert NEET coaching for NRI students with 98% success rate",
        "telephone": "+918826444334",
        "areaServed": {
          "@type": "City",
          "name": "Nepal"
        },
        "offers": {
          "@type": "EducationalOccupationalProgram",
          "name": "NEET Coaching",
          "description": "Comprehensive NEET preparation for Nepal students"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is NEET preparation necessary for Nepal students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, NEET is essential for admission to medical colleges in India. Our specialized coaching helps Nepal students master the NEET curriculum with Nepal-specific study schedules and exam center support."
            }
          },
          {
            "@type": "Question",
            "name": "What is your success rate for Nepal students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We maintain a 98% success rate for all students including Nepal NRI students. Many of our students secure admissions in top AIIMS and medical colleges."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer online coaching for students in Nepal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer both online and hybrid batches with flexible timings suitable for Nepal's timezone (NPT)."
            }
          },
          {
            "@type": "Question",
            "name": "Can Nepal students take NEET exam in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide guidance for NEET exam registration and center allocation. Our exam centers are in Kathmandu, Pokhara."
            }
          },
          {
            "@type": "Question",
            "name": "What about visa support for medical education?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NEET exam registration and medical education in India support"
            }
          },
          {
            "@type": "Question",
            "name": "How many students from Nepal study with us?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We have a thriving community of Nepal students with strong peer networks and regular success stories. Our community includes students from 15 CBSE schools."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://cerebrumbiologyacademy.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "NRI Coaching",
            "item": "https://cerebrumbiologyacademy.com/nri-coaching"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "NEET Coaching in Nepal",
            "item": "https://cerebrumbiologyacademy.com/neet-coaching-nri-nepal"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <LocalitySchema
        locality="Nepal"
        region="Nepal"
        country="Nepal"
      />
      <PageContent />
    </>
  );
}
