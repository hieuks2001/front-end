import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.Vue'],
  plugins: [vue()],
  resolve: {
    alias: {
      '@views': '/src/views',
      '@components': '/src/components',
    }
  },
})
