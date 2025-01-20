import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Игнорировать ошибки ESLint во время сборки
    },
  /* config options here */
};

export default nextConfig;
