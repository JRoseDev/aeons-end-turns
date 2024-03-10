import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            'ae-body': ['Charter', 'sans-serif'],
            'ae-title': ['Friz Quadrata', 'serif'],
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            defaultTheme: 'dark',
            prefix: 'ae',
            themes: {
                dark: {
                    extend: 'dark',
                    colors: {
                        background: '#0C0C0C',
                        nemesis: '#5E0010',
                        player: '#33830C',
                    },
                },
            },
        }),
    ],
};
