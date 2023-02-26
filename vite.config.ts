import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        laravel({
            refresh: true,
            input: [
                'resources/css/app.css',
                'resources/scss/app.scss',
                'resources/ts/index.tsx'
            ],
        }),
    ],
});
