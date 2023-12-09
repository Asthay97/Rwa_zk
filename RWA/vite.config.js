import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ViteSass from 'vite-plugin-sass'
//import pkg from 'sass'

//const { sass } = pkg

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),ViteSass()],
  /*css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/variables.scss";`, // Optional: Import a global variables file
        implementation: sass,
      },
    },
  },
  */
})
