import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
    },
    build: {
        outDir: 'build'
    },
    server: {
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    }
});