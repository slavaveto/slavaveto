import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Игнорировать ошибки ESLint во время сборки
    },
    images: {
        domains: ['storage.googleapis.com'], // Добавьте ваш хост
    },
  /* config options here */
};

export default nextConfig;
