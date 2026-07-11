/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // German is the launch market and the default language.
    return [{ source: "/", destination: "/de", permanent: false }];
  },
};

export default nextConfig;
