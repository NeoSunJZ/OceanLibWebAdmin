import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import commonjs from 'vite-plugin-commonjs';
 
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    commonjs(),
    vue(),
    monacoEditorPlugin({ 
      languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html'] 
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '127.0.0.1',
    port: 8082,
  }
})
