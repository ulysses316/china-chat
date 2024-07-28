/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/socket.io/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
