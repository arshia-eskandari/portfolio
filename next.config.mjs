/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.HOST_NAME,
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
