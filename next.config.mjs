/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "http://localhost:3001/socket.io/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
