import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in Oman",
  description: "NEET coaching for NRI students in Oman. 20 CBSE schools, 900K Indians. Relaxed learning environment with 98% success rate.",
  openGraph: {
    title: "NEET Coaching for NRI Students in Oman",
    description: "NEET coaching for NRI students in Oman. 20 CBSE schools, 900K Indians. Relaxed learning environment with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-oman",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-oman.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in Oman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in Oman",
    description: "NEET coaching for NRI students in Oman. 20 CBSE schools, 900K Indians. Relaxed learning environment with 98% success rate.",
    creator: "@cerebrumbiology",
    site: "@cerebrumbiology",
    images: {
      url: "https://cerebrumbiologyacademy.com/og-neet-coaching-oman.jpg",
      alt: "NEET Coaching in Oman",
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
