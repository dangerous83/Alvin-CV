import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pill, SiteFooter, SiteHeader } from "../../components";
import { workBySlug, workItems } from "../../data";

export const dynamicParams = false;

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = workBySlug[slug];
  if (!item) return {};
  return {
    title: `${item.title} — Alvin Jampazar`,
    description: item.summary,
  };
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = workBySlug[slug];
  if (!item) notFound();

  const related = workItems
    .filter((candidate) => candidate.slug !== item.slug && candidate.category === item.category)
    .slice(0, 3);

  return (
    <main>
      <SiteHeader />
      <article className="detail-page">
        <header className="detail-hero">
          <div className="detail-hero-copy">
            <Link className="back-link" href="/#work"><span aria-hidden="true">←</span> All expertise</Link>
            <p className="kicker">{item.category} / {item.eyebrow}</p>
            <h1>{item.title}</h1>
            <p className="detail-summary">{item.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={item.sourceUrl} target="_blank" rel="noreferrer">
                View original portfolio <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="mailto:alvinjampazar1983@gmail.com">Discuss a project <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="detail-hero-image">
            <img src={item.heroImage} alt={item.imageAlt} />
            <span>{String(workItems.indexOf(item) + 1).padStart(2, "0")} / {String(workItems.length).padStart(2, "0")}</span>
          </div>
        </header>

        <section className="detail-intro">
          <p className="kicker">The practice</p>
          <p>{item.intro}</p>
          <div className="pill-row">{item.tools.map((tool) => <Pill key={tool}>{tool}</Pill>)}</div>
        </section>

        <section className="detail-columns">
          <div>
            <p className="kicker">Core capabilities</p>
            <ol className="numbered-list">
              {item.capabilities.map((capability, index) => (
                <li key={capability}><span>{String(index + 1).padStart(2, "0")}</span><strong>{capability}</strong></li>
              ))}
            </ol>
          </div>
          <div className="proof-card">
            <p className="kicker">Built on experience</p>
            {item.proof.map((proof) => <p key={proof}><span aria-hidden="true">✦</span>{proof}</p>)}
          </div>
        </section>

        <section className="process-section">
          <div className="process-title">
            <p className="kicker">The process</p>
            <h2>Clear thinking.<br />Precise making.</h2>
          </div>
          <div className="process-grid">
            {item.process.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section" aria-label={`${item.title} gallery`}>
          {item.gallery.map((image, index) => (
            <figure key={image.src} className={index === 0 ? "gallery-feature" : ""}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{image.alt}</figcaption>
            </figure>
          ))}
        </section>

        <section className="detail-cta">
          <p className="kicker">Go deeper</p>
          <h2>See the work in context.</h2>
          <p>The original portfolio contains expanded examples, motion, and project-specific visuals for this discipline.</p>
          <a className="button button-light" href={item.sourceUrl} target="_blank" rel="noreferrer">
            Open {item.navLabel} portfolio <span aria-hidden="true">↗</span>
          </a>
        </section>

        {related.length ? (
          <section className="related-section">
            <p className="kicker">Continue exploring</p>
            <div>
              {related.map((candidate) => (
                <Link key={candidate.slug} href={`/work/${candidate.slug}`}>
                  <span>{candidate.category}</span><strong>{candidate.navLabel}</strong><i aria-hidden="true">↗</i>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <SiteFooter />
    </main>
  );
}
