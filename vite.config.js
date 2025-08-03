import {defineConfig} from 'vite'

export default defineConfig({
    root: 'public',
    publicDir: false,
    server: {
        port: 3000,
        open: true,
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        minify: false,
        assetsInlineLimit: 0,
    },
    esbuild: false,
})