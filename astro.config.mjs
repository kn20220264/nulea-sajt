import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.nulea.me',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});