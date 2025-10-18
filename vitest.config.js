import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',      // simula un DOM para los componentes React
    globals: true,             // permite usar describe/it/expect sin importar
    setupFiles: './src/setupTests.js' // configuraciones globales (jest-dom)
  }
})
