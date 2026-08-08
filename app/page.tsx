import Link from "next/link";
import { SiteFooter, SiteHeader, SectionHeading, Pill } from "./components";
import { SkillExplorer } from "./SkillExplorer";
import { experience } from "./data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const clientNames = [
  "ADNOC",
  "TADWEER",
  "ITSEC",
  "SECUREVISA",
  "TRADEBANK",
  "EXCEL PIXEL",
  "ENVIRONMENT AGENCY",
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="availability"><span /> Available for select projects · Dubai / Worldwide</p>
          <h1 id="hero-title">Design systems, brand worlds &amp; AI-powered growth.</h1>
          <p className="hero-lede">
            I&apos;m Alvin Jampazar — a Senior Graphic Designer, Marketing Manager, and AI Specialist with 12+ years shaping brands across the UAE.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore expertise <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="https://www.alvinjampazar.com" target="_blank" rel="noreferrer">View full portfolio <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-stats" aria-label="Career statistics">
            <div><strong>12+</strong><span>Years in UAE</span></div>
            <div><strong>700+</strong><span>Projects delivered</span></div>
            <div><strong>150+</strong><span>Clients &amp; brands</span></div>
          </div>
        </div>
        <div className="hero-art">
          <img src={`${basePath}/og.png`} alt="Alvin Jampazar — Graphic Design and AI Systems" />
          <div className="hero-art-note">
            <span>Creative direction</span>
            <span>AI systems</span>
            <span>Brand growth</span>
          </div>
        </div>
      </section>

      <div className="client-strip" aria-label="Selected clients">
        <span>Selected experience</span>
        <div>{clientNames.map((name) => <strong key={name}>{name}</strong>)}</div>
      </div>

      <section className="profile-section section-shell" id="profile">
        <SectionHeading
          kicker="01 / Profile"
          title="Creative leadership with production depth."
          copy="A multidisciplinary career built from hands-on print production to brand strategy, motion, AI content, and live digital products."
        />
        <div className="profile-grid">
          <div className="profile-portrait">
            <img src={`${basePath}/alvin-profile.jpg`} alt="Professional portrait of Alvin Jampazar" />
            <p>Based in Dubai, UAE<br />Working worldwide</p>
          </div>
          <div className="profile-copy">
            <p className="large-copy">
              I translate complex business goals into visual experiences people can understand, trust, and remember.
            </p>
            <p>
              Across Dubai and Abu Dhabi, I&apos;ve led creative work for government initiatives, cybersecurity, finance, business consultancy, real estate, hospitality, food, fashion, and technology. My practice connects strategy and craft — from the first idea to the final campaign, platform, film, or printed piece.
            </p>
            <div className="pill-row">
              <Pill>Creative Direction</Pill><Pill>Graphic Design</Pill><Pill>AI Marketing</Pill><Pill>Web &amp; Platforms</Pill><Pill>Motion</Pill>
            </div>
          </div>
        </div>
      </section>

      <section className="work-section section-shell" id="work">
        <SectionHeading
          kicker="02 / Expertise"
          title="Fourteen disciplines. One coherent creative practice."
          copy="Filter the interactive CV by discipline, then open any area for a focused capability page, process, tools, and portfolio link."
        />
        <SkillExplorer />
      </section>

      <section className="impact-section section-shell">
        <SectionHeading
          kicker="03 / Selected impact"
          title="Built for the real world."
          copy="The work moves between public-sector clarity, premium brand craft, conversion-focused websites, and emerging AI production."
        />
        <div className="impact-grid">
          <article className="impact-card impact-maroon">
            <span>Government &amp; enterprise</span>
            <h3>Complex initiatives, made clear.</h3>
            <p>Six years of Abu Dhabi experience supporting ADNOC, the Ministry of Education, ADSSC, Tadweer, and the Environment Agency.</p>
            <strong>Public-sector visual communication</strong>
          </article>
          <article className="impact-card impact-image">
            <img src="https://www.alvinjampazar.com/assets/hero-uiux-DEo5cuXO.jpg" alt="Layered digital interface work" loading="lazy" />
            <div><span>Web &amp; product</span><h3>Live platforms that turn attention into action.</h3></div>
          </article>
          <article className="impact-card impact-dark">
            <span>AI creative lab</span>
            <h3>Faster production. Stronger direction.</h3>
            <p>AI storyboards, image-to-video, campaign personalization, automation, and custom platforms shaped by senior creative judgment.</p>
            <Link href="/work/ai-specialist">Explore AI expertise <span aria-hidden="true">↗</span></Link>
          </article>
        </div>
      </section>

      <section className="experience-section section-shell" id="experience">
        <SectionHeading
          kicker="04 / Experience"
          title="From production floor to creative leadership."
          copy="Every role added another layer: print discipline, visual identity, animation, 3D, UI/UX, photography, marketing, web, and AI."
        />
        <div className="timeline">
          {experience.map((item, index) => (
            <article className="timeline-item" key={item.company}>
              <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
              <div><p>{item.place}</p><h3>{item.role}</h3><strong>{item.company}</strong></div>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tools-section section-shell">
        <SectionHeading kicker="05 / Toolkit" title="Craft meets new capability." />
        <div className="tool-cloud" aria-label="Creative and AI tools">
          {[
            "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "InDesign", "Lightroom",
            "Cinema 4D", "Lumion", "Figma", "Webflow", "ChatGPT", "Midjourney", "Runway", "Kling AI",
          ].map((tool) => <span key={tool}>{tool}</span>)}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="kicker">06 / Contact</p>
          <h2>Let&apos;s make the next thing impossible to ignore.</h2>
          <p>Brand identity, AI creative systems, digital platforms, motion, campaigns, and senior creative direction.</p>
          <a className="button button-light" href="mailto:alvinjampazar1983@gmail.com">Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
        <div className="contact-details">
          <a href="mailto:alvinjampazar1983@gmail.com"><span>Email</span><strong>alvinjampazar1983@gmail.com</strong></a>
          <a href="https://wa.me/971522235776" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>+971 52 223 5776</strong></a>
          <div><span>Location</span><strong>Dubai, UAE</strong></div>
          <a href="https://www.linkedin.com/in/alvin-jampazar-306064202/" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Professional profile ↗</strong></a>
          <a href="https://www.alvinjampazar.com" target="_blank" rel="noreferrer"><span>Main portfolio</span><strong>alvinjampazar.com ↗</strong></a>
          <a href="https://www.alcon-online.site/" target="_blank" rel="noreferrer"><span>Creative intelligence</span><strong>alcon-online.site ↗</strong></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
