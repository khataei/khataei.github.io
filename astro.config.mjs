import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://khataei.github.io',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
