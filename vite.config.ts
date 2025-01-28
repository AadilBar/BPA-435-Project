import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteBabel from 'vite-plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteBabel({
      babelConfig: {
        plugins: [
          'babel-plugin-glsl',
        ],
      },
    }),
  ],
  base: "/BPA-435-Project"
})
