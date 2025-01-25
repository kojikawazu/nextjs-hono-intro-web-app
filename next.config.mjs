/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/intro_k_pub_bucket/**',
      },
      {
        protocol: 'https',
        hostname: 'asia-northeast1-cobalt-list-386722.cloudfunctions.net',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
