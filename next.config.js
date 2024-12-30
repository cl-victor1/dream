/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./app/i18n.ts');

const nextConfig = {
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  }
};

module.exports = withNextIntl(nextConfig);