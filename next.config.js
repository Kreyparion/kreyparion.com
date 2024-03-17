module.exports = {
  reactStrictMode: true,
  async rewrites() {
      return [
          {
              source: '/robots.txt',
              destination: '/api/robots'
          }
      ];
  },
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};
