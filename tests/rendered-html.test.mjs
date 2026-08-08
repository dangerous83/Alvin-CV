import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished professional CV home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Alvin Jampazar/);
  assert.match(html, /Design systems, brand worlds &amp; AI-powered growth/);
  assert.match(html, /Fourteen disciplines/);
  assert.match(html, /Alvin_Jampazar_Web_CV\.pdf/);
  assert.match(html, /alvinjampazar1983@gmail\.com/);
  assert.match(html, /\+971 52 223 5776/);
  assert.match(html, /alcon-online\.site/);
  assert.match(html, /Watch my AI showreel/);
  assert.match(html, /showreel-dialog/);
  assert.match(html, /wa\.me\/971522235776\?text=/);
  assert.match(html, /Chat with Alvin on WhatsApp/);
  assert.match(html, /brand-emblem/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
  assert.doesNotMatch(html, /\+971 56 164 3886/);

  const showreelSource = await readFile(new URL("../app/VideoShowcase.tsx", import.meta.url), "utf8");
  assert.match(showreelSource, /18GJ3DqkmJ74fqnftsBVXBSbLeZHDVrla\/preview/);
});

test("renders every requested expertise page", async () => {
  const slugs = [
    "graphic-design", "ai-specialist", "motion-design", "2d-animation", "3d-animation",
    "web-developer", "ui-ux", "photographer", "videography", "photo-video-editing",
    "social-media-management", "platforms", "brand-identity", "ai-video",
  ];

  for (const slug of slugs) {
    const response = await render(`/work/${slug}`);
    assert.equal(response.status, 200, `Expected /work/${slug} to render`);
    const html = await response.text();
    assert.match(html, /View original portfolio/);
    assert.match(html, /The process/);
    assert.match(html, /Download my CV/);
    if (["web-developer", "photographer", "platforms", "ai-video"].includes(slug)) {
      assert.match(html, new RegExp(`skill-${slug === "photographer" ? "photography" : slug}\\.png`));
    }
  }
});
