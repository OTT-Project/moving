import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'], // 외부 이미지 도메인 추가
  },
  webpack: (config) => {
    // @svgr/webpack 설정 추가
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Path Alias 설정 추가
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/icons': path.resolve(__dirname, 'public/icons'), // public/icons alias 추가
    };

    return config;
  },
};

export default nextConfig;
