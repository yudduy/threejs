// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
        console.log('Backend URL:', backendUrl) // For debugging
        
        return [
            {
                source: '/api/:path*',
                destination: `${backendUrl}/api/:path*`,
            }
        ]
    }
}

module.exports = nextConfig