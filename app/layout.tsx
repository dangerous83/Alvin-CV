import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "www.alvinjampazar.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title: {
      default: "Alvin Jampazar — Senior Graphic Designer & AI Specialist",
      template: "%s",
    },
    description: "Professional web CV for Alvin Jampazar — a Dubai-based Senior Graphic Designer, Marketing Manager, and AI Specialist with 12+ years of UAE experience.",
    keywords: ["Alvin Jampazar", "graphic designer Dubai", "AI specialist", "motion designer", "web designer", "brand identity"],
    icons: { icon: "/og.png", shortcut: "/og.png" },
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
