import type { BuildConfig } from './src/config';

const config: BuildConfig = {
  target: 'bun',
  minify: true,
  entrypoints: ['./src/index.ts'],
};

export default config;
