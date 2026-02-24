import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in Qatar",
  description: "NEET coaching for NRI students in Qatar. 12 CBSE schools, 700K Indian expatriates. Expert guidance for high-achieving students with 98% success rate.",
  openGraph: {
    title: "NEET Coaching for NRI Students in Qatar",
    description: "NEET coaching for NRI students in Qatar. 12 CBSE schools, 700K Indian expatriates. Expert guidance for high-achieving students with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-qatar",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-qatar.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in Qatar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in Qatar",
    description: "NEET coaching for NRI students in Qatar. 12 CBSE schools, 700K Indian expatriates. Expert guidance for high-achieving students with 98% success rate.",
    creator: "@cerebrumbiology",
    site: "@cerebrumbiology",
    images: {
      url: "https://cerebrumbiologyacademy.com/og-neet-coaching-qatar.jpg",
      alt: "NEET Coaching in Qatar",
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
