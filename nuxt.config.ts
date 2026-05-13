import { fileURLToPath } from 'node:url';
import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  plugins: ['~/app/plugins/telegram.ts'],
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      title: 'MiniApp',
      script:
        process.env.NODE_ENV === 'production'
          ? [{ src: 'https://telegram.org/js/telegram-web-app.js', defer: true }]
          : [],
      htmlAttrs: { lang: 'ru' },
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
        },
      ],
    },
  },
  css: ['~/app/styles/index.css'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000',
      telegramFallbackUrl: process.env.NUXT_PUBLIC_TELEGRAM_FALLBACK_URL || '',
    },
  },
  dir: {
    public: './app/public',
    pages: './app/routes',
    assets: './shared/assets',
    layouts: './app/layouts',
    plugins: './app/plugins',
  },
  srcDir: 'src/',
  alias: {
    '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
    '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
    '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
    '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
});
