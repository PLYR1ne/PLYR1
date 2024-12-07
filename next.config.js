/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment Variables
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
  },

  // Image Configuration
  images: {
    domains: [
      'your-image-domain.com',
      'localhost'
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // API Routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ]
  },

  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Webpack Configuration
  webpack: (config, { dev, isServer }) => {
    // Custom webpack configs
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    return config;
  },

  // Experimental Features
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig 