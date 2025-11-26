/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
