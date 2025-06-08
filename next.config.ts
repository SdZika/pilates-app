import type { NextConfig } from "next";
import withPWA from "next-pwa";
import createNextIntlPlugin from 'next-intl/plugin';

const withPWANext = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // other Next.js settings if needed
};

const withNextIntl = createNextIntlPlugin();

export default withPWANext(withNextIntl(nextConfig));
