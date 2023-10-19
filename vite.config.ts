import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env': env
        },
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                '@ui/': path.resolve(__dirname, 'src/components/ui') + '/',
                '@features/': path.resolve(__dirname, 'src/features') + '/',
                '@components/': path.resolve(__dirname, 'src/components') + '/'
            },
        },
    }
})
