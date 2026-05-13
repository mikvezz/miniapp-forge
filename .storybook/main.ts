import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import { mergeConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '..');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: false,
    },
  },
  async viteFinal(config) {
    const src = path.resolve(root, 'src');
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          '~': src,
          '@shared': path.resolve(src, 'shared'),
          '@entities': path.resolve(src, 'entities'),
          '@features': path.resolve(src, 'features'),
          '@widgets': path.resolve(src, 'widgets'),
          '@pages': path.resolve(src, 'pages'),
        },
      },
    });
  },
};

export default config;
