import { Metadata } from "next";
import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "NEET Coaching in Melbourne, Australia | Cerebrum Biology Academy",
  description: "Expert NEET coaching for Melbourne, Australia students. 98% success rate. Dr. Shekhar C Singh's specialized curriculum. Join 50+ top scorers.",
  keywords: "NEET coaching melbourne, NEET classes melbourne, medical entrance exam melbourne, biology coaching melbourne, Cerebrum Biology Academy melbourne",
  openGraph: {
    title: "NEET Coaching in Melbourne, Australia | Cerebrum Biology Academy",
    description: "98% Success Rate. Expert NEET coaching by Dr. Shekhar C Singh. Call +918826444334 for free counseling.",
    url: `https://cerebrumbiologyacademy.com/cities/neet-coaching-melbourne-australia`,
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-melbourne-australia.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching Melbourne"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching in Melbourne, Australia",
    description: "98% success rate with Dr. Shekhar C Singh. Limited seats available!",
    creator: "@cerebrumacademy",
    images: ["https://cerebrumbiologyacademy.com/twitter-neet-coaching-melbourne-australia.jpg"]
  }
};

export default function Page() {
  return <PageContent />;
}
