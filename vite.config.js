import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* eslint-env node */
/* global process */

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.NEWS_API_KEY || env.VITE_API_KEY;
  if (!apiKey) {
    console.warn('[vite proxy] Missing NEWS_API_KEY/VITE_API_KEY; /api/top-headlines will fail');
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/top-headlines': {
          target: 'https://newsapi.org',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/top-headlines/, '/v2/top-headlines'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
          if (apiKey) {
            proxyReq.setHeader('X-Api-Key', apiKey);
            proxyReq.setHeader('Authorization', `Bearer ${apiKey}`);
          }
            });
          },
        },
      },
    },
  };
})
