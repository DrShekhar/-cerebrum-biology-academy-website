import { Metadata } from "next";
import PageContent from "./PageContent";
import LocalitySchema from "@/components/seo/LocalitySchema";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in Saudi Arabia | Cerebrum Biology Academy",
  description: "Expert NEET coaching for NRI students in Saudi Arabia. 42 CBSE schools, 2.6M Indians. IST-friendly evening batches with 98% success rate.",
  alternates: {
    canonical: "https://cerebrumbiologyacademy.com/neet-coaching-nri-saudi-arabia",
  },
  openGraph: {
    title: "NEET Coaching for NRI Students in Saudi Arabia | Cerebrum Biology Academy",
    description: "Expert NEET coaching for NRI students in Saudi Arabia. 42 CBSE schools, 2.6M Indians. IST-friendly evening batches with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-saudi-arabia",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-saudi-arabia.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in Saudi Arabia - Cerebrum Biology Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in Saudi Arabia | Cerebrum Biology Academy",
    description: "Expert NEET coaching for NRI students in Saudi Arabia. 42 CBSE schools, 2.6M Indians. IST-friendly evening batches with 98% success rate.",
    creator: "@cerebrumbiology",
    images: ["https://cerebrumbiologyacademy.com/og-neet-coaching-saudi-arabia.jpg"],
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
          "name": "Saudi Arabia"
        },
        "offers": {
          "@type": "EducationalOccupationalProgram",
          "name": "NEET Coaching",
          "description": "Comprehensive NEET preparation for Saudi Arabia students"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is NEET preparation necessary for Saudi Arabia students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, NEET is essential for admission to medical colleges in India. Our specialized coaching helps Saudi Arabia students master the NEET curriculum with Saudi Arabia-specific study schedules and exam center support."
            }
          },
          {
            "@type": "Question",
            "name": "What is your success rate for Saudi Arabia students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We maintain a 98% success rate for all students including Saudi Arabia NRI students. Many of our students secure admissions in top AIIMS and medical colleges."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer online coaching for students in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer both online and hybrid batches with flexible timings suitable for Saudi Arabia's timezone (AST)."
            }
          },
          {
            "@type": "Question",
            "name": "Can Saudi Arabia students take NEET exam in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide guidance for NEET exam registration and center allocation. Our exam centers are in Riyadh, Jeddah."
            }
          },
          {
            "@type": "Question",
            "name": "What about visa support for medical education?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Student visa sponsorship support for medical education in India"
            }
          },
          {
            "@type": "Question",
            "name": "How many students from Saudi Arabia study with us?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We have a thriving community of Saudi Arabia students with strong peer networks and regular success stories. Our community includes students from 42 CBSE schools."
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
            "name": "NEET Coaching in Saudi Arabia",
            "item": "https://cerebrumbiologyacademy.com/neet-coaching-nri-saudi-arabia"
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
        locality="Saudi Arabia"
        region="Saudi Arabia"
        country="Saudi Arabia"
      />
      <PageContent />
    </>
  );
}
