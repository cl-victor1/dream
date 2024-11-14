/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;