/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/intro_k_pub_bucket/**',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
