import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 10000,
    host: true,
    allowedHosts: [
      'frontend-incharge.onrender.com',
      'incharge-ai.com',
      'www.incharge-ai.com', // ✅ Add both the root and www subdomain
    ],
  },
});