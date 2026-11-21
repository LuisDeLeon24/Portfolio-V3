import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'three-core', test: /three\.core\.js$/ }],
        },
      },
    },
  },
})
