import type { Metadata } from "next";
import "./globals.css";

export function generateMetadata(): Metadata {
  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.alvinjampazar.com/");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const socialImage = new URL(`${basePath}/og.png`, base.origin).toString();

  return {
    metadataBase: base,
    title: {
      default: "Alvin Jampazar — Senior Graphic Designer & AI Specialist",
      template: "%s",
    },
    description: "Professional web CV for Alvin Jampazar — a Dubai-based Senior Graphic Designer, Marketing Manager, and AI Specialist with 12+ years of UAE experience.",
    keywords: ["Alvin Jampazar", "graphic designer Dubai", "AI specialist", "motion designer", "web designer", "brand identity"],
    icons: { icon: `${basePath}/og.png`, shortcut: `${basePath}/og.png` },
    openGraph: {
      type: "website",
      title: "Alvin Jampazar — Graphic Design × AI Systems",
      description: "12+ years creating brand identities, campaigns, motion, digital products, and AI-powered growth systems in the UAE.",
      images: [{ url: socialImage, width: 1734, height: 907, alt: "Alvin Jampazar — Graphic Design and AI Systems" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Alvin Jampazar — Graphic Design × AI Systems",
      description: "Senior Graphic Designer, Marketing Manager, and AI Specialist in Dubai.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
