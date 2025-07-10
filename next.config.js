/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure image domains for external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
    ],
  },
  // Ensure proper handling of dynamic APIs
  experimental: {
    // Enable server actions for proper async handling
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig;
