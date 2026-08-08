import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryBasePath = "/Alvin-CV";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? repositoryBasePath : "",
  assetPrefix: isGitHubPages ? repositoryBasePath : "",
  trailingSlash: isGitHubPages,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? repositoryBasePath : "",
    NEXT_PUBLIC_SITE_URL: isGitHubPages
      ? "https://dangerous83.github.io/Alvin-CV/"
      : "https://www.alvinjampazar.com/",
  },
};

export default nextConfig;
