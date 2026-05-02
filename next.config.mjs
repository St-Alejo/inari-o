/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "three"],
  },
  // Compress responses
  compress: true,
  // Power by header disabled for security
  poweredByHeader: false,
};

export default nextConfig;
