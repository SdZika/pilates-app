declare module 'next-pwa' {
          import { NextConfig } from 'next';
        
          interface PWAOptions {
            dest: string;
            register?: boolean;
            skipWaiting?: boolean;
            disable?: boolean;
            [key: string]: unknown;
          }
        
          const withPWA: (options: PWAOptions) => (nextConfig: NextConfig) => NextConfig;
        
          export default withPWA;
        }
        