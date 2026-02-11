import { Metadata } from "next";
import { LocalitySchema } from "@/components/seo/LocalitySchema";

export const metadata: Metadata = {
  title: "NEET Coaching in Sydney, Australia | Cerebrum Biology Academy",
  description: "Expert NEET coaching for Sydney, Australia students. 98% success rate with Dr. Shekhar C Singh. WhatsApp: 918826444334",
  keywords: "NEET coaching sydney, sydney NEET classes, medical coaching sydney, NEET australia",
  openGraph: {
    title: "NEET Coaching in Sydney, Australia",
    description: "98% Success Rate | Expert NEET Coaching by Dr. Shekhar C Singh",
    url: `https://cerebrumbiologyacademy.com/cities/neet-coaching-sydney-australia`,
    siteName: "Cerebrum Biology Academy",
    type: "website",
    locale: "en_AU"
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching in Sydney, Australia",
    description: "98% success rate. Dr. Shekhar C Singh. Free counseling +918826444334",
    creator: "@cerebrumacademy",
    site: "@cerebrumacademy"
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/cities/neet-coaching-sydney-australia`
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  }
};

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalitySchema 
        cityName="Sydney"
        country="Australia"
        latitude=-33.8688
        longitude=151.2093
        phone="+918826444334"
        whatsapp="918826444334"
        email="info@cerebrumbiologyacademy.com"
        website="https://cerebrumbiologyacademy.com"
      />
      {children}
    </>
  );
}
