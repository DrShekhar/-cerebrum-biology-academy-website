import { Metadata } from "next";
import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "NEET Coaching in Sydney, Australia",
  description: "Expert NEET coaching for Sydney, Australia students. 98% success rate. Dr. Shekhar C Singh's specialized curriculum. Join 50+ top scorers.",
  keywords: "NEET coaching sydney, NEET classes sydney, medical entrance exam sydney, biology coaching sydney, Cerebrum Biology Academy sydney",
  openGraph: {
    title: "NEET Coaching in Sydney, Australia",
    description: "98% Success Rate. Expert NEET coaching by Dr. Shekhar C Singh. Call +918826444334 for free counseling.",
    url: `https://cerebrumbiologyacademy.com/cities/neet-coaching-sydney-australia`,
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-sydney-australia.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching Sydney"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching in Sydney, Australia",
    description: "98% success rate with Dr. Shekhar C Singh. Limited seats available!",
    creator: "@cerebrumacademy",
    images: ["https://cerebrumbiologyacademy.com/twitter-neet-coaching-sydney-australia.jpg"]
  }
};

export default function Page() {
  return <PageContent />;
}
