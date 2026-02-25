import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [vue(), vueDevTools()],
    define: {
      __API_BASE__: JSON.stringify(env.VITE_API_BASE_URL ?? ''),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // vercel dev
          changeOrigin: true,
        },
      },
    },
  };
});