import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        useCache: true,
        optimizePackageImports: ['framer-motion', 'lucide-react'],
    },
    images: {
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 86400,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error']
        } : false,
    },
};

export default nextConfig;
