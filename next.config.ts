import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const hasGitHubPagesCustomDomain = process.env.GITHUB_PAGES_CUSTOM_DOMAIN === "true";
const repositoryBasePath = isGitHubPages && !hasGitHubPagesCustomDomain ? "/Alvin-CV" : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: repositoryBasePath,
  assetPrefix: repositoryBasePath,
  trailingSlash: isGitHubPages,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: repositoryBasePath,
    NEXT_PUBLIC_SITE_URL: isGitHubPages && hasGitHubPagesCustomDomain
      ? "https://alvin-cv.online/"
      : isGitHubPages
        ? "https://dangerous83.github.io/Alvin-CV/"
        : "https://www.alvinjampazar.com/",
  },
};

export default nextConfig;
