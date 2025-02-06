import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    base: '/BallDropInator/'
  }
})

// export default defineConfig(({ command, mode }) => {
//   const isGitHubPages = command === 'build' && mode === 'production'

//   return {
//     plugins: [react()],
//     base: isGitHubPages ? '/BallDropInator/' : '/',
//     build: {
//       outDir: 'dist',
//       rollupOptions: {
//         input: 'index.html',
//         output: {
//           format: 'iife'
//         }
//       }
//     }
//   }
// })