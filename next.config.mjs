/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 以下ドメインへアクセスすることを許可します。
    domains: [
        'images.unsplash.com', 
        'plus.unsplash.com', 
        'storage.googleapis.com',
        'asia-northeast1-cobalt-list-386722.cloudfunctions.net'
    ]
},
  reactStrictMode: true,
};

export default nextConfig;
