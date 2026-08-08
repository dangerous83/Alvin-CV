import Link from "next/link";
import type { ReactNode } from "react";
import type { WorkItem } from "./data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function BrandMark() {
  return (
    <span className="brand-mark brand-emblem" aria-hidden="true">
      <span className="emblem-a">A</span>
      <span className="emblem-j">J</span>
      <i />
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Alvin Jampazar home">
        <BrandMark />
        <span className="brand-copy">
          <strong>Alvin Jampazar</strong>
          <small>Design × AI</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        <Link href="/#work">Expertise</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <a className="header-cta" href={`${basePath}/Alvin_Jampazar_Web_CV.pdf`} download>
        Download CV <span aria-hidden="true">↓</span>
      </a>
    </header>
  );
}

export function SectionHeading({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <p className="kicker">{kicker}</p>
      <div>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  );
}

export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <Link className="work-card" href={`/work/${item.slug}`}>
      <div className="work-card-image">
        <img src={item.heroImage} alt={item.imageAlt} loading="lazy" />
        <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="work-card-copy">
        <span>{item.category}</span>
        <h3>{item.navLabel}</h3>
        <p>{item.summary}</p>
        <strong>View expertise <span aria-hidden="true">↗</span></strong>
      </div>
    </Link>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

export function SiteFooter() {
  return (
    <>
    <a
      className="whatsapp-widget"
      href="https://wa.me/971522235776?text=Hello%20Alvin%2C%20I%27d%20like%20to%20discuss%20a%20creative%20project."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Alvin on WhatsApp"
    >
      <span aria-hidden="true">WA</span>
      <strong>Let&apos;s talk</strong>
    </a>
    <footer className="site-footer">
      <div className="footer-cta">
        <p className="kicker">The complete portfolio</p>
        <h2>Need the detailed CV?</h2>
        <p>Download the premium editorial CV with career highlights, capabilities, selected work, and direct portfolio links.</p>
        <a className="button button-light" href={`${basePath}/Alvin_Jampazar_Web_CV.pdf`} download>
          Download my CV <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="footer-bottom">
        <div>
          <BrandMark />
          <p>Senior Graphic Designer · Marketing Manager · AI Specialist</p>
        </div>
        <div className="footer-links">
          <a href="mailto:alvinjampazar1983@gmail.com">Email</a>
          <a href="https://www.alvinjampazar.com" target="_blank" rel="noreferrer">Portfolio ↗</a>
          <a href="https://www.alcon-online.site/" target="_blank" rel="noreferrer">Alcon ↗</a>
        </div>
        <p>Dubai, UAE · © 2026 Alvin Jampazar</p>
      </div>
    </footer>
    </>
  );
}
