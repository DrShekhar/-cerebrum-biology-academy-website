import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in USA",
  description: "AP Biology to NEET bridge coaching for NRI students in USA. 2 CBSE schools, 5.16M Indians. Pre-med pathway with 98% success rate.",
  openGraph: {
    title: "NEET Coaching for NRI Students in USA",
    description: "AP Biology to NEET bridge coaching for NRI students in USA. 2 CBSE schools, 5.16M Indians. Pre-med pathway with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-usa",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-usa.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in United States of America",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in USA",
    description: "AP Biology to NEET bridge coaching for NRI students in USA. 2 CBSE schools, 5.16M Indians. Pre-med pathway with 98% success rate.",
    creator: "@cerebrumbiology",
    site: "@cerebrumbiology",
    images: {
      url: "https://cerebrumbiologyacademy.com/og-neet-coaching-usa.jpg",
      alt: "NEET Coaching in United States of America",
    },
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
