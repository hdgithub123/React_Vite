import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


export default defineConfig({
  plugins: [react(),
  cssInjectedByJsPlugin(),
  viteStaticCopy({
    targets: [
      {
        src: 'package.json',
        dest: '.' // copy vào thư mục dist gốc
      },
      {
        src: 'README.md',
        dest: '.' // copy vào thư mục dist gốc
      }
    ]
  }),
  ],
  // resolve: {
  //   extensions: ['.js', '.jsx'],
  // },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'), // hoặc 'src/index.js' nếu bạn dùng file đó
      name: 'ReactTable',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
