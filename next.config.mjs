/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages root deployment (resysvitro.github.io)
  // basePath: '',
  // assetPrefix: '',
};

export default nextConfig;
