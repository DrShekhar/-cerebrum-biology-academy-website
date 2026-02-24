import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in Singapore",
  description: "NEET coaching for NRI students in Singapore. 4 CBSE schools, 600K Indians. Bridge from IB/IGCSE to NEET with 98% success rate.",
  openGraph: {
    title: "NEET Coaching for NRI Students in Singapore",
    description: "NEET coaching for NRI students in Singapore. 4 CBSE schools, 600K Indians. Bridge from IB/IGCSE to NEET with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-singapore",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-singapore.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in Singapore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in Singapore",
    description: "NEET coaching for NRI students in Singapore. 4 CBSE schools, 600K Indians. Bridge from IB/IGCSE to NEET with 98% success rate.",
    creator: "@cerebrumbiology",
    site: "@cerebrumbiology",
    images: {
      url: "https://cerebrumbiologyacademy.com/og-neet-coaching-singapore.jpg",
      alt: "NEET Coaching in Singapore",
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
