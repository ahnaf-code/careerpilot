// import { defineConfig } from 'vite'
// import react from '@vitejs/react-refresh' // Or @vitejs/plugin-react based on your setup

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Whenever the frontend calls a path starting with /api, 
//       // Vite will automatically forward it to your teammate's backend
//       '/api': {
//         target: 'http://localhost:5000', // Assumes your teammate is running on port 5000
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})