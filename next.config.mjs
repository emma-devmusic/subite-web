/** @type {import('next').NextConfig} */
const nextConfig = {
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
            }
        ]
    }
};

export default nextConfig;
