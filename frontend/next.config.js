/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React Strict Mode
    reactStrictMode: true,

    // Custom Webpack configuration (if needed)
    webpack: (config) => {
        // Add any custom rules or plugins here if necessary
        return config;
    },

    // Add any custom headers if necessary
    async headers() {
        return [
            {
                source: '/(.*)',  // This matches all routes
                headers: [
                    {
                        key: 'X-Custom-Header',
                        value: 'my-value',
                    },
                ],
            },
        ];
    },
    
    // Rewrites to route API calls to the backend server
    async rewrites() {
        return [
            // This ensures that API requests are forwarded to the backend
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
            },
        ];
    },

    // Environment Variables
    env: {
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
    },

    // You can include experimental features if needed
    experimental: {
        // exampleFeature: true,  // Example of experimental feature
    },
};

module.exports = nextConfig;