/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React Strict Mode
    reactStrictMode: true,

    // Custom Webpack configuration (if needed)
    webpack: (config) => {
        // Add any custom rules or plugins here if necessary
        return config;
    },

    // Add any custom headers or rewrites if necessary
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Custom-Header',
                        value: 'my-value',
                    },
                ],
            },
        ];
    },

    experimental: {
    },

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/:path*'
            }
        ]
    },

    env: {
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
    }
};

module.exports = nextConfig;
