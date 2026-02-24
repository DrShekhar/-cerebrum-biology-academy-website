import { Metadata } from "next";
import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "NEET Coaching in Vancouver, Canada",
  description: "Expert NEET coaching for Vancouver, Canada students. 98% success rate. Dr. Shekhar C Singh's specialized curriculum. Join 50+ top scorers.",
  keywords: "NEET coaching vancouver, NEET classes vancouver, medical entrance exam vancouver, biology coaching vancouver, Cerebrum Biology Academy vancouver",
  openGraph: {
    title: "NEET Coaching in Vancouver, Canada",
    description: "98% Success Rate. Expert NEET coaching by Dr. Shekhar C Singh. Call +918826444334 for free counseling.",
    url: `https://cerebrumbiologyacademy.com/cities/neet-coaching-vancouver-canada`,
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-vancouver-canada.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching Vancouver"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching in Vancouver, Canada",
    description: "98% success rate with Dr. Shekhar C Singh. Limited seats available!",
    creator: "@cerebrumacademy",
    images: ["https://cerebrumbiologyacademy.com/twitter-neet-coaching-vancouver-canada.jpg"]
  }
};

export default function Page() {
  return <PageContent />;
}
