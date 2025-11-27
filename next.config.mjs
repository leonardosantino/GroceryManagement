/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1ydsymtw7g9uq.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
