import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'src/public',
  plugins: [react()],
  resolve: {
    // alias: { ... } // Aliases are not supported in this environment
  },
})