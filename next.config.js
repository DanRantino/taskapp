/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'aawymplufqwhncayzxfa.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
