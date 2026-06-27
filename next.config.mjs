/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site — no server runtime, deployable to any static host.
  output: "export",
  reactStrictMode: true,
  images: {
    // next/image optimization requires a server; disable for static export.
    unoptimized: true,
  },
  // Lessons use dynamic routes; trailingSlash keeps static export paths clean.
  trailingSlash: true,
};

export default nextConfig;
