/** @type {import('next').NextConfig} */

// When deploying to GitHub Pages the site is served from a repo subpath
// (e.g. https://<user>.github.io/community/). Set NEXT_PUBLIC_BASE_PATH to
// that subpath in CI; leave it empty for local dev and root-domain hosts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Fully static site — no server runtime, deployable to any static host.
  output: "export",
  reactStrictMode: true,
  basePath,
  images: {
    // next/image optimization requires a server; disable for static export.
    unoptimized: true,
  },
  // Lessons use dynamic routes; trailingSlash keeps static export paths clean.
  trailingSlash: true,
};

export default nextConfig;
