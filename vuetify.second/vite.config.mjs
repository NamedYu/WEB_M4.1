// 插件
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
// 实用工具
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(), Pages(), Layouts(),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components(),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync('./private.key'),
      cert: fs.readFileSync('./certificate.crt'),
      passphrase: "123456"
    },
    open: true,
    proxy: {
      '/api': {
        target: 'https://localhost:3000', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      overlay: true,
    }
  },
})
