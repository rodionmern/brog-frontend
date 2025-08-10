import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Проксирование всех запросов, начинающихся с `/api`
      '/api': {
        target: 'http://localhost:4200',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
