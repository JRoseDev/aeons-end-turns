import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: { enabled: process.env.SW_DEV === 'true' },
            workbox: {
                globPatterns: ['**/*.{js,css,html,webp,png,mp3,ttf,jpg}'],
            },
            manifest: {
                theme_color: '#8936FF',
                background_color: '#000000',
                orientation: 'any',
                display: 'standalone',
                lang: 'en-GB',
                name: "Aeon's End Turns",
                short_name: 'AE Turns',
                start_url: 'https://jrosedev.github.io/aeons-end-turns/',
                description: "A turn order card app for the card game Aeon's End.",
                id: 'https://jrosedev.github.io/aeons-end-turns/',
                icons: [
                    {
                        src: 'icons/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'icons/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    base: '/aeons-end-turns/',
});
