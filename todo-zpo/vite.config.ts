import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  optimizeDeps: {
    include: ['sockjs-client', 'stompjs'],
  },
});
