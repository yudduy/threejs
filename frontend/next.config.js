// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*', // This will use the same domain in production
            }
        ]
    }
}

module.exports = nextConfig