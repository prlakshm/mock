import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: '/mock-prlakshm-dkyerema-prlakshm-deploy/',
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      port: 8000,
    },
  };
});