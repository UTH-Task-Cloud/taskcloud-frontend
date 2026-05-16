/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Thêm các cấu hình khác nếu cần
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
