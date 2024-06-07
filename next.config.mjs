/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'demo.themesberg.com'
            },
            {
                protocol: 'https',
                hostname: 'user-images.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'tailwindui.com'
            },
            {
                protocol: 'https',
                hostname: 'auctionpublic.s3.amazonaws.com'
            },
        ]
    }
};

export default nextConfig;
